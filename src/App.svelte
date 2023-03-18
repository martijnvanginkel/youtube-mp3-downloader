<script>
	import List from './components/List.svelte'
	import Button from './components/Button.svelte'

	const items = [
		{ title: 'Song one' },
		{ title: 'Song two' },
		{ title: 'Song three' }
	]

	function handleOnSubmit(e) {
		e.preventDefault();

		const formData = new FormData(e.target);
    	const songs = [];
      
		for (const key of formData.keys()) {
			songs.push(key)
		}

		console.log(songs)
	}

	function handleOnLoad(e) {
		e.preventDefault()
		const formData = new FormData(e.target)

		const url = formData.get('url')

		console.log(window)

		API.loadSongs()

		console.log(url)

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

	<form on:submit={handleOnSubmit}>
		<List {items} />
		<Button type="submit">Download</Button>
	</form>
</main>

<style>

main {
	margin: 16px;
}

form {
	background-color: var(--color-dark);
    padding: var(--spacing-m);
    /* border: 1px solid var(--color-white); */
}

</style>