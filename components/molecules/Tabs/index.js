import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import clonedeep from 'lodash.clonedeep';

const TabList = styled.div`
  width: 100%;
`;

const Tabs = ({ tabGroupId, children, onChange }) => {
  tabGroupId = tabGroupId.replace(/\s/g, '-');
  const [tabs, setTabs] = useState([]);

  const cycleTabs = event => {
    let currIndex = tabs.findIndex(tab => tab.isActive);
    let nextIndex = currIndex;
    // Cycle to the right
    if (event.keyCode === 39) {
      nextIndex = (currIndex + 1) % tabs.length;
    }
    // Cycle to the left
    if (event.keyCode === 37) {
      nextIndex = currIndex === 0 ? tabs.length - 1 : currIndex - 1;
    }
    if (nextIndex !== currIndex) {
      onChange(tabs[nextIndex].tabName);
      document.getElementById(`tab-${tabs[nextIndex].id}`).focus();
    }
  };

  /**
   * A function that returns the props for a tab element (it should be a button for accessibility),
   * given it's name and the name of the currently active tab.
   * @param {String} tabName The name of the current tab.
   * @param {String} activeTabName The name of the tab that is currently active.
   */
  const getTabProps = (tabName, activeTabName) => {
    let currTab;

    // This will only be true on the first time each element using `getTabProps` is rendered
    if (tabs.findIndex(item => item.tabName === tabName) === -1) {
      // The object for the current tab element needs to be created

      currTab = {
        tabName,
        id: `${tabName.replace(/\s/g, '-')}-${tabGroupId}`,
        isActive: activeTabName === tabName
      };
      setTabs(newTabs => [...newTabs, currTab]);
    } else {
      // The object for the current tab element already exists, so we can use it
      currTab = tabs.find(tab => tab.tabName === tabName);
    }

    if (currTab.tabName === activeTabName && !currTab.isActive) {
      let newTabs = clonedeep(tabs);
      for (let tab of newTabs) {
        tab.isActive = tab.tabName === currTab.tabName;
      }
      setTabs([...newTabs]);
    }
    return {
      'aria-controls': `panel-${currTab.id}`,
      'aria-selected': currTab.isActive ? 'true' : 'false',
      id: `tab-${currTab.id}`,
      onClick: () => onChange(currTab.tabName),
      role: 'tab',
      tabIndex: currTab.isActive ? '0' : '-1',
      onKeyDown: e => cycleTabs(e)
    };
  };
  /**
   * A function that returns the props for a tab panel/content element, given the name of the
   * controlling tab.
   * @param {String} tabName The name of the current tab.
   */
  const getTabPanelProps = tabName => {
    const currTab = tabs.find(tab => tab.tabName === tabName);
    if (!currTab) {
      return;
    }
    return {
      'aria-labelledby': `tab-${currTab.id}`,
      hidden: !currTab.isActive,
      id: `panel-${currTab.id}`,
      role: 'tabpanel',
      tabIndex: currTab.isActive ? '0' : '-1'
    };
  };

  // Pass render props down to the children
  const childrenWithProps = children({ getTabProps, getTabPanelProps });
  return (
    <TabList role="tablist" aria-label={tabGroupId}>
      {childrenWithProps || null}
    </TabList>
  );
};

Tabs.propTypes = {
  tabGroupId: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired
};

export default Tabs;
