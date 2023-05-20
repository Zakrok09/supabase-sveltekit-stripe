<script lang="ts">
    import type {PageData} from './$types';

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

<nav>
    <div class="flex text-white">
        {#if data.session}
            <span>Logged in as: {data.session.user?.email}</span>
            <form action="/logout" method="POST" use:enhance={submitLogout}>
                <button type="submit" class="btn variant-filled-secondary">Logout</button>
            </form>
        {:else}
            <span>Log in</span>

        {/if}
    </div>
</nav>
