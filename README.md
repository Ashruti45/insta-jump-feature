# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
# Instagram Reel Context & Scroll Resolver 📍

A client-side navigation component that resolves feed scroll loss when transitioning from Instagram Reels to Creator Profile Grids.

## 🚀 The Problem
When users click a creator's profile from a specific Reel (e.g., Part 1 of a series), they land at the top of the creator's profile grid. They are forced to manually scroll through hundreds of posts to find the original Reel and locate sequential content (Part 2).

## 💡 The Solution
This React prototype introduces an inline UI component that preserves navigation context:
1. **Context Handover:** Transfers `reel_id` during feed-to-profile navigation.
2. **Context Banner:** Prompts the user with a direct "Jump to Last Viewed Reel" action.
3. **Smooth Scroll & Pulse Focus:** Auto-scrolls the profile grid directly to the target post and applies an active visual ripple animation.

---

## 🏗️ Real-World System Architecture (Chrome Extension Model)

To scale this feature onto real `instagram.com` web client without modifying Instagram's codebase:

```text
[ Instagram Reel Feed ]
       │
       ▼ (User Clicks Creator Profile)
[ Extension Content Script ] ──► Extracts reel_id from DOM
       │
       ▼
[ chrome.storage.local ] ──► Persists { targetReelId: "reel-102" }
       │
       ▼
[ Creator Profile Loads ]
       │
       ▼
[ Floating UI Injection ] ──► Renders "Jump to Last Viewed Reel"
       │
       ▼
[ Target DOM Engine ] ──► Executes element.scrollIntoView({ behavior: 'smooth' })