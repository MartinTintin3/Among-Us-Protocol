import { byte, uint16 } from "./types/numbers";

export class HazelMessage {
	length: uint16;
	tag: byte;
	payload: Buffer;

	constructor(tag: number, payload: Buffer) {
		this.length = payload.length;
		this.tag = tag;
		this.payload = payload;
	}

	public serialize(): Buffer {
		const buffer = Buffer.alloc(this.length);
		buffer.writeUInt16BE(this.length, 0);
		buffer.writeUInt8(this.tag, 2);
		this.payload.copy(buffer, 3);
		return buffer;
	}

	public static deserialize(buffer: Buffer): HazelMessage {
		const length = buffer.readUInt16BE(0);
		return new HazelMessage(buffer.readUInt8(2), buffer.slice(3, length));
	}
}