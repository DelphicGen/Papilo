import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { incrementCount, decrementCount, removeProduct } from '../../actions/action'
import { useDispatch, useSelector } from 'react-redux'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from './Button';
import { Link } from 'react-router-dom';
import Shirt from '../../assets/products/shirt.jpg'
import Pants from '../../assets/products/pants.jpg'
import Shoes from '../../assets/products/shoes.png'
import Bag from '../../assets/products/bag.jpg'
import Accessory from '../../assets/products/accessory.jpg'

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

    const {role} = useSelector(state => state)
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
              role === 'customer' &&
              props.rows.map((row, index) => {
                return <TableRow style={{borderBottom: '2px solid #C70C19'}} key={index}>
                    <TableCell><img style={{width: 'auto', height: '150px'}} className="object-cover object-center" src={row.type === 'Baju' ? Shirt : (row.type === 'Celana' ? Pants : (row.type === 'Tas' ? Bag : (row.type === 'Sepatu' ? Shoes : Accessory)))} alt={row.productName} /></TableCell>
                    <TableCell>{row.productName}</TableCell>
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
            {
              props.orderList ? (
              props.rows.map((row, index) => {
                return <TableRow style={{borderBottom: '2px solid #C70C19'}} key={index}>
                    <TableCell>{row.productName}</TableCell>
                    <TableCell>{row.jumlah}</TableCell>
                    <TableCell>{row.createdAt}</TableCell>
                </TableRow>
              })) : (
                role === 'seller' && 
                  props.rows.map((row, index) => {
                    return <TableRow style={{borderBottom: '2px solid #C70C19'}} key={index}>
                        <TableCell>{row.productName}</TableCell>
                        <TableCell>{row.type}</TableCell>
                        <TableCell>{row.stock}</TableCell>
                        <TableCell>{row.price}</TableCell>
                        <TableCell>
                          <Link to="/edit">
                            <Button className="py-2 px-5" secondary={true} 
                              onClick={() => {
                                localStorage.setItem('productName', row.productName)
                                localStorage.setItem('type', row.type)
                                localStorage.setItem('stock', row.stock)
                                localStorage.setItem('price', row.price)
                                localStorage.setItem('id', row.id)
                              }
                            }>Edit</Button>
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Button className="py-2 px-5" onClick={() => props.deleteProduct(row.id)}>Delete</Button>
                        </TableCell>
                    </TableRow>
                  })
              )
            }
            {
              role === 'transportCompany' &&
              props.rows.map((row, index) => {
                console.log(row)
                return <TableRow style={{borderBottom: '2px solid #C70C19'}} key={index}>
                  <TableCell>{row.alamat_receiver}</TableCell>
                  <TableCell>{row.shipping_type}</TableCell>
                  <TableCell>Rp. {row.fee}</TableCell>
                  <TableCell>{row.createdAt}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>
                    <Button className="py-2 px-5" secondary={true} onClick={() => props.confirm(row.id)}>Confirm</Button>
                  </TableCell>
                  <TableCell>
                    <Button className="py-2 px-5" onClick={() => props.deleteOrder(row.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
    );
}

export default CustomTable
