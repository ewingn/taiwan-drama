// NEW FILE: src/app/privacy-policy/page.tsx
import React from 'react';

export const metadata = {
  title: 'Privacy Policy - TaiwanScript',
  description: 'Privacy Policy for TaiwanScript.',
};

const PrivacyPolicyPage = () => {
  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">Privacy Policy</h1>
        <div className="prose prose-lg text-gray-600 mx-auto">
          <p>Last updated: September 12, 2025</p>
          
          <p>
            Welcome to TaiwanScript. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us at youyong189@gmail.com.
          </p>

          <h2>1. INFORMATION WE COLLECT</h2>
          <p>
            We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, when you participate in activities on the website (such as posting messages in our community forums or entering competitions, contests or giveaways) or otherwise when you contact us.
          </p>

          <h2>2. HOW WE USE YOUR INFORMATION</h2>
          <p>
            We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
          </p>

          <h2>3. WILL YOUR INFORMATION BE SHARED WITH ANYONE?</h2>
          <p>
            We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.
          </p>
          
          {/* Add more sections as needed */}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;