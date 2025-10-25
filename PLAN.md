# Landing Page - Presentation

Based on your ideas, I'll create a comprehensive implementation plan that combines the best approaches into a lightweight, component-based presentation system. Here's the unified step-by-step plan:

## 🎯 Final Tech Stack Decision

**Core Stack:**

- **Astro** - Base framework with React for shadcn/ui
- **Tailwind CSS** - Styling
- **shadcn/ui** - Professional UI components
- **Astro's Shiki** - Built-in syntax highlighting
- **Alpine.js** - Lightweight interactivity

**No GSAP/AOS initially** - Start simple, add complexity only if needed

## 📋 Unified Implementation Plan

### Phase 1: Project Setup & Configuration

```bash
# Create Astro project with Tailwind and React
npm create astro@latest useEffect-presentation -- --template with-tailwindcss --yes
cd useEffect-presentation

# Add React support for shadcn/ui
npx astro add react

# Initialize shadcn/ui
npx shadcn@latest init
```

#### Configure path alias in tsconfig.json

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Phase 2: Install Required Components

```bash
# Essential shadcn components for presentation
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add progress
npx shadcn@latest add badge

# Alpine.js for lightweight interactivity
npm install alpinejs
```

### Phase 3: Project Structure

```text
src/
├── components/
│   ├── ui/                 # shadcn components
│   ├── slides/            # Individual slide components
│   │   ├── BaseSlide.astro
│   │   ├── Introduction.astro
│   │   ├── CodeExample.astro
│   │   └── Conclusion.astro
│   ├── CodeComparison.astro
│   ├── Navigation.astro
│   └── ProgressBar.astro
├── layouts/
│   └── Presentation.astro
├── pages/
│   └── index.astro
└── styles/
    └── global.css
```

### Phase 4: Core Components Implementation

#### 1. Main Layout (`layouts/Presentation.astro`)

```astro
---
import "../styles/global.css";
---

<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>useEffect - Когда нужен, а когда нет</title>
  </head>
  <body class="bg-gradient-to-br from-gray-900 to-gray-950 text-white" 
        x-data="{ currentSlide: 0, totalSlides: 0 }"
        x-init="totalSlides = document.querySelectorAll('.slide').length">
    
    <slot />
    
    <!-- Alpine.js for interactivity -->
    <script src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js" defer></script>
    
    <!-- Scroll animations -->
    <script>
      document.addEventListener('DOMContentLoaded', () => {
        const slides = document.querySelectorAll('.slide');
        const progress = document.getElementById('scroll-progress');
        
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('active');
              const slideIndex = Array.from(slides).indexOf(entry.target);
              Alpine.store('currentSlide', slideIndex);
            }
          });
        }, { threshold: 0.7 });
        
        slides.forEach(slide => observer.observe(slide));
        
        // Update progress bar
        window.addEventListener('scroll', () => {
          const winHeight = window.innerHeight;
          const docHeight = document.documentElement.scrollHeight;
          const scrollTop = window.pageYOffset;
          const scrollPercent = scrollTop / (docHeight - winHeight);
          
          if (progress) {
            progress.style.width = `${scrollPercent * 100}%`;
          }
        });
      });
    </script>
  </body>
</html>
```

#### 2. Base Slide Component (`components/slides/BaseSlide.astro`)

```astro
---
export interface Props {
  id: string;
  title?: string;
  variant?: 'default' | 'centered' | 'code' | 'full';
  className?: string;
}

const { id, title, variant = 'default', className = '' } = Astro.props;
---

<section 
  id={id}
  class={`slide h-screen w-full snap-start flex flex-col justify-center px-6 lg:px-32 transition-all duration-700 opacity-40 transform-gpu ${className}`}
  data-slide={id}
>
  {title && (
    <h2 class="text-3xl lg:text-5xl font-bold mb-8 text-blue-400 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
      {title}
    </h2>
  )}
  <div class={`
    ${variant === 'centered' ? 'text-center mx-auto max-w-4xl' : ''}
    ${variant === 'full' ? 'w-full' : ''}
    content-animation
  `}>
    <slot />
  </div>
</section>

<style>
.slide {
  transform: translateY(20px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide.active {
  opacity: 1;
  transform: translateY(0);
}

.content-animation {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease-out 0.3s;
}

.slide.active .content-animation {
  opacity: 1;
  transform: translateY(0);
}
</style>
```

#### 3. Code Comparison Component (`components/CodeComparison.astro`)

```astro
---
import { Card, CardContent } from '@/components/ui/card';
import { Code } from 'astro:components';

export interface Props {
  badCode: string;
  goodCode: string;
  language?: string;
  badTitle?: string;
  goodTitle?: string;
}

const { 
  badCode, 
  goodCode, 
  language = "javascript",
  badTitle = "❌ Плохой пример",
  goodTitle = "✅ Правильное решение"
} = Astro.props;
---

<div class="code-comparison grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 my-6">
  <!-- Bad Example -->
  <Card class="border-red-500/50 bg-red-950/10 hover:bg-red-950/20 transition-colors">
    <CardContent class="p-4 lg:p-6">
      <div class="flex items-center mb-4">
        <div class="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
        <h3 class="text-lg font-semibold text-red-400">{badTitle}</h3>
      </div>
      <div class="text-sm lg:text-base overflow-x-auto bg-gray-900 rounded-lg p-4">
        <Code code={badCode} lang={language} />
      </div>
    </CardContent>
  </Card>
  
  <!-- Good Example -->
  <Card class="border-green-500/50 bg-green-950/10 hover:bg-green-950/20 transition-colors">
    <CardContent class="p-4 lg:p-6">
      <div class="flex items-center mb-4">
        <div class="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
        <h3 class="text-lg font-semibold text-green-400">{goodTitle}</h3>
      </div>
      <div class="text-sm lg:text-base overflow-x-auto bg-gray-900 rounded-lg p-4">
        <Code code={goodCode} lang={language} />
      </div>
    </CardContent>
  </Card>
</div>
```

