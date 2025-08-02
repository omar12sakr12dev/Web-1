import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Palette, Zap, Users, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Home: React.FC = () => {
  const { t } = useLanguage();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const sections = [
    {
      id: 'about',
      title: t('home.about.title'),
      description: t('home.about.description'),
      icon: <Users className="w-8 h-8" />,
      path: '/about',
      color: 'from-blue-500 to-purple-600',
      delay: 0.1,
    },
    {
      id: 'portfolio',
      title: t('home.portfolio.title'),
      description: t('home.portfolio.description'),
      icon: <Code className="w-8 h-8" />,
      path: '/portfolio',
      color: 'from-purple-500 to-pink-600',
      delay: 0.2,
    },
    {
      id: 'contact',
      title: t('home.contact.title'),
      description: t('home.contact.description'),
      icon: <Palette className="w-8 h-8" />,
      path: '/contact',
      color: 'from-pink-500 to-red-600',
      delay: 0.3,
    },
    {
      id: 'order',
      title: t('home.order.title'),
      description: t('home.order.description'),
      icon: <Zap className="w-8 h-8" />,
      path: '/order',
      color: 'from-red-500 to-orange-600',
      delay: 0.4,
    },
  ];

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
    <div className="min-h-screen relative overflow-hidden">
      {/* Mouse Follower */}
      <motion.div
        className="fixed w-4 h-4 bg-primary-400/30 rounded-full pointer-events-none z-10 mix-blend-difference"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
        }}
      />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative">
        <div className="container-custom px-4 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Main Title */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
            >
              <span className="block">OMAR SAKR</span>
              <span className="block gradient-text">
                {t('home.hero.title')}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.h2
              variants={itemVariants}
              className="text-xl md:text-2xl lg:text-3xl text-white/80 font-light max-w-4xl mx-auto"
            >
              {t('home.hero.subtitle')}
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed"
            >
              {t('home.hero.description')}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to="/portfolio">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-accent flex items-center space-x-2 group"
                >
                  <span>{t('home.hero.cta')}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>

              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary"
                >
                  {t('home.hero.contact')}
                </motion.button>
              </Link>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              variants={itemVariants}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-white/50"
              >
                <ChevronDown className="w-6 h-6" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + i * 10}%`,
              }}
            />
          ))}
        </div>
      </section>

      {/* Sections Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Explore My World
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Discover my skills, projects, and services through these interactive sections
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: section.delay }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Link to={section.path}>
                  <div className="card h-full relative overflow-hidden">
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                    
                    {/* Content */}
                    <div className="relative z-10 p-8">
                      <div className="flex items-center space-x-4 mb-6">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                          className={`p-3 rounded-lg bg-gradient-to-br ${section.color} text-white`}
                        >
                          {section.icon}
                        </motion.div>
                        <h3 className="text-2xl font-bold text-white">
                          {section.title}
                        </h3>
                      </div>
                      
                      <p className="text-white/70 text-lg leading-relaxed mb-6">
                        {section.description}
                      </p>
                      
                      <motion.div
                        className="flex items-center text-primary-400 group-hover:text-white transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        <span className="font-medium">Explore</span>
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </motion.div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-4 right-4 w-20 h-20 bg-white/5 rounded-full blur-xl" />
                    <div className="absolute bottom-4 left-4 w-16 h-16 bg-primary-400/10 rounded-full blur-lg" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Preview */}
      <section className="section-padding bg-black/20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Technologies I Master
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Cutting-edge tools and frameworks for modern web development
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[
              'React', 'TypeScript', 'Node.js', 'Python', 'MongoDB', 'PostgreSQL',
              'AWS', 'Docker', 'GraphQL', 'Next.js', 'Tailwind', 'Firebase'
            ].map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="card text-center p-6"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-accent-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {tech.charAt(0)}
                  </span>
                </div>
                <h3 className="text-white font-medium">{tech}</h3>
              </motion.div>
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
              Let's collaborate and bring your ideas to life with cutting-edge web technologies
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/order">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-accent"
                >
                  Start a Project
                </motion.button>
              </Link>
              <Link to="/consultation">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary"
                >
                  Free Consultation
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;

