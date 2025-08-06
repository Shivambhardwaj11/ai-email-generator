import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

// Automatically use local or production backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const EmailForm = () => {
  const [recipients, setRecipients] = useState("");
  const [prompt, setPrompt] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [subject, setSubject] = useState("AI-Generated Email");
  const [loading, setLoading] = useState(false);

  const generateEmail = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${API_BASE_URL}/api/generate-email`, { prompt });
      setEmailBody(res.data.email);
      toast.success("Email generated!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate email");
    } finally {
      setLoading(false);
    }
  };

  const sendEmail = async () => {
    try {
      setLoading(true);
      await axios.post(`${API_BASE_URL}/api/send-email`, {
        recipients,
        subject,
        body: emailBody,
      });
      toast.success("Email sent!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to send email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Recipients Email (comma separated)"
        value={recipients}
        onChange={(e) => setRecipients(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        placeholder="Email Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <textarea
        placeholder="Prompt for AI"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full border p-2 rounded min-h-[100px]"
      />

      <button
        onClick={generateEmail}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate Email"}
      </button>

      <textarea
        placeholder="Generated email will appear here..."
        value={emailBody}
        onChange={(e) => setEmailBody(e.target.value)}
        className="w-full border p-2 rounded min-h-[200px]"
      />

      <button
        onClick={sendEmail}
        disabled={loading || !emailBody}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
      >
        {loading ? "Sending..." : "Send Email"}
      </button>
    </div>
  );
};

export default EmailForm;
