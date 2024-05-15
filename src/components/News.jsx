import React from 'react';
import moment from 'moment';
import { useGetCryptoNewsListQuery } from '../services/cryptoNewsApi'; // Import useGetCryptoNewsListQuery
import Loader from './Loader';

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const News = ({ simplified }) => {
  const { data: cryptoNews, isLoading } = useGetCryptoNewsListQuery(''); // Pass 'US' as the region parameter

  console.log(cryptoNews); // Check API response in the console

  if (isLoading || !cryptoNews || !cryptoNews.data || !cryptoNews.data.main || !cryptoNews.data.main.stream) return <Loader />; // Handle loading state and undefined cryptoNews

  const { stream } = cryptoNews.data.main;

  return (
    <div style={{ margin: '0 auto', maxWidth: '1200px' }}>
      {stream.map((newsItem, i) => (
        <div key={i} style={{ marginBottom: '24px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: '16px' }}> {/* Card styling */}
          <a href={newsItem.content.link} target="_blank" rel="noreferrer" className="news-link" style={{ textDecoration: 'none', color: '#000' }}>
            <div className="news-image-container">
              <h4 style={{ marginBottom: '12px', fontSize: '20px' }}>{newsItem.content.title}</h4> {/* Title styling */}
              <img
                src={newsItem.content.thumbnail?.resolutions?.[0]?.url || demoImage}
                alt=""
                className="news-image"
                style={{ width: '30%', height: '200px', borderRadius: '8px', 
                 marginBottom: '12px' }} // Image styling
              />
            </div>
            {/* <p className="news-description" style={{ marginBottom: '12px', color: '#666' }}>{newsItem.content.title}</p> Description styling */}
            <div className="provider-container" style={{ display: 'flex', alignItems: 'center', color: '#999' }}>
              <div className="provider-info" style={{ marginRight: '8px' }}>
                {/* <img src={newsItem.content.publisher_thumbnail?.url || demoImage} alt="" style={{ borderRadius: '50%', width: '30px', height: '30px' }} /> Avatar styling */}
                {/* <span className="provider-name" style={{ marginLeft: '8px', fontSize: '16px' }}>{newsItem.content.publisher}</span>   */}
              </div>
              {/* <span className="publish-time" style={{ fontSize: '14px', fontWeight: '500' }}>{moment.unix(newsItem.content.provider_publish_time).startOf('ss').fromNow()}</span> Time styling */}
            </div>
          </a>
        </div>
      ))}
    </div>
  );
};

export default News;




// // import React, { useState } from 'react';
// // import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
// // import moment from 'moment';

// // import { useGetCryptosQuery } from '../services/cryptoApi';
// // import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
// // import Loader from './Loader';

// // const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

// // const { Text, Title } = Typography;
// // const { Option } = Select;

// // const News = ({ simplified }) => {
// //   // const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
// //   const { data } = useGetCryptosQuery(100);
// //   // { newsCategory, count: simplified ? 6 : 12 }
// //   const { data: cryptoNews } = useGetCryptoNewsQuery();
// //   console.log(cryptoNews)
// //   if (!cryptoNews?.value) return <Loader />;

// //   return (
// //     <Row gutter={[24, 24]}>
// //       {!simplified && (
// //         <Col span={24}>
// //           <Select
// //             showSearch
// //             className="select-news"
// //             placeholder="Select a Crypto"
// //             optionFilterProp="children"
// //             // onChange={(value) => setNewsCategory(value)}
// //             filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
// //           >
// //             <Option value="Cryptocurency">Cryptocurrency</Option>
// //             {data?.data?.coins?.map((currency) => <Option value={currency.name}>{currency.name}</Option>)}
// //           </Select>
// //         </Col>
// //       )}
// //       {cryptoNews.value.map((news, i) => (
// //         <Col xs={24} sm={12} lg={8} key={i}>
// //           <Card hoverable className="news-card">
// //             <a href={news.url} target="_blank" rel="noreferrer">
// //               <div className="news-image-container">
// //                 <Title className="news-title" level={4}>{news.name}</Title>
// //                 <img src={news?.image?.thumbnail?.contentUrl || demoImage} alt="" />
// //               </div>
// //               <p>{news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}</p>
// //               <div className="provider-container">
// //                 <div>
// //                   <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="" />
// //                   <Text className="provider-name">{news.provider[0]?.name}</Text>
// //                 </div>
// //                 <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
// //               </div>
// //             </a>
// //           </Card>
// //         </Col>
// //       ))}
// //     </Row>
// //   );
// // };

// // export default News;


// import React from 'react';
// import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
// import moment from 'moment';

// import { useGetCryptosQuery } from '../services/cryptoApi';
// import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
// import Loader from './Loader';

// const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

// const { Text, Title } = Typography;
// const { Option } = Select;

// const News = ({ simplified }) => {
//   const { data } = useGetCryptosQuery(100);
//   const { data: cryptoNews } = useGetCryptoNewsQuery();

//   if (!cryptoNews) return <Loader />;

//   return (
//     <Row gutter={[24, 24]} style={{ margin: '0 auto', maxWidth: '1200px' }}>
//       {!simplified && (
//         <Col span={24}>
//           <Select
//             showSearch
//             className="select-news"
//             placeholder="Select a Crypto"
//             optionFilterProp="children"
//             filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
//             style={{ width: '100%' }}
//           >
//             <Option value="Cryptocurrency">Cryptocurrency</Option>
//             {data?.data?.coins?.map((currency) => <Option value={currency.name}>{currency.name}</Option>)}
//           </Select>
//         </Col>
//       )}
//       {Object.values(cryptoNews).map((newsItem, i) => (
//         <Col xs={24} sm={12} lg={8} key={i}>
//           <Card
//             hoverable
//             className="news-card"
//             style={{ marginBottom: '24px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
//           >
//             <a href={newsItem.link} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
//               <div className="news-image-container">
//                 <Title className="news-title" level={4} style={{ marginBottom: '12px' }}>{newsItem.title}</Title>
//                 <img
//                   src={newsItem.thumbnail && newsItem.thumbnail.resolutions && newsItem.thumbnail.resolutions[0] ? newsItem.thumbnail.resolutions[0].url : demoImage}
//                   alt=""
//                   style={{ width: '100%', borderRadius: '8px', objectFit: 'cover' }}
//                 />
//               </div>
//               <p style={{ marginBottom: '12px', color: '#666' }}>{newsItem.title}</p>
//               <div className="provider-container" style={{ display: 'flex', alignItems: 'center', color: '#999' }}>
//                 <div style={{ marginRight: '8px' }}>
//                   <Avatar src={demoImage} alt="" />
//                   <Text className="provider-name" style={{ marginLeft: '8px' }}>{newsItem.publisher}</Text>
//                 </div>
//                 <Text style={{ fontSize: '14px', fontWeight: '500' }}>{moment.unix(newsItem.providerPublishTime).startOf('ss').fromNow()}</Text>
//               </div>
//             </a>
//           </Card>
//         </Col>
//       ))}
//     </Row>
//   );
// };

// export default News;
