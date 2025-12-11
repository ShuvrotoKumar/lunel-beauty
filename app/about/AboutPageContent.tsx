'use client';

import { FaLeaf, FaHeart, FaFlask, FaRecycle, FaSearch, FaUsers, FaVial } from 'react-icons/fa';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
const AboutPageContent = () => {
    return (
        <div className="bg-white">
            <Header />
            {/* Our Story Section */}
            <section className="relative py-16 bg-cover bg-no-repeat bg-center w-full h-[550px]"
                style={{ backgroundImage: 'url( images/a-bg.png)' }}
            >
                {/* Content Container */}
                <div className="px-4 max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center relative">
                        <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg">
                            <Image
                                src="/images/a1.png"
                                alt="BeautyGlow founder Sarah Johnson in our lab"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-pink-100/20 to-purple-100/20" />
                        </div>
                        <div className="p-5 rounded-2xl backdrop-blur-sm">
                            <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Story</h2>
                            <p className="text-gray-600 mb-6">
                                Founded in 2015, BeautyGlow was born from a simple idea: beauty products should be as good for your skin as they are for the planet. Our founder, Sarah Johnson, started mixing natural ingredients in her kitchen, frustrated by the lack of clean, effective skincare options.
                            </p>
                            <p className="text-gray-600 mb-8">
                                What began as a passion project quickly grew into a movement, with thousands of customers experiencing the BeautyGlow difference. Today, we're proud to be a certified B-Corp, committed to sustainability and ethical practices at every step.
                            </p>
                            <div className="flex items-center space-x-4 mt-8">
                                <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">
                                    <FaHeart className="w-6 h-6 text-pink-500" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-800">Sarah Johnson</p>
                                    <p className="text-sm text-gray-500">Founder & CEO, BeautyGlow</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Values */}
            <section className="py-16 bg-[#ffebeb]">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Mission & Values</h2>
                        <p className="text-gray-600">
                            We're on a mission to create clean, effective beauty products that you can feel good about using every day.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                                    <FaLeaf className="w-8 h-8 text-green-500" />
                                </div>,
                                title: "Natural Ingredients",
                                description: "We source only the finest botanical ingredients, carefully selected for their purity and effectiveness.",
                            },
                            {
                                icon: <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                                    <FaFlask className="w-8 h-8 text-red-500" />
                                </div>,
                                title: "Dermatologically Safe",
                                description: "All our products are tested and approved by dermatologists."
                            },
                            {
                                icon: <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center mx-auto mb-4">
                                    <FaHeart className="w-8 h-8 text-pink-500" />
                                </div>,
                                title: "Ethical & Cruelty-Free",
                                description: "We never test on animals and are certified cruelty-free by Leaping Bunny."
                            },
                            {
                                icon: <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                                    <FaRecycle className="w-8 h-8 text-green-500" />
                                </div>,
                                title: "Sustainability Focused",
                                description: "From sourcing to packaging, we prioritize the planet in every decision."
                            }
                        ].map((item, index) => (
                            <div key={index} className={`bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow`}>
                                {item.icon}
                                <h3 className="text-xl font-semibold mb-2 text-gray-800">{item.title}</h3>
                                <p className="text-gray-600">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What Makes Us Unique */}
            <section className="py-16 px-4 mx-auto bg-[#ffebeb]">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">What Makes Us Unique</h2>
                    <p className="text-gray-600">
                        We're not just another beauty brand. Here's what sets us apart:
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {[
                        {
                            icon: (
                                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                                    <FaSearch className="w-6 h-6 text-red-500" />
                                </div>
                            ),
                            title: "Ingredient Transparency",
                            description: "We believe in complete honesty about what goes into our products.",
                            points: [
                                "Full ingredient disclosure",
                                "No hidden nasties",
                                "Sourcing information available"
                            ],
                            bgColor: "bg-[#FDF2F8]"
                        },
                        {
                            icon: (
                                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                                    <FaFlask className="w-6 h-6 text-blue-500" />
                                </div>
                            ),
                            title: "Premium Formulations",
                            description: "Science meets nature in our advanced skincare solutions.",
                            points: [
                                "Science-backed ingredients",
                                "Optimal concentrations",
                                "Clinically proven results"
                            ],
                            bgColor: "bg-[#FDF2F8]"
                        },
                        {
                            icon: (
                                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                                    <FaUsers className="w-6 h-6 text-green-500" />
                                </div>
                            ),
                            title: "Community Driven",
                            description: "Your voice shapes our products and mission.",
                            points: [
                                "Customer feedback focused",
                                "Inclusive product development",
                                "Regular community events"
                            ],
                            bgColor: "bg-[#FDF2F8]"
                        }
                    ].map((item, index) => (
                        <div key={index} className={`${item.bgColor} p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300`}>
                            <div className="text-center">
                                {item.icon}
                                <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                                <p className="text-gray-600 mb-6">{item.description}</p>
                            </div>
                            <ul className="space-y-3">
                                {item.points.map((point, i) => (
                                    <li key={i} className="flex items-start">
                                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-700">{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* Behind The Scenes */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Behind The Scenes</h2>
                        <p className="text-gray-600">
                            Take a peek at how we create our products with care and precision.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                src: "/images/a2.png",
                                title: "Our Lab",
                                description: "Where science meets nature"
                            },
                            {
                                src: "/images/a3.png",
                                title: "Ingredients",
                                description: "Sourcing the finest natural ingredients"
                            },
                            {
                                src: "/images/a4.png",
                                title: "Production",
                                description: "Handcrafted with care"
                            },
                            {
                                src: "/images/a5.png",
                                title: "Quality Control",
                                description: "Ensuring the highest standards"
                            }
                        ].map((item, index) => (
                            <div key={index} className="group relative h-64 rounded-lg overflow-hidden">
                                <Image
                                    src={item.src}
                                    alt={item.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                />
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                    <p className="font-medium">{item.title}</p>
                                    <p className="text-sm opacity-90">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default AboutPageContent;
