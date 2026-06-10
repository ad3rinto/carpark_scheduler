// Car Park Scheduler Application
// Fair allocation of 2 parking spots among 4 colleagues

const COLLEAGUES = ['Ronnie', 'Ade', 'Rebecca', 'Joe'];
const PARKING_SPOTS = {
    'CP348': [0, 1, 3, 4], // Mon, Tue, Thu, Fri (0=Mon, 1=Tue, 2=Wed, 3=Thu, 4=Fri)
    'CP435': [1, 4]        // Tue, Fri only
};

const DAY_NAMES = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

// State
let currentState = {
    selectedUser: null,
    holidays: {}, // { 'Ronnie': [{start, end}, ...] }
    currentWeekStart: getMonday(new Date()),
    allocations: {} // { 'YYYY-MM-DD': { CP348: 'Name', CP435: 'Name' } }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    initializeDateInputs();
    renderSchedule();
    renderStats();
});

function getMonday(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
}

function formatDate(date) {
    return date.toISOString().split('T')[0];
}

function parseDate(dateStr) {
    return new Date(dateStr + 'T00:00:00');
}

function initializeDateInputs() {
    const today = new Date();
    const minDate = formatDate(today);
    document.getElementById('holidayStart').min = minDate;
    document.getElementById('holidayEnd').min = minDate;
}

function selectUser(user) {
    currentState.selectedUser = user;
    
    // Update UI
    document.querySelectorAll('.user-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.user === user) {
            btn.classList.add('active');
        }
    });
    
    document.getElementById('selectedUser').textContent = `Managing holidays for: ${user}`;
    document.getElementById('holidaySection').style.display = 'block';
    
    renderHolidayList();
}

function addHoliday() {
    const startInput = document.getElementById('holidayStart');
    const endInput = document.getElementById('holidayEnd');
    const user = currentState.selectedUser;
    
    if (!user) {
        alert('Please select your name first');
        return;
    }
    
    const startDate = startInput.value;
    const endDate = endInput.value;
    
    if (!startDate || !endDate) {
        alert('Please select both start and end dates');
        return;
    }
    
    if (new Date(startDate) > new Date(endDate)) {
        alert('End date must be after start date');
        return;
    }
    
    if (!currentState.holidays[user]) {
        currentState.holidays[user] = [];
    }
    
    currentState.holidays[user].push({ start: startDate, end: endDate });
    
    saveData();
    renderHolidayList();
    renderSchedule();
    renderStats();
    
    startInput.value = '';
    endInput.value = '';
}

function removeHoliday(index) {
    const user = currentState.selectedUser;
    if (user && currentState.holidays[user]) {
        currentState.holidays[user].splice(index, 1);
        saveData();
        renderHolidayList();
        renderSchedule();
        renderStats();
    }
}

function renderHolidayList() {
    const user = currentState.selectedUser;
    const list = document.getElementById('holidayDates');
    
    if (!user || !currentState.holidays[user] || currentState.holidays[user].length === 0) {
        list.innerHTML = '<li>No holidays added</li>';
        return;
    }
    
    list.innerHTML = currentState.holidays[user].map((holiday, index) => `
        <li>
            ${formatDateDisplay(holiday.start)} to ${formatDateDisplay(holiday.end)}
            <button class="btn-remove" onclick="removeHoliday(${index})">✕</button>
        </li>
    `).join('');
}

function formatDateDisplay(dateStr) {
    const date = parseDate(dateStr);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function isOnHoliday(user, date) {
    if (!currentState.holidays[user]) return false;
    
    const dateStr = formatDate(date);
    return currentState.holidays[user].some(holiday => {
        return dateStr >= holiday.start && dateStr <= holiday.end;
    });
}

function generateAllocations(weekStart) {
    const allocations = {};
    const colleagueSlots = {};
    COLLEAGUES.forEach(c => colleagueSlots[c] = 0);
    
    // Generate for 7 days starting from weekStart
    for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
        const currentDate = new Date(weekStart);
        currentDate.setDate(currentDate.getDate() + dayOffset);
        const dateStr = formatDate(currentDate);
        const dayOfWeek = currentDate.getDay();
        
        // Skip weekends (0=Sunday, 6=Saturday)
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            continue;
        }
        
        allocations[dateStr] = {};
        
        // Allocate each parking spot
        for (const [spot, availableDays] of Object.entries(PARKING_SPOTS)) {
            const jsDay = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Convert to 0=Mon format
            
            if (availableDays.includes(jsDay)) {
                // Find available colleagues (not on holiday)
                const availableColleagues = COLLEAGUES.filter(c => !isOnHoliday(c, currentDate));
                
                if (availableColleagues.length > 0) {
                    // Sort by number of slots (fairest allocation)
                    availableColleagues.sort((a, b) => {
                        return colleagueSlots[a] - colleagueSlots[b];
                    });
                    
                    const assigned = availableColleagues[0];
                    allocations[dateStr][spot] = assigned;
                    colleagueSlots[assigned]++;
                } else {
                    allocations[dateStr][spot] = 'No one available';
                }
            }
        }
    }
    
    return allocations;
}

