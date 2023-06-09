import type {Actions} from "@sveltejs/kit";
import {AuthApiError} from "@supabase/supabase-js";
import {fail, redirect} from "@sveltejs/kit";

export const actions: Actions = {
    login: async ({request, locals}) => {
        const body = Object.fromEntries(await request.formData());

        const {data, error: err} = await locals.supabase.auth.signInWithPassword({
            email: body.email as string,
            password: body.password as string
        })

        if (err) {
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