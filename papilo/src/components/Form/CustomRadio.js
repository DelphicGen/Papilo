import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const CustomRadio = props => {
    

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">{props.label}</FormLabel>
            <RadioGroup aria-label={props.name} name={props.name} value={props.value} onChange={props.handleChange}>
                {
                    props.options.map(option => <FormControlLabel key={option} value={option} control={<Radio />} label={option} />)
                }
            </RadioGroup>
        </FormControl>
    )
}

export default CustomRadio
