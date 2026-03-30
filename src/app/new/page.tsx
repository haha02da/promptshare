'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Send, Loader2 } from 'lucide-react';

export default function NewPrompt() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    body: '',
    category: 'General',
    author_name: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('prompts').insert([formData]);

    if (error) {
      alert('오류가 발생했습니다: ' + error.message);
    } else {
      router.push('/');
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">새 프롬프트 작성</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">프롬프트 제목</label>
          <input
            required
            type="text"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
            placeholder="예: 마케팅 카피라이팅 전문가 프롬프트"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">카테고리</label>
            <select
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="General">일반</option>
              <option value="Coding">코딩</option>
              <option value="Marketing">마케팅</option>
              <option value="Writing">작문</option>
              <option value="Design">디자인</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">작성자 명</label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
              placeholder="익명"
              value={formData.author_name}
              onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">짧은 설명</label>
          <textarea
            required
            rows={2}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none resize-none"
            placeholder="이 프롬프트가 어떤 문제를 해결하는지 간단히 설명해주세요."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">프롬프트 본문 (Markdown 지원)</label>
          <textarea
            required
            rows={10}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none font-mono text-sm"
            placeholder="전체 프롬프트 내용을 입력하세요..."
            value={formData.body}
            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
          />
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-200 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Send className="w-5 h-5" />
              공유하기
            </>
          )}
        </button>
      </form>
    </div>
  );
}
