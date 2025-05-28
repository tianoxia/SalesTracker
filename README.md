# Sales Tracker

# A sales tracking application to help track the commission and determine each salesperson’s quarterly bonus

## Get Started

1. Install:  
   bash
   npm install

2. Run:
   npm run dev

3. Open:
   http://localhost:5173 (an example local react test url)

Project Structure

src/
├── assets/            # Static assets (images, fonts)
├── components/        # Reusable components
├── hooks/             # Custom React hooks
├── layouts/           # Layout components
├── pages/             # Page components
├── routes/            # Application routes
├── apis/          # API services
├── stores/            # State management
├── styles/            # Global styles
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
├── App.tsx            # Main application component
├── main.tsx           # Application entry point
└── vite-env.d.ts      # Vite type declarations

Configuration

Vite Config

// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  },
  preview: {
    port: 5173,
    open: true
  }
})

TypeScript Config

// tsconfig.json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "jsx": "preserve",
    "strict": true,
    "moduleResolution": "node",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}

Environment Variables
Create a .env file in the root directory:
VITE_API_BASE_URL=https://api.example.com
VITE_APP_TITLE=My Vite App

Access variables in your code:
const apiUrl = import.meta.env.VITE_API_BASE_URL

Testing
npm run test
# or
yarn test

Linting
npm run lint
# or
yarn lint

License
This project is licensed under the MIT License - see the LICENSE file for details.
