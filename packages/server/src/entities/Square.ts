import { Schema, type } from '@colyseus/schema'

export interface SquareState {
    value: string // "X" or "O"
    user_id: string // we keep track of who played this square so we don't apply the same move again when communicating back to clients
}

export class Square extends Schema {
    @type('string')
    public value: string

    @type('boolean')
    public isWinner: boolean

    @type('string')
    public user_id: string

    constructor(attributes: SquareState) {
        super()
        this.value = attributes.value
        this.user_id = attributes.user_id
        this.isWinner = false
    }
}