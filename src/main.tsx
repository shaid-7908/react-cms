import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { TooltipProvider } from './components/ui/tooltip.tsx'
import {Provider} from 'react-redux'
import { store } from './store/index.ts'
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from './lib/react-query.ts'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <App />
      </TooltipProvider>
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
);
