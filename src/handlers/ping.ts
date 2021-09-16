import { PacketType } from "../enums";
import { Socket } from "dgram";
import PingPacket from "../packets/PingPacket";
import IHandler from "./Ihandler";
import AcknowledgementPacket from "../packets/AcknowledgementPacket";

export default class PingHandler implements IHandler {
	public static readonly type: PacketType = PacketType.PING;

	public static handle(client: Socket, packet: PingPacket): void {
		client.send(new AcknowledgementPacket(packet.nonce, 0xff).serialize());
	}
}