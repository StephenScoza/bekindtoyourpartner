function BrandMark({ compact = false, subtitle = true }) {
  return (
    <div className={`brand-lockup ${compact ? 'brand-lockup-compact' : ''}`}>
      <div className="brand-icon" aria-hidden="true">
        <svg viewBox="0 0 128 128" role="img">
          <defs>
            <linearGradient id="brand-heart" x1="22" y1="18" x2="104" y2="111">
              <stop offset="0%" stopColor="#ff6b7d" />
              <stop offset="100%" stopColor="#e9466a" />
            </linearGradient>
          </defs>
          <path
            d="M64 110C44 95 21 75 21 48C21 31 34 18 50 18C58 18 66 21 72 30C78 21 86 18 94 18C110 18 123 31 123 48C123 75 100 95 64 110Z"
            fill="url(#brand-heart)"
          />
          <path
            d="M28 57C38 45 52 45 65 49C77 53 90 54 101 46"
            fill="none"
            stroke="#fff4ec"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d="M33 64C44 72 55 74 67 72C82 70 95 62 107 59"
            fill="none"
            stroke="#fff4ec"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d="M83 37C88 33 92 31 96 31C99 31 101 33 101 36C101 40 95 45 90 47"
            fill="none"
            stroke="#fff4ec"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M38 69C34 74 31 79 31 83C31 86 33 88 36 88C40 88 45 84 49 78"
            fill="none"
            stroke="#fff4ec"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="brand-wordmark">
        <p className="brand-kicker">Be Kind To</p>
        <h1 className="brand-script">Your Partner</h1>
        {subtitle && (
          <p className="brand-tagline">
            <span>Small actions.</span>
            <span className="brand-tagline-accent"> Big love.</span>
          </p>
        )}
      </div>
    </div>
  );
}

export default BrandMark;
