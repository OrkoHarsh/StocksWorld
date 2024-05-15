import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios

import Cryptocurrencies from './Cryptocurrencies';
import News from './News';
import Loader from './Loader';

const { Title } = Typography;

const Homepage = () => {
  const [globalStats, setGlobalStats] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchGlobalStats = async () => {
      const options = {
        method: 'GET',
        url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-summary',
        params: { region: 'IN' },
        headers: {
          'X-RapidAPI-Key': 'd4a2ed61e1msh2055761a61bd28cp195de7jsne8414e3df1a6',
          'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        const { marketSummaryAndSparkResponse } = response.data;
        const globalStatsData = marketSummaryAndSparkResponse.result;

        // Map through the data to extract relevant information
        const formattedGlobalStats = globalStatsData.map(stat => ({
          fullExchangeName: stat.fullExchangeName,
          previousClose: stat.regularMarketPreviousClose.raw, // Access previousClose from regularMarketPreviousClose
          symbol: stat.symbol // Access symbol field
        }));

        // Limit to 6 items
        const limitedGlobalStats = formattedGlobalStats.slice(0, 6);

        setGlobalStats(limitedGlobalStats);
      } catch (error) {
        console.error(error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchGlobalStats();
  }, []);

  if (isFetching) return <Loader />;

  return (
    <>
   
      <Title level={2} className="heading">Global Market Stats</Title>
      <Row gutter={[32, 32]}>
        {globalStats.map((stat, index) => (
          <Col key={index} span={12}>
            <Statistic title={stat.fullExchangeName} value={millify(stat.previousClose)} />
            <p><strong>Symbol:</strong> {stat.symbol}</p> {/* Render the symbol field */}
          </Col>
        ))}
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">Top US Market Stocks In The World</Title>
        <Title level={3} className="show-more"><Link to="/stocks">Show more</Link></Title>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <Title level={2} className="home-title">Latest Stock News</Title>
        <Title level={3}><Link to="/news">Show more</Link></Title>
      </div>
      <News simplified />
    </>
  );
};

export default Homepage;
