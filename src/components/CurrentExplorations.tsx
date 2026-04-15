import React from 'react';
import { currentExplorations } from '../data/explorations';
import {
  ExplorationHeading,
  ExplorationList,
  ExplorationListItem,
  ExplorationSection,
} from './CurrentExplorations.styles';

const CurrentExplorations: React.FC = () => {
  return (
    <ExplorationSection aria-label='What I am currently exploring'>
      <ExplorationHeading>What I&apos;m Currently Exploring</ExplorationHeading>
      <ExplorationList>
        {currentExplorations.map(item => (
          <ExplorationListItem key={item.id}>{item.label}</ExplorationListItem>
        ))}
      </ExplorationList>
    </ExplorationSection>
  );
};

export default CurrentExplorations;
