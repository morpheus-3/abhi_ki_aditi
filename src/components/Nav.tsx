import { AnimatePresence, motion } from "framer-motion";
import { Menu, Music2, Pause, Play, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import weddingTrack from "../assets/Unki Tareef Mein Kahein Kya - Alfaaz _ Hamza Malik.mp3";

const LINKS = [
  ["story", "Our Story"],
  ["mehndi-card", "Mehndi"],
  ["haldi", "Haldi"],
  ["engagement", "Engagement"],
  ["sangeet", "Sangeet"],
  ["lagan", "Lagan"],
  ["baraat", "Baraat"],
  ["timeline", "Events"],
  ["venue", "Venue"],
  ["gallery", "Gallery"],
];

export function Nav() {
  const [music, setMusic] = useState(false);
  const [musicPrompt, setMusicPrompt] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const pendingPlayRef = useRef<Promise<void> | null>(null);
  const playAttemptRef = useRef(0);
  const startPlaybackRef = useRef<((fromGesture?: boolean) => Promise<void>) | null>(null);
  const removeGestureListenersRef = useRef<() => void>(() => {});

  useEffect(() => {
    const audio = new Audio(weddingTrack);
    audio.loop = true;
    audio.preload = "auto";
    audioRef.current = audio;
    let active = true;

    const removeGestureListeners = () => {
      document.removeEventListener("pointerdown", onUserGesture, true);
      document.removeEventListener("keydown", onUserGesture, true);
    };

    const startPlayback = (fromGesture = false): Promise<void> => {
      if (!active || audioRef.current !== audio) return Promise.resolve();
      if (!audio.paused) {
        setMusic(true);
        setMusicPrompt(false);
        removeGestureListeners();
        return Promise.resolve();
      }
      if (pendingPlayRef.current && !fromGesture) return pendingPlayRef.current;

      const attempt = ++playAttemptRef.current;
      let request: Promise<void>;
      try {
        request = audio.play();
      } catch {
        setMusic(false);
        setMusicPrompt(true);
        return Promise.resolve();
      }

      const handledRequest = request
        .then(() => {
          if (!active || attempt !== playAttemptRef.current) return;
          setMusic(true);
          setMusicPrompt(false);
          removeGestureListeners();
        })
        .catch(() => {
          if (!active || attempt !== playAttemptRef.current) return;
          setMusic(false);
          setMusicPrompt(true);
        })
        .finally(() => {
          if (attempt === playAttemptRef.current) pendingPlayRef.current = null;
        });
      pendingPlayRef.current = handledRequest;
      return handledRequest;
    };

    const onUserGesture = (event: Event) => {
      const target = event.target;
      if (target instanceof Element && target.closest("[data-music-control]")) return;
      void startPlayback(true);
    };

    document.addEventListener("pointerdown", onUserGesture, true);
    document.addEventListener("keydown", onUserGesture, true);
    removeGestureListenersRef.current = removeGestureListeners;
    startPlaybackRef.current = startPlayback;
    void startPlayback();

    return () => {
      active = false;
      playAttemptRef.current += 1;
      removeGestureListeners();
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      audioRef.current = null;
      pendingPlayRef.current = null;
      startPlaybackRef.current = null;
      removeGestureListenersRef.current = () => {};
    };
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      setMusicPrompt(false);
      void startPlaybackRef.current?.(true);
    } else {
      audio.pause();
      setMusic(false);
      setMusicPrompt(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, delay: 0.05 }}
        aria-label="Main navigation"
        className="fixed left-1/2 top-4 z-50 hidden -translate-x-1/2 lg:block lg:top-5"
      >
        <div className="glass-royal flex max-w-[calc(100vw-2rem)] items-center gap-0.5 overflow-x-auto rounded-full px-2 py-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:gap-1 lg:px-3 lg:py-2">
          {LINKS.map(([id, label]) => (
            <a
              key={id}
              href={"#" + id}
              className="whitespace-nowrap rounded-full px-2 py-2.5 text-[11px] font-medium uppercase tracking-[0.1em] text-gold/90 transition-all hover:bg-gold/10 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 lg:px-3 lg:text-xs lg:tracking-[0.14em]"
            >
              {label}
            </a>
          ))}
        </div>
      </motion.nav>

      <div className="lg:hidden">
        <button
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
          className="glass-royal fixed left-4 top-4 z-[60] inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-xs font-medium uppercase tracking-[0.16em] text-gold-soft"
        >
          {menuOpen ? <X size={17} /> : <Menu size={17} />}
          {menuOpen ? "Close" : "Menu"}
        </button>
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              id="mobile-navigation"
              aria-label="Main navigation"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="glass-royal fixed inset-x-4 top-[4.25rem] z-[60] rounded-2xl p-3"
            >
              <div className="grid grid-cols-2 gap-2">
                {LINKS.map(([id, label]) => (
                  <a
                    key={id}
                    href={"#" + id}
                    onClick={() => setMenuOpen(false)}
                    className="flex min-h-11 items-center rounded-xl px-4 text-xs uppercase tracking-[0.16em] text-gold/90 transition hover:bg-gold/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="fixed bottom-4 right-3 z-[70] sm:bottom-6 sm:right-6"
      >
        <button
          type="button"
          onClick={toggleMusic}
          data-music-control
          aria-label={music ? "Pause background music" : "Play background music"}
          aria-pressed={music}
          className="group flex min-h-[58px] w-[174px] items-center gap-2.5 rounded-2xl border border-gold/45 bg-gradient-to-br from-[#521b27]/95 via-[#35131f]/95 to-[#160e1b]/95 p-2.5 text-left shadow-[0_12px_36px_-14px_oklch(0_0_0/0.95),0_0_24px_-12px_oklch(0.82_0.14_82/0.55)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-gold/70 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:w-[194px] sm:gap-3 sm:p-3"
        >
          <span className={"music-record relative grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold/55 bg-[radial-gradient(circle,#d6a84c_0_8%,#23151d_10%_19%,#62452b_21%_24%,#20141e_27%_100%)] text-gold-soft shadow-inner sm:h-11 sm:w-11 " + (music ? "music-record-playing" : "")}>
            <span className="grid h-5 w-5 place-items-center rounded-full bg-[#4a2330]/90 shadow-sm">
              {music ? <Pause size={11} fill="currentColor" /> : <Play size={11} fill="currentColor" className="ml-0.5" />}
            </span>
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex items-center gap-1.5 font-display text-[13px] leading-none text-gold-soft sm:text-sm">
              <Music2 aria-hidden="true" size={13} className="shrink-0 text-gold-soft" />
              Abhi Ki Aditi
            </span>
            <span className="mt-1.5 block truncate text-[10px] uppercase tracking-[0.13em] text-foreground/65">
              {music ? "Now playing" : musicPrompt ? "Tap to play" : "Wedding music"}
            </span>
          </span>
          <span className={"music-visualizer " + (music ? "is-playing" : "")} aria-hidden="true">
            {[0, 1, 2, 3].map((bar) => <i key={bar} style={{ animationDelay: `${bar * 110}ms` }} />)}
          </span>
        </button>
      </motion.div>
    </>
  );
}
