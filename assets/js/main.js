let serieA = [
  { name: 'Juventus', colors: ['#FFFFFF', '#000000'] },
  { name: 'Inter', colors: ['#0055A4', '#000000'] },
  { name: 'Milan', colors: ['#AC0D0D', '#000000'] },
  { name: 'Roma', colors: ['#8A1E12', '#F0B900'] },
  { name: 'Napoli', colors: ['#87CEEB', '#FFFFFF'] },
  { name: 'Lazio', colors: ['#FFFFFF', '#87CEEB'] },
  { name: 'Atalanta', colors: ['#0055A4', '#000000'] },
  { name: 'Fiorentina', colors: ['#482E80', '#FFFFFF'] },
  { name: 'Sampdoria', colors: ['#003282', '#FFFFFF'] },
  { name: 'Genoa', colors: ['#D2232A', '#001F49'] },
  { name: 'Udinese', colors: ['#FFFFFF', '#000000'] },
  { name: 'Bologna', colors: ['#9f142d', '#1b2f56'] },
  { name: 'Sassuolo', colors: ['#008E55', '#000000'] },
  { name: 'Cagliari', colors: ['#c0001a', '#002b5c'] },
  { name: 'Torino', colors: ['#8a1e2a', '#FFFFFF'] },
  { name: 'Parma', colors: ['#FFF300', '#001A72'] },
  { name: 'Hellas Verona', colors: ['#FFD700', '#002D62'] },
  { name: 'Palermo', colors: ['#F4C2C2', '#000000'] },
  { name: 'Bari', colors: ['#FFFFFF', '#ED1C24'] },
  { name: 'Vicenza', colors: ['#FFFFFF', '#E30613'] }
];

let serieB = [
  { name: 'Empoli', colors: ['#005CB9', '#FFFFFF'] },
  { name: 'Salernitana', colors: ['#7A1429', '#FFFFFF'] },
  { name: 'Lecce', colors: ['#FFD700', '#DA291C'] },
  { name: 'Venezia', colors: ['#FC4C02', '#000000'] },
  { name: 'Cittadella', colors: ['#AF002D', '#FFFFFF'] },
  { name: 'Monza', colors: ['#FFFFFF', '#E30613'] },
  { name: 'Pisa', colors: ['#000000', '#5594D0'] },
  { name: 'Chievo', colors: ['#FFD700', '#005CB9'] },
  { name: 'Ascoli', colors: ['#FFFFFF', '#000000'] },
  { name: 'Brescia', colors: ['#003087', '#FFFFFF'] },
  { name: 'Varese', colors: ['#FFFFFF', '#E30613'] },
  { name: 'Cremonese', colors: ['#AAAAAA', '#E30613'] },
  { name: 'SPAL', colors: ['#FFFFFF', '#87CEEB'] },
  { name: 'Reggina', colors: ['#800000', '#FFFFFF'] },
  { name: 'Triestina', colors: ['#E30613', '#FFFFFF'] },
  { name: 'Cosenza', colors: ['#D71920', '#002D62'] },
  { name: 'Entella', colors: ['#FFFFFF', '#87CEEB'] },
  { name: 'Reggiana', colors: ['#AC0D0D', '#FFFFFF'] },
  { name: 'Frosinone', colors: ['#FFD700', '#005CB9'] },
  { name: 'Como', colors: ['#002D62', '#FFFFFF'] }
];

let serieC = [
  { name: 'Avellino', colors: ['#006837', '#FFFFFF'] },
  { name: 'Benevento', colors: ['#FFD700', '#DA291C'] },
  { name: 'Catania', colors: ['#DA291C', '#005CB9'] },
  { name: 'Ternana', colors: ['#E30613', '#008000'] },
  { name: 'Lecco', colors: ['#002D62', '#87CEEB'] },
  { name: 'Padova', colors: ['#FFFFFF', '#E30613'] },
  { name: 'Cesena', colors: ['#FFFFFF', '#000000'] },
  { name: 'Modena', colors: ['#FFD700', '#002D62'] },
  { name: 'Perugia', colors: ['#E30613', '#FFFFFF'] },
  { name: 'Alessandria', colors: ['#808080', '#000000'] },
  { name: 'Novara', colors: ['#005CB9', '#FFFFFF'] },
  { name: 'Catanzaro', colors: ['#FFD700', '#DA291C'] },
  { name: 'Siena', colors: ['#FFFFFF', '#000000'] },
  { name: 'Foggia', colors: ['#DA291C', '#000000'] },
  { name: 'Pro Patria', colors: ['#FFFFFF', '#002D62'] },
  { name: 'Piacenza', colors: ['#E30613', '#FFFFFF'] },
  { name: 'Lucchese', colors: ['#DA291C', '#000000'] },
  { name: 'Livorno', colors: ['#800000', '#FFFFFF'] },
  { name: 'Pescara', colors: ['#FFFFFF', '#87CEEB'] },
  { name: 'Messina', colors: ['#FFD700', '#DA291C'] },
];

// Variabili per gestire lo storico
let seasonCount = 0;
let nextPlayerId = 0;
let championsHistory = [];
let transferLog = [];
let freeAgents = [];
let freeCoaches = [];
let freeDirectors = [];

// Squadra del giocatore (null = modalità spettatore)
let playerTeam = null;

// Carriera del giocatore come Direttore Sportivo (null = spettatore puro)
// { firstName, lastName, age, reputation, teamName|null, contractYears, seasonsUnemployed, history: [] }
let dsCareer = null;

// Dati pendenti per la UI del mercato manageriale
let pendingRenewals = [];        // giocatori in scadenza della squadra del giocatore
let pendingAIOffers = [];        // offerte AI per i giocatori del giocatore
let pendingTransferMarket = [];  // giocatori rimasti sul mercato dopo le trattative AI
let pendingScoutingTargets = []; // target individuati dal DS del giocatore
let pendingPreContracts = [];    // { player, fromTeam } — pre-contratti firmati nel mercato invernale

// Prestiti attivi: durano una stagione, si risolvono in automatico all'inizio
// del mercato estivo successivo (STEP 0 di updateTeamStrengths). Coinvolgono
// solo il club del giocatore (in ingresso e in uscita) — l'AI non presta tra sé.
// { player, homeTeam, loanTeam }
let activeLoans = [];

// --- SISTEMA GIOCATORI ---
const ITALIAN_FIRST_NAMES = [
  'Marco', 'Luca', 'Andrea', 'Matteo', 'Francesco', 'Alessandro', 'Lorenzo', 'Davide',
  'Riccardo', 'Simone', 'Federico', 'Stefano', 'Antonio', 'Giuseppe', 'Giovanni', 'Roberto',
  'Paolo', 'Daniele', 'Nicola', 'Pietro', 'Filippo', 'Emanuele', 'Cristian', 'Gabriele',
  'Michele', 'Fabio', 'Giacomo', 'Alberto', 'Massimo', 'Claudio', 'Dario', 'Enrico',
  'Fabrizio', 'Giorgio', 'Leonardo', 'Luigi', 'Mario', 'Sergio', 'Tommaso', 'Vincenzo',
  'Alessio', 'Edoardo', 'Samuele', 'Gianluca', 'Valerio', 'Mattia', 'Nicolò', 'Raffaele',
  'Salvatore', 'Ivan', 'Umberto', 'Manuel', 'Cesare', 'Gianluigi', 'Domenico', 'Elia',
  'Mirko', 'Patrizio', 'Aldo', 'Bruno', 'Ettore', 'Gaetano', 'Ignazio', 'Orlando',
  'Pasquale', 'Renato', 'Ruggero', 'Silvio', 'Vittorio', 'Carmelo'
];

const ITALIAN_LAST_NAMES = [
  'Rossi', 'Ferrari', 'Russo', 'Bianchi', 'Esposito', 'Romano', 'Colombo', 'Ricci',
  'Marino', 'Greco', 'Bruno', 'Gallo', 'Conti', 'De Luca', 'Mancini', 'Costa',
  'Giordano', 'Rizzo', 'Lombardi', 'Moretti', 'Barbieri', 'Fontana', 'Santoro', 'Mariani',
  'Rinaldi', 'Caruso', 'Ferrara', 'Galli', 'Martini', 'Leone', 'Longo', 'Gentile',
  'Martinelli', 'Vitale', 'Conte', 'Ferretti', 'Sala', 'Serra', 'Fabbri', 'Monti',
  'Palermo', 'Caputo', 'Guerra', 'Pellegrini', 'Poli', 'Mazzola', 'Tardelli', 'Baresi',
  'Maldini', 'Rivera', 'Causio', 'Antognoni', 'Zoff', 'Bergomi', 'Facchetti', 'Meazza',
  'Piola', 'Riva', 'Totti', 'Del Piero',
  'Amato', 'Basile', 'Benedetti', 'Bernardi', 'Bertolini', 'Bianco', 'Bonetti', 'Bonucci',
  'Borghi', 'Bosco', 'Cattaneo', 'Cavalli', 'Cavallo', 'Chiesa', 'Cipriani', 'Coppola',
  'Cosenza', 'Cremonesi', 'D\'Amico', 'D\'Angelo', 'De Santis', 'Di Marco', 'Di Stefano', 'Donati',
  'Farina', 'Ferrero', 'Ferri', 'Festa', 'Fiore', 'Forte', 'Franchi', 'Franco',
  'Galli', 'Gatti', 'Gentili', 'Ghirardi', 'Giannini', 'Giorgi', 'Grassi', 'Grasso',
  'Grossi', 'Guarino', 'Iacobucci', 'Lanza', 'Lazzari', 'Lombardo', 'Lupo', 'Magni',
  'Marchetti', 'Marchi', 'Marconi', 'Marrone', 'Mattei', 'Mazza', 'Mazzocchi', 'Merlo',
  'Milani', 'Mongelli', 'Morandi', 'Nardi', 'Nava', 'Negri', 'Neri', 'Orlandi',
  'Pagano', 'Palmieri', 'Parisi', 'Pastore', 'Pavan', 'Pedretti', 'Perrone', 'Pesce',
  'Petrucci', 'Piazza', 'Piccoli', 'Pini', 'Pinna', 'Pirlo', 'Pisano', 'Pozzi',
  'Pugliese', 'Quaranta', 'Ranieri', 'Ravaglia', 'Reggiani', 'Ricciardi', 'Rocca', 'Romeo',
  'Rosati', 'Rota', 'Ruggeri', 'Sabatini', 'Salerno', 'Sanna', 'Sartori', 'Scala',
  'Scotti', 'Sorrentino', 'Spinelli', 'Tarantino', 'Testa', 'Torres', 'Trevisan', 'Tucci',
  'Valenti', 'Venturi', 'Verdi', 'Vicari', 'Viola', 'Volpe', 'Zanetti', 'Zito'
];

const ROLE_MIN = { POR: 2, DIF: 6, CEN: 6, ATT: 4 };
const ROLE_MAX = { POR: 4, DIF: 10, CEN: 10, ATT: 8 };
const ROSTER_MIN_TOTAL = ROLE_MIN.POR + ROLE_MIN.DIF + ROLE_MIN.CEN + ROLE_MIN.ATT; // 18
const ROSTER_MAX_TOTAL = ROLE_MAX.POR + ROLE_MAX.DIF + ROLE_MAX.CEN + ROLE_MAX.ATT; // 32

// Sottoruoli: ogni ruolo di movimento (non il portiere) si specializza in due
// varianti tattiche. La maggior parte dei giocatori è specialista in una sola
// (~70%), i più versatili sanno coprire entrambe (~30%).
const SUB_ROLES = { DIF: ['CENTRALE', 'TERZINO'], CEN: ['CENTRALE', 'ESTERNO'], ATT: ['CENTRALE', 'ALA'] };
const SUB_ROLE_LABELS = { CENTRALE: 'Centrale', TERZINO: 'Terzino', ESTERNO: 'Esterno', ALA: 'Ala' };

function assignSubRoles(role) {
  const options = SUB_ROLES[role];
  if (!options) return []; // POR: nessun sottoruolo
  if (Math.random() < 0.30) return [...options]; // versatile: entrambe le varianti
  return [options[Math.floor(Math.random() * options.length)]]; // specialista
}

// Backfill per giocatori legacy (salvataggi precedenti a questa funzionalità)
function ensureSubRoles(player) {
  if (!player.subRoles) player.subRoles = assignSubRoles(player.role);
  return player.subRoles;
}

// Etichetta leggibile dei sottoruoli, es. "Centrale" o "Centrale/Terzino"
function formatSubRoles(player) {
  const subRoles = ensureSubRoles(player);
  return subRoles.map(s => SUB_ROLE_LABELS[s] || s).join('/');
}

// Forza massima acquistabile per lega: A=nessun limite, B<=80, C<=60
function leagueStrCap(leagueLevel) {
  return leagueLevel === 'C' ? 60 : leagueLevel === 'B' ? 80 : 100;
}
function roleCount(roster, role) { return roster.filter(p => p.role === role).length; }
function canAddRole(team, role) { return roleCount(team.roster, role) < ROLE_MAX[role]; }
function neededRoles(team) { return Object.keys(ROLE_MIN).filter(r => roleCount(team.roster, r) < ROLE_MIN[r]); }

// POR 2-4, DIF 6-10, CEN 6-10, ATT 4-8 — totale sempre tra ROSTER_MIN_TOTAL (18) e ROSTER_MAX_TOTAL (32)
function randomRosterCounts() {
  const total = ROSTER_MIN_TOTAL + Math.floor(Math.random() * (ROSTER_MAX_TOTAL - ROSTER_MIN_TOTAL + 1));
  const extras = total - ROSTER_MIN_TOTAL;
  const caps = { POR: ROLE_MAX.POR - ROLE_MIN.POR, DIF: ROLE_MAX.DIF - ROLE_MIN.DIF, CEN: ROLE_MAX.CEN - ROLE_MIN.CEN, ATT: ROLE_MAX.ATT - ROLE_MIN.ATT };
  const added = { POR: 0, DIF: 0, CEN: 0, ATT: 0 };
  let left = extras;
  while (left > 0) {
    const avail = Object.keys(caps).filter(r => added[r] < caps[r]);
    if (!avail.length) break;
    const r = avail[Math.floor(Math.random() * avail.length)];
    added[r]++;
    left--;
  }
  return { POR: ROLE_MIN.POR + added.POR, DIF: ROLE_MIN.DIF + added.DIF, CEN: ROLE_MIN.CEN + added.CEN, ATT: ROLE_MIN.ATT + added.ATT };
}

function generatePlayerStrength(teamStrength) {
  const variance = Math.floor(Math.random() * 21) - 10;
  return Math.max(1, Math.min(99, teamStrength + variance));
}

function generateTeamRoster(team) {
  const roster = [];
  const counts = randomRosterCounts();
  Object.entries(counts).forEach(([role, count]) => {
    for (let i = 0; i < count; i++) {
      const firstName = ITALIAN_FIRST_NAMES[Math.floor(Math.random() * ITALIAN_FIRST_NAMES.length)];
      const lastName = ITALIAN_LAST_NAMES[Math.floor(Math.random() * ITALIAN_LAST_NAMES.length)];
      const age = Math.floor(Math.random() * 20) + 17; // 17-36
      const strength = generatePlayerStrength(team.strength);
      // maxStrength: potenziale nascosto — i giovani possono crescere di più
      const growthRoom = age < 23 ? 20 + Math.floor(Math.random() * 20)  // +20/+40
        : age < 28 ? 10 + Math.floor(Math.random() * 15)  // +10/+25
          : age < 32 ? 3 + Math.floor(Math.random() * 10)  // +3/+13
            : 0 + Math.floor(Math.random() * 5);   // +0/+5
      const maxStrength = Math.min(100, strength + growthRoom);
      const career = [{ team: team.name, joined: 0, left: null, fee: null }];
      const contract = createContract(strength, age);
      const personality = createPersonality();
      const subRoles = assignSubRoles(role);
      roster.push({ id: nextPlayerId++, firstName, lastName, age, role, subRoles, strength, maxStrength, career, contract, personality });
    }
  });
  team.roster = roster;
}

// Aggiorna la forza di un giocatore in base alla curva d'età e incrementa l'età
function ageProgressPlayer(player) {
  const age = player.age;
  let delta = 0;
  if (age < 23) {
    delta = Math.floor(Math.random() * 4) + 2;       // 17-22: crescita rapida +2/+5
  } else if (age < 28) {
    delta = Math.floor(Math.random() * 4);            // 23-27: crescita lenta 0/+3
  } else if (age <= 31) {
    delta = Math.floor(Math.random() * 3) - 1;       // 28-31: picco, -1/+1
  } else {
    delta = -(Math.floor(Math.random() * 3) + 1);    // 32+: declino -1/-3
  }
  player.strength = Math.max(1, Math.min(player.maxStrength || 100, player.strength + delta));
  player.age++;
}

// Ricalcola la forza della squadra come media delle forze dei giocatori (scala 1-100)
function recalculateTeamStrength(team) {
  if (!team.roster || team.roster.length === 0) return;
  const avg = team.roster.reduce((sum, p) => sum + p.strength, 0) / team.roster.length;
  team.strength = Math.max(1, Math.min(100, Math.round(avg)));
}

// Crea un giovane giocatore di settore giovanile
function createYouthPlayer(role, team) {
  const firstName = ITALIAN_FIRST_NAMES[Math.floor(Math.random() * ITALIAN_FIRST_NAMES.length)];
  const lastName = ITALIAN_LAST_NAMES[Math.floor(Math.random() * ITALIAN_LAST_NAMES.length)];
  const age = 17 + Math.floor(Math.random() * 2);
  // Forza di nascita per lega (indipendente dalla forza corrente della squadra)
  // Range calibrati per steady-state realistico con campioni 90+ raggiungibili:
  //   A: avg nascita ~59 + crescita ~+25 → picco medio ~84, top 25% arriva a 90+
  //   B: avg nascita ~35 + crescita ~+25 → picco medio ~60
  //   C: avg nascita ~19 + crescita ~+20 → picco medio ~39
  const [birthMin, birthMax] = team.leagueLevel === 'A' ? [55, 70]
    : team.leagueLevel === 'B' ? [35, 50]
      : [15, 30];
  const youthStr = birthMin + Math.floor(Math.random() * (birthMax - birthMin + 1));
  // maxStrength: NON cappato alla lega — il talento non ha confini
  // 10% predestinato (alzato da 5%): questi sono i futuri campioni
  const isElite = Math.random() < 0.10;
  const maxStrength = isElite
    ? Math.min(100, youthStr + 30 + Math.floor(Math.random() * 12)) // 90-100+ per i nati alti
    : Math.min(100, youthStr + 18 + Math.floor(Math.random() * 35)); // +18 a +53 per gli altri
  const career = [{ team: team.name, joined: seasonCount, left: null, fee: null }];
  const contract = createContract(youthStr, age);
  const personality = createPersonality();
  const subRoles = assignSubRoles(role);
  return { id: nextPlayerId++, firstName, lastName, age, role, subRoles, strength: youthStr, maxStrength, career, contract, personality };
}

// --- SISTEMA FORMAZIONI ---

const FORMATIONS = {
  '4-4-2': { POR: 1, DIF: 4, CEN: 4, ATT: 2 },
  '4-3-3': { POR: 1, DIF: 4, CEN: 3, ATT: 3 },
  '3-5-2': { POR: 1, DIF: 3, CEN: 5, ATT: 2 },
  '4-2-4': { POR: 1, DIF: 4, CEN: 2, ATT: 4 },
  '5-3-2': { POR: 1, DIF: 5, CEN: 3, ATT: 2 },
  '4-5-1': { POR: 1, DIF: 4, CEN: 5, ATT: 1 },
  '3-4-3': { POR: 1, DIF: 3, CEN: 4, ATT: 3 },
};
const FORMATION_NAMES = Object.keys(FORMATIONS);

// Composizione dei sottoruoli richiesti per ciascuno slot di movimento del
// modulo (il portiere resta fuori dall'equazione tattica). I conteggi per
// ruolo coincidono sempre con FORMATIONS.
const FORMATION_SUBROLES = {
  '4-4-2': { DIF: ['CENTRALE', 'CENTRALE', 'TERZINO', 'TERZINO'], CEN: ['CENTRALE', 'CENTRALE', 'ESTERNO', 'ESTERNO'], ATT: ['CENTRALE', 'CENTRALE'] },
  '4-3-3': { DIF: ['CENTRALE', 'CENTRALE', 'TERZINO', 'TERZINO'], CEN: ['CENTRALE', 'CENTRALE', 'CENTRALE'], ATT: ['CENTRALE', 'ALA', 'ALA'] },
  '3-5-2': { DIF: ['CENTRALE', 'CENTRALE', 'CENTRALE'], CEN: ['CENTRALE', 'CENTRALE', 'CENTRALE', 'ESTERNO', 'ESTERNO'], ATT: ['CENTRALE', 'CENTRALE'] },
  '4-2-4': { DIF: ['CENTRALE', 'CENTRALE', 'TERZINO', 'TERZINO'], CEN: ['CENTRALE', 'CENTRALE'], ATT: ['CENTRALE', 'CENTRALE', 'ALA', 'ALA'] },
  '5-3-2': { DIF: ['CENTRALE', 'CENTRALE', 'CENTRALE', 'TERZINO', 'TERZINO'], CEN: ['CENTRALE', 'CENTRALE', 'CENTRALE'], ATT: ['CENTRALE', 'CENTRALE'] },
  '4-5-1': { DIF: ['CENTRALE', 'CENTRALE', 'TERZINO', 'TERZINO'], CEN: ['CENTRALE', 'CENTRALE', 'CENTRALE', 'ESTERNO', 'ESTERNO'], ATT: ['CENTRALE'] },
  '3-4-3': { DIF: ['CENTRALE', 'CENTRALE', 'CENTRALE'], CEN: ['CENTRALE', 'CENTRALE', 'ESTERNO', 'ESTERNO'], ATT: ['CENTRALE', 'ALA', 'ALA'] },
};

// Descrizione leggibile delle posizioni richieste da un modulo, es.
// "Difesa: 2 Centrali + 2 Terzini · Centrocampo: 2 Centrali + 2 Esterni · Attacco: 2 Centrali"
const SUB_ROLE_LABELS_PLURAL = { CENTRALE: 'Centrali', TERZINO: 'Terzini', ESTERNO: 'Esterni', ALA: 'Ali' };
const REPARTO_LABELS = { DIF: 'Difesa', CEN: 'Centrocampo', ATT: 'Attacco' };
function formatFormationRequirements(formationName) {
  const slots = FORMATION_SUBROLES[formationName] || FORMATION_SUBROLES['4-4-2'];
  return ['DIF', 'CEN', 'ATT'].map(role => {
    const counts = {};
    slots[role].forEach(s => { counts[s] = (counts[s] || 0) + 1; });
    const parts = Object.entries(counts).map(([s, n]) => `${n} ${n === 1 ? (SUB_ROLE_LABELS[s] || s) : (SUB_ROLE_LABELS_PLURAL[s] || s)}`);
    return `${REPARTO_LABELS[role]}: ${parts.join(' + ')}`;
  }).join(' · ');
}

// --- SISTEMA ALLENATORI ---

function createCoach(team) {
  const firstName = ITALIAN_FIRST_NAMES[Math.floor(Math.random() * ITALIAN_FIRST_NAMES.length)];
  const lastName = ITALIAN_LAST_NAMES[Math.floor(Math.random() * ITALIAN_LAST_NAMES.length)];
  const age = 38 + Math.floor(Math.random() * 20);
  const avgPlayerStr = team.roster && team.roster.length > 0
    ? team.roster.reduce((s, p) => s + p.strength, 0) / team.roster.length : 50;
  const strength = Math.max(30, Math.min(95, Math.round(avgPlayerStr * 0.75 + Math.random() * 20 - 5)));
  const maxStrength = Math.min(100, strength + 10 + Math.floor(Math.random() * 35)); // +10 a +45
  const contract = { duration: 2 + Math.floor(Math.random() * 3) }; // 2-4 anni
  return { firstName, lastName, age, strength, maxStrength, formation: FORMATION_NAMES[Math.floor(Math.random() * FORMATION_NAMES.length)], contract };
}

function createDirector(team) {
  const firstName = ITALIAN_FIRST_NAMES[Math.floor(Math.random() * ITALIAN_FIRST_NAMES.length)];
  const lastName = ITALIAN_LAST_NAMES[Math.floor(Math.random() * ITALIAN_LAST_NAMES.length)];
  const age = 38 + Math.floor(Math.random() * 20);
  const avgPlayerStr = team.roster && team.roster.length > 0
    ? team.roster.reduce((s, p) => s + p.strength, 0) / team.roster.length : 50;
  const strength = Math.max(30, Math.min(95, Math.round(avgPlayerStr * 0.70 + Math.random() * 20 - 5)));
  const maxStrength = Math.min(100, strength + 10 + Math.floor(Math.random() * 35)); // +10 a +45
  return { firstName, lastName, age, strength, maxStrength };
}

// Il presidente fissa budget trasferimenti e monte ingaggi; non gioca mai lui stesso
function createPresident(team) {
  const firstName = ITALIAN_FIRST_NAMES[Math.floor(Math.random() * ITALIAN_FIRST_NAMES.length)];
  const lastName = ITALIAN_LAST_NAMES[Math.floor(Math.random() * ITALIAN_LAST_NAMES.length)];
  return {
    firstName, lastName,
    personality: {
      generosity: Math.floor(Math.random() * 101), // 0-100: quanto è disposto a investire
      patience: Math.floor(Math.random() * 101),   // 0-100: quanto tollera un progetto lento
    },
  };
}

function ageProgressCoach(coach) {
  let delta;
  if (coach.age < 40) delta = 1 + Math.floor(Math.random() * 3);  // 30-39: +1/+3
  else if (coach.age < 50) delta = 1 + Math.floor(Math.random() * 2); // 40-49: +1/+2 (carriera in crescita)
  else if (coach.age < 60) delta = Math.floor(Math.random() * 2); // 50-59: 0/+1
  else delta = -(1 + Math.floor(Math.random() * 3));               // 60-70: -1/-3
  coach.strength = Math.max(30, Math.min(coach.maxStrength || 100, coach.strength + delta));
  coach.age++;
}

function retiredPlayerToStaff(player) {
  // Un campione (str alta) diventa staff di qualità; ratio più alto per le stelle
  const ratio = player.strength >= 80 ? 0.70 : player.strength >= 60 ? 0.62 : 0.55;
  const strength = Math.max(30, Math.min(95, Math.round(player.strength * ratio + Math.random() * 15 - 5)));
  const maxStrength = Math.min(100, strength + 15 + Math.floor(Math.random() * 30)); // +15 a +45
  return { firstName: player.firstName, lastName: player.lastName, age: player.age, strength, maxStrength, formation: FORMATION_NAMES[Math.floor(Math.random() * FORMATION_NAMES.length)] };
}

// Seleziona i migliori 11 per il modulo dell'allenatore.
// Ritorna array di { player, inPosition }. Fuori ruolo: inPosition=false (-30% forza nel calcolo).
function getBest11(roster, formationName) {
  const slots = { ...(FORMATIONS[formationName] || FORMATIONS['4-4-2']) };
  const subroleSlots = FORMATION_SUBROLES[formationName] || FORMATION_SUBROLES['4-4-2'];
  const result = [];
  const used = new Set();

  // Prima passata: per ogni ruolo, riempi gli slot con chi è più forte fra
  // chi può ancora coprire una posizione richiesta dal modulo — specialisti
  // e versatili competono alla pari sulla forza, nessuno dei due è
  // privilegiato a priori. Un giocatore viene scartato solo se il tipo di
  // slot che sa coprire è già stato saturato da qualcun altro più forte di
  // lui. Il portiere non ha sottoruoli: si sceglie per pura forza.
  for (const role of ['POR', 'DIF', 'CEN', 'ATT']) {
    let needed = slots[role] || 0;
    const inRolePool = roster
      .filter(p => p.role === role && !used.has(p.id))
      .sort((a, b) => b.strength - a.strength);

    const neededSubroles = subroleSlots[role];
    if (!neededSubroles || !neededSubroles.length) {
      for (const p of inRolePool) {
        if (needed <= 0) break;
        result.push({ player: p, inPosition: true });
        used.add(p.id);
        needed--;
      }
    } else {
      inRolePool.forEach(ensureSubRoles);
      const typeCounts = {};
      neededSubroles.forEach(s => { typeCounts[s] = (typeCounts[s] || 0) + 1; });
      const totalNeeded = neededSubroles.length;
      const selected = [];

      // Un'unica scansione per forza decrescente: uno specialista viene preso
      // solo se il SUO tipo ha ancora posto, un versatile viene preso finché
      // resta un qualsiasi slot libero (può coprire entrambi i tipi).
      for (const p of inRolePool) {
        if (selected.length >= totalNeeded) break;
        if (p.subRoles.length === 1) {
          const type = p.subRoles[0];
          if (typeCounts[type] > 0) { selected.push(p); typeCounts[type]--; }
        } else if (p.subRoles.length === 2) {
          const openType = Object.keys(typeCounts).find(t => typeCounts[t] > 0);
          if (openType) { selected.push(p); typeCounts[openType]--; }
        }
      }

      // Fallback: se restano slot scoperti (mancano proprio specialisti o
      // versatili adatti), ripiega sui più forti rimasti, per forza, anche
      // se il sottoruolo non calza (meglio schierarli che lasciare un buco).
      const stillNeeded = totalNeeded - selected.length;
      if (stillNeeded > 0) {
        const leftover = inRolePool.filter(p => !selected.includes(p)).slice(0, stillNeeded);
        selected.push(...leftover);
      }

      selected.forEach(p => { result.push({ player: p, inPosition: true }); used.add(p.id); });
      needed -= selected.length;
    }
    slots[role] = needed; // quanti slot rimangono vuoti
  }

  // Seconda passata: slot vuoti → riempi con i migliori disponibili (fuori ruolo)
  for (const role of ['POR', 'DIF', 'CEN', 'ATT']) {
    let needed = slots[role];
    if (!needed) continue;
    const pool = roster
      .filter(p => !used.has(p.id))
      .sort((a, b) => b.strength - a.strength);
    for (const p of pool) {
      if (needed <= 0) break;
      result.push({ player: p, inPosition: false });
      used.add(p.id);
      needed--;
    }
  }

  return result;
}

// Su quanti dei 10 slot di movimento (portiere escluso) il modulo scelto
// piazza un giocatore nel sottoruolo corretto (oltre che nel ruolo giusto).
// Assegnazione greedy ottimale: gli specialisti coprono per primi lo slot che
// sanno fare, i versatili riempiono quel che resta — con solo due varianti
// per ruolo questo greedy equivale alla soluzione ottima.
function countCorrectSubRolePlacements(best11, formationName) {
  const subroleSlots = FORMATION_SUBROLES[formationName] || FORMATION_SUBROLES['4-4-2'];
  let correct = 0;
  ['DIF', 'CEN', 'ATT'].forEach(role => {
    const neededSlots = subroleSlots[role];
    if (!neededSlots || !neededSlots.length) return;
    const [typeA, typeB] = SUB_ROLES[role];
    let needA = neededSlots.filter(s => s === typeA).length;
    let needB = neededSlots.filter(s => s === typeB).length;

    const rolePlayers = best11
      .filter(e => e.inPosition && e.player.role === role)
      .map(e => e.player);
    rolePlayers.forEach(ensureSubRoles);
    const onlyA = rolePlayers.filter(p => p.subRoles.includes(typeA) && !p.subRoles.includes(typeB)).length;
    const onlyB = rolePlayers.filter(p => p.subRoles.includes(typeB) && !p.subRoles.includes(typeA)).length;
    const both = rolePlayers.filter(p => p.subRoles.includes(typeA) && p.subRoles.includes(typeB)).length;

    // Gli specialisti esatti coprono prima il proprio slot (non hanno alternative)
    const fillOnlyA = Math.min(onlyA, needA); needA -= fillOnlyA; correct += fillOnlyA;
    const fillOnlyB = Math.min(onlyB, needB); needB -= fillOnlyB; correct += fillOnlyB;
    // I versatili riempiono gli slot rimasti, in un ordine o nell'altro
    let bothLeft = both;
    const fillBothA = Math.min(bothLeft, needA); bothLeft -= fillBothA; correct += fillBothA;
    const fillBothB = Math.min(bothLeft, needB); correct += fillBothB;
  });
  return correct; // 0-10
}

// Bonus di forza per lo schieramento tattico: cresce gradualmente con quanti
// giocatori (su 10 di movimento) sono nel sottoruolo giusto per il modulo,
// fino al massimo con la formazione perfetta (10/10).
const MAX_SUBROLE_BONUS = 6;
function getTacticalSubRoleBonus(best11, formationName) {
  return (countCorrectSubRolePlacements(best11, formationName) / 10) * MAX_SUBROLE_BONUS;
}

