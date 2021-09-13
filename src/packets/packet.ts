import { PacketType } from "../enums";

export default class Packet {
	public static type: PacketType;
	public type: PacketType;
	public static readonly should_acknowledge: boolean = false;
	public readonly should_acknowledge: boolean = Packet.should_acknowledge;
	public constructor(type: PacketType, should_acknowledge: boolean) {
		this.type = type;
		this.should_acknowledge = should_acknowledge;
	}
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