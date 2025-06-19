import { ResponseDisplay } from "@/app/components/ui/ResponseDisplay";
import { Issue } from '@/app/lib/types';

export default function ResponsePage({ searchParams }: { searchParams: { prompt?: string; issues?: string } }) {
  const prompt = searchParams.prompt || 'No prompt provided';
  const issues: Issue[] = searchParams.issues ? JSON.parse(decodeURIComponent(searchParams.issues)) : [];

  return <ResponseDisplay prompt={prompt} issues={issues} />;
}