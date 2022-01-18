import React from 'react';
import './Track.css';

export default class Track extends React.Component {
    constructor(props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.setPreviewURI = this.setPreviewURI.bind(this)
    }
    renderAction() {
        if (this.props.isRemoval) {
        return <button className="Track-action" onClick={this.removeTrack}> - </button>
    } else {
        return <button className="Track-action" onClick={this.addTrack}>+</button>
    }
    }

    addTrack() {
        this.props.onAdd(this.props.track);
    }

    removeTrack() {
        this.props.onRemove(this.props.track);
    }

    setPreviewURI(){
        this.props.setPreviewURI(this.props.track.id)
    }


    render() {
        return (
            <div className="Track">
            <div className="Track-information">
                <h3> { this.props.track.name} </h3>
                <p>{this.props.track.artist}| {this.props.track.album} </p>
                <span>
                    <img src="http://simpleicon.com/wp-content/uploads/play1.png" onClick={this.setPreviewURI} height='40' width='40' alt='play' />
                </span>
            </div>
                {this.renderAction()}
            </div>
        )
    }
}