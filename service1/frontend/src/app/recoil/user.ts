import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { RecoilAtomKeys } from "./keys";

type User = {
  id: string;
  email: string;
  name?: string | null;
  accessToken?: string;
  refreshToken?: string;
  accessTokenExpires?: number;
  emailVerified: boolean;
};

const userState = atom<User | null>({
  key: RecoilAtomKeys.USER_STATE,
  default: null,
});

export const useUser = () => {
  return useRecoilValue(userState);
};

export const useSetUser = () => {
  return useSetRecoilState(userState);
};
