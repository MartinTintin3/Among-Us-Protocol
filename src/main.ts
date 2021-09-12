import * as udp from "dgram";
import * as fs from "fs";
import { PacketType } from "./enums";
import HelloPacket from "./packets/hello";
import { Version } from "./version";

const client: udp.Socket = udp.createSocket("udp4");

(async () => {
	for(const file of fs.readdirSync("./handlers")) {
		if(file.endsWith(".js") && file != "handler.js") {
			const handler = (await import(`./handlers/${file}`)).default;
			client.on("message", async message => {
				if(message.readUInt8(0) == handler.packetType) {
					const packet = (await import(`./packets/${PacketType[handler.packetType].toLowerCase()}`)).default;
					if(packet) {
						handler.handle(client, packet.deserialize(message));
					} else {
						console.error(`Packet ${PacketType[handler.packetType]} has not been implemented yet`);
					}
				}
			});
		}
	}

	client.connect(22023, "na.mm.among.us", () => {
		console.log(`Connected to ${client.remoteAddress().address}:${client.remoteAddress().port}`);
	
		client.send(new HelloPacket(1, 1, Version.to_number(2021, 6, 30, 0), "Martin").serialize());
	
		client.on("message", message => {
			const type: PacketType = message.readUInt8(0);
			if(PacketType[type] && ![PacketType.PING, PacketType.ACKNOWLEDGEMENT].includes(type)) {
				console.log(`Received packet of type ${PacketType[type]}, message: ${message.toString("hex", 1)}`);
			} else if(!PacketType[type]) {
				console.log(`Received unknown packet of type ${type}`);
			}
		});
	
		client.on("error", error => {
			console.error(`Error: ${error}`);
		});
	
		client.on("close", () => {
			console.log("Connection closed");
		});
	});
})();