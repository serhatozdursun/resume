import styled from "styled-components";

const Container = styled.div`
    display: flex;
    gap: 20px;
    padding: 20px;
    background-color: #f3fafd;
`;

const Header = styled.header`
    position: sticky;
    top: 0;
    background-color: #f3fafd;
    padding: 20px;
    z-index: 1000;
    width: 100%;
`;

const PageHeader = styled.header`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3em;
`;

const Column = styled.div`
    flex: 1;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
`;

const Label = styled.label`
    margin-bottom: 10px;
    font-weight: bold;
    display: block;
`;

const Description = styled.p`
    text-align: left;
    color: grey;
`;

const CheckboxLabel = styled.label`
    margin-bottom: 10px;
    font-weight: bold;
`;

const CheckboxInput = styled.input`
    padding: 10px;
    width: 300px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const Input = styled.input`
    padding: 10px;
    width: 300px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 10px 20px 15px 20px; /* Added margin for spacing between buttons */
`;

const Button = styled.button`
    padding: 10px 20px 15px 20px;
    background-color: #0070f3;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 200px;

    &:hover {
        background-color: #005bb5;
    }

    margin: 10px 20px 15px 20px; /* Added margin for spacing between buttons */
`;

const Example = styled.div`
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 5px;
    margin-bottom: 20px;
`;

const Iframe = styled.iframe`
    width: 500px;
`;

export {
    Button,
    CheckboxInput,
    CheckboxLabel,
    Column,
    Container,
    Description,
    Example,
    Form,
    FormGroup,
    Header,
    Iframe,
    Input,
    Label,
    PageHeader
};
