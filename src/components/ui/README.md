# UI Components

Reusable UI components for the presentation slides. These components help reduce code duplication and make it easier to maintain consistent styling across all slides.

## Components

### PageTitle
The main title component used in BaseSlide for slide titles.

```astro
<!-- Used automatically by BaseSlide when title prop is provided -->
<BaseSlide id="my-slide" title="My Slide Title">
  <!-- content -->
</BaseSlide>
```

**Props:**
- `class`: string - additional CSS classes

---

### SlideTitle
A title component with various sizes and colors.

```astro
<SlideTitle size="lg" color="blue">My Title</SlideTitle>
<SlideTitle size="xl" gradient>Gradient Title</SlideTitle>
```

**Props:**
- `size`: 'sm' | 'md' | 'lg' | 'xl' (default: 'md')
- `gradient`: boolean - applies gradient styling (default: false)
- `color`: 'gray' | 'blue' | 'green' | 'red' | 'cyan' | 'purple' | 'pink' | 'yellow' (default: 'gray')
- `class`: string - additional CSS classes

---

### Text
A paragraph component with consistent styling.

```astro
<Text size="lg">Your content here</Text>
<Text size="base" color="gray-400">Secondary text</Text>
```

**Props:**
- `size`: 'sm' | 'base' | 'lg' | 'xl' (default: 'lg')
- `color`: 'gray-300' | 'gray-400' | 'white' (default: 'gray-300')
- `class`: string - additional CSS classes

---

### Callout
A highlighted box for important information with different variants.

```astro
<Callout variant="info">Information message</Callout>
<Callout variant="warning">Warning message</Callout>
<Callout variant="error">Error message</Callout>
<Callout variant="tip" icon="🎯">Custom icon tip</Callout>
```

**Props:**
- `variant`: 'info' | 'warning' | 'error' | 'success' | 'tip' | 'primary' (default: 'info')
- `icon`: string - custom icon emoji (optional)
- `class`: string - additional CSS classes

**Variants:**
- `info`: Blue box with 💡 icon
- `warning`: Yellow box with ⚠️ icon
- `error`: Red box with ❌ icon
- `success`: Green box with ✓ icon
- `tip`: Yellow box with 💡 icon
- `primary`: Purple box with 🔑 icon

---

### Card
A bordered card container with different color schemes.

```astro
<Card color="blue">
  <CardTitle color="blue">Card Title</CardTitle>
  <CardText>Card content</CardText>
</Card>
```

**Props:**
- `variant`: 'default' | 'hover' | 'gradient-border' (default: 'default')
- `color`: 'gray' | 'blue' | 'green' | 'red' | 'cyan' | 'purple' | 'pink' | 'yellow' (default: 'gray')
- `class`: string - additional CSS classes

---

### CardTitle
A title component specifically for cards.

```astro
<CardTitle color="blue" size="lg">Title</CardTitle>
```

**Props:**
- `color`: 'gray' | 'blue' | 'green' | 'red' | 'cyan' | 'purple' | 'pink' | 'yellow' (default: 'gray')
- `size`: 'base' | 'lg' | 'xl' (default: 'lg')
- `class`: string - additional CSS classes

---

### CardText
Paragraph text for cards with consistent styling.

```astro
<CardText>Your card content</CardText>
```

**Props:**
- `size`: 'sm' | 'base' | 'lg' (default: 'base')
- `class`: string - additional CSS classes

---

### Grid
A responsive grid container.

```astro
<Grid cols="2" gap="4">
  <Card>...</Card>
  <Card>...</Card>
</Grid>
```

**Props:**
- `cols`: '1' | '2' | '3' | '4' (default: '1')
- `gap`: '2' | '4' | '6' | '8' (default: '4')
- `class`: string - additional CSS classes

---

### Section
A spacing container for slide content.

```astro
<Section spacing="normal">
  <!-- Your slide content -->
</Section>
```

**Props:**
- `spacing`: 'tight' | 'normal' | 'relaxed' (default: 'normal')
  - tight: space-y-4
  - normal: space-y-6
  - relaxed: space-y-8
- `class`: string - additional CSS classes

---

### List
A styled unordered list container.

```astro
<List spacing="normal">
  <ListItem>First item</ListItem>
  <ListItem>Second item</ListItem>
</List>
```

**Props:**
- `spacing`: 'tight' | 'normal' | 'relaxed' (default: 'normal')
  - tight: space-y-2
  - normal: space-y-3
  - relaxed: space-y-4
