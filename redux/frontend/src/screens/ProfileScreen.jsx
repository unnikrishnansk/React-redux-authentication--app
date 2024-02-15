import React,{ useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { setCredentials } from '../slices/AuthSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useUpdateUserMutation } from '../slices/userApiSlices';

const ProfileScreen = () => {

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmpassword,setConfirmpassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [updateProfile, {isLoading}] = useUpdateUserMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const submitHandler = async (e) => {
        e.preventDefault();
        if(password !== confirmpassword){
            toast.error('Password does not match')
        }else{
            try {
                const res = await updateProfile({
                    _id: userInfo._id,
                    name,
                    email,
                    password
                }).unwrap();
                dispatch(setCredentials({...res}))
                toast.success('Profile updated successfully')
            } catch (err) {
                toast.error(err?.data?.message || err?.error)
            }
        }
    }

    useEffect(()=>{
        setName(userInfo.name);
        setEmail(userInfo.email);
    },[userInfo.setName, userInfo.setEmail])

  return (
        <FormContainer>
            <h1>Update Profile</h1>

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

                {isLoading && <Loader />  }

                <Button type='submit' variant='primary' className='mt-3'>Update</Button>

            </Form>
        </FormContainer>
  )
}

export default ProfileScreen