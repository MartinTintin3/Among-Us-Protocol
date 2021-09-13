import { PacketType } from "../enums";
import { HazelMessage } from "../hazel";
import Packet from "./packet";

export default class ReliablePacket extends Packet {
	public static readonly type: PacketType = PacketType.RELIABLE;
	public static readonly should_acknowledge: boolean = true;
	public readonly nonce: number;
	public readonly payload: Array<HazelMessage>;

	constructor(nonce: number, payload: Array<HazelMessage>) {
		super(ReliablePacket.type, ReliablePacket.should_acknowledge);
		this.nonce = nonce;
		this.payload = payload;
	}

	public serialize(): Buffer {
		const buffer = Buffer.alloc(5 + this.payload.reduce((a, b) => a + b.serialize().length, 0));
		buffer.writeUInt8(this.type, 0);
		buffer.writeUInt32LE(this.nonce, 1);
		let offset = 5;
		for(const data of this.payload) {
			data.serialize().copy(buffer, offset);
			offset += data.serialize().length;
		}
		return buffer;
	}

	public static deserialize(buffer: Buffer): ReliablePacket {
		ReliablePacket.check(ReliablePacket.type, buffer);
		const nonce = buffer.readUInt32LE(1);
		const payload: Array<HazelMessage> = [];
		let offset = 5;
		while(offset < buffer.length) {
			payload.push(HazelMessage.deserialize(buffer.slice(offset)));
			offset += payload[payload.length - 1].serialize().length;
		}
		return new ReliablePacket(nonce, payload);
	}
}