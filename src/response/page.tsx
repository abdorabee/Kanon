import { ResponseDisplay } from "@/app/components/ui/ResponseDisplay";
import { DocumentWithIssues } from "@/app/lib/types";

export default function ResponsePage({ searchParams }: { searchParams: { prompt?: string; documents?: string } }) {
  const prompt = searchParams.prompt || 'No prompt provided';
  const documents: DocumentWithIssues[] = searchParams.documents
    ? JSON.parse(atob(searchParams.documents))
    : [];

  return <ResponseDisplay prompt={prompt} documents={documents} />;
}