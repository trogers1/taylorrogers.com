import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import aboutSkills from 'helpers/aboutSkills';
import colors from 'helpers/colors';
import slugify from 'helpers/slugify';

import Face from 'images/face.jpg';

import CircleImage from 'components/atoms/CircleImage';
import ExternalLink from 'components/atoms/ExternalLink';
import Input from 'components/atoms/Input';
import InternalLink from 'components/atoms/InternalLink';
import Select from 'components/atoms/Select';
import Header from 'components/atoms/Header';
import TabButton from 'components/atoms/TabButton';
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
  background: ${colors.mutedDarkBlue};
  border: 0.1rem solid ${colors.mutedBlue};
  border-radius: 0.4rem;
  overflow: hidden;
`;

const StyledHeader = styled(Header)`
  text-align: center;
  width: 100%;
`;

const Flex = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  margin-left: 15%;
  margin-right: 15%;

  @media screen and (max-width: 799px) {
    flex-direction: column;
  }
`;

const StyledSelect = styled(Select)`
  margin: 0.5rem 1rem;
  max-width: 20rem;
  min-width: 10rem;

  @media screen and (max-width: 799px) {
    max-width: unset;
    min-width: unset;
    width: 100%;
  }
`;

const StyledInput = styled(Input)`
  margin: 0.5rem 1rem;
  max-width: 30rem;
  min-width: 10rem;

  @media screen and (max-width: 799px) {
    max-width: unset;
    min-width: unset;
    width: 100%;
  }
`;

const AboutPage = ({ location }) => {
  const [selectedTab, setSelectedTab] = useState('Developer');

  // Filter variables
  const [currFilter, setFilter] = useState('Default');
  const [filteredSkills, setFilteredSkills] = useState([]);
  const filterOptions = [
    'Default',
    'Frontend',
    'Backend',
    'DevOps',
    'Data/System Engineering',
    'Other',
    'Soft Skills',
    'All'
  ];

  // Search variables
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchInput) {
      setFilter('All');
      setSearchResults(
        aboutSkills
          .filter(skill => skill.name.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase()))
          .sort((a, b) => b.score - a.score)
      );
    } else if (currFilter === 'All') {
      const sortedSkills = aboutSkills.sort((a, b) => b.score - a.score);
      setFilteredSkills(sortedSkills);
    } else {
      setFilteredSkills(
        aboutSkills
          .filter(skill => skill.types.some(item => item === currFilter))
          .sort((a, b) => b.score - a.score)
      );
    }
  }, [currFilter, searchInput]);
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
                  Hey there! Thanks for checking out my site. I am a developer with over 3 years and
                  thousands of hours of professional software development experience. I am driven
                  and have a passion for solving difficult problems.
                </StyledParagraph>
                <StyledParagraph>
                  I&apos;m a Software Engineer at{' '}
                  <ExternalLink url="economicmodeling.com">Emsi</ExternalLink>, an economic modeling
                  firm specializing in labor market analytics. I excel at interpersonal
                  communication, and pride myself in being a leader, a problem solver, and
                  self-motivator.
                </StyledParagraph>
                <StyledParagraph>
                  I love DevOps, APIs, the design and implementation of algorithms, software design
                  patterns (such as SOLID), and have a passion for clean, well-documented, and
                  well-tested code. Feel free to{' '}
                  <ExternalLink url="mailto:taylorrogers@outlook.com">contact me</ExternalLink>{' '}
                  should you have any questions or comments.
                </StyledParagraph>

                <StyledHeader
                  isLink
                  headerType="h2"
                  location={location}
                  id={slugify('Selected Skills and Proficiencies')}
                >
                  Selected Skills and Proficiencies
                </StyledHeader>
                <Flex>
                  <StyledSelect
                    ariaLabel="Select Grouping of Skills to Display"
                    options={filterOptions}
                    onChange={e => setFilter(e.target.value)}
                    selection={currFilter}
                    placeholder="Filter to a Grouping of Skills"
                  />
                  <StyledInput
                    placeholder="Search Skills"
                    value={searchInput}
                    setValue={e => setSearchInput(e)}
                  />
                </Flex>
                <AnimatedBarChart
                  data={searchInput ? searchResults : filteredSkills}
                  maxPossible={100}
                  location={location}
                  shouldAnimate={selectedTab === 'Developer'}
                />
              </TabContent>
              <TabContent
                {...getTabPanelProps('Writer')}
                className={selectedTab === 'Writer' ? 'Visible' : 'Invisible'}
              >
                <StyledParagraph>
                  As a writer, I&apos;m a long&#8208;time hobby&#8208;ist who just enjoys it as a
                  creative output for expressing myself. I am a serial note&#8208;taker and have
                  taken to putting my notes about development online in the hopes that the notes I
                  have written for myself can be useful to others. You can check out my{' '}
                  <InternalLink to="/dev">Developer Notes and Tutorials</InternalLink> for more on
                  that.
                </StyledParagraph>
                <StyledParagraph>
                  For more creative things, I enjoy writing fantasy fiction as a hobby (you know,
                  like a nerd), as well as some poetry and music when I make the time. I also write
                  and world&#8208;build quite a bit regarding my own fantasy world, &quot;Greater
                  Ecumene&quot;, some of which I hope to eventually put on this site. I&apos;ve also
                  been known to write non-fiction personal essays from time&#8208;to&#8208;time.
                  Selected ones can be found on the{' '}
                  <InternalLink to="/essays">
                    section of my site devoted to such things.
                  </InternalLink>
                </StyledParagraph>
              </TabContent>
              <TabContent
                {...getTabPanelProps('Person')}
                className={selectedTab === 'Person' ? 'Visible' : 'Invisible'}
              >
                <StyledParagraph>
                  As a person, I am a great lover of the outdoors and life&#8208;long devotee to
                  self&#8208;improvement. I have previously been a professional whitewater rafting
                  guide, and have taken that passion through the rest of my life, including rowing
                  my own boat down the Grand Canyon in 2018. When outside, I&apos;d love to be doing
                  the above, as well as rock climbing, whitewater kayaking, cross&#8208;country
                  skiing, trail running, surfing, sailing, etc.
                </StyledParagraph>
                <StyledParagraph>
                  I&apos;m also a big believer in constant self improvement, both physically and
                  mentally. I am always looking to grow and better myself as a person, so you can
                  often find my trying something new and unfamiliar (and failing, often, in the
                  process).
                </StyledParagraph>
                <StyledParagraph>
                  I also happen to be married to the most amazing, beautiful, and talented woman in
                  the entire world (proof available upon request), with whom I spend most of my free
                  time, along with our two dogs Ricochet and Rosie.
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
