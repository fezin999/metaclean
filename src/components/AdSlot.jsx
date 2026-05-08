import { useEffect, useRef } from 'react'

/**
 * AdSlot component — Google AdSense integration.
 * 
 * HOW TO ACTIVATE:
 * 1. Replace 'ca-pub-XXXXXXXXXXXXXXXX' with your AdSense publisher ID
 * 2. Replace each 'SLOT_ID' with the ad unit slot IDs from your AdSense dashboard
 * 3. Set ADSENSE_ACTIVE to true
 * 
 * While ADSENSE_ACTIVE is false, placeholders are shown instead.
 */

const ADSENSE_ACTIVE = false // ← Mude para true quando seu AdSense for aprovado
const PUBLISHER_ID = 'ca-pub-XXXXXXXXXXXXXXXX' // ← Seu publisher ID aqui

export default function AdSlot({ size = 'leaderboard', className = '' }) {
  const adRef = useRef(null)
  const pushed = useRef(false)

  const sizes = {
    'leaderboard': { width: '728px', height: '90px', label: '728×90 — Ad Space', format: 'horizontal', slot: 'SLOT_ID_1' },
    'mobile-banner': { width: '320px', height: '50px', label: '320×50 — Ad Space', format: 'horizontal', slot: 'SLOT_ID_2' },
    'sidebar': { width: '300px', height: '600px', label: '300×600 — Ad Space', format: 'vertical', slot: 'SLOT_ID_3' },
    'rectangle': { width: '336px', height: '280px', label: '336×280 — Ad Space', format: 'rectangle', slot: 'SLOT_ID_4' },
    'sticky-bottom': { width: '100%', height: '50px', label: 'Sticky Ad', format: 'horizontal', slot: 'SLOT_ID_5' },
  }

  const config = sizes[size] || sizes.leaderboard

  useEffect(() => {
    if (ADSENSE_ACTIVE && adRef.current && !pushed.current) {
      try {
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
        pushed.current = true
      } catch (e) {
        // AdSense not loaded yet
      }
    }
  }, [])

  // Show placeholder when AdSense is not active
  if (!ADSENSE_ACTIVE) {
    return (
      <div className={`flex justify-center ${className}`}>
        <div
          className="ad-slot"
          style={{
            width: config.width,
            height: config.height,
            maxWidth: '100%',
          }}
          aria-hidden="true"
        >
          <span className="opacity-50">{config.label}</span>
        </div>
      </div>
    )
  }

  // Real AdSense ad unit
  return (
    <div className={`flex justify-center ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: 'block',
          width: config.width,
          height: config.height,
          maxWidth: '100%',
        }}
        data-ad-client={PUBLISHER_ID}
        data-ad-slot={config.slot}
        data-ad-format={config.format}
        data-full-width-responsive="true"
      />
    </div>
  )
}
