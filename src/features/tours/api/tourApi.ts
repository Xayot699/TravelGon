import { tours } from "../data/tours";

export async function fetchTours(){
  return [...tours].filter((tour) => tour.active).sort((a,b) => b.rating - a.rating);
}

export async function fetchTour(id:number){
  return tours.find((tour) => tour.id === id) ?? null;
}
