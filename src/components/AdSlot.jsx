export default function AdSlot({ size = 'leaderboard', className = '' }) {
  const sizes = {
    'leaderboard': { width: '728px', height: '90px', label: '728×90 — Ad Space' },
    'mobile-banner': { width: '320px', height: '50px', label: '320×50 — Ad Space' },
    'sidebar': { width: '300px', height: '600px', label: '300×600 — Ad Space' },
    'rectangle': { width: '336px', height: '280px', label: '336×280 — Ad Space' },
    'sticky-bottom': { width: '100%', height: '50px', label: 'Sticky Ad' },
  }

  const config = sizes[size] || sizes.leaderboard

  return (
    <div className={`flex justify-center ${className}`}>
      <div
        className="ad-slot"
        style={{
          width: config.width,
          height: config.height,
          maxWidth: '100%',
        }}
        data-ad-slot={size}
        aria-hidden="true"
      >
        {/* 
          Replace this placeholder with your ad network code:
          Google AdSense: <ins class="adsbygoogle" ... />
          Ezoic: <div id="ezoic-pub-ad-placeholder-xxx"></div>
        */}
        <span className="opacity-50">{config.label}</span>
      </div>
    </div>
  )
}
