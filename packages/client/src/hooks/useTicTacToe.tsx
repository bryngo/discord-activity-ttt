import React, { useContext, useEffect, useState, createContext, SetStateAction, Dispatch } from "react"
import { useTurn } from "./useTurn"
import { useWin } from "./useWin"
import { TGameBoardBlock, gameBoardInitialState } from "@helpers/gridGame"

import IconO from "@assets/icon-o.svg"
import IconX from "@assets/icon-x.svg"
import { useAuthenticatedContext } from '@hooks/useAuthenticatedContext';


export interface MovePacket {
    value: string
    id: number
    user_id: string
}

interface TGameBoardContext {
    gameBoard: TGameBoardBlock[]
    setGameBoard: Dispatch<SetStateAction<TGameBoardBlock[]>>
    handleSquareClick: (id: number) => void
    winner: string
}

// ===== START GAME BOARD CONTEXT =====
export const GameBoardContext = createContext<TGameBoardContext>(
    {
        gameBoard: gameBoardInitialState,
        setGameBoard: () => { },
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

    const [gameBoard, setGameBoard] = useState<TGameBoardBlock[]>(gameBoardInitialState)
    const [isTurnX, handleTurn] = useTurn();
    const { checkWinner } = useWin();
    const [winner, setWinner] = useState<string>("")

    const authenticatedContext = useAuthenticatedContext();

    authenticatedContext.room.state.board.onChange((square, key) => {

        let id = parseInt(key)

        const value = isTurnX ? "X" : "O"

        let newBoard = [...gameBoard]
        newBoard[id].value = value
        newBoard[id].icon = isTurnX ? IconX : IconO

        setGameBoard(newBoard)
        handleTurn(!isTurnX)
    })

    // when a square is clicked, send the action over to the server, and allow the server to have the authority to handle moves 
    const handleSquareClick = (id: number) => {
        const moveData: MovePacket = {
            id,
            value: isTurnX ? "X" : "O",
            user_id: authenticatedContext.user.id
        }

        authenticatedContext.room.send('move', moveData)
    }

    // on every turn switch, check if there's a winner
    useEffect(() => {
        let playerWin = checkWinner(isTurnX ? "X" : "O", {
            gameBoard,
            setGameBoard,
        });

        setWinner(playerWin)
    }, [isTurnX])

    return { gameBoard, setGameBoard, handleSquareClick, winner }
}

// ===== END GAME BOARD CONTEXT =====
