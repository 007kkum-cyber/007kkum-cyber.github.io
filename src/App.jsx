import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LibraryPage from './components/LibraryPage.jsx'
import BookDetailPage from './components/BookDetailPage.jsx'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LibraryPage />} />
                <Route path="/book/:slug" element={<BookDetailPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