- `class`: string - additional CSS classes

---

### Link
A styled link component with different variants.

```astro
<Link href="https://example.com" variant="primary">Link text</Link>
<Link href="/internal" variant="secondary" external={false}>Internal Link</Link>
```

**Props:**
- `href`: string - link URL (required)
- `variant`: 'primary' | 'secondary' | 'external' (default: 'primary')
- `size`: 'sm' | 'base' | 'lg' (default: 'base')
- `external`: boolean - whether to open in new tab (default: true)
- `class`: string - additional CSS classes

---

### LinkCard
A card component specifically for prominent external links.

```astro
<LinkCard href="https://example.com">
  Link Title Text
</LinkCard>
```

**Props:**
- `href`: string - link URL (required)
- `showIcon`: boolean - show external link icon (default: true)
- `class`: string - additional CSS classes

---

### InfoCard
A styled card for displaying categorized information with icons and titles.

```astro
<InfoCard variant="success" icon="✅" title="Success Message">
  Card content here
</InfoCard>
```

**Props:**
- `variant`: 'success' | 'error' | 'info' | 'warning' (default: 'info')
- `icon`: string - emoji icon (optional)
- `title`: string - card title (optional)
- `titleSize`: 'sm' | 'base' | 'lg' (default: 'lg')
- `class`: string - additional CSS classes

---

### Highlight
Inline text highlighting with color variants.

```astro
<Text>
  This is <Highlight color="blue">highlighted text</Highlight> in a sentence.
</Text>
```

**Props:**
- `color`: 'blue' | 'cyan' | 'purple' | 'green' | 'red' | 'yellow' (default: 'blue')
- `class`: string - additional CSS classes

---

### ChecklistItem
A numbered list item with consistent styling.

```astro
<ChecklistItem number="1">First step in the process</ChecklistItem>
<ChecklistItem number="2">Second step in the process</ChecklistItem>
```

**Props:**
- `number`: string | number - the item number (required)
- `class`: string - additional CSS classes

---

### GradientBox
A box with gradient background for special content sections.

```astro
<GradientBox from="blue-600/20" to="purple-600/20" border="blue-500/30">
  Special content with gradient background
</GradientBox>
```

**Props:**
- `from`: string - starting gradient color (default: 'blue-600/20')
- `to`: string - ending gradient color (default: 'purple-600/20')
- `border`: string - border color (default: 'blue-500/30')
- `class`: string - additional CSS classes

---

### ListItem
A list item with an icon.

```astro
<ListItem icon="✓" iconColor="text-green-400">
  List item content
</ListItem>
```

**Props:**
- `icon`: string - icon character (default: '✓')
- `iconColor`: string - Tailwind color class (default: 'text-green-400')
- `class`: string - additional CSS classes

---

## Usage Examples

### Basic Slide Structure

```astro
---
import BaseSlide from './BaseSlide.astro';
import Text from '../ui/Text.astro';
import Callout from '../ui/Callout.astro';
import Section from '../ui/Section.astro';
---

<BaseSlide id="my-slide" title="My Slide Title">
  <Section>
    <Text>Introduction paragraph</Text>
    
    <Callout variant="tip">
      Important tip for the audience
    </Callout>
  </Section>
</BaseSlide>
```

### Card Grid Layout

```astro
<Section>
  <Text>Introduction</Text>
  
  <Grid cols="2" gap="4">
    <Card color="blue">
      <CardTitle color="blue">Feature 1</CardTitle>
      <CardText>Description of feature 1</CardText>
    </Card>
    
    <Card color="green">
      <CardTitle color="green">Feature 2</CardTitle>
      <CardText>Description of feature 2</CardText>
    </Card>
  </Grid>
</Section>
```

### List with Custom Icons

```astro
<List spacing="tight">
  <ListItem icon="🎯" iconColor="text-blue-400">
    First benefit
  </ListItem>
  <ListItem icon="⚡" iconColor="text-yellow-400">
    Second benefit
  </ListItem>
  <ListItem icon="🚀" iconColor="text-purple-400">
    Third benefit
  </ListItem>
</List>
```

## Benefits

1. **Consistency**: All slides use the same styling patterns
2. **Maintainability**: Update styles in one place
3. **Readability**: More semantic component names
4. **Productivity**: Faster slide creation with reusable components
5. **Type Safety**: Props are typed for better development experience
