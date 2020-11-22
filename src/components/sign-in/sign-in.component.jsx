import React from 'react';
import './sign-in.styles.scss';

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { auth, signInWithGoogle } from "../../firebase/firebase.utils";

class SignIn extends React.Component{
    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { email, password } = this.state; //Getting user email and password from the state
        try {
            await auth.signInWithEmailAndPassword(email, password); //Use await for async event like firebase events
            //After successful authentication, we clear the state which holds the user inputs.
            this.setState({email: '', password: ''});
        }catch (error) {
            console.log(error)
        }

    }

    handleChange = event => {
         const { value, name} = event.target;
         this.setState({[name]: value})
    }

    render() {
        return (
            <div className='sign-in'>
                <h2>I already have an account </h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        name="email"
                        handleChange={this.handleChange}
                        value={this.state.email}
                        label='email'
                        required/>


                    <FormInput
                        name="password"
                        value={this.state.password}
                        label='password'
                        handleChange={this.handleChange}
                        required/>

                        <div className='buttons'>
                            <CustomButton type="submit" >Sign in</CustomButton>
                            <CustomButton onClick={signInWithGoogle} isGoogleSignIn >
                                Sign in with Google</CustomButton>
                        </div>


                </form>
            </div>
        );
    }
}

export default SignIn;