import {
  Flex,
  Alert,
  AlertDescription,
  AlertTitle,
  Text,
  AlertIcon,
  CloseButton,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import { AiFillCloseCircle } from "react-icons/ai";
import TabItem from "./TabItem";
import TextInput from "./PostForm/TextInput";
import ImageUpload from "./PostForm/ImageUpload";
import { useRouter } from "next/router";
import {
  Timestamp,
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { firestore, storage } from "@/firebase/clientApp";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const formTabs = [
  {
    title: "Post",
    icon: IoDocumentText,
  },
  {
    title: "Images & Video",
    icon: IoImageOutline,
  },
  {
    title: "Link",
    icon: BsLink45Deg,
  },
  {
    title: "Poll",
    icon: BiPoll,
  },
  {
    title: "Talk",
    icon: BsMic,
  },
];

export default function NewPostForms({ user }) {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
  const [textInput, setTextInput] = useState({
    title: "",
    body: "",
  });
  const [selectedFile, setSelectedFile] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleCreatePost = async () => {
    const { communityId } = router.query;
    // create new object => type Post
    const newPost = {
      communityId,
      creatorId: user?.uid,
      creatorDisplayName: user?.email.split("@")[0],
      title: textInput.title,
      body: textInput.body,
      numberOfComment: 0,
      voteStatus: 0,
      createAt: serverTimestamp(),
    };

    // store the post in database
    setLoading(true);
    try {
      const postDocRef = await addDoc(collection(firestore, "posts"), newPost);

      // check for selectedFile
      if (selectedFile) {
        // store in storage => getDownloadURL (return imageURL)
        const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
        await uploadString(imageRef, selectedFile, "data_url");
        const downnloadURL = await getDownloadURL(imageRef);
        // update post doc by adding imageURL

        await updateDoc(postDocRef, {
          imageURL: downnloadURL,
        });
      }
      router.back();
    } catch (error) {
      console.log("handleCreatePost error", error.message);
      setError(true);
    }
    setLoading(false);

    // redirect user back to the communityPage using the router
  };

  const onSelectImage = (e) => {
    const reader = new FileReader();
    if (e.target.files?.[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target.result);
      }
    };
  };
  const onTextChange = (e) => {
    const {
      target: { name, value },
    } = e;
    setTextInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Flex direction="column" bg="white" borderRadius={4} mt={2}>
      <Flex width="100%">
        {formTabs.map((item) => (
          <TabItem
            key={item.title}
            item={item}
            selected={item.title === selectedTab}
            setSelectedTab={setSelectedTab}
          />
        ))}
      </Flex>
      <Flex p={4}>
        {selectedTab === "Post" && (
          <TextInput
            textInput={textInput}
            handleCreatePost={handleCreatePost}
            onChange={onTextChange}
            loading={loading}
          />
        )}

        {selectedTab === "Images & Video" && (
          <ImageUpload
            selectedFile={selectedFile}
            onSelectImage={onSelectImage}
            setSelectedTab={setSelectedTab}
            setSelectedFile={setSelectedFile}
          />
        )}
      </Flex>
      {error && (
        <Alert status="error">
          <AlertIcon />
          <Text mr={2}>Error creating post</Text>
        </Alert>
      )}
    </Flex>
  );
}
