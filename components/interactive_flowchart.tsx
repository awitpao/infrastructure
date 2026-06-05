import React, { useState } from 'react';
import { 
  Briefcase, 
  Users, 
  HeartHandshake, 
  ArrowRight, 
  CheckCircle2, 
  GitBranch, 
  CircleDot,
  UserPlus
} from 'lucide-react';

// --- DATA DEFINITION ---
const processData = [
  {
    id: 1,
    title: 'Sales',
    icon: <Briefcase className="w-8 h-8" />,
    description: 'From lead generation to signing the Statement of Work.',
    color: 'blue',
    steps: [
      { role: 'Lead', text: 'New Lead schedules a call' },
      { role: 'RevOps', text: 'Adds the lead over to Clickup Opportunities Funnel' },
      { role: 'RevOps', text: 'Researches and prepares an executive prep doc' },
      { role: 'Gina', text: 'Jumps on the discovery call' },
      { role: 'RevOps', text: 'Captures recording, summary, and action items to send a recap email' },
      { 
        type: 'condition', 
        conditionText: 'IF sales follow-up call is needed:',
        subSteps: [
          { role: 'Neutral', text: 'A sales follow-up call is scheduled' },
          { role: 'Gina', text: 'Gina jumps on the sales follow-up call' },
          { role: 'RevOps', text: 'Captures recording, summary, and action items to send a recap email' },
          { role: 'RevOps', text: 'Creates a sample Job Brief' },
          { role: 'RevOps', text: 'Creates a request to recruitment for a Job Brief' },
          { role: 'Recruitment', text: 'Uses Job Brief to create Feasibility Report' },
        ]
      },
      { role: 'RevOps', text: 'Sends a proposal (Statement of Work)' },
      { 
        type: 'condition', 
        conditionText: 'IF client does not sign the Statement of Work:',
        subSteps: [
          { role: 'RevOps', text: 'Sends a follow-up email (1st follow-up)' },
          { role: 'RevOps', text: 'Sends a follow-up email (2nd follow-up)' },
          { role: 'RevOps', text: 'Sends a temp check email and moves the lead to nurture' },
        ]
      },
      { role: 'RevOps', text: 'Once signed, triggers the WON which automatically pushes it to the Job Board' },
    ]
  },
  {
    id: 2,
    title: 'Client Success & Recruitment',
    icon: <Users className="w-8 h-8" />,
    description: 'Alignment, candidate vetting, and match-making.',
    color: 'orange',
    steps: [
      { role: 'Client Success', text: 'Schedules an Avatar Call' },
      { role: 'Client Success', text: 'Prepares the Client Profile' },
      { role: 'Gina & CS', text: 'Gina and Client Success jump on the Avatar Call' },
      { role: 'Client Success', text: 'Uses InsightGen to complete Client Profile Avatar Call section' },
      { role: 'Client Success', text: "Sends a recap email with the client's link to their Client Portal" },
      { role: 'Client Success', text: 'Sets Target Endorsement Date and Target Fill Date' },
      { role: 'Client Success', text: 'Schedules an Alignment Call and loops in recruitment via daily huddle' },
      { role: 'Recruitment', text: 'Creates a Job Code and Job Description' },
      { role: 'Recruitment', text: 'Pushes new Job Description over to the careers page & starts vetting process (Pre-screening, Interviews, Test Project)' },
      { role: 'Recruitment', text: 'Prepares Cadence Check Slides' },
      { role: 'Client Success', text: 'Jumps on the Alignment Call with the client' },
      { role: 'Recruitment', text: 'Endorses candidates to Client Success with the Prep Doc' },
      { role: 'Client Success', text: 'Pushes the prep doc over to the client and asks if they want to interview' },
      { role: 'Client Success', text: 'Schedules a Meet & Greet between the client and the candidates' },
      { role: 'Client Success', text: 'Deliberates with client and identifies "match"' },
      { role: 'Client Success', text: 'Sets Talent Orientation Call & Talent Handover call on first day of matched candidate' },
    ]
  },
  {
    id: 3,
    title: 'Client Success & PeopleOps',
    icon: <HeartHandshake className="w-8 h-8" />,
    description: 'Onboarding, trial period, and long-term milestones.',
    color: 'teal',
    steps: [
      { role: 'Talent Success', text: 'Locks in compliances with new hire during the Talent Orientation Call' },
      { role: 'Talent Success', text: 'Sets weekly calls during the six-week trial period with the new hire' },
      { role: 'Client Success', text: 'Sets weekly calls during the six-week trial period with the client' },
      { 
        type: 'condition', 
        conditionText: "IF the client can't join the weekly calls:",
        subSteps: [
          { role: 'Client Success', text: 'Sends the Trial Period Evaluation Form (Weeks 1-5)' },
          { role: 'Client Success', text: 'Sends the Trial Period Deliberation Form (Week 6)' },
        ]
      },
      { role: 'Client Success', text: 'Closes the loop by sending over notes from the client to the Talent Success Manager' },
      { role: 'Talent Success', text: 'Processes notes from clients and coaches new hire week-on-week' },
      { role: 'Talent Success', text: 'Every quarter for the first year, set up Growth Milestone Meetings with new hire' },
      { role: 'Client Success', text: 'Every quarter for the first year, set up Growth Milestone Meetings with client' },
      { role: 'Talent Success', text: 'Processes notes from clients and coaches new hire quarter-on-quarter' },
      { role: 'Talent Success', text: 'Every six months after first year, set up Growth Milestone Meetings with new hire' },
      { role: 'Client Success', text: 'Every six months after first year, set up Growth Milestone Meetings with client' },
      { role: 'Talent Success', text: 'Processes notes from clients and coaches new hire every six months' },
    ]
  }
];

