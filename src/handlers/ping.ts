import { PacketType } from "../enums";
import { Socket } from "dgram";
import PingPacket from "../packets/ping";
import IHandler from "./handler";
import AcknowledgementPacket from "../packets/acknowledgement";

export default class PingHandler implements IHandler {
	public static readonly packetType: PacketType = PacketType.PING;

	public static handle(client: Socket, packet: PingPacket): void {
		client.send(new AcknowledgementPacket(packet.nonce, 0xff).serialize());
	}
}