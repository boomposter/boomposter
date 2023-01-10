import {Link} from  'react-router-dom';

export default function Cards() {
    return (
     <div className="cards">   

    <div className="flex gap-[14px] lg:gap-[24px] border-solid border border-[#D9D9D9] min-h-[127px] lg:min-h-[200px] rounded-md p-[12px] mb-[24px] relative">
    <div>
        <img className="rounded-[3px] w-[111px] sm:w-[111px] lg:w-[190px]" src="./img/b2.jpg" align="left" alt="" />
    </div>
    <div>
    <div className="flex justify-between w-[160px] lg:w-[120%]">
    <Link to="/Details" className="no-underline text-[#000] pb-[0px]"><h2 className="text-[16px] lg:text-[24px] my-[0px]">Билборд</h2></Link>
        <div className="text-purple-700 font-medium text-[10px] lg:text-[20px] float-right">100 000 ₸</div></div>
    <p className="max-w-[138px] lg:max-w-[719px] text-[11px] lg:text-[16px]">Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста.</p>
    </div>
    </div>  

    <div className="flex gap-[14px] lg:gap-[24px] border-solid border border-[#D9D9D9] min-h-[127px] lg:min-h-[200px] rounded-md p-[12px] mb-[24px] relative">
    <div>
        <img className="rounded-[3px] w-[111px] sm:w-[111px] lg:w-[190px]" src="./img/b1.jpg" align="left" alt="" />
    </div>
    <div>
    <div className="flex justify-between w-[160px] lg:w-[120%]">
    <Link to="/Details" className="no-underline text-[#000] pb-[0px]"><h2 className="text-[16px] lg:text-[24px] my-[0px]">Билборд</h2></Link>
        <div className="text-purple-700 font-medium text-[10px] lg:text-[20px] float-right">100 000 ₸</div></div>
    <p className="max-w-[138px] lg:max-w-[719px] text-[11px] lg:text-[16px]">Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста.</p>
    </div>
    </div> 

    </div>
    )
}