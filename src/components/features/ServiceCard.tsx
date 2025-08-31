'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, Button, Icon } from '@/components/ui'

export interface ServiceCardProps {
  title: string
  description: string
  price: string
  features: string[]
  icon: string
  delay?: number
}

export default function ServiceCard({
  title,
  description,
  price,
  features,
  icon,
  delay = 0
}: ServiceCardProps) {
  return (
    <motion.div
      className="group relative h-full"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -10, scale: 1.02 }}
    >
      <Card variant="neon" className="relative h-full overflow-hidden bg-dark-800/90 border-neon-blue/30 hover:border-neon-blue hover:shadow-glow transition-all duration-500">
        {/* 背景グラデーション */}
        <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 via-transparent to-neon-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* 上部装飾ライン */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-neon-blue to-transparent opacity-50" />

        <div className="relative z-10 p-6 flex flex-col h-full">
          {/* アイコン */}
          <div className="text-center mb-6">
            <motion.div
              className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-neon-blue to-neon-purple shadow-neon group-hover:shadow-glow transition-all duration-300"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8 }}
            >
              <Icon 
                name={icon as any} 
                size="lg" 
                color="white" 
                className="drop-shadow-lg" 
              />
            </motion.div>
          </div>

          {/* タイトル */}
          <h3 className="font-cyber text-xl font-bold text-center mb-4 neon-text-purple group-hover:text-neon-blue transition-colors duration-300">
            {title}
          </h3>

          {/* 説明 */}
          <p className="font-futura text-center text-gray-300 mb-6 leading-relaxed">
            {description}
          </p>

          {/* 料金 */}
          <div className="text-center mb-6">
            <motion.div
              className="inline-block px-4 py-2 rounded-lg bg-gradient-to-r from-neon-pink/20 to-neon-purple/20 border border-neon-purple/30"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-2xl font-bold text-neon-purple font-cyber">
                {price}
              </span>
            </motion.div>
          </div>

          {/* 特徴リスト */}
          <ul className="space-y-3 mb-8 flex-grow">
            {features.map((feature, index) => (
              <motion.li 
                key={index}
                className="flex items-center text-sm text-gray-300"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: delay + (index * 0.1) }}
              >
                <div className="w-2 h-2 bg-neon-green rounded-full mr-3 flex-shrink-0 shadow-neon-green animate-pulse" />
                <span className="group-hover:text-white transition-colors duration-300">
                  {feature}
                </span>
              </motion.li>
            ))}
          </ul>

          {/* CTAボタン */}
          <div className="mt-auto">
            <Button 
              variant="primary" 
              className="w-full group-hover:shadow-glow"
            >
              詳細を見る
            </Button>
          </div>
        </div>

        {/* 角の装飾エフェクト */}
        <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-neon-blue/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-neon-blue/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-neon-blue/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-neon-blue/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* 浮遊する装飾パーティクル */}
        <motion.div
          className="absolute top-4 right-4 w-1 h-1 bg-neon-pink rounded-full opacity-0 group-hover:opacity-60"
          animate={{
            y: [0, -10, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-8 left-4 w-1 h-1 bg-neon-cyan rounded-full opacity-0 group-hover:opacity-60"
          animate={{
            y: [0, -8, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            repeat: Infinity,
            duration: 2.5,
            ease: 'easeInOut',
            delay: 0.5,
          }}
        />
      </Card>
    </motion.div>
  )
}