import { PacketType } from "../enums";
import { IPacket } from "./packet";

export class PingPacket implements IPacket {
	public readonly type: PacketType = PacketType.PING;
	public readonly nonce: number;

	public constructor(nonce: number) {
		this.nonce = nonce;
	}

	public serialize(): Buffer {
		return Buffer.from([this.type, this.nonce]);
	}

	public static deserialize(buffer: Buffer): PingPacket {
		return new PingPacket(buffer.readUInt32BE(1));
	}
}