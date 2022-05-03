import './sign-in.styles.scss';

import { useState } from 'react';

import SignUp from '../sign-up/sign-up.component';

import { signInWithGooglePopup, createDocumentFromAuth, signInAuthUserWithEmailAndPassword } from '../../utils/firebase.utils';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

const defaultFormFields = {
  email: '',
  password: '',
};


function SignIn() {

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

    const logGoogleUser = async (event)=>{
      event.preventDefault();
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createDocumentFromAuth(user);
    } 

    const resetFormFields = () => {
      setFormFields(defaultFormFields);
    };

    const handleChange = (event) => {
      const { name, value } = event.target;
  
      setFormFields({ ...formFields, [name]: value });
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const response = await signInAuthUserWithEmailAndPassword(
          email,
          password
        );
        console.log(response);
        resetFormFields();
      } catch (error) {
        switch (error.code) {
          case 'auth/wrong-password':
            alert('incorrect password for email');
            break;
          case 'auth/user-not-found':
            alert('no user associated with this email');
            break;
          default:
            console.log(error);
        }
      }
    };

  return (
    <div className='authentication-container'>


    <div className='sign-up-container'>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />

        <FormInput
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        />
        <div className='buttons-container'>
          <Button type='submit'>Sign In</Button>
          <button className='button-container google-sign-in' type='button' onClick={logGoogleUser}>Google Sign In</button>
        </div>
      </form>

      
    </div>

        

        <SignUp/>

    </div>

   
  );
}

export default SignIn;
