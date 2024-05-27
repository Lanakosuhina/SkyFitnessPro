import { logOut } from '@/app/api';
import Button from '../Button/Button';
import { useRouter } from 'next/navigation';
import { User } from 'firebase/auth';

type DropDownType = {
  user: User | null;
  email: string | null;
  toggleDropdown: () => void;
};

export default function DropDown({
  toggleDropdown,
  user,
  email,
}: DropDownType) {
  const router = useRouter();
  const handleLogout = () => {
    console.log('проверка выхода');
    logOut()
      .then(() => {
        router.replace('/');
        console.log('Signed out successfully');
      })
      .catch(error => {
        // An error happened.
      });
  };
  const userName = user?.email?.split('@')[0];
  return (
    <div className="absolute right-0 z-10 mt-3 md:mt-6 bg-white rounded-[30px] w-[266px] h-[258px] flex flex-col items-center gap-8">
      <div className="w-[206px] flex flex-col gap-2.5 text-center mt-[24px]">
        <p className="font-roboto-400 text-lg">{userName}</p>
        <p className="font-roboto-400 text-lg text-[gray]">{email}</p>
      </div>
      <div className="w-[206px] flex flex-col gap-2.5">
        <Button
          title="Мой профиль"
          onClick={() => {
            router.replace('/profile');
            toggleDropdown();
          }}
        />
        <button
          className="rounded-full border border-black w-full h-[52px] px-5 bg-transparent text-lg text-[#000000] hover:bg-[#F7F7F7] active:bg-[#E9ECED] cursor-custom"
          onClick={() => {
            handleLogout();
            toggleDropdown();
          }}
        >
          Выйти
        </button>
      </div>
    </div>
  );
}
