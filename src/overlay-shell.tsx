import type {LucideIcon} from 'lucide-react';
import {Activity} from 'lucide-react';
import {motion} from 'motion/react';
import type {ReactNode} from 'react';

type ToneName = 'cyan' | 'amber' | 'rose' | 'emerald';

type Tone = {
  accentText: string;
  accentBorder: string;
  accentPanel: string;
  accentSoftText: string;
  cornerBorder: string;
  titleGradient: string;
  progressGradient: string;
  primaryGlow: string;
  secondaryGlow: string;
};

const tones: Record<ToneName, Tone> = {
  cyan: {
    accentText: 'text-cyan-400',
    accentBorder: 'border-cyan-500/40',
    accentPanel: 'bg-cyan-950/50 border-cyan-500/50',
    accentSoftText: 'text-cyan-100',
    cornerBorder: 'border-cyan-500/40',
    titleGradient: 'from-cyan-400 to-sky-500',
    progressGradient: 'from-cyan-500 to-sky-400',
    primaryGlow: '0 0 24px rgba(34, 211, 238, 0.55)',
    secondaryGlow: '0 0 42px rgba(56, 189, 248, 0.45)',
  },
  amber: {
    accentText: 'text-amber-300',
    accentBorder: 'border-amber-400/40',
    accentPanel: 'bg-amber-950/40 border-amber-400/50',
    accentSoftText: 'text-amber-100',
    cornerBorder: 'border-amber-400/40',
    titleGradient: 'from-amber-300 to-orange-500',
    progressGradient: 'from-amber-400 to-orange-500',
    primaryGlow: '0 0 24px rgba(252, 211, 77, 0.55)',
    secondaryGlow: '0 0 42px rgba(249, 115, 22, 0.45)',
  },
  rose: {
    accentText: 'text-rose-300',
    accentBorder: 'border-rose-400/40',
    accentPanel: 'bg-rose-950/40 border-rose-400/50',
    accentSoftText: 'text-rose-100',
    cornerBorder: 'border-rose-400/40',
    titleGradient: 'from-rose-300 to-pink-500',
    progressGradient: 'from-rose-400 to-pink-500',
    primaryGlow: '0 0 24px rgba(253, 164, 175, 0.55)',
    secondaryGlow: '0 0 42px rgba(236, 72, 153, 0.45)',
  },
  emerald: {
    accentText: 'text-emerald-300',
    accentBorder: 'border-emerald-400/40',
    accentPanel: 'bg-emerald-950/40 border-emerald-400/50',
    accentSoftText: 'text-emerald-100',
    cornerBorder: 'border-emerald-400/40',
    titleGradient: 'from-emerald-300 to-lime-400',
    progressGradient: 'from-emerald-400 to-lime-400',
    primaryGlow: '0 0 24px rgba(110, 231, 183, 0.55)',
    secondaryGlow: '0 0 42px rgba(163, 230, 53, 0.45)',
  },
};

type OverlayShellProps = {
  channelName: string;
  statusLabel: string;
  statusIcon?: LucideIcon;
  tone: ToneName;
  title: string;
  subtitle: string;
  centerContent?: ReactNode;
  footer?: ReactNode;
};

function Badge({icon: Icon, text, className, textClassName}: {icon: LucideIcon; text: string; className: string; textClassName: string}) {
  return (
    <div className={`flex items-center gap-1.5 rounded-sm border px-3 py-1 ${className}`}>
      <Icon className={`h-3 w-3 ${textClassName}`} />
      <span className={`text-[10px] font-bold uppercase tracking-widest ${textClassName}`}>{text}</span>
    </div>
  );
}

export function OverlayCard({title, tone, children}: {title: string; tone: ToneName; children: ReactNode}) {
  const theme = tones[tone];

  return (
    <motion.div
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      className="w-full max-w-sm space-y-3 text-right"
    >
      <h3 className={`font-orbitron text-lg font-bold uppercase tracking-widest ${theme.accentText}`}>{title}</h3>
      <div className="space-y-2">{children}</div>
    </motion.div>
  );
}

