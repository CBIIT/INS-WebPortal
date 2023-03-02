/* eslint-disable */
import React from 'react';
import {
  Typography as TypographyBase,
} from '@material-ui/core';

const TypographyExtended = ({
  theme, children, weight, size, family, colorBrightness, ...props
}) => (
  <TypographyBase
    style={{
      color: getColor(props.color, theme, colorBrightness),
      fontWeight: getFontWeight(weight),
      fontSize: getFontSize(size, props.variant, theme),
      fontFamily: family
    }}
    {...props}
  >
    {children}
  </TypographyBase>
);

export const Typography = TypographyExtended;
