import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function StoryListPage() {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStories() {
            try {
                const response = await fetch('/api/stories');
                if (response.ok) {
                    const data = await response.json();
                    setStories(data);
                } else {
                    console.error('Failed to fetch stories');
                }
            } catch (error) {
                console.error('Error fetching stories:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchStories();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center text-stone-400">
                L o a d i n g . . .
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-slate-950 text-stone-200 p-6 md:p-12 relative overflow-hidden">
            {/* 배경 효과 */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 opacity-80"></div>
                <div className="absolute top-10 left-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto">
                <div className="flex justify-between items-end mb-12 border-b border-stone-800 pb-6">
                    <div>
                        <Link to="/" className="text-stone-500 hover:text-amber-400 text-sm mb-4 inline-block transition-colors">
                            ← 서재로 돌아가기
                        </Link>
                        <h1 className="text-3xl md:text-4xl font-serif font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                            기록된 이야기들
                        </h1>
                    </div>
                    <Link to="/stories/write"
                        className="px-5 py-2.5 bg-stone-100 text-stone-900 text-sm font-medium rounded hover:bg-amber-400 hover:text-stone-950 transition-all duration-300 shadow-lg hover:shadow-amber-400/20">
                        새 이야기 쓰기
                    </Link>
                </div>

                <div className="grid gap-6">
                    {stories.map((story) => (
                        <article key={story.id} className="group relative p-8 bg-stone-900/40 backdrop-blur-sm border border-stone-800/60 rounded-xl hover:border-amber-500/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">
                            <h2 className="text-xl md:text-2xl font-serif font-bold mb-3 text-stone-100 group-hover:text-amber-200 transition-colors">
                                {story.title}
                            </h2>
                            <p className="text-stone-400 leading-relaxed mb-4 line-clamp-3 font-light text-sm md:text-base">
                                {story.content}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-stone-600 font-mono">
                                <span>{new Date(story.createdAt).toLocaleDateString()}</span>
                                <div className="h-[1px] flex-1 bg-stone-800"></div>
                            </div>
                        </article>
                    ))}
                    {stories.length === 0 && (
                        <div className="text-center py-32 border border-dashed border-stone-800 rounded-xl bg-stone-900/20">
                            <p className="text-stone-500 font-light">아직 들려주신 이야기가 없네요.</p>
                            <Link to="/stories/write" className="text-amber-500/70 hover:text-amber-400 text-sm mt-4 inline-block underline underline-offset-4">
                                첫 번째 이야기를 기록해보세요
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
