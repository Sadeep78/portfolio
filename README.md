# Personal Developer Portfolio

A modern, high-performance, dark/light theme personal portfolio web application built with React, Vite, and modern CSS. Ready for 1-click deployment on **Vercel**.

## 🚀 Features

- ⚡ **Lightning Fast**: Powered by Vite + React 18
- 🎨 **Modern Design**: Glassmorphism UI, fluid typography, responsive layout
- 🌓 **Theme Switcher**: Instant Dark and Light mode toggle
- 📁 **Centralized Content**: Easily customize your bio, skills, projects, and contact info in `src/data/portfolioData.js`
- 📱 **Mobile Responsive**: Custom mobile navigation drawer and dynamic breakpoint layouts
- ☁️ **Vercel Optimized**: Pre-configured `vercel.json` for effortless cloud deployment

---

## 🛠️ Local Development Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Dev Server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

3. **Build for Production**:
   ```bash
   npm run build
   ```

---

## ✏️ How to Customize Your Portfolio

All content is managed in a single, clean JavaScript file:
👉 **`src/data/portfolioData.js`**

Simply open `src/data/portfolioData.js` and edit:
- **Personal Details**: Your name, role, bio, social links, location, email.
- **Stats**: Key experience metrics (Years experience, projects completed).
- **Skill Categories**: Frontend, Backend, DevOps tools, and proficiency levels.
- **Projects**: Title, description, tags, GitHub link, live demo URL, and metrics.
- **Experience**: Career history, job titles, dates, and achievements.

---

## ☁️ How to Connect & Deploy to Vercel

### Method 1: Connecting via GitHub & Vercel Dashboard (Recommended)

1. **Initialize Git & Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
   - Click **"Add New..."** -> **"Project"**.
   - Select your newly pushed GitHub repository.
   - Framework Preset: **Vite** (Vercel automatically detects this).
   - Click **"Deploy"**.

Your portfolio site will be live on a custom `.vercel.app` domain in less than a minute!

---

### Method 2: Deploying Directly via Vercel CLI

If you prefer deploying directly from your terminal:

1. **Run Vercel CLI**:
   ```bash
   npx vercel
   ```
2. Follow the interactive prompts (Log in to your Vercel account, select default settings).
3. To deploy to production later:
   ```bash
   npx vercel --prod
   ```

---

## 📄 License

MIT - Feel free to adapt and use this template for your own portfolio!
