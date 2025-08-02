import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calculator, 
  DollarSign, 
  Clock, 
  Zap, 
  Check, 
  X,
  Info,
  Download,
  Send,
  ArrowRight,
  Percent
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import toast from 'react-hot-toast';

interface PricingOption {
  id: string;
  name: string;
  basePrice: number;
  duration: number; // in days
  description: string;
  popular?: boolean;
}

interface Feature {
  id: string;
  name: string;
  price: number;
  duration: number;
  description: string;
  category: string;
}

const PriceCalculator: React.FC = () => {
  const { t } = useLanguage();
  const [selectedPackage, setSelectedPackage] = useState<string>('basic');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [additionalPages, setAdditionalPages] = useState(0);
  const [rushDelivery, setRushDelivery] = useState<'none' | 'half' | 'quarter'>('none');
  const [ownershipRights, setOwnershipRights] = useState(false);
  const [advancePayment, setAdvancePayment] = useState<'none' | 'fifty' | 'full'>('none');
  
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);

  const packages: PricingOption[] = [
    {
      id: 'basic',
      name: 'Basic Website',
      basePrice: 150,
      duration: 3,
      description: 'Simple landing page with basic functionality',
    },
    {
      id: 'business',
      name: 'Business Website',
      basePrice: 500,
      duration: 7,
      description: 'Multi-page business website with CMS',
      popular: true,
    },
    {
      id: 'ecommerce',
      name: 'E-Commerce Store',
      basePrice: 1200,
      duration: 14,
      description: 'Full online store with payment integration',
    },
    {
      id: 'custom',
      name: 'Custom Application',
      basePrice: 2000,
      duration: 21,
      description: 'Complex web application with custom features',
    },
  ];

  const features: Feature[] = [
    // Design & UI
    {
      id: 'responsive-design',
      name: 'Responsive Design',
      price: 80,
      duration: 1,
      description: 'Mobile-first responsive design',
      category: 'Design',
    },
    {
      id: 'custom-animations',
      name: 'Custom Animations',
      price: 150,
      duration: 2,
      description: 'Interactive animations and transitions',
      category: 'Design',
    },
    {
      id: 'dark-mode',
      name: 'Dark Mode Toggle',
      price: 40,
      duration: 0.5,
      description: 'Light/dark theme switcher',
      category: 'Design',
    },
    
    // Functionality
    {
      id: 'contact-form',
      name: 'Contact Form',
      price: 60,
      duration: 1,
      description: 'Custom contact form with validation',
      category: 'Functionality',
    },
    {
      id: 'blog-system',
      name: 'Blog System',
      price: 200,
      duration: 4,
      description: 'Complete blog with admin panel',
      category: 'Functionality',
    },
    {
      id: 'user-auth',
      name: 'User Authentication',
      price: 180,
      duration: 3,
      description: 'Login/register system',
      category: 'Functionality',
    },
    {
      id: 'booking-system',
      name: 'Booking System',
      price: 300,
      duration: 5,
      description: 'Appointment booking calendar',
      category: 'Functionality',
    },
    {
      id: 'payment-gateway',
      name: 'Payment Integration',
      price: 180,
      duration: 3,
      description: 'Stripe/PayPal payment processing',
      category: 'Functionality',
    },
    
    // Performance & SEO
    {
      id: 'seo-optimization',
      name: 'SEO Optimization',
      price: 100,
      duration: 2,
      description: 'Search engine optimization',
      category: 'Performance',
    },
    {
      id: 'performance-optimization',
      name: 'Performance Optimization',
      price: 120,
      duration: 2,
      description: 'Speed and performance improvements',
      category: 'Performance',
    },
    {
      id: 'pwa-support',
      name: 'PWA Support',
      price: 200,
      duration: 3,
      description: 'Progressive Web App features',
      category: 'Performance',
    },
    
    // Integration
    {
      id: 'cms-integration',
      name: 'CMS Integration',
      price: 250,
      duration: 4,
      description: 'Content management system',
      category: 'Integration',
    },
    {
      id: 'analytics-integration',
      name: 'Analytics Setup',
      price: 50,
      duration: 0.5,
      description: 'Google Analytics integration',
      category: 'Integration',
    },
    {
      id: 'social-integration',
      name: 'Social Media Integration',
      price: 80,
      duration: 1,
      description: 'Social media feeds and sharing',
      category: 'Integration',
    },
    {
      id: 'multi-language',
      name: 'Multi-Language Support',
      price: 150,
      duration: 3,
      description: 'Multiple language support',
      category: 'Integration',
    },
  ];

  const featureCategories = [
    'Design',
    'Functionality', 
    'Performance',
    'Integration',
  ];

  // Calculate pricing
  useEffect(() => {
    const selectedPkg = packages.find(pkg => pkg.id === selectedPackage);
    if (!selectedPkg) return;

    let price = selectedPkg.basePrice;
    let duration = selectedPkg.duration;
    
    // Additional pages
    price += additionalPages * 80;
    duration += additionalPages * 1;
    
    // Selected features
    selectedFeatures.forEach(featureId => {
      const feature = features.find(f => f.id === featureId);
      if (feature) {
        price += feature.price;
        duration += feature.duration;
      }
    });
    
    // Rush delivery
    if (rushDelivery === 'half') {
      price += 100;
      duration = Math.ceil(duration / 2);
    } else if (rushDelivery === 'quarter') {
      price += 360;
      duration = Math.ceil(duration / 4);
    }
    
    // Ownership rights
    if (ownershipRights) {
      price += 60;
    }
    
    // Calculate discount
    let discountAmount = 0;
    if (advancePayment === 'fifty') {
      discountAmount = price * 0.1; // 10% discount
    } else if (advancePayment === 'full') {
      discountAmount = price * 0.25; // 25% discount
    }
    
    const final = price - discountAmount;
    
    setTotalPrice(price);
    setTotalDuration(duration);
    setDiscount(discountAmount);
    setFinalPrice(final);
  }, [
    selectedPackage,
    selectedFeatures,
    additionalPages,
    rushDelivery,
    ownershipRights,
    advancePayment,
  ]);

  const handleFeatureToggle = (featureId: string) => {
    setSelectedFeatures(prev =>
      prev.includes(featureId)
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };

  const handleGetQuote = () => {
    const selectedPkg = packages.find(pkg => pkg.id === selectedPackage);
    const selectedFeaturesList = selectedFeatures.map(id => 
      features.find(f => f.id === id)?.name
    ).filter(Boolean);

    const quoteData = {
      package: selectedPkg?.name,
      additionalPages,
      features: selectedFeaturesList,
      rushDelivery,
      ownershipRights,
      advancePayment,
      totalPrice,
      discount,
      finalPrice,
      estimatedDuration: Math.ceil(totalDuration),
    };

    // In a real app, this would send data to backend or open order form
    console.log('Quote Data:', quoteData);
    toast.success('Quote calculated! Redirecting to order form...');
    
    // Simulate redirect to order form with pre-filled data
    setTimeout(() => {
      window.location.href = '/order';
    }, 1500);
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
      <div className="container-custom section-padding">
        {/* Header */}
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
            Price Calculator
          </motion.h1>
          <motion.h2
            variants={itemVariants}
            className="text-xl md:text-2xl gradient-text font-medium mb-6"
          >
            Get an Instant Quote for Your Project
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-white/70 max-w-2xl mx-auto"
          >
            Use our interactive calculator to get an accurate estimate for your web development project. 
            Customize features and see real-time pricing.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Configuration Panel */}
          <div className="lg:col-span-2 space-y-8">
            {/* Package Selection */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="card p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Calculator className="w-6 h-6 mr-3 text-primary-400" />
                Choose Your Package
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {packages.map((pkg) => (
                  <motion.div
                    key={pkg.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative p-6 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedPackage === pkg.id
                        ? 'border-primary-500 bg-primary-500/10'
                        : 'border-white/20 bg-white/5 hover:border-white/40'
                    }`}
                    onClick={() => setSelectedPackage(pkg.id)}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Popular
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-lg font-semibold text-white">{pkg.name}</h4>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedPackage === pkg.id
                          ? 'border-primary-500 bg-primary-500'
                          : 'border-white/40'
                      }`}>
                        {selectedPackage === pkg.id && <Check className="w-4 h-4 text-white" />}
                      </div>
                    </div>
                    
                    <p className="text-white/70 text-sm mb-4">{pkg.description}</p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-green-400 font-medium">${pkg.basePrice}</span>
                      <span className="text-blue-400 font-medium">{pkg.duration} days</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Additional Pages */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Additional Pages</h3>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setAdditionalPages(Math.max(0, additionalPages - 1))}
                  className="w-10 h-10 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors"
                >
                  -
                </button>
                <div className="flex-1 text-center">
                  <div className="text-2xl font-bold text-white">{additionalPages}</div>
                  <div className="text-white/70 text-sm">Extra pages ($80 each)</div>
                </div>
                <button
                  onClick={() => setAdditionalPages(additionalPages + 1)}
                  className="w-10 h-10 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors"
                >
                  +
                </button>
              </div>
            </motion.div>

            {/* Features Selection */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Additional Features</h3>
              
              {featureCategories.map((category) => {
                const categoryFeatures = features.filter(f => f.category === category);
                
                return (
                  <div key={category} className="mb-8">
                    <h4 className="text-lg font-semibold text-white mb-4 border-b border-white/20 pb-2">
                      {category}
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {categoryFeatures.map((feature) => (
                        <motion.div
                          key={feature.id}
                          whileHover={{ scale: 1.02 }}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            selectedFeatures.includes(feature.id)
                              ? 'border-primary-500 bg-primary-500/10'
                              : 'border-white/20 bg-white/5 hover:border-white/40'
                          }`}
                          onClick={() => handleFeatureToggle(feature.id)}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h5 className="font-medium text-white">{feature.name}</h5>
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                              selectedFeatures.includes(feature.id)
                                ? 'border-primary-500 bg-primary-500'
                                : 'border-white/40'
                            }`}>
                              {selectedFeatures.includes(feature.id) && (
                                <Check className="w-3 h-3 text-white" />
                              )}
                            </div>
                          </div>
                          
                          <p className="text-white/70 text-sm mb-3">{feature.description}</p>
                          
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-green-400 font-medium">+${feature.price}</span>
                            <span className="text-blue-400 font-medium">+{feature.duration}d</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </motion.div>

            {/* Options */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Project Options</h3>
              
              <div className="space-y-6">
                {/* Rush Delivery */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Delivery Speed</h4>
                  <div className="space-y-3">
                    {[
                      { id: 'none', label: 'Standard Delivery', price: 0, description: 'Normal timeline' },
                      { id: 'half', label: 'Rush Delivery (50% faster)', price: 100, description: 'Reduce timeline by half' },
                      { id: 'quarter', label: 'Express Delivery (75% faster)', price: 360, description: 'Reduce timeline to quarter' },
                    ].map((option) => (
                      <label key={option.id} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="rushDelivery"
                          value={option.id}
                          checked={rushDelivery === option.id}
                          onChange={(e) => setRushDelivery(e.target.value as any)}
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
                      checked={ownershipRights}
                      onChange={(e) => setOwnershipRights(e.target.checked)}
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
                    ].map((option) => (
                      <label key={option.id} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="advancePayment"
                          value={option.id}
                          checked={advancePayment === option.id}
                          onChange={(e) => setAdvancePayment(e.target.value as any)}
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
              </div>
            </motion.div>
          </div>

          {/* Price Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="card p-8"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <DollarSign className="w-6 h-6 text-green-400" />
                  <h3 className="text-xl font-bold text-white">Price Summary</h3>
                </div>
                
                <div className="space-y-4 mb-6">
                  {/* Base Package */}
                  <div className="flex justify-between text-white/70">
                    <span>{packages.find(p => p.id === selectedPackage)?.name}</span>
                    <span>${packages.find(p => p.id === selectedPackage)?.basePrice}</span>
                  </div>
                  
                  {/* Additional Pages */}
                  {additionalPages > 0 && (
                    <div className="flex justify-between text-white/70">
                      <span>Additional Pages ({additionalPages})</span>
                      <span>${additionalPages * 80}</span>
                    </div>
                  )}
                  
                  {/* Selected Features */}
                  {selectedFeatures.map(featureId => {
                    const feature = features.find(f => f.id === featureId);
                    return feature ? (
                      <div key={featureId} className="flex justify-between text-white/70 text-sm">
                        <span className="truncate mr-2">{feature.name}</span>
                        <span>${feature.price}</span>
                      </div>
                    ) : null;
                  })}
                  
                  {/* Rush Delivery */}
                  {rushDelivery !== 'none' && (
                    <div className="flex justify-between text-white/70">
                      <span>Rush Delivery</span>
                      <span>+${rushDelivery === 'half' ? 100 : 360}</span>
                    </div>
                  )}
                  
                  {/* Ownership Rights */}
                  {ownershipRights && (
                    <div className="flex justify-between text-white/70">
                      <span>Ownership Rights</span>
                      <span>+$60</span>
                    </div>
                  )}
                </div>
                
                <div className="border-t border-white/20 pt-4 space-y-2">
                  <div className="flex justify-between text-white">
                    <span>Subtotal</span>
                    <span>${totalPrice}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-green-400">
                      <span>Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-xl font-bold text-white pt-2 border-t border-white/20">
                    <span>Total</span>
                    <span>${finalPrice.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <div className="flex items-center space-x-2 text-blue-400 mb-2">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">Estimated Timeline</span>
                  </div>
                  <div className="text-white text-lg font-semibold">
                    {Math.ceil(totalDuration)} days
                  </div>
                </div>
                
                <div className="mt-6 space-y-3">
                  <motion.button
                    onClick={handleGetQuote}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full btn-accent flex items-center justify-center space-x-2"
                  >
                    <Send className="w-5 h-5" />
                    <span>Get Detailed Quote</span>
                  </motion.button>
                  
                  <button className="w-full btn-secondary flex items-center justify-center space-x-2">
                    <Download className="w-5 h-5" />
                    <span>Download Estimate</span>
                  </button>
                </div>
                
                <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Info className="w-4 h-4 text-yellow-400 mt-0.5" />
                    <div className="text-yellow-400 text-sm">
                      <p className="font-medium mb-1">Note:</p>
                      <p>This is an estimate. Final pricing may vary based on specific requirements and complexity.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card text-center p-12 mt-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Get a detailed quote and let's discuss how we can bring your vision to life with cutting-edge web technologies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGetQuote}
              className="btn-accent flex items-center space-x-2"
            >
              <span>Start Project</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <a href="/contact" className="btn-secondary">
              Contact for Custom Quote
            </a>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default PriceCalculator;

