import {SocketStream} from "@fastify/websocket";
import {Player} from "../../lib/types/GameType";

export class ConnectionService {
    constructor(
        private connections = new Map<Player["id"], Map<string, SocketStream>>
    ) {
    }

    persist (id : Player["id"], gameId : string,socket : SocketStream) : void {
        if(!this.connections.has(id)) {
            this.connections.set(id, new Map<string, SocketStream>())
        }
        this.connections.get(id)?.set(gameId, socket)
    }

    find (id : Player['id'], gameId : string) : SocketStream | undefined {
        return this.connections.get(id)?.get(gameId)
    }

    has(id: Player["id"], gameId : string) : boolean {
        return !!this.connections?.has(gameId)
    }

    remove (id : Player["id"], gameId : string) : void {
        this.connections.get(id)?.delete(gameId)
        if(this.connections.get(id)?.size === 0) {
            this.connections.delete(id)
        }
    }
}