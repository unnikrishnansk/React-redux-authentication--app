import React,{ useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { useLoginMutation } from '../slices/userApiSlices';
import { setCredentials } from '../slices/AuthSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const LoginScreen = () => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login , {isLoading}] = useLoginMutation();
    const { userInfo } = useSelector((state) => state.auth);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await login({email,password}).unwrap();
            dispatch(setCredentials({...res}));

            if(res.role==='user'){
                navigate('/')
                console.log(res.role);
            }else if(res.role==='admin'){
                navigate('/admin');
                console.log(res.role);
            } 
        } catch (error) {
            toast.error(error?.data?.message || error?.error);
        }
    }


    useEffect(()=>{
        if(userInfo?.role==='user'){
            navigate('/')
        }else if(userInfo?.role === 'admin'){
            navigate('/admin')
        }
    },[navigate,userInfo])

  return (
        <FormContainer>
            <h1>Sign In</h1>

            <Form onSubmit={submitHandler}>
                <Form.Group className='my-2' controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                    type='email'
                    placeholder='Enter Email'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                    type='password'
                    placeholder='Enter Password'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                { isLoading && <Loader />}

                <Button type='submit' variant='primary' className='mt-3'>Sign In</Button>

                <Row className='py-3'>
                    <Col>
                    New Customer? <Link to='/register'>Register</Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
  )
}

export default LoginScreen