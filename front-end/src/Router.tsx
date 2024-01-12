
import {
    Route,
    createHashRouter, createRoutesFromElements,
} from "react-router-dom"
import Home from "./routes/Home"

//login component
import Login from "./routes/auth/Login"
//login form action
import LoginFormAction from './routes/auth/LoginFormAction'
import Logout from "./routes/auth/Logout"
import Root from "./routes/Root"
import RequireAuth from "./Hooks/RequreAuth"
import AlreadyLoggedInRedirector from "./Hooks/AlreadyLoggedInRedirector"
import AdminRoot from "./routes/admin/Root"
import Employee from "./routes/admin/employee/Employee"
import LeaveModule from "./routes/leave/Leave"
import AddLeaveRequet from "./routes/leave/Add"

const router = createHashRouter(
    createRoutesFromElements(
        <>

            <Route element={<AlreadyLoggedInRedirector />}>
                <Route path="login" element={<Login />} action={LoginFormAction}></Route>
            </Route>
            <Route path="logout" loader={Logout}></Route>
            {/* protected route */}
            <Route path="/" element={<Root />}>
                <Route element={<RequireAuth />}>
                    <Route index={true} element={<Home />}></Route>

                    {/* AdminRoute */}
                    <Route element={<AdminRoot />}>
                        <Route path="admin/employee" element={<Employee />}></Route>
                    </Route>

                    {/* Leave Route */}
                    <Route path="leave">
                        <Route index={true} element={<LeaveModule />}></Route>
                        <Route path="add" element={<AddLeaveRequet />}></Route>
                    </Route>
                </Route>
            </Route>
        </>
    )
)

export default router