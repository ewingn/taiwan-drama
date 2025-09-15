import './globals.css'
import { Inter } from 'next/font/google'
import Navigation from '../components/Navigation'
// NEW: Import Link for footer
import Link from 'next/link'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'TaiwanScript - Learn Chinese Through Drama',
  description: 'Learn Chinese through immersive Taiwanese drama role-play and AI conversation practice.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen">
            {children}
        </main>
        
        {/* UPDATED: Footer with functional links */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">TaiwanScript</h3>
                <p className="text-gray-400 text-sm">
                  Learn Chinese through immersive Taiwanese culture and storytelling.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Learning Arcs</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><Link href="/learn" className="hover:text-white">TV Drama</Link></li>
                  <li className="opacity-50">Taipei Life</li>
                  <li className="opacity-50">KTV Night</li>
                  <li className="opacity-50">Huandao</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                  <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                  <li><Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
                  <li><Link href="/terms-of-service" className="hover:text-white">Terms of Service</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Connect</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>
                    <Link href="https://www.youtube.com/@YouYong%E8%AF%B4" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                      YouTube
                    </Link>
                  </li>
                  <li className="opacity-50">Discord Community</li>
                  <li className="opacity-50">Twitter</li>
                  <li className="opacity-50">Instagram</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
              <p>&copy; {new Date().getFullYear()} TaiwanScript. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}