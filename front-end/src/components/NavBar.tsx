import { NavLink } from "react-router-dom"

import { useAuthStore } from "../store/auth"
import { RecordModel } from "pocketbase"
import { pb } from "../store/pb"

export default function NavBar() {
    const currentUser = useAuthStore((state: any) => state.currentUser)
    const user = currentUser as RecordModel
    const avatarUrl: string | null = currentUser.avator != "" ? pb.files.getUrl(user, currentUser.avatar) : null
    return (
        <>
            <div className="navbar bg-base-100 w-full">
                <div className="navbar-start">
                    <a className="btn btn-ghost text-xl">daisyUI</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <NavLink to="/">
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/login">
                                Login
                            </NavLink>
                        </li>
                        <li>
                            {currentUser?.username}
                        </li>
                    </ul>
                </div>

                <div className="navbar-end">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img alt="Tailwind CSS Navbar component" src={avatarUrl ? avatarUrl : ""} />
                            </div>
                        </div>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                            <li>
                                <a className="justify-between">
                                    {currentUser.username}
                                </a>
                                <NavLink to="/logout">
                                    Logout
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}