import React, { useReducer, useEffect, useState } from 'react'
import { RemoveRedEye, Clear } from '@material-ui/icons'
import SearchIcon from '@material-ui/icons/Search';
import { validate } from '../../util/validator'

const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            }
        case 'TOUCH':
            return {
                ...state,
                isTouched: true
            }
        case 'CLEAR':
            return {
                ...state,
                value: ''
            }
        default:
            return state
    }
}

const Input = props => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.value || '',
        isValid: props.valid || false,
        isTouched: false,
    })

    const { id, onInput } = props
    const { value, isValid } = inputState

    const [hidden, setHidden] = useState(true)

    useEffect(() => {
        onInput(id, value, isValid)
    }, [onInput, id, value, isValid])

    const changeHandler = event => {
        dispatch({ type: 'CHANGE', val: event.target.value, validators: props.validators })
    }

    const touchHandler = () => {
        dispatch({ type: 'TOUCH' })
    }

    const clearHandler = () => {
        dispatch({ type: 'CLEAR' })
    }

    const inputElement = (
        <input
            className={`input focus:outline-none focus:text-red-700 focus:border-2 border-0 border-b border-red-700 ${props.className ? props.className : ''}`}
            style={{ width: props.width, maxWidth: props.maxWidth }}
            id={props.id}
            type={props.type !== 'password' ? props.type : hidden ? 'password' : 'text'}
            value={inputState.value}
            placeholder={props.placeholder}
            required={props.required}
            onChange={changeHandler}
            onBlur={touchHandler} />
    )

    let errorTextElement
    if (!inputState.isValid && inputState.isTouched) {
        errorTextElement = <p className="text-xs text-red-700 font-medium tracking-wider mt-2 mb-3" style={props.width && {width: props.width}}>{props.errorText}</p>
    }

    const labelElement = (
        <label htmlFor={props.id} className="input-label md:text-base mt-5">{props.label}</label>
    )

    if (props.type === 'password') {
        return (
            <div className={`flex flex-col ${props.divClassName ? props.divClassName : ''}`}>
                {labelElement}
                <div className="relative w-fit-content">
                    {inputElement}
                    <RemoveRedEye
                        className={`${hidden ? 'text-red-500' : 'text-red-300'} absolute cursor-pointer`}
                        fontSize="default"
                        style={{ right: 10, top: 2 }}
                        onClick={() => setHidden(prev => !prev)} />
                </div>
                {errorTextElement}
            </div>
        )
    }

    return (
        <div className={`flex flex-col ${props.divClassName ? props.divClassName : ''}`}>
            {labelElement}
            <div className="relative">
                {inputState.value !== '' && (
                    <Clear
                        className="text-green-700 absolute cursor-pointer"
                        fontSize="small"
                        style={props.customClear || { right: 8, top: 10 }}
                        onClick={clearHandler} />
                )}
                {inputElement}
                {props.id === 'query' &&
                    <button className="bg-green-700 absolute top-0 right-0 rounded-r-md text-gray-100 flex items-center px-2 cursor-pointer" style={{ height: 39 }} onClick={props.search}>
                        <SearchIcon />
                    </button>
                }
            </div>
            {errorTextElement}
        </div>
    )
}

export default Input