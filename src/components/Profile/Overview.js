import React, { Component } from 'react';
import { connect } from 'react-redux';

class Overview extends Component {
    render() {
        return (
            <div>
                <h1>Hi</h1>
            </div>

        )
    }
}
const mapStoreToProps = reduxStore => ({
    reduxStore,
})
export default connect(mapStoreToProps)(Overview);