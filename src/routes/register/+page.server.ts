import type { Actions } from "@sveltejs/kit";
import {fail, redirect} from "@sveltejs/kit";
import  {AuthApiError} from "@supabase/supabase-js";

export const actions: Actions ={
    register: async ({request, locals}) => {
        const body = Object.fromEntries(await request.formData());

        const {data, error: err} = await locals.supabase.auth.signUp({
            email: body.email as string,
            password: body.password as string,
            options: {
                data: {
                    username: body.username as string
                }
            }
        })

        if (err) {
            console.log(err)
            if (err instanceof AuthApiError && err.status == 400) {
                return fail(400, {
                    error: "Invalid email or pass"
                })
            }
            return fail(500, {
                error: "Sever error. Please try again later"
            })
        }

        throw redirect(303, "/");
    }
}