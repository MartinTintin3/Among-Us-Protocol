export class HazelMessage {
	length: number;
	tag: number;
	payload: Buffer;

	constructor(length: number, tag: number, payload: Buffer) {
		this.length = length;
		this.tag = tag;
		this.payload = payload;
	}
}