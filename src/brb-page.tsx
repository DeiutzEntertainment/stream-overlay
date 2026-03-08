import {Coffee, MessageSquareMore} from 'lucide-react';
import {motion} from 'motion/react';
import {OverlayCard, OverlayProgress, OverlayShell} from './overlay-shell';

export default function BrbPage() {
  return (
    <OverlayShell
      channelName="JDeiutz"
      statusLabel="Quick Break"
      statusIcon={Coffee}
      tone="amber"
      title="BE RIGHT"
      subtitle="BACK"
      centerContent={
        <motion.div
          initial={{opacity: 0, y: 16}}
          animate={{opacity: 1, y: 0}}
          transition={{delay: 0.25}}
          className="mx-auto max-w-2xl rounded-2xl border border-amber-400/20 bg-black/20 px-8 py-6"
        >
          <p className="text-xl uppercase tracking-[0.35em] text-amber-200/90">Quick reset. Back in a moment.</p>
        </motion.div>
      }
      footer={
        <OverlayCard title="Intermission" tone="amber">
          <div className="flex items-center justify-end gap-2 text-amber-300">
            <MessageSquareMore className="h-4 w-4" />
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">Discord Command</p>
          </div>
          <OverlayProgress tone="amber" label="Need the community link while you wait?" current="Use !discord in chat" percent={100} />
        </OverlayCard>
      }
    />
  );
}