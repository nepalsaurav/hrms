import { Outlet } from "react-router-dom"
import NavBar from "../components/NavBar"
import SideBar from "../components/SideBar"

export default function Root() {
    return (
        <>
            <div className="bg-base-100 drawer lg:drawer-open">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Page content here */}
                    <NavBar />
                    <div className="p-3">
                        <Outlet />
                    </div>
                </div>
                <SideBar />
            </div>


        </>
    )
} 