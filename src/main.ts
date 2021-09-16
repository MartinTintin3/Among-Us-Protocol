import Client from "./Client";
/*for(const file of fs.readdirSync("./handlers")) {
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
}*/

new Client().connect("na.mm.among.us", 22023);