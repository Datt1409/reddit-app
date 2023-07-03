import {
  Box,
  Flex,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { auth, firestore } from "@/firebase/clientApp";
import CommentInput from "./CommentInput";
import {
  collection,
  doc,
  getDocs,
  increment,
  orderBy,
  query,
  serverTimestamp,
  where,
  writeBatch,
} from "firebase/firestore";
import { useSetRecoilState } from "recoil";
import { postState } from "@/atom/postsAtom";
import CommentItem from "./CommentItem";

export default function Comments({ user, selectedPost, communityId }) {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [createLoading, setCreateLoading] = useState(false);
  const [loadingDeleteId, setLoadingDeleteId] = useState("");
  const setPostState = useSetRecoilState(postState);

  const onCreateComment = async () => {
    setCreateLoading(true);
    try {
      if (commentText === "") return;

      const batch = writeBatch(firestore);
      // create a comment document
      const commentDocRef = doc(collection(firestore, "comments"));
      const newComment = {
        id: commentDocRef.id,
        creatorId: user.uid,
        creatorDisplayText: user.email.split("@")[0],
        communityId,
        postId: selectedPost.id,
        postTitle: selectedPost.title,
        text: commentText,
        createdAt: serverTimestamp(),
      };

      batch.set(commentDocRef, newComment);
      newComment.createdAt = { seconds: Date.now() / 1000 };

      //   update post NumberOfComments + 1
      const postDocRef = doc(firestore, "posts", selectedPost?.id);
      batch.update(postDocRef, {
        numberOfComment: increment(1),
      });
      await batch.commit();

      // update comment recoil state
      setCommentText("");
      setComments((prev) => [newComment, ...prev]);
      setPostState((prev) => ({
        ...prev,
        selectedPost: {
          ...prev.selectedPost,
          numberOfComment: prev.selectedPost.numberOfComment + 1,
        },
      }));
    } catch (error) {
      console.log("onCreateComment", error);
    }

    setCreateLoading(false);
  };

  const onDeleteComment = async (comment) => {
    setLoadingDeleteId(comment.id);
    try {
      const batch = writeBatch(firestore);

      // delete comment document
      const commentDocRef = doc(firestore, "comments", comment.id);
      batch.delete(commentDocRef);

      // update post NumbefOfComments - 1
      const postDocRef = doc(firestore, "posts", selectedPost?.id);
      batch.update(postDocRef, {
        numberOfComment: increment(-1),
      });

      await batch.commit();

      // update client recoil state

      setPostState((prev) => ({
        ...prev,
        selectedPost: {
          ...prev.selectedPost,
          numberOfComment: prev.selectedPost.numberOfComment - 1,
        },
      }));

      setComments((prev) => prev.filter((item) => item.id !== comment.id));
    } catch (error) {
      console.log("onDeleteComments", error);
    }
    setLoadingDeleteId("");
  };

  // const onEditComment = (comment) => {};

  const getPostComments = async () => {
    try {
      const commentsQuery = query(
        collection(firestore, "comments"),
        where("postId", "==", selectedPost?.id),
        orderBy("createdAt", "desc")
      );

      const commentDocs = await getDocs(commentsQuery);

      const comments = commentDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setComments(comments);
    } catch (error) {
      console.log("getPostComments error", error);
    }
    setFetchLoading(false);
  };

  useEffect(() => {
    if (!selectedPost) return;

    getPostComments();
  }, [selectedPost]);

  return (
    <Box bg="white" borderRadius="0 0 4px 4px" p={2}>
      <Flex
        direction="column"
        pl={10}
        pr={4}
        mb={6}
        fontSize="10pt"
        width="100%"
      >
        {!fetchLoading && (
          <CommentInput
            commentText={commentText}
            setCommentText={setCommentText}
            user={user}
            createLoading={createLoading}
            onCreateComment={onCreateComment}
          />
        )}
      </Flex>
      <Stack spacing={6} p={2}>
        {fetchLoading ? (
          <>
            {[0, 1, 2].map((item) => (
              <Box key={item} padding="6" bg="white">
                <SkeletonCircle size="10" />
                <SkeletonText mt="4" noOfLines={2} spacing={4} />
              </Box>
            ))}
          </>
        ) : (
          <>
            {comments.length === 0 ? (
              <Flex
                direction="column"
                justify="center"
                align="center"
                borderTop="1px solid gray.100"
                p={20}
              >
                <Text fontWeight={700} opacity={0.3}>
                  No Comments Yet
                </Text>
              </Flex>
            ) : (
              <>
                {comments.map((comment) => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    onDeleteComment={onDeleteComment}
                    loadingDelete={loadingDeleteId === comment.id}
                    userId={user?.uid}
                  />
                ))}
              </>
            )}
          </>
        )}
      </Stack>
    </Box>
  );
}
