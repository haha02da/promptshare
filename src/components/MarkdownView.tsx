import ReactMarkdown from 'react-markdown';

interface MarkdownViewProps {
  content: string;
}

export default function MarkdownView({ content }: MarkdownViewProps) {
  return (
    <div className="prose prose-indigo max-w-none prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
