import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import SearchInput from "./SearchInput";
import RightContent from "./RightContent/RightContent";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import Directory from "./Directory/Directory";
import useDirectory from "@/hooks/useDirectory";
import { defaultMenuItem } from "@/atom/directoryMenuAtom";
import { useRouter } from "next/router";
import { TiHome } from "react-icons/ti";

export default function Navbar() {
  const [user, loading, error] = useAuthState(auth);
  const { onSelectMenuItem } = useDirectory();
  // const router = useRouter();

  return (
    <Flex
      bg="white"
      height="44px"
      padding="6px 12px"
      justify={{ md: "space-between" }}
    >
      <Flex
        align="center"
        width={{ base: "40px", md: "auto" }}
        mr={{ base: 0, md: 2 }}
        onClick={() =>
          onSelectMenuItem({
            displayText: "Home",
            link: "/",
            icon: TiHome,
            iconColor: "black",
            imageURL: "",
          })
        }
        cursor="pointer"
      >
        <Image src="/images/redditFace.svg" alt="reddit" height="30px" />
        <Image
          src="/images/redditText.svg"
          height="46px"
          display={{ base: "none", md: "unset" }}
          alt="reddit"
        />
      </Flex>
      {user && <Directory />}
      <SearchInput user={user} />
      <RightContent user={user} />
    </Flex>
  );
}
