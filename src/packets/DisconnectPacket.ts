import { Bound, DisconnectReason, PacketType } from "../enums";
import HazelMessage from "../HazelMessage";
import { byte } from "../types/numbers";
import Packet from "./Packet";

export default class DisconnectPacket extends Packet {
	public static readonly type: PacketType = PacketType.DISCONNECT;
	public readonly forced: byte;
	public readonly reason: DisconnectReason;
	public readonly message: string;

	public constructor(bound: Bound, forced?: byte, reason?: DisconnectReason, message?: string) {
		super(DisconnectPacket.type, bound);
		this.forced = forced;
		this.reason = reason;
		this.message = message;
	}

	public serialize(): Buffer {
		if(this.forced == undefined) {
			const buffer = Buffer.alloc(1);
			buffer.writeUInt8(DisconnectPacket.type, 0);
			return buffer;
		}
		const hazel_buffer = Buffer.alloc(1 + this.message ? this.message.length + 1 : 0);
		hazel_buffer.writeUInt8(this.reason, 0);
		if(this.message) {
			hazel_buffer.writeUInt8(this.message.length, 1);
			hazel_buffer.write(this.message, 2);
		}
		const hazel_message = new HazelMessage(0x00, hazel_buffer);
		const buffer: Buffer = Buffer.alloc(3);
		buffer.writeUInt8(DisconnectPacket.type, 0);
		if(this.forced != undefined) buffer.writeUInt8(this.forced, 1);
		buffer.copy(hazel_message.serialize(), 3);
		return buffer;
	}

	public static deserialize(data: Buffer, bound: Bound): DisconnectPacket {
		if(data.length == 1) return new DisconnectPacket(bound);
		const hazel_message = HazelMessage.deserialize(data.slice(3));
		const message = hazel_message.payload.length > 0 ? hazel_message.payload.toString("utf8", 1) : undefined;
		return new DisconnectPacket(bound, data.length > 1 ? data.readUInt8(1) : undefined, data.readUInt8(2), message);
	}
}