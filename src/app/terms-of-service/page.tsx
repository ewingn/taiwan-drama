// NEW FILE: src/app/terms-of-service/page.tsx
import React from 'react';

export const metadata = {
  title: 'Terms of Service - TaiwanScript',
  description: 'Terms of Service for TaiwanScript.',
};

const TermsOfServicePage = () => {
  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">Terms of Service</h1>
        <div className="prose prose-lg text-gray-600 mx-auto">
          <p>Last updated: September 12, 2025</p>

          <h2>1. Agreement to Terms</h2>
          <p>
            By using our services, you agree to be bound by these Terms. If you don’t agree to be bound by these Terms, do not use the services.
          </p>

          <h2>2. Your Account</h2>
          <p>
            You may be required to create an account to use some of our services. You are responsible for safeguarding your account, so use a strong password and limit its use to this account. We cannot and will not be liable for any loss or damage arising from your failure to comply with the above.
          </p>
          
          <h2>3. User Conduct</h2>
          <p>
            You agree not to misuse the TaiwanScript services or help anyone else to do so. You are responsible for your conduct and content, and you must comply with our policies.
          </p>

          <h2>4. Termination</h2>
          <p>
            We may terminate or suspend your access to our services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
          </p>

          {/* Add more sections as needed */}
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;