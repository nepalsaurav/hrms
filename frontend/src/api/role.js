import { client } from "./pocketbase"
import { useStorage } from "@vueuse/core"

export function isAllow({
    type, 
    collection = null, 
    condition = "admin__only"
}) {
    // Check if the user is a superuser, if so allow access
    if (client?.authStore?.isSuperuser) {
        return true;
    }

    // Get the employee data
    let employee = useStorage("employee");
    employee = JSON.parse(employee.value);


    // Helper function to check if the employee role is 'Admin'
    const isAdmin = employee?.expand?.roles?.name === "Admin";

    // Handle 'navigation' and 'add' cases
    if ((type === "navigation" || type === "add") && condition === "admin__only") {
        return isAdmin;
    }

    // Default return false if none of the conditions match
    return false;
}
