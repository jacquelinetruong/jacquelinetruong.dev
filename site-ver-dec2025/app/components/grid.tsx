import React from 'react';

export default function Grid({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`relative ${className}`}>
      <div className='grid-lines' />
      <div className='grid-layout'>{children}</div>
    </section>
  );
}
