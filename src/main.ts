import * as udp from "dgram";
import { PacketType } from "./enums";
import { HelloPacket } from "./packet/hello";
import { Version } from "./version";

const client: udp.Socket = udp.createSocket("udp4");

client.connect(22023, "na.mm.among.us", () => {
	console.log(`Connected to ${client.remoteAddress().address}:${client.remoteAddress().port}`);

	client.send(new HelloPacket(1, 1, Version.to_number(2021, 6, 30, 0), "Martin").serialize());

	client.on("message", message => {
		const type: PacketType = message.readUInt8(0);
		if(PacketType[type]) {
			console.log(`Received packet of type ${PacketType[type]}, message: ${message.toString("hex", 1)}`);
		} else {
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