// Forza effettiva della squadra: media pesata dei migliori 11 disponibili + apporto allenatore.
// I giocatori fuori ruolo contribuiscono al 70% della loro forza.
function getEffectiveStrength(team) {
  if (!team.roster || !team.roster.length) return team.strength || 50;
  const available = filterAvailableRoster(team.roster);
  const formationName = team.coach?.formation || '4-4-2';
  const best11 = getBest11(available.length >= 7 ? available : team.roster, formationName);
  if (!best11.length) return team.strength || 50;
  const total = best11.reduce((sum, { player, inPosition }) =>
    sum + (inPosition ? player.strength : player.strength * 0.70), 0);
  const base = total / best11.length + getTacticalSubRoleBonus(best11, formationName);
  if (!team.coach) return Math.max(1, Math.min(100, base));
  const mod = (team.coach.strength - 50) / 4.2; // -12 a +12
  return Math.max(1, Math.min(100, base + mod));
}

// Restituisce i giocatori di una rosa disponibili (non infortunati, non squalificati)
function filterAvailableRoster(roster) {
  return roster.filter(p =>
    (p.injuryMatchesLeft || 0) === 0 &&
    (p.suspendedMatchesLeft || 0) === 0
  );
}

// Sceglie un assistman dal lineup escluso il marcatore (CEN > ATT > DIF > POR=0)
// Ritorna null se non c'è un assist (40% delle volte)
function pickAssister(lineup, scorer) {
  if (Math.random() < 0.40) return null;
  const weights = { CEN: 8, ATT: 5, DIF: 2, POR: 0 };
  const pool = lineup
    .map(e => e.player)
    .filter(p => p.id !== scorer.id && (weights[p.role] || 0) > 0);
  if (!pool.length) return null;
  const totalWeight = pool.reduce((s, p) => s + (weights[p.role] || 0), 0);
  let rand = Math.random() * totalWeight;
  for (const p of pool) {
    rand -= weights[p.role] || 0;
    if (rand <= 0) return p;
  }
  return pool[pool.length - 1];
}

// Decrementa i contatori di infortuni e squalifiche per tutte le squadre.
// Va chiamato alla FINE di ogni giornata (dopo aver simulato le partite).
function processMatchdayRecovery() {
  [...serieA, ...serieB, ...serieC].forEach(team => {
    team.roster.forEach(p => {
      if ((p.injuryMatchesLeft || 0) > 0) p.injuryMatchesLeft--;
      if ((p.suspendedMatchesLeft || 0) > 0) p.suspendedMatchesLeft--;
    });
  });
}

// Sceglie il marcatore con peso per ruolo: ATT > CEN > DIF > POR=0
function pickScorer(roster) {
  const weights = { ATT: 10, CEN: 4, DIF: 1.5, POR: 0 };
  const pool = roster.filter(p => (weights[p.role] || 0) > 0);
  if (!pool.length) return null;
  const totalWeight = pool.reduce((s, p) => s + (weights[p.role] || 0), 0);
  let rand = Math.random() * totalWeight;
  for (const p of pool) {
    rand -= weights[p.role] || 0;
    if (rand <= 0) return p;
  }
  return pool[pool.length - 1];
}

// Restituisce lo stipendio mensile del giocatore in k€ (solo display)
function getPlayerSalaryDisplay(strength) {
  return Math.round(strength * strength / 100);
}

// Moltiplicatore di valore per età: i giovani valgono di più per il potenziale
// di crescita e la rivendibilità, i veterani calano rapidamente avvicinandosi
// al ritiro, a parità di forza attuale.
function getAgeValueMultiplier(age) {
  if (age <= 20) return 1.40;
  if (age <= 23) return 1.25;
  if (age <= 26) return 1.10;
  if (age <= 29) return 1.00;
  if (age <= 31) return 0.75;
  if (age <= 33) return 0.50;
  if (age <= 35) return 0.30;
  return 0.15; // 36+: valore di mercato quasi nullo, prossimo a fine carriera
}

// Scaglioni di prezzo per fascia di forza (M€): ogni fascia ha un tetto massimo
// invalicabile — un giocatore di forza 40 non potrà mai valere quanto uno di
// forza 90, indipendentemente da quanto l'età lo renda "appetibile".
//   <50 → max 1M€ · <60 → max 2M€ · <70 → max 5M€ · <80 → max 15M€
//   <90 → max 70M€ · ≤100 → max 180M€
const VALUE_BRACKETS = [
  { min: 0,  max: 50,  minCap: 0.1, maxCap: 1 },
  { min: 50, max: 60,  minCap: 1,   maxCap: 2 },
  { min: 60, max: 70,  minCap: 2,   maxCap: 5 },
  { min: 70, max: 80,  minCap: 5,   maxCap: 15 },
  { min: 80, max: 90,  minCap: 15,  maxCap: 70 },
  { min: 90, max: 101, minCap: 70,  maxCap: 180 }, // include 100
];

function getValueBracket(strength) {
  const s = Math.max(1, Math.min(100, strength));
  return VALUE_BRACKETS.find(b => s < b.max) || VALUE_BRACKETS[VALUE_BRACKETS.length - 1];
}

// Valore di trasferimento del giocatore in M€: interpola dentro la fascia di
// forza (posizione lineare tra il tetto della fascia precedente e quello
// attuale), poi l'età modula il valore SENZA MAI poter superare il tetto
// della fascia — un ventenne di forza 55 può avvicinarsi ai 2M€, non superarli.
function getTransferValue(player) {
  const bracket = getValueBracket(player.strength);
  const t = (Math.max(1, Math.min(100, player.strength)) - bracket.min) / (bracket.max - bracket.min);
  const bracketValue = bracket.minCap + t * (bracket.maxCap - bracket.minCap);
  const ageMult = getAgeValueMultiplier(player.age ?? 27);
  const value = Math.min(bracketValue * ageMult, bracket.maxCap);
  return Math.max(0.1, Math.round(value * 10) / 10);
}

// Registra un trasferimento nella carriera del giocatore
// toTeamName = null → giocatore svincolato (chiude solo l'entrata corrente)
function recordTransfer(player, toTeamName, fee) {
  if (!player.career) player.career = [];
  const last = player.career[player.career.length - 1];
  if (last && last.left === null) last.left = seasonCount;
  if (toTeamName) {
    player.career.push({ team: toTeamName, joined: seasonCount, left: null, fee: fee ?? null });
  }
}

// ─── SISTEMA CONTRATTI ────────────────────────────────────────────────────────

// Stipendio base visualizzato (k€/mese) — coerente con i dati UI
function getDisplaySalary(strength) {
  return Math.max(1, Math.round(strength * strength / 100));
}

// ─── PRESIDENTE E MONTE INGAGGI ───────────────────────────────────────────────

// Monte ingaggi complessivo della rosa attuale (k€/mese)
function getTeamWageBill(team) {
  return (team.roster || []).reduce((s, p) => s + (p.contract?.salary ?? getDisplaySalary(p.strength)), 0);
}

// true se l'operazione (aggiunta di addSalary, eventuale rimozione di removeSalary
// per un rinnovo) resta dentro il monte ingaggi fissato dal presidente.
// Se il tetto non è ancora stato fissato (prima stagione), non blocca nulla.
function wageCapAllows(team, addSalary, removeSalary) {
  if (!Number.isFinite(team.wageBudgetCap)) return true;
  return getTeamWageBill(team) - (removeSalary || 0) + addSalary <= team.wageBudgetCap;
}

function getPresidentPersonalityLabel(president) {
  const { generosity, patience } = president.personality;
  const genLabel = generosity >= 65 ? 'facoltoso' : generosity <= 35 ? 'parsimonioso' : 'equilibrato';
  const patLabel = patience >= 65 ? 'paziente' : patience <= 35 ? 'impulsivo' : 'ragionevole';
  return `${genLabel} e ${patLabel}`;
}

// Il presidente fissa monte ingaggi e un'iniezione di budget trasferimenti per
// la nuova stagione, in base alla propria generosità e al livello del club.
function briefPresidentBudget(team) {
  const currentWageBill = getTeamWageBill(team);
  const gen = team.president.personality.generosity;
  const leagueBase = team.leagueLevel === 'A' ? 1.35 : team.leagueLevel === 'B' ? 1.25 : 1.15;
  const genFactor = leagueBase + (gen - 50) / 100 * 0.3;
  team.wageBudgetCap = Math.max(currentWageBill, Math.round(currentWageBill * genFactor));

  const transferBonusScale = team.leagueLevel === 'A' ? 15 : team.leagueLevel === 'B' ? 6 : 2;
  const transferBonus = Math.round((gen / 100) * transferBonusScale * 10) / 10;
  team.budget = Math.round((team.budget + transferBonus) * 10) / 10;
}

function showPresidentBriefingModal(team, onDone) {
  const p = team.president;
  const wageBill = getTeamWageBill(team);
  const overlay = document.createElement('div');
  overlay.className = 'mm-overlay';
  overlay.innerHTML = `
    <div class="mm-box" style="max-width:560px">
      <div class="mm-header">
        <span class="mm-title">📢 Il Presidente — ${team.name}</span>
      </div>
      <div class="mm-content">
        <p><strong>${p.firstName} ${p.lastName}</strong> (${getPresidentPersonalityLabel(p)}) fissa i paletti per la nuova stagione:</p>
        <div class="pc-contract">
          <div class="pc-contract-row"><span>Budget trasferimenti</span><strong>${team.budget.toFixed(1)}M€</strong></div>
          <div class="pc-contract-row"><span>Monte ingaggi</span><strong>${wageBill}k€ / ${team.wageBudgetCap}k€ mese</strong></div>
          <div class="pc-contract-row"><span>Obiettivo</span><strong>${estimateObjectiveLabel(team)}</strong></div>
        </div>
        <p style="font-size:.82rem;color:#666;margin-top:10px">Ogni acquisto o rinnovo che superi il monte ingaggi dovrà attendere un taglio altrove in rosa.</p>
      </div>
      <div class="mm-footer" style="justify-content:flex-end">
        <button class="mm-btn mm-confirm" id="pb-close">Ho capito, si parte →</button>
      </div>
    </div>`;
  overlay.querySelector('#pb-close').addEventListener('click', () => { overlay.remove(); onDone(); });
  document.body.appendChild(overlay);
}

// Durata minima/massima di un nuovo contratto in base a forza ed età: i
// club blindano più a lungo i giocatori più forti (raramente vicini alla
// scadenza) E i giovani di prospettiva, che vengono legati a lungo termine
// puntando sulla crescita futura anche se la forza attuale non è ancora
// da top player (es. un 18enne di forza 70 viene blindato quanto un big).
function getContractDurationRange(strength, age) {
  let [minDur, maxDur] = strength >= 85 ? [3, 5] : strength >= 70 ? [2, 5] : [1, 5];
  if (age <= 18) minDur = Math.max(minDur, 5);
  else if (age <= 20) minDur = Math.max(minDur, 4);
  else if (age <= 23) minDur = Math.max(minDur, 3);
  maxDur = Math.max(maxDur, minDur);
  return [minDur, maxDur];
}

// Crea un contratto per un nuovo giocatore
function createContract(strength, age) {
  const salary = getDisplaySalary(strength);
  const hasClause = Math.random() < 0.40;
  const releaseClause = hasClause
    ? Math.round(getTransferValue({ strength, age }) * (2.5 + Math.random() * 2) * 10) / 10
    : null;
  const [minDur, maxDur] = getContractDurationRange(strength, age);
  return {
    duration: minDur + Math.floor(Math.random() * (maxDur - minDur + 1)),
    salary,
    releaseClause,                                              // null = nessuna clausola
    bonusPromotion: Math.round(salary * (0.5 + Math.random())), // 0.5-1.5 mesi
    bonusTitle: Math.round(salary * (1.0 + Math.random() * 2)), // 1-3 mesi
  };
}

// Personalità nascosta — influenza rinnovi, preferenze e scelte di carriera
function createPersonality() {
  return {
    ambition: Math.floor(Math.random() * 101), // 0-100: vuole club grandi/importanti
    loyalty: Math.floor(Math.random() * 101), // 0-100: vuole restare alla squadra
    greed: Math.floor(Math.random() * 101), // 0-100: priorità allo stipendio
  };
}

// Tenta il rinnovo contratto. Restituisce true se firmato
function tryRenewContract(player, team) {
  if (!player.personality) player.personality = createPersonality();
  const { ambition, loyalty, greed } = player.personality;
  const prestige = getTeamPrestige(team.name);

  // Stipendio richiesto: mercato attuale + premio greed (0-40% extra)
  const marketSalary = getDisplaySalary(player.strength);
  const demandedSalary = Math.round(marketSalary * (1.0 + greed * 0.004));

  // Vuole restare? I veterani (>32) sono più stabili; squadre blasonante trattengono i talenti
  const ageBonus = Math.max(0, (player.age - 32) * 3);
  const stayScore = loyalty * 0.55 + prestige - ambition * 0.25 + ageBonus + Math.random() * 25;
  if (stayScore <= 20) {
    const reason = ambition > 65 ? 'cerca una sfida più ambiziosa' : 'vuole un nuovo progetto';
    transferLog.push(`📋 <em>${player.firstName} ${player.lastName}</em> rifiuta il rinnovo con <strong>${team.name}</strong> (${reason})`);
    return false;
  }

  // La squadra può permettersi il rinnovo?
  if (team.budget < 5 && demandedSalary > (player.contract?.salary || 0) * 1.05) {
    transferLog.push(`📋 <strong>${team.name}</strong> non può rinnovare <em>${player.firstName} ${player.lastName}</em> (${demandedSalary}k€/mese — budget insufficiente)`);
    return false;
  }

  // Firma rinnovo
  if (!player.contract) player.contract = createContract(player.strength, player.age);
  player.contract.salary = demandedSalary;
  player.contract.duration = 2 + Math.floor(Math.random() * 3); // 2-4 anni
  if (player.contract.releaseClause) {
    player.contract.releaseClause = Math.round(
      getTransferValue(player) * (2.5 + Math.random() * 2) * 10) / 10;
  }
  const clauseStr = player.contract.releaseClause ? `, clausola ${player.contract.releaseClause}M€` : '';
  transferLog.push(`📋 <em>${player.firstName} ${player.lastName}</em> rinnova con <strong>${team.name}</strong> — ${player.contract.duration} anni, ${demandedSalary}k€/mese${clauseStr}`);
  return true;
}

// Blasone: prestige storico della squadra (titoli Serie A + bonus lega attuale)
function getTeamPrestige(teamName) {
  const titles = championsHistory.filter(h => h.serieA === teamName).length;
  const team = [...serieA, ...serieB, ...serieC].find(t => t.name === teamName);
  const leagueBonus = team?.leagueLevel === 'A' ? 4 : team?.leagueLevel === 'B' ? 1 : 0;
  return titles * 2 + leagueBonus;
}

// Assegna la forza alle squadre in base alla lega di appartenenza
function assignLeagueStrengths(league, minStr, maxStr, minBud, maxBud) {
  const rangeStr = maxStr - minStr;
  const rangeBud = maxBud - minBud;
  const numTeams = league.length;
  league.forEach((team, index) => {
    // Distribuzione lineare della forza in base alla posizione iniziale nell'array
    const strength = maxStr - Math.round((index / (numTeams - 1)) * rangeStr);
    team.strength = Math.max(minStr, Math.min(maxStr, strength));

    // Distribuzione del budget (le squadre più forti partono con più budget)
    const budget = maxBud - Math.round((index / (numTeams - 1)) * rangeBud);
    team.budget = budget;
    team.seasonsInA = 0;
    team.seasonsInB = 0;
    team.seasonsInC = 0;
  });
}

// Assegna le forze iniziali
assignLeagueStrengths(serieA, 70, 90, 80, 150); // Serie A: 80M - 150M
assignLeagueStrengths(serieB, 45, 65, 20, 60);  // Serie B: 20M - 60M
assignLeagueStrengths(serieC, 20, 45, 5, 15);   // Serie C: 5M - 15M

// Genera le rose iniziali e ricalcola la forza squadra da media giocatori
[...serieA, ...serieB, ...serieC].forEach(team => {
  generateTeamRoster(team);
  recalculateTeamStrength(team);
});

// Assegna livello lega, allenatore, DS e presidente iniziali a ogni squadra
serieA.forEach(t => { t.leagueLevel = 'A'; t.coach = createCoach(t); t.ds = createDirector(t); t.president = createPresident(t); });
serieB.forEach(t => { t.leagueLevel = 'B'; t.coach = createCoach(t); t.ds = createDirector(t); t.president = createPresident(t); });
serieC.forEach(t => { t.leagueLevel = 'C'; t.coach = createCoach(t); t.ds = createDirector(t); t.president = createPresident(t); });

function generateRoundRobin(teams) {
  if (teams.length % 2 !== 0) {
    teams.push({ name: 'Day off' });
  }

  const numDays = teams.length - 1;
  const halfSize = teams.length / 2;
  const teamsCopy = [...teams];

  teamsCopy.splice(0, 0, teamsCopy.pop());

  const rounds = [];
  for (let day = 0; day < numDays; day++) {
    const round = [];
    for (let i = 0; i < halfSize; i++) {
      // Alterna casa e fuori casa ogni turno
      if (day % 2 === 0) {
        round.push({ team1: teamsCopy[i], team2: teamsCopy[teamsCopy.length - i - 1] });
      } else {
        round.push({ team1: teamsCopy[teamsCopy.length - i - 1], team2: teamsCopy[i] });
      }
    }
    teamsCopy.splice(1, 0, teamsCopy.pop());
    rounds.push(round);
  }

  return rounds;
}

let standingsA = {};
let standingsB = {};
let standingsC = {};

function calculatePoints(match) {
  if (match.team1Goals > match.team2Goals) {
    return { team1Points: 3, team2Points: 0 };
  } else if (match.team1Goals < match.team2Goals) {
    return { team1Points: 0, team2Points: 3 };
  } else {
    return { team1Points: 1, team2Points: 1 };
  }
}

function updateStandings(standings, match, result, points) {
  // Inizializza le statistiche per le squadre se non esistono
  [match.team1, match.team2].forEach(team => {
    if (!standings[team.name]) {
      standings[team.name] = {
        points: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0,
        strength: team.strength, // Add strength on initialization
        colors: team.colors, // Aggiungiamo i colori
        budget: team.budget, // Aggiungiamo il budget corrente
        magnate: team.magnate, // Aggiungiamo flag magnate
        financialCrisis: team.financialCrisis // Aggiungiamo flag crisi
      };
    }
  });

  // Aggiorna i dati della squadra
  standings[match.team1.name].points += points.team1Points;
  standings[match.team2.name].points += points.team2Points;

  standings[match.team1.name].goalsFor += result.team1Goals;
  standings[match.team2.name].goalsFor += result.team2Goals;

  standings[match.team1.name].goalsAgainst += result.team2Goals;
  standings[match.team2.name].goalsAgainst += result.team1Goals;

  if (points.team1Points === 3) {
    standings[match.team1.name].wins++;
    standings[match.team2.name].losses++;
  } else if (points.team2Points === 3) {
    standings[match.team2.name].wins++;
    standings[match.team1.name].losses++;
  } else {
    standings[match.team1.name].draws++;
    standings[match.team2.name].draws++;
  }
}

// Funzione per simulare le partite (senza visualizzarle)
function simulateOneRound(round, standings) {
  round.forEach(match => {
    const result = generateMatchResult(match.team1, match.team2);
    const points = calculatePoints(result);
    match.result = result;
    updateStandings(standings, match, result, points);
  });
}

function simulateMatches(rounds, standings) {
  rounds.forEach(round => simulateOneRound(round, standings));
}

// ── CLASSIFICA MARCATORI / ASSIST ────────────────────────────────────────────
function displayTopScorers(containerId, teams) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const existing = document.getElementById('top-scorers-' + containerId);
  if (existing) existing.remove();

  const allPlayers = teams.flatMap(t =>
    (t.roster || []).map(p => ({ player: p, teamName: t.name }))
  );

  const topScorers = allPlayers
    .filter(({ player: p }) => (p.seasonGoals || 0) > 0)
    .sort((a, b) => (b.player.seasonGoals || 0) - (a.player.seasonGoals || 0))
    .slice(0, 10);

  const topAssists = allPlayers
    .filter(({ player: p }) => (p.seasonAssists || 0) > 0)
    .sort((a, b) => (b.player.seasonAssists || 0) - (a.player.seasonAssists || 0))
    .slice(0, 5);

  if (!topScorers.length) return;

  const scorerRows = topScorers.map(({ player: p, teamName }, i) =>
    `<tr>
      <td style="color:#999;font-size:.8rem">${i + 1}</td>
      <td>${p.firstName} ${p.lastName}</td>
      <td style="color:#666;font-size:.82rem">${teamName}</td>
      <td style="text-align:center"><strong>${p.seasonGoals}</strong></td>
    </tr>`
  ).join('');

  const assistRows = topAssists.map(({ player: p, teamName }, i) =>
    `<tr>
      <td style="color:#999;font-size:.8rem">${i + 1}</td>
      <td>${p.firstName} ${p.lastName}</td>
      <td style="color:#666;font-size:.82rem">${teamName}</td>
      <td style="text-align:center"><strong>${p.seasonAssists}</strong></td>
    </tr>`
  ).join('');

  const div = document.createElement('div');
  div.id = 'top-scorers-' + containerId;
  div.className = 'top-scorers-section';
  div.innerHTML = `
    <details>
      <summary class="ts-summary">⚽ Classifica Marcatori &amp; Assist</summary>
      <div class="ts-grid">
        <div>
          <table class="ts-table">
            <thead><tr><th>#</th><th>Marcatore</th><th>Squadra</th><th>Gol</th></tr></thead>
            <tbody>${scorerRows}</tbody>
          </table>
        </div>
        <div>
          <table class="ts-table">
            <thead><tr><th>#</th><th>Assistman</th><th>Squadra</th><th>Ass</th></tr></thead>
            <tbody>${assistRows || '<tr><td colspan="4" style="text-align:center;color:#999">—</td></tr>'}</tbody>
          </table>
        </div>
      </div>
    </details>`;
  container.appendChild(div);
}

// ── MODAL DETTAGLIO PARTITA ───────────────────────────────────────────────────
function showMatchDetailModal(match) {
  const r = match.result;
  if (!r) return;
  const overlay = document.createElement('div');
  overlay.className = 'mm-overlay';

  const fm1 = match.team1.coach?.formation || '?';
  const fm2 = match.team2.coach?.formation || '?';

  const roleLabel = { POR: 'P', DIF: 'D', CEN: 'C', ATT: 'A' };

  const lineupRows = (lineup) => (lineup || []).map(({ player: p, inPosition }) =>
    `<div class="md-player-row${inPosition ? '' : ' md-oop'}">
      <span class="md-role-badge role-${p.role}">${roleLabel[p.role] || p.role}</span>
      <span>${p.firstName} ${p.lastName}${inPosition ? '' : ' <span class="md-oop-tag">↔</span>'}${p.role !== 'POR' ? ` <span style="font-size:.7rem;color:#999">(${formatSubRoles(p)})</span>` : ''}</span>
      <span class="md-ovr">${p.strength}</span>
      ${(p.injuryMatchesLeft || 0) > 0 ? '<span class="md-status-tag md-injured">🤕</span>' : ''}
    </div>`
  ).join('');

  const eventsHtml = (r.events || []).map(e => {
    if (e.type === 'goal') {
      const side = e.team === 1 ? match.team1.name : match.team2.name;
      const assistStr = e.assist ? ` <span class="md-assist">ass. ${e.assist.lastName}</span>` : '';
      return `<div class="md-event"><span class="md-min">${e.minute}'</span> ⚽ <strong>${e.scorer.lastName}</strong>${assistStr} <em class="md-team-tag">${side}</em></div>`;
    }
    if (e.type === 'yellow') {
      const side = e.team === 1 ? match.team1.name : match.team2.name;
      const susp = (e.player.yellowCards % 3 === 0) ? ' <span class="md-susp-tag">SQUALIFICATO</span>' : '';
      return `<div class="md-event"><span class="md-min">${e.minute}'</span> 🟨 ${e.player.lastName}${susp} <em class="md-team-tag">${side}</em></div>`;
    }
    if (e.type === 'red') {
      const side = e.team === 1 ? match.team1.name : match.team2.name;
      return `<div class="md-event"><span class="md-min">${e.minute}'</span> 🟥 <strong>${e.player.lastName}</strong> <span class="md-susp-tag">ESPULSO · 1 giornata</span> <em class="md-team-tag">${side}</em></div>`;
    }
    return '';
  }).join('');

  // Le partite ripristinate da un salvataggio non hanno lineup/eventi:
  // mostra solo punteggio e marcatori
  const hasDetails = !!(r.lineup1 && r.lineup1.length);
  const scorersFallback = () => {
    const line = (list, teamName) => (list || []).map(p =>
      `<div class="md-event">⚽ <strong>${p.lastName}</strong> <em class="md-team-tag">${teamName}</em></div>`
    ).join('');
    return line(r.scorers1, match.team1.name) + line(r.scorers2, match.team2.name);
  };

  const lineupsHtml = hasDetails ? `
      <div class="md-lineups">
        <div class="md-lineup-col">
          <div class="md-lineup-header">${match.team1.name}</div>
          ${lineupRows(r.lineup1)}
        </div>
        <div class="md-lineup-col">
          <div class="md-lineup-header md-right">${match.team2.name}</div>
          ${lineupRows(r.lineup2)}
        </div>
      </div>` : '';
  const eventsInner = hasDetails
    ? (eventsHtml || '<p class="md-no-events">Nessun evento registrato.</p>')
    : (scorersFallback() || '<p class="md-no-events">Dettagli non disponibili per le partite salvate.</p>');

  overlay.innerHTML = `
    <div class="mm-box md-box">
      <div class="md-score-header">
        <span class="md-team-name">${match.team1.name}</span>
        <span class="md-score">${r.team1Goals}–${r.team2Goals}</span>
        <span class="md-team-name md-team-right">${match.team2.name}</span>
      </div>
      <div class="md-formations">${fm1} &nbsp;vs&nbsp; ${fm2}</div>
      ${lineupsHtml}
      <div class="md-events-section">
        <div class="md-events-title">Cronaca</div>
        ${eventsInner}
      </div>
      <div class="mm-footer">
        <button class="mm-btn mm-confirm" id="md-close">Chiudi</button>
      </div>
    </div>`;

  overlay.querySelector('#md-close').addEventListener('click', () => overlay.remove());
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
  document.body.appendChild(overlay);
}

function displaySingleMatchday(containerId, round, matchdayNumber, phase) {
  const container = document.getElementById(containerId);
  const existingHighlight = document.getElementById('current-matchday-' + containerId);
  if (existingHighlight) existingHighlight.remove();

  const phaseLabel = phase === 'andata' ? 'Andata' : 'Ritorno';
  const div = document.createElement('div');
  div.id = 'current-matchday-' + containerId;
  div.className = 'matchday-highlight';

  let html = `<h3 style="margin:0 0 8px">Giornata ${matchdayNumber} (${phaseLabel})</h3>`;
  const playedMatches = [];
  round.forEach(m => {
    if (m.team1.name === 'Day off' || m.team2.name === 'Day off') return;
    const isMine = playerTeam && (m.team1.name === playerTeam.name || m.team2.name === playerTeam.name);
    const s1 = (m.result.scorers1 || []).map(p => p.lastName).join(', ');
    const s2 = (m.result.scorers2 || []).map(p => p.lastName).join(', ');
    const scorerLine = (s1 || s2)
      ? `<div class="match-scorers"><span>${s1}</span><span></span><span>${s2}</span></div>`
      : '';
    html += `<div class="match-row match-row-clickable${isMine ? ' my-team-match' : ''}" data-match-idx="${playedMatches.length}">
      <span>${m.team1.name}</span>
      <span>${m.result.team1Goals}-${m.result.team2Goals}</span>
      <span>${m.team2.name}</span>
    </div>${scorerLine}`;
    playedMatches.push(m);
  });
  div.innerHTML = html;

  div.querySelectorAll('.match-row-clickable').forEach(row => {
    row.addEventListener('click', () => {
      const idx = +row.dataset.matchIdx;
      if (playedMatches[idx]) showMatchDetailModal(playedMatches[idx]);
    });
  });

  const standings = document.getElementById('classifica-' + containerId);
  if (standings) {
    container.insertBefore(div, standings);
  } else {
    container.appendChild(div);
  }
}

