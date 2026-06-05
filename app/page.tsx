import InteractiveFlowchart from '../components/interactive_flowchart';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 p-8 font-sans dark:bg-black">
      
      {/* Your flowchart component is rendered here */}
      <InteractiveFlowchart />
      
    </div>
  );
}