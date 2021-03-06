import { useCallback, useReducer } from 'react'

const formReducer = (state, action) => {
    switch (action.type) {
        case 'INPUT_CHANGE':
            let formIsValid = true
            for (const inputId in state.inputs) {
                if (!state.inputs[inputId] || inputId === action.inputId) {
                    continue
                }
                formIsValid = formIsValid && state.inputs[inputId].isValid
            }
            formIsValid = formIsValid && action.isValid

            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: { value: action.value, isValid: action.isValid }
                },
                isValid: formIsValid
            }
        case 'RESET_INPUT':
            return {...action.value}
        default:
            return state
    }
}

export const useForm = (initialInputs, initialFormValidity) => {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: initialInputs,
        isValid: initialFormValidity
    })

    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({
            type: 'INPUT_CHANGE',
            value: value,
            isValid: isValid,
            inputId: id
        })
    }, [])

    const resetHandler = useCallback(() => {
        dispatch({
            type: 'RESET_INPUT',
            value: initialInputs
        })
    }, [initialInputs])

    return [formState, inputHandler, resetHandler]
}