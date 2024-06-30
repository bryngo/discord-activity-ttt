import { Command } from "@colyseus/command";
import { TicTacToeRoom } from "../rooms/TicTacToeRoom";


type StartTalkingPayload = {
    sessionId: string
}

export default class StartTalkingCommand extends Command<TicTacToeRoom, StartTalkingPayload> {
    execute(data: StartTalkingPayload) {
        this.room.state.startTalking(data.sessionId)
    }
}