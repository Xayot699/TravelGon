import {useState} from "react";

export function AdminLogin({onLogin}:{onLogin:()=>void}) {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  return <div className="admin-login">
    <div className="admin-login-card">
      <div className="admin-brand">TravelGo</div>
      <h1>Admin Panel</h1>
      <p>Portfolio demo boshqaruv paneli</p>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button onClick={()=>email.trim()&&password.trim()?onLogin():alert("Email va parolni kiriting")}>Kirish</button>
      <small>Demo rejim: istalgan email va parol bilan kirish mumkin.</small>
    </div>
  </div>
}