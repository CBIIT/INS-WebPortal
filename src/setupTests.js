import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

// Mock window.scrollTo for jsdom
global.scrollTo = jest.fn();

// Mock MutationObserver for testing-library
global.MutationObserver = jest.fn(() => ({
  observe: jest.fn(),
  disconnect: jest.fn(),
  takeRecords: jest.fn(),
}));
