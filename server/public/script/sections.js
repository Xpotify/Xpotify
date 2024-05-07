const artistTab = document.getElementById("artistTabs");
const tabs = document.getElementById("tabs");
const songTabs = document.getElementById("songsTabs");
const albumTabs = document.getElementById("albumTabs");
const lyricsTabs = document.getElementById("lyricsTab");
const playlistTabs = document.getElementById("playlistTabs");
const Loader = document.getElementById("preloader");

const showArtistTab = async () => {
        tabs.classList.add("hide");
        songTabs.classList.add("hide");
        albumTabs.classList.add("hide");
        artistTab.classList.add("hide");
        lyricsTabs.classList.add("hide");
        playlistTabs.classList.add("hide");
        Loader.classList.remove("hide");
        
        var artistQuery = document.getElementById("songArtist").innerText;
        var artist = await fetchArtist(artistQuery);
        var artistId = artist.id;
        var artistTopTracks = await fetchArtistTopTracks(artistId);
        
        if(artist && artistTopTracks){
                let artistName = document.getElementById("artistName");
                let artistVerification = document.getElementById("artistVer");
                let artistFollowers = document.getElementById("artistFollowers");
                let artistTracks = document.getElementsByClassName("artistTopTracks");
                let artistTracksNum = document.getElementsByClassName("songNum");
                let artistTracksImg = document.getElementsByClassName("artistTrackImg");

                artistName.innerText = artist.name;
                artistFollowers.innerText = `${artist.totalFollowers} total followers`;

                if(artist.popularity > 50){
                        artistVerification.style.visibility = "visible";
                } else {
                        artistVerification.style.visibility = "hidden";
                }

                for(i=0; i < artistTracks.length; i++){
                        artistTracksNum[i].innerText = `${artistTopTracks[i].id}`;
                        artistTracksImg[i].src = artistTopTracks[i].album.img[2].url;
                        artistTracks[i].children[2].innerText = artistTopTracks[i].name;
                        // artistTracks[i].children[3]
                        artistTracks[i].children[3].innerText = calculateTime((artistTopTracks[i].duration)/1000);
                        artistTracks[i].children[4].innerText = artistTopTracks[i].album.name;
                }

        } else {
                console.log("artist doesnt exist!");
        }

        Loader.classList.add("hide");
        artistTab.classList.remove("hide");
};

const showList = () => {
        tabs.classList.add("hide");
        artistTab.classList.add("hide");
        songTabs.classList.add("hide");
        albumTabs.classList.add("hide");
        lyricsTabs.classList.add("hide");
        playlistTabs.classList.remove("hide");    
};

const toggleFullscreen = () => {
        if(document.fullscreen == false){
                document.documentElement.requestFullscreen();
        } else {
                document.exitFullscreen();
        }
};

const returnToHome = () => {
        artistTab.classList.add("hide");
        tabs.classList.remove("hide");
        songTabs.classList.add("hide");
        albumTabs.classList.add("hide");
        lyricsTabs.classList.add("hide");
        playlistTabs.classList.add("hide");
};

const showSongTab = async () => {
        artistTab.classList.add("hide");
        tabs.classList.add("hide");
        songTabs.classList.add("hide");
        albumTabs.classList.add("hide");
        lyricsTabs.classList.add("hide");
        playlistTabs.classList.add("hide");
        Loader.classList.remove("hide");

        const query = document.getElementById("player");
        const song = await fetchTrack(query.dataset.songid);
        const songType = document.getElementById("songType");
        const songName = document.getElementById("songName");
        const songArtist = document.getElementById("songArtistName");
        const songAlbumImage = document.getElementById("songAlbumImage");
        const songImage = document.getElementById("songSongImage");
        const songTitle = document.getElementById("songSongTitle");
        const songDuration = document.getElementById("songSongDuration");
        const songAlbum = document.getElementById("songSongAlbum");

        if(song.type == "track"){
                songType.innerText = "Song"
        };
        songName.innerText = song.name;
        songArtist.innerText = song.artists[0].name;
        songAlbumImage.src = song.album.images[1].url;
        songImage.src = song.album.images[2].url;
        songTitle.innerText = song.name;
        songDuration.innerText = calculateTime((song.duration)/1000)
        songAlbum.innerText = song.album.name;
        songAlbum.dataset.albumid = song.album.id;

        Loader.classList.add("hide");
        songTabs.classList.remove("hide");
        // console.log(song);

};

const showAlbumTab = async () => {
        artistTab.classList.add("hide");
        tabs.classList.add("hide");
        songTabs.classList.add("hide");
        albumTabs.classList.add("hide");
        lyricsTabs.classList.add("hide");
        playlistTabs.classList.add("hide");
        Loader.classList.remove("hide");

        const albumName = document.getElementById("albumName");
        const albumArtist = document.getElementById("albumArtist");
        const albumType = document.getElementById("albumType");
        const albumImage = document.getElementById("albumImage");
        const query = document.getElementById("player");
        const albumMusicDiv = document.getElementById("albumMusic");
        
        const Album = await fetchAlbum(query.dataset.albumid);
        const AlbumTracks = await fetchAlbumTracks(query.dataset.albumid);

        if(Album){
                albumName.innerText = Album.metadata[0].albumName;
        
                albumArtist.innerText = Album.metadata[0].artist[0].name;

                if(Album.metadata[0].albumType == "single"){
                        albumType.innerText = "Single";
                } else {
                        albumType.innerText = "Album";
                }

                albumImage.src = Album.metadata[0].images[0].url;
        } else {
                // do nothing for now
        }

        if(AlbumTracks){
                for(i=0; i < AlbumTracks.length; i++){
                        albumMusicDiv.innerHTML += `
                                <div class="songs">
                                <span class="songNum">${Album.tracks[i].trackId}</span>
                                <span class="songImage"><img src="${Album.metadata[0].images[2].url}" alt=""></span>
                                <span class="songTitle">${Album.tracks[i].trackName}</span>
                                <span class="songDuration">${calculateTime((Album.tracks[i].trackDuration)/1000)}</span>
                                </div>
                        `;
                };    
        } else {
                // do nothing for now
        }
        
        Loader.classList.add("hide");
        albumTabs.classList.remove("hide");
};

const showLyricsTab = () => {
        artistTab.classList.add("hide");
        tabs.classList.add("hide");
        songTabs.classList.add("hide");
        albumTabs.classList.add("hide");
        lyricsTabs.classList.remove("hide");
        playlistTabs.classList.add("hide");
};