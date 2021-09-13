import { PacketType } from "../enums";
import Packet from "./packet";

export default class AcknowledgementPacket extends Packet {
	public static readonly type: PacketType = PacketType.ACKNOWLEDGEMENT;
	public static readonly should_acknowledge: boolean = false;
	public readonly nonce: number;
	public readonly missing_packets: number

	public constructor(nonce: number, missing_packets: number) {
		super(AcknowledgementPacket.type, AcknowledgementPacket.should_acknowledge);
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
		AcknowledgementPacket.check(AcknowledgementPacket.type, buffer);
		return new AcknowledgementPacket(buffer.readUInt16BE(1), buffer.readUInt8(3));
	}
}