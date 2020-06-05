import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import dayjs from 'dayjs';
import Loader from 'react-loader-spinner';
import { makeStyles } from '@material-ui/core/styles';
import Chart from 'react-apexcharts';

import { 
  LocalHospitalOutlined, 
  SentimentDissatisfiedOutlined, 
  SentimentSatisfiedOutlined 
} from '@material-ui/icons';

import InfoCard from '../../components/info-card/InfoCard.component';

const useStyles = makeStyles({
  infoCardContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0 auto',
    padding: '1em'
  }
})

const Home = () => {
  const [globalSummary, setGlobalSummary] = useState({});
  const [globalHistoricalSeries, setGlobalHistoricalSeries] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const classes = useStyles();

  const createSeries = (seriesObj) => {
    const data = [];

    for (let [key, value] of Object.entries(seriesObj)) {
      data.push({x: key, y: value})
    }

    return data;
  }

  useEffect(() => {
    const getGlobalSummaryData = async () => {
      try {
        const historicalResponse = await axios.get('https://corona.lmao.ninja/v2/historical/all?lastdays=all');
        const response = await axios.get('https://corona.lmao.ninja/v2/all?yesterday=false');
        setGlobalHistoricalSeries(historicalResponse.data);
        setGlobalSummary(response.data);
        setIsLoading(false);
      }
      catch(e) {
        console.log(e);
      }
    }

    getGlobalSummaryData();
  }, []);

  if (isLoading) {
    return (
      <Loader
        type="Circles"
        color="#00BFFF"
        height={100}
        width={100}
        visible={isLoading}
      />
    )
  }

  return (
    <div>
      <Helmet>
        <title>COVID19 Tracker</title>
      </Helmet>

      <h1>COVID-19 Tracker</h1>
      <p>Last updated: {dayjs(globalSummary.updated).format('MMM DD, YYYY, hh:mm A')}</p>

      <h2>Total Cases</h2>
      <div className={classes.infoCardContainer}>
        <InfoCard
          status="Confirmed"
          count={globalSummary.cases}
          backgroundColor="#78909C"
          icon={LocalHospitalOutlined}
        />
        <InfoCard
          status="Deaths"
          count={globalSummary.deaths}
          backgroundColor="#EF5350"
          icon={SentimentDissatisfiedOutlined}
        />
        <InfoCard
          status="Recovered"
          count={globalSummary.recovered}
          backgroundColor="#66BB6A"
          icon={SentimentSatisfiedOutlined}
        />
      </div>
      

      <h2>New Cases</h2>
      <div className={classes.infoCardContainer}>
        <InfoCard
          status="Confirmed"
          count={globalSummary.todayCases}
          backgroundColor="#78909C"
          icon={LocalHospitalOutlined}
        />
        <InfoCard
          status="Deaths"
          count={globalSummary.todayDeaths}
          backgroundColor="#EF5350"
          icon={SentimentDissatisfiedOutlined}
        />
        <InfoCard
          status="Recovered"
          count={globalSummary.todayRecovered}
          backgroundColor="#66BB6A"
          icon={SentimentSatisfiedOutlined}
        />
      </div>
      
      <h3>Historical Data Globally</h3>
      <Chart 
        height={350}
        type="line"
        series={[
          {
            name: 'Confirmed',
            data: createSeries(globalHistoricalSeries.cases)
          }
        ]}
        options={
          {
            stroke: {
              width: 2
            },
            xaxis: {
              type: 'datetime'
            }, 
            title: {
              text: 'Confirmed Cases',
              align: 'center'
            },
          }
        }
      />

    </div>
  )
}

export default Home;