'use client';

import React from 'react';
import Link from 'next/link';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Twitter,
  Rss as Pinterest,
} from 'lucide-react';
import { CATEGORIES } from '@/data/categories';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-emerald-950 text-emerald-50/90 pt-4 pb-24 lg:pb-12 border-t border-emerald-900/30">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Brand */}
        <div className="space-y-6">
          <Link href="/" className="flex flex-col items-start">
            <span className="text-2xl font-serif font-bold tracking-widest text-white uppercase">
              Ananya
            </span>
            <span className="text-xs tracking-[0.3em] font-medium text-luxury-gold -mt-1 uppercase">
              Boutique
            </span>
          </Link>
          <p className="text-sm leading-relaxed text-emerald-100/60">
            Discover the elegance of traditional Indian wear with a modern touch.
            Our curated collections bring you the finest sarees, suits, and gowns
            for every occasion.
          </p>
          <div className="flex items-center gap-4 pt-2">
            {[Instagram, Facebook, Pinterest, Twitter].map((Icon, i) => (
              <button
                key={i}
                className="w-10 h-10 rounded-full border border-emerald-800/50 flex items-center justify-center hover:bg-luxury-gold hover:text-emerald-950 hover:border-luxury-gold transition-all duration-300 group"
                aria-label={['Instagram', 'Facebook', 'Pinterest', 'Twitter'][i]}
              >
                <Icon size={18} className="group-hover:scale-110 transition-transform" />
              </button>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-luxury-gold font-bold tracking-wider uppercase text-sm mb-6">
            Quick Links
          </h4>
          <ul className="space-y-4 text-sm">
            {[
              { label: 'Home', href: '/' },
              { label: 'Shop', href: '/shop' },
              { label: 'Categories', href: '/categories' },
              { label: 'About Us', href: '/about' },
            ].map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="hover:text-luxury-gold transition-colors block"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-luxury-gold font-bold tracking-wider uppercase text-sm mb-6">
            Categories
          </h4>
          <ul className="space-y-4 text-sm">
            {CATEGORIES.filter((c) => c.name !== 'All')
              .slice(0, 5)
              .map((cat) => (
                <li key={cat.name}>
                  <Link
                    href={`/categories?cat=${encodeURIComponent(cat.name)}`}
                    className="hover:text-luxury-gold transition-colors block"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-6">
          <h4 className="text-luxury-gold font-bold tracking-wider uppercase text-sm mb-6">
            Contact Us
          </h4>
          <div className="space-y-4">
            {[
              { Icon: Phone, label: 'Call Us', value: '+91 74949 54286' },
              { Icon: Mail, label: 'Email Us', value: 'ananyaboutique9495@gmail.com' },
              { Icon: MapPin, label: 'Visit Us', value: 'Mumbai, Maharashtra, India' },
              { Icon: Clock, label: 'Hours', value: 'Mon – Sun: 7am – 10pm' },
            ].map(({ Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3">
                <Icon size={18} className="text-luxury-gold mt-1 shrink-0" />
                <div>
                  <p className="text-xs text-emerald-100/40 uppercase tracking-tighter mb-0.5">
                    {label}
                  </p>
                  <p className="text-sm font-medium">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-16 pt-8 border-t border-emerald-900/30">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs tracking-wider text-emerald-100/30 uppercase font-medium">
          <p>© {year} Ananya Boutique. All Rights Reserved. <br />Developed by <Link href="https://www.github.com/IMasterCharlie" target="_blank" className="hover:text-luxury-gold transition-colors">Mohammed Mehraj.</Link></p>
          <div className="flex items-center gap-8">
            <button className="hover:text-luxury-gold transition-colors">
              Privacy Policy
            </button>
            <button className="hover:text-luxury-gold transition-colors">
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
