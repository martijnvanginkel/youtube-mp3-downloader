<script>
	import SongItem from './components/SongItem.svelte'
	import Button from './components/Button.svelte'

	let songs = []

	function handleOnLoad(e) {
		e.preventDefault()
		const formData = new FormData(e.target)

		const url = formData.get('url')

		API.getSongs(url).then(data => {
			songs = data
		}).catch(err => {
			songs = []
		})
	}

	function handleOnDownload(e) {
		e.preventDefault();

		const formData = new FormData(e.target);
    	const songs = [];
      
		for (const key of formData.keys()) {
			songs.push(key)
		}

		console.log(songs)
	}

	function handleOnChooseFolder() {
		console.log('output folder')

		API.chooseFolder().then(chosenFolder => {

		}).catch(err => {
			
		})
	}

</script>

<main>

	<form on:submit={handleOnLoad}>
		<label>
			URL
			<input type="text" name="url" value="https://www.youtube.com/playlist?list=PLmn6qDvodtX4BR2ppVlB4nTlAAlBuwIPo" />
		</label>
		<Button type="submit">Load</Button>
	</form>
	{#if songs.length > 0}
		<form on:submit={handleOnDownload}>
			{#each songs as song}
				<SongItem title={song.title} />
			{/each}
			<Button type="submit">Download</Button>
		</form>

		<Button type="button" on:click={handleOnChooseFolder}>Output folder</Button>
	{/if}
</main>

<style>

main {
	margin: 16px;
}

form {
	/* background-color: var(--color-dark); */
    /* padding: var(--spacing-m); */
    /* border: 1px solid var(--color-white); */
}

</style>