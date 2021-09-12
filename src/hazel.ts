export class HazelMessage {
	length: number;
	tag: number;
	payload: Buffer;

	constructor(length: number, tag: number, payload: Buffer) {
		this.length = length;
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
		return new HazelMessage(length, buffer.readUInt8(2), buffer.slice(3, length));
	}
}