// Nuova funzione per visualizzare il calendario a griglia
function displaySchedule(containerId, roundsAndata, roundsRitorno) {
  const container = document.getElementById(containerId);
  const existingGrid = document.getElementById('calendario-' + containerId);
  if (existingGrid) existingGrid.remove();
  const gridDiv = document.createElement('div');
  gridDiv.className = 'rounds-grid';
  gridDiv.id = 'calendario-' + containerId;

  // Iteriamo solo per il numero di giornate di andata (es. 19)
  roundsAndata.forEach((roundA, i) => {
    const roundR = roundsRitorno[i]; // Giornata di ritorno corrispondente

    const details = document.createElement('details');
    const summary = document.createElement('summary');
    summary.textContent = `Giornata ${i + 1} - ${i + 1 + roundsAndata.length}`;
    details.appendChild(summary);

    // Logica "Accordion": chiude le altre giornate quando se ne apre una
    details.addEventListener('toggle', function () {
      if (this.open) {
        const allDetails = container.querySelectorAll('details');
        allDetails.forEach(d => {
          if (d !== this) d.removeAttribute('open');
        });
      }
    });

    const contentDiv = document.createElement('div');
    contentDiv.className = 'round-content';

    // Helper per generare HTML di una lista di partite
    const generateMatchList = (matches, title) => {
      if (!matches) return '';
      const html = matches.map(m => {
        const isMine = playerTeam && (m.team1.name === playerTeam.name || m.team2.name === playerTeam.name);
        return `<div class="match-row${isMine ? ' my-team-match' : ''}"><span>${m.team1.name}</span> <span>${m.result.team1Goals}-${m.result.team2Goals}</span> <span>${m.team2.name}</span></div>`;
      }).join('');
      return `<div class="round-column"><h4>${title}</h4>${html}</div>`;
    };

    contentDiv.innerHTML = generateMatchList(roundA, 'Andata') + generateMatchList(roundR, 'Ritorno');
    details.appendChild(contentDiv);
    gridDiv.appendChild(details);
  });
  container.appendChild(gridDiv);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function generateReturnRound(rounds) {
  const returnRounds = rounds.map(round => {
    return round.map(match => {
      return { team1: match.team2, team2: match.team1 };
    });
  });
  return returnRounds;
}

// Campionamento dalla distribuzione di Poisson (algoritmo di Knuth)
function poissonRandom(lambda) {
  const L = Math.exp(-lambda);
  let k = 0, p = 1;
  do { k++; p *= Math.random(); } while (p > L);
  return k - 1;
}

function generateMatchResult(team1, team2) {
  let s1 = getEffectiveStrength(team1);
  let s2 = getEffectiveStrength(team2);

  // Fattore sorpresa: 8% di chance per la squadra più debole (diff > 20)
  if (Math.abs(s1 - s2) > 20 && Math.random() < 0.08) {
    const bonus = Math.floor(Math.random() * 25) + 15;
    if (s1 < s2) s1 += bonus; else s2 += bonus;
  }

  // Costruisce le lineup prima (necessario per assegnare le espulsioni)
  const avail1 = filterAvailableRoster(team1.roster || []);
  const avail2 = filterAvailableRoster(team2.roster || []);
  const fm1 = team1.coach?.formation || '4-4-2';
  const fm2 = team2.coach?.formation || '4-4-2';
  const lineup1 = getBest11(avail1.length >= 7 ? avail1 : (team1.roster || []), fm1);
  const lineup2 = getBest11(avail2.length >= 7 ? avail2 : (team2.roster || []), fm2);
  const players1 = lineup1.map(e => e.player);
  const players2 = lineup2.map(e => e.player);

  const events = [];

  // Espulsioni (~1% per giocatore di campo ≈ 10% per squadra per partita)
  // Generate PRIMA dei gol per poter aggiustare i lambda
  let red1Minute = null, red2Minute = null;
  players1.filter(p => p.role !== 'POR').forEach(p => {
    if (red1Minute === null && Math.random() < 0.01) {
      red1Minute = Math.floor(Math.random() * 85) + 5;
      p.suspendedMatchesLeft = (p.suspendedMatchesLeft || 0) + 1;
      events.push({ minute: red1Minute, type: 'red', team: 1, player: p });
    }
  });
  players2.filter(p => p.role !== 'POR').forEach(p => {
    if (red2Minute === null && Math.random() < 0.01) {
      red2Minute = Math.floor(Math.random() * 85) + 5;
      p.suspendedMatchesLeft = (p.suspendedMatchesLeft || 0) + 1;
      events.push({ minute: red2Minute, type: 'red', team: 2, player: p });
    }
  });

  // Sigmoide sulla differenza: ogni punto di forza vale sempre lo stesso,
  // anche in range stretti (es. Serie A 67-85). k=0.07 → diff 11pt ≈ 62% win.
  const ratio1 = 1 / (1 + Math.exp(-(s1 - s2) * 0.07));

  // Gol attesi totali per partita ~2.6; il vantaggio campo vale +0.15 lambda alla squadra di casa
  const totalExpected = 2.6;
  let lambda1 = totalExpected * ratio1 + 0.15;
  let lambda2 = totalExpected * (1 - ratio1);

  // Aggiustamento lambda per le espulsioni:
  // 10 uomini → -25% gol propri, +10% gol avversari
  // L'impatto è proporzionale al tempo rimanente dal minuto dell'espulsione
  if (red1Minute !== null) {
    const rem = (90 - red1Minute) / 90;
    lambda1 *= (1 - 0.25 * rem);
    lambda2 *= (1 + 0.10 * rem);
  }
  if (red2Minute !== null) {
    const rem = (90 - red2Minute) / 90;
    lambda2 *= (1 - 0.25 * rem);
    lambda1 *= (1 + 0.10 * rem);
  }

  let t1Goals = poissonRandom(lambda1);
  let t2Goals = poissonRandom(lambda2);

  const scorers1 = [], scorers2 = [], assists1 = [], assists2 = [];

  // Gol con marcatore e assist
  for (let i = 0; i < t1Goals; i++) {
    const scorer = pickScorer(players1);
    if (scorer) {
      scorer.seasonGoals = (scorer.seasonGoals || 0) + 1;
      const assist = pickAssister(lineup1, scorer);
      if (assist) assist.seasonAssists = (assist.seasonAssists || 0) + 1;
      scorers1.push(scorer);
      assists1.push(assist || null);
      events.push({ minute: Math.floor(Math.random() * 90) + 1, type: 'goal', team: 1, scorer, assist: assist || null });
    }
  }
  for (let i = 0; i < t2Goals; i++) {
    const scorer = pickScorer(players2);
    if (scorer) {
      scorer.seasonGoals = (scorer.seasonGoals || 0) + 1;
      const assist = pickAssister(lineup2, scorer);
      if (assist) assist.seasonAssists = (assist.seasonAssists || 0) + 1;
      scorers2.push(scorer);
      assists2.push(assist || null);
      events.push({ minute: Math.floor(Math.random() * 90) + 1, type: 'goal', team: 2, scorer, assist: assist || null });
    }
  }

  // Ammonizioni (~7% per titolare)
  players1.forEach(p => {
    if (Math.random() < 0.07) {
      p.yellowCards = (p.yellowCards || 0) + 1;
      if (p.yellowCards % 3 === 0) p.suspendedMatchesLeft = (p.suspendedMatchesLeft || 0) + 1;
      events.push({ minute: Math.floor(Math.random() * 90) + 1, type: 'yellow', team: 1, player: p });
    }
  });
  players2.forEach(p => {
    if (Math.random() < 0.07) {
      p.yellowCards = (p.yellowCards || 0) + 1;
      if (p.yellowCards % 3 === 0) p.suspendedMatchesLeft = (p.suspendedMatchesLeft || 0) + 1;
      events.push({ minute: Math.floor(Math.random() * 90) + 1, type: 'yellow', team: 2, player: p });
    }
  });

  // Infortuni (~3% per titolare, 1-4 giornate)
  [...players1, ...players2].forEach(p => {
    if (Math.random() < 0.03) {
      p.injuryMatchesLeft = (p.injuryMatchesLeft || 0) + Math.floor(Math.random() * 4) + 1;
    }
  });

  events.sort((a, b) => a.minute - b.minute);

  return { team1Goals: t1Goals, team2Goals: t2Goals, scorers1, scorers2, assists1, assists2, lineup1, lineup2, events };
}

function simulateCupMatch(team1, team2) {
  const result = generateMatchResult(team1, team2);
  let penalties = false;
  let winner;
  if (result.team1Goals === result.team2Goals) {
    penalties = true;
    winner = Math.random() < 0.5 ? team1 : team2;
  } else {
    winner = result.team1Goals > result.team2Goals ? team1 : team2;
  }
  return { team1Goals: result.team1Goals, team2Goals: result.team2Goals, winner, penalties };
}

function simulateCoppaItalia(serieA, serieB) {
  const topB = [...serieB].sort((a, b) => b.strength - a.strength).slice(0, 12);
  let bracket = [...serieA, ...topB];
  shuffleArray(bracket);
  const roundNames = ['Sedicesimi di Finale', 'Ottavi di Finale', 'Quarti di Finale', 'Semifinali', 'Finale'];
  const rounds = [];
  while (bracket.length > 1) {
    const matches = [];
    const next = [];
    for (let i = 0; i < bracket.length; i += 2) {
      const m = simulateCupMatch(bracket[i], bracket[i + 1]);
      matches.push({ home: bracket[i], away: bracket[i + 1], ...m });
      next.push(m.winner);
    }
    rounds.push(matches);
    bracket = next;
  }
  return { winner: bracket[0], rounds, roundNames };
}

function displayStandings(containerId, standingsData, halfSeason = false) {
  const container = document.getElementById(containerId);
  // Rimuovi classifica precedente se esiste (evita duplicati tra andata e ritorno)
  const existing = document.getElementById(`classifica-${containerId}`);
  if (existing) existing.remove();
  const standingsDiv = document.createElement('div');
  standingsDiv.innerHTML = `<h2>Classifica${halfSeason ? ' <em style="font-size:.75em;opacity:.6">(dopo l\'andata)</em>' : ''}</h2>`;
  standingsDiv.id = `classifica-${containerId}`;

  // Converti l'oggetto in un array di oggetti, includendo il nome della squadra
  const standingsArray = Object.entries(standingsData).map(([name, stats]) => ({ name, ...stats }));

  // Ordina l'array in base ai punti
  standingsArray.sort((a, b) => b.points - a.points);

  // Creazione della tabella
  const table = document.createElement('table');
  table.innerHTML = '<tr><th>Squadra</th><th>Punti</th><th>V</th><th>P</th><th>S</th><th>GF</th><th>GS</th><th>Budget</th></tr>';

  standingsArray.forEach((team, index) => {
    const row = table.insertRow();

    // Crea l'icona della maglietta
    let jerseyIconHtml = '';
    if (team.colors && team.colors.length > 0) {
      // Usa un gradiente per due colori, o un colore solido se ce n'è uno solo
      const backgroundStyle = `background: linear-gradient(90deg, ${team.colors[0]} 50%, ${team.colors[1] || team.colors[0]} 50%);`;
      jerseyIconHtml = `<span class="jersey-icon" style="${backgroundStyle}"></span>`;
    }

    // Crea il contenuto della cella della squadra con l'icona
    const magnateIcon = team.magnate ? ' ⭐' : '';
    const crisisIcon = team.financialCrisis ? ' 💸' : '';
    const teamNameClickable = `<span class="team-name-clickable" data-team-name="${team.name}">${team.name}</span>`;
    const teamCellContent = `
      <div class="team-cell-content">
        ${jerseyIconHtml}<span>${teamNameClickable}${magnateIcon}${crisisIcon} (${team.strength})</span>
      </div>`;

    // Logica colori: Prime 4 verdi, Ultime 4 rosse
    if (index < 4) {
      row.classList.add('promotion-zone');
    } else if (index >= standingsArray.length - 4) {
      row.classList.add('relegation-zone');
    }

    row.innerHTML = `<td>${teamCellContent}</td><td>${team.points}</td><td>${team.wins || 0}</td><td>${team.draws || 0}</td><td>${team.losses || 0}</td><td>${team.goalsFor || 0}</td><td>${team.goalsAgainst || 0}</td><td>${team.budget ? team.budget.toFixed(1) + 'M€' : '-'}</td>`;
  });

  standingsDiv.appendChild(table);
  container.appendChild(standingsDiv);

  // Aggiunge gli event listener per il popup dei dettagli squadra
  standingsDiv.querySelectorAll('.team-name-clickable').forEach(el => {
    el.addEventListener('click', (e) => {
      const teamName = e.currentTarget.dataset.teamName;
      showTeamDetailsModal(teamName);
    });
  });
}

// Classifica pre-stagionale: squadre ordinate per forza, con obiettivo
function displayPreSeasonStandings(containerId, teams) {
  const container = document.getElementById(containerId);
  const existing = document.getElementById(`classifica-${containerId}`);
  if (existing) existing.remove();
  const div = document.createElement('div');
  div.id = `classifica-${containerId}`;
  div.innerHTML = `<h2>Previsioni <em style="font-size:.75em;opacity:.6">(pre-stagione)</em></h2>`;

  const sorted = [...teams].sort((a, b) => (b.strength || 0) - (a.strength || 0));
  const table = document.createElement('table');
  table.innerHTML = '<tr><th>#</th><th>Squadra</th><th>Forza</th><th>Obiettivo</th></tr>';

  sorted.forEach((team, idx) => {
    const [c1, c2] = team.colors || ['#888', '#aaa'];
    const jersey = `<span class="jersey-icon" style="background:linear-gradient(90deg,${c1} 50%,${c2} 50%)"></span>`;
    const magnate = team.magnate ? ' ⭐' : '';
    const nameLink = `<span class="team-name-clickable" data-team-name="${team.name}">${team.name}</span>`;
    const obj = team.objective?.description || '—';
    const row = table.insertRow();
    if (idx < 4) row.classList.add('promotion-zone');
    else if (idx >= sorted.length - 4) row.classList.add('relegation-zone');
    row.innerHTML = `<td>${idx + 1}</td><td><div class="team-cell-content">${jersey}<span>${nameLink}${magnate}</span></div></td><td>${team.strength || '?'}</td><td>${obj}</td>`;
  });

  div.appendChild(table);
  container.appendChild(div);

  div.querySelectorAll('.team-name-clickable').forEach(el => {
    el.addEventListener('click', e => showTeamDetailsModal(e.currentTarget.dataset.teamName));
  });
}

// Funzione per trovare il vincitore di una lega
function getWinner(standings) {
  return Object.entries(standings)
    .map(([name, stats]) => ({ name, ...stats }))
    .sort((a, b) => b.points - a.points)[0];
}

// Funzione per visualizzare l'Albo d'oro
function displayHistory() {
  let container = document.getElementById('history-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'history-container';
    document.body.appendChild(container);
  }

  let html = '<h2>Albo d\'oro</h2><table><tr><th>Stagione</th><th>Serie A</th><th>Serie B</th><th>Serie C</th><th>Coppa Italia</th></tr>';

  // Mostriamo lo storico dall'ultimo al primo (reverse)
  championsHistory.slice().reverse().forEach(season => {
    const createCell = (team) => {
      let jerseyIconHtml = '';
      if (team.colors && team.colors.length > 0) {
        const backgroundStyle = `background: linear-gradient(90deg, ${team.colors[0]} 50%, ${team.colors[1] || team.colors[0]} 50%);`;
        jerseyIconHtml = `<span class="jersey-icon" style="${backgroundStyle}"></span>`;
      }
      return `<div class="team-cell-content">${jerseyIconHtml}<span>${team.name} (${team.points} pt)</span></div>`;
    };

    html += `<tr><td>Stagione ${season.season}</td><td>${createCell(season.serieA)}</td><td>${createCell(season.serieB)}</td><td>${createCell(season.serieC)}</td><td>${season.coppaItalia || '—'}</td></tr>`;
  });
  html += '</table>';
  container.innerHTML = html;
}

function displayHallOfFame() {
  let container = document.getElementById('hall-of-fame-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'hall-of-fame-container';
    // Inserisce il nuovo contenitore dopo quello dello storico, se esiste
    const historyContainer = document.getElementById('history-container');
    if (historyContainer) {
      historyContainer.insertAdjacentElement('afterend', container);
    } else {
      document.body.appendChild(container);
    }
  }

  if (championsHistory.length === 0) {
    container.innerHTML = ''; // Non mostrare nulla se non c'è storico
    return;
  }

  const winsA = {};
  const winsB = {};
  const winsC = {};

  championsHistory.forEach(season => {
    // Funzione helper per contare le vittorie
    const countWin = (winMap, winner) => {
      if (!winMap[winner.name]) {
        // Salva una copia dei dati essenziali della squadra
        winMap[winner.name] = { count: 0, team: { name: winner.name, colors: winner.colors } };
      }
      winMap[winner.name].count++;
    };
    countWin(winsA, season.serieA);
    countWin(winsB, season.serieB);
    countWin(winsC, season.serieC);
  });

  const generateHoFTableHTML = (title, winMap) => {
    const sortedWinners = Object.values(winMap).sort((a, b) => b.count - a.count);

    let tableRows = sortedWinners.map((entry, index) => {
      let jerseyIconHtml = '';
      const team = entry.team;
      if (team.colors && team.colors.length > 0) {
        const backgroundStyle = `background: linear-gradient(90deg, ${team.colors[0]} 50%, ${team.colors[1] || team.colors[0]} 50%);`;
        jerseyIconHtml = `<span class="jersey-icon" style="${backgroundStyle}"></span>`;
      }
      const teamCellContent = `<div class="team-cell-content">${jerseyIconHtml}<span>${team.name}</span></div>`;

      return `<tr><td>${index + 1}</td><td>${teamCellContent}</td><td>${entry.count}</td></tr>`;
    }).join('');

    return `<div class="hof-table"><h3>${title}</h3><table><thead><tr><th>#</th><th>Squadra</th><th>Titoli</th></tr></thead><tbody>${tableRows}</tbody></table></div>`;
  };

  const htmlA = generateHoFTableHTML("Albo d'oro Serie A", winsA);
  const htmlB = generateHoFTableHTML("Albo d'oro Serie B", winsB);
  const htmlC = generateHoFTableHTML("Albo d'oro Serie C", winsC);

  const winsCoppa = {};
  championsHistory.forEach(season => {
    if (season.coppaItalia) {
      const name = season.coppaItalia;
      if (!winsCoppa[name]) {
        const team = [...serieA, ...serieB, ...serieC].find(t => t.name === name);
        winsCoppa[name] = { count: 0, team: { name, colors: team ? team.colors : [] } };
      }
      winsCoppa[name].count++;
    }
  });
  const htmlCoppa = generateHoFTableHTML('Albo d\'oro Coppa Italia', winsCoppa);

  container.innerHTML = `<h2>Classifica Titoli Vinti</h2><div class="hof-grid">${htmlA}${htmlB}${htmlC}${htmlCoppa}</div>`;
}

/**
 * Crea e aggiunge al DOM il modal per i dettagli della squadra (inizialmente nascosto).
 */
function createTeamDetailsModal() {
  const modalOverlay = document.createElement('div');
  modalOverlay.id = 'team-details-modal';
  modalOverlay.className = 'modal-overlay';
  modalOverlay.style.display = 'none';

  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';

  const closeModal = document.createElement('span');
  closeModal.className = 'modal-close';
  closeModal.innerHTML = '&times;';
  closeModal.onclick = () => modalOverlay.style.display = 'none';

  const modalBody = document.createElement('div');
  modalBody.id = 'modal-body';

  modalContent.appendChild(closeModal);
  modalContent.appendChild(modalBody);
  modalOverlay.appendChild(modalContent);

  // Chiude il modal se si clicca sullo sfondo
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.style.display = 'none';
    }
  });

  document.body.appendChild(modalOverlay);
}

/**
 * Mostra il modal con le statistiche storiche della squadra selezionata.
 * @param {string} teamName - Il nome della squadra.
 */
function showTeamDetailsModal(teamName) {
  const allLeagues = [...serieA, ...serieB, ...serieC];
  const team = allLeagues.find(t => t.name === teamName);

  if (!team) return;

  // Calcola i titoli vinti
  const titlesA = championsHistory.filter(s => s.serieA.name === teamName).length;
  const titlesB = championsHistory.filter(s => s.serieB.name === teamName).length;
  const titlesC = championsHistory.filter(s => s.serieC.name === teamName).length;

  // Genera la tabella rosa giocatori
  const roleOrder = { POR: 0, DIF: 1, CEN: 2, ATT: 3 };
  const sortedRoster = [...(team.roster || [])].sort((a, b) => roleOrder[a.role] - roleOrder[b.role]);
  const rosterRows = sortedRoster.map(p => {
    const salary = getPlayerSalaryDisplay(p.strength);
    const durVal = p.contract?.duration;
    const dur = !durVal || durVal <= 0 ? '⚠️ scad.' : `${durVal}a`;
    return `<tr class="db-row-clickable" data-player-id="${p.id}"><td><span class="player-name-link">${p.firstName} ${p.lastName}</span></td><td>${p.role}</td><td style="font-size:.82rem;color:#666">${formatSubRoles(p)}</td><td>${p.age}</td><td><strong>${p.strength}</strong></td><td>${salary}k€/mese</td><td>${dur}</td></tr>`;
  }).join('');

  // Piazzamento tattico corrente: quanti dei 10 di movimento sono nel sottoruolo giusto per il modulo
  let tacticalFitHtml = '';
  if (team.coach && team.roster && team.roster.length) {
    const formationName = team.coach.formation || '4-4-2';
    const best11 = getBest11(team.roster, formationName);
    const correct = countCorrectSubRolePlacements(best11, formationName);
    const bonus = getTacticalSubRoleBonus(best11, formationName);
    tacticalFitHtml = ` — Piazzamento tattico: <strong>${correct}/10</strong> (+${bonus.toFixed(1)} forza)`
      + `<br><span style="font-size:.8rem;color:#666">Posizioni richieste dal ${formationName}: ${formatFormationRequirements(formationName)}</span>`;
  }

  const modalBody = document.getElementById('modal-body');
  modalBody.innerHTML = `
      <h3>${team.name} - Palmarès e Storico</h3>
      <h4>Titoli Vinti</h4>
      <ul>
          <li>Serie A: <strong>${titlesA}</strong></li>
          <li>Serie B: <strong>${titlesB}</strong></li>
          <li>Serie C: <strong>${titlesC}</strong></li>
      </ul>
      <h4>Permanenza nelle Leghe</h4>
      <ul>
          <li>Stagioni in Serie A: <strong>${team.seasonsInA || 0}</strong></li>
          <li>Stagioni in Serie B: <strong>${team.seasonsInB || 0}</strong></li>
          <li>Stagioni in Serie C: <strong>${team.seasonsInC || 0}</strong></li>
      </ul>
      <h4>Staff Tecnico</h4>
      <p><strong>Allenatore:</strong> ${team.coach
      ? `${team.coach.firstName} ${team.coach.lastName} — Età: ${team.coach.age} — Forza: <strong>${team.coach.strength}</strong> — Modulo: <strong>${team.coach.formation || '?'}</strong>${team.objective ? ` — Obiettivo: ${team.objective.description}` : ''}${tacticalFitHtml}`
      : `<em>Nessuno</em>`}</p>
      <p><strong>Direttore Sportivo:</strong> ${team.ds
      ? `${team.ds.firstName} ${team.ds.lastName} — Età: ${team.ds.age} — Forza: <strong>${team.ds.strength}</strong>`
      : `<em>Nessuno</em>`}</p>
      <p><strong>Presidente:</strong> ${team.president
      ? `${team.president.firstName} ${team.president.lastName} — ${getPresidentPersonalityLabel(team.president)}${Number.isFinite(team.wageBudgetCap) ? ` — Monte ingaggi: <strong>${getTeamWageBill(team)}/${team.wageBudgetCap}</strong>k€/mese` : ''}`
      : `<em>Nessuno</em>`}</p>
      <h4>Rosa (${sortedRoster.length} giocatori)</h4>
      <table>
        <thead><tr><th>Nome</th><th>Ruolo</th><th>Posizione</th><th>Età</th><th>Forza</th><th>Stipendio</th><th>Contratto</th></tr></thead>
        <tbody>${rosterRows}</tbody>
      </table>`;

  document.getElementById('team-details-modal').style.display = 'flex';

  // Rendi le righe della rosa clickable per aprire la scheda giocatore
  modalBody.querySelectorAll('tr[data-player-id]').forEach(tr => {
    tr.addEventListener('click', () => {
      const p = findPlayerById(+tr.dataset.playerId);
      if (p) openPlayerCard(p);
    });
  });
}

// ─── DATABASE GLOBALE ─────────────────────────────────────────────────────────

function createDatabaseModal() {
  const overlay = document.createElement('div');
  overlay.id = 'database-modal';
  overlay.className = 'modal-overlay';
  overlay.style.display = 'none';
  overlay.innerHTML = `
    <div class="modal-content database-modal-content">
      <span class="modal-close" id="db-modal-close">&times;</span>
      <h2>Database</h2>
      <div class="db-tabs">
        <button class="db-tab active" data-type="players">Giocatori</button>
        <button class="db-tab" data-type="coaches">Allenatori</button>
        <button class="db-tab" data-type="directors">Direttori Sportivi</button>
      </div>
      <div class="db-filters">
        <select id="db-league"><option value="">Tutte le leghe</option><option value="A">Serie A</option><option value="B">Serie B</option><option value="C">Serie C</option><option value="free">Svincolati/Liberi</option></select>
        <select id="db-role"><option value="">Tutti i ruoli</option><option value="POR">POR</option><option value="DIF">DIF</option><option value="CEN">CEN</option><option value="ATT">ATT</option></select>
        <select id="db-sort"><option value="strength-desc">Forza ↓</option><option value="strength-asc">Forza ↑</option><option value="age-asc">Età ↑</option><option value="age-desc">Età ↓</option><option value="name-asc">Nome A→Z</option></select>
        <input type="text" id="db-search" placeholder="🔍 Cerca nome...">
      </div>
      <div id="db-table-container"></div>
    </div>`;
  document.body.appendChild(overlay);

  overlay.querySelector('#db-modal-close').addEventListener('click', () => { overlay.style.display = 'none'; });
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.style.display = 'none'; });

  overlay.querySelectorAll('.db-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      overlay.querySelectorAll('.db-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('db-role').style.display = tab.dataset.type === 'players' ? '' : 'none';
      renderDatabaseTable(tab.dataset.type);
    });
  });

  ['db-league', 'db-role', 'db-sort', 'db-search'].forEach(id => {
    document.getElementById(id).addEventListener('input', () => {
      const active = overlay.querySelector('.db-tab.active').dataset.type;
      renderDatabaseTable(active);
    });
  });
}

function renderDatabaseTable(type) {
  const leagueFilter = document.getElementById('db-league').value;
  const roleFilter = document.getElementById('db-role').value;
  const sortBy = document.getElementById('db-sort').value;
  const search = document.getElementById('db-search').value.toLowerCase();

  const allTeams = [...serieA, ...serieB, ...serieC];
  const teamMeta = {};
  serieA.forEach(t => teamMeta[t.name] = { league: 'A', colors: t.colors });
  serieB.forEach(t => teamMeta[t.name] = { league: 'B', colors: t.colors });
  serieC.forEach(t => teamMeta[t.name] = { league: 'C', colors: t.colors });

  let rows = [];

  if (type === 'players') {
    allTeams.forEach(team => {
      (team.roster || []).forEach(p => rows.push({
        name: `${p.firstName} ${p.lastName}`, role: p.role, age: p.age,
        strength: p.strength, team: team.name, league: teamMeta[team.name]?.league || '?', player: p
      }));
    });
    freeAgents.forEach(p => rows.push({
      name: `${p.firstName} ${p.lastName}`, role: p.role, age: p.age,
      strength: p.strength, team: 'Svincolato', league: 'free', player: p
    }));
  } else if (type === 'coaches') {
    allTeams.forEach(team => {
      if (team.coach) rows.push({
        name: `${team.coach.firstName} ${team.coach.lastName}`, age: team.coach.age,
        strength: team.coach.strength, team: team.name, league: teamMeta[team.name]?.league || '?'
      });
    });
    freeCoaches.forEach(c => rows.push({
      name: `${c.firstName} ${c.lastName}`, age: c.age,
      strength: c.strength, team: 'Libero', league: 'free'
    }));
  } else {
    allTeams.forEach(team => {
      if (team.ds) rows.push({
        name: `${team.ds.firstName} ${team.ds.lastName}`, age: team.ds.age,
        strength: team.ds.strength, team: team.name, league: teamMeta[team.name]?.league || '?'
      });
    });
    freeDirectors.forEach(d => rows.push({
      name: `${d.firstName} ${d.lastName}`, age: d.age,
      strength: d.strength, team: 'Libero', league: 'free'
    }));
  }

  if (leagueFilter) rows = rows.filter(r => r.league === leagueFilter);
  if (roleFilter && type === 'players') rows = rows.filter(r => r.role === roleFilter);
  if (search) rows = rows.filter(r => r.name.toLowerCase().includes(search));

  const [sortKey, sortDir] = sortBy.split('-');
  rows.sort((a, b) => {
    const va = a[sortKey], vb = b[sortKey];
    return sortDir === 'asc' ? (va > vb ? 1 : -1) : (va < vb ? 1 : -1);
  });

  const container = document.getElementById('db-table-container');
  if (rows.length === 0) {
    container.innerHTML = '<p class="db-empty">Nessun risultato</p>';
    return;
  }

  const leagueLabel = l => l === 'free' ? '—' : 'Serie ' + l;
  let thead, tbodyRows;
  if (type === 'players') {
    thead = '<tr><th>Nome</th><th>Ruolo</th><th>Posizione</th><th>Età</th><th>Forza</th><th>Contratto</th><th>Squadra</th><th>Lega</th></tr>';
    tbodyRows = rows.map((r, i) => {
      const c = r.player?.contract;
      const durLabel = !c ? '—' : (!c.duration || c.duration <= 0 ? '⚠️ scad.' : `${c.duration}a`);
      const contractCell = c
        ? `${durLabel} · ${c.salary}k€${c.releaseClause ? ' 🔒' : ''}`
        : '—';
      const subRoleCell = r.player ? formatSubRoles(r.player) : '';
      return `<tr data-idx="${i}" class="db-row-clickable"><td><span class="player-name-link">${r.name}</span></td><td>${r.role}</td><td style="font-size:.82rem;color:#666">${subRoleCell}</td><td>${r.age}</td><td><strong>${r.strength}</strong></td><td class="db-contract">${contractCell}</td><td>${r.team}</td><td>${leagueLabel(r.league)}</td></tr>`;
    }).join('');
  } else {
    thead = '<tr><th>Nome</th><th>Età</th><th>Forza</th><th>Squadra</th><th>Lega</th></tr>';
    tbodyRows = rows.map(r =>
      `<tr><td>${r.name}</td><td>${r.age}</td><td><strong>${r.strength}</strong></td><td>${r.team}</td><td>${leagueLabel(r.league)}</td></tr>`
    ).join('');
  }

  container.innerHTML = `<p class="db-count">${rows.length} risultati</p><table><thead>${thead}</thead><tbody>${tbodyRows}</tbody></table>`;

  // Click su riga giocatore → apre scheda carriera
  if (type === 'players') {
    container.querySelectorAll('tr[data-idx]').forEach(tr => {
      tr.addEventListener('click', () => openPlayerCard(rows[+tr.dataset.idx].player));
    });
  }
}

function openDatabase() {
  const modal = document.getElementById('database-modal');
  modal.style.display = 'flex';
  modal.querySelectorAll('.db-tab').forEach(t => t.classList.remove('active'));
  modal.querySelector('[data-type="players"]').classList.add('active');
  document.getElementById('db-league').value = '';
  document.getElementById('db-role').value = '';
  document.getElementById('db-role').style.display = '';
  document.getElementById('db-sort').value = 'strength-desc';
  document.getElementById('db-search').value = '';
  renderDatabaseTable('players');
}

function findPlayerById(id) {
  for (const team of [...serieA, ...serieB, ...serieC]) {
    const p = team.roster?.find(p => p.id === id);
    if (p) return p;
  }
  return freeAgents.find(p => p.id === id) || null;
}

function openPlayerCard(player) {
  const allTeams = [...serieA, ...serieB, ...serieC];
  const teamMap = {};
  serieA.forEach(t => teamMap[t.name] = 'A');
  serieB.forEach(t => teamMap[t.name] = 'B');
  serieC.forEach(t => teamMap[t.name] = 'C');

  const currentTeamName = allTeams.find(t => t.roster?.includes(player))?.name || 'Svincolato';
  const career = player.career || [];
  const contract = player.contract || null;
  const personality = player.personality || null;

  const careerRows = career.map(entry => {
    const from = entry.joined === 0 ? 'Inizio' : `St. ${entry.joined}`;
    const to = entry.left === null ? 'attuale' : `St. ${entry.left}`;
    const dur = entry.left === null
      ? (seasonCount - entry.joined) + ' st.'
      : (entry.left - entry.joined) + ' st.';
    const fee = entry.fee === null ? '— (vivaio)' : entry.fee === 'prestito' ? '🔄 Prestito' : entry.fee === 0 ? 'Svincolato' : `${entry.fee.toFixed(1)}M€`;
    return `<tr><td>${entry.team}</td><td>${from} → ${to}</td><td>${dur}</td><td>${fee}</td></tr>`;
  }).join('');

  // Sezione contratto
  const contractHtml = contract ? (() => {
    const dur = contract.duration > 0 ? `${contract.duration} ann${contract.duration === 1 ? 'o' : 'i'}` : 'In scadenza';
    const sal = `${contract.salary}k€/mese`;
    const clause = contract.releaseClause ? `${contract.releaseClause}M€` : 'Nessuna';
    const bPromo = `${contract.bonusPromotion}k€`;
    const bTitle = `${contract.bonusTitle}k€`;
    return `<div class="pc-contract">
      <div class="pc-contract-row"><span>Durata residua</span><strong>${dur}</strong></div>
      <div class="pc-contract-row"><span>Stipendio</span><strong>${sal}</strong></div>
      <div class="pc-contract-row"><span>Clausola rescissoria</span><strong>${clause}</strong></div>
      <div class="pc-contract-row"><span>Bonus promozione</span><strong>${bPromo}</strong></div>
      <div class="pc-contract-row"><span>Bonus titolo</span><strong>${bTitle}</strong></div>
    </div>`;
  })() : '';

  // Sezione personalità (visibile parzialmente — come uno scout report)
  const personalityHtml = personality ? (() => {
    const bar = v => `<span class="pc-bar"><span style="width:${v}%"></span></span>`;
    return `<div class="pc-personality">
      <div class="pc-pers-row"><span>Ambizione</span>${bar(personality.ambition)}</div>
      <div class="pc-pers-row"><span>Fedeltà</span>${bar(personality.loyalty)}</div>
      <div class="pc-pers-row"><span>Avidità</span>${bar(personality.greed)}</div>
    </div>`;
  })() : '';

  const html = `
    <div class="player-card-overlay" id="player-card-overlay">
      <div class="player-card-box">
        <button class="player-card-close" id="close-player-card">✕</button>
        <div class="player-card-header">
          <span class="player-card-name">${player.firstName} ${player.lastName}</span>
          <span class="player-card-role role-${player.role}">${player.role}</span>
          ${formatSubRoles(player) ? `<span style="font-size:.8rem;color:#666">${formatSubRoles(player)}</span>` : ''}
        </div>
        <div class="player-card-stats">
          <span>Età: <strong>${player.age}</strong></span>
          <span>Forza: <strong>${player.strength}</strong></span>
          <span>Squadra: <strong>${currentTeamName}</strong></span>
        </div>
        <div class="player-card-stats" style="margin-top:4px">
          <span>⚽ Gol: <strong>${player.seasonGoals || 0}</strong></span>
          <span>🅰️ Assist: <strong>${player.seasonAssists || 0}</strong></span>
          <span>🟨 Amm: <strong>${player.yellowCards || 0}</strong></span>
          ${(player.injuryMatchesLeft || 0) > 0 ? `<span style="color:#e05050">🤕 Infortun. (<strong>${player.injuryMatchesLeft}</strong> gg)</span>` : ''}
          ${(player.suspendedMatchesLeft || 0) > 0 ? `<span style="color:#e05050">🚫 Squalif. (<strong>${player.suspendedMatchesLeft}</strong> gg)</span>` : ''}
        </div>
        <div class="pc-sections">
          <div class="pc-section">
            <h4>Contratto</h4>${contractHtml}
          </div>
          <div class="pc-section">
            <h4>Personalità</h4>${personalityHtml}
          </div>
        </div>
        <h4>Carriera</h4>
        ${career.length === 0
      ? '<p class="db-empty">Nessuna storia disponibile</p>'
      : `<table class="player-card-table">
               <thead><tr><th>Squadra</th><th>Periodo</th><th>Durata</th><th>Fee</th></tr></thead>
               <tbody>${careerRows}</tbody>
             </table>`}
      </div>
    </div>`;

  document.body.insertAdjacentHTML('beforeend', html);
  document.getElementById('close-player-card').addEventListener('click', () => {
    document.getElementById('player-card-overlay').remove();
  });
  document.getElementById('player-card-overlay').addEventListener('click', e => {
    if (e.target.id === 'player-card-overlay') document.getElementById('player-card-overlay').remove();
  });
}

// ─── SALVATAGGIO (localStorage, slot unico) ───────────────────────────────────
const SAVE_KEY = 'sci-save';
const SAVE_VERSION = 1;

