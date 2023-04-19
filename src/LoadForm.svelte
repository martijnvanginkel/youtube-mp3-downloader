<script>
    import { createEventDispatcher } from 'svelte';
    import Button from './components/Button.svelte'

    const dispatch = createEventDispatcher();

    function handleOnLoad(e) {
		e.preventDefault()
		
		let songs = {}
		const formData = new FormData(e.target)
		const url = formData.get('url')

		API.getSongs({ url: url }).then(data => {
			data.forEach(song => {
				songs[song.url] = {
					index: song.index,
					url: song.url,
					title: song.title,
					state: 'default'
				}
			})
		}).catch(err => {
			songs = {}
		}).finally(() => {
            dispatch('songs-loaded', { songs })
		})
	}
</script>

<form on:submit={handleOnLoad}>
    <label>
        URL
        <input type="text" name="url" value="https://www.youtube.com/playlist?list=PLmn6qDvodtX4BR2ppVlB4nTlAAlBuwIPo" />
    </label>
    <Button type="submit">Load</Button>
</form>

<style>
	label {
		color: white;
	}

	input {
		inline-size: 100%;
		padding: 4px;
	}
</style>
