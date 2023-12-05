import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Error, Input, Switcher, Title, Wrapper } from "../components/auth-components";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { FirebaseError } from "firebase/app";

export default function ResetPassword(){
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: {name, value}
        } = e;
        if(name === "email"){
            setEmail(value);
        }
    };
    const onSubmit = (e : React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setError("");
        if(isLoading || email==="") return;
        try{
            setLoading(true);
            //set the email of the user.
            //redirect to loginpage
            sendPasswordResetEmail(auth, email);
            navigate("/login");
        } catch(e){
            //setError
            if(e instanceof FirebaseError){
                setError(e.message);
                console.log(e.code, e.message);
            }
        } finally{

        }
    }
    return (
        <Wrapper>
            <Title>Reset Password</Title>
            <Form onSubmit={onSubmit}>
                <Input onChange={onChange} name="email" value={email} placeholder="Email" type="email" required/>
                <Input type="submit" value={isLoading ? "Loading..." : "Reset Password"}/>
            </Form>
            {error !== "" ? <Error>{error}</Error> : null}
            <Switcher>
                Back to login page <Link to="/login">Log In &rarr;</Link>
            </Switcher>
        </Wrapper>
        );
}