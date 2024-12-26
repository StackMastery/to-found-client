import { useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

const InputPass = ({...props}) => {

    const [isActive, setisActive] = useState(true);

    return (
        <>
            <div className="flex flex-col items-end">
                <input  type={isActive ? 'password' : 'text'} className="flex h-10 w-full rounded-md border border-neutral-200 bg-white px-5 py-5 text-base outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" placeholder="Password" {...props} />
                <button type="button" onClick={() => setisActive(!isActive)} className="text-2xl px-5 -mt-8 text-neutral-500 outline-none">
                    {isActive ? 
                        <VscEye />
                        : <VscEyeClosed />
                    }
                </button>
            </div>
        </>
    );
}

export default InputPass