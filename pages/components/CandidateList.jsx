import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import Checklist from "./Checklist";

export default function CandidateList() {
  const [candidates, setCandidates] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://forinterview.onrender.com/people"
        );
        const responseData = await response.json();
        setCandidates(responseData);
      } catch (err) {
        setCandidates([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const isSkillSelected = (candidateId) => {
    return selectedSkills.some(skill => skill.id === candidateId);
  };

  const handleCandidateClick = async (candidateId) => {
    if (isSkillSelected(candidateId)) {
      setSelectedSkills(prevSkills => 
        prevSkills.filter(skill => skill.id !== candidateId)
      );
      return;
    }
    try {
      const response = await fetch(`https://forinterview.onrender.com/people/${candidateId}`);
      const candidateData = await response.json();

      const skillsWithScores = candidateData?.data?.data?.skillset.map(skill => ({
        name: skill.name,
        consensus_score: skill.skills[0]?.pos[0]?.consensus_score || 0,
        username: candidateData.name,
        id: candidateData.id
      }));

      setSelectedSkills(prevSkills => [...prevSkills, ...skillsWithScores]);
    } catch (err) {
      console.error("Error fetching candidate skills:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[500px] w-full">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="relative">
      <div>
        {candidates.length > 0 ? (
          <div className="flex flex-col gap-4">
            <div className="w-full p-4">
              {selectedSkills.length === 0 ? (
                <p className="text-gray-500">Select a candidate to compare skills</p>
              ) : (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {Array.from(new Set(selectedSkills.map(skill => skill.username))).map((username, idx) => (
                    <div
                      key={idx}
                      className="flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm whitespace-nowrap"
                    >
                      {username}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex">
              <div className="p-4 border-[1px] border-black w-[300px] max-h-[500px] overflow-scroll rounded-[12px]">
                {candidates?.map((candidate, index) => (
                  <div key={index}>
                    <button 
                      className="flex items-center justify-between w-full hover:bg-gray-50 p-2 rounded" 
                      onClick={() => handleCandidateClick(candidate.id)}
                    >
                      <p className="py-2">{candidate.name}</p>
                      <div className={`flex items-center justify-center p-3 h-[24px] w-[24px] border-[1px] ${
                        isSkillSelected(candidate.id) 
                          ? 'border-red-500 text-red-500' 
                          : 'border-blue-950 text-blue-950'
                      } rounded-[50px]`}>
                        {isSkillSelected(candidate.id) ? '-' : '+'}
                      </div>
                    </button>
                  </div>
                ))}
              </div>
              <Checklist selectedSkills={selectedSkills} />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-[500px] w-full">
            <p className="text-gray-500">No candidates found</p>
          </div>
        )}
      </div>
    </div>
  );
}