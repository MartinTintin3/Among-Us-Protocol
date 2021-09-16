import { PacketType } from "../enums";
import { byte, int32, uint16 } from "../types/numbers";
import Packet from "./Packet";

export default class HelloPacket extends Packet {
	public static readonly type: PacketType = PacketType.HELLO;
	public readonly nonce: uint16;
	public readonly hazel_version: byte;
	public readonly client_version: int32;
	public readonly username: string;

	constructor(nonce: uint16, hazel_version: byte, client_version: int32, username: string) {
		super(HelloPacket.type);
		this.nonce = nonce;
		this.hazel_version = hazel_version;
		this.client_version = client_version;
		this.username = username;
	}

	public serialize(): Buffer {
		const buffer: Buffer = Buffer.alloc(9 + this.username.length);
		buffer.writeUInt8(HelloPacket.type, 0);
		buffer.writeUInt16BE(this.nonce, 1);
		buffer.writeUInt8(this.hazel_version, 3);
		buffer.writeInt32LE(this.client_version, 4);
		buffer.writeUInt8(this.username.length, 8);
		buffer.write(this.username, 9, "utf8");
		return buffer;
	}

	public static deserialize(buffer: Buffer): HelloPacket {
		return new HelloPacket(buffer.readUInt8(1), buffer.readUInt8(3), buffer.readInt32LE(4), buffer.toString("utf8", 9, 9 + buffer.readUInt8(8)));
	}
}