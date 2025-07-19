import {
  Bell,
  Calendar,
  Pill,
  Clock,
  ScanLine,
  ShoppingCart,
  ChevronRight,
} from "lucide-react";

const PatientDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-emerald-900 mb-8">
            Welcome Back, ABC!
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <a href="/reminder">
              <div className="bg-white p-6 rounded-xl shadow-md border border-emerald-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <Bell className="text-emerald-600 w-8 h-8" />
                  <ChevronRight className="text-emerald-400 w-5 h-5" />
                </div>
                <h3
                  className="te.
xt-lg font-semibold text-emerald-900 mb-2"
                >
                  Set Reminder
                </h3>
                <p className="text-emerald-600">
                  Never miss your medicine doses
                </p>
              </div>
            </a>

            <a href="/reminder">
              <div className="bg-white p-6 rounded-xl shadow-md border border-emerald-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <Clock className="text-emerald-600 w-8 h-8" />
                  <ChevronRight className="text-emerald-400 w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-emerald-900 mb-2">
                  Track Medicine
                </h3>
                <p className="text-emerald-600">
                  Monitor your medicine routine
                </p>
              </div>
            </a>

            <div className="bg-white p-6 rounded-xl shadow-md border border-emerald-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <Calendar className="text-emerald-600 w-8 h-8" />
                <ChevronRight className="text-emerald-400 w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-emerald-900 mb-2">
                Make Appointment
              </h3>
              <p className="text-emerald-600">Schedule your next visit</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Scan Prescription */}
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 rounded-xl shadow-lg text-white">
              <div className="flex items-center gap-4 mb-4">
                <ScanLine className="w-10 h-10" />
                <div>
                  <h3 className="text-xl font-bold mb-1">Scan Prescription</h3>
                  <p className="text-emerald-100">
                    Add prescription to your routine
                  </p>
                </div>
              </div>
              <button type="button" className="mt-4 bg-white text-emerald-600 px-4 py-2 rounded-lg font-medium hover:bg-emerald-50 transition-colors">
                Scan Now
              </button>
            </div>

            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 rounded-xl shadow-lg text-white">
              <div className="flex items-center gap-4 mb-4">
                <ShoppingCart className="w-10 h-10" />
                <div>
                  <h3 className="text-xl font-bold mb-1">Purchase Medicine</h3>
                  <p className="text-emerald-100">Buy medicines online</p>
                </div>
              </div>
              <button type="button" className="mt-4 bg-white text-emerald-600 px-4 py-2 rounded-lg font-medium hover:bg-emerald-50 transition-colors">
                Shop Now
              </button>
            </div>
          </div>

          {/* Upcoming Reminders */}
          <div className="mt-8 bg-white p-6 rounded-xl shadow-md border border-emerald-100">
            <h3 className="text-xl font-semibold text-emerald-900 mb-4">
              Reminders
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <Pill className="text-emerald-600 w-6 h-6" />
                  <div>
                    <p className="font-medium text-emerald-900">Vitamin D3</p>
                    <p className="text-sm text-emerald-600">
                      1 tablet after breakfast
                    </p>
                  </div>
                </div>
                <span className="text-emerald-600 font-medium">9:00 AM</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <Pill className="text-emerald-600 w-6 h-6" />
                  <div>
                    <p className="font-medium text-emerald-900">ABC</p>
                    <p className="text-sm text-emerald-600">
                      2 tablets after dinner
                    </p>
                  </div>
                </div>
                <span className="text-emerald-600 font-medium">8:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
