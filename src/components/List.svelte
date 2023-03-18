<script>
    import ListItem from './ListItem.svelte'
    export let items = []
</script>

<ul>
    {#each items as item}
        <ListItem title={item.title} />
    {/each}
</ul>

<style>

ul {
    list-style: none;
}

</style>