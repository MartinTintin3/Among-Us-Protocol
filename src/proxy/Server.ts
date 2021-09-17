import { uint16 } from "../types/numbers";
import IPv4 from "../utils/IPv4";

export default interface Server {
	ip: IPv4;
	port: uint16;
}