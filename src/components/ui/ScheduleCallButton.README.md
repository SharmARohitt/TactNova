# Advanced Schedule Call Button Component

## Overview
A modern, interactive "Schedule a Call" button component built with React, TypeScript, TailwindCSS, and Framer Motion. This component provides a seamless user experience for booking consultations with advanced calendar and time picker functionality.

## Features

### 🎨 Visual Design
- **Rounded pill shape** with gradient background (blue to purple)
- **Smooth hover effects** with glowing blue neon light
- **Sliding door animation** - button slides right when clicked
- **Glassmorphism modal** with backdrop blur effects
- **Responsive design** that works on all device sizes

### 🎭 Animations
- **Framer Motion** powered animations throughout
- **Sliding button** animation with smooth transitions
- **Modal fade-in** and scale-up effects
- **Shimmer effect** on the button
- **Hover animations** on interactive elements
- **Micro-interactions** for better user feedback

### 📅 Advanced Calendar System
- **Interactive calendar picker** with month navigation
- **Date selection** with visual feedback
- **Weekend and past date blocking** (only business days available)
- **Today highlighting** with special styling
- **Smooth month transitions** with ChevronLeft/Right controls

### ⏰ Smart Time Picker
- **Business hours** time slots (9:00 AM - 5:00 PM)
- **30-minute intervals** for optimal scheduling
- **Real-time availability** status (available/booked)
- **Realistic booking patterns** (some slots pre-booked)
- **Visual time slot grid** with hover effects
- **Selected time highlighting**

### 📋 Form Management
- **React Hook Form** integration with Yup validation
- **Required field validation** for all form inputs
- **Email format validation**
- **Real-time error feedback**
- **Form state management** with auto-reset on close

### 🔄 User Experience Flow
1. **Hover Effect** → Button glows with blue neon light
2. **Click Animation** → Button slides right like opening a door
3. **Modal Appears** → Full-screen glassmorphism modal with fade-in
4. **Form Interaction** → User fills details and selects date/time
5. **Appointment Summary** → Shows selected date and time with icons
6. **Submission** → Loading state with confirmation toast
7. **Success Feedback** → "Your call has been scheduled!" message

## Component Structure

```
ScheduleCallButton/
├── Main Button Component
│   ├── Gradient pill design
│   ├── Hover glow effects
│   ├── Sliding animation
│   └── Shimmer effects
├── Modal System
│   ├── Glassmorphism backdrop
│   ├── Form sections
│   └── Close functionality
├── Calendar Picker
│   ├── Month navigation
│   ├── Date grid
│   ├── Availability logic
│   └── Selection state
├── Time Picker
│   ├── Business hours slots
│   ├── Availability status
│   ├── Selection interface
│   └── Visual feedback
└── Form Management
    ├── Validation schema
    ├── Error handling
    ├── Submission logic
    └── Success feedback
```

## Form Fields

### Required Information
- **Full Name** - Client's complete name
- **Email Address** - Contact email with validation
- **Company** - Company or organization name
- **Service Required** - Dropdown with options:
  - AI Development
  - Web Development
  - Production
  - Other

### Date & Time Selection
- **Date Picker** - Interactive calendar (business days only)
- **Time Picker** - Available time slots in 30-minute intervals
- **Appointment Summary** - Visual confirmation of selection

## Technical Implementation

### Dependencies
```json
{
  "react": "^19.1.0",
  "react-hook-form": "^7.58.1",
  "@hookform/resolvers": "^5.1.1",
  "yup": "^1.6.1",
  "framer-motion": "^12.19.1",
  "lucide-react": "^0.523.0",
  "react-hot-toast": "^2.5.2"
}
```

### Integration
```tsx
import { ScheduleCallButton } from './components/ui/ScheduleCallButton';

// Usage in Navigation or any component
<ScheduleCallButton />
```

### API Integration Points
The component is ready for integration with:
- **Calendly API** - For real calendar syncing
- **Google Calendar API** - For Google Workspace integration
- **Custom booking systems** - Via form submission handler
- **CRM systems** - For lead management

## Customization Options

### Styling
- Gradient colors can be customized via TailwindCSS classes
- Glow effects adjustable through CSS custom properties
- Animation timings configurable via Framer Motion props

### Business Logic
- Time slots can be fetched from API
- Availability rules can be customized
- Form fields can be modified or extended
- Validation schema is easily adjustable

### Responsive Behavior
- Mobile-first design approach
- Touch-friendly interactions
- Optimized modal sizing for all screens
- Accessible keyboard navigation

## Performance Features
- **Lazy loading** of time slots
- **Optimized re-renders** with React.memo patterns
- **Efficient state management** with minimal re-renders
- **Smooth animations** with hardware acceleration

## Accessibility
- **ARIA labels** for screen readers
- **Keyboard navigation** support
- **Focus management** within modal
- **Color contrast** compliance
- **Screen reader** friendly announcements

## Future Enhancements
- [ ] Timezone selection support
- [ ] Recurring appointment options
- [ ] Integration with popular calendar apps
- [ ] Video call link generation
- [ ] Automated reminder emails
- [ ] Multi-language support
- [ ] Custom branding options

## Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Built with modern web standards and optimized for performance across all major browsers.
