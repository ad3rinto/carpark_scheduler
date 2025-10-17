import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, MapPin, Check, Award, Users, Heart, Shield } from 'lucide-react';

export default function Ten10Website() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.message) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({ name: '', organization: '', email: '', phone: '', message: '' });
      }, 3000);
    }
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-slate-800">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-white/95 py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">T10</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-blue-900">Ten10 Services</h1>
                <p className="text-xs text-slate-600">Clinical & Care Excellence</p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('services')} className="text-slate-700 hover:text-blue-900 transition-colors font-medium">Services</button>
              <button onClick={() => scrollToSection('about')} className="text-slate-700 hover:text-blue-900 transition-colors font-medium">About Us</button>
              <button onClick={() => scrollToSection('contact')} className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-all shadow-sm">Contact</button>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-slate-700">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 shadow-lg">
            <div className="px-4 py-4 space-y-3">
              <button onClick={() => scrollToSection('services')} className="block w-full text-left py-2 text-slate-700 hover:text-blue-900">Services</button>
              <button onClick={() => scrollToSection('about')} className="block w-full text-left py-2 text-slate-700 hover:text-blue-900">About Us</button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 text-center">Contact</button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-block mb-4 px-4 py-2 bg-green-700/30 rounded-full text-sm font-medium">
              Trusted by Healthcare Professionals
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Clinical Excellence.<br />Compassionate Care.
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Professional residential and nursing care services delivered by qualified clinical teams. Where evidence-based practice meets person-centered support.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => scrollToSection('contact')} className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all shadow-lg">
                Make a Referral
              </button>
              <button onClick={() => scrollToSection('services')} className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all">
                Our Services
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4">Our Services</h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Comprehensive care solutions designed for complex clinical needs</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Residential Care */}
            <div className="bg-gradient-to-br from-stone-50 to-stone-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all border border-stone-200">
              <div className="w-16 h-16 bg-green-700 rounded-xl flex items-center justify-center mb-6">
                <Heart size={32} className="text-white" />
              </div>
              <h4 className="text-2xl font-bold text-blue-900 mb-4">Residential Care</h4>
              <p className="text-slate-700 mb-6 leading-relaxed">
                24-hour personal care for individuals who need support with daily living activities. Our trained care teams provide dignity-focused assistance in a homely environment.
              </p>
              <ul className="space-y-3">
                {['Person-centered care plans', 'Medication management', 'Activities & wellbeing programs', 'Nutritional support'].map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check size={20} className="text-green-700 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Nursing Care */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all border border-blue-200">
              <div className="w-16 h-16 bg-blue-900 rounded-xl flex items-center justify-center mb-6">
                <Shield size={32} className="text-white" />
              </div>
              <h4 className="text-2xl font-bold text-blue-900 mb-4">Nursing Care</h4>
              <p className="text-slate-700 mb-6 leading-relaxed">
                Registered nurse-led care for complex clinical conditions. Continuous clinical oversight for residents with higher acuity needs and medical dependencies.
              </p>
              <ul className="space-y-3">
                {['24/7 RGN/RMN supervision', 'Clinical interventions & monitoring', 'Chronic disease management', 'Palliative & end-of-life care'].map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check size={20} className="text-blue-900 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Care Standards Banner */}
          <div className="mt-12 bg-gradient-to-r from-green-700 to-green-600 rounded-2xl p-8 text-white">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div>
                <h5 className="text-2xl font-bold mb-2">CQC Regulated & Monitored</h5>
                <p className="text-green-100">Compliant with Health & Social Care Act 2008 regulations</p>
              </div>
              <div className="flex gap-8">
                <div className="text-center">
                  <Award size={40} className="mx-auto mb-2" />
                  <p className="text-sm font-medium">Quality Assured</p>
                </div>
                <div className="text-center">
                  <Users size={40} className="mx-auto mb-2" />
                  <p className="text-sm font-medium">Clinical Teams</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-6">About Ten10 Services</h3>
              <div className="space-y-4 text-slate-700 leading-relaxed">
                <p className="text-lg">
                  We're a clinically-led care provider committed to delivering exceptional outcomes for residents with complex needs. Our multidisciplinary teams combine nursing expertise with person-centered support.
                </p>
                <p>
                  Every resident receives an individualized care plan developed in collaboration with referring professionals, families, and our clinical staff. We maintain robust governance frameworks and participate in continuous quality improvement initiatives.
                </p>
                <p>
                  Our services are built on evidence-based practice, transparent communication, and clinical accountability. We understand the responsibilities healthcare professionals face when making care placements.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {[
                { title: 'Clinical Governance', desc: 'Robust policies, audits, and incident management systems ensure safe, high-quality care delivery.' },
                { title: 'Professional Collaboration', desc: 'We work closely with GPs, consultants, and community health teams to ensure coordinated care.' },
                { title: 'Safeguarding Priority', desc: 'Comprehensive safeguarding protocols with designated leads and regular staff training.' },
                { title: 'Transparent Reporting', desc: 'Regular clinical updates and open communication channels with referring professionals.' }
              ].map((item, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
                  <h5 className="font-bold text-blue-900 mb-2">{item.title}</h5>
                  <p className="text-slate-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4">Get In Touch</h3>
            <p className="text-lg text-slate-600">Discuss referrals or arrange a professional visit</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-stone-50 rounded-2xl p-8 border border-stone-200">
              <h4 className="text-2xl font-bold text-blue-900 mb-6">Professional Enquiry</h4>
              {formSubmitted ? (
                <div className="bg-green-100 border border-green-300 text-green-800 px-6 py-4 rounded-lg">
                  <p className="font-semibold">Thank you for your enquiry</p>
                  <p className="text-sm mt-1">Our team will respond within 24 hours</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Organization</label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) => setFormData({...formData, organization: e.target.value})}
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Message *</label>
                    <textarea
                      rows="4"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />
                  </div>
                  <button onClick={handleSubmit} className="w-full bg-blue-900 text-white py-4 rounded-lg font-semibold hover:bg-blue-800 transition-all shadow-sm">
                    Submit Enquiry
                  </button>
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h4 className="text-2xl font-bold text-blue-900 mb-6">Contact Details</h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone size={24} className="text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">Phone</p>
                      <p className="text-slate-600">0800 123 4567</p>
                      <p className="text-sm text-slate-500">Available 24/7 for urgent referrals</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-700 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail size={24} className="text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">Email</p>
                      <p className="text-slate-600">referrals@ten10services.co.uk</p>
                      <p className="text-sm text-slate-500">Response within 24 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin size={24} className="text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">Address</p>
                      <p className="text-slate-600">Ten10 Services Care Home</p>
                      <p className="text-slate-600">United Kingdom</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h5 className="font-bold text-blue-900 mb-3">For Healthcare Professionals</h5>
                <p className="text-slate-700 text-sm mb-4">
                  We welcome site visits and pre-admission assessments. Contact us to arrange a convenient time to tour our facilities and meet our clinical team.
                </p>
                <p className="text-sm text-slate-600">
                  Urgent placements: Call our 24/7 admissions line
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-blue-900 font-bold">T10</span>
                </div>
                <span className="font-bold text-lg">Ten10 Services</span>
              </div>
              <p className="text-blue-200 text-sm">Clinical and care excellence for those who need it most.</p>
            </div>
            <div>
              <h6 className="font-bold mb-3">Quick Links</h6>
              <ul className="space-y-2 text-sm text-blue-200">
                <li><button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors">Services</button></li>
                <li><button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors">About Us</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors">Contact</button></li>
              </ul>
            </div>
            <div>
              <h6 className="font-bold mb-3">Professional Resources</h6>
              <ul className="space-y-2 text-sm text-blue-200">
                <li>CQC Registration</li>
                <li>Safeguarding Policies</li>
                <li>Quality Reports</li>
                <li>Professional Standards</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-blue-800 pt-8 text-center text-sm text-blue-200">
            <p>&copy; {new Date().getFullYear()} Ten10 Services. All rights reserved. | Registered with CQC | ten10services.co.uk</p>
          </div>
        </div>
      </footer>
    </div>
  );
}