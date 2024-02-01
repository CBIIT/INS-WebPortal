import React, { useCallback } from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import { WidgetGenerator } from '@bento-core/widgets';
import styles from './WidgetStyle';
import colors from '../../../utils/colors';
import { Typography } from '../../../components/Wrappers/Wrappers';
import formatWidgetData from './WidgetUtils';

const WidgetViewNciDoc = ({
  classes,
  data,
  theme,
}) => {
  const widgetConfig = [
    {
      type: 'donut',
      title: 'Projects by NCI DOCs',
      dataName: 'projectCountInProgramByDOCData',
      sliceTitle: 'Projects',
    },
  ];

  const displayWidgets = formatWidgetData(data, widgetConfig);

  const widgetGeneratorConfig = {
    theme,
    DonutConfig: {
      colors,
      styles: {
        cellPadding: 2,
        textOverflowLength: 20,
        textColor: theme.palette.widgetBackground.contrastText,
      },
    },
    SunburstConfig: {
      styles: {
        textColor: theme.palette.widgetBackground.contrastText,
      },
    },
  };
  const { Widget } = useCallback(WidgetGenerator(widgetGeneratorConfig), []);

  return (
    <>
      <Grid container>
        {widgetConfig.slice(0, 6).map((widget, index) => {
          const dataset = displayWidgets[widget.dataName];
          if (!dataset || dataset.length === 0) {
            return <></>;
          }
          if (widget.type === 'sunburst' && (!dataset.children || !dataset.children.length)) {
            return <></>;
          }
          return (
            <Grid key={index} item lg={4} md={6} sm={12} xs={12}>
              <Widget
                header={(
                  <Typography size="md" weight="normal" family="Nunito" color="lochmara">
                    {widget.title}
                  </Typography>
                )}
                bodyClass={classes.fullHeightBody}
                className={classes.card}
                bottomDivider
                customBackGround
                data={dataset}
                chartType={widget.type}
                sliceTitle={widget.sliceTitle}
                chartTitleLocation="bottom"
                chartTitleAlignment="center"
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default withStyles(styles, { withTheme: true })(WidgetViewNciDoc);
