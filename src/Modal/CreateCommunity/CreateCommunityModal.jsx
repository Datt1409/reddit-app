import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Input,
  Box,
  Divider,
  Stack,
  Checkbox,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { BsFillPersonFill, BsFillEyeFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";
import {
  collection,
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { auth, firestore } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";
import { communityState } from "@/atom/communityAtom";
import { useRouter } from "next/router";
import useDirectory from "@/hooks/useDirectory";

export default function CreateCommunityModal({ open, handleClose }) {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [communityName, setCommunityName] = useState("");
  const [characterRemaining, setCharacterRemaining] = useState(21);
  const [communityType, setCommunityType] = useState("public");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const setSnippetState = useSetRecoilState(communityState);
  const { toggleMenuOpen } = useDirectory();

  const handleChange = (e) => {
    if (e.target.value.length > 21) return;
    setCommunityName(e.target.value);
    setCharacterRemaining(21 - e.target.value.length);
  };

  const changeCommunityType = (e) => {
    setCommunityType(e.target.name);
  };

  const handleCreateCommunity = async () => {
    // Validate the commnuity (no special character and have at least 3 characters )
    // Check for the special character in string
    const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (format.test(communityName) || communityName.length < 3) {
      setError(
        "Community names must be between 3–21 characters, and can only contain letters, numbers, or underscores."
      );
      return;
    }

    setLoading(true);

    try {
      const communityDocRef = doc(firestore, "communities", communityName);

      await runTransaction(firestore, async (transaction) => {
        const communityDoc = await transaction.get(communityDocRef);
        // Check if community exists in db
        if (communityDoc.exists()) {
          throw new Error(`Sorry, r/${communityName} is taken. Try another.`);
        }
        // Create community
        transaction.set(communityDocRef, {
          creatorId: user?.uid,
          createdAt: serverTimestamp(),
          numberOfMembers: 1,
          privacyType: communityType,
        });

        // Create community snippet

        transaction.set(
          doc(firestore, `users/${user?.uid}/communitySnippets`, communityName),
          {
            communityId: communityName,
            isModerator: true,
          }
        );
      });
      handleClose();
      toggleMenuOpen();
      router.push(`r/${communityName}`);
    } catch (error) {
      console.log("handleCreateCommunity error", error);
      setError(error.message);
    }
    setSnippetState((prev) => ({
      ...prev,
      mySnippets: [],
    }));
    setLoading(false);
  };

  return (
    <>
      <Modal isOpen={open} onClose={handleClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display="flex"
            flexDirection="column"
            padding={3}
            fontSize={15}
          >
            Create a community
          </ModalHeader>
          <Divider width="95%" margin="0 auto" />
          <Box pl={3} pr={3}>
            <ModalCloseButton />
            <ModalBody display="flex" flexDirection="column" padding="10px 0">
              <Text fontWeight={600} fontSize={15}>
                Name
              </Text>
              <Text color="gray.500" fontSize={12}>
                Community names including capitalization cannot be changed.
              </Text>
              <Text
                position="relative"
                top="28px"
                left="10px"
                width="20px"
                color="gray.400"
              >
                r/
              </Text>
              <Input
                position="relative"
                value={communityName}
                size="sm"
                pl="22px"
                onChange={handleChange}
              ></Input>
              <Text
                color={characterRemaining === 0 ? "red" : "gray.500"}
                fontSize={12}
                mt={3}
              >
                {characterRemaining} Characters remaining
              </Text>
              <Text fontSize="9pt" color="red" pt={1}>
                {error}
              </Text>
              <Box mt={4} mb={4}>
                <Text fontSize={15} fontWeight={600}>
                  Community type
                </Text>
                <Stack spacing={2} mt={2}>
                  <Checkbox
                    name="public"
                    isChecked={communityType === "public"}
                    onChange={changeCommunityType}
                  >
                    <Flex align="center">
                      <Icon as={BsFillPersonFill} color="gray.500" mr={1.5} />
                      <Text fontSize={14} mr={1} fontWeight={600}>
                        Public
                      </Text>
                      <Text fontSize={11} color="gray.500" mt={0.5}>
                        Anyone can view, post, and comment to this community
                      </Text>
                    </Flex>
                  </Checkbox>

                  <Checkbox
                    name="restricted"
                    isChecked={communityType === "restricted"}
                    onChange={changeCommunityType}
                  >
                    <Flex align="center">
                      <Icon as={BsFillEyeFill} color="gray.500" mr={1.5} />
                      <Text fontSize={14} mr={1} fontWeight={600}>
                        Restricted
                      </Text>
                      <Text fontSize={11} color="gray.500" mt={0.5}>
                        Anyone can view this community, but only approved users
                        can post
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    name="private"
                    isChecked={communityType === "private"}
                    onChange={changeCommunityType}
                  >
                    <Flex align="center">
                      <Icon as={HiLockClosed} color="gray.500" mr={1.5} />

                      <Text fontSize={14} mr={1} fontWeight={600}>
                        Private
                      </Text>
                      <Text fontSize={11} color="gray.500" mt={0.5}>
                        Only approved users can view and submit to this
                        community
                      </Text>
                    </Flex>
                  </Checkbox>
                </Stack>
              </Box>
            </ModalBody>
          </Box>

          <ModalFooter bg="gray.100" borderRadius="0 0 10px 10px">
            <Button
              height="30px"
              variant="outline"
              mr={3}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              height="30px"
              variant="solid"
              onClick={handleCreateCommunity}
              isLoading={loading}
            >
              Create community
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
