import { Command } from '@colyseus/command'
import { Client } from 'colyseus'
import { TicTacToeRoom } from '../rooms/TicTacToeRoom'
import { TPlayerOptions, Player } from '../entities/Player'

type PlayerJoinedPayload = {
    client: Client
    playerOptions: TPlayerOptions
}

export default class PlayerJoinedCommand extends Command<TicTacToeRoom, PlayerJoinedPayload> {
    execute(data: PlayerJoinedPayload) {
        const { client, playerOptions } = data

        const existingPlayer = Array.from(this.state.players.values()).find((p) => p.sessionId === client.sessionId);
        if (existingPlayer == null) {
            this.room.state.players.set(playerOptions.userId, new Player({ ...playerOptions }));
        }

        // For now, only support 2 players
        if (this.room.state.player1 == '') {
            this.room.state.player1 = client.sessionId
        } else if (this.state.player2 == '') {
            this.room.state.player2 = client.sessionId
        }

    }
}