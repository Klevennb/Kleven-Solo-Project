import React, { Component } from 'react';
import { connect } from 'react-redux';

class DefaultComponent extends Component {
    render() {
        return (
            <h1>DELETE THIS</h1>
        )
    }
}
const mapStoreToProps = reduxStore => ({
    // reduxStore,
})
export default connect(mapStoreToProps)(DefaultComponent);