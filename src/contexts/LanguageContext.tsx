import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  languages: Language[];
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
];

const translations: Record<string, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.portfolio': 'Portfolio',
    'nav.contact': 'Contact',
    'nav.blog': 'Blog',
    'nav.order': 'Order Project',
    'nav.calculator': 'Price Calculator',
    'nav.consultation': 'Free Consultation',
    
    // Home Page
    'home.hero.title': 'Professional Web Developer',
    'home.hero.subtitle': 'Creating Modern, Fast & Interactive Web Solutions',
    'home.hero.description': 'Experienced web developer specializing in React, TypeScript, and modern web technologies. Let\'s build something amazing together.',
    'home.hero.cta': 'View My Work',
    'home.hero.contact': 'Get In Touch',
    
    // Sections
    'home.about.title': 'About Me',
    'home.about.description': 'Learn more about my background, skills, and experience in web development.',
    'home.portfolio.title': 'My Work',
    'home.portfolio.description': 'Explore my latest projects and see what I can create for you.',
    'home.contact.title': 'Get In Touch',
    'home.contact.description': 'Ready to start your project? Let\'s discuss your ideas.',
    'home.order.title': 'Order Project',
    'home.order.description': 'Get a custom quote for your web development project.',
    
    // About Page
    'about.title': 'About Omar Sakr',
    'about.subtitle': 'Passionate Web Developer & Creative Problem Solver',
    'about.description': 'I am a dedicated web developer with extensive experience in creating modern, responsive, and user-friendly web applications.',
    
    // Portfolio
    'portfolio.title': 'My Portfolio',
    'portfolio.subtitle': 'Recent Projects & Work',
    'portfolio.filter.all': 'All',
    'portfolio.filter.frontend': 'Frontend',
    'portfolio.filter.backend': 'Backend',
    'portfolio.filter.fullstack': 'Full Stack',
    'portfolio.filter.mobile': 'Mobile',
    
    // Contact
    'contact.title': 'Contact Me',
    'contact.subtitle': 'Let\'s Work Together',
    'contact.form.name': 'Your Name',
    'contact.form.email': 'Your Email',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Your Message',
    'contact.form.send': 'Send Message',
    
    // Order Form
    'order.title': 'Order Your Project',
    'order.subtitle': 'Get a Custom Quote',
    'order.step1': 'Project Details',
    'order.step2': 'Features & Services',
    'order.step3': 'Review & Submit',
    
    // Common
    'common.loading': 'Loading',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.view': 'View',
    'common.download': 'Download',
    'common.upload': 'Upload',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.submit': 'Submit',
    'common.close': 'Close',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.about': 'من نحن',
    'nav.portfolio': 'أعمالي',
    'nav.contact': 'التواصل',
    'nav.blog': 'المدونة',
    'nav.order': 'طلب مشروع',
    'nav.calculator': 'حاسبة الأسعار',
    'nav.consultation': 'استشارة مجانية',
    
    // Home Page
    'home.hero.title': 'مطور ويب محترف',
    'home.hero.subtitle': 'إنشاء حلول ويب عصرية وسريعة وتفاعلية',
    'home.hero.description': 'مطور ويب ذو خبرة متخصص في React و TypeScript وتقنيات الويب الحديثة. دعنا نبني شيئًا رائعًا معًا.',
    'home.hero.cta': 'عرض أعمالي',
    'home.hero.contact': 'تواصل معي',
    
    // Sections
    'home.about.title': 'من نحن',
    'home.about.description': 'تعرف على خلفيتي ومهاراتي وخبرتي في تطوير الويب.',
    'home.portfolio.title': 'أعمالي',
    'home.portfolio.description': 'استكشف أحدث مشاريعي وشاهد ما يمكنني إنشاؤه لك.',
    'home.contact.title': 'تواصل معي',
    'home.contact.description': 'مستعد لبدء مشروعك؟ دعنا نناقش أفكارك.',
    'home.order.title': 'طلب مشروع',
    'home.order.description': 'احصل على عرض سعر مخصص لمشروع تطوير الويب الخاص بك.',
    
    // About Page
    'about.title': 'عن عمر صقر',
    'about.subtitle': 'مطور ويب شغوف وحلال مشاكل إبداعي',
    'about.description': 'أنا مطور ويب مخصص مع خبرة واسعة في إنشاء تطبيقات ويب عصرية ومتجاوبة وسهلة الاستخدام.',
    
    // Portfolio
    'portfolio.title': 'معرض أعمالي',
    'portfolio.subtitle': 'المشاريع والأعمال الحديثة',
    'portfolio.filter.all': 'الكل',
    'portfolio.filter.frontend': 'الواجهة الأمامية',
    'portfolio.filter.backend': 'الواجهة الخلفية',
    'portfolio.filter.fullstack': 'المكدس الكامل',
    'portfolio.filter.mobile': 'الجوال',
    
    // Contact
    'contact.title': 'تواصل معي',
    'contact.subtitle': 'دعنا نعمل معًا',
    'contact.form.name': 'اسمك',
    'contact.form.email': 'بريدك الإلكتروني',
    'contact.form.subject': 'الموضوع',
    'contact.form.message': 'رسالتك',
    'contact.form.send': 'إرسال الرسالة',
    
    // Order Form
    'order.title': 'اطلب مشروعك',
    'order.subtitle': 'احصل على عرض سعر مخصص',
    'order.step1': 'تفاصيل المشروع',
    'order.step2': 'الميزات والخدمات',
    'order.step3': 'المراجعة والإرسال',
    
    // Common
    'common.loading': 'جاري التحميل',
    'common.error': 'خطأ',
    'common.success': 'نجح',
    'common.cancel': 'إلغاء',
    'common.save': 'حفظ',
    'common.edit': 'تعديل',
    'common.delete': 'حذف',
    'common.view': 'عرض',
    'common.download': 'تحميل',
    'common.upload': 'رفع',
    'common.search': 'بحث',
    'common.filter': 'تصفية',
    'common.sort': 'ترتيب',
    'common.next': 'التالي',
    'common.previous': 'السابق',
    'common.submit': 'إرسال',
    'common.close': 'إغلاق',
  },
  // Add more languages as needed
  fr: {
    'nav.home': 'Accueil',
    'nav.about': 'À propos',
    'nav.portfolio': 'Portfolio',
    'nav.contact': 'Contact',
    'home.hero.title': 'Développeur Web Professionnel',
    // Add more French translations
  },
  de: {
    'nav.home': 'Startseite',
    'nav.about': 'Über mich',
    'nav.portfolio': 'Portfolio',
    'nav.contact': 'Kontakt',
    'home.hero.title': 'Professioneller Webentwickler',
    // Add more German translations
  },
  es: {
    'nav.home': 'Inicio',
    'nav.about': 'Acerca de',
    'nav.portfolio': 'Portafolio',
    'nav.contact': 'Contacto',
    'home.hero.title': 'Desarrollador Web Profesional',
    // Add more Spanish translations
  },
  zh: {
    'nav.home': '首页',
    'nav.about': '关于我',
    'nav.portfolio': '作品集',
    'nav.contact': '联系我',
    'home.hero.title': '专业网页开发者',
    // Add more Chinese translations
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage) {
      const language = languages.find(lang => lang.code === savedLanguage);
      if (language) {
        setCurrentLanguage(language);
      }
    }
  }, []);

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('preferred-language', language.code);
    
    // Update document direction for RTL languages
    document.documentElement.dir = language.code === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language.code;
  };

  const t = (key: string): string => {
    return translations[currentLanguage.code]?.[key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      setLanguage,
      t,
      languages,
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;

