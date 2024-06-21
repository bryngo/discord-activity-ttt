import { useContext } from 'react'

import { Player } from '@components/Player'
import { GameBoard } from '@components/board/GameBoard';

import { GameBoardContext } from '@hooks/useTicTacToe';
import { usePlayers } from '@hooks/usePlayers'



export function Game() {
    const players = usePlayers()
    const { winner } = useContext(GameBoardContext)

    return (
        <>
            <section className="bg-slate-600 px-60 h-screen w-full flex flex-col justify-center items-center">
                {
                    winner ? (
                        <>
                            <h1>Winner is {winner}</h1>
                        </>
                    ) : <></>
                }
                <GameBoard></GameBoard>

                <div className="grid grid-cols-3 gap-4">
                    {players.map((p) => (
                        <Player key={p.userId} {...p} />
                    ))}
                </div>

            </section>
        </>
    )
}
