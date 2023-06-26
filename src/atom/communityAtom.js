import { atom } from "recoil";
import { Timestamp } from "firebase/firestore";

const Community = {
  id: "",
  creatorId: "",
  numberOfMembers: 0,
  privacyType: "public" | "private" | "restricted",
  createAt: Timestamp,
  imageURL: "",
};

const communitySnippet = {
  communityId: "",
  isModerator: false,
  imageURL: "",
};

export const defaultCommunityState = {
  mySnippets: [communitySnippet],
  currentCommunity: [Community],
  snippetsFetched: false,
};

export const communityState = atom({
  key: "communitiesState",
  default: defaultCommunityState,
});
