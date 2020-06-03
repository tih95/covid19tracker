import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import dayjs from 'dayjs';

const Home = () => {
  const [globalSummary, setGlobalSummary] = useState({});
  const [lastUpdated, setLastUpdated] = useState();
  const [countries, setCountries] = useState([])

  useEffect(() => {
    const getGlobalSummaryData = async () => {
      try {
        const response = await axios.get('https://api.covid19api.com/summary')
        console.log(response.data);
        setGlobalSummary(response.data.Global);
        setLastUpdated(response.data.Date);
      }
      catch(e) {
        console.log(e);
      }
    }

    getGlobalSummaryData();
  }, [])

  return (
    <div>
      <Helmet>
        <title>COVID19 Tracker</title>
      </Helmet>

      <h1>COVID-19 Tracker</h1>
      <p>Last updated: {dayjs(lastUpdated).format('MMM DD, YYYY')}</p>
      <p>Total Confirmed Cases: {globalSummary.TotalConfirmed}</p>
      <p>Total Confirmed Deaths: {globalSummary.TotalDeaths}</p>
      <p>Total Confirmed Recoveries: {globalSummary.TotalRecovered}</p>


    </div>
  )
}

export default Home;