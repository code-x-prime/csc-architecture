'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { Carousel, type CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { TextRoll } from '@/components/ui/text-roll'
import { cn } from '@/lib/utils'

const basisMobile: Record<number, string> = {
  2: 'basis-1/2',
  3: 'basis-1/3',
  4: 'basis-1/4',
  5: 'basis-1/5',
  6: 'basis-1/6',
}

const basisDesktop: Record<number, string> = {
  2: 'lg:basis-1/2',
  3: 'lg:basis-1/3',
  4: 'lg:basis-1/4',
  5: 'lg:basis-1/5',
  6: 'lg:basis-1/6',
}

export type LogoItem = { src: string; alt: string }

export type AnimatedCarouselProps<T = string | LogoItem> = {
  title?: string
  logos: T[]
  autoPlay?: boolean
  autoPlayInterval?: number
  containerClassName?: string
  titleClassName?: string
  carouselClassName?: string
  logoClassName?: string
  itemsPerViewMobile?: number
  itemsPerViewDesktop?: number
  spacing?: string
  padding?: string
  logoContainerWidth?: string
  logoContainerHeight?: string
  logoImageWidth?: string
  logoImageHeight?: string
  logoMaxWidth?: string
  logoMaxHeight?: string
  /** Custom slide renderer — use to render non-image content (e.g. text badges) instead of a logo image. */
  renderItem?: (item: T, index: number) => ReactNode
}

export function AnimatedCarousel<T = string | LogoItem>({
  title = 'Trusted by thousands of businesses worldwide',
  logos,
  autoPlay = true,
  autoPlayInterval = 4000,
  containerClassName = '',
  titleClassName = '',
  carouselClassName = '',
  logoClassName = '',
  itemsPerViewMobile = 4,
  itemsPerViewDesktop = 6,
  spacing = 'gap-10',
  padding = 'py-20 lg:py-40',
  logoContainerWidth = 'w-48',
  logoContainerHeight = 'h-24',
  logoImageWidth = 'w-full',
  logoImageHeight = 'h-full',
  logoMaxWidth = '',
  logoMaxHeight = '',
  renderItem,
}: AnimatedCarouselProps<T>) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api || !autoPlay) return

    const timer = setTimeout(() => {
      if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        setCurrent(0)
        api.scrollTo(0)
      } else {
        api.scrollNext()
        setCurrent(current + 1)
      }
    }, autoPlayInterval)

    return () => clearTimeout(timer)
  }, [api, current, autoPlay, autoPlayInterval])

  const logoImageSizeClasses = `${logoImageWidth} ${logoImageHeight} ${logoMaxWidth} ${logoMaxHeight}`.trim()

  return (
    <div className={cn('bg-background w-full', padding, containerClassName)}>
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className={cn('flex flex-col', spacing)}>
          <h2 className={cn('text-foreground ml-2 text-left text-xl font-medium tracking-tighter md:text-3xl lg:max-w-xl lg:text-5xl', titleClassName)}>
            <TextRoll>{title}</TextRoll>
          </h2>

          <Carousel setApi={setApi} className={cn('w-full', carouselClassName)}>
            <CarouselContent>
              {logos.map((logo, index) => (
                <CarouselItem
                  key={index}
                  className={cn(basisMobile[itemsPerViewMobile] ?? 'basis-1/4', basisDesktop[itemsPerViewDesktop] ?? 'lg:basis-1/6')}
                >
                  <div
                    className={cn(
                      'hover:bg-accent flex items-center justify-center rounded-md p-4 transition-colors',
                      logoContainerWidth,
                      logoContainerHeight,
                      logoClassName,
                    )}
                  >
                    {renderItem ? (
                      renderItem(logo, index)
                    ) : (
                      <img
                        src={typeof logo === 'string' ? logo : (logo as LogoItem).src}
                        alt={typeof logo === 'string' ? `Logo ${index + 1}` : (logo as LogoItem).alt}
                        className={cn('object-contain', logoImageSizeClasses)}
                      />
                    )}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  )
}
