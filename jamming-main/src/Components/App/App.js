import React from 'react';
import './App.css';
import Playlist from '../Playlist/Playlist.js';
import SearchResults from '../SearchResults/SearchResults.js';
import SearchBar from '../SearchBar/SearchBar.js';
import Spotify from '../../util/Spotify.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state =
    { SearchResults: [],
      playlistName: 'My Playlist',
      playlistTracks: [],
      previewURI: ''
  }
  this.removeTrack = this.removeTrack.bind(this);
  this.updatePlaylistName = this.updatePlaylistName.bind(this);
  this.addTrack = this.addTrack.bind(this);
  this.savePlaylist = this.savePlaylist.bind(this);
  this.search = this.search.bind(this);
  this.setPreviewURI = this.setPreviewURI.bind(this);

  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } else {
      tracks.push(track);
      this.setState({playlistTracks: tracks});
    }
    
  }
  
  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);

    this.setState( { playlistTracks: tracks})

  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  setPreviewURI(uri){
    console.log(uri)
    this.setState({ previewURI: uri })
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.trackURI);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() =>
    this.setState({
      playlistName: 'New Playlist',
      playlistTracks: []
  })
  )
}

  search(searchTerm) {
    Spotify.search(searchTerm).then(SearchResults => {
      this.setState({SearchResults : SearchResults})
    })
  }

  render() {
    return (
      <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
      
        <SearchBar onSearch={this.search} />
        <iframe src={`https://open.spotify.com/embed/track/${this.state.previewURI}`} title='previewer' width="600" height="100" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
        <div className="App-playlist">
    
        <SearchResults SearchResults={this.state.SearchResults} onAdd={this.addTrack} setPreviewURI={this.setPreviewURI}/>
          
          <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}
            onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onChange={this.handleNameChange}
            onSave={this.savePlaylist}
          />
        </div>
      </div>
      </div>
    )
  }
} 

export default App;