export function OverlayProgress({tone, label, current, percent}: {tone: ToneName; label: string; current: string; percent: number}) {
  const theme = tones[tone];

  return (
    <div className="space-y-1">
      <p className="text-sm font-medium text-slate-300">{label}</p>
      <div className="relative h-2.5 w-full overflow-hidden rounded-full border border-white/5 bg-slate-900">
        <motion.div
          initial={{width: 0}}
          animate={{width: `${percent}%`}}
          transition={{duration: 1.8, delay: 0.3}}
          className={`absolute left-0 top-0 h-full bg-gradient-to-r ${theme.progressGradient}`}
        />
      </div>
      <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-tighter">
        <span className="text-slate-500">Progress</span>
        <span className={theme.accentText}>{current}</span>
      </div>
    </div>
  );
}

export function OverlayShell({
  channelName,
  statusLabel,
  statusIcon = Activity,
  tone,
  title,
  subtitle,
  centerContent,
  footer,
}: OverlayShellProps) {
  const theme = tones[tone];

  return (
    <div className="scanline relative h-screen w-screen overflow-hidden bg-slate-950 font-rajdhani">
      <div className="grid-bg absolute inset-0 opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,23,42,0)_0%,rgba(2,6,23,0.86)_100%)]" />
      <div className={`absolute left-8 top-8 h-32 w-32 rounded-tl-2xl border-l-2 border-t-2 ${theme.cornerBorder}`} />
      <div className="absolute right-8 top-8 h-32 w-32 rounded-tr-2xl border-r-2 border-t-2 border-fuchsia-500/30" />
      <div className="absolute bottom-8 left-8 h-32 w-32 rounded-bl-2xl border-b-2 border-l-2 border-fuchsia-500/30" />
      <div className={`absolute bottom-8 right-8 h-32 w-32 rounded-br-2xl border-b-2 border-r-2 ${theme.cornerBorder}`} />

      <main className="relative z-10 flex h-full w-full flex-col justify-between p-12 md:p-20">
        <header className="flex items-start justify-between gap-6">
          <motion.div initial={{opacity: 0, x: -20}} animate={{opacity: 1, x: 0}} className="space-y-2">
            <h2 className={`bg-gradient-to-r ${theme.titleGradient} bg-clip-text font-orbitron text-4xl font-black tracking-widest text-transparent`}>
              {channelName}
            </h2>
            <div className="flex flex-wrap gap-3">
              <Badge
                icon={statusIcon}
                text={statusLabel}
                className={theme.accentPanel}
                textClassName={theme.accentSoftText}
              />
            </div>
          </motion.div>
        </header>

        <section className="flex flex-grow flex-col items-center justify-center">
          <motion.div
            initial={{opacity: 0, scale: 0.94}}
            animate={{opacity: 1, scale: 1}}
            transition={{duration: 0.8, ease: 'easeOut'}}
            className="space-y-8 text-center"
          >
            <div className="relative">
              <motion.h1
                animate={{textShadow: [theme.primaryGlow, theme.secondaryGlow, theme.primaryGlow]}}
                transition={{duration: 4, repeat: Infinity}}
                className="font-orbitron text-6xl font-black italic tracking-tight text-white md:text-8xl"
              >
                {title}
              </motion.h1>
              <motion.h2
                initial={{opacity: 0, y: 10}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.2}}
                className={`bg-gradient-to-b ${theme.titleGradient} bg-clip-text font-orbitron text-4xl font-black italic tracking-tight text-transparent opacity-90 md:text-6xl`}
              >
                {subtitle}
              </motion.h2>
              <div className={`absolute -bottom-4 left-0 h-0.5 w-full bg-gradient-to-r from-transparent ${theme.accentBorder.replace('border-', 'via-')} to-transparent`} />
            </div>

            {centerContent}
          </motion.div>
        </section>

        <footer className="flex justify-end">{footer}</footer>
      </main>
    </div>
  );
}