import { ModalContext } from "@context/ContextModal";
import { useContext } from "react";
import IconO from "@assets/icon-o.svg";
import IconX from "@assets/icon-x.svg";
import IconOOutline from "@assets/icon-o-outline.svg";
import IconXOutline from "@assets/icon-x-outline.svg";
import { ISquareState } from "../../../server/src/entities/Square";


interface ObjectCheckWinner {
    gameBoard: ISquareState[];
    setGameBoard: React.Dispatch<React.SetStateAction<ISquareState[]>>;
}

export function useWin() {
    const modal = useContext(ModalContext);

    const setModal = (
        invertTurn: string,
        // pickPlayer: string,
        // typeGame: string,
        isTie = false
    ) => {
        if (isTie) {
            modal?.setModal({
                showModal: true,
                title: "round tied",
                message: {
                    text: "",
                    img: "",
                    color: "",
                },
                btnYellow: "next round",
                btnGray: "quit",
                isNextRound: false,
            });

            return;
        }

        modal?.setModal({
            showModal: true,
            title:
                invertTurn === 'X'
                    ? "player 1 wins!"
                    : "player 2 wins!",
            message: {
                text: "takes the round",
                img: invertTurn === "O" ? IconO : IconX,
                color: invertTurn === "O" ? "text-yellow-400" : "text-blue-400",
            },
            btnYellow: "next round",
            btnGray: "quit",
            isNextRound: false,
        });
    };

    const newTickTacToeColor = (
        ticTacToe: ISquareState[],
        pickPlayer: string,
        position: number[] = []
    ): ISquareState[] => {
        return ticTacToe.map((item, id) => {
            if (position.includes(id)) {
                return {
                    ...item,
                    icon:
                        item.value === pickPlayer
                            ? pickPlayer === "X"
                                ? IconXOutline
                                : IconOOutline
                            : item.icon,
                    isWinner: item.value === pickPlayer ? pickPlayer : "",
                };
            }

            return item;
        });
    };

    // TODO move this logic server side
    const win = (
        invertTurn: string,
        filterTurn: number[],
        gameBoard: ISquareState[],
        setGameBoard: React.Dispatch<React.SetStateAction<ISquareState[]>>
    ): string => {
        if (filterTurn.length >= 3) {
            if (
                filterTurn.includes(0) &&
                filterTurn.includes(1) &&
                filterTurn.includes(2)
            ) {
                const newTicTacToe = newTickTacToeColor(
                    gameBoard,
                    invertTurn,
                    [0, 1, 2]
                );
                setGameBoard(newTicTacToe);

                setModal(invertTurn);
                return invertTurn;
            }
            if (
                filterTurn.includes(3) &&
                filterTurn.includes(4) &&
                filterTurn.includes(5)
            ) {
                const newTicTacToe = newTickTacToeColor(
                    gameBoard,
                    invertTurn,
                    [3, 4, 5]
                );
                setGameBoard(newTicTacToe);

                setModal(invertTurn);
                return invertTurn;
            }

            if (
                filterTurn.includes(6) &&
                filterTurn.includes(7) &&
                filterTurn.includes(8)
            ) {
                const newTicTacToe = newTickTacToeColor(
                    gameBoard,
                    invertTurn,
                    [6, 7, 8]
                );
                setGameBoard(newTicTacToe);

                setModal(invertTurn);
                return invertTurn;
            }

            if (
                filterTurn.includes(0) &&
                filterTurn.includes(3) &&
                filterTurn.includes(6)
            ) {
                const newTicTacToe = newTickTacToeColor(
                    gameBoard,
                    invertTurn,
                    [0, 3, 6]
                );
                setGameBoard(newTicTacToe);

                setModal(invertTurn);
                return invertTurn;
            }

            if (
                filterTurn.includes(1) &&
                filterTurn.includes(4) &&
                filterTurn.includes(7)
            ) {
                const newTicTacToe = newTickTacToeColor(
                    gameBoard,
                    invertTurn,
                    [1, 4, 7]
                );
                setGameBoard(newTicTacToe);

                setModal(invertTurn);
                return invertTurn;
            }

            if (
                filterTurn.includes(2) &&
                filterTurn.includes(5) &&
                filterTurn.includes(8)
            ) {
                const newTicTacToe = newTickTacToeColor(
                    gameBoard,
                    invertTurn,
                    [2, 5, 8]
                );
                setGameBoard(newTicTacToe);

                setModal(invertTurn);
                return invertTurn;
            }

            if (
                filterTurn.includes(0) &&
                filterTurn.includes(4) &&
                filterTurn.includes(8)
            ) {
                const newTicTacToe = newTickTacToeColor(
                    gameBoard,
                    invertTurn,
                    [0, 4, 8]
                );
                setGameBoard(newTicTacToe);

                setModal(invertTurn);
                return invertTurn;
            }

            if (
                filterTurn.includes(2) &&
                filterTurn.includes(4) &&
                filterTurn.includes(6)
            ) {
                const newTicTacToe = newTickTacToeColor(
                    gameBoard,
                    invertTurn,
                    [2, 4, 6]
                );
                setGameBoard(newTicTacToe);

                setModal(invertTurn);
                return invertTurn;
            }
        }

        if (filterTurn.length === 5) {
            setModal(invertTurn, true);

            return "tie";
        }

        return "";
    };

    const checkWinner = (
        turn: string,
        {
            gameBoard,
            setGameBoard,
        }: ObjectCheckWinner
    ) => {
        const invertTurn = turn === "X" ? "O" : "X";

        // grab all the turns of the current player, and see if they won
        const filteredTurns: number[] = []
        const filterTurn = gameBoard.reduce((acc, curr, idx) => {
            if (curr.value === invertTurn) {
                acc.push(idx)
            }
            return acc
        }, filteredTurns)


        const playerWin = win(
            invertTurn,
            filterTurn,
            gameBoard,
            setGameBoard
        );

        if (playerWin === "X") {
            console.log("X is the winner!")
        }

        if (playerWin === "O") {
            console.log("O is the winner!")
        }

        if (playerWin === "tie") {
            console.log("Its a tie!")
        }

        return playerWin;
    };

    return { win, checkWinner };
}