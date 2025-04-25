import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";

export function Signup() {
    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    async function signup(){
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        await axios.post(BACKEND_URL + "/api/v1/signup", {
            data:
                username,
                password
        })
        alert("You have signed up!")
    }
    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl border min-w-48 p-8">
            <Input ref={usernameRef} placeholder="Username"/>
            <Input ref={passwordRef} placeholder="Password"/>
            <div className="flex justify-center p-4">
                <Button onClick={signup}loading={false} variant="primary" text="Signup" fullWidth={true}/>
            </div>
        </div>
    </div>
}