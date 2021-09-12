import { PacketType } from "../enums";
import { Byte } from "../types/byte";
import { IPacket } from "./packet";

export class AckPacket implements IPacket {
	public readonly type: PacketType = PacketType.ACK;
	public readonly nonce: number;
	public readonly missing_packets: Byte

	public constructor(nonce: number, missing_packets: Byte) {
		this.nonce = nonce;
		this.missing_packets = missing_packets;
	}

	public serialize(): Buffer {
		const buffer = Buffer.alloc(4);
		buffer.writeUInt8(this.type, 0);
		buffer.writeUInt16BE(this.nonce, 1);
		buffer.writeUInt8(this.missing_packets, 3);
		return buffer;
	}
}