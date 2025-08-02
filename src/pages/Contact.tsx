import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, ExternalLink, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import toast from 'react-hot-toast';

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const socialPlatforms = [
    {
      name: 'Fiverr',
      url: 'https://www.fiverr.com/pe/pd2XdYE',
      description: 'Professional freelance services',
      color: 'from-green-500 to-green-600',
      icon: '💼',
    },
    {
      name: 'Upwork',
      url: 'https://www.upwork.com/freelancers/~01b957c532cfb47fa0?mp_source=share',
      description: 'Top-rated freelancer profile',
      color: 'from-green-600 to-green-700',
      icon: '⭐',
    },
    {
      name: 'Freelancer',
      url: 'https://www.freelancer.com/u/Omar12sakr',
      description: 'Verified freelancer account',
      color: 'from-blue-500 to-blue-600',
      icon: '🏆',
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/share/14EZJ2ns1Wj/',
      description: 'Connect on Facebook',
      color: 'from-blue-600 to-blue-700',
      icon: '📘',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/omar.hany.sakr.26',
      description: 'Follow my journey',
      color: 'from-pink-500 to-purple-600',
      icon: '📸',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/omar-sakr-869657377',
      description: 'Professional network',
      color: 'from-blue-700 to-blue-800',
      icon: '💼',
    },
    {
      name: 'WhatsApp',
      url: 'https://wa.me/201102812933',
      description: 'Direct messaging',
      color: 'from-green-500 to-green-600',
      icon: '💬',
    },
    {
      name: 'Telegram',
      url: 'https://t.me/Omar12sakr',
      description: 'Instant communication',
      color: 'from-blue-500 to-blue-600',
      icon: '✈️',
    },
    {
      name: 'Reddit',
      url: 'https://www.reddit.com/u/omar_sakr_dev/',
      description: 'Community discussions',
      color: 'from-orange-500 to-red-600',
      icon: '🤖',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/omar12sakr12dev',
      description: 'Code repositories',
      color: 'from-gray-700 to-gray-900',
      icon: '💻',
    },
    {
      name: 'Zoom',
      url: 'https://zoom.us/j/3338650624',
      description: 'Video consultations',
      color: 'from-blue-500 to-blue-600',
      icon: '📹',
    },
  ];

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: 'Email',
      value: 'Omar.hany.sakr.dev@gmail.com',
      href: 'mailto:Omar.hany.sakr.dev@gmail.com',
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: 'Phone',
      value: '+20 110 281 2933',
      href: 'tel:+201102812933',
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: 'Location',
      value: 'Egypt',
      href: '#',
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Message sent successfully! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center mb-16"
          >
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              {t('contact.title')}
            </motion.h1>
            <motion.h2
              variants={itemVariants}
              className="text-xl md:text-2xl gradient-text font-medium mb-6"
            >
              {t('contact.subtitle')}
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg text-white/70 max-w-2xl mx-auto"
            >
              Ready to bring your ideas to life? Let's discuss your project and create something amazing together.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="card p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Send Me a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-white/70 mb-2">
                      {t('contact.form.name')}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-white/70 mb-2">
                      {t('contact.form.email')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-white/70 mb-2">
                    {t('contact.form.subject')}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-white/70 mb-2">
                    {t('contact.form.message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-accent flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>{t('contact.form.send')}</span>
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="card p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Get In Touch</h3>
                
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={info.label}
                      href={info.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
                    >
                      <div className="text-primary-400 group-hover:text-primary-300 transition-colors">
                        {info.icon}
                      </div>
                      <div>
                        <div className="text-white/70 text-sm">{info.label}</div>
                        <div className="text-white font-medium">{info.value}</div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              <div className="card p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Quick Response</h3>
                <p className="text-white/70 mb-6">
                  Need a quick response? Reach out to me on these platforms for faster communication.
                </p>
                
                <div className="flex space-x-4">
                  <a
                    href="https://wa.me/201102812933"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex items-center space-x-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>WhatsApp</span>
                  </a>
                  
                  <a
                    href="https://t.me/Omar12sakr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary flex items-center space-x-2"
                  >
                    <Send className="w-5 h-5" />
                    <span>Telegram</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Platforms */}
      <section className="section-padding bg-black/20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Connect With Me
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Find me on various platforms for different types of communication and collaboration
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {socialPlatforms.map((platform, index) => (
              <motion.a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="card p-6 group cursor-pointer"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${platform.color} flex items-center justify-center text-2xl`}>
                    {platform.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-primary-300 transition-colors">
                      {platform.name}
                    </h3>
                    <p className="text-white/70 text-sm">{platform.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center text-primary-400 group-hover:text-primary-300 transition-colors">
                  <span className="text-sm font-medium">Visit Profile</span>
                  <ExternalLink className="w-4 h-4 ml-2" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card text-center p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Let's discuss your requirements and create a custom solution that exceeds your expectations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/order" className="btn-accent">
                Get a Quote
              </a>
              <a href="/consultation" className="btn-secondary">
                Free Consultation
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

