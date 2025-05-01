import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {
    FaCalendarAlt,
    FaPlus,
    FaTimes,
    FaFilter,
    FaTrash,
    FaRecycle,
    FaLeaf,
    FaCheck,
    FaCircle,
    FaEye,
} from 'react-icons/fa';
import hardcodedSchedules from '../data/hardcodedSchedules';
import CryptoJS from 'crypto-js';

// List of specific societies to generate deterministic data for
const SPECIFIC_SOCIETIES = [
    'Aishwarayam Hamara',
    'River Residency',
    'Kamla Nivas',
    'Venture City',
    'Aasara Crystal Heights',
];

// Generate deterministic schedules based on society name
const generateDeterministicSchedules = (societyName) => {
    const hash = CryptoJS.SHA256(societyName).toString(CryptoJS.enc.Hex);
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    // Also generate for previous month
    const lastMonth = month === 0 ? 11 : month - 1;
    const lastMonthYear = month === 0 ? year - 1 : year;

    // And next month
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextMonthYear = month === 11 ? year + 1 : year;

    const wasteTypes = ['organic', 'recyclable', 'nonRecyclable', 'all'];
    const startDay = (parseInt(hash.substring(0, 2), 16) % 7) + 1;
    const schedules = [];

    // Generate past month schedules
    for (let i = 0; i < 4; i++) {
        const day = startDay + i * 7;
        if (day <= 28) {
            const wasteTypeIndex =
                parseInt(hash.substring(i * 2 + 10, i * 2 + 12), 16) % wasteTypes.length;
            const wasteType = wasteTypes[wasteTypeIndex];

            const notes = generateNotes(wasteType, hash, i, true);

            schedules.push({
                id: `${societyName}-past-${i}`,
                date: new Date(lastMonthYear, lastMonth, day).toISOString(),
                wasteType,
                notes,
                isHardcoded: true,
                isPast: true,
                isCompleted: true,
            });
        }
    }

    // Generate current month schedules
    for (let i = 0; i < 4; i++) {
        const day = startDay + i * 7;
        if (day <= 28) {
            const wasteTypeIndex =
                parseInt(hash.substring(i * 2, i * 2 + 2), 16) % wasteTypes.length;
            const wasteType = wasteTypes[wasteTypeIndex];

            const notes = generateNotes(wasteType, hash, i, false);

            const eventDate = new Date(year, month, day);
            const isPast = eventDate < now;
            const isCompleted = isPast
                ? parseInt(hash.substring(i * 5, i * 5 + 2), 16) % 100 > 30
                : false;

            schedules.push({
                id: `${societyName}-${i}`,
                date: eventDate.toISOString(),
                wasteType,
                notes,
                isHardcoded: true,
                isPast,
                isCompleted,
            });
        }
    }

    // Generate next month schedules
    for (let i = 0; i < 4; i++) {
        const day = startDay + i * 7;
        if (day <= 28) {
            const wasteTypeIndex =
                parseInt(hash.substring(i * 2 + 20, i * 2 + 22), 16) % wasteTypes.length;
            const wasteType = wasteTypes[wasteTypeIndex];

            const notes = generateNotes(wasteType, hash, i, false);

            schedules.push({
                id: `${societyName}-future-${i}`,
                date: new Date(nextMonthYear, nextMonth, day).toISOString(),
                wasteType,
                notes,
                isHardcoded: true,
                isPast: false,
                isCompleted: false,
            });
        }
    }

    return schedules;
};

// Helper function to generate notes
const generateNotes = (wasteType, hash, index, isPast) => {
    let notes = '';
    switch (wasteType) {
        case 'organic':
            notes = 'Organic waste collection';
            break;
        case 'recyclable':
            notes = 'Recyclable waste collection';
            break;
        case 'nonRecyclable':
            notes = 'Non-recyclable waste collection';
            break;
        case 'all':
            notes = 'Full waste collection';
            break;
    }

    // Add variation based on hash
    const hashPart = isPast
        ? parseInt(hash.substring(index * 3 + 5, index * 3 + 7), 16) % 3
        : parseInt(hash.substring(index * 3, index * 3 + 2), 16) % 3;

    if (hashPart === 0) {
        notes += isPast ? ' (completed)' : ' (special drive)';
    }

    return notes;
};

