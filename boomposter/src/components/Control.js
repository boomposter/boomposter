import HomeMap from '../components/HomeMap';
import Filtres from './Filtres';
import { useState } from "react";

export default function Control() {
    const [visible, setVisible ] = useState(false);
    const [fvisible, setFilter ] = useState(false);

    return (
        <>
       <div className="flex justify-between">
        <img src="./img/filter.svg" onClick={() => setFilter(true)} className="cursor-pointer" alt="" width="24px" />
        {visible && <img src="./img/closemap.svg" alt="" onClick={() => setVisible(false)} width="24px" className="cursor-pointer" />}
        {!visible && <img src="./img/map.svg" alt="" onClick={() => setVisible(true)} width="24px" className="cursor-pointer" />}
        
       
        </div>
        
        {fvisible && <div className="filtres-title">Фильтры <img onClick={() => setFilter(false)} className="cursor-pointer" src="./img/x.svg" alt="" /> </div>}

        {fvisible ? <Filtres /> : ""}
        {visible ?  <HomeMap /> : ""}
        
        
         </>
    )
}