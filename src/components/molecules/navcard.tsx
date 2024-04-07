'use client'
const NavCard = ({s}: {s: string}) => {
    return (
        <>
            <div className='text-center text-[#1E1E1E] capitalize border-[0.2px] rounded-[4px] text-title-xsm font-medium mx-0 border-box  border-[#1E1E1E] bg-[#FBFAFC] '>{s}</div>
        </>
    );
}

export default NavCard;