import MyCards from "../components/MyCards"

const My = () => {
    return (
        <main>
        <div className="px-[16px] w-[311px] lg:w-[1120px]">
        <div className="my-[30px] flex justify-between">
        <div className="font-semibold text-[16px] lg:text-[20px] text-black">Мои рекламные площади</div>
        <img src="./img/plus.svg" alt="" width="24px" />
       </div>
       <MyCards />
       </div>
       </main>
    )
}

export {My}