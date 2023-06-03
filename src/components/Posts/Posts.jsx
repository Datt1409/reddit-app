/* eslint-disable react-hooks/exhaustive-deps */
import { auth, firestore } from "@/firebase/clientApp";
import usePosts from "@/hooks/usePosts";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";
import { useAuthState } from "react-firebase-hooks/auth";
import { Stack } from "@chakra-ui/react";
import PostLoader from "./PostLoader";

export default function Posts({ communityData }) {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const {
    postStateValue,
    setPostStateValue,
    onVote,
    onSelectPost,
    onDeletePost,
  } = usePosts();
  const getPosts = async () => {
    try {
      setLoading(true);
      const postsQuery = query(
        collection(firestore, "posts"),
        where("communityId", "==", communityData.id),
        orderBy("createAt", "desc")
      );
      const postDocs = await getDocs(postsQuery);

      //   Store in posts state
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      console.log("posts", posts);
      setPostStateValue((prev) => ({
        ...prev,
        posts: posts,
      }));
    } catch (error) {
      console.log("getPost error", error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <>
      {loading ? (
        <PostLoader />
      ) : (
        <Stack>
          {postStateValue.posts.map((item) => (
            <PostItem
              key={item.id}
              post={item}
              userIsCreator={user?.uid === item.creatorId}
              userVoteValue={undefined}
              onVote={onVote}
              onSelectPost={onSelectPost}
              onDeletePost={onDeletePost}
            />
          ))}
        </Stack>
      )}
    </>
  );
}
