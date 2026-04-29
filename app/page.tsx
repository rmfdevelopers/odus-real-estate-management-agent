'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Building2, Key, MapPin, Phone, Mail, Menu, X, 
  ArrowRight, Users, Map, Clock, ShieldCheck, 
  Gem, ImageOff, CheckCheck, Loader2, Home, Landmark
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: layered
// Divider Style: D-STAT
// Typography Personality: refined

// REVEAL VARIANTS MAP:
// hero: V1 (Fade + Slide Up)
// about: V3 (Horizontal Split)
// stats-divider: D-STAT
// products: V2 (Scale Reveal)
// features: V4 (Staggered Children)
// gallery: V6 (Clip Wipe)
// testimonials: V7 (Blur Cascade)
// contact: V5 (Vertical Slant)

const IMAGES = {
  hero: "https://picsum.photos/seed/services1/1200/800",
  products: [
    "https://picsum.photos/seed/services2/800/600",
    "https://picsum.photos/seed/services3/800/600",
    "https://picsum.photos/seed/services4/800/600",
    "https://picsum.photos/seed/services5/800/600"
  ],
  gallery: [
    "https://picsum.photos/seed/services6/800/1000",
    "https://picsum.photos/seed/services7/800/600",
    "https://picsum.photos/seed/services8/800/1200",
    "https://picsum.photos/seed/services9/800/800",
    "https://picsum.photos/seed/services10/800/600",
    "https://picsum.photos/seed/services11/800/1000"
  ]
};

const brand = {
  name: "Odus Real Estate Management Agent",
  tagline: "Home & Comfort: Where Your Lifestyle Finds Its Foundation",
  description: "Expert real estate management and lifestyle curation across Lagos, Abuja, and the North-Central region. We don't just manage properties; we build legacies of comfort.",
  industry: "Real Estate Services"
};

const products = [
  { name: "Lagos Urban Sanctuary", description: "A premium 4-bedroom terrace with modern finishing in the heart of the city.", price: "₦70,000,000" },
  { name: "Abuja Modern Villa", description: "Sophisticated living space designed for comfort and executive lifestyle.", price: "₦45,000,000" },
  { name: "Nasarawa Family Estate", description: "Spacious family home in a serene and secure environment.", price: "₦15,000,000" },
  { name: "Benue Residential Plot", description: "Prime landed property in a fast-developing residential zone.", price: "₦3,000,000" }
];

const features = [
  { title: "Property Management", description: "End-to-end management ensuring your investment retains its value and comfort.", icon: Home },
  { title: "Lifestyle Curation", description: "Matching your personality with the right neighborhood and home design.", icon: Gem },
  { title: "Verified Listings", description: "Every property in our portfolio is strictly vetted for legal and structural integrity.", icon: ShieldCheck }
];

const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
};

