import React from 'react';
import { Link } from 'react-router-dom';
import { NavItem } from '../../../config/globalHeaderData.tsx';

type NavMobileSubItemProps = {
  item: NavItem;
  onClose: () => void;
};

const NavMobileSubItem: React.FC<NavMobileSubItemProps> = ({ item, onClose }) => {
  const innerContent = (
    <div className="navMobileItem SubItem">
      {item.name}
    </div>
  );

  if (item.externalLink) {
    return (
      <a
        id={item.id}
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClose}
        aria-label={`${item.name} (opens in a new tab)`}
      >
        {innerContent}
      </a>
    );
  }

  return (
    <Link id={item.id} to={item.link} onClick={onClose}>
      {innerContent}
    </Link>
  );
};

export default NavMobileSubItem;
