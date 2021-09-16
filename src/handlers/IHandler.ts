import { PacketType } from "../enums";
import Packet from "../packets/Packet";
import { Socket } from "dgram";

export default class IHandler {
	public static readonly type: PacketType;
	public static handle(client: Socket, packet: Packet): void {
		throw new Error("Handler not implemented");
	}
}