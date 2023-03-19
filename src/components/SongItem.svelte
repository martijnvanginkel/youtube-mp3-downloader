<script>
	export let title
</script>

<label>
    {title}
    <input type="checkbox" name={title}>
</label>

<style>

/* .list-item {
    color: var(--color-yellow);
    background-color: var(--color-green);
    border: 1px solid var(--color-white);
}

.list-item--failed {
    background-color: red;
}

.list-item:not(:last-of-type) {
    margin-block-end: var(--spacing-m);
} */

label {
    border: 1px solid var(--color-white);
    display: flex;
    justify-content: space-between;
    padding: var(--spacing-m);
    cursor: pointer;
}

label:has(input:checked) {
    color: white;
    background-color: black;
}

</style>