// --- HELPER COMPONENTS ---
type RoleBadgeProps = { role: string };

const RoleBadge: React.FC<RoleBadgeProps> = ({ role }) => {
  let colors = 'bg-gray-100 text-gray-700 border-gray-200'; // Default Neutral/Lead
  
  if (role === 'RevOps') colors = 'bg-blue-100 text-blue-800 border-blue-200';
  if (role === 'Gina') colors = 'bg-purple-100 text-purple-800 border-purple-200';
  if (role === 'Recruitment') colors = 'bg-orange-100 text-orange-800 border-orange-200';
  if (role === 'Client Success') colors = 'bg-green-100 text-green-800 border-green-200';
  if (role === 'Talent Success') colors = 'bg-teal-100 text-teal-800 border-teal-200';
  if (role === 'Gina & CS') colors = 'bg-pink-100 text-pink-800 border-pink-200';

  return (
    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${colors} whitespace-nowrap shadow-sm`}>
      {role}
    </span>
  );
};

// --- MAIN APP COMPONENT ---
export default function App() {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);

  const activePhase = processData[activePhaseIndex];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-3">Structure 2 Scale</h1>
          <p className="text-lg text-gray-500">Interactive End-to-End Operational Flowchart</p>
        </div>

        {/* MACRO VIEW: Phase Selection */}
        <div className="mb-12">
          <h2 className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-4 text-center">
            Macro View: Select a Phase
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-2">
            {processData.map((phase, index) => {
              const isActive = activePhaseIndex === index;
              return (
                <React.Fragment key={phase.id}>
                  <div 
                    onClick={() => setActivePhaseIndex(index)}
                    className={`flex-1 w-full md:w-auto relative cursor-pointer group transition-all duration-300 ease-out transform ${
                      isActive 
                        ? 'scale-105 shadow-lg bg-white ring-2 ring-indigo-500' 
                        : 'shadow hover:shadow-md bg-white hover:-translate-y-1 ring-1 ring-gray-200'
                    } rounded-xl p-6 text-center`}
                  >
                    <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors ${
                      isActive ? `bg-indigo-100 text-indigo-600` : `bg-gray-50 text-gray-400 group-hover:text-indigo-500 group-hover:bg-indigo-50`
                    }`}>
                      {phase.icon}
                    </div>
                    <h3 className={`text-lg font-bold mb-2 ${isActive ? 'text-indigo-700' : 'text-gray-800'}`}>
                      {index + 1}. {phase.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-tight">
                      {phase.description}
                    </p>
                    
                    {/* Active Indicator */}
                    {isActive && (
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-indigo-500 rotate-45 rounded-sm"></div>
                    )}
                  </div>
                  
                  {/* Arrows between cards (hidden on mobile) */}
                  {index < processData.length - 1 && (
                    <div className="hidden md:flex text-gray-300 items-center justify-center px-2">
                      <ArrowRight className="w-8 h-8" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* MICRO VIEW: Detailed Timeline */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-10 relative overflow-hidden transition-all duration-500">
          
          <div className="mb-8 border-b border-gray-100 pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Phase {activePhase.id}: {activePhase.title}
              </h2>
              <p className="text-gray-500 mt-1">Detailed Step-by-Step Flow</p>
            </div>
          </div>

          {/* Timeline Container */}
          <div className="relative border-l-2 border-indigo-100 ml-4 md:ml-6 space-y-8 pb-4">
            
            {activePhase.steps.map((step, idx) => (
              <div key={idx} className="relative pl-8 md:pl-10">
                
                {/* Timeline Dot */}
                <span className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-white border-4 border-indigo-200 flex items-center justify-center shadow-sm"></span>

                {/* Standard Step Render */}
                {!step.type && (
                  <div className="bg-gray-50 rounded-xl p-4 md:p-5 border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <p className="text-gray-700 font-medium leading-relaxed mt-1 flex-1 text-[15px]">
                        {step.text}
                      </p>
                      <div className="shrink-0">
                        <RoleBadge role={step.role || 'Neutral'} />
                      </div>
                    </div>
                  </div>
                )}

                {/* Conditional / Branch Render */}
                {step.type === 'condition' && (
                  <div className="bg-amber-50/50 rounded-xl p-4 md:p-5 border border-amber-200/60 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-amber-400"></div>
                    
                    <div className="flex items-center gap-2 mb-4 text-amber-800 font-bold">
                      <GitBranch className="w-5 h-5" />
                      <h4>{step.conditionText}</h4>
                    </div>

                    <div className="space-y-3 pl-2 md:pl-4 border-l border-amber-200 border-dashed">
                      {step.subSteps.map((subStep, subIdx) => (
                        <div key={subIdx} className="flex flex-col sm:flex-row sm:items-center justify-between bg-white rounded-lg p-3 border border-amber-100 shadow-sm gap-3">
                          <div className="flex items-start gap-2">
                            <CircleDot className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                            <p className="text-sm text-gray-700 font-medium">{subStep.text}</p>
                          </div>
                          <div className="shrink-0">
                            <RoleBadge role={subStep.role} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
              </div>
            ))}
            
            {/* End of Timeline Indicator */}
            <div className="relative pl-8 md:pl-10 pt-4">
              <span className="absolute -left-[13px] top-4 w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center shadow-md">
                <CheckCircle2 className="w-4 h-4" />
              </span>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest pt-1">
                End of Phase {activePhase.id}
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}