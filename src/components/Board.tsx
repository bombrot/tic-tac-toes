import { useEffect, useState } from "react";
import Square from "./Square";
import minimax from '../minimax.ts'
import t1 from '../assets/toes/t1.jpg'
import t2 from '../assets/toes/t2.jpg'
import t3 from '../assets/toes/t3.jpg'
import t4 from '../assets/toes/t4.jpg'
import t5 from '../assets/toes/t5.jpg'
import t6 from '../assets/toes/t6.jpg'
import t7 from '../assets/toes/t7.jpg'
import t8 from '../assets/toes/t8.jpg'
import t9 from '../assets/toes/t9.jpg'

export default function Board({ setStatus, player, setIsGameOver }: { setStatus: (s: string) => void; player: string, setIsGameOver: (s: boolean) => void }) {
  const [ai, setAI] = useState(false)
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [toes, setToes] = useState([t1, t2, t3, t4, t5, t6, t7, t8, t9])
  const [winLine, setWinLine] = useState<number[] | null>(null)
  useEffect(() => {
    setToes(shuffle(toes.slice()))
    if (player === 'o') {
      setAI(true)
    }
  }, [])

  function getOpponent() {
    return player === 'x' ? 'o' : 'x'
  }

  function handleClick(i: number) {
    if (ai) return
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice()
    nextSquares[i] = player
    setSquares(nextSquares)
    setAI(true)
  }
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    if (ai) {
      timer = setTimeout(() => {
        cMove()
        setAI(false)
      }, 250)
    }
    return () => clearTimeout(timer)
  }, [ai])

  function cMove() {
    const next = squares.slice()
    const m = minimax.getMove([...squares], getOpponent(), player)
    next[m] = getOpponent()
    setSquares(next)
  }

  useEffect(() => {
    const winner = calculateWinner(squares);
    let timer: ReturnType<typeof setTimeout>
    let status;
    if (winner) {
      timer = setTimeout(() => {
        status = winner
        setStatus(status)
        setIsGameOver(true)
      }, 1500)
    }
    return () => clearTimeout(timer)

  }, [squares])

  function shuffle<T>(array: T[]): T[] {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  };


  function calculateWinner(squares: string[]) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        setWinLine([a, b, c])
        return '"' + squares[a].toUpperCase() + '"' + ' TAKES THE ROUND';
      }
    }
    if (squares.every(s => s !== null)) {
      setWinLine([0, 1, 2, 3, 4, 5, 6, 7, 8])
      return 'ROUND TIED'
    }
    return null;
  }

  return (
    <>
      <div className="grid">
        <div className="row">
          <Square win={winLine?.includes(0)} img={toes[0]} value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square win={winLine?.includes(1)} img={toes[1]} value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square win={winLine?.includes(2)} img={toes[2]} value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="row">
          <Square win={winLine?.includes(3)} img={toes[3]} value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square win={winLine?.includes(4)} img={toes[4]} value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square win={winLine?.includes(5)} img={toes[5]} value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="row">
          <Square win={winLine?.includes(6)} img={toes[6]} value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square win={winLine?.includes(7)} img={toes[7]} value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square win={winLine?.includes(8)} img={toes[8]} value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
    </>
  )
}
