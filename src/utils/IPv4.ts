import Serializable from "../interfaces/Serializable";
import { byte, uint32 } from "../types/numbers";

export default class IPv4 implements Serializable {
	public a: byte;
	public b: byte;
	public c: byte;
	public d: byte;

	public constructor(a: byte, b: byte, c: byte, d: byte) {
		this.a = a;
		this.b = b;
		this.c = c;
		this.d = d;
	}

	public serialize(): Buffer {
		const buffer = Buffer.alloc(4);
		buffer.writeUInt8(this.a, 0);
		buffer.writeUInt8(this.b, 1);
		buffer.writeUInt8(this.c, 2);
		buffer.writeUInt8(this.d, 3);
		return buffer;
	}

	public to_string(): string {
		return `${this.a}.${this.b}.${this.c}.${this.d}`;
	}

	public static deserialize(buffer: Buffer): IPv4 {
		return new IPv4(buffer.readUInt8(0), buffer.readUInt8(1), buffer.readUInt8(2), buffer.readUInt8(3));
	}

	public static from_string(ip: string): IPv4 {
		const [a, b, c, d] = ip.split(".");
		return new IPv4(parseInt(a), parseInt(b), parseInt(c), parseInt(d));
	}
}