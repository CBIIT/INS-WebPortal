import '@testing-library/jest-dom';

// Mock window.scrollTo for jsdom
global.scrollTo = jest.fn();
