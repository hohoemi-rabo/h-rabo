'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const menuItems = [
  { href: '/', label: 'ホーム' },
  { href: '/about', label: '講師紹介' },
  { href: '/services', label: 'サービス' },
  { href: '/blog', label: 'ブログ' },
  { href: '/faq', label: 'よくある質問' },
  { href: '/contact', label: 'お問い合わせ' },
]

interface NavigationProps {
  className?: string
  isMobile?: boolean
  onItemClick?: () => void
}

export default function Navigation({ className, isMobile = false, onItemClick }: NavigationProps) {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className={cn(className)}>
      <ul className={cn(
        isMobile 
          ? 'flex flex-col space-y-4' 
          : 'flex space-x-8'
      )}>
        {menuItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onItemClick}
              className={cn(
                'transition-colors duration-200',
                isMobile
                  ? 'block text-lg font-medium py-2'
                  : 'text-sm font-medium',
                isActive(item.href)
                  ? 'text-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}