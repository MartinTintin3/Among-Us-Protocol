import Serializable from "./interfaces/Serializable";
import { byte, uint16 } from "./types/numbers";

export default class HazelMessage implements Serializable {
	length: uint16;
	tag: byte;
	payload: Buffer | Serializable;

	constructor(tag: number, payload: Buffer) {
		this.length = payload.length;
		this.tag = tag;
		this.payload = payload;
	}

	public serialize(): Buffer {
		const buffer = Buffer.alloc(3 + this.length);
		buffer.writeUInt16BE(this.length, 0);
		buffer.writeUInt8(this.tag, 2);
		if(this.payload instanceof Buffer) {
			this.payload.copy(buffer, 3);
		} else if("serialize" in this.payload) {
			this.payload.serialize().copy(buffer, 3);
		}
		return buffer;
	}

	public static deserialize(buffer: Buffer): HazelMessage {
		const length = buffer.readUInt16BE(0);
		return new HazelMessage(buffer.readUInt8(2), buffer.length > 3 ? buffer.slice(3, 3 + length) : Buffer.alloc(0));
	}

	public get_payload_length(): number {
		if(this.payload instanceof Buffer) {
			return this.payload.length;
		} else if("serialize" in this.payload) {
			return this.payload.serialize().length;
		}
	}
}