import { Outlet } from "react-router-dom";

function AdminRoot() {
    return (
        <>
            <p>this is on all admin root element</p>
            <Outlet />
        </>
    )
}

export default AdminRoot