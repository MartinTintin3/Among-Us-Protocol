import { PacketType } from "../enums";
import { HazelMessage } from "../hazel";
import Packet from "./packet";

export default class NormalPacket extends Packet {
	public static readonly type: PacketType = PacketType.NORMAL;
	public readonly payload: Array<HazelMessage>;

	public constructor(payload: Array<HazelMessage>) {
		super(NormalPacket.type, false);
		this.payload = payload;
	}

	public serialize(): Buffer {
		const buffer = Buffer.alloc(1 + this.payload.reduce((a, b) => a + b.serialize().length, 0));
		buffer.writeUInt8(this.type);
		let offset = 1;
		for(const data of this.payload) {
			data.serialize().copy(buffer, offset);
			offset += data.serialize().length;
		}
		return buffer;
	}

	public static deserialize(buffer: Buffer): NormalPacket {
		NormalPacket.check(NormalPacket.type, buffer);
		const payload: Array<HazelMessage> = [];
		let offset = 1;
		while(offset < buffer.length) {
			payload.push(HazelMessage.deserialize(buffer.slice(offset)));
			offset += payload[payload.length - 1].serialize().length;
		}
		return new NormalPacket(payload);
	}
}