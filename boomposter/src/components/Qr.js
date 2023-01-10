import { useState } from 'react'
import { Dialog } from '@headlessui/react'


export default function Qr() {
const [isOpen, setIsOpen] = useState(false)  
  return (
    <>
    <img className="absolute right-[8px] bottom-[8px] lg:right-[14px] lg:bottom-[14px] w-[20px] lg:w-[30px] cursor-pointer" onClick={() => setIsOpen(!isOpen)} src="./img/qr-code.svg" alt="" />
    <Dialog className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto bg-gray-300" open={isOpen} onClose={() => setIsOpen(false)}>
      <Dialog.Panel className="bg-white w-[200px] rounded-[6px] py-[15px] px-[20px] text-center	relative">
      <img onClick={() => setIsOpen(false)} className="absolute right-[10px] top-[10px] cursor-pointer" src="./img/x.svg" alt="" />
       <img src="./img/qr.jpg" alt="" />
       <button className="button">Скачать</button>
       </Dialog.Panel>
    </Dialog>
    </>
  )
}
