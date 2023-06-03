import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

// export const Post = {
//   id: "",
//   communityId: "",
//   creatorId: "",
//   creatorDisplayName: "",
//   title: "",
//   body: "",
//   numberOfComments: 0,
//   voteStatus: 0,
//   imageURL: "",
//   communityImageURL: "",
//   createAt: Timestamp,
// };

const defaultPostState = {
  selectedPost: null,
  posts: [],
};

export const postState = atom({
  key: "postState",
  default: defaultPostState,
});
