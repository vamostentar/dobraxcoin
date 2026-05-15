import { CONTENT } from '../../config/content';

export const Ticker = () => {
  return (
    <div className="bg-amber py-3 overflow-hidden whitespace-nowrap select-none border-y border-ink/10" aria-hidden="true">
      <div className="inline-flex animate-roll">
        {[...CONTENT.ticker, ...CONTENT.ticker, ...CONTENT.ticker].map((text, i) => (
          <span key={i} className="font-mono text-[11px] font-medium tracking-[0.15em] uppercase text-ink px-10 flex items-center">
            {text}
            <span className="opacity-30 ml-4">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};
