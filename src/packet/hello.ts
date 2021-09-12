import { PacketType } from "../enums";
import { IPacket } from "./packet";

export class HelloPacket implements IPacket {
	public readonly type: PacketType = PacketType.HELLO;
	public readonly nonce: number;
	public readonly hazel_version: number;
	public readonly client_version: number;
	public readonly username: string;

	constructor(nonce: number, hazel_version: number, client_version: number, username: string) {
		this.nonce = nonce;
		this.hazel_version = hazel_version;
		this.client_version = client_version;
		this.username = username;
	}

	public serialize(): Buffer {
		const buffer = Buffer.alloc(9 + this.username.length);
		buffer.writeUInt8(this.type, 0);
		buffer.writeUInt16BE(this.nonce, 1);
		buffer.writeUInt8(this.hazel_version, 3);
		buffer.writeInt32LE(this.client_version, 4);
		buffer.writeUInt8(this.username.length, 8);
		buffer.write(this.username, 9, "utf8");
		return buffer;
	}

	public static deserialize(buffer: Buffer): HelloPacket {
		if(buffer.readUInt8(0) !== PacketType.HELLO) {
			throw new Error("Invalid packet type");
		}
		return new HelloPacket(buffer.readUInt8(1), buffer.readUInt8(3), buffer.readInt32LE(4), buffer.toString("utf8", 9, 9 + buffer.readUInt8(8)));
	}
}