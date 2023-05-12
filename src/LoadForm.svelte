<script>
    import { createEventDispatcher } from 'svelte';
    import Button from './components/Button.svelte'

    const dispatch = createEventDispatcher();

    function handleOnLoad(e) {
		e.preventDefault()
		
		let songs = {}
		const formData = new FormData(e.target)
		const url = formData.get('url')

		API.getSongs({ url }).then(response => {
			response.data.forEach(song => {
				songs[song.url] = {
					index: song.index,
					url: song.url,
					title: song.title,
					state: 'default'
				}
			})
		}).catch(() => {
			API.showMessage({ message: "There is something wrong with the URL", type: "error" })
			songs = {}
		}).finally(() => {
            dispatch('songs-loaded', { songs })
		})
	}
</script>

<form on:submit={handleOnLoad}>
    <label>
        Youtube playlist url
        <input type="text" name="url" value="https://www.youtube.com/playlist?list=PLmn6qDvodtX4gt_u8hfVCAktMHd9GYfXe" />
    </label>
    <Button type="submit">Load songs</Button>
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
