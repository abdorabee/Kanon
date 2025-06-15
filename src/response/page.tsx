import { ResponseDisplay } from "@/app/components/ui/ResponseDisplay";

export default function ResponsePage({ searchParams }: { searchParams: { prompt?: string; response?: string } }) {
  const prompt = searchParams.prompt || 'No prompt provided';
  const response = searchParams.response || 'No response available';

  return <ResponseDisplay prompt={prompt} response={response} />;
}