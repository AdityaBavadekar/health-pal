import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Shield, Calendar, Bell, Users, Phone, Mail, ArrowRight, Sparkles, Zap, CheckCircle } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const FloatingElement = ({ children, delay = 0 }) => (
    <div
      className="animate-pulse"
      style={{
        animation: `float 6s ease-in-out infinite`,
        animationDelay: `${delay}s`
      }}
    >
      {children}
    </div>
  );

  const GradientBlob = ({ className, style }) => (
    <div
      className={`absolute rounded-full blur-xl opacity-30 ${className}`}
      style={{
        background: 'linear-gradient(45deg, #10b981, #34d399, #6ee7b7)',
        ...style,
        transform: `translate(${mousePos.x * 0.02}px, ${mousePos.y * 0.02}px)`,
      }}
    />
  );

  return (
    <div className="w-full overflow-hidden">
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 0 40px rgba(16, 185, 129, 0.6); }
            50% { box-shadow: 0 0 80px rgba(16, 185, 129, 0.8); }
          }
          @keyframes gradient-shift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .gradient-text {
            background: linear-gradient(-45deg, #10b981, #34d399, #6ee7b7, #a7f3d0);
            background-size: 400% 400%;
            animation: gradient-shift 3s ease infinite;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          .glow-border {
            animation: pulse-glow 2s ease-in-out infinite;
          }
          .glass-effect {
            backdrop-filter: blur(20px);
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
          .hero-bg {
            background: linear-gradient(135deg, #064e3b 0%, #065f46 25%, #047857 50%, #059669 75%, #10b981 100%);
            position: relative;
          }
          .hero-bg::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background:
              radial-gradient(circle at 20% 30%, rgba(16, 185, 129, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(52, 211, 153, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(110, 231, 183, 0.3) 0%, transparent 50%);
            animation: gradient-shift 8s ease infinite;
          }
        `
      }} />

      {/* Hero Section */}
      <section className="h-screen hero-bg flex items-center justify-center relative overflow-hidden">
        <GradientBlob className="w-96 h-96 top-20 -left-20" />
        <GradientBlob className="w-80 h-80 bottom-20 -right-20" />
        <GradientBlob className="w-64 h-64 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />

        {/* Floating Icons */}
        <FloatingElement delay={0}>
          <Heart className="absolute top-20 left-20 text-emerald-300 w-8 h-8 opacity-60" />
        </FloatingElement>
        <FloatingElement delay={1}>
          <Shield className="absolute top-40 right-32 text-emerald-200 w-6 h-6 opacity-50" />
        </FloatingElement>
        <FloatingElement delay={2}>
          <Calendar className="absolute bottom-40 left-32 text-emerald-400 w-7 h-7 opacity-60" />
        </FloatingElement>
        <FloatingElement delay={0.5}>
          <Bell className="absolute top-32 right-20 text-emerald-300 w-5 h-5 opacity-50" />
        </FloatingElement>

        <div className="text-center text-white p-8 max-w-4xl relative z-10">
          <div className="mb-6">
            <Sparkles className="inline-block w-12 h-12 text-emerald-300 mb-4 animate-pulse" />
          </div>
          <h1 className="text-8xl font-bold mb-6 gradient-text leading-tight">
            Health Pal
          </h1>
          <p className="text-2xl mb-4 text-emerald-100 font-light">
            Your Health, Our Priority
          </p>
          <p className="text-lg mb-12 text-emerald-200 opacity-90 max-w-2xl mx-auto">
            Experience the future of healthcare management with AI-powered insights,
            seamless connectivity, and personalized care.
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            <button
              type="button"
              onClick={handleSignUp}
              className="group bg-emerald-500 text-white px-10 py-5 rounded-full text-lg font-semibold hover:bg-emerald-400 transition-all duration-300 glow-border transform hover:scale-105 hover:shadow-2xl flex items-center gap-3"
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              type="button"
              onClick={handleLogin}
              className="glass-effect text-white px-10 py-5 rounded-full text-lg font-semibold hover:bg-white hover:text-emerald-600 transition-all duration-300 transform hover:scale-105 border-2 border-emerald-300"
            >
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-32 px-8 bg-gradient-to-br from-emerald-50 to-emerald-100 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-32 h-32 bg-emerald-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-emerald-400 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="mb-8">
            <Zap className="inline-block w-16 h-16 text-emerald-600 mb-4" />
          </div>
          <h2 className="text-6xl font-bold mb-8 text-emerald-900 leading-tight">
            Revolutionizing
            <span className="gradient-text block">Healthcare</span>
          </h2>
          <p className="text-xl text-emerald-700 leading-relaxed max-w-4xl mx-auto mb-12">
            Welcome to HealthPal, where cutting-edge technology meets compassionate care.
            Our platform seamlessly connects patients, doctors, and hospitals, creating an
            ecosystem that makes healthcare accessible, efficient, and intelligent.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {[
              { icon: Heart, title: "AI-Powered Care", desc: "Smart health insights tailored to you" },
              { icon: Shield, title: "Secure & Private", desc: "Your data encrypted and protected" },
              { icon: Users, title: "Connected Community", desc: "Trusted by thousands of users" }
            ].map((item, index) => (
              <div key={index} className="glass-effect p-8 rounded-3xl hover:transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
                <item.icon className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-emerald-800 mb-2">{item.title}</h3>
                <p className="text-emerald-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900"></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1579126038374-6064e9370f0f?q=80&w=2072')"
          }}
        ></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-emerald-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-emerald-300 rounded-full blur-2xl opacity-30 animate-pulse"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-emerald-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
        </div>
        <div className="relative max-w-6xl mx-auto px-8 z-10">
          <div className="text-center">
            <div className="mb-8">
              <Heart className="inline-block w-20 h-20 text-emerald-300 mb-6 animate-pulse" />
            </div>
            <h3 className="text-6xl font-bold mb-8 text-white leading-tight">
              For <span className="gradient-text">Patients</span>
            </h3>
            <p className="text-emerald-100 text-xl leading-relaxed mb-12 max-w-4xl mx-auto">
              Transform your healthcare experience with HealthPal's intelligent platform.
              Get personalized medication reminders, effortless appointment scheduling,
              and instant access to your complete medical history.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                { icon: Bell, title: "Smart Reminders", desc: "Never miss a medication again" },
                { icon: Calendar, title: "Easy Scheduling", desc: "Book appointments in seconds" },
                { icon: Shield, title: "Secure History", desc: "Your medical records, always accessible" }
              ].map((item, index) => (
                <div key={index} className="glass-effect p-6 rounded-2xl hover:transform hover:scale-105 transition-all duration-300">
                  <item.icon className="w-10 h-10 text-emerald-300 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                  <p className="text-emerald-200 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={handleSignUp}
              className="group bg-gradient-to-r from-emerald-500 to-emerald-400 text-white px-12 py-6 rounded-full text-xl font-semibold hover:from-emerald-400 hover:to-emerald-300 transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-emerald-500/50 flex items-center gap-3 mx-auto"
            >
              <span>Start Your Journey</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-32 bg-gradient-to-br from-gray-50 to-emerald-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6 text-emerald-900">
              Why Choose <span className="gradient-text">HealthPal?</span>
            </h2>
            <p className="text-xl text-emerald-700 max-w-3xl mx-auto">
              Experience healthcare like never before with our comprehensive suite of innovative features
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Zap, title: "Lightning Fast", desc: "Instant responses and real-time updates" },
              { icon: Shield, title: "Secure Data", desc: "Your health data is our priority" },
              { icon: Heart, title: "Personalized Care", desc: "Tailored recommendations just for you" },
              { icon: Users, title: "Expert Network", desc: "Connect with top healthcare professionals" }
            ].map((feature, index) => (
              <div key={index} className="group p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 border border-emerald-100">
                <div className="bg-emerald-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-200 transition-colors">
                  <feature.icon className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-emerald-800 mb-3">{feature.title}</h3>
                <p className="text-emerald-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-emerald-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-800 via-emerald-900 to-emerald-800"></div>
        <div className="relative max-w-6xl mx-auto px-8 z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 text-white">
              For <span className="gradient-text">Hospitals</span>
            </h2>
            <p className="text-xl text-emerald-200 max-w-3xl mx-auto">
              Streamline operations, reduce costs, and improve patient outcomes with HealthPal's hospital management solutions
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Digital Records", icon: Shield, desc: "Secure, instant access to patient histories" },
              { label: "Smart Scheduling", icon: Calendar, desc: "Optimize appointments and reduce wait times" },
              { label: "Resource Management", icon: Users, desc: "Efficient staff and equipment allocation" },
              { label: "Real-time Monitoring", icon: Bell, desc: "Track patient vitals and alerts instantly" }
            ].map((stat, index) => (
              <div key={index} className="text-white">
                <stat.icon className="w-12 h-12 text-emerald-300 mx-auto mb-4" />
                <div className="text-xl font-bold mb-2 text-emerald-100">{stat.label}</div>
                <div className="text-emerald-200 text-sm">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-emerald-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-40 h-40 bg-emerald-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-emerald-400 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center px-8 relative z-10">
          <Sparkles className="inline-block w-16 h-16 text-emerald-600 mb-6" />
          <h2 className="text-5xl font-bold mb-8 text-emerald-900">
            Ready to Transform Your <span className="gradient-text">Health Journey?</span>
          </h2>
          <p className="text-xl text-emerald-700 mb-12 max-w-2xl mx-auto">
            Join thousands of users who have already discovered the power of intelligent healthcare management.
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            <button
              type="button"
              onClick={handleSignUp}
              className="group bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-12 py-6 rounded-full text-xl font-semibold hover:from-emerald-500 hover:to-emerald-400 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-emerald-500/50 flex items-center gap-3"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              type="button"
              onClick={handleLogin}
              className="bg-transparent text-emerald-600 px-12 py-6 rounded-full text-xl font-semibold border-2 border-emerald-600 hover:bg-emerald-600 hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-emerald-900 to-emerald-800 text-white py-20 px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
            }}
          ></div>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-6">
                <Heart className="w-10 h-10 text-emerald-300 mr-3" />
                <h2 className="text-4xl font-bold gradient-text">Health Pal</h2>
              </div>
              <p className="text-emerald-200 text-lg leading-relaxed">
                Your trusted companion for intelligent healthcare management and personalized wellness solutions.
              </p>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-semibold mb-6 text-emerald-100">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-center md:justify-start">
                  <Mail className="w-6 h-6 text-emerald-300 mr-3" />
                  <span className="text-emerald-200">healthpal1427@gmail.com</span>
                </div>
                <div className="flex items-center justify-center md:justify-start">
                  <Phone className="w-6 h-6 text-emerald-300 mr-3" />
                  <span className="text-emerald-200">+91 9356616091</span>
                </div>
              </div>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-semibold mb-6 text-emerald-100">Quick Links</h3>
              <div className="space-y-3">
                {["About Us", "Privacy Policy", "Terms of Service", "Support"].map((link, index) => (
                  <div key={index} className="text-emerald-200 hover:text-emerald-100 transition-colors cursor-pointer">
                    {link}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-emerald-700 mt-12 pt-8 text-center">
            <p className="text-emerald-300">
              © 2025 HealthPal. All rights reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;