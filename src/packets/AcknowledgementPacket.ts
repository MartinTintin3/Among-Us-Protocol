import { Bound, PacketType } from "../enums";
import { byte, uint16 } from "../types/numbers";
import Packet from "./Packet";

export default class AcknowledgementPacket extends Packet {
	public static readonly type: PacketType = PacketType.ACKNOWLEDGEMENT;
	public readonly nonce: uint16;
	public readonly missing_packets: byte;

	public constructor(nonce: uint16, missing_packets: byte, bound: Bound) {
		super(AcknowledgementPacket.type, bound);
		this.nonce = nonce;
		this.missing_packets = missing_packets;
	}

	public serialize(): Buffer {
		const buffer: Buffer = Buffer.alloc(4);
		buffer.writeUInt8(AcknowledgementPacket.type, 0);
		buffer.writeUInt16BE(this.nonce, 1);
		buffer.writeUInt8(this.missing_packets, 3);
		return buffer;
	}

	public static deserialize(buffer: Buffer, bound: Bound): AcknowledgementPacket {
		return new AcknowledgementPacket(buffer.readUInt16BE(1), buffer.readUInt8(3), bound);
	}
}