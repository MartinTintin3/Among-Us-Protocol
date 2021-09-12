import { PacketType } from "../enums";

export interface IPacket {
	type: PacketType;
	serialize(): Buffer;
}