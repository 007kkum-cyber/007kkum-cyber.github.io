import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createClient } from '@supabase/supabase-js';

// Supabase 클라이언트 초기화
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function WriteStoryPage() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState(''); // HTML string
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            // 미리보기 URL 생성
            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);
        }
    };

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);

        let imageUrl = null;

        try {
            // 1. 이미지 업로드 (이미지가 있는 경우)
            if (imageFile) {
                const fileExt = imageFile.name.split('.').pop();
                const fileName = `${Date.now()}.${fileExt}`;
                const filePath = `${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('story-images')
                    .upload(filePath, imageFile);

                if (uploadError) {
                    throw uploadError;
                }

                // 2. 이미지 Public URL 가져오기
                const { data } = supabase.storage
                    .from('story-images')
                    .getPublicUrl(filePath);

                imageUrl = data.publicUrl;
            }

            // 3. 데이터베이스 저장
            const data = {
                title: title,
                content: content, // HTML content
                imageUrl: imageUrl,
            };

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
            alert(`오류가 발생했습니다: ${error.message}`);
        } finally {
            setLoading(false);
        }
    }

    // ReactQuill 툴바 설정
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link'],
            ['clean']
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link'
    ];

    return (
        <main className="min-h-screen bg-slate-950 text-stone-200 flex items-center justify-center p-6 md:p-12 relative">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-3xl"></div>
            </div>

            <div className="w-full max-w-4xl relative z-10">
                <div className="mb-10 text-center">
                    <h1 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2">오늘의 이야기를 기록하세요</h1>
                    <p className="text-stone-500 text-sm font-light">당신의 생각과 마음을 자유롭게 남겨주세요.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 bg-stone-900/30 backdrop-blur-md p-8 md:p-10 rounded-2xl border border-stone-800/50 shadow-2xl">

                    {/* 제목 입력 */}
                    <div className="space-y-2">
                        <label htmlFor="title" className="block text-xs font-mono text-stone-500 uppercase tracking-widest pl-1">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            placeholder="제목을 입력하세요"
                            className="w-full text-xl md:text-2xl p-4 bg-transparent border-b border-stone-700 focus:border-amber-500 
                                     text-white placeholder-stone-600 focus:outline-none transition-colors font-serif"
                        />
                    </div>

                    {/* 커버 이미지 업로드 */}
                    <div className="space-y-2">
                        <label className="block text-xs font-mono text-stone-500 uppercase tracking-widest pl-1">Cover Image</label>
                        <div className="flex items-center gap-6">
                            <label className="cursor-pointer px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-lg border border-stone-700 transition-colors text-sm flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                </svg>
                                이미지 선택
                                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                            </label>
                            {previewUrl && (
                                <div className="relative group">
                                    <img src={previewUrl} alt="Preview" className="h-20 w-32 object-cover rounded-lg border border-stone-700" />
                                    <button
                                        type="button"
                                        onClick={() => { setImageFile(null); setPreviewUrl(null); }}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 에디터 (ReactQuill) */}
                    <div className="space-y-2">
                        <label className="block text-xs font-mono text-stone-500 uppercase tracking-widest pl-1">Story Content</label>
                        <div className="bg-stone-50 text-stone-900 rounded-lg overflow-hidden">
                            <ReactQuill
                                theme="snow"
                                value={content}
                                onChange={setContent}
                                modules={modules}
                                formats={formats}
                                placeholder="여기에 마음껏 적어보세요..."
                                className="h-80"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-12">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="px-6 py-2.5 text-stone-500 hover:text-white transition-colors text-sm"
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            disabled={loading || !title || !content}
                            className={`px-8 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-medium rounded-lg 
                                      shadow-lg hover:shadow-amber-500/20 transition-all duration-300 transform hover:-translate-y-0.5
                                      disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0
                                      ${loading ? 'animate-pulse' : ''}`}
                        >
                            {loading ? '발행 중...' : '발행하기'}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}
