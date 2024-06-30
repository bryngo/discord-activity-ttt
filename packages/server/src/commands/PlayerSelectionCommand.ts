import { Command } from '@colyseus/command'
import { Client } from 'colyseus'
import { TicTacToeRoom } from '../rooms/TicTacToeRoom'
import { Cell } from '../shared/TicTacToeTypes'

type PlayerSelectionPayload = {
    client: Client
    squareIdx: number
}

export default class PlayerSelectionCommand extends Command<TicTacToeRoom, PlayerSelectionPayload> {
    execute(data: PlayerSelectionPayload) {
        const { client, squareIdx } = data

        // TODO make this work when more than 2 players are in the room
        const cellValue = client.sessionId == this.state.player1 ? Cell.X : Cell.O

        // once this is ran, Colyseus will communicate the change back to the clients
        this.room.state.gameBoard[squareIdx] = cellValue
    }
}