const ScheduleCalendar = ({ societyId, societyName }) => {
    // State
    const [date, setDate] = useState(new Date());
    const [schedules, setSchedules] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [view, setView] = useState('upcoming'); // 'upcoming', 'all', 'past'
    const [filterType, setFilterType] = useState('all-types');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);

    // Create a new schedule
    const [newSchedule, setNewSchedule] = useState({
        date: new Date(),
        wasteType: 'all',
        notes: '',
    });

    // Check if this is one of our specific societies
    const isSpecificSociety = SPECIFIC_SOCIETIES.includes(societyName);

    // Check if this is a numeric ID (for old hardcoded societies)
    const isNumericId =
        !isNaN(parseInt(societyId)) && parseInt(societyId) >= 1 && parseInt(societyId) <= 5;

    // Load schedules from localStorage and merge with generated schedules if applicable
    useEffect(() => {
        // Get user-added schedules from localStorage
        const storedSchedules = JSON.parse(localStorage.getItem(`schedules_${societyId}`) || '[]');

        // Generate or load schedules
        if (isSpecificSociety) {
            const generatedSchedules = generateDeterministicSchedules(societyName);
            const allSchedules = [...generatedSchedules, ...storedSchedules];
            setSchedules(allSchedules);
        }
        // For old hardcoded societies (ID 1-5), use hardcoded schedules
        else if (isNumericId && hardcodedSchedules[societyId]) {
            const allSchedules = [...hardcodedSchedules[societyId], ...storedSchedules];
            setSchedules(allSchedules);
        }
        // Otherwise just use stored schedules
        else {
            setSchedules(storedSchedules);
        }
    }, [societyId, societyName, isSpecificSociety, isNumericId]);

    // Save user-added schedules to localStorage
    useEffect(() => {
        const userSchedules = schedules.filter((schedule) => !schedule.isHardcoded);
        localStorage.setItem(`schedules_${societyId}`, JSON.stringify(userSchedules));
    }, [schedules, societyId]);

    // Handle adding a new schedule
    const handleAddSchedule = (e) => {
        e.preventDefault();
        const newScheduleItem = {
            ...newSchedule,
            id: Date.now().toString(),
            date: newSchedule.date.toISOString(),
            isCompleted: false,
            isPast: new Date(newSchedule.date) < new Date(),
        };

        setSchedules([...schedules, newScheduleItem]);
        setShowAddForm(false);
        setNewSchedule({
            date: new Date(),
            wasteType: 'all',
            notes: '',
        });

        // Show a message that the schedule was added
        const scheduleDate = new Date(newScheduleItem.date);
        setSelectedDay(scheduleDate);

        // Set view to show the newly added schedule if it's in the future
        if (!newScheduleItem.isPast) {
            setView('upcoming');
        }
    };

    // Delete a schedule
    const handleDeleteSchedule = (id) => {
        const scheduleToDelete = schedules.find((schedule) => schedule.id === id);
        if (scheduleToDelete && !scheduleToDelete.isHardcoded) {
            setSchedules(schedules.filter((schedule) => schedule.id !== id));
        }
    };

    // Toggle completion status
    const handleToggleComplete = (id) => {
        setSchedules(
            schedules.map((schedule) =>
                schedule.id === id ? { ...schedule, isCompleted: !schedule.isCompleted } : schedule
            )
        );
    };

    // Get icon for waste type
    const getWasteTypeIcon = (type) => {
        switch (type) {
            case 'organic':
                return <FaLeaf className="text-green-600" />;
            case 'recyclable':
                return <FaRecycle className="text-blue-600" />;
            case 'nonRecyclable':
                return <FaTrash className="text-red-600" />;
            case 'all':
            default:
                return <FaCalendarAlt className="text-purple-600" />;
        }
    };

    // Get color class for waste type
    const getWasteTypeColor = (type) => {
        switch (type) {
            case 'organic':
                return 'bg-green-100 text-green-800';
            case 'recyclable':
                return 'bg-blue-100 text-blue-800';
            case 'nonRecyclable':
                return 'bg-red-100 text-red-800';
            case 'all':
            default:
                return 'bg-purple-100 text-purple-800';
        }
    };

    // Calendar tile styling
    const tileClassName = ({ date, view }) => {
        if (view !== 'month') return null;

        // Get schedules for this date
        const schedulesForDate = schedules.filter(
            (schedule) => new Date(schedule.date).toDateString() === date.toDateString()
        );

        if (schedulesForDate.length === 0) return null;

        // Filter by view type
        const relevantSchedules = schedulesForDate.filter((schedule) => {
            if (view === 'upcoming') return !schedule.isPast;
            if (view === 'past') return schedule.isPast;
            return true; // 'all' view
        });

        if (relevantSchedules.length === 0) return null;

        // Filter by waste type if needed
        if (filterType !== 'all-types') {
            const hasFilteredType = relevantSchedules.some(
                (schedule) => schedule.wasteType === filterType
            );

            if (!hasFilteredType) return null;
        }

        // Highlight selected day
        if (selectedDay && date.toDateString() === selectedDay.toDateString()) {
            return 'selected-day';
        }

        // Today's special styling
        if (date.toDateString() === new Date().toDateString()) {
            return 'today-with-event';
        }

        // Past days with completed events
        if (date < new Date() && schedulesForDate.every((s) => s.isCompleted)) {
            return 'completed-day';
        }

        // Past days with some incomplete events
        if (date < new Date() && schedulesForDate.some((s) => !s.isCompleted)) {
            return 'incomplete-day';
        }

        // Future days
        return 'event-day';
    };

    // Calendar tile content
    const tileContent = ({ date, view }) => {
        if (view !== 'month') return null;

        // Get schedules for this date
        const schedulesForDate = schedules.filter(
            (schedule) => new Date(schedule.date).toDateString() === date.toDateString()
        );

        if (schedulesForDate.length === 0) return null;

        // Group schedules by waste type
        const hasOrganic = schedulesForDate.some((s) => s.wasteType === 'organic');
        const hasRecyclable = schedulesForDate.some((s) => s.wasteType === 'recyclable');
        const hasNonRecyclable = schedulesForDate.some((s) => s.wasteType === 'nonRecyclable');
        const hasAll = schedulesForDate.some((s) => s.wasteType === 'all');

        // Filter by current view type
        if (view === 'upcoming' && schedulesForDate.every((s) => s.isPast)) {
            return null;
        }

        if (view === 'past' && schedulesForDate.every((s) => !s.isPast)) {
            return null;
        }

        // Filter by waste type if needed
        if (
            filterType !== 'all-types' &&
            !schedulesForDate.some((s) => s.wasteType === filterType)
        ) {
            return null;
        }

        // Show dots representing types
        return (
            <div className="flex justify-center mt-1 space-x-1">
                {hasOrganic && <div className="h-2 w-2 rounded-full bg-green-500"></div>}
                {hasRecyclable && <div className="h-2 w-2 rounded-full bg-blue-500"></div>}
                {hasNonRecyclable && <div className="h-2 w-2 rounded-full bg-red-500"></div>}
                {hasAll && <div className="h-2 w-2 rounded-full bg-purple-500"></div>}
            </div>
        );
    };

    // Get filtered schedules based on current view and filter settings
    const getFilteredSchedules = () => {
        let filtered = [...schedules];

        // Apply view filter
        switch (view) {
            case 'upcoming':
                filtered = filtered.filter((schedule) => {
                    const scheduleDate = new Date(schedule.date);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return scheduleDate >= today;
                });
                break;
            case 'past':
                filtered = filtered.filter((schedule) => {
                    const scheduleDate = new Date(schedule.date);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return scheduleDate < today;
                });
                break;
            // 'all' view - no filtering needed
        }

        // Apply waste type filter
        if (filterType !== 'all-types') {
            filtered = filtered.filter((schedule) => schedule.wasteType === filterType);
        }

        // Filter by selected day if any
        if (selectedDay) {
            filtered = filtered.filter((schedule) => {
                const scheduleDate = new Date(schedule.date);
                return scheduleDate.toDateString() === selectedDay.toDateString();
            });
        }

        // Sort by date
        return filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    };

    // Get label for waste type
    const getWasteTypeLabel = (type) => {
        switch (type) {
            case 'organic':
                return 'Organic Waste';
            case 'recyclable':
                return 'Recyclable Waste';
            case 'nonRecyclable':
                return 'Non-Recyclable Waste';
            case 'all':
                return 'All Waste Types';
            default:
                return type;
        }
    };

    // Format date nicely
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
        });
    };

    // Get status for a schedule
    const getStatusBadge = (schedule) => {
        const scheduleDate = new Date(schedule.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (scheduleDate < today) {
            if (schedule.isCompleted) {
                return (
                    <span className="px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded-full">
                        Completed
                    </span>
                );
            } else {
                return (
                    <span className="px-2 py-0.5 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                        Missed
                    </span>
                );
            }
        } else if (scheduleDate.toDateString() === today.toDateString()) {
            return (
                <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
                    Today
                </span>
            );
        } else {
            return (
                <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-800 rounded-full">
                    Upcoming
                </span>
            );
        }
    };

    // Handle calendar navigation
    const handleCalendarActiveStartDateChange = ({ activeStartDate }) => {
        // Reset selected day when navigating months
        setSelectedDay(null);
    };

    // Prepare filtered schedules
    const filteredSchedules = getFilteredSchedules();
    const viewTitles = {
        upcoming: 'Upcoming Collections',
        past: 'Past Collections',
        all: 'All Collections',
    };

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header section */}
            <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <FaCalendarAlt className="text-xl text-green-600 mr-2" />
                        <div>
                            <h3 className="text-xl font-semibold">Waste Collection Schedule</h3>
                            {societyName && (
                                <p className="text-sm text-gray-500">for {societyName}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setShowAddForm(!showAddForm)}
                            className="btn-primary"
                        >
                            {showAddForm ? (
                                <FaTimes className="mr-1" />
                            ) : (
                                <FaPlus className="mr-1" />
                            )}
                            {showAddForm ? 'Cancel' : 'Add'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Add form section */}
            {showAddForm && (
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 transition-all duration-300">
                    <h4 className="text-lg font-medium mb-3">Add New Collection</h4>
                    <form
                        onSubmit={handleAddSchedule}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1">
                                Date
                            </label>
                            <input
                                type="date"
                                value={newSchedule.date.toISOString().split('T')[0]}
                                onChange={(e) =>
                                    setNewSchedule({
                                        ...newSchedule,
                                        date: new Date(e.target.value),
                                    })
                                }
                                min={new Date().toISOString().split('T')[0]}
                                className="w-full p-2 border rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1">
                                Waste Type
                            </label>
                            <select
                                value={newSchedule.wasteType}
                                onChange={(e) =>
                                    setNewSchedule({ ...newSchedule, wasteType: e.target.value })
                                }
                                className="w-full p-2 border rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                            >
                                <option value="all">All Waste Types</option>
                                <option value="organic">Organic Waste</option>
                                <option value="recyclable">Recyclable Waste</option>
                                <option value="nonRecyclable">Non-Recyclable Waste</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1">
                                Notes
                            </label>
                            <input
                                type="text"
                                value={newSchedule.notes}
                                onChange={(e) =>
                                    setNewSchedule({ ...newSchedule, notes: e.target.value })
                                }
                                placeholder="Optional notes"
                                className="w-full p-2 border rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                            />
                        </div>
                        <div className="md:col-span-3 flex justify-end">
                            <button type="submit" className="btn-primary">
                                Save Schedule
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* View/filter section */}
            <div className="flex flex-wrap px-6 py-3 bg-gray-50 border-b border-gray-100">
                <div className="inline-flex bg-gray-200 p-1 rounded-lg shadow-sm">
                    <button
                        onClick={() => {
                            setView('upcoming');
                            setSelectedDay(null);
                        }}
                        className={`tag-btn ${view === 'upcoming' ? 'active' : ''}`}
                    >
                        Upcoming
                    </button>
                    <button
                        onClick={() => {
                            setView('past');
                            setSelectedDay(null);
                        }}
                        className={`tag-btn ${view === 'past' ? 'active' : ''}`}
                    >
                        Past
                    </button>
                    <button
                        onClick={() => {
                            setView('all');
                            setSelectedDay(null);
                        }}
                        className={`tag-btn ${view === 'all' ? 'active' : ''}`}
                    >
                        All
                    </button>
                </div>

                <div className="flex items-center ml-auto">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="btn-icon"
                        title="Filter by waste type"
                    >
                        <FaFilter
                            className={
                                filterType !== 'all-types' ? 'text-green-600' : 'text-gray-400'
                            }
                        />
                    </button>

                    {showFilters && (
                        <div className="flex items-center ml-2 space-x-1">
                            <button
                                onClick={() => setFilterType('all-types')}
                                className={`filter-btn ${filterType === 'all-types' ? 'active' : ''}`}
                                title="All types"
                            >
                                <FaCircle />
                            </button>
                            <button
                                onClick={() => setFilterType('organic')}
                                className={`filter-btn ${filterType === 'organic' ? 'active bg-green-100' : ''}`}
                                title="Organic waste"
                            >
                                <FaLeaf />
                            </button>
                            <button
                                onClick={() => setFilterType('recyclable')}
                                className={`filter-btn ${filterType === 'recyclable' ? 'active bg-blue-100' : ''}`}
                                title="Recyclable waste"
                            >
                                <FaRecycle />
                            </button>
                            <button
                                onClick={() => setFilterType('nonRecyclable')}
                                className={`filter-btn ${filterType === 'nonRecyclable' ? 'active bg-red-100' : ''}`}
                                title="Non-recyclable waste"
                            >
                                <FaTrash />
                            </button>
                            <button
                                onClick={() => setFilterType('all')}
                                className={`filter-btn ${filterType === 'all' ? 'active bg-purple-100' : ''}`}
                                title="All waste"
                            >
                                <FaCalendarAlt />
                            </button>
                        </div>
                    )}

                    {selectedDay && (
                        <button
                            onClick={() => setSelectedDay(null)}
                            className="btn-icon ml-2"
                            title="Clear selection"
                        >
                            <FaTimes />
                        </button>
                    )}
                </div>
            </div>

            {/* Main content */}
            <div className="grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
                {/* Calendar column */}
                <div className="p-4 border-r border-gray-100">
                    <Calendar
                        onChange={(value) => {
                            setDate(value);
                            setSelectedDay(value);
                        }}
                        value={date}
                        tileClassName={tileClassName}
                        tileContent={tileContent}
                        className="calendar-custom w-full"
                        onActiveStartDateChange={handleCalendarActiveStartDateChange}
                    />

                    <div className="flex flex-wrap justify-center mt-3 text-xs text-gray-500 gap-2">
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                            <span>Organic</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
                            <span>Recyclable</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-red-500 rounded-full mr-1"></div>
                            <span>Non-Recyclable</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mr-1"></div>
                            <span>All Waste</span>
                        </div>
                    </div>
                </div>

                {/* Schedule list column */}
                <div className="p-4" id="schedules-list">
                    <div className="flex justify-between items-center mb-3">
                        <h4 className="text-lg font-medium">
                            {selectedDay
                                ? `Collections for ${formatDate(selectedDay)}`
                                : viewTitles[view]}
                            <span className="ml-2 text-sm text-gray-500">
                                ({filteredSchedules.length})
                            </span>
                        </h4>
                    </div>

                    {filteredSchedules.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                            <FaCalendarAlt className="text-4xl mb-2 opacity-30" />
                            <p>No collections scheduled</p>
                            <button
                                onClick={() => setShowAddForm(true)}
                                className="mt-4 text-sm text-green-600 hover:text-green-700"
                            >
                                + Add a collection
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                            {filteredSchedules.map((schedule) => (
                                <div
                                    key={schedule.id}
                                    className={`flex items-start p-3 rounded-md transition-all hover:shadow-sm
                                        ${schedule.isHardcoded ? 'bg-gray-50' : 'bg-white border border-gray-100'}
                                        ${schedule.isCompleted ? 'border-l-3 border-green-500' : ''}
                                    `}
                                >
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${getWasteTypeColor(schedule.wasteType)}`}
                                    >
                                        {getWasteTypeIcon(schedule.wasteType)}
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="font-medium">
                                                    {formatDate(schedule.date)}
                                                </p>
                                                <div className="flex items-center mt-1">
                                                    {getStatusBadge(schedule)}
                                                </div>
                                            </div>

                                            <div className="flex space-x-1">
                                                {!schedule.isHardcoded && (
                                                    <button
                                                        onClick={() =>
                                                            handleToggleComplete(schedule.id)
                                                        }
                                                        className={`btn-icon ${schedule.isCompleted ? 'text-green-600' : 'text-gray-400 hover:text-green-600'}`}
                                                        title={
                                                            schedule.isCompleted
                                                                ? 'Mark as incomplete'
                                                                : 'Mark as complete'
                                                        }
                                                    >
                                                        <FaCheck />
                                                    </button>
                                                )}

                                                {!schedule.isHardcoded && (
                                                    <button
                                                        onClick={() =>
                                                            handleDeleteSchedule(schedule.id)
                                                        }
                                                        className="btn-icon text-gray-400 hover:text-red-600"
                                                        title="Delete schedule"
                                                    >
                                                        <FaTimes />
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        <div className="mt-1">
                                            <p className="text-sm font-medium">
                                                {getWasteTypeLabel(schedule.wasteType)}
                                            </p>
                                            {schedule.notes && (
                                                <p className="text-sm text-gray-500 mt-0.5">
                                                    {schedule.notes}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <style jsx="true">{`
                /* Custom button styles */
                .btn-primary {
                    @apply bg-green-600 text-white px-3 py-1.5 rounded-md flex items-center text-sm hover:bg-green-700 transition-colors;
                }

                .tag-btn {
                    @apply px-4 py-2 text-sm font-medium rounded-md transition-all mx-0;
                    min-width: 90px;
                    text-align: center;
                    color: #4B5563;
                    background: transparent;
                    position: relative;
                }

                .tag-btn:hover:not(.active) {
                    background-color: rgba(255, 255, 255, 0.6);
                }

                .tag-btn.active {
                    color: #1F2937;
                    background-color: white;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                    font-weight: 600;
                }

                .tag-btn.active::after {
                    content: '';
                    position: absolute;
                    bottom: -3px;
                    left: 35%;
                    right: 35%;
                    height: 3px;
                    background-color: #10B981;
                    border-radius: 3px;
                }

                .btn-icon {
                    @apply p-1.5 rounded-full hover:bg-gray-100 transition-colors;
                }

                .filter-btn {
                    @apply p-1.5 rounded-full hover:bg-gray-100 transition-colors text-gray-400;
                }

                .filter-btn.active {
                    @apply text-gray-700;
                }

                /* Calendar custom styles */
                .calendar-custom {
                    border: none !important;
                    width: 100%;
                }

                .calendar-custom .react-calendar__navigation {
                    @apply mb-4;
                }

                .calendar-custom .react-calendar__navigation button {
                    @apply text-gray-700 rounded-md min-w-[40px] hover:bg-gray-100;
                }

                .calendar-custom .react-calendar__navigation button:disabled {
                    @apply text-gray-300;
                }

                .calendar-custom .react-calendar__month-view__weekdays {
                    @apply text-gray-500 font-medium;
                }

                .calendar-custom .react-calendar__month-view__weekdays abbr {
                    text-decoration: none;
                }

                .calendar-custom .react-calendar__tile {
                    @apply py-2 rounded-md;
                    height: 3rem;
                }

                .calendar-custom .react-calendar__tile:hover {
                    @apply bg-gray-100;
                }

                .calendar-custom .react-calendar__tile--now {
                    @apply bg-yellow-50 text-yellow-800;
                }

                .calendar-custom .react-calendar__tile--now:hover {
                    @apply bg-yellow-100;
                }

                /* Custom event styling */
                .calendar-custom .event-day {
                    @apply bg-blue-50 text-blue-800 font-medium;
                }

                .calendar-custom .today-with-event {
                    @apply bg-yellow-50 text-yellow-800 font-bold ring-2 ring-yellow-400;
                }

                .calendar-custom .completed-day {
                    @apply bg-green-50 text-green-800;
                }

                .calendar-custom .incomplete-day {
                    @apply bg-red-50 text-red-800;
                }

                .calendar-custom .selected-day {
                    @apply bg-green-100 text-green-800 font-bold ring-2 ring-green-400;
                }

                /* Scrollbar styling for schedule list */
                .custom-scrollbar {
                    scrollbar-width: thin;
                    scrollbar-color: rgba(156, 163, 175, 0.5) rgba(229, 231, 235, 0.5);
                }

                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                    height: 8px;
                }

                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(229, 231, 235, 0.5);
                    border-radius: 10px;
                }

                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: rgba(156, 163, 175, 0.5);
                    border-radius: 10px;
                    border: 2px solid rgba(229, 231, 235, 0.5);
                }

                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background-color: rgba(107, 114, 128, 0.7);
                }

                /* Border width utility */
                .border-l-3 {
                    border-left-width: 3px;
                }
            `}</style>
        </div>
    );
};

export default ScheduleCalendar;
