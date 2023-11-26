import { useEffect, useState } from 'react'
import './main.scss'
import Lenis from '@studio-freight/lenis'

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
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })
  const [progress, setProgress] = useState(0)
  const mapHeight = IMAGES.length * 80 + IMAGES.length * 8 - 8
  const mapOffsetPercentage = 80 / mapHeight

  useEffect(() => {
    const lenis = new Lenis()

    const raf = (time: number) => {
      lenis.raf(time)
      setProgress(lenis.progress)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])

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
                mapOffsetPercentage - progress * 100
              }%, 0)`,
            }}
          >
            {IMAGES.map((item, i) => (
              <div key={i} className="map__item">
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
