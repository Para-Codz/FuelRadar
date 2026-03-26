const currentUser = JSON.parse(localStorage.getItem('currentUser')) || { name: 'Guest' };

if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
}

// FuelRadar Admin Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('🔐 FuelRadar Admin Dashboard Loaded');

    // Initialize all features
    initSidebar();
    initNavigation();
    initCharts();
    initTables();
    initModals();
    loadRecentActivity();
    
    // Auto-refresh data every 30 seconds
    setInterval(refreshDashboardData, 30000);
});

// ==================== SIDEBAR ====================
function initSidebar() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 1024) {
                if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                    sidebar.classList.remove('active');
                }
            }
        });
    }

    // Logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
const logoutModal = document.getElementById('logoutModal');
const closeLogoutModal = document.getElementById('closeLogoutModal');
const cancelLogout = document.getElementById('cancelLogout');
const confirmLogout = document.getElementById('confirmLogout');
const loader = document.getElementById('loader');

// OPEN MODAL
logoutBtn.addEventListener('click', () => {
    logoutModal.classList.add('show');
});

// CLOSE MODAL
closeLogoutModal.addEventListener('click', () => {
    logoutModal.classList.remove('show');
});

cancelLogout.addEventListener('click', () => {
    logoutModal.classList.remove('show');
});

// // CONFIRM LOGOUT
// confirmLogout.addEventListener('click', () => {
//     logoutModal.classList.remove('show');

//     loader.style.display = "block"; // show loader

//     setTimeout(() => {
//         localStorage.removeItem("loggedIn");
//         localStorage.removeItem("currentUser");

//         window.location.href = "login.html";
//     }, 1500);
// });
}

// ==================== NAVIGATION ====================
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');
    const pageTitle = document.getElementById('pageTitle');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            // Add active class to clicked link
            this.classList.add('active');

            // Show corresponding section
            const sectionId = this.getAttribute('data-section');
            const targetSection = document.getElementById(sectionId);
            
            if (targetSection) {
                targetSection.classList.add('active');
                
                // Update page title
                const titles = {
                    'overview': 'Overview Dashboard',
                    'users': 'User Management',
                    'prices': 'Price Update Moderation',
                    'stations': 'Station Management',
                    'reports': 'User Reports & Flags',
                    'analytics': 'Analytics & Insights',
                    'settings': 'System Settings'
                };
                pageTitle.textContent = titles[sectionId] || 'Dashboard';
            }

            // Close sidebar on mobile
            if (window.innerWidth <= 1024) {
                document.getElementById('sidebar').classList.remove('active');
            }
        });
    });
}

