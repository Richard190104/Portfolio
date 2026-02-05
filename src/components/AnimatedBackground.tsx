import { useMemo, useEffect, useRef } from 'react'
import './AnimatedBackground.css'
import useMousePosition from './MousePosition'

export default function AnimatedBackground() {
  const mousePosition = useMousePosition()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePositionRef = useRef(mousePosition)
  
  const stars = useMemo(() => {
    return [...Array(300)].map((_, i) => {
      const x = Math.random() * window.innerWidth
      const y = Math.random() * window.innerHeight
      return {
        id: i,
        x: x,
        y: y,
        left: `${x}px`,
        top: `${y}px`,
        animationDelay: `${Math.random() * 3}s`,
        width: `${Math.random() * 1 + 1}px`,
        height: `${Math.random() * 1 + 1}px`
      }
    })
  }, [])

  useEffect(() => {
    mousePositionRef.current = mousePosition
  }, [mousePosition])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }

    const context = canvas.getContext('2d')
    if (!context) {
      return
    }

    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    let animationId: number
    const linkRadius = 160

    const cursorRadius = 300

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height)

      context.lineWidth = 1

      const mouse = mousePositionRef.current
      if (mouse.x === null || mouse.y === null) {
        animationId = requestAnimationFrame(draw)
        return
      }

      const starElements = canvas.parentElement?.querySelectorAll('.star') ?? []
      const positions = Array.from(starElements).map((element) => {
        const rect = element.getBoundingClientRect()
        return {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2 - window.scrollY
        }
      })
      positions.push({ x: mouse.x, y: mouse.y })

      for (let i = 0; i < positions.length; i += 1) {
        const starA = positions[i]

        for (let j = i + 1; j < positions.length; j += 1) {
          const starB = positions[j]
          const dx = starA.x - starB.x
          const dy = starA.y - starB.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance <= linkRadius) {
            const distanceToCursorA = Math.hypot(starA.x - mouse.x, starA.y - mouse.y)
            const distanceToCursorB = Math.hypot(starB.x - mouse.x, starB.y - mouse.y)
            const cursorDistance = Math.min(distanceToCursorA, distanceToCursorB)

            if (cursorDistance <= cursorRadius) {
              const alpha = 1 - distance / linkRadius
              const cursorFade = 1 - cursorDistance / cursorRadius
              context.strokeStyle = `rgba(89, 165, 255, ${0.9 * alpha * cursorFade})`
              context.beginPath()
              context.moveTo(starA.x, starA.y)
              context.lineTo(starB.x, starB.y)
              context.stroke()
            }
          }
        }
      }

      animationId = requestAnimationFrame(draw)
    }

    animationId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', setCanvasSize)
    }
  }, [stars])
  return (
    <div className="animated-background">
      <canvas ref={canvasRef} className="connection-canvas"></canvas>
     
      <div className="stars">
        {stars.map((star) => (
          
            <div  
                key={star.id} 
                className="star" 
                style={{
                left: star.left,
                top: star.top,
                animationDelay: star.animationDelay,
                width: star.width,
                height: star.height,
                backgroundColor: Math.random() < 0.3 ? 'var(--red-color)' : 'var(--aqua-color)',
                }}
            ></div>
            
          
        ))}
      </div>
    </div>
  )
}
