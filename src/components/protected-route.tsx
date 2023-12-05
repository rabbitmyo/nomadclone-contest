import { Navigate } from "react-router-dom";
import { auth } from "../firebase"

//로그인 상태 체크 후 페이지 전달
export default function ProtectedRoute({children}:{
    children: React.ReactNode
}){
    const user = auth.currentUser;
    if(user === null){
        return <Navigate to="/login"/>;
    }
    return children; //children : 컴포넌트 하위 요소의 모든 것
}