import React, { useEffect } from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import { validate } from '../../util/validator'

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
    }
}));


const CustomeSelect = props => {

    const classes = useStyles();

    return (
        <FormControl  className={classes.formControl}>
            <InputLabel id={props.id}>{props.label}</InputLabel>
            <Select
                labelId={props.id}
                id={props.id}
                value={props.value}
                onChange={props.handleChange}
            >
            {
                props.items.map(item => <MenuItem value={item}>{item}</MenuItem>)
            }
            </Select>
        </FormControl>
    )
}

export default CustomeSelect
