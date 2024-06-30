import { GameBoardContext } from '@hooks/useTicTacToe';
import { useContext } from "react"
import { Btn } from '../shared/Btn'
import { Cell } from '../../../../server/src/shared/TicTacToeTypes';
import IconO from '@assets/icon-o.svg';
import IconX from '@assets/icon-x.svg';


export function GameBoard() {

    const { gameBoard, gameBoard2, handleSquareClick } = useContext(GameBoardContext)

    function getCellImage(value: number) {
        switch (value) {
            case Cell.Empty: {
                return ""
            }
            case Cell.X: {
                return IconX
            }
            case Cell.O: {
                return IconO
            }
        }
    }


    return (
        <>
            <section className="grid grid-cols-3 gap-5 w-[90%] mx-auto mb-10">
                {gameBoard2.map((value, id) => (
                    <div
                        key={id}
                        className="pb-2 bg-black-500 w-full h-[99px] rounded-md"
                        data-value={value}
                    >
                        <Btn
                            onClick={() => handleSquareClick(id)}
                            classCSS="bg-gray-800 rounded-md py-6 h-full w-full shadow-2xl"
                        >
                            <img src={getCellImage(value)} alt="" className="w-11 mx-auto" />
                        </Btn>
                    </div>
                ))}
            </section>
        </>
    )
}