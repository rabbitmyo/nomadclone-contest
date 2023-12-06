import styled from "styled-components";
import PostTweetForm from "../components/post-tweet-form";
//import { auth } from "../firebase";

const Wrapper = styled.div``;


export default function Home(){
    /*
    const logOut = () => {
        auth.signOut();
    };
    <h1>
            <button onClick={logOut}>Log Out</button>
    </h1>
    */
    return (
        <Wrapper>
            <PostTweetForm/>
        </Wrapper>
        
    );
}