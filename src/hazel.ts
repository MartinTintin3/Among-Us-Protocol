export class HazelMessage {
	length: number;
	tag: number;
	payload: Buffer;

	constructor(length: number, tag: number, payload: Buffer) {
		this.length = length;
		this.tag = tag;
		this.payload = payload;
	}

	toBuffer(): Buffer {
		const buffer = Buffer.alloc(this.length);
		buffer.writeUInt16BE(this.length, 0);
		buffer.writeUInt8(this.tag, 2);
		this.payload.copy(buffer, 3);
		return buffer;
	}
}