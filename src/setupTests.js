import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

// Mock window.scrollTo for jsdom
global.scrollTo = jest.fn();
