'use client';

import { FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiSend } from 'react-icons/fi';
import Link from 'next/link';
import { FaLeaf } from 'react-icons/fa';

const Footer = () => {
  const footerLinks = [
    {
      title: 'Products',
      links: [
        { name: 'Skincare', href: '/products/skincare' },
        { name: 'Makeup', href: '/products/makeup' },
        { name: 'Body Care', href: '/products/body-care' },
        { name: 'Gift Sets', href: '/gift-sets' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Contact Us', href: '/contact' },
        { name: 'Shipping Info', href: '/shipping' },
        { name: 'Returns', href: '/returns' },
        { name: 'FAQ', href: '/faq' }
      ]
    }
  ];

  const socialLinks = [
    { icon: <FiInstagram className="h-5 w-5" />, href: '#' },
    { icon: <FiFacebook className="h-5 w-5" />, href: '#' },
    { icon: <FiTwitter className="h-5 w-5" />, href: '#' },
    { icon: <FiYoutube className="h-5 w-5" />, href: '#' }
  ];

  return (
    <footer className="bg-[#111826] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <FaLeaf className="text-2xl mr-2" />
              <Link href="/" className="text-2xl font-bold">LUNÉL</Link>
            </div>
            <p className="text-gray-400 mb-6 text-sm">
              Crafting beauty through nature's finest ingredients, bringing you closer to your most radiant self.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index} 
                  href={social.href} 
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.href.replace('#', '')}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="text-lg font-semibold mb-6">{column.title}</h3>
              <ul className="space-y-4">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-lg font-semibold mb-6">Newsletter</h3>
            <p className="text-gray-400 mb-4 text-sm">
              Stay updated with our latest products and beauty tips.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-[#2D2D2D] text-white px-4 py-3 focus:outline-none w-full text-sm"
              />
              <button className="bg-[#FF9494] text-white px-4 hover: transition">
                <FiSend className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; 2025 Lunel Beauty. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;