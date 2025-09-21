'use client'

import React, { useState } from 'react'
import { Mail, MessageCircle, Globe, Youtube } from 'lucide-react'

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
    // Create mailto link with the form data
    const subject = encodeURIComponent(`TaiwanScript Contact: ${formData.subject}`)
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Subject: ${formData.subject}\n\n` +
      `Message:\n${formData.message}`
    )
    
    const mailtoLink = `mailto:youyong189@gmail.com?subject=${subject}&body=${body}`
    
    // Open the user's default email client
    window.location.href = mailtoLink
    
    // Show success message
    alert('Opening your email client to send the message to our team!')
    
    // Reset form
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
                disabled={!formData.name || !formData.email || !formData.subject || !formData.message}
                className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                    <p className="text-gray-600">youyong189@gmail.com</p>
                    <p className="text-sm text-gray-500">We typically respond within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MessageCircle className="text-blue-500 w-6 h-6 mr-4 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Discord Community - Coming Soon!</h4>
                    <p className="text-gray-600">Join our learner community</p>
                    <p className="text-sm text-gray-500">Get help from other learners and our team</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Youtube className="text-red-500 w-6 h-6 mr-4 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">YouTube Channel</h4>
                    <a 
                      href="https://www.youtube.com/@YouYong%E8%AF%B4" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-red-600 hover:text-red-700 transition-colors"
                    >
                      @YouYong说
                    </a>
                    <p className="text-sm text-gray-500">Chinese learning content and updates</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Globe className="text-green-500 w-6 h-6 mr-4 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Social Media</h4>
                    <p className="text-gray-600">Follow us for updates</p>
                    <p className="text-sm text-gray-500">@YouYongShuo</p>
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