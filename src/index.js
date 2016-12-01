/**
 * Parent component, the starting point of the application
 * @author Alex
 */

import _ from 'lodash';
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import SearchBar from './components/search_bar';
import AudioList from './components/audio_list';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            query: 'justin',
            audios: []
        };

        this.audioObject = null;
    }

    // Sets an initial search
    componentDidMount() {
        const {query} = this.state;
        this.searchArtist(query);
    }

    /**
     * Method used to fetch data from Spotify
     * @param {String} uri
     */
    static searchSpotify(uri) {
        return fetch(uri, {method: 'GET'})
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            });
    }

    /**
     * Service used for fetching artists data
     * @param {String} query
     */
    searchArtist = (query) => {
        const uri = `https://api.spotify.com/v1/search?type=artist&limit=50&q=${query}`;

        this.constructor.searchSpotify(uri)
            .then(json => {
                if (json.artists) {
                    this.setState({
                        audios: [...json.artists.items]
                    });
                }
            });
    };

    /**
     * Service used for fetching audio tracks data
     * @param {String} albumId
     */
    getTracks(albumId) {
        const uri = `https://api.spotify.com/v1/artists/${albumId}/top-tracks?country=US`;
        return this.constructor.searchSpotify(uri);
    }

    /**
     * Handler for selected artist
     * It creates a new Audio object that plays a top track of the selected artist
     * @param {Event} e
     */
    onSelect = (e) => {
        let me = this,
            playingCssClass = 'playing',
            target = e.target;

        if (target !== null && target.classList.contains('cover')) {
            if (target.classList.contains(playingCssClass)) {
                me.audioObject.pause();
            } else {
                if (me.audioObject) {
                    me.audioObject.pause();
                }

                me.getTracks(target.getAttribute('id'))
                    .then((data) => {
                        me.audioObject = new Audio(data.tracks[0].preview_url);
                        me.audioObject.play();
                        target.classList.add(playingCssClass);

                        me.audioObject.addEventListener('ended', function () {
                            target.classList.remove(playingCssClass);
                        });

                        me.audioObject.addEventListener('pause', function () {
                            target.classList.remove(playingCssClass);
                        });
                    })
            }
        }
    };

    render() {
        // Control how many times we allow the function to be executed over time.
        // Called once every 500ms
        const albumSearch = _.debounce((term) => { this.searchArtist(term) }, 500);

        return (
            <div>
                <SearchBar onSearchTermChange={albumSearch} />
                <AudioList
                    onAudioSelect={this.onSelect}
                    audios={this.state.audios} />
            </div>
        );
    }
}

// Creates an instance of App and puts it on the page (in the DOM)
ReactDom.render(<App />, document.querySelector('.container'));