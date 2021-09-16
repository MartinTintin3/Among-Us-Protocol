import { PacketType } from "../enums";
import Packet from "../packets/Packet";
import { Socket } from "dgram";
import { byte } from "../types/numbers";

export default class IHandler {
	public static readonly type: byte;

	public static handle(client: Socket, packet: Packet): void {
		throw new Error("Handler not implemented");
	}
}