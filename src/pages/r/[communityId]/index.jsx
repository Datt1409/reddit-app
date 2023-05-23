import { firestore } from "@/firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import React from "react";
import safeJsonStringify from "safe-json-stringify";

export default function CommunityPage({ communityData }) {
  console.log("here is data", communityData);
  return <div>Welcome to{communityData.id}</div>;
}

export async function getServerSideProps(context) {
  try {
    const communityDocRef = doc(
      firestore,
      "communities",
      context.query.communityId
    );

    const communityDoc = await getDoc(communityDocRef);

    return {
      props: {
        communityData: JSON.parse(
          safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })
        ),
      },
    };
  } catch (error) {
    console.log("getServerSideProps error", error);
  }
}
