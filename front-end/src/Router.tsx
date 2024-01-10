
import {
    Route,
    createHashRouter, createRoutesFromElements,
} from "react-router-dom"
import Home from "./routes/Home"
import Login from "./routes/auth/Login"
import Logout from "./routes/auth/Logout"
import Root from "./routes/Root"
import RequireAuth from "./Hooks/RequreAuth"
import AlreadyLoggedInRedirector from "./Hooks/AlreadyLoggedInRedirector"

const router = createHashRouter(
    createRoutesFromElements(
        <>
            <Route element={<AlreadyLoggedInRedirector />}>
                <Route path="/login" element={<Login />}></Route>
            </Route>
            <Route path="/logout" loader={Logout}></Route>
            {/* protected route */}
            <Route element={<Root />}>
                <Route element={<RequireAuth />}>
                    <Route path="/" element={<Home />}></Route>
                </Route>
            </Route>
        </>
    )
)

export default router