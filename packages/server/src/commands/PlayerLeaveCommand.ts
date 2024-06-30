import { Command } from '@colyseus/command'
import { Client } from 'colyseus'
import { TicTacToeRoom } from '../rooms/TicTacToeRoom'

type PlayerLeavePayload = {
    client: Client
}

export default class PlayerLeaveCommand extends Command<TicTacToeRoom, PlayerLeavePayload> {
    execute(data: PlayerLeavePayload) {
        const { client } = data
        const player = Array.from(this.state.players.values()).find((p) => p.sessionId === client.sessionId);
        if (player != null) {
            this.room.state.players.delete(player.userId);
        }
    }
}