import React from 'react';
import App from 'next/app';

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
      <GlobalStyles>
        <Component {...pageProps} />
      </GlobalStyles>
    );
  }
}

export default MyApp;
