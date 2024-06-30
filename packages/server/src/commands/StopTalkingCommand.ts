import { Command } from "@colyseus/command";
import { TicTacToeRoom } from "../rooms/TicTacToeRoom";


type StopTalkingPayload = {
    sessionId: string
}

export default class StopTalkingCommand extends Command<TicTacToeRoom, StopTalkingPayload> {
    execute(data: StopTalkingPayload) {
        this.room.state.stopTalking(data.sessionId)
    }
}