function SafeImage({ src, alt, fill, width, height, className, priority }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-primary/60 border border-white/10 ${className}`}>
        <ImageOff size={28} className="text-white/20" />
      </div>
    );
  }
  return (
    <Image src={src} alt={alt} fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} priority={priority}
      onError={() => setError(true)} />
  );
}

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const heroRev = useScrollReveal();
  const aboutRev = useScrollReveal();
  const productsRev = useScrollReveal();
  const featuresRev = useScrollReveal();
  const galleryRev = useScrollReveal();
  const testimonialsRev = useScrollReveal();
  const contactRev = useScrollReveal();

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  return (
    <main className="bg-primary selection:bg-accent selection:text-white">
      {/* HEADER */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-primary/95 backdrop-blur-xl shadow-2xl py-4' : 'bg-transparent py-8'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-accent text-primary font-heading font-black flex items-center justify-center rounded-lg text-2xl">O.</div>
            <span className="text-white font-heading font-bold text-xl hidden sm:block tracking-tight">Odus Management</span>
          </div>

          <nav className="hidden md:flex items-center gap-10">
            {['Home', 'Portfolio', 'Our Story', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '')}`} 
                className="text-white/70 hover:text-accent transition-colors text-sm font-medium tracking-wide">
                {item}
              </a>
            ))}
            <a href="#contact" className="bg-accent text-primary px-6 py-2.5 rounded-full font-bold text-sm hover:brightness-110 transition-all shadow-lg">
              Get Started
            </a>
          </nav>

          <button onClick={() => setMobileMenu(true)} className="md:hidden text-white">
            <Menu size={28} />
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div className={`fixed inset-0 z-[60] transition-all duration-500 ${mobileMenu ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-primary/40 backdrop-blur-md" onClick={() => setMobileMenu(false)} />
        <div className={`absolute right-0 top-0 h-full w-[80%] max-w-sm bg-primary shadow-2xl transform transition-transform duration-500 ease-out ${mobileMenu ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-8 flex flex-col h-full">
            <div className="flex justify-between items-center mb-16">
              <div className="w-10 h-10 bg-accent text-primary font-heading font-black flex items-center justify-center rounded-lg text-2xl">O.</div>
              <button onClick={() => setMobileMenu(false)} className="text-white"><X size={28} /></button>
            </div>
            <div className="flex flex-col gap-8">
              {['Home', 'Portfolio', 'Our Story', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase().replace(' ', '')}`} onClick={() => setMobileMenu(false)}
                  className="text-white text-3xl font-heading font-bold hover:text-accent transition-colors">
                  {item}
                </a>
              ))}
            </div>
            <div className="mt-auto pt-8 border-t border-white/10">
              <p className="text-white/40 text-sm mb-4">Ready to find your foundation?</p>
              <a href="#contact" onClick={() => setMobileMenu(false)} className="block w-full bg-accent text-primary text-center py-4 rounded-xl font-bold">
                Inquire Now
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* HERO SECTION - Pattern HR-C */}
      <section id="home" ref={heroRev.ref} className="min-h-screen grid md:grid-cols-[1.1fr_0.9fr] items-stretch bg-primary overflow-hidden pt-20">
        <div className={`flex flex-col justify-center px-8 md:px-16 py-20 transition-all duration-1000 ${heroRev.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <p className="text-accent font-sans text-xs tracking-[0.4em] uppercase mb-6 font-bold">
            Odus Real Estate Management
          </p>
          <h1 className="font-heading text-6xl md:text-[5.5rem] font-bold text-white leading-[0.9] tracking-tight">
            Discover the Art of <span className="text-accent italic">Comfortable</span> Living
          </h1>
          <p className="text-white/45 mt-8 text-xl max-w-md leading-relaxed">
            Managing Nigeria's most prestigious properties across Lagos, Abuja, Nasarawa, Benue, and Niger.
          </p>
          <div className="flex gap-4 mt-12 flex-wrap">
            <a href="#portfolio" className="bg-accent text-primary px-10 py-4 font-black
              hover:brightness-110 hover:scale-[1.02] transition-all duration-300 rounded-full shadow-xl">
              Explore Properties
            </a>
            <a href="#ourstory" className="border border-white/20 text-white px-10 py-4 font-bold rounded-full hover:bg-white/5 transition-all">
              Our Standard
            </a>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-10 border-t border-white/10 pt-10">
            <div>
              <p className="font-heading text-4xl font-bold text-white">1.1k+</p>
              <p className="text-white/40 text-xs uppercase tracking-widest mt-1">Clients Served</p>
            </div>
            <div>
              <p className="font-heading text-4xl font-bold text-white">5+</p>
              <p className="text-white/40 text-xs uppercase tracking-widest mt-1">States Covered</p>
            </div>
          </div>
        </div>
        <div className="relative min-h-[50vh] md:min-h-full">
          <SafeImage src={IMAGES.hero} alt="Luxury Real Estate Nigeria" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/10 to-transparent" />
          <div className="absolute bottom-10 right-10 bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl max-w-xs animate-float">
            <p className="text-accent font-bold text-sm tracking-widest uppercase mb-1">Featured</p>
            <p className="text-white font-heading text-xl font-bold">Lagos Urban Sanctuary</p>
            <p className="text-white/50 text-xs mt-2">Sharp delivery on high-end urban living spaces.</p>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION - Pattern Split (V3) */}
      <section id="ourstory" ref={aboutRev.ref} className="py-28 px-6 bg-secondary overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className={`md:w-1/2 transition-all duration-1000 ${aboutRev.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <div className="relative">
              <div className="aspect-[4/5] relative rounded-2xl overflow-hidden shadow-2xl z-10">
                <SafeImage src={IMAGES.gallery[0]} alt="Odus Management Standard" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-10 -right-10 w-2/3 h-2/3 bg-accent/20 rounded-2xl -z-0 blur-3xl" />
              <div className="absolute -top-6 -left-6 bg-primary p-6 rounded-xl border border-white/10 z-20 shadow-xl hidden md:block">
                <p className="text-accent font-black text-3xl font-heading">24/7</p>
                <p className="text-white/60 text-xs uppercase tracking-widest">Support Access</p>
              </div>
            </div>
          </div>
          <div className={`md:w-1/2 transition-all duration-1000 delay-300 ${aboutRev.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            <span className="text-accent font-bold uppercase tracking-widest text-sm block mb-4">The Odus Standard</span>
            <h2 className="font-heading text-5xl md:text-6xl font-bold text-primary mb-8 leading-tight">
              Bridging the gap between <span className="text-accent">corporate precision</span> and home comfort.
            </h2>
            <p className="text-primary/60 text-lg leading-relaxed mb-8">
              We believe that property management is more than just transactions; it's about the lifestyle and peace of mind of our clients. With a growing community and years of expertise in the Nigerian market, we bridge the gap between luxury and the warmth of home.
            </p>
            <div className="space-y-6">
              {[
                { label: 'Executive Lifestyle Management', icon: Gem },
                { label: 'Secure Estate Management', icon: ShieldCheck },
                { label: 'Regional Market Expertise', icon: Landmark }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                    <item.icon size={20} />
                  </div>
                  <p className="font-bold text-primary/80 tracking-tight uppercase text-sm">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS DIVIDER */}
      <div className="bg-accent py-14">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-primary/15 text-center">
          {[
            { number: '1,100+', label: 'Active Followers' },
            { number: '₦150M+', label: 'Managed Assets' },
            { number: '100%', label: 'Listing Verity' }
          ].map((s, i) => (
            <div key={i} className="px-8 py-6">
              <p className="text-5xl font-heading font-bold text-primary tracking-tight">{s.number}</p>
              <p className="text-primary/70 text-xs mt-2 font-bold uppercase tracking-[0.2em]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* PORTFOLIO / PRODUCTS - Pattern V2 (Scale Reveal) */}
      <section id="portfolio" ref={productsRev.ref} className="py-28 px-6 bg-primary">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="font-heading text-5xl md:text-7xl font-bold text-white leading-[0.95] mb-6">
                Featured <span className="text-accent italic">Listings</span>
              </h2>
              <p className="text-white/40 text-lg">Carefully selected homes ranging from ₦3m to ₦70m.</p>
            </div>
            <div className="flex items-center gap-4 text-white/50 text-sm font-bold uppercase tracking-widest mb-2">
              <div className="w-12 h-px bg-white/20" />
              Lagos &bull; Abuja &bull; Nasarawa
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((p, i) => (
              <div key={i} 
                className={`transition-all duration-700 ease-out group ${productsRev.isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}
                style={{ transitionDelay: `${i * 150}ms` }}>
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-6 shadow-2xl">
                  <SafeImage src={IMAGES.products[i]} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-accent font-black text-2xl tracking-tighter mb-1">{p.price}</p>
                    <p className="text-white font-heading text-xl font-bold">{p.name}</p>
                  </div>
                </div>
                <p className="text-white/50 text-sm leading-relaxed line-clamp-2 px-2">{p.description}</p>
                <a href="#contact" className="inline-flex items-center gap-2 mt-4 text-accent font-bold text-sm tracking-wide px-2 hover:translate-x-1 transition-transform">
                  View Property <ArrowRight size={14} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION - Pattern V4 (Staggered Children) */}
      <section ref={featuresRev.ref} className="py-28 px-6 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-accent font-bold uppercase tracking-[0.3em] text-xs">The Advantage</span>
            <h2 className="font-heading text-5xl md:text-6xl font-bold text-primary mt-4">Why Choose Odus?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((f, i) => (
              <div key={i} 
                className={`transition-all duration-700 group flex flex-col items-center text-center ${featuresRev.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${i * 200}ms` }}>
                <div className="w-20 h-20 bg-accent text-white rounded-[2rem] flex items-center justify-center mb-8 rotate-3 group-hover:rotate-12 group-hover:scale-110 transition-all shadow-xl">
                  <f.icon size={32} strokeWidth={1.5} />
                </div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">{f.title}</h3>
                <p className="text-primary/60 leading-relaxed max-w-xs">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY SECTION - V6 (Clip Wipe) */}
      <section ref={galleryRev.ref} className="py-28 px-6 bg-primary overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
            <h2 className="font-heading text-5xl md:text-[5rem] font-bold text-white leading-none">Life at Odus</h2>
            <p className="text-white/40 max-w-sm md:pt-4">A glimpse into the lifestyle and comfort curated for our premium portfolio of clients.</p>
          </div>
          <div className={`transition-all duration-1000 ease-out overflow-hidden grid grid-cols-2 md:grid-cols-3 gap-4 ${galleryRev.isVisible ? 'max-w-full opacity-100' : 'max-w-0 opacity-0'}`}>
            {IMAGES.gallery.map((src, i) => (
              <div key={i} className={`relative overflow-hidden rounded-xl ${i % 3 === 0 ? 'aspect-square' : 'aspect-[4/5]'}`}>
                <SafeImage src={src} alt={`Portfolio asset ${i}`} fill className="object-cover hover:scale-110 transition-transform duration-700" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS - V7 (Blur Cascade) */}
      <section ref={testimonialsRev.ref} className="py-28 px-6 bg-accent/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-5xl font-bold text-white text-center mb-16">Client Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { name: "Oluwaseun Adeyemi", text: "Finding a home in Lagos is stressful, but Odus made it feel like a walk in the park. The 'Home & Comfort' theme is exactly what I got.", role: "Homeowner" },
              { name: "Ibrahim Musa", text: "The management of my Abuja properties has been seamless. Professional, transparent, and always reachable.", role: "Property Investor" }
            ].map((t, i) => (
              <div key={i} 
                className={`bg-primary p-10 rounded-3xl border border-white/5 relative transition-all duration-700 ${testimonialsRev.isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-6 blur-sm'}`}
                style={{ transitionDelay: `${i * 200}ms` }}>
                <div className="absolute top-8 right-8 text-accent/20">
                  <Building2 size={40} />
                </div>
                <p className="text-white/80 text-xl leading-relaxed italic mb-8 relative z-10">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                  <div className="w-12 h-12 bg-accent/20 text-accent rounded-full flex items-center justify-center font-bold">{t.name.charAt(0)}</div>
                  <div>
                    <p className="text-white font-bold">{t.name}</p>
                    <p className="text-accent text-xs uppercase tracking-widest font-bold">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION - Pattern C2 (Diagonal Split) (V5 Reveal) */}
      <section id="contact" ref={contactRev.ref} className="relative overflow-hidden py-32 bg-primary">
        <div className={`absolute inset-0 bg-accent transition-transform duration-1000 ${contactRev.isVisible ? 'translate-y-0' : 'translate-y-full'}`} />
        <div className="absolute inset-0 bg-primary [clip-path:polygon(0_0,65%_0,45%_100%,0_100%)] hidden md:block" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className={`transition-all duration-1000 ${contactRev.isVisible ? 'opacity-100 skew-y-0 translate-y-0' : 'opacity-0 skew-y-2 translate-y-8'}`}>
            <h2 className="font-heading text-6xl md:text-[6rem] font-bold text-white leading-none mb-8">
              Let's Find Your <br />Next <span className="text-accent md:text-white italic">Home</span>
            </h2>
            <p className="text-white/60 text-xl max-w-sm mb-12">Expert management across Nigeria's major urban centers. Sharp delivery guaranteed.</p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-white">
                <MapPin className="text-accent" />
                <span className="font-medium">Lagos & Abuja, Nigeria</span>
              </div>
              <div className="flex items-center gap-4 text-white">
                <Mail className="text-accent" />
                <span className="font-medium">contact@odusmanagement.com</span>
              </div>
            </div>
          </div>

          <div className={`w-full max-w-md ml-auto transition-all duration-1000 delay-300 ${contactRev.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            {sent ? (
              <div className="bg-primary p-12 text-center animate-scaleIn rounded-[2rem] border border-white/10 shadow-2xl relative overflow-hidden">
                <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mb-6 border border-accent/40 mx-auto">
                  <CheckCheck size={32} className="text-accent" />
                </div>
                <h3 className="font-heading text-3xl font-bold text-white mb-3">Inquiry Received</h3>
                <p className="text-white/60">One of our lifestyle consultants will reach out to you within 24 hours.</p>
                <button onClick={() => setSent(false)} className="mt-8 text-accent font-bold text-sm border-b border-accent">Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-primary p-8 md:p-12 rounded-[2.5rem] border border-white/10 shadow-2xl">
                <h3 className="font-heading text-3xl font-bold text-white mb-8">Get in Touch</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Full Name"
                    value={form.name}
                    onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/20 text-sm outline-none transition-all focus:border-accent"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/20 text-sm outline-none transition-all focus:border-accent"
                  />
                  <textarea
                    rows={4}
                    placeholder="How can we help you find comfort?"
                    value={form.message}
                    onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/20 text-sm outline-none resize-none transition-all focus:border-accent"
                  />
                  <button type="submit" disabled={loading}
                    className="w-full mt-4 bg-accent text-primary py-5 rounded-xl font-bold text-lg hover:brightness-110 transition-all flex justify-center items-center gap-3">
                    {loading ? <Loader2 className="animate-spin" /> : <>Send Inquiry <ArrowRight size={20} /></>}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-primary py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-accent text-primary font-heading font-black flex items-center justify-center rounded-lg text-2xl">O.</div>
              <span className="text-white font-heading font-bold text-2xl tracking-tight">Odus Management</span>
            </div>
            <p className="text-white/40 max-w-md leading-relaxed mb-8">
              Redefining real estate management in Nigeria with a commitment to luxury, legal integrity, and the deep comfort of home. 
              <br /><br />
              <span className="text-accent/60 italic">Lagos &bull; Abuja &bull; North-Central</span>
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-[0.2em] text-xs">Quick Links</h4>
            <ul className="space-y-4">
              {['Portfolio', 'Our Story', 'Terms of Service', 'Privacy Policy'].map(link => (
                <li key={link}>
                  <a href="#" className="text-white/40 hover:text-accent transition-colors text-sm">{link}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-[0.2em] text-xs">Connect</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-white/40">
                <MapPin size={16} className="text-accent" />
                <span className="text-sm">Lagos & Abuja, Nigeria</span>
              </li>
              <li className="flex items-center gap-3 text-white/40">
                <Mail size={16} className="text-accent" />
                <span className="text-sm">hello@odus.estate</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-xs tracking-widest uppercase">&copy; {new Date().getFullYear()} Odus Management Agent. All rights reserved.</p>
          <div className="flex gap-8">
             <a href="#" className="text-white/20 hover:text-accent transition-all text-xs uppercase tracking-widest">Instagram</a>
             <a href="#" className="text-white/20 hover:text-accent transition-all text-xs uppercase tracking-widest">WhatsApp</a>
          </div>
        </div>
      </footer>
    </main>
  );
}