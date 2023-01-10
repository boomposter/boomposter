import { Popover } from '@headlessui/react'

export default function Lang() {
  return (
    <>
    
    <Popover className="relative">
      <Popover.Button className="border-none bg-inherit cursor-pointer"><img src="./img/globe.svg" alt="" width="18px" /></Popover.Button>

      <Popover.Panel className="absolute z-10 pt-[13px] pls-[13px] bg-white w-[211px] rounded-[6px] ">
        <div>
          <a href="#ru" className="text-[#282828] text-[16px] ml-[7px] mb-[17px] font-medium no-underline block bg-[#F5F5F5] py-[4px] px-[6px] rounded-[3px] w-[50%]">Русский</a>
          <a href="#kz" className="text-[#282828] text-[16px] ml-[7px] mb-[17px] font-medium no-underline block">Қазақ тілі</a>
          <a href="#en" className="text-[#282828] text-[16px] ml-[7px] mb-[17px] font-medium no-underline block">English</a>
          
        </div>

      </Popover.Panel>
    </Popover>
    </>
  )
}
