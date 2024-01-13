import { redirect } from "react-router-dom";
import { pb } from "../../store/pb"
import type { Error } from "./Types";
import { ClientResponseError } from "pocketbase";
import { useAuthStore } from "../../store/auth";

export default async function Login({ request }: { request: Request }) {
    const formData = await request.formData()
    const username = formData.get("username") as string | null
    const password = formData.get("password") as string | null
    const errors: Error = {}
    if (!username || !password) {
        errors.general = "username and password required"
        return errors
    }

    try {
        const authData = await pb.collection('users').authWithPassword(
            username,
            password,
        )
        if (authData.token != "") {
            return redirect("/")
        }



    } catch (err: unknown) {
        if (err instanceof ClientResponseError) {
            errors.general = err.response.message
            return errors

        } else {
            errors.general = "something error occured"
            return errors
        }
    }
    return null


}
