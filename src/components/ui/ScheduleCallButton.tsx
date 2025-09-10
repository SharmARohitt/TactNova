import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Phone, ArrowRight, X, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';

// Form validation schema
const scheduleFormSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  company: yup.string().required('Company is required'),
  service: yup.string().required('Please select a service'),
  selectedDate: yup.string().required('Please select a date'),
  selectedTime: yup.string().required('Please select a time'),
});

type FormData = yup.InferType<typeof scheduleFormSchema>;

// Generate available time slots with more realistic availability
const generateTimeSlots = () => {
  const slots = [];
  const busyTimes = ['09:00', '13:00', '15:30']; // Some busy slots for realism
  
  for (let hour = 9; hour <= 17; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      if (hour === 17 && minute > 0) break; // Stop at 5:00 PM
      const time24 = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      const hour12 = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const time12 = `${hour12}:${minute.toString().padStart(2, '0')} ${ampm}`;
      
      slots.push({
        value: time24,
        label: time12,
        available: !busyTimes.includes(time24) && Math.random() > 0.2 // 80% chance of being available
      });
    }
  }
  return slots;
};

const timeSlots = generateTimeSlots();

const services = [
  'AI Development',
  'Web Development',
  'Production',
  'Other'
];

// Calendar component
const CalendarPicker: React.FC<{
  selectedDate: string;
  onDateSelect: (date: string) => void;
}> = ({ selectedDate, onDateSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const today = new Date();
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstDayWeekday = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const previousMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };
  
  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };
  
  const isDateDisabled = (date: Date) => {
    const day = date.getDay();
    return date < today || day === 0 || day === 6; // Disable past dates and weekends
  };
  
  const formatDateString = (date: Date) => {
    return date.toISOString().split('T')[0];
  };
  
  // Generate calendar days
  const calendarDays = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayWeekday; i++) {
    calendarDays.push(null);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(new Date(year, month, day));
  }

  return (
    <div className="bg-neutral-800/30 rounded-lg p-4">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={previousMonth}
          className="p-2 hover:bg-neutral-700 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-4 h-4 text-neutral-400" />
        </button>
        <h3 className="text-lg font-semibold text-white">
          {monthNames[month]} {year}
        </h3>
        <button
          type="button"
          onClick={nextMonth}
          className="p-2 hover:bg-neutral-700 rounded-lg transition-colors"
        >
          <ChevronRight className="w-4 h-4 text-neutral-400" />
        </button>
      </div>
      
      {/* Day names */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div key={day} className="text-center text-xs font-medium text-neutral-500 py-2">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((date, index) => {
          if (!date) {
            return <div key={index} className="aspect-square" />;
          }
          
          const dateString = formatDateString(date);
          const isSelected = dateString === selectedDate;
          const isDisabled = isDateDisabled(date);
          const isToday = dateString === formatDateString(today);
          
          return (
            <motion.button
              key={dateString}
              type="button"
              onClick={() => !isDisabled && onDateSelect(dateString)}
              disabled={isDisabled}
              className={`aspect-square flex items-center justify-center text-sm rounded-lg transition-all duration-200 ${
                isSelected
                  ? 'bg-blue-500 text-white font-semibold'
                  : isDisabled
                  ? 'text-neutral-600 cursor-not-allowed'
                  : isToday
                  ? 'bg-neutral-700 text-blue-400 hover:bg-blue-500/20'
                  : 'text-neutral-300 hover:bg-neutral-700'
              }`}
              whileHover={!isDisabled ? { scale: 1.05 } : {}}
              whileTap={!isDisabled ? { scale: 0.95 } : {}}
            >
              {date.getDate()}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export const ScheduleCallButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSliding, setIsSliding] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue
  } = useForm<FormData>({
    resolver: yupResolver(scheduleFormSchema)
  });

  const handleButtonClick = () => {
    setIsSliding(true);
    setTimeout(() => {
      setIsModalOpen(true);
      setIsSliding(false);
    }, 300);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    reset();
    setSelectedDate('');
    setSelectedTime('');
  };

  const onSubmit = async (data: FormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would integrate with Calendly or Google Calendar API
      console.log('Form submitted:', { ...data, selectedDate, selectedTime });
      
      toast.success('Your call has been scheduled!', {
        duration: 4000,
        style: {
          background: '#1f2937',
          color: '#fff',
          border: '1px solid #374151'
        }
      });
      
      handleCloseModal();
    } catch (error) {
      toast.error('Failed to schedule call. Please try again.', {
        style: {
          background: '#1f2937',
          color: '#fff',
          border: '1px solid #374151'
        }
      });
    }
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setValue('selectedDate', date);
    // Reset time when date changes
    setSelectedTime('');
    setValue('selectedTime', '');
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setValue('selectedTime', time);
  };

  return (
    <>
      {/* Schedule Call Button */}
      <motion.div
        className="relative"
        animate={isSliding ? { x: 100, opacity: 0 } : { x: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <motion.button
          onClick={handleButtonClick}
          className="group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-blue-500/25 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-30"
            initial={false}
            animate={{ opacity: 0 }}
            whileHover={{ opacity: 0.3 }}
          />
          
          {/* Button content */}
          <div className="relative flex items-center space-x-2">
            <Phone className="w-4 h-4" />
            <span>Schedule a Call</span>
            <motion.div
              className="overflow-hidden"
              initial={{ width: 0 }}
              whileHover={{ width: 16 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </div>

          {/* Sliding shimmer effect */}
          <motion.div
            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ translateX: ['100%', '100%', '-100%'] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "linear"
            }}
          />
        </motion.button>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
            />

            {/* Modal Content */}
            <motion.div
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-neutral-900/90 backdrop-blur-xl border border-neutral-700/50 rounded-2xl shadow-2xl"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-neutral-700/50">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Schedule a Call</h2>
                    <p className="text-sm text-neutral-400">Book a consultation with our team</p>
                  </div>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="p-6">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left Column - Form Fields */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Your Information</h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-2">
                        Full Name *
                      </label>
                      <Input
                        {...register('name')}
                        placeholder="Enter your full name"
                        error={errors.name?.message}
                        className="bg-neutral-800/50 border-neutral-600 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-2">
                        Email Address *
                      </label>
                      <Input
                        {...register('email')}
                        type="email"
                        placeholder="Enter your email"
                        error={errors.email?.message}
                        className="bg-neutral-800/50 border-neutral-600 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-2">
                        Company *
                      </label>
                      <Input
                        {...register('company')}
                        placeholder="Enter your company name"
                        error={errors.company?.message}
                        className="bg-neutral-800/50 border-neutral-600 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-2">
                        Service Required *
                      </label>
                      <select
                        {...register('service')}
                        className="w-full px-3 py-2 bg-neutral-800/50 border border-neutral-600 rounded-lg text-white focus:border-blue-500 focus:outline-none transition-colors"
                      >
                        <option value="">Select a service</option>
                        {services.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                      {errors.service && (
                        <p className="mt-1 text-sm text-red-400">{errors.service.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Right Column - Calendar & Time Picker */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <Calendar className="w-5 h-5 mr-2" />
                      Select Date & Time
                    </h3>
                    
                    {/* Date Picker */}
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-neutral-300">
                        Choose Date *
                      </label>
                      <CalendarPicker
                        selectedDate={selectedDate}
                        onDateSelect={handleDateSelect}
                      />
                      {errors.selectedDate && (
                        <p className="text-sm text-red-400">{errors.selectedDate.message}</p>
                      )}
                    </div>

                    {/* Time Picker */}
                    {selectedDate && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-3"
                      >
                        <label className="block text-sm font-medium text-neutral-300 flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          Choose Time *
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto bg-neutral-800/30 rounded-lg p-3">
                          {timeSlots.map((slot) => (
                            <motion.button
                              key={slot.value}
                              type="button"
                              onClick={() => slot.available && handleTimeSelect(slot.value)}
                              disabled={!slot.available}
                              className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm font-medium ${
                                selectedTime === slot.value
                                  ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                                  : slot.available
                                  ? 'border-neutral-600 bg-neutral-800/50 text-neutral-300 hover:border-blue-500/50 hover:bg-blue-500/5'
                                  : 'border-neutral-700 bg-neutral-800/20 text-neutral-500 cursor-not-allowed'
                              }`}
                              whileHover={slot.available ? { scale: 1.02 } : {}}
                              whileTap={slot.available ? { scale: 0.98 } : {}}
                            >
                              <div className="flex flex-col items-center space-y-1">
                                <span>{slot.label}</span>
                                {!slot.available && (
                                  <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded">
                                    Booked
                                  </span>
                                )}
                              </div>
                            </motion.button>
                          ))}
                        </div>
                        {errors.selectedTime && (
                          <p className="text-sm text-red-400">{errors.selectedTime.message}</p>
                        )}
                      </motion.div>
                    )}

                    {/* Selected Date & Time Summary */}
                    {selectedDate && selectedTime && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-4"
                      >
                        <h4 className="text-sm font-semibold text-blue-400 mb-2">Selected Appointment</h4>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-neutral-300">
                            <Calendar className="w-4 h-4 mr-2 text-blue-400" />
                            {new Date(selectedDate).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </div>
                          <div className="flex items-center text-sm text-neutral-300">
                            <Clock className="w-4 h-4 mr-2 text-blue-400" />
                            {timeSlots.find(slot => slot.value === selectedTime)?.label}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="mt-8 pt-6 border-t border-neutral-700/50">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Scheduling...</span>
                      </div>
                    ) : (
                      'Schedule Call'
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
