import { useState } from 'react'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

import "./App.css";
import { Theme } from "./theme";

import Navbar from "./components/Navbar";
import Gallery from "./components/Gallery"

const Layout = () => {
    return (
        <ThemeProvider theme={Theme}>
            <Navbar />
            <div className="container">
                <Outlet />
            </div>
        </ThemeProvider>
    );
};

export default function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />} >
                    <Route path="/" element={<Gallery />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
