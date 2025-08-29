'use client'

import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import type * as React from 'react'
import { cn } from '@/lib/utils'
import { type GlassThickness, Material } from './material'
import { Text } from './text'

export type HeaderConfig = {
  /** @default true */
  headerShown?: boolean
  headerLeft?: React.ReactNode | (() => React.ReactNode)
  headerRight?: React.ReactNode | (() => React.ReactNode)
  title?: string
}

// Types for Stack Navigator
export type StackScreenProps = {
  name: string
}

export type StackProps = {
  children: React.ReactNode
  material?: boolean | { thickness?: GlassThickness }
  className?: string
  windowControls?: boolean
  options?: HeaderConfig
}

const DEFAULT_OPTIONS: HeaderConfig = {
  headerShown: true,
  headerLeft: null,
  headerRight: null,
  title: undefined,
}

// Stack Navigator Component
const Stack = ({
  children,
  material = true,
  className,
  options,
  windowControls = true,
}: StackProps) => {
  const { headerShown, headerLeft, headerRight, title } = { ...DEFAULT_OPTIONS, ...options }

  const body = (
    <div className={cn('flex h-full min-h-[max(300px,60dvh)] flex-col', className)}>
      {/* Header */}
      {headerShown && (
        <div className={cn('relative z-10 flex items-center justify-between px-4 py-3')}>
          <div className="flex min-w-[64px] items-center justify-start">
            {typeof headerLeft === 'function' ? headerLeft() : headerLeft}
          </div>
          <div className="flex-1 text-center">
            <Text size="largeTitle">{title}</Text>
          </div>
          <div className="flex min-w-[64px] items-center justify-end">
            {typeof headerRight === 'function' ? headerRight() : headerRight}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative flex-1">{children}</div>
    </div>
  )

  const thickness = typeof material === 'object' ? material.thickness : 'normal'

  return (
    <div className="relative">
      {material ? <Material thickness={thickness}>{body}</Material> : body}
      {windowControls && <WindowControls />}
    </div>
  )
}

// Window Controls Component (Vision OS style)
const WindowControls = () => {
  const { push } = useRouter()

  return (
    <motion.div
      className="group/controls absolute inset-x-0 bottom-[-37px] z-50 mx-auto inline-flex h-[37px] w-[212px] shrink-0 items-center justify-start gap-4 pt-[22px] pr-[28px] pb-px"
      layout
      layoutId="navigation-bar"
      role="toolbar"
      aria-label="Window controls"
    >
      <button
        onClick={() => push('/')}
        className={cn(
          'h-[37px] w-[37px]',
          'group/close-btn',
          'peer/close-btn',
          'flex items-center justify-center',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
          'rounded-full'
        )}
        aria-label="Close window"
        title="Go to home"
        type="button"
      >
        <span
          className={cn(
            'pointer-events-none',
            'size-3.5 rounded-[100px] bg-white/30 backdrop-blur-[20px]',
            'transition-all duration-300',
            'flex items-center justify-center',
            'group-hover/close-btn:size-6 group-hover/close-btn:bg-white/100',
            'group-active/close-btn:size-4 group-active/close-btn:bg-white/100',
            'group-focus-visible/close-btn:size-6 group-focus-visible/close-btn:bg-white/100'
          )}
        >
          <svg
            className="size-3.5 text-[#333] opacity-0 group-hover/close-btn:size-3 group-hover/close-btn:opacity-100 group-focus-visible/close-btn:size-3 group-focus-visible/close-btn:opacity-100"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </span>
      </button>
      <div
        className={cn(
          'relative h-3.5 w-[136px] rounded-[100px] bg-white/30 backdrop-blur-[20px]',
          'transition-all duration-300',
          'peer-hover/close-btn:ml-[10px] peer-hover/close-btn:w-[126px] peer-hover/close-btn:bg-white/50',
          'peer-focus-visible/close-btn:ml-[10px] peer-focus-visible/close-btn:w-[126px] peer-focus-visible/close-btn:bg-white/50'
        )}
        aria-hidden="true"
      />
    </motion.div>
  )
}

export { Stack }
