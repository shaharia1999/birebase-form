

import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import app from './firebase.int'
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';







function App()
    

{
  const [email,setEmail]=useState('');
  const [pass,setPass]=useState('');
  const [register,setRegister]=useState(false);
  const auth=getAuth(app);
const emailhandelar=(e)=>{
  setEmail(e.target.value);


}
const passwordhandelar=(e)=>{
  setPass(e.target.value);


}
const registerChack=(e)=>{
  setRegister(e.target.checked)

}


const Varficatiton=()=>{
  const auth = getAuth();
  sendEmailVerification(auth.currentUser)
    .then(() => {
      console.log("varification mail sent")
      // Email verification sent!
      // ...
    });

}
const forgetpass=()=>{
  sendPasswordResetEmail(auth, email)
  .then(() => {
     console.log("forget sucessfull")
    // ..
  })
  .catch((error) => {
         console.log("error")
  });

}

const fromhandelar=(e)=>{
  if(register){
    const auth = getAuth();
signInWithEmailAndPassword(auth, email, pass)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
    // ...
  })
  .catch(error=>{
    console.log(error)
  })
  }
  else{
    createUserWithEmailAndPassword(auth,email,pass)
.then((userCredential) => {
  const user = userCredential.user;
  console.log(user)
  setPass('');
  setEmail('');
  Varficatiton();

  // ...
})
.catch(error=>{
  console.log(error)
})
  }

  e.preventDefault()
}
  return (
    <div >
     <div className="w-50 mx-auto mt-5">
       <h2 className='text-primary'>Plese {register?'Login':'Ragister'}!!!!</h2>
     <Form onSubmit={fromhandelar}>
  <Form.Group className="mb-3" controlId="formBasicEmail" required>
    <Form.Label>Email address</Form.Label>
    <Form.Control onBlur={emailhandelar} type="email" placeholder="Enter email" required />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control onBlur={passwordhandelar} type="password" placeholder="Password" required />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check onChange={registerChack} type="checkbox" label="All Ready Ragister" />
  </Form.Group>
  <br />
  <h3  onClick={forgetpass} className='text-primary' >forget Password??</h3>
  <Button variant="primary" type="submit">
  {register?'Login':'Ragister'}
  </Button>
</Form>
     </div>
    </div>
  );
}

export default App;
