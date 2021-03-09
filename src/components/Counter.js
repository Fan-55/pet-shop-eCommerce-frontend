import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(1)

  return (
    <div>
      <button
        onClick={() => {
          if (count <= 1) return
          setCount(count - 1)
        }}>
        <i className="fas fa-minus"></i>
      </button>
      {count}
      <button onClick={() => { setCount(count + 1) }}><i className="fas fa-plus"></i></button>
    </div>
  )
}