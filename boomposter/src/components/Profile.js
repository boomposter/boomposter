import { Menu } from '@headlessui/react'
import Lang from './Lang'
import {Link} from  'react-router-dom';

export default function Profile() {
    return (
    <div className="profile">
    <Lang />
    <div className="username">User Name</div>
    <img src="./img/profile.svg" width="24px" alt="" />
    
    <Menu as="div" className="relative">
      <Menu.Button className="border-none bg-inherit cursor-pointer"><img src="./img/arrow-down.svg" alt="" /></Menu.Button>
      <Menu.Items className="absolute mt-2 right-0 p-[12px] bg-white w-[322px] rounded-[6px]">
      <Menu.Item disabled>
      <div className="text-[#8A8A8A] text-[12px]	my-[6px]">Аккаунт</div>
      </Menu.Item>
      <Menu.Item>
      <div className="text-[#282828] text-[16px]	my-[6px] font-medium">Профиль</div>
      </Menu.Item>
      <Menu.Item>
      <Link to="my" className="text-[#282828] text-[16px]	my-[6px] font-medium no-underline">Мои рекламные площади</Link>
      </Menu.Item>
      <Menu.Item disabled>
      <div className="text-[#8A8A8A] text-[12px]	my-[6px]"><hr /></div>
      </Menu.Item>
      <Menu.Item>
      <div className="text-[#282828] text-[16px]	my-[6px] font-medium	">Выход</div>
      </Menu.Item>
        
        
      </Menu.Items>
    </Menu>
    </div>
  )
}
