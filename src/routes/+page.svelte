<!-- src/routes/+page.svelte -->
<script lang="ts">
    import type {PageData} from './$types';
    import IconifyIcon from '@iconify/svelte';
    import {type SubmitFunction, enhance} from "$app/forms";

    export let data: PageData;

    const submitLogout: SubmitFunction = async ({ cancel }) => {
        const {error} = await data.supabase.auth.signOut()
        if (error) {
            console.log(error);
        }
        cancel();
    }
</script>

<div class="w-screen h-screen flex justify-center items-center flex-col">
    <div class="flex flex-col">
        <div class="flex text-white gap-2 mb-2">
            <IconifyIcon class="text-3xl text-primary-400" icon="logos:svelte-icon"/>
            <IconifyIcon class="text-3xl text-primary-400" icon="logos:supabase-icon"/>
            <IconifyIcon class="text-3xl text-primary-400" icon="logos:stripe"/>
        </div>
        <h1 class="font-heading-token text-primary-50 text-4xl mb-10">Welcome to this funny app</h1>
        {#if data.session}
            <div class="flex text-white">
                <span>Logged in as: {data.session.user.email}</span>
                <form action="/logout" method="POST" use:enhance={submitLogout}>
                    <button type="submit" class="btn variant-filled-secondary">Logout</button>
                </form>
            </div>
        {:else}
            <div class="flex gap-5">
                <a href="/login" type="button" class="btn btn-sm variant-filled-primary">Login</a>
                <a href="/register" type="button" class="btn btn-sm variant-filled-secondary">Register</a>
            </div>
        {/if}
    </div>
</div>
