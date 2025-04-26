import Link from "next/link";
import React from "react";
import { BsLinkedin } from "react-icons/bs";
import { FaExternalLinkAlt, FaGithub, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="border-t border-gray-700 pt-6 text-center">
          <div className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Phantom TV. All rights reserved.
            
            <div className="mt-4">
              Developed by
              <div className="flex items-center justify-center mt-1">
                <Link
                  href="https://yourportfolio.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-icon-primary hover:text-icon-secondary flex items-center justify-center w-fit"
                >
                  Mayank Singh <FaExternalLinkAlt className="ml-1" />
                </Link>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold mt-6 mb-4">Follow Me</h3>
            <div className="flex items-center justify-center space-x-4">
              <Link
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-icon-primary hover:text-icon-secondary flex flex-col items-center"
              >
                <FaGithub size={20} /> Github
              </Link>
              <Link
                href="https://twitter.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-icon-primary hover:text-icon-secondary flex flex-col items-center"
              >
                <FaXTwitter size={20} /> Twitter
              </Link>
              <Link
                href="https://instagram.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-icon-primary hover:text-icon-secondary flex flex-col items-center"
              >
                <FaInstagram size={20} /> Instagram
              </Link>
              <Link
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-icon-primary hover:text-icon-secondary flex flex-col items-center"
              >
                <BsLinkedin size={20} /> LinkedIn
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;