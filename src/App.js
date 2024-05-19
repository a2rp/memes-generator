import React from 'react'
import MemesGenerator from './memesGenerator'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    return (
        <div>
            <MemesGenerator />

            <ToastContainer />
        </div>
    )
}

export default App

