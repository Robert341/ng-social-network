import { Post } from './post';

export class User {
  _id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  pass: string;
  profPicAddress: string;
  friendRequestsOut: string[];
  friendRequestsIn: string[];
  friends: string[];
  posts: Post[];
}
