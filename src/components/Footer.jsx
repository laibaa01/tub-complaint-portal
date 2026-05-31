/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer({ onNavigate }) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (view, elementId) => {
    if (onNavigate) {
      onNavigate(view);
    }
    if (elementId) {
      setTimeout(() => {
        const item = document.getElementById(elementId);
        if (item) {
          item.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  };

  return (
    <footer className="bg-[#0C2340] text-gray-300 border-t border-[#1E3A5F]">

      {/* Main Footer */}
      <div className="w-full px-4 sm:px-6 lg:px-10 py-12">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Brand Section */}
          <div className="space-y-4">
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => handleLinkClick("home")}
            >
              <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#0C2340] flex items-center justify-center">
                <img
                  src="/src/assets/images/logo.png"
                  alt="Logo"
                  className="w-10 h-10 object-contain"
                  onError={(e) => {
                    e.target.src =
                      "https://placehold.co/40x40/0c2340/ffffff?text=Logo";
                  }}
                />
              </div>
              <div>
                <div className="text-white font-bold text-sm tracking-wider">
                  THAL UNIVERSITY
                </div>
                <div className="text-xs text-gray-400 tracking-widest">
                  BHAKKAR
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              The official University Complaint Management System (CMS) for Thal
              University Bhakkar. Students can register complaints and track
              transparent resolutions.
            </p>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-white text-sm font-bold uppercase tracking-wider border-l-2 border-blue-500 pl-3">
              Contact Us
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2 text-sm text-gray-400">
                <MapPin className="w-5 h-5 text-blue-500 mt-0.5" />
                <span>Thal University Bhakkar, Punjab, Pakistan</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Phone className="w-4 h-4 text-blue-500" />
                <span>0453-9200070</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Mail className="w-4 h-4 text-blue-500" />
                <span>info@tu.edu.pk</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[#1E3A5F] text-center text-xs text-gray-500">
          <div>© {currentYear} Thal University Bhakkar. All rights reserved.</div>
        </div>

      </div>

    </footer>
  );
}
