# Mini E-Commerce Platform

A modern, full-stack e-commerce platform built with Next.js 15, TypeScript, Tailwind CSS, and MongoDB. Features a complete product management system with admin panel, shopping cart functionality, and responsive design.

## 🚀 Features

### Customer Features
- **Product Browsing**: Browse products with pagination and filtering
- **Product Details**: Detailed product pages with add-to-cart functionality
- **Shopping Cart**: Add, remove, and manage cart items with quantity controls
- **Checkout Process**: Complete checkout flow with thank you message
- **Responsive Design**: Mobile-first design that works on all devices

### Admin Features
- **Product Management**: Add, edit, and delete products
- **Admin Dashboard**: Manage all products with search and pagination
- **Product Categories**: Organize products by categories
- **Image Management**: Support for product images via URLs

### Technical Features
- **TypeScript**: Full type safety throughout the application
- **MongoDB Integration**: Robust database with Mongoose ODM
- **API Routes**: RESTful API for all CRUD operations
- **State Management**: Zustand for cart state management
- **Modern UI**: Beautiful UI with Tailwind CSS and Lucide icons
- **SEO Optimized**: Meta tags and proper page structure

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, Lucide React Icons
- **State Management**: Zustand
- **Database**: MongoDB with Mongoose
- **Deployment**: Vercel-ready

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mini-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Setup

1. **MongoDB Atlas** (Recommended)
   - Create a free MongoDB Atlas account
   - Create a new cluster
   - Get your connection string
   - Add it to your `.env.local` file

2. **Local MongoDB** (Alternative)
   - Install MongoDB locally
   - Use connection string: `mongodb://localhost:27017/ecommerce`

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Connect your GitHub repository to Vercel
   - Add environment variables in Vercel dashboard:
     - `MONGODB_URI`: Your MongoDB connection string
   - Deploy!

### Environment Variables for Production

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin pages
│   ├── api/               # API routes
│   ├── cart/              # Cart page
│   └── product/           # Product pages
├── components/            # React components
│   ├── admin/            # Admin-specific components
│   ├── forms/            # Form components
│   ├── layout/           # Layout components
│   ├── products/         # Product components
│   └── shared/           # Shared components
├── lib/                  # Utility functions
├── models/               # Database models
├── store/                # State management
└── types/                # TypeScript types
```

## 🎯 Key Features Explained

### Shopping Cart System
- Persistent cart state using Zustand
- Add/remove items with quantity controls
- Checkout process with thank you message
- Cart state resets after checkout

### Admin Panel
- Secure product management
- Search and filter products
- Add new products with validation
- Edit existing products
- Delete products with confirmation

### Product Management
- Auto-incrementing product IDs
- Category-based organization
- Price filtering and search
- Responsive product cards

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Code Quality

- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting (if configured)

## 🌟 Performance Optimizations

- **Image Optimization**: Next.js Image component for better performance
- **Code Splitting**: Automatic code splitting by Next.js
- **Static Generation**: Where possible, pages are statically generated
- **API Caching**: Intelligent caching for API routes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Islam Abdelzaher**
- Website: [https://islamz.me](https://islamz.me)
- GitHub: [@islamz](https://github.com/islamz)

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
