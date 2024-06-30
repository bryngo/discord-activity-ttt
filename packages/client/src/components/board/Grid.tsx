import { Btn } from '../shared/Btn'

// export function Grid({
//     ticTacToe,
//     handleTicTacToe,
// }: {
//     ticTacToe: number[];
//     handleTicTacToe: (id: number) => void;
// }) {

//     return (
//         <>
//             <section className="grid grid-cols-3 gap-5 w-[90%] mx-auto mb-10">
//                 {ticTacToe.map(({ icon, value, isWinner }, id) => (
//                     <div
//                         key={id}
//                         className="pb-2 bg-black-500 w-full h-[99px] rounded-md"
//                         data-value={value}
//                     >
//                         <Btn
//                             onClick={() => !icon && handleTicTacToe(id)}
//                             classCSS={`${isWinner === "X"
//                                 ? "bg-blue-400"
//                                 : isWinner === "O"
//                                     ? "bg-yellow-400"
//                                     : "bg-gray-800"
//                                 } rounded-md py-6 h-full w-full shadow-2xl`}
//                         >
//                             <img src={icon} alt="" className="w-11 mx-auto" />
//                         </Btn>
//                     </div>
//                 ))}
//             </section>
//         </>
//     )
// }