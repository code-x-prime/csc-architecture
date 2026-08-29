'use client'

import { useState, useEffect, useRef, useMemo } from 'react'

const defaultCardImages = [
  '/images/process/assess.jpg',
  '/images/process/plan.jpg',
  '/images/process/execute.jpg',
  '/images/process/optimize.jpg',
]

const ASCII_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789(){}[]<>;:,._-+=!@#$%^&*|\\/\"'`~?"

const generateCode = (width: number, height: number): string => {
  let text = ''
  for (let i = 0; i < width * height; i++) {
    text += ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)]
  }
  let out = ''
  for (let i = 0; i < height; i++) {
    out += text.substring(i * width, (i + 1) * width) + '\n'
  }
  return out
}

const generateSeededCode = (width: number, height: number, seed: number): string => {
  let state = seed + 1
  const next = () => {
    state = (state * 1103515245 + 12345) & 0x7fffffff
    return state / 0x7fffffff
  }
  let text = ''
  for (let i = 0; i < width * height; i++) {
    text += ASCII_CHARS[Math.floor(next() * ASCII_CHARS.length)]
  }
  let out = ''
  for (let i = 0; i < height; i++) {
    out += text.substring(i * width, (i + 1) * width) + '\n'
  }
  return out
}

type ScannerCardStreamProps = {
  initialSpeed?: number
  direction?: -1 | 1
  cardImages?: string[]
  repeat?: number
  cardGap?: number
  friction?: number
  scanEffect?: 'clip' | 'scramble'
  cardLabels?: string[]
  cardWidth?: number
  cardHeight?: number
}

