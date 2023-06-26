import CreateCommunityModal from "@/Modal/CreateCommunity/CreateCommunityModal";
import { communityState } from "@/atom/communityAtom";
import { Box, Flex, Icon, MenuItem, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { GrAdd } from "react-icons/gr";
import { useRecoilValue } from "recoil";
import MenuListItem from "./MenuListItem";
import { FaReddit } from "react-icons/fa";

export default function Communities() {
  const [open, setOpen] = useState(false);
  const mySnippets = useRecoilValue(communityState).mySnippets;
  console.log("mySnippets", mySnippets);
  return (
    <>
      <CreateCommunityModal open={open} handleClose={() => setOpen(false)} />
      {/* {mySnippets.find(
        (item) =>
          item.isModerator && (
            <Box mt={3} mb={3}>
              <Text
                pl={3}
                mb={1}
                fontSize="7pt"
                fontWeight={500}
                color="gray.500"
              >
                MODERATING
              </Text>

              {mySnippets
                .filter((snippet) => snippet.isModerator)
                .map((snippet) => (
                  <MenuListItem
                    key={snippet.id}
                    icon={FaReddit}
                    displayText={`r/${snippet.communityId}`}
                    link={`/r/${snippet.communityId}`}
                    iconColor="blue.500"
                    imageURL={snippet.imageURL}
                  />
                ))}
            </Box>
          )
      )} */}

      {mySnippets.find((item) => item.isModerator) && (
        <Box mt={3} mb={4}>
          <Text pl={3} mb={1} fontSize="7pt" fontWeight={500} color="gray.500">
            MODERATING
          </Text>
          {mySnippets
            .filter((item) => item.isModerator)
            .map((snippet) => (
              <MenuListItem
                key={snippet.communityId}
                displayText={`r/${snippet.communityId}`}
                link={`/r/${snippet.communityId}`}
                icon={FaReddit}
                iconColor="brand.100"
                imageURL={snippet.imageURL}
              />
            ))}
        </Box>
      )}
      <Box mt={3} mb={3}>
        <Text pl={3} mb={1} fontSize="7pt" fontWeight={500} color="gray.500">
          MY COMMUNITIES
        </Text>
        <MenuItem
          width="100%"
          fontSize="10pt"
          _hover={{ bg: "gray.100" }}
          onClick={() => setOpen(true)}
        >
          <Flex align="center">
            <Icon fontSize={20} as={GrAdd} mr={2} />
            <Flex>Create Community</Flex>
          </Flex>
        </MenuItem>
        {mySnippets.map((snippet) => (
          <MenuListItem
            key={snippet.id}
            icon={FaReddit}
            displayText={`r/${snippet.communityId}`}
            link={`/r/${snippet.communityId}`}
            iconColor="blue.500"
            imageURL={snippet.imageURL}
          />
        ))}
      </Box>
    </>
  );
}
