import React from 'react';

import CodeHighlight from 'components/atoms/CodeHighlight';

export default ({ children }) => {
  if (children.props) {
    return (
      <CodeHighlight
        language={children.props.className ? children.props.className.replace('lang-', '') : ''}
      >
        {children.props.children}
      </CodeHighlight>
    );
  } else {
    return children;
  }
};
