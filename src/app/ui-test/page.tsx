'use client'

import React, { useState } from 'react'
import { 
  Button, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardFooter,
  Input,
  Textarea,
  Loading,
  Icon,
  Modal,
  ModalContent,
  ModalFooter,
  ConfirmModal
} from '@/components/ui'
import Container from '@/components/ui/Container'

export default function UITestPage() {
  const [inputValue, setInputValue] = useState('')
  const [textareaValue, setTextareaValue] = useState('')
  const [inputError, setInputError] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    if (e.target.value.length > 0) {
      setInputError('')
    }
  }

  const handleSubmit = () => {
    if (!inputValue) {
      setInputError('この項目は必須です')
      return
    }
    
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setIsConfirmOpen(true)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-dark-900 text-white py-12">
      <Container>
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center">
            <h1 className="font-cyber text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink">
              UI Components Test
            </h1>
            <p className="text-gray-300">サイバー風UIコンポーネントのテストページ</p>
          </div>

          {/* Buttons Section */}
          <section>
            <h2 className="font-cyber text-2xl font-semibold mb-6 text-neon-blue">Buttons</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </div>
            <div className="mt-4 flex flex-wrap gap-4">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button loading>Loading</Button>
              <Button disabled>Disabled</Button>
            </div>
          </section>

          {/* Cards Section */}
          <section>
            <h2 className="font-cyber text-2xl font-semibold mb-6 text-neon-purple">Cards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card variant="default">
                <CardHeader>
                  <CardTitle>Default Card</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>基本的なカードデザインです。</p>
                </CardContent>
              </Card>

              <Card variant="glass">
                <CardHeader>
                  <CardTitle>Glass Card</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>ガラスモーフィズム効果のカードです。</p>
                </CardContent>
              </Card>

              <Card variant="neon" glowing>
                <CardHeader>
                  <CardTitle>Neon Card</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>ネオン効果のあるカードです。</p>
                </CardContent>
              </Card>

              <Card variant="elevated">
                <CardHeader>
                  <CardTitle>Elevated Card</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>立体感のあるカードです。</p>
                </CardContent>
                <CardFooter>
                  <Button size="sm">Action</Button>
                </CardFooter>
              </Card>
            </div>
          </section>

          {/* Inputs Section */}
          <section>
            <h2 className="font-cyber text-2xl font-semibold mb-6 text-neon-green">Form Inputs</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input
                label="Default Input"
                placeholder="テキストを入力"
                value={inputValue}
                onChange={handleInputChange}
                error={inputError}
                helperText="必須項目です"
              />

              <Input
                label="Cyber Input"
                placeholder="サイバー風入力"
                variant="cyber"
              />

              <Input
                label="Neon Input"
                placeholder="ネオン風入力"
                variant="neon"
              />
            </div>

            <div className="mt-6">
              <Textarea
                label="Textarea"
                placeholder="複数行テキスト入力"
                value={textareaValue}
                onChange={(e) => setTextareaValue(e.target.value)}
                variant="cyber"
                rows={4}
              />
            </div>
          </section>

          {/* Loading Section */}
          <section>
            <h2 className="font-cyber text-2xl font-semibold mb-6 text-neon-pink">Loading States</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
              <div className="text-center">
                <Loading type="spinner" size="sm" />
                <p className="mt-2 text-sm">Spinner SM</p>
              </div>
              <div className="text-center">
                <Loading type="cyber" size="md" />
                <p className="mt-2 text-sm">Cyber MD</p>
              </div>
              <div className="text-center">
                <Loading type="pulse" size="lg" />
                <p className="mt-2 text-sm">Pulse LG</p>
              </div>
              <div className="text-center">
                <Loading type="dots" color="purple" />
                <p className="mt-2 text-sm">Dots</p>
              </div>
              <div className="text-center">
                <Loading type="bars" color="green" />
                <p className="mt-2 text-sm">Bars</p>
              </div>
            </div>
          </section>

          {/* Icons Section */}
          <section>
            <h2 className="font-cyber text-2xl font-semibold mb-6 text-neon-cyan">Icons</h2>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
              {['menu', 'close', 'check', 'error', 'warning', 'info', 'cpu', 'circuit', 'database', 'network', 'email', 'phone', 'location', 'shield', 'lock', 'power'].map((icon) => (
                <div key={icon} className="text-center p-4 border border-dark-600 rounded-lg hover:border-neon-blue transition-colors">
                  <Icon name={icon} size="lg" color="neon-blue" className="mx-auto mb-2" />
                  <p className="text-xs">{icon}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Interactive Section */}
          <section>
            <h2 className="font-cyber text-2xl font-semibold mb-6 text-neon-yellow">Interactive Elements</h2>
            <div className="flex flex-wrap gap-4">
              <Button 
                variant="primary" 
                onClick={() => setIsModalOpen(true)}
              >
                <Icon name="info" size="sm" className="mr-2" />
                Open Modal
              </Button>
              
              <Button 
                variant="secondary"
                onClick={handleSubmit}
                loading={loading}
              >
                {loading ? 'Processing...' : 'Submit Form'}
              </Button>
            </div>
          </section>
        </div>
      </Container>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="サイバー風モーダル"
        variant="cyber"
      >
        <ModalContent>
          <p className="mb-4">
            これはサイバー風デザインのモーダルです。
          </p>
          <p className="text-gray-400">
            ESCキーまたは背景クリックで閉じることができます。
          </p>
        </ModalContent>
        <ModalFooter>
          <Button 
            variant="ghost"
            onClick={() => setIsModalOpen(false)}
          >
            キャンセル
          </Button>
          <Button 
            variant="primary"
            onClick={() => setIsModalOpen(false)}
          >
            OK
          </Button>
        </ModalFooter>
      </Modal>

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => {
          console.log('Confirmed!')
        }}
        title="送信完了"
        message="フォームが正常に送信されました。"
        confirmText="了解"
      />
    </div>
  )
}