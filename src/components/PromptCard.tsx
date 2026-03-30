import Link from 'next/link';
import { Bookmark, Clock } from 'lucide-react';

interface PromptCardProps {
  prompt: {
    id: string;
    title: string;
    description: string;
    category: string;
    created_at: string;
    author_name: string;
  };
}

export default function PromptCard({ prompt }: PromptCardProps) {
  const formattedDate = new Date(prompt.created_at).toLocaleDateString();

  return (
    <div className="group bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all">
      <div className="flex justify-between items-start mb-4">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">
          {prompt.category}
        </span>
        <button className="text-gray-400 hover:text-indigo-600 transition-colors">
          <Bookmark className="w-5 h-5" />
        </button>
      </div>
      <Link href={`/prompt/${prompt.id}`}>
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors mb-2">
          {prompt.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-3 mb-6">
          {prompt.description}
        </p>
      </Link>
      <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
        <span className="text-sm font-medium text-gray-500">{prompt.author_name}</span>
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <Clock className="w-3 h-3" />
          <span>{formattedDate}</span>
        </div>
      </div>
    </div>
  );
}
