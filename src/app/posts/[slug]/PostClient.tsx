'use client';
import React, { useState } from 'react';

export default function PostClient({ postUrl, tweetText, isBottom = false }: { postUrl: string, tweetText: string, isBottom?: boolean }) {
  const [label, setLabel] = useState(isBottom ? 'Copy link' : 'Copy');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      setLabel('Copied!');
      setTimeout(() => setLabel(isBottom ? 'Copy link' : 'Copy'), 2000);
    } catch {
      setLabel('Failed');
    }
  };

  if (isBottom) {
    return (
      <button className="share-btn share-copy" onClick={handleCopy}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
        <span>{label}</span>
      </button>
    );
  }

  return (
    <div className="share-inline">
      <a href={`https://twitter.com/intent/tweet?text=${tweetText}`} target="_blank" rel="noopener noreferrer" className="share-btn share-x">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        Share
      </a>
      <button className="share-btn share-copy" onClick={handleCopy}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
        <span>{label}</span>
      </button>
    </div>
  );
}
