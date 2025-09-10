import Script from 'next/script';
import { useEffect } from 'react';

interface AdSenseSlotProps {
  slotId: string;
  layout?: 'in-article' | 'in-feed' | 'display' | 'fluid';
  className?: string;
  label?: string; // used for dummy placeholder when no client configured
}

export function AdSenseSlot({ slotId, layout = 'display', className, label }: AdSenseSlotProps) {
  const client = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT;

  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, []);

  // If no client configured, render a tasteful placeholder for development
  if (!client) {
    return (
      <div className={className}>
        <div className="w-full h-24 bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center text-gray-500 text-sm">
          {label ? `Ad (Google) • ${label}` : 'Ad (Google)'}
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Load AdSense library once per page */}
      <Script id="adsbygoogle-init" strategy="afterInteractive" src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`} crossOrigin="anonymous" />

      <ins
        className="adsbygoogle block w-full"
        style={{ display: 'block' }}
        data-ad-client={client}
        data-ad-slot={slotId}
        data-ad-format={layout === 'fluid' ? 'fluid' : 'auto'}
        data-full-width-responsive="true"
      />
    </div>
  );
}


