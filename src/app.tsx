import {MessageSquareMore} from 'lucide-react';
import {useEffect, useState} from 'react';
import {OverlayCard, OverlayShell} from './overlay-shell';

const DEFAULT_START_TIME = '20:00';
const EEST_OFFSET_HOURS = 2;

function isValidTime(value: string) {
  return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
}

function getRequestedStartTime() {
  const params = new URLSearchParams(window.location.search);
  const time = params.get('time')?.trim() ?? '';
  return isValidTime(time) ? time : DEFAULT_START_TIME;
}

function getSecondsUntilEestTime(time: string, now = new Date()) {
  const [hours, minutes] = time.split(':').map(Number);
  const nowUtcMs = now.getTime();
  const eestNow = new Date(nowUtcMs + EEST_OFFSET_HOURS * 60 * 60 * 1000);

  let targetUtcMs = Date.UTC(
    eestNow.getUTCFullYear(),
    eestNow.getUTCMonth(),
    eestNow.getUTCDate(),
    hours - EEST_OFFSET_HOURS,
    minutes,
    0,
    0,
  );

  if (nowUtcMs >= targetUtcMs && nowUtcMs < targetUtcMs + 60 * 60 * 1000) {
    return 0;
  }

  if (targetUtcMs <= nowUtcMs) {
    targetUtcMs += 24 * 60 * 60 * 1000;
  }

  return Math.max(0, Math.floor((targetUtcMs - nowUtcMs) / 1000));
}

export default function App() {
  const [startTime] = useState(getRequestedStartTime);
  const [timeLeft, setTimeLeft] = useState(() => getSecondsUntilEestTime(getRequestedStartTime()));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getSecondsUntilEestTime(startTime));
    }, 1000);

    setTimeLeft(getSecondsUntilEestTime(startTime));

    return () => clearInterval(timer);
  }, [startTime]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return {
      hours: hours.toString().padStart(2, '0'),
      mins: mins.toString().padStart(2, '0'),
      secs: secs.toString().padStart(2, '0')
    };
  };

  const { hours, mins, secs } = formatTime(timeLeft);

  return (
    <OverlayShell
      channelName="JDeiutz"
      statusLabel="Live Status: Waiting"
      tone="cyan"
      title="STREAM STARTING"
      subtitle="SOON"
      centerContent={
        <div className="mt-12 space-y-6">
          <div className="flex items-start justify-center gap-4 md:gap-6">
            <div className="flex min-w-[6rem] flex-col items-center md:min-w-[7rem]">
              <span className="font-orbitron text-6xl font-bold leading-none tabular-nums text-white drop-shadow-lg md:text-7xl">
                {hours}
              </span>
              <span className="mt-2 text-xs font-bold uppercase tracking-[0.3em] text-cyan-400">Hours</span>
            </div>
            <div className="pt-0.5 md:pt-1">
              <div className="font-orbitron text-6xl font-bold leading-none text-cyan-500 animate-pulse md:text-7xl">:</div>
            </div>
            <div className="flex min-w-[6rem] flex-col items-center md:min-w-[7rem]">
              <span className="font-orbitron text-6xl font-bold leading-none tabular-nums text-white drop-shadow-lg md:text-7xl">
                {mins}
              </span>
              <span className="mt-2 text-xs font-bold uppercase tracking-[0.3em] text-cyan-400">Minutes</span>
            </div>
            <div className="pt-0.5 md:pt-1">
              <div className="font-orbitron text-6xl font-bold leading-none text-cyan-500 animate-pulse md:text-7xl">:</div>
            </div>
            <div className="flex min-w-[6rem] flex-col items-center md:min-w-[7rem]">
              <span className="font-orbitron text-6xl font-bold leading-none tabular-nums text-white drop-shadow-lg md:text-7xl">
                {secs}
              </span>
              <span className="mt-2 text-xs font-bold uppercase tracking-[0.3em] text-cyan-400">Seconds</span>
            </div>
          </div>
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-cyan-300">
            Starting at {startTime} EEST
          </p>
        </div>
      }
      footer={
        <OverlayCard title="Discord" tone="cyan">
          <div className="flex items-center justify-end gap-2 text-cyan-400">
            <MessageSquareMore className="h-4 w-4" />
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">Chat Command</p>
          </div>
          <p className="text-sm font-medium text-slate-300">Type <span className="font-mono text-cyan-300">!discord</span> in chat for the server link.</p>
        </OverlayCard>
      }
    />
  );
}
