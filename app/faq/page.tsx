'use client';

import { useState } from 'react';
import { FaSearch, FaChevronDown, FaChevronUp, FaHeadphones, FaComment, FaEnvelope } from 'react-icons/fa';
const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      question: 'How do I place an order?',
      answer: 'To place an order, simply browse our products, add items to your cart, and proceed to checkout. Follow the steps to enter your shipping and payment information.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and bank transfers. All transactions are secure and encrypted.'
    },
    {
      question: 'How can I track my order?',
      answer: 'Once your order ships, you will receive a tracking number via email. You can use this number to track your package on our website or the shipping carrier\'s website.'
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy. Items must be in their original condition with tags attached. Please contact our support team to initiate a return.'
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Yes, we offer international shipping to most countries. Shipping costs and delivery times vary depending on the destination.'
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Yes, we offer international shipping to most countries. Shipping costs and delivery times vary depending on the destination.'
    },
    {
      question:'Hey,you have any discount?',
      answer:'Yes, we offer international shipping to most countries. Shipping costs and delivery times vary depending on the destination.'
    },
    {
      question:'Hey,you have any discount?',
      answer:'Yes, we offer international shipping to most countries. Shipping costs and delivery times vary depending on the destination.'
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#171717]">
      {/* Header Section */}
      <div className="bg-[#383838] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Find answers to common questions about our products, services, and policies.
          </p>
          
          {/* Search Bar */}
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for answers..."
                className="w-full py-4 pl-12 pr-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-100 mb-2">General Questions</h2>
          <p className="text-gray-100">Most frequently asked questions about our services</p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center bg-[#383838] hover:bg-[#171717] transition-colors"
                onClick={() => toggleAccordion(index)}
              >
                <span className="font-medium text-gray-100">{faq.question}</span>
                {activeIndex === index ? (
                  <FaChevronUp className="text-[#d4a574]" />
                ) : (
                  <FaChevronDown className="text-[#d4a574]" />
                )}
              </button>
              {activeIndex === index && (
                <div className="px-6 py-4 bg-[#171717]">
                  <p className="text-gray-100">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#383838] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-[#171717] rounded-2xl shadow-sm p-8 md:p-12 text-center">
          <div className="w-16 h-16 bg-[#d4a574] rounded-full flex items-center justify-center mx-auto mb-6">
            <FaHeadphones className="text-white text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-100 mb-3">Still Have Questions?</h2>
          <p className="text-gray-100 max-w-2xl mx-auto mb-8">
            Can't find the answer you're looking for? Our support team is here to help you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-[#d4a574]  text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors">
              <FaComment /> Start Live Chat
            </button>
            <button className="border border-[#d4a574] text-[#d4a574]  px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors">
              <FaEnvelope /> Email Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;