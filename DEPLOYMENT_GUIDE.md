# دليل النشر - Omar Portfolio

## نظرة عامة
هذا الدليل يوضح كيفية نشر تطبيق الويب الشخصي لعمر صقر على منصات مختلفة.

## 🚀 خيارات النشر

### 1. Netlify (الموصى به)

#### المزايا:
- نشر تلقائي من GitHub
- CDN عالمي مجاني
- دعم PWA كامل
- SSL مجاني
- نطاق فرعي مجاني

#### خطوات النشر:
1. **إنشاء حساب Netlify**
   - اذهب إلى [netlify.com](https://netlify.com)
   - سجل باستخدام GitHub

2. **ربط المستودع**
   ```bash
   # رفع الكود إلى GitHub
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/username/omar-portfolio.git
   git push -u origin main
   ```

3. **تكوين النشر**
   - اختر "New site from Git"
   - اختر GitHub وحدد المستودع
   - إعدادات البناء:
     - Build command: `npm run build`
     - Publish directory: `build`
     - Node version: `18`

4. **متغيرات البيئة**
   ```
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   ```

5. **إعدادات إضافية**
   - تفعيل HTTPS
   - إعداد نطاق مخصص (اختياري)
   - تفعيل Form handling

### 2. Vercel

#### المزايا:
- أداء ممتاز
- تحسين تلقائي للصور
- دعم Serverless Functions
- تحليلات مدمجة

#### خطوات النشر:
1. **تثبيت Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **النشر**
   ```bash
   vercel
   ```

3. **تكوين vercel.json**
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "package.json",
         "use": "@vercel/static-build",
         "config": {
           "distDir": "build"
         }
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "/index.html"
       }
     ]
   }
   ```

### 3. Firebase Hosting

#### المزايا:
- تكامل مع Firebase services
- CDN سريع
- SSL مجاني
- دعم PWA

#### خطوات النشر:
1. **تثبيت Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **تسجيل الدخول**
   ```bash
   firebase login
   ```

3. **تهيئة المشروع**
   ```bash
   firebase init hosting
   ```

4. **النشر**
   ```bash
   npm run build
   firebase deploy
   ```

### 4. GitHub Pages

#### خطوات النشر:
1. **تثبيت gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **إضافة scripts في package.json**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     },
     "homepage": "https://username.github.io/omar-portfolio"
   }
   ```

3. **النشر**
   ```bash
   npm run deploy
   ```

## 🔧 إعدادات ما قبل النشر

### 1. تحسين الإنتاج
```bash
# تنظيف التبعيات
npm audit fix

# تحسين Bundle
npm run build

# تحليل Bundle (اختياري)
npm install -g webpack-bundle-analyzer
npx webpack-bundle-analyzer build/static/js/*.js
```

### 2. متغيرات البيئة
إنشاء ملف `.env.production`:
```env
REACT_APP_API_URL=https://api.omarsakr.dev
REACT_APP_FIREBASE_API_KEY=production_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=omarsakr-portfolio.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=omarsakr-portfolio
REACT_APP_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

### 3. تحسين SEO
```javascript
// في public/index.html
<meta name="description" content="Omar Sakr - Professional Web Developer">
<meta name="keywords" content="web developer, react, typescript, portfolio">
<meta property="og:title" content="Omar Sakr - Web Developer">
<meta property="og:description" content="Professional web development services">
<meta property="og:image" content="%PUBLIC_URL%/og-image.jpg">
<meta property="og:url" content="https://omarsakr.dev">
```

## 🌐 إعداد النطاق المخصص

### 1. شراء النطاق
- Namecheap
- GoDaddy
- Google Domains

### 2. إعداد DNS
```
Type: CNAME
Name: www
Value: your-site.netlify.app

Type: A
Name: @
Value: 75.2.60.5 (Netlify IP)
```

### 3. تكوين SSL
- سيتم تفعيل SSL تلقائياً
- تأكد من إعادة التوجيه من HTTP إلى HTTPS

## 📊 مراقبة الأداء

### 1. Google Analytics
```javascript
// في src/index.tsx
import { gtag } from 'ga-gtag';

gtag('config', 'G-XXXXXXXXXX');
```

### 2. Google Search Console
- إضافة الموقع
- رفع Sitemap
- مراقبة الفهرسة

### 3. Lighthouse CI
```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run Lighthouse CI
        run: |
          npm install -g @lhci/cli@0.8.x
          lhci autorun
```

## 🔒 الأمان

### 1. Headers الأمان
```javascript
// في netlify.toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

### 2. Content Security Policy
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' https://www.googletagmanager.com;
               style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
               font-src 'self' https://fonts.gstatic.com;">
```

## 🚨 استكشاف الأخطاء

### مشاكل شائعة:

1. **خطأ في البناء**
   ```bash
   # تنظيف cache
   npm run build -- --reset-cache
   
   # تحديث التبعيات
   npm update
   ```

2. **مشاكل التوجيه**
   ```javascript
   // في public/_redirects (Netlify)
   /*    /index.html   200
   ```

3. **مشاكل PWA**
   ```javascript
   // تأكد من تسجيل Service Worker
   if ('serviceWorker' in navigator) {
     navigator.serviceWorker.register('/sw.js');
   }
   ```

## 📋 قائمة مراجعة النشر

### قبل النشر:
- [ ] اختبار جميع الصفحات
- [ ] التأكد من الاستجابة
- [ ] اختبار النماذج
- [ ] مراجعة SEO tags
- [ ] اختبار PWA
- [ ] تحسين الصور
- [ ] مراجعة الأداء

### بعد النشر:
- [ ] اختبار الموقع المنشور
- [ ] التأكد من SSL
- [ ] اختبار Google Analytics
- [ ] إرسال Sitemap
- [ ] اختبار PWA install
- [ ] مراقبة الأخطاء

## 📞 الدعم

في حالة مواجهة مشاكل:
1. راجع logs النشر
2. تحقق من متغيرات البيئة
3. اختبر محلياً أولاً
4. راجع وثائق المنصة

## 🔄 التحديثات المستقبلية

### نشر تلقائي:
```yaml
# .github/workflows/deploy.yml
name: Deploy to Netlify
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v1.2
        with:
          publish-dir: './build'
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

---

**تم إعداد هذا الدليل بواسطة عمر صقر**

