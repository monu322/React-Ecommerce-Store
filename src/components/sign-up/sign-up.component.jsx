import {useState} from 'react';

import './sign-up.styles.scss';

import { createAuthUserWithEmailAndPassword, createDocumentFromAuth } from '../../utils/firebase.utils';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

const defaultFormFields = {
    displayName:'',
    email:'',
    password:'',
    password2:''
}



function SignUp() {

    const [formFields, setFormFields] = useState(defaultFormFields);

    const {displayName, email, password, password2} = formFields;

    const resetFormFields = ()=>{
        setFormFields(defaultFormFields);
    }

    const handleSubmit= async(e)=>{
        e.preventDefault();

        if(password!==password2)
        {
            alert('Passwords do not match');
            return;
        }

        try{
            
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            await createDocumentFromAuth(user, {displayName});
            resetFormFields();

        } catch(error){
            console.log('User creation error', error)
        }
    }

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setFormFields({...formFields, [name]:value});
    }

  return (
    <div className='sign-up-container'>
        
        <h2>Dont't have an account?</h2>

        <span>Sign up with your email and password</span>

        <form onSubmit={(e)=>handleSubmit(e)}>

            <FormInput label="Name" onChange={handleChange} type="text" value={displayName} required name="displayName"/>
            
            <FormInput label="E-mail" onChange={handleChange} type="email" value={email} required name="email"/>
            
            <FormInput label="Password" onChange={handleChange} type="password" value={password} required name="password"/>

            <FormInput label="Confirm Password" onChange={handleChange} type="password" value={password2} required name="password2"/>

            <Button type="submit">Submit</Button>

        </form>

    </div>
  );
}

export default SignUp;
