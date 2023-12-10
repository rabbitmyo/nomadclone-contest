import styled from "styled-components";
import { ITweet } from "./timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 3fr 1fr;
    padding: 20px;
    border: 1px solid rgba(255,255,255,0.5);
    border-radius: 15px;
`;

const Column = styled.div``;

const Photo = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 15px;
`;

const Username = styled.span`
    font-weight: 600;
    font-size: 15px;
`;

const Payload = styled.p`
    margin: 10px 0px;
    font-size: 18px;
`;

const DeleteBtn = styled.button`
    background-color: tomato;
    color: white;
    font-weight: 600;
    border: 0;
    font-size: 12px;
    padding: 5px 10px;
    text-transform: uppercase;
    border-radius: 5px;
    margin-right: 5px;
    cursor: pointer;
`;

const EditBtn = styled.button`
    background-color: green;
    color: white;
    font-weight: 600;
    border: 0;
    font-size: 12px;
    padding: 5px 10px;
    text-transform: uppercase;
    border-radius: 5px;
    margin-right: 5px;
    cursor: pointer;
`;

const EditArea = styled.textarea`
    border: 2px solid grey;
    padding: 20px;
    border-radius: 20px;
    font-size: 16px;
    color: white;
    background-color: black;
    width: 50%;
    resize: none;
`;

const Form = styled.form`
    display: none;
    margin-top: 5px;
`;

const SubmitButton = styled.button`
    background-color: white;
    color: black;
    font-weight: 600;
    border: 0;
    font-size: 12px;
    padding: 5px 10px;
    text-transform: uppercase;
    border-radius: 5px;
    margin-left: 5px;
    cursor: pointer;
`;

export default function Tweet({username, photo, tweet, userId, id}:ITweet){
    const user = auth.currentUser;
    const [newEditTweet, setnewEditTweet] = useState("");
    const [ style, setStyle ] = useState({display: 'none'})
    //let editAreaa = false;
    const onDelete = async () => {
        const deleteOk = confirm("Are you sure you want to delete this tweet?");
        if (!deleteOk || user?.uid !== userId) return;
        try{
            //트윗 삭제
            await deleteDoc(doc(db, "tweets", id));
            //트윗삭제시 이미지 삭제
            if(photo){
                const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
                await deleteObject(photoRef);
            }
        }catch(e){
            console.log(e);
        }finally{}
    }
    
    const onEditForm = async() => {
        setStyle({display: 'block'});
    }

    const onChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) =>{
        setnewEditTweet(e.target.value);
    };
    
    const onEdit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const editOk = confirm("Are you sure you want to edit this tweet?");
        if (!editOk || user?.uid !== userId) return;
        try{
            //트윗 수정
            await updateDoc(doc(db, "tweets", id), {tweet:newEditTweet});
        }catch(e){
            console.log(e);
        }finally{
            setnewEditTweet("");
            setStyle({display: 'none'});
        }
    }
    return (
    <Wrapper>
        <Column>
           <Username>{username}</Username>
           <Payload>{tweet}</Payload>
           {user?.uid === userId ? <DeleteBtn onClick={onDelete}>Delete</DeleteBtn> : null}
           {user?.uid === userId ? <EditBtn onClick={onEditForm}>Edit</EditBtn> : null}
           <Form onSubmit={onEdit} style={style}>
            <EditArea onChange={onChange} placeholder="Write edit message."/>
            <SubmitButton type="submit">Update</SubmitButton>
           </Form>
        </Column>
        <Column>
            {photo ? (
                <Photo src={photo}/>
            ) : null}
        </Column>
    </Wrapper>
    )
}