'use client';

import { useState } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';
export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted:', formData);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        We're here to help and answer any question you might have. We look forward to hearing from you.
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                        {/* Contact Form */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Send us a message</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            placeholder="First Name"
                                            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            placeholder="Last Name"
                                            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Email"
                                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                                        required
                                    />
                                </div>
                                <div>
                                    <select
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-gray-400"
                                        required
                                    >
                                        <option value="" disabled hidden>Select Subject</option>
                                        <option value="General Inquiry">General Inquiry</option>
                                        <option value="Support">Support</option>
                                        <option value="Partnership">Partnership</option>
                                        <option value="Feedback">Feedback</option>
                                    </select>
                                </div>
                                <div>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={5}
                                        placeholder="Write your message here..."
                                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 resize-none"
                                        required
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-[#ff9494] text-white py-3 px-6 rounded-md hover:bg-[#ff7d7d] transition duration-200 font-medium flex items-center justify-center gap-2"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 transform rotate-60"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        style={{ transform: 'rotate(60deg)' }}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                        />
                                    </svg>
                                    Send Message
                                </button>
                            </form>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Contact Information</h2>
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
                                            <FaMapMarkerAlt className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-medium text-gray-900">Our Location</h3>
                                            <p className="text-gray-600">123 Business Street, Suite 100<br />New York, NY 10001</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
                                            <FaPhoneAlt className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-medium text-gray-900">Phone Number</h3>
                                            <p className="text-gray-600">+1 (555) 123-4567<br />+1 (555) 987-6543</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
                                            <FaEnvelope className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-medium text-gray-900">Email Address</h3>
                                            <p className="text-gray-600">info@example.com<br />support@example.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-gray-200">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Follow Us</h3>
                                <div className="flex space-x-4">
                                    <a href="#" className="bg-gray-100 p-3 rounded-full text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition">
                                        <FaFacebookF className="h-5 w-5" />
                                    </a>
                                    <a href="#" className="bg-gray-100 p-3 rounded-full text-gray-700 hover:bg-blue-100 hover:text-blue-400 transition">
                                        <FaTwitter className="h-5 w-5" />
                                    </a>
                                    <a href="#" className="bg-gray-100 p-3 rounded-full text-gray-700 hover:bg-pink-100 hover:text-pink-600 transition">
                                        <FaInstagram className="h-5 w-5" />
                                    </a>
                                    <a href="#" className="bg-gray-100 p-3 rounded-full text-gray-700 hover:bg-blue-600 hover:text-white transition">
                                        <FaLinkedinIn className="h-5 w-5" />
                                    </a>
                                </div>
                            </div>

                            <div className="bg-[#ffebeb] p-6 rounded-lg">
                                <h3 className="text-lg font-medium text-black mb-2 font-bold">Quick Response</h3>
                                <p className="text-black mb-4">We typically respond to all inquiries within 24 hours on business days.</p>
                                <p className="text-sm text-black">Monday - Friday: 9:00 AM - 6:00 PM</p>
                                <p className="text-sm text-black">Saturday - Sunday: Closed</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </main>
            <Footer />
        </div>
    );
}
