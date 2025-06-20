import { ResponseDisplay } from "@/app/components/ui/ResponseDisplay";
import { Issue } from '@/app/lib/types';

interface SearchParams {
  prompt?: string;
  issues?: string;
}

interface Props {
  searchParams: Promise<SearchParams>;
}

export default async function ResponsePage({ searchParams }: Props) {
  const params = await searchParams;
  const prompt = params.prompt || 'No prompt provided';
  const issues: Issue[] = params.issues ? JSON.parse(decodeURIComponent(params.issues)) : [];

  return <ResponseDisplay prompt={prompt} issues={issues} />;
}
