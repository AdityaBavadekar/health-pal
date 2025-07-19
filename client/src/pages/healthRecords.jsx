import { useEffect, useState } from "react";
import { Activity, MoveUpRight, Calendar, Sparkles } from "lucide-react";

const NoHealthRecords = () => {
  return (
    <div className="flex items-center justify-center mt-12">
      <div className="relative group">
        {/* Animated background gradient */}
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-pulse"></div>

        {/* Main card */}
        <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-8 max-w-md text-center flex flex-col gap-6 shadow-2xl border border-emerald-100/50">
          {/* Animated icon */}
          <div className="relative mx-auto">
            <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-xl animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-emerald-400 to-teal-500 p-4 rounded-full">
              <Activity className="w-8 h-8 text-white animate-bounce" />
            </div>
          </div>

          <div className="text-center space-y-3">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              No Health Records Added
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Start your health journey by visiting a hospital or consulting your doctor to add your first health record.
            </p>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-4 right-4">
            <Sparkles className="w-5 h-5 text-emerald-400/50 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

// const MedicineRecordCard = ({ record }) => {
//   return (
//     <div className="group relative">
//       {/* Hover glow effect */}
//       <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>

//       {/* Main card */}
//       <div className="relative bg-gradient-to-br from-emerald-50 via-white to-teal-50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-[1.02] border border-emerald-100/50 backdrop-blur-sm">
//         <div className="flex flex-col gap-4">
//           <div className="flex items-center gap-3">
//             <div className="bg-gradient-to-br from-emerald-400 to-teal-500 p-2 rounded-lg">
//               <Pill className="w-5 h-5 text-white" />
//             </div>
//             <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
//               {record.name}
//             </h3>
//           </div>

//           <div className="flex items-center gap-2 text-emerald-600">
//             <Clock className="w-4 h-4" />
//             <p className="text-sm font-medium">
//               {record.frequency} time{record.frequency > 1 ? "s" : ""} a {record.frequencyUnit}
//             </p>
//           </div>

//           <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl px-4 py-2 font-semibold text-sm w-fit shadow-lg">
//             <Calendar className="w-4 h-4" />
//             {record.consumptionTime}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

const HealthRecords = () => {
  const [medicineRecords, setMedicineRecords] = useState([]);

  // Mock data for demonstration
  useEffect(() => {
    // Simulating API call with mock data
    setTimeout(() => {
      setMedicineRecords([
        {
          createdAt: new Date().toISOString(),
          items: [
            { name: "Amoxicillin 500mg" },
            { name: "Ibuprofen 200mg" },
            { name: "Vitamin D3 1000 IU" }
          ]
        },
        {
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          items: [
            { name: "Paracetamol 650mg" },
            { name: "Cetirizine 10mg" }
          ]
        }
      ]);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Main content */}
      <div className="relative px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 blur-3xl"></div>
          <div className="relative">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-emerald-400 to-teal-500 p-3 rounded-2xl shadow-lg">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                My Health Records
              </h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Keep track of your medical history, prescriptions, and treatments all in one beautiful, secure place.
            </p>
          </div>
        </div>

        {/* Content area */}
        <div className="max-w-6xl mx-auto">
          {medicineRecords.length === 0 ? (
            <NoHealthRecords />
          ) : (
            <div className="space-y-8">
              {medicineRecords.map((record, index) => (
                <div
                  key={record.createdAt}
                  className="group relative animate-in fade-in-up duration-500"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {/* Card glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-3xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>

                  {/* Main prescription card */}
                  <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-emerald-100/50 p-8 hover:shadow-2xl transition-all duration-500">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-8">
                      <div className="bg-gradient-to-br from-emerald-400 to-teal-500 p-3 rounded-2xl shadow-lg">
                        <Calendar className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
                          Prescription
                        </h2>
                        <p className="text-emerald-600 font-medium">
                          {new Date(record.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>

                    {/* Medicine list */}
                    <div className="grid gap-4">
                      {record.items?.map((item, itemIndex) => (
                        <div
                          key={item.name}
                          className="group/item relative"
                        >
                          {/* Item hover effect */}
                          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400/50 to-teal-400/50 rounded-2xl blur opacity-0 group-hover/item:opacity-30 transition duration-300"></div>

                          {/* Medicine item */}
                          <div className="relative bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100/50 hover:shadow-lg transition-all duration-300">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-xl w-8 h-8 flex items-center justify-center font-bold text-sm shadow-lg">
                                  {itemIndex + 1}
                                </div>
                                <div>
                                  <h3 className="text-lg font-bold text-emerald-800">
                                    {item.name}
                                  </h3>
                                </div>
                              </div>

                              {/* BlinkIt link */}
                              <a
                                href={`https://blinkit.com/s/?q=${encodeURIComponent(item.name)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/link inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-4 py-2 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                              >
                                <MoveUpRight className="w-4 h-4 group-hover/link:rotate-45 transition-transform duration-300" />
                                <span>Find on BlinkIt</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HealthRecords;