'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Building2, 
  MapPin, 
  ShieldCheck, 
  FileCheck, 
  Map, 
  Users, 
  Briefcase, 
  Mail, 
  Phone, 
  CheckCheck, 
  Loader2, 
  ArrowRight,
  ImageOff,
  Menu,
  X,
  Instagram
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: layered
// Divider Style: D-RULE
// Typography Personality: refined

const brand = {
  name: "Odus Real Estate",
  tagline: "Crafting the Art of Home & Comfort",
  description: "Premium real estate management and property acquisition across Nigeria's most promising landscapes. From the bustling streets of Lagos to the serene hills of Abuja and the fertile plains of Benue, we bridge the gap between luxury and sanctuary.",
  industry: "Real Estate",
  currency: "₦"
};

const IMAGES = {
  hero: "https://picsum.photos/seed/odus-hero/1920/1080",
  products: [
    "https://picsum.photos/seed/odus-p1/800/1000",
    "https://picsum.photos/seed/odus-p2/800/1000",
    "https://picsum.photos/seed/odus-p3/800/1000",
    "https://picsum.photos/seed/odus-p4/800/1000"
  ],
  gallery: [
    "https://picsum.photos/seed/odus-g1/800/600",
    "https://picsum.photos/seed/odus-g2/800/800",
    "https://picsum.photos/seed/odus-g3/600/800",
    "https://picsum.photos/seed/odus-g4/800/600",
    "https://picsum.photos/seed/odus-g5/700/900",
    "https://picsum.photos/seed/odus-g6/800/800"
  ]
};

// --- Hooks ---

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
  }, []);
  return { ref, isVisible };
};

