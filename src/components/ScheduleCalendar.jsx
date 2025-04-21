import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaCalendarAlt, FaPlus, FaTimes, FaLock } from 'react-icons/fa';
import hardcodedSchedules from '../data/hardcodedSchedules';

const ScheduleCalendar = ({ societyId, societyName }) => {
  const [date, setDate] = useState(new Date());
  const [schedules, setSchedules] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    date: new Date(),
    wasteType: 'all',
    notes: '',
  });

  // Check if this is a hardcoded society (ID between 1-5)
  const isHardcodedSociety = societyId >= 1 && societyId <= 5;

  // Load schedules from localStorage and merge with hardcoded schedules if applicable
  useEffect(() => {
    // Get user-added schedules from localStorage
    const storedSchedules = JSON.parse(localStorage.getItem(`schedules_${societyId}`) || '[]');

    // If this is a hardcoded society, merge with hardcoded schedules
    if (isHardcodedSociety && hardcodedSchedules[societyId]) {
      const allSchedules = [...hardcodedSchedules[societyId], ...storedSchedules];
      setSchedules(allSchedules);
    } else {
      setSchedules(storedSchedules);
    }
  }, [societyId, isHardcodedSociety]);

  // Save schedules to localStorage whenever they change (only user-added ones)
  useEffect(() => {
    // Filter out hardcoded schedules before saving to localStorage
    const userSchedules = schedules.filter(schedule => !schedule.isHardcoded);
    localStorage.setItem(`schedules_${societyId}`, JSON.stringify(userSchedules));
  }, [schedules, societyId]);

  const handleAddSchedule = (e) => {
    e.preventDefault();
    const newScheduleItem = {
      ...newSchedule,
      id: Date.now(),
      date: newSchedule.date.toISOString(),
    };

    setSchedules([...schedules, newScheduleItem]);
    setShowAddForm(false);
    setNewSchedule({
      date: new Date(),
      wasteType: 'all',
      notes: '',
    });
  };

  const handleDeleteSchedule = (id) => {
    // Only allow deletion of user-added schedules (not hardcoded ones)
    const scheduleToDelete = schedules.find(schedule => schedule.id === id);
    if (scheduleToDelete && !scheduleToDelete.isHardcoded) {
      setSchedules(schedules.filter(schedule => schedule.id !== id));
    }
  };

  // Function to check if a date has a schedule and apply appropriate styling
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      // Check if there's any schedule for this date
      const schedulesForDate = schedules.filter(
        schedule => new Date(schedule.date).toDateString() === date.toDateString()
      );

      if (schedulesForDate.length === 0) {
        return null;
      }

      // Check if there's a hardcoded schedule for this date
      const hasHardcodedSchedule = schedulesForDate.some(schedule => schedule.isHardcoded);

      // Return different styles based on schedule type
      if (hasHardcodedSchedule) {
        return 'bg-blue-100 rounded-full'; // Hardcoded schedules get a blue background
      } else {
        return 'bg-green-100 rounded-full'; // User-added schedules get a green background
      }
    }
  };

  // Get upcoming schedules (sorted by date)
  const upcomingSchedules = [...schedules]
    .filter(schedule => new Date(schedule.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // Get waste type label
  const getWasteTypeLabel = (type) => {
    switch(type) {
      case 'organic': return 'Organic Waste';
      case 'recyclable': return 'Recyclable Waste';
      case 'nonRecyclable': return 'Non-Recyclable Waste';
      case 'all': return 'All Waste Types';
      default: return type;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <FaCalendarAlt className="text-xl text-green-600 mr-2" />
          <div>
            <h3 className="text-xl font-semibold">Waste Collection Schedule</h3>
            {societyName && <p className="text-sm text-gray-500">for {societyName}</p>}
          </div>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-green-600 text-white px-3 py-1 rounded-md flex items-center"
        >
          {showAddForm ? <FaTimes className="mr-1" /> : <FaPlus className="mr-1" />}
          {showAddForm ? 'Cancel' : 'Add Schedule'}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddSchedule} className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Date</label>
            <input
              type="date"
              value={newSchedule.date.toISOString().split('T')[0]}
              onChange={(e) => setNewSchedule({...newSchedule, date: new Date(e.target.value)})}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Waste Type</label>
            <select
              value={newSchedule.wasteType}
              onChange={(e) => setNewSchedule({...newSchedule, wasteType: e.target.value})}
              className="w-full p-2 border rounded-md"
            >
              <option value="all">All Waste Types</option>
              <option value="organic">Organic Waste</option>
              <option value="recyclable">Recyclable Waste</option>
              <option value="nonRecyclable">Non-Recyclable Waste</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Notes</label>
            <textarea
              value={newSchedule.notes}
              onChange={(e) => setNewSchedule({...newSchedule, notes: e.target.value})}
              className="w-full p-2 border rounded-md"
              rows="2"
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-md"
          >
            Save Schedule
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div>
            <Calendar
              onChange={setDate}
              value={date}
              tileClassName={tileClassName}
              className="border-0 w-full"
            />
            <div className="flex justify-center mt-3 text-xs text-gray-500 space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-100 rounded-full mr-1"></div>
                <span>Default schedule</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-100 rounded-full mr-1"></div>
                <span>Your added schedule</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-medium mb-4">Upcoming Collections</h4>
          {upcomingSchedules.length === 0 ? (
            <p className="text-gray-500">No upcoming waste collections scheduled.</p>
          ) : (
            <div className="space-y-4">
              {upcomingSchedules.slice(0, 5).map((schedule) => (
                <div key={schedule.id} className={`flex items-start p-3 rounded-md ${schedule.isHardcoded ? 'bg-blue-50' : 'bg-gray-50'}`}>
                  <div className={`p-2 rounded-full mr-3 ${schedule.isHardcoded ? 'bg-blue-100' : 'bg-green-100'}`}>
                    <FaCalendarAlt className={schedule.isHardcoded ? 'text-blue-600' : 'text-green-600'} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="font-medium">
                        {new Date(schedule.date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                      {schedule.isHardcoded ? (
                        <span className="text-gray-400" title="Default schedule (cannot be deleted)">
                          <FaLock size={14} />
                        </span>
                      ) : (
                        <button
                          onClick={() => handleDeleteSchedule(schedule.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTimes />
                        </button>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{getWasteTypeLabel(schedule.wasteType)}</p>
                    {schedule.notes && <p className="text-sm text-gray-500 mt-1">{schedule.notes}</p>}
                    {schedule.isHardcoded && <p className="text-xs text-blue-500 mt-1">Default schedule</p>}
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

export default ScheduleCalendar;
