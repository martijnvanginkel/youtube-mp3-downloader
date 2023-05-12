<script>
    import { createEventDispatcher } from 'svelte';

    export let title
    export let url
    export let state

    const dispatch = createEventDispatcher();
</script>

<label
    class:loading={state === 'loading'}
    class:completed={state === 'completed'}
    class:failed={state === 'failed'}
>
    <div class="title">{title}</div>
    <div class="url">{url}</div>
    <div class="status">
        {#if state === 'loading'}
            Downloading...
        {:else if state === 'completed'}
            Completed
        {:else if state === 'failed'} 
            Failed 
        {/if}
    </div>
    <input type="checkbox" name={url} disabled={state !== 'default'} on:change={e => {
        dispatch('change', { checked: e.target.checked })
    }} />
</label>

<style>

label {
    display: flex;
    /* justify-content: space-between; */
    padding: var(--spacing-m);
    border: 1px solid var(--color-white);
    cursor: pointer;
    background-color: black;
    color: white;
}

label:not(:last-of-type) {
    margin-block-end: var(--spacing-m);
}

.loading {
    background-color: lightskyblue;
}

.completed {
    background-color: green; 
}

.failed {
    background-color: lightcoral;
}

label:focus-within {
    outline-width: 2px;
    outline-style: solid;
    outline-offset: 2px;
    outline-color: orange;
    z-index: 99999;
}

label:has(input:checked) {
    color: white;
}

label:has(input:disabled) {
    cursor: not-allowed;
}

input {
    color: white;
}

input:focus {
    outline: none;
}

input:disabled {
    display: none;
}

.title {
    flex-grow: 1;
}

.url {
    font-size: 12px;
    font-style: italic;
    align-self: flex-end;
    margin-inline-end: var(--spacing-l);
}

</style>