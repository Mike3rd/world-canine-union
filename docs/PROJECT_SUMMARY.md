# World Canine Union - Platform Summary

## 🎯 Mission Statement

**World Canine Union (WCU)** is a global digital registry that celebrates and memorializes all dogs—especially mixed breeds and rescues. Unlike traditional pedigree clubs, WCU provides inclusive recognition, official registration certificates, and a permanent digital legacy from registration through memorialization.

## 🌐 Platform Overview

A comprehensive Next.js platform featuring:

- **Public Website**: Homepage, About, FAQ, Breed Search, Shelter Directory, Partner Discounts
- **Registration System**: Sequential WCU numbers (WCU-00001, etc.)
- **Profile System**: Living profiles + Memorial tribute pages
- **Admin Dashboard**: Full management interface with email system
- **User Dashboard**: Personal dog management

## 🎨 Brand & Design System

### Typography Palette

- **Logo Font**: `Merriweather` (serif elegance)
- **Headings**: `Oxanium` (modern, geometric)
- **Body Text**: `IBM Plex Sans`/`Inter` (clean readability)

### Color System (Tailwind Inline Classes)

**Light Theme (Default)**

- Primary: `text-[#36454F] bg-[#36454F]` (Charcoal)
- Accent: `text-[#992400] bg-[#992400]` (Burnt orange)
- Background: `bg-[#F0F4F8]` (Light blue-gray)

**Dark Theme (`data-theme="night"`)**

- Primary: `text-[#5F9EA0] bg-[#5F9EA0]` (Cadet blue)
- Accent: `text-[#FFD93D] bg-[#FFD93D]` (Vibrant yellow)
- Background: `bg-[#1A2E3F]` (Deep navy)

_Note: All colors are applied directly via Tailwind classes using hex values—no CSS variables in components._

## 🏗️ Technical Architecture

### Core Stack

- **Framework**: Next.js 14 (App Router) with TypeScript
- **Styling**: Tailwind CSS with custom theme configuration
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Email**: Resend API with webhook integration
- **Hosting**: Vercel with CI/CD pipeline
- **Payments**: Stripe (integration ready)

## 🚀 Current Production Status

**✅ All Core Pages Deployed & Functional:**

- `/` - Homepage with mission and CTA
- `/about` - Organization details
- `/faq` - Frequently asked questions
- `/breed-search` - Breed exploration tool
- `/shelters` - Interactive directory
- `/register` - Dog registration flow
- `/dog/[id]` - Dynamic dog profiles
- `/user/dashboard` - Personal management
- `/admin/*` - Full administrative suite

## 🎖️ Unique Value Propositions

1. **Inclusive Registry**: Celebrates all dogs, especially mixed breeds
2. **Digital Legacy**: Permanent profiles from registration through memorial
3. **Professional Certificates**: Official WCU registration documents
4. **Modern Admin Tools**: Email management, chat interface, approval workflows

**Status**: ✅ Production Ready  
**Live Site**: https://world-canine-union.vercel.app
