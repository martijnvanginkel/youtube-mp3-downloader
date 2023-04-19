<script>
    import Button from './components/Button.svelte'
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let folderPath = ''

	function handleOnPickFolder() {
		API.pickFolder().then(chosenFolder => {
			folderPath = chosenFolder
		}).catch(() => {
            folderPath = ''
		}).finally(() => {
            dispatch('picked-folder', { folderPath })
        })
	}
</script>

<div class="folder-picker">
    <Button type="button" on:click={handleOnPickFolder}>Select folder</Button>
    <span>{folderPath ? folderPath : 'No folder selected'}</span>
</div>

<style>
.folder-picker {
    display: flex;
    align-items: flex-end;
    gap: var(--spacing-m);
}

span {
    color: var(--color-white);
    font-size: 12px;
}

</style>
