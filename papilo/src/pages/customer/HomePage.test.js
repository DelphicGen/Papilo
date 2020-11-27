import React from 'react'
import {render, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import store from '../../store';
import { Provider } from 'react-redux';

import HomePage from './HomePage'

test('renders homepage correctly', async () => {
    const {getByText} = render(<Provider store={store}><HomePage /></Provider>)
    expect(getByText('Melangkah untuk Maju')).not.toBeNull();
})