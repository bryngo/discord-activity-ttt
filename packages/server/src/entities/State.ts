import { Schema, MapSchema, type } from '@colyseus/schema';
import { TPlayerOptions, Player } from './Player';
import { Square } from './Square';

export interface IState {
  roomName: string;
  channelId: string;
}

export class State extends Schema {
  @type({ map: Player })
  players = new MapSchema<Player>();

  @type('string')
  public roomName: string;

  @type('string')
  public channelId: string;

  @type('string')
  public player1: string;

  @type('string')
  public player2: string;

  @type('number')
  public turn: number;

  @type({ map: Square })
  board = new MapSchema<Square>()

  serverAttribute = 'this attribute wont be sent to the client-side';

  // Init
  constructor(attributes: IState) {
    super();
    this.roomName = attributes.roomName;
    this.channelId = attributes.channelId;
    this.player1 = ''
    this.player2 = ''
    this.turn = 0
  }

  private _getPlayer(sessionId: string): Player | undefined {
    return Array.from(this.players.values()).find((p) => p.sessionId === sessionId);
  }

  createPlayer(sessionId: string, playerOptions: TPlayerOptions) {
    const existingPlayer = Array.from(this.players.values()).find((p) => p.sessionId === sessionId);
    if (existingPlayer == null) {
      this.players.set(playerOptions.userId, new Player({ ...playerOptions, sessionId }));
    }

    if (this.player1 == '') {
      this.player1 = sessionId
    } else if (this.player2 == '') {
      this.player2 = sessionId
    }
  }

  removePlayer(sessionId: string) {
    const player = Array.from(this.players.values()).find((p) => p.sessionId === sessionId);
    if (player != null) {
      this.players.delete(player.userId);
    }
  }

  startTalking(sessionId: string) {
    const player = this._getPlayer(sessionId);
    if (player != null) {
      player.talking = true;
    }
  }

  stopTalking(sessionId: string) {
    const player = this._getPlayer(sessionId);
    if (player != null) {
      player.talking = false;
    }
  }

  updateBoard(id: number, value: string, user_id: string) {
    this.board.set(id.toString(), new Square({ value, user_id }))
  }

}
