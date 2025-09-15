'use client'

import React, { useState } from 'react'
// UPDATED: Imported Youtube icon
import { Mail, MessageCircle, Globe, Youtube } from 'lucide-react'
import Link from 'next/link'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

const ContactPage = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = () => {
    // Handle form submission here
    alert('Thank you for your message! We\'ll get back to you soon.')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600">
            Have questions, feedback, or ideas? We'd love to hear from you!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            <div className="space-y-6">
              {/* Form inputs remain the same */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="feedback">Feedback</option>
                  <option value="bug">Bug Report</option>
                  <option value="partnership">Partnership</option>
                  <option value="feature">Feature Request</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>
              
              <button
                onClick={handleSubmit}
                className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Send Message
              </button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Other Ways to Reach Us</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="text-red-500 w-6 h-6 mr-4 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    {/* UPDATED: Email address */}
                    <a href="mailto:youyong189@gmail.com" className="text-gray-600 hover:text-red-600">youyong189@gmail.com</a>
                    <p className="text-sm text-gray-500">We typically respond within 24 hours</p>
                  </div>
                </div>
                
                {/* NEW: YouTube Channel Link */}
                <div className="flex items-start">
                  <Youtube className="text-red-600 w-6 h-6 mr-4 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">YouTube</h4>
                     <Link href="https://www.youtube.com/@YouYong%E8%AF%B4" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-600">
                        /@YouYong说
                     </Link>
                    <p className="text-sm text-gray-500">Follow the journey and get updates</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MessageCircle className="text-blue-500 w-6 h-6 mr-4 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Discord Community</h4>
                    <p className="text-gray-600">Join our learner community</p>
                    <p className="text-sm text-gray-500">Get help from other learners and our team</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-lg p-8 text-white">
              <h3 className="text-xl font-bold mb-4">Join Our Beta Program</h3>
              <p className="mb-6">
                Be among the first to experience new features and help shape the future of TaiwanScript.
              </p>
              <button className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Sign Up for Beta
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage