import './sign-in.styles.scss';

import SignUp from '../sign-up/sign-up.component';

import { signInWithGooglePopup, createDocumentFromAuth } from '../../utils/firebase.utils';

function SignIn() {

    const logGoogleUser = async ()=>{
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createDocumentFromAuth(user);
    } 

  return (
    <div className='sign-in'>
        
        <h1>Sign In</h1>

        <button onClick={logGoogleUser}>Sign In with Google</button>

        <SignUp/>

    </div>

   
  );
}

export default SignIn;
