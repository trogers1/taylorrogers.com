import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import aboutSkills from 'helpers/aboutSkills';
import colors from 'helpers/colors';

import Face from 'images/face.jpg';

import TabButton from 'components/atoms/TabButton';
import CircleImage from 'components/atoms/CircleImage';
import Header from 'components/atoms/Header';
import AnimatedBarChart from 'components/molecules/AnimatedBarChart';
import Tabs from 'components/molecules/Tabs';

const Centered = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  min-height: 100%;
  margin: 2rem;
  padding: 1rem;
`;

const StyledImg = styled.img`
  height: 134%;
  margin-top: -4rem;
`;

const StyledParagraph = styled.p`
  font-size: 2rem;
  font-weight: 400;
  margin-left: 15%;
  margin-right: 15%;

  @media (max-width: 799px) {
    margin-left: 1rem;
    margin-right: 1rem;
  }
`;

const TabContent = styled.div`
  .Visible {
    opacity: 1;
    transition: opacity 2s ease 2s;
  }
  .Invisible {
    opacity: 0;
  }
`;

const TabButtonWrapper = styled.div`
  all: unset;
  background: ${colors.mutedDarkBlue}
  border: 0.1rem solid ${colors.mutedBlue};
  border-radius: 0.4rem;
  overflow: hidden;
`;

const AboutPage = ({ location }) => {
  const [selectedTab, setSelectedTab] = useState('Developer');
  return (
    <Tabs
      tabGroupId="About"
      onChange={choice => {
        setSelectedTab(choice);
      }}
    >
      {({ getTabProps, getTabPanelProps }) => (
        <Centered>
          <CircleImage>
            <StyledImg src={Face} alt="Image of Taylor Rogers' smiling face." />
          </CircleImage>
          <Header isLink headerType="h2" location={location} id="about-taylor">
            About Taylor, the&hellip;
          </Header>
          <>
            <TabButtonWrapper>
              <TabButton
                position="first"
                isActive={selectedTab === 'Developer'}
                {...getTabProps('Developer', selectedTab)}
              >
                Developer
              </TabButton>
              <TabButton
                position="middle"
                isActive={selectedTab === 'Writer'}
                {...getTabProps('Writer', selectedTab)}
              >
                Writer
              </TabButton>
              <TabButton
                position="last"
                isActive={selectedTab === 'Person'}
                {...getTabProps('Person', selectedTab)}
              >
                Person
              </TabButton>
            </TabButtonWrapper>
            <div>
              <TabContent
                {...getTabPanelProps('Developer')}
                className={selectedTab === 'Developer' ? 'Visible' : 'Invisible'}
              >
                <StyledParagraph>
                  1 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim id est laborum
                </StyledParagraph>
                <StyledParagraph>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim id est laborum
                </StyledParagraph>
                <AnimatedBarChart
                  title="Selected Skills and Proficiencies"
                  data={aboutSkills}
                  maxPossible={100}
                  location={location}
                />
              </TabContent>
              <TabContent
                {...getTabPanelProps('Writer')}
                className={selectedTab === 'Writer' ? 'Visible' : 'Invisible'}
              >
                <StyledParagraph>
                  2 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim id est laborum
                </StyledParagraph>
                <StyledParagraph>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim id est laborum
                </StyledParagraph>
              </TabContent>
              <TabContent
                {...getTabPanelProps('Person')}
                className={selectedTab === 'Person' ? 'Visible' : 'Invisible'}
              >
                <StyledParagraph>
                  3 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim id est laborum
                </StyledParagraph>
                <StyledParagraph>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim id est laborum
                </StyledParagraph>
              </TabContent>
            </div>
          </>
        </Centered>
      )}
    </Tabs>
  );
};

export default AboutPage;