import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBookBySlug, getBookById } from '../data/books';

function StarRating({ rating }) {
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(star => (
                <svg key={star} className={`w-4 h-4 ${star <= rating ? 'text-amber-400' : 'text-stone-600'}`}
                    fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );
}

function QuoteCard({ quote, index }) {
    return (
        <blockquote className="relative group">
            <div className={`relative bg-stone-900/40 backdrop-blur-sm border border-stone-700/30 rounded-lg p-6
                       hover:border-amber-500/20 transition-all duration-500
                       ${index === 0 ? 'md:col-span-2' : ''}`}>
                {/* 큰 따옴표 장식 */}
                <svg className="absolute -top-2 -left-1 w-8 h-8 text-amber-500/20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
                </svg>
                <p className="text-stone-200 text-sm md:text-base leading-relaxed italic pl-6">
                    "{quote.text}"
                </p>
                <cite className="block mt-3 pl-6 text-amber-400/70 text-xs not-italic tracking-wide">
                    — {quote.chapter}
                </cite>
            </div>
        </blockquote>
    );
}

function ChapterCard({ chapter, index }) {
    const [expanded, setExpanded] = React.useState(false);
    const hasDescription = !!chapter.description;

    return (
        <div
            className={`group relative bg-gradient-to-br from-stone-900/60 to-stone-900/30 backdrop-blur-sm 
                   border border-stone-700/20 rounded-lg p-5 hover:border-amber-500/20 
                   transition-all duration-500 ${hasDescription ? 'cursor-pointer' : ''}`}
            onClick={() => hasDescription && setExpanded(!expanded)}
        >
            {/* 번호 뱃지 + 제목 */}
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-900/40 border border-blue-800/30
                       flex items-center justify-center text-blue-300 text-xs font-bold">
                    {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                        <h4 className="text-white font-semibold text-sm mb-1">{chapter.number}</h4>
                        {hasDescription && (
                            <svg className={`w-4 h-4 text-stone-500 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
                                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        )}
                    </div>
                    <p className="text-stone-300 text-sm">{chapter.title}</p>
                    <p className="text-stone-500 text-xs mt-2">{chapter.topics}</p>
                </div>
            </div>

            {/* 확장 설명 */}
            {hasDescription && (
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${expanded ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}>
                    <div className="pl-14 border-l-2 border-blue-800/30 ml-5">
                        <p className="text-stone-400 text-xs md:text-sm leading-relaxed">
                            {chapter.description}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

function TagBadge({ tag }) {
    return (
        <span className="inline-block px-3 py-1 bg-stone-800/60 border border-stone-700/30 
                    text-stone-400 text-xs rounded-full hover:border-amber-500/30 
                    hover:text-amber-300 transition-all duration-300 cursor-default">
            #{tag}
        </span>
    );
}

export default function BookDetailPage() {
    const { slug } = useParams();
    const book = getBookBySlug(slug);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!book) {
        return (
            <main className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-stone-400 text-lg mb-4">도서를 찾을 수 없습니다.</p>
                    <Link to="/" className="text-amber-400 hover:text-amber-300 underline">서재로 돌아가기</Link>
                </div>
            </main>
        );
    }

    const relatedBooks = (book.relatedBooks || []).map(id => getBookById(id)).filter(Boolean);

    return (
        <main className="relative min-h-screen bg-slate-950 overflow-hidden">

            {/* 배경 그라데이션 + 텍스처 */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-red-950/20 via-slate-950 to-slate-950"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-red-900/5 rounded-full blur-3xl"></div>
                {/* 먼지 파티클 */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[...Array(15)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full bg-amber-200/10 animate-pulse"
                            style={{
                                width: Math.random() * 2 + 1 + 'px',
                                height: Math.random() * 2 + 1 + 'px',
                                left: Math.random() * 100 + '%',
                                top: Math.random() * 60 + '%',
                                animationDelay: Math.random() * 5 + 's',
                                animationDuration: Math.random() * 4 + 3 + 's',
                            }}
                        ></div>
                    ))}
                </div>
            </div>

            {/* 콘텐츠 */}
            <div className="relative z-10 max-w-4xl mx-auto px-5 md:px-10 py-12">

                {/* 뒤로가기 네비게이션 */}
                <Link to="/" className="inline-flex items-center gap-2 text-stone-500 hover:text-amber-400 
                                transition-colors duration-300 mb-10 group">
                    <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="text-sm tracking-wide">서재로 돌아가기</span>
                </Link>

                {/* ── 히어로 섹션 ── */}
                <div className="flex flex-col md:flex-row gap-8 md:gap-12 mb-16">

                    {/* 책 3D 표지 */}
                    <div className="flex-shrink-0 flex justify-center md:justify-start">
                        <div className="relative group" style={{ perspective: '800px' }}>
                            {(() => {
                                // 표지 색상 매핑
                                const colorMap = {
                                    red: { bg: 'from-red-800 to-red-950', border: 'border-red-950', side: 'from-red-900 to-red-950', text: 'text-red-200/60' },
                                    blue: { bg: 'from-blue-800 to-blue-950', border: 'border-blue-950', side: 'from-blue-900 to-blue-950', text: 'text-blue-200/60' },
                                    slate: { bg: 'from-slate-700 to-slate-900', border: 'border-slate-900', side: 'from-slate-800 to-slate-900', text: 'text-slate-200/60' },
                                    green: { bg: 'from-green-800 to-green-950', border: 'border-green-950', side: 'from-green-900 to-green-950', text: 'text-green-200/60' },
                                    amber: { bg: 'from-amber-700 to-amber-900', border: 'border-amber-900', side: 'from-amber-800 to-amber-900', text: 'text-amber-200/60' },
                                    indigo: { bg: 'from-indigo-800 to-indigo-950', border: 'border-indigo-950', side: 'from-indigo-900 to-indigo-950', text: 'text-indigo-200/60' },
                                    rose: { bg: 'from-rose-800 to-rose-950', border: 'border-rose-950', side: 'from-rose-900 to-rose-950', text: 'text-rose-200/60' },
                                    yellow: { bg: 'from-yellow-700 to-yellow-900', border: 'border-yellow-900', side: 'from-yellow-800 to-yellow-900', text: 'text-yellow-200/60' },
                                    stone: { bg: 'from-stone-600 to-stone-800', border: 'border-stone-800', side: 'from-stone-700 to-stone-800', text: 'text-stone-200/60' },
                                    teal: { bg: 'from-teal-800 to-teal-950', border: 'border-teal-950', side: 'from-teal-900 to-teal-950', text: 'text-teal-200/60' },
                                    emerald: { bg: 'from-emerald-700 to-emerald-900', border: 'border-emerald-900', side: 'from-emerald-800 to-emerald-900', text: 'text-emerald-200/60' },
                                    violet: { bg: 'from-violet-700 to-violet-900', border: 'border-violet-900', side: 'from-violet-800 to-violet-900', text: 'text-violet-200/60' },
                                };
                                const c = colorMap[book.accent] || colorMap.red;

                                // 특별 표지 설정
                                const specialCovers = {
                                    'institutes-of-christian-religion': {
                                        lines: ['기독교', '강요'],
                                        subtitle: 'INSTITUTIO\nCHRISTIANAE\nRELIGIONIS',
                                        label: 'Theology',
                                        authorLabel: 'JEAN CALVIN',
                                    },
                                    'systematic-theology': {
                                        lines: ['개혁', '교의학'],
                                        subtitle: 'GEREFORMEERDE\nDOGMATIEK',
                                        label: 'Reformed Dogmatics',
                                        authorLabel: 'HERMAN BAVINCK',
                                    },
                                };
                                const special = specialCovers[book.slug];
                                const titleLines = special ? special.lines : book.title.length <= 4
                                    ? [book.title]
                                    : [book.title.slice(0, Math.ceil(book.title.length / 2)), book.title.slice(Math.ceil(book.title.length / 2))];
                                const subtitleText = special ? special.subtitle : (book.titleEn || '');
                                const labelText = special ? special.label : (book.category || '');
                                const authorLabel = special ? special.authorLabel : (book.author ? book.author.split('(')[0].trim() : '');

                                return (
                                    <>
                                        <div className={`relative w-48 h-72 md:w-56 md:h-80 rounded-r-md rounded-l-sm overflow-hidden
                                         bg-gradient-to-br ${c.bg}
                                         shadow-[8px_8px_40px_rgba(0,0,0,0.6),-4px_0_20px_rgba(0,0,0,0.3)]
                                         transition-transform duration-700 group-hover:rotate-y-[-5deg]
                                         border-l-[6px] ${c.border}`}>
                                            {/* 표지 내용 */}
                                            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                                                <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent mb-4"></div>
                                                <span className="text-amber-300/60 text-[10px] tracking-[0.3em] uppercase mb-3">{labelText}</span>

                                                <h2 className="text-white font-serif text-2xl font-bold leading-tight mb-2">
                                                    {titleLines.map((line, i) => (
                                                        <React.Fragment key={i}>{i > 0 && <br />}{line}</React.Fragment>
                                                    ))}
                                                </h2>

                                                <div className="w-12 h-[1px] bg-white/20 my-3"></div>

                                                <p className={`${c.text} text-[10px] tracking-wider`}>
                                                    {subtitleText.split('\n').map((line, i) => (
                                                        <React.Fragment key={i}>{i > 0 && <br />}{line}</React.Fragment>
                                                    ))}
                                                </p>

                                                <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent mt-4"></div>

                                                {authorLabel && (
                                                    <p className="text-amber-200/50 text-[9px] mt-3 tracking-widest">{authorLabel}</p>
                                                )}
                                            </div>

                                            {/* 표지 텍스처 오버레이 */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-black/10"></div>
                                            <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/20"></div>
                                        </div>
                                        {/* 책 옆면 */}
                                        <div className={`absolute top-0 -right-2 w-2 h-full bg-gradient-to-b ${c.side} rounded-r-sm shadow-lg`}></div>
                                    </>
                                );
                            })()}
                        </div>
                    </div>

                    {/* 책 메타 정보 */}
                    <div className="flex-1 min-w-0">
                        <div className="mb-2">
                            <span className="inline-block px-2 py-0.5 bg-red-900/30 border border-red-800/30 
                             text-red-300 text-[10px] rounded tracking-wider uppercase">
                                {book.category}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-1 leading-tight">
                            {book.title}
                        </h1>
                        <p className="text-stone-500 text-sm mb-5 italic">{book.titleEn}</p>

                        {book.rating && <div className="mb-4"><StarRating rating={book.rating} /></div>}

                        <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm mb-6">
                            {book.author && (
                                <>
                                    <dt className="text-stone-500">저자</dt>
                                    <dd className="text-stone-200">{book.author}</dd>
                                </>
                            )}
                            {book.authorLife && (
                                <>
                                    <dt className="text-stone-500">생몰년</dt>
                                    <dd className="text-stone-200">{book.authorLife}</dd>
                                </>
                            )}
                            {book.year && (
                                <>
                                    <dt className="text-stone-500">출판</dt>
                                    <dd className="text-stone-200">{book.year}</dd>
                                </>
                            )}
                            {book.pages && (
                                <>
                                    <dt className="text-stone-500">분량</dt>
                                    <dd className="text-stone-200">{book.pages}</dd>
                                </>
                            )}
                            {book.publisher && (
                                <>
                                    <dt className="text-stone-500">출판사</dt>
                                    <dd className="text-stone-200">{book.publisher}</dd>
                                </>
                            )}
                        </dl>

                        {/* 태그 */}
                        {book.tags && (
                            <div className="flex flex-wrap gap-2">
                                {book.tags.map(tag => <TagBadge key={tag} tag={tag} />)}
                            </div>
                        )}

                        {/* 외부 링크 (단일) */}
                        {book.externalLink && (
                            <div className="mt-6">
                                <a href={book.externalLink} target="_blank" rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 
                                          bg-gradient-to-r from-violet-900/60 to-violet-800/40 
                                          border border-violet-600/30 hover:border-violet-400/50
                                          text-violet-200 hover:text-white text-sm rounded-lg
                                          transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-900/30">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                    {book.category === '교회' ? '카페 바로가기' : '블로그에서 서평 보기'}
                                </a>
                            </div>
                        )}

                        {/* 외부 링크 (다중) - 기독교 윤리학 등 */}
                        {book.externalLinks && book.externalLinks.length > 0 && (
                            <div className="mt-6 flex flex-col gap-3">
                                {book.externalLinks.map((link, i) => (
                                    <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
                                        className="inline-flex w-fit items-center gap-2 px-5 py-2.5 
                                              bg-gradient-to-r from-violet-900/60 to-violet-800/40 
                                              border border-violet-600/30 hover:border-violet-400/50
                                              text-violet-200 hover:text-white text-sm rounded-lg
                                              transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-900/30">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* ── 개요 ── */}
                {book.summary && (
                    <section className="mb-12">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-1 h-5 bg-red-700 rounded-full"></div>
                            <h3 className="text-white text-lg font-semibold">개요</h3>
                        </div>
                        <p className="text-stone-300 leading-relaxed text-sm md:text-base bg-stone-900/30 
                         border border-stone-800/30 rounded-lg p-6">
                            {book.summary}
                        </p>
                    </section>
                )}

                {/* ── 상세 설명 ── */}
                {book.description && (
                    <section className="mb-12">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-1 h-5 bg-red-700 rounded-full"></div>
                            <h3 className="text-white text-lg font-semibold">상세 내용</h3>
                        </div>
                        <div className="space-y-4">
                            {book.description.split('\n\n').map((paragraph, i) => (
                                <p key={i} className="text-stone-400 leading-relaxed text-sm md:text-base">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </section>
                )}

                {/* ── 목차 (권별 구성) ── */}
                {book.chapters && book.chapters.length > 0 && (
                    <section className="mb-12">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-1 h-5 bg-red-700 rounded-full"></div>
                            <h3 className="text-white text-lg font-semibold">권별 구성</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {book.chapters.map((chapter, i) => (
                                <ChapterCard key={i} chapter={chapter} index={i} />
                            ))}
                        </div>
                    </section>
                )}

                {/* ── 명언 / 인용구 ── */}
                {book.quotes && book.quotes.length > 0 && (
                    <section className="mb-12">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-1 h-5 bg-amber-600 rounded-full"></div>
                            <h3 className="text-white text-lg font-semibold">주요 인용구</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {book.quotes.map((quote, i) => (
                                <QuoteCard key={i} quote={quote} index={i} />
                            ))}
                        </div>
                    </section>
                )}

                {/* ── 관련 도서 ── */}
                {relatedBooks.length > 0 && (
                    <section className="mb-12">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-1 h-5 bg-stone-600 rounded-full"></div>
                            <h3 className="text-white text-lg font-semibold">관련 도서</h3>
                        </div>
                        <div className="flex gap-3 overflow-x-auto pb-2">
                            {relatedBooks.map(rb => (
                                <Link key={rb.id} to={`/book/${rb.slug}`}
                                    className="flex-shrink-0 group">
                                    <div className={`w-16 h-24 rounded-sm bg-gradient-to-br ${rb.spine} 
                                 shadow-lg border-r border-black/20
                                 flex items-center justify-center
                                 group-hover:-translate-y-2 group-hover:shadow-xl
                                 transition-all duration-300`}>
                                        <span className="[writing-mode:vertical-rl] text-white text-[9px] font-medium 
                                    opacity-70 group-hover:opacity-100 select-none">
                                            {rb.title}
                                        </span>
                                    </div>
                                    <p className="text-stone-500 text-[10px] text-center mt-2 group-hover:text-stone-300 
                              transition-colors max-w-[64px] truncate">
                                        {rb.title}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* 하단 네비게이션 */}
                <div className="border-t border-stone-800/50 pt-8 flex justify-center">
                    <Link to="/" className="group relative px-10 py-4 bg-stone-900/60 hover:bg-stone-800/80 
                                 text-white border border-stone-500/40 hover:border-amber-500/40
                                 backdrop-blur-xl transition-all duration-500 rounded-sm shadow-2xl
                                 overflow-hidden inline-flex items-center gap-3">
                        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="relative z-10 text-sm tracking-widest uppercase font-light">
                            서재로 돌아가기
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/10 to-amber-500/0 
                           translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    </Link>
                </div>
            </div>
        </main>
    );
}
