import udp = require("dgram");
import { HelloPacket } from "./packet/hello";
import { Version } from "./version";

const client: udp.Socket = udp.createSocket("udp4");

client.connect(22023, "na.mm.among.us", () => {
	console.log(`Connected to ${client.remoteAddress().address}:${client.remoteAddress().port}`);

	client.send(new HelloPacket(1, 1, Version.to_number(2021, 6, 30, 0), "Martin").serialize());

	client.on("message", message => {
		console.log(`Message: ${message.toString("hex")}`);
	});

	client.on("error", error => {
		console.error(`Error: ${error}`);
	});

	client.on("close", () => {
		console.log("Connection closed");
	});
});