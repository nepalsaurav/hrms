import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../store/auth"
import { pb } from "../store/pb"
export default function RequireAuth() {
    const currentUser = useAuthStore((state) => state.currentUser)
    const checkUserAuthCondition = () => {
        if (currentUser === null || !pb.authStore.isValid) {
            return false
        }
        return true
    }
    return (
        checkUserAuthCondition() ? <Outlet /> : <Navigate to="/login" replace />
    )

}