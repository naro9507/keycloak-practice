"use client";
import { Button, Box, Heading, Flex, Card, CardBody } from "@chakra-ui/react";

import { signIn } from "next-auth/react";

export default function Signin() {
  const handleSubmit = async () => {
    try {
      await signIn("keycloak", {
        callbackUrl: "http://localhost:3000/profile",
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box>
      <Card
        align="center"
        justify="center"
        width="40%"
        minWidth="530px"
        height="560px"
        margin="0 auto"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <CardBody flex="0 1 0%">
          <Flex
            margin="0 auto"
            direction="column"
            justifyItems="center"
            alignItems="center"
            gap="73px"
          >
            <Heading
              as="h1"
              sx={{
                textShadow: "0 0 10px black",
                color: "white",
              }}
            >
              Welcome
            </Heading>
            <Box width="100%" textAlign="center">
              <Button
                type="submit"
                width="320px"
                mt="64px"
                colorScheme="brand"
                bgGradient="linear(to-r, brand.400, brand.500, brand.600)"
                onClick={handleSubmit}
              >
                ログイン
              </Button>
            </Box>
          </Flex>
        </CardBody>
      </Card>
    </Box>
  );
}
