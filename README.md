# Car Park Scheduler

A fair, web-based parking space allocation system for teams sharing limited parking spots.

## 🚗 Overview

This application manages the allocation of two car park spots (CP348 and CP435) among four colleagues (Ronnie, Ade, Rebecca, Joe) across a 5-day working week. It ensures fair distribution while allowing users to mark holidays, automatically reallocating their slots to others.

### Parking Spot Availability
- **CP348**: Available Monday, Tuesday, Thursday, Friday (❌ Not available Wednesdays)
- **CP435**: Available Tuesday, Friday only

## ✨ Features

- **Fair Allocation Algorithm**: Prioritizes colleagues with fewer allocated slots to ensure equitable distribution over time
- **Holiday Management**: Users can mark holiday periods, making their slots available to others
- **Weekly View**: Navigate between weeks to see current and future allocations
- **Statistics Dashboard**: Visual representation of allocation counts per person
- **Persistent Storage**: All data is saved locally in your browser (no server required)
- **Responsive Design**: Works on desktop and mobile devices

## 🚀 How to Use

### Quick Start
1. Open `index.html` in any modern web browser (Chrome, Firefox, Safari, Edge)
2. No installation or server setup required!

### Managing Holidays
1. Select your name from the dropdown menu at the top
2. Click "Add Holiday"
3. Choose your holiday start and end dates
4. Click "Save Holiday"
5. Your allocated slots during this period will be automatically reassigned

### Removing Holidays
1. Select your name from the dropdown
2. Find your holiday in the "Your Holidays" list
3. Click the ❌ button next to the date range

### Viewing the Schedule
- Use the **← Previous Week** and **Next Week →** buttons to navigate
- Each spot shows:
  - 🟢 Allocated to a colleague
  - ⚪ Available (no allocation yet)
  - 🏢 Closed (spot not available that day)
  - 🔄 Reallocated (originally assigned to someone on holiday)

### Understanding Statistics
The stats panel shows:
- Total slots allocated to each person
- Visual bar chart comparing allocations
- Helps identify if the distribution is fair

## 🛠️ Technical Details

### Files Structure
```
car-park-scheduler/
├── index.html      # Main HTML structure
├── styles.css      # Styling and responsive design
├── script.js       # Application logic and algorithms
└── README.md       # This file
```

### How the Fair Allocation Works
1. The system tracks how many slots each person has received
2. When allocating a new slot, it prioritizes people with fewer allocations
3. If someone marks a holiday, their slots are freed and reallocated using the same fairness logic
4. The algorithm respects spot availability constraints (e.g., CP435 only on Tue/Fri)

### Data Storage
- All data is stored in your browser's `localStorage`
- Data persists between sessions but is local to your device
- To reset everything: Clear your browser's local storage for this page

### Browser Compatibility
Works on all modern browsers:
- Chrome/Edge (v80+)
- Firefox (v75+)
- Safari (v13+)

## 🎯 Example Scenario

**Week 1:**
- Ronnie gets CP348 on Monday
- Ade gets CP435 on Tuesday
- Rebecca gets CP348 on Thursday
- Joe gets CP435 on Friday

**If Ronnie goes on holiday next week:**
- Ronnie's Monday slot becomes available
- The system automatically assigns it to whoever has the fewest slots
- Everyone else gets a fair chance at the extra space

## 📝 Notes

- The scheduler allocates slots one week at a time
- Holidays can span multiple weeks and will affect all covered days
- Weekends are not included (Monday-Friday only)
- The fairness algorithm resets only if you clear your browser storage

## 🤝 Contributing

To modify or extend this application:
1. Edit the respective files (`index.html`, `styles.css`, `script.js`)
2. Test changes by refreshing your browser
3. Consider adding features like:
   - Export schedule to CSV/Calendar
   - Email notifications
   - Multi-user sync via backend

## 📄 License

Free to use and modify for personal and commercial purposes.

---

**Created with ❤️ for fair parking allocation**
