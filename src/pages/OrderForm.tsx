import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Calculator, 
  FileText, 
  Upload,
  Download,
  Clock,
  DollarSign,
  Percent,
  Info
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';

interface Service {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  duration: number; // in days
  category: 'pages' | 'complexity' | 'features' | 'database' | 'performance' | 'payment' | 'hosting';
}

interface OrderData {
  // Customer Info
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  platform: string;
  platformUrl: string;
  
  // Project Details
  mainPages: number;
  additionalPages: number;
  selectedServices: string[];
  customizations: string;
  files: File[];
  
  // Pricing
  totalPrice: number;
  totalDuration: number;
  discount: number;
  finalPrice: number;
  
  // Options
  rushDelivery: 'none' | 'half' | 'quarter';
  ownershipRights: boolean;
  advancePayment: 'none' | 'fifty' | 'full';
}

const OrderForm: React.FC = () => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [orderData, setOrderData] = useState<OrderData>({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    platform: '',
    platformUrl: '',
    mainPages: 1,
    additionalPages: 0,
    selectedServices: [],
    customizations: '',
    files: [],
    totalPrice: 150, // Base price for main page
    totalDuration: 3, // Base duration for main page
    discount: 0,
    finalPrice: 150,
    rushDelivery: 'none',
    ownershipRights: false,
    advancePayment: 'none',
  });

  const services: Service[] = [
    // Page Complexity
    {
      id: 'simple-interaction',
      name: 'Simple Interaction',
      description: 'Contact forms, sliders, dropdowns, simple animations',
      basePrice: 60,
      duration: 1,
      category: 'complexity',
    },
    {
      id: 'complex-interaction',
      name: 'Complex Interaction',
      description: 'Database connection, external APIs, simple login system',
      basePrice: 120,
      duration: 2,
      category: 'complexity',
    },
    {
      id: 'advanced-features',
      name: 'Advanced Features',
      description: 'Payment integration, live chat, booking system',
      basePrice: 200,
      duration: 4,
      category: 'complexity',
    },
    
    // Additional Features
    {
      id: 'auth-system',
      name: 'Authentication System',
      description: 'User registration, login, and account management',
      basePrice: 180,
      duration: 3,
      category: 'features',
    },
    {
      id: 'user-roles',
      name: 'User Roles & Permissions',
      description: 'Admin panel with user management capabilities',
      basePrice: 150,
      duration: 3,
      category: 'features',
    },
    {
      id: 'dark-mode',
      name: 'Dark Mode',
      description: 'Toggle between light and dark themes',
      basePrice: 40,
      duration: 0.5,
      category: 'features',
    },
    {
      id: 'multi-language',
      name: 'Multi-Language Support',
      description: 'Support for 2+ languages with translation',
      basePrice: 100,
      duration: 2,
      category: 'features',
    },
    {
      id: 'blog-system',
      name: 'Blog System',
      description: 'Complete blog with admin panel for content management',
      basePrice: 200,
      duration: 4,
      category: 'features',
    },
    {
      id: 'cms-integration',
      name: 'CMS Integration',
      description: 'Integration with Strapi, Sanity, or Headless WordPress',
      basePrice: 250,
      duration: 4,
      category: 'features',
    },
    {
      id: 'portfolio-gallery',
      name: 'Portfolio Gallery',
      description: 'Professional image/project gallery with filtering',
      basePrice: 80,
      duration: 2,
      category: 'features',
    },
    {
      id: 'admin-dashboard',
      name: 'Admin Dashboard',
      description: 'Complete admin panel for content and user management',
      basePrice: 250,
      duration: 5,
      category: 'features',
    },
    {
      id: 'rating-system',
      name: 'Rating & Reviews',
      description: 'User rating and review system',
      basePrice: 100,
      duration: 2,
      category: 'features',
    },
    {
      id: 'booking-system',
      name: 'Appointment Booking',
      description: 'Calendar-based booking and scheduling system',
      basePrice: 180,
      duration: 3,
      category: 'features',
    },
    {
      id: 'social-integration',
      name: 'Social Media Integration',
      description: 'WhatsApp, Telegram, Facebook Messenger integration',
      basePrice: 40,
      duration: 0.5,
      category: 'features',
    },
    
    // Database & Backend
    {
      id: 'database-design',
      name: 'Database Design',
      description: 'Custom database schema and optimization',
      basePrice: 120,
      duration: 2,
      category: 'database',
    },
    {
      id: 'firebase-integration',
      name: 'Firebase Integration',
      description: 'Firebase or external CMS integration',
      basePrice: 150,
      duration: 3,
      category: 'database',
    },
    {
      id: 'custom-api',
      name: 'Custom API Development',
      description: 'RESTful API development for the application',
      basePrice: 180,
      duration: 3,
      category: 'database',
    },
    {
      id: 'security-auth',
      name: 'Advanced Security',
      description: 'JWT authentication and security implementation',
      basePrice: 120,
      duration: 2,
      category: 'database',
    },
    
    // Performance & SEO
    {
      id: 'responsive-design',
      name: 'Professional Responsive Design',
      description: 'Optimized for all screen sizes and devices',
      basePrice: 80,
      duration: 1,
      category: 'performance',
    },
    {
      id: 'seo-optimization',
      name: 'SEO Optimization',
      description: 'Search engine optimization and meta tags',
      basePrice: 100,
      duration: 2,
      category: 'performance',
    },
    {
      id: 'performance-optimization',
      name: 'Performance Optimization',
      description: 'Image compression, lazy loading, caching',
      basePrice: 120,
      duration: 2,
      category: 'performance',
    },
    {
      id: 'pwa-support',
      name: 'PWA Support',
      description: 'Progressive Web App functionality',
      basePrice: 200,
      duration: 3,
      category: 'performance',
    },
    
    // Payment & Analytics
    {
      id: 'payment-integration',
      name: 'Payment Gateway',
      description: 'Stripe or PayPal payment integration',
      basePrice: 180,
      duration: 3,
      category: 'payment',
    },
    {
      id: 'analytics-integration',
      name: 'Analytics Integration',
      description: 'Google Analytics and Tag Manager setup',
      basePrice: 50,
      duration: 0.5,
      category: 'payment',
    },
    {
      id: 'maps-integration',
      name: 'Google Maps Integration',
      description: 'Interactive maps with location features',
      basePrice: 60,
      duration: 1,
      category: 'payment',
    },
    {
      id: 'facebook-pixel',
      name: 'Facebook Pixel',
      description: 'Facebook Pixel setup for tracking',
      basePrice: 50,
      duration: 0.5,
      category: 'payment',
    },
    
    // Hosting & Maintenance
    {
      id: 'hosting-setup',
      name: 'Hosting & Deployment',
      description: 'Website deployment and 1-month maintenance',
      basePrice: 300,
      duration: 3,
      category: 'hosting',
    },
    {
      id: 'hosting-purchase',
      name: 'Hosting Purchase',
      description: 'Annual hosting plan purchase',
      basePrice: 100,
      duration: 0,
      category: 'hosting',
    },
  ];

  const platforms = [
    'Fiverr',
    'Upwork', 
    'Freelancer',
    'Direct Contact',
    'Other'
  ];

  const steps = [
    { id: 1, title: 'Customer Info', icon: <FileText className="w-5 h-5" /> },
    { id: 2, title: 'Project Details', icon: <Calculator className="w-5 h-5" /> },
    { id: 3, title: 'Features & Services', icon: <Check className="w-5 h-5" /> },
    { id: 4, title: 'Customization', icon: <Upload className="w-5 h-5" /> },
    { id: 5, title: 'Review & Submit', icon: <Download className="w-5 h-5" /> },
  ];

  // Calculate pricing
  useEffect(() => {
    let totalPrice = 150; // Base price for main page
    let totalDuration = 3; // Base duration for main page
    
    // Additional pages
    totalPrice += orderData.additionalPages * 80;
    totalDuration += orderData.additionalPages * 1;
    
    // Selected services
    orderData.selectedServices.forEach(serviceId => {
      const service = services.find(s => s.id === serviceId);
      if (service) {
        totalPrice += service.basePrice;
        totalDuration += service.duration;
      }
    });
    
    // Rush delivery
    if (orderData.rushDelivery === 'half') {
      totalPrice += 100;
      totalDuration = Math.ceil(totalDuration / 2);
    } else if (orderData.rushDelivery === 'quarter') {
      totalPrice += 360;
      totalDuration = Math.ceil(totalDuration / 4);
    }
    
    // Ownership rights
    if (orderData.ownershipRights) {
      totalPrice += 60;
    }
    
    // Calculate discount
    let discount = 0;
    if (orderData.advancePayment === 'fifty') {
      discount = totalPrice * 0.1; // 10% discount
    } else if (orderData.advancePayment === 'full') {
      discount = totalPrice * 0.25; // 25% discount
    }
    
    const finalPrice = totalPrice - discount;
    
    setOrderData(prev => ({
      ...prev,
      totalPrice,
      totalDuration,
      discount,
      finalPrice,
    }));
  }, [
    orderData.additionalPages,
    orderData.selectedServices,
    orderData.rushDelivery,
    orderData.ownershipRights,
    orderData.advancePayment,
  ]);

  const handleServiceToggle = (serviceId: string) => {
    setOrderData(prev => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(serviceId)
        ? prev.selectedServices.filter(id => id !== serviceId)
        : [...prev.selectedServices, serviceId],
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setOrderData(prev => ({
      ...prev,
      files: [...prev.files, ...files],
    }));
  };

  const removeFile = (index: number) => {
    setOrderData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
  };

  const generatePDF = () => {
    const pdf = new jsPDF();
    
    // Header
    pdf.setFontSize(20);
    pdf.text('Project Quote - Omar Sakr', 20, 30);
    
    // Customer Info
    pdf.setFontSize(14);
    pdf.text('Customer Information:', 20, 50);
    pdf.setFontSize(12);
    pdf.text(`Name: ${orderData.customerName}`, 20, 65);
    pdf.text(`Email: ${orderData.customerEmail}`, 20, 75);
    pdf.text(`Phone: ${orderData.customerPhone}`, 20, 85);
    pdf.text(`Platform: ${orderData.platform}`, 20, 95);
    
    // Project Details
    pdf.setFontSize(14);
    pdf.text('Project Details:', 20, 115);
    pdf.setFontSize(12);
    pdf.text(`Main Pages: 1`, 20, 130);
    pdf.text(`Additional Pages: ${orderData.additionalPages}`, 20, 140);
    pdf.text(`Total Duration: ${Math.ceil(orderData.totalDuration)} days`, 20, 150);
    
    // Services
    if (orderData.selectedServices.length > 0) {
      pdf.setFontSize(14);
      pdf.text('Selected Services:', 20, 170);
      pdf.setFontSize(12);
      let yPos = 185;
      orderData.selectedServices.forEach(serviceId => {
        const service = services.find(s => s.id === serviceId);
        if (service) {
          pdf.text(`• ${service.name} - $${service.basePrice}`, 20, yPos);
          yPos += 10;
        }
      });
    }
    
    // Pricing
    const pricingYPos = 220;
    pdf.setFontSize(14);
    pdf.text('Pricing Summary:', 20, pricingYPos);
    pdf.setFontSize(12);
    pdf.text(`Subtotal: $${orderData.totalPrice}`, 20, pricingYPos + 15);
    if (orderData.discount > 0) {
      pdf.text(`Discount: -$${orderData.discount.toFixed(2)}`, 20, pricingYPos + 25);
    }
    pdf.setFontSize(14);
    pdf.text(`Final Price: $${orderData.finalPrice.toFixed(2)}`, 20, pricingYPos + 35);
    
    // Terms
    pdf.setFontSize(10);
    pdf.text('Terms & Conditions:', 20, 270);
    pdf.text('• 10% advance payment required to start the project', 20, 280);
    pdf.text('• Client cannot modify code without purchasing ownership rights', 20, 285);
    pdf.text('• Developer cannot use code for marketing if ownership rights are purchased', 20, 290);
    
    return pdf;
  };

  const handleSubmit = async () => {
    try {
      // Generate PDF
      const pdf = generatePDF();
      pdf.save(`quote-${orderData.customerName.replace(/\s+/g, '-')}.pdf`);
      
      // Simulate email sending
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Order submitted successfully! PDF quote has been generated and emails sent.');
      
      // Reset form
      setOrderData({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        platform: '',
        platformUrl: '',
        mainPages: 1,
        additionalPages: 0,
        selectedServices: [],
        customizations: '',
        files: [],
        totalPrice: 150,
        totalDuration: 3,
        discount: 0,
        finalPrice: 150,
        rushDelivery: 'none',
        ownershipRights: false,
        advancePayment: 'none',
      });
      setCurrentStep(1);
    } catch (error) {
      toast.error('Failed to submit order. Please try again.');
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return orderData.customerName && orderData.customerEmail && orderData.platform;
      case 2:
        return true;
      case 3:
        return true;
      case 4:
        return true;
      case 5:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="container-custom section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('order.title')}
          </h1>
          <h2 className="text-xl md:text-2xl gradient-text font-medium mb-6">
            {t('order.subtitle')}
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Get a detailed quote for your web development project with our interactive pricing calculator.
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={{
                    scale: currentStep >= step.id ? 1 : 0.8,
                    opacity: currentStep >= step.id ? 1 : 0.5,
                  }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                    currentStep >= step.id
                      ? 'bg-primary-600 border-primary-600 text-white'
                      : 'border-white/30 text-white/50'
                  }`}
                >
                  {currentStep > step.id ? <Check className="w-6 h-6" /> : step.icon}
                </motion.div>
                
                <div className="ml-3 hidden md:block">
                  <div className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-white' : 'text-white/50'
                  }`}>
                    {step.title}
                  </div>
                </div>
                
                {index < steps.length - 1 && (
                  <div className={`w-8 md:w-16 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-primary-600' : 'bg-white/30'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <div className="card p-8">
                <AnimatePresence mode="wait">
                  {/* Step 1: Customer Information */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="space-y-6"
                    >
                      <h3 className="text-2xl font-bold text-white mb-6">Customer Information</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-white/70 mb-2">Full Name *</label>
                          <input
                            type="text"
                            value={orderData.customerName}
                            onChange={(e) => setOrderData(prev => ({ ...prev, customerName: e.target.value }))}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-400"
                            placeholder="Your full name"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-white/70 mb-2">Email Address *</label>
                          <input
                            type="email"
                            value={orderData.customerEmail}
                            onChange={(e) => setOrderData(prev => ({ ...prev, customerEmail: e.target.value }))}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-400"
                            placeholder="your.email@example.com"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-white/70 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          value={orderData.customerPhone}
                          onChange={(e) => setOrderData(prev => ({ ...prev, customerPhone: e.target.value }))}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-400"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-white/70 mb-2">Preferred Platform *</label>
                        <select
                          value={orderData.platform}
                          onChange={(e) => setOrderData(prev => ({ ...prev, platform: e.target.value }))}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-400"
                          required
                        >
                          <option value="">Select a platform</option>
                          {platforms.map(platform => (
                            <option key={platform} value={platform} className="bg-secondary-800">
                              {platform}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-white/70 mb-2">Platform Profile URL</label>
                        <input
                          type="url"
                          value={orderData.platformUrl}
                          onChange={(e) => setOrderData(prev => ({ ...prev, platformUrl: e.target.value }))}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-400"
                          placeholder="https://..."
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Project Details */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="space-y-6"
                    >
                      <h3 className="text-2xl font-bold text-white mb-6">Project Details</h3>
                      
                      <div className="card p-6 bg-primary-500/10 border-primary-500/20">
                        <div className="flex items-center space-x-3 mb-4">
                          <Info className="w-5 h-5 text-primary-400" />
                          <h4 className="text-lg font-semibold text-white">Pricing Information</h4>
                        </div>
                        <div className="space-y-2 text-white/70">
                          <p>• Main page: $150 (2-3 days)</p>
                          <p>• Additional pages: $80 each (1 day each)</p>
                          <p>• Complexity and features add to the base price</p>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-white/70 mb-2">Number of Additional Pages</label>
                        <div className="flex items-center space-x-4">
                          <button
                            type="button"
                            onClick={() => setOrderData(prev => ({ 
                              ...prev, 
                              additionalPages: Math.max(0, prev.additionalPages - 1) 
                            }))}
                            className="w-10 h-10 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min="0"
                            value={orderData.additionalPages}
                            onChange={(e) => setOrderData(prev => ({ 
                              ...prev, 
                              additionalPages: Math.max(0, parseInt(e.target.value) || 0) 
                            }))}
                            className="w-20 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white text-center focus:outline-none focus:ring-2 focus:ring-primary-400"
                          />
                          <button
                            type="button"
                            onClick={() => setOrderData(prev => ({ 
                              ...prev, 
                              additionalPages: prev.additionalPages + 1 
                            }))}
                            className="w-10 h-10 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors"
                          >
                            +
                          </button>
                          <span className="text-white/70">
                            Total pages: {1 + orderData.additionalPages}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Features & Services */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="space-y-6"
                    >
                      <h3 className="text-2xl font-bold text-white mb-6">Features & Services</h3>
                      
                      {/* Service Categories */}
                      {['complexity', 'features', 'database', 'performance', 'payment', 'hosting'].map(category => {
                        const categoryServices = services.filter(s => s.category === category);
                        const categoryTitles = {
                          complexity: 'Page Complexity',
                          features: 'Additional Features',
                          database: 'Database & Backend',
                          performance: 'Performance & SEO',
                          payment: 'Payment & Analytics',
                          hosting: 'Hosting & Maintenance',
                        };
                        
                        return (
                          <div key={category} className="space-y-4">
                            <h4 className="text-lg font-semibold text-white border-b border-white/20 pb-2">
                              {categoryTitles[category as keyof typeof categoryTitles]}
                            </h4>
                            <div className="grid grid-cols-1 gap-4">
                              {categoryServices.map(service => (
                                <motion.div
                                  key={service.id}
                                  whileHover={{ scale: 1.02 }}
                                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                                    orderData.selectedServices.includes(service.id)
                                      ? 'border-primary-500 bg-primary-500/10'
                                      : 'border-white/20 bg-white/5 hover:border-white/40'
                                  }`}
                                  onClick={() => handleServiceToggle(service.id)}
                                >
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                      <div className="flex items-center space-x-3 mb-2">
                                        <h5 className="font-semibold text-white">{service.name}</h5>
                                        <div className="flex items-center space-x-2 text-sm">
                                          <span className="text-green-400 font-medium">${service.basePrice}</span>
                                          <span className="text-white/50">•</span>
                                          <span className="text-blue-400 font-medium">
                                            {service.duration} {service.duration === 1 ? 'day' : 'days'}
                                          </span>
                                        </div>
                                      </div>
                                      <p className="text-white/70 text-sm">{service.description}</p>
                                    </div>
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ml-4 ${
                                      orderData.selectedServices.includes(service.id)
                                        ? 'border-primary-500 bg-primary-500'
                                        : 'border-white/40'
                                    }`}>
                                      {orderData.selectedServices.includes(service.id) && (
                                        <Check className="w-4 h-4 text-white" />
                                      )}
                                    </div>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </motion.div>
                  )}

                  {/* Step 4: Customization */}
                  {currentStep === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="space-y-6"
                    >
                      <h3 className="text-2xl font-bold text-white mb-6">Customization & Options</h3>
                      
                      {/* Rush Delivery */}
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Rush Delivery</h4>
                        <div className="space-y-3">
                          {[
                            { id: 'none', label: 'Standard Delivery', price: 0, description: 'Normal timeline' },
                            { id: 'half', label: 'Rush Delivery (50% faster)', price: 100, description: 'Reduce timeline by half' },
                            { id: 'quarter', label: 'Express Delivery (75% faster)', price: 360, description: 'Reduce timeline to quarter' },
                          ].map(option => (
                            <label key={option.id} className="flex items-center space-x-3 cursor-pointer">
                              <input
                                type="radio"
                                name="rushDelivery"
                                value={option.id}
                                checked={orderData.rushDelivery === option.id}
                                onChange={(e) => setOrderData(prev => ({ 
                                  ...prev, 
                                  rushDelivery: e.target.value as any 
                                }))}
                                className="w-4 h-4 text-primary-600"
                              />
                              <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                  <span className="text-white font-medium">{option.label}</span>
                                  {option.price > 0 && (
                                    <span className="text-green-400 font-medium">+${option.price}</span>
                                  )}
                                </div>
                                <p className="text-white/70 text-sm">{option.description}</p>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                      
                      {/* Ownership Rights */}
                      <div>
                        <label className="flex items-start space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={orderData.ownershipRights}
                            onChange={(e) => setOrderData(prev => ({ 
                              ...prev, 
                              ownershipRights: e.target.checked 
                            }))}
                            className="w-4 h-4 text-primary-600 mt-1"
                          />
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="text-white font-medium">Purchase Ownership Rights</span>
                              <span className="text-green-400 font-medium">+$60</span>
                            </div>
                            <p className="text-white/70 text-sm">
                              Full rights to modify and use the code. Developer cannot use for marketing.
                            </p>
                          </div>
                        </label>
                      </div>
                      
                      {/* Advance Payment */}
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Payment Options</h4>
                        <div className="space-y-3">
                          {[
                            { id: 'none', label: 'Standard Payment', discount: 0, description: '10% advance, 90% on completion' },
                            { id: 'fifty', label: '50% Advance Payment', discount: 10, description: '10% discount on total' },
                            { id: 'full', label: 'Full Advance Payment', discount: 25, description: '25% discount on total' },
                          ].map(option => (
                            <label key={option.id} className="flex items-center space-x-3 cursor-pointer">
                              <input
                                type="radio"
                                name="advancePayment"
                                value={option.id}
                                checked={orderData.advancePayment === option.id}
                                onChange={(e) => setOrderData(prev => ({ 
                                  ...prev, 
                                  advancePayment: e.target.value as any 
                                }))}
                                className="w-4 h-4 text-primary-600"
                              />
                              <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                  <span className="text-white font-medium">{option.label}</span>
                                  {option.discount > 0 && (
                                    <span className="text-green-400 font-medium">-{option.discount}%</span>
                                  )}
                                </div>
                                <p className="text-white/70 text-sm">{option.description}</p>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                      
                      {/* Custom Requirements */}
                      <div>
                        <label className="block text-white/70 mb-2">Additional Requirements & Notes</label>
                        <textarea
                          value={orderData.customizations}
                          onChange={(e) => setOrderData(prev => ({ ...prev, customizations: e.target.value }))}
                          rows={4}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-400 resize-none"
                          placeholder="Describe any specific requirements, design preferences, or additional features you need..."
                        />
                      </div>
                      
                      {/* File Upload */}
                      <div>
                        <label className="block text-white/70 mb-2">Upload Files (Images, Documents, etc.)</label>
                        <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center">
                          <input
                            type="file"
                            multiple
                            onChange={handleFileUpload}
                            className="hidden"
                            id="file-upload"
                          />
                          <label htmlFor="file-upload" className="cursor-pointer">
                            <Upload className="w-8 h-8 text-white/50 mx-auto mb-2" />
                            <p className="text-white/70">Click to upload files or drag and drop</p>
                            <p className="text-white/50 text-sm">PNG, JPG, PDF, DOC up to 10MB each</p>
                          </label>
                        </div>
                        
                        {/* Uploaded Files */}
                        {orderData.files.length > 0 && (
                          <div className="mt-4 space-y-2">
                            {orderData.files.map((file, index) => (
                              <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                                <span className="text-white text-sm">{file.name}</span>
                                <button
                                  type="button"
                                  onClick={() => removeFile(index)}
                                  className="text-red-400 hover:text-red-300 transition-colors"
                                >
                                  Remove
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 5: Review & Submit */}
                  {currentStep === 5 && (
                    <motion.div
                      key="step5"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="space-y-6"
                    >
                      <h3 className="text-2xl font-bold text-white mb-6">Review Your Order</h3>
                      
                      {/* Customer Info Summary */}
                      <div className="card p-6 bg-white/5">
                        <h4 className="text-lg font-semibold text-white mb-4">Customer Information</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/70">
                          <div>Name: {orderData.customerName}</div>
                          <div>Email: {orderData.customerEmail}</div>
                          <div>Phone: {orderData.customerPhone || 'Not provided'}</div>
                          <div>Platform: {orderData.platform}</div>
                        </div>
                      </div>
                      
                      {/* Project Summary */}
                      <div className="card p-6 bg-white/5">
                        <h4 className="text-lg font-semibold text-white mb-4">Project Summary</h4>
                        <div className="space-y-2 text-white/70">
                          <div>Main Page: 1 ($150)</div>
                          {orderData.additionalPages > 0 && (
                            <div>Additional Pages: {orderData.additionalPages} (${orderData.additionalPages * 80})</div>
                          )}
                          <div>Estimated Duration: {Math.ceil(orderData.totalDuration)} days</div>
                        </div>
                      </div>
                      
                      {/* Selected Services */}
                      {orderData.selectedServices.length > 0 && (
                        <div className="card p-6 bg-white/5">
                          <h4 className="text-lg font-semibold text-white mb-4">Selected Services</h4>
                          <div className="space-y-2">
                            {orderData.selectedServices.map(serviceId => {
                              const service = services.find(s => s.id === serviceId);
                              return service ? (
                                <div key={serviceId} className="flex justify-between text-white/70">
                                  <span>{service.name}</span>
                                  <span>${service.basePrice}</span>
                                </div>
                              ) : null;
                            })}
                          </div>
                        </div>
                      )}
                      
                      {/* Terms & Conditions */}
                      <div className="card p-6 bg-yellow-500/10 border-yellow-500/20">
                        <h4 className="text-lg font-semibold text-white mb-4">Terms & Conditions</h4>
                        <div className="space-y-2 text-white/70 text-sm">
                          <p>• 10% advance payment required to start the project</p>
                          <p>• Client cannot modify or redistribute code without purchasing ownership rights</p>
                          <p>• Developer cannot use code for marketing purposes if ownership rights are purchased</p>
                          <p>• Project timeline may vary based on complexity and client feedback</p>
                          <p>• All payments must be made through the selected freelance platform</p>
                        </div>
                      </div>
                      
                      {/* Submit Button */}
                      <motion.button
                        type="button"
                        onClick={handleSubmit}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full btn-accent py-4 text-lg font-semibold"
                      >
                        Submit Order & Generate Quote
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Price Calculator Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="card p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <Calculator className="w-6 h-6 text-primary-400" />
                    <h3 className="text-xl font-bold text-white">Price Calculator</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Base Price */}
                    <div className="flex justify-between text-white/70">
                      <span>Main Page</span>
                      <span>$150</span>
                    </div>
                    
                    {/* Additional Pages */}
                    {orderData.additionalPages > 0 && (
                      <div className="flex justify-between text-white/70">
                        <span>Additional Pages ({orderData.additionalPages})</span>
                        <span>${orderData.additionalPages * 80}</span>
                      </div>
                    )}
                    
                    {/* Selected Services */}
                    {orderData.selectedServices.map(serviceId => {
                      const service = services.find(s => s.id === serviceId);
                      return service ? (
                        <div key={serviceId} className="flex justify-between text-white/70 text-sm">
                          <span className="truncate mr-2">{service.name}</span>
                          <span>${service.basePrice}</span>
                        </div>
                      ) : null;
                    })}
                    
                    {/* Rush Delivery */}
                    {orderData.rushDelivery !== 'none' && (
                      <div className="flex justify-between text-white/70">
                        <span>Rush Delivery</span>
                        <span>+${orderData.rushDelivery === 'half' ? 100 : 360}</span>
                      </div>
                    )}
                    
                    {/* Ownership Rights */}
                    {orderData.ownershipRights && (
                      <div className="flex justify-between text-white/70">
                        <span>Ownership Rights</span>
                        <span>+$60</span>
                      </div>
                    )}
                    
                    <div className="border-t border-white/20 pt-4">
                      <div className="flex justify-between text-white">
                        <span>Subtotal</span>
                        <span>${orderData.totalPrice}</span>
                      </div>
                      
                      {orderData.discount > 0 && (
                        <div className="flex justify-between text-green-400">
                          <span>Discount</span>
                          <span>-${orderData.discount.toFixed(2)}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between text-xl font-bold text-white mt-2">
                        <span>Total</span>
                        <span>${orderData.finalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <div className="border-t border-white/20 pt-4">
                      <div className="flex items-center space-x-2 text-white/70">
                        <Clock className="w-4 h-4" />
                        <span>Estimated: {Math.ceil(orderData.totalDuration)} days</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <motion.button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              whileHover={{ scale: currentStep > 1 ? 1.05 : 1 }}
              whileTap={{ scale: currentStep > 1 ? 0.95 : 1 }}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                currentStep === 1
                  ? 'bg-white/10 text-white/50 cursor-not-allowed'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Previous</span>
            </motion.button>

            {currentStep < steps.length ? (
              <motion.button
                type="button"
                onClick={nextStep}
                disabled={!canProceed()}
                whileHover={{ scale: canProceed() ? 1.05 : 1 }}
                whileTap={{ scale: canProceed() ? 0.95 : 1 }}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  canProceed()
                    ? 'btn-primary'
                    : 'bg-white/10 text-white/50 cursor-not-allowed'
                }`}
              >
                <span>Next</span>
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            ) : (
              <div /> // Empty div to maintain layout
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;

