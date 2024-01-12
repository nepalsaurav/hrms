import { NavLink } from "react-router-dom"

function LeaveModule() {
    return (
        <>
            <NavLink to="add" className="btn btn-primary">
                Request Leave
            </NavLink>
        </>
    )
}

export default LeaveModule