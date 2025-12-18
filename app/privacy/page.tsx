'use client';

import { useState } from 'react';

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState('introduction');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-[#171717] text-gray-100">

      
      {/* Hero Section */}
      <div className="bg-[#383838] py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-light mb-4">Privacy Policy</h1>
          <p className="text-lg max-w-3xl mx-auto">
            Last updated: December 17, 2023
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="md:w-64 flex-shrink-0">
            <div className="sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
              <nav className="space-y-2">
                {[
                  { id: 'introduction', label: '1. Introduction' },
                  { id: 'information-we-collect', label: '2. Information We Collect' },
                  { id: 'how-we-use', label: '3. How We Use Your Information' },
                  { id: 'sharing-disclosure', label: '4. Information Sharing and Disclosure' },
                  { id: 'data-security', label: '5. Data Security' },
                  { id: 'your-rights', label: '6. Your Rights' },
                  { id: 'contact', label: '7. Contact Information' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left px-4 py-2 rounded-md transition-colors ${
                      activeSection === item.id ? 'bg-[#D2B48C] text-gray-900' : 'hover:bg-[#383838]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <section id="introduction" className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p className="mb-4">
                Welcome to Lunel Beauty. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice or our practices with regard to your personal information, please contact us.
              </p>
              <p>
                This privacy notice describes how we might use your information if you visit our website or engage with us in other related ways.
              </p>
            </section>

            <section id="information-we-collect" className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
              <p className="mb-4">
                We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, or otherwise when you contact us.
              </p>
              <p>
                The personal information we collect may include the following: name, email address, phone number, mailing address, and other similar contact data.
              </p>
            </section>

            <section id="how-we-use" className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
              <p className="mb-4">
                We use personal information collected via our website for a variety of business purposes described below:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>To send you marketing and promotional communications</li>
                <li>To send administrative information to you</li>
                <li>To post testimonials</li>
                <li>To deliver targeted advertising to you</li>
                <li>To protect our services</li>
              </ul>
            </section>

            <section id="sharing-disclosure" className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">4. Information Sharing and Disclosure</h2>
              <p className="mb-4">
                We may share or disclose your information in the following situations:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Business Transfers:</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
                <li><strong>Business Partners:</strong> We may share your information with our business partners to offer you certain products, services, or promotions.</li>
              </ul>
            </section>

            <section id="data-security" className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
              <p>
                We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure.
              </p>
            </section>

            <section id="your-rights" className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
              <p className="mb-4">
                You have certain rights regarding your personal information. You may have the following rights under applicable data protection laws:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Request access to your personal information</li>
                <li>Request correction of your personal information</li>
                <li>Request erasure of your personal information</li>
                <li>Object to processing of your personal information</li>
                <li>Request restriction of processing your personal information</li>
                <li>Request transfer of your personal information</li>
                <li>Withdraw your consent</li>
              </ul>
            </section>

            <section id="contact" className="bg-[#D2B48C] p-6 rounded-lg text-gray-900">
              <h2 className="text-2xl font-semibold mb-4">7. Contact Information</h2>
              <p className="mb-4">
                If you have questions or comments about this notice, you may email us at <a href="mailto:privacy@lunelbeauty.com" className="text-blue-600 hover:underline">privacy@lunelbeauty.com</a> or by post to:
              </p>
              <address className="not-italic mb-4">
                Lunel Beauty<br />
                123 Beauty Street<br />
                New York, NY 10001<br />
                United States
              </address>
              <p>
                If you are a resident in the European Economic Area, the "data controller" of your personal information is Lunel Beauty.
              </p>
            </section>
          </div>
        </div>
      </div>

     
    </div>
  );
}