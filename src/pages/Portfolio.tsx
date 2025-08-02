import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Eye, Filter, Search } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Portfolio: React.FC = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  // Mock portfolio projects (16 examples as requested)
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment integration, and admin dashboard.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      category: 'fullstack',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'JWT'],
      githubUrl: 'https://github.com/omar12sakr12dev/ecommerce-platform',
      liveUrl: 'https://ecommerce-demo.omarsakr.dev',
      featured: true,
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Modern task management application with drag-and-drop functionality, real-time updates, and team collaboration features.',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
      category: 'frontend',
      technologies: ['React', 'TypeScript', 'Framer Motion', 'Firebase'],
      githubUrl: 'https://github.com/omar12sakr12dev/task-manager',
      liveUrl: 'https://tasks.omarsakr.dev',
      featured: true,
    },
    {
      id: 3,
      title: 'Restaurant API',
      description: 'RESTful API for restaurant management system with menu management, order processing, and customer reviews.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
      category: 'backend',
      technologies: ['Node.js', 'Express', 'PostgreSQL', 'JWT', 'Swagger'],
      githubUrl: 'https://github.com/omar12sakr12dev/restaurant-api',
      liveUrl: 'https://api.restaurant.omarsakr.dev',
      featured: false,
    },
    {
      id: 4,
      title: 'Weather Mobile App',
      description: 'Cross-platform mobile app for weather forecasting with location-based services and beautiful animations.',
      image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop',
      category: 'mobile',
      technologies: ['React Native', 'TypeScript', 'Redux', 'Weather API'],
      githubUrl: 'https://github.com/omar12sakr12dev/weather-app',
      liveUrl: 'https://weather.omarsakr.dev',
      featured: true,
    },
    {
      id: 5,
      title: 'Portfolio Website',
      description: 'Responsive portfolio website with modern design, smooth animations, and contact form integration.',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop',
      category: 'frontend',
      technologies: ['React', 'Tailwind CSS', 'Framer Motion', 'EmailJS'],
      githubUrl: 'https://github.com/omar12sakr12dev/portfolio-v2',
      liveUrl: 'https://portfolio.omarsakr.dev',
      featured: false,
    },
    {
      id: 6,
      title: 'Blog CMS',
      description: 'Content management system for blogs with rich text editor, SEO optimization, and multi-author support.',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop',
      category: 'fullstack',
      technologies: ['Next.js', 'Prisma', 'PostgreSQL', 'NextAuth', 'TinyMCE'],
      githubUrl: 'https://github.com/omar12sakr12dev/blog-cms',
      liveUrl: 'https://blog.omarsakr.dev',
      featured: true,
    },
    {
      id: 7,
      title: 'Chat Application',
      description: 'Real-time chat application with private messaging, group chats, and file sharing capabilities.',
      image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800&h=600&fit=crop',
      category: 'fullstack',
      technologies: ['React', 'Socket.io', 'Node.js', 'MongoDB', 'Cloudinary'],
      githubUrl: 'https://github.com/omar12sakr12dev/chat-app',
      liveUrl: 'https://chat.omarsakr.dev',
      featured: false,
    },
    {
      id: 8,
      title: 'Fitness Tracker',
      description: 'Mobile fitness tracking app with workout plans, progress tracking, and social features.',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
      category: 'mobile',
      technologies: ['React Native', 'Firebase', 'Redux Toolkit', 'Chart.js'],
      githubUrl: 'https://github.com/omar12sakr12dev/fitness-tracker',
      liveUrl: 'https://fitness.omarsakr.dev',
      featured: false,
    },
    {
      id: 9,
      title: 'Inventory Management',
      description: 'Enterprise inventory management system with barcode scanning, reporting, and multi-location support.',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop',
      category: 'fullstack',
      technologies: ['Vue.js', 'Laravel', 'MySQL', 'Redis', 'Docker'],
      githubUrl: 'https://github.com/omar12sakr12dev/inventory-system',
      liveUrl: 'https://inventory.omarsakr.dev',
      featured: true,
    },
    {
      id: 10,
      title: 'Learning Platform',
      description: 'Online learning platform with video streaming, quizzes, progress tracking, and certification system.',
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop',
      category: 'fullstack',
      technologies: ['React', 'Node.js', 'MongoDB', 'AWS S3', 'Stripe'],
      githubUrl: 'https://github.com/omar12sakr12dev/learning-platform',
      liveUrl: 'https://learn.omarsakr.dev',
      featured: true,
    },
    {
      id: 11,
      title: 'Social Media Dashboard',
      description: 'Analytics dashboard for social media management with post scheduling and engagement tracking.',
      image: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=800&h=600&fit=crop',
      category: 'frontend',
      technologies: ['React', 'D3.js', 'Chart.js', 'Material-UI', 'API Integration'],
      githubUrl: 'https://github.com/omar12sakr12dev/social-dashboard',
      liveUrl: 'https://social.omarsakr.dev',
      featured: false,
    },
    {
      id: 12,
      title: 'Booking System API',
      description: 'Robust booking system API for hotels and restaurants with availability management and payment processing.',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop',
      category: 'backend',
      technologies: ['Python', 'Django', 'PostgreSQL', 'Celery', 'Redis'],
      githubUrl: 'https://github.com/omar12sakr12dev/booking-api',
      liveUrl: 'https://api.booking.omarsakr.dev',
      featured: false,
    },
    {
      id: 13,
      title: 'Crypto Tracker',
      description: 'Cryptocurrency tracking mobile app with real-time prices, portfolio management, and price alerts.',
      image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&h=600&fit=crop',
      category: 'mobile',
      technologies: ['Flutter', 'Dart', 'Firebase', 'CoinGecko API', 'Provider'],
      githubUrl: 'https://github.com/omar12sakr12dev/crypto-tracker',
      liveUrl: 'https://crypto.omarsakr.dev',
      featured: false,
    },
    {
      id: 14,
      title: 'Event Management',
      description: 'Complete event management platform with ticket sales, attendee management, and event analytics.',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop',
      category: 'fullstack',
      technologies: ['Angular', 'NestJS', 'PostgreSQL', 'Stripe', 'SendGrid'],
      githubUrl: 'https://github.com/omar12sakr12dev/event-management',
      liveUrl: 'https://events.omarsakr.dev',
      featured: true,
    },
    {
      id: 15,
      title: 'Music Player',
      description: 'Modern music player web app with playlist management, audio visualization, and social sharing.',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
      category: 'frontend',
      technologies: ['Vue.js', 'Vuex', 'Web Audio API', 'Canvas', 'PWA'],
      githubUrl: 'https://github.com/omar12sakr12dev/music-player',
      liveUrl: 'https://music.omarsakr.dev',
      featured: false,
    },
    {
      id: 16,
      title: 'IoT Dashboard',
      description: 'IoT device monitoring dashboard with real-time data visualization and device control capabilities.',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop',
      category: 'fullstack',
      technologies: ['React', 'MQTT', 'InfluxDB', 'Grafana', 'Docker'],
      githubUrl: 'https://github.com/omar12sakr12dev/iot-dashboard',
      liveUrl: 'https://iot.omarsakr.dev',
      featured: false,
    },
  ];

  const categories = [
    { id: 'all', label: t('portfolio.filter.all') },
    { id: 'frontend', label: t('portfolio.filter.frontend') },
    { id: 'backend', label: t('portfolio.filter.backend') },
    { id: 'fullstack', label: t('portfolio.filter.fullstack') },
    { id: 'mobile', label: t('portfolio.filter.mobile') },
  ];

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

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
              {t('portfolio.title')}
            </motion.h1>
            <motion.h2
              variants={itemVariants}
              className="text-xl md:text-2xl gradient-text font-medium mb-6"
            >
              {t('portfolio.subtitle')}
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg text-white/70 max-w-2xl mx-auto"
            >
              Explore my collection of web applications, mobile apps, and API projects that showcase modern development practices and creative solutions.
            </motion.p>
          </motion.div>

          {/* Filters and Search */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row gap-6 mb-12"
          >
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <Filter className="w-5 h-5 text-white/70 mt-2 mr-2" />
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  {category.label}
                </motion.button>
              ))}
            </div>

            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search projects..."
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -10 }}
                  className="card overflow-hidden group cursor-pointer"
                  onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
                >
                  {/* Project Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-4 left-4 bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </div>
                    )}

                    {/* Quick Actions */}
                    <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Eye className="w-4 h-4" />
                      </motion.a>
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github className="w-4 h-4" />
                      </motion.a>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-white/70 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-primary-500/20 text-primary-300 text-xs rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-white/10 text-white/70 text-xs rounded-full">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Expanded Details */}
                    <AnimatePresence>
                      {selectedProject === project.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="border-t border-white/10 pt-4 mt-4"
                        >
                          <p className="text-white/70 text-sm mb-4">
                            {project.description}
                          </p>
                          
                          <div className="mb-4">
                            <h4 className="text-white font-medium mb-2">Technologies Used:</h4>
                            <div className="flex flex-wrap gap-2">
                              {project.technologies.map((tech) => (
                                <span
                                  key={tech}
                                  className="px-2 py-1 bg-primary-500/20 text-primary-300 text-xs rounded-full"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex space-x-3">
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-2 text-primary-400 hover:text-primary-300 transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                              <span className="text-sm">Live Demo</span>
                            </a>
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors"
                            >
                              <Github className="w-4 h-4" />
                              <span className="text-sm">Source Code</span>
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* No Results */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-2">No Projects Found</h3>
              <p className="text-white/70">Try adjusting your search or filter criteria.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-black/20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card text-center p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Like What You See?
            </h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Let's collaborate and create something amazing together. I'm always excited to work on new and challenging projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/order" className="btn-accent">
                Start a Project
              </a>
              <a href="/contact" className="btn-secondary">
                Get In Touch
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;

