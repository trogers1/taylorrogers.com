import React from 'react';
import App from 'next/app';
import PageViews from 'components/organisms/PageViews';
import Head from 'next/head';

const GlobalStyles = ({ children }) => (
  <>
    {children}
    <style jsx global>{`
      html {
        font-size: 62.5%;
        height: 100%;
      }

      body {
        height: 100%;
        background: #07132e;
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

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <meta charset="utf-8" />
          <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.svg" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#07132e" />
          <link rel="apple-touch-icon" href="favicon.svg" />
          <link
            href="https://fonts.googleapis.com/css?family=Roboto&display=swap"
            rel="stylesheet"
          />
        </Head>
        <GlobalStyles>
          <PageViews />
          <Component {...pageProps} />
        </GlobalStyles>
      </>
    );
  }
}

export default MyApp;
