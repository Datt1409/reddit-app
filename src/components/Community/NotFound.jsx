import { Button, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      minHeight="70vh"
    >
      <Text
        fontSize="18px"
        fontWeight={600}
        lineHeight="22px"
        color="#1c1c1c"
        mb={3}
      >
        Sorry, there aren’t any communities on Reddit with that name.
      </Text>
      <Text fontSize="14px" fontWeight={500} mb={5}>
        This community may have been banned or the community name is incorrect.
      </Text>
      <Link href="/">
        <Button>Go Home</Button>
      </Link>
    </Flex>
  );
}
