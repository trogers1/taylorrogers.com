import React from 'react';
import App from 'next/app';
import { styled } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import PageViews from 'components/organisms/PageViews';
import GlobalHeader from 'components/atoms/GlobalHeader';
import Head from 'next/head';

import { siteBackground, backgroundWhite } from 'helpers/colors';

const theme = responsiveFontSizes(createMuiTheme())

const GlobalStyles = ({ children, isDark }) => (
  <>
    {children}
    <style jsx global>{`
      html {
        font-size: 62.5%;
        height: 100%;
      }

      body {
        height: 100%;
        background: ${isDark ? siteBackground : backgroundWhite};
        margin: 0;
        padding: 0;
        font-family: 'Roboto', 'Segoe UI', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
          'Droid Sans', 'Helvetica Neue', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      #__next {
        height: 100%;
      }

      code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
      }
    `}</style>
  </>
);

const MyContainer = styled(Container)({
  minHeight: '100%',
});

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <meta charset="utf-8" />
          <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.svg" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width shrink-to-fit=no" />
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link rel="apple-touch-icon" href="favicon.svg" />
          <link
            href="https://fonts.googleapis.com/css?family=Roboto&display=swap"
            rel="stylesheet"
          />
        </Head>
        <CssBaseline />
        <GlobalStyles isDark>
          <PageViews />
          <MyContainer>
            <GlobalHeader />
            <Component {...pageProps} />
          </MyContainer>
        </GlobalStyles>
      </>
    );
  }
}

export default MyApp;
