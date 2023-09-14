"use client";
import { useUser } from "@/app/recoil/user";
import { Divider } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/react";
import { FC } from "react";

export const Profile: FC = () => {
  const user = useUser();
  if (!user) {
    return <></>;
  }

  return (
    <Box padding="32px">
      <h1>Profile</h1>
      <Divider />
      <p>ID: {user.id}</p>
      <p>Name: {user.name}</p>
      <p>AccessToken: {user.accessToken}</p>
      <p>AccessTokenExpires: {user.accessTokenExpires}</p>
      <p>RefreshToken: {user.refreshToken}</p>
    </Box>
  );
};

export default Profile;
