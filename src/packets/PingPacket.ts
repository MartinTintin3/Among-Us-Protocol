import { PacketType } from "../enums";
import { uint16 } from "../types/numbers";
import Packet from "./Packet";

export default class PingPacket extends Packet {
	public static readonly type: PacketType = PacketType.PING;
	public readonly nonce: uint16

	public constructor(nonce: number) {
		super(PingPacket.type);
		this.nonce = nonce;
	}

	public serialize(): Buffer {
		const buffer: Buffer = Buffer.alloc(3);
		buffer.writeUInt8(PingPacket.type, 0);
		buffer.writeUInt16BE(this.nonce, 1);
		return buffer;
	}

	public static deserialize(buffer: Buffer): PingPacket {
		return new PingPacket(buffer.readUInt16BE(1));
	}
}