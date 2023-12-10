import { collection, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import Tweet from "./tweet";
import { Unsubscribe } from "firebase/auth";

export interface ITweet {
    //트윗형태 정의
    id: string;
    photo?: string;
    tweet: string;
    userId: string;
    username: string;
    createAt: number;
}

const Wrapper = styled.div`
    display: flex;
    gap: 10px;
    flex-direction: column;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
`;

export default function Timeline(){
    //ITweet interface의 기본값인 빈배열의 형태로 정의
    const [tweets, setTweet] = useState<ITweet[]>([]);
    //트윗 가져오는 비동기 함수
    useEffect(() => {
        let unsubscribe :  Unsubscribe | null  = null;
        const fetchTweets = async() => {
            const tweetsQuery = query(
                collection(db, "tweets"),
                orderBy("createAt", "desc")
            );
           //쿼리 변동시 실시간으로 알려주는 함수
           //미사용시 자동으로 리스너 연결을 끊는 unsubscribe()를 반환한다.
           unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
            const tweets = snapshot.docs.map((doc) => {
                const {tweet, createAt, userId, username, photo} = doc.data();
                console.log({tweet, createAt, userId, username, photo});
                return {
                    tweet, 
                    createAt, 
                    userId, 
                    username, 
                    photo,
                    id: doc.id
                }
            });
            setTweet(tweets);
           }) 
        };
        fetchTweets();
        return() => {
            unsubscribe && unsubscribe()
        }
    }, []);
    return (
        <Wrapper>
            {tweets.map(tweet => (
            <Tweet key={tweet.id} {...tweet}/>
            ))}
        </Wrapper>
    );
}