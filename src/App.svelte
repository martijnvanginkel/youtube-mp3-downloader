<script>
    import LoadForm from './LoadForm.svelte';
	import DownloadForm from './DownloadForm.svelte'
    import FolderPicker from './FolderPicker.svelte';

	let songs = {}
	let playlistUrl = ''
	let outputFolder = ''

</script>

<main>
	<FolderPicker on:picked-folder={e => outputFolder = e.detail.folderPath} />
	<LoadForm on:songs-loaded={e => {
		if (e.detail.playlistUrl !== playlistUrl) {
			songs = {}
		}
		songs = Object.assign(songs, e.detail.songs)
		playlistUrl = e.detail.playlistUrl
	}} />
	{#if Object.keys(songs).length > 0}
		<DownloadForm songs={songs} outputFolder={outputFolder} />
	{/if}
</main>

<style>

main {
	display: flex;
	flex-direction: column;
	gap: var(--spacing-l);
	block-size: 100vh;
	max-block-size: 100vh;
	box-sizing: border-box;
	padding: var(--spacing-l);
}

</style>