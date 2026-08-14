import { RouterProvider } from "react-router-dom"
import { router } from "./app/router"
import { useInitializeAuth } from "@/features/auth/hooks/useInitializeAuth"

function App() {
  const { isInitialized } = useInitializeAuth();

  if (!isInitialized) {
    return <div className="flex items-center justify-center h-screen">Loading application...</div>;
  }
  return (
   <RouterProvider router={router}/>
  )
}

export default App