import {TourCard} from "../TourCard/TourCard"; export function TourGrid({tours}:{tours:any[]}){return <div className="tour-grid">{tours.map(t=><TourCard key={t.id} tour={t}/>)}</div>}
