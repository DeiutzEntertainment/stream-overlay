import {useState} from 'react';

const DEFAULT_START_TIME = '20:00';

export default function NavPage() {
  const [startTime, setStartTime] = useState(DEFAULT_START_TIME);

  const pages = [
    {
      href: '/brb.html',
      title: 'BRB',
      description: 'Quick break scene with the Discord chat instruction.',
    },
    {
      href: '/ending.html',
      title: 'Ending',
      description: 'Closing scene with the next-stream reminder and Discord callout.',
    },
  ];

  const startingHref = `/starting.html?time=${encodeURIComponent(startTime)}`;

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(244,114,182,0.14),transparent_30%)]" />
      <div className="absolute inset-0 grid-bg opacity-20" />

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 py-16 md:px-10">
        <div className="max-w-3xl space-y-5">
          <p className="text-sm font-bold uppercase tracking-[0.45em] text-cyan-300">JDeiutz Overlay Control</p>
          <h1 className="font-orbitron text-5xl font-black uppercase tracking-tight text-white md:text-7xl">
            Scene Launcher
          </h1>
          <p className="max-w-2xl text-lg text-slate-300">
            Use this page as a quick launcher for the active overlay scenes. Viewer-facing social copy stays as the chat command <span className="font-mono text-cyan-300">!discord</span>.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          <div className="rounded-3xl border border-cyan-300/20 bg-cyan-950/20 p-6 md:col-span-3">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-cyan-300">Starting Soon</p>
            <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="space-y-3">
                <h2 className="font-orbitron text-3xl font-bold text-white">Set Start Time</h2>
                <p className="max-w-2xl text-sm leading-6 text-slate-300">
                  Enter the stream start time in EEST. The Starting Soon page will count down to that exact time and show all hour mentions as EEST.
                </p>
              </div>
              <div className="flex flex-col gap-3 md:items-end">
                <label className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400" htmlFor="start-time">
                  Start Time (EEST)
                </label>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <input
                    id="start-time"
                    type="time"
                    value={startTime}
                    onChange={(event) => setStartTime(event.target.value || DEFAULT_START_TIME)}
                    className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 font-mono text-lg text-white outline-none transition focus:border-cyan-300/50"
                  />
                  <a
                    href={startingHref}
                    className="rounded-2xl border border-cyan-300/40 bg-cyan-400/10 px-5 py-3 text-center font-orbitron text-sm font-bold uppercase tracking-[0.25em] text-cyan-200 transition hover:bg-cyan-400/20"
                  >
                    Open Starting
                  </a>
                </div>
                <p className="font-mono text-sm text-cyan-300">{startingHref}</p>
              </div>
            </div>
          </div>

          {pages.map((page, index) => (
            <a
              key={page.href}
              href={page.href}
              className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition duration-200 hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/8"
              style={{animationDelay: `${index * 120}ms`}}
            >
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-slate-400">Open Scene</p>
              <h2 className="mt-4 font-orbitron text-2xl font-bold text-white">{page.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">{page.description}</p>
              <p className="mt-6 font-mono text-sm text-cyan-300">{page.href}</p>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}