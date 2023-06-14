<script>
    import { createEventDispatcher } from 'svelte';
    import Button from './components/Button.svelte'

    const dispatch = createEventDispatcher();
	
	let urlValue = ''
	let previousLoadUrl = ''

	let loadingSongs = false
	let firstBatchDone = false
	let allBatchesLoaded = false

    function handleOnLoad(e) {
		e.preventDefault()
		
		let songs = {}
		const formData = new FormData(e.target)
		const url = formData.get('url')

		loadingSongs = true

		if (urlValue !== previousLoadUrl) {
			resetFormState()
		}
		
		API.getSongs({ url }).then(response => {
			
			response.data.forEach(song => {
				songs[song.url] = {
					index: song.index,
					url: song.url,
					title: song.title,
					state: 'default'
				}
			})

			if (response.statusCode === 200) {
				allBatchesLoaded = true
			} else {
				firstBatchDone = true
			}

		}).catch(() => {
			API.showMessage({ message: "There is something wrong with the URL", type: "error" })
			songs = {}
		}).finally(() => {
			loadingSongs = false
			previousLoadUrl = urlValue

            dispatch('songs-loaded', { songs, playlistUrl: urlValue })
		})
	}

	function resetFormState() {
		firstBatchDone = false
		allBatchesLoaded = false
		loadingSongs = false
	}

</script>

<form on:submit={handleOnLoad}>
	<label>
		Youtube playlist url
		<input type="text" name="url" bind:value={urlValue} on:keyup={resetFormState} />
	</label>
	<Button type="submit" disabled={urlValue.length === 0 || loadingSongs || allBatchesLoaded}>
		Load
	</Button>
</form>

<style>
	form {
		display: flex;
		gap: 0;
		justify-content: space-between;
		align-items: flex-end;
	}

	label {
		color: var(--color-white);
		flex-grow: 1;
		margin-inline-end: var(--spacing-l);
	}

	input {
		inline-size: 100%;
		margin-block-start: var(--spacing-s);
		padding: var(--spacing-s);
		border: 0;
		border-radius: 2px;
	}
</style>
