import { PacketType } from "../enums";
import Packet from "./packet";

export default class PingPacket extends Packet {
	public static readonly type: PacketType = PacketType.PING;
	public static readonly should_acknowledge: boolean = true;
	public readonly nonce: number;

	public constructor(nonce: number) {
		super(PingPacket.type, PingPacket.should_acknowledge);
		this.nonce = nonce;
	}

	public serialize(): Buffer {
		return Buffer.from([this.type, this.nonce]);
	}

	public static deserialize(buffer: Buffer): PingPacket {
		PingPacket.check(PingPacket.type, buffer);
		return new PingPacket(buffer.readUInt16BE(1));
	}
}