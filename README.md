# 🛍️ E-Shop: Full Stack E-Commerce Platform

A simple full-stack e-commerce web app with buyer and seller roles, image upload via Cloudinary, shopping cart, and order processing.

## 🌐 Live Demo

**Frontend**: [https://eshop-frontend.vercel.app](https://eshop-frontend.vercel.app)  
**Backend API**: [https://eshop-mooi.onrender.com/api/products](https://eshop-mooi.onrender.com/api/products)

## ✨ Features

### 👤 Buyer
- View product listings
- View product detail pages
- Add items to shopping cart
- View and remove cart items
- Checkout (order creation)

### 🛒 Seller
- Log in to seller dashboard
- Add new products (with image upload via Cloudinary)
- View all listed products

### 🔐 Authentication
- Login/Register for buyer or seller roles
- Role stored in `localStorage` for client-side view switching

### 🖼️ Image Upload
- Cloudinary integration for image hosting during product creation

### 🛠️ Technologies
- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Express.js, MongoDB, Mongoose
- **Auth**: JWT, Middleware (role-based)
- **Deployment**: Vercel (frontend), Render (backend)

## 📦 Folder Structure

