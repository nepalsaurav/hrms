import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../store/auth"
import { pb } from "../store/pb"

export default function AlreadyLoggedInRedirector() {
    const currentUser = useAuthStore((state) => state.currentUser)
    const checkUserAuthCondition = () => {
        if (currentUser || pb.authStore.isValid) {
            return true
        }
        return false
    }
    return (
        checkUserAuthCondition() ? <Navigate to="/" replace={true} /> : <Outlet />
    )

}