import { PacketType } from "../enums";
import { IPacket } from "./packet";

export class AcknowledgementPacket implements IPacket {
	public readonly type: PacketType = PacketType.ACKNOWLEDGEMENT
	public readonly nonce: number;
	public readonly missing_packets: number

	public constructor(nonce: number, missing_packets: number) {
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

	public static deserialize(buffer: Buffer): AcknowledgementPacket {
		return new AcknowledgementPacket(buffer.readUInt16BE(1), buffer.readUInt8(3));
	}
}