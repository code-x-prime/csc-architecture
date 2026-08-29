'use client'

import type { ReactNode, RefObject } from 'react'
import { motion, type Variants } from 'framer-motion'

const tags = {
  div: motion.div,
  span: motion.span,
  p: motion.p,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  a: motion.a,
  button: motion.button,
  figure: motion.figure,
} as const

export function TimelineContent({
  as = 'div',
  children,
  animationNum,
  timelineRef,
  customVariants,
  className,
  ...rest
}: {
  as?: keyof typeof tags
  children: ReactNode
  animationNum: number
  timelineRef?: RefObject<HTMLElement | null>
  customVariants: Variants
  className?: string
  [key: string]: unknown
}) {
  const MotionTag = tags[as] ?? motion.div

  return (
    <MotionTag
      custom={animationNum}
      variants={customVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
