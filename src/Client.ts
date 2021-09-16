import * as udp from "dgram";
import * as fs from "fs";
import { Bound, PacketType } from "./enums";
import HandlerManager from "./HandlerManager";
import IHandler from "./handlers/IHandler";
import PacketParser from "./PacketParser";
import HelloPacket from "./packets/HelloPacket";
import Version from "./utils/Version";

export default class Client {
	private connected: boolean = false;
	public readonly socket: udp.Socket = udp.createSocket("udp4");
	private readonly packet_parser: PacketParser = new PacketParser();
	private readonly handler_manager: HandlerManager = new HandlerManager();

	public constructor() {
		this.packet_parser.register_group("./packets");
		this.handler_manager.register_group("./handlers");
	}

	public async connect(host: string, port: number) {
		if(this.connected) this.socket.disconnect();
		this.socket.connect(22023, "na.mm.among.us", () => {
			this.connected = true;
			console.log(`Connected to ${this.socket.remoteAddress().address}:${this.socket.remoteAddress().port}`);
		
			this.socket.send(new HelloPacket(1, 1, Version.to_number(2021, 6, 30, 0), "Martin", Bound.SERVER).serialize());
		
			this.socket.on("message", async message => {
				const type: PacketType = message.readUInt8(0);
				if(PacketType[type] && ![PacketType.PING, PacketType.ACKNOWLEDGEMENT].includes(type)) {
					console.log(`Received packet of type ${PacketType[type]}(0x${message.readUInt8(0).toString(16)}), message: ${message.length > 1 ? message.toString("hex", 1) : "none"}`);
				} else if(!PacketType[type]) {
					console.log(`Received unknown packet of type ${message.readUInt8(0)}`);
				}
				const packet: any = this.packet_parser.parse(message, Bound.CLIENT);
				this.handler_manager.handle(this.socket, packet);
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
}