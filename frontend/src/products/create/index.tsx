import React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';

const Container = styled.div`
`;
const Header = styled.header`
`;
const BackButton = styled.button`
  border: 0;
  background-color: transparent;
`;
const SandwichMenu = styled.button`
  border: none;
  margin-left: 190px;
  background-color: transparent;
`;
const PageTitle = styled.h1`
align-items: center;
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: center;
width: 300px;
color: #BEC6CF;
`;
const Card = styled.div`
align-items: center;
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: center;
width: 300px;
`;
const CardTitle = styled.h2`
align-items: center;
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: center;
color: #5B62A2;
`;
const CardBody = styled.div`
background-color:#F2F2F7;
border-radius: 10px;
`;
const Form = styled.form`
flex-direction: column;
`;
const FormInput = styled.input`
width: 200px;
height: 25px;
margin: 5px;
margin-left: 50px;
align-items: center;
justify-content: center;
border: solid 1px #8854CA;
border-radius: 3px;
`;
const SubmitButton = styled.button`
width: 205px;
height: 35px;
margin: 10px;
margin-left: 50px;
align-items: center;
justify-content: center;
background-color: #8854CA;
color: white;
border: none;
border-radius: 3px;
`;

const CreateProduct: React.FC = () => {
  const history = useHistory ();
  const onBack = () => {history.goBack();};

  return (
    <Container>
      <Header>
        <BackButton onClick={onBack}><svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.585787 13.5858C-0.195263 14.3668 -0.195263 15.6332 0.585787 16.4142L13.3137 29.1421C14.0948 29.9232 15.3611 29.9232 16.1421 29.1421C16.9232 28.3611 16.9232 27.0948 16.1421 26.3137L4.82843 15L16.1421 3.68629C16.9232 2.90524 16.9232 1.63891 16.1421 0.857864C15.3611 0.0768156 14.0948 0.0768156 13.3137 0.857864L0.585787 13.5858ZM31 13L2 13V17L31 17V13Z" fill="#8854CA"/>
</svg>
</BackButton>
        <SandwichMenu><svg width="45" height="30" viewBox="0 0 45 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="45" height="6" rx="1" fill="#8854CA"/>
<rect y="12" width="45" height="6" rx="1" fill="#8854CA"/>
<rect y="24" width="45" height="6" rx="1" fill="#8854CA"/>
</svg>
</SandwichMenu>
      </Header>
      <PageTitle>Produto</PageTitle>
      <Card>

        <CardBody>
          <CardTitle>Criar Produto</CardTitle>
          <Form>
            <FormInput type="text" placeholder="Nome do produto" />
            <FormInput type="text" placeholder="Tags" />
            <FormInput type="text" placeholder="Preço" />
            <FormInput type="text" placeholder="Quantidade" />
            <SubmitButton>Criar</SubmitButton>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
};
export default CreateProduct;
