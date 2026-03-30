import { supabase } from '@/lib/supabase';
import PromptCard from '@/components/PromptCard';
import { Search } from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getPrompts() {
  const { data, error } = await supabase
    .from('prompts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return [];
  return data;
}

export default async function Home() {
  const prompts = await getPrompts();

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
          프롬프트의 힘을 공유하세요
        </h1>
        <p className="text-lg text-gray-600">
          최고의 결과물을 만드는 프롬프트 엔지니어링 커뮤니티입니다.
        </p>
        
        <div className="relative mt-8 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
          <input
            type="text"
            placeholder="프롬프트 제목, 카테고리 검색..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white shadow-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-12">
        {prompts.map((prompt) => (
          <PromptCard key={prompt.id} prompt={prompt} />
        ))}
      </div>

      {prompts.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          아직 등록된 프롬프트가 없습니다. 첫 번째 프롬프트를 공유해보세요!
        </div>
      )}
    </div>
  );
}
