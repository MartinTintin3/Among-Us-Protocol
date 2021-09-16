import { Bound, PacketType } from "../enums";
import { byte } from "../types/numbers";

export default class Packet {
	public static type: byte = undefined;
	public type: byte = undefined;
	public readonly bound: Bound

	public constructor(type: byte, bound: Bound) {
		this.type = type;
		this.bound = bound;
	}

	serialize(): Buffer {
		throw new Error(`Cannot serialize a base packet`);
	}
	public static deserialize(buffer: Buffer, bound: Bound): Packet {
		throw new Error(`Packet deserialization for ${PacketType[buffer.readInt8(0)].toString()} not implemented`);
	}
	public static check(type: PacketType, buffer: Buffer): void {
		if(buffer.readUInt8(0) != type) {
			throw new Error("Invalid packet type");
		}
	}
}