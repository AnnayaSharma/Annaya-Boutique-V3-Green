'use client';

import React from 'react';
import { Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    name: "Ananya Sharma",
    role: "Bride-to-be",
    text: "The Royal Emerald collection made my dream wedding look a reality. The craftsmanship is truly unparalleled.",
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "Fashion Blogger",
    text: "I've never seen such intricate embroidery work. Ananya Boutique is my go-to for every festive season.",
  },
  {
    id: 3,
    name: "Meera Reddy",
    role: "Architect",
    text: "Elegant, sophisticated, and comfortable. Their sarees are a perfect blend of tradition and modern style.",
  },
  {
    id: 4,
    name: "Sanjana Gupta",
    role: "Doctor",
    text: "The quality of the fabric is exceptional. I felt like royalty wearing the Banarasi Silk saree.",
  },
  {
    id: 5,
    name: "Aditi Rao",
    role: "Entrepreneur",
    text: "Their customer service is as premium as their clothes. Highly recommended for bespoke bridal wear.",
  },
  {
    id: 6,
    name: "Riya Singh",
    role: "Interior Designer",
    text: "Every piece tells a story. The attention to detail in the zardozi work is mind-blowing.",
  },
  {
    id: 7,
    name: "Kavita Iyer",
    role: "Artist",
    text: "I love how they preserve traditional techniques while keeping the silhouettes contemporary.",
  },
  {
    id: 8,
    name: "Nisha Verma",
    role: "Model",
    text: "Walking for Ananya Boutique was an honor. Their designs are truly pieces of art.",
  },
  {
    id: 9,
    name: "Divya Kapoor",
    role: "HR Director",
    text: "Picked up a lehenga for my sister's wedding and it was the star of the evening!",
  },
  {
    id: 10,
    name: "Amrita Kaur",
    role: "Chef",
    text: "The colors are vibrant and stay true to what's shown online. A wonderful shopping experience.",
  },
  {
    id: 11,
    name: "Ishita Bose",
    role: "Journalist",
    text: "Timeless designs that you can pass down through generations. Worth every penny.",
  },
  {
    id: 12,
    name: "Tara Malhotra",
    role: "Influencer",
    text: "The Royal Emerald collection is a masterpiece. I've never felt more confident in ethnic wear.",
  }
];

// Avatar colours cycle through a warm emerald palette — no remote images needed.
// This eliminates 12 /_next/image edge requests every time the homepage loads.
const AVATAR_COLOURS = [
  'bg-emerald-100 text-emerald-800',
  'bg-teal-100 text-teal-800',
  'bg-green-100 text-green-800',
  'bg-lime-100 text-lime-800',
  'bg-emerald-200 text-emerald-900',
  'bg-teal-200 text-teal-900',
];

const getInitials = (name: string) =>
  name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

const TestimonialCard = ({ t }: { t: typeof TESTIMONIALS[0] }) => {
  const colourClass = AVATAR_COLOURS[(t.id - 1) % AVATAR_COLOURS.length];

  return (
    <div
      className="w-[300px] lg:w-[400px] bg-white rounded-3xl p-6 shadow-sm border border-emerald-900/5 hover:shadow-xl transition-all duration-500 group relative"
    >
      <Quote className="absolute top-6 right-6 text-emerald-950/5 group-hover:text-luxury-gold/20 transition-colors" size={40} />

      <div className="flex items-center gap-4 mb-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 border-emerald-100 font-bold text-sm select-none shrink-0 ${colourClass}`}>
          {getInitials(t.name)}
        </div>
        <div>
          <h4 className="text-sm font-bold text-emerald-950">{t.name}</h4>
          <p className="text-[10px] font-medium text-emerald-700/60 uppercase tracking-widest">{t.role}</p>
        </div>
      </div>

      <p className="text-sm text-emerald-950/80 leading-relaxed">
        "{t.text}"
      </p>
    </div>
  );
};

const Testimonials: React.FC = () => {
  return (
    <section className="mt-5 mb-5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 mb-12 flex flex-col items-center text-center">
        <span className="text-luxury-gold text-xs font-bold uppercase tracking-[0.4em] mb-4">
          Voices of Luxury
        </span>
        <h2 className="text-3xl lg:text-5xl font-serif font-bold text-emerald-950">
          Loved by our Patrons
        </h2>
      </div>

      <div className="overflow-x-auto no-scrollbar pb-12">
        <div className="grid grid-rows-3 grid-flow-col gap-6 px-4 lg:px-8 w-max">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.id} t={t} />
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 mb-12 flex flex-col items-center text-center">
        <span className="text-luxury-gold text-xs font-bold uppercase tracking-[0.4em] mb-4">
          Client Reviews & Feedback!
        </span>
        <h2 className="text-3xl lg:text-5xl font-serif font-bold text-emerald-950">
          My Customer's Happiness is my Earning!
        </h2>
      </div>
    </section>
  );
};

export default Testimonials;