function serializeGame() {
  // Registry di tutti i giocatori (id → oggetto) per preservare l'identità dei riferimenti
  const players = {};
  const addPlayer = p => { if (p && players[p.id] === undefined) players[p.id] = p; };
  [...serieA, ...serieB, ...serieC].forEach(t => (t.roster || []).forEach(addPlayer));
  freeAgents.forEach(addPlayer);
  pendingRenewals.forEach(addPlayer);
  pendingTransferMarket.forEach(i => addPlayer(i.player));
  pendingPreContracts.forEach(i => addPlayer(i.player));

  const serializeTeam = t => ({
    name: t.name, colors: t.colors, strength: t.strength, budget: t.budget,
    leagueLevel: t.leagueLevel,
    seasonsInA: t.seasonsInA, seasonsInB: t.seasonsInB, seasonsInC: t.seasonsInC,
    magnate: t.magnate, magnateDuration: t.magnateDuration,
    financialCrisis: t.financialCrisis, crisisDuration: t.crisisDuration,
    objective: t.objective, dsOverperformed: t.dsOverperformed,
    coach: t.coach, ds: t.ds, president: t.president, wageBudgetCap: t.wageBudgetCap,
    roster: (t.roster || []).map(p => p.id),
  });

  // Nei risultati salviamo id + cognome: se il giocatore non esiste più al load
  // (es. ritirato), il cognome resta comunque visualizzabile
  const playerRef = p => p ? { id: p.id, lastName: p.lastName } : null;
  const serializeResult = r => r ? {
    team1Goals: r.team1Goals, team2Goals: r.team2Goals,
    scorers1: (r.scorers1 || []).map(playerRef),
    scorers2: (r.scorers2 || []).map(playerRef),
    assists1: (r.assists1 || []).map(playerRef),
    assists2: (r.assists2 || []).map(playerRef),
  } : null;
  const serializeRounds = rounds => rounds ? rounds.map(round => round.map(m => ({
    t1: m.team1.name, t2: m.team2.name, result: serializeResult(m.result),
  }))) : null;

  return {
    version: SAVE_VERSION,
    savedAt: Date.now(),
    seasonCount, nextPlayerId, seasonPhase, currentMatchday,
    players,
    serieA: serieA.map(serializeTeam),
    serieB: serieB.map(serializeTeam),
    serieC: serieC.map(serializeTeam),
    freeAgents: freeAgents.map(p => p.id),
    freeCoaches, freeDirectors,
    playerTeamName: playerTeam ? playerTeam.name : null,
    dsCareer,
    championsHistory, transferLog,
    standingsA, standingsB, standingsC,
    pendingRenewals: pendingRenewals.map(p => p.id),
    pendingTransferMarket: pendingTransferMarket.map(i => ({
      playerId: i.player.id, fromTeamName: i.fromTeam ? i.fromTeam.name : null, askingPrice: i.askingPrice,
    })),
    pendingPreContracts: pendingPreContracts.map(i => ({
      playerId: i.player.id, fromTeamName: i.fromTeam ? i.fromTeam.name : null,
      toTeamName: i.toTeam ? i.toTeam.name : null,
    })),
    activeLoans: activeLoans.map(l => ({
      playerId: l.player.id, homeTeamName: l.homeTeam.name, loanTeamName: l.loanTeam.name,
    })),
    schedule: {
      A: { andata: serializeRounds(s_roundsA), ritorno: serializeRounds(s_returnRoundsA) },
      B: { andata: serializeRounds(s_roundsB), ritorno: serializeRounds(s_returnRoundsB) },
      C: { andata: serializeRounds(s_roundsC), ritorno: serializeRounds(s_returnRoundsC) },
    },
    coppa: s_coppaResult ? {
      winnerName: s_coppaResult.winner.name,
      roundNames: s_coppaResult.roundNames,
      rounds: s_coppaResult.rounds.map(matches => matches.map(m => ({
        homeName: m.home.name, awayName: m.away.name,
        team1Goals: m.team1Goals, team2Goals: m.team2Goals,
        winnerName: m.winner.name, penalties: m.penalties,
      }))),
    } : null,
  };
}

function deserializeGame(snap) {
  try {
    if (!snap || snap.version !== SAVE_VERSION || !snap.players) return false;
    const playersById = {};
    Object.values(snap.players).forEach(p => { playersById[p.id] = p; });

    // president: backfill per salvataggi precedenti all'introduzione del presidente
    const reviveTeam = t => ({ ...t, roster: (t.roster || []).map(id => playersById[id]).filter(Boolean), president: t.president || createPresident(t) });
    const newA = (snap.serieA || []).map(reviveTeam);
    const newB = (snap.serieB || []).map(reviveTeam);
    const newC = (snap.serieC || []).map(reviveTeam);
    if (!newA.length || !newB.length || !newC.length) return false;

    const teamByName = {};
    [...newA, ...newB, ...newC].forEach(t => { teamByName[t.name] = t; });

    const revivePlayerRef = ref => ref ? (playersById[ref.id] || ref) : null;
    const reviveResult = r => ({
      team1Goals: r.team1Goals, team2Goals: r.team2Goals,
      scorers1: (r.scorers1 || []).map(revivePlayerRef),
      scorers2: (r.scorers2 || []).map(revivePlayerRef),
      assists1: (r.assists1 || []).map(revivePlayerRef),
      assists2: (r.assists2 || []).map(revivePlayerRef),
    });
    const reviveRounds = rounds => rounds ? rounds.map(round => round.map(m => {
      const match = { team1: teamByName[m.t1] || { name: m.t1 }, team2: teamByName[m.t2] || { name: m.t2 } };
      if (m.result) match.result = reviveResult(m.result);
      return match;
    })) : undefined;

    // Commit: da qui in poi riassegna tutti i globali
    serieA = newA; serieB = newB; serieC = newC;
    seasonCount = snap.seasonCount || 0;
    nextPlayerId = snap.nextPlayerId || 0;
    seasonPhase = snap.seasonPhase || 0;
    currentMatchday = snap.currentMatchday || 0;
    freeAgents = (snap.freeAgents || []).map(id => playersById[id]).filter(Boolean);
    freeCoaches = snap.freeCoaches || [];
    freeDirectors = snap.freeDirectors || [];
    championsHistory = snap.championsHistory || [];
    transferLog = snap.transferLog || [];
    standingsA = snap.standingsA || {};
    standingsB = snap.standingsB || {};
    standingsC = snap.standingsC || {};
    playerTeam = snap.playerTeamName ? (teamByName[snap.playerTeamName] || null) : null;
    dsCareer = snap.dsCareer || null;
    pendingRenewals = (snap.pendingRenewals || []).map(id => playersById[id]).filter(Boolean);
    pendingTransferMarket = (snap.pendingTransferMarket || [])
      .map(i => ({ player: playersById[i.playerId], fromTeam: i.fromTeamName ? teamByName[i.fromTeamName] : null, askingPrice: i.askingPrice }))
      .filter(i => i.player);
    pendingPreContracts = (snap.pendingPreContracts || [])
      .map(i => ({
        player: playersById[i.playerId],
        fromTeam: i.fromTeamName ? teamByName[i.fromTeamName] : null,
        toTeam: i.toTeamName ? teamByName[i.toTeamName] : null,
      }))
      .filter(i => i.player);
    activeLoans = (snap.activeLoans || [])
      .map(l => ({
        player: playersById[l.playerId],
        homeTeam: teamByName[l.homeTeamName],
        loanTeam: teamByName[l.loanTeamName],
      }))
      .filter(l => l.player && l.homeTeam && l.loanTeam);
    pendingAIOffers = [];
    pendingScoutingTargets = [];

    const sch = snap.schedule || {};
    s_roundsA = reviveRounds(sch.A && sch.A.andata);
    s_returnRoundsA = reviveRounds(sch.A && sch.A.ritorno);
    s_roundsB = reviveRounds(sch.B && sch.B.andata);
    s_returnRoundsB = reviveRounds(sch.B && sch.B.ritorno);
    s_roundsC = reviveRounds(sch.C && sch.C.andata);
    s_returnRoundsC = reviveRounds(sch.C && sch.C.ritorno);

    s_coppaResult = snap.coppa ? {
      winner: teamByName[snap.coppa.winnerName] || { name: snap.coppa.winnerName },
      roundNames: snap.coppa.roundNames,
      rounds: (snap.coppa.rounds || []).map(matches => matches.map(m => ({
        home: teamByName[m.homeName] || { name: m.homeName },
        away: teamByName[m.awayName] || { name: m.awayName },
        team1Goals: m.team1Goals, team2Goals: m.team2Goals,
        winner: teamByName[m.winnerName] || { name: m.winnerName },
        penalties: m.penalties,
      }))),
    } : null;

    return true;
  } catch (e) {
    console.warn('Errore nel caricamento del salvataggio:', e);
    return false;
  }
}

function saveGame() {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(serializeGame()));
  } catch (e) {
    console.warn('Salvataggio non riuscito:', e);
  }
}

function loadSavedSnapshot() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const snap = JSON.parse(raw);
    return (snap && snap.version === SAVE_VERSION) ? snap : null;
  } catch (e) {
    return null;
  }
}

// Ricostruisce la UI dopo un "Riprendi carriera" in base alla fase salvata
function renderResumedState() {
  updateSeasonBtn();
  if (championsHistory.length > 0) {
    displayHistory();
    displayHallOfFame();
  }

  if (seasonPhase === 0) {
    if (transferLog.length) displayTransferLog();
    return;
  }

  // Stagione appena generata ma nessuna giornata giocata: previsioni pre-stagione
  if (seasonPhase === 1 && currentMatchday === 0) {
    displayPreSeasonStandings('serieA', serieA);
    displayPreSeasonStandings('serieB', serieB);
    displayPreSeasonStandings('serieC', serieC);
    return;
  }

  const half = seasonPhase <= 2;
  const showLeague = (id, standings, teams) => {
    if (Object.keys(standings).length) {
      displayStandings(id, standings, half);
      displayTopScorers(id, teams);
    }
  };
  showLeague('serieA', standingsA, serieA);
  showLeague('serieB', standingsB, serieB);
  showLeague('serieC', standingsC, serieC);

  // Ultima giornata giocata
  if ((seasonPhase === 1 || seasonPhase === 3) && currentMatchday > 0) {
    const md = currentMatchday - 1;
    const isAndata = seasonPhase === 1;
    const mdNum = isAndata ? md + 1 : md + 1 + getNumRounds();
    const phase = isAndata ? 'andata' : 'ritorno';
    if (isAndata) {
      if (s_roundsA) displaySingleMatchday('serieA', s_roundsA[md], mdNum, phase);
      if (s_roundsB) displaySingleMatchday('serieB', s_roundsB[md], mdNum, phase);
      if (s_roundsC) displaySingleMatchday('serieC', s_roundsC[md], mdNum, phase);
    } else {
      if (s_returnRoundsA) displaySingleMatchday('serieA', s_returnRoundsA[md], mdNum, phase);
      if (s_returnRoundsB) displaySingleMatchday('serieB', s_returnRoundsB[md], mdNum, phase);
      if (s_returnRoundsC) displaySingleMatchday('serieC', s_returnRoundsC[md], mdNum, phase);
    }
  }

  // Calendario: andata completa da fase 2 in poi, tutto a stagione conclusa
  if (seasonPhase >= 2 && s_roundsA) {
    const ritorno = id => seasonPhase === 4 ? id : [];
    displaySchedule('serieA', s_roundsA, ritorno(s_returnRoundsA));
    displaySchedule('serieB', s_roundsB, ritorno(s_returnRoundsB));
    displaySchedule('serieC', s_roundsC, ritorno(s_returnRoundsC));
  }
  if (seasonPhase === 4 && s_coppaResult) displayCoppaItalia(s_coppaResult);
}

// ─── CARRIERA DIRETTORE SPORTIVO ──────────────────────────────────────────────

// Assume il giocatore come DS della squadra: il DS AI precedente torna tra i liberi
function hirePlayerAsDS(team, years) {
  if (team.ds && !team.ds.isHuman) freeDirectors.push(team.ds);
  team.ds = {
    firstName: dsCareer.firstName, lastName: dsCareer.lastName,
    age: dsCareer.age, strength: dsCareer.reputation, maxStrength: 100,
    isHuman: true,
  };
  playerTeam = team;
  dsCareer.teamName = team.name;
  dsCareer.contractYears = years;
  dsCareer.seasonsUnemployed = 0;
  briefPresidentBudget(team); // il presidente fissa subito budget e monte ingaggi del nuovo incarico
  showMyTeamBadge();
}

// Sessione di mercato iniziale: appena il DS firma con la sua prima squadra
// (inizio carriera, sia modalità realistica che scelta libera) può subito
// sistemare la rosa — vendite, prestiti, allenatore — prima che la stagione
// cominci, invece di dover aspettare la fine della prima annata. Se non è
// stata accettata nessuna offerta (rifiuto in showJobOffersModal) playerTeam
// resta null e si salta dritti al salvataggio.
function startCareerMarketSession() {
  if (!playerTeam) { saveGame(); return; }
  showPresidentBriefingModal(playerTeam, () => {
    showManagerMarketModal(() => {
      ensureMinRoster(playerTeam);
      recalculateTeamStrength(playerTeam);
      displayTransferLog();
      saveGame();
    });
  });
}

function leaveTeamAsDS() {
  if (playerTeam && playerTeam.ds && playerTeam.ds.isHuman) playerTeam.ds = null;
  playerTeam = null;
  if (dsCareer) dsCareer.teamName = null;
  showMyTeamBadge();
}

// Risolve con l'AI i rinnovi pendenti della squadra che il DS umano sta lasciando
function resolvePendingRenewalsAI(team) {
  pendingRenewals.forEach(player => {
    const renewed = tryRenewContract(player, team);
    if (!renewed) {
      team.roster = team.roster.filter(p => p !== player);
      recordTransfer(player, null, null);
      freeAgents.push(player);
      transferLog.push(`🔚 <em>${player.firstName} ${player.lastName}</em> lascia <strong>${team.name}</strong> a <strong>parametro zero</strong>`);
    }
  });
  pendingRenewals = [];
  recalculateTeamStrength(team);
}

// Etichetta obiettivo stimata dal rank di forza nella lega (stessa logica di setObjectives)
function estimateObjectiveLabel(team) {
  const league = team.leagueLevel === 'A' ? serieA : team.leagueLevel === 'B' ? serieB : serieC;
  const rank = [...league].sort((a, b) => b.strength - a.strength).indexOf(team) + 1;
  const n = league.length;
  if (rank <= 3) return 'Titolo/top 3';
  if (rank <= Math.floor(n * 0.4)) return 'Metà alta';
  if (rank <= Math.floor(n * 0.75)) return 'Metà classifica';
  return 'Salvezza';
}

// Genera le offerte di lavoro per il DS umano in base alla reputazione
// Numero minimo di offerte garantite quando il DS cerca lavoro (avvio
// carriera, disoccupazione, sondaggio di mercato, corteggiamento AI).
const MIN_DS_JOB_OFFERS = 4;

function generateDSJobOffers() {
  const rep = dsCareer.reputation;
  let pool;
  if (rep < 45) pool = [...serieC];
  else if (rep < 60) pool = [...serieC, ...serieB];
  else if (rep < 75) {
    const bottomA = [...serieA].sort((a, b) => a.strength - b.strength).slice(0, Math.floor(serieA.length / 2));
    pool = [...serieB, ...bottomA];
  } else pool = [...serieA, ...serieB, ...serieC];

  const eligible = t => t !== playerTeam && !(t.ds && t.ds.isHuman);
  // Nota: createDirector garantisce sempre forza >= 30, quindi un margine
  // troppo stretto (es. "< rep - 8") escluderebbe SEMPRE tutti i DS AI a
  // bassa reputazione — bug che lasciava una sola offerta di fallback a
  // inizio carriera. Margine più ampio (+10) per un pool realistico.
  let candidates = pool.filter(t => eligible(t) && (!t.ds || t.ds.strength < rep + 10));
  shuffleArray(candidates);
  let offers = candidates.slice(0, MIN_DS_JOB_OFFERS);

  // Garanzia: almeno MIN_DS_JOB_OFFERS offerte (o tutte quelle disponibili
  // nel pool, se meno) — se il filtro di forza non ne dà abbastanza, ripesca
  // dal pool le squadre col DS più debole per completare.
  if (offers.length < MIN_DS_JOB_OFFERS) {
    const already = new Set(offers.map(t => t.name));
    const backfill = pool
      .filter(t => eligible(t) && !already.has(t.name))
      .sort((a, b) => (a.ds?.strength || 0) - (b.ds?.strength || 0));
    for (const t of backfill) {
      if (offers.length >= MIN_DS_JOB_OFFERS) break;
      offers.push(t);
    }
  }

  offers.sort((a, b) => getTeamPrestige(b.name) - getTeamPrestige(a.name) || b.strength - a.strength);

  return offers.map(team => ({
    team,
    years: 2 + Math.floor(Math.random() * 2),
    objectiveLabel: estimateObjectiveLabel(team),
  }));
}

function showJobOffersModal(offers, onDone) {
  const overlay = document.createElement('div');
  overlay.className = 'mm-overlay';

  const offerRows = offers.map((o, i) => {
    const [c1, c2] = o.team.colors || ['#888', '#aaa'];
    return `<div class="mm-row">
      <div class="mm-pinfo">
        <span class="ts-jersey" style="background:linear-gradient(90deg,${c1} 50%,${c2} 50%)"></span>
        <span class="mm-name">${o.team.name}</span>
        <span class="mm-badge">Serie ${o.team.leagueLevel}</span>
        <span>⚡${o.team.strength}</span>
        <span>💰${(o.team.budget || 0).toFixed(0)}M€</span>
        <span class="mm-from-tag">Obiettivo: ${o.objectiveLabel}</span>
      </div>
      <div class="mm-acts">
        <strong class="mm-price">${o.years} anni</strong>
        <button class="mm-btn mm-green" data-offer-idx="${i}">Accetta</button>
      </div></div>`;
  }).join('');

  overlay.innerHTML = `
    <div class="mm-box" style="max-width:620px">
      <div class="mm-header">
        <span class="mm-title">📨 Offerte di lavoro — ${dsCareer.firstName} ${dsCareer.lastName} <span style="opacity:.7">(Rep ${dsCareer.reputation})</span></span>
      </div>
      <div class="mm-content">
        ${offers.length ? offerRows : '<p class="mm-empty">Nessun club interessato al momento.</p>'}
      </div>
      <div class="mm-footer">
        <span class="mm-footer-note">Se rifiuti resti senza squadra per la stagione (Rep −2 a fine anno)</span>
        <button class="mm-btn mm-red" id="jo-decline">Rifiuta tutte</button>
      </div>
    </div>`;

  overlay.querySelectorAll('[data-offer-idx]').forEach(btn => {
    btn.addEventListener('click', () => {
      const o = offers[+btn.dataset.offerIdx];
      hirePlayerAsDS(o.team, o.years);
      transferLog.push(`📊 <strong>${o.team.name}</strong> assume <em>${dsCareer.firstName} ${dsCareer.lastName}</em> come nuovo DS (${o.years} anni, obiettivo: ${o.objectiveLabel})`);
      overlay.remove();
      onDone();
    });
  });
  overlay.querySelector('#jo-decline').addEventListener('click', () => {
    overlay.remove();
    showMyTeamBadge();
    onDone();
  });
  document.body.appendChild(overlay);
}

// Permette al DS di consultare il mercato del lavoro anche da occupato, senza
// nessun obbligo: può restare al club attuale oppure accettare un'offerta
// (con conferma esplicita, perché significa lasciare il progetto in corso).
function showJobMarketBrowserModal() {
  const offers = generateDSJobOffers();
  const overlay = document.createElement('div');
  overlay.className = 'mm-overlay';

  const offerRows = offers.map((o, i) => {
    const [c1, c2] = o.team.colors || ['#888', '#aaa'];
    return `<div class="mm-row">
      <div class="mm-pinfo">
        <span class="ts-jersey" style="background:linear-gradient(90deg,${c1} 50%,${c2} 50%)"></span>
        <span class="mm-name">${o.team.name}</span>
        <span class="mm-badge">Serie ${o.team.leagueLevel}</span>
        <span>⚡${o.team.strength}</span>
        <span>💰${(o.team.budget || 0).toFixed(0)}M€</span>
        <span class="mm-from-tag">Obiettivo: ${o.objectiveLabel}</span>
      </div>
      <div class="mm-acts">
        <strong class="mm-price">${o.years} anni</strong>
        <button class="mm-btn mm-green" data-offer-idx="${i}">Accetta</button>
      </div></div>`;
  }).join('');

  const currentNote = playerTeam
    ? `Sei ancora sotto contratto con <strong>${playerTeam.name}</strong> — accettando un'offerta lasci subito il progetto in corso.`
    : 'Al momento sei senza squadra: puoi accettare un\'offerta quando vuoi.';

  overlay.innerHTML = `
    <div class="mm-box" style="max-width:620px">
      <div class="mm-header">
        <span class="mm-title">🔍 Sondaggio di mercato — ${dsCareer.firstName} ${dsCareer.lastName} <span style="opacity:.7">(Rep ${dsCareer.reputation})</span></span>
      </div>
      <div class="mm-content">
        <p style="font-size:.85rem;color:#666;margin:0 0 10px">${currentNote}</p>
        ${offers.length ? offerRows : '<p class="mm-empty">Nessun club interessato al momento.</p>'}
      </div>
      <div class="mm-footer">
        <span class="mm-footer-note">Puoi chiudere e restare dove sei senza conseguenze</span>
        <button class="mm-btn mm-confirm" id="jm-stay">${playerTeam ? 'Resta al club attuale' : 'Chiudi'}</button>
      </div>
    </div>`;

  overlay.querySelectorAll('[data-offer-idx]').forEach(btn => {
    btn.addEventListener('click', () => {
      const o = offers[+btn.dataset.offerIdx];
      const oldTeam = playerTeam;
      if (oldTeam && !confirm(`Sei sicuro di voler lasciare ${oldTeam.name} per ${o.team.name}?`)) return;
      if (oldTeam) {
        resolvePendingRenewalsAI(oldTeam);
        transferLog.push(`📊 <em>${dsCareer.firstName} ${dsCareer.lastName}</em> lascia <strong>${oldTeam.name}</strong> per <strong>${o.team.name}</strong>`);
        leaveTeamAsDS();
      }
      hirePlayerAsDS(o.team, o.years);
      transferLog.push(`📊 <strong>${o.team.name}</strong> assume <em>${dsCareer.firstName} ${dsCareer.lastName}</em> come nuovo DS (${o.years} anni, obiettivo: ${o.objectiveLabel})`);
      overlay.remove();
      const dsModal = document.getElementById('ds-career-overlay');
      if (dsModal) dsModal.remove();
    });
  });
  overlay.querySelector('#jm-stay').addEventListener('click', () => overlay.remove());
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
  document.body.appendChild(overlay);
}

// Dati per la valutazione di fine stagione (da chiamare PRIMA di promozioni/retrocessioni)
function collectSeasonEvalData() {
  const st = playerTeam.leagueLevel === 'A' ? standingsA
    : playerTeam.leagueLevel === 'B' ? standingsB : standingsC;
  const sorted = Object.entries(st).map(([name, s]) => ({ name, ...s })).sort((a, b) => b.points - a.points);
  const rank = sorted.findIndex(e => e.name === playerTeam.name) + 1;
  if (rank < 1) return null;
  const numTeams = sorted.length;
  return {
    rank, numTeams,
    league: playerTeam.leagueLevel,
    objective: playerTeam.objective || { description: '—', maxRank: numTeams },
    wonTitle: rank === 1 && playerTeam.leagueLevel === 'A',
    wonCup: !!(s_coppaResult && s_coppaResult.winner && s_coppaResult.winner.name === playerTeam.name),
    promoted: rank <= 4 && playerTeam.leagueLevel !== 'A',
    relegated: rank > numTeams - 4 && playerTeam.leagueLevel !== 'C',
  };
}

function computeReputationDelta(d) {
  let delta = 0;
  const maxRank = d.objective.maxRank || d.numTeams;
  if (d.wonTitle) delta += 8;
  if (d.promoted) delta += 6;
  if (d.wonCup) delta += 4;
  if (d.rank <= maxRank - 3) delta += 4;
  else if (d.rank <= maxRank) delta += 2;
  else if (d.rank <= maxRank + 3) delta -= 2;
  else delta -= 5;
  if (d.relegated) delta -= 8;
  return delta;
}

// Modal di valutazione di fine stagione: reputazione, esonero, rinnovo, corteggiamenti
function showSeasonEvaluationModal(d, onDone) {
  const oldRep = dsCareer.reputation;
  const delta = computeReputationDelta(d);
  dsCareer.reputation = Math.max(5, Math.min(95, oldRep + delta));
  dsCareer.age++;
  if (playerTeam.ds && playerTeam.ds.isHuman) {
    playerTeam.ds.strength = dsCareer.reputation;
    playerTeam.ds.age = dsCareer.age;
  }
  dsCareer.contractYears--;

  const maxRank = d.objective.maxRank || d.numTeams;
  const overperformed = d.rank <= maxRank - 3;
  const failedBadly = d.rank > maxRank + 4;
  const fired = failedBadly && Math.random() < 0.45;
  const expired = !fired && dsCareer.contractYears <= 0;
  const renewalOffered = expired && d.rank <= maxRank + 2;
  const renewYears = 2 + Math.floor(Math.random() * 2);

  // Corteggiamento: se hai overperformato, un club di fascia superiore può cercarti
  const lgRank = lv => lv === 'A' ? 1 : lv === 'B' ? 2 : 3;
  let poachOffer = null;
  if (!fired && !expired && overperformed && Math.random() < 0.35) {
    const myPrestige = getTeamPrestige(playerTeam.name);
    const myLgRank = lgRank(playerTeam.leagueLevel);
    poachOffer = generateDSJobOffers().find(o =>
      lgRank(o.team.leagueLevel) < myLgRank ||
      (lgRank(o.team.leagueLevel) === myLgRank && getTeamPrestige(o.team.name) > myPrestige)
    ) || null;
  }

  const note = [
    d.wonTitle ? '🏆 Scudetto' : '',
    d.wonCup ? '🏆 Coppa Italia' : '',
    d.promoted ? '🎉 Promozione' : '',
    d.relegated ? '📉 Retrocessione' : '',
    fired ? '🚨 Esonerato' : '',
  ].filter(Boolean).join(' · ');
  dsCareer.history.push({
    season: seasonCount,
    team: playerTeam.name,
    league: d.league,
    rank: d.rank,
    objective: d.objective.description,
    note,
  });

  const teamName = playerTeam.name;
  const repColor = delta > 0 ? '#16a34a' : delta < 0 ? '#ef4444' : '#888';
  const repLine = `Reputazione: <strong>${oldRep}</strong> → <strong style="color:${repColor}">${dsCareer.reputation}</strong> (${delta >= 0 ? '+' : ''}${delta})`;

  let outcomeHtml, footerHtml;
  if (fired) {
    outcomeHtml = `<p style="color:#b91c1c;font-weight:700">🚨 La società ti ha esonerato: obiettivo mancato di troppo.</p>`;
    footerHtml = `<button class="mm-btn mm-confirm" data-outcome="offers">Vedi le offerte →</button>`;
  } else if (expired && renewalOffered) {
    outcomeHtml = `<p>📋 Il tuo contratto è scaduto. La società è soddisfatta e ti offre il <strong>rinnovo per ${renewYears} anni</strong>.</p>`;
    footerHtml = `
      <button class="mm-btn mm-green" data-outcome="renew">Rinnova (${renewYears} anni)</button>
      <button class="mm-btn mm-red" data-outcome="offers">Lascia il club — vedi offerte</button>`;
  } else if (expired) {
    outcomeHtml = `<p style="color:#b91c1c">📋 Il tuo contratto è scaduto e la società <strong>non ti rinnova</strong>.</p>`;
    footerHtml = `<button class="mm-btn mm-confirm" data-outcome="offers">Vedi le offerte →</button>`;
  } else if (poachOffer) {
    outcomeHtml = `<p>📨 <strong>${poachOffer.team.name}</strong> (Serie ${poachOffer.team.leagueLevel}) ti offre un contratto di <strong>${poachOffer.years} anni</strong> — obiettivo: ${poachOffer.objectiveLabel}.</p>`;
    footerHtml = `
      <button class="mm-btn mm-green" data-outcome="poach">Accetta e cambia squadra</button>
      <button class="mm-btn mm-blue" data-outcome="stay">Resta a ${teamName}</button>`;
  } else {
    outcomeHtml = `<p>Contratto residuo: <strong>${dsCareer.contractYears} ann${dsCareer.contractYears === 1 ? 'o' : 'i'}</strong>. Si continua.</p>`;
    footerHtml = `<button class="mm-btn mm-confirm" data-outcome="stay">Continua →</button>`;
  }

  const overlay = document.createElement('div');
  overlay.className = 'mm-overlay';
  overlay.innerHTML = `
    <div class="mm-box" style="max-width:560px">
      <div class="mm-header">
        <span class="mm-title">📊 Valutazione stagione — ${teamName}</span>
      </div>
      <div class="mm-content">
        <p>Obiettivo: <strong>${d.objective.description}</strong> — Risultato: <strong>${d.rank}° su ${d.numTeams}</strong> (Serie ${d.league})</p>
        ${note && !fired ? `<p>${note}</p>` : note && fired ? `<p>${note.replace(' · 🚨 Esonerato', '')}</p>` : ''}
        <p>${repLine}</p>
        ${outcomeHtml}
      </div>
      <div class="mm-footer" style="justify-content:flex-end;gap:8px">${footerHtml}</div>
    </div>`;

  overlay.querySelectorAll('[data-outcome]').forEach(btn => {
    btn.addEventListener('click', () => {
      const outcome = btn.dataset.outcome;
      overlay.remove();
      if (outcome === 'renew') {
        dsCareer.contractYears = renewYears;
        transferLog.push(`📊 <em>${dsCareer.firstName} ${dsCareer.lastName}</em> rinnova come DS di <strong>${teamName}</strong> per ${renewYears} anni`);
        showMyTeamBadge();
        onDone();
      } else if (outcome === 'offers') {
        if (fired) transferLog.push(`📊 <strong>${teamName}</strong> ha esonerato il DS <em>${dsCareer.firstName} ${dsCareer.lastName}</em>`);
        else transferLog.push(`📊 <em>${dsCareer.firstName} ${dsCareer.lastName}</em> lascia <strong>${teamName}</strong> a fine contratto`);
        const oldTeam = playerTeam;
        resolvePendingRenewalsAI(oldTeam);
        leaveTeamAsDS();
        showJobOffersModal(generateDSJobOffers(), onDone);
      } else if (outcome === 'poach') {
        transferLog.push(`📊 <em>${dsCareer.firstName} ${dsCareer.lastName}</em> lascia <strong>${teamName}</strong> per <strong>${poachOffer.team.name}</strong>`);
        const oldTeam = playerTeam;
        resolvePendingRenewalsAI(oldTeam);
        leaveTeamAsDS();
        hirePlayerAsDS(poachOffer.team, poachOffer.years);
        onDone();
      } else {
        showMyTeamBadge();
        onDone();
      }
    });
  });
  document.body.appendChild(overlay);
}

// Curriculum del DS (click sul badge)
function showDSCareerModal() {
  const overlay = document.createElement('div');
  overlay.className = 'mm-overlay';
  overlay.id = 'ds-career-overlay';
  const rows = dsCareer.history.map(h =>
    `<tr><td>St. ${h.season}</td><td>${h.team}</td><td>Serie ${h.league}</td><td>${h.objective}</td><td>${h.rank}°</td><td>${h.note || ''}</td></tr>`
  ).join('');
  overlay.innerHTML = `
    <div class="mm-box" style="max-width:680px">
      <div class="mm-header">
        <span class="mm-title">👔 ${dsCareer.firstName} ${dsCareer.lastName} — ${dsCareer.age} anni · Reputazione ${dsCareer.reputation}</span>
      </div>
      <div class="mm-content">
        ${dsCareer.history.length
          ? `<table style="font-size:.85rem"><thead><tr><th>Stagione</th><th>Squadra</th><th>Lega</th><th>Obiettivo</th><th>Risultato</th><th>Note</th></tr></thead><tbody>${rows}</tbody></table>`
          : '<p class="mm-empty">Carriera appena iniziata — nessuna stagione completata.</p>'}
      </div>
      <div class="mm-footer">
        <span class="mm-footer-note">${playerTeam ? `Attualmente DS di ${playerTeam.name} (contratto: ${Math.max(0, dsCareer.contractYears)} anni)` : 'Attualmente senza squadra'}</span>
        <span>
          <button class="mm-btn mm-blue" id="dsc-market">🔍 Valuta altre offerte</button>
          <button class="mm-btn mm-confirm" id="dsc-close">Chiudi</button>
        </span>
      </div>
    </div>`;
  overlay.querySelector('#dsc-close').addEventListener('click', () => overlay.remove());
  overlay.querySelector('#dsc-market').addEventListener('click', () => showJobMarketBrowserModal());
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
  document.body.appendChild(overlay);
}

