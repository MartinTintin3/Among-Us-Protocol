import { PacketType } from "../enums";

export default class Packet {
	public static type: PacketType;

	serialize(): Buffer {
		throw new Error(`Cannot serialize a base packet`);
	}
	public static deserialize(buffer: Buffer): Packet {
		throw new Error(`Packet deserialization for ${PacketType[buffer.readInt8(0)].toString()} not implemented`);
	}
	public static check(type: PacketType, buffer: Buffer): void {
		if(buffer.readUInt8(0) != type) {
			throw new Error("Invalid packet type");
		}
	}
}