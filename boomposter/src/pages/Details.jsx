import NotLiked from "../components/NotLiked";
import Liked from "../components/Liked";
import DetailsMap from "../components/DetailsMap";
import {Link} from  'react-router-dom';

const Details = () => {
    const isLiked = true;
    return (
        <main>
            <div className="px-[16px] lg:px-[0px] w-[311px] lg:w-[1120px]">
            <Link to="/"><img className="my-[24px] w-[30px] hidden lg:block" src="./img/back.svg"  alt="" /></Link>
            <div className="flex flex-col lg:flex-row">
                <div className="left mt-[14px] lg:mt-[0px] relative">
                    <Link to="/"><img className="w-[30px] lg:hidden absolute top-[11px] left-[11px]" src="./img/back.svg"  alt="" /></Link>
                   <img src="./img/details.jpg" alt="" className="rounded-[3px] w-[311px] lg:w-[550px]" />
                </div>
                <div className="right">
                <div className="relative">
                <h1 className="text-[16px] lg:text-[24px]">Билборд</h1>
                <div className="text-purple-700 font-medium absolute top-0 left-[99px] lg:left-[200px] text-[11px] lg:text-[20px]">
                    100 000 ₸/месяц
                </div>
                {isLiked ? <Liked /> : <NotLiked />}
                </div>
                <p className="lg:min-h-[131px] lg:max-w-[434px] sm:min-h-[54px] sm:max-w-[240px]">Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста.</p>
                <div className="my-[20px] rounded-[3px] overflow-hidden	sm:w-[343px] lg:w-[550px] sm:h-[100px] lg:h-[156px]">
                <DetailsMap />
                </div>
                <p className="details-location">Казахстан, г. Актобе</p>
                <h2>Детали</h2>
                <div className="details">
                    <div className="details-left">
                    <div className="details-left-title">Изображение</div>
                    <div className="details-left-title">Конструкция</div>
                    <div className="details-left-title">Размер</div>
                    </div>
                    <div className="details-right">
                    <div className="details-right-title">Статичное</div>
                    <div className="details-right-title">Немобильная, постоянная</div>
                    <div className="details-right-title">6 х 3 м   <span className="meters">18м2</span></div>
                    </div>
                </div>
                <div className="py-[13px] px-[16px] bg-[#F8F9FB] pl-[30px] lg:pl-[0px] mx-[-30px] lg:mx-[0px]">
                <div>Автор объявления:</div>
                <div><b>User Name</b></div>
                <div>Email:</div>
                <div><b>usermail@mail.com</b></div>
                <div>Телефон:</div>
                <div><b>7 707 000 00 00</b></div>
                </div>
                </div>
            </div>
            </div>
        </main>
    )
}

export {Details}