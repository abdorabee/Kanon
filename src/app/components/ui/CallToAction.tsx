import { Button } from './Button';
import useTranslation from 'next-translate/useTranslation';

export function CallToAction() {
  const { t } = useTranslation('common');
  
  return (
    <div className="flex flex-col justify-end gap-6 px-4 py-10 @container @[480px]:gap-8 @[480px]:px-10 @[480px]:py-20">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-white text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:tracking-[-0.033em] max-w-[720px] mx-auto">
          {t('callToAction.title')}
        </h1>
        <p className="text-white text-base font-normal leading-normal max-w-[720px] mx-auto">
          {t('callToAction.description')}
        </p>
      </div>
      <div className="flex flex-1 justify-center">
        <Button translationKey="button.getStarted" />
      </div>
    </div>
  );
}