function renderSchedule() {
    const grid = document.getElementById('scheduleGrid');
    const weekLabel = document.getElementById('currentWeekLabel');
    
    const weekEnd = new Date(currentState.currentWeekStart);
    weekEnd.setDate(weekEnd.getDate() + 4);
    
    weekLabel.textContent = `${formatDateDisplay(formatDate(currentState.currentWeekStart))} - ${formatDateDisplay(formatDate(weekEnd))}`;
    
    const allocations = generateAllocations(currentState.currentWeekStart);
    currentState.allocations = allocations;
    
    let html = '<table class="schedule-table"><thead><tr><th>Day</th><th>Date</th><th>CP348</th><th>CP435</th></tr></thead><tbody>';
    
    for (let dayOffset = 0; dayOffset < 5; dayOffset++) {
        const currentDate = new Date(currentState.currentWeekStart);
        currentDate.setDate(currentDate.getDate() + dayOffset);
        const dateStr = formatDate(currentDate);
        const dayName = DAY_NAMES[dayOffset];
        
        const alloc = allocations[dateStr] || {};
        const cp348 = alloc['CP348'] || '-';
        const cp435 = alloc['CP435'] || '-';
        
        const isToday = formatDate(new Date()) === dateStr;
        const todayClass = isToday ? 'today' : '';
        
        html += `<tr class="${todayClass}">
            <td>${dayName}</td>
            <td>${formatDateDisplay(dateStr)}</td>
            <td class="allocation ${cp348 !== '-' ? 'allocated' : ''}">${cp348}</td>
            <td class="allocation ${cp435 !== '-' ? 'allocated' : ''}">${cp435}</td>
        </tr>`;
    }
    
    html += '</tbody></table>';
    grid.innerHTML = html;
}

function previousWeek() {
    currentState.currentWeekStart.setDate(currentState.currentWeekStart.getDate() - 7);
    renderSchedule();
}

function nextWeek() {
    currentState.currentWeekStart.setDate(currentState.currentWeekStart.getDate() + 7);
    renderSchedule();
}

function renderStats() {
    const statsGrid = document.getElementById('statsGrid');
    
    // Calculate stats for all time (or last 4 weeks)
    const stats = {};
    COLLEAGUES.forEach(c => stats[c] = { cp348: 0, cp435: 0, total: 0 });
    
    // Look at next 4 weeks for planning
    const startDate = new Date();
    for (let week = 0; week < 4; week++) {
        const weekStart = new Date(startDate);
        weekStart.setDate(weekStart.getDate() + (week * 7) - weekStart.getDay() + 1);
        
        const allocations = generateAllocations(weekStart);
        
        for (const [dateStr, dayAlloc] of Object.entries(allocations)) {
            for (const [spot, person] of Object.entries(dayAlloc)) {
                if (person !== 'No one available' && stats[person]) {
                    stats[person][spot.toLowerCase()]++;
                    stats[person].total++;
                }
            }
        }
    }
    
    const maxSlots = Math.max(...COLLEAGUES.map(c => stats[c].total));
    
    let html = '<table class="stats-table"><thead><tr><th>Colleague</th><th>CP348</th><th>CP435</th><th>Total</th><th>Fairness</th></tr></thead><tbody>';
    
    COLLEAGUES.forEach(colleague => {
        const s = stats[colleague];
        const fairnessBar = maxSlots > 0 
            ? `<div class="fairness-bar"><div style="width: ${(s.total / maxSlots) * 100}%"></div></div>`
            : '<div class="fairness-bar"><div style="width: 0%"></div></div>';
        
        html += `<tr>
            <td class="name">${colleague}</td>
            <td>${s.cp348}</td>
            <td>${s.cp435}</td>
            <td><strong>${s.total}</strong></td>
            <td>${fairnessBar}</td>
        </tr>`;
    });
    
    html += '</tbody></table>';
    statsGrid.innerHTML = html;
}

function regenerateSchedule() {
    // Shuffle colleagues array for fair rotation
    for (let i = COLLEAGUES.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [COLLEAGUES[i], COLLEAGUES[j]] = [COLLEAGUES[j], COLLEAGUES[i]];
    }
    
    renderSchedule();
    renderStats();
    saveData();
}

function clearHolidays() {
    if (confirm('Are you sure you want to clear all holidays?')) {
        currentState.holidays = {};
        saveData();
        renderHolidayList();
        renderSchedule();
        renderStats();
    }
}

function saveData() {
    localStorage.setItem('carParkScheduler', JSON.stringify(currentState));
}

function loadData() {
    const saved = localStorage.getItem('carParkScheduler');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            currentState = { ...currentState, ...parsed };
            
            if (currentState.selectedUser) {
                document.getElementById('selectedUser').textContent = `Managing holidays for: ${currentState.selectedUser}`;
                document.getElementById('holidaySection').style.display = 'block';
                
                document.querySelectorAll('.user-btn').forEach(btn => {
                    btn.classList.remove('active');
                    if (btn.dataset.user === currentState.selectedUser) {
                        btn.classList.add('active');
                    }
                });
                
                renderHolidayList();
            }
        } catch (e) {
            console.error('Error loading saved data:', e);
        }
    }
}
