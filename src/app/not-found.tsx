import Image from 'next/image';
import error404 from '../../public/img/404-2.png';
import plugs from '../../public/img/plugs.png';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
      <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
        <div className="relative">
          <div className="absolute">
            <div className="">
              <h1 className="my-2 text-gray-800 font-bold text-3xl font-skyeng">
                Ууупс! Такой страницы не существует...
              </h1>
              <p className="my-2 text-gray-800 text-lg">
                Мы сожалеем, но страница, на которую Вы пытались перейти, не
                найдена.
              </p>
              <button
                className="font-roboto-400 rounded-full w-full h-[52px] bg-[#BCEC30] text-lg text-[#000000] hover:bg-[#C6FF00] active:bg-[#000000] active:text-[#FFFFFF]
              my-4 px-8 lg:w-auto focus:outline-none focus:ring-2 focus:ring-opacity-50"
              >
                <Link href={'/'}>На главную</Link>
              </button>
            </div>
          </div>
          <div>
            <Image src={error404} alt="404 error" width={404} height={150} />
          </div>
        </div>
      </div>
      <div>
        <Image src={plugs} alt="blue plugs" width={539} height={400} />
      </div>
    </div>
  );
}
