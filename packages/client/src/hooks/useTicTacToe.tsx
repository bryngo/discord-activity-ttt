import React, { useContext, useEffect, useState, createContext, SetStateAction, Dispatch } from "react"
import { useTurn } from "./useTurn"
import { useWin } from "./useWin"
import { gameBoardInitialState } from "@helpers/gridGame"

import IconO from "@assets/icon-o.svg"
import IconX from "@assets/icon-x.svg"
import { useAuthenticatedContext } from '@hooks/useAuthenticatedContext';
import { ISquareState } from "../../../server/src/entities/Square"
import { Message } from "../../../server/src/shared/message"
import { Cell } from "../../../server/src/shared/TicTacToeTypes"


export interface MovePacket {
    value: string
    id: number
    user_id: string
}

interface TGameBoardContext {
    gameBoard: ISquareState[]
    gameBoard2: number[]
    setGameBoard: Dispatch<SetStateAction<ISquareState[]>>
    setGameBoard2: Dispatch<SetStateAction<number[]>>
    handleSquareClick: (id: number) => void
    winner: string
}

// ===== START GAME BOARD CONTEXT =====
export const GameBoardContext = createContext<TGameBoardContext>(
    {
        gameBoard: gameBoardInitialState,
        gameBoard2: [
            Cell.Empty, Cell.Empty, Cell.Empty,
            Cell.Empty, Cell.Empty, Cell.Empty,
            Cell.Empty, Cell.Empty, Cell.Empty,
        ],
        setGameBoard: () => { },
        setGameBoard2: () => { },
        handleSquareClick: () => { },
        winner: ""
    }
)

export function GameBoardContextProvider({ children }: { children: React.ReactNode }) {
    const ctx = useGameBoardContextSetup()
    return <GameBoardContext.Provider value={ctx}>{children}</GameBoardContext.Provider>
}

export function useGameBoard() {
    return useContext(GameBoardContext)
}

export function useGameBoardContextSetup() {

    const [gameBoard, setGameBoard] = useState<ISquareState[]>(gameBoardInitialState)
    const [gameBoard2, setGameBoard2] = useState<number[]>([
        Cell.Empty, Cell.Empty, Cell.Empty,
        Cell.Empty, Cell.Empty, Cell.Empty,
        Cell.Empty, Cell.Empty, Cell.Empty,
    ],)

    const [isTurnX, handleTurn] = useTurn();
    const { checkWinner } = useWin();
    const [winner, setWinner] = useState<string>("")

    const authenticatedContext = useAuthenticatedContext();

    // also have a hook 
    // authenticatedContext.room.state.players.onAdd(() => {
    //     console.log('new player: ', JSON.stringify(gameBoard, null, 2))
    // })

    authenticatedContext.room.state.gameBoard.onChange((square, key) => {

        let newBoard = [...gameBoard2]
        newBoard[key] = square
        setGameBoard2(newBoard)

    })

    // TODO delete me?
    authenticatedContext.room.state.board.onChange((square, key) => {

        let id = parseInt(key)

        const value = isTurnX ? "X" : "O"

        let newBoard = [...gameBoard]
        newBoard[id].value = value
        newBoard[id].icon = isTurnX ? IconX : IconO
        newBoard[id].userId = authenticatedContext.user.id

        setGameBoard(newBoard)
        handleTurn(!isTurnX)
    })

    // when a square is clicked, send the action over to the server, and allow the server to have the authority to handle moves 
    const handleSquareClick = (squareIdx: number) => {
        authenticatedContext.room.send(Message.PlayerSelection, { squareIdx })
        // authenticatedContext.room.send('move', moveData)
    }

    // on every turn switch, check if there's a winner
    useEffect(() => {
        let playerWin = checkWinner(isTurnX ? "X" : "O", {
            gameBoard,
            setGameBoard,
        });

        setWinner(playerWin)
    }, [isTurnX])

    return { gameBoard, setGameBoard, handleSquareClick, gameBoard2, setGameBoard2, winner }
}

// ===== END GAME BOARD CONTEXT =====
