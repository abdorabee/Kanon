import { PromptInput } from './PromptInput';

export function Hero() {
  return (
    <div
      className="min-h-[480px] flex flex-col gap-6 bg-cover bg-center bg-no-repeat @container @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center p-4"
      style={{
        backgroundImage:
          'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url(/images/background.jpg)',
      }}
    >
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl">
          Revolutionize Your Legal Workflow with Kanon
        </h1>
        <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base">
          Kanon is an AI-powered legal assistant designed to streamline your legal research, document
          analysis, and case strategy. Experience the future of law with cutting-edge technology.
        </h2>
      </div>
      <PromptInput />
    </div>
  );
}