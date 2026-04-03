import React from 'react';
import HtmlParser from 'html-react-parser';
import { SummaryContainer } from './Layout.styles';
import { summary } from '../data/profile';

const ProfileSummary: React.FC = () => (
  <SummaryContainer id='summary'>{HtmlParser(summary)}</SummaryContainer>
);

export default ProfileSummary;
