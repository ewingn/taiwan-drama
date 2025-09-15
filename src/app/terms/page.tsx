// src/app/terms/page.tsx
export const metadata = {
  title: 'Terms of Service - TaiwanScript',
  description: 'Terms and conditions for using TaiwanScript language learning platform.',
}

export default function Terms() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-600">
            Last updated: January 2025
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2>Acceptance of Terms</h2>
          <p>
            By accessing and using TaiwanScript, you accept and agree to be bound by the terms and provision of this agreement.
          </p>

          <h2>Use License</h2>
          <p>
            Permission is granted to temporarily access TaiwanScript for personal, non-commercial use only. This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul>
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose or for any public display</li>
            <li>Attempt to reverse engineer any software contained on the website</li>
            <li>Remove any copyright or other proprietary notations from the materials</li>
          </ul>

          <h2>User Accounts</h2>
          <p>
            When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for maintaining the confidentiality of your account.
          </p>

          <h2>Educational Content</h2>
          <p>
            TaiwanScript provides educational content for language learning purposes. While we strive for accuracy, we make no warranties about the completeness, reliability, or accuracy of this information.
          </p>

          <h2>Intellectual Property Rights</h2>
          <p>
            The service and its original content, features, and functionality are and will remain the exclusive property of TaiwanScript and its licensors.
          </p>

          <h2>Prohibited Uses</h2>
          <p>
            You may not use our service:
          </p>
          <ul>
            <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
            <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
            <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
            <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
          </ul>

          <h2>Disclaimer</h2>
          <p>
            The information on this website is provided on an "as is" basis. To the fullest extent permitted by law, this Company excludes all representations, warranties, conditions, and terms.
          </p>

          <h2>Contact Information</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us at:
          </p>
          <p>
            Email: youyong189@gmail.com
          </p>
        </div>
      </div>
    </div>
  )
}