import {MessageSquareMore, MoonStar} from 'lucide-react';
import {motion} from 'motion/react';
import {OverlayCard, OverlayShell} from './overlay-shell';

export default function EndingPage() {
  return (
    <OverlayShell
      channelName="JDeiutz"
      statusLabel="Stream Complete"
      statusIcon={MoonStar}
      tone="rose"
      title="THANKS FOR"
      subtitle="WATCHING"
      centerContent={
        <motion.div
          initial={{opacity: 0, y: 14}}
          animate={{opacity: 1, y: 0}}
          transition={{delay: 0.2}}
          className="mx-auto max-w-2xl rounded-3xl border border-rose-400/20 bg-rose-950/15 px-8 py-8"
        >
          <p className="mt-3 font-orbitron text-4xl font-black text-white md:text-5xl">See You Next Time</p>
          <p className="mt-4 text-lg text-slate-300">Discord is the only social hub. Use <span className="font-mono text-rose-200">!discord</span> in chat for the invite.</p>
        </motion.div>
      }
      footer={
        <OverlayCard title="Stay Connected" tone="rose">
          <div className="flex items-center justify-end gap-2 text-rose-300">
            <MessageSquareMore className="h-4 w-4" />
            <p className="text-sm font-medium text-slate-300">Type <span className="font-mono text-rose-200">!discord</span> in chat.</p>
          </div>
        </OverlayCard>
      }
    />
  );
}