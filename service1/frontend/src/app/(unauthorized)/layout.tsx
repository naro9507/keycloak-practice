import { Box } from "@chakra-ui/layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Box as="main" bg="gray.50" minHeight="100vh" minWidth="100vw">
        {children}
      </Box>
    </>
  );
}
