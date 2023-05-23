import { Button, Flex, Image, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../firebase/clientApp";
import { collection, doc, setDoc } from "firebase/firestore";

export default function OAuthButtons() {
  const [signInWithGoogle, userCredential, loading, error] =
    useSignInWithGoogle(auth);

  const createUserDocument = async (user) => {
    const userDocRef = doc(firestore, "users", user.uid);
    await setDoc(userDocRef, JSON.parse(JSON.stringify(user)));
  };

  useEffect(() => {
    if (userCredential) {
      createUserDocument(userCredential.user);
    }
  }, [userCredential]);

  return (
    <Flex direction="column" width="100%" mb={4}>
      <Button
        variant="oauth"
        mb={2}
        isLoading={loading}
        onClick={() => signInWithGoogle()}
      >
        <Image
          src="/images/googlelogo.png"
          alt="google logo"
          height="20px"
          mr={4}
        />
        Continue with Google
      </Button>

      <Button variant="oauth">Some Other Provider</Button>
      {error && <Text>{error.message}</Text>}
    </Flex>
  );
}
