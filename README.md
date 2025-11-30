# ModernShop 🛍️

A modern, responsive e-commerce web application built with React, TypeScript, and Tailwind CSS. This project demonstrates a full-featured shopping experience with product browsing, filtering, cart management, and a clean, intuitive user interface.

**Live Demo:** [https://modern-shop-sembark.netlify.app/](https://modern-shop-sembark.netlify.app/)

![React](https://img.shields.io/badge/React-18.x-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38bdf8)

## ✨ Features

- **Product Browsing**: View a comprehensive catalog of products with images, ratings, and prices
- **Advanced Filtering**: Filter products by multiple categories simultaneously
- **Sorting Options**: Sort products by price (ascending/descending) or recommended order
- **Product Details**: Detailed product pages with full descriptions and specifications
- **Shopping Cart**: Full-featured cart with quantity management and price calculations
- **Persistent Cart**: Cart data persists across sessions using localStorage
- **Responsive Design**: Fully responsive UI that works seamlessly on desktop, tablet, and mobile
- **Loading States**: Elegant skeleton loaders and spinners for better UX

## 🛠️ Technologies Used

### Core

- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing

### Styling

- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library

### API

- **Fake Store API** - Product data source

## 📦 Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Steps

1. Clone the repository

```bash
git clone https://github.com/nksharmaexe/modernshop.git
cd modernshop
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Start the development server

```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
modernshop/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Loading.tsx      # Loading skeletons and spinners
│   │   ├── Navbar.tsx       # Navigation bar with cart badge
│   │   └── ProductCard.tsx  # Product card component
│   ├── context/             # React context providers
│   │   └── CartContext.tsx  # Global cart state management
│   ├── pages/               # Page components
│   │   ├── Cart.tsx         # Shopping cart page
│   │   ├── Home.tsx         # Homepage with product grid
│   │   └── ProductDetails.tsx # Individual product page
│   ├── services/            # API services
│   │   └── api.ts           # API calls to Fake Store API
│   ├── types.ts             # TypeScript type definitions
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # App entry point
│   └── index.css            # Global styles
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

---
