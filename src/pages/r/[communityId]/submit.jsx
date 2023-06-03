import { communityState } from "@/atom/communityAtom";
import PageContent from "@/components/Layout/PageContent";
import NewPostForms from "@/components/Posts/NewPostForms";
import { auth } from "@/firebase/clientApp";
import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue } from "recoil";

export default function SubmitPostPage() {
  const [user] = useAuthState(auth);
  const communityStateValue = useRecoilValue(communityState);
  console.log("community", communityStateValue);

  return (
    <PageContent>
      <>
        <Box p="14px 0" borderBottom="1px solid" borderColor="white">
          <Text>Create a post</Text>
        </Box>
        {user && <NewPostForms user={user} />}
      </>
      <>RHS</>
    </PageContent>
  );
}
