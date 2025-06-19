import { ResponseDisplay } from "@/app/components/ui/ResponseDisplay";
import { Issue } from '@/app/lib/types';

export default async function ResponsePage({ searchParams }: { searchParams: Promise<{ prompt?: string; issues?: string }> }) {
  const params = await searchParams;
  const prompt = params.prompt || 'No prompt provided';
  const issues: Issue[] = params.issues ? JSON.parse(decodeURIComponent(params.issues)) : [];

  return <ResponseDisplay prompt={prompt} issues={issues} />;
}
