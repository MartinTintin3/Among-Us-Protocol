import { Socket } from "dgram";
import { PacketType } from "../enums";
import IHandler from "./handler";

export default class DisconnectHandler implements IHandler {
	public static readonly packetType: PacketType = PacketType.DISCONNECT;

	public static handle(client: Socket, packet: )
}