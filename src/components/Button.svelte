<script>  

</script>

<button {...$$restProps} on:click><slot /></button>

<style>

button {
    padding: var(--spacing-s) var(--spacing-m);
    background-color: var(--color-dark);
    border: 1px solid var(--color-yellow);
    color: var(--color-yellow);
    cursor: pointer;
}

button:hover {
    background-color: var(--color-yellow);
    color: var(--color-dark);
}

</style>