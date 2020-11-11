const api_key = '99b6a9d8450ca4686ff1bb85a5c80edc';


const form = document.getElementById('search');
const artist = document.getElementById('artist');
const albumsContainer = document.getElementById('albums-container');

form.addEventListener('submit',(event)=>{
  event.preventDefault();
  const artistName = artist.value

  if(artistName) {
    fetchApi(artistName);
  } else {
    albumsContainer.innerHTML = '<h1>Invalid Artist Name</h1>';
  }

});

const fetchApi = (artistName) => {
  const url = `http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${artistName}&api_key=${api_key}&format=json&limit=5`

  fetch(url)
  .then(response => response.json())
  .then((data) => {
    const albums = data.topalbums.album;

    albumsContainer.innerHTML = '';

    albums.forEach((album)=>{
      const albumHTML = makeAlbumHTML(album);
      albumsContainer.insertAdjacentHTML('beforeend', albumHTML)
    });

  });

}


const makeAlbumHTML = (album) => {
  return `<div class="row m-t-1">
      <div class="col-xs-12">
        <img src="${album.image[2]['#text']}" class='pull-left m-r-1'>
        <h2>${album.name}</h2>
        <p>${album.artist.name}</p>
      </div>
    </div>`
}