#### 4. Navigation Component (`components/Navigation.astro`)

```astro
---
export interface Props {
  slides: Array<{ id: string; title: string }>;
}

const { slides } = Astro.props;
---

<div class="fixed right-8 top-1/2 transform -translate-y-1/2 space-y-3 z-50">
  {slides.map((slide, index) => (
    <a 
      href={`#${slide.id}`}
      class="block w-3 h-3 bg-gray-600 rounded-full hover:bg-gray-400 transition-all duration-300 hover:scale-125 focus:outline-none focus:ring-2 focus:ring-blue-400"
      title={slide.title}
      @click="currentSlide = index"
    ></a>
  ))}
</div>

<!-- Progress Bar -->
<div class="fixed top-0 left-0 w-full h-1 bg-gray-800 z-40">
  <div 
    id="scroll-progress"
    class="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300"
    style="width: 0%"
  ></div>
</div>
```

### Phase 5: Individual Slide Components

#### Example: Introduction Slide (`components/slides/Introduction.astro`)

```astro
---
import BaseSlide from './BaseSlide.astro';
---

<BaseSlide id="intro" variant="centered" className="text-center">
  <div class="space-y-6">
    <h1 class="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
      useEffect
    </h1>
    <p class="text-2xl lg:text-4xl text-gray-300 mb-8">
      Когда он нужен, а когда нет
    </p>
    <div class="text-xl lg:text-2xl text-gray-400 space-y-2">
      <p>🎯 Глубокое погружение в хук useEffect</p>
      <p>⚡ Практические примеры и антипаттерны</p>
      <p>🚀 Современные подходы React 18</p>
    </div>
  </div>
</BaseSlide>
```

#### Example: Code Example Slide (`components/slides/CodeExample.astro`)

```astro
---
import BaseSlide from './BaseSlide.astro';
import CodeComparison from '../CodeComparison.astro';
---

<BaseSlide id="derived-state" title="1. Производное состояние">
  <div class="space-y-6">
    <p class="text-xl text-gray-300">
      Избегайте useEffect для вычисления производных значений
    </p>
    
    <CodeComparison
      badCode={`function Form({ firstName, lastName }) {
  const [fullName, setFullName] = useState('');
  
  useEffect(() => {
    setFullName(firstName + ' ' + lastName);
  }, [firstName, lastName]);
  
  return <div>{fullName}</div>;
}`}
      goodCode={`function Form({ firstName, lastName }) {
  const fullName = firstName + ' ' + lastName;
  
  return <div>{fullName}</div>;
}`}
    />
    
    <div class="p-4 bg-yellow-900/20 border border-yellow-700 rounded-lg">
      <p class="text-yellow-200 flex items-center">
        <span class="text-2xl mr-2">💡</span>
        Вычисляйте значения напрямую во время рендера!
      </p>
    </div>
  </div>
</BaseSlide>
```

### Phase 6: Main Page Assembly (`pages/index.astro`)

```astro
---
import Presentation from '../layouts/Presentation.astro';
import Navigation from '../components/Navigation.astro';

// Import individual slides
import Introduction from '../components/slides/Introduction.astro';
import Inspiration from '../components/slides/Inspiration.astro';
import DerivedState from '../components/slides/DerivedState.astro';
// Import other slides...

const slides = [
  { id: 'intro', title: 'Введение' },
  { id: 'inspiration', title: 'Вдохновение' },
  { id: 'derived-state', title: 'Производное состояние' },
  // ... other slides
];
---

<Presentation>
  <main class="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
    <Introduction />
    <Inspiration />
    <DerivedState />
    <!-- Add other slides -->
  </main>
  
  <Navigation {slides} />
</Presentation>
```

### Phase 7: Global Styles & Configuration

#### `src/styles/global.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Hide scrollbar but keep functionality */
.scroll-container {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scroll-container::-webkit-scrollbar {
  display: none;
}

/* Custom scroll animations */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-in-up {
  animation: slideInUp 0.6s ease-out;
}

/* Shiki code block customization */
pre {
  background: transparent !important;
  padding: 0 !important;
  margin: 0 !important;
}

code {
  font-family: 'JetBrains Mono', monospace !important;
}
```

#### `tailwind.config.mjs`

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      animation: {
        'fade-in-up': 'slideInUp 0.6s ease-out',
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
```

### Phase 8: Deployment

```bash
# Build and preview
npm run build
npm run preview

# Deploy to your preferred platform (Netlify, Vercel, etc.)
```

## 🚀 Key Benefits of This Approach

1. **Component-Based Architecture**: Each slide is a separate, reusable component
2. **Lightweight**: No heavy animation libraries unless needed
3. **Professional UI**: shadcn/ui provides beautiful, accessible components
4. **Great DX**: Easy to modify individual slides
5. **Performance**: Astro's static generation + minimal JavaScript
6. **Accessibility**: Proper focus management and keyboard navigation

## 🎨 Optional Enhancements (Add as Needed)

- Keyboard navigation (arrow keys)
- Touch/swipe support for mobile
- Presentation mode (fullscreen with timer)
- Code copy functionality
- Print styles for handouts
- Analytics integration

This plan gives you a solid foundation that you can build upon incrementally. Start with the core implementation and add features as needed!
