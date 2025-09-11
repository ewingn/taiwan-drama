import './globals.css'
import { Inter } from 'next/font/google'
import Navigation from '../components/Navigation'

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
        {children}
        
        {/* Footer */}
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
                  <li>TV Drama</li>
                  <li>Taipei Life</li>
                  <li>KTV Night</li>
                  <li>Huandao</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>About Us</li>
                  <li>Contact</li>
                  <li>Privacy Policy</li>
                  <li>Terms of Service</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Connect</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>Discord Community</li>
                  <li>Twitter</li>
                  <li>Instagram</li>
                  <li>YouTube</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
              <p>&copy; 2025 TaiwanScript. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}