interface LocalAdProps {
  imageSrc: string;
  linkHref: string;
  alt?: string;
  className?: string;
}

export function LocalAd({ imageSrc, linkHref, alt = 'Advertisement', className }: LocalAdProps) {
  return (
    <a href={linkHref} target="_blank" rel="noopener noreferrer" className={className}>
      <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <img src={imageSrc} alt={alt} className="w-full h-40 object-cover" />
      </div>
    </a>
  );
}




