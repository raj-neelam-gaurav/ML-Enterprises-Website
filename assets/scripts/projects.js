// ==========================================
// 1. PROJECT DATA (EDIT THIS SECTION TO UPDATE TABLES)
// ==========================================

const worksData = {
    ongoing: [
        {
            sr: 1,
            name: "Civil Works of Custom Yard at Nagpur ICD",
            client: "Adani Logistics Ltd",
            value: "₹6.94 Cr",
            status: "In Progress"
        },
        {
            sr: 2,
            name: "Civil work for paved yard, drain, Boundary wall, Electrical, PEB Warehouse and FFS Work",
            client: "DP World (Panipat)",
            value: "₹40.71 Cr",
            status: "In Progress"
        },
        {
            sr: 3,
            name: "Civil Works of Silo Complex and Allied Facilities at Damoh, MP",
            client: "HM Agri Logistics Ltd",
            value: "₹12.00 Cr",
            status: "In Progress"
        },
        {
            sr: 4,
            name: "Supply & Execution of P-way Work, OHE, PSI & Telecom",
            client: "Ultratech Cement Limited",
            value: "₹13.25 Cr",
            status: "In Progress"
        },
        {
            sr: 5,
            name: "Civil Work Package of Chandari Site, UP (FCI AgriSilo Project)",
            client: "Adani Agri Logistics Ltd",
            value: "₹14.36 Cr",
            status: "In Progress"
        },
        {
            sr: 6,
            name: "OHE work at ICD Tumb",
            client: "Adani Forwarding Agent Pvt Ltd",
            value: "₹7.84 Cr",
            status: "In Progress"
        },
        {
            sr: 7,
            name: "Civil Works of Silo Complex at Ujjain, MP",
            client: "HM Agri Logistics Ltd",
            value: "₹16.94 Cr",
            status: "In Progress"
        },
        {
            sr: 8,
            name: "Civil Works of Silo Complex at Dhar, MP",
            client: "HM Agri Logistics Ltd",
            value: "₹13.05 Cr",
            status: "In Progress"
        },
        {
            sr: 9,
            name: "Civil Works of Silo Complex at Guna, MP",
            client: "HM Agri Logistics Ltd",
            value: "₹11.38 Cr",
            status: "In Progress"
        }
    ],
    completed: [
        {
            sr: 1,
            name: "Civil Works at Kilaraipur, Punjab",
            client: "Adani Logistics Ltd",
            value: "₹8.44 Cr",
            completion: "May 2025"
        },
        {
            sr: 2,
            name: "3rd Line And Railway Platform Work at Pali, Govindpuri",
            client: "DP World Rail Logistics",
            value: "₹24.78 Cr",
            completion: "Jan 2025"
        },
        {
            sr: 3,
            name: "Yard Extension (Railway Line no.4 Work) at ICD Patli",
            client: "Adani Logistics Ltd",
            value: "₹24.49 Cr",
            completion: "Aug 2024"
        },
        {
            sr: 4,
            name: "Railway Siding for Food Grains Storage Silos (Khudiram Bose Pusa)",
            client: "Adani Agri Logistics Ltd",
            value: "₹16.82 Cr",
            completion: "Feb 2024"
        },
        {
            sr: 5,
            name: "Civil Works at Private Freight Terminal, Pali, Haryana",
            client: "DP World Rail Logistics",
            value: "₹18.15 Cr",
            completion: "Jan 2024"
        },
        {
            sr: 6,
            name: "Railway Work at Darbhanga, Bihar",
            client: "Adani Agri Logistics Ltd",
            value: "₹17.87 Cr",
            completion: "Dec 2023"
        },
        {
            sr: 7,
            name: "Grain Silo Project Civil Work at Darbhanga, Bihar",
            client: "Adani Agri Logistics Ltd",
            value: "₹11.05 Cr",
            completion: "Dec 2023"
        },
        {
            sr: 8,
            name: "GATI Shakti Multi Model Cargo Terminal (Line 10, New Rewari)",
            client: "Pristine Mega Logistics",
            value: "₹5.33 Cr",
            completion: "Apr 2023"
        },
        {
            sr: 9,
            name: "Extension of Existing Paved Yard at ICD Patli",
            client: "Adani Logistics Ltd",
            value: "₹15.23 Cr",
            completion: "Nov 2020"
        }
    ]
};

// ==========================================
// 2. RENDERING LOGIC (DO NOT EDIT BELOW)
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // Render tables
    renderTable('ongoing-table-body', worksData.ongoing);
    renderTable('completed-table-body', worksData.completed);
    updateTotals();
    
    // Set default state: Show Completed, Hide Ongoing
    document.getElementById('completed-projects').style.display = "block";
    document.getElementById('ongoing-projects').style.display = "none";
    
    // Ensure active class is set correctly for fade effect
    setTimeout(() => {
        document.getElementById('completed-projects').classList.add('active');
    }, 10);
});

function renderTable(elementId, data) {
    const tableBody = document.getElementById(elementId);
    if (!tableBody) return;

    let html = '';
    data.forEach(row => {
        html += `
            <tr>
                <td>${row.sr}</td>
                <td class="text-left">${row.name}</td>
                <td>${row.client}</td>
                <td class="font-bold text-red">${row.value}</td>
                <td><span class="status-badge ${row.status ? 'status-ongoing' : 'status-completed'}">
                    ${row.status || 'Completed'}
                </span></td>
            </tr>
        `;
    });
    tableBody.innerHTML = html;
}

function updateTotals() {
    const parseValue = (str) => parseFloat(str.replace(/[₹, Cr]/g, '')) || 0;
    const ongoingTotal = worksData.ongoing.reduce((acc, curr) => acc + parseValue(curr.value), 0);
    const completedTotal = worksData.completed.reduce((acc, curr) => acc + parseValue(curr.value), 0);

    const ongoingEl = document.getElementById('ongoing-total');
    const completedEl = document.getElementById('completed-total');

    if(ongoingEl) ongoingEl.innerText = `₹${ongoingTotal.toFixed(2)} Cr`;
    if(completedEl) completedEl.innerText = `₹${completedTotal.toFixed(2)} Cr`;
}

// Tab Switching Logic
function openTab(evt, tabName) {
    // 1. Hide all tab content
    const tabcontent = document.getElementsByClassName("works-tab-content");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove('active');
    }

    // 2. Remove active class from all buttons
    const tablinks = document.getElementsByClassName("works-tab-btn");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    // 3. Show the current tab
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.style.display = "block";
        // Small delay to allow display:block to render before adding opacity class
        setTimeout(() => {
            selectedTab.classList.add('active');
        }, 10);
    }

    // 4. Add active class to the button that was clicked
    evt.currentTarget.classList.add("active");
}