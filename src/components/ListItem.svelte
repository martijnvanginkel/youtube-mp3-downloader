<script>
	export let title
</script>

<li class="list-item">
    <label>
        {title}
        <input type="checkbox" name={title}>
    </label>
</li>

<style>

.list-item {
    color: var(--color-yellow);
    background-color: var(--color-green);
    border: 1px solid var(--color-white);
}

.list-item--failed {
    background-color: red;
}

.list-item:not(:last-of-type) {
    margin-block-end: var(--spacing-m);
}

label {
    display: flex;
    justify-content: space-between;
    padding: var(--spacing-m);
    cursor: pointer;
}

label:has(input:checked) {
    background-color: black;
}

</style>