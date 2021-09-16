import IHandler from "./handlers/IHandler";
import * as fs from "fs";
import * as udp from "dgram";
import Packet from "./packets/Packet";

export default class HandlerManager {
	private readonly handlers: Array<typeof IHandler> = new Array<typeof IHandler>();

	public register_group(path: string): void {
		for(const file of fs.readdirSync(path)) {
			if(!file.startsWith(IHandler.name) && (file.endsWith(".ts") || file.endsWith(".js"))) {
				const handler = require(`./${path}/${file}`).default;
				this.register_handler(handler);
			}
		}
	}

	public register_handler(handler: typeof IHandler): void {
		this.handlers.push(handler);
	}

	public deregister_handler(handler: typeof IHandler): void {
		if(this.handlers.indexOf(handler) > -1) this.handlers.splice(this.handlers.indexOf(handler), 1);
	}

	public handle(socket: udp.Socket, packet: Packet): void {
		this.handlers.filter(handler => handler.type == packet.type).forEach(handler => handler.handle(socket, packet));
	}
}