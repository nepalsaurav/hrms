import { NavLink } from 'react-router-dom'
import styled from 'styled-components'


//icons import
import { RiAdminLine } from "react-icons/ri"
import { BsPeopleFill } from "react-icons/bs"
import { FcLeave } from "react-icons/fc"

const DrawerSide = styled.div`
       scroll-behavior: smooth;
       scroll-padding-top: 5rem;
      
    `


function SideBar() {
    return (
        <DrawerSide className="drawer-side z-40">
            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
            <aside className="bg-base-200 min-h-screen w-80 pt-3">
                <div className="bg-base-200 sticky top-0 z-20 hidden items-center gap-2 bg-opacity-90 px-4 py-2 backdrop-blur lg:flex ">
                    <NavLink to="/" className="flex-0 btn btn-ghost px-2" unstable_viewTransition>
                        <svg width="32" height="32" viewBox="0 0 415 415" xmlns="http://www.w3.org/2000/svg"><rect x="82.5" y="290" width="250" height="125" rx="62.5" fill="#1AD1A5"></rect><circle cx="207.5" cy="135" r="130" fill="black" fill-opacity=".3"></circle><circle cx="207.5" cy="135" r="125" fill="white"></circle><circle cx="207.5" cy="135" r="56" fill="#FF9903"></circle></svg>
                        <div className="font-title inline-flex text-lg md:text-2xl">daisyUI</div>
                    </NavLink>
                </div>

                <div className="h-4"></div>
                <ul className="menu px-4 py-0">
                    {/* Sidebar content here */}
                    <li>
                        <NavLink to="/leave">
                            <FcLeave />
                            Leave
                        </NavLink>
                    </li>
                    <li>
                        <details open={false}>
                            <summary>
                                <RiAdminLine></RiAdminLine>
                                Admin
                            </summary>
                            <ul>
                                <li>
                                    <NavLink to="/admin/employee" unstable_viewTransition>
                                        <BsPeopleFill />
                                        Employee
                                    </NavLink>
                                </li>
                                <li><a>Submenu 2</a></li>
                                <li>
                                    <details open>
                                        <summary>Parent</summary>
                                        <ul>
                                            <li><a>Submenu 1</a></li>
                                            <li><a>Submenu 2</a></li>
                                        </ul>
                                    </details>
                                </li>
                            </ul>
                        </details>
                    </li>
                    <li><a>Item 3</a></li>

                </ul>
            </aside>
        </DrawerSide>
    )
}

export default SideBar
