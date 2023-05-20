import type {RequestHandler} from "@sveltejs/kit";
import {error, redirect} from "@sveltejs/kit";


export const POST: RequestHandler = async ({locals}) => {
    const {error: err} = await locals.supabase.auth.signOut();

    if (err) {
        throw error(500, "something went wrong");
    }

    throw redirect(303, '/');
}