import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { books } from '../data/books';

const shelf1 = books.filter((_, i) => i < 4);
const shelf2 = books.filter((_, i) => i >= 4 && i < 8);
const shelf3 = books.filter((_, i) => i >= 8);

function BookSpine({ book, index }) {
    const [isHovered, setIsHovered] = useState(false);
    const height = 'h-44 md:h-52';

    return (
        <Link
            to={`/book/${book.slug}`}
            className="relative group cursor-pointer block"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* 말풍선 툴팁 */}
            <div className={`absolute -top-14 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm text-slate-800 
                       text-xs font-medium px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap z-30
                       transition-all duration-300 pointer-events-none
                       ${isHovered ? 'opacity-100 -translate-y-1' : 'opacity-0 translate-y-2'}`}>
                {book.category}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 
                        border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent 
                        border-t-[5px] border-t-white/95"></div>
            </div>

            {/* 책 본체 */}
            <div
                className={`relative ${book.width} ${height} rounded-t-sm 
                   bg-gradient-to-r ${book.spine}
                   shadow-[4px_0_12px_rgba(0,0,0,0.5),-2px_0_6px_rgba(0,0,0,0.3)]
                   transition-all duration-500 ease-out
                   hover:-translate-y-6 hover:rotate-[-2deg] hover:shadow-[4px_8px_24px_rgba(0,0,0,0.6)]
                   border-r border-black/20
                   flex items-center justify-center overflow-hidden`}
            >
                {/* 책 등 텍스트 */}
                <span className="[writing-mode:vertical-rl] text-white text-[10px] md:text-xs font-medium 
                         tracking-tight opacity-80 group-hover:opacity-100 transition-opacity duration-300
                         select-none">
                    {book.title}
                </span>

                {/* 장식 라인: 상단 */}
                <div className="absolute top-3 left-1 right-1 h-[0.5px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                <div className="absolute top-4 left-2 right-2 h-[0.5px] bg-gradient-to-r from-transparent via-white/15 to-transparent"></div>

                {/* 장식 라인: 하단 */}
                <div className="absolute bottom-3 left-1 right-1 h-[0.5px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                <div className="absolute bottom-4 left-2 right-2 h-[0.5px] bg-gradient-to-r from-transparent via-white/15 to-transparent"></div>

                {/* 빛 반사 효과 */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
        </Link>
    );
}

function Shelf({ books, label }) {
    return (
        <div className="relative">
            <h2 className="text-stone-400 text-sm font-semibold mb-3 ml-2 uppercase tracking-widest">
                {label}
            </h2>

            {/* 책들 */}
            <div className="flex items-end gap-[3px] pl-4 pb-0">
                {books.map((book, index) => (
                    <BookSpine key={book.id} book={book} index={index} />
                ))}
                {/* 북엔드 장식 */}
                <div className="w-3 h-32 md:h-40 bg-gradient-to-b from-stone-600 to-stone-800 rounded-t-sm ml-1 shadow-lg"></div>
            </div>

            {/* 나무 선반 */}
            <div className="relative">
                <div className="h-5 w-full bg-gradient-to-b from-[#5d4037] to-[#3e2723] rounded-sm 
                       shadow-[0_4px_20px_rgba(0,0,0,0.5)] border-b-[6px] border-[#2d1b18]">
                    {/* 나무 결 텍스처 */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-sm"></div>
                </div>
                {/* 선반 밑 그림자 */}
                <div className="absolute -bottom-4 left-2 right-2 h-4 bg-black/20 blur-lg rounded-full"></div>
            </div>
        </div>
    );
}

export default function LibraryPage() {
    return (
        <main className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-slate-950">

            {/* 1. 배경: 바다가 보이는 창문 */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1920&q=80"
                    alt="Ocean View"
                    className="w-full h-full object-cover opacity-40"
                />
                {/* 창문 프레임 */}
                <div className="absolute inset-0 border-[30px] md:border-[50px] border-stone-900/90
                       shadow-[inset_0_0_120px_rgba(0,0,0,0.9)]"></div>
                {/* 창 세로 가로 나누기 */}
                <div className="absolute top-0 bottom-0 left-1/2 w-[3px] bg-stone-800/70 -translate-x-1/2 hidden md:block"></div>
                <div className="absolute left-0 right-0 top-1/2 h-[3px] bg-stone-800/70 -translate-y-1/2 hidden md:block"></div>
            </div>

            {/* 파티클 / 먼지 효과 */}
            <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-amber-200/20 animate-pulse"
                        style={{
                            width: Math.random() * 3 + 1 + 'px',
                            height: Math.random() * 3 + 1 + 'px',
                            left: Math.random() * 100 + '%',
                            top: Math.random() * 100 + '%',
                            animationDelay: Math.random() * 5 + 's',
                            animationDuration: Math.random() * 4 + 3 + 's',
                        }}
                    ></div>
                ))}
            </div>

            {/* 2. 콘텐츠 레이어 */}
            <div className="z-10 w-full max-w-4xl px-6 md:px-10 py-16">

                {/* 상단 타이틀 */}
                <div className="text-center mb-16 md:mb-20">
                    <div className="inline-block mb-6">
                        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent mx-auto mb-4"></div>
                        <span className="text-amber-400/80 text-xs tracking-[0.4em] uppercase font-light">Pastor's Library</span>
                        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent mx-auto mt-4"></div>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-5 drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]
                        leading-tight">
                        이종인 목사의 서재
                    </h1>
                    <p className="text-lg md:text-xl text-stone-300 font-light italic tracking-wide">
                        "바다의 고요함 속에 울리는 말씀의 깊이"
                    </p>
                </div>

                {/* 3. 책장 섹션 */}
                <div className="grid grid-cols-1 gap-16">
                    <Shelf books={shelf1} label="신학 · 강요" />
                    <Shelf books={shelf2} label="설교 · 서신" />
                    <Shelf books={shelf3} label="철학 · 교회" />
                </div>

                {/* 하단 버튼 */}
                <div className="mt-20 flex justify-center gap-6">
                    <Link to="/stories" className="group relative px-10 py-4 bg-stone-900/60 hover:bg-stone-800/80 
                           text-white border border-stone-500/40 hover:border-amber-500/40
                           backdrop-blur-xl transition-all duration-500 rounded-sm shadow-2xl
                           overflow-hidden">
                        <span className="relative z-10 text-sm tracking-widest uppercase font-light">
                            이야기 보기
                        </span>
                        {/* 호버 시 빛 효과 */}
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/10 to-amber-500/0 
                           translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    </Link>
                </div>
            </div>

            {/* 실내 조명 오버레이 */}
            <div className="absolute inset-0 pointer-events-none z-[5]">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30"></div>
                {/* 따뜻한 조명 효과 */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] 
                       bg-amber-500/5 rounded-full blur-3xl"></div>
            </div>
        </main>
    );
}
