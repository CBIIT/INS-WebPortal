import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import BentoFacetFilter from './BentoFacetFilter';

// Mock the GraphQL client to avoid HttpLink errors
jest.mock('../../../utils/graphqlClient', () => ({
  __esModule: true,
  default: {
    query: jest.fn(),
  },
}));

// Mock BentoFilterUtils to avoid graphql dependencies
jest.mock('./BentoFilterUtils', () => ({
  getAllSubjectIds: jest.fn(() => Promise.resolve([])),
  getAllIds: jest.fn(() => Promise.resolve([])),
}));

// Mock the store
jest.mock('../../../store', () => ({
  getState: () => ({}),
  subscribe: jest.fn(),
  dispatch: jest.fn(),
}));

const mockStore = {
  getState: () => ({}),
  subscribe: jest.fn(),
  dispatch: jest.fn(),
};

// Mock the resetIcon configuration
jest.mock('../../../bento/dashTemplate', () => ({
  facetsConfig: [],
  facetSectionVariables: {},
  resetIcon: {
    active: '/mock-path/reset-button-active.svg',
    disabled: '/mock-path/reset-button-disabled.svg',
    hover: '/mock-path/reset-button-hover.svg',
    alt: 'Reset icon',
    size: '12px',
  },
  sectionLabel: {},
}));

// Mock @bento-core/local-find
jest.mock('@bento-core/local-find', () => ({
  resetAllData: jest.fn(),
  chunkSplit: jest.fn(),
  SearchView: () => <div>SearchView</div>,
  SearchBoxGenerator: () => ({
    SearchBox: () => <div>SearchBox</div>,
  }),
  UploadModalGenerator: () => ({
    UploadModal: () => <div>UploadModal</div>,
  }),
}));

// Mock @bento-core/facet-filter
jest.mock('@bento-core/facet-filter', () => ({
  FacetFilter: () => <div>FacetFilter</div>,
  ClearAllFiltersBtn: ({ Component, activeFilters }) => {
    // Render the custom component with mock props
    const onClearAllFilters = jest.fn();
    const disable = !activeFilters || Object.keys(activeFilters).length === 0;
    return <Component onClearAllFilters={onClearAllFilters} disable={disable} />;
  },
}));

// Mock Material-UI components
jest.mock('@material-ui/core', () => ({
  ...jest.requireActual('@material-ui/core'),
  withStyles: () => (Component) => (props) => (
    <Component
      {...props}
      classes={{
        floatRight: 'floatRight',
        customButton: 'customButton',
        clearAllButtonRoot: 'clearAllButtonRoot',
        resetText: 'resetText',
        resetTextDisabled: 'resetTextDisabled',
      }}
    />
  ),
  AccordionSummary: ({ children, ...props }) => <div {...props}>{children}</div>,
  Button: ({ children, ...props }) => <button type="button" {...props}>{children}</button>,
}));

// Default props
const defaultProps = {
  searchData: {},
  activeFilters: {},
};

// Wrapper component to provide Redux context
const renderWithRedux = (component) => render(
  <Provider store={mockStore}>
    {component}
  </Provider>,
);

