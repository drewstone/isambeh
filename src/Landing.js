// @flow
import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Button, Container, Header } from 'semantic-ui-react'
import styled from 'styled-components';

const Section = styled.div`
  height: 100%;
  min-height: 100vh;
  width: 100%;
`;

const BannerSection = styled(Section)`
  background-color: lightsteelblue;
  background-size: cover;
  
  div.ui.text.container {
    padding-top: 10%;
  }

  div.btn-container {
    display: flex;
    justify-content: space-between;
    max-width: 500px;
  }

  @media only screen and (min-width: 768px) {
    h1.ui.header {
      font-size: 4rem;
    }

    h2.ui.header {
      margin-bottom: 30px;
      margin-top: 0;
      font-size: 2rem;
    }
  }
`;

const StyledBannerSection = () => <BannerSection>
  <Container text>
    <Header as='h1'>isambeh</Header>
    <Header as='h2'>ISA's on blockchain</Header>

    <div className='btn-container'>
      <Button color='purple' size='huge' as={Link} to='/lender/signup'>Fund a student</Button>
      <Button color='green' size='huge' as={Link} to='/student/signup'>Fund your education</Button>
    </div>
  </Container>
</BannerSection>

class Landing extends Component {
  render() {
    return (
      <div>
        <StyledBannerSection />
      </div>
    );
  }
}

export default Landing;