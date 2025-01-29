export default function Checklist({ selectedSkills }) {
  const skills = [
    "Wireframing and Prototyping",
    "Experience",
    "Can join in",
    "Minimum salary expected",
    "Creating Wireframes",
    "Creating Basic Prototypes",
    "Creation of Brands",
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
    "Designing User Flows",
 
  ];

  const candidateScores = selectedSkills?.reduce((acc, skill) => {
    if (!acc[skill.username]) {
      acc[skill.username] = {};
    }
    acc[skill.username][skill.name] = skill.consensus_score;
    return acc;
  }, {});

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

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Skills Checklist</h2>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-4 py-2"></th>
            {candidateNames.map((name, index) => (
              <th key={index} className="px-4 py-2">{name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {skills.map((skill, index) => (
            <tr key={index} className="">
              <td className="px-4 py-2">{skill}</td>
              {candidateNames.map((name) => (
                <td key={name} className="px-4 py-2">
                  <div 
                    className={`w-6 h-3 ${getColorByScore(candidateScores[name][skill])}`}
                    title={candidateScores[name][skill] || 'N/A'}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
