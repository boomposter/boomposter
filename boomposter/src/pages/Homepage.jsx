import Banner from '../components/Banner';
import Control from '../components/Control';
import Tags from '../components/Tags';
import Cards from '../components/Cards';

const Homepage = () => {
    return (
        <>
            <Banner />
            <main>
            <div className="px-[16px] lg:px-[0px] w-[311px] lg:w-[1120px]">
            <Control />
            <Tags />
            <Cards />
            </div>
            </main>
        </>
    )
}

export {Homepage}