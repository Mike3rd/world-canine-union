# World Canine Union - Brand & Design System

## 🎨 Color Palette

### Light Theme (Default)

| Color      | Hex       | Usage                        | Tailwind Class                  |
| ---------- | --------- | ---------------------------- | ------------------------------- |
| Primary    | `#36454F` | Headers, navigation, buttons | `bg-[#36454F]` `text-[#36454F]` |
| Accent     | `#992400` | Buttons, CTAs                | `bg-[#992400]`                  |
| Background | `#F0F4F8` | Page background              | `bg-[#F0F4F8]`                  |
| Surface    | `#FFFFFF` | Cards, forms                 | `bg-white`                      |
| Text       | `#263238` | Body text                    | `text-[#263238]`                |
| Border     | `#CFD8DC` | Borders, dividers            | `border-[#CFD8DC]`              |

### Dark Theme (`data-theme="night"`)

| Color      | Hex       | Usage                     | Tailwind Class |
| ---------- | --------- | ------------------------- | -------------- |
| Primary    | `#5F9EA0` | Headers, primary elements | `bg-[#5F9EA0]` |
| Accent     | `#FFD93D` | Buttons, highlights       | `bg-[#FFD93D]` |
| Background | `#1A2E3F` | Page background           | `bg-[#1A2E3F]` |
| Surface    | `#243B53` | Cards, containers         | `bg-[#243B53]` |

## 🔤 Typography System

### Font Families

- `.font-logo` - Merriweather (Logo & premium elements)
- `.font-heading` - Oxanium (All headings h1-h6)
- `.font-body` - IBM Plex Sans (Primary body text)
- `.font-body2` - Inter (Alternative body text)

### Usage Guidelines

1. **Logo**: Always use `.font-logo` for WCU logo text
2. **Headings**: Always use `.font-heading` with `font-weight: 600`
3. **Body Text**: Use `.font-body` for paragraphs
4. **Buttons**: Use `.font-heading` with `font-weight: 500`

## 🎯 Component Examples

### Button

```jsx
<button className="font-heading font-medium bg-[#992400] text-white px-6 py-3 rounded-lg hover:bg-[#7A1D00]">
  Register Your Dog
</button>

Card
<div className="bg-white rounded-xl shadow-lg p-6 border border-[#CFD8DC]">
  <h3 className="font-heading font-semibold text-[#36454F] text-xl">
    Dog Profile
  </h3>
  <p className="font-body text-[#263238]">
    Content here
  </p>
</div>

Header
jsx
<header className="bg-[#36454F] text-white">
  <nav className="font-heading font-medium">
    <!-- Navigation -->
  </nav>
</header>

🌙 Dark Theme Implementation
Add data-theme="night" to any container:

jsx
<section data-theme="night" className="bg-[#1A2E3F] text-white">
  <!-- Dark theme content -->
</section>


🚫 Prohibited Practices
Never use CSS variables in components
Never hardcode colors without Tailwind classes
Never use fonts without the designated font-family classes

✅ Best Practices
Use semantic color names in comments
Test both light and dark themes
Use consistent spacing (Tailwind spacing scale)

Quick Reference
Common Patterns
jsx
// Primary section
<section className="bg-[#F0F4F8]">
  <h1 className="font-heading font-semibold text-[#36454F]">Title</h1>
</section>

// Accent button
<button className="bg-[#992400] text-white font-heading font-medium">Action</button>

// Card
<div className="bg-white border border-[#CFD8DC] rounded-lg">Content</div>

Theme Switching
jsx
// Light theme (default)
<div className="bg-[#F0F4F8] text-[#263238]">

// Dark theme section
<div data-theme="night" className="bg-[#1A2E3F] text-white">
Last Updated: [Jan 2, 2026]
```
