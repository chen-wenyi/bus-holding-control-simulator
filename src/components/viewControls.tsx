import React from 'react';

interface ViewControlsProps {
  onSetTopView: () => void;
  onSetRotatedView: () => void;
}

export default function ViewControls({
  onSetTopView,
  onSetRotatedView,
}: ViewControlsProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 10,
        top: '5%',
        left: '58%',
        transform: 'translateX(-50%)',
        background: 'rgba(255, 255, 255, 0.8)',
        padding: '9px',
        borderRadius: '100px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Top View Button */}
      <button
        onClick={onSetTopView}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 5px',
          padding: '6px',
          borderRadius: '100px',
          border: 'none',
          cursor: 'pointer',
          background: 'rgb(73, 104, 118)',
          color: '#fff',
          flex: 1,
          maxWidth: '170px',
          minWidth: '170px',
          textAlign: 'center',
          transition: 'background-color 0.2s ease, transform 0.2s ease',
          outline: 'none',
          boxShadow: 'none',
        }}
        onMouseEnter={(e) => {
          (e.target as HTMLElement).style.backgroundColor = 'rgb(45, 75, 90)';
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLElement).style.backgroundColor = 'rgb(73, 104, 118)';
        }}
        onMouseDown={(e) => {
          (e.target as HTMLElement).style.backgroundColor = 'rgb(30, 60, 75)';
          const img = (e.target as HTMLElement).querySelector('img');
          if (img) img.style.transform = 'scale(1.1)';
        }}
        onMouseUp={(e) => {
          (e.target as HTMLElement).style.backgroundColor = 'rgb(45, 75, 90)';
          const img = (e.target as HTMLElement).querySelector('img');
          if (img) img.style.transform = 'scale(1)';
        }}
      >
        <img
          src="/assets/down_circle.svg"
          alt="Top View Icon"
          style={{
            width: '18px',
            height: '18px',
            marginRight: '7px',
            transition: 'transform 0.2s ease',
          }}
        />
        Top View
      </button>

      {/* Rotated View Button */}
      <button
        onClick={onSetRotatedView}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 5px',
          padding: '6px',
          borderRadius: '100px',
          border: 'none',
          cursor: 'pointer',
          background: 'rgb(73, 104, 118)',
          color: '#fff',
          flex: 1,
          maxWidth: '170px',
          minWidth: '170px',
          textAlign: 'center',
          transition: 'background-color 0.2s ease, transform 0.2s ease',
          outline: 'none',
          boxShadow: 'none',
        }}
        onMouseEnter={(e) => {
          (e.target as HTMLElement).style.backgroundColor = 'rgb(45, 75, 90)';
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLElement).style.backgroundColor = 'rgb(73, 104, 118)';
        }}
        onMouseDown={(e) => {
          (e.target as HTMLElement).style.backgroundColor = 'rgb(30, 60, 75)';
          const img = (e.target as HTMLElement).querySelector('img');
          if (img) img.style.transform = 'scale(1.1)';
        }}
        onMouseUp={(e) => {
          (e.target as HTMLElement).style.backgroundColor = 'rgb(45, 75, 90)';
          const img = (e.target as HTMLElement).querySelector('img');
          if (img) img.style.transform = 'scale(1)';
        }}
      >
        <img
          src="/assets/up_circle.svg"
          alt="Rotated View Icon"
          style={{
            width: '18px',
            height: '18px',
            marginRight: '7px',
            transition: 'transform 0.2s ease',
          }}
        />
        Rotated View
      </button>
    </div>
  );
}
