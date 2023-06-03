import React from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Icon,
  Flex,
  MenuDivider,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { FaRedditSquare } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { IoSparkles } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogin } from "react-icons/md";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/clientApp";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { authModalState } from "@/atom/authModalAtom";
import { communityState } from "@/atom/communityAtom";

export default function UserMenu({ user }) {
  const resetCommunityState = useResetRecoilState(communityState);
  const setAuthModelState = useSetRecoilState(authModalState);

  const logout = async () => {
    await signOut(auth);
    resetCommunityState();
  };
  return (
    <Menu>
      <MenuButton
        cursor="pointer"
        padding="0px 6px"
        borderRadius={4}
        _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
      >
        <Flex align="center">
          <Flex align="center">
            {user ? (
              <>
                <Icon
                  as={FaRedditSquare}
                  fontSize={24}
                  mr={1}
                  color="gray.500"
                />
                <Flex
                  direction="column"
                  display={{ base: "none", md: "flex" }}
                  fontSize={8}
                  align="flex-start"
                  mr={8}
                >
                  <Text fontSize="8pt" fontWeight={700}>
                    {user?.displayName || user?.email?.split("@")[0]}
                  </Text>
                  <Flex>
                    <Icon as={IoSparkles} color="brand.100" mr={1} />
                    <Text color="gray.400">20 karma</Text>
                  </Flex>
                </Flex>
              </>
            ) : (
              <Icon as={VscAccount} fontSize={24} color="gray.400" mr={1} />
            )}
          </Flex>
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList mt={1}>
        {user ? (
          <>
            <MenuItem
              fontSize="10pt"
              fontWeight={700}
              _hover={{ bg: "blue.500", color: "white" }}
            >
              <Flex>
                <Icon as={CgProfile} fontSize={20} mr={2} />
                Profile
              </Flex>
            </MenuItem>
            <MenuDivider />
            <MenuItem
              fontSize="10pt"
              fontWeight={700}
              _hover={{ bg: "blue.500", color: "white" }}
              onClick={logout}
            >
              <Flex>
                <Icon as={MdOutlineLogin} fontSize={20} mr={2} />
                Log out
              </Flex>
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem
              fontSize="10pt"
              fontWeight={700}
              _hover={{ bg: "blue.500", color: "white" }}
              onClick={() => setAuthModelState({ open: true, view: "login" })}
            >
              <Flex>
                <Icon as={MdOutlineLogin} fontSize={20} mr={2} />
                Log In/ Sign Up
              </Flex>
            </MenuItem>
          </>
        )}
      </MenuList>
    </Menu>
  );
}
