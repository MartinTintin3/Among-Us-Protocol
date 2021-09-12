import { AckPacket } from "./packet/ack";

console.log(new AckPacket(7, 0xff).serialize());