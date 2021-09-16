import * as udp from "dgram";
import * as fs from "fs";
import { PacketType } from "./enums";
import IHandler from "./handlers/IHandler";
import HelloPacket from "./packets/HelloPacket";
import Packet from "./packets/Packet";
import { byte } from "./types/numbers";
import Version from "./utils/Version";

export default class Client {
	private connected: boolean = false;
	public readonly socket: udp.Socket = udp.createSocket("udp4");
	private readonly packet_map: Map<byte, typeof Packet> = new Map<byte, typeof Packet>();
	private readonly handlers: Array<typeof IHandler> = new Array<typeof IHandler>();

	public constructor() {
		for(const file of fs.readdirSync("./packets")) {
			if(file.endsWith(".ts") || file.endsWith(".js")) {
				const packet = require(`./packets/${file}`).default;
				this.register_packet(packet);
			}
		}
	}

	public async connect(host: string, port: number) {
		if(this.connected) this.socket.disconnect();
		this.socket.connect(22023, "na.mm.among.us", () => {
			this.connected = true;
			console.log(`Connected to ${this.socket.remoteAddress().address}:${this.socket.remoteAddress().port}`);
		
			this.socket.send(new HelloPacket(1, 1, Version.to_number(2021, 6, 30, 0), "Martin").serialize());
		
			this.socket.on("message", async message => {
				const type: PacketType = message.readUInt8(0);
				if(PacketType[type] && ![PacketType.PING, PacketType.ACKNOWLEDGEMENT].includes(type)) {
					console.log(`Received packet of type ${PacketType[type]}(0x${message.readUInt8(0).toString(16)}), message: ${message.length > 1 ? message.toString("hex", 1) : "none"}`);
				} else if(!PacketType[type]) {
					console.log(`Received unknown packet of type ${message.readUInt8(0)}`);
				}
				const packet: any = this.parse_packet(message);
				this.handlers.filter(handler => handler.type == packet.type).forEach(handler => handler.handle(this.socket, packet));
			});
		
			this.socket.on("error", error => {
				console.error(`Error: ${error}`);
			});
		
			this.socket.on("close", () => {
				this.connected = false;
				console.log("Connection closed");
			});
		});
	}

	public register_packet(packet: typeof Packet) {
		this.packet_map.set(packet.type, packet);
	}

	public deregister_packet(packet: typeof Packet) {
		this.packet_map.delete(packet.type);
	}

	public parse_packet(message: Buffer): Packet {
		return this.packet_map.get(message.readUInt8(0)).deserialize(message);
	}

	public register_handler(handler: typeof IHandler) {
		this.handlers.push(handler);
	}

	public deregister_handler(handler: typeof IHandler) {
		this.handlers.splice(this.handlers.indexOf(handler), 1);
	}
}