import React, { useRef, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { MOCK_REELS, MOCK_CREATOR } from '../data/mockData';

export default function Profile() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const fromReelId = searchParams.get('fromReel');
  const targetRef = useRef(null);

  const [isJumping, setIsJumping] = useState(false);
  const [showArchModal, setShowArchModal] = useState(false);

  const handleJumpToReel = () => {
    if (targetRef.current) {
      setIsJumping(true);
      targetRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });

      setTimeout(() => {
        setIsJumping(false);
      }, 2500);
    }
  };

  return (
    <div className="profile-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button className="back-btn" onClick={() => navigate('/')}>
          ← Back to Feed
        </button>
        <button 
          onClick={() => setShowArchModal(true)}
          style={{ background: '#262626', color: '#0095f6', border: '1px solid #363636', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}
        >
          ⚙️ View Architecture
        </button>
      </div>

      {/* Profile Header */}
      <div className="profile-header">
        <img src={MOCK_CREATOR.avatar} className="profile-avatar" alt="avatar" />
        <div>
          <h3>{MOCK_CREATOR.name}</h3>
          <p>@{MOCK_CREATOR.username}</p>
          <p>{MOCK_CREATOR.bio}</p>
        </div>
      </div>

      {/* FEATURE COMPONENT: Jump Banner */}
      {fromReelId && (
        <div className="jump-banner">
          <span>📍 Viewing Context: Reel <b>{fromReelId}</b></span>
          <button onClick={handleJumpToReel} className="jump-btn">
            ⚡ Jump & Highlight Last Viewed Reel
          </button>
        </div>
      )}

      {/* Reels Grid */}
      <h4>Reels Grid</h4>
      <div className="grid">
        {MOCK_REELS.map((reel) => {
          const isTarget = reel.id === fromReelId;
          let highlightClass = '';

          if (isTarget) {
            if (isJumping) {
              highlightClass = 'active-ripple-glow';
            } else {
              highlightClass = 'persistent-highlight';
            }
          }
          
          return (
            <div
              key={reel.id}
              ref={isTarget ? targetRef : null}
              className={`grid-card ${highlightClass}`}
            >
              <img src={reel.thumbnail} alt={reel.title} />
              <p className="grid-title">{reel.title}</p>
              {isTarget && (
                <span className={`tag ${isJumping ? 'tag-pulse' : ''}`}>
                  {isJumping ? 'FOUND!' : 'Last Seen'}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* ARCHITECTURE MODAL */}
      {showArchModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', 
          justifyContent: 'center', zIndex: 100, padding: '20px'
        }}>
          <div style={{
            background: '#121212', border: '1px solid #363636', borderRadius: '12px', 
            padding: '20px', maxWidth: '400px', width: '100%', color: '#fff'
          }}>
            <h3 style={{ marginBottom: '10px', color: '#0095f6' }}>Chrome Extension System Architecture</h3>
            <p style={{ fontSize: '13px', color: '#ccc', marginBottom: '15px' }}>
              How this logic scales to real Instagram Web via Manifest V3 Content Script:
            </p>
            <ol style={{ fontSize: '12px', lineHeight: '1.6', paddingLeft: '20px', marginBottom: '20px' }}>
              <li><b>State Tracking:</b> Content Script detects click on profile handle and captures current <code>reel_id</code>.</li>
              <li><b>Storage Handover:</b> Persists ID into <code>chrome.storage.local</code> across SPA page navigation.</li>
              <li><b>DOM Injection:</b> Injects a floating action button onto the profile DOM.</li>
              <li><b>Dynamic Scrolling:</b> Runs <code>IntersectionObserver</code> & <code>scrollIntoView</code> to auto-fetch and locate the target element.</li>
            </ol>
            <button 
              onClick={() => setShowArchModal(false)}
              style={{ width: '100%', background: '#e1306c', color: '#fff', border: 'none', padding: '8px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Close Technical Overview
            </button>
          </div>
        </div>
      )}
    </div>
  );
}