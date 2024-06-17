import React, { useState } from 'react';
import { withStyles } from "@material-ui/core";

const DisClaimer = ({ classes }) => (
  <>
    <div className={classes.disclaimer}>
      <p>
        The INS website is under active development.
        Some NCI-supported projects and associated
        outputs may not be represented here.
      </p>
      <p>
        Please contact the
        <a
          className={classes.aboutLink}
          href="mailto:nciofficeofdatasharing@mail.nih.gov?Subject=Index%20of%20NCI%20Studies%20feedback"
        >
          ODS mailbox
        </a>
        to provide updates or feedback.
      </p>
    </div>
  </>
);

const styles = () => ({
  disclaimer: {
    position: 'relative',
    backgroundColor: '#b31d3d',
    width: '100%',
    padding: '10px 0',
    textAlign: 'center',
    color: 'white',
    fontSize: '14px',
    fontFamily: 'Nunito',
    fontWeight: '500',
    paddingTop: '8px',
    zIndex: 99,

    '& p': {
      margin: '0px',
      lineHeight: '16px',
    },
  },
  aboutLink: {
    fontWeight: "800",
    color: 'white',
    padding: '5px',
  },
});
export default withStyles(styles, { withTheme: true })(DisClaimer);
