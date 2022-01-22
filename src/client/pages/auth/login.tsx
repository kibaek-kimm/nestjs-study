import axios from "axios";
import { useState } from "react";
import { Form, Input, Button, Select } from "antd";
import commonStyle from "../../styles/common.module.scss";

export async function getServerSideProps(context) {
  const {req} = context;

  console.log(req.session.userId);
  

  if (req.session.userId) {  
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  return {
    props: {
      user: req.session.userId
    }, // Will be passed to the page component as props
  }
}


export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const handleLogin = () => {
    axios.post("/api/auth/signin", {
      email,
      password,
    })
  };
  return (
    <div>
      <div>
        <Input className={commonStyle.input} type="email" value={email} onChange={e => setEmail(e.target.value)}/>
      </div>
      <div>
        <Input className={commonStyle.input} type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      
      <Button onClick={handleLogin}>로그인</Button>
    </div>
  )
}