import { PacketType } from "../enums";
import Packet from "../packets/packet";
import { Socket } from "dgram";

export default class IHandler {
	public static readonly packetType: PacketType;
	public static handle(client: Socket, packet: Packet): void {
		throw new Error("Handler not implemented");
	}
}