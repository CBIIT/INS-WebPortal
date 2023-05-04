import React, { useState, useRef, useEffect } from 'react';
import {
  withStyles,
  Typography,
} from "@material-ui/core";
import {
  createViewState,
  createJBrowseTheme,
  JBrowseLinearGenomeView,
  ThemeProvider,
} from '@jbrowse/react-linear-genome-view';
import configuration from './config/configuration';
import tracks from './config/tracks';
import JBrowseMenu from './component/MuiMenu';
import { ViewTrack, Display, Session, View } from './JBrowseProperties';

const createTheme = (theme) => createJBrowseTheme(theme);

const getSession = (session, assembly, prev) => {
  const { view, name } = session;
  if (view && view.tracks && view.tracks.length > 0) {
    const refTrack = view.tracks.filter((track) => track.configuration === prev.current)[0];
    if (refTrack) {
      const { displays } = refTrack;
      const { sequence } = assembly;
      const display = new Display(
        displays[0].type,
        displays[0].height,
        displays[0].maxDisplayedBpPerPx,
        `${sequence.trackId}-${displays[0].type}`
      );
      const refViewTrack = new ViewTrack(
        refTrack.type,
        sequence.trackId,
        [{ ...display }],
      );
      const viewTracks = [];
      view.tracks.forEach((item) => {
        if(item.configuration !== prev.current) {
          viewTracks.push({...item});
        }
      });
      const newView = new View(
        view.id,
        view.type,
        [{ ...refViewTrack },  ...viewTracks ],
      );
      const newSession = new Session(
        name,
        { ...newView }
      )
      return { ...newSession }
    }
  }
  return session;
};

const getLocation = (region, location) => {
  if (region.current.refName !== undefined) {
    return `${region.current.refName}:${region.current.start}..${region.current.end}`
  }
  return location;
}

const JBrowseView = ({ viewState }) => {
  return <JBrowseLinearGenomeView viewState={createViewState(viewState)} />
};

const JBrowseComponent = ({
  classes,
  assembly,
  defaultSession,
  tracks,
  location,
  configuration,
  aggregateTextSearchAdapters,
  theme,
  assemblies,
  customStyle,
  text,
}) => {

  const region = useRef();
  const onChange = (patch, reversePatch) => {
    if (patch.value && patch.value.region) {
      region.current = patch.value.region;
    }
  };

  const [viewState, setViewState] = useState({
    assembly: assembly ? assembly : assemblies[0],
    tracks,
    location: location,
    configuration,
    defaultSession,
    aggregateTextSearchAdapters,
    onChange,
  });

  const ref = useRef();
  useEffect(() => {
    const { assembly } = viewState;
    ref.current = assembly ? assembly.sequence.trackId : null;
  }, [viewState]);

  const setReferenceSequence = (item, e) => {
    const { defaultSession } = viewState;
    const viewSession = getSession(defaultSession, item, ref);
    const viewRegion = getLocation(region, location);
    setViewState({
      ...viewState,
      ...{ location: viewRegion},
      ...{ defaultSession: viewSession },
      ...{ assembly: item }
    });
  }

  if (assembly === undefined && assemblies === undefined) {
      return ( 
        <Typography className={classes.warning}>
          Assembly is required.
        </Typography>
      );
  };

  return (
    <> 
      {assemblies && (
        <div className={classes.menu}>
          <JBrowseMenu
            items={assemblies}
            selectHandler={(item, e) => setReferenceSequence(item, e)}
            text={text}
            customStyle={customStyle}
          />
        </div>)
      }
      <ThemeProvider theme={createTheme(theme)}>
        <JBrowseView
          viewState={viewState}
        />
      </ThemeProvider>
    </>
  )
};

const styles = (theme) => ({
  menu: {
    marginLeft: '20px',
  },
  warning: {
    color: '#ff3300',
    fontSize: '15px',
  },
})

JBrowseComponent.defaultProps = {
  location: '10:29,838,737..29,838,819',
  configuration: configuration,
  tracks: tracks,
  text: 'Reference Sequence',
  customStyle: {},
}

export default withStyles(styles, { withTheme: true })(JBrowseComponent);
