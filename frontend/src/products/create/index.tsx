import React from 'react';
import styled from 'styled-components';

const Container = styled.div``;
const Header = styled.header``;
const BackButton = styled.button``;
const SandwichMenu = styled.button``;
const PageTitle = styled.h1``;
const Card = styled.div``;
const CardTitle = styled.h2``;
const CardBody = styled.div``;
const Form = styled.form``;
const FormInput = styled.input``;
const SubmitButton = styled.button``;

const CreateProduct: React.FC = () => {
  return (
    <Container>
      <Header>
        <BackButton>Botao</BackButton>
        <SandwichMenu>Menu</SandwichMenu>
      </Header>
      <PageTitle>Produto</PageTitle>
      <Card>
        <CardTitle>Criar Produto</CardTitle>
        <CardBody>
          <Form>
            <FormInput type="text"/>
            <FormInput type="text"/>
            <FormInput type="text"/>
            <FormInput type="text"/>
            <SubmitButton>Criar</SubmitButton>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
};
export default CreateProduct;
