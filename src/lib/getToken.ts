import { headers } from "next/headers"
import { auth } from "./auth"
import { authClient } from "./auth-client"

export const getTokenServer = async (): Promise<string | undefined>  => {
    const jwtToken = await auth.api.getToken({
        headers: await headers()
    })

    return jwtToken?.token
}

export const getTokenClient = async (): Promise<string | undefined> => {
    const {data,error} = await authClient.token();

    if(error){
        console.log(error.message);
        return
    }

    return data?.token
}