// ─── AVVIO CARRIERA / SELEZIONE SQUADRA ───────────────────────────────────────
function showTeamSelectionScreen() {
  const makeJersey = (colors) => {
    const [c1, c2] = colors || ['#888', '#aaa'];
    return `<span class="ts-jersey" style="background:linear-gradient(90deg,${c1} 50%,${c2} 50%)"></span>`;
  };

  const overlay = document.createElement('div');
  overlay.id = 'team-selection-overlay';
  document.body.appendChild(overlay);

  const savedSnap = loadSavedSnapshot();

  const randomName = () => ({
    firstName: ITALIAN_FIRST_NAMES[Math.floor(Math.random() * ITALIAN_FIRST_NAMES.length)],
    lastName: ITALIAN_LAST_NAMES[Math.floor(Math.random() * ITALIAN_LAST_NAMES.length)],
  });

  const confirmOverwrite = () =>
    !savedSnap || confirm('Hai una carriera salvata: iniziandone una nuova verrà sovrascritta al primo salvataggio automatico. Continuare?');

  // STEP 1: scelta modalità
  const renderModeStep = () => {
    const resumeInfo = savedSnap
      ? `Stagione ${(savedSnap.seasonCount || 0) + 1}${savedSnap.dsCareer
        ? ` — ${savedSnap.dsCareer.firstName} ${savedSnap.dsCareer.lastName}${savedSnap.playerTeamName ? ` (${savedSnap.playerTeamName})` : ' (senza squadra)'}`
        : savedSnap.playerTeamName ? ` — ${savedSnap.playerTeamName}` : ' — Spettatore'}`
      : '';
    overlay.innerHTML = `
      <h1>⚽ Simulatore Calcio Italiano</h1>
      <p>Carriera da Direttore Sportivo</p>
      <div class="career-mode-list">
        ${savedSnap ? `<button class="career-mode-btn cm-resume" id="cs-resume">
          <span class="cm-title">▶ Riprendi carriera</span><span class="cm-desc">${resumeInfo}</span>
        </button>` : ''}
        <button class="career-mode-btn" id="cs-realistic">
          <span class="cm-title">🎯 Carriera realistica</span><span class="cm-desc">Parti dal basso: ricevi offerte da club minori e scala le serie con la reputazione</span>
        </button>
        <button class="career-mode-btn" id="cs-free">
          <span class="cm-title">🎲 Scelta libera</span><span class="cm-desc">Scegli la tua prima squadra: da lì la carriera prosegue con contratti, esoneri e offerte</span>
        </button>
        <button class="career-mode-btn" id="cs-spectator">
          <span class="cm-title">👁️ Spettatore</span><span class="cm-desc">Nessuna carriera: osserva la simulazione</span>
        </button>
      </div>`;

    if (savedSnap) overlay.querySelector('#cs-resume').addEventListener('click', () => {
      if (deserializeGame(savedSnap)) {
        overlay.remove();
        showMyTeamBadge();
        renderResumedState();
      } else {
        alert('Salvataggio non valido — impossibile riprendere la carriera.');
      }
    });
    overlay.querySelector('#cs-realistic').addEventListener('click', () => { if (confirmOverwrite()) renderNameStep('realistic'); });
    overlay.querySelector('#cs-free').addEventListener('click', () => { if (confirmOverwrite()) renderNameStep('free'); });
    overlay.querySelector('#cs-spectator').addEventListener('click', () => {
      if (!confirmOverwrite()) return;
      playerTeam = null;
      dsCareer = null;
      overlay.remove();
    });
  };

  // STEP 2: nome del DS
  const renderNameStep = (mode) => {
    const def = randomName();
    overlay.innerHTML = `
      <h1>👔 Il tuo profilo</h1>
      <p>${mode === 'realistic'
        ? 'Un giovane DS sconosciuto: reputazione bassa, offerte solo da club minori'
        : 'Scegli il nome, poi la tua prima squadra'}</p>
      <div class="career-name-form">
        <label>Nome<br><input type="text" id="ds-first-name" value="${def.firstName}"></label>
        <label>Cognome<br><input type="text" id="ds-last-name" value="${def.lastName}"></label>
        <button class="mm-btn mm-confirm" id="ds-name-confirm">Avanti →</button>
      </div>`;
    overlay.querySelector('#ds-name-confirm').addEventListener('click', () => {
      const firstName = overlay.querySelector('#ds-first-name').value.trim() || def.firstName;
      const lastName = overlay.querySelector('#ds-last-name').value.trim() || def.lastName;
      dsCareer = {
        firstName, lastName, age: 35,
        reputation: 30, teamName: null, contractYears: 0,
        seasonsUnemployed: 0, history: [],
      };
      if (mode === 'realistic') {
        overlay.remove();
        showJobOffersModal(generateDSJobOffers(), startCareerMarketSession);
      } else {
        renderTeamGridStep();
      }
    });
  };

  // STEP 3 (solo scelta libera): griglia squadre
  const renderTeamGridStep = () => {
    const makeCol = (title, teams) => {
      const btns = teams.map(t =>
        `<button class="ts-team-btn" data-team-name="${t.name}">
          ${makeJersey(t.colors)}<span>${t.name}</span>
        </button>`
      ).join('');
      return `<div class="ts-league-col"><h2>${title}</h2>${btns}</div>`;
    };
    overlay.innerHTML = `
      <h1>⚽ Scegli la tua prima squadra</h1>
      <p>La reputazione iniziale si adatta al livello del club scelto</p>
      <div class="ts-leagues">
        ${makeCol('Serie A', serieA)}
        ${makeCol('Serie B', serieB)}
        ${makeCol('Serie C', serieC)}
      </div>`;
    overlay.querySelectorAll('.ts-team-btn[data-team-name]').forEach(btn => {
      btn.addEventListener('click', () => {
        const team = [...serieA, ...serieB, ...serieC].find(t => t.name === btn.dataset.teamName);
        if (!team) return;
        dsCareer.reputation = Math.max(25, Math.min(75, Math.round(team.strength) - 8));
        hirePlayerAsDS(team, 2 + Math.floor(Math.random() * 2));
        overlay.remove();
        startCareerMarketSession();
      });
    });
  };

  renderModeStep();
}

function showMyTeamBadge() {
  let badge = document.getElementById('my-team-badge');
  if (!playerTeam && !dsCareer) {
    if (badge) badge.style.display = 'none';
    return;
  }
  if (!badge) {
    badge = document.createElement('div');
    badge.id = 'my-team-badge';
    badge.addEventListener('click', () => { if (dsCareer) showDSCareerModal(); });
    document.body.appendChild(badge);
  }
  const jersey = t => {
    const [c1, c2] = t.colors || ['#888', '#aaa'];
    return `<span style="display:inline-block;width:12px;height:12px;border-radius:2px;background:linear-gradient(90deg,${c1} 50%,${c2} 50%);margin-right:6px;vertical-align:middle"></span>`;
  };
  if (dsCareer) {
    const teamPart = playerTeam
      ? `${jersey(playerTeam)}${playerTeam.name} · ${Math.max(0, dsCareer.contractYears)}a`
      : '<em>senza squadra</em>';
    badge.innerHTML = `👔 <strong>${dsCareer.firstName} ${dsCareer.lastName}</strong> · Rep ${dsCareer.reputation} — ${teamPart}`;
    badge.style.cursor = 'pointer';
    badge.title = 'Clicca per vedere la tua carriera';
  } else {
    badge.innerHTML = `${jersey(playerTeam)}${playerTeam.name}`;
    badge.style.cursor = 'default';
    badge.title = '';
  }
  badge.style.display = 'block';
}

// Mostra la schermata di selezione all'avvio
showTeamSelectionScreen();

// ─── STATO STAGIONE ───────────────────────────────────────────────────────────
// Fasi: 0=pronto, 1=andata (giornata×giornata), 2=andata finita, 3=ritorno (giornata×giornata), 4=stagione completata
let seasonPhase = 0;
let currentMatchday = 0; // 0-18
let s_roundsA, s_returnRoundsA;
let s_roundsB, s_returnRoundsB;
let s_roundsC, s_returnRoundsC;
let s_coppaResult = null;

function getNumRounds() {
  return s_roundsA ? s_roundsA.length : 19;
}

function updateSeasonBtn() {
  const btn = document.getElementById('simulaStagione');
  const ffBtn = document.getElementById('simulaTutto');
  if (seasonPhase === 0) {
    btn.textContent = 'Inizia Stagione';
  } else if (seasonPhase === 1) {
    btn.textContent = currentMatchday >= getNumRounds() ? 'Fine Andata ▶' : `Giornata ${currentMatchday + 1} ▶`;
  } else if (seasonPhase === 2) {
    btn.textContent = 'Inizia Ritorno';
  } else if (seasonPhase === 3) {
    btn.textContent = currentMatchday >= getNumRounds() ? 'Fine Stagione ▶' : `Giornata ${currentMatchday + 1 + getNumRounds()} ▶`;
  } else if (seasonPhase === 4) {
    btn.textContent = 'Vai alla Stagione Successiva';
  }
  if (ffBtn) {
    ffBtn.style.display = (seasonPhase >= 1 && seasonPhase <= 3) ? '' : 'none';
  }
}

const setObjectives = (teams) => {
  const sorted = [...teams].sort((a, b) => b.strength - a.strength);
  sorted.forEach((team, idx) => {
    const n = teams.length;
    const rank = idx + 1;
    if (rank <= 3) team.objective = { description: 'Titolo/top 3', maxRank: 3 };
    else if (rank <= Math.floor(n * 0.4)) team.objective = { description: 'Metà alta', maxRank: Math.floor(n * 0.4) };
    else if (rank <= Math.floor(n * 0.75)) team.objective = { description: 'Metà classifica', maxRank: Math.floor(n * 0.75) };
    else team.objective = { description: 'Salvezza', maxRank: n - 4 };
  });
};

// ── MERCATO INVERNALE AI ──────────────────────────────────────────────────────
// Versione semplificata: alcune squadre AI comprano/vendono a metà stagione.
function runWinterAITransfers() {
  const aiTeams = [...serieA, ...serieB, ...serieC].filter(t => t !== playerTeam);
  const winterMarket = [];
  // Giocatori attualmente in prestito: il club che li ospita non li possiede,
  // non può metterli sul mercato invernale
  const loanedPlayers = new Set(activeLoans.map(l => l.player));

  // Step 1: ~20% delle squadre AI mette un giocatore in vendita
  aiTeams.forEach(team => {
    if (Math.random() > 0.20) return;
    const sellable = team.roster.filter(p => p.role !== 'POR' && p.strength > 40 && !loanedPlayers.has(p));
    if (!sellable.length) return;
    const player = sellable[Math.floor(Math.random() * sellable.length)];
    const askingPrice = Math.round(getTransferValue(player) * (1.2 + Math.random() * 0.6) * 10) / 10;
    team.roster = team.roster.filter(p => p !== player);
    recalculateTeamStrength(team);
    winterMarket.push({ player, fromTeam: team, askingPrice });
  });

  // Step 2: ~35% delle squadre AI compra dal mercato invernale o uno svincolato
  aiTeams.forEach(team => {
    if (Math.random() > 0.35) return;
    if (team.budget < 2) return;

    const cap = leagueStrCap(team.leagueLevel);
    const options = winterMarket.filter(item =>
      item.fromTeam !== team &&
      team.budget >= item.askingPrice &&
      item.player.strength > (team.strength || 50) * 0.6 &&
      item.player.strength <= cap &&
      canAddRole(team, item.player.role)
    ).sort((a, b) => b.player.strength - a.player.strength);

    if (options.length) {
      const deal = options[0];
      winterMarket.splice(winterMarket.indexOf(deal), 1);
      team.roster.push(deal.player);
      team.budget -= deal.askingPrice;
      deal.fromTeam.budget += deal.askingPrice;
      recalculateTeamStrength(team);
      recordTransfer(deal.player, team.name, deal.askingPrice);
      transferLog.push(`❄️ <em>Mercato invernale</em>: <strong>${deal.fromTeam.name}</strong> → <strong>${team.name}</strong>: ${deal.player.firstName} ${deal.player.lastName} per <strong>${deal.askingPrice.toFixed(1)}M€</strong>`);
    } else {
      // Prova a ingaggiare uno svincolato
      const fa = freeAgents
        .filter(p => p.role !== 'POR' && canAddRole(team, p.role) && p.strength >= (team.strength || 50) * 0.5 && p.strength <= cap)
        .sort((a, b) => b.strength - a.strength)[0];
      if (fa) {
        freeAgents.splice(freeAgents.indexOf(fa), 1);
        team.roster.push(fa);
        recalculateTeamStrength(team);
        recordTransfer(fa, team.name, 0);
        transferLog.push(`❄️ <em>Mercato invernale</em>: <strong>${team.name}</strong> ingaggia ${fa.firstName} ${fa.lastName} (Forza: ${fa.strength})`);
      }
    }
  });

  // Step 3: salva il mercato residuo per la UI del giocatore
  if (playerTeam) {
    pendingTransferMarket = winterMarket;
  } else {
    // I giocatori rimasti tornano tra i free agent
    winterMarket.forEach(item => {
      freeAgents.push(item.player);
    });
  }
}

// ── MODAL MERCATO INVERNALE (solo per playerTeam) ─────────────────────────────
// ── Filtri di ricerca giocatori nei modali mercato ──────────────────────────
function matchesFilter(p, f) {
  if (f.role && p.role !== f.role) return false;
  if (p.age < f.ageMin || p.age > f.ageMax) return false;
  if (p.strength < f.strMin || p.strength > f.strMax) return false;
  return true;
}

// Selettore durata contratto (1-5 anni) — usato ovunque il DS firma un nuovo
// contratto (rinnovi, firme di svincolati, ingaggio allenatore) lasciando la
// scelta al giocatore invece di sorteggiarla.
function durationSelectHtml(dataAttr, id, selectedYears) {
  const sel = (selectedYears >= 1 && selectedYears <= 5) ? selectedYears : 3;
  const opts = [1, 2, 3, 4, 5].map(y => `<option value="${y}"${y === sel ? ' selected' : ''}>${y}a</option>`).join('');
  return `<select ${dataAttr}="${id}" style="padding:3px 6px;border-radius:4px;border:1px solid var(--border-card);font-size:.78rem">${opts}</select>`;
}

function buildFilterBar(f) {
  const opt = (val, label) => `<option value="${val}"${f.role === val ? ' selected' : ''}>${label}</option>`;
  return `<div class="mm-filters" style="margin-bottom:10px;padding:8px 10px;background:#f5f5f5;border:1px solid #ddd;border-radius:6px;display:flex;gap:12px;flex-wrap:wrap;align-items:center;font-size:.82rem">
    <strong>🔎 Filtri:</strong>
    <label>Ruolo
      <select data-filter="role" style="margin-left:4px">
        ${opt('', 'Tutti')}${opt('POR','POR')}${opt('DIF','DIF')}${opt('CEN','CEN')}${opt('ATT','ATT')}
      </select>
    </label>
    <label>Età
      <input type="number" data-filter="ageMin" value="${f.ageMin}" min="16" max="40" style="width:52px;margin-left:4px"> -
      <input type="number" data-filter="ageMax" value="${f.ageMax}" min="16" max="40" style="width:52px">
    </label>
    <label>Forza
      <input type="number" data-filter="strMin" value="${f.strMin}" min="0" max="100" style="width:52px;margin-left:4px"> -
      <input type="number" data-filter="strMax" value="${f.strMax}" min="0" max="100" style="width:52px">
    </label>
    <button class="mm-btn" data-action="filter-reset" style="padding:2px 10px;font-size:.8rem">Reset</button>
  </div>`;
}

function wireFilterBar(overlay, filter, render) {
  overlay.querySelectorAll('[data-filter]').forEach(el => {
    el.addEventListener('change', () => {
      const key = el.dataset.filter;
      if (key === 'role') filter.role = el.value;
      else filter[key] = Math.max(0, +el.value || 0);
      render();
    });
  });
  const resetBtn = overlay.querySelector('[data-action="filter-reset"]');
  if (resetBtn) resetBtn.addEventListener('click', () => {
    filter.role = ''; filter.ageMin = 16; filter.ageMax = 40; filter.strMin = 0; filter.strMax = 100;
    render();
  });
}

function showWinterMarketModal(onConfirm) {
  const preContractIds = new Set(pendingPreContracts.map(pc => pc.player.id));
  const boughtIds = new Set();
  let activeTab = 'acquisti';
  const filter = { role: '', ageMin: 16, ageMax: 40, strMin: 0, strMax: 100 };

  const overlay = document.createElement('div');
  overlay.className = 'mm-overlay';

  // Giocatori in scadenza da altre squadre (pre-contratto gratuito per la prossima stagione)
  const expiringTargets = [...serieA, ...serieB, ...serieC]
    .filter(t => t !== playerTeam)
    .flatMap(t => t.roster
      .filter(p => p.contract && p.contract.duration <= 1)
      .map(p => ({ player: p, fromTeam: t }))
    )
    .sort((a, b) => b.player.strength - a.player.strength);

  const buildAcquistiTab = () => {
    let html = buildFilterBar(filter);
    const cap = leagueStrCap(playerTeam.leagueLevel);
    const mktItems = pendingTransferMarket
      .filter(item => !boughtIds.has(item.player.id) && item.player.strength <= cap && canAddRole(playerTeam, item.player.role) && matchesFilter(item.player, filter))
      .sort((a, b) => b.player.strength - a.player.strength);
    const faItems = freeAgents
      .filter(p => !boughtIds.has(p.id) && p.strength <= cap && canAddRole(playerTeam, p.role) && matchesFilter(p, filter))
      .sort((a, b) => b.strength - a.strength)
      .slice(0, 30);
    if (!mktItems.length && !faItems.length) {
      html += '<p class="mm-empty">Nessun giocatore corrisponde ai filtri selezionati.</p>';
      return html;
    }
    mktItems.forEach(({ player: p, fromTeam, askingPrice }) => {
      const canAfford = playerTeam.budget >= askingPrice;
      const overCap = !wageCapAllows(playerTeam, p.contract?.salary ?? getDisplaySalary(p.strength));
      const label = overCap ? '🚫 Monte ingaggi' : canAfford ? 'Acquista' : 'Fondi insuff.';
      html += `<div class="mm-row">
        <div class="mm-pinfo"><span class="mm-name">${p.firstName} ${p.lastName}</span><span class="mm-badge role-${p.role}">${p.role}</span><span style="font-size:.78rem;color:#666">${formatSubRoles(p)}</span><span>${p.age}a</span><span>⚡${p.strength}</span><span class="mm-from-tag">da ${fromTeam.name}</span></div>
        <div class="mm-acts"><strong class="mm-price">${askingPrice.toFixed(1)}M€</strong>
          <button class="mm-btn mm-blue" data-action="wm-buy-market" data-pid="${p.id}" ${(canAfford && !overCap) ? '' : 'disabled'}>${label}</button>
        </div></div>`;
    });
    faItems.forEach(p => {
      const overCap = !wageCapAllows(playerTeam, getDisplaySalary(p.strength));
      html += `<div class="mm-row">
        <div class="mm-pinfo"><span class="mm-name">${p.firstName} ${p.lastName}</span><span class="mm-badge role-${p.role}">${p.role}</span><span style="font-size:.78rem;color:#666">${formatSubRoles(p)}</span><span>${p.age}a</span><span>⚡${p.strength}</span><span class="mm-free-tag">Svincolato</span></div>
        <div class="mm-acts"><strong class="mm-price">Gratis</strong>
          ${overCap ? '' : durationSelectHtml('data-dur-sign', p.id)}
          <button class="mm-btn mm-blue" data-action="wm-buy-fa" data-pid="${p.id}" ${overCap ? 'disabled' : ''}>${overCap ? '🚫 Monte ingaggi' : 'Firma'}</button>
        </div></div>`;
    });
    return html;
  };

  const buildPreContrattiTab = () => {
    const cap = leagueStrCap(playerTeam.leagueLevel);
    let html = buildFilterBar(filter);
    const available = expiringTargets.filter(({ player }) => !preContractIds.has(player.id) && player.strength <= cap && matchesFilter(player, filter));
    if (pendingPreContracts.length) {
      pendingPreContracts.forEach(({ player: p }) => {
        html += `<div class="mm-row mm-done">✅ <strong>${p.firstName} ${p.lastName}</strong> (${p.role}, ⚡${p.strength}) — arriverà la prossima stagione</div>`;
      });
    }
    if (!available.length) {
      html += '<p class="mm-empty">Nessun giocatore in scadenza corrisponde ai filtri.</p>';
      return html;
    }
    available.forEach(({ player: p, fromTeam }) => {
      const canAdd = canAddRole(playerTeam, p.role);
      html += `<div class="mm-row">
        <div class="mm-pinfo"><span class="mm-name">${p.firstName} ${p.lastName}</span><span class="mm-badge role-${p.role}">${p.role}</span><span style="font-size:.78rem;color:#666">${formatSubRoles(p)}</span><span>${p.age}a</span><span>⚡${p.strength}</span><span class="mm-from-tag">da ${fromTeam.name}</span><span style="font-size:.75rem;color:#e67e22">📋 Scade a fine stagione</span></div>
        <div class="mm-acts"><strong class="mm-price">Gratis (pross. stagione)</strong>
          <button class="mm-btn mm-green" data-action="wm-precontract" data-pid="${p.id}" ${canAdd ? '' : 'disabled'}>${canAdd ? 'Firma Pre-contratto' : 'Rosa completa'}</button>
        </div></div>`;
    });
    return html;
  };

  const buildRosaTab = () => {
    if (!playerTeam.roster.length) return '<p class="mm-empty">Rosa vuota.</p>';
    const roleOrder = { POR: 0, DIF: 1, CEN: 2, ATT: 3 };
    const sorted = [...playerTeam.roster].sort((a, b) => (roleOrder[a.role] - roleOrder[b.role]) || b.strength - a.strength);
    const rows = sorted.map(p => {
      const durVal = p.contract?.duration;
      const dur = (!durVal || durVal <= 0) ? '<span style="color:#e05050">⚠️ scad.</span>' : `${durVal}a`;
      const sal = p.contract?.salary ?? getDisplaySalary(p.strength);
      const injury = (p.injuryMatchesLeft || 0) > 0 ? `<span style="color:#e05050;font-size:.75rem"> 🤕${p.injuryMatchesLeft}gg</span>` : '';
      const susp = (p.suspendedMatchesLeft || 0) > 0 ? `<span style="color:#e05050;font-size:.75rem"> 🚫</span>` : '';
      return `<tr class="db-row-clickable" data-player-id="${p.id}">
        <td><span class="player-name-link">${p.firstName} ${p.lastName}</span>${injury}${susp}</td>
        <td>${p.role}</td><td style="font-size:.82rem;color:#666">${formatSubRoles(p)}</td><td>${p.age}</td>
        <td><strong>${p.strength}</strong></td>
        <td>${sal}k€/mese</td><td>${dur}</td>
      </tr>`;
    }).join('');
    return `<table style="font-size:.85rem">
      <thead><tr><th>Nome</th><th>Ruolo</th><th>Posizione</th><th>Età</th><th>Forza</th><th>Stipendio</th><th>Contratto</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>`;
  };

  const render = () => {
    const tabContent = activeTab === 'acquisti' ? buildAcquistiTab()
      : activeTab === 'precontratti' ? buildPreContrattiTab()
      : buildRosaTab();
    overlay.innerHTML = `
      <div class="mm-box">
        <div class="mm-header">
          <span class="mm-title">❄️ ${playerTeam.name} — Mercato Invernale</span>
          <span class="mm-budget">Budget: <strong>${playerTeam.budget.toFixed(1)}M€</strong> &nbsp;|&nbsp; Monte ingaggi: <strong>${getTeamWageBill(playerTeam)}/${Number.isFinite(playerTeam.wageBudgetCap) ? playerTeam.wageBudgetCap : '—'}</strong>k€ &nbsp;|&nbsp; Rosa: <strong>${playerTeam.roster.length}</strong></span>
        </div>
        <div class="mm-tabs">
          <button class="mm-tab${activeTab==='acquisti'?' active':''}" data-tab="acquisti">Acquisti</button>
          <button class="mm-tab${activeTab==='precontratti'?' active':''}" data-tab="precontratti">Pre-contratti${pendingPreContracts.length > 0 ? ` <span class="mm-badge-count" style="background:#15803d">${pendingPreContracts.length}</span>` : ''}</button>
          <button class="mm-tab${activeTab==='rosa'?' active':''}" data-tab="rosa">Rosa (${playerTeam.roster.length})</button>
        </div>
        <div class="mm-content">${tabContent}</div>
        <div class="mm-footer">
          <span class="mm-footer-note">${pendingPreContracts.length > 0 ? `✅ ${pendingPreContracts.length} pre-contratto/i firmato/i` : 'Mercato invernale — sessione di gennaio'}</span>
          <button class="mm-btn mm-confirm" id="wm-confirm">Chiudi Mercato Invernale →</button>
        </div>
      </div>`;

    overlay.querySelectorAll('.mm-tab').forEach(btn =>
      btn.addEventListener('click', () => { activeTab = btn.dataset.tab; render(); })
    );

    wireFilterBar(overlay, filter, render);

    overlay.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', () => {
        const { action, pid } = btn.dataset;
        const id = +pid;
        if (action === 'filter-reset') return; // gestito da wireFilterBar

        if (action === 'wm-buy-market') {
          const item = pendingTransferMarket.find(i => i.player.id === id);
          const salaryMk = item ? (item.player.contract?.salary ?? getDisplaySalary(item.player.strength)) : 0;
          if (item && playerTeam.budget >= item.askingPrice && canAddRole(playerTeam, item.player.role) && !boughtIds.has(id) && wageCapAllows(playerTeam, salaryMk)) {
            const { player: p, fromTeam, askingPrice } = item;
            fromTeam.roster = fromTeam.roster.filter(x => x !== p);
            playerTeam.roster.push(p);
            playerTeam.budget -= askingPrice;
            fromTeam.budget += askingPrice;
            recalculateTeamStrength(fromTeam);
            recalculateTeamStrength(playerTeam);
            recordTransfer(p, playerTeam.name, askingPrice);
            transferLog.push(`❄️ <strong>${fromTeam.name}</strong> → <strong>${playerTeam.name}</strong>: ${p.firstName} ${p.lastName} per <strong>${askingPrice.toFixed(1)}M€</strong>`);
            boughtIds.add(id);
          }
        } else if (action === 'wm-buy-fa') {
          const p = freeAgents.find(p => p.id === id);
          const salaryFa = p ? getDisplaySalary(p.strength) : 0;
          if (p && canAddRole(playerTeam, p.role) && !boughtIds.has(id) && wageCapAllows(playerTeam, salaryFa)) {
            freeAgents.splice(freeAgents.indexOf(p), 1);
            playerTeam.roster.push(p);
            const years = +(overlay.querySelector(`select[data-dur-sign="${id}"]`)?.value) || 3;
            p.contract = createContract(p.strength, p.age);
            p.contract.duration = years;
            recalculateTeamStrength(playerTeam);
            recordTransfer(p, playerTeam.name, 0);
            transferLog.push(`❄️ <strong>${playerTeam.name}</strong> ingaggia ${p.firstName} ${p.lastName} (Forza: ${p.strength}) — contratto ${years} anni`);
            boughtIds.add(id);
          }
        } else if (action === 'wm-precontract') {
          const target = expiringTargets.find(t => t.player.id === id);
          if (target && canAddRole(playerTeam, target.player.role) && !preContractIds.has(id) && target.player.strength <= leagueStrCap(playerTeam.leagueLevel)) {
            // toTeam: il pre-contratto appartiene al club, non al DS (che può andarsene)
            pendingPreContracts.push({ ...target, toTeam: playerTeam });
            preContractIds.add(id);
            transferLog.push(`📋 Pre-contratto: <strong>${playerTeam.name}</strong> firma con ${target.player.firstName} ${target.player.lastName} — arriverà la prossima stagione`);
          }
        }
        render();
      });
    });

    overlay.querySelector('#wm-confirm').addEventListener('click', () => {
      overlay.remove();
      onConfirm();
    });
  };

  render();
  document.body.appendChild(overlay);
}

function finishAndata() {
  displaySchedule('serieA', s_roundsA, []);
  displaySchedule('serieB', s_roundsB, []);
  displaySchedule('serieC', s_roundsC, []);
  ['serieA', 'serieB', 'serieC'].forEach(id => {
    const h = document.getElementById('current-matchday-' + id);
    if (h) h.remove();
  });
  currentMatchday = 0;
  runWinterAITransfers();
  if (playerTeam) {
    showWinterMarketModal(() => {
      recalculateTeamStrength(playerTeam);
      seasonPhase = 2;
      updateSeasonBtn();
      saveGame();
    });
  } else {
    seasonPhase = 2;
    updateSeasonBtn();
    saveGame();
  }
}

function finishSeason() {
  displayStandings('serieA', standingsA);
  displayStandings('serieB', standingsB);
  displayStandings('serieC', standingsC);
  displayTopScorers('serieA', serieA);
  displayTopScorers('serieB', serieB);
  displayTopScorers('serieC', serieC);
  displaySchedule('serieA', s_roundsA, s_returnRoundsA);
  displaySchedule('serieB', s_roundsB, s_returnRoundsB);
  displaySchedule('serieC', s_roundsC, s_returnRoundsC);
  ['serieA', 'serieB', 'serieC'].forEach(id => {
    const h = document.getElementById('current-matchday-' + id);
    if (h) h.remove();
  });

  s_coppaResult = simulateCoppaItalia(serieA, serieB);
  displayCoppaItalia(s_coppaResult);

  seasonCount++;
  championsHistory.push({
    season: seasonCount,
    serieA: getWinner(standingsA),
    serieB: getWinner(standingsB),
    serieC: getWinner(standingsC),
    coppaItalia: s_coppaResult.winner.name
  });
  displayHistory();
  displayHallOfFame();

  seasonPhase = 4;
  updateSeasonBtn();
  saveGame();
}

