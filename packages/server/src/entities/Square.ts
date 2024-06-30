import { Schema, type } from '@colyseus/schema'

export interface ISquareState {
    value: string // "X" or "O"
    isWinner: string
    icon: string
    userId: string // we keep track of who played this square so we don't apply the same move again when communicating back to clients
}

export class Square extends Schema implements ISquareState {
    @type('string')
    public value: string

    @type('boolean')
    public isWinner: string

    @type('string')
    public icon: string

    @type('string')
    public userId: string

    constructor(attributes: ISquareState) {
        super()
        this.value = attributes.value
        this.userId = attributes.userId
        this.icon = attributes.icon
        this.isWinner = attributes.isWinner
    }
}