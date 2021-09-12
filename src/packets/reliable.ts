import { PacketType } from "../enums";
import { HazelMessage } from "../hazel";
import Packet from "./packet";

export default class ReliablePacket extends Packet {
	public static readonly type: PacketType = PacketType.RELIABLE;
	public readonly nonce: number;
	public readonly payloads: Array<HazelMessage>;

	constructor(nonce: number, payloads: Array<HazelMessage>) {
		super(ReliablePacket.type);
		this.nonce = nonce;
		this.payloads = payloads;
	}

	public serialize(): Buffer {
		const buffer = Buffer.alloc(5 + this.payloads.reduce((a, b) => a + b.serialize().length, 0));
		buffer.writeUInt8(this.type, 0);
		buffer.writeUInt32LE(this.nonce, 1);
		let offset = 5;
		for(const payload of this.payloads) {
			payload.serialize().copy(buffer, offset);
			offset += payload.serialize().length;
		}
		return buffer;
	}

	public static deserialize(buffer: Buffer): ReliablePacket {
		ReliablePacket.check(ReliablePacket.type, buffer);
		const nonce = buffer.readUInt32LE(1);
		const payloads: Array<HazelMessage> = [];
		let offset = 5;
		while(offset < buffer.length) {
			payloads.push(HazelMessage.deserialize(buffer.slice(offset)));
			offset += payloads[payloads.length - 1].serialize().length;
		}
		return new ReliablePacket(nonce, payloads);
	}
}