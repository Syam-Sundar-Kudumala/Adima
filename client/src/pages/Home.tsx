import { motion } from "framer-motion";
import { HeroBackground } from "@/components/ui/hero-background";
import { SectionHeading } from "@/components/ui/section-heading";
import { WaitingListForm } from "@/components/waiting-list-form";
import { Zap, Mountain, Shield, Battery, Wind, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const scrollToForm = () => {
    document.getElementById("waiting-list")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-10" />
        <HeroBackground />
        
        {/* Abstract Background Image */}
        {/* dark futuristic motorcycle silhouette */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070&auto=format&fit=crop"
            alt="Futuristic Motorcycle Silhouette"
            className="w-full h-full object-cover opacity-20 grayscale brightness-50"
          />
        </div>

        <div className="container px-4 z-20 relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-7xl md:text-9xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 tracking-tighter filter drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              11thONE
            </h1>
            <p className="text-xl md:text-2xl font-light tracking-[0.5em] text-primary uppercase mb-12">
              Powering the Future
            </p>
            
            <Button 
              onClick={scrollToForm}
              size="lg"
              className="h-14 px-8 text-lg bg-primary hover:bg-primary/90 text-background font-bold uppercase tracking-widest rounded-none border border-primary/50 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] transition-all duration-300 transform hover:-translate-y-1"
            >
              Join the Revolution
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ================= ABOUT SECTION ================= */}
      <section className="py-24 relative bg-grid-pattern">
        <div className="container px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionHeading 
                title="Redefining Mobility" 
                subtitle="Transforming the Indian landscape with cutting-edge electric vehicle technology."
              />
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                At 11thOne, we aren't just building vehicles; we're crafting experiences. Our mission is to bridge the gap between sustainability and raw performance, creating machines that dominate the streets and conquer the trails.
              </p>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary"><Zap size={24} /></div>
                  <span className="font-medium">100% Electric</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary"><Mountain size={24} /></div>
                  <span className="font-medium">All-Terrain</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary"><Shield size={24} /></div>
                  <span className="font-medium">Smart Safety</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary"><Battery size={24} /></div>
                  <span className="font-medium">Long Range</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative aspect-square md:aspect-video rounded-2xl overflow-hidden border border-white/10 group"
            >
              {/* engineer working on electric bike prototype */}
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop" 
                alt="Engineering Excellence" 
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent flex items-end p-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Designed in India</h3>
                  <p className="text-gray-300">Engineered for the world.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= PRODUCT SHOWCASE 1: MEN'S ADVENTURE BIKE ================= */}
      <section className="py-24 bg-secondary/30 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        
        <div className="container px-4">
          <SectionHeading 
            title="Project: NOMAD" 
            subtitle="The Ultimate EV Adventure Motorcycle"
            centered
          />
          
          <div className="grid lg:grid-cols-2 gap-16 items-center mt-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <div className="space-y-8">
                <div className="flex gap-4 items-start">
                  <div className="bg-primary/20 p-3 rounded-lg text-primary mt-1">
                    <Mountain className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Rugged Terrain Mastery</h3>
                    <p className="text-muted-foreground">Built to handle the toughest off-road trails with high ground clearance and advanced suspension.</p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="bg-primary/20 p-3 rounded-lg text-primary mt-1">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Instant Torque</h3>
                    <p className="text-muted-foreground">Experience raw electric power that delivers instant acceleration when you need it most.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="bg-primary/20 p-3 rounded-lg text-primary mt-1">
                    <Battery className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Endurance Battery Pack</h3>
                    <p className="text-muted-foreground">Designed for long-distance adventure without range anxiety.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 border border-primary/30 bg-primary/5 rounded-lg inline-block">
                <span className="text-primary font-bold tracking-wider uppercase text-sm">Status: Advanced Prototype Stage</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative order-1 lg:order-2"
            >
              {/* Electric dirt bike jumping or in action */}
              <img 
                src="https://pixabay.com/get/g86473da552932c533dbe22f3654a5c6b28c5dc503602c63b34210765934b1a987261774c6dfc07b037e78ad3af484e5a9c5feb42acedc7798a1a951cc9a04a59_1280.jpg" 
                alt="Adventure Motorcycle Concept" 
                className="w-full rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-grid-pattern opacity-50 -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= PRODUCT SHOWCASE 2: WOMEN'S SCOOTER ================= */}
      <section className="py-24 relative">
        <div className="container px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Modern electric scooter in city */}
              <img 
                src="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop" 
                alt="Urban Scooter Concept" 
                className="w-full rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] grayscale hover:grayscale-0 transition-all duration-700"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-white to-purple-400">
                Project: AURA
              </h2>
              <p className="text-muted-foreground text-lg md:text-xl font-light tracking-wide mb-12">
                Elegance meets efficiency. Designed specifically for the modern urban woman.
              </p>

              <div className="space-y-8">
                <div className="flex gap-4 items-start">
                  <div className="bg-purple-500/20 p-3 rounded-lg text-purple-400 mt-1">
                    <Wind className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Lightweight Agility</h3>
                    <p className="text-muted-foreground">Aerodynamic featherweight frame for effortless maneuvering in city traffic.</p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="bg-purple-500/20 p-3 rounded-lg text-purple-400 mt-1">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Smart Connectivity</h3>
                    <p className="text-muted-foreground">Seamless integration with your smartphone for navigation, tracking, and music.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="bg-purple-500/20 p-3 rounded-lg text-purple-400 mt-1">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Enhanced Safety</h3>
                    <p className="text-muted-foreground">Advanced stability control and 360-degree lighting for night-time visibility.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 border border-purple-500/30 bg-purple-500/5 rounded-lg inline-block">
                <span className="text-purple-400 font-bold tracking-wider uppercase text-sm">Status: Design & Prototyping</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= WAITING LIST SECTION ================= */}
      <section id="waiting-list" className="py-24 relative overflow-hidden bg-secondary/50">
        <div className="container px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <SectionHeading 
              title="Be The First" 
              subtitle="Join our exclusive waiting list to get early access, behind-the-scenes updates, and launch invites."
              centered
              className="mb-16"
            />
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <WaitingListForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="py-12 border-t border-white/10 bg-background relative z-10">
        <div className="container px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div>
              <h2 className="text-2xl font-black mb-4 tracking-tighter">11thONE</h2>
              <p className="text-muted-foreground text-sm max-w-xs">
                Revolutionizing electric mobility for the adventurous spirit.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-primary">Contact</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li><a href="mailto:hello@11thone.com" className="hover:text-white transition-colors">hello@11thone.com</a></li>
                <li>Hyderabad, India</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-primary">Social</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter / X</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} 11thOne Electric Mobility. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
