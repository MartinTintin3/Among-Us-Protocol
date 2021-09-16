import Serializable from "../interfaces/Serializable";
import { byte, int32, uint16, uint32 } from "../types/numbers";
import IPv4 from "../utils/IPv4";

export default class GameList implements Serializable {
	public ip: IPv4;
	public port: uint16;
	public game_id: int32;
	public host_name: string;
	public player_count: byte;
	public age: uint32;
	public map_id: byte;
	public impostor_count: byte;
	public max_players: byte;

	public constructor(ip: IPv4, port: uint16, game_id: int32, host_name: string, player_count: byte, age: uint32, map_id: byte, impostor_count: byte, max_players: byte) {
		this.ip = ip;
		this.port = port;
		this.game_id = game_id;
		this.host_name = host_name;
		this.player_count = player_count;
		this.age = age;
		this.map_id = map_id;
		this.impostor_count = impostor_count;
		this.max_players = max_players;
	}

	public serialize(): Buffer {
		const buffer = Buffer.alloc(19 + this.host_name.length);
		buffer.copy(this.ip.serialize(), 0);
		buffer.writeUInt16LE(this.port, 4);
		buffer.writeInt32LE(this.game_id, 6);
		buffer.write(this.host_name, 10, "utf8");
		buffer.writeUInt8(this.player_count, 10 + this.host_name.length);
		buffer.writeUInt32LE(this.age, 11 + this.host_name.length);
		buffer.writeUInt8(this.map_id, 15 + this.host_name.length);
		buffer.writeUInt8(this.impostor_count, 16 + this.host_name.length);
		buffer.writeUInt8(this.max_players, 17 + this.host_name.length);
		return buffer;
	}
}