<button {...$$restProps} on:click><slot /></button>

<style>

button {
    padding: var(--spacing-s) var(--spacing-l);
    background-color: var(--color-dark);
    border-width: 2px;
    border-style: solid;
    border-color: var(--color-white);
    color: var(--color-white);
    cursor: pointer;
    border-radius: 2px;
    font-size: 16px;
}

button:disabled {
    background-color: lightgray;
    cursor: not-allowed;
}

button:focus {
    outline-width: 2px;
    outline-style: solid;
    outline-offset: 2px;
    outline-color: orange;
}

button:hover:not(:disabled) {
    background-color: var(--color-white);
    color: var(--color-dark);
}

</style>