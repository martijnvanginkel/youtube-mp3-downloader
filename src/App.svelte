<script>
    import LoadForm from './LoadForm.svelte';
	import DownloadForm from './DownloadForm.svelte'
    import FolderPicker from './FolderPicker.svelte';

	let songs = {}
	let outputFolder = ''

</script>

<main>
	<FolderPicker on:picked-folder={e => outputFolder = e.detail.folderPath} />
	<LoadForm on:songs-loaded={e => songs = e.detail.songs} />
	{#if Object.keys(songs).length > 0}
		<DownloadForm songs={songs} outputFolder={outputFolder} />
	{/if}
</main>

<style>

main {
	display: flex;
	flex-direction: column;
	gap: var(--spacing-l);
	margin: var(--spacing-l);
}

</style>