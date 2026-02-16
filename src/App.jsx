import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LibraryPage from './components/LibraryPage.jsx'
import BookDetailPage from './components/BookDetailPage.jsx'
import StoryListPage from './components/StoryListPage.jsx'
import WriteStoryPage from './components/WriteStoryPage.jsx'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LibraryPage />} />
                <Route path="/book/:slug" element={<BookDetailPage />} />
                <Route path="/stories" element={<StoryListPage />} />
                <Route path="/stories/write" element={<WriteStoryPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
