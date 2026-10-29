import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_REELS, MOCK_CREATOR } from '../data/mockData';

export default function Feed() {
  const navigate = useNavigate();

  return (
    <div className="feed-container">
      <h2 className="header">Instagram Reels Feed</h2>
      <p className="subtext">Scroll through reels below:</p>

      <div className="reels-list">
        {MOCK_REELS.map((reel) => (
          <div key={reel.id} className="reel-card">
            <img src={reel.thumbnail} alt={reel.title} className="reel-img" />
            
            <div className="reel-overlay">
              {/* Creator Handle Click Event */}
              <button
                type="button"
                className="creator-info"
                onClick={() => navigate(`/profile?fromReel=${reel.id}`)}
              >
                <img src={MOCK_CREATOR.avatar} alt="avatar" className="avatar" />
                <span className="username">@{MOCK_CREATOR.username}</span>
              </button>

              <p className="reel-title">{reel.title}</p>
              <button 
                className="visit-btn"
                onClick={() => navigate(`/profile?fromReel=${reel.id}`)}
              >
                Visit Profile to find Part 2 ➔
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}