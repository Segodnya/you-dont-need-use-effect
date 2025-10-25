# You Might Not Need an Effect

Interactive presentation about React's useEffect hook - when to use it and when to avoid it.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Visit [http://localhost:4321](http://localhost:4321)

## 🎯 Features

- Smooth scroll-based navigation with keyboard shortcuts
- Dynamic hue-shifting background based on presentation progress
- URL syncing toggle for sharing specific slides
- Responsive design with mobile and desktop navigation
- Interactive code comparisons and carousels

## ⌨️ Keyboard Shortcuts

- `↓` / `Page Down` - Next slide
- `↑` / `Page Up` - Previous slide
- `→` / `←` - Navigate carousels (when active)

## 🎨 Tech Stack

- **Astro** - Static site generator
- **Alpine.js** - Lightweight reactivity
- **Tailwind CSS 4** - Styling
- **OGL** - WebGL background effects
- **React** - DarkVeil component only

## 📁 Project Structure

```text
src/
├── components/
│   ├── slides/          # Presentation slides (01-20)
│   ├── backgrounds/     # DarkVeil WebGL component
│   └── ui/              # Reusable UI components
├── layouts/
│   └── Presentation.astro
├── scripts/
│   ├── main.js          # Entry point
│   ├── presentation.js  # Slide animations
│   ├── navigation.js    # Keyboard & navigation
│   ├── carousel.js      # Carousel functionality
│   └── utils.js         # Shared utilities
└── styles/
    ├── global.css
    └── components/
```

## 📚 Content Source

Based on React's official documentation: [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)

## 📄 License

MIT
