import React, { useEffect, useState } from 'react';
import useImages,{ fetchTemplates, Template } from '../functions/functions';


const Programs: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const templateImages = useImages(templates);

  useEffect(() => {
    const getTemplates = async () => {
      const templates = await fetchTemplates(3);
      
      setTemplates(templates);
      setLoading(false);
    };

    getTemplates();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
    {templates.map(
        (template, index) =>
          template.is_visible ? (
    <div key={index}>
    <p id="programs-header" className="uppercase font-bold text-[32px] md:text-[100px] my-[48px] font-bold font-itcfranklinbold">{template.content[0]?.content}</p>
    <p id="programs-content" className="max-w-[800px] font-dentonlight text-[20px] lg:w-[50%]">
    {template.content[1]?.content}
    </p>

    <div className="mb-[150px] mt-[32px] flex gap-[48px]">
      <a href="#people">
        <div className="grid justify-items-center">
        {templateImages ? (
          <img
            id="image-yellow"
            className=""
            src={templateImages[0]}
            alt="Yellow Mission"
          />
        ) : (
          <p>Image not found</p>
        )}
          <span
            id="mission-nav1"
            className="uppercase text-[#EDBB00] text-[32px] font-bold font-itcfranklinbold"
          >
            {template.content[2]?.content}
          </span>
        </div>
      </a>

      <a href="#planet">
        <div className="grid justify-items-center">
        {templateImages ? (
          <img
            id="image-green"
            src={templateImages[1]}
            alt="Green Mission"
          />
        ) : (
          <p>Image not found</p>
        )}
          <span
            id="mission-nav2"
            className="uppercase text-[#006C88] text-[32px] font-bold font-itcfranklinbold"
          >
            {template.content[3]?.content}
          </span>
        </div>
      </a>

      <a href="#relief">
        <div className="grid justify-items-center">
        {templateImages ? (
          <img
            id="image-red"
            src={templateImages[2]}
            alt="Red Mission"
          />
        ) : (
          <p>Image not found</p>
        )}
          <span
            id="mission-nav3"
            className="uppercase text-[#EC5B09] text-[32px] font-bold font-itcfranklinbold"
          >
            {template.content[4]?.content}
          </span>
        </div>
      </a>
    </div>
  </div>
    ):('')
  )}
  </>
  )
}

export default Programs