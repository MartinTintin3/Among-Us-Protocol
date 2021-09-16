import Serializable from "../interfaces/Serializable";

export default class Version implements Serializable {
	public year: number;
	public month: number;
	public day: number;
	public revision: number;

	public constructor(year: number, month: number, day: number, revision: number) {
		this.year = year;
		this.month = month;
		this.day = day;
		this.revision = revision;
	}

	public to_number(): number {
		return this.year * 25000 + this.month * 1800 + this.day * 50 + this.revision;
	}

	public serialize(): Buffer {
		const buffer = Buffer.alloc(4);
		buffer.writeUInt32LE(this.to_number());
		return buffer;
	}

	public static deserialize(buffer: Buffer): Version {
		return Version.from_number(buffer.readUInt32LE());
	}

	public static to_number(year: number, month: number, day: number, revision: number): number {
		return year * 25000 + month * 1800 + day * 50 + revision;
	}

	public static from_number(version: number): Version {
		return new Version(Math.floor(version / 25000), Math.floor((version %= 25000) / 1800), Math.floor((version %= 1800) / 50), version % 50);
	}
}