export function ScannerCardStream({
  initialSpeed = 130,
  direction = -1,
  cardImages = defaultCardImages,
  repeat = 6,
  cardGap = 60,
  friction = 0.95,
  scanEffect = 'scramble',
  cardLabels,
  cardWidth = 320,
  cardHeight = 200,
}: ScannerCardStreamProps) {
  const [isScanning, setIsScanning] = useState(false)

  const asciiCols = Math.max(1, Math.floor(cardWidth / 6.5))
  const asciiRows = Math.max(1, Math.floor(cardHeight / 13))

  const cards = useMemo(() => {
    const totalCards = cardImages.length * repeat
    return Array.from({ length: totalCards }, (_, i) => ({
      id: i,
      image: cardImages[i % cardImages.length],
      label: cardLabels?.[i % cardImages.length],
      ascii: generateSeededCode(asciiCols, asciiRows, i),
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardImages, repeat])

  const containerRef = useRef<HTMLDivElement>(null)
  const cardLineRef = useRef<HTMLDivElement>(null)
  const originalAscii = useRef(new Map<number, string>())

  const cardStreamState = useRef({
    position: 0,
    velocity: initialSpeed,
    direction,
    isDragging: false,
    lastPointerX: 0,
    lastTime: 0,
    cardLineWidth: (cardWidth + cardGap) * cards.length,
    friction,
    minVelocity: 30,
  })

  const scannerState = useRef({ isScanning: false })

  useEffect(() => {
    const container = containerRef.current
    const cardLine = cardLineRef.current
    if (!container || !cardLine) return

    cards.forEach((card) => originalAscii.current.set(card.id, card.ascii))

    let animationFrameId: number

    const runScrambleEffect = (element: HTMLElement, cardId: number) => {
      if (element.dataset.scrambling === 'true') return
      element.dataset.scrambling = 'true'
      const originalText = originalAscii.current.get(cardId) || ''
      let scrambleCount = 0
      const maxScrambles = 10
      const interval = setInterval(() => {
        element.textContent = generateCode(asciiCols, asciiRows)
        scrambleCount++
        if (scrambleCount >= maxScrambles) {
          clearInterval(interval)
          element.textContent = originalText
          delete element.dataset.scrambling
        }
      }, 30)
    }

    const updateCardEffects = () => {
      const containerWidth = container.offsetWidth
      const scannerX = containerWidth / 2
      const scannerWidth = 8
      const scannerLeft = scannerX - scannerWidth / 2
      const scannerRight = scannerX + scannerWidth / 2
      const containerRect = container.getBoundingClientRect()
      let anyCardIsScanning = false

      cardLine.querySelectorAll<HTMLElement>('.card-wrapper').forEach((wrapper, index) => {
        const rect = wrapper.getBoundingClientRect()
        const left = rect.left - containerRect.left
        const right = rect.right - containerRect.left
        const normalCard = wrapper.querySelector<HTMLElement>('.card-normal')!
        const asciiCard = wrapper.querySelector<HTMLElement>('.card-ascii')!
        const asciiContent = asciiCard.querySelector<HTMLElement>('pre')!

        if (left < scannerRight && right > scannerLeft) {
          anyCardIsScanning = true
          if (scanEffect === 'scramble' && wrapper.dataset.scanned !== 'true') {
            runScrambleEffect(asciiContent, index)
          }
          wrapper.dataset.scanned = 'true'
          const intersectLeft = Math.max(scannerLeft - left, 0)
          const intersectRight = Math.min(scannerRight - left, rect.width)
          normalCard.style.setProperty('--clip-right', `${(intersectLeft / rect.width) * 100}%`)
          asciiCard.style.setProperty('--clip-left', `${(intersectRight / rect.width) * 100}%`)
        } else {
          delete wrapper.dataset.scanned
          if (right < scannerLeft) {
            normalCard.style.setProperty('--clip-right', '100%')
            asciiCard.style.setProperty('--clip-left', '100%')
          } else {
            normalCard.style.setProperty('--clip-right', '0%')
            asciiCard.style.setProperty('--clip-left', '0%')
          }
        }
      })

      if (scannerState.current.isScanning !== anyCardIsScanning) {
        scannerState.current.isScanning = anyCardIsScanning
        setIsScanning(anyCardIsScanning)
      }
    }

    const getClientX = (e: MouseEvent | TouchEvent) => ('touches' in e ? (e.touches[0]?.clientX ?? 0) : e.clientX)

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      cardStreamState.current.isDragging = true
      cardStreamState.current.lastPointerX = getClientX(e)
      cardLine.style.cursor = 'grabbing'
    }

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!cardStreamState.current.isDragging) return
      const clientX = getClientX(e)
      const delta = clientX - cardStreamState.current.lastPointerX
      cardStreamState.current.position += delta
      cardStreamState.current.velocity = Math.min(Math.abs(delta) * 30, 900)
      cardStreamState.current.direction = delta >= 0 ? 1 : -1
      cardStreamState.current.lastPointerX = clientX
    }

    const handlePointerUp = () => {
      cardStreamState.current.isDragging = false
      cardLine.style.cursor = 'grab'
    }

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      const delta = e.deltaY !== 0 ? e.deltaY : e.deltaX
      cardStreamState.current.position -= delta
      cardStreamState.current.velocity = Math.min(Math.abs(delta) * 6 + 130, 900)
      cardStreamState.current.direction = delta >= 0 ? -1 : 1
    }

    cardLine.addEventListener('mousedown', handlePointerDown)
    window.addEventListener('mousemove', handlePointerMove)
    window.addEventListener('mouseup', handlePointerUp)
    cardLine.addEventListener('touchstart', handlePointerDown, { passive: true })
    window.addEventListener('touchmove', handlePointerMove, { passive: true })
    window.addEventListener('touchend', handlePointerUp)
    cardLine.addEventListener('wheel', handleWheel, { passive: false })

    const animate = (currentTime: number) => {
      if (cardStreamState.current.lastTime === 0) {
        cardStreamState.current.lastTime = currentTime
      }
      const rawDeltaTime = (currentTime - cardStreamState.current.lastTime) / 1000
      const deltaTime = Math.min(rawDeltaTime, 1 / 30)
      cardStreamState.current.lastTime = currentTime

      if (!cardStreamState.current.isDragging) {
        if (cardStreamState.current.velocity > cardStreamState.current.minVelocity) {
          cardStreamState.current.velocity *= cardStreamState.current.friction
        }
        cardStreamState.current.position += cardStreamState.current.velocity * cardStreamState.current.direction * deltaTime
      }

      const { position, cardLineWidth } = cardStreamState.current
      const containerWidth = container.offsetWidth
      if (position < -cardLineWidth) cardStreamState.current.position = containerWidth
      else if (position > containerWidth) cardStreamState.current.position = -cardLineWidth

      cardLine.style.transform = `translateX(${cardStreamState.current.position}px)`
      updateCardEffects()

      animationFrameId = requestAnimationFrame(animate)
    }
    animationFrameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId)
      cardLine.removeEventListener('mousedown', handlePointerDown)
      window.removeEventListener('mousemove', handlePointerMove)
      window.removeEventListener('mouseup', handlePointerUp)
      cardLine.removeEventListener('touchstart', handlePointerDown)
      window.removeEventListener('touchmove', handlePointerMove)
      window.removeEventListener('touchend', handlePointerUp)
      cardLine.removeEventListener('wheel', handleWheel)
    }
  }, [cards, cardGap, cardWidth, friction, scanEffect, asciiCols, asciiRows])

  return (
    <div ref={containerRef} className="csc-scanner relative h-[240px] w-full overflow-hidden sm:h-[280px] lg:h-[300px]">
      <style jsx>{`
        @keyframes csc-scan-glitch {
          0%,
          16%,
          50%,
          100% {
            opacity: 1;
          }
          15%,
          99% {
            opacity: 0.9;
          }
          49% {
            opacity: 0.8;
          }
        }
        .csc-scan-glitch {
          animation: csc-scan-glitch 0.15s infinite linear alternate-reverse;
        }

        @keyframes csc-scan-pulse {
          0% {
            opacity: 0.75;
            transform: scaleY(1);
          }
          100% {
            opacity: 1;
            transform: scaleY(1.03);
          }
        }
        .csc-scan-pulse {
          animation: csc-scan-pulse 1.5s infinite alternate ease-in-out;
        }
      `}</style>

      <div
        aria-hidden
        className={`pointer-events-none absolute top-1/2 left-1/2 z-10 h-full w-40 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl transition-opacity duration-500 ${
          isScanning ? 'opacity-100' : 'opacity-60'
        }`}
        style={{ background: 'radial-gradient(circle, rgba(22,135,181,0.55) 0%, transparent 70%)' }}
      />

      <div
        className="csc-scan-pulse pointer-events-none absolute top-1/2 left-1/2 z-20 h-full w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-b from-transparent via-primary to-transparent"
        style={{
          boxShadow: '0 0 10px rgba(22,135,181,0.9), 0 0 20px rgba(22,135,181,0.7), 0 0 32px rgba(22,135,181,0.5)',
        }}
      />

      <div className="absolute inset-0 flex items-center">
        <div ref={cardLineRef} className="flex cursor-grab items-center whitespace-nowrap select-none" style={{ gap: `${cardGap}px`, willChange: 'transform' }}>
          {cards.map((card) => (
            <div key={card.id} className="card-wrapper relative shrink-0" style={{ width: cardWidth, height: cardHeight }}>
              <div
                className="card-normal absolute top-0 left-0 z-2 h-full w-full overflow-hidden rounded-2xl bg-transparent shadow-[0_15px_40px_rgba(0,0,0,0.35)]"
                style={{ clipPath: 'inset(0 0 0 var(--clip-right, 0%))' }}
              >
                <img
                  src={card.image}
                  alt={card.label ?? ''}
                  className="h-full w-full object-cover transition-all duration-300 ease-in-out"
                  loading="lazy"
                  draggable={false}
                />
              </div>

              <div
                className="card-ascii bg-ink absolute top-0 left-0 z-1 h-full w-full overflow-hidden rounded-2xl"
                style={{ clipPath: 'inset(0 calc(100% - var(--clip-left, 0%)) 0 0)' }}
              >
                <pre
                  className="csc-scan-glitch text-primary m-0 box-border h-full w-full overflow-hidden p-0 text-left align-top font-mono text-[11px] leading-3 font-medium whitespace-pre"
                  style={{
                    textShadow: '0 0 6px rgba(22,135,181,0.9), 0 0 12px rgba(22,135,181,0.6)',
                    maskImage:
                      'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 30%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0.6) 80%, rgba(0,0,0,0.3) 100%)',
                  }}
                >
                  {card.ascii}
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
