import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Card, Row, Col } from 'antd';
import axios from 'axios';

import Loader from './Loader';

const ExtraCard = () => {
  const [postMarketPrice, setPostMarketPrice] = useState(null);
  const [regularMarketPrice, setRegularMarketPrice] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary', {
          params: {
            symbol: 'SPY',
            region: 'US'
          },
          headers: {
            'X-RapidAPI-Key': 'd4a2ed61e1msh2055761a61bd28cp195de7jsne8414e3df1a6',
            'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
          }
        });

        const { price } = response.data;
        if (price) {
          const { postMarketPrice, regularMarketPrice } = price;
          setPostMarketPrice(postMarketPrice?.raw);
          setRegularMarketPrice(regularMarketPrice?.raw);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCardClick = () => {
    const symbol = 'SPY'; // Symbol value for SPY
    window.history.pushState(null, '', `/stock/${symbol}`);
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <Row gutter={[32, 32]} justify="center">
          <Col xs={24} sm={24} md={12} lg={8}>
            <Card
              title={<span style={{ fontSize: '18px', color: '#1890ff' }}>SPY</span>}
              style={{ marginBottom: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', transition: 'transform 0.3s', background: '#f7f7f7',cursor: 'pointer' }}
              onClick={handleCardClick}
            >
              {postMarketPrice !== null && (
                <p style={{ marginBottom: '4px' }}>Post Market Price: {millify(postMarketPrice)}</p>
              )}
              {regularMarketPrice !== null && (
                <p style={{ marginBottom: '4px' }}>Regular Market Price: {millify(regularMarketPrice)}</p>
              )}
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default ExtraCard;
