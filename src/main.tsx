import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx'
import { FeedbackProvider } from './components/feedback/FeedbackProvider.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <FeedbackProvider>
            <BrowserRouter>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </BrowserRouter>
        </FeedbackProvider>
    </StrictMode>,
)