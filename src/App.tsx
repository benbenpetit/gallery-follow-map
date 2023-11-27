import { useLenis } from '@studio-freight/react-lenis'
import { useEffect, useRef, useState } from 'react'
import './main.scss'

const getImageUrl = (x: string) => {
  return new URL(`/src/assets/img/${x}`, import.meta.url).href
}

const IMAGES = [
  {
    src: getImageUrl('1.jpg'),
    alt: 'Alt image',
  },
  {
    src: getImageUrl('2.jpg'),
    alt: 'Alt image',
  },
  {
    src: getImageUrl('3.jpg'),
    alt: 'Alt image',
  },
  {
    src: getImageUrl('4.jpg'),
    alt: 'Alt image',
  },
  {
    src: getImageUrl('5.jpg'),
    alt: 'Alt image',
  },
  {
    src: getImageUrl('1.jpg'),
    alt: 'Alt image',
  },
  {
    src: getImageUrl('2.jpg'),
    alt: 'Alt image',
  },
  {
    src: getImageUrl('3.jpg'),
    alt: 'Alt image',
  },
  {
    src: getImageUrl('4.jpg'),
    alt: 'Alt image',
  },
  {
    src: getImageUrl('5.jpg'),
    alt: 'Alt image',
  },
]

const App = () => {
  const lenis = useLenis()
  const reqFrame = useRef<number>(0)
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })
  const [isDragging, setIsDragging] = useState(false)
  const [startPos, setStartPos] = useState({
    y: 0,
    top: 0,
  })
  const [progress, setProgress] = useState(0)
  const mapHeight = IMAGES.length * 80 + IMAGES.length * 8 - 8
  const mapOffsetPercentage = (80 / mapHeight) * 100

  const handleMapItemClick = (i: number) => {
    lenis.scrollTo(windowDimensions.height * 0.8 * i + 24 * i)
  }

  useEffect(() => {
    const raf = (time: number) => {
      if (lenis) {
        lenis.raf(time)
        setProgress(lenis.progress)
      }
      reqFrame.current = requestAnimationFrame(raf)
    }

    reqFrame.current = requestAnimationFrame(raf)

    return () => cancelAnimationFrame(reqFrame.current)
  }, [lenis])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      const deltaY = e.clientY - startPos.y
      lenis.scrollTo(startPos.top - deltaY * 1.5)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [lenis, isDragging, startPos])

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      setStartPos({
        y: e.clientY,
        top: lenis.scroll,
      })
      setIsDragging(true)
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [lenis])

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <header>
        <h1>
          <a href="https://www.instagram.com/ioegreer/" target="_blank">
            ioegeer
          </a>
        </h1>
      </header>
      <main>
        <aside>
          <div
            className="map"
            style={{
              transform: `translate3d(0,  ${
                -mapOffsetPercentage / 2 -
                progress * (100 - mapOffsetPercentage)
              }%, 0)`,
            }}
          >
            {IMAGES.map((item, i) => (
              <div
                key={i}
                className="map__item"
                onClick={() => handleMapItemClick(i)}
              >
                <img src={item.src} alt={item.alt} draggable={false} />
              </div>
            ))}
          </div>
        </aside>
        <section>
          <div className="slider">
            {IMAGES.map((item, i) => (
              <div key={i} className="slider__item">
                <figure className="slider__figure">
                  <img src={item.src} alt={item.alt} draggable={false} />
                </figure>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}

export default App
