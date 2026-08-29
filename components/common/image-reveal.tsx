'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export function ImageReveal({
  src,
  alt,
  className,
  aspect = 'aspect-[4/3]',
}: {
  src: string
  alt: string
  className?: string
  aspect?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={cn('bg-muted relative overflow-hidden', aspect, className)}
    >
      <img src={src} alt={alt} className="size-full object-cover" />
    </motion.div>
  )
}
