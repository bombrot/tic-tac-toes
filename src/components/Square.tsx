export default function Square({ win, img, value, onSquareClick }: { win: boolean | undefined; img: string; value: string | null; onSquareClick: () => void }) {

  return <button className={win ? 'square win' : 'square'} onClick={onSquareClick}>
    <img className={value ? 'show' : ''} src={img} />
  </button>
}
