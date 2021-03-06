import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import hljs from 'highlight.js/lib/highlight';
import 'highlight.js/styles/atom-one-dark.css'; // import preferred style

const registeredLanguages = {};

const StyledPre = styled.pre`
  font-size: 1.6rem;
  line-height: 1.5;
  > * {
    font-size: 1.6rem;
    line-height: 1.5;
  }
`;

export class CodeHighlight extends Component {
  constructor(props) {
    super(props);
    // do not show anything until language is loaded
    this.state = {
      loaded: false,
      translations: {
        js: 'javascript',
        terraform: 'javascript', // Since highlight.js doesn't support terraform
        yml: 'yaml'
      }
    };
    // create a ref to highlight only the rendered node and not fetch all the DOM
    this.codeNode = React.createRef();
  }

  componentDidMount() {
    const { language } = this.props;
    const { translations } = this.state;
    if (language && !registeredLanguages[language]) {
      try {
        const newLanguage = require(`highlight.js/lib/languages/${translations[language] ||
          language}`);
        hljs.registerLanguage(language, newLanguage);
        registeredLanguages[language] = true;
        this.setState(
          () => ({ loaded: true }),
          () => {
            this.highlight();
          }
        );
      } catch (e) {
        console.warn(e);
        this.setState({ loaded: true });
      }
    } else {
      this.setState({ loaded: true });
    }
  }

  componentDidUpdate() {
    this.highlight();
  }

  highlight = () => {
    this.codeNode && this.codeNode.current && hljs.highlightBlock(this.codeNode.current);
  };

  render() {
    const { language, children } = this.props;
    const { loaded } = this.state;
    if (!loaded) {
      return null; // or show a loader
    }
    return (
      <StyledPre>
        <code ref={this.codeNode} className={language}>
          {children}
        </code>
      </StyledPre>
    );
  }
}

CodeHighlight.propTypes = {
  children: PropTypes.node.isRequired,
  language: PropTypes.string
};
// optionally set the language you think will use most as a default value
// if you don't set this, I would encourage to make language prop required,
// or at least improve the "else" statement in "componentDidMount"
CodeHighlight.defaultProps = {
  language: 'javascript'
};

export default CodeHighlight;
