import { Bound, PacketType } from "../enums";
import HazelMessage from "../HazelMessage";
import { uint16, uint32 } from "../types/numbers";
import Packet from "./Packet";

export default class ReliablePacket extends Packet {
	public static readonly type: PacketType = PacketType.RELIABLE;
	public readonly nonce: uint16;
	public readonly payloads: Array<HazelMessage>;

	constructor(nonce: number, payloads: Array<HazelMessage>, bound: Bound) {
		super(ReliablePacket.type, bound);
		this.nonce = nonce;
		this.payloads = payloads;
	}

	public serialize(): Buffer {
		const buffer: Buffer = Buffer.alloc(5 + this.payloads.reduce((a, b) => a + b.serialize().length, 0));
		buffer.writeUInt8(ReliablePacket.type, 0);
		buffer.writeUInt32LE(this.nonce, 1);
		let offset: number = 5;
		for(const payloads of this.payloads) {
			payloads.serialize().copy(buffer, offset);
			offset += payloads.serialize().length;
		}
		return buffer;
	}

	public static deserialize(buffer: Buffer, bound: Bound): ReliablePacket {
		const nonce: uint32 = buffer.readUInt32LE(1);
		const payload: Array<HazelMessage> = [];
		let offset: number = 5;
		while(offset < buffer.length) {
			payload.push(HazelMessage.deserialize(buffer.slice(offset)));
			offset += payload[payload.length - 1].serialize().length;
		}
		return new ReliablePacket(nonce, payload, bound);
	}
}