export default function CandidateDetail({ candidate }) {
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">{candidate.name}</h2>
      <p>Experience: {candidate.experience} years</p>
      <p>Can join in: {candidate.canJoinIn} days</p>
      <p>Minimum salary expected: ${candidate.salary}k</p>
    </div>
  );
}