document.getElementById('simulaStagione').addEventListener('click', function () {

  // ── FASE 0: genera calendario ────────────────────────────────────────────
  if (seasonPhase === 0) {
    transferLog = [];
    standingsA = {};
    standingsB = {};
    standingsC = {};
    currentMatchday = 0;

    // Applica pre-contratti firmati nel mercato invernale.
    // Il pre-contratto appartiene al club firmatario (toTeam): vale anche se
    // il DS nel frattempo se n'è andato o è stato esonerato.
    if (pendingPreContracts.length > 0) {
      const touchedTeams = new Set();
      pendingPreContracts.forEach(({ player, fromTeam, toTeam }) => {
        const dest = toTeam || playerTeam; // fallback per salvataggi senza toTeam
        // Rimuovi da fromTeam (se ancora lì)
        if (fromTeam && fromTeam.roster) {
          fromTeam.roster = fromTeam.roster.filter(p => p !== player);
          recalculateTeamStrength(fromTeam);
        }
        // Rimuovi da freeAgents se il contratto è scaduto e l'AI l'ha svincolato
        const faIdx = freeAgents.indexOf(player);
        if (faIdx >= 0) freeAgents.splice(faIdx, 1);
        // Aggiungi al club firmatario solo se non è già in rosa (evita duplicati)
        if (dest && dest.roster && canAddRole(dest, player.role) && !dest.roster.includes(player)) {
          dest.roster.push(player);
          touchedTeams.add(dest);
          recordTransfer(player, dest.name, 0);
          transferLog.push(`✍️ Pre-contratto: <strong>${player.firstName} ${player.lastName}</strong> arriva a <strong>${dest.name}</strong> (parametro zero)`);
        } else {
          // Nessuna destinazione valida: il giocatore resta svincolato
          freeAgents.push(player);
          transferLog.push(`🔚 Pre-contratto sfumato: <em>${player.firstName} ${player.lastName}</em> resta svincolato`);
        }
      });
      touchedTeams.forEach(t => recalculateTeamStrength(t));
      pendingPreContracts = [];
    }

    // Reset statistiche stagionali e disponibilità
    [...serieA, ...serieB, ...serieC].forEach(team => {
      team.roster.forEach(p => {
        p.seasonGoals = 0;
        p.seasonAssists = 0;
        p.yellowCards = 0;
        p.injuryMatchesLeft = 0;
        p.suspendedMatchesLeft = 0;
      });
    });

    document.getElementById('serieA').innerHTML = '';
    document.getElementById('serieB').innerHTML = '';
    document.getElementById('serieC').innerHTML = '';

    setObjectives(serieA);
    setObjectives(serieB);
    setObjectives(serieC);

    displayPreSeasonStandings('serieA', serieA);
    displayPreSeasonStandings('serieB', serieB);
    displayPreSeasonStandings('serieC', serieC);

    shuffleArray(serieA);
    s_roundsA = generateRoundRobin(serieA);
    s_returnRoundsA = generateReturnRound(s_roundsA);

    shuffleArray(serieB);
    s_roundsB = generateRoundRobin(serieB);
    s_returnRoundsB = generateReturnRound(s_roundsB);

    shuffleArray(serieC);
    s_roundsC = generateRoundRobin(serieC);
    s_returnRoundsC = generateReturnRound(s_roundsC);

    seasonPhase = 1;
    updateSeasonBtn();
    saveGame();
    return;
  }

  // ── FASE 1: gioca una giornata di andata ─────────────────────────────────
  if (seasonPhase === 1) {
    const numRounds = getNumRounds();

    // L'ultima giornata è già stata mostrata dal click precedente: qui si
    // procede alla chiusura del girone d'andata SENZA simulare nulla, così
    // il risultato dell'ultima giornata resta visibile un click in più
    // invece di essere sovrascritto nella stessa frazione di secondo.
    if (currentMatchday >= numRounds) {
      finishAndata();
      return;
    }

    simulateOneRound(s_roundsA[currentMatchday], standingsA);
    simulateOneRound(s_roundsB[currentMatchday], standingsB);
    simulateOneRound(s_roundsC[currentMatchday], standingsC);
    processMatchdayRecovery();

    const mdNum = currentMatchday + 1;
    displaySingleMatchday('serieA', s_roundsA[currentMatchday], mdNum, 'andata');
    displaySingleMatchday('serieB', s_roundsB[currentMatchday], mdNum, 'andata');
    displaySingleMatchday('serieC', s_roundsC[currentMatchday], mdNum, 'andata');

    displayStandings('serieA', standingsA, true);
    displayStandings('serieB', standingsB, true);
    displayStandings('serieC', standingsC, true);
    displayTopScorers('serieA', serieA);
    displayTopScorers('serieB', serieB);
    displayTopScorers('serieC', serieC);

    currentMatchday++;
    updateSeasonBtn();
    saveGame();
    return;
  }

  // ── FASE 2: inizia ritorno ───────────────────────────────────────────────
  if (seasonPhase === 2) {
    seasonPhase = 3;
    currentMatchday = 0;
    updateSeasonBtn();
    saveGame();
    return;
  }

  // ── FASE 3: gioca una giornata di ritorno ────────────────────────────────
  if (seasonPhase === 3) {
    const numRounds = getNumRounds();

    // Come in fase 1: l'ultima giornata (es. la 38ª) resta visibile un click
    // in più prima di passare a fine stagione / classifica finale, invece di
    // essere sovrascritta nello stesso click che l'ha appena mostrata.
    if (currentMatchday >= numRounds) {
      finishSeason();
      return;
    }

    simulateOneRound(s_returnRoundsA[currentMatchday], standingsA);
    simulateOneRound(s_returnRoundsB[currentMatchday], standingsB);
    simulateOneRound(s_returnRoundsC[currentMatchday], standingsC);
    processMatchdayRecovery();

    const mdNum = currentMatchday + 1 + numRounds;
    displaySingleMatchday('serieA', s_returnRoundsA[currentMatchday], mdNum, 'ritorno');
    displaySingleMatchday('serieB', s_returnRoundsB[currentMatchday], mdNum, 'ritorno');
    displaySingleMatchday('serieC', s_returnRoundsC[currentMatchday], mdNum, 'ritorno');

    displayStandings('serieA', standingsA);
    displayStandings('serieB', standingsB);
    displayStandings('serieC', standingsC);
    displayTopScorers('serieA', serieA);
    displayTopScorers('serieB', serieB);
    displayTopScorers('serieC', serieC);

    currentMatchday++;
    updateSeasonBtn();
    saveGame();
    return;
  }

  // ── FASE 4: valutazione DS, promozioni, mercato, nuova stagione ──────────
  if (seasonPhase === 4) {
    // Dati per la valutazione del DS umano: vanno raccolti PRIMA delle promozioni
    const evalData = (dsCareer && playerTeam) ? collectSeasonEvalData() : null;
    const teamBeforeEval = playerTeam; // per capire se il club cambia durante la valutazione

    [serieA, serieB, serieC] = handlePromotionsAndRelegations(standingsA, standingsB, standingsC, serieA, serieB, serieC);
    updateTeamStrengths(standingsA, standingsB, standingsC, serieA, serieB, serieC);

    const proceedWithMarket = () => {
      if (playerTeam) {
        // Se il club è lo stesso della scorsa stagione il presidente rinnova i paletti;
        // se è cambiato (esonero/corteggiamento) li ha già fissati hirePlayerAsDS.
        if (playerTeam === teamBeforeEval) briefPresidentBudget(playerTeam);
        showPresidentBriefingModal(playerTeam, () => {
          showManagerMarketModal(() => {
            ensureMinRoster(playerTeam);
            recalculateTeamStrength(playerTeam);
            displayTransferLog();
            seasonPhase = 0;
            updateSeasonBtn();
            saveGame();
          });
        });
      } else {
        displayTransferLog();
        seasonPhase = 0;
        updateSeasonBtn();
        saveGame();
      }
    };

    if (evalData) {
      showSeasonEvaluationModal(evalData, proceedWithMarket);
    } else if (dsCareer && !playerTeam) {
      // DS disoccupato: la stagione di inattività costa reputazione, poi nuove offerte
      dsCareer.reputation = Math.max(5, dsCareer.reputation - 2);
      dsCareer.seasonsUnemployed++;
      showMyTeamBadge();
      pendingTransferMarket = []; // scarta il mercato stantio delle sessioni precedenti
      showJobOffersModal(generateDSJobOffers(), proceedWithMarket);
    } else {
      proceedWithMarket();
    }
  }
});

// ── BOTTONE SIMULA TUTTO (fast-forward) ──────────────────────────────────────
document.getElementById('simulaTutto')?.addEventListener('click', function () {
  const numRounds = getNumRounds();

  if (seasonPhase === 1) {
    while (currentMatchday < numRounds) {
      simulateOneRound(s_roundsA[currentMatchday], standingsA);
      simulateOneRound(s_roundsB[currentMatchday], standingsB);
      simulateOneRound(s_roundsC[currentMatchday], standingsC);
      processMatchdayRecovery();
      currentMatchday++;
    }
    displayStandings('serieA', standingsA, true);
    displayStandings('serieB', standingsB, true);
    displayStandings('serieC', standingsC, true);
    displayTopScorers('serieA', serieA);
    displayTopScorers('serieB', serieB);
    displayTopScorers('serieC', serieC);
    finishAndata();
    return;
  }

  // Se siamo in fase 2, salta a fase 3 e poi fast-forward
  if (seasonPhase === 2) {
    seasonPhase = 3;
    currentMatchday = 0;
  }

  if (seasonPhase === 3) {
    while (currentMatchday < numRounds) {
      simulateOneRound(s_returnRoundsA[currentMatchday], standingsA);
      simulateOneRound(s_returnRoundsB[currentMatchday], standingsB);
      simulateOneRound(s_returnRoundsC[currentMatchday], standingsC);
      processMatchdayRecovery();
      currentMatchday++;
    }
    finishSeason();
  }
});

// Crea i modal una sola volta all'avvio
createTeamDetailsModal();
createDatabaseModal();
document.getElementById('open-database-btn').addEventListener('click', e => { e.preventDefault(); openDatabase(); });

function handlePromotionsAndRelegations(standingsA, standingsB, standingsC, currentSerieA, currentSerieB, currentSerieC) {
  const NUM_TEAMS_PROMOTION_RELEGATION = 4;

  // Helper per ordinare la classifica e restituire un array
  const sortStandings = (standings) => Object.entries(standings)
    .map(([name, stats]) => ({ name, ...stats }))
    .sort((a, b) => b.points - a.points);

  const sortedA = sortStandings(standingsA);
  const sortedB = sortStandings(standingsB);
  const sortedC = sortStandings(standingsC);

  // Estrai i nomi delle squadre da promuovere/retrocedere
  const relegatedFromANames = sortedA.slice(-NUM_TEAMS_PROMOTION_RELEGATION).map(t => t.name);
  const promotedFromBNames = sortedB.slice(0, NUM_TEAMS_PROMOTION_RELEGATION).map(t => t.name);
  const relegatedFromBNames = sortedB.slice(-NUM_TEAMS_PROMOTION_RELEGATION).map(t => t.name);
  const promotedFromCNames = sortedC.slice(0, NUM_TEAMS_PROMOTION_RELEGATION).map(t => t.name);

  // Trova gli oggetti squadra completi
  const relegatedFromAToB = currentSerieA.filter(t => relegatedFromANames.includes(t.name));
  const promotedFromBToA = currentSerieB.filter(t => promotedFromBNames.includes(t.name));
  const relegatedFromBToC = currentSerieB.filter(t => relegatedFromBNames.includes(t.name));
  const promotedFromCToB = currentSerieC.filter(t => promotedFromCNames.includes(t.name));

  // Costruisci le nuove leghe
  const newSerieA = currentSerieA.filter(t => !relegatedFromANames.includes(t.name)).concat(promotedFromBToA);
  const newSerieB = currentSerieB.filter(t => !promotedFromBNames.includes(t.name) && !relegatedFromBNames.includes(t.name)).concat(relegatedFromAToB, promotedFromCToB);
  const newSerieC = currentSerieC.filter(t => !promotedFromCNames.includes(t.name)).concat(relegatedFromBToC);

  console.log("Retrocessioni da A a B:", relegatedFromAToB);
  console.log("Promozioni da B a A:", promotedFromBToA);
  console.log("Retrocessioni da B a C:", relegatedFromBToC);
  console.log("Promozioni da C a B:", promotedFromCToB);
  console.log("Nuova Serie A:", newSerieA.map(t => t.name));
  console.log("Nuova Serie B:", newSerieB.map(t => t.name));
  console.log("Nuova Serie C:", newSerieC.map(t => t.name));

  return [newSerieA, newSerieB, newSerieC];
}

function updateTeamStrengths(standingsA, standingsB, standingsC, newSerieA, newSerieB, newSerieC) {
  const allTeams = [...newSerieA, ...newSerieB, ...newSerieC];
  const newSerieANames = new Set(newSerieA.map(t => t.name));
  const newSerieBNames = new Set(newSerieB.map(t => t.name));
  const teamMap = new Map(allTeams.map(team => [team.name, team]));

  // I prestiti in corso rientrano al club di appartenenza a inizio stagione,
  // PRIMA di qualunque altra logica di mercato/rosa: da qui in poi ogni ciclo
  // AI (vendite, eccedenze, scouting) opera solo su rose realmente possedute.
  resolveLoanReturns();

  // Salva la lega precedente PRIMA di sovrascrivere (serve per bonus promozione)
  const prevLeagueMap = {};
  allTeams.forEach(t => { prevLeagueMap[t.name] = t.leagueLevel; });

  // Segna la lega corrente su ogni squadra (usata da createYouthPlayer e dal mercato)
  newSerieA.forEach(t => t.leagueLevel = 'A');
  newSerieB.forEach(t => t.leagueLevel = 'B');
  newSerieC.forEach(t => t.leagueLevel = 'C');

  // --- STEP 0: ESONERI ALLENATORI ---
  const checkDismissals = (standings) => {
    const sorted = Object.entries(standings).sort((a, b) => b[1].points - a[1].points);
    sorted.forEach(([teamName], actualRankIdx) => {
      const team = teamMap.get(teamName);
      if (!team || !team.coach || !team.objective) return;
      if (playerTeam && team === playerTeam) return; // il giocatore gestisce l'allenatore dalla tab Panchina
      const actualRank = actualRankIdx + 1;
      const failedObjective = actualRank > team.objective.maxRank + 3;
      const casualFire = Math.random() < 0.08;
      if ((failedObjective && Math.random() < 0.65) || casualFire) {
        transferLog.push(`🚨 <strong>${team.name}</strong> esonerato <em>${team.coach.firstName} ${team.coach.lastName}</em> — obiettivo: ${team.objective.description}, finito: ${actualRank}°`);
        freeCoaches.push(team.coach);
        team.coach = null;
      }
    });
  };
  checkDismissals(standingsA);
  checkDismissals(standingsB);
  checkDismissals(standingsC);

  // --- STEP 0b: VALUTAZIONE DS (esonero se sottoperforma, poaching se overperforma) ---
  const checkDSPerformance = (standings) => {
    Object.entries(standings).sort((a, b) => b[1].points - a[1].points)
      .forEach(([teamName], actualRankIdx) => {
        const team = teamMap.get(teamName);
        if (!team || !team.ds || team.ds.isHuman || !team.objective) return;
        const actualRank = actualRankIdx + 1;
        const failed = actualRank > team.objective.maxRank + 4;
        if ((failed && Math.random() < 0.45) || Math.random() < 0.05) {
          transferLog.push(`📊 <strong>${team.name}</strong> ha esonerato il DS <em>${team.ds.firstName} ${team.ds.lastName}</em> — obiettivo: ${team.objective.description}, finito: ${actualRank}°`);
          freeDirectors.push(team.ds);
          team.ds = null;
        } else {
          team.dsOverperformed = actualRank < team.objective.maxRank - 2;
        }
      });
  };
  checkDSPerformance(standingsA);
  checkDSPerformance(standingsB);
  checkDSPerformance(standingsC);

  // Poaching DS: basato sulla forza del DS, non sulla performance (un DS da 80 in Serie C è appetibile)
  [...newSerieC, ...newSerieB].forEach(lowerTeam => {
    if (!lowerTeam.ds || lowerTeam.ds.isHuman) return;
    const dsStr = lowerTeam.ds.strength;
    // Soglia: DS in C sopra 60, DS in B sopra 70 attraggono club superiori
    const minPoachStr = lowerTeam.leagueLevel === 'C' ? 60 : 70;
    if (dsStr < minPoachStr) return;
    // Più è forte, più è probabile essere corteggiato
    const poachChance = Math.min(0.75, (dsStr - minPoachStr) * 0.03 + 0.30);
    if (Math.random() > poachChance) return;
    const bigLeague = lowerTeam.leagueLevel === 'C' ? newSerieB : newSerieA;
    const interested = bigLeague
      .filter(t => !t.ds || (!t.ds.isHuman && t.ds.strength < dsStr - 8))
      .sort((a, b) => (a.ds?.strength || 0) - (b.ds?.strength || 0))[0]; // preferisce chi ha DS più debole
    if (!interested) return;
    const ds = lowerTeam.ds;
    if (interested.ds) freeDirectors.push(interested.ds);
    interested.ds = ds;
    lowerTeam.ds = null;
    transferLog.push(`📊 <strong>${interested.name}</strong> ha ingaggiato il DS <em>${ds.firstName} ${ds.lastName}</em> (Forza: ${ds.strength}) da <strong>${lowerTeam.name}</strong>`);
  });

  // Poaching Allenatori: stessa logica del DS ma meno aggressiva
  [...newSerieC, ...newSerieB].forEach(lowerTeam => {
    if (!lowerTeam.coach || (playerTeam && lowerTeam === playerTeam)) return;
    const coachStr = lowerTeam.coach.strength;
    const minPoachStr = lowerTeam.leagueLevel === 'C' ? 60 : 68;
    if (coachStr < minPoachStr) return;
    const poachChance = Math.min(0.60, (coachStr - minPoachStr) * 0.025 + 0.25);
    if (Math.random() > poachChance) return;
    const bigLeague = lowerTeam.leagueLevel === 'C' ? newSerieB : newSerieA;
    const interested = bigLeague
      .filter(t => t !== playerTeam && (!t.coach || t.coach.strength < coachStr - 8))
      .sort((a, b) => (a.coach?.strength || 0) - (b.coach?.strength || 0))[0];
    if (!interested) return;
    const coach = lowerTeam.coach;
    if (interested.coach) freeCoaches.push(interested.coach);
    coach.contract = { duration: 2 + Math.floor(Math.random() * 3) }; // nuovo contratto col club che lo preleva
    interested.coach = coach;
    lowerTeam.coach = null;
    transferLog.push(`🚨 <strong>${interested.name}</strong> ha ingaggiato l'allenatore <em>${coach.firstName} ${coach.lastName}</em> (Forza: ${coach.strength}) da <strong>${lowerTeam.name}</strong>`);
  });

  // --- STEP 1: ETÀ SVINCOLATI ---
  freeAgents.forEach(p => ageProgressPlayer(p));
  freeAgents = freeAgents.filter(p => p.age <= 36);

  // --- STEP 1b: ETÀ ALLENATORI ---
  freeCoaches.forEach(c => ageProgressCoach(c));
  freeCoaches = freeCoaches.filter(c => c.age <= 70);
  allTeams.forEach(team => {
    if (!team.coach) return;
    ageProgressCoach(team.coach);
    if (team.coach.age > 70) {
      transferLog.push(`🎓 <em>${team.coach.firstName} ${team.coach.lastName}</em> si ritira dalla panchina di <strong>${team.name}</strong>`);
      team.coach = null;
    }
  });

  // --- STEP 1b-bis: CONTRATTI ALLENATORI (scadenza e rinnovo) ---
  allTeams.forEach(team => {
    if (!team.coach) return;
    if (!team.coach.contract) team.coach.contract = { duration: 2 + Math.floor(Math.random() * 3) }; // legacy senza contratto
    team.coach.contract.duration--;
    if (team.coach.contract.duration > 0) return;
    if (playerTeam && team === playerTeam) return; // il giocatore decide dalla tab Panchina
    const coach = team.coach;
    if (Math.random() < 0.75) {
      coach.contract.duration = 2 + Math.floor(Math.random() * 3);
      transferLog.push(`📄 <strong>${team.name}</strong> rinnova il contratto di <em>${coach.firstName} ${coach.lastName}</em> (${coach.contract.duration} anni)`);
    } else {
      transferLog.push(`📄 <em>${coach.firstName} ${coach.lastName}</em> lascia <strong>${team.name}</strong> a fine contratto`);
      freeCoaches.push(coach);
      team.coach = null;
    }
  });

  // --- STEP 1c: ETÀ E RITIRO DIRETTORI SPORTIVI ---
  freeDirectors.forEach(d => ageProgressCoach(d));
  freeDirectors = freeDirectors.filter(d => d.age <= 70);
  allTeams.forEach(team => {
    if (!team.ds || team.ds.isHuman) return; // età/ritiro del DS umano gestiti dalla carriera
    ageProgressCoach(team.ds);
    if (team.ds.age > 70) {
      transferLog.push(`📊 <em>${team.ds.firstName} ${team.ds.lastName}</em> si ritira come DS di <strong>${team.name}</strong>`);
      team.ds = null;
    }
  });

  // Upgrade attivo: le squadre cercano staff migliore tra i liberi ogni stagione
  // Le squadre più blasonate hanno la precedenza nel mercato (vanno per prime)
  [...allTeams].sort((a, b) => getTeamPrestige(b.name) - getTeamPrestige(a.name)).forEach(team => {
    // Upgrade DS: se c'è un libero significativamente più forte, lo ingaggia
    if (team.ds && !team.ds.isHuman && freeDirectors.length > 0) {
      const minGap = 10; // deve essere almeno 10 punti più forte
      const betterDs = freeDirectors
        .filter(d => d.strength > team.ds.strength + minGap)
        .sort((a, b) => b.strength - a.strength)[0];
      if (betterDs && Math.random() < 0.55) {
        freeDirectors.splice(freeDirectors.indexOf(betterDs), 1);
        freeDirectors.push(team.ds);
        team.ds = betterDs;
        transferLog.push(`📊 <strong>${team.name}</strong> migliora il DS: <em>${betterDs.firstName} ${betterDs.lastName}</em> (Forza: ${betterDs.strength})`);
      }
    }
    // Upgrade Coach: meno frequente
    if (team.coach && freeCoaches.length > 0 && !(playerTeam && team === playerTeam)) {
      const minGap = 12;
      const betterCoach = freeCoaches
        .filter(c => c.strength > team.coach.strength + minGap)
        .sort((a, b) => b.strength - a.strength)[0];
      if (betterCoach && Math.random() < 0.40) {
        freeCoaches.splice(freeCoaches.indexOf(betterCoach), 1);
        freeCoaches.push(team.coach);
        betterCoach.contract = { duration: 2 + Math.floor(Math.random() * 3) };
        team.coach = betterCoach;
        transferLog.push(`✅ <strong>${team.name}</strong> cambia allenatore: <em>${betterCoach.firstName} ${betterCoach.lastName}</em> (Forza: ${betterCoach.strength})`);
      }
    }
  });

  // Ingaggio nuovo allenatore per squadre rimaste senza (ordine per blasone)
  // Il giocatore è escluso: sceglie l'allenatore dalla tab Panchina del mercato estivo
  [...allTeams].sort((a, b) => getTeamPrestige(b.name) - getTeamPrestige(a.name)).forEach(team => {
    if (team.coach || (playerTeam && team === playerTeam)) return;
    // Nessun cap per i liberi: un allenatore forte è appetibile a qualsiasi livello
    const candidateIdx = freeCoaches
      .map((c, i) => ({ c, i }))
      .sort((a, b) => b.c.strength - a.c.strength)[0]?.i;
    if (candidateIdx !== undefined) {
      const coach = freeCoaches.splice(candidateIdx, 1)[0];
      coach.contract = { duration: 2 + Math.floor(Math.random() * 3) };
      team.coach = coach;
      transferLog.push(`✅ <strong>${team.name}</strong> ingaggia <em>${coach.firstName} ${coach.lastName}</em> (Forza: ${coach.strength})`);
    } else {
      team.coach = createCoach(team);
      transferLog.push(`✅ <strong>${team.name}</strong> crea <em>${team.coach.firstName} ${team.coach.lastName}</em> (Forza: ${team.coach.strength})`);
    }
  });

  // Ingaggio nuovo DS per squadre rimaste senza (ordine per blasone)
  [...allTeams].sort((a, b) => getTeamPrestige(b.name) - getTeamPrestige(a.name)).forEach(team => {
    if (team.ds) return;
    const candidateIdx = freeDirectors
      .map((d, i) => ({ d, i }))
      .sort((a, b) => b.d.strength - a.d.strength)[0]?.i;
    if (candidateIdx !== undefined) {
      const ds = freeDirectors.splice(candidateIdx, 1)[0];
      team.ds = ds;
      transferLog.push(`📊 <strong>${team.name}</strong> ingaggia <em>${ds.firstName} ${ds.lastName}</em> come nuovo DS (Forza: ${ds.strength})`);
    } else {
      team.ds = createDirector(team);
      transferLog.push(`📊 <strong>${team.name}</strong> crea <em>${team.ds.firstName} ${team.ds.lastName}</em> come nuovo DS (Forza: ${team.ds.strength})`);
    }
  });

  // --- STEP 1d: CONTRATTI ---
  // Scadenze, parametro zero, rinnovi automatici
  pendingRenewals = []; // Reset per il turno corrente
  allTeams.forEach(team => {
    const expired = [];
    team.roster.forEach(player => {
      // Giocatori legacy senza contratto: assegna uno retroattivamente
      if (!player.contract) {
        player.contract = createContract(player.strength, player.age);
        player.personality = player.personality || createPersonality();
      }
      player.contract.duration--;
      if (player.contract.duration <= 0) {
        if (playerTeam && team === playerTeam) {
          if (player.age >= 36) {
            // Si ritirerà in Step 2 — niente rinnovo
            transferLog.push(`🎓 <em>${player.firstName} ${player.lastName}</em> si ritirerà a fine stagione — nessun rinnovo necessario`);
          } else {
            pendingRenewals.push(player); // Il giocatore decide nel modal
          }
        } else {
          const renewed = tryRenewContract(player, team);
          if (!renewed) {
            recordTransfer(player, null, null);
            ageProgressPlayer(player);
            freeAgents.push(player);
            expired.push(player);
            transferLog.push(`🔚 <em>${player.firstName} ${player.lastName}</em> lascia <strong>${team.name}</strong> a <strong>parametro zero</strong> (${player.age} anni, Forza: ${player.strength})`);
          }
        }
      }
    });
    if (expired.length > 0) {
      team.roster = team.roster.filter(p => !expired.includes(p));
    }
  });

  // --- STEP 2: PROGRESSIONE ETÀ GIOCATORI, RITIRI E SETTORE GIOVANILE ---
  allTeams.forEach(team => {
    team.roster.forEach(p => ageProgressPlayer(p));

    const retiring = team.roster.filter(p => p.age > 36);
    team.roster = team.roster.filter(p => p.age <= 36);

    retiring.forEach(p => {
      const roll = Math.random();
      if (roll < 0.30) {
        const staff = retiredPlayerToStaff(p);
        freeCoaches.push(staff);
        transferLog.push(`🎓 ${p.firstName} ${p.lastName} si ritira da <strong>${team.name}</strong> (${p.age} anni, Forza: ${p.strength}) e inizia la carriera da <strong>allenatore</strong>`);
      } else if (roll < 0.50) {
        const staff = retiredPlayerToStaff(p);
        freeDirectors.push(staff);
        transferLog.push(`🎓 ${p.firstName} ${p.lastName} si ritira da <strong>${team.name}</strong> (${p.age} anni, Forza: ${p.strength}) e inizia la carriera da <strong>direttore sportivo</strong>`);
      } else {
        transferLog.push(`🎓 ${p.firstName} ${p.lastName} si ritira da <strong>${team.name}</strong> (${p.age} anni, Forza: ${p.strength})`);
      }
      const needed = neededRoles(team);
      const youthRole = canAddRole(team, p.role) ? p.role
        : needed.length > 0 ? needed[Math.floor(Math.random() * needed.length)]
        : ['DIF', 'CEN', 'ATT'].find(r => canAddRole(team, r)) || p.role;
      const youth = createYouthPlayer(youthRole, team);
      team.roster.push(youth);
      transferLog.push(`🌱 <strong>${youth.firstName} ${youth.lastName}</strong> (${youth.age} anni, Forza: ${youth.strength}) promosso nel settore giovanile di <strong>${team.name}</strong>`);
    });
  });

  // --- STEP 3: RILASCIO ECCEDENZE (rosa > ROSTER_MAX_TOTAL) ---
  allTeams.forEach(team => {
    if (playerTeam && team === playerTeam) return; // Il giocatore gestisce la propria rosa nel modal
    while (team.roster.length > ROSTER_MAX_TOTAL) {
      const overRole = Object.keys(ROLE_MAX).find(r => roleCount(team.roster, r) > ROLE_MAX[r]);
      const pool = overRole
        ? team.roster.filter(p => p.role === overRole)
        : team.roster.filter(p => p.role !== 'POR');
      const weakest = pool.sort((a, b) => a.strength - b.strength)[0];
      if (!weakest) break;
      team.roster = team.roster.filter(p => p !== weakest);
      freeAgents.push(weakest);
      transferLog.push(`📤 <strong>${team.name}</strong> svincola ${weakest.firstName} ${weakest.lastName} (${weakest.age} anni, Forza: ${weakest.strength})`);
    }
    recalculateTeamStrength(team);
  });

  // --- STEP 4: MAGNATI E CRISI ---
  allTeams.forEach(team => {
    if (team.magnate) {
      team.magnateDuration--;
      const injection = Math.floor(Math.random() * 40) + 30;
      team.budget += injection;
      if (team.magnateDuration <= 0) team.magnate = false;
    } else if (Math.random() < 0.02) {
      team.magnate = true;
      team.magnateDuration = Math.floor(Math.random() * 8) + 3;
      team.budget += 100;
    }
  });
  allTeams.forEach(team => {
    if (team.financialCrisis) {
      team.crisisDuration--;
      team.budget -= 20;
      if (team.crisisDuration <= 0) team.financialCrisis = false;
    } else if (!team.magnate && Math.random() < 0.01) {
      team.financialCrisis = true;
      team.crisisDuration = Math.floor(Math.random() * 3) + 2;
      team.budget -= Math.floor(Math.random() * 51) + 50;
    }
  });

  // Aggiorna storico stagioni
  allTeams.forEach(team => {
    if (newSerieANames.has(team.name)) team.seasonsInA = (team.seasonsInA || 0) + 1;
    else if (newSerieBNames.has(team.name)) team.seasonsInB = (team.seasonsInB || 0) + 1;
    else team.seasonsInC = (team.seasonsInC || 0) + 1;
  });

  // --- STEP 5: PREMI DI FINE STAGIONE E STIPENDI ---
  const getPrizeMoney = (leagueName, rank) => {
    if (leagueName === 'A') return Math.max(8, 80 - rank * 3.8);   // ~80M→~8M
    if (leagueName === 'B') return Math.max(3, 20 - rank * 0.9);   // ~20M→~3M
    if (leagueName === 'C') return Math.max(0.5, 4 - rank * 0.18); // ~4M→~0.5M
    return 0;
  };
  const applyFinances = (standings, leagueName) => {
    // Stipendi proporzionali alla lega: A più caro, C molto più economico
    const salaryMult = leagueName === 'A' ? 0.00040 : leagueName === 'B' ? 0.00025 : 0.00010;
    const budgetCap = leagueName === 'A' ? 400 : leagueName === 'B' ? 120 : 40;
    Object.entries(standings)
      .map(([name, stats]) => ({ name, ...stats }))
      .sort((a, b) => b.points - a.points)
      .forEach((teamStats, index) => {
        const team = teamMap.get(teamStats.name);
        if (!team) return;
        team.budget = (team.budget || 0) + getPrizeMoney(leagueName, index);
        const salaryCost = team.roster.reduce((sum, p) =>
          sum + p.strength * p.strength * salaryMult, 0);
        team.budget -= salaryCost;
        if (team.coach) {
          team.budget -= team.coach.strength * team.coach.strength * salaryMult * 0.6;
        }
        if (team.ds) {
          team.budget -= team.ds.strength * team.ds.strength * salaryMult * 0.4;
        }

        // Bonus titolo (1° in classifica)
        if (index === 0) {
          const titleCost = team.roster.reduce((s, p) => s + (p.contract?.bonusTitle || 0) / 1000, 0);
          if (titleCost > 0.05) {
            team.budget -= titleCost;
            transferLog.push(`🏆 <strong>${team.name}</strong> paga <strong>${titleCost.toFixed(1)}M€</strong> di bonus titolo ai giocatori`);
          }
        }

        // Bonus promozione (era in lega inferiore la stagione prima)
        const prevLg = prevLeagueMap[team.name];
        const wasPromoted = prevLg && prevLg > leagueName; // 'B'>'A', 'C'>'B'
        if (wasPromoted) {
          const promoCost = team.roster.reduce((s, p) => s + (p.contract?.bonusPromotion || 0) / 1000, 0);
          if (promoCost > 0.05) {
            team.budget -= promoCost;
            transferLog.push(`🎉 <strong>${team.name}</strong> paga <strong>${promoCost.toFixed(1)}M€</strong> di bonus promozione ai giocatori`);
          }
        }

        // Cap: evita l'accumulo illimitato
        if (team.budget > budgetCap) team.budget = budgetCap;
      });
  };
  applyFinances(standingsA, 'A');
  applyFinances(standingsB, 'B');
  applyFinances(standingsC, 'C');

  // --- STEP 5.5: VENDITE FORZATE PER BILANCIO NEGATIVO ---
  // Si applica alle squadre AI. La squadra del giocatore gestisce le vendite nel modal estivo.
  allTeams.forEach(team => {
    if (team.budget >= 0) return;
    if (playerTeam && team === playerTeam) return; // il giocatore sceglie chi cedere nel mercato
    const sellable = [...team.roster.filter(p => p.role !== 'POR')]
      .sort((a, b) => b.strength - a.strength); // prima i più forti (massimo incasso)
    for (const player of sellable) {
      if (team.budget >= 0) break;
      const income = Math.max(0.5, Math.round(getTransferValue(player) * 0.65 * 10) / 10);
      team.roster = team.roster.filter(p => p !== player);
      team.budget += income;
      freeAgents.push(player);
      recordTransfer(player, null, null);
      const icon = (playerTeam && team === playerTeam) ? '🚨' : '💸';
      transferLog.push(`${icon} <strong>${team.name}</strong> cede ${player.firstName} ${player.lastName} (Forza: ${player.strength}) per risanare il bilancio — incasso: ${income.toFixed(1)}M€`);
    }
    if (team.budget < 0) team.budget = 0; // floor di sicurezza
    recalculateTeamStrength(team);
  });

  // --- STEP 6: MERCATO TRASFERIMENTI ---
  // 6a: rosa > 21 → vendita volontaria del più debole
  //     giocatore molto sotto la media → squadra lo offre per fare posto a uno migliore
  const transferMarket = []; // { player, fromTeam, askingPrice, voluntary }
  allTeams.forEach(team => {
    if (playerTeam && team === playerTeam) return; // Il giocatore gestisce le sue vendite
    const teamAvg = team.roster.reduce((s, p) => s + p.strength, 0) / team.roster.length;
    const outfield = team.roster.filter(p => p.role !== 'POR').sort((a, b) => a.strength - b.strength);
    {
      // Sostituzione attiva: fino a 7 giocatori sotto la soglia di qualità
      const maxToOffer = Math.floor(Math.random() * 4) + 5; // 5-8 giocatori
      let offered = 0;
      for (const player of outfield) {
        if (offered >= maxToOffer) break;
        const isWeak = player.strength < teamAvg * 0.80;
        const isUpgradeable = team.budget > 50 && player.strength < teamAvg * 0.90;
        const rosterSize = team.roster.length - offered;
        if (rosterSize <= 20) break;
        const overloaded = rosterSize > 21;
        if (!isWeak && !isUpgradeable && !overloaded) break;
        const askingPrice = Math.max(0.3, getTransferValue(player));
        team.roster = team.roster.filter(p => p !== player);
        transferMarket.push({ player, fromTeam: team, askingPrice, voluntary: true });
        offered++;
      }

      // Stelle fuori categoria: giocatori molto più forti della media in B/C
      // vogliono fare il salto — la squadra li mette in vetrina
      if (team.leagueLevel !== 'A') {
        const remainingOutfield = team.roster.filter(p => p.role !== 'POR');
        const updatedAvg = remainingOutfield.length > 0
          ? remainingOutfield.reduce((s, p) => s + p.strength, 0) / remainingOutfield.length : teamAvg;
        const stars = remainingOutfield
          .filter(p => p.strength > updatedAvg + 18)
          .sort((a, b) => b.strength - a.strength);
        for (const star of stars) {
          if (team.roster.length <= 20) break;
          if (Math.random() > 0.60) continue;
          const askingPrice = Math.max(1, getTransferValue(star) * 1.3); // prezzo premium
          team.roster = team.roster.filter(p => p !== star);
          transferMarket.push({ player: star, fromTeam: team, askingPrice, voluntary: true });
        }
      }
    }
  });

  // 6b: squadre acquirenti (ordine casuale per equità)
  // 4 passaggi: ogni squadra può fare fino a 4 acquisti per stagione
  const shuffledBuyers = [...allTeams].sort(() => Math.random() - 0.5);
  [0, 1, 2, 3].forEach(() => {
    shuffledBuyers.forEach(team => {
      if (playerTeam && team === playerTeam) return; // Il giocatore gestisce i suoi acquisti
      const avgStr = team.roster.reduce((s, p) => s + p.strength, 0) / team.roster.length;
      let maxAvgStr = 55;
      if (newSerieANames.has(team.name)) maxAvgStr = 92;
      else if (newSerieBNames.has(team.name)) maxAvgStr = 75;
      if (avgStr >= maxAvgStr) return;

      if (team.budget < 2) return; // budget minimo per partecipare
      if (Math.random() > 0.65) return; // 35% skip

      const teamWeakestStr = Math.min(...team.roster.filter(p => p.role !== 'POR').map(p => p.strength));

      // Priorità 1: acquisto da un'altra squadra
      const marketOptions = transferMarket
        .filter(item => item.fromTeam.name !== team.name && team.budget >= item.askingPrice && item.player.strength > teamWeakestStr && item.player.strength <= leagueStrCap(team.leagueLevel) && canAddRole(team, item.player.role))
        .sort((a, b) => b.player.strength - a.player.strength);

      if (marketOptions.length > 0) {
        const deal = marketOptions[0];
        transferMarket.splice(transferMarket.indexOf(deal), 1);
        team.roster.push(deal.player);
        team.budget -= deal.askingPrice;
        deal.fromTeam.budget += deal.askingPrice;
        recalculateTeamStrength(team);
        recordTransfer(deal.player, team.name, deal.askingPrice);
        transferLog.push(`🔄 <strong>${deal.fromTeam.name}</strong> → <strong>${team.name}</strong>: ${deal.player.firstName} ${deal.player.lastName} (${deal.player.age} anni, Forza: ${deal.player.strength}) per <strong>${deal.askingPrice.toFixed(1)}M€</strong>`);
        return;
      }

      // Priorità 2: ingaggio svincolato (cap alzato/abbassato dalla forza del DS, ma mai sopra il cap di lega)
      const dsBonus = team.ds ? Math.round((team.ds.strength - 50) / 5) : 0;
      const faMaxStr = Math.min(leagueStrCap(team.leagueLevel), Math.max(5, (team.leagueLevel === 'A' ? 100 : team.leagueLevel === 'B' ? 72 : 45) + dsBonus));
      const faIdx = freeAgents
        .map((p, i) => ({ p, i }))
        .filter(({ p }) => p.strength >= avgStr * 0.7 && p.strength <= faMaxStr && canAddRole(team, p.role))
        .sort((a, b) => b.p.strength - a.p.strength)[0]?.i;

      if (faIdx !== undefined) {
        const fa = freeAgents.splice(faIdx, 1)[0];
        team.roster.push(fa);
        recalculateTeamStrength(team);
        recordTransfer(fa, team.name, 0);
        transferLog.push(`✍️ <strong>${team.name}</strong> ingaggia lo svincolato ${fa.firstName} ${fa.lastName} (${fa.age} anni, Forza: ${fa.strength})`);
      }
    });
  });

  // Salva mercato residuo per la UI del giocatore (prima che il 6c lo svuoti)
  if (playerTeam) pendingTransferMarket = [...transferMarket];

  // 6c: giocatori rimasti invenduti
  //     - voluntary: tornano alla squadra di origine
  //     - forzati: vanno tra gli svincolati
  transferMarket.forEach(item => {
    if (item.voluntary) {
      item.fromTeam.roster.push(item.player);
      recalculateTeamStrength(item.fromTeam);
    } else {
      recordTransfer(item.player, null, null);
      freeAgents.push(item.player);
      transferLog.push(`🔴 <strong>${item.fromTeam.name}</strong> svincola ${item.player.firstName} ${item.player.lastName} (${item.player.age} anni, Forza: ${item.player.strength}) — nessuna offerta ricevuta`);
    }
  });

  // --- STEP 6d: POACHING PER BLASONE ---
  // Cascata naturale: A compra da B, B compra da C — chi ha soldi migliora la rosa
  // Il filtro ora usa gerarchia di lega, non prestige (evita bug con B storiche vs A neopromossi)
  const leagueRank = lv => lv === 'A' ? 1 : lv === 'B' ? 2 : 3;
  const poachedPlayers = new Set();
  [...allTeams].sort((a, b) => getTeamPrestige(b.name) - getTeamPrestige(a.name)).forEach(buyingTeam => {
    if (playerTeam && buyingTeam === playerTeam) return; // Il giocatore gestisce i propri acquisti
    if (buyingTeam.budget < 15) return;
    const buyerPrestige = getTeamPrestige(buyingTeam.name);
    const dsQuality = buyingTeam.ds ? buyingTeam.ds.strength : 40;
    const dsBonus = Math.round((dsQuality - 50) / 8);

    // 65% delle squadre tenta 2 acquisti, 35% ne tenta 1
    const maxAttempts = Math.random() < 0.65 ? 2 : 1;
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      if (Math.random() > 0.70) continue; // 30% skip per tentativo

      const buyerOutfield = buyingTeam.roster.filter(p => p.role !== 'POR');
      const buyerAvg = buyerOutfield.reduce((s, p) => s + p.strength, 0) / (buyerOutfield.length || 1);
      // Soglia: cerca giocatori che alzino la media della squadra (non solo il minimo)
      const targetFloor = Math.max(
        Math.min(...buyerOutfield.map(p => p.strength)),
        buyerAvg * 0.82 - dsBonus
      );
      let bestTarget = null, bestSeller = null;

      allTeams.forEach(sellingTeam => {
        if (sellingTeam.name === buyingTeam.name) return;
        // Gerarchia di lega: non comprare da squadre in lega superiore
        if (leagueRank(sellingTeam.leagueLevel) < leagueRank(buyingTeam.leagueLevel)) return;
        // Stessa lega: non comprare da squadre con blasone molto superiore
        if (sellingTeam.leagueLevel === buyingTeam.leagueLevel &&
          getTeamPrestige(sellingTeam.name) >= buyerPrestige + 4) return;
        sellingTeam.roster.forEach(player => {
          if (player.role === 'POR' || poachedPlayers.has(player)) return;
          if (playerTeam && sellingTeam === playerTeam) return; // L'AI non può sottrarre giocatori al player
          if (!canAddRole(buyingTeam, player.role)) return;
          if (player.strength <= targetFloor) return;
          if (player.strength > leagueStrCap(buyingTeam.leagueLevel)) return;
          const bid = getTransferValue(player) * 1.5;
          if (buyingTeam.budget < bid) return;
          if (!bestTarget || player.strength > bestTarget.strength) {
            bestTarget = player; bestSeller = sellingTeam;
          }
        });
      });

      if (!bestTarget) break;

      // Clausola rescissoria: se il compratore può pagarla, il trasferimento è forzato
      const releaseClause = bestTarget.contract?.releaseClause;
      const standardBid = Math.round(getTransferValue(bestTarget) * 1.5 * 10) / 10;
      let finalBid = standardBid;
      let forceTransfer = false;

      if (releaseClause && buyingTeam.budget >= releaseClause) {
        finalBid = releaseClause;
        forceTransfer = true;
      } else {
        // Accettazione normale — cascata A←B e B←C
        const crossLeague = leagueRank(bestSeller.leagueLevel) > leagueRank(buyingTeam.leagueLevel);
        const needsCash = bestSeller.budget < 20;
        const prestigeDiff = buyerPrestige - getTeamPrestige(bestSeller.name);
        const baseAccept = needsCash ? 0.87 : crossLeague ? 0.72 : 0.22;
        const prestigeBonus = Math.min(0.18, prestigeDiff * 0.025);
        const sellerDsProtect = bestSeller.ds ? Math.max(0, (bestSeller.ds.strength - 50) / 250) : 0;
        if (Math.random() >= (baseAccept + prestigeBonus - sellerDsProtect)) continue;
        if (buyingTeam.budget < finalBid) continue;
      }

      bestSeller.roster = bestSeller.roster.filter(p => p !== bestTarget);
      buyingTeam.roster.push(bestTarget);
      buyingTeam.budget -= finalBid;
      bestSeller.budget += finalBid;
      poachedPlayers.add(bestTarget);
      recalculateTeamStrength(buyingTeam);
      recalculateTeamStrength(bestSeller);
      recordTransfer(bestTarget, buyingTeam.name, finalBid);
      const clauseNote = forceTransfer ? ' <em>(clausola rescissoria)</em>' : '';
      transferLog.push(`💰 <strong>${buyingTeam.name}</strong> acquista ${bestTarget.firstName} ${bestTarget.lastName} (${bestTarget.age} anni, Forza: ${bestTarget.strength}) da <strong>${bestSeller.name}</strong> per <strong>${finalBid.toFixed(1)}M€</strong>${clauseNote}`);
    }
  });

  // --- STEP 7: GARANZIA MINIMO ROSTER_MIN_TOTAL GIOCATORI ---
  allTeams.forEach(team => {
    if (playerTeam && team === playerTeam) return; // Il giocatore completa la rosa nel modal
    const dsBonus7 = team.ds ? Math.round((team.ds.strength - 50) / 5) : 0;
    const maxFAStr = Math.min(leagueStrCap(team.leagueLevel), Math.max(5, (team.leagueLevel === 'A' ? 100 : team.leagueLevel === 'B' ? 72 : 45) + dsBonus7));
    while (team.roster.length < ROSTER_MIN_TOTAL) {
      const needed = neededRoles(team);
      const faIdx = freeAgents
        .map((p, i) => ({ p, i }))
        .filter(({ p }) => p.strength <= maxFAStr && canAddRole(team, p.role))
        .sort((a, b) => {
          // preferisci FA di ruoli necessari
          const aNeed = needed.includes(a.p.role) ? 1 : 0;
          const bNeed = needed.includes(b.p.role) ? 1 : 0;
          return bNeed - aNeed || b.p.strength - a.p.strength;
        })[0]?.i;
      if (faIdx !== undefined) {
        const fa = freeAgents.splice(faIdx, 1)[0];
        team.roster.push(fa);
        recordTransfer(fa, team.name, 0);
        transferLog.push(`✍️ <strong>${team.name}</strong> ingaggia ${fa.firstName} ${fa.lastName} (Forza: ${fa.strength}) per completare la rosa`);
      } else {
        const youthRoles = needed.length > 0 ? needed : ['DIF', 'CEN', 'ATT'].filter(r => canAddRole(team, r));
        const role = youthRoles[Math.floor(Math.random() * youthRoles.length)] || 'CEN';
        const youth = createYouthPlayer(role, team);
        team.roster.push(youth);
      }
    }
    recalculateTeamStrength(team);
  });
}

