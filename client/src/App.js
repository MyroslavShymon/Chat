import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Chat, Join} from "./components";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Join/>}/>
                <Route path="/chat" element={<Chat/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
