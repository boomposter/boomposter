import { Link } from 'react-router-dom';
import NoLogin from './NoLogin';
import Profile from './Profile';

export default function Header() {
    const isLoggedIn = true;
    return (
        <header className="bg-[#F8F9FB] p-[15px] flex center-center">
            <nav className="flex justify-between w-[303px] lg:w-[1120px]">
                <div className="logo"><Link to="/"><img src="./img/logo.svg" alt="" width="32px" /></Link></div>
                {isLoggedIn ? <Profile /> : <NoLogin />}
            </nav>
        </ header>
    )
}