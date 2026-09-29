export const addDays=(s:string,n:number)=>{const d=new Date(s+"T00:00:00");d.setDate(d.getDate()+n);return d.toISOString().slice(0,10)};
