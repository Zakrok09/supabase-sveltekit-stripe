<script>
    import '@skeletonlabs/skeleton/themes/theme-gold-nouveau.css';
    import '@skeletonlabs/skeleton/styles/skeleton.css';
    import '../app.postcss';

    import {invalidateAll} from '$app/navigation';
    import { onMount } from 'svelte';
    import { Toast } from '@skeletonlabs/skeleton';

    export let data;

    $: ({ supabase, session } = data);

    onMount(() => {
        const { data } = supabase.auth.onAuthStateChange((event, _session) => {
            invalidateAll();
        });

        return () => data.subscription.unsubscribe();
    });
</script>

<svelte:head>
    <title>User Management</title>
</svelte:head>

<div class="bg-surface-900 w-screen h-screen">
    <slot />
    <Toast />
</div>