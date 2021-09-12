import { PacketType } from "../enums";

export class HelloPacket {
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
}