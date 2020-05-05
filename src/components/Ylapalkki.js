import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import CustomerList from './CustomerList';
import TrainingList from './TrainingList';
import Kalenteri from './Kalenteri'
import Chartteja from './Chartteja'
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={'div'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Customers" />
          <Tab label="Trainings" />
          <Tab label="Calendar" />
          <Tab label="Charts" />

        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <CustomerList />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TrainingList />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Kalenteri />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Chartteja />
      </TabPanel>
    </div>
  );
}
