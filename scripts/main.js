'use strict';onDocumentReady(function(){var API_BASE_URL='https://ws.audioscrobbler.com/2.0/';var API_KEY='f331efc08f3167d453f8545f3e58a763';var USER_NAME='Danguilherme';var NOW_PLAYING_RETRIEVAL_INTERVAL=1;function init(){setInterval(getNowPlayingSong,1000*60*NOW_PLAYING_RETRIEVAL_INTERVAL);getNowPlayingSong();}var fetchScrobblingTrack=function fetchScrobblingTrack(_){return fetch(API_BASE_URL+'?method=user.getrecenttracks&user='+USER_NAME+'&api_key='+API_KEY+'&format=json&limit=1&extended=1').then(function(r){return r.json();}).then(function(j){return j.recenttracks.track.filter(function(i){return i['@attr']&&i['@attr'].nowplaying;})[0];}).then(function(song){if(song){return fetchSongAlbum(song).then(function(_){return song;});}return song;});};var fetchAlbum=function fetchAlbum(mbid){if(!mbid){return Promise.resolve(null);}return fetch(API_BASE_URL+'?method=album.getinfo&mbid='+mbid+'&api_key='+API_KEY+'&format=json&limit=1&extended=1').then(function(r){return r.json();}).then(function(j){return j.album;});};var fetchSongAlbum=function fetchSongAlbum(song){return fetchAlbum(song.album.mbid).then(function(album){Object.assign(song.album,album);return album;});};function getNowPlayingSong(){try{fetchScrobblingTrack().then(function(song){return fillAllNowPlayingElements(song);});}catch(e){}}function fillAllNowPlayingElements(song){if(song)console.info('Guilherme is listening to \''+song.name+'\' from '+song.album['#text']+' by '+song.artist.name);var nowPlayingEls=document.querySelectorAll('.now-playing');var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{for(var _iterator=nowPlayingEls[Symbol.iterator](),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){var element=_step.value;fillNowPlaying(element,song);}}catch(err){_didIteratorError=true;_iteratorError=err;}finally{try{if(!_iteratorNormalCompletion&&_iterator.return){_iterator.return();}}finally{if(_didIteratorError){throw _iteratorError;}}}}function fillNowPlaying(nowPlayingEl,song){if(!song)return void nowPlayingEl.classList.remove('is-playing');var songImages=song.image||song.artist.image||song.album.image||[];var songImageSrc=getImageSrc(songImages,'large');songImageSrc=getImageSrc(songImages,nowPlayingEl.dataset.imageSize||'mega')||getImageSrc(songImages,'extralarge')||getImageSrc(songImages,'large');var songName=song.name;var albumName=song.album['#text'];var artistName=song.artist.name;var coverBg=nowPlayingEl.querySelector('.song-cover-bg');var imgEl=nowPlayingEl.querySelector('.song-cover');var titleEl=nowPlayingEl.querySelector('.song-title');var artistAndAlbumEl=nowPlayingEl.querySelector('.song-artist-and-album');var artistEl=nowPlayingEl.querySelector('.song-artist');var albumEl=nowPlayingEl.querySelector('.song-album');var anchorEl=nowPlayingEl.querySelector('.song-url');if(coverBg){coverBg.style.backgroundImage='url('+songImageSrc+')';}if(imgEl){imgEl.src=songImageSrc;}if(titleEl)titleEl.textContent=songName;if(artistAndAlbumEl)artistAndAlbumEl.textContent=artistName+' - '+albumName;if(artistEl)artistEl.textContent=artistName;if(albumEl)albumEl.textContent=albumName;if(anchorEl)anchorEl.href=song.url;nowPlayingEl.classList.add('is-playing');}function getImageSrc(){var array=arguments.length>0&&arguments[0]!==undefined?arguments[0]:[];var size=arguments.length>1&&arguments[1]!==undefined?arguments[1]:'large';var img=array.filter(function(img){return img.size===size;})[0];if(img)return img['#text'];return undefined;}init();});