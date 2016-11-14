/**
 * Parent component, the starting point of the application
 * @author Alex
 */

import _ from 'lodash';
import $ from 'jquery';
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import SearchBar from './components/search_bar';
import AudioList from './components/audio_list';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            audios: []
        };

        this.audioObject = null;

        // Sets an initial search
        this.searchArtist('justin');
    }

    /**
     * Service used for fetching artists data
     * @param {String} term
     */
    searchArtist(term) {
        if (term) {
            $.ajax({
                url: 'https://api.spotify.com/v1/search',
                data: {
                    q: term,
                    type: 'artist'
                },
                success: function (response) {
                    this.setState({
                        audios: response.artists.items
                    });
                }.bind(this)
            })
        }
    }

    /**
     * Service used for fetching audio tracks data
     * @param {String} albumId
     * @param {Function} callback
     */
    getTracks(albumId, callback) {
        const ROOT_URL = `https://api.spotify.com/v1/artists/${albumId}/top-tracks?country=US`;

        $.ajax({
            url: ROOT_URL,
            success: function (response) {
                callback(response);
            }.bind(this)
        });
    }

    /**
     * Handler for selected artist
     * It creates a new Audio object that plays a top track of the selected artist
     * @param {Event} e
     */
    onSelect(e) {
        var playingCssClass = 'playing',
            target = e.target;

        if (target !== null && target.classList.contains('cover')) {
            if (target.classList.contains(playingCssClass)) {
                this.audioObject.pause();
            } else {
                if (this.audioObject) {
                    this.audioObject.pause();
                }

                this.getTracks(target.getAttribute('id'), function (data) {
                    this.audioObject = new Audio(data.tracks[0].preview_url);
                    this.audioObject.play();
                    target.classList.add(playingCssClass);

                    this.audioObject.addEventListener('ended', function () {
                        target.classList.remove(playingCssClass);
                    });

                    this.audioObject.addEventListener('pause', function () {
                        target.classList.remove(playingCssClass);
                    });
                }.bind(this))
            }
        }
    }

    render() {
        // Control how many times we allow the function to be executed over time.
        // Called once every 500ms
        const albumSearch = _.debounce((term) => { this.searchArtist(term) }, 500);

        return (
            <div>
                <SearchBar onSearchTermChange={albumSearch} />
                <AudioList
                    onAudioSelect={this.onSelect.bind(this)}
                    audios={this.state.audios} />
            </div>
        );
    }
}

// Creates an instance of App and puts it on the page (in the DOM)
ReactDom.render(<App />, document.querySelector('.container'));