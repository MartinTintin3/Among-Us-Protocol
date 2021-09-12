import { ReliablePacket } from "./packet/reliable";

export enum AlterGameTag {
	CHANGE_PRIVACY = 1,
};

export enum ChatNoteType {
	DID_VOTE = 0,
}

export enum PacketType {
	RELIABLE = 0x01,
	HELLO = 0x08,
	ACK = 0x0a,
}