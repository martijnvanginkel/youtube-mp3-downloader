<script>
    import SpinnerIcon from './SpinnerIcon.svelte'

    export let title
    export let url
    export let state
</script>

<label>
    {title}
    {url}
    {#if state === 'loading'}
        <SpinnerIcon />
    {:else if state === 'completed'}
        Completed
    {:else if state === 'failed'} 
        Failed 
    {/if}
    <input type="checkbox" name={url} />
</label>

<style>

label {
    border: 1px solid var(--color-white);
    display: flex;
    justify-content: space-between;
    padding: var(--spacing-m);
    cursor: pointer;
}

label:focus-within {
    outline: 2px solid blue;
}

label:has(input:checked) {
    color: white;
    background-color: black;
}

label:has(input:disabled) {
    background: gray;
    cursor: not-allowed;
}

input:focus {
    outline: none;
}

input:disabled {
    display: none;
}

</style>