import styled from "styled-components";
import PostTweetForm from "../components/post-tweet-form";
import Timeline from "../components/timeline";
//import { auth } from "../firebase";

const Wrapper = styled.div`
    display: grid;
    gap: 50px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
    grid-template-rows: 1fr 5fr;
`;

export default function Home(){
    return (
        <Wrapper>
            <PostTweetForm/>
            <Timeline />
        </Wrapper>
        
    );
}