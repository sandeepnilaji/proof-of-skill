import React from 'react';

const Checklist = ({ selectedSkills }) => {
  const skills = [
    "Experience",
    "Can join in",
    "Minimum salary expected",
    "Creating Wireframes",
    "Creating Basic Prototypes",
    "Creation of Brands",
    "Design Principles",
    "Design Software & Tools",
    "Information Architecture and User Flows",
    "Interaction Design",
    "Typography",
    "Usability Testing & Feedback",
    "User Personas",
    "User Research and Survey Design",
    "Visual Communication",
    "Wireframing and Prototyping",
    "Applying Color Theory Using Figma for Design",
    "Application of Typography",
    "Creating Effective Icons",
    "Optimizing Touch Points",
    "Addressing User Pain Points",
    "Conducting User Research",
    "Applying Questioning Skills",
    "Conducting Heuristic Evaluation",
    "Gathering User Feedback",
    "Conducting Usability Tests",
    "Creating User Personas",
    "Conducting Market Research",
    "Crafting Effective Questions",
    "Creating Effective Surveys",
    "Creating Sitemaps",
    "Designing User Flows"
  ];

  const candidateScores = selectedSkills?.reduce((acc, skill) => {
    if (!acc[skill.username]) {
      acc[skill.username] = {};
    }
    acc[skill.username][skill.name] = skill.consensus_score;
    return acc;
  }, {});


  console.log(candidateScores,"candidateScores")

  const candidateNames = Object.keys(candidateScores || {});

  const getColorByScore = (score) => {
    if (!score) return "bg-gray-200";
    if (score <= 2) return "bg-[#F8F8A6]";
    if (score <= 4) return "bg-[#003F0B]";
    if (score <= 6) return "bg-[#1A9641]";
    if (score <= 8) return "bg-[#A6D96A]";
    if (score <= 9) return "bg-[#A6D96A]";
    return "bg-[#003F0B]";
  };

  const getRowBackground = (skill) => {
    if (skill === "Experience") return "bg-[#E8F5ED]";
    if (skill === "Can join in" || skill === "Minimum salary expected") return "bg-[#FDF4ED]";
    return "";
  };

  return (
    <div className="pl-4">
      <div className="flex border-b justify-between mb-5">
        <div><button className="px-4 py-2 bg-[#209653] border border-[#209653] text-white">
          Compare View
        </button>
        <button className="px-4 py-2 bg-white border border-black">
          Individual View
        </button>
        <button className="px-4 py-2 bg-white border border-black">
          Shortlisted Candidates
        </button> </div>
       <div className='flex justify-center items-center gap-2 py-2'>
         <div className='border border-black p-4'>
        &#x2190;
        </div>
        <div className='border border-black p-4'>
        &#x2192;
        </div></div>
      </div>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-4 py-2"></th>
            {candidateNames.map((name, index) => (
              <th key={index} className="text-[12px] px-2 py-2 text-center">
                <div className="relative">
                  <div className="w-5 h-5 rounded-full bg-gray-300 mx-auto"></div>
                  <div className="absolute top-[-20px] right-[-10px] transform rotate-[-45deg] whitespace-nowrap">
                    {name ? name.split(' ').map(n => n.charAt(0)).join('') : ''}
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {skills.map((skill, index) => (
            <tr key={index} >
              <td className="px-1 py-1 text-left">{skill}</td>
              {candidateNames.map((name) => (
                <td key={name} className="px-2 py-2 text-center">
                  {["Experience", "Can join in", "Minimum salary expected"].includes(skill) ? (
                    <div className={`${getRowBackground(skill)} w-8 `} title={candidateScores[name][skill] || '0'}>
                      {candidateScores[name][skill] || '0'}
                    </div>
                  ) : (
                    <div 
                      className={`w-8 h-4 ${getColorByScore(candidateScores[name][skill])}`}
                      title={candidateScores[name][skill] || '0'}
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Checklist;