import { Room, Client } from 'colyseus';
import { TPlayerOptions } from '../entities/Player';
import { Dispatcher } from '@colyseus/command';
import { TicTacToeState, ITicTacToeState } from '../entities/TicTacToeState';
import PlayerSelectionCommand from '../commands/PlayerSelectionCommand';
import StartTalkingCommand from '../commands/StartTalkingCommand';
import { Message } from '../shared/message'
import PlayerJoinedCommand from '../commands/PlayerJoinedCommand';
import StopTalkingCommand from '../commands/StopTalkingCommand';
import PlayerLeaveCommand from '../commands/PlayerLeaveCommand';

export class TicTacToeRoom extends Room<TicTacToeState> {
  maxClients = 1000;

  private dispatcher = new Dispatcher(this)

  onCreate(options: ITicTacToeState) {
    this.setState(new TicTacToeState(options));

    // Here's where we would add handlers for updating state
    this.onMessage('startTalking', (client, _data) => {
      this.dispatcher.dispatch(new StartTalkingCommand(), {
        sessionId: client.sessionId
      })
    });

    this.onMessage('stopTalking', (client, _data) => {
      this.dispatcher.dispatch(new StopTalkingCommand(), {
        sessionId: client.sessionId
      })
    });

    this.onMessage(Message.PlayerSelection, (client, message) => {
      this.dispatcher.dispatch(new PlayerSelectionCommand(), {
        client,
        squareIdx: message.squareIdx
      })
    })

    // this.onMessage('move', (client, _data) => {

    //   // TODO: update move validity logic
    //   const moveRequestData: MoveRequestData = { ..._data }

    //   this.state.updateBoard(moveRequestData.id, moveRequestData.value, moveRequestData.user_id)
    // })

  }

  onAuth(_client: any, _options: any, _req: any) {
    return true;
  }

  onJoin(client: Client, playerOptions: TPlayerOptions) {
    this.dispatcher.dispatch(new PlayerJoinedCommand(), {
      client,
      playerOptions
    })
  }

  onLeave(client: Client) {
    this.dispatcher.dispatch(new PlayerLeaveCommand(), {
      client
    })
  }

  onDispose() {
    console.log('Dispose TicTacToeRoom');
  }
}
