const Avatar = ({className, avatar, name}) => {
    return (
        <>
            <div className={`w-[38px] h-[38px] overflow-hidden z-30 relative bg-sky-50 rounded-full ring-2 ring-sky-600 hover:ring-sky-600/50 flex justify-center items-center text-xl hover:ring-4 ${className}`}>
                {name?.trim()[0].toUpperCase()}
                <span className="flex w-[38px] h-[38px] absolute bg-cover bg-no-repeat z-10" style={{backgroundImage: `url('${avatar}')`}}></span>
            </div>
        </>
    );
}

export default Avatar