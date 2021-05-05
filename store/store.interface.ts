interface bUser {
  // Basic User
  id: string;
  nickname?: string;
}

interface bPost {
  // Basic Post
  user: bUser;
  content: string;
}

export interface User {
  id: string;
  nickname: string;
  followings: bUser[];
  followers: bUser[];
  posts: bPost[];
}

export interface Post {
  id: number;
  user: bUser;
  likers: bUser[];
  image: string;
  retweet: Post;
}

export interface uState {
  me?: User;
  hasMoreFollower: boolean;
  hasMoreFollowing: boolean;
  followerList: bUser[];
  followingList: bUser[];
}

export interface pState {
  mainPosts: Post[];
  hasMorePost: boolean;
  imagePaths: string[];
  errMsg: string;
}
