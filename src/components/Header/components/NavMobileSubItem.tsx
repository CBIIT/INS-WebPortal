import React from 'react';
import { Link } from 'react-router-dom';
import { NavItem } from '../../../config/globalHeaderData.tsx';

type NavMobileSubItemProps = {
  item: NavItem;
  onClose: () => void;
};

const NavMobileSubItem: React.FC<NavMobileSubItemProps> = ({ item, onClose }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onClose();
    }
  };

  const innerContent = (
    <div
      role="button"
      tabIndex={0}
      className="navMobileItem SubItem"
      onKeyDown={handleKeyDown}
      onClick={onClose}
    >
      {item.name}
    </div>
  );

  if (item.externalLink) {
    return (
      <a id={item.id} href={item.link} target="_blank" rel="noopener noreferrer">
        {innerContent}
      </a>
    );
  }

  return (
    <Link id={item.id} to={item.link}>
      {innerContent}
    </Link>
  );
};

export default NavMobileSubItem;
