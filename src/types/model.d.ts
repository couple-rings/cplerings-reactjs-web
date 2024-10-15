import { DivisionType } from "src/utils/enums";

export {};

declare global {
  interface IDistrict {
    code: number;
    division_type: DivisionType;
    name: string;
  }

  interface IWard {
    code: number;
    division_type: DivisionType;
    name: string;
  }

  interface IProduct {
    coverImg: string;

    name: string;

    price: number;
  }

  interface IStore {
    coverImg: string;
    name: string;
    adr: string;
    contact: string;
  }

  interface IMessage {
    _id?: string;

    sender: number;

    content: string;

    conversationId: string;

    sentAt: string;

    imageId?: IFile;

    attachmentId?: IFile;

    read?: boolean;
  }

  interface IConversation {
    _id: string;

    participants: number[];

    latestMessage?: IMessage;

    notifiedUsers?: number[];
  }

  interface IFile {
    _id: string;

    url: string;

    key: string;

    size?: number;

    originalName: string;
  }
}
