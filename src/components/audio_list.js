/**
 * Functional component that holds the list of audio items.
 * @author Alex
 */

import React from 'react';
import AudioListItem from './audio_list_item';

const AudioList = (props) => {
    // For each audio items, that has square images, we create a new instance of AudioListItem
    const audioItems = props.audios.map((audio) => {
        if (audio.images.length > 0) {
            return (
                <AudioListItem
                    onAudioSelect={props.onAudioSelect}
                    key={audio.id}
                    audio={audio} />
            );
        }
    });

    return (
        <ul className="list">
            {audioItems}
        </ul>
    );
};

export default AudioList;