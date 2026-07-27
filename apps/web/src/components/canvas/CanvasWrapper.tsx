'use client';

import dynamic from 'next/dynamic';

const NebulaCanvas = dynamic(
  () => import('./NebulaCanvas').then((mod) => mod.NebulaCanvas),
  { ssr: false }
);

export function CanvasWrapper() {
  return (
    <NebulaCanvas>
      {/* Any children can go here but we have them self contained */}
    </NebulaCanvas>
  );
}
