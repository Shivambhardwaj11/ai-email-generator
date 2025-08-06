import EmailForm from './components/EmailForm';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">AI Email Generator</h1>
        <EmailForm />
      </div>
      <Toaster />
    </div>
  );
}

export default App;

