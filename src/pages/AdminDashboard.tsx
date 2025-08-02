import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, 
  Users, 
  FileText, 
  BarChart3, 
  Bell, 
  Edit, 
  Trash2, 
  Plus,
  Eye,
  Download,
  Upload,
  Save,
  X,
  Search,
  Filter,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  MessageSquare,
  Globe,
  Database,
  Shield,
  Zap
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import toast from 'react-hot-toast';

interface Project {
  id: string;
  title: string;
  client: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  price: number;
  deadline: string;
  progress: number;
  description: string;
  technologies: string[];
  createdAt: string;
}

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  platform: string;
  totalPrice: number;
  status: 'new' | 'reviewed' | 'accepted' | 'rejected';
  createdAt: string;
  services: string[];
}

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  status: 'draft' | 'published';
  publishedAt?: string;
  tags: string[];
  readTime: number;
}

interface Testimonial {
  id: string;
  clientName: string;
  clientCompany: string;
  rating: number;
  comment: string;
  projectType: string;
  isVisible: boolean;
  createdAt: string;
}

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'E-Commerce Platform',
      client: 'John Smith',
      status: 'in-progress',
      price: 2500,
      deadline: '2024-02-15',
      progress: 75,
      description: 'Full-stack e-commerce solution with React and Node.js',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      createdAt: '2024-01-10',
    },
    {
      id: '2',
      title: 'Portfolio Website',
      client: 'Sarah Johnson',
      status: 'completed',
      price: 800,
      deadline: '2024-01-30',
      progress: 100,
      description: 'Modern portfolio website for a photographer',
      technologies: ['React', 'Tailwind CSS', 'Framer Motion'],
      createdAt: '2024-01-05',
    },
    {
      id: '3',
      title: 'Task Management App',
      client: 'Tech Startup Inc.',
      status: 'pending',
      price: 1800,
      deadline: '2024-03-01',
      progress: 0,
      description: 'Team collaboration and task management platform',
      technologies: ['React', 'TypeScript', 'Firebase'],
      createdAt: '2024-01-20',
    },
  ]);

  const [orders, setOrders] = useState<Order[]>([
    {
      id: '1',
      customerName: 'Mike Wilson',
      customerEmail: 'mike@example.com',
      platform: 'Fiverr',
      totalPrice: 1200,
      status: 'new',
      createdAt: '2024-01-25',
      services: ['Frontend Development', 'Responsive Design', 'SEO Optimization'],
    },
    {
      id: '2',
      customerName: 'Lisa Chen',
      customerEmail: 'lisa@example.com',
      platform: 'Upwork',
      totalPrice: 950,
      status: 'reviewed',
      createdAt: '2024-01-23',
      services: ['Blog System', 'CMS Integration'],
    },
  ]);

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
    {
      id: '1',
      title: 'Modern React Development Best Practices',
      content: 'Lorem ipsum dolor sit amet...',
      excerpt: 'Learn the latest best practices for React development in 2024.',
      status: 'published',
      publishedAt: '2024-01-20',
      tags: ['React', 'JavaScript', 'Best Practices'],
      readTime: 8,
    },
    {
      id: '2',
      title: 'Building Scalable APIs with Node.js',
      content: 'Lorem ipsum dolor sit amet...',
      excerpt: 'A comprehensive guide to building scalable backend APIs.',
      status: 'draft',
      tags: ['Node.js', 'API', 'Backend'],
      readTime: 12,
    },
  ]);

  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      id: '1',
      clientName: 'John Smith',
      clientCompany: 'Smith Enterprises',
      rating: 5,
      comment: 'Outstanding work! Omar delivered exactly what we needed.',
      projectType: 'E-Commerce Platform',
      isVisible: true,
      createdAt: '2024-01-15',
    },
    {
      id: '2',
      clientName: 'Sarah Johnson',
      clientCompany: 'Creative Studio',
      rating: 5,
      comment: 'Professional, fast, and high-quality work. Highly recommended!',
      projectType: 'Portfolio Website',
      isVisible: true,
      createdAt: '2024-01-10',
    },
  ]);

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingBlogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showBlogModal, setShowBlogModal] = useState(false);

  // Statistics
  const stats = {
    totalProjects: projects.length,
    activeProjects: projects.filter(p => p.status === 'in-progress').length,
    completedProjects: projects.filter(p => p.status === 'completed').length,
    totalRevenue: projects.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.price, 0),
    pendingOrders: orders.filter(o => o.status === 'new').length,
    publishedPosts: blogPosts.filter(p => p.status === 'published').length,
    averageRating: testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length,
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'projects', label: 'Projects', icon: <FileText className="w-5 h-5" /> },
    { id: 'orders', label: 'Orders', icon: <Bell className="w-5 h-5" /> },
    { id: 'blog', label: 'Blog', icon: <Edit className="w-5 h-5" /> },
    { id: 'testimonials', label: 'Testimonials', icon: <MessageSquare className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  const handleProjectSave = (project: Project) => {
    if (editingProject) {
      setProjects(prev => prev.map(p => p.id === project.id ? project : p));
      toast.success('Project updated successfully');
    } else {
      setProjects(prev => [...prev, { ...project, id: Date.now().toString() }]);
      toast.success('Project created successfully');
    }
    setEditingProject(null);
    setShowProjectModal(false);
  };

  const handleProjectDelete = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    toast.success('Project deleted successfully');
  };

  const handleOrderStatusUpdate = (id: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    toast.success('Order status updated');
  };

  const handleBlogPostSave = (post: BlogPost) => {
    if (editingBlogPost) {
      setBlogPosts(prev => prev.map(p => p.id === post.id ? post : p));
      toast.success('Blog post updated successfully');
    } else {
      setBlogPosts(prev => [...prev, { ...post, id: Date.now().toString() }]);
      toast.success('Blog post created successfully');
    }
    setBlogPost(null);
    setShowBlogModal(false);
  };

  const handleTestimonialToggle = (id: string) => {
    setTestimonials(prev => prev.map(t => 
      t.id === id ? { ...t, isVisible: !t.isVisible } : t
    ));
    toast.success('Testimonial visibility updated');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'published':
      case 'accepted':
        return 'text-green-400 bg-green-400/20';
      case 'in-progress':
      case 'reviewed':
        return 'text-blue-400 bg-blue-400/20';
      case 'pending':
      case 'new':
      case 'draft':
        return 'text-yellow-400 bg-yellow-400/20';
      case 'cancelled':
      case 'rejected':
        return 'text-red-400 bg-red-400/20';
      default:
        return 'text-gray-400 bg-gray-400/20';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="card p-8 text-center">
          <Shield className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">Access Denied</h2>
          <p className="text-white/70 mb-6">You need to be logged in to access the admin dashboard.</p>
          <button className="btn-primary">Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container-custom section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Admin Dashboard
            </h1>
            <p className="text-white/70">
              Welcome back, {user.name}! Manage your projects and content.
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <button className="btn-secondary">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </button>
            <button 
              onClick={logout}
              className="btn-primary"
            >
              Logout
            </button>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Total Projects', value: stats.totalProjects, icon: <FileText className="w-6 h-6" />, color: 'text-blue-400' },
                  { label: 'Active Projects', value: stats.activeProjects, icon: <Clock className="w-6 h-6" />, color: 'text-yellow-400' },
                  { label: 'Completed Projects', value: stats.completedProjects, icon: <CheckCircle className="w-6 h-6" />, color: 'text-green-400' },
                  { label: 'Total Revenue', value: `$${stats.totalRevenue}`, icon: <DollarSign className="w-6 h-6" />, color: 'text-green-400' },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="card p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={stat.color}>{stat.icon}</div>
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-white/70 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Projects */}
                <div className="card p-6">
                  <h3 className="text-xl font-bold text-white mb-6">Recent Projects</h3>
                  <div className="space-y-4">
                    {projects.slice(0, 3).map((project) => (
                      <div key={project.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                        <div>
                          <div className="font-medium text-white">{project.title}</div>
                          <div className="text-white/70 text-sm">{project.client}</div>
                        </div>
                        <div className="text-right">
                          <div className={`px-2 py-1 rounded-full text-xs ${getStatusColor(project.status)}`}>
                            {project.status}
                          </div>
                          <div className="text-white/70 text-sm mt-1">${project.price}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pending Orders */}
                <div className="card p-6">
                  <h3 className="text-xl font-bold text-white mb-6">Pending Orders</h3>
                  <div className="space-y-4">
                    {orders.filter(o => o.status === 'new').map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                        <div>
                          <div className="font-medium text-white">{order.customerName}</div>
                          <div className="text-white/70 text-sm">{order.platform}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-green-400 font-medium">${order.totalPrice}</div>
                          <div className="text-white/70 text-sm">{order.createdAt}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Projects Management</h2>
                <button
                  onClick={() => {
                    setEditingProject(null);
                    setShowProjectModal(true);
                  }}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Project</span>
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {projects.map((project) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                        <p className="text-white/70 mb-2">{project.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-white/70">
                          <span>Client: {project.client}</span>
                          <span>Deadline: {project.deadline}</span>
                          <span>Price: ${project.price}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`px-3 py-1 rounded-full text-sm ${getStatusColor(project.status)}`}>
                          {project.status}
                        </div>
                        <button
                          onClick={() => {
                            setEditingProject(project);
                            setShowProjectModal(true);
                          }}
                          className="p-2 text-white/70 hover:text-white transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleProjectDelete(project.id)}
                          className="p-2 text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white/70 text-sm">Progress</span>
                        <span className="text-white font-medium">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${project.progress}%` }}
                          className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full"
                        />
                      </div>
                    </div>

                    {/* Technologies */}
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
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-white">Orders Management</h2>

              <div className="grid grid-cols-1 gap-6">
                {orders.map((order) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{order.customerName}</h3>
                        <p className="text-white/70 mb-2">{order.customerEmail}</p>
                        <div className="flex items-center space-x-4 text-sm text-white/70">
                          <span>Platform: {order.platform}</span>
                          <span>Date: {order.createdAt}</span>
                          <span className="text-green-400 font-medium">Price: ${order.totalPrice}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <select
                          value={order.status}
                          onChange={(e) => handleOrderStatusUpdate(order.id, e.target.value as Order['status'])}
                          className="px-3 py-1 bg-white/10 border border-white/20 rounded text-white text-sm"
                        >
                          <option value="new" className="bg-secondary-800">New</option>
                          <option value="reviewed" className="bg-secondary-800">Reviewed</option>
                          <option value="accepted" className="bg-secondary-800">Accepted</option>
                          <option value="rejected" className="bg-secondary-800">Rejected</option>
                        </select>
                      </div>
                    </div>

                    {/* Services */}
                    <div>
                      <h4 className="text-white font-medium mb-2">Requested Services:</h4>
                      <div className="flex flex-wrap gap-2">
                        {order.services.map((service) => (
                          <span
                            key={service}
                            className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Blog Tab */}
          {activeTab === 'blog' && (
            <motion.div
              key="blog"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Blog Management</h2>
                <button
                  onClick={() => {
                    setBlogPost(null);
                    setShowBlogModal(true);
                  }}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Post</span>
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {blogPosts.map((post) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{post.title}</h3>
                        <p className="text-white/70 mb-2">{post.excerpt}</p>
                        <div className="flex items-center space-x-4 text-sm text-white/70">
                          <span>Read time: {post.readTime} min</span>
                          {post.publishedAt && <span>Published: {post.publishedAt}</span>}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`px-3 py-1 rounded-full text-sm ${getStatusColor(post.status)}`}>
                          {post.status}
                        </div>
                        <button
                          onClick={() => {
                            setBlogPost(post);
                            setShowBlogModal(true);
                          }}
                          className="p-2 text-white/70 hover:text-white transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Testimonials Tab */}
          {activeTab === 'testimonials' && (
            <motion.div
              key="testimonials"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-white">Testimonials Management</h2>

              <div className="grid grid-cols-1 gap-6">
                {testimonials.map((testimonial) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{testimonial.clientName}</h3>
                        <p className="text-white/70 mb-2">{testimonial.clientCompany}</p>
                        <div className="flex items-center space-x-2 mb-3">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-lg ${
                                i < testimonial.rating ? 'text-yellow-400' : 'text-white/30'
                              }`}
                            >
                              ★
                            </span>
                          ))}
                          <span className="text-white/70 text-sm ml-2">
                            Project: {testimonial.projectType}
                          </span>
                        </div>
                        <p className="text-white/80 italic">"{testimonial.comment}"</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleTestimonialToggle(testimonial.id)}
                          className={`px-3 py-1 rounded-full text-sm ${
                            testimonial.isVisible
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-red-500/20 text-red-400'
                          }`}
                        >
                          {testimonial.isVisible ? 'Visible' : 'Hidden'}
                        </button>
                        <button className="p-2 text-white/70 hover:text-white transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <h2 className="text-2xl font-bold text-white">Settings</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Profile Settings */}
                <div className="card p-6">
                  <h3 className="text-xl font-bold text-white mb-6">Profile Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white/70 mb-2">Full Name</label>
                      <input
                        type="text"
                        defaultValue="Omar Sakr"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue="Omar.hany.sakr.dev@gmail.com"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 mb-2">Bio</label>
                      <textarea
                        rows={3}
                        defaultValue="Professional web developer specializing in modern technologies."
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white resize-none"
                      />
                    </div>
                    <button className="btn-primary">Save Changes</button>
                  </div>
                </div>

                {/* Site Settings */}
                <div className="card p-6">
                  <h3 className="text-xl font-bold text-white mb-6">Site Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white/70 mb-2">Site Title</label>
                      <input
                        type="text"
                        defaultValue="Omar Sakr - Web Developer"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 mb-2">Meta Description</label>
                      <textarea
                        rows={2}
                        defaultValue="Professional web developer creating modern, fast, and interactive web solutions."
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white resize-none"
                      />
                    </div>
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" id="maintenance" className="w-4 h-4" />
                      <label htmlFor="maintenance" className="text-white/70">
                        Maintenance Mode
                      </label>
                    </div>
                    <button className="btn-primary">Update Settings</button>
                  </div>
                </div>

                {/* Security Settings */}
                <div className="card p-6">
                  <h3 className="text-xl font-bold text-white mb-6">Security</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white/70 mb-2">Current Password</label>
                      <input
                        type="password"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 mb-2">New Password</label>
                      <input
                        type="password"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 mb-2">Confirm Password</label>
                      <input
                        type="password"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white"
                      />
                    </div>
                    <button className="btn-primary">Change Password</button>
                  </div>
                </div>

                {/* Backup & Export */}
                <div className="card p-6">
                  <h3 className="text-xl font-bold text-white mb-6">Backup & Export</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div>
                        <div className="text-white font-medium">Database Backup</div>
                        <div className="text-white/70 text-sm">Last backup: 2 days ago</div>
                      </div>
                      <button className="btn-secondary">
                        <Download className="w-4 h-4 mr-2" />
                        Backup
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div>
                        <div className="text-white font-medium">Export Projects</div>
                        <div className="text-white/70 text-sm">Export all project data</div>
                      </div>
                      <button className="btn-secondary">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminDashboard;