function displayCoppaItalia(coppaResult) {
  let container = document.getElementById('coppa-italia-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'coppa-italia-container';
    const serieC = document.getElementById('serieC');
    serieC.insertAdjacentElement('afterend', container);
  }

  const { winner, rounds, roundNames } = coppaResult;
  let html = `<h2>Coppa Italia <span class="coppa-winner-badge">🏆 ${winner.name}</span></h2>`;

  rounds.forEach((roundMatches, i) => {
    const name = roundNames[i] || `Turno ${i + 1}`;
    html += `<details><summary>${name}</summary><div class="round-content"><div class="round-column">`;
    roundMatches.forEach(m => {
      const score = m.penalties
        ? `${m.team1Goals}-${m.team2Goals} (d.c.r.)`
        : `${m.team1Goals}-${m.team2Goals}`;
      const homeStyle = m.winner.name === m.home.name ? 'font-weight:bold' : 'color:#999';
      const awayStyle = m.winner.name === m.away.name ? 'font-weight:bold' : 'color:#999';
      html += `<div class="match-row"><span style="${homeStyle}">${m.home.name}</span><span>${score}</span><span style="${awayStyle}">${m.away.name}</span></div>`;
    });
    html += `</div></div></details>`;
  });

  container.innerHTML = html;
}

function displayTransferLog() {
  let container = document.getElementById('transfer-log-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'transfer-log-container';
    const hofContainer = document.getElementById('hall-of-fame-container');
    if (hofContainer) {
      hofContainer.insertAdjacentElement('afterend', container);
    } else {
      document.body.appendChild(container);
    }
  }

  if (transferLog.length === 0) { container.innerHTML = ''; return; }

  const transfers = transferLog.filter(e =>
    e.includes('🔄') || e.includes('🔴') || e.includes('🟢') || e.includes('✍️'));
  const releases = transferLog.filter(e => e.includes('📤'));
  const retirements = transferLog.filter(e => e.includes('🎓') || e.includes('🌱'));
  const coachEvents = transferLog.filter(e => e.includes('🚨') || e.includes('✅') || e.includes('📊'));

  const buildSection = (title, entries) => {
    if (entries.length === 0) return '';
    return `<h3>${title}</h3><div class="transfer-list">${entries.map(e => `<div class="transfer-entry">${e}</div>`).join('')}</div>`;
  };

  container.innerHTML = `
    <h2>📋 Sessione di Mercato — Stagione ${seasonCount}</h2>
    ${buildSection('Trasferimenti', transfers)}
    ${buildSection('Svincoli gratuiti', releases)}
    ${buildSection('Ritiri e Settore Giovanile', retirements)}
    ${buildSection('Panchina — Esoneri e Ingaggi', coachEvents)}
  `;
}

// ─── MERCATO MANAGERIALE ──────────────────────────────────────────────────────

function ensureMinRoster(team) {
  const dsBonus = team.ds ? Math.round((team.ds.strength - 50) / 5) : 0;
  const maxFAStr = Math.min(leagueStrCap(team.leagueLevel), Math.max(5, (team.leagueLevel === 'A' ? 100 : team.leagueLevel === 'B' ? 72 : 45) + dsBonus));
  while (team.roster.length < ROSTER_MIN_TOTAL) {
    const needed = neededRoles(team);
    const faIdx = freeAgents
      .map((p, i) => ({ p, i }))
      .filter(({ p }) => p.strength <= maxFAStr && canAddRole(team, p.role))
      .sort((a, b) => {
        const aN = needed.includes(a.p.role) ? 1 : 0;
        const bN = needed.includes(b.p.role) ? 1 : 0;
        return bN - aN || b.p.strength - a.p.strength;
      })[0]?.i;
    if (faIdx !== undefined) {
      const fa = freeAgents.splice(faIdx, 1)[0];
      team.roster.push(fa);
      recordTransfer(fa, team.name, 0);
    } else {
      const roles = needed.length > 0 ? needed : ['DIF', 'CEN', 'ATT'].filter(r => canAddRole(team, r));
      const role = roles[Math.floor(Math.random() * roles.length)] || 'CEN';
      team.roster.push(createYouthPlayer(role, team));
    }
  }
}

function getProbLabel(prob) {
  if (prob >= 0.55) return { text: 'Alta', color: '#16a34a' };
  if (prob >= 0.30) return { text: 'Media', color: '#f59e0b' };
  return { text: 'Bassa', color: '#ef4444' };
}

// ── PRESTITI ────────────────────────────────────────────────────────────────
const MAX_INCOMING_LOANS = 8;

function getIncomingLoanCount(team) {
  return activeLoans.filter(l => l.loanTeam === team).length;
}

// Un giocatore può essere prestato solo se il club resta sopra il minimo di
// ruolo e se il giocatore è di proprietà (niente sub-prestiti)
function canLoanOutPlayer(team, player) {
  if (activeLoans.some(l => l.player === player && l.loanTeam === team)) return false;
  return roleCount(team.roster, player.role) - 1 >= ROLE_MIN[player.role];
}

// Trova un club disposto a prendere il giocatore in prestito: preferisce chi
// ha bisogno di quel ruolo, altrimenti una qualunque squadra con posto libero
function findLoanDestination(player) {
  const candidates = [...serieA, ...serieB, ...serieC].filter(t =>
    t !== playerTeam && canAddRole(t, player.role) && player.strength <= leagueStrCap(t.leagueLevel) + 10
  );
  if (!candidates.length) return null;
  const needing = candidates.filter(t => neededRoles(t).includes(player.role));
  const pool = needing.length ? needing : candidates;
  return pool[Math.floor(Math.random() * pool.length)];
}

// Giocatori altrui in "esubero" (sopra il minimo di ruolo del loro club) che
// potrebbero essere richiesti in prestito
function generateIncomingLoanCandidates() {
  if (!playerTeam) return [];
  const cap = leagueStrCap(playerTeam.leagueLevel);
  const candidates = [];
  [...serieA, ...serieB, ...serieC].filter(t => t !== playerTeam).forEach(team => {
    // "Esubero" reale: solo chi è oltre i migliori ROLE_MIN[role] di quel ruolo
    // nel proprio club — i titolari veri restano sempre intoccabili, indipendentemente
    // da quanti giocatori quel club abbia in quel ruolo
    Object.keys(ROLE_MIN).forEach(role => {
      const inRole = team.roster.filter(p => p.role === role).sort((a, b) => b.strength - a.strength);
      inRole.slice(ROLE_MIN[role]).forEach(p => {
        if (activeLoans.some(l => l.player === p)) return; // già in prestito altrove
        if (p.strength > cap) return;
        if (!canAddRole(playerTeam, p.role)) return;
        candidates.push({ player: p, fromTeam: team });
      });
    });
  });
  return candidates.sort((a, b) => b.player.strength - a.player.strength).slice(0, 30);
}

// Manda in prestito un giocatore del playerTeam; ritorna true se riuscito
function loanOutPlayer(player) {
  if (!canLoanOutPlayer(playerTeam, player)) return false;
  const dest = findLoanDestination(player);
  if (!dest) return false;
  playerTeam.roster = playerTeam.roster.filter(p => p !== player);
  dest.roster.push(player);
  activeLoans.push({ player, homeTeam: playerTeam, loanTeam: dest });
  recordTransfer(player, dest.name, 'prestito');
  recalculateTeamStrength(playerTeam);
  recalculateTeamStrength(dest);
  transferLog.push(`🔄 <strong>${playerTeam.name}</strong> presta ${player.firstName} ${player.lastName} a <strong>${dest.name}</strong> per la stagione`);
  return true;
}

// Prende in prestito un giocatore altrui; ritorna true se riuscito
function loanInPlayer(player, fromTeam) {
  if (getIncomingLoanCount(playerTeam) >= MAX_INCOMING_LOANS) return false;
  if (!canAddRole(playerTeam, player.role)) return false;
  fromTeam.roster = fromTeam.roster.filter(p => p !== player);
  playerTeam.roster.push(player);
  activeLoans.push({ player, homeTeam: fromTeam, loanTeam: playerTeam });
  recordTransfer(player, playerTeam.name, 'prestito');
  recalculateTeamStrength(fromTeam);
  recalculateTeamStrength(playerTeam);
  transferLog.push(`🔄 <strong>${playerTeam.name}</strong> prende in prestito ${player.firstName} ${player.lastName} da <strong>${fromTeam.name}</strong>`);
  return true;
}

// A inizio stagione: ogni prestito attivo dura esattamente un anno, si risolve
// riportando il giocatore al club di appartenenza
function resolveLoanReturns() {
  activeLoans.forEach(({ player, homeTeam, loanTeam }) => {
    loanTeam.roster = loanTeam.roster.filter(p => p !== player);
    homeTeam.roster.push(player);
    recordTransfer(player, homeTeam.name, 'prestito');
    recalculateTeamStrength(loanTeam);
    recalculateTeamStrength(homeTeam);
    transferLog.push(`🔄 <em>${player.firstName} ${player.lastName}</em> rientra dal prestito: <strong>${loanTeam.name}</strong> → <strong>${homeTeam.name}</strong>`);
  });
  activeLoans = [];
}

// ── PANCHINA: esonero e ingaggio allenatore ─────────────────────────────────

// Buonuscita per esonerare l'allenatore in corsa (M€) — proporzionale alla sua forza
function getCoachSeveranceCost(coach) {
  return Math.max(0.5, Math.round(coach.strength * 0.15 * 10) / 10);
}

// Quanti titolari andrebbero fuori ruolo con quel modulo, data la rosa attuale
function countOutOfPosition(team, formationName) {
  const available = filterAvailableRoster(team.roster || []);
  const pool = available.length >= 7 ? available : (team.roster || []);
  return getBest11(pool, formationName).filter(e => !e.inPosition).length;
}

function getFormationFitLabel(team, formationName) {
  const oop = countOutOfPosition(team, formationName);
  if (oop === 0) return { text: '✅ Fit ottimo', color: '#16a34a' };
  if (oop === 1) return { text: '🙂 Fit buono', color: '#8bc34a' };
  if (oop === 2) return { text: '⚠️ Fit medio', color: '#f59e0b' };
  return { text: '❌ Fit scarso', color: '#ef4444' };
}

function generateScoutingTargets() {
  if (!playerTeam || !playerTeam.ds) return [];

  const ds = playerTeam.ds;
  const dsStr = ds.strength;
  const numTargets = Math.min(8, Math.max(3, Math.floor((dsStr - 20) / 10)));
  const maxDiscoverStr = Math.min(leagueStrCap(playerTeam.leagueLevel), dsStr + Math.floor(dsStr * 0.15));

  const allTeams = [...serieA, ...serieB, ...serieC];
  const buyerPrestige = getTeamPrestige(playerTeam.name);
  const leagueRank = lv => lv === 'A' ? 1 : lv === 'B' ? 2 : 3;
  const buyerLeagueRank = leagueRank(playerTeam.leagueLevel);
  const marketPlayerIds = new Set(pendingTransferMarket.map(i => i.player.id));

  const candidates = [];
  allTeams.forEach(team => {
    if (team === playerTeam) return;
    team.roster.forEach(player => {
      if (player.role === 'POR') return;
      if (player.strength > maxDiscoverStr) return;
      if (player.personality?.loyalty > 85) return;
      if (!canAddRole(playerTeam, player.role)) return;
      if (marketPlayerIds.has(player.id)) return;

      const sellerLeagueRank = leagueRank(team.leagueLevel);
      const sellerPrestige = getTeamPrestige(team.name);

      let prob = 0.10;
      prob += ((player.personality?.ambition || 50) / 100) * 0.25;
      prob -= ((player.personality?.loyalty || 50) / 100) * 0.20;
      if (buyerLeagueRank < sellerLeagueRank) prob += 0.20;
      else if (buyerLeagueRank > sellerLeagueRank) prob -= 0.15;
      prob += Math.min(0.15, (buyerPrestige - sellerPrestige) * 0.02);
      prob += Math.max(0, (dsStr - 50) / 300);
      if (team.ds) prob -= Math.max(0, (team.ds.strength - 50) / 250);

      const hasClause = player.contract?.releaseClause != null;
      if (hasClause) prob += 0.15;
      prob = Math.max(0.05, Math.min(0.85, prob));

      const baseValue = getTransferValue(player);
      const cost = hasClause
        ? player.contract.releaseClause
        : Math.round(baseValue * (1.8 + Math.random() * 0.7) * 10) / 10;

      candidates.push({ player, fromTeam: team, cost, successProb: prob, hasClause });
    });
  });

  candidates.sort((a, b) => (b.player.strength * b.successProb) - (a.player.strength * a.successProb));
  return candidates.slice(0, numTargets);
}

