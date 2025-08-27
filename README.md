# � Portfolio Website - Technical Documentation

[![Next.js](https://img.shields.io/badge/Next.js-15.5.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

> **Modern portfolio website built with Next.js 15, featuring responsive design, interactive project showcases, and optimized performance.**

---

## 🏗️ **Project Overview**

This is a **full-stack portfolio website** built from scratch using modern web technologies. The project demonstrates advanced React concepts, responsive design principles, and performance optimization techniques.

### **🎯 Technical Achievements**
- **Server-Side Rendering (SSR)** with Next.js App Router
- **Interactive video demonstrations** with custom controls
- **Responsive mobile-first design** with Tailwind CSS
- **Type-safe development** with TypeScript
- **Component-based architecture** with reusable UI elements
- **Performance optimization** with image optimization and lazy loading

---

## 🛠️ **Tech Stack & Architecture**

### **Frontend Framework**
- **Next.js 15.5.0** - React framework with App Router
- **React 19.1.0** - Component-based UI library
- **TypeScript 5.x** - Type-safe JavaScript development

### **Styling & UI**
- **Tailwind CSS 4.x** - Utility-first CSS framework
- **Custom CSS variables** - Dark theme implementation
- **Responsive design** - Mobile-first approach
- **CSS Grid & Flexbox** - Modern layout techniques

### **Development Tools**
- **ESLint** - Code quality and consistency
- **PostCSS** - CSS processing and optimization
- **Turbopack** - Fast development and build tool

---

## 📂 **Project Structure**

```
src/
├── app/                        # Next.js App Router
│   ├── layout.tsx             # Root layout with global styles
│   ├── page.tsx               # Homepage with hero section
│   ├── about/
│   │   └── page.tsx           # About page with professional timeline
│   ├── contact/
│   │   └── page.tsx           # Contact information page
│   ├── projects/
│   │   ├── page.tsx           # Projects listing with filtering
│   │   └── [slug]/
│   │       └── page.tsx       # Dynamic project detail pages
│   ├── globals.css            # Global styles and CSS variables
│   └── favicon.ico
├── components/
│   ├── NavBar.tsx             # Navigation with mobile menu
│   └── ProjectCard.tsx        # Reusable project display component
└── data/
    └── projects.ts            # Project data with TypeScript interfaces

public/
├── images/                    # Project screenshots and previews
├── videos/                    # Demo videos for projects
├── resume.pdf                 # Resume download
└── resume.docx               # Resume download (Word format)
```

---

## 🔧 **Key Technical Implementations**

### **1. Navigation Component (`NavBar.tsx`)**
```typescript
// Advanced state management for mobile navigation
const [isMenuOpen, setIsMenuOpen] = useState(false);
const [isResumeDropdownOpen, setIsResumeDropdownOpen] = useState(false);

// Dropdown functionality with proper state handling
<div className="relative group">
  <button className="hover:text-[var(--accent-primary)] transition-colors">
    Resume ▾
  </button>
  <div className="absolute ... opacity-0 group-hover:opacity-100">
    {/* Dropdown content */}
  </div>
</div>
```

**Features Implemented:**
- **Mobile hamburger menu** with smooth animations
- **Dropdown navigation** for resume downloads
- **Responsive design** that adapts to screen sizes
- **Accessibility features** with proper ARIA labels

### **2. Project Card Component (`ProjectCard.tsx`)**
```typescript
// Video handling with custom controls
const [isVideoPlaying, setIsVideoPlaying] = useState(false);
const [showVideoModal, setShowVideoModal] = useState(false);
const videoRef = useRef<HTMLVideoElement>(null);

// Hover-to-play video functionality
const handleVideoLoad = useCallback(() => {
  if (videoRef.current) {
    videoRef.current.currentTime = 0;
    setIsVideoPlaying(true);
  }
}, []);
```

**Advanced Features:**
- **Hover-triggered video playback** for project previews
- **Modal video player** with full-screen viewing
- **Fallback image handling** when videos aren't available
- **Tech stack visualization** with animated tags
- **Responsive grid layout** adapting to different screen sizes

### **3. Dynamic Routing (`[slug]/page.tsx`)**
```typescript
// Dynamic project pages with type safety
export default function ProjectCaseStudy({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const project = projects.find(p => p.id === params.slug);
  if (!project) return notFound();
  
  return (
    // Project detail view
  );
}
```

**Implementation Details:**
- **Dynamic route generation** for each project
- **Type-safe parameter handling** with TypeScript
- **404 handling** for invalid project slugs
- **SEO optimization** with proper meta tags

### **4. Data Management (`projects.ts`)**
```typescript
// Type-safe project data structure
export type Project = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  repo: string;
  year?: string;
  image?: string;
  video?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  // Project data with full type safety
];
```

**Data Architecture:**
- **TypeScript interfaces** for type safety
- **Centralized data management** for easy updates
- **Optional properties** for flexible project entries
- **Array methods** for filtering and sorting

---

## 🎨 **Styling & Design Implementation**

### **CSS Custom Properties (Dark Theme)**
```css
:root {
  --background: #0a0a0a;
  --surface: #1a1a1a;
  --surface-hover: #2a2a2a;
  --text-primary: #ffffff;
  --text-secondary: #a1a1aa;
  --accent-primary: #06b6d4;
  --border: #262626;
}
```

### **Responsive Design Patterns**
```typescript
// Mobile-first responsive classes
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Responsive grid that adapts to screen size */}
</div>

// Conditional mobile menu rendering
{isMenuOpen && (
  <div className="md:hidden absolute top-16 left-0 right-0">
    {/* Mobile navigation */}
  </div>
)}
```

**Design Features:**
- **Mobile-first approach** with progressive enhancement
- **CSS Grid and Flexbox** for complex layouts
- **Custom animations** with CSS transitions
- **Dark theme** with consistent color system
- **Glassmorphism effects** for modern UI elements

---

## 🚀 **Performance Optimizations**

### **Image Optimization**
```typescript
import Image from 'next/image';

<Image
  src={project.image}
  alt={`${project.title} preview`}
  fill
  className="object-cover"
  priority={project.featured} // Prioritize featured project images
/>
```

### **Video Loading Strategy**
```typescript
// Lazy loading with preload metadata
<video
  src={project.video}
  preload="metadata"  // Load only metadata initially
  onLoadedData={handleVideoLoad}
/>
```

**Optimization Techniques:**
- **Next.js Image component** for automatic optimization
- **Lazy loading** for videos and images
- **Metadata preloading** for faster video startup
- **CSS-in-JS optimization** with Tailwind CSS
- **Bundle splitting** with Next.js automatic code splitting

---

## 📱 **Responsive Design Implementation**

### **Breakpoint Strategy**
```typescript
// Tailwind responsive prefixes
<div className="
  px-6          // Mobile: 24px padding
  md:px-10      // Tablet: 40px padding  
  lg:px-16      // Desktop: 64px padding
  grid 
  md:grid-cols-2 
  lg:grid-cols-3
">
```

### **Mobile Navigation**
```typescript
// Hamburger menu animation
<span className={`
  w-5 h-0.5 bg-[var(--text-primary)] 
  transition-all duration-300 
  ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}
`}></span>
```

**Mobile Features:**
- **Touch-friendly navigation** with proper touch targets
- **Swipe gestures** support for mobile devices
- **Viewport optimization** for different screen sizes
- **Progressive enhancement** ensuring functionality without JavaScript

---

## � **Development Workflow**

### **Getting Started**
```bash
# Install dependencies
npm install

# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run code quality checks
npm run lint
```

### **Available Scripts**
- `npm run dev` - Development server with hot reloading
- `npm run build` - Production build with optimizations
- `npm run start` - Production server
- `npm run lint` - ESLint code analysis

---

## 🏗️ **Build & Deployment**

### **Production Build**
- **Static generation** for optimal performance
- **Image optimization** with Next.js Image component
- **CSS optimization** with Tailwind CSS purging
- **JavaScript bundling** with automatic code splitting

### **Deployment Ready**
- **Vercel deployment** configuration included
- **Environment variables** support
- **SEO optimization** with proper meta tags
- **Progressive Web App** features ready

---

<div align="center">

**Modern Portfolio Implementation**  
*Built with Next.js, React, TypeScript, and Tailwind CSS*

</div>
