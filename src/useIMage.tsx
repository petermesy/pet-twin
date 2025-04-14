import { useState, useEffect } from 'react';

const useImage = (url: string) => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [status, setStatus] = useState<'loading' | 'loaded' | 'failed'>('loading');

  useEffect(() => {
    const img = new window.Image();
    img.crossOrigin = 'Anonymous'; // for CORS handling
    img.src = url;

    img.onload = () => {
      setStatus('loaded');
      setImage(img);
    };

    img.onerror = () => {
      setStatus('failed');
      setImage(null);
    };
  }, [url]);

  return [image, status] as const;
};

export default useImage;
