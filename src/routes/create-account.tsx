import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Form, Error, Input, Switcher, Title, Wrapper } from "../components/auth-components";
import GithubButton from "../components/github-btn";

export default function CreateAccount(){
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [name, sestName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: {name, value}
        } = e;
        if(name ==="name"){
            sestName(value);
        }else if (name === "email"){
            setEmail(value);
        }else if (name ==="password"){
            setPassword(value);
        }
    };
    const onSubmit = async (e : React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setError("");
        if(isLoading || name ==="" || email==="" || password ==="") return;
        try{
            setLoading(true);
            //create an account
            //set the name of the user.
            //redirect to homepage
            const credentials = await createUserWithEmailAndPassword(auth, email, password);
            //createUseWith~~ : 성공시 자격증명 받음, 실패(이미 계정이 있거나 비밀번호가 유효하지 않은 경우)시 오류
            console.log(credentials.user);
            await updateProfile(credentials.user,{
                displayName: name,
            });
            navigate("/");
        } catch(e){
            //setError
            if(e instanceof FirebaseError){
                setError(e.message);
                console.log(e.code, e.message);
            }
        } finally{

        }
        
        console.log(name, email,password);
    }
    return (
    <Wrapper>
        <Title>Join twt</Title>
        <Form onSubmit={onSubmit}>
            <Input onChange={onChange} name="name" value={name} placeholder="Name" type="text" required/>
            <Input onChange={onChange} name="email" value={email} placeholder="Email" type="email" required/>
            <Input onChange={onChange} name="password" value={password} placeholder="Passward" type="password" required/>
            <Input type="submit" value={isLoading ? "Loading..." : "Create Account"}/>
        </Form>
        {error !== "" ? <Error>{error}</Error> : null}
        <Switcher>
            Already have an account? <Link to="/login">Log In &rarr;</Link>
        </Switcher>
        <GithubButton />
    </Wrapper>
    );
}