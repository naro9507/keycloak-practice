import { useCallback } from "react";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { RecoilAtomKeys } from "./keys";

type User = {
  id: string;
  email: string;
  name?: string;
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
