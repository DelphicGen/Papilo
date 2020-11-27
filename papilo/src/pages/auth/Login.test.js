import React from 'react'
import Login from './Login'
import {render, fireEvent, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { BrowserRouter as Router } from 'react-router-dom'

import store from '../../store';
import { Provider } from 'react-redux';

test('login render correctly', async () => {
    const {getByText} = render(<Provider store={store}><Router><Login /></Router></Provider>)
    expect(getByText('Login')).not.toBeNull();
})

test('error email', async () => {
    const {getByText, getByTestId} = render(<Provider store={store}><Router><Login /></Router></Provider>)
    expect(getByText('Login')).not.toBeNull();

    const email = getByTestId('email')
    fireEvent.focus(email)
    fireEvent.blur(email)
    await waitFor(() => getByText('Please enter a valid email address.'))
})

test('error email 2', async () => {
    const {getByText, getByTestId} = render(<Provider store={store}><Router><Login /></Router></Provider>)
    expect(getByText('Login')).not.toBeNull();

    const email = getByTestId('email')
    fireEvent.change(email, {target: {value: 'gennardo'}})
    fireEvent.blur(email)
    await waitFor(() => getByText('Please enter a valid email address.'))
})

test('error password', async () => {
    const {getByText, getByTestId} = render(<Provider store={store}><Router><Login /></Router></Provider>)
    expect(getByText('Login')).not.toBeNull();

    const password = getByTestId('password')
    fireEvent.focus(password)
    fireEvent.blur(password)
    await waitFor(() => getByText('Password should has at least 8 characters.'))
})

test('error password 2', async () => {
    const {getByText, getByTestId} = render(<Provider store={store}><Router><Login /></Router></Provider>)
    expect(getByText('Login')).not.toBeNull();

    const password = getByTestId('password')
    fireEvent.change(password, {target: {value: 'qwe'}})
    fireEvent.blur(password)
    await waitFor(() => getByText('Password should has at least 8 characters.'))
})

test('radio button', async () => {
    const {getByText, getByTestId, getByLabelText} = render(<Provider store={store}><Router><Login /></Router></Provider>)
    expect(getByText('Login')).not.toBeNull();

    const labelRadio = getByLabelText('Customer');
    expect(getByLabelText('Customer')).not.toBeChecked();
    fireEvent.click(labelRadio);
    expect(getByLabelText('Customer')).toBeChecked();
})


test('invalid form', async () => {
    const {getByText} = render(<Provider store={store}><Router><Login /></Router></Provider>)
    expect(getByText('Login')).not.toBeNull();

    expect(getByText('LOGIN').closest('button')).toHaveAttribute('disabled');
})

test('valid form', async () => {
    const {getByText, getByTestId, getByLabelText} = render(<Provider store={store}><Router><Login /></Router></Provider>)
    expect(getByText('Login')).not.toBeNull();

    const email = getByTestId('email')
    const password = getByTestId('password')
    fireEvent.change(email, {target: {value: 'example@mail.com'}})
    fireEvent.change(password, {target: {value: 'qwertyuiop'}})

    const labelRadio = getByLabelText('Customer');
    fireEvent.click(labelRadio);

    expect(getByText('LOGIN').closest('button')).not.toBeDisabled();
})