import { tours } from "../../tours/data/tours";

const KEY = "travelgo_bookings";
export function addDays(s:string,n:number){const d=new Date(s+"T00:00:00");d.setDate(d.getDate()+n);return d.toISOString().slice(0,10)}
function read(){try{return JSON.parse(localStorage.getItem(KEY) || "[]")}catch{return []}}
function write(items:any[]){localStorage.setItem(KEY,JSON.stringify(items))}
export async function createBooking(u:string,t:number,date:string,g:number,d:number,p:number){
  const items=read();
  items.unshift({id:Date.now(),user_id:u,tour_id:t,departure_date:date,return_date:addDays(date,d),guests:g,total_price:p*g,status:"confirmed",created_at:new Date().toISOString(),tours:tours.find(x=>x.id===t)});
  write(items);
}
export async function getBookings(u:string){return read().filter((x:any)=>x.user_id===u)}
