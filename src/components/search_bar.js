/**
 * Class based component that renders an input element used to search artist
 * @author Alex
 */

import React, { Component } from 'react';

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = { term: '' };
    }

    render() {
        return (
            <div className="search-bar">
                <input
                    value={this.state.term}
                    placeholder="Search"
                    onChange={event => this.onInputChange(event.target.value)} />
            </div>
        );
    }

    /**
     * Event handler for input search
     * Sets the state with the new searched value
     * @param {String} term
     */
    onInputChange(term) {
        this.setState({term});
        this.props.onSearchTermChange(term);
    }
}

export default SearchBar;