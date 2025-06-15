import { motion } from 'framer-motion';
import { Button } from './Button';
import { useRouter } from 'next/navigation';

interface ResponseDisplayProps {
  prompt: string;
  response: string;
}

export function ResponseDisplay({ prompt, response }: ResponseDisplayProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1a1a1a] text-white p-4 @container">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-[960px] w-full flex flex-col gap-6"
      >
        <h1 className="text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl text-center">
          Your Legal Response
        </h1>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-neutral-800 border border-[#4d4d4d] rounded-xl p-6"
        >
          <h2 className="text-lg font-bold leading-tight">Prompt:</h2>
          <p className="text-[#adadad] text-base font-normal leading-normal mb-4">{prompt}</p>
          <h2 className="text-lg font-bold leading-tight">Response:</h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white text-base font-normal leading-normal"
          >
            {response}
          </motion.p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex justify-center"
        >
          <Button onClick={() => router.push('/')}>Back to Home</Button>
        </motion.div>
      </motion.div>
    </div>
  );
}