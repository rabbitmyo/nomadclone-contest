import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import Tweet from "./tweet";

export interface ITweet {
    //트윗형태 정의
    id: string;
    photo: string;
    tweet: string;
    userId: string;
    username: string;
    createAt: number;
}

const Wrapper = styled.div``;

export default function Timeline(){
    //ITweet interface의 기본값인 빈배열의 형태로 정의
    const [tweets, setTweet] = useState<ITweet[]>([]);
    //트윗 가져오는 비동기 함수
    const fetchTweets = async() => {
        const tweetsQuery = query(
            collection(db, "tweets"),
            orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(tweetsQuery);
        const tweets = snapshot.docs.map(doc => {
            const {tweet, createAt, userId, username, photo} = doc.data();
            return {
                tweet, 
                createAt, 
                userId, 
                username, 
                photo,
                id: doc.id
            };
        });
        setTweet(tweets);
    }
    useEffect(() => {
        fetchTweets();
    }, []);
    return (
        <Wrapper>
            {JSON.stringify(tweets)}
        </Wrapper>
    )
}