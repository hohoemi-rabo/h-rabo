'use client'

import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import Icon from './Icon'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  variant?: 'default' | 'cyber' | 'neon' | 'glass'
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
  showCloseButton?: boolean
  className?: string
  overlayClassName?: string
}

export default function Modal({
  isOpen,
  onClose,
  children,
  title,
  size = 'md',
  variant = 'cyber',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  className = '',
  overlayClassName = ''
}: ModalProps) {
  // ESCキーでモーダルを閉じる
  useEffect(() => {
    if (!closeOnEscape) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, closeOnEscape, onClose])

  if (!isOpen) return null

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl', 
    xl: 'max-w-6xl',
    full: 'max-w-full mx-4'
  }

  const variants = {
    default: 'bg-dark-700 border border-dark-600',
    cyber: 'bg-dark-800/95 border border-neon-blue/50 shadow-neon backdrop-blur-sm',
    neon: 'bg-dark-700/90 border border-neon-purple shadow-glow backdrop-blur-md',
    glass: 'bg-dark-700/60 border border-dark-600/50 backdrop-blur-lg'
  }

  const modalContent = (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${overlayClassName}`}
      onClick={closeOnOverlayClick ? onClose : undefined}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-dark-900/80 backdrop-blur-sm" />
      
      {/* Modal */}
      <div 
        className={`
          relative w-full ${sizes[size]} rounded-lg ${variants[variant]}
          animate-fade-in animate-zoom-in
          ${className}
        `.replace(/\s+/g, ' ').trim()}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-dark-600">
            {title && (
              <h2 className="text-xl font-cyber font-semibold text-white">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-dark-600"
                aria-label="モーダルを閉じる"
              >
                <Icon name="close" size="sm" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  )

  // ポータルを使用してbody直下にレンダリング
  return typeof window !== 'undefined' 
    ? createPortal(modalContent, document.body)
    : null
}

// Modal subcomponents
export function ModalHeader({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  )
}

export function ModalTitle({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <h3 className={`text-lg font-cyber font-semibold text-white ${className}`}>
      {children}
    </h3>
  )
}

export function ModalContent({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`text-gray-300 ${className}`}>
      {children}
    </div>
  )
}

export function ModalFooter({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`flex items-center justify-end gap-3 mt-6 pt-4 border-t border-dark-600 ${className}`}>
      {children}
    </div>
  )
}

// Confirmation Modal
export interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: 'default' | 'danger'
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = '確認',
  message,
  confirmText = '確認',
  cancelText = 'キャンセル',
  variant = 'default'
}: ConfirmModalProps) {
  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" title={title}>
      <ModalContent>
        <p className="text-gray-300 mb-6">{message}</p>
      </ModalContent>
      <ModalFooter>
        <button
          onClick={onClose}
          className="px-4 py-2 text-gray-300 hover:text-white transition-colors rounded-lg border border-dark-600 hover:border-gray-500"
        >
          {cancelText}
        </button>
        <button
          onClick={handleConfirm}
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
            variant === 'danger' 
              ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg'
              : 'bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-neon hover:shadow-glow'
          }`}
        >
          {confirmText}
        </button>
      </ModalFooter>
    </Modal>
  )
}