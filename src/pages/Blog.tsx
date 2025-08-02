import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  User, 
  Tag, 
  ArrowRight,
  BookOpen,
  TrendingUp,
  Eye,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Link, useParams } from 'react-router-dom';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  readTime: number;
  tags: string[];
  category: string;
  featured: boolean;
  views: number;
  likes: number;
  image: string;
}

const Blog: React.FC = () => {
  const { t } = useLanguage();
  const { postId } = useParams();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const postsPerPage = 6;

  // Mock blog posts
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Modern React Development Best Practices in 2024',
      content: `
# Modern React Development Best Practices in 2024

React continues to evolve, and with it, the best practices for building scalable, maintainable applications. In this comprehensive guide, we'll explore the latest patterns and techniques that every React developer should know.

## 1. Component Composition Over Inheritance

React favors composition over inheritance, and this principle has become even more important with the introduction of hooks. Instead of creating complex class hierarchies, we can compose functionality using custom hooks and higher-order components.

\`\`\`jsx
// Good: Composition with custom hooks
function useUserData(userId) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchUser(userId).then(setUser).finally(() => setLoading(false));
  }, [userId]);
  
  return { user, loading };
}

function UserProfile({ userId }) {
  const { user, loading } = useUserData(userId);
  
  if (loading) return <Spinner />;
  return <div>{user.name}</div>;
}
\`\`\`

## 2. TypeScript Integration

TypeScript has become essential for large React applications. It provides type safety, better IDE support, and helps catch errors at compile time.

\`\`\`tsx
interface User {
  id: string;
  name: string;
  email: string;
}

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onEdit }) => {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <button onClick={() => onEdit(user)}>Edit</button>
    </div>
  );
};
\`\`\`

## 3. State Management with Zustand

While Redux is still popular, lighter alternatives like Zustand are gaining traction for their simplicity and performance.

\`\`\`tsx
import { create } from 'zustand';

interface UserStore {
  users: User[];
  addUser: (user: User) => void;
  removeUser: (id: string) => void;
}

const useUserStore = create<UserStore>((set) => ({
  users: [],
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  removeUser: (id) => set((state) => ({ 
    users: state.users.filter(user => user.id !== id) 
  })),
}));
\`\`\`

## 4. Performance Optimization

React 18 introduced new features like automatic batching and concurrent features. Understanding these can significantly improve your app's performance.

### Automatic Batching
React 18 automatically batches multiple state updates, reducing re-renders.

### useMemo and useCallback
Use these hooks judiciously to prevent unnecessary re-computations and re-renders.

\`\`\`tsx
const ExpensiveComponent = ({ items, filter }) => {
  const filteredItems = useMemo(() => {
    return items.filter(item => item.category === filter);
  }, [items, filter]);
  
  const handleClick = useCallback((id) => {
    // Handle click logic
  }, []);
  
  return (
    <div>
      {filteredItems.map(item => (
        <Item key={item.id} item={item} onClick={handleClick} />
      ))}
    </div>
  );
};
\`\`\`

## 5. Testing Strategies

Modern React testing focuses on testing behavior rather than implementation details.

\`\`\`tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { UserCard } from './UserCard';

test('calls onEdit when edit button is clicked', () => {
  const mockUser = { id: '1', name: 'John', email: 'john@example.com' };
  const mockOnEdit = jest.fn();
  
  render(<UserCard user={mockUser} onEdit={mockOnEdit} />);
  
  fireEvent.click(screen.getByText('Edit'));
  expect(mockOnEdit).toHaveBeenCalledWith(mockUser);
});
\`\`\`

## Conclusion

React development in 2024 is all about simplicity, performance, and developer experience. By following these best practices, you'll build applications that are not only functional but also maintainable and scalable.

Remember, the React ecosystem is constantly evolving, so stay updated with the latest changes and community best practices.
      `,
      excerpt: 'Explore the latest React development patterns and techniques that every developer should know in 2024.',
      author: 'Omar Sakr',
      publishedAt: '2024-01-20',
      readTime: 8,
      tags: ['React', 'JavaScript', 'Best Practices', 'TypeScript'],
      category: 'Frontend',
      featured: true,
      views: 1250,
      likes: 89,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
    },
    {
      id: '2',
      title: 'Building Scalable APIs with Node.js and Express',
      content: `
# Building Scalable APIs with Node.js and Express

Creating robust, scalable APIs is crucial for modern web applications. In this guide, we'll explore best practices for building APIs with Node.js and Express that can handle growth and maintain performance.

## Architecture Patterns

### 1. Layered Architecture
Organize your code into distinct layers: routes, controllers, services, and data access.

\`\`\`javascript
// routes/users.js
const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);

module.exports = router;

// controllers/userController.js
const userService = require('../services/userService');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// services/userService.js
const User = require('../models/User');

exports.getAllUsers = async () => {
  return await User.find().select('-password');
};
\`\`\`

### 2. Middleware for Cross-Cutting Concerns

\`\`\`javascript
// middleware/auth.js
const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

// middleware/validation.js
const { body, validationResult } = require('express-validator');

exports.validateUser = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
\`\`\`

## Database Integration

### Using Mongoose for MongoDB

\`\`\`javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now }
});

userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('User', userSchema);
\`\`\`

## Error Handling

### Global Error Handler

\`\`\`javascript
// middleware/errorHandler.js
exports.errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation Error',
      details: Object.values(err.errors).map(e => e.message)
    });
  }
  
  if (err.code === 11000) {
    return res.status(400).json({
      error: 'Duplicate field value'
    });
  }
  
  res.status(500).json({
    error: 'Internal Server Error'
  });
};
\`\`\`

## Security Best Practices

\`\`\`javascript
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');

// Security middleware
app.use(helmet());
app.use(mongoSanitize());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);
\`\`\`

## Testing

\`\`\`javascript
const request = require('supertest');
const app = require('../app');

describe('User API', () => {
  test('GET /api/users should return users', async () => {
    const response = await request(app)
      .get('/api/users')
      .expect(200);
      
    expect(response.body).toBeInstanceOf(Array);
  });
  
  test('POST /api/users should create user', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123'
    };
    
    const response = await request(app)
      .post('/api/users')
      .send(userData)
      .expect(201);
      
    expect(response.body.email).toBe(userData.email);
  });
});
\`\`\`

## Conclusion

Building scalable APIs requires careful planning and adherence to best practices. Focus on clean architecture, proper error handling, security, and comprehensive testing to create APIs that can grow with your application.
      `,
      excerpt: 'Learn how to build robust, scalable APIs using Node.js and Express with best practices and real-world examples.',
      author: 'Omar Sakr',
      publishedAt: '2024-01-15',
      readTime: 12,
      tags: ['Node.js', 'Express', 'API', 'Backend', 'MongoDB'],
      category: 'Backend',
      featured: true,
      views: 980,
      likes: 67,
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop',
    },
    {
      id: '3',
      title: 'CSS Grid vs Flexbox: When to Use Which',
      content: `
# CSS Grid vs Flexbox: When to Use Which

Both CSS Grid and Flexbox are powerful layout systems, but they serve different purposes. Understanding when to use each one is crucial for creating efficient, maintainable layouts.

## Flexbox: One-Dimensional Layouts

Flexbox is designed for one-dimensional layouts - either a row or a column. It's perfect for:

### Navigation Bars
\`\`\`css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
}
\`\`\`

### Card Components
\`\`\`css
.card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-content {
  flex: 1; /* Takes up remaining space */
}

.card-actions {
  margin-top: auto; /* Pushes to bottom */
}
\`\`\`

## CSS Grid: Two-Dimensional Layouts

CSS Grid excels at two-dimensional layouts where you need to control both rows and columns.

### Page Layouts
\`\`\`css
.page-layout {
  display: grid;
  grid-template-areas: 
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 250px 1fr 200px;
  min-height: 100vh;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }
\`\`\`

### Image Galleries
\`\`\`css
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.gallery-item:nth-child(3n) {
  grid-column: span 2;
}
\`\`\`

## Combining Both

Often, the best approach is to use both Grid and Flexbox together:

\`\`\`css
/* Grid for overall layout */
.page {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 2rem;
}

/* Flexbox for component internals */
.article-card {
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}
\`\`\`

## Decision Framework

### Use Flexbox when:
- Creating one-dimensional layouts
- Aligning items within a container
- Building navigation components
- Creating flexible card layouts
- Centering content

### Use CSS Grid when:
- Creating two-dimensional layouts
- Building complex page layouts
- Creating image galleries or product grids
- You need precise control over both rows and columns
- Creating responsive layouts with grid areas

## Browser Support

Both Flexbox and CSS Grid have excellent browser support:
- Flexbox: 98%+ global support
- CSS Grid: 96%+ global support

## Conclusion

Don't think of Grid vs Flexbox as an either/or choice. They complement each other perfectly. Use Grid for your overall page layout and Flexbox for component-level layouts. This combination gives you the power and flexibility to create any layout you can imagine.
      `,
      excerpt: 'A comprehensive guide to understanding when to use CSS Grid vs Flexbox for your layouts.',
      author: 'Omar Sakr',
      publishedAt: '2024-01-10',
      readTime: 6,
      tags: ['CSS', 'Grid', 'Flexbox', 'Layout', 'Frontend'],
      category: 'CSS',
      featured: false,
      views: 756,
      likes: 45,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    },
    {
      id: '4',
      title: 'TypeScript Advanced Types and Patterns',
      content: `
# TypeScript Advanced Types and Patterns

TypeScript's type system is incredibly powerful. Let's explore advanced types and patterns that can make your code more robust and expressive.

## Utility Types

### Partial and Required
\`\`\`typescript
interface User {
  id: string;
  name: string;
  email: string;
  age: number;
}

// Make all properties optional
type PartialUser = Partial<User>;

// Make all properties required
type RequiredUser = Required<Partial<User>>;

// Update function using Partial
function updateUser(id: string, updates: Partial<User>) {
  // Implementation
}
\`\`\`

### Pick and Omit
\`\`\`typescript
// Pick specific properties
type UserSummary = Pick<User, 'id' | 'name'>;

// Omit specific properties
type CreateUserData = Omit<User, 'id'>;

function createUser(data: CreateUserData): User {
  return {
    id: generateId(),
    ...data
  };
}
\`\`\`

## Conditional Types

\`\`\`typescript
type ApiResponse<T> = T extends string 
  ? { message: T } 
  : { data: T };

type StringResponse = ApiResponse<string>; // { message: string }
type UserResponse = ApiResponse<User>; // { data: User }
\`\`\`

## Mapped Types

\`\`\`typescript
// Make all properties readonly
type ReadonlyUser = {
  readonly [K in keyof User]: User[K];
};

// Add optional prefix to all properties
type OptionalUser = {
  [K in keyof User]?: User[K];
};

// Transform property types
type StringifiedUser = {
  [K in keyof User]: string;
};
\`\`\`

## Template Literal Types

\`\`\`typescript
type EventName = 'click' | 'focus' | 'blur';
type EventHandler<T extends EventName> = \`on\${Capitalize<T>}\`;

type ClickHandler = EventHandler<'click'>; // 'onClick'
type FocusHandler = EventHandler<'focus'>; // 'onFocus'

// Dynamic property names
type EventHandlers = {
  [K in EventName as EventHandler<K>]: (event: Event) => void;
};
// Result: { onClick: (event: Event) => void; onFocus: ...; onBlur: ... }
\`\`\`

## Discriminated Unions

\`\`\`typescript
interface LoadingState {
  status: 'loading';
}

interface SuccessState {
  status: 'success';
  data: User[];
}

interface ErrorState {
  status: 'error';
  error: string;
}

type AsyncState = LoadingState | SuccessState | ErrorState;

function handleState(state: AsyncState) {
  switch (state.status) {
    case 'loading':
      return <Spinner />;
    case 'success':
      return <UserList users={state.data} />; // TypeScript knows data exists
    case 'error':
      return <ErrorMessage error={state.error} />; // TypeScript knows error exists
  }
}
\`\`\`

## Generic Constraints

\`\`\`typescript
interface Identifiable {
  id: string;
}

function updateEntity<T extends Identifiable>(
  entities: T[], 
  id: string, 
  updates: Partial<T>
): T[] {
  return entities.map(entity => 
    entity.id === id ? { ...entity, ...updates } : entity
  );
}
\`\`\`

## Infer Keyword

\`\`\`typescript
// Extract return type from function
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

// Extract array element type
type ArrayElement<T> = T extends (infer U)[] ? U : never;

type StringArray = string[];
type Element = ArrayElement<StringArray>; // string
\`\`\`

## Recursive Types

\`\`\`typescript
interface TreeNode<T> {
  value: T;
  children?: TreeNode<T>[];
}

// Deep readonly
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};
\`\`\`

## Practical Example: Form Validation

\`\`\`typescript
type ValidationRule<T> = {
  required?: boolean;
  minLength?: T extends string ? number : never;
  min?: T extends number ? number : never;
  max?: T extends number ? number : never;
  pattern?: T extends string ? RegExp : never;
};

type FormSchema<T> = {
  [K in keyof T]: ValidationRule<T[K]>;
};

interface LoginForm {
  email: string;
  password: string;
  age: number;
}

const loginSchema: FormSchema<LoginForm> = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  password: {
    required: true,
    minLength: 8
  },
  age: {
    required: true,
    min: 18,
    max: 120
  }
};
\`\`\`

## Conclusion

TypeScript's advanced type system enables you to catch errors at compile time and create more expressive, self-documenting code. These patterns might seem complex at first, but they become invaluable as your applications grow in size and complexity.

Start with the basics and gradually incorporate these advanced patterns as you become more comfortable with TypeScript's type system.
      `,
      excerpt: 'Dive deep into TypeScript\'s advanced type system with practical examples and patterns.',
      author: 'Omar Sakr',
      publishedAt: '2024-01-05',
      readTime: 10,
      tags: ['TypeScript', 'Advanced', 'Types', 'Patterns'],
      category: 'TypeScript',
      featured: false,
      views: 623,
      likes: 38,
      image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop',
    },
    {
      id: '5',
      title: 'Web Performance Optimization Techniques',
      content: `
# Web Performance Optimization Techniques

Web performance directly impacts user experience, SEO rankings, and conversion rates. Let's explore proven techniques to make your websites lightning fast.

## Core Web Vitals

Google's Core Web Vitals are essential metrics for web performance:

### Largest Contentful Paint (LCP)
- **Target**: < 2.5 seconds
- **Optimization**: Optimize images, use CDN, improve server response times

### First Input Delay (FID)
- **Target**: < 100 milliseconds  
- **Optimization**: Minimize JavaScript execution time, use web workers

### Cumulative Layout Shift (CLS)
- **Target**: < 0.1
- **Optimization**: Set dimensions for images/videos, avoid inserting content above existing content

## Image Optimization

### Modern Formats
\`\`\`html
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Description" loading="lazy">
</picture>
\`\`\`

### Responsive Images
\`\`\`html
<img 
  src="image-800w.jpg"
  srcset="image-400w.jpg 400w, 
          image-800w.jpg 800w, 
          image-1200w.jpg 1200w"
  sizes="(max-width: 600px) 400px, 
         (max-width: 1000px) 800px, 
         1200px"
  alt="Description"
  loading="lazy"
>
\`\`\`

## JavaScript Optimization

### Code Splitting
\`\`\`javascript
// Dynamic imports for code splitting
const LazyComponent = React.lazy(() => import('./LazyComponent'));

// Route-based splitting
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Suspense>
  );
}
\`\`\`

### Tree Shaking
\`\`\`javascript
// Instead of importing entire library
import _ from 'lodash';

// Import only what you need
import { debounce } from 'lodash';

// Or use individual packages
import debounce from 'lodash.debounce';
\`\`\`

### Web Workers for Heavy Tasks
\`\`\`javascript
// worker.js
self.onmessage = function(e) {
  const { data } = e.data;
  
  // Perform heavy computation
  const result = heavyComputation(data);
  
  self.postMessage({ result });
};

// main.js
const worker = new Worker('worker.js');

worker.postMessage({ data: largeDataSet });
worker.onmessage = function(e) {
  const { result } = e.data;
  updateUI(result);
};
\`\`\`

## CSS Optimization

### Critical CSS
\`\`\`html
<head>
  <!-- Inline critical CSS -->
  <style>
    /* Above-the-fold styles */
    .header { /* styles */ }
    .hero { /* styles */ }
  </style>
  
  <!-- Load non-critical CSS asynchronously -->
  <link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="styles.css"></noscript>
</head>
\`\`\`

### CSS Containment
\`\`\`css
.component {
  contain: layout style paint;
}

.isolated-component {
  contain: strict;
}
\`\`\`

## Caching Strategies

### Service Worker Caching
\`\`\`javascript
// sw.js
const CACHE_NAME = 'v1';
const urlsToCache = [
  '/',
  '/styles.css',
  '/script.js',
  '/offline.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});
\`\`\`

### HTTP Caching Headers
\`\`\`javascript
// Express.js example
app.use('/static', express.static('public', {
  maxAge: '1y', // Cache static assets for 1 year
  etag: true,
  lastModified: true
}));

app.get('/api/data', (req, res) => {
  res.set({
    'Cache-Control': 'public, max-age=300', // 5 minutes
    'ETag': generateETag(data)
  });
  res.json(data);
});
\`\`\`

## Resource Loading Optimization

### Preloading Critical Resources
\`\`\`html
<!-- Preload critical resources -->
<link rel="preload" href="critical-font.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="hero-image.jpg" as="image">

<!-- Prefetch resources for next page -->
<link rel="prefetch" href="/next-page.html">

<!-- DNS prefetch for external domains -->
<link rel="dns-prefetch" href="//fonts.googleapis.com">
\`\`\`

### Lazy Loading
\`\`\`javascript
// Intersection Observer for lazy loading
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove('lazy');
      observer.unobserve(img);
    }
  });
});

document.querySelectorAll('img[data-src]').forEach(img => {
  imageObserver.observe(img);
});
\`\`\`

## Bundle Optimization

### Webpack Configuration
\`\`\`javascript
// webpack.config.js
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.(js|css|html|svg)$/,
      threshold: 8192,
      minRatio: 0.8,
    }),
  ],
};
\`\`\`

## Performance Monitoring

### Web Vitals Measurement
\`\`\`javascript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  // Send to your analytics service
  gtag('event', metric.name, {
    value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    event_category: 'Web Vitals',
    event_label: metric.id,
    non_interaction: true,
  });
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
\`\`\`

## Performance Budget

Set and monitor performance budgets:

\`\`\`json
{
  "budget": [
    {
      "path": "/**",
      "timings": [
        {
          "metric": "interactive",
          "budget": 5000
        },
        {
          "metric": "first-meaningful-paint",
          "budget": 2000
        }
      ],
      "resourceSizes": [
        {
          "resourceType": "script",
          "budget": 170
        },
        {
          "resourceType": "total",
          "budget": 300
        }
      ]
    }
  ]
}
\`\`\`

## Conclusion

Web performance optimization is an ongoing process. Start with measuring your current performance, identify bottlenecks, and apply these techniques systematically. Remember that the best optimization is often removing unnecessary code and resources.

Use tools like Lighthouse, WebPageTest, and Chrome DevTools to continuously monitor and improve your site's performance.
      `,
      excerpt: 'Comprehensive guide to web performance optimization techniques for faster, better user experiences.',
      author: 'Omar Sakr',
      publishedAt: '2024-01-01',
      readTime: 15,
      tags: ['Performance', 'Optimization', 'Web Vitals', 'Speed'],
      category: 'Performance',
      featured: true,
      views: 1420,
      likes: 102,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Posts' },
    { id: 'Frontend', label: 'Frontend' },
    { id: 'Backend', label: 'Backend' },
    { id: 'CSS', label: 'CSS' },
    { id: 'TypeScript', label: 'TypeScript' },
    { id: 'Performance', label: 'Performance' },
  ];

  // Filter posts
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  // Featured posts
  const featuredPosts = blogPosts.filter(post => post.featured).slice(0, 3);

  useEffect(() => {
    if (postId) {
      const post = blogPosts.find(p => p.id === postId);
      setSelectedPost(post || null);
    }
  }, [postId]);

  const renderMarkdown = (content: string) => {
    // Simple markdown renderer (in a real app, use a proper markdown library)
    return content
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-white mb-6">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-white mb-4 mt-8">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold text-white mb-3 mt-6">$1</h3>')
      .replace(/\*\*(.*)\*\*/gim, '<strong class="font-semibold text-white">$1</strong>')
      .replace(/\*(.*)\*/gim, '<em class="italic">$1</em>')
      .replace(/```(\w+)?\n([\s\S]*?)```/gim, '<pre class="bg-black/50 p-4 rounded-lg overflow-x-auto my-4"><code class="text-green-400">$2</code></pre>')
      .replace(/`([^`]+)`/gim, '<code class="bg-black/30 px-2 py-1 rounded text-green-400">$1</code>')
      .replace(/^\- (.*$)/gim, '<li class="text-white/80 mb-2">$1</li>')
      .replace(/\n\n/gim, '</p><p class="text-white/80 mb-4">')
      .replace(/^(?!<[h|l|p|c])(.*$)/gim, '<p class="text-white/80 mb-4">$1</p>');
  };

  if (selectedPost) {
    return (
      <div className="min-h-screen pt-20">
        <article className="container-custom section-padding max-w-4xl mx-auto">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setSelectedPost(null)}
            className="flex items-center space-x-2 text-primary-400 hover:text-primary-300 transition-colors mb-8"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Blog</span>
          </motion.button>

          {/* Article Header */}
          <motion.header
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <img
              src={selectedPost.image}
              alt={selectedPost.title}
              className="w-full h-64 md:h-96 object-cover rounded-2xl mb-8"
            />
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              {selectedPost.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-white/70 mb-6">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>{selectedPost.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{selectedPost.publishedAt}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{selectedPost.readTime} min read</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4" />
                <span>{selectedPost.views} views</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {selectedPost.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-primary-500/20 text-primary-300 text-sm rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Social Actions */}
            <div className="flex items-center space-x-4 pb-8 border-b border-white/20">
              <button className="flex items-center space-x-2 text-white/70 hover:text-red-400 transition-colors">
                <Heart className="w-5 h-5" />
                <span>{selectedPost.likes}</span>
              </button>
              <button className="flex items-center space-x-2 text-white/70 hover:text-primary-400 transition-colors">
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </button>
            </div>
          </motion.header>

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(selectedPost.content) }}
          />

          {/* Author Bio */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card p-8 mt-12"
          >
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                OS
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Omar Sakr</h3>
                <p className="text-white/70 mb-4">
                  Professional web developer with 5+ years of experience in modern web technologies. 
                  Passionate about creating efficient, scalable solutions and sharing knowledge with the community.
                </p>
                <div className="flex space-x-4">
                  <a href="/contact" className="text-primary-400 hover:text-primary-300 transition-colors">
                    Follow
                  </a>
                  <a href="/portfolio" className="text-primary-400 hover:text-primary-300 transition-colors">
                    View Work
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </article>
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
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Tech Blog
          </h1>
          <h2 className="text-xl md:text-2xl gradient-text font-medium mb-6">
            Insights, Tutorials & Best Practices
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Explore the latest in web development, programming tips, and technology insights from my experience building modern applications.
          </p>
        </motion.div>

        {/* Featured Posts */}
        <section className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-white mb-8"
          >
            Featured Posts
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="card overflow-hidden group cursor-pointer"
                onClick={() => setSelectedPost(post)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center space-x-4 text-sm text-white/70 mb-3">
                    <span>{post.category}</span>
                    <span>•</span>
                    <span>{post.readTime} min read</span>
                    <span>•</span>
                    <span>{post.publishedAt}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-300 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-white/70 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 2).map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-primary-500/20 text-primary-300 text-xs rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center space-x-4 text-white/70 text-sm">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{post.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span>{post.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row gap-6 mb-12"
        >
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <Filter className="w-5 h-5 text-white/70 mt-2 mr-2" />
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setCurrentPage(1);
                }}
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
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search posts..."
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
            />
          </div>
        </motion.div>

        {/* All Posts */}
        <section>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-white mb-8"
          >
            All Posts
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <AnimatePresence>
              {paginatedPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -10 }}
                  className="card overflow-hidden group cursor-pointer"
                  onClick={() => setSelectedPost(post)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    {post.featured && (
                      <div className="absolute top-4 left-4 bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-4 text-sm text-white/70 mb-3">
                      <span>{post.category}</span>
                      <span>•</span>
                      <span>{post.readTime} min read</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-300 transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-white/70 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 2).map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-primary-500/20 text-primary-300 text-xs rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center space-x-4 text-white/70 text-sm">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{post.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span>{post.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg ${
                  currentPage === 1
                    ? 'text-white/30 cursor-not-allowed'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-lg font-medium transition-all ${
                    currentPage === i + 1
                      ? 'bg-primary-600 text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg ${
                  currentPage === totalPages
                    ? 'text-white/30 cursor-not-allowed'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* No Results */}
          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <BookOpen className="w-16 h-16 text-white/30 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">No Posts Found</h3>
              <p className="text-white/70">Try adjusting your search or filter criteria.</p>
            </motion.div>
          )}
        </section>

        {/* Newsletter Signup */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card text-center p-12 mt-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Stay Updated
          </h2>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Subscribe to get the latest posts and tutorials delivered directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
            <button className="btn-accent">
              Subscribe
            </button>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Blog;

