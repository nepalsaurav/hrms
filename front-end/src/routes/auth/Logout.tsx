import { redirect } from "react-router-dom";
import { pb } from "../../store/pb";

export default async function Logout() {
    pb.authStore.clear()
    return redirect("/login")
}