import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { incrementCount, decrementCount, removeProduct } from '../../actions/action'
import { useDispatch } from 'react-redux'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
    table: {
      minWidth: 650
    },
    root : { 
        borderBottomWidth: 1, 
        borderColor: 'red',
        borderStyle: 'solid'
    }
});

const CustomTable = props => {
    const classes = useStyles();
    const dispatch = useDispatch()

    return (
      <TableContainer style={{ maxHeight: 400 }}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow style={{borderBottom: '2px solid #C70C19'}}>
              {
                  props.columns.map(column => (
                    <TableCell key={column}><span className="font-bold text-center">{column}</span></TableCell>
                  ))
              }
            </TableRow>
          </TableHead>
          <TableBody style={{height: '300px', overflow: 'auto'}}>
            {
                props.rows.map((row, index) => {
                    return <TableRow style={{borderBottom: '2px solid #C70C19'}} key={index}>
                        <TableCell><img style={{width: 'auto', height: '150px'}} className="object-cover object-center" src={row.image} alt={row.name} /></TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>Rp. {row.price}</TableCell>
                        <TableCell>
                            <button onClick={() => dispatch(decrementCount(row.id))} className="cursor-pointer py-2 px-3 bg-red-700 text-white mr-1">-</button>
                            <span className="py-2 px-3 mr-1">{row.count}</span>
                            <button onClick={() => dispatch(incrementCount(row.id))} className="cursor-pointer py-2 px-3 bg-red-700 text-white">+</button>
                        </TableCell>
                        <TableCell><DeleteIcon onClick={() => dispatch(removeProduct(row.id))} className="cursor-pointer text-red-700" /></TableCell>
                        <TableCell><span className="text-red-700 font-bold">Rp. {row.total}</span></TableCell>
                    </TableRow>
                })
            }
          </TableBody>
        </Table>
      </TableContainer>
    );
}

export default CustomTable
