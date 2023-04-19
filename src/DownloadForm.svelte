<script>
    import Button from './components/Button.svelte'
    import SongItem from './components/SongItem.svelte'

	export let songs
    export let outputFolder

    let isDownloading = false
    $: sortedSongs = Object.values(songs).sort((a, b) => a.index < b.index ? -1 : (a.index > b.index) ? 1 : 0)

    function responseCb({ songUrl, statusCode }) {
        if (statusCode === 200) {
            songs[songUrl].state = 'completed'
            return
        }

        songs[songUrl].state = 'failed'
    }

	async function handleOnDownload(e) {
		e.preventDefault();
        isDownloading = true        

        if (!outputFolder || outputFolder.length === 0) {
            // do an alert or something to say you need to pick an output folder
            return;
        }

		const formData = new FormData(e.target)
    	const songUrls = []
      
		for (const key of formData.keys()) {
			songUrls.push(key)
            songs[key].state = 'loading'
		}

		await API.downloadSongs({ songUrls, outputFolder, responseCb })

        isDownloading = false
	}

</script>

<form on:submit={handleOnDownload}>
    {#each sortedSongs as song}
        <SongItem title={song.title} url={song.url} state={song.state} /> 
    {/each}
    <Button type="submit" disabled={isDownloading}>Download</Button>
</form>
