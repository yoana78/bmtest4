import { useEffect, useState } from 'react';

// Pages may return a full 200 response to Range requests. A complete local Blob
// gives the media decoder a seekable file without depending on byte serving.
export default function ScrubVideo({ src, ...props }) {
  const [localSource, setLocalSource] = useState();
  useEffect(() => {
    const controller = new AbortController();
    let objectUrl;
    fetch(src, { signal: controller.signal })
      .then(response => {
        if (!response.ok) throw new Error(`Video load failed: ${response.status}`);
        return response.blob();
      })
      .then(blob => {
        if (controller.signal.aborted) return;
        objectUrl = URL.createObjectURL(blob);
        setLocalSource({ src, url: objectUrl });
      })
      .catch(error => {
        if (error.name !== 'AbortError') console.warn('Story video unavailable; retaining poster.', src);
      });
    return () => {
      controller.abort();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [src]);
  return <video {...props} src={localSource?.src === src ? localSource.url : undefined} />;
}
