import { Button } from './Button';

export function CallToAction() {
  return (
    <div className="flex flex-col justify-end gap-6 px-4 py-10 @container @[480px]:gap-8 @[480px]:px-10 @[480px]:py-20">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-[#333333] text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:tracking-[-0.033em] max-w-[720px] mx-auto">
          Ready to Transform Your Legal Practice?
        </h1>
        <p className="text-[#333333] text-base font-normal leading-normal max-w-[720px] mx-auto">
          Join thousands of legal professionals who are already leveraging Kanon to enhance their
          productivity and achieve better outcomes.
        </p>
      </div>
      <div className="flex flex-1 justify-center">
        <Button>Get started</Button>
      </div>
    </div>
  );
}