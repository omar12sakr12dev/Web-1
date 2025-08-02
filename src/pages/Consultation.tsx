import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  Video, 
  Phone, 
  MessageSquare, 
  User, 
  Mail, 
  Globe, 
  Check, 
  X,
  ChevronLeft,
  ChevronRight,
  Zap,
  Star,
  Gift,
  ArrowRight,
  Info
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import toast from 'react-hot-toast';

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

interface ConsultationType {
  id: string;
  name: string;
  duration: number;
  description: string;
  icon: React.ReactNode;
  popular?: boolean;
}

const Consultation: React.FC = () => {
  const { t } = useLanguage();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('general');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    description: '',
    preferredContact: 'video',
  });

  const consultationTypes: ConsultationType[] = [
    {
      id: 'general',
      name: 'General Consultation',
      duration: 30,
      description: 'Discuss your project ideas and get expert advice',
      icon: <MessageSquare className="w-6 h-6" />,
      popular: true,
    },
    {
      id: 'technical',
      name: 'Technical Review',
      duration: 45,
      description: 'Code review, architecture planning, and technical guidance',
      icon: <Zap className="w-6 h-6" />,
    },
    {
      id: 'strategy',
      name: 'Strategy Session',
      duration: 60,
      description: 'Business strategy, technology roadmap, and planning',
      icon: <Star className="w-6 h-6" />,
    },
  ];

  const timeSlots: TimeSlot[] = [
    { id: '09:00', time: '9:00 AM', available: true },
    { id: '10:00', time: '10:00 AM', available: true },
    { id: '11:00', time: '11:00 AM', available: false },
    { id: '14:00', time: '2:00 PM', available: true },
    { id: '15:00', time: '3:00 PM', available: true },
    { id: '16:00', time: '4:00 PM', available: true },
    { id: '17:00', time: '5:00 PM', available: false },
  ];

  const projectTypes = [
    'Website Development',
    'E-Commerce Store',
    'Web Application',
    'Mobile App',
    'API Development',
    'Code Review',
    'Performance Optimization',
    'Other',
  ];

  const budgetRanges = [
    'Under $1,000',
    '$1,000 - $5,000',
    '$5,000 - $10,000',
    '$10,000 - $25,000',
    '$25,000+',
    'Not sure yet',
  ];

  const timelines = [
    'ASAP',
    '1-2 weeks',
    '1 month',
    '2-3 months',
    '3-6 months',
    '6+ months',
    'Flexible',
  ];

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const today = new Date();
    
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      const isCurrentMonth = date.getMonth() === month;
      const isToday = date.toDateString() === today.toDateString();
      const isPast = date < today && !isToday;
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      const isSelected = selectedDate.toDateString() === date.toDateString();
      
      days.push({
        date,
        day: date.getDate(),
        isCurrentMonth,
        isToday,
        isPast,
        isWeekend,
        isSelected,
        isAvailable: isCurrentMonth && !isPast && !isWeekend,
      });
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();

  const handleDateSelect = (date: Date) => {
    if (date >= new Date() && date.getDay() !== 0 && date.getDay() !== 6) {
      setSelectedDate(date);
      setSelectedTime(''); // Reset time selection
    }
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedTime) {
      toast.error('Please select a time slot');
      return;
    }

    const consultationData = {
      ...formData,
      consultationType: selectedType,
      date: selectedDate.toISOString().split('T')[0],
      time: selectedTime,
      duration: consultationTypes.find(t => t.id === selectedType)?.duration,
    };

    console.log('Consultation booking:', consultationData);
    toast.success('Consultation booked successfully! You will receive a confirmation email shortly.');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      company: '',
      projectType: '',
      budget: '',
      timeline: '',
      description: '',
      preferredContact: 'video',
    });
    setSelectedTime('');
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="min-h-screen pt-20">
      <div className="container-custom section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Free Consultation
          </h1>
          <h2 className="text-xl md:text-2xl gradient-text font-medium mb-6">
            Let's Discuss Your Project
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Book a free consultation to discuss your project requirements, get expert advice, 
            and receive a personalized quote for your web development needs.
          </p>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {[
            {
              icon: <Gift className="w-8 h-8 text-green-400" />,
              title: 'Completely Free',
              description: 'No hidden costs or obligations. Just valuable insights for your project.',
            },
            {
              icon: <Zap className="w-8 h-8 text-blue-400" />,
              title: 'Expert Guidance',
              description: 'Get professional advice from an experienced web developer.',
            },
            {
              icon: <Star className="w-8 h-8 text-yellow-400" />,
              title: 'Personalized Solutions',
              description: 'Receive tailored recommendations based on your specific needs.',
            },
          ].map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="card p-6 text-center"
            >
              <div className="flex justify-center mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
              <p className="text-white/70">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            {/* Consultation Type */}
            <div className="card p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Choose Consultation Type</h3>
              
              <div className="space-y-4">
                {consultationTypes.map((type) => (
                  <motion.div
                    key={type.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative p-6 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedType === type.id
                        ? 'border-primary-500 bg-primary-500/10'
                        : 'border-white/20 bg-white/5 hover:border-white/40'
                    }`}
                    onClick={() => setSelectedType(type.id)}
                  >
                    {type.popular && (
                      <div className="absolute -top-3 left-6 bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Popular
                      </div>
                    )}
                    
                    <div className="flex items-start space-x-4">
                      <div className="text-primary-400 mt-1">{type.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-lg font-semibold text-white">{type.name}</h4>
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            selectedType === type.id
                              ? 'border-primary-500 bg-primary-500'
                              : 'border-white/40'
                          }`}>
                            {selectedType === type.id && <Check className="w-4 h-4 text-white" />}
                          </div>
                        </div>
                        <p className="text-white/70 text-sm mb-2">{type.description}</p>
                        <div className="flex items-center space-x-2 text-sm">
                          <Clock className="w-4 h-4 text-blue-400" />
                          <span className="text-blue-400 font-medium">{type.duration} minutes</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="card p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Your Information</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/70 mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-400"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white/70 mb-2">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-400"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/70 mb-2">Company/Organization</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-400"
                    placeholder="Your company name (optional)"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/70 mb-2">Project Type</label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-400"
                    >
                      <option value="" className="bg-secondary-800">Select project type</option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type} className="bg-secondary-800">
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-white/70 mb-2">Budget Range</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-400"
                    >
                      <option value="" className="bg-secondary-800">Select budget range</option>
                      {budgetRanges.map((range) => (
                        <option key={range} value={range} className="bg-secondary-800">
                          {range}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-white/70 mb-2">Timeline</label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-400"
                  >
                    <option value="" className="bg-secondary-800">Select timeline</option>
                    {timelines.map((timeline) => (
                      <option key={timeline} value={timeline} className="bg-secondary-800">
                        {timeline}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white/70 mb-2">Project Description</label>
                  <textarea
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-400 resize-none"
                    placeholder="Tell us about your project, goals, and any specific requirements..."
                  />
                </div>

                <div>
                  <label className="block text-white/70 mb-4">Preferred Contact Method</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { id: 'video', label: 'Video Call', icon: <Video className="w-5 h-5" /> },
                      { id: 'phone', label: 'Phone Call', icon: <Phone className="w-5 h-5" /> },
                      { id: 'chat', label: 'Text Chat', icon: <MessageSquare className="w-5 h-5" /> },
                    ].map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          formData.preferredContact === method.id
                            ? 'border-primary-500 bg-primary-500/10'
                            : 'border-white/20 bg-white/5 hover:border-white/40'
                        }`}
                      >
                        <input
                          type="radio"
                          name="preferredContact"
                          value={method.id}
                          checked={formData.preferredContact === method.id}
                          onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value })}
                          className="sr-only"
                        />
                        <div className="text-primary-400">{method.icon}</div>
                        <span className="text-white font-medium">{method.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </form>
            </div>
          </motion.div>

          {/* Calendar and Time Selection */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-8"
          >
            {/* Calendar */}
            <div className="card p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Select Date & Time</h3>
              
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={handlePrevMonth}
                  className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <h4 className="text-xl font-semibold text-white">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h4>
                
                <button
                  onClick={handleNextMonth}
                  className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center text-white/70 font-medium py-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((day, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleDateSelect(day.date)}
                    disabled={!day.isAvailable}
                    whileHover={day.isAvailable ? { scale: 1.1 } : {}}
                    whileTap={day.isAvailable ? { scale: 0.95 } : {}}
                    className={`
                      aspect-square flex items-center justify-center text-sm font-medium rounded-lg transition-all
                      ${!day.isCurrentMonth ? 'text-white/30' : ''}
                      ${day.isToday ? 'ring-2 ring-accent-500' : ''}
                      ${day.isPast || day.isWeekend ? 'text-white/30 cursor-not-allowed' : ''}
                      ${day.isSelected ? 'bg-primary-500 text-white' : ''}
                      ${day.isAvailable && !day.isSelected ? 'text-white hover:bg-white/10' : ''}
                    `}
                  >
                    {day.day}
                  </motion.button>
                ))}
              </div>

              <div className="mt-4 text-sm text-white/70">
                <p>• Weekends are not available</p>
                <p>• All times are in your local timezone</p>
              </div>
            </div>

            {/* Time Slots */}
            <AnimatePresence>
              {selectedDate && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="card p-8"
                >
                  <h4 className="text-xl font-bold text-white mb-6">
                    Available Times for {selectedDate.toLocaleDateString()}
                  </h4>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {timeSlots.map((slot) => (
                      <motion.button
                        key={slot.id}
                        onClick={() => setSelectedTime(slot.id)}
                        disabled={!slot.available}
                        whileHover={slot.available ? { scale: 1.05 } : {}}
                        whileTap={slot.available ? { scale: 0.95 } : {}}
                        className={`
                          p-3 rounded-lg font-medium transition-all
                          ${!slot.available ? 'bg-white/5 text-white/30 cursor-not-allowed' : ''}
                          ${selectedTime === slot.id ? 'bg-primary-500 text-white' : ''}
                          ${slot.available && selectedTime !== slot.id ? 'bg-white/10 text-white hover:bg-white/20' : ''}
                        `}
                      >
                        {slot.time}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Booking Summary */}
            <AnimatePresence>
              {selectedTime && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="card p-8"
                >
                  <h4 className="text-xl font-bold text-white mb-6">Booking Summary</h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white/70">Consultation Type</span>
                      <span className="text-white font-medium">
                        {consultationTypes.find(t => t.id === selectedType)?.name}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-white/70">Duration</span>
                      <span className="text-white font-medium">
                        {consultationTypes.find(t => t.id === selectedType)?.duration} minutes
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-white/70">Date</span>
                      <span className="text-white font-medium">
                        {selectedDate.toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-white/70">Time</span>
                      <span className="text-white font-medium">
                        {timeSlots.find(t => t.id === selectedTime)?.time}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-white/20">
                      <span className="text-white/70">Price</span>
                      <span className="text-green-400 font-bold text-xl">FREE</span>
                    </div>
                  </div>
                  
                  <motion.button
                    onClick={handleSubmit}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full btn-accent mt-6 flex items-center justify-center space-x-2"
                  >
                    <Calendar className="w-5 h-5" />
                    <span>Book Consultation</span>
                  </motion.button>
                  
                  <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Info className="w-4 h-4 text-blue-400 mt-0.5" />
                      <div className="text-blue-400 text-sm">
                        <p className="font-medium mb-1">What to expect:</p>
                        <ul className="space-y-1 text-xs">
                          <li>• You'll receive a confirmation email with meeting details</li>
                          <li>• A calendar invite will be sent to your email</li>
                          <li>• We'll discuss your project and provide expert advice</li>
                          <li>• You'll get a follow-up email with recommendations</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card p-12 mt-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: 'Is the consultation really free?',
                answer: 'Yes, absolutely! There are no hidden costs or obligations. This is my way of helping potential clients understand their project needs.',
              },
              {
                question: 'What should I prepare for the consultation?',
                answer: 'Come with your project ideas, any reference materials, and questions about timeline and budget. The more details you share, the better advice I can provide.',
              },
              {
                question: 'How long does a consultation last?',
                answer: 'Depending on the type you choose, consultations last 30-60 minutes. This gives us enough time to discuss your project thoroughly.',
              },
              {
                question: 'What happens after the consultation?',
                answer: 'You\'ll receive a follow-up email with our discussion summary, recommendations, and a detailed quote if you decide to move forward.',
              },
              {
                question: 'Can I reschedule my consultation?',
                answer: 'Yes, you can reschedule up to 24 hours before your appointment. Just reply to your confirmation email with your preferred new time.',
              },
              {
                question: 'Do you work with international clients?',
                answer: 'Absolutely! I work with clients worldwide. All consultations can be conducted via video call, phone, or chat based on your preference.',
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="space-y-3"
              >
                <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                <p className="text-white/70">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Book your free consultation today and take the first step towards bringing your project to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => document.querySelector('.card')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-accent flex items-center space-x-2"
            >
              <span>Book Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <a href="/contact" className="btn-secondary">
              Have Questions? Contact Us
            </a>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Consultation;

