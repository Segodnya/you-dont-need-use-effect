# useEffect Presentation

> 🎯 **"You Might Not Need an Effect"** - An interactive presentation about when useEffect is needed and when it's not.

A lightweight, scroll-based presentation built with Astro, Alpine.js, and Tailwind CSS. Features smooth animations, keyboard navigation, and a clean component architecture.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Visit [http://localhost:4321](http://localhost:4321)

## 📁 Project Structure

```text
src/
├── components/
│   ├── slides/
│   │   ├── BaseSlide.astro          # Base slide component with animations
│   │   ├── 01-IntroSlide.astro      # Individual slide components
│   │   ├── 02-InspirationSlide.astro
│   │   ├── 03-WhatIsUseEffectSlide.astro
│   │   ├── 04-ProblemsSlide.astro
│   │   ├── 05-KeyMessagesSlide.astro
│   │   ├── 06-DerivedStateSlide.astro
│   │   └── 07-ConclusionSlide.astro
│   ├── CodeComparison.astro         # Side-by-side code comparison
│   ├── CodeBlock.astro              # Single code block
│   ├── InfoBox.astro                # Colored info boxes
│   └── Navigation.astro             # Progress bar + navigation dots
├── layouts/
│   └── Presentation.astro           # Main presentation layout
├── scripts/
│   ├── main.js                      # Entry point for all JS
│   ├── presentation.js              # Slide animations and tracking
│   └── navigation.js                # Keyboard navigation
├── styles/
│   ├── global.css                   # Global styles
│   └── components/                  # Component-specific CSS
│       ├── slides.css
│       ├── code-comparison.css
│       ├── code-block.css
│       └── navigation.css
└── pages/
    └── index.astro                  # Main presentation page
```

## 🎨 Tech Stack

- **[Astro](https://astro.build)** - Static site generator
- **[Alpine.js](https://alpinejs.dev)** - Lightweight reactive framework (3.15.0)
- **[Tailwind CSS 4](https://tailwindcss.com)** - Utility-first CSS framework
- **[@astrojs/mdx](https://docs.astro.build/en/guides/integrations-guide/mdx/)** - MDX integration for potential future use

## ✨ Features

### Presentation Features

- ✅ Smooth scroll-based navigation
- ✅ Fade-in and slide-up animations
- ✅ Keyboard navigation (Arrow keys, PageUp/Down)
- ✅ Progress bar tracking
- ✅ Side navigation dots (desktop)
- ✅ Slide counter (mobile)
- ✅ Responsive design
- ✅ Dark theme with gradient backgrounds
- ✅ Syntax highlighting (via Astro's built-in Shiki)

### Code Quality

- ✅ Clean separation of concerns (JS, CSS, markup)
- ✅ No React dependencies - pure Astro + Alpine.js
- ✅ Numeric slide prefixes for easy file navigation
- ✅ Component-based architecture
- ✅ Type-safe with TypeScript

## 📝 Adding New Slides

### 1. Create a new slide file

Create a new file in `src/components/slides/` with numeric prefix:

```astro
---
// src/components/slides/08-MyNewSlide.astro
import BaseSlide from './BaseSlide.astro';
---

<BaseSlide id="my-new-slide" title="My Title">
  <p>Your content here</p>
</BaseSlide>
```

### 2. Import in index.astro

```astro
---
import MyNewSlide from '../components/slides/08-MyNewSlide.astro';

const slides = [
  // ... existing slides
  { id: 'my-new-slide', title: 'My Title' },
];
---

<Presentation>
  <main>
    <!-- ... existing slides -->
    <MyNewSlide />
  </main>
</Presentation>
```

## 🧩 Component Reference

### BaseSlide

Base component for all slides with built-in animations.

**Props:**

- `id` (required): Unique slide identifier
- `title` (optional): Slide title
- `variant` (optional): 'default' | 'centered' | 'full'
- `className` (optional): Additional CSS classes

**Example:**

```astro
<BaseSlide id="example" title="Example Slide" variant="centered">
  <p>Content goes here</p>
</BaseSlide>
```

### CodeComparison

Side-by-side comparison of bad/good code examples.

**Props:**

- `badCode` (required): Code for bad example
- `goodCode` (required): Code for good example
- `language` (optional): Programming language, default 'tsx'
- `badTitle` (optional): Custom title for bad example
- `goodTitle` (optional): Custom title for good example

**Example:**

```astro
<CodeComparison
  badCode={`const bad = "example";`}
  goodCode={`const good = "example";`}
  language="tsx"
/>
```

### CodeBlock

Single code block with optional title.

**Props:**

- `code` (required): Code to display
- `language` (optional): Programming language, default 'tsx'
- `title` (optional): Code block title

**Example:**

```astro
<CodeBlock
  code={`const example = "code";`}
  language="tsx"
  title="Example.tsx"
/>
```

### InfoBox

Colored callout boxes for highlighting information.

**Props:**

- `type` (optional): 'info' | 'warning' | 'success' | 'error' | 'tip'
- `title` (optional): Box title
- `className` (optional): Additional CSS classes

**Example:**

```astro
<InfoBox type="warning" title="Important">
  Be careful with this approach!
</InfoBox>
```

## ⌨️ Keyboard Shortcuts

- `↓` or `Page Down` - Next slide
- `↑` or `Page Up` - Previous slide
- Click navigation dots - Jump to specific slide
- Scroll - Natural slide navigation

## 🎯 Design Decisions

### Why we removed React/shadcn?

Initially, the project included React and shadcn/ui components, but we found:

1. **Minimal Usage** - Only using Card component in one place
2. **Bundle Size** - React added ~56 unnecessary packages
3. **Simplicity** - Pure Astro components are simpler and faster
4. **Maintenance** - Fewer dependencies to manage

The Card component was easily replaced with plain divs and Tailwind classes.

### Why Alpine.js instead of React?

1. **Lightweight** - Alpine.js is only 15KB vs React's 40KB+
2. **Perfect Fit** - Ideal for progressive enhancement
3. **No Build Step** - Works directly in HTML
4. **Simple** - Easy to understand and maintain
5. **Fast** - Minimal runtime overhead

### MDX Integration

We keep `@astrojs/mdx` integrated for potential future use. While current slides are in `.astro` format for maximum flexibility with components, MDX could be useful for:

- Quick content-focused slides
- Slides written by non-developers
- Embedding components in markdown

### Numeric Slide Prefixes

Files are prefixed with numbers (01-, 02-, etc.) for:

1. **Easy Navigation** - Files sort in presentation order
2. **Clear Sequence** - Immediately see slide order in file explorer
3. **Quick Reference** - Easy to find specific slides

## 🏗️ Architecture Highlights

### Separation of Concerns

- **JavaScript**: Modular files in `src/scripts/`
- **CSS**: Component-specific files in `src/styles/components/`
- **Markup**: Clean Astro components without inline scripts/styles

### Animation System

- CSS-based animations for performance
- Intersection Observer for scroll detection
- Staggered child element animations
- Smooth transitions with easing functions

### State Management

Alpine.js handles minimal state:

- Current slide index
- Total slides count
- Active slide tracking

## 🔧 Customization

### Change Colors

Edit gradient in `src/layouts/Presentation.astro`:

```astro
<body class="bg-linear-to-br from-gray-900 to-gray-950 text-white">
```

### Adjust Animation Speed

Edit timing in `src/styles/components/slides.css`:

```css
.slide {
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Add Custom Fonts

Update Google Fonts link in `src/layouts/Presentation.astro`.

## 📦 Dependencies

### Production

- `astro` (5.15.1) - Framework
- `alpinejs` (3.15.0) - Interactivity
- `tailwindcss` (4.1.14) - Styling
- `@astrojs/mdx` (4.3.8) - MDX support
- `@tailwindcss/vite` (4.1.14) - Tailwind Vite plugin

### Development

- `tw-animate-css` (1.4.0) - Tailwind animations

## 🚀 Deployment

### Build

```bash
npm run build
```

Output will be in `dist/` directory.

### Deploy to Vercel/Netlify

1. Connect your git repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy!

### Deploy to GitHub Pages

```bash
npm run build
# Push dist folder to gh-pages branch
```

## 📚 Content Source

Presentation content is based on React's official documentation:

- [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
- [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)
- [Separating Events from Effects](https://react.dev/learn/separating-events-from-effects)

## 🤝 Contributing

Feel free to improve the presentation framework or add new slides!

1. Add new slides following the numeric naming convention
2. Keep components focused and reusable
3. Extract CSS to separate files for clarity
4. Test keyboard navigation and mobile responsiveness

## 📄 License

MIT

---

Built with ❤️ using Astro, Alpine.js, and Tailwind CSS
