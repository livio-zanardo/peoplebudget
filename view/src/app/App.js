import React from 'react';
import './App.css';
import RouterComponent from '../routing/Router';
import { injectContext } from '../store/store';

function App() {
    return <RouterComponent />;
}

export default injectContext(App);
