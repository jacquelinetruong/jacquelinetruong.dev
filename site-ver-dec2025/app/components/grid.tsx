import React from 'react';

export default function Grid({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`relative w-full min-h-[var(--content-space)] ${className}`}>
      <div className='grid-lines' />
      <div className={`grid-layout ${className}`}>{children}</div>
    </section>
  );
}
