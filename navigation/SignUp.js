import React from 'react';
import axios from 'axios';
import SignUpForm from '../components/Form/SignUpForm';
import ShowToast from '../components/Shared/Toast';

export default function SignUp(props) {
  const { navigation } = props;
  const handleSignup = (values) => {
    axios
      .post('http://localhost:3333/api/1.0.0/user', {
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        password: values.password,
      })

      .then((response) => {
        console.log(response);
        ShowToast('success', 'Successful: You have created a new account!');
        navigation.navigate('Login');
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  return <SignUpForm handleSignup={handleSignup} navigation={navigation} />;
}
