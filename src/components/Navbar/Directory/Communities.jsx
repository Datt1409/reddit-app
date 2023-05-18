import CreateCommunityModal from "@/Modal/CreateCommunity/CreateCommunityModal";
import { Flex, Icon, MenuItem } from "@chakra-ui/react";
import React from "react";
import { GrAdd } from "react-icons/gr";

export default function Communities() {
  return (
    <>
      <CreateCommunityModal />
      <MenuItem
        width="100%"
        fontSize="10pt"
        _hover={{ bg: "gray.100" }}
        onClick={() => {}}
      >
        <Flex align="center">
          <Icon fontSize={20} as={GrAdd} mr={2} />
          <Flex>Create Community</Flex>
        </Flex>
      </MenuItem>
    </>
  );
}
