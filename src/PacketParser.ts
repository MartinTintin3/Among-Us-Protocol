import Packet from "./packets/Packet";
import * as fs from "fs";
import { byte } from "./types/numbers";

export default class PacketParser {
	private readonly packets: Map<byte, typeof Packet> = new Map<byte, typeof Packet>();

	public register_group(path: string): void {
		for(const file of fs.readdirSync(path)) {
			if((file.endsWith(".ts") || file.endsWith(".js"))) {
				const packet = require(`${path}/${file}`).default;
				this.register_packet(packet);
			}
		}
	}

	public register_packet(packet: typeof Packet): void {
		this.packets.set(packet.type, packet);
	}

	public deregister_packet(packet: typeof Packet): void {
		this.packets.delete(packet.type);
	}

	public get_packet(type: byte): typeof Packet {
		return this.packets.get(type);
	}

	public parse(data: Buffer): Packet {
		const type = data.readUInt8(0);
		const packet = this.packets.get(type);
		if(!packet) {
			throw new Error(`Unknown packet type ${type}`);
		}
		return packet.deserialize(data);
	}
}