import { Container, Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';

const Hero = () => {

  const { userInfo } = useSelector((state)=> state.auth);
  console.log(userInfo);

  return (
    <div className=' py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h1 className='text-center mb-4'>MERN Authentication</h1>
          <p className='text-center mb-4'>
            Hi, Welcome to the HomePage
          </p>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;