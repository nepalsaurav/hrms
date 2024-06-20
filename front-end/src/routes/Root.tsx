import TopNav from "@/components/Nav/TopNav"
import { Outlet } from "react-router-dom"

export default function Root() {
    return (

        <>
          <TopNav/>
          <Outlet/>
        </>
        
    )
}