describe('BentoFacetFilter - Reset Button Icon States', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Disabled State', () => {
    it('should display the disabled icon when no active filters are present', () => {
      const props = {
        ...defaultProps,
        activeFilters: {},
      };

      renderWithRedux(<BentoFacetFilter {...props} />);

      const button = screen.getByRole('button', { name: /reset icon/i });
      const img = button.querySelector('img');

      expect(img).toHaveAttribute('src', '/mock-path/reset-button-disabled.svg');
      expect(button).toBeDisabled();
    });

    it('should display the disabled icon when activeFilters is empty object', () => {
      const props = {
        ...defaultProps,
        activeFilters: {},
      };

      renderWithRedux(<BentoFacetFilter {...props} />);

      const button = screen.getByRole('button', { name: /reset icon/i });
      const img = button.querySelector('img');

      expect(img).toHaveAttribute('src', '/mock-path/reset-button-disabled.svg');
    });

    it('should keep disabled icon on hover when button is disabled', () => {
      const props = {
        ...defaultProps,
        activeFilters: {},
      };

      renderWithRedux(<BentoFacetFilter {...props} />);

      const button = screen.getByRole('button', { name: /reset icon/i });
      const img = button.querySelector('img');

      // Hover over the button
      fireEvent.mouseEnter(button);

      // Icon should still be disabled, not hover
      expect(img).toHaveAttribute('src', '/mock-path/reset-button-disabled.svg');
      expect(button).toBeDisabled();
    });

    it('should display disabled text styling when button is disabled', () => {
      const props = {
        ...defaultProps,
        activeFilters: {},
      };

      renderWithRedux(<BentoFacetFilter {...props} />);

      const textSpan = screen.getByText('Clear all filtered selections');
      expect(textSpan).toHaveClass('resetTextDisabled');
    });
  });

  describe('Active/Default State', () => {
    it('should display the active icon when filters are present', () => {
      const props = {
        ...defaultProps,
        activeFilters: { someFilter: ['value1'] },
      };

      renderWithRedux(<BentoFacetFilter {...props} />);

      const button = screen.getByRole('button', { name: /reset icon/i });
      const img = button.querySelector('img');

      expect(img).toHaveAttribute('src', '/mock-path/reset-button-active.svg');
      expect(button).not.toBeDisabled();
    });

    it('should display active text styling when button is enabled', () => {
      const props = {
        ...defaultProps,
        activeFilters: { someFilter: ['value1'] },
      };

      renderWithRedux(<BentoFacetFilter {...props} />);

      const textSpan = screen.getByText('Clear all filtered selections');
      expect(textSpan).toHaveClass('resetText');
      expect(textSpan).not.toHaveClass('resetTextDisabled');
    });

    it('should have correct icon attributes', () => {
      const props = {
        ...defaultProps,
        activeFilters: { someFilter: ['value1'] },
      };

      renderWithRedux(<BentoFacetFilter {...props} />);

      const button = screen.getByRole('button', { name: /reset icon/i });
      const img = button.querySelector('img');

      expect(img).toHaveAttribute('alt', 'Reset icon');
      expect(img).toHaveAttribute('height', '12px');
      expect(img).toHaveAttribute('width', '12px');
    });
  });

  describe('Hover State', () => {
    it('should display the hover icon when mouse enters enabled button', () => {
      const props = {
        ...defaultProps,
        activeFilters: { someFilter: ['value1'] },
      };

      renderWithRedux(<BentoFacetFilter {...props} />);

      const button = screen.getByRole('button', { name: /reset icon/i });
      const img = button.querySelector('img');

      // Initially should show active icon
      expect(img).toHaveAttribute('src', '/mock-path/reset-button-active.svg');

      // Hover over the button
      fireEvent.mouseEnter(button);

      // Should now show hover icon
      expect(img).toHaveAttribute('src', '/mock-path/reset-button-hover.svg');
    });

    it('should return to active icon when mouse leaves button', () => {
      const props = {
        ...defaultProps,
        activeFilters: { someFilter: ['value1'] },
      };

      renderWithRedux(<BentoFacetFilter {...props} />);

      const button = screen.getByRole('button', { name: /reset icon/i });
      const img = button.querySelector('img');

      // Hover over the button
      fireEvent.mouseEnter(button);
      expect(img).toHaveAttribute('src', '/mock-path/reset-button-hover.svg');

      // Mouse leaves the button
      fireEvent.mouseLeave(button);

      // Should return to active icon
      expect(img).toHaveAttribute('src', '/mock-path/reset-button-active.svg');
    });

    it('should handle multiple hover events correctly', () => {
      const props = {
        ...defaultProps,
        activeFilters: { someFilter: ['value1'] },
      };

      renderWithRedux(<BentoFacetFilter {...props} />);

      const button = screen.getByRole('button', { name: /reset icon/i });
      const img = button.querySelector('img');

      // First hover
      fireEvent.mouseEnter(button);
      expect(img).toHaveAttribute('src', '/mock-path/reset-button-hover.svg');

      fireEvent.mouseLeave(button);
      expect(img).toHaveAttribute('src', '/mock-path/reset-button-active.svg');

      // Second hover
      fireEvent.mouseEnter(button);
      expect(img).toHaveAttribute('src', '/mock-path/reset-button-hover.svg');

      fireEvent.mouseLeave(button);
      expect(img).toHaveAttribute('src', '/mock-path/reset-button-active.svg');
    });
  });

  describe('State Transitions', () => {
    it('should transition from disabled to active state correctly', () => {
      const { rerender } = renderWithRedux(
        <BentoFacetFilter {...defaultProps} activeFilters={{}} />,
      );

      let button = screen.getByRole('button', { name: /reset icon/i });
      let img = button.querySelector('img');

      // Initially disabled
      expect(img).toHaveAttribute('src', '/mock-path/reset-button-disabled.svg');
      expect(button).toBeDisabled();

      // Update to have active filters
      rerender(
        <Provider store={mockStore}>
          <BentoFacetFilter {...defaultProps} activeFilters={{ filter: ['value'] }} />
        </Provider>,
      );

      // Query for elements again after rerender
      button = screen.getByRole('button', { name: /reset icon/i });
      img = button.querySelector('img');

      // Should now be active
      expect(img).toHaveAttribute('src', '/mock-path/reset-button-active.svg');
      expect(button).not.toBeDisabled();
    });

    it('should transition from active to disabled state correctly', () => {
      const { rerender } = renderWithRedux(
        <BentoFacetFilter {...defaultProps} activeFilters={{ filter: ['value'] }} />,
      );

      let button = screen.getByRole('button', { name: /reset icon/i });
      let img = button.querySelector('img');

      // Initially active
      expect(img).toHaveAttribute('src', '/mock-path/reset-button-active.svg');
      expect(button).not.toBeDisabled();

      // Update to have no active filters
      rerender(
        <Provider store={mockStore}>
          <BentoFacetFilter {...defaultProps} activeFilters={{}} />
        </Provider>,
      );

      // Query for elements again after rerender
      button = screen.getByRole('button', { name: /reset icon/i });
      img = button.querySelector('img');

      // Should now be disabled
      expect(img).toHaveAttribute('src', '/mock-path/reset-button-disabled.svg');
      expect(button).toBeDisabled();
    });

    it('should maintain hover state priority over active when enabled', () => {
      const props = {
        ...defaultProps,
        activeFilters: { someFilter: ['value1'] },
      };

      renderWithRedux(<BentoFacetFilter {...props} />);

      const button = screen.getByRole('button', { name: /reset icon/i });
      const img = button.querySelector('img');

      // Start with active
      expect(img).toHaveAttribute('src', '/mock-path/reset-button-active.svg');

      // Hover should take precedence
      fireEvent.mouseEnter(button);
      expect(img).toHaveAttribute('src', '/mock-path/reset-button-hover.svg');

      // Return to active
      fireEvent.mouseLeave(button);
      expect(img).toHaveAttribute('src', '/mock-path/reset-button-active.svg');
    });
  });

  describe('Icon Priority Logic', () => {
    it('should prioritize disabled state over hover state', () => {
      const props = {
        ...defaultProps,
        activeFilters: {},
      };

      renderWithRedux(<BentoFacetFilter {...props} />);

      const button = screen.getByRole('button', { name: /reset icon/i });
      const img = button.querySelector('img');

      // Disabled state
      expect(img).toHaveAttribute('src', '/mock-path/reset-button-disabled.svg');

      // Try to hover (should not change icon)
      fireEvent.mouseEnter(button);
      expect(img).toHaveAttribute('src', '/mock-path/reset-button-disabled.svg');

      // Try to leave hover (should still be disabled)
      fireEvent.mouseLeave(button);
      expect(img).toHaveAttribute('src', '/mock-path/reset-button-disabled.svg');
    });

    it('should prioritize hover state over active state when enabled', () => {
      const props = {
        ...defaultProps,
        activeFilters: { someFilter: ['value1'] },
      };

      renderWithRedux(<BentoFacetFilter {...props} />);

      const button = screen.getByRole('button', { name: /reset icon/i });
      const img = button.querySelector('img');

      // Active state by default
      expect(img).toHaveAttribute('src', '/mock-path/reset-button-active.svg');

      // Hover state takes priority
      fireEvent.mouseEnter(button);
      expect(img).toHaveAttribute('src', '/mock-path/reset-button-hover.svg');
    });
  });
});
