import { PacketType } from "../enums";
import { HazelMessage } from "../hazel";

export class ReliablePacket {
	public readonly type: PacketType = PacketType.RELIABLE;
	public readonly nonce: number;
	public readonly payloads: Array<HazelMessage>;

	constructor(nonce: number, payloads: Array<HazelMessage>) {
		this.nonce = nonce;
		this.payloads = payloads;
	}
}