import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    max-width: 100%;
    margin: 0;
    background-color: #f3fafd;
`;

const LeftColumn = styled.div`
    flex: 1;
    padding-top: 20px;
    position: sticky;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    background-color: #f3fafd;

    .inner-content {
        flex: 1;
        overflow-y: auto;
    }
`;

const RightColumn = styled.div`
    flex: 2.8;
    padding: 18px;
    padding-right: 200px;
    padding-right: 200px;
`;

const Header = styled.header`
    text-align: center;
    margin-bottom: 20px;
`;

const Name = styled.h1`
    font-size: 2.5em;
    margin-bottom: 0.2em;
`;

const Title = styled.h2`
    font-size: 1.5em;
    color: #333;
`;

const Summary = styled.p`
    font-size: 1.1em;
    line-height: 1.2;
    font-style: italic;
    text-align: justify;
`;

const Image = styled.img`
    width: 150px;
    height: 200px; 
    border-radius: 15px; 
    margin-bottom: 10px;
    border: 2px solid #7B7B7B; 
    object-fit: cover; 
    margin-left: 80px;
    margin-top: 30px;
`;

const IconWrapper = styled.div`
    margin-top: 10px;
`;

const IconLink = styled.a`
    margin-right: 10px;
    width: 40px;
    height: 40px;
    display: inline-block;
`;

const IconImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`;

const BoldText = styled.span`
    font-weight: bold;
`;

const Info = styled.p`
    font-size: 0.98em;
    line-height: 1;
    text-align: center;
`;


const SkillsContainer = styled.div`
    margin-right: 0;
    background-color: #f3fafd;
`;

const Skill = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

const SkillName = styled.span`
    font-weight: bold;
    margin-right: 10px;
    width: 100px;
`;

const SkillLevel = styled.div`
    width: 200px;
    height: 20px;
    background-color: #f3fafd;
    border-radius: 10px;
    overflow: hidden;
`;

const SkillLevelFill = styled.div<{ level: number }>`
    height: 100%;
    width: ${({ level }) => `${level}%`};
    background-color: #4caf50;
    border-radius: 10px;
`;

const SkillsTitle = styled.h3`
    margin-bottom: 15px;
    font-size: 1.2em;
`;

const ExperienceContainer = styled.div`
    margin-top: 20px;
`;

const ExperienceItem = styled.div`
    margin-bottom: 10px;
`;

const CompanyLogo = styled.img`
    width: 48px;
    height: 48px;
    margin-right: 5px;
    margin-top: 10px;
    border: 1px solid #CACACA;
    border-radius: 5px;
`;

const ExperienceHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    line-height: 2px;
`;

const ExperienceTitle = styled.h3`
    font-style: italic;
    text-align: left;
    font-size: 1.1em;
    margin-left: 10px;
`;

const ExperienceCompany = styled.h3`
    font-family: "Times New Roman", Times, serif;
    text-align: left;
    font-size: 0.9em;
    color: #7B7B7B;
    margin-left: 10px;
`;

const ExperienceDateRange = styled.h3`
    font-family: "Times New Roman", Times, serif;
    text-align: left;
    font-size: 0.9em;
    color: #7B7B7B;
    margin-left: 10px; /* Adjusted margin-left */
`;

const ExperienceContent = styled.div`
    padding: 10px;
`;

const SeeMoreLink = styled.span`
    color: #868483;
    cursor: pointer;
`;

export {
    Container,
    LeftColumn,
    RightColumn,
    Header,
    Name,
    Title,
    Summary,
    Image,
    IconWrapper,
    IconLink,
    IconImage,
    BoldText,
    Info,
    SkillsContainer,
    Skill,
    SkillName,
    SkillLevel,
    SkillLevelFill,
    SkillsTitle,
    ExperienceContainer,
    ExperienceItem,
    CompanyLogo,
    ExperienceHeader,
    ExperienceTitle,
    ExperienceCompany,
    ExperienceDateRange,
    ExperienceContent,
    SeeMoreLink
};
