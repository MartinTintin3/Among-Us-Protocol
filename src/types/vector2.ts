import { lerp, alerp, clamp } from "../math";

export class Vector2 {
	public x: number;
	public y: number;

	public constructor(x: number, y: number) {
		this.x = clamp(0, 65535, x);
		this.y = clamp(0, 65535, y);
	}

	public copy(): Vector2 {
		return new Vector2(this.x, this.y);
	}

	public serialize(): Buffer {
		const buffer = Buffer.alloc(4);
		buffer.writeUInt16LE(lerp(0, 65535, alerp(-50, 50, this.x)), 0);
		buffer.writeUInt16LE(lerp(0, 65535, alerp(-50, 50, this.y)), 2);
		return buffer;
	}

	public static deserialize(data: Buffer | Vector2): Vector2 {
		if(data instanceof Vector2) {
			return new Vector2(lerp(-50, 50, clamp(0, 1, data.x / 65535)), lerp(-50, 50, clamp(0, 1, data.y / 65535)));
		} else {
			return new Vector2(lerp(-50, 50, clamp(0, 1, data.readUInt16LE(0) / 65535)), lerp(-50, 50, clamp(0, 1, data.readUInt16LE(2) / 65535)));
		}
	}

	public to_buffer(): Buffer {
		const buffer = Buffer.alloc(4);
		buffer.writeUInt16LE(this.x, 0);
		buffer.writeUInt16LE(this.y, 2);
		return buffer;
	}

	public static from_buffer(data: Buffer): Vector2 {
		return new Vector2(data.readUInt16LE(0), data.readUInt16LE(2));
	}

	public add(other: Vector2) {
		this.x += other.x;
		this.y += other.y;
	}

	public subtract(other: Vector2) {
		this.x -= other.x;
		this.y -= other.y;
	}

	public multiply(other: Vector2) {
		this.x *= other.x;
		this.y *= other.y;
	}

	public divide(other: Vector2) {
		this.x /= other.x;
		this.y /= other.y;
	}
}