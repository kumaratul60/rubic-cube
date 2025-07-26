interface SolverHintProps {
  step: string;
  move: string;
}
export const SolverHint = ({ step, move }: SolverHintProps) => (
  <div className="fixed top-4 right-4 p-2 bg-yellow-200 text-black rounded shadow-md">
    <p className="text-xs font-mono">CFOP Step: {step}</p>
    <p className="text-lg font-bold">➡ {move}</p>
  </div>
);
