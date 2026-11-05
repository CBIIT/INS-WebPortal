import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { landingPageData } from '../../../bento/landingPageData';
import LandingStatsView, {
  formatDesktopStatValue,
  formatMobileStatValue,
  getScaledBarSize,
  normalizeStatValue,
} from './statsView';

const stats = landingPageData.landingPageStatsBar;
const statsData = {
  numberOfPrograms: 195,
  numberOfResources: 12345,
  numberOfDatasets: 14035,
  numberOfProjects: 3065,
  numberOfGrants: 15790,
  numberOfPublications: 64174,
};

const renderStats = (data = statsData) => render(
  <MemoryRouter>
    <LandingStatsView stats={stats} statsData={data} />
  </MemoryRouter>,
);

describe('landing statistic value helpers', () => {
  it('normalizes missing, invalid, non-finite, and negative values to zero', () => {
    [undefined, null, '', 'not-a-number', NaN, Infinity, -1].forEach((value) => {
      expect(normalizeStatValue(value)).toBe(0);
    });
    expect(normalizeStatValue(12345)).toBe(12345);
  });

  it('formats desktop counts as grouped en-US integers', () => {
    expect(formatDesktopStatValue(12345)).toBe('12,345');
    expect(formatDesktopStatValue(null)).toBe('0');
    expect(formatDesktopStatValue(-5)).toBe('0');
  });

  it('truncates mobile values at the K and M boundaries', () => {
    expect(formatMobileStatValue(999)).toBe('999');
    expect(formatMobileStatValue(1000)).toBe('1K');
    expect(formatMobileStatValue(15790)).toBe('15K');
    expect(formatMobileStatValue(999999)).toBe('999K');
    expect(formatMobileStatValue(1000000)).toBe('1M');
  });

  it('returns finite logarithmic sizes bounded by each available track', () => {
    const desktopTrack = 350;
    const mobileTrack = 250;

    [undefined, null, NaN, Infinity, -100, 0].forEach((value) => {
      expect(getScaledBarSize(value, desktopTrack)).toBe(0);
    });

    [1, 999, 12345, Number.MAX_VALUE].forEach((value) => {
      const desktopSize = getScaledBarSize(value, desktopTrack);
      const mobileSize = getScaledBarSize(value, mobileTrack);
      expect(Number.isFinite(desktopSize)).toBe(true);
      expect(desktopSize).toBeGreaterThanOrEqual(0);
      expect(desktopSize).toBeLessThanOrEqual(desktopTrack);
      expect(mobileSize).toBeGreaterThanOrEqual(0);
      expect(mobileSize).toBeLessThanOrEqual(mobileTrack);
    });
  });
});

describe('LandingStatsView', () => {
  const apiOrder = [
    'numberOfPrograms',
    'numberOfResources',
    'numberOfDatasets',
    'numberOfProjects',
    'numberOfGrants',
    'numberOfPublications',
  ];

  it('renders desktop and mobile metrics in the same six-item order', () => {
    renderStats();

    expect(screen.getAllByTestId(/^desktop-stat-/).map(({ dataset }) => (
      dataset.testid.replace('desktop-stat-', '')
    ))).toEqual(apiOrder);
    expect(screen.getAllByTestId(/^mobile-stat-/).map(({ dataset }) => (
      dataset.testid.replace('mobile-stat-', '')
    ))).toEqual(apiOrder);
  });

  it('reads Resources from numberOfResources and formats each variant correctly', () => {
    renderStats();

    expect(screen.getByTestId('desktop-stat-numberOfResources')).toHaveTextContent('12,345');
    expect(screen.getByTestId('desktop-stat-numberOfResources')).toHaveTextContent('Resources');
    expect(screen.getByTestId('mobile-stat-numberOfResources')).toHaveTextContent('12K');
    expect(screen.getByTestId('mobile-stat-numberOfResources')).toHaveTextContent('RESOURCES');
  });

  it('provides the complete grouped count and title as an accessible name', () => {
    renderStats();

    stats.forEach(({ statAPI, statTitle }) => {
      const accessibleName = `${formatDesktopStatValue(statsData[statAPI])} ${statTitle}`;
      expect(screen.getAllByRole('listitem', { name: accessibleName })).toHaveLength(2);
    });
  });

  it('renders invalid values safely without losing their labels', () => {
    renderStats({
      numberOfPrograms: null,
      numberOfResources: -1,
      numberOfDatasets: NaN,
      numberOfProjects: Infinity,
      numberOfGrants: 0,
      numberOfPublications: Number.MAX_VALUE,
    });

    expect(screen.getAllByRole('listitem', { name: '0 Programs' })).toHaveLength(2);
    expect(screen.getAllByRole('listitem', { name: '0 Resources' })).toHaveLength(2);
    expect(screen.getAllByRole('listitem', { name: '0 Datasets' })).toHaveLength(2);
    expect(screen.getAllByRole('listitem', { name: '0 Projects' })).toHaveLength(2);
    expect(screen.getAllByRole('listitem', { name: '0 Grants' })).toHaveLength(2);
    expect(screen.getAllByRole('listitem', { name: /Publications$/ })).toHaveLength(2);
  });

  it('uses stable keys for both mapped chart variants', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

    renderStats();

    const missingKeyWarning = consoleError.mock.calls.some((call) => (
      call.join(' ').includes('Each child in a list should have a unique "key" prop')
    ));
    expect(missingKeyWarning).toBe(false);
    consoleError.mockRestore();
  });
});
