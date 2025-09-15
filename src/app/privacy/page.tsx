// src/app/privacy/page.tsx
export const metadata = {
  title: 'Privacy Policy - TaiwanScript',
  description: 'Learn about how TaiwanScript protects your privacy and handles your data.',
}

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600">
            Last updated: January 2025
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2>Information We Collect</h2>
          <p>
            TaiwanScript collects information to provide better services to our users. We collect information in the following ways:
          </p>
          
          <h3>Information You Give Us</h3>
          <ul>
            <li>Contact information when you reach out to us</li>
            <li>Learning progress and preferences</li>
            <li>Feedback and suggestions you provide</li>
          </ul>

          <h3>Information We Get From Your Use of Our Services</h3>
          <ul>
            <li>Usage data and analytics</li>
            <li>Device information</li>
            <li>Log information</li>
          </ul>

          <h2>How We Use Information</h2>
          <p>
            We use the information we collect to:
          </p>
          <ul>
            <li>Provide, maintain, and improve our services</li>
            <li>Develop new features and content</li>
            <li>Communicate with you about updates and support</li>
            <li>Analyze usage patterns to improve user experience</li>
          </ul>

          <h2>Information Sharing</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.
          </p>

          <h2>Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p>
            Email: youyong189@gmail.com
          </p>
        </div>
      </div>
    </div>
  )
}