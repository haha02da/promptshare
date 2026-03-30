import Link from 'next/link';
import { Terminal } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Terminal className="w-8 h-8 text-indigo-600" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Prompt Share
            </span>
          </Link>
          <Link
            href="/new"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm"
          >
            프롬프트 공유하기
          </Link>
        </div>
      </div>
    </nav>
  );
}
