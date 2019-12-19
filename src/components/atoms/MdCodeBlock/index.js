import React from 'react';
import styled from 'styled-components';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import style from 'react-syntax-highlighter/dist/esm/styles/prism/duotone-space';

const StyledCode = styled.code`
  white-space: pre;
  word-break: break-word;
  overflow-wrap: break-word;
`;

export default ({ children }) => {
  return (
    <SyntaxHighlighter
      language={children.props.className ? children.props.className.replace('lang-', '') : ''}
      style={style}
      showLineNumbers={false}
      CodeTag={StyledCode}
    >
      {children.props.children}
    </SyntaxHighlighter>
  );
};
