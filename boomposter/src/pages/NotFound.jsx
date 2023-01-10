import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <main>
            <div className="notfound">
                <p>Упс!</p>
                <img src="./img/404.png" className="w-[250px] lg:w-[451px]"  alt="" />
                <p>Страница не найдена</p>
                <Link to="/"><button className="button">На главную</button></Link>
             </div>
        </main>
    )
}

export {NotFound}