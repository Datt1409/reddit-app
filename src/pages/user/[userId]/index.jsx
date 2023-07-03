import PageContent from "@/components/Layout/PageContent";
import { firestore } from "@/firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import safeJsonStringify from "safe-json-stringify";

export default function userProfile({ userData }) {
  console.log("here is user data", userData);

  return (
    <PageContent>
      <></>
      <>{/* About User */}</>
    </PageContent>
  );
}
