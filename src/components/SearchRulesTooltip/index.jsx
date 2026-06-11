import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import helpIcon from '../../assets/icons/help.svg';

const styles = {
  tooltipContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    cursor: 'help',
    position: 'relative',
  },
  tooltipIcon: {
    width: 18,
  },
  tooltipContent: {
    fontSize: 16,
    visibility: 'hidden',
    position: 'absolute',
    padding: 12,
    zIndex: 1000,
    top: 120,
    left: -700,
    marginLeft: 133,
    transition: 'opacity 0.3s',
    width: 610,
    background: '#FFFFFF',
    borderRadius: 20,
    border: '2px solid #B4B4B4',
    opacity: 0,
  },
  tooltipContainerHovered: {
    '&:hover $tooltipContent, &:focus $tooltipContent, &:active $tooltipContent': {
      visibility: 'visible',
      opacity: 1,
    },
  },
  tooltipTitle: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: '20px',
    letterSpacing: 0,
    verticalAlign: 'middle',
    textTransform: 'capitalize',
    color: '#1C58A1',
    display: 'block',
    marginBottom: 8,
  },
  tooltipList: {
    listStyleType: 'disc',
    marginTop: -5,
    marginBottom: 0,
    paddingLeft: 24,
  },
  tooltipListItem: {
    fontFamily: "'Nunito', sans-serif",
    fontWeight: 400,
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: '19px',
    letterSpacing: 0,
    marginBottom: 6,
    color: '#000000',
  },
};

/**
 * Provides an interactive tooltip that consistently describes the
 * search behavior across the application.
 *
 * @param {{ classes: Record<string, string> }} props
 * @returns {React.ReactElement} The SearchRulesTooltip component
 */
const SearchRulesTooltip = ({ classes }) => (
  <div className={`${classes.tooltipContainer} ${classes.tooltipContainerHovered}`}>
    <img src={helpIcon} alt="Help: Search rules" className={classes.tooltipIcon} />
    <div className={classes.tooltipContent}>
      <span className={classes.tooltipTitle}>Search Rules</span>
      <ul className={classes.tooltipList}>
        <li className={classes.tooltipListItem}>
          Non-alphanumeric characters (e.g., ? ! / - &lt; &gt;) are ignored.
        </li>
        <li className={classes.tooltipListItem}>
          Search terms must contain at least 3 consecutive alphanumeric characters.
        </li>
        <li className={classes.tooltipListItem}>
          Within searches with multiple terms, terms with fewer than 3 characters
          are ignored (e.g., searching "p53 in lung", returns results for "p53"
          AND "lung", but "in" is ignored).
        </li>
        <li className={classes.tooltipListItem}>
          Searches return both full and partial word matches
          (e.g., searching "leuk" returns results for "leukemia").
        </li>
        <li className={classes.tooltipListItem}>
          Multiple search terms (e.g., "leukemia pediatric WGS") return only
          results containing all terms (Boolean AND).
        </li>
        <li className={classes.tooltipListItem}>
          Results can be filtered using the checkboxes on the left.
        </li>
        <li className={classes.tooltipListItem}>
          Selecting multiple filters within the same category returns results
          matching any selected filter (Boolean OR).
        </li>
        <li className={classes.tooltipListItem}>
          Selecting filters across different categories, or combining filters
          with search terms, returns results matching all selections (Boolean AND).
        </li>
      </ul>
    </div>
  </div>
);

export default withStyles(styles)(SearchRulesTooltip);
