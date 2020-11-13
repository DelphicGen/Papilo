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

// const inputReducer = (state, action) => {
//     switch (action.type) {
//         case 'CHANGE':
//             return {
//                 ...state,
//                 value: action.val,
//                 isValid: validate(action.val, action.validators)
//             }
//         case 'TOUCH':
//             return {
//                 ...state,
//                 isTouched: true
//             }
//         case 'CLEAR':
//             return {
//                 ...state,
//                 value: ''
//             }
//         default:
//             return state
//     }
// }


const CustomeSelect = props => {

    // const [inputState, dispatch] = useReducer(inputReducer, {
    //     value: props.value || '',
    //     isValid: props.valid || false,
    //     isTouched: false,
    // })

    const classes = useStyles();

    // const { id, onInput } = props
    // const { value, isValid } = inputState

    // const [hidden, setHidden] = useState(true)

    // useEffect(() => {
    //     onInput(id, value, isValid)
    // }, [onInput, id, value, isValid])

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
