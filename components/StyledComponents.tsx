import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    max-width: 100%;
    margin: 0;
    background-color: #f3fafd;
`;

const LeftColumn = styled.div`
    flex: 1;
    padding: 60px 18px 18px 0;
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
    font-size: 1.2em;
    line-height: 1.6;
    font-style: italic;
    text-align: center;
`;

const Image = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-bottom: 10px;
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

const AccordionWrapper = styled.div`
    margin-top: 20px;
`;

const AccordionItem = styled.div`
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 10px;
`;

const AccordionHeader = styled.div`
    background-color: #e9effa;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
`;

const AccordionTitle = styled.h3`
    font-size: 1.2em;
    margin: 0;
`;

const AccordionContent = styled.div`
    padding: 10px;
`;

const BoldText = styled.span`
    font-weight: bold;
`;

const Info = styled.p`
    font-size: 0.98em;
    line-height: 1;
    text-align: center;
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
    AccordionWrapper,
    AccordionItem,
    AccordionHeader,
    AccordionTitle,
    AccordionContent,
    BoldText,
    Info,
};
