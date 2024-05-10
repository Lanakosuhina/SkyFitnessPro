export default function InputCheckbox() {
    return (
        <>
            <label className="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="checkbox">
                <input type="checkbox" id="cb"
                    className="peer relative 
                appearance-none 
                w-[23px] h-[23px] border 
                          rounded-full 
                          cursor-pointer  
                          checked:text-[#ffff]"/>
                <span className="absolute text-white 
            transition-opacity opacity-0 pointer-events-none peer-checked:opacity-100">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM9.91339 14.1459L15.4134 7.64594L13.8866 6.35406L9.1373 11.9669L6.40258 8.8415L4.89742 10.1585L8.39742 14.1585C8.58922 14.3777 8.86704 14.5024 9.15829 14.5C9.44953 14.4976 9.72525 14.3683 9.91339 14.1459Z" fill="#BCEC30" />
                    </svg>
                </span>
            </label>
        </>
    )
}