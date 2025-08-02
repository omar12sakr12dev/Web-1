import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Award, Coffee, Code2, Heart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const About: React.FC = () => {
  const { t } = useLanguage();

  const stats = [
    { label: 'Years of Experience', value: '5+', icon: <Calendar className="w-6 h-6" /> },
    { label: 'Projects Completed', value: '100+', icon: <Code2 className="w-6 h-6" /> },
    { label: 'Happy Clients', value: '50+', icon: <Heart className="w-6 h-6" /> },
    { label: 'Cups of Coffee', value: '1000+', icon: <Coffee className="w-6 h-6" /> },
  ];

  const skills = [
    { name: 'Frontend Development', level: 95, color: 'from-blue-500 to-cyan-500' },
    { name: 'Backend Development', level: 90, color: 'from-green-500 to-emerald-500' },
    { name: 'UI/UX Design', level: 85, color: 'from-purple-500 to-pink-500' },
    { name: 'Mobile Development', level: 80, color: 'from-orange-500 to-red-500' },
    { name: 'DevOps & Cloud', level: 75, color: 'from-indigo-500 to-purple-500' },
    { name: 'Database Design', level: 88, color: 'from-teal-500 to-green-500' },
  ];

  const timeline = [
    {
      year: '2019',
      title: 'Started Web Development Journey',
      description: 'Began learning HTML, CSS, and JavaScript. Built my first static websites.',
    },
    {
      year: '2020',
      title: 'Mastered Frontend Frameworks',
      description: 'Learned React.js and Vue.js. Started building dynamic web applications.',
    },
    {
      year: '2021',
      title: 'Full Stack Development',
      description: 'Expanded to backend development with Node.js, Python, and databases.',
    },
    {
      year: '2022',
      title: 'Freelance Career Launch',
      description: 'Started freelancing on Fiverr, Upwork, and Freelancer platforms.',
    },
    {
      year: '2023',
      title: 'Advanced Technologies',
      description: 'Specialized in TypeScript, Next.js, and cloud technologies.',
    },
    {
      year: '2024',
      title: 'Professional Portfolio',
      description: 'Established strong online presence and expanded client base.',
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
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* Text Content */}
            <div className="space-y-8">
              <motion.div variants={itemVariants}>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {t('about.title')}
                </h1>
                <h2 className="text-xl md:text-2xl gradient-text font-medium mb-6">
                  {t('about.subtitle')}
                </h2>
                <p className="text-lg text-white/70 leading-relaxed">
                  {t('about.description')} I have a passion for creating beautiful, 
                  functional, and user-friendly web applications that solve real-world problems.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-center space-x-6 text-white/70">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>Egypt</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5" />
                  <span>Certified Developer</span>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                <a
                  href="mailto:Omar.hany.sakr.dev@gmail.com"
                  className="btn-primary"
                >
                  Get In Touch
                </a>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  Download Resume
                </a>
              </motion.div>
            </div>

            {/* Profile Image */}
            <motion.div
              variants={itemVariants}
              className="relative"
            >
              <div className="relative w-full max-w-md mx-auto">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 p-1">
                  <div className="w-full h-full rounded-2xl bg-secondary-900 flex items-center justify-center">
                    <div className="text-6xl font-bold gradient-text">OS</div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-4 -right-4 w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center"
                >
                  <Code2 className="w-8 h-8 text-primary-400" />
                </motion.div>
                
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -bottom-4 -left-4 w-12 h-12 bg-accent-500/20 rounded-full flex items-center justify-center"
                >
                  <Heart className="w-6 h-6 text-accent-400" />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-black/20">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card text-center p-6"
              >
                <div className="text-primary-400 mb-4 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-white/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              My Skills & Expertise
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              A comprehensive overview of my technical skills and proficiency levels
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card p-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
                  <span className="text-primary-400 font-medium">{skill.level}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                    className={`h-3 rounded-full bg-gradient-to-r ${skill.color}`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding bg-black/20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              My Journey
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              The path that led me to become a professional web developer
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary-500 to-accent-500 rounded-full" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="card p-6">
                      <div className="text-primary-400 font-bold text-lg mb-2">{item.year}</div>
                      <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                      <p className="text-white/70">{item.description}</p>
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full border-4 border-secondary-900" />
                  </div>

                  <div className="w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Personal Interests */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Beyond Coding
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              When I'm not coding, you can find me exploring these interests
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Technology Trends',
                description: 'Staying updated with the latest in web development and emerging technologies.',
                icon: '🚀',
              },
              {
                title: 'Open Source',
                description: 'Contributing to open source projects and sharing knowledge with the community.',
                icon: '💻',
              },
              {
                title: 'Learning',
                description: 'Continuously learning new programming languages and frameworks.',
                icon: '📚',
              },
            ].map((interest, index) => (
              <motion.div
                key={interest.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="card p-8 text-center"
              >
                <div className="text-4xl mb-4">{interest.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-4">{interest.title}</h3>
                <p className="text-white/70">{interest.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

