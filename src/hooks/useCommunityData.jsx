/* eslint-disable react-hooks/exhaustive-deps */
import { authModalState } from "@/atom/authModalAtom";
import { communityState } from "@/atom/communityAtom";
import { auth, firestore } from "@/firebase/clientApp";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  writeBatch,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useSetRecoilState } from "recoil";

export default function useCommunityData() {
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(communityState);
  const setAuthModelState = useSetRecoilState(authModalState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user] = useAuthState(auth);
  const router = useRouter();

  const onJoinOrLeaveCommunity = (communityData, isJoined) => {
    // is the user signed in?
    // if not, open auth modal
    if (!user) {
      setAuthModelState({ open: true, view: "login" });
    }

    setLoading(true);
    if (isJoined) {
      leaveCommunity(communityData.id);
      return;
    }
    joinCommunity(communityData);
  };

  const getMySnippets = async () => {
    setLoading(true);
    try {
      const snippetDocs = await getDocs(
        collection(firestore, `users/${user?.uid}/communitySnippets`)
      );

      //   console.log("here is the snippetDocs", snippetDocs);

      const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }));
      console.log("here are snippets", snippets);
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: snippets,
        snippetsFetched: true,
      }));
    } catch (error) {
      console.log("getMySnippetError", error);
      setError(error.message);
    }
    setLoading(false);
  };

  const getCommunityData = async (communityId) => {
    try {
      const communityDocRef = doc(firestore, "communities", communityId);
      const communityDoc = await getDoc(communityDocRef);

      setCommunityStateValue((prev) => ({
        ...prev,
        currentCommunity: {
          id: communityDoc.id,
          ...communityDoc.data(),
        },
      }));
    } catch (error) {
      console.log("getCommunityData error", error);
    }
  };

  useEffect(() => {
    if (!user) {
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: [],
        snippetsFetched: false,
      }));
      return;
    }
    getMySnippets();
  }, [user]);

  useEffect(() => {
    const { communityId } = router.query;
    if (communityId && !communityStateValue.currentCommunity) {
      getCommunityData(communityId);
    }
  }, [router.query, communityStateValue.currentCommunity]);

  const joinCommunity = async (communityData) => {
    // batch write
    try {
      const batch = writeBatch(firestore);

      // creating new community snippet
      const newSnippets = {
        communityId: communityData.id,
        imageURL: communityData.imageURL || "",
        isModerator: user?.uid === communityData.creatorId,
      };

      batch.set(
        doc(
          firestore,
          `users/${user?.uid}/communitySnippets`,
          communityData.id
        ),
        newSnippets
      );

      // update the number of members
      batch.update(doc(firestore, "communities", communityData.id), {
        numberOfMembers: increment(1),
      });
      await batch.commit();

      //   update recoil state - communityState.mySnippets
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: [...prev.mySnippets, newSnippets],
      }));
    } catch (error) {
      console.log("joinCommunity error", error);
      setError(error.message);
    }

    setLoading(false);
  };

  const leaveCommunity = async (communityId) => {
    // batch write
    try {
      // deleting commnutity snippet
      const batch = writeBatch(firestore);
      batch.delete(
        doc(firestore, `users/${user?.uid}/communitySnippets`, communityId)
      );

      // update the number of members
      batch.update(doc(firestore, "communities", communityId), {
        numberOfMembers: increment(-1),
      });

      await batch.commit();

      //   update recoil state
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: prev.mySnippets.filter(
          (item) => item.communityId !== communityId
        ),
      }));
    } catch (error) {
      console.log("leaveCommunityError", error);
      setError(error.message);
    }
    setLoading(false);
  };
  return {
    //data and functio
    communityStateValue,
    onJoinOrLeaveCommunity,
    loading,
  };
}
