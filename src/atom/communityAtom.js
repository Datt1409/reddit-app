import { atom } from "recoil";
import { Timestamp } from "firebase/firestore";

 const defaultCommunity = {
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
};

export const communityState = atom({
  key: "communitiesState",
  default: defaultCommunityState,
});
