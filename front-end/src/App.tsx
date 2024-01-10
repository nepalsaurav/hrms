import { RouterProvider } from 'react-router-dom'
import router from './Router'
import { useEffect } from 'react'
import { pb } from './store/pb'
import { useAuthStore } from './store/auth'

function App() {

  const setCurrentUser = useAuthStore((state: any) => state.setCurrentUser)
  //check for pocketbase authstore change event
  useEffect(() => {
    pb.authStore.onChange(() => {
      setCurrentUser(pb.authStore.model)
    })
  }, [])

  return (
    <RouterProvider router={router} />
  )
}

export default App
