import { Flex } from "@chakra-ui/react";
import React from "react";

export default function PageContent({ children }) {
  return (
    <Flex justify="center" p="16px 0">
      <Flex width="95%" justify="center" maxWidth="860px">
        {/* Main content */}
        <Flex
          direction="column"
          width={{ base: "100%", md: "65%" }}
          mr={{ base: 0, md: 6 }}
        >
          {children && children[0]}
        </Flex>

        {/* Sidebar */}
        <Flex
          direction="column"
          display={{ base: "none", md: "flex" }}
          flexGrow={1}
        >
          {children && children[1]}
        </Flex>
      </Flex>
    </Flex>
  );
}
