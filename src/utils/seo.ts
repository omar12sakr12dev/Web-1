// SEO utilities and meta tag management

export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export const updateSEOTags = (seoData: SEOData) => {
  // Update document title
  document.title = seoData.title;

  // Update or create meta tags
  updateMetaTag('description', seoData.description);
  
  if (seoData.keywords) {
    updateMetaTag('keywords', seoData.keywords.join(', '));
  }

  // Open Graph tags
  updateMetaTag('og:title', seoData.title, 'property');
  updateMetaTag('og:description', seoData.description, 'property');
  updateMetaTag('og:type', seoData.type || 'website', 'property');
  
  if (seoData.image) {
    updateMetaTag('og:image', seoData.image, 'property');
  }
  
  if (seoData.url) {
    updateMetaTag('og:url', seoData.url, 'property');
  }

  // Twitter Card tags
  updateMetaTag('twitter:card', 'summary_large_image', 'name');
  updateMetaTag('twitter:title', seoData.title, 'name');
  updateMetaTag('twitter:description', seoData.description, 'name');
  
  if (seoData.image) {
    updateMetaTag('twitter:image', seoData.image, 'name');
  }

  // Article specific tags
  if (seoData.type === 'article') {
    if (seoData.author) {
      updateMetaTag('article:author', seoData.author, 'property');
    }
    if (seoData.publishedTime) {
      updateMetaTag('article:published_time', seoData.publishedTime, 'property');
    }
    if (seoData.modifiedTime) {
      updateMetaTag('article:modified_time', seoData.modifiedTime, 'property');
    }
  }

  // Canonical URL
  if (seoData.url) {
    updateCanonicalUrl(seoData.url);
  }
};

const updateMetaTag = (name: string, content: string, attribute: 'name' | 'property' = 'name') => {
  let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
  
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  
  element.content = content;
};

const updateCanonicalUrl = (url: string) => {
  let element = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  
  if (!element) {
    element = document.createElement('link');
    element.rel = 'canonical';
    document.head.appendChild(element);
  }
  
  element.href = url;
};

// Structured data (JSON-LD)
export const addStructuredData = (data: any) => {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
};

// Person schema for about page
export const getPersonSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Omar Sakr',
  jobTitle: 'Web Developer',
  description: 'Professional web developer specializing in modern web technologies',
  url: 'https://omarsakr.dev',
  sameAs: [
    'https://github.com/omarsakr',
    'https://linkedin.com/in/omarsakr',
    'https://twitter.com/omarsakr',
  ],
  knowsAbout: [
    'Web Development',
    'React',
    'TypeScript',
    'Node.js',
    'Frontend Development',
    'Backend Development',
  ],
  alumniOf: {
    '@type': 'Organization',
    name: 'University Name',
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'EG',
  },
});

// Organization schema
export const getOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Omar Sakr - Web Developer',
  url: 'https://omarsakr.dev',
  logo: 'https://omarsakr.dev/logo.png',
  description: 'Professional web development services',
  founder: {
    '@type': 'Person',
    name: 'Omar Sakr',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-234-567-8900',
    contactType: 'customer service',
    email: 'Omar.hany.sakr.dev@gmail.com',
  },
});

// Website schema
export const getWebsiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Omar Sakr - Web Developer',
  url: 'https://omarsakr.dev',
  description: 'Professional web developer portfolio and services',
  author: {
    '@type': 'Person',
    name: 'Omar Sakr',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://omarsakr.dev/search?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
});

// Article schema for blog posts
export const getArticleSchema = (article: {
  title: string;
  description: string;
  publishedDate: string;
  modifiedDate?: string;
  image?: string;
  url: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: article.title,
  description: article.description,
  image: article.image,
  url: article.url,
  datePublished: article.publishedDate,
  dateModified: article.modifiedDate || article.publishedDate,
  author: {
    '@type': 'Person',
    name: 'Omar Sakr',
    url: 'https://omarsakr.dev/about',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Omar Sakr',
    logo: {
      '@type': 'ImageObject',
      url: 'https://omarsakr.dev/logo.png',
    },
  },
});

// Service schema for services page
export const getServiceSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Web Development Services',
  description: 'Professional web development services including frontend, backend, and full-stack development',
  provider: {
    '@type': 'Person',
    name: 'Omar Sakr',
  },
  areaServed: 'Worldwide',
  serviceType: 'Web Development',
  offers: [
    {
      '@type': 'Offer',
      name: 'Frontend Development',
      description: 'Modern frontend development with React, TypeScript, and more',
    },
    {
      '@type': 'Offer',
      name: 'Backend Development',
      description: 'Scalable backend solutions with Node.js, databases, and APIs',
    },
    {
      '@type': 'Offer',
      name: 'Full-Stack Development',
      description: 'Complete web application development from frontend to backend',
    },
  ],
});

// Breadcrumb schema
export const getBreadcrumbSchema = (breadcrumbs: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: breadcrumbs.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    item: crumb.url,
  })),
});

// FAQ schema
export const getFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

// Default SEO data for different pages
export const defaultSEOData = {
  home: {
    title: 'Omar Sakr - Professional Web Developer | Modern Web Solutions',
    description: 'Professional web developer specializing in React, TypeScript, Node.js, and modern web technologies. Creating fast, scalable, and user-friendly web applications.',
    keywords: ['web developer', 'react developer', 'typescript', 'frontend developer', 'full stack developer'],
    type: 'website' as const,
  },
  about: {
    title: 'About Omar Sakr - Web Developer & Technology Enthusiast',
    description: 'Learn about Omar Sakr, a passionate web developer with expertise in modern web technologies, creating innovative solutions for businesses worldwide.',
    keywords: ['about omar sakr', 'web developer bio', 'developer experience'],
    type: 'profile' as const,
  },
  portfolio: {
    title: 'Portfolio - Omar Sakr Web Development Projects',
    description: 'Explore Omar Sakr\'s portfolio of web development projects, showcasing expertise in React, TypeScript, Node.js, and modern web technologies.',
    keywords: ['web development portfolio', 'react projects', 'developer work'],
    type: 'website' as const,
  },
  contact: {
    title: 'Contact Omar Sakr - Web Development Services',
    description: 'Get in touch with Omar Sakr for professional web development services. Available for freelance projects and consultations worldwide.',
    keywords: ['contact web developer', 'hire developer', 'web development services'],
    type: 'website' as const,
  },
  blog: {
    title: 'Tech Blog - Omar Sakr | Web Development Insights & Tutorials',
    description: 'Read the latest web development articles, tutorials, and insights from Omar Sakr. Stay updated with modern web technologies and best practices.',
    keywords: ['web development blog', 'programming tutorials', 'tech articles'],
    type: 'website' as const,
  },
};

