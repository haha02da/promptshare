import { supabase } from '@/lib/supabase';
import MarkdownView from '@/components/MarkdownView';
import { Copy, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

interface PromptDetailProps {
  params: { id: string };
}

async function getPrompt(id: string) {
  const { data, error } = await supabase
    .from('prompts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return null;
  return data;
}

export default async function PromptDetail({ params }: PromptDetailProps) {
  const prompt = await getPrompt(params.id);

  if (!prompt) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">프롬프트를 찾을 수 없습니다.</h2>
        <Link href="/" className="text-indigo-600 mt-4 inline-block underline">
          홈으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        href="/"
        className="flex items-center gap-1 text-gray-500 hover:text-indigo-600 transition-colors mb-8 group"
      >
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        목록으로 돌아가기
      </Link>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 sm:p-12">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700">
              {prompt.category}
            </span>
            <span className="text-sm text-gray-400">
              {new Date(prompt.created_at).toLocaleDateString()}
            </span>
          </div>

          <h1 className="text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
            {prompt.title}
          </h1>

          <p className="text-xl text-gray-600 mb-12 border-l-4 border-indigo-200 pl-6 py-2 italic">
            {prompt.description}
          </p>

          <div className="relative group">
            <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-black transition-colors"
              >
                <Copy className="w-4 h-4" />
                복사하기
              </button>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <MarkdownView content={prompt.body} />
            </div>
          </div>

          <div className="mt-12 flex items-center justify-between py-6 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500" />
              <div>
                <p className="text-sm font-bold text-gray-900">{prompt.author_name}</p>
                <p className="text-xs text-gray-400">프롬프트 엔지니어</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
