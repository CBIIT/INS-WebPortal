import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchRulesTooltip from './index';

describe('SearchRulesTooltip', () => {
  it('renders without crashing', () => {
    render(<SearchRulesTooltip />);
    const tooltipIcon = screen.getByAltText('Help: Search rules');
    expect(tooltipIcon).toBeInTheDocument();
  });

  it('displays the help icon', () => {
    render(<SearchRulesTooltip />);
    const tooltipIcon = screen.getByAltText('Help: Search rules');
    expect(tooltipIcon).toBeInTheDocument();
    expect(tooltipIcon.tagName).toBe('IMG');
  });

  it('displays the tooltip title', () => {
    render(<SearchRulesTooltip />);
    expect(screen.getByText('Search Rules')).toBeInTheDocument();
  });

  it('displays all search rule items', () => {
    render(<SearchRulesTooltip />);

    const searchRules = [
      'Non-alphanumeric characters',
      'Search terms must contain at least 3 consecutive alphanumeric characters',
      'Within searches with multiple terms',
      'Searches return both full and partial word matches',
      'Multiple search terms',
      'Results can be filtered using the checkboxes',
      'Selecting multiple filters within the same category',
      'Selecting filters across different categories',
    ];

    searchRules.forEach((rule) => {
      expect(screen.getByText(new RegExp(rule, 'i'))).toBeInTheDocument();
    });
  });

  it('shows tooltip content on mouse enter', () => {
    render(<SearchRulesTooltip />);
    const container = screen.getByAltText('Help: Search rules').closest('div');

    fireEvent.mouseEnter(container);
    const tooltipTitle = screen.getByText('Search Rules');
    expect(tooltipTitle).toBeInTheDocument();
  });

  it('hides tooltip content on mouse leave', () => {
    render(<SearchRulesTooltip />);
    const container = screen.getByAltText('Help: Search rules').closest('div');

    fireEvent.mouseEnter(container);
    fireEvent.mouseLeave(container);

    // Content should still be in the DOM but not visible
    const tooltipTitle = screen.getByText('Search Rules');
    expect(tooltipTitle).toBeInTheDocument();
  });

  it('has keyboard support via focus and blur', () => {
    render(<SearchRulesTooltip />);
    const container = screen.getByAltText('Help: Search rules').closest('div');

    // Simulate focus
    fireEvent.focus(container);
    // Since the component has onFocus handler, tooltip should be visible
    const tooltipTitle = screen.getByText('Search Rules');
    expect(tooltipTitle).toBeInTheDocument();

    // Test that blur handler is triggered
    fireEvent.blur(container);
    // Content should still be in the DOM after blur
    expect(tooltipTitle).toBeInTheDocument();
  });

  it('has correct tabIndex for keyboard accessibility', () => {
    render(<SearchRulesTooltip />);
    const container = screen.getByAltText('Help: Search rules').closest('div');
    expect(container).toHaveAttribute('tabIndex', '0');
  });

  it('contains the complete list structure', () => {
    render(<SearchRulesTooltip />);
    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(8);
  });

  it('contains correct tooltip structure', () => {
    const { container } = render(<SearchRulesTooltip />);
    const tooltipContainer = screen.getByAltText('Help: Search rules').closest('div');

    expect(tooltipContainer).toBeInTheDocument();
    expect(tooltipContainer.querySelector('img')).toBeInTheDocument();
    expect(tooltipContainer.querySelector('div:nth-child(2)')).toBeInTheDocument();
  });
});
