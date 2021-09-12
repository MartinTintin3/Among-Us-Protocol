import { PacketType } from "../enums";

export default class Packet {
	public static type: PacketType;
	public type: PacketType;
	public constructor(type: PacketType) {
		this.type = type;
	}
	serialize(): Buffer {
		throw new Error("Method not implemented.");
	}
	public static deserialize(buffer: Buffer): Packet {
		throw new Error("Method not implemented.");
	}
	public static check(type: PacketType, buffer: Buffer): void {
		if(buffer.readUInt8(0) != type) {
			throw new Error("Invalid packet type");
		}
	}
}