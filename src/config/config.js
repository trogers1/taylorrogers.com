const { REACT_APP_GOOGLE_ANALYTICS_TRACKING_NUMBER, REACT_APP_ENV } = process.env;
const REACT_APP_BLOG_POST_API =
  process.env[`REACT_APP_BLOG_POST_API_${REACT_APP_ENV === 'PROD' ? 'PROD' : 'QA'}`];

const config = {
  blogApiUrl: REACT_APP_BLOG_POST_API,
  env: REACT_APP_ENV,
  googleAnalyticsTrackingNumber: REACT_APP_GOOGLE_ANALYTICS_TRACKING_NUMBER
};

export default config;
