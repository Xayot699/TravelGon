const USERS_KEY="travelgo_users";
const SESSION_KEY="travelgo_user";
function users(){try{return JSON.parse(localStorage.getItem(USERS_KEY)||"[]")}catch{return []}}
export async function login(email:string,password:string){
  const user=users().find((x:any)=>x.email===email && x.password===password);
  if(!user) return {data:{user:null},error:{message:"Email yoki parol noto'g'ri"}};
  localStorage.setItem(SESSION_KEY,JSON.stringify(user)); return {data:{user},error:null};
}
export async function register(email:string,password:string){
  const list=users(); if(list.some((x:any)=>x.email===email)) return {data:{user:null},error:{message:"Bu email allaqachon mavjud"}};
  const user={id:`user-${Date.now()}`,email,password}; list.push(user); localStorage.setItem(USERS_KEY,JSON.stringify(list)); localStorage.setItem(SESSION_KEY,JSON.stringify(user)); return {data:{user},error:null};
}
export async function logout(){localStorage.removeItem(SESSION_KEY)}
export function currentUser(){try{return JSON.parse(localStorage.getItem(SESSION_KEY)||"null")}catch{return null}}
