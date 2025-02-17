import { useEffect, useState } from 'react'
import './App.css'
import Board from './components/Board'

function App() {
  const [status, setStatus] = useState('')
  const [playerMark, setPlayerMark] = useState('o')

  const [isGameStarted, setIsGameStarted] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)

  function play() {
    setIsGameStarted(true)
  }
  useEffect(() => {
    let timer = 0
    if (isGameOver) {
      timer = setTimeout(() => {
        setIsGameOver(false)
      }, 1000)
    }
    return () => clearTimeout(timer)
  }, [isGameOver])

  return (
    <>
      <main>
        {!isGameStarted && <>
          <p className='info'>pick your mark</p>
          <div className='pick-mark'>
            <button onClick={() => setPlayerMark('x')} className={playerMark === 'x' ? 'pick-btn selected' : 'pick-btn'}>x</button>
            <button onClick={() => setPlayerMark('o')} className={playerMark === 'o' ? 'pick-btn selected' : 'pick-btn'}>o</button>
          </div>
          <p className='info'>x goes first</p>
          <button className='play-btn' onClick={play}>PLAY</button>
        </>
        }
        {isGameStarted && !isGameOver && <Board setStatus={setStatus} player={playerMark} setIsGameOver={setIsGameOver} />}
        {isGameOver && <div className='status'>{status}</div>}
      </main>
    </>
  )
}

export default App
