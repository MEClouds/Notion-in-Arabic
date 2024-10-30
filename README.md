
![Logo](https://raw.githubusercontent.com/MEClouds/Notion-in-Arabic/a5a48dbf4f7ea56c69a694921f50cf23e24d22be/public/logo.svg)
# Notions 

**Notions** is a simple, intuitive note-taking app inspired by Notion, offering real-time collaboration and seamless authentication. With support for both Arabic (RTL) and English, **Notions** adapts to diverse linguistic needs and includes both light and dark themes to enhance user experience in any environment.

![App Screenshot](link-to-your-screenshot) 

## ✨ Features

- **Multi-language Support**: English and Arabic (RTL).
- **Real-time Collaboration**: Powered by Convex for live updates across devices.
- **Authentication**: Secured by Clerk, allowing easy sign-in/sign-up.
- **Dark/Light Mode**: Adaptable themes for comfortable viewing.
- **Notion-like Interface**: Intuitive and familiar design for streamlined productivity.

## 🛠 Tech Stack

- **Next.js 14**
- **Tailwind CSS**
- **Convex (Database)**
- **Blocknote (Editor)**
- **Clerk (Authentication)**
- **next-intl (Internationalization)**
- **EdgeStore (Storage)**

## 🚀 Getting Started

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/MEClouds/Notion-in-Arabic.git
   cd notions
   ```

2. **Configure Environment Variables**:

   Copy `.env.example` to `.env.local` and update the following variables:

   - **Convex Deployment**: Set up Convex by creating a Convex app to get `CONVEX_DEPLOYMENT` and `NEXT_PUBLIC_CONVEX_URL`.
     - Visit [Convex Documentation](https://docs.convex.dev/auth/clerk) for more details.

   - **Clerk Keys**: Follow the [Convex and Clerk Integration Guide](https://docs.convex.dev/auth/clerk) to obtain your `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`.

   - **EdgeStore Keys**: Sign up on [EdgeStore](https://edgestore.dev) to retrieve `EDGE_STORE_ACCESS_KEY` and `EDGE_STORE_SECRET_KEY`.

   ```
   # Convex Deployment Configuration
   CONVEX_DEPLOYMENT=
   NEXT_PUBLIC_CONVEX_URL=

   # Clerk Authentication Keys
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=

   # EdgeStore Access Keys
   EDGE_STORE_ACCESS_KEY=
   EDGE_STORE_SECRET_KEY=
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Run the Application**:
   Start your development server with Convex in one terminal and Next.js in another:
   ```bash
   npx convex dev
   npm run dev
   ```

## 🌐 Deployment

Deploy the app using your preferred platform, ensuring environment variables are properly set up for production.

## 📚 Documentation

For additional documentation on each integration, please refer to:

- [Convex Docs](https://docs.convex.dev)
- [Clerk Docs](https://docs.clerk.dev)
- [EdgeStore Docs](https://edgestore.dev)

---

Enjoy using **Notions** for all your note-taking needs!
