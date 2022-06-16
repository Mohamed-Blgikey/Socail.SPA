import { Photo } from "./photo";

export interface User {
  id:string,
  fullName:string;
  dateOfBirth:Date;
  gender:Number;
  created:Date;
  lastActive:Date;
  photoName:string;
  city:string;
  country:string;
  introduction?:string;
  lookingFor?:string
  interests?:string
  photos?:Photo[];
  roles?:string[];
}
