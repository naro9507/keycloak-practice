import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, ThemeConfig } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";

import { extendTheme } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";

const colors = {
  brand: {
    900: "#1D4044",
    800: "#234E52",
    700: "#285E61",
    600: "#2C7A7B",
    500: "#319795",
    400: "#38B2AC",
    300: "#4FD1C5",
    200: "#81E6D9",
    100: "#B2F5EA",
    50: "#E6FFFA",
  },
};

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

export const theme = extendTheme({
  colors,
  config,
  styles: {
    global: {
      body: {
        color: "#000",
      },
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <RecoilRoot>
      <SessionProvider>
        <CacheProvider>
          <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </CacheProvider>
      </SessionProvider>
    </RecoilRoot>
  );
}
