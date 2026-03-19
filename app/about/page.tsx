'use client';

import React from 'react';
import {
  Phone, Mail, MapPin, Clock,
  Instagram, Facebook, Twitter, Rss as Pinterest,
  Users, Sparkles, ShieldCheck,
} from 'lucide-react';

const STATS = [
  { value: '30+',  label: 'Years of Heritage'  },
  { value: '10k+', label: 'Happy Clients'       },
  { value: '500+', label: 'Artisans Supported'  },
];

const FEATURES = [
  {
    icon: Sparkles,
    title: 'Authentic Design',
    desc: 'Every piece tells a story of heritage and handcrafted excellence.',
  },
  {
    icon: ShieldCheck,
    title: 'Premium Quality',
    desc: 'We source only the finest silks, velvets, and cottons for our collection.',
  },
  {
    icon: Users,
    title: 'Personalised Care',
    desc: 'Our stylists help you find the perfect outfit for your special moments.',
  },
];

const CONTACT = [
  { icon: Phone,  label: 'Call Us',   value: '+91 74949 54286'               },
  { icon: Mail,   label: 'Email Us',  value: 'ananyaboutique9495@gmail.com'  },
  { icon: MapPin, label: 'Visit Us',  value: 'Mumbai, Maharashtra, India'    },
  { icon: Clock,  label: 'Hours',     value: 'Mon – Sun: 7am – 10pm'        },
];

export default function AboutPage() {
  return (
    <div className="pb-32 px-4 lg:px-8 max-w-7xl mx-auto pt-10">

      {/* Hero banner */}
      <div className="relative rounded-[3rem] overflow-hidden bg-emerald-950 text-white p-12 lg:p-20 mb-16 shadow-2xl">
        {/* Decorative glow */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[150%] h-[150%] bg-gradient-to-br from-luxury-gold to-transparent rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl lg:text-6xl font-serif font-bold mb-6 leading-tight">
            Crafting Elegance <br />
            <span className="text-luxury-gold italic">Since 1994</span>
          </h1>
          <p className="text-emerald-100/70 text-lg leading-relaxed mb-8">
            Ananya Boutique started as a small dream to preserve the rich heritage of
            Indian textiles while embracing modern aesthetics. From intricate hand-woven
            sarees to contemporary silhouettes, we bring you the finest craftsmanship.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-8">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <p className="text-3xl font-serif font-bold text-luxury-gold">{value}</p>
                <p className="text-xs uppercase tracking-widest text-emerald-100/40">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {FEATURES.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="bg-white p-8 rounded-[2rem] border border-emerald-900/5 shadow-sm hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-700 mb-6">
              <Icon size={24} />
            </div>
            <h3 className="text-xl font-serif font-bold text-emerald-950 mb-3">{title}</h3>
            <p className="text-sm text-emerald-900/50 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      {/* Social links */}
      <div className="flex justify-center gap-5 mb-16">
        {[Instagram, Facebook, Pinterest, Twitter].map((Icon, i) => (
          <button
            key={i}
            aria-label={['Instagram', 'Facebook', 'Pinterest', 'Twitter'][i]}
            className="w-12 h-12 rounded-full border border-emerald-900/10 flex items-center justify-center text-emerald-800 hover:bg-emerald-900 hover:text-white hover:border-emerald-900 transition-all duration-300"
          >
            <Icon size={20} />
          </button>
        ))}
      </div>

      {/* Contact block */}
      <div className="bg-emerald-50 rounded-[3rem] p-12 lg:p-16 border border-emerald-100">
        <h2 className="text-3xl font-serif font-bold text-emerald-950 mb-10 text-center uppercase tracking-widest">
          Connect With Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CONTACT.map(({ icon: Icon, label, value }) => (
            <div key={label} className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-900/30">
                {label}
              </p>
              <p className="text-sm font-bold text-emerald-900 flex items-start gap-2">
                <Icon size={16} className="text-emerald-700 mt-0.5 shrink-0" />
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
