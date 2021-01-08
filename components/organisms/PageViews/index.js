import { useEffect } from 'react';
import config from 'config/config';
import { useRouter } from 'next/router';

// Google Analytics
import ReactGA from 'react-ga';
ReactGA.initialize(config.googleAnalyticsTrackingNumber);

const PageViews = () => {
  let { asPath } = useRouter();
  console.log('Google analytics: testing ', asPath, 'for localhost:3000');
  useEffect(() => {
    if (window.location.hostname === 'localhost') {
      ReactGA.pageview(asPath);
      console.log('Google analytics: tested ', asPath, ' location:', window.location);
    }
  }, [asPath]);
  return null;
};

export default PageViews;
