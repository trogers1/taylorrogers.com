import { useEffect } from 'react';
import config from 'config/config';
import { useLocation } from 'react-router-dom';

// Google Analytics
import ReactGA from 'react-ga';
ReactGA.initialize(config.googleAnalyticsTrackingNumber);

const PageViews = () => {
  let location = useLocation();
  useEffect(() => {
    if (window.location.hostname !== 'localhost') {
      ReactGA.pageview(location.pathname + location.search);
    }
  }, [location]);
  return null;
};

export default PageViews;
