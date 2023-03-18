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

		const formData = new FormData(e.target);
		for (const key of formData.values()) {
			// console.log(key)A
			
			// console.log(formData[key])
			// songs.push(key)
		}
		
		console.log(formData['url']);
		// console.log(formData)
		console.log('hanad')
	}
</script>

<main>

	<form on:submit={handleOnLoad}>
		<label id="url">
			URL
			<input type="text" id="url" />
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