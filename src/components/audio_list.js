import React from 'react';
import AudioListItem from './audio_list_item';

const AudioList = (props) => {
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
        <ul>
            {audioItems}
        </ul>
    );
};

export default AudioList;