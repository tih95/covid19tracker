import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  card: props => ({
    backgroundColor: props.backgroundColor,
    textAlign: 'center',
    padding: '1em',
    borderRadius: '5px'
  }),
  count: {
    fontSize: '1.5em',
    fontWeight: 'bold',
    color: 'white'
  },
  description: {
    fontSize: '1.2em'
  }
})

const InfoCard = ({ status, count, icon, backgroundColor}) => {
  const classes = useStyles({backgroundColor});

  const StatusIcon = icon;

  return (
    <div className={classes.card}>
      <StatusIcon fontSize='large' />
      <p className={classes.description}>Total {status} Cases</p>
      <p className={classes.count}>{count.toLocaleString('en')}</p>
    </div>
  )
}

export default InfoCard;