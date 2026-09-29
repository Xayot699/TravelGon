import {useEffect,useMemo,useState} from "react";
import {AdminLogin} from "../components/AdminLogin";

type Tour={id:number,title:string,country:string,price_per_person:number};

const demoTours:Tour[]=[
 {id:1,title:"Samarkand Heritage Escape",country:"Uzbekistan",price_per_person:299},
 {id:2,title:"Tashkent City Weekend",country:"Uzbekistan",price_per_person:189},
 {id:3,title:"Bukhara Silk Road Story",country:"Uzbekistan",price_per_person:259},
 {id:4,title:"Istanbul Golden Route",country:"Türkiye",price_per_person:549},
 {id:5,title:"Dubai Future Escape",country:"UAE",price_per_person:699},
 {id:6,title:"Maldives Island Retreat",country:"Maldives",price_per_person:999},
 {id:7,title:"Paris Culture Week",country:"France",price_per_person:899},
 {id:8,title:"Tokyo Discovery",country:"Japan",price_per_person:1099}
];

function readTours():Tour[]{
 try {
   const saved=localStorage.getItem("travelgo_admin_tours");
   return saved?JSON.parse(saved):demoTours;
 } catch { return demoTours; }
}

export function AdminPage(){
 const [logged,setLogged]=useState(()=>localStorage.getItem("travelgo_admin")==="1");
 const [tab,setTab]=useState<"dashboard"|"tours"|"bookings">("dashboard");
 const [tours,setTours]=useState<Tour[]>(readTours);
 const [bookings,setBookings]=useState<any[]>([]);
 const [editing,setEditing]=useState<Tour|null>(null);
 const [showForm,setShowForm]=useState(false);

 useEffect(()=>{
   localStorage.setItem("travelgo_admin_tours",JSON.stringify(tours));
   try{setBookings(JSON.parse(localStorage.getItem("travelgo_bookings")||"[]"))}catch{setBookings([])}
 },[tours]);

 const revenue=useMemo(()=>bookings.reduce((s,b)=>s+Number(b.total||0),0),[bookings]);

 if(!logged) return <AdminLogin onLogin={()=>{localStorage.setItem("travelgo_admin","1");setLogged(true)}}/>;

 function saveTour(){
   if(!editing?.title.trim()||!editing.country.trim()) return;
   setTours(v=>v.some(x=>x.id===editing.id)?v.map(x=>x.id===editing.id?editing:x):[...v,editing]);
   setEditing(null);setShowForm(false);
 }
 function removeTour(id:number){
   if(confirm("Tourni o'chirishni xohlaysizmi?")) setTours(v=>v.filter(x=>x.id!==id));
 }

 return <div className="admin-area">
   <aside className="admin-sidebar">
     <div className="admin-logo">TravelGo <span>ADMIN</span></div>
     <button className={tab==="dashboard"?"active":""} onClick={()=>setTab("dashboard")}>📊 Dashboard</button>
     <button className={tab==="tours"?"active":""} onClick={()=>setTab("tours")}>🗺️ Tours</button>
     <button className={tab==="bookings"?"active":""} onClick={()=>setTab("bookings")}>📋 Bookings</button>
     <div className="admin-side-bottom">
       <a href="/">← Saytga qaytish</a>
       <button onClick={()=>{localStorage.removeItem("travelgo_admin");setLogged(false)}}>Chiqish</button>
     </div>
   </aside>

   <main className="admin-content">
     <header className="admin-topbar">
       <div><span className="eyebrow">TRAVELGO CONTROL CENTER</span><h1>{tab==="dashboard"?"Dashboard":tab==="tours"?"Tours Management":"Bookings Management"}</h1></div>
       <a href="/" className="admin-site-link">Live Site ↗</a>
     </header>

     {tab==="dashboard" && <section>
       <div className="admin-stats">
         <article><span>Jami Tours</span><strong>{tours.length}</strong></article>
         <article><span>Jami Bookings</span><strong>{bookings.length}</strong></article>
         <article><span>Revenue</span><strong>${revenue.toLocaleString()}</strong></article>
         <article><span>Countries</span><strong>{new Set(tours.map(x=>x.country)).size}</strong></article>
       </div>
       <div className="admin-grid">
         <section className="admin-card"><h2>Recent bookings</h2>
           {bookings.length===0?<p className="muted">Hozircha booking yo‘q. Saytdan demo booking qilib ko‘rishingiz mumkin.</p>:
           bookings.slice(0,8).map((b,i)=><div className="admin-row" key={b.id||i}><span>{b.tour?.title||b.tourTitle||"Travel booking"}</span><b>{b.status||"confirmed"}</b></div>)}
         </section>
         <section className="admin-card"><h2>Tour inventory</h2>
           {tours.slice(0,8).map(t=><div className="admin-row" key={t.id}><span>{t.title}</span><b>${t.price_per_person}</b></div>)}
         </section>
       </div>
     </section>}

     {tab==="tours" && <section className="admin-card">
       <div className="admin-card-head"><div><h2>Tours</h2><p className="muted">Tourlarni demo rejimda boshqaring.</p></div>
       <button className="primary-admin-btn" onClick={()=>{setEditing({id:Date.now(),title:"",country:"Uzbekistan",price_per_person:0});setShowForm(true)}}>+ Add Tour</button></div>
       {showForm&&editing&&<div className="tour-form">
         <input placeholder="Tour title" value={editing.title} onChange={e=>setEditing({...editing,title:e.target.value})}/>
         <input placeholder="Country" value={editing.country} onChange={e=>setEditing({...editing,country:e.target.value})}/>
         <input type="number" placeholder="Price" value={editing.price_per_person} onChange={e=>setEditing({...editing,price_per_person:Number(e.target.value)})}/>
         <button className="primary-admin-btn" onClick={saveTour}>Save</button>
         <button onClick={()=>{setEditing(null);setShowForm(false)}}>Cancel</button>
       </div>}
       <div className="tour-table">{tours.map(t=><div className="admin-row" key={t.id}><span><strong>{t.title}</strong><small>{t.country}</small></span><b>${t.price_per_person}</b><button onClick={()=>{setEditing(t);setShowForm(true)}}>Edit</button><button onClick={()=>removeTour(t.id)}>Delete</button></div>)}</div>
     </section>}

     {tab==="bookings" && <section className="admin-card">
       <h2>Bookings</h2>
       {bookings.length===0?<p className="muted">Bookinglar hali mavjud emas.</p>:bookings.map((b,i)=><div className="admin-row" key={b.id||i}><span><strong>{b.tour?.title||b.tourTitle||"Travel booking"}</strong><small>{b.date||b.departure_date||"Date not set"}</small></span><b>${b.total||0}</b><span>{b.status||"confirmed"}</span></div>)}
     </section>}
   </main>
 </div>
}