function showManagerMarketModal(onConfirm) {
  // Genera offerte AI per i giocatori del player
  pendingAIOffers = [];
  const aiTeams = [...serieA, ...serieB, ...serieC].filter(t => t !== playerTeam);
  playerTeam.roster
    .filter(p => p.role !== 'POR' && p.strength > 45)
    .forEach(player => {
      if (Math.random() > 0.30) return;
      const bid = getTransferValue(player) * 1.3;
      const interested = aiTeams.filter(t => t.budget >= bid && canAddRole(t, player.role));
      if (!interested.length) return;
      const buyer = interested[Math.floor(Math.random() * interested.length)];
      const offerPrice = Math.round(getTransferValue(player) * (1.3 + Math.random() * 0.5) * 10) / 10;
      pendingAIOffers.push({ player, buyerTeam: buyer, offerPrice });
    });

  pendingScoutingTargets = generateScoutingTargets();

  const renewalDecisions = new Map(); // player.id → 'renewed' | 'released'
  const offerDecisions   = new Map(); // player.id → 'accepted' | 'refused'
  const boughtIds        = new Set(); // player.id già acquistati
  const scoutedIds       = new Set(); // player.id → tentativo scouting già fatto
  const filter = { role: '', ageMin: 16, ageMax: 40, strMin: 0, strMax: 100 };
  let coachCandidates = []; // ricostruito a ogni render della tab Panchina: idx → coach da freeCoaches
  let loanCandidates = []; // ricostruito a ogni render della tab Prestiti: idx → { player, fromTeam }
  let activeTab = !playerTeam.coach ? 'panchina' : pendingRenewals.length > 0 ? 'rinnovi' : 'rosa';

  // Libera lo slot allenatore prima di ingaggiarne uno nuovo dal mercato: se
  // quello attuale è ancora sotto contratto va esonerato (buonuscita), se il
  // contratto è scaduto se ne va gratis. Ritorna false se la buonuscita non è
  // sostenibile (in tal caso l'azione chiamante non deve procedere).
  const displaceCurrentCoach = () => {
    const outgoing = playerTeam.coach;
    if (!outgoing) return true;
    const expired = (outgoing.contract?.duration || 0) <= 0;
    const severance = expired ? 0 : getCoachSeveranceCost(outgoing);
    if (playerTeam.budget < severance) return false;
    if (severance > 0) {
      playerTeam.budget -= severance;
      transferLog.push(`🚨 <strong>${playerTeam.name}</strong> esonera <em>${outgoing.firstName} ${outgoing.lastName}</em> — buonuscita: ${severance.toFixed(1)}M€`);
    } else {
      transferLog.push(`📄 <em>${outgoing.firstName} ${outgoing.lastName}</em> lascia <strong>${playerTeam.name}</strong> a fine contratto`);
    }
    freeCoaches.push(outgoing);
    playerTeam.coach = null;
    return true;
  };

  const overlay = document.createElement('div');
  overlay.className = 'mm-overlay';

  const buildRennoviTab = () => {
    if (!pendingRenewals.length) return '<p class="mm-empty">Nessun contratto in scadenza.</p>';
    return pendingRenewals.map(player => {
      const d = renewalDecisions.get(player.id);
      const greed = player.personality?.greed || 50;
      const demanded = Math.round(getDisplaySalary(player.strength) * (1.0 + greed * 0.004));
      const current  = player.contract?.salary || getDisplaySalary(player.strength);
      if (d === 'renewed') return `<div class="mm-row mm-done">✅ <strong>${player.firstName} ${player.lastName}</strong> rinnovato — ${demanded}k€/mese</div>`;
      if (d === 'released') return `<div class="mm-row mm-done">🔚 <strong>${player.firstName} ${player.lastName}</strong> svincolato</div>`;
      const overCap = !wageCapAllows(playerTeam, demanded, current);
      const renewBtn = overCap
        ? `<button class="mm-btn mm-green" disabled title="Supera il monte ingaggi">🚫 Monte ingaggi</button>`
        : `${durationSelectHtml('data-dur-renew', player.id, player.contract?.duration)}<button class="mm-btn mm-green" data-action="renew" data-pid="${player.id}">Rinnova</button>`;
      return `<div class="mm-row">
        <div class="mm-pinfo"><span class="mm-name">${player.firstName} ${player.lastName}</span><span class="mm-badge role-${player.role}">${player.role}</span><span style="font-size:.78rem;color:#666">${formatSubRoles(player)}</span><span>${player.age}a</span><span>⚡${player.strength}</span><span class="mm-salary-chg">${current}k€ → <strong>${demanded}k€</strong>/mese</span></div>
        <div class="mm-acts">
          ${renewBtn}
          <button class="mm-btn mm-red"   data-action="release" data-pid="${player.id}">Svincola</button>
        </div></div>`;
    }).join('');
  };

  const buildOfferteTab = () => {
    if (!pendingAIOffers.length) return '<p class="mm-empty">Nessuna offerta ricevuta.</p>';
    return pendingAIOffers.map(({ player, buyerTeam, offerPrice }) => {
      const d = offerDecisions.get(player.id);
      if (d === 'accepted') return `<div class="mm-row mm-done">✅ <strong>${player.firstName} ${player.lastName}</strong> venduto a ${buyerTeam.name} — ${offerPrice.toFixed(1)}M€</div>`;
      if (d === 'refused')  return `<div class="mm-row mm-done">❌ Offerta rifiutata — <strong>${player.firstName} ${player.lastName}</strong> rimane</div>`;
      return `<div class="mm-row">
        <div class="mm-pinfo"><span class="mm-name">${player.firstName} ${player.lastName}</span><span class="mm-badge role-${player.role}">${player.role}</span><span style="font-size:.78rem;color:#666">${formatSubRoles(player)}</span><span>${player.age}a</span><span>⚡${player.strength}</span><span class="mm-buyer-tag">🏟️ ${buyerTeam.name}</span></div>
        <div class="mm-acts">
          <strong class="mm-price">${offerPrice.toFixed(1)}M€</strong>
          <button class="mm-btn mm-green" data-action="accept-offer" data-pid="${player.id}">Accetta</button>
          <button class="mm-btn mm-red"   data-action="refuse-offer" data-pid="${player.id}">Rifiuta</button>
        </div></div>`;
    }).join('');
  };

  const buildRosaTab = () => {
    // Rinnovi non ancora decisi: a fine mercato diventano svincolati
    const leavingIds = new Set(
      pendingRenewals.filter(p => !renewalDecisions.has(p.id)).map(p => p.id)
    );
    // Pre-contratti firmati: giocatori che arriveranno la prossima stagione
    // (solo quelli firmati per il club attuale — se hai cambiato squadra restano al vecchio club)
    const precontracts = pendingPreContracts
      .filter(pc => !pc.toTeam || pc.toTeam === playerTeam)
      .map(pc => pc.player);
    const precontractIds = new Set(precontracts.map(p => p.id));

    // Unisci la rosa attuale (senza duplicati) con i pre-contratti in arrivo
    const currentRoster = playerTeam.roster;
    const all = [...currentRoster];
    precontracts.forEach(p => { if (!all.includes(p)) all.push(p); });

    if (!all.length) return '<p class="mm-empty">Rosa vuota.</p>';

    // Giocatori presi in prestito: non sono di proprietà, tornano al club
    // d'origine a inizio stagione — non si cedono e non contano per il futuro
    const loanedInIds = new Set(
      activeLoans.filter(l => l.loanTeam === playerTeam).map(l => l.player.id)
    );

    const needsSell = playerTeam.budget < 0;
    const roleOrder = { POR: 0, DIF: 1, CEN: 2, ATT: 3 };
    const sorted = [...all].sort((a, b) => (roleOrder[a.role] - roleOrder[b.role]) || b.strength - a.strength);

    // Conteggio proiettato per la prossima stagione: rosa attuale - in uscita
    // - rientri di prestito + pre-contratti
    const nextCounts = { POR: 0, DIF: 0, CEN: 0, ATT: 0 };
    currentRoster.forEach(p => { if (!leavingIds.has(p.id) && !loanedInIds.has(p.id)) nextCounts[p.role]++; });
    precontracts.forEach(p => nextCounts[p.role]++);
    const nextTotal = nextCounts.POR + nextCounts.DIF + nextCounts.CEN + nextCounts.ATT;

    const countsBadge = role => {
      const n = nextCounts[role], min = ROLE_MIN[role], max = ROLE_MAX[role];
      const color = n < min ? '#ef4444' : (n >= max ? '#f59e0b' : '#15803d');
      return `<span style="display:inline-block;padding:2px 8px;margin-right:6px;background:${color};color:#fff;border-radius:10px;font-size:.75rem;font-weight:700">${role}: ${n} (${min}-${max})</span>`;
    };
    const missingRoles = Object.keys(ROLE_MIN).filter(r => nextCounts[r] < ROLE_MIN[r]);
    const alertMissing = missingRoles.length
      ? `<div style="margin-top:6px;color:#b91c1c;font-size:.8rem;font-weight:600">⚠️ Ruoli sotto il minimo: ${missingRoles.join(', ')} — la rosa sarà integrata con giovani</div>`
      : '';
    const summary = `<div style="margin-bottom:10px;padding:8px 10px;background:#eef7ff;border:1px solid #bcd;border-radius:6px;font-size:.85rem">
      <div style="font-weight:700;margin-bottom:6px">📋 Rosa proiettata per la prossima stagione (${nextTotal} giocatori)</div>
      ${['POR','DIF','CEN','ATT'].map(countsBadge).join('')}
      ${alertMissing}
    </div>`;

    const rows = sorted.map(p => {
      const isPrecontract = precontractIds.has(p.id);
      const isLeaving = leavingIds.has(p.id);
      const isLoanedIn = loanedInIds.has(p.id);
      const isRenewed = pendingRenewals.some(r => r.id === p.id) && renewalDecisions.get(p.id) === 'renewed';
      const durVal = p.contract?.duration;
      const willRetire = !isPrecontract && !isLoanedIn && p.age >= 36;

      let status;
      if (isLoanedIn)         status = '<span style="color:#64748b;font-weight:700">🔄 in prestito</span>';
      else if (isPrecontract) status = '<span style="color:#2f6fed;font-weight:700">📝 pre-contratto</span>';
      else if (isLeaving)     status = '<span style="color:#e05050;font-weight:700">👋 in uscita</span>';
      else if (willRetire)    status = '<span style="color:#8e44ad;font-weight:700">🎓 si ritira</span>';
      else if (isRenewed)     status = '<span style="color:#15803d;font-weight:700">✅ rinnovato</span>';
      else if (!durVal || durVal <= 0) status = '<span style="color:#e05050">⚠️ scad.</span>';
      else                    status = `${durVal}a`;

      const rowStyle = isLoanedIn ? 'background:#f1f5f9'
        : isPrecontract ? 'background:#e3f2fd'
        : isLeaving ? 'background:#fee'
        : willRetire ? 'background:#f5eefa'
        : '';
      const sal = p.contract?.salary ?? getDisplaySalary(p.strength);
      const income = Math.max(0.5, Math.round(getTransferValue(p) * 0.65 * 10) / 10);
      const sellBtn = (needsSell && !isPrecontract && !isLoanedIn && p.role !== 'POR')
        ? `<td><button class="mm-btn mm-red" data-action="sell-player" data-pid="${p.id}" style="font-size:.75rem;padding:2px 8px">Cedi (${income.toFixed(1)}M€)</button></td>`
        : (needsSell ? '<td></td>' : '');
      return `<tr class="db-row-clickable" data-player-id="${p.id}" style="${rowStyle}">
        <td><span class="player-name-link">${p.firstName} ${p.lastName}</span></td>
        <td>${p.role}</td><td style="font-size:.82rem;color:#666">${formatSubRoles(p)}</td><td>${p.age}</td>
        <td><strong>${p.strength}</strong></td>
        <td>${sal}k€/mese</td><td>${status}</td>
        ${sellBtn}
      </tr>`;
    }).join('');
    const sellHeader = needsSell ? '<th>Cedi</th>' : '';
    const warning = needsSell
      ? `<div style="background:#fdecea;border:1px solid #ef4444;border-radius:6px;padding:8px 12px;margin-bottom:10px;color:#b91c1c;font-weight:600">⚠️ Budget negativo (${playerTeam.budget.toFixed(1)}M€) — devi cedere giocatori prima di proseguire.</div>`
      : '';
    return `${warning}${summary}<table style="font-size:.85rem">
      <thead><tr><th>Nome</th><th>Ruolo</th><th>Posizione</th><th>Età</th><th>Forza</th><th>Stipendio</th><th>Stato</th>${sellHeader}</tr></thead>
      <tbody>${rows}</tbody>
    </table>`;
  };

  const buildPanchinaTab = () => {
    const coach = playerTeam.coach;
    let html = '';
    const expired = coach && (coach.contract?.duration || 0) <= 0;

    // ── Allenatore attuale ────────────────────────────────────────────────
    if (coach && expired) {
      const fit = getFormationFitLabel(playerTeam, coach.formation);
      html += `<div class="mm-row" style="background:#fdecea">
        <div class="mm-pinfo">
          <span class="mm-name">${coach.firstName} ${coach.lastName}</span>
          <span>${coach.age}a</span>
          <span>⚡${coach.strength}</span>
          <span class="mm-badge" title="${formatFormationRequirements(coach.formation)}">${coach.formation}</span>
          <span style="font-size:.8rem;color:${fit.color};font-weight:600">${fit.text}</span>
          <span style="font-size:.8rem;color:#b91c1c;font-weight:700">⚠️ contratto scaduto</span>
        </div>
        <div class="mm-acts">
          ${durationSelectHtml('data-dur-renew-coach', 'x')}
          <button class="mm-btn mm-green" data-action="renew-coach">Rinnova</button>
          <button class="mm-btn mm-red" data-action="release-coach">Lascialo andare</button>
        </div></div>
        <p style="font-size:.82rem;color:#666;margin:10px 2px">Il contratto è scaduto: rinnovalo scegliendo la durata, oppure lascialo andare gratuitamente e ingaggiane un altro dal mercato qui sotto.</p>`;
    } else if (coach) {
      const fit = getFormationFitLabel(playerTeam, coach.formation);
      const severance = getCoachSeveranceCost(coach);
      const canAfford = playerTeam.budget >= severance;
      html += `<div class="mm-row" style="background:#eef7ff">
        <div class="mm-pinfo">
          <span class="mm-name">${coach.firstName} ${coach.lastName}</span>
          <span>${coach.age}a</span>
          <span>⚡${coach.strength}</span>
          <span class="mm-badge" title="${formatFormationRequirements(coach.formation)}">${coach.formation}</span>
          <span style="font-size:.8rem;color:${fit.color};font-weight:600">${fit.text}</span>
          <span style="font-size:.8rem;color:#666">Contratto: ${coach.contract.duration}a</span>
        </div>
        <div class="mm-acts">
          <button class="mm-btn mm-red" data-action="fire-coach" ${canAfford ? '' : 'disabled'}>
            ${canAfford ? `Esonera (${severance.toFixed(1)}M€)` : 'Fondi insuff. per esonero'}
          </button>
        </div></div>
        <p style="font-size:.82rem;color:#666;margin:10px 2px">Il modulo dell'allenatore determina la formazione in campo (posizioni richieste: <strong>${formatFormationRequirements(coach.formation)}</strong>). Puoi anche ingaggiare direttamente un allenatore dal mercato qui sotto: quello attuale verrà esonerato in automatico (buonuscita inclusa).</p>`;
    } else {
      html += `<div style="background:#fdecea;border:1px solid #ef4444;border-radius:6px;padding:8px 12px;margin-bottom:12px;color:#b91c1c;font-weight:600">⚠️ Sei senza allenatore — scegline uno dal mercato qui sotto prima di continuare.</div>`;
    }

    // ── Mercato allenatori liberi (sempre visibile, anche con un allenatore già in carica) ──
    html += `<h4 style="margin:16px 2px 8px;font-size:.9rem;color:#333">📋 Mercato allenatori liberi</h4>`;
    const outgoingSeverance = (coach && !expired) ? getCoachSeveranceCost(coach) : 0;
    const swapNote = (coach && !expired)
      ? ` <span style="font-size:.75rem;color:#b91c1c">(esonero incluso: ${outgoingSeverance.toFixed(1)}M€)</span>`
      : '';

    html += `<div class="mm-row">
      <div class="mm-pinfo"><span class="mm-name">🌱 Promuovi un emergente</span><span style="font-size:.8rem;color:#666">Un allenatore sconosciuto, gratis${swapNote}</span></div>
      <div class="mm-acts">${durationSelectHtml('data-dur-emerging', 'x')}<button class="mm-btn mm-blue" data-action="hire-emerging" ${playerTeam.budget < outgoingSeverance ? 'disabled' : ''}>Ingaggia</button></div></div>`;

    coachCandidates = [...freeCoaches].sort((a, b) => b.strength - a.strength).slice(0, 25);
    if (!coachCandidates.length) {
      html += '<p class="mm-empty">Nessun altro allenatore libero sul mercato al momento.</p>';
      return html;
    }
    html += coachCandidates.map((c, i) => {
      const fit = getFormationFitLabel(playerTeam, c.formation);
      const canAffordSwap = playerTeam.budget >= outgoingSeverance;
      return `<div class="mm-row">
        <div class="mm-pinfo">
          <span class="mm-name">${c.firstName} ${c.lastName}</span>
          <span>${c.age}a</span>
          <span>⚡${c.strength}</span>
          <span class="mm-badge" title="${formatFormationRequirements(c.formation)}">${c.formation}</span>
          <span style="font-size:.8rem;color:${fit.color};font-weight:600">${fit.text}</span>
          ${swapNote}
        </div>
        <div class="mm-acts">
          <strong class="mm-price">Gratis</strong>
          ${durationSelectHtml('data-dur-hire', i)}
          <button class="mm-btn mm-blue" data-action="hire-coach" data-cand-idx="${i}" ${canAffordSwap ? '' : 'disabled'}>Ingaggia</button>
        </div></div>`;
    }).join('');
    return html;
  };

  const buildPrestitiTab = () => {
    let html = '';
    const incomingCount = getIncomingLoanCount(playerTeam);

    // ── In uscita: manda un tuo giocatore in prestito ────────────────────────
    html += `<h4 style="margin:2px 2px 8px;font-size:.9rem;color:#333">📤 Manda in prestito</h4>`;
    const roleOrder = { POR: 0, DIF: 1, CEN: 2, ATT: 3 };
    const loanableOut = [...playerTeam.roster]
      .filter(p => canLoanOutPlayer(playerTeam, p))
      .sort((a, b) => (roleOrder[a.role] - roleOrder[b.role]) || a.strength - b.strength);
    if (!loanableOut.length) {
      html += '<p class="mm-empty">Nessun giocatore prestabile: sei già al minimo di ruolo ovunque.</p>';
    } else {
      html += loanableOut.map(p => `<div class="mm-row">
        <div class="mm-pinfo"><span class="mm-name">${p.firstName} ${p.lastName}</span><span class="mm-badge role-${p.role}">${p.role}</span><span style="font-size:.78rem;color:#666">${formatSubRoles(p)}</span><span>${p.age}a</span><span>⚡${p.strength}</span></div>
        <div class="mm-acts"><button class="mm-btn mm-blue" data-action="loan-out" data-pid="${p.id}">Presta</button></div></div>`).join('');
    }

    // ── In ingresso: richiedi un giocatore in prestito ───────────────────────
    html += `<h4 style="margin:18px 2px 8px;font-size:.9rem;color:#333">📥 Richiedi in prestito <span style="font-weight:400;color:#666">(${incomingCount}/${MAX_INCOMING_LOANS} attivi)</span></h4>`;
    if (incomingCount >= MAX_INCOMING_LOANS) {
      html += `<p class="mm-empty">Hai raggiunto il massimo di ${MAX_INCOMING_LOANS} prestiti in ingresso.</p>`;
      return html;
    }
    loanCandidates = generateIncomingLoanCandidates();
    if (!loanCandidates.length) {
      html += '<p class="mm-empty">Nessun giocatore disponibile in prestito al momento.</p>';
      return html;
    }
    html += loanCandidates.map(({ player: p, fromTeam }, i) => {
      const salary = p.contract?.salary ?? getDisplaySalary(p.strength);
      const overCap = !wageCapAllows(playerTeam, salary);
      return `<div class="mm-row">
      <div class="mm-pinfo"><span class="mm-name">${p.firstName} ${p.lastName}</span><span class="mm-badge role-${p.role}">${p.role}</span><span style="font-size:.78rem;color:#666">${formatSubRoles(p)}</span><span>${p.age}a</span><span>⚡${p.strength}</span><span class="mm-from-tag">da ${fromTeam.name}</span></div>
      <div class="mm-acts"><strong class="mm-price">Gratis</strong><button class="mm-btn mm-blue" data-action="loan-in" data-cand-idx="${i}" ${overCap ? 'disabled' : ''}>${overCap ? '🚫 Monte ingaggi' : 'Richiedi'}</button></div></div>`;
    }).join('');
    return html;
  };

  const buildAcquistiTab = () => {
    let html = buildFilterBar(filter);

    // ── Sezione Scouting DS ────────────────────────────────────────────────
    const playerCap = leagueStrCap(playerTeam.leagueLevel);
    const scoutTargets = pendingScoutingTargets
      .filter(t => !scoutedIds.has(t.player.id) && !boughtIds.has(t.player.id) && t.player.strength <= playerCap && canAddRole(playerTeam, t.player.role) && matchesFilter(t.player, filter));

    if (scoutTargets.length > 0 && playerTeam.ds) {
      html += `<div style="margin-bottom:16px;padding:10px;background:#fff8e1;border-radius:8px;border:1px solid #ffe082">`;
      html += `<h4 style="margin:0 0 8px;font-size:0.92rem">🔍 Il tuo DS ${playerTeam.ds.firstName} ${playerTeam.ds.lastName} ha individuato...</h4>`;
      scoutTargets.forEach(target => {
        const { player: p, fromTeam, cost, successProb, hasClause } = target;
        const canAfford = playerTeam.budget >= cost;
        const salary = p.contract?.salary ?? getDisplaySalary(p.strength);
        const overCap = !wageCapAllows(playerTeam, salary);
        const probLabel = getProbLabel(successProb);
        const clauseTag = hasClause ? ' <span style="font-size:.75rem;color:#2f6fed">(clausola)</span>' : '';
        const label = overCap ? '🚫 Monte ingaggi' : canAfford ? 'Fai Offerta' : 'Fondi insuff.';
        html += `<div class="mm-row" style="background:#fffde7">
          <div class="mm-pinfo">
            <span class="mm-name">${p.firstName} ${p.lastName}</span>
            <span class="mm-badge role-${p.role}">${p.role}</span>
            <span style="font-size:.78rem;color:#666">${formatSubRoles(p)}</span>
            <span>${p.age}a</span>
            <span>⚡${p.strength}</span>
            <span class="mm-from-tag">da ${fromTeam.name}${clauseTag}</span>
            <span style="font-size:.78rem;color:${probLabel.color};font-weight:600">📊 ${probLabel.text}</span>
          </div>
          <div class="mm-acts">
            <strong class="mm-price">${cost.toFixed(1)}M€</strong>
            <button class="mm-btn mm-blue" data-action="scout-offer" data-pid="${p.id}" ${(canAfford && !overCap) ? '' : 'disabled'}>
              ${label}
            </button>
          </div></div>`;
      });
      html += `</div>`;
    }

    // ── Mercato + Svincolati ───────────────────────────────────────────────
    const strCap = leagueStrCap(playerTeam.leagueLevel);
    const preContractedIds = new Set(pendingPreContracts.map(pc => pc.player.id));
    const mktItems = pendingTransferMarket
      .filter(item => !boughtIds.has(item.player.id) && !preContractedIds.has(item.player.id) && item.player.strength <= strCap && canAddRole(playerTeam, item.player.role) && matchesFilter(item.player, filter))
      .sort((a, b) => b.player.strength - a.player.strength);
    const faItems = freeAgents
      .filter(p => !boughtIds.has(p.id) && !preContractedIds.has(p.id) && p.strength <= strCap && canAddRole(playerTeam, p.role) && matchesFilter(p, filter))
      .sort((a, b) => b.strength - a.strength)
      .slice(0, 40);

    if (!mktItems.length && !faItems.length && !scoutTargets.length) {
      html += '<p class="mm-empty">Nessun giocatore corrisponde ai filtri selezionati.</p>';
      return html;
    }

    mktItems.forEach(item => {
      const { player: p, fromTeam, askingPrice } = item;
      const canAfford = playerTeam.budget >= askingPrice;
      const salary = p.contract?.salary ?? getDisplaySalary(p.strength);
      const overCap = !wageCapAllows(playerTeam, salary);
      const label = overCap ? '🚫 Monte ingaggi' : canAfford ? 'Acquista' : 'Fondi insuff.';
      html += `<div class="mm-row">
        <div class="mm-pinfo"><span class="mm-name">${p.firstName} ${p.lastName}</span><span class="mm-badge role-${p.role}">${p.role}</span><span style="font-size:.78rem;color:#666">${formatSubRoles(p)}</span><span>${p.age}a</span><span>⚡${p.strength}</span><span class="mm-from-tag">da ${fromTeam.name}</span></div>
        <div class="mm-acts">
          <strong class="mm-price">${askingPrice.toFixed(1)}M€</strong>
          <button class="mm-btn mm-blue" data-action="buy-market" data-pid="${p.id}" ${(canAfford && !overCap) ? '' : 'disabled'}>
            ${label}
          </button>
        </div></div>`;
    });
    faItems.forEach(p => {
      const salary = getDisplaySalary(p.strength); // firmando ex-novo, lo stipendio è quello di mercato attuale
      const overCap = !wageCapAllows(playerTeam, salary);
      html += `<div class="mm-row">
        <div class="mm-pinfo"><span class="mm-name">${p.firstName} ${p.lastName}</span><span class="mm-badge role-${p.role}">${p.role}</span><span style="font-size:.78rem;color:#666">${formatSubRoles(p)}</span><span>${p.age}a</span><span>⚡${p.strength}</span><span class="mm-free-tag">Svincolato</span></div>
        <div class="mm-acts">
          <strong class="mm-price">Gratis</strong>
          ${overCap ? '' : durationSelectHtml('data-dur-sign', p.id)}
          <button class="mm-btn mm-blue" data-action="buy-fa" data-pid="${p.id}" ${overCap ? 'disabled' : ''}>${overCap ? '🚫 Monte ingaggi' : 'Firma'}</button>
        </div></div>`;
    });
    return html;
  };

  const pendingCount = () => pendingRenewals.filter(p => !renewalDecisions.has(p.id)).length
    + pendingAIOffers.filter(o => !offerDecisions.has(o.player.id)).length;

  const render = () => {
    const tabContent = activeTab === 'rinnovi' ? buildRennoviTab()
      : activeTab === 'offerte' ? buildOfferteTab()
      : activeTab === 'acquisti' ? buildAcquistiTab()
      : activeTab === 'panchina' ? buildPanchinaTab()
      : activeTab === 'prestiti' ? buildPrestitiTab()
      : buildRosaTab();

    const renewPending = pendingRenewals.filter(p => !renewalDecisions.has(p.id)).length;
    const offerPending = pendingAIOffers.filter(o => !offerDecisions.has(o.player.id)).length;
    const needsCoach = !playerTeam.coach || (playerTeam.coach.contract?.duration || 0) <= 0;

    overlay.innerHTML = `
      <div class="mm-box">
        <div class="mm-header">
          <span class="mm-title">🏟️ ${playerTeam.name} — Sessione di Mercato</span>
          <span class="mm-budget">Budget: <strong>${playerTeam.budget.toFixed(1)}M€</strong> &nbsp;|&nbsp; Monte ingaggi: <strong>${getTeamWageBill(playerTeam)}/${Number.isFinite(playerTeam.wageBudgetCap) ? playerTeam.wageBudgetCap : '—'}</strong>k€ &nbsp;|&nbsp; Rosa: <strong>${playerTeam.roster.length}</strong></span>
        </div>
        <div class="mm-tabs">
          <button class="mm-tab${activeTab==='rinnovi'?' active':''}" data-tab="rinnovi">
            Rinnovi ${renewPending > 0 ? `<span class="mm-badge-count">${renewPending}</span>` : ''}
          </button>
          <button class="mm-tab${activeTab==='offerte'?' active':''}" data-tab="offerte">
            Offerte ricevute ${offerPending > 0 ? `<span class="mm-badge-count">${offerPending}</span>` : ''}
          </button>
          <button class="mm-tab${activeTab==='acquisti'?' active':''}" data-tab="acquisti">Acquisti${pendingScoutingTargets.filter(t => !scoutedIds.has(t.player.id) && !boughtIds.has(t.player.id)).length > 0 ? ` <span class="mm-badge-count" style="background:#f59e0b">${pendingScoutingTargets.filter(t => !scoutedIds.has(t.player.id) && !boughtIds.has(t.player.id)).length}</span>` : ''}</button>
          <button class="mm-tab${activeTab==='panchina'?' active':''}" data-tab="panchina">
            Panchina ${needsCoach ? '<span class="mm-badge-count" style="background:#ef4444">!</span>' : ''}
          </button>
          <button class="mm-tab${activeTab==='prestiti'?' active':''}" data-tab="prestiti">
            Prestiti <span class="mm-badge-count" style="background:#64748b">${getIncomingLoanCount(playerTeam)}/${MAX_INCOMING_LOANS}</span>
          </button>
          <button class="mm-tab${activeTab==='rosa'?' active':''}" data-tab="rosa">Rosa Prossima (${(() => {
            const leaving = new Set(pendingRenewals.filter(p => !renewalDecisions.has(p.id)).map(p => p.id));
            const myPreContracts = pendingPreContracts.filter(pc => !pc.toTeam || pc.toTeam === playerTeam).length;
            return playerTeam.roster.filter(p => !leaving.has(p.id)).length + myPreContracts;
          })()})</button>
        </div>
        <div class="mm-content">${tabContent}</div>
        <div class="mm-footer">
          <span class="mm-footer-note">${playerTeam.budget < 0 ? `🚨 Budget negativo — cedi giocatori dalla tab Rosa` : needsCoach ? `⚠️ Scegli un allenatore dalla tab Panchina` : pendingCount() > 0 ? `⚠️ ${pendingCount()} decisioni in sospeso` : '✅ Tutto a posto'}</span>
          <button class="mm-btn mm-confirm" id="mm-confirm" ${(playerTeam.budget < 0 || needsCoach) ? 'disabled style="opacity:.4;cursor:not-allowed"' : ''}>Conferma e Chiudi Mercato →</button>
        </div>
      </div>`;

    overlay.querySelectorAll('.mm-tab').forEach(btn =>
      btn.addEventListener('click', () => { activeTab = btn.dataset.tab; render(); })
    );

    wireFilterBar(overlay, filter, render);

    overlay.querySelectorAll('tr[data-player-id]').forEach(tr => {
      tr.addEventListener('click', (e) => {
        if (e.target.closest('[data-action]')) return;
        const p = findPlayerById(+tr.dataset.playerId);
        if (p) openPlayerCard(p);
      });
    });

    overlay.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const { action, pid } = btn.dataset;
        const id = +pid;
        if (action === 'filter-reset') return; // gestito da wireFilterBar

        if (action === 'renew') {
          const p = pendingRenewals.find(p => p.id === id);
          if (p) {
            const greed = p.personality?.greed || 50;
            const demanded = Math.round(getDisplaySalary(p.strength) * (1.0 + greed * 0.004));
            const current = p.contract?.salary || getDisplaySalary(p.strength);
            if (wageCapAllows(playerTeam, demanded, current)) {
              if (!p.contract) p.contract = createContract(p.strength, p.age);
              const years = +(overlay.querySelector(`select[data-dur-renew="${id}"]`)?.value) || 3;
              p.contract.salary   = demanded;
              p.contract.duration = years;
              transferLog.push(`📋 <em>${p.firstName} ${p.lastName}</em> rinnova con <strong>${playerTeam.name}</strong> — ${p.contract.duration} anni, ${demanded}k€/mese`);
              renewalDecisions.set(id, 'renewed');
            }
          }
        } else if (action === 'release') {
          const p = pendingRenewals.find(p => p.id === id);
          if (p) {
            playerTeam.roster = playerTeam.roster.filter(x => x !== p);
            recordTransfer(p, null, null);
            freeAgents.push(p);
            transferLog.push(`🔚 <em>${p.firstName} ${p.lastName}</em> lascia <strong>${playerTeam.name}</strong> a parametro zero`);
            renewalDecisions.set(id, 'released');
          }
        } else if (action === 'accept-offer') {
          const offer = pendingAIOffers.find(o => o.player.id === id);
          if (offer && !offerDecisions.has(id)) {
            const { player: p, buyerTeam, offerPrice } = offer;
            playerTeam.roster = playerTeam.roster.filter(x => x !== p);
            buyerTeam.roster.push(p);
            playerTeam.budget += offerPrice;
            buyerTeam.budget -= offerPrice;
            recalculateTeamStrength(buyerTeam);
            recordTransfer(p, buyerTeam.name, offerPrice);
            transferLog.push(`💰 <strong>${playerTeam.name}</strong> vende ${p.firstName} ${p.lastName} a <strong>${buyerTeam.name}</strong> per <strong>${offerPrice.toFixed(1)}M€</strong>`);
            offerDecisions.set(id, 'accepted');
          }
        } else if (action === 'refuse-offer') {
          offerDecisions.set(id, 'refused');
        } else if (action === 'buy-fa') {
          const p = freeAgents.find(p => p.id === id);
          const salaryFa = p ? getDisplaySalary(p.strength) : 0;
          if (p && canAddRole(playerTeam, p.role) && !boughtIds.has(id) && wageCapAllows(playerTeam, salaryFa)) {
            freeAgents.splice(freeAgents.indexOf(p), 1);
            playerTeam.roster.push(p);
            const years = +(overlay.querySelector(`select[data-dur-sign="${id}"]`)?.value) || 3;
            p.contract = createContract(p.strength, p.age);
            p.contract.duration = years;
            recalculateTeamStrength(playerTeam);
            recordTransfer(p, playerTeam.name, 0);
            transferLog.push(`✍️ <strong>${playerTeam.name}</strong> ingaggia ${p.firstName} ${p.lastName} (Forza: ${p.strength}) — contratto ${years} anni`);
            boughtIds.add(id);
          }
        } else if (action === 'buy-market') {
          const item = pendingTransferMarket.find(i => i.player.id === id);
          const salaryMk = item ? (item.player.contract?.salary ?? getDisplaySalary(item.player.strength)) : 0;
          if (item && playerTeam.budget >= item.askingPrice && canAddRole(playerTeam, item.player.role) && !boughtIds.has(id) && wageCapAllows(playerTeam, salaryMk)) {
            const { player: p, fromTeam, askingPrice } = item;
            fromTeam.roster = fromTeam.roster.filter(x => x !== p);
            playerTeam.roster.push(p);
            playerTeam.budget -= askingPrice;
            fromTeam.budget += askingPrice;
            recalculateTeamStrength(fromTeam);
            recalculateTeamStrength(playerTeam);
            recordTransfer(p, playerTeam.name, askingPrice);
            transferLog.push(`🔄 <strong>${fromTeam.name}</strong> → <strong>${playerTeam.name}</strong>: ${p.firstName} ${p.lastName} per <strong>${askingPrice.toFixed(1)}M€</strong>`);
            boughtIds.add(id);
          }
        } else if (action === 'sell-player') {
          const p = playerTeam.roster.find(x => x.id === id);
          const isLoanedIn = p && activeLoans.some(l => l.player === p && l.loanTeam === playerTeam);
          if (p && p.role !== 'POR' && !isLoanedIn) {
            const income = Math.max(0.5, Math.round(getTransferValue(p) * 0.65 * 10) / 10);
            playerTeam.roster = playerTeam.roster.filter(x => x !== p);
            playerTeam.budget += income;
            freeAgents.push(p);
            recalculateTeamStrength(playerTeam);
            recordTransfer(p, null, null);
            transferLog.push(`🚨 <strong>${playerTeam.name}</strong> cede ${p.firstName} ${p.lastName} (Forza: ${p.strength}) per risanare il bilancio — incasso: ${income.toFixed(1)}M€`);
          }
        } else if (action === 'scout-offer') {
          const target = pendingScoutingTargets.find(t => t.player.id === id);
          const salaryScout = target ? (target.player.contract?.salary ?? getDisplaySalary(target.player.strength)) : 0;
          if (target && playerTeam.budget >= target.cost && !scoutedIds.has(id) && !boughtIds.has(id) && wageCapAllows(playerTeam, salaryScout)) {
            scoutedIds.add(id);
            if (Math.random() < target.successProb) {
              // Successo: trasferimento effettivo
              const { player: p, fromTeam, cost } = target;
              fromTeam.roster = fromTeam.roster.filter(x => x !== p);
              playerTeam.roster.push(p);
              playerTeam.budget -= cost;
              fromTeam.budget += cost;
              recalculateTeamStrength(fromTeam);
              recalculateTeamStrength(playerTeam);
              recordTransfer(p, playerTeam.name, cost);
              const clauseNote = target.hasClause ? ' <em>(clausola rescissoria)</em>' : '';
              transferLog.push(`🔍 <strong>${playerTeam.name}</strong> acquista ${p.firstName} ${p.lastName} da <strong>${fromTeam.name}</strong> per <strong>${cost.toFixed(1)}M€</strong>${clauseNote} — individuato dal DS`);
              boughtIds.add(id);
              pendingScoutingTargets = pendingScoutingTargets.filter(t => t.player.id !== id);
            } else {
              // Fallimento: trattativa non andata a buon fine
              transferLog.push(`❌ <strong>${playerTeam.name}</strong>: trattativa fallita per ${target.player.firstName} ${target.player.lastName} di <strong>${target.fromTeam.name}</strong> — il giocatore ha rifiutato`);
              pendingScoutingTargets = pendingScoutingTargets.filter(t => t.player.id !== id);
            }
          }
        } else if (action === 'fire-coach') {
          const coach = playerTeam.coach;
          const severance = coach ? getCoachSeveranceCost(coach) : 0;
          if (coach && playerTeam.budget >= severance) {
            playerTeam.budget -= severance;
            freeCoaches.push(coach);
            playerTeam.coach = null;
            transferLog.push(`🚨 <strong>${playerTeam.name}</strong> esonera <em>${coach.firstName} ${coach.lastName}</em> — buonuscita: ${severance.toFixed(1)}M€`);
          }
        } else if (action === 'hire-coach') {
          const candIdx = +btn.dataset.candIdx;
          const coach = coachCandidates[candIdx];
          if (coach && displaceCurrentCoach()) {
            const idx = freeCoaches.indexOf(coach);
            if (idx >= 0) freeCoaches.splice(idx, 1);
            const years = +(overlay.querySelector(`select[data-dur-hire="${candIdx}"]`)?.value) || 3;
            coach.contract = { duration: years };
            playerTeam.coach = coach;
            transferLog.push(`✅ <strong>${playerTeam.name}</strong> ingaggia l'allenatore <em>${coach.firstName} ${coach.lastName}</em> (Forza: ${coach.strength}, ${coach.formation}) — contratto ${years} anni`);
          }
        } else if (action === 'hire-emerging') {
          if (displaceCurrentCoach()) {
            const years = +(overlay.querySelector('select[data-dur-emerging]')?.value) || 3;
            const coach = createCoach(playerTeam);
            coach.contract = { duration: years };
            playerTeam.coach = coach;
            transferLog.push(`🌱 <strong>${playerTeam.name}</strong> promuove un emergente in panchina: <em>${coach.firstName} ${coach.lastName}</em> (Forza: ${coach.strength}, ${coach.formation}) — contratto ${years} anni`);
          }
        } else if (action === 'renew-coach') {
          const coach = playerTeam.coach;
          if (coach && (coach.contract?.duration || 0) <= 0) {
            const years = +(overlay.querySelector('select[data-dur-renew-coach]')?.value) || 3;
            coach.contract.duration = years;
            transferLog.push(`📄 <strong>${playerTeam.name}</strong> rinnova l'allenatore <em>${coach.firstName} ${coach.lastName}</em> per ${years} anni`);
          }
        } else if (action === 'release-coach') {
          const coach = playerTeam.coach;
          if (coach && (coach.contract?.duration || 0) <= 0) {
            freeCoaches.push(coach);
            playerTeam.coach = null;
            transferLog.push(`📄 <em>${coach.firstName} ${coach.lastName}</em> lascia <strong>${playerTeam.name}</strong> a fine contratto`);
          }
        } else if (action === 'loan-out') {
          const p = playerTeam.roster.find(x => x.id === id);
          if (p) loanOutPlayer(p);
        } else if (action === 'loan-in') {
          const candIdx = +btn.dataset.candIdx;
          const cand = loanCandidates[candIdx];
          const salary = cand ? (cand.player.contract?.salary ?? getDisplaySalary(cand.player.strength)) : 0;
          if (cand && wageCapAllows(playerTeam, salary)) loanInPlayer(cand.player, cand.fromTeam);
        }
        render();
      });
    });

    overlay.querySelector('#mm-confirm').addEventListener('click', () => {
      // Giocatori in scadenza non decisi → parametro zero automatico
      pendingRenewals.forEach(p => {
        if (!renewalDecisions.has(p.id)) {
          playerTeam.roster = playerTeam.roster.filter(x => x !== p);
          recordTransfer(p, null, null);
          freeAgents.push(p);
          transferLog.push(`🔚 <em>${p.firstName} ${p.lastName}</em> lascia <strong>${playerTeam.name}</strong> a parametro zero`);
        }
      });
      overlay.remove();
      onConfirm();
    });
  };

  render();
  document.body.appendChild(overlay);
}
