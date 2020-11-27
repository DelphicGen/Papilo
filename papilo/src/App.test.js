import React from 'react'
import {render} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import store from './store';
import { Provider } from 'react-redux';

import App from './App'

test('renders without crashing', () => {
    const div = document.createElement("div");
    render(<Provider store={store}><App /></Provider>, div)
})

