export enum AlterGameTag {
	CHANGE_PRIVACY = 1,
};

export enum ChatNoteType {
	DID_VOTE = 0,
}

export enum PacketType {
	NORMAL = 0x00,
	RELIABLE = 0x01,
	HELLO = 0x08,
	DISCONNECT = 0x09,
	ACKNOWLEDGEMENT = 0x0a,
	FRAGMENT = 0x0b,
	PING = 0x0c,
}