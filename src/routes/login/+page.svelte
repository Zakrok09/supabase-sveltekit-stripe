<script lang="ts">
    import type {ActionData, PageData} from "./$types";
    import { toastStore } from '@skeletonlabs/skeleton';
    import type { ToastSettings } from '@skeletonlabs/skeleton';

    export let data: PageData;
    export let form: ActionData;

    if (form?.fail) {
        const t: ToastSettings = {
            message: `Error occurred: ${form?.error}`,
            timeout: 5000,
            background: `variant-filled-error`
        }
        toastStore.trigger(t);
    }
</script>
<div class="w-screen h-screen flex justify-center items-center">
    <div class="text-white">
        <form action="?/login" method="POST" class="flex flex-col gap-1">
            <h1>Login</h1>
            <label for="email"> Email </label>
            <input class="rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight" type="text" id="email" name="email" />
            <label for="password"> Password </label>
            <input class="rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight" id="password" type="password" name="password">
            <button type="submit" class="btn variant-filled-secondary">Login</button>
        </form>
    </div>
</div>
