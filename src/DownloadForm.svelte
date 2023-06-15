<script>
    import Button from './components/Button.svelte'
    import SongItem from './components/SongItem.svelte'

	export let songs
    export let outputFolder

    let isDownloading = false
    $: sortedSongs = Object.values(songs).sort((a, b) => a.index < b.index ? -1 : (a.index > b.index) ? 1 : 0)
    $: checkedSongs = 0

    function responseCb({ songUrl, statusCode }) {
        if (statusCode === 200) {
            songs[songUrl].state = 'completed'
            return
        }

        songs[songUrl].state = 'failed'
    }

	async function handleOnDownload(e) {
        e.preventDefault()
    
        if (!outputFolder || outputFolder.length === 0) {
            API.showMessage({ message: "Please choose an output folder", type: "info" })
            return;
        }

        isDownloading = true        

		const formData = new FormData(e.target)
    	const exportedSongs = []
      
		for (const key of formData.keys()) {
			exportedSongs.push({ title: songs[key].title, url: songs[key].url})
            songs[key].state = 'loading'
		}

		await API.downloadSongs({ songs: exportedSongs, outputFolder, responseCb })

        isDownloading = false
	}

</script>

<form on:submit={handleOnDownload}>
    <div class="song-count">Songs loaded: {Object.entries(songs).length}</div>
    <div class="song-items">
        {#each sortedSongs as song}
            <SongItem title={song.title} url={song.url} state={song.state} on:change={e => {
                e.detail.checked === true ? checkedSongs++ : checkedSongs--;
             }} /> 
        {/each}
    </div>
    <div>
        <Button type="submit" disabled={isDownloading || checkedSongs === 0} class="button">Download</Button>
    </div>
</form>

<style>
form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
}

.song-count {
    margin-inline-start: var(--spacing-s);
    margin-block-end: var(--spacing-s); 
    color: var(--color-white);

}

.song-items {
    padding-block: var(--spacing-s);
    padding-inline: var(--spacing-s) var(--spacing-l);
    flex-basis: 0;
    flex-grow: 1;
    overflow-y: auto;
    margin-block-end: var(--spacing-l);
}
</style>