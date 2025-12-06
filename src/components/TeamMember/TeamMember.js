import React from 'react';
import './TeamMember.css';

const TeamMember = ({ member }) => {
  return (
    <div className="team-member-card">
      <div className="member-photo">
        <img src={member.photo} alt={member.name} />
      </div>
      <h3 className="member-name">{member.name}</h3>
      <p className="member-position">{member.position}</p>
      <p className="member-bio">{member.bio}</p>
    </div>
  );
};

export default TeamMember;

