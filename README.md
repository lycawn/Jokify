# Install dependencies

npm install

# Start development server

npm run dev

# Project Architecture

/services – Contains API call logic, separated for reusability and cleaner components.

/store – Pinia-based state management for handling app state across components.

/types – TypeScript interfaces and types used throughout the application for type safety.

/pages – Nuxt file-based routing system. Example: index.vue maps to /.

/components – UI components, broken down into smaller reusable parts for maintainability.

/composables – Reusable logic and axios instance. While .env could be used, API calls are client-side and kept simple here.

# How It Works

The user is greeted with a login interface, where they are prompted to enter a name.

This name is stored in localStorage under a userInfo key.

After storing it locally, the user ID is synced to the Pinia store to manage it globally across the app.

Once logged in, users can interact with the app. for example, joining Jokify, browsing random jokes , storing favourite jokes & more statistics.
