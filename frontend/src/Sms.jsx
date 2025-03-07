import { useState } from "react";
import axios from "axios";

const MoneySplitCalculator = () => {
  const [bill, setBill] = useState("");
  const [tip, setTip] = useState(0);
  const [people, setPeople] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");
  
  const tipAmount = bill && people ? (bill * (tip / 100)) / people : 0;
  const totalAmount = bill && people ? (bill * (1 + tip / 100)) / people : 0;

  const handleReset = () => {
    setBill("");
    setTip(0);
    setPeople("");
    setPhone("");
    setStatus("");
  };

  const handleSendSMS = async () => {
    if (!phone) {
      setStatus("Please enter a phone number.");
      return;
    }
    const message = `Total Amount per person: (₹)${totalAmount.toFixed(2)}`;
    try {
      const response = await axios.post("http://localhost:5000/send-sms", {
        phone,
        message,
      });
      if (response.data.success) {
        setStatus("✅ SMS sent successfully!");
      } else {
        setStatus("❌ Failed to send SMS.");
      }
    } catch (error) {
      console.error("Error sending SMS:", error);
      setStatus("❌ Error sending SMS.");
    }
  };

  return (<>
  <div className="flex flex-col items-center-6 rounded-lg max-w-5xl w-full mx-auto shadow-lgmx-auto  shadow-md rounded-md">
    <h1 className="text-2xl font-bold text-center mb-4">Spliter</h1>
<div className="flex flex-col md:flex-row bg-[#D3EDEE] p-6 rounded-lg max-w-5xl w-full mx-auto shadow-lg">
    <div className="flex-1 p-4">
        <label className="block font-bold">Bill</label>
        <input
          type="number"
          value={bill}
          onChange={(e) => setBill(e.target.value)}
          className="w-full p-2 border rounded bg-[#CDE4E3] text-right"
          placeholder="(₹)"
        />
        
        <label className="block mt-4 font-bold">Select Tip %</label>
        <div className="grid grid-cols-3 gap-2 mt-2">
        {[5, 10, 15, 25, 50].map((percentage) => (
            <button
            key={percentage}
            className={`p-2 rounded text-white font-bold ${
                tip === percentage ? "bg-teal-400" : "bg-teal-800"
            }`}
            onClick={() => setTip((prevTip) => (prevTip === percentage ? null : percentage))}
            >
            {percentage}%
            </button>
        ))}
        </div>

        <label className="block mt-4 font-bold">Number of People</label>
        <input
          type="number"
          value={people}
          onChange={(e) => setPeople(e.target.value)}
          className="w-full p-2 border rounded bg-[#CDE4E3] text-right"
          placeholder="👤"
        />

        {/* <label className="block mt-4 font-bold">Phone Number</label> */}
        {/* <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 border rounded bg-[#CDE4E3] text-right"
          placeholder="📞"
        /> */}
      </div>
      
      <div className="flex-1 bg-[#003D40] text-white p-6 rounded-lg flex flex-col justify-between">
        <div>
          <p className="text-lg">Tip Amount / person</p>
          <h2 className="text-2xl font-bold">(₹) {tipAmount.toFixed(2)}</h2>
          <p className="text-lg mt-4">Single / person</p>
          <h2 className="text-2xl font-bold">(₹) {totalAmount.toFixed(2)}</h2>
        </div>
        {/* <button 
          className="mt-6 bg-teal-400 text-black p-2 rounded font-bold"
          onClick={handleSendSMS}
        >
          SEND SMS
        </button> */}
        <button 
          className="mt-2 bg-red-400 text-black p-2 rounded font-bold"
          onClick={handleReset}
        >
          RESET
        </button>
        {status && <p className="mt-3 text-sm text-gray-300">{status}</p>}
        </div>
        </div>
        </div>
 </> );
};

export default MoneySplitCalculator;
