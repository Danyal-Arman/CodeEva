const InterviewVisual = () => {

  const questions = [
    { label: "Question 1", status: "Solved" },
    { label: "Question 2", status: "In progress" },
    { label: "Question 3", status: "Locked" },
  ];

  return (
    <div className="glass-strong rounded-2xl p-5">

      <div className="mb-4 flex items-center justify-between">

        <div>

          <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
            Interview
          </div>

          <div className="mt-1 text-lg font-medium">
            Binary Tree Right Side View
          </div>

        </div>

        <div className="rounded-full border border-violet/30 bg-violet/10 px-3 py-1 font-mono text-[13px] text-violet">
          32:14
        </div>

      </div>

      <div className="space-y-2">

        {questions.map((question) => (

          <div
            key={question.label}
            className="flex items-center justify-between rounded-lg bg-white/[0.03] px-3 py-2 ring-1 ring-white/5"
          >

            <span>{question.label}</span>

            <span
              className={`text-[11px] ${
                question.status === "Solved"
                  ? "text-[oklch(0.7_0.2_150)]"
                  : question.status === "In progress"
                  ? "text-violet"
                  : "text-muted-foreground"
              }`}
            >
              {question.status}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
};

export default InterviewVisual;