// ==================== CHARTS ====================
function initCharts() {
    // User Growth Chart
    const userGrowthCtx = document.getElementById('userGrowthChart');
    if (userGrowthCtx) {
        new Chart(userGrowthCtx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'New Users',
                    data: [120, 190, 150, 220, 180, 240, 280],
                    borderColor: '#f97316',
                    backgroundColor: 'rgba(249, 115, 22, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Price Distribution Chart
    const priceDistributionCtx = document.getElementById('priceDistributionChart');
    if (priceDistributionCtx) {
        new Chart(priceDistributionCtx, {
            type: 'doughnut',
            data: {
                labels: ['₦620-640', '₦640-660', '₦660-680', '₦680+'],
                datasets: [{
                    data: [320, 450, 180, 142],
                    backgroundColor: [
                        '#10b981',
                        '#f59e0b',
                        '#f97316',
                        '#dc2626'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    // Engagement Chart
    const engagementCtx = document.getElementById('engagementChart');
    if (engagementCtx) {
        new Chart(engagementCtx, {
            type: 'bar',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [{
                    label: 'Price Updates',
                    data: [2400, 2800, 3200, 3600],
                    backgroundColor: '#f97316'
                }, {
                    label: 'Tips Given',
                    data: [1800, 2100, 2400, 2700],
                    backgroundColor: '#3b82f6'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Cities Chart
    const citiesCtx = document.getElementById('citiesChart');
    if (citiesCtx) {
        new Chart(citiesCtx, {
            type: 'pie',
            data: {
                labels: ['Lagos', 'Abuja', 'Port Harcourt', 'Ibadan', 'Others'],
                datasets: [{
                    data: [45, 20, 15, 10, 10],
                    backgroundColor: [
                        '#f97316',
                        '#3b82f6',
                        '#10b981',
                        '#a855f7',
                        '#6b7280'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    // Update Types Chart
    const updateTypesCtx = document.getElementById('updateTypesChart');
    if (updateTypesCtx) {
        new Chart(updateTypesCtx, {
            type: 'bar',
            data: {
                labels: ['PMS', 'AGO', 'DPK'],
                datasets: [{
                    label: 'Updates',
                    data: [5200, 1800, 600],
                    backgroundColor: ['#f97316', '#3b82f6', '#10b981']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

// ==================== TABLES ====================
function initTables() {
    loadUsersTable();
    loadPricesTable();
    loadStationsGrid();
    loadReportsList();
}

function loadUsersTable() {
    const tbody = document.getElementById('usersTableBody');
    if (!tbody) return;

    const users = [
        { name: 'Chukwudi Okafor', email: 'chukwudi@email.com', updates: 47, tips: 3450, status: 'active' },
        { name: 'Amaka Nwosu', email: 'amaka@email.com', updates: 32, tips: 2180, status: 'active' },
        { name: 'Tunde Adebayo', email: 'tunde@email.com', updates: 28, tips: 1920, status: 'active' },
        { name: 'Ngozi Eze', email: 'ngozi@email.com', updates: 19, tips: 1250, status: 'inactive' },
        { name: 'Ibrahim Musa', email: 'ibrahim@email.com', updates: 15, tips: 890, status: 'active' }
    ];

    tbody.innerHTML = users.map(user => `
        <tr>
            <td>
                <div class="user-cell">
                    <div class="user-avatar">${user.name.charAt(0)}</div>
                    <div class="user-info">
                        <h4>${user.name}</h4>
                        <p>${user.email}</p>
                    </div>
                </div>
            </td>
            <td>${user.email}</td>
            <td>${user.updates}</td>
            <td>₦${user.tips.toLocaleString()}</td>
            <td><span class="status-badge ${user.status}">${user.status}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn view" onclick="viewUser('${user.name}')">View</button>
                    <button class="action-btn edit">Edit</button>
                    <button class="action-btn delete">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');

    // User search functionality
    const userSearch = document.getElementById('userSearch');
    if (userSearch) {
        userSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const rows = tbody.querySelectorAll('tr');
            
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        });
    }
}

function loadPricesTable() {
    const tbody = document.getElementById('pricesTableBody');
    if (!tbody) return;

    const prices = [
        { station: 'Total Energies - Lekki', price: 640, user: 'Chukwudi O.', time: '2 hours ago', status: 'approved' },
        { station: 'NNPC Mega Station', price: 635, user: 'Amaka N.', time: '3 hours ago', status: 'approved' },
        { station: 'Mobil - Ikeja', price: 645, user: 'Tunde A.', time: '5 hours ago', status: 'pending' },
        { station: 'Conoil - VI', price: 680, user: 'Ngozi E.', time: '1 day ago', status: 'flagged' },
        { station: 'Oando - Surulere', price: 638, user: 'Ibrahim M.', time: '1 day ago', status: 'approved' }
    ];

    tbody.innerHTML = prices.map(price => `
        <tr>
            <td>${price.station}</td>
            <td><strong>₦${price.price}/L</strong></td>
            <td>${price.user}</td>
            <td>${price.time}</td>
            <td><span class="status-badge ${price.status}">${price.status}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-success btn-small">Approve</button>
                    <button class="btn btn-danger btn-small">Reject</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function loadStationsGrid() {
    const grid = document.getElementById('stationsGrid');
    if (!grid) return;

    const stations = [
        { name: 'Total Energies', location: 'Lekki, Lagos', updates: 47, avgPrice: 640 },
        { name: 'NNPC Mega Station', location: 'Victoria Island', updates: 32, avgPrice: 635 },
        { name: 'Mobil', location: 'Ikeja, Lagos', updates: 28, avgPrice: 645 },
        { name: 'Conoil', location: 'Surulere, Lagos', updates: 19, avgPrice: 642 },
        { name: 'Oando', location: 'Yaba, Lagos', updates: 15, avgPrice: 638 },
        { name: 'Forte Oil', location: 'Ajah, Lagos', updates: 23, avgPrice: 648 }
    ];

    grid.innerHTML = stations.map(station => `
        <div class="station-card">
            <div class="station-header">
                <div class="station-icon">
                    <i class="ph ph-gas-pump"></i>
                </div>
                <div class="station-name">
                    <h4>${station.name}</h4>
                    <p><i class="ph ph-map-pin"></i> ${station.location}</p>
                </div>
            </div>
            <div class="station-stats">
                <div class="station-stat">
                    <p>Updates</p>
                    <h5>${station.updates}</h5>
                </div>
                <div class="station-stat">
                    <p>Avg Price</p>
                    <h5>₦${station.avgPrice}</h5>
                </div>
            </div>
            <div class="station-actions">
                <button class="btn btn-outline btn-small" style="flex: 1;">View Details</button>
                <button class="btn btn-primary btn-small" style="flex: 1;">Edit</button>
            </div>
        </div>
    `).join('');
}

function loadReportsList() {
    const list = document.getElementById('reportsList');
    if (!list) return;

    const reports = [
        { user: 'Anonymous User', type: 'Incorrect Price', content: 'The price at Total Energies Lekki is showing ₦640 but it\'s actually ₦650 now.', time: '1 hour ago' },
        { user: 'John Doe', type: 'Spam', content: 'User "test123" is posting fake prices to confuse drivers.', time: '3 hours ago' },
        { user: 'Mary Smith', type: 'Abuse', content: 'Inappropriate comments in the station reviews section.', time: '5 hours ago' }
    ];

    list.innerHTML = reports.map(report => `
        <div class="report-card">
            <div class="report-header">
                <div class="report-user">
                    <div class="user-avatar">${report.user.charAt(0)}</div>
                    <div>
                        <h4>${report.user}</h4>
                        <span style="font-size: 0.875rem; color: #6b7280;">${report.time}</span>
                    </div>
                </div>
                <span class="report-type">${report.type}</span>
            </div>
            <div class="report-content">
                <p>${report.content}</p>
            </div>
            <div class="report-actions">
                <button class="btn btn-success btn-small">Resolve</button>
                <button class="btn btn-outline btn-small">Investigate</button>
                <button class="btn btn-danger btn-small">Dismiss</button>
            </div>
        </div>
    `).join('');
}

// ==================== RECENT ACTIVITY ====================
function loadRecentActivity() {
    const activityList = document.getElementById('activityList');
    if (!activityList) return;

    const activities = [
        { icon: 'ph-user-plus', color: '#10b981', text: 'New user registered: Chukwudi Okafor', time: '5 mins ago' },
        { icon: 'ph-currency-circle-dollar', color: '#f97316', text: 'Price update submitted for Total Energies', time: '12 mins ago' },
        { icon: 'ph-flag', color: '#dc2626', text: 'Report flagged: Incorrect price at NNPC', time: '28 mins ago' },
        { icon: 'ph-gas-pump', color: '#3b82f6', text: 'New station added: Forte Oil - Ajah', time: '1 hour ago' },
        { icon: 'ph-chart-line', color: '#a855f7', text: 'Daily engagement goal reached', time: '2 hours ago' }
    ];

    activityList.innerHTML = activities.map(activity => `
        <div class="activity-item">
            <div class="activity-icon" style="background: ${activity.color}20; color: ${activity.color};">
                <i class="${activity.icon}"></i>
            </div>
            <div class="activity-text">
                <p>${activity.text}</p>
                <span>${activity.time}</span>
            </div>
        </div>
    `).join('');
}

// ==================== MODALS ====================
function initModals() {
    const userModal = document.getElementById('userModal');
    const closeUserModal = document.getElementById('closeUserModal');

    if (closeUserModal) {
        closeUserModal.addEventListener('click', function() {
            userModal.classList.remove('show');
        });
    }

    // Close modal when clicking outside
    if (userModal) {
        userModal.addEventListener('click', function(e) {
            if (e.target === userModal) {
                userModal.classList.remove('show');
            }
        });
    }
}

function viewUser(userName) {
    const modal = document.getElementById('userModal');
    const modalBody = document.getElementById('userModalBody');
    
    if (modal && modalBody) {
        modalBody.innerHTML = `
            <div style="text-align: center; margin-bottom: 1.5rem;">
                <div class="user-avatar" style="width: 5rem; height: 5rem; font-size: 2rem; margin: 0 auto 1rem;">${userName.charAt(0)}</div>
                <h3 style="margin-bottom: 0.5rem;">${userName}</h3>
                <p style="color: #6b7280;">Member since Jan 2026</p>
            </div>
            <div style="display: grid; gap: 1rem;">
                <div style="padding: 1rem; background: #f9fafb; border-radius: 0.5rem;">
                    <p style="color: #6b7280; font-size: 0.875rem; margin-bottom: 0.25rem;">Total Updates</p>
                    <h3 style="color: #f97316;">47 updates</h3>
                </div>
                <div style="padding: 1rem; background: #f9fafb; border-radius: 0.5rem;">
                    <p style="color: #6b7280; font-size: 0.875rem; margin-bottom: 0.25rem;">Tips Earned</p>
                    <h3 style="color: #10b981;">₦3,450</h3>
                </div>
                <div style="padding: 1rem; background: #f9fafb; border-radius: 0.5rem;">
                    <p style="color: #6b7280; font-size: 0.875rem; margin-bottom: 0.25rem;">Helpful Rate</p>
                    <h3 style="color: #3b82f6;">94%</h3>
                </div>
            </div>
            <div style="margin-top: 1.5rem; display: flex; gap: 0.5rem;">
                <button class="btn btn-outline" style="flex: 1;">Send Message</button>
                <button class="btn btn-danger" style="flex: 1;">Suspend User</button>
            </div>
        `;
        modal.classList.add('show');
    }
}

// ==================== TOAST NOTIFICATION ====================
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;

    const colors = {
        success: '#10b981',
        error: '#dc2626',
        info: '#f59e0b',
        warning: '#f59e0b'
    };

    toast.style.background = colors[type] || colors.success;
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ==================== REFRESH DATA ====================
function refreshDashboardData() {
    // Simulate data refresh
    const stats = {
        totalUsers: Math.floor(12547 + Math.random() * 10),
        activeStations: Math.floor(1834 + Math.random() * 5),
        updatesToday: Math.floor(892 + Math.random() * 20),
        pendingReports: Math.floor(23 - Math.random() * 3)
    };

    // Update stats if elements exist
    const elements = {
        totalUsers: document.getElementById('totalUsers'),
        activeStations: document.getElementById('activeStations'),
        updatesToday: document.getElementById('updatesToday'),
        pendingReports: document.getElementById('pendingReports')
    };

    Object.keys(elements).forEach(key => {
        if (elements[key]) {
            elements[key].textContent = stats[key].toLocaleString();
        }
    });

    console.log('📊 Dashboard data refreshed', new Date().toLocaleTimeString());
}

// ==================== UTILITY FUNCTIONS ====================

// Export data to CSV
function exportToCSV(data, filename) {
    const csv = data.map(row => Object.values(row).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
    showToast('Data exported successfully!', 'success');
}

// Initialize notification badge
const notificationBtn = document.getElementById('notificationBtn');
if (notificationBtn) {
    notificationBtn.addEventListener('click', function() {
        showToast('You have 5 new notifications', 'info');
    });
}

// Log admin actions
console.log('👨‍💼 Admin Dashboard Ready');
console.log('📊 All features initialized successfully');

// Export functions for external use
window.FuelRadarAdmin = {
    showToast,
    viewUser,
    exportToCSV,
    refreshDashboardData
};


document.addEventListener('DOMContentLoaded', function() {
    // Replace "Admin" with the user's first name
    const adminNameEl = document.getElementById('adminName');

if (adminNameEl && currentUser) {
    adminNameEl.textContent = currentUser.name || currentUser.email;
}

    // Logout modal logic
    const logoutBtn = document.getElementById('logoutBtn');
    const logoutModal = document.getElementById('logoutModal');
    const closeLogoutModal = document.getElementById('closeLogoutModal');
    const cancelLogout = document.getElementById('cancelLogout');
    const confirmLogout = document.getElementById('confirmLogout');
    const loader = document.getElementById('loader');

    function openModal() { logoutModal.classList.add('show'); }
    function closeModal() { logoutModal.classList.remove('show'); }

    logoutBtn.addEventListener('click', openModal);
    closeLogoutModal.addEventListener('click', closeModal);
    cancelLogout.addEventListener('click', closeModal);

    confirmLogout.addEventListener('click', () => {
    closeModal();

    // ✅ SHOW LOADER
    loader.classList.add("active");

    setTimeout(() => {
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("currentUser");

        window.location.href = "login.html";
    }, 2000);
});

    // loader.classList.remove("active");
});


