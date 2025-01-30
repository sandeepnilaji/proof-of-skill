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
    <div className="relative w-full">
      <div className="p-2 text-gray-500">
      &#x2190; {" "} Back to My Jobs
      </div>
      <div className="flex justify-between items-center">
      <div className="p-6 text-[32px] text-gray-400">Posk_UXdesigner_sr001</div>
      <div className="p-6 text-[24px] text-gray-400">23 Candidates</div>
      </div>
      <div>
        {candidates.length > 0 ? (
          <div className="flex flex-col gap-4">
            <div className="flex">
              <div className="border-[1px] border-black w-[300px] max-h-[500px] overflow-hidden">
                <div className="flex justify-center items-center border-b p-4">Most recommended</div>
                <div className="max-h-[500px] overflow-y-auto pl-4 pb-4 pr-4">
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
                ))}</div>
              </div>
              <div className="w-full">
              <Checklist selectedSkills={selectedSkills} />
              </div>
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