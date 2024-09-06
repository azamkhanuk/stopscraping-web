import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import App from './App'
import './index.css'
import { dark } from '@clerk/themes'
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ClerkProvider publishableKey={clerkPubKey} appearance={{
        baseTheme: dark,
      }}>
        <App />
      </ClerkProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