function SafeImage({ src, alt, fill, width, height, className, priority }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-primary/20 ${className}`}>
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

// --- Components ---

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-primary/95 backdrop-blur-xl py-4 shadow-2xl' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-accent flex items-center justify-center text-primary font-black text-xl rounded-sm">O</div>
          <span className="font-heading text-xl font-bold tracking-tight text-white group-hover:text-accent transition-colors">Odus Real Estate</span>
        </a>

        <div className="hidden md:flex items-center gap-10">
          {['Properties', 'About', 'Gallery', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-white/80 hover:text-accent font-medium text-sm transition-colors uppercase tracking-widest">
              {item}
            </a>
          ))}
          <a href="#contact" className="bg-accent text-primary px-6 py-2.5 rounded-full font-bold text-sm hover:brightness-110 transition-all">
            Get Started
          </a>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsOpen(true)}>
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 bg-primary z-[60] transition-transform duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-end p-6">
          <button onClick={() => setIsOpen(false)} className="text-white"><X size={32} /></button>
        </div>
        <div className="flex flex-col items-center gap-8 pt-12">
          {['Properties', 'About', 'Gallery', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-3xl font-heading text-white">
              {item}
            </a>
          ))}
          <a href="#contact" onClick={() => setIsOpen(false)} className="bg-accent text-primary px-10 py-4 rounded-full font-bold text-xl mt-4">
            Get Started
          </a>
        </div>
      </div>
    </nav>
  );
};

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center animate-scaleIn bg-secondary/5 rounded-3xl border border-white/10">
        <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mb-6 border border-accent/40">
          <CheckCheck size={32} className="text-accent" />
        </div>
        <h3 className="font-heading text-3xl font-black text-white mb-3">Message Sent</h3>
        <p className="text-white/60 max-w-sm">Our property specialists will contact you shortly to begin your journey.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-primary/40 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl">
      <div className="space-y-4">
        {(['name', 'email', 'phone'] as const).map(field => (
          <input
            key={field}
            type={field === 'email' ? 'email' : 'text'}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
            required={field !== 'phone'}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/40 text-sm outline-none focus:border-accent transition-all"
          />
        ))}
        <textarea 
          rows={4} 
          placeholder="What property or region are you interested in?"
          value={form.message}
          onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
          required
          className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/40 text-sm outline-none resize-none focus:border-accent transition-all"
        />
      </div>
      <button type="submit" disabled={loading} className="w-full mt-6 bg-accent text-primary py-4 rounded-xl font-bold text-base hover:brightness-110 transition-all disabled:opacity-60 flex justify-center items-center gap-3">
        {loading ? <Loader2 className="animate-spin" size={20} /> : "Submit Inquiry"}
      </button>
    </form>
  );
};

// --- Sections ---

export default function Page() {
  const heroReveal = useScrollReveal();
  const aboutReveal = useScrollReveal();
  const productReveal = useScrollReveal();
  const galleryReveal = useScrollReveal();
  const featuresReveal = useScrollReveal();
  const testimonialReveal = useScrollReveal();
  const contactReveal = useScrollReveal();

  return (
    <main className="relative">
      <Nav />

      {/* HERO-B (HR-B) */}
      <section id="home" className="min-h-screen relative flex items-end pb-24 px-6 md:px-16 overflow-hidden">
        <SafeImage src={IMAGES.hero} alt={brand.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-transparent to-transparent" />
        
        <div ref={heroReveal.ref} className={`relative z-10 max-w-4xl transition-all duration-1000 ${
          heroReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          <h1 className="font-heading text-6xl md:text-[7rem] font-bold text-white leading-[0.9] tracking-tight">
            E k&apos;abo. Sannu da zuwa. <span className="text-accent">Welcome Home.</span>
          </h1>
          <p className="text-white/70 mt-8 text-xl md:text-2xl max-w-2xl leading-relaxed font-light">
            {brand.description}
          </p>
          <div className="flex flex-wrap gap-6 mt-12">
            <a href="#properties" className="bg-accent text-primary px-10 py-4 font-bold text-lg hover:brightness-110 transition rounded-full">
              Discover Your Sanctuary
            </a>
            <a href="#about" className="flex items-center gap-3 text-white border-b-2 border-white/20 pb-2 hover:border-accent hover:text-accent transition-all font-medium">
              Our Vision <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT (V3 Horizontal Split) */}
      <section id="about" ref={aboutReveal.ref} className="py-28 px-6 bg-secondary text-primary">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className={`transition-all duration-1000 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
              <span className="font-sans text-accent font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Our Heritage</span>
              <h2 className="font-heading text-5xl md:text-6xl font-bold leading-tight mb-8">Your Trusted Regional Partner</h2>
              <p className="text-primary/70 text-lg leading-relaxed mb-10">
                With a deep-rooted presence in Nigeria&apos;s key economic hubs, Odus Real Estate Management Agent combines local expertise with a global standard of service. We don&apos;t just sell houses; we curate environments where memories are built and wealth is preserved.
              </p>
              <div className="grid grid-cols-3 gap-6">
                {[
                  { icon: Map, num: "5", label: "States" },
                  { icon: Users, num: "1.1k", label: "Community" },
                  { icon: Briefcase, num: "₦2b+", label: "Assets" }
                ].map((stat, i) => (
                  <div key={i} className="text-center md:text-left">
                    <div className="flex justify-center md:justify-start text-accent mb-2">
                      <stat.icon size={24} />
                    </div>
                    <p className="font-heading text-3xl font-bold">{stat.num}</p>
                    <p className="text-primary/40 text-xs uppercase tracking-widest">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className={`relative aspect-[4/5] rounded-2xl overflow-hidden transition-all duration-1000 delay-300 ${
              aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
            }`}>
              <SafeImage src="https://picsum.photos/seed/odus-about/1000/1200" alt="About Odus" fill className="object-cover" />
              <div className="absolute inset-0 ring-1 ring-primary/10 rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* PROPERTIES (V4 Staggered Grid) */}
      <section id="properties" ref={productReveal.ref} className="py-28 px-6 bg-primary">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4">Featured Listings</h2>
              <p className="text-white/50 text-lg">Explore our handpicked selection of high-value properties.</p>
            </div>
            <a href="#contact" className="text-accent font-bold hover:underline transition-all">View All Properties →</a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "The Heritage Penthouse", price: "₦65,000,000", desc: "4-bedroom sanctuary with floor-to-ceiling glass.", img: IMAGES.products[0] },
              { name: "Lekki Coastal Villa", price: "₦45,000,000", desc: "Modern architecture meets tropical luxury in Lagos.", img: IMAGES.products[1] },
              { name: "Nasarawa Executive Acres", price: "₦8,500,000", desc: "Prime residential plots in a gated community.", img: IMAGES.products[2] },
              { name: "The Benue Retreat", price: "₦15,000,000", desc: "Sustainable luxury farmhouse concept.", img: IMAGES.products[3] }
            ].map((p, i) => (
              <div 
                key={i} 
                style={{ transitionDelay: `${i * 150}ms` }}
                className={`group transition-all duration-700 ${productReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              >
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-6">
                  <SafeImage src={p.img} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-accent font-black text-xl mb-1">{p.price}</p>
                    <p className="text-white/60 text-xs uppercase tracking-widest">{brand.industry}</p>
                  </div>
                </div>
                <h3 className="font-heading text-2xl font-bold text-white mb-2">{p.name}</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-4">{p.desc}</p>
                <a href="#contact" className="inline-flex items-center gap-2 text-accent text-sm font-bold border-b border-accent/20 pb-1 hover:border-accent transition-all">
                  Enquire Now <ArrowRight size={14} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY (Bonus Masonry V6 Clip Wipe) */}
      <section id="gallery" ref={galleryReveal.ref} className="py-28 px-6 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-5xl font-bold text-primary">The Comfort Collection</h2>
            <p className="text-primary/40 mt-4 tracking-[0.2em] uppercase text-sm">Prestige Managed Estates</p>
          </div>
          <div className={`columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 overflow-hidden transition-all duration-1000 ${
            galleryReveal.isVisible ? 'max-w-full opacity-100' : 'max-w-0 opacity-0'
          }`}>
            {IMAGES.gallery.map((src, i) => (
              <div key={i} className="break-inside-avoid relative rounded-2xl overflow-hidden group">
                <SafeImage src={src} alt={`Gallery ${i}`} className="w-full h-auto object-cover" />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* D-RULE DIVIDER */}
      <div className="bg-secondary">
        <div className="py-16 flex items-center gap-8 px-8 max-w-6xl mx-auto">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
          <span className="text-accent font-sans text-xs tracking-[0.4em] uppercase whitespace-nowrap opacity-70">
            {brand.tagline}
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
        </div>
      </div>

      {/* FEATURES (V2 Scale Reveal) */}
      <section ref={featuresReveal.ref} className="py-28 px-6 bg-primary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-5xl font-bold text-white mb-6">Why Choose Odus?</h2>
            <p className="text-white/40 max-w-2xl mx-auto text-lg leading-relaxed">We redefine real estate management through transparency and excellence, bridging the gap between luxury and sanctuary.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Property Management", icon: ShieldCheck, desc: "End-to-end management services ensuring your investment retains its luxury status and value." },
              { title: "Verified Listings", icon: FileCheck, desc: "Every property in our portfolio undergoes rigorous legal and structural verification for peace of mind." },
              { title: "Inter-State Logistics", icon: MapPin, desc: "Seamless viewing and acquisition processes across Niger, Benue, Lagos, Nasarawa, and Abuja." }
            ].map((f, i) => (
              <div 
                key={i} 
                className={`bg-white/5 p-10 rounded-3xl border border-white/10 text-center hover:border-accent/40 transition-all duration-500 ${
                  featuresReveal.isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
                }`}
              >
                <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center text-accent mx-auto mb-8">
                  <f.icon size={32} />
                </div>
                <h3 className="font-heading text-2xl font-bold text-white mb-4">{f.title}</h3>
                <p className="text-white/50 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS (V7 Blur Cascade) */}
      <section ref={testimonialReveal.ref} className="py-28 px-6 bg-accent/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-5xl font-bold text-white text-center mb-16">Voices of Satisfaction</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { name: "Alhaji Musa Bello", text: "Odus handled my acquisition in Abuja with such professionalism. They truly understand the meaning of luxury service and regional cultural nuances.", role: "Property Investor" },
              { name: "Mrs. Chioma Adeyemi", text: "The management of my Lagos apartments has been stress-free since I handed them over to the Odus team. Their reporting is impeccable.", role: "Diaspora Landlord" }
            ].map((t, i) => (
              <div 
                key={i}
                style={{ transitionDelay: `${i * 150}ms` }}
                className={`bg-primary/40 p-10 rounded-3xl border border-white/10 relative transition-all duration-700 ${
                  testimonialReveal.isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-6 blur-sm'
                }`}
              >
                <div className="absolute top-8 left-8 text-accent opacity-20">
                  <Building2 size={40} />
                </div>
                <p className="text-white/80 text-xl leading-relaxed italic mb-8 relative z-10">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                  <div className="w-12 h-12 rounded-full bg-accent text-primary flex items-center justify-center font-bold text-xl">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-heading text-xl font-bold text-white">{t.name}</p>
                    <p className="text-accent text-xs uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT (C2 - Diagonal Split + V5 Vertical Slant) */}
      <section id="contact" ref={contactReveal.ref} className="relative overflow-hidden py-32">
        <div className="absolute inset-0 bg-accent" />
        <div className="absolute inset-0 bg-primary clip-diagonal hidden md:block" />
        <div className="absolute inset-0 bg-primary md:hidden" />
        
        <div className={`relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center transition-all duration-700 ${
          contactReveal.isVisible ? 'opacity-100 skew-y-0 translate-y-0' : 'opacity-0 skew-y-2 translate-y-8'
        }`}>
          <div className="text-white">
            <h2 className="font-heading text-6xl md:text-8xl font-black leading-none mb-6">Start Your Journey</h2>
            <p className="text-white/60 text-xl max-w-sm mb-12">{brand.tagline}</p>
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-white/80">
                <Mail className="text-accent" />
                <span>contact@odusrealestate.ng</span>
              </div>
              <div className="flex items-center gap-4 text-white/80">
                <MapPin className="text-accent" />
                <span>Abuja & Lagos, Nigeria</span>
              </div>
            </div>
          </div>
          <div className="w-full max-w-md ml-auto">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-primary pt-24 pb-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <a href="#home" className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-accent flex items-center justify-center text-primary font-black text-xl rounded-sm">O</div>
                <span className="font-heading text-2xl font-bold text-white">Odus Real Estate</span>
              </a>
              <p className="text-white/40 max-w-xs leading-relaxed">
                Premium real estate management and property acquisition across Nigeria&apos;s most promising landscapes.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Navigation</h4>
              <ul className="space-y-4 text-white/50 text-sm">
                <li><a href="#properties" className="hover:text-accent transition-colors">Properties</a></li>
                <li><a href="#about" className="hover:text-accent transition-colors">About Us</a></li>
                <li><a href="#gallery" className="hover:text-accent transition-colors">Gallery</a></li>
                <li><a href="#contact" className="hover:text-accent transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Social</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-accent hover:text-primary transition-all">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-accent hover:text-primary transition-all">
                  <Briefcase size={20} />
                </a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-white/30 text-xs tracking-widest uppercase">
            <p>&copy; {new Date().getFullYear()} Odus Real Estate Management Agent.</p>
            <p>Designed for Excellence in Nigeria</p>
          </div>
        </div>
      </footer>
    </main>
  );
}