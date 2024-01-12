import { NavLink } from "react-router-dom"

import { useAuthStore } from "../store/auth"
import { AuthModel, RecordModel } from "pocketbase"
import { pb } from "../store/pb"
import ThemeManager from "./ThemeManager"

export default function NavBar() {
    const currentUser = useAuthStore((state: any) => state.currentUser)
    const user = currentUser as RecordModel
    const avatarUrl: string | null = currentUser?.avator != "" ? pb.files.getUrl(user, currentUser?.avatar) : null
    return (
        <>
            <div className="bg-base-200 text-base-content sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-shadow duration-100 [transform:translate3d(0,0,0)]">
                <div className="navbar w-full gap-x-20 flex-row-reverse">
                    {/* for breadcrums */}
                    <AvatarDropDown avatarUrl={avatarUrl} currentUser={currentUser} />
                    <ThemeManager />
                </div>
            </div>

        </>
    )
}


function AvatarDropDown({ avatarUrl, currentUser }: { avatarUrl: string | null, currentUser: AuthModel }) {
    return (
        <div className="pr-4">
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        <img alt="Tailwind CSS Navbar component" src={avatarUrl ? avatarUrl : ""} />
                    </div>
                </div>
                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-200 box w-52">
                    <li>
                        <a className="justify-between">
                            {currentUser?.username}
                        </a>
                        <NavLink to="/logout">
                            Logout
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}