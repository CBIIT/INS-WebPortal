import React from 'react';
import {
  withStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { STAT_VISUALS_BY_API } from '../../../bento/landingPageData';
import './statsStyles.css';

const linkPage = '/programs';

export const STAT_SCALE_FACTOR = 63;
export const MOBILE_STAT_SCALE_FACTOR = 38;
export const DESKTOP_BAR_TRACK_PX = 350;
export const MOBILE_COLUMN_COUNT = 6;
export const MOBILE_COLUMN_HEIGHT_PX = 330;
export const MOBILE_LABEL_REGION_PX = 110;
export const MOBILE_BAR_TRACK_PX = MOBILE_COLUMN_HEIGHT_PX - MOBILE_LABEL_REGION_PX;

export const normalizeStatValue = (value) => {
  if (value === null || value === undefined || value === '') return 0;

  const numericValue = Number(value);
  return Number.isFinite(numericValue) && numericValue >= 0 ? numericValue : 0;
};

export const formatDesktopStatValue = (value) => normalizeStatValue(value).toLocaleString(
  'en-US',
  { maximumFractionDigits: 0 },
);

export const formatMobileStatValue = (value) => {
  const normalizedValue = normalizeStatValue(value);

  if (normalizedValue < 1000) return Math.floor(normalizedValue).toString();
  if (normalizedValue < 1000000) return `${Math.floor(normalizedValue / 1000)}K`;
  return `${Math.floor(normalizedValue / 1000000)}M`;
};

export const getScaledBarSize = (value, maxSize, scaleFactor = STAT_SCALE_FACTOR) => {
  const normalizedValue = normalizeStatValue(value);
  const normalizedMax = Number(maxSize);

  if (normalizedValue <= 0 || !Number.isFinite(normalizedMax) || normalizedMax <= 0) return 0;

  const scaledValue = Math.log10(normalizedValue) * scaleFactor;
  if (!Number.isFinite(scaledValue)) return 0;
  return Math.min(normalizedMax, Math.max(0, scaledValue));
};

const LandingStatsView = ({ classes, stats, statsData = {} }) => {
  const metricRows = stats.map((stat) => ({
    ...stat,
    value: normalizeStatValue(statsData[stat.statAPI]),
    visual: STAT_VISUALS_BY_API[stat.statAPI],
  }));

  return (
    <div className={classes.statsSectionCenter}>
      <div className={classes.leftBox}>
        <div className={classes.leftGroup}>
          <div className={classes.leftText}>
            INS compiles programs, projects, and outputs funded by the NCI.
            <br />
            <br />
            Explore the data
            <Link to={linkPage} className={classes.linkText}> here</Link>
            .
          </div>
        </div>
      </div>
      <div className="statsBox">
        {metricRows.length > 0 && (
          <div className={classes.box} role="list" aria-label="INS statistics">
            {metricRows.map((stat) => {
              const barSize = getScaledBarSize(stat.value, DESKTOP_BAR_TRACK_PX);
              const accessibleName = `${formatDesktopStatValue(stat.value)} ${stat.statTitle}`;
              return (
                <div
                  key={stat.statAPI}
                  className={classes.statsGroup}
                  data-testid={`desktop-stat-${stat.statAPI}`}
                  role="listitem"
                  aria-label={accessibleName}
                >
                  <div className={classes.statsText} aria-hidden="true">
                    <div className="statsFadeIn">
                      <div
                        style={{ right: `${barSize}px` }}
                        className={classes.statsSlideText}
                      >
                        <div className={classes.statTitle}>
                          {stat.statTitle}
                        </div>
                        <div className={classes.statCount}>
                          {formatDesktopStatValue(stat.value)}
                        </div>
                      </div>
                    </div>
                    <div className={classes.statsSlideBg}>
                      <div className="statsSlide">
                        <div
                          style={{
                            width: `${barSize}px`,
                            background: stat.visual.desktopGradient,
                          }}
                          className={classes.statsSlideBar}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className={classes.mobileStatsBox}>
        {metricRows.length > 0 && (
          <div className={classes.chart} role="list" aria-label="INS statistics">
            {metricRows.map((stat) => {
              const barSize = getScaledBarSize(
                stat.value,
                MOBILE_BAR_TRACK_PX,
                MOBILE_STAT_SCALE_FACTOR,
              );
              const accessibleName = `${formatDesktopStatValue(stat.value)} ${stat.statTitle}`;
              return (
                <div
                  key={stat.statAPI}
                  className={classes.mobileChartColumn}
                  data-testid={`mobile-stat-${stat.statAPI}`}
                  role="listitem"
                  aria-label={accessibleName}
                >
                  <span aria-hidden="true">{formatMobileStatValue(stat.value)}</span>
                  <div className={classes.label} aria-hidden="true">
                    {stat.statTitle.toUpperCase()}
                  </div>
                  <div
                    className={classes.mobileBar}
                    aria-hidden="true"
                    style={{
                      height: `${barSize}px`,
                      background: stat.visual.mobileColor,
                    }}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = () => ({
  statsSectionCenter: {
    height: '365px',
    zIndex: 2,
    background: '#403e41',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '-55px -52px',
    maxWidth: '1060px',
    textAlign: 'right',
    position: 'absolute',
    overflow: 'auto',
    left: 0,
    right: 0,
    margin: '-24px auto auto auto',
    display: 'flex',
    justifyContent: 'right',
    '@media (min-width: 900px)': {
      overflow: 'inherit',
    },
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    '@media (max-width: 480px)': {
      height: 'auto',
      flexDirection: 'column',
      marginTop: '550px',
    },
  },
  box: {
    direction: 'ltr',
    display: 'block',
    height: '315px',
    paddingTop: '1px',
    marginRight: '10px',
    transform: 'translateY(-8.5px)',
  },
  statsText: {
    height: '43px',
    display: 'flex',
    lineHeight: '15px',
    float: 'right',
    marginTop: '15px',
  },
  statTitle: {
    display: 'inline-block',
    float: 'right',
    textAlign: 'right',
    color: '#D9D9D9',
    fontFamily: 'Nunito',
    fontWeight: 900,
    fontSize: '12px',
    textTransform: 'uppercase',
    padding: '3px 10px 0 3px',
  },
  statCount: {
    display: 'inline-block',
    color: '#FFFFFF',
    textAlign: 'right',
    float: 'right',
    fontFamily: 'Oswald',
    fontSize: '24px',
    fontWeight: 600,
    marginRight: '5px',
  },
  statsGroup: {
    margin: '5px 5px -10px 5px',
  },
  leftGroup: {
    padding: '35px 24px 65px 70px',
    '@media (max-width: 480px)': {
      padding: '42px 14px 10px 14px',
    },
  },
  leftText: {
    fontFamily: 'Inter',
    color: '#FFFFFF',
    fontSize: '40px',
    fontWeight: '800',
    textAlign: 'left',
    lineHeight: '40px',
    '@media (max-width: 480px)': {
      fontSize: '32px',
      lineHeight: '31px',
      letterSpacing: '0.1%',
    },
  },
  linkText: {
    color: '#E26063',
    textDecoration: 'none',
  },
  leftBox: {},
  statsSlideBg: {
    width: `${DESKTOP_BAR_TRACK_PX}px`,
    background: 'linear-gradient(270deg, rgba(94, 94, 94, 1) 0%, rgba(65, 62, 65, 1) 100%)',
    height: '50px',
    marginRight: '-15px',
  },
  statsSlideBar: {
    borderRadius: '79px 0 0 79px',
    boxSizing: 'border-box',
    height: '50px',
    float: 'right',
    marginRight: '-15px',
  },
  statsSlideText: {
    position: 'absolute',
    zIndex: '999',
    marginTop: '18px',
  },
  mobileStatsBox: {
    '@media (min-width: 481px)': {
      display: 'none',
    },
  },
  chart: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '4px',
    padding: '0 16px',
  },
  mobileChartColumn: {
    boxSizing: 'border-box',
    flex: '1 1 0',
    width: 'calc((100% - 20px) / 6)',
    minWidth: 0,
    height: `${MOBILE_COLUMN_HEIGHT_PX}px`,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    '& span': {
      marginBottom: '20px',
      fontFamily: 'Oswald',
      fontWeight: '500',
      fontSize: '22px',
      lineHeight: '15px',
      letterSpacing: '0%',
      verticalAlign: 'middle',
    },
  },
  label: {
    writingMode: 'vertical-rl',
    fontFamily: 'Nunito Sans',
    fontWeight: '700',
    fontSize: '10px',
    lineHeight: '15px',
    letterSpacing: '2%',
    marginBottom: '20px',
  },
  mobileBar: {
    boxSizing: 'border-box',
    width: '100%',
    borderRadius: '999px 999px 0 0',
    flexShrink: 0,
  },
});

export default withStyles(styles, { withTheme: true })(LandingStatsView);
