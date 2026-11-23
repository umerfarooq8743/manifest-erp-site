/**
 * Manifest ERP intro splash — pure server markup + CSS/SVG animation
 * (src/app/splash.css). Hidden by default; the inline head script reveals it
 * on the first page view of a browser session, or with ?splash in the URL
 * (never with reduced motion), and removes it after ~2.6 s, on click, or on
 * Escape.
 *
 * Choreography: the manifest sheet is drawn → it fills with the brand
 * gradient → the corner folds → the "M" (stacked containers) is written →
 * twelve workflow stages light up around the orbit as the progress ring
 * closes → the wordmark and tagline rise.
 */
const STAGES = 12;
const R = 150;

export function Splash() {
  const dots = Array.from({ length: STAGES }, (_, i) => {
    const angle = (i / STAGES) * Math.PI * 2 - Math.PI / 2;
    return { x: Math.round((200 + R * Math.cos(angle)) * 100) / 100, y: Math.round((200 + R * Math.sin(angle)) * 100) / 100 };
  });

  return (
    <div className="ms-splash" data-splash role="status" aria-live="polite" aria-label="Loading Manifest ERP">
      <div className="ms-splash__grid" aria-hidden="true" />
      <div className="ms-splash__aura" aria-hidden="true" />

      <div className="ms-splash__inner">
        <div className="ms-splash__stage">
          <svg className="ms-splash__art" viewBox="0 0 400 400" fill="none" aria-hidden="true">
            <defs>
              <linearGradient id="msSheet" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#059669" />
                <stop offset="1" stopColor="#0e7490" />
              </linearGradient>
              <linearGradient id="msStroke" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" style={{ stopColor: "var(--sp-stroke-1)" }} />
                <stop offset="1" style={{ stopColor: "var(--sp-stroke-2)" }} />
              </linearGradient>
              <linearGradient id="msSheen" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="32" y2="0">
                <stop offset="0.35" stopColor="#fff" stopOpacity="0" />
                <stop offset="0.5" stopColor="#fff" stopOpacity="0.55" />
                <stop offset="0.65" stopColor="#fff" stopOpacity="0" />
                <animateTransform attributeName="gradientTransform" type="translate" values="-32 0; 32 0" dur="1.1s" begin="1.85s" fill="freeze" />
              </linearGradient>
            </defs>

            {/* Route: a dashed track, then the progress ring that closes as stages complete */}
            <circle className="ms-splash__track" cx="200" cy="200" r={R} />
            <circle className="ms-splash__progress-ring" cx="200" cy="200" r={R} stroke="url(#msStroke)" pathLength={1} />
            <g className="ms-splash__dots">
              {dots.map((d, i) => (
                <circle key={i} className="ms-splash__dot" cx={d.x} cy={d.y} r="4.5" style={{ animationDelay: `${0.45 + i * 0.12}s` }} />
              ))}
            </g>

            {/* The mark: logo geometry (32-unit grid) scaled ×5.6 around the centre */}
            <g transform="translate(110.4 110.4) scale(5.6)" strokeLinecap="round" strokeLinejoin="round">
              <path
                className="ms-splash__sheet-fill"
                d="M8 1h13.5L31 10.5V24a7 7 0 0 1-7 7H8a7 7 0 0 1-7-7V8a7 7 0 0 1 7-7z"
                fill="url(#msSheet)"
              />
              <path
                className="ms-splash__sheet-line"
                d="M8 1h13.5L31 10.5V24a7 7 0 0 1-7 7H8a7 7 0 0 1-7-7V8a7 7 0 0 1 7-7z"
                stroke="url(#msStroke)"
                strokeWidth="0.55"
                pathLength={1}
              />
              <path className="ms-splash__fold" d="M21.5 1v5.5a4 4 0 0 0 4 4H31z" fill="#fff" fillOpacity=".38" />
              <path
                className="ms-splash__m"
                d="M8.5 23.5V11.2c0-.5.6-.8 1-.4L16 17l6.5-6.2c.4-.4 1-.1 1 .4v12.3"
                stroke="#fff"
                strokeWidth="2.6"
                pathLength={1}
              />
              <path className="ms-splash__line" d="M12.5 26.5h7" stroke="#fff" strokeOpacity=".7" strokeWidth="1.6" pathLength={1} />
              <path
                className="ms-splash__sheen"
                d="M8 1h13.5L31 10.5V24a7 7 0 0 1-7 7H8a7 7 0 0 1-7-7V8a7 7 0 0 1 7-7z"
                fill="url(#msSheen)"
              />
            </g>
          </svg>
          <div className="ms-splash__comet" aria-hidden="true" />
        </div>

        <p className="ms-splash__word">
          Manifest <span className="ms-splash__badge">ERP</span>
        </p>
        <p className="ms-splash__tagline">Every shipment, accounted for.</p>
        <div className="ms-splash__bar" aria-hidden="true">
          <span />
        </div>
        <span className="ms-splash__skip">Click or press Esc to skip</span>
      </div>
    </div>
  );
}
