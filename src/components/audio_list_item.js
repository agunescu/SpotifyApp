/**
 * Functional component that returns an audio list item
 * @author Alex
 */

import React from 'react';

const AudioListItem = ({audio, onAudioSelect}) => {
    const imageUrl = audio.images[0].url;
    const divStyle = {
        backgroundImage: 'url(' + imageUrl + ')'
    };

    return (
        <li className="list-item" onClick={(e) => onAudioSelect(e, audio)}>
            <div className="cover" id={audio.id} style={divStyle}></div>
            <div className="list-item-name">{audio.name}</div>
        </li>
    );
};

export default AudioListItem;