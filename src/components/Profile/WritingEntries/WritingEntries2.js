import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { editorStateFromRaw } from "megadraft";
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IndividualEntries from './IndividualEntries';
var moment = require('moment');
const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
    id += 1;
    return { id, name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];


class WritingEntries2 extends Component {
    componentDidMount() {
        this.getEntries();
    }
    getEntries = () => {
        this.props.dispatch({ type: 'GET_ENTRIES' });
        console.log(this.props.entry);
    }
    SimpleTable =() => {
        const { classes } = this.props;
        console.log(this.props.entry);
        
        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell >Title</TableCell>
                            <TableCell >Genre</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Prompt</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell >Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        
                        {this.populateTable()}
                        
                    </TableBody>
                </Table>
            </Paper>
        );
    }
    populateTable = () => {
        
        return this.props.entry.map((row, i) => {

            return (<IndividualEntries history={this.props.history} key={i} row={row} />)
    })}
    render(){
        return (
            <div>
                
                {this.props.entry.length !== 1 && 
                    this.SimpleTable()}
            </div>

        )
    }
}

WritingEntries2.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapStoreToProps = reduxStore => ({
    entry: reduxStore.entry,
    // story: reduxStore.story
})

export default compose(
    withStyles(styles),
    connect(mapStoreToProps)
)(WritingEntries2)

