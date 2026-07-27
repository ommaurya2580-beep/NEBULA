'use client';

export const DebugPanel = () => {
  return (
    <div style={{ position: 'fixed', bottom: 20, left: 20, background: 'rgba(0,0,0,0.8)', color: '#0f0', padding: '10px', zIndex: 9999 }}>
      <h3>Inspector</h3>
      <div>Scene | Camera | Shader | Material | Light | Store | Performance</div>
    </div>
  );
};
