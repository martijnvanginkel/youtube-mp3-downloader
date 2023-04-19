<script>
	import Button from './components/Button.svelte'
    import LoadForm from './LoadForm.svelte';
	import DownloadForm from './DownloadForm.svelte'

	let songs = {}
	let outputFolder = '/Users/martijnvanginkel/Desktop/untitled folder'

	function handleOnChooseFolder() {
		API.chooseFolder().then(chosenFolder => {
			outputFolder = chosenFolder
		}).catch(err => {
			console.log('error hereafds')
		})
	}

</script>

<main>
	<LoadForm on:songs-loaded={e => songs = e.detail.songs} />
	<Button type="button" on:click={handleOnChooseFolder}>Output folder</Button>
	<span style="font-size: 10px">{outputFolder ? outputFolder : 'No folder selected'}</span>
	{#if Object.keys(songs).length > 0}
		<DownloadForm songs={songs} outputFolder={outputFolder} />
	{/if}
</main>

<style>

main {
	margin: 16px;
}

</style>