<script>
    import Button from './components/Button.svelte'
    import SongItem from './components/SongItem.svelte'

	export let songs
    export let outputFolder

    let isDownloading = false

    // $: doubled = count * 2;
    
    $: sortedSongs = Object.values(songs).sort((a, b) => a.index < b.index ? -1 : (a.index > b.index) ? 1 : 0)

    function responseCb({ songUrl, statusCode }) {
        console.log('callback ', songUrl, statusCode)

        if (statusCode === 200) {
            songs[songUrl].state = 'completed'
            return
        }

        songs[songUrl]

    }

	async function handleOnDownload(e) {
        isDownloading = true

        // songs.forEach(song => {
        //     song.state = 'loading'
        // })
        
		e.preventDefault();

        if (!outputFolder || outputFolder.length === 0) {
            // do an alert or something to say you need to pick an output folder
            return;
        }

		const formData = new FormData(e.target)
    	const songUrls = []
      
		for (const key of formData.keys()) {
			songUrls.push(key)
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

<style>
    form {
        margin-block-start: 16px;
    }
</style>