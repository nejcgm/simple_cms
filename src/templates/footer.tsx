import React from "react";
import footer_logo from '../assets/footer_logo.svg';
const Footer =()=> {
  return (
    <>
    <div className="bg-black p-[32px] lg:p-[64px]">
        <div className="flex max-w-[1440px] gap-[40px]">
            <div>
                <ol className="text-white">
                    <li className="font-bold uppercase text-[14px] mb-[16px] tracking-[2px] font-itcfranklinbold">adidas foundation</li>
                    <li><a href="https://res.cloudinary.com/confirmed-web/image/upload/v1718956642/adidas-foundation/notices/Privacy_Notice_adidas_Foundation_quuied.pdf" target="_blank" className="mb-[3px] text-[14px] hover:underline font-itcfranklinnormal">Privacy notice</a></li>
                    <li><a href="https://res.cloudinary.com/confirmed-web/image/upload/v1718956632/adidas-foundation/notices/TCs_adidas_Foundation_oixqe9.pdf" target="_blank"  className="mb-[3px] text-[14px] hover:underline font-itcfranklinnormal">Terms and conditions</a></li>
                    <li ><a href="" className="mb-[3px] text-[14px] hover:underline font-itcfranklinnormal">Cookie notice</a></li>
                    <li className="mt-[48px]"><a href="our-work"><img src={footer_logo} alt="logo" width="60" height="60" /></a></li>
                </ol>
            </div>
            <div>
                <ol className="text-white">
                    <li className="font-bold uppercase text-[14px] mb-[16px] tracking-[2px] font-itcfranklinbold">imprint</li>

                    <li className="text-[14px] font-bold font-itcfranklinbold">adidas Foundation gGmbH</li>
                    <li className="text-[14px] mt-[3px] font-itcfranklinnormal ">Käthe-Dassler-Strasse 2</li>
                    <li className="text-[14px] mt-[3px] font-itcfranklinnormal">91074 Herzogenaurach</li>
                    <li className="text-[14px] mt-[3px] font-itcfranklinnormal">Germany</li>
                    <li className="text-[14px] font-bold mt-[8px] font-itcfranklinbold">Managing Director</li>
                    <li className="text-[14px] mt-[3px] font-itcfranklinnormal">Melissa Kaar</li>
                    <li className="text-[14px] font-bold mt-[8px] font-itcfranklinbold">Amtsgericht Fürth:</li>
                    <li className="text-[14px] mt-[3px] font-itcfranklinnormal">HRB 20954</li>
                    <li className="text-[14px] font-bold mt-[8px] font-itcfranklinbold">Email:</li>
                    <li><a className="text-[14px] mt-[3px] hover:underline font-itcfranklinnormal" href="mailto:info@adidasfoundation.org">info@adidasfoundation.org</a></li>
                </ol>
            </div>
        </div>
    </div>
    </>
  )
}
export default Footer