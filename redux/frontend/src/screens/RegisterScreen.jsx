import React,{ useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useRegisterMutation } from '../slices/userApiSlices';
import { setCredentials } from '../slices/AuthSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const RegisterScreen = () => {

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmpassword,setConfirmpassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [register , {isLoading}] = useRegisterMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const submitHandler = async (e) => {
        e.preventDefault();
        if(password !== confirmpassword){
            toast.error('Password does not match')
        }else{
            try {
            const res = await register({name,email,password}).unwrap();
            dispatch(setCredentials({...res}));
            navigate('/')
            } catch (error) {
                toast.error(error?.data?.message || error?.error);
            }
        }
    }

    useEffect(()=>{
        if(userInfo){
            navigate('/')
        }
    },[navigate,userInfo])

  return (
        <FormContainer>
            <h1>Register</h1>

            <Form onSubmit={submitHandler}>

            <Form.Group className='my-2' controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                    type='text'
                    placeholder='Enter Name'
                    value={name}
                    onChange={(e)=>setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>

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

                <Form.Group className='my-2' controlId='confirmpassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                    type='password'
                    placeholder='Enter Confirm Password'
                    value={confirmpassword}
                    onChange={(e)=>setConfirmpassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                { isLoading && <Loader />}

                <Button type='submit' variant='primary' className='mt-3'>Register</Button>

                <Row className='py-3'>
                    <Col>
                    Existing Customer? <Link to='/login'>Login</Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
  )
}

export default RegisterScreen