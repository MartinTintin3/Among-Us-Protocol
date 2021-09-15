import { DisconnectReason, PacketType } from "../enums";
import { HazelMessage } from "../HazelMessage";
import { byte } from "../types/numbers";
import Packet from "./packet";

export default class DisconnectPacket extends Packet {
	public static readonly type: PacketType = PacketType.DISCONNECT;
	public readonly forced: byte;
	public readonly reason: DisconnectReason;
	public readonly message?: string;

	public constructor(forced: byte, reason: DisconnectReason, message?: string) {
		super();
		this.forced = forced;
		this.reason = reason;
		this.message = message;
	}

	public serialize(): Buffer {
		const hazel_buffer = Buffer.alloc(1 + this.message ? this.message.length + 1 : 0);
		hazel_buffer.writeUInt8(this.reason, 0);
		if(this.message) {
			hazel_buffer.writeUInt8(this.message.length, 1);
			hazel_buffer.write(this.message, 2);
		}
		const hazel_message = new HazelMessage(0x00, hazel_buffer);
		const buffer: Buffer = Buffer.alloc(3);
		buffer.writeUInt8(DisconnectPacket.type, 0);
		buffer.writeUInt8(this.forced, 1);
		buffer.copy(hazel_message.serialize(), 3);
		return buffer;
	}
}