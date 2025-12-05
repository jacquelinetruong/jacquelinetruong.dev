import '../../../public/default-arrow.svg'
import '../../../public/default-footer-jt.svg'
import Image from 'next/image'

function Footer() {
    return (
      <div className="bg-[#00000025] text-[#343330] font-jakarta text-lg w-full">
        <div className="pl-12 pt-20 pb-6 flex gap-6 sm:flex-col">
          <div>
            <p>design & development</p>
            <div className="flex gap-2 items-center flex-col sm:flex-row">
              <Image
                src="/default-arrow.svg"
                alt="arrow icon"
                width={16}
                height={16}
              />
              <p>handcrafted by jacqueline truong</p>
            </div>
          </div>
          <p>all rights reserved. © 2025</p>
        </div>
  
        <div className="w-full">
          <Image
            src="/default-footer-jt.svg"
            alt="jacqueline truong typography"
            width={1920}
            height={237.79}
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    )
  }
  
export default Footer;