const Button = ({ className , onClick, children}) => {
    return (
        <>
            <button onClick={onClick} className={`px-5 border py-2 flex items-center gap-2 border-neutral-300 text-neutral-800 text-sm lg:text-base rounded-lg hover:bg-black hover:text-white transition-all ${className}`}>
                {children}
            </button>
        </>
    );
}

export default Button