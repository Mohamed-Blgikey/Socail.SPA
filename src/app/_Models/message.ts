export interface Message {
  id:number;
  senderId:string;
  senderFullName:string;
  senderPhotoName:string;
  resipientId:string;
  resipientFullName:string;
  resipientPhotoName:string;
  content:string;
  isRead:boolean;
  dateRead:Date;
  messageSent:Date;
}


