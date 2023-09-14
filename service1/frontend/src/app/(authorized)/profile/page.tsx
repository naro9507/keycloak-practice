"use client";
import { useUser } from "@/app/recoil/user";
import { Divider } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
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
    </Box>
  );
};

export default Profile;
