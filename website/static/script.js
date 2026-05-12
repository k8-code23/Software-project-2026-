// ============================================================
// BEACH DAY PLANNER — JAVASCRIPT
// Handles: packing checklist, fun facts, navbar scroll effect
// ============================================================


// ============================================================
// PACKING CHECKLIST
// All items the app knows about
// essential: true  = yellow border (must bring)
// uvRequired: true = only shows when UV is high
// windRequired     = only shows on windy days
// perfectDay       = only shows on great beach days
// ============================================================

const ALL_ITEMS = [
    { emoji: "🧴", name: "Sunscreen",          essential: true  },
    { emoji: "💧", name: "Water Bottle",        essential: true  },
    { emoji: "🏖️", name: "Beach Towel",        essential: true  },
    { emoji: "👙", name: "Swimmers",            essential: true  },
    { emoji: "📱", name: "Phone",               essential: false },
    { emoji: "🥪", name: "Snacks",              essential: false },
    { emoji: "🎒", name: "Beach Bag",           essential: false },
    { emoji: "🕶️", name: "Sunglasses",         essential: false, uvRequired: true  },
    { emoji: "🧢", name: "Hat",                 essential: false, uvRequired: true  },
    { emoji: "👕", name: "Rashie / UV Shirt",   essential: false, uvRequired: true  },
    { emoji: "🌂", name: "Beach Umbrella",      essential: false, perfectDay: true  },
    { emoji: "🏐", name: "Beach Ball",          essential: false, perfectDay: true  },
    { emoji: "🤿", name: "Snorkel Set",         essential: false, perfectDay: true  },
    { emoji: "🧥", name: "Windbreaker",         essential: false, windRequired: true },
    { emoji: "💊", name: "First Aid Kit",       essential: false },
    { emoji: "🎵", name: "Bluetooth Speaker",   essential: false },
    { emoji: "📚", name: "Book / Magazine",     essential: false },
    { emoji: "🧽", name: "Sand-free Mat",       essential: false },
];

// Tracks which items the user has ticked
let checkedItems = new Set();

// Tracks which items are currently visible
let visibleItems = [];


// Renders the checklist grid from a list of items
function renderChecklist(items) {
    visibleItems = items;
    const grid = document.getElementById("checklist-grid");

    grid.innerHTML = items.map(item => `
        <div class="checklist-item ${checkedItems.has(item.name) ? "checked" : ""} ${item.essential ? "essential" : ""}"
             onclick="toggleItem('${item.name}')">
            <span class="item-emoji">${item.emoji}</span>
            <span class="item-name">${item.name}</span>
        </div>
    `).join("");

    updateProgress();
}


// Ticks or unticks an item when the user clicks it
function toggleItem(name) {
    if (checkedItems.has(name)) {
        checkedItems.delete(name);
    } else {
        checkedItems.add(name);
    }
    renderChecklist(visibleItems);
}


// Updates the "X / Y packed" counter
function updateProgress() {
    const total   = visibleItems.length;
    const checked = visibleItems.filter(i => checkedItems.has(i.name)).length;
    document.getElementById("checklist-progress").textContent = `${checked} / ${total} packed`;
}


// Auto-fills the checklist based on current page conditions
// Reads the input values from the beach condition form
function autoFillChecklist() {
    const uvInput   = document.querySelector("input[name='uv']");
    const windInput = document.querySelector("input[name='wind']");

    const uv   = uvInput   ? parseInt(uvInput.value)   : 5;
    const wind = windInput ? parseInt(windInput.value) : 12;

    // Check if the score is showing a good result
    const scoreEl = document.querySelector(".score-big");
    const score   = scoreEl ? parseInt(scoreEl.textContent) : 0;

    const items = ALL_ITEMS.filter(item => {
        if (item.uvRequired   && uv < 4)    return false;
        if (item.windRequired  && wind < 20) return false;
        if (item.perfectDay   && score < 7)  return false;
        return true;
    });

    renderChecklist(items);
}


// Resets checklist back to all items, clears all ticks
function resetChecklist() {
    checkedItems.clear();
    renderChecklist(ALL_ITEMS);
}


// ============================================================
// FUN BEACH FACTS
// ============================================================

const BEACH_FACTS = [
    "Australia has over 10,000 beaches — more than any other country in the world! 🌏",
    "Freshwater Beach hosted the first surf carnival in Australia in 1912, marking the beginning of Australian surf lifesaving. 🏄",
    "The UV index in Sydney can reach 11+ (Extreme) during summer — always wear SPF 50+! ☀️",
    "Rip currents are responsible for the majority of beach rescues in Australia. Always swim between the flags. 🚩",
    "Sand is made of tiny rock and mineral particles worn down over millions of years. 🪨",
    "Surf lifesavers have performed over 600,000 rescues since the movement began in Australia. 🏅",
    "Northern Beaches has some of the cleanest air quality in the entire Sydney region! 🌬️",
    "Ocean water is about 96.5% pure water — the rest is dissolved salts, gases and particles. 🧪",
    "The word 'surf' comes from the 17th-century Portuguese word 'surfe', meaning breaking waves. 🌊",
    "A group of jellyfish is called a 'smack'. Watch out at the beach in summer! 🪼",
    "Seagulls can drink both fresh and salt water — they have special glands that filter out the salt. 🐦",
    "The Great Barrier Reef is the world's largest living structure and is visible from space! 🐠",
    "Manly Beach was named by Governor Arthur Phillip in 1788 after he was impressed by the 'manly' behaviour of the local Aboriginal people. 🏖️",
    "Palm Beach (at the northern tip of Sydney) is used as the filming location for the TV show Home and Away. 🎬",
];

let lastFactIndex = -1;

function showNewFact() {
    // Keep picking a random index until we get a different one from last time
    let index;
    do {
        index = Math.floor(Math.random() * BEACH_FACTS.length);
    } while (index === lastFactIndex);

    lastFactIndex = index;

    const el = document.getElementById("fact-text");
    el.style.opacity = "0";

    setTimeout(() => {
        el.textContent  = BEACH_FACTS[index];
        el.style.opacity = "1";
    }, 220);
}


// ============================================================
// NAVBAR — changes opacity when scrolling down
// ============================================================

window.addEventListener("scroll", () => {
    const nav = document.getElementById("navbar");
    if (window.scrollY > 60) {
        nav.style.background = "rgba(3, 4, 94, 0.98)";
    } else {
        nav.style.background = "rgba(3, 4, 94, 0.92)";
    }
});


// ============================================================
// ON PAGE LOAD — initialise everything
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
    renderChecklist(ALL_ITEMS);
    showNewFact();
});
