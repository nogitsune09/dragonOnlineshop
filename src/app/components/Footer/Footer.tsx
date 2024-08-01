'use client';

import React, { useState } from 'react';
import { FaGithub, FaLinkedin, FaGlobe } from 'react-icons/fa';

const Footer: React.FC = () => {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000); // بعد از 2 ثانیه به حالت اولیه برگردد
  };

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-yellow-300 py-8">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-4 animate__animated animate__fadeInUp">
          <h2 className="text-2xl font-bold mb-4">تماس با ما</h2>
          <p className="mb-2">آدرس: شیراز</p>
          <div className="flex items-center justify-center mb-2">
            <p className="mr-2">تلفن: ۰۹۹۱۵۳۷۶۳۱۵</p>
            <button
              onClick={() => copyToClipboard('09915376315')}
              className="bg-red-600 hover:bg-red-800 text-white font-bold py-1 px-2 rounded transition duration-300"
            >
              {copiedText === '09915376315' ? 'کپی شد' : 'کپی'}
            </button>
          </div>
          <div className="flex items-center justify-center mb-2">
            <p className="mr-2">ایمیل: mrezamehboodi@gmail.com</p>
            <button
              onClick={() => copyToClipboard('mrezamehboodi@gmail.com')}
              className="bg-red-600 hover:bg-red-800 text-white font-bold py-1 px-2 rounded transition duration-300"
            >
              {copiedText === 'mrezamehboodi@gmail.com' ? 'کپی شد' : 'کپی'}
            </button>
          </div>
        </div>
        <div className="flex justify-center space-x-8 mb-4 animate__animated animate__fadeInUp animate__delay-1s">
          <a
            href="https://github.com/nogitsune09"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-300 hover:text-white transition duration-300"
          >
            <FaGithub size={30} />
          </a>
          <a
            href="https://www.linkedin.com/in/mohammadreza-mehboodi-59141a318/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-300 hover:text-white transition duration-300"
          >
            <FaLinkedin size={30} />
          </a>
          <a
            href="https://mohammadrezamehboodi.liara.run/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-300 hover:text-white transition duration-300"
          >
            <FaGlobe size={30} />
          </a>
        </div>
        <div className="animate__animated animate__fadeInUp animate__delay-2s">
          <p>© 2024 تمامی حقوق این سایت برای محمدرضا مهبودی محفوظ است.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
