import JurisdictionSelector from 'components/JurisdictionSelector';

const App = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white font-sans text-gray-900">
      <div className="flex flex-col gap-y-4">
        <div className="font-semibold text-2xl">Jurisdiction selector</div>
        <JurisdictionSelector />
      </div>
    </div>
  );
};

export default App;
