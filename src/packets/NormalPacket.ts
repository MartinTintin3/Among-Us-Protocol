import { Bound, PacketType } from "../enums";
import HazelMessage from "../HazelMessage";
import Packet from "./Packet";

export default class NormalPacket extends Packet {
	public static readonly type: PacketType = PacketType.NORMAL;
	public readonly payloads: Array<HazelMessage>;

	public constructor(payloads: Array<HazelMessage>, bound: Bound) {
		super(NormalPacket.type, bound);
		this.payloads = payloads;
	}

	public serialize(): Buffer {
		const buffer: Buffer = Buffer.alloc(1 + this.payloads.reduce((a, b) => a + b.serialize().length, 0));
		buffer.writeUInt8(NormalPacket.type);
		let offset: number = 1;
		for(const payload of this.payloads) {
			payload.serialize().copy(buffer, offset);
			offset += payload.serialize().length;
		}
		return buffer;
	}

	public static deserialize(buffer: Buffer, bound: Bound): NormalPacket {
		const payload: Array<HazelMessage> = [];
		let offset: number = 1;
		while(offset < buffer.length) {
			payload.push(HazelMessage.deserialize(buffer.slice(offset)));
			offset += payload[payload.length - 1].serialize().length;
		}
		return new NormalPacket(payload, bound);
	}
}