import { Schema, MapSchema, type, ArraySchema } from '@colyseus/schema';
import { TPlayerOptions, Player } from './Player';
import { Square } from './Square';
import { Cell } from '../shared/TicTacToeTypes'

// We have an interface here so that the schema is shareable with the client
// side code
export interface ITicTacToeState {
  players: MapSchema<Player>
  roomName: string
  channelId: string
  player1: string
  player2: string
  turn: number
  activePlayer: number
  board: MapSchema<Square> // DEPRECATED

  gameBoard: ArraySchema<number>
}

export class TicTacToeState extends Schema implements ITicTacToeState {
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

  @type('number')
  public activePlayer = 0

  @type({ map: Square })
  board = new MapSchema<Square>()

  @type(['number'])
  gameBoard: ArraySchema<number>;

  serverAttribute = 'this attribute wont be sent to the client-side';

  // Init
  constructor(attributes: ITicTacToeState) {
    super();
    this.roomName = attributes.roomName;
    this.channelId = attributes.channelId;
    this.player1 = ''
    this.player2 = ''
    this.turn = 0
    this.gameBoard = new ArraySchema(
      Cell.Empty, Cell.Empty, Cell.Empty,
      Cell.Empty, Cell.Empty, Cell.Empty,
      Cell.Empty, Cell.Empty, Cell.Empty,
    )
  }

  private _getPlayer(sessionId: string): Player | undefined {
    return Array.from(this.players.values()).find((p) => p.sessionId === sessionId);
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

  updateBoard(id: number, value: string, userId: string) {
    this.board.set(id.toString(), new Square({ value, userId, isWinner: "", icon: "" }))
  }

}
