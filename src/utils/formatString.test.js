import formatSemicolonSeparatedString from './formatString';

describe('formatSemicolonSeparatedString', () => {
  it.each([
    null,
    undefined,
    '',
    false,
    0,
    NaN,
  ])('returns an empty string for falsy input: %p', (value) => {
    expect(formatSemicolonSeparatedString(value)).toBe('');
  });

  it('trims whitespace around semicolon-separated values', () => {
    expect(formatSemicolonSeparatedString('Value1;Value2')).toBe('Value1; Value2');
    expect(formatSemicolonSeparatedString('Value1;  Value2')).toBe('Value1; Value2');
    expect(formatSemicolonSeparatedString('  Value1  ;   Value2   ')).toBe('Value1; Value2');
  });

  it('normalizes tabs and newlines around values', () => {
    expect(formatSemicolonSeparatedString('Alpha;\nBeta')).toBe('Alpha; Beta');
    expect(formatSemicolonSeparatedString('Alpha;\tBeta')).toBe('Alpha; Beta');
    expect(formatSemicolonSeparatedString('\nAlpha\t;  Beta  \n')).toBe('Alpha; Beta');
  });

  it('keeps already formatted strings unchanged', () => {
    expect(formatSemicolonSeparatedString('Alpha; Beta; Gamma')).toBe('Alpha; Beta; Gamma');
  });

  it('preserves internal content that is not surrounding a semicolon', () => {
    expect(formatSemicolonSeparatedString('Gene A;Gene B with spaces')).toBe('Gene A; Gene B with spaces');
    expect(formatSemicolonSeparatedString('Alpha Beta;Gamma Delta')).toBe('Alpha Beta; Gamma Delta');
  });

  it('returns an empty string for whitespace-only input', () => {
    expect(formatSemicolonSeparatedString('   \t  \n  ')).toBe('');
  });

  it('preserves empty segments between delimiters', () => {
    expect(formatSemicolonSeparatedString('A;;B')).toBe('A; ; B');
    expect(formatSemicolonSeparatedString('A; ;B')).toBe('A; ; B');
  });

  it('trims leading and trailing semicolon spacing', () => {
    expect(formatSemicolonSeparatedString('  A ; B  ')).toBe('A; B');
    expect(formatSemicolonSeparatedString(';A;B;')).toBe('; A; B; ');
  });
});
