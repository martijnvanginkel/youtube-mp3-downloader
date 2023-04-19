<script>
    export let title
    export let url
    export let state
</script>

<label
    class:loading={state === 'loading'}
    class:completed={state === 'completed'}
    class:failed={state === 'failed'}
>
    {title}
    {url}
    <div class="status">
        {#if state === 'loading'}
            Downloading...
        {:else if state === 'completed'}
            Completed
        {:else if state === 'failed'} 
            Failed 
        {/if}
    </div>
    <input type="checkbox" name={url} disabled={state !== 'default'} />
</label>

<style>

label {
    border: 1px solid var(--color-white);
    display: flex;
    justify-content: space-between;
    padding: var(--spacing-m);
    cursor: pointer;
    margin-block-end: var(--spacing-s);
}

.loading {
    background-color: blue;
}

.completed {
    background-color: green;
}

.failed {
    background-color: red;
}

label:focus-within {
    outline-width: 2px;
    outline-style: solid;
    outline-offset: 2px;
    outline-color: orange;
}

label:has(input:checked) {
    color: white;
}

label:has(input:disabled) {
    cursor: not-allowed;
}

input:focus {
    outline: none;
}

input:disabled {
    display: none;
}

</style>