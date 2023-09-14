import express, { Request, Response, Application } from "express";
import cors from "cors";
import Keycloak from "keycloak-connect";
import session from "express-session";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 8000;

const memoryStore = new session.MemoryStore();
app.use(
  session({
    secret: "mySecret",
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  })
);

const keycloak = new Keycloak({ store: memoryStore, scope: "offline_access" });
app.use(keycloak.middleware());
Keycloak.prototype.redirectToLogin = (req: Request) => {
  const apiReqMatcher = /\/api\//i;
  return !apiReqMatcher.test(req.originalUrl || req.url);
};

app.get("/api/public", (_: Request, res: Response) => {
  res.json({ message: "public" });
});

app.get(
  "/api/user",
  keycloak.protect("realm:user"),
  (_: Request, res: Response) => {
    res.json({ message: "secured" });
  }
);

app.get(
  "/api/admin",
  keycloak.protect("realm:admin"),
  (_: Request, res: Response) => {
    res.status(200).json({ message: "admin" });
  }
);

app.get(
  "/apis/me",
  keycloak.enforcer("user:profile", { response_mode: "token" }),
  (req: Request, res: Response) => {
    // @ts-ignore
    const permissions = req.permissions;
    res.status(200).json({ permissions });
  }
);

app.get(
  "/protected/resource",
  keycloak.enforcer(["resource:view", "resource:write"], {
    claims: function (request) {
      return {
        "http.method": ["GET"],
        "http.uri": ["/protected/resource"],
      };
    },
  }),
  (_: Request, res: Response) => {
    res.status(200);
  }
);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
