import { getAuthHeaders } from "./credentialsManager";
// import { router } from "expo-router";

export const authGuard = async () => {
    const headers = await getAuthHeaders();
    console.log("Headers:", headers);
    if (["", null, undefined].includes(headers?.access_token_cookie)) {
        return;
    }
};
