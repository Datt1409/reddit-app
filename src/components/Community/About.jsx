import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { RiCakeLine } from "react-icons/ri";
import React from "react";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";

export default function About({ communityData }) {
  console.log("communityData", communityData);

  const router = useRouter();
  return (
    <Box position="sticky" top="14px">
      <Flex
        justify="space-between"
        align="center"
        bg="blue.400"
        color="white"
        p={3}
        borderRadius="4px 4px 0 0"
      >
        <Text fontSize="10t" fontWeight={700}>
          About Community
        </Text>
        <Icon as={HiOutlineDotsHorizontal} />
      </Flex>
      <Flex direction="column" p={3} bg="white" borderRadius="0 0 4px 4px">
        <Stack>
          <Flex width="100%" p={2} fontSize="10pt" fontWeight={700}>
            <Flex direction="column" flexGrow={1}>
              <Text>{communityData.numberOfMembers}</Text>
              <Text>Members</Text>
            </Flex>
            <Flex direction="column" flexGrow={1}>
              <Text>1</Text>
              <Text>Online</Text>
            </Flex>
          </Flex>
          <Divider />
          <Flex
            align="center"
            width="100%"
            fontWeight={500}
            p={1}
            fontSize="10pt"
          >
            <Icon as={RiCakeLine} fontSize={18} mr={2} />
            <Text>
              Created{" "}
              {communityData.createAt &&
                moment(new Date(communityData.createAt?.seconds * 1000)).format(
                  "MMM DD, YYYY"
                )}
            </Text>
          </Flex>
          <Link href={`/r/${router.query.communityId}/submit`}>
            <Button mt={3} height="30px">
              Create Post
            </Button>
          </Link>
        </Stack>
      </Flex>
    </Box>
  );
}
