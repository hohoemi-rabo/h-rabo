'use client'

import { motion } from 'framer-motion'
import { Heart, MessageCircle, Share, ExternalLink, Image as ImageIcon } from 'lucide-react'

interface InstagramPost {
  id: string
  imageUrl: string
  caption: string
  likes: number
  createdAt: string
}

interface AccountInfo {
  username: string
  displayName: string
  bio: string
  posts: number
  followers: number
  following: number
  website: string
}

interface InstagramPageClientProps {
  posts: InstagramPost[]
  accountInfo: AccountInfo
}

export default function InstagramPageClient({ posts, accountInfo }: InstagramPageClientProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 mb-6">
            Instagram
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            最新の授業風景や生徒さんの様子をお届けしています
          </p>
        </motion.div>

        {/* Account Info Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-black/40 backdrop-blur-lg rounded-2xl border border-gray-800 p-8 mb-12 max-w-4xl mx-auto"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Profile Image */}
            <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <ImageIcon className="w-16 h-16 text-white" />
            </div>

            {/* Account Details */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-white mb-2">{accountInfo.displayName}</h2>
              <p className="text-gray-400 mb-4">@{accountInfo.username}</p>
              
              {/* Stats */}
              <div className="flex justify-center md:justify-start gap-8 mb-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{accountInfo.posts}</p>
                  <p className="text-gray-400 text-sm">投稿</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{accountInfo.followers}</p>
                  <p className="text-gray-400 text-sm">フォロワー</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{accountInfo.following}</p>
                  <p className="text-gray-400 text-sm">フォロー中</p>
                </div>
              </div>

              {/* Bio */}
              <p className="text-gray-300 whitespace-pre-line mb-4">{accountInfo.bio}</p>

              {/* Website Link */}
              <a
                href={accountInfo.website}
                className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                {accountInfo.website.replace('https://', '')}
              </a>
            </div>
          </div>
        </motion.div>

        {/* Instagram Posts Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="group"
              >
                <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-gray-800 overflow-hidden hover:border-purple-500/50 transition-all duration-300">
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={post.imageUrl}
                      alt={`Instagram post ${post.id}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex items-center gap-6 text-white">
                        <div className="flex items-center gap-2">
                          <Heart className="w-6 h-6" />
                          <span className="font-semibold">{post.likes}</span>
                        </div>
                        <MessageCircle className="w-6 h-6" />
                        <Share className="w-6 h-6" />
                      </div>
                    </div>
                  </div>

                  {/* Post Info */}
                  <div className="p-4">
                    {/* Likes */}
                    <div className="flex items-center gap-2 mb-3">
                      <Heart className="w-5 h-5 text-red-400" />
                      <span className="text-white font-semibold">{post.likes} いいね</span>
                    </div>

                    {/* Caption */}
                    <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                      {post.caption}
                    </p>

                    {/* Date */}
                    <div className="mt-3 text-xs text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString('ja-JP', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <a
            href="https://instagram.com/hohoemi_lab"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
          >
            <ImageIcon className="w-5 h-5" />
            Instagramで全ての投稿を見る
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </div>
  )
}