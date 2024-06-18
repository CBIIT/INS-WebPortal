import React from 'react';
import StatsBar from '@bento-core/stats-bar';
import { withStyles } from '@material-ui/core';
import { statsStyling, globalStatsData } from '../../bento/globalStatsData';

// TODO - see if the variables `data` and `stats` can be merged to begin with
const StatsView = ({ data, classes }) => {
  // Incorporate data into the stats array
  const stats = globalStatsData.map((e) => ({
    name: e.statTitle,
    val: data[e.statAPI],
    statIconSrc: e.statIconSrc,
  }));

  return (
    <div className={classes.statsContainer}>
      <StatsBar
        stats={stats}
        styles={statsStyling}
      />
    </div>
  );
};
const styles = () => ({
  statsContainer: {
    width: '100%',
  },
});

export default withStyles(styles)(StatsView);
