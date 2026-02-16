import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function WriteStoryPage() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.currentTarget);
        const data = {
            title: formData.get('title'),
            content: formData.get('content'),
        };

        try {
            const response = await fetch('/api/stories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                navigate('/stories');
            } else {
                console.error('Failed to create story');
                alert('이야기를 저장하는 데 실패했습니다.');
            }
        } catch (error) {
            console.error('Error creating story:', error);
            alert('오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-slate-950 text-stone-200 flex items-center justify-center p-6 md:p-12 relative">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-3xl"></div>
            </div>

            <div className="w-full max-w-2xl relative z-10">
                <div className="mb-10 text-center">
                    <h1 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2">오늘의 이야기를 기록하세요</h1>
                    <p className="text-stone-500 text-sm font-light">당신의 생각과 마음을 자유롭게 남겨주세요.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 bg-stone-900/30 backdrop-blur-md p-8 md:p-10 rounded-2xl border border-stone-800/50 shadow-2xl">
                    <div className="space-y-2">
                        <label htmlFor="title" className="block text-xs font-mono text-stone-500 uppercase tracking-widest pl-1">Title</label>
                        <input
                            name="title"
                            id="title"
                            required
                            placeholder="제목을 입력하세요"
                            className="w-full text-xl md:text-2xl p-4 bg-transparent border-b border-stone-700 focus:border-amber-500 
                                     text-white placeholder-stone-600 focus:outline-none transition-colors font-serif"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="content" className="block text-xs font-mono text-stone-500 uppercase tracking-widest pl-1">Story</label>
                        <textarea
                            name="content"
                            id="content"
                            required
                            placeholder="여기에 마음껏 적어보세요..."
                            className="w-full h-80 p-4 bg-stone-950/50 border border-stone-800 rounded-lg 
                                     focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 outline-none resize-none 
                                     text-stone-300 placeholder-stone-700 leading-relaxed font-light transition-all"
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="px-6 py-2.5 text-stone-500 hover:text-white transition-colors text-sm"
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`px-8 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-medium rounded-lg 
                                      shadow-lg hover:shadow-amber-500/20 transition-all duration-300 transform hover:-translate-y-0.5
                                      disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0
                                      ${loading ? 'animate-pulse' : ''}`}
                        >
                            {loading ? '저장 중...' : '발행하기'}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}
