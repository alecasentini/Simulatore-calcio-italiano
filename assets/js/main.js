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

// Serie D: NON è un campionato simulato — è un pool fisso di 10 squadre che
// ricevono le retrocesse dalla Serie C e ne restituiscono altrettante (a
// caso, vedi handlePromotionsAndRelegations) per tenere il pool sempre a 10.
// Nessuna classifica, nessun calendario, nessuna UI dedicata: le squadre qui
// dentro restano "dormienti" (rosa/staff vuoti) finché non vengono ripescate.
let serieD = [
  { name: 'Treviso', colors: ['#87CEEB', '#FFFFFF'] },
  { name: 'Ancona', colors: ['#DA291C', '#FFFFFF'] },
  { name: 'Pistoiese', colors: ['#FFA366', '#FFFFFF'] },
  { name: 'Taranto', colors: ['#DA291C', '#002D62'] },
  { name: 'Carpi', colors: ['#FFFFFF', '#DA291C'] },
  { name: 'Spezia', colors: ['#FFFFFF', '#000000'] },
  { name: 'Ravenna', colors: ['#FFD700', '#DA291C'] },
  { name: 'Crotone', colors: ['#DA291C', '#002D62'] },
  { name: 'Legnano', colors: ['#C8A2C8', '#FFFFFF'] },
  { name: 'Sambenedettese', colors: ['#DA291C', '#002D62'] },
];

// Variabili per gestire lo storico
let seasonCount = 0;
let nextPlayerId = 0;
let championsHistory = [];
let transferLog = [];
// Indice in transferLog da cui iniziano le notizie del mercato invernale
// (impostato quando parte l'inverno, azzerato quando transferLog riparte a
// inizio stagione) — usato per marcare nelle Notizie il punto in cui il
// mercato estivo finisce e comincia quello invernale.
let winterMarketStartAt = null;
let freeAgents = [];
let freeCoaches = [];
let freeDirectors = [];

// Squadra del giocatore (null = modalità spettatore)
let playerTeam = null;

// Carriera del giocatore come Direttore Sportivo (null = spettatore puro)
// { firstName, lastName, age, reputation, teamName|null, contractYears, seasonsUnemployed, history: [] }
let dsCareer = null;

// Offerte di lavoro "di stagione": generate una sola volta all'inizio di ogni
// stagione (reset in showSeasonEvaluationModal) e riusate ogni volta che il DS
// consulta il mercato mentre è ancora sotto contratto — evitano di poter
// ri-rimescolare le proposte all'infinito cercando quella migliore.
let seasonJobOffersCache = null;
function getSeasonJobOffers() {
  if (!seasonJobOffersCache) seasonJobOffersCache = generateDSJobOffers();
  return seasonJobOffersCache;
}

// Dati pendenti per la UI del mercato manageriale
let pendingRenewals = [];        // giocatori in scadenza della squadra del giocatore
let pendingAIOffers = [];        // offerte AI per i giocatori del giocatore
let renewalInterest = new Map(); // player.id → squadra interessata a prenderlo gratis se non rinnovato
let pendingTransferMarket = [];  // giocatori rimasti sul mercato dopo le trattative AI
let pendingForeignScoutTargets = []; // 20 talenti stranieri scovati dall'area scout (solo Serie A)
let pendingPreContracts = [];    // { player, fromTeam } — pre-contratti firmati nel mercato invernale
// Stato di sessione di showManagerMarketModal (Fase 16): dal momento in cui
// il player può essere richiamato più volte nella stessa sessione di
// mercato (una volta per turno, non più una sola volta a fine mercato),
// queste mappe/set devono sopravvivere tra un'apertura e l'altra della
// finestra — altrimenti una decisione già presa (rinnovo, offerta
// accettata/rifiutata, acquisto) sparirebbe alla riapertura successiva e
// verrebbe richiesta di nuovo. Azzerate una sola volta per sessione, in
// proceedToBriefing/startMarket, insieme a pendingAIOffers.
let mmSessionRenewalDecisions = new Map();
let mmSessionOfferDecisions = new Map();
let mmSessionBoughtIds = new Set();
let mmSessionSoldIds = new Set();
// §5 REGOLE_CALCIOMERCATO — divieto di doppio trasferimento nella stessa
// sessione: un giocatore comprato/venduto/svincolato-e-poi-firmato/preso in
// prestito (CPU o umano, in qualunque direzione) non può essere ricoinvolto
// in nessun'altra transazione per il resto della sessione di mercato in
// corso (estiva o invernale) — si azzera a ogni nuova sessione (career
// start, inizio mercato estivo, inizio mercato invernale). Uno svincolo
// "puro" (senza firma successiva) NON blocca il giocatore: lo si rimuove dal
// set, così resta firmabile da chiunque nella stessa sessione — è la firma
// successiva a bloccarlo di nuovo.
let sessionMovedPlayers = new Set();
function isSessionLocked(player) { return sessionMovedPlayers.has(player); }
function lockForSession(player) { sessionMovedPlayers.add(player); }
function unlockForSession(player) { sessionMovedPlayers.delete(player); }
// §0/§1a-bis REGOLE_CALCIOMERCATO — true durante il mercato invernale (fase a
// turni), false in quello estivo: distingue le regole che cambiano tra le
// due sessioni (Precontratti esiste solo in inverno, risoluzione immediata
// dei rinnovi solo in estate).
let currentMarketIsWinter = false;
// Consenso a fasce (§5) per la tab Precontratti dell'umano, calcolato UNA
// volta a giocatore per tutta la sessione invernale (altrimenti cambierebbe
// a ogni render) — player.id → true/false.
let mmSessionPreContractConsent = new Map();
// Stesso principio, per le tab Acquisti/Prestiti dell'umano (§5): nessun
// tetto di forza per lega, solo consenso a fasce — calcolato UNA volta a
// giocatore per sessione (altrimenti la lista cambierebbe a ogni render, o
// peggio si potrebbe "ritentare" cambiando tab finché non accetta) — chi
// rifiuta semplicemente non compare in lista, nessun tentativo che fallisce
// a metà transazione. player.id → true/false.
let mmSessionBuyConsent = new Map();
// Hook di osservabilità per gli script diagnostici: se impostato (array) da
// fuori (es. `__marketStatsSink = []` in un driver Node), riceve
// {team, gain, cost, score} per ogni bersaglio di mercato scorato dalla CPU
// (STEP 6b/6b-bis, mercato invernale) — null in gioco normale, nessun costo.
let __marketStatsSink = null;
// Hook gemello: se impostato (Map team.name -> count), viene incrementato
// ogni volta che una squadra supera il proprio skip-chance di partecipazione
// al mercato (STEP 6b/6b-bis/invernale), A PRESCINDERE dal fatto che trovi
// poi davvero un bersaglio — isola l'effetto di getMarketAggressiveness
// sulla partecipazione dai vincoli a valle (tetti di forza, ruoli saturi).
let __marketAttemptsSink = null;
function __recordMarketAttempt(team) {
  if (!__marketAttemptsSink) return;
  __marketAttemptsSink.set(team.name, (__marketAttemptsSink.get(team.name) || 0) + 1);
}

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
  'Pasquale', 'Renato', 'Ruggero', 'Silvio', 'Vittorio', 'Carmelo', 'Adriano', 'Agostino',
  'Alfredo', 'Amedeo', 'Angelo', 'Anselmo', 'Arturo', 'Attilio', 'Augusto', 'Aurelio',
  'Bernardo', 'Bartolomeo', 'Camillo', 'Carlo', 'Corrado', 'Cristoforo', 'Dante', 'Dino',
  'Diego', 'Dionisio', 'Donato', 'Duccio', 'Edmondo', 'Egidio', 'Elio', 'Emilio',
  'Enzo', 'Ercole', 'Ermanno', 'Eugenio', 'Ezio', 'Fausto', 'Felice', 'Ferdinando',
  'Fiorenzo', 'Flavio', 'Franco', 'Gerardo', 'Germano', 'Gianfranco', 'Gianmarco', 'Gianpaolo',
  'Gino', 'Girolamo', 'Giulio', 'Giuliano', 'Guglielmo', 'Guido', 'Iacopo', 'Ivano',
  'Lamberto', 'Lando', 'Lelio', 'Libero', 'Lodovico', 'Loris', 'Manlio', 'Marino',
  'Marzio', 'Massimiliano', 'Maurizio', 'Mauro', 'Melchiorre', 'Modesto', 'Narciso', 'Nazzareno',
  'Nello', 'Nereo', 'Nino', 'Norberto', 'Oreste', 'Osvaldo', 'Ottavio', 'Ottone',
  'Pierluigi', 'Pierfrancesco', 'Piergiorgio', 'Piero', 'Primo', 'Quinto', 'Raimondo', 'Remo',
  'Renzo', 'Rocco', 'Romano', 'Romeo', 'Romolo', 'Rosario', 'Sabino', 'Saverio',
  'Sebastiano', 'Secondo', 'Settimio', 'Severino', 'Siro', 'Tarcisio', 'Tazio', 'Teodoro',
  'Terenzio', 'Tiziano', 'Tullio', 'Ubaldo', 'Ugo', 'Valentino', 'Venanzio', 'Vito',
  'Vittore', 'Walter', 'Zaccaria', 'Amos', 'Ansaldo', 'Bastiano', 'Beniamino', 'Bonifacio',
  'Calisto', 'Celso', 'Ciro', 'Clemente', 'Costantino', 'Damiano', 'Demetrio', 'Eliseo',
  'Emiliano', 'Erminio', 'Ernesto', 'Evaristo', 'Fedele', 'Flaminio', 'Fulvio', 'Galeazzo',
  'Gastone', 'Gedeone', 'Geremia', 'Gervasio', 'Gioacchino', 'Gioele', 'Gionata', 'Giosuè',
  'Ippolito', 'Isidoro', 'Italo', 'Landolfo', 'Learco', 'Leandro', 'Leonzio', 'Liborio',
  'Lino', 'Livio', 'Lucio', 'Ludovico', 'Manfredi', 'Marcello', 'Mariano', 'Martino',
  'Medardo', 'Menotti', 'Modestino', 'Nazario', 'Nicodemo', 'Noè', 'Odoardo', 'Olindo',
  'Olivo', 'Onofrio', 'Osea', 'Oscar', 'Ottaviano', 'Palmiro', 'Pancrazio', 'Pantaleo',
  'Pellegrino', 'Pericle', 'Petronio', 'Placido', 'Policarpo', 'Prospero', 'Quintino', 'Raniero',
  'Rinaldo', 'Rodolfo', 'Ruggiero', 'Sabatino', 'Salvo', 'Sandro', 'Sante', 'Saul',
  'Serafino', 'Sesto', 'Sigismondo', 'Silvano', 'Silverio', 'Simeone', 'Siriaco', 'Stanislao',
  'Taddeo', 'Tancredi', 'Telesforo', 'Teobaldo', 'Timoteo', 'Torquato', 'Tranquillo', 'Urbano',
  'Valdo', 'Venceslao', 'Vespasiano', 'Vittoriano', 'Volfango', 'Zeffirino', 'Zenone', 'Zosimo',
  'Achille', 'Adalberto', 'Adamo', 'Aleandro', 'Alfonso', 'Amerigo', 'Anacleto', 'Anastasio',
  'Ancelmo', 'Angiolino', 'Annibale', 'Ansano', 'Apollonio', 'Aristide', 'Armando', 'Arrigo',
  'Astolfo', 'Baldassarre', 'Beato', 'Berardo', 'Bettino', 'Biagio', 'Bindo', 'Bonaventura',
  'Brando', 'Candido', 'Canzio', 'Carmine', 'Casimiro', 'Celestino', 'Cherubino', 'Ciriaco',
  'Colombano', 'Costante', 'Crescenzo', 'Dagoberto', 'Davino', 'Decimo', 'Delfino', 'Diomede',
  'Domiziano', 'Donatello', 'Dorino', 'Edgardo', 'Elmo', 'Emidio', 'Ercolano', 'Everardo',
  'Fabiano', 'Faliero', 'Fantino', 'Faustino', 'Ferruccio', 'Fidenzio', 'Filiberto', 'Firmino',
  'Folco', 'Foscolo', 'Frediano', 'Galliano', 'Gaudenzio', 'Gelindo', 'Genesio', 'Gervaso',
  'Ghino', 'Giannetto', 'Giasone'
];

const ITALIAN_LAST_NAMES = [
  'Rossi', 'Ferrari', 'Russo', 'Bianchi', 'Esposito', 'Romano', 'Colombo', 'Ricci',
  'Marino', 'Greco', 'Bruno', 'Gallo', 'Conti', 'De Luca', 'Mancini', 'Costa',
  'Giordano', 'Rizzo', 'Lombardi', 'Moretti', 'Barbieri', 'Fontana', 'Santoro', 'Mariani',
  'Rinaldi', 'Caruso', 'Ferrara', 'Galli', 'Martini', 'Leone', 'Longo', 'Gentile',
  'Martinelli', 'Vitale', 'Conte', 'Ferretti', 'Sala', 'Serra', 'Fabbri', 'Monti',
  'Palermo', 'Caputo', 'Guerra', 'Pellegrini', 'Poli', 'Mazzola', 'Tardelli', 'Baresi',
  'Maldini', 'Rivera', 'Causio', 'Antognoni', 'Zoff', 'Bergomi', 'Facchetti', 'Meazza',
  'Piola', 'Riva', 'Totti', 'Del Piero', 'Amato', 'Basile', 'Benedetti', 'Bernardi',
  'Bertolini', 'Bianco', 'Bonetti', 'Bonucci', 'Borghi', 'Bosco', 'Cattaneo', 'Cavalli',
  'Cavallo', 'Chiesa', 'Cipriani', 'Coppola', 'Cosenza', 'Cremonesi', 'D\'Amico', 'D\'Angelo',
  'De Santis', 'Di Marco', 'Di Stefano', 'Donati', 'Farina', 'Ferrero', 'Ferri', 'Festa',
  'Fiore', 'Forte', 'Franchi', 'Franco', 'Gatti', 'Gentili', 'Ghirardi', 'Giannini',
  'Giorgi', 'Grassi', 'Grasso', 'Grossi', 'Guarino', 'Iacobucci', 'Lanza', 'Lazzari',
  'Lombardo', 'Lupo', 'Magni', 'Marchetti', 'Marchi', 'Marconi', 'Marrone', 'Mattei',
  'Mazza', 'Mazzocchi', 'Merlo', 'Milani', 'Mongelli', 'Morandi', 'Nardi', 'Nava',
  'Negri', 'Neri', 'Orlandi', 'Pagano', 'Palmieri', 'Parisi', 'Pastore', 'Pavan',
  'Pedretti', 'Perrone', 'Pesce', 'Piccolo', 'Pinto', 'Pizzi', 'Pozzi', 'Puglisi',
  'Ranieri', 'Ravasi', 'Renna', 'Ricciardi', 'Righi', 'Rocca', 'Rossetti', 'Sabbatini',
  'Sacco', 'Salvi', 'Sanna', 'Sartori', 'Scala', 'Sergi', 'Silvestri', 'Sorrentino',
  'Spada', 'Spinelli', 'Tarantino', 'Testa', 'Tondo', 'Toscano', 'Trevisan', 'Valenti',
  'Vanni', 'Ventura', 'Vergani', 'Verdi', 'Vicari', 'Villa', 'Zanetti', 'Zanini',
  'Zecchini', 'Zingaretti', 'Abbate', 'Acquaviva', 'Agnelli', 'Albanese', 'Albini', 'Amoroso',
  'Ancona', 'Angeli', 'Arena', 'Baggio', 'Balbo', 'Baldini', 'Barone', 'Bartoli',
  'Bassi', 'Bellini', 'Belotti', 'Benati', 'Bernasconi', 'Bertoni', 'Bianchini', 'Bignami',
  'Bocchi', 'Bonini', 'Borrelli', 'Brambilla', 'Brunetti', 'Bruni', 'Buccellati', 'Buonanno',
  'Calabrese', 'Calvi', 'Campana', 'Canale', 'Canavero', 'Cangemi', 'Cantoni', 'Capasso',
  'Caravaggio', 'Carbone', 'Cardinale', 'Carini', 'Carletti', 'Carrara', 'Casadei', 'Casale',
  'Cassano', 'Castiglione', 'Catalano', 'Cavallini', 'Ceccarelli', 'Celli', 'Cerruti', 'Chiaramonte',
  'Cicero', 'Cilento', 'Ciotti', 'Cirillo', 'Cocco', 'Colella', 'Colonna', 'Coppa',
  'Corsi', 'Crespi', 'Curti', 'D\'Alessio', 'D\'Amato', 'D\'Ambrosio', 'D\'Ascenzo', 'Damiani',
  'De Angelis', 'De Marco', 'De Rosa', 'De Vita', 'Del Bene', 'Del Vecchio', 'Della Valle', 'Di Biase',
  'Di Carlo', 'Di Fiore', 'Di Giacomo', 'Di Lorenzo', 'Di Maggio', 'Di Nardo', 'Di Palma', 'Di Pietro',
  'Di Salvo', 'Donadoni', 'Ercolani', 'Fabbrini', 'Falco', 'Fantini', 'Ferraro', 'Ferrucci',
  'Fiorini', 'Foglia', 'Forlani', 'Franzese', 'Fusco', 'Gabrielli', 'Gagliardi', 'Galante',
  'Galvani', 'Gambino', 'Gasparini', 'Gatto', 'Gerardi', 'Ghilardi', 'Giaccone', 'Gioia',
  'Gorini', 'Grieco', 'Guerrini', 'Guidi', 'Iannucci', 'Ippoliti', 'Landi', 'Lanzi',
  'Lauro', 'Lecce', 'Leonardi', 'Leoni', 'Liguori', 'Lippi', 'Lorusso', 'Lovato',
  'Maccari', 'Macchi', 'Maggio', 'Malfatti', 'Manfredi', 'Mannucci', 'Manzoni', 'Marotta',
  'Marra', 'Masi', 'Matteucci', 'Mele', 'Meloni', 'Melis', 'Mengoni', 'Merlino',
  'Messina', 'Migliaccio', 'Minelli', 'Miniussi', 'Mirabelli', 'Molinari', 'Montanari', 'Montesi',
  'Moro', 'Muratori', 'Nannini', 'Napolitano', 'Nicolini', 'Nobili', 'Novelli', 'Olivieri',
  'Oliverio', 'Orsini', 'Padoan', 'Palladino', 'Pancotto', 'Pane', 'Pantano', 'Paolini',
  'Paolucci', 'Pardi', 'Pasini', 'Pasquali', 'Pavesi', 'Pecchia', 'Pepe', 'Perna',
  'Petrini', 'Piazza', 'Piras', 'Pisani', 'Pizzo', 'Pontani', 'Ponti', 'Pratesi',
  'Prosperi', 'Quaranta', 'Raimondi', 'Rampini', 'Ranucci', 'Rapetti', 'Ravera', 'Re',
  'Recchia', 'Rega', 'Renzi', 'Restelli', 'Ricco', 'Roda', 'Roggero', 'Romani',
  'Rosati', 'Rota', 'Rovelli', 'Ruggeri', 'Sacchi', 'Salerno', 'Salis', 'Salviati',
  'Sanguineti', 'Sansone', 'Saracino', 'Sarti', 'Scarpa', 'Sciacca', 'Sciarra', 'Scognamiglio',
  'Serafini', 'Sergio', 'Sestini', 'Sforza', 'Simeoni', 'Solari', 'Spagnoli', 'Speranza',
  'Stella', 'Storti', 'Tagliaferri', 'Tamburini', 'Tarantini', 'Tassi', 'Tedeschi', 'Terranova',
  'Tessitori', 'Tironi', 'Todaro', 'Tomasi', 'Trapani', 'Trevisani', 'Trombetta', 'Ugolini',
  'Vacca', 'Valentini', 'Vecchi', 'Venturi', 'Vezzosi', 'Viale', 'Vianello', 'Vigano',
  'Vigliotti', 'Villani', 'Violante', 'Visconti', 'Viti', 'Vivaldi', 'Volpi', 'Zambelli',
  'Zampieri', 'Zanardi', 'Zannoni', 'Zappalà', 'Zecca', 'Zenone', 'Zerbino', 'Zoppi',
  'Marchini', 'Marchelli', 'Marchello', 'Marchone', 'Marchoni', 'Marchuzzo', 'Marchucci', 'Marchacci',
  'Marchesi', 'Marchin', 'Marcholo', 'Marchani', 'Marchuti', 'Giordi', 'Giordini', 'Giordetti',
  'Giordelli', 'Giordello', 'Giordone', 'Giordoni', 'Giorduzzo', 'Giorducci', 'Giordacci', 'Giordesi',
  'Giordin', 'Giordolo', 'Giordani', 'Giorduti', 'Rossini', 'Rosselli', 'Rossello', 'Rossone',
  'Rossoni', 'Rossuzzo', 'Rossucci', 'Rossacci', 'Rossesi', 'Rossin', 'Rossolo', 'Rossani',
  'Rossuti', 'Bianci', 'Biancini', 'Biancetti', 'Biancelli', 'Biancello', 'Biancone', 'Bianconi',
  'Biancuzzo', 'Biancucci', 'Biancacci', 'Biancesi', 'Biancin', 'Biancolo', 'Biancani', 'Biancuti',
  'Grassini', 'Grassetti', 'Grasselli', 'Grassello', 'Grassone', 'Grassoni', 'Grassuzzo', 'Grassucci',
  'Grassacci', 'Grassesi', 'Grassin', 'Grassolo', 'Grassani', 'Grassuti', 'Greci', 'Grecini',
  'Grecetti', 'Grecelli', 'Grecello', 'Grecone', 'Greconi', 'Grecuzzo', 'Grecucci', 'Grecacci',
  'Grecesi', 'Grecin', 'Grecolo', 'Grecani', 'Grecuti', 'Russi', 'Russini', 'Russetti',
  'Russelli', 'Russello', 'Russone', 'Russoni', 'Russuzzo', 'Russucci', 'Russacci', 'Russesi',
  'Russin', 'Russolo', 'Russani', 'Russuti', 'Colombi', 'Colombini', 'Colombetti', 'Colombelli',
  'Colombello', 'Colombone', 'Colomboni', 'Colombuzzo', 'Colombucci', 'Colombacci', 'Colombesi', 'Colombin',
  'Colombolo', 'Colombani', 'Colombuti', 'Ferrini', 'Ferrelli', 'Ferrello', 'Ferrone', 'Ferroni',
  'Ferruzzo', 'Ferracci', 'Ferresi', 'Ferrin', 'Ferrolo', 'Ferrani', 'Ferruti', 'Mori',
  'Morini', 'Morelli', 'Morello', 'Morone', 'Moroni', 'Moruzzo', 'Morucci', 'Moracci',
  'Moresi', 'Morin', 'Morolo', 'Morani', 'Moruti', 'Santi', 'Santini', 'Santetti',
  'Santelli', 'Santello', 'Santone', 'Santoni', 'Santuzzo', 'Santucci', 'Santacci', 'Santesi',
  'Santin', 'Santolo', 'Santani', 'Santuti', 'Rizzi', 'Rizzini', 'Rizzetti', 'Rizzelli',
  'Rizzello', 'Rizzone', 'Rizzoni', 'Rizzuzzo', 'Rizzucci', 'Rizzacci', 'Rizzesi', 'Rizzin',
  'Rizzolo', 'Rizzani', 'Rizzuti', 'Contini', 'Contetti', 'Contelli', 'Contello', 'Contone',
  'Contoni', 'Contuzzo', 'Contucci', 'Contacci', 'Contesi', 'Contin', 'Contolo', 'Contani',
  'Contuti', 'Amati', 'Amatini', 'Amatetti', 'Amatelli', 'Amatello', 'Amatone', 'Amatoni',
  'Amatuzzo', 'Amatucci', 'Amatacci', 'Amatesi', 'Amatin', 'Amatolo', 'Amatani', 'Amatuti',
  'Pelli', 'Pellini', 'Pelletti', 'Pellelli', 'Pellello', 'Pellone', 'Pelloni', 'Pelluzzo',
  'Pellucci', 'Pellacci', 'Pellesi', 'Pellin', 'Pellolo', 'Pellani', 'Pelluti', 'Fiori',
  'Fioretti', 'Fiorelli', 'Fiorello', 'Fiorone', 'Fioroni', 'Fioruzzo', 'Fiorucci', 'Fioracci',
  'Fioresi', 'Fiorin', 'Fiorolo', 'Fiorani', 'Fioruti', 'Costi', 'Costini', 'Costetti',
  'Costelli', 'Costello', 'Costone', 'Costoni', 'Costuzzo', 'Costucci', 'Costacci', 'Costesi',
  'Costin', 'Costolo', 'Costani', 'Costuti', 'Cavalletti', 'Cavallelli', 'Cavallello', 'Cavallone',
  'Cavalloni', 'Cavalluzzo', 'Cavallucci', 'Cavallacci', 'Cavallesi', 'Cavallin', 'Cavallolo', 'Cavallani',
  'Cavalluti', 'Nardini', 'Nardetti', 'Nardelli', 'Nardello', 'Nardone', 'Nardoni', 'Narduzzo',
  'Narducci', 'Nardacci', 'Nardesi', 'Nardin', 'Nardolo', 'Nardani', 'Narduti', 'Viteli',
  'Vitelini', 'Viteletti', 'Vitelelli', 'Vitelello', 'Vitelone', 'Viteloni', 'Viteluzzo', 'Vitelucci',
  'Vitelacci', 'Vitelesi', 'Vitelin', 'Vitelolo', 'Vitelani', 'Viteluti', 'Longi', 'Longini',
  'Longetti', 'Longelli', 'Longello', 'Longone', 'Longoni', 'Longuzzo', 'Longucci', 'Longacci',
  'Longesi', 'Longin', 'Longolo', 'Longani', 'Longuti', 'Rivi', 'Rivini', 'Rivetti',
  'Rivelli', 'Rivello', 'Rivone', 'Rivoni', 'Rivuzzo', 'Rivucci', 'Rivacci', 'Rivesi',
  'Rivin', 'Rivolo', 'Rivani', 'Rivuti', 'Sabbi', 'Sabbini', 'Sabbetti', 'Sabbelli',
  'Sabbello', 'Sabbone', 'Sabboni', 'Sabbuzzo', 'Sabbucci', 'Sabbacci', 'Sabbesi', 'Sabbin',
  'Sabbolo', 'Sabbani', 'Sabbuti', 'Casti', 'Castini', 'Castetti', 'Castelli', 'Castello',
  'Castone', 'Castoni', 'Castuzzo', 'Castucci', 'Castacci', 'Castesi', 'Castin', 'Castolo',
  'Castani', 'Castuti', 'Saraci', 'Saracini', 'Saracetti', 'Saracelli', 'Saracello', 'Saracone',
  'Saraconi', 'Saracuzzo', 'Saracucci', 'Saracacci', 'Saracesi', 'Saracin', 'Saracolo', 'Saracani',
  'Saracuti', 'Guidini', 'Guidetti', 'Guidelli', 'Guidello', 'Guidone', 'Guidoni', 'Guiduzzo',
  'Guiducci', 'Guidacci', 'Guidesi', 'Guidin', 'Guidolo', 'Guidani', 'Guiduti', 'Palmi',
  'Palmini', 'Palmetti', 'Palmelli', 'Palmello', 'Palmone', 'Palmoni', 'Palmuzzo', 'Palmucci',
  'Palmacci', 'Palmesi', 'Palmin', 'Palmolo', 'Palmani', 'Palmuti', 'Corti', 'Cortini',
  'Cortetti', 'Cortelli', 'Cortello', 'Cortone', 'Cortoni', 'Cortuzzo', 'Cortucci', 'Cortacci',
  'Cortesi', 'Cortin', 'Cortolo', 'Cortani', 'Cortuti', 'Serri', 'Serrini', 'Serretti',
  'Serrelli', 'Serrello', 'Serrone', 'Serroni', 'Serruzzo', 'Serrucci', 'Serracci', 'Serresi',
  'Serrin', 'Serrolo', 'Serrani', 'Serruti', 'Fonti', 'Fontini', 'Fontetti', 'Fontelli',
  'Fontello', 'Fontone', 'Fontoni', 'Fontuzzo', 'Fontucci', 'Fontacci', 'Fontesi', 'Fontin',
  'Fontolo', 'Fontani', 'Fontuti', 'Barbi', 'Barbini', 'Barbetti', 'Barbelli', 'Barbello',
  'Barbone', 'Barboni', 'Barbuzzo', 'Barbucci', 'Barbacci', 'Barbesi', 'Barbin', 'Barbolo',
  'Barbani', 'Barbuti', 'Franci', 'Francini', 'Francetti', 'Francelli', 'Francello', 'Francone',
  'Franconi', 'Francuzzo', 'Francucci', 'Francacci', 'Francesi', 'Francin', 'Francolo', 'Francani',
  'Francuti', 'Albi', 'Albetti', 'Albelli', 'Albello', 'Albone', 'Alboni', 'Albuzzo',
  'Albucci', 'Albacci', 'Albesi', 'Albin', 'Albolo', 'Albani', 'Albuti', 'Belli',
  'Belletti', 'Bellelli', 'Bellello', 'Bellone', 'Belloni', 'Belluzzo', 'Bellucci', 'Bellacci',
  'Bellesi', 'Bellin', 'Bellolo', 'Bellani', 'Belluti', 'Merli', 'Merlini', 'Merletti',
  'Merlelli', 'Merlello', 'Merlone', 'Merloni', 'Merluzzo', 'Merlucci', 'Merlacci', 'Merlesi',
  'Merlin', 'Merlolo', 'Merlani', 'Merluti', 'Negi', 'Negini', 'Negetti', 'Negelli',
  'Negello', 'Negone', 'Negoni', 'Neguzzo', 'Negucci', 'Negacci', 'Negesi', 'Negin',
  'Negolo', 'Negani', 'Neguti', 'Polini', 'Poletti', 'Polelli', 'Polello', 'Polone',
  'Poloni', 'Poluzzo', 'Polucci', 'Polacci', 'Polesi', 'Polin', 'Pololo', 'Polani',
  'Poluti', 'Rondi', 'Rondini', 'Rondetti', 'Rondelli', 'Rondello', 'Rondone', 'Rondoni',
  'Ronduzzo', 'Ronducci', 'Rondacci', 'Rondesi', 'Rondin', 'Rondolo', 'Rondani', 'Ronduti',
  'Sacci', 'Saccini', 'Saccetti', 'Saccelli', 'Saccello', 'Saccone', 'Sacconi', 'Saccuzzo',
  'Saccucci', 'Saccacci', 'Saccesi', 'Saccin', 'Saccolo', 'Saccani', 'Saccuti', 'Tassini',
  'Tassetti', 'Tasselli', 'Tassello', 'Tassone', 'Tassoni', 'Tassuzzo', 'Tassucci', 'Tassacci',
  'Tassesi', 'Tassin', 'Tassolo', 'Tassani', 'Tassuti', 'Vari', 'Varini', 'Varetti',
  'Varelli', 'Varello', 'Varone', 'Varoni', 'Varuzzo', 'Varucci', 'Varacci', 'Varesi',
  'Varin', 'Varolo', 'Varani', 'Varuti', 'Zambi', 'Zambini', 'Zambetti', 'Zambello',
  'Zambone', 'Zamboni', 'Zambuzzo', 'Zambucci', 'Zambacci', 'Zambesi', 'Zambin', 'Zambolo',
  'Zambani', 'Zambuti', 'Bresi', 'Bresini', 'Bresetti', 'Breselli', 'Bresello', 'Bresone',
  'Bresoni', 'Bresuzzo', 'Bresucci', 'Bresacci', 'Bresesi', 'Bresin', 'Bresolo', 'Bresani',
  'Bresuti', 'Caldi', 'Caldini', 'Caldetti', 'Caldelli', 'Caldello', 'Caldone', 'Caldoni',
  'Calduzzo', 'Calducci', 'Caldacci', 'Caldesi', 'Caldin', 'Caldolo', 'Caldani', 'Calduti',
  'Dessi', 'Dessini', 'Dessetti', 'Desselli', 'Dessello', 'Dessone', 'Dessoni', 'Dessuzzo',
  'Dessucci', 'Dessacci', 'Dessesi', 'Dessin', 'Dessolo', 'Dessani', 'Dessuti', 'Estei',
  'Esteini', 'Esteetti', 'Esteelli', 'Esteello', 'Esteone', 'Esteoni', 'Esteuzzo', 'Esteucci',
  'Esteacci', 'Esteesi', 'Estein', 'Esteolo', 'Esteani', 'Esteuti', 'Fabbi', 'Fabbini',
  'Fabbetti', 'Fabbelli', 'Fabbello', 'Fabbone', 'Fabboni', 'Fabbuzzo', 'Fabbucci', 'Fabbacci',
  'Fabbesi', 'Fabbin', 'Fabbolo', 'Fabbani', 'Fabbuti', 'Gaspi', 'Gaspini', 'Gaspetti',
  'Gaspelli', 'Gaspello', 'Gaspone', 'Gasponi', 'Gaspuzzo', 'Gaspucci', 'Gaspacci', 'Gaspesi',
  'Gaspin', 'Gaspolo', 'Gaspani', 'Gasputi', 'Ianni', 'Iannini', 'Iannetti', 'Iannelli',
  'Iannello', 'Iannone', 'Iannoni', 'Iannuzzo', 'Iannacci', 'Iannesi', 'Iannin', 'Iannolo',
  'Iannani', 'Iannuti', 'Lotti', 'Lottini', 'Lottetti', 'Lottelli', 'Lottello', 'Lottone',
  'Lottoni', 'Lottuzzo', 'Lottucci', 'Lottacci', 'Lottesi', 'Lottin', 'Lottolo', 'Lottani',
  'Lottuti', 'Menni', 'Mennini', 'Mennetti', 'Mennelli', 'Mennello', 'Mennone', 'Mennoni',
  'Mennuzzo', 'Mennucci', 'Mennacci', 'Mennesi', 'Mennin', 'Mennolo', 'Mennani', 'Mennuti',
  'Notti', 'Nottini', 'Nottetti', 'Nottelli', 'Nottello', 'Nottone', 'Nottoni', 'Nottuzzo',
  'Nottucci', 'Nottacci', 'Nottesi', 'Nottin', 'Nottolo', 'Nottani', 'Nottuti', 'Orsii',
  'Orsiini', 'Orsietti', 'Orsielli', 'Orsiello', 'Orsione', 'Orsioni', 'Orsiuzzo', 'Orsiucci',
  'Orsiacci', 'Orsiesi', 'Orsiin', 'Orsiolo', 'Orsiani', 'Orsiuti', 'Pasti', 'Pastini',
  'Pastetti', 'Pastelli', 'Pastello', 'Pastone', 'Pastoni', 'Pastuzzo', 'Pastucci', 'Pastacci',
  'Pastesi', 'Pastin', 'Pastolo', 'Pastani', 'Pastuti', 'Quesi', 'Quesini', 'Quesetti',
  'Queselli', 'Quesello', 'Quesone', 'Quesoni', 'Quesuzzo', 'Quesucci', 'Quesacci', 'Quesesi',
  'Quesin', 'Quesolo', 'Quesani', 'Quesuti', 'Rotai', 'Rotaini', 'Rotaetti', 'Rotaelli',
  'Rotaello', 'Rotaone', 'Rotaoni', 'Rotauzzo', 'Rotaucci', 'Rotaacci', 'Rotaesi', 'Rotain',
  'Rotaolo', 'Rotaani', 'Rotauti', 'Salvini', 'Salvetti', 'Salvelli', 'Salvello', 'Salvone',
  'Salvoni', 'Salvuzzo', 'Salvucci', 'Salvacci', 'Salvesi', 'Salvin', 'Salvolo', 'Salvani',
  'Salvuti', 'Torni', 'Tornini', 'Tornetti', 'Tornelli', 'Tornello', 'Tornone', 'Tornoni',
  'Tornuzzo', 'Tornucci', 'Tornacci', 'Tornesi', 'Tornin', 'Tornolo', 'Tornani', 'Tornuti',
  'Ubali', 'Ubalini', 'Ubaletti', 'Ubalelli', 'Ubalello', 'Ubalone', 'Ubaloni', 'Ubaluzzo',
  'Ubalucci', 'Ubalacci', 'Ubalesi', 'Ubalin', 'Ubalolo', 'Ubalani', 'Ubaluti', 'Vergi',
  'Vergini', 'Vergetti', 'Vergelli', 'Vergello', 'Vergone', 'Vergoni', 'Verguzzo', 'Vergucci',
  'Vergacci', 'Vergesi', 'Vergin', 'Vergolo', 'Verguti', 'Candi', 'Candini', 'Candetti',
  'Candelli', 'Candello', 'Candone', 'Candoni', 'Canduzzo', 'Canducci', 'Candacci', 'Candesi',
  'Candin', 'Candolo', 'Candani', 'Canduti', 'Cavouri', 'Cavourini', 'Cavouretti', 'Cavourelli',
  'Cavourello', 'Cavourone', 'Cavouroni', 'Cavouruzzo', 'Cavourucci', 'Cavouracci', 'Cavouresi', 'Cavourin',
  'Cavourolo', 'Cavourani', 'Cavouruti', 'Corbi', 'Corbini', 'Corbetti', 'Corbelli', 'Corbello',
  'Corbone', 'Corboni', 'Corbuzzo', 'Corbucci', 'Corbacci', 'Corbesi', 'Corbin', 'Corbolo',
  'Corbani', 'Corbuti', 'Daldi', 'Daldini', 'Daldetti', 'Daldelli', 'Daldello', 'Daldone',
  'Daldoni', 'Dalduzzo', 'Dalducci', 'Daldacci', 'Daldesi', 'Daldin', 'Daldolo', 'Daldani',
  'Dalduti', 'Falci', 'Falcini', 'Falcetti', 'Falcelli', 'Falcello', 'Falcone', 'Falconi',
  'Falcuzzo', 'Falcucci', 'Falcacci', 'Falcesi', 'Falcin', 'Falcolo', 'Falcani', 'Falcuti',
  'Feni', 'Fenini', 'Fenetti', 'Fenelli', 'Fenello', 'Fenone', 'Fenoni', 'Fenuzzo',
  'Fenucci', 'Fenacci', 'Fenesi', 'Fenin', 'Fenolo', 'Fenani', 'Fenuti', 'Galdi',
  'Galdini', 'Galdetti', 'Galdelli', 'Galdello', 'Galdone', 'Galdoni', 'Galduzzo', 'Galducci',
  'Galdacci', 'Galdesi', 'Galdin', 'Galdolo', 'Galdani', 'Galduti', 'Ianci', 'Iancini',
  'Iancetti', 'Iancelli', 'Iancello', 'Iancone', 'Ianconi', 'Iancuzzo', 'Iancucci', 'Iancacci',
  'Iancesi', 'Iancin', 'Iancolo', 'Iancani', 'Iancuti', 'Lambi', 'Lambini', 'Lambetti',
  'Lambelli', 'Lambello', 'Lambone', 'Lamboni', 'Lambuzzo', 'Lambucci', 'Lambacci', 'Lambesi',
  'Lambin', 'Lambolo', 'Lambani', 'Lambuti', 'Mandi', 'Mandini', 'Mandetti', 'Mandelli',
  'Mandello', 'Mandone', 'Mandoni', 'Manduzzo', 'Manducci', 'Mandacci', 'Mandesi', 'Mandin',
  'Mandolo', 'Mandani', 'Manduti', 'Nassi', 'Nassini', 'Nassetti', 'Nasselli', 'Nassello',
  'Nassone', 'Nassoni', 'Nassuzzo', 'Nassucci', 'Nassacci', 'Nassesi', 'Nassin', 'Nassolo',
  'Nassani', 'Nassuti', 'Ognibi', 'Ognibini', 'Ognibetti', 'Ognibelli', 'Ognibello', 'Ognibone',
  'Ogniboni', 'Ognibuzzo', 'Ognibucci', 'Ognibacci', 'Ognibesi', 'Ognibin', 'Ognibolo', 'Ognibani',
  'Ognibuti', 'Paladi', 'Paladini', 'Paladetti', 'Paladelli', 'Paladello', 'Paladone', 'Paladoni',
  'Paladuzzo', 'Paladucci', 'Paladacci', 'Paladesi', 'Paladin', 'Paladolo', 'Paladani', 'Paladuti',
  'Quarti', 'Quartini', 'Quartetti', 'Quartelli', 'Quartello', 'Quartone', 'Quartoni', 'Quartuzzo',
  'Quartucci', 'Quartacci', 'Quartesi', 'Quartin', 'Quartolo', 'Quartani', 'Quartuti', 'Riccini',
  'Riccetti', 'Riccelli', 'Riccello', 'Riccone', 'Ricconi', 'Riccuzzo', 'Riccucci', 'Riccacci',
  'Riccesi', 'Riccin', 'Riccolo', 'Riccani', 'Riccuti', 'Sciari', 'Sciarini', 'Sciaretti',
  'Sciarelli', 'Sciarello', 'Sciarone', 'Sciaroni', 'Sciaruzzo', 'Sciarucci', 'Sciaracci', 'Sciaresi',
  'Sciarin', 'Sciarolo', 'Sciarani', 'Sciaruti', 'Tebaldi', 'Tebaldini'
];

// --- NOMI STRANIERI (giocatori non italiani) ---
// Pool di nomi raggruppati per famiglia linguistica (non per singola nazione:
// più nazioni condividono lo stesso pool, es. Argentina/Spagna → LATIN).
const LATIN_FIRST_NAMES = [
  'Javier', 'Diego', 'Carlos', 'Sergio', 'Alejandro', 'Miguel', 'Rodrigo', 'Fernando',
  'Gonzalo', 'Pablo', 'Andrés', 'Iván', 'Emiliano', 'Nicolás', 'Matías', 'Joaquín',
  'Cristian', 'Rafael', 'Alexis', 'Gabriel', 'Santiago', 'Federico', 'Martín', 'Agustín',
  'Franco', 'Bruno', 'Leonel', 'Ezequiel', 'Maximiliano', 'Facundo'
];
const LATIN_LAST_NAMES = [
  'García', 'Martínez', 'Rodríguez', 'López', 'González', 'Fernández', 'Pérez', 'Sánchez',
  'Ramírez', 'Torres', 'Flores', 'Díaz', 'Vargas', 'Castro', 'Ortiz', 'Gutiérrez',
  'Chávez', 'Romero', 'Suárez', 'Molina', 'Silva', 'Herrera', 'Medina', 'Aguirre',
  'Reyes', 'Morales', 'Domínguez', 'Vega', 'Campos', 'Cordero', 'Salazar', 'Guerrero',
  'Cabrera', 'Rojas', 'Navarro', 'Ibáñez'
];
const FRENCH_FIRST_NAMES = [
  'Antoine', 'Julien', 'Nicolas', 'Mathieu', 'Thomas', 'Kevin', 'Yannick', 'Théo',
  'Hugo', 'Lucas', 'Maxime', 'Romain', 'Jérôme', 'Fabien', 'Grégory', 'Cédric',
  'Loïc', 'Baptiste', 'Florian', 'Damien', 'Quentin', 'Rémi', 'Sébastien', 'Vincent',
  'Adrien', 'Enzo', 'Rayan', 'Moussa', 'Ibrahim', 'Bakary'
];
const FRENCH_LAST_NAMES = [
  'Dubois', 'Lefebvre', 'Moreau', 'Girard', 'Bonnet', 'Dupont', 'Lambert', 'Fontaine',
  'Rousseau', 'Blanchard', 'Faure', 'André', 'Mercier', 'Blanc', 'Guerin', 'Boyer',
  'Garnier', 'Chevalier', 'Francois', 'Legrand', 'Gauthier', 'Perrin', 'Morel', 'Fournier',
  'Robin', 'Clement', 'Roy', 'Leroy', 'Simon', 'Michel', 'Bernard', 'Petit',
  'Durand', 'Leroux'
];
const ENGLISH_FIRST_NAMES = [
  'James', 'Jack', 'Harry', 'George', 'Callum', 'Ryan', 'Connor', 'Aaron',
  'Liam', 'Dylan', 'Ethan', 'Jordan', 'Lewis', 'Kyle', 'Owen', 'Ben',
  'Sam', 'Josh', 'Daniel', 'Charlie', 'Tom', 'Will', 'Alfie', 'Finley',
  'Reece', 'Declan', 'Cameron', 'Mason', 'Jamie', 'Craig'
];
const ENGLISH_LAST_NAMES = [
  'Smith', 'Jones', 'Taylor', 'Brown', 'Wilson', 'Evans', 'Thomas', 'Walker',
  'White', 'Robinson', 'Wright', 'Thompson', 'Green', 'Hall', 'Wood', 'Harris',
  'Clarke', 'Jackson', 'Turner', 'Parker', 'Cooper', 'Hughes', 'Morgan', 'King',
  'Baker', 'Bailey', 'Bell', 'Murphy', 'Kelly', 'Ross', 'Campbell', 'Stewart',
  'Reid', 'Fraser', 'O\'Brien', 'O\'Connor'
];
const GERMAN_FIRST_NAMES = [
  'Lukas', 'Maximilian', 'Jonas', 'Felix', 'Tobias', 'Niklas', 'Julian', 'Sebastian',
  'Fabian', 'Florian', 'Simon', 'Daniel', 'Christian', 'Stefan', 'Michael', 'Andreas',
  'Thomas', 'Markus', 'Matthias', 'Jan', 'Leon', 'Finn', 'Moritz', 'Paul',
  'Kevin', 'Marcel', 'Dennis', 'Timo', 'Benedikt', 'Philipp'
];
const GERMAN_LAST_NAMES = [
  'Müller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer', 'Wagner', 'Becker',
  'Hoffmann', 'Schulz', 'Koch', 'Richter', 'Bauer', 'Klein', 'Wolf', 'Neumann',
  'Schwarz', 'Zimmermann', 'Braun', 'Krüger', 'Hofmann', 'Lange', 'Schmitt', 'Werner',
  'Krause', 'Lehmann', 'Huber', 'Mayer', 'Herrmann', 'Walter'
];
const PORTUGUESE_FIRST_NAMES = [
  'João', 'Pedro', 'Miguel', 'Tiago', 'Rui', 'Bruno', 'André', 'Ricardo',
  'Nuno', 'Bernardo', 'Gonçalo', 'Diogo', 'Vitor', 'Hugo', 'Rafael', 'Gabriel',
  'Lucas', 'Matheus', 'Felipe', 'Thiago', 'Rodrigo', 'Fábio', 'Renato', 'Wesley',
  'Douglas', 'Everton', 'Marcelo', 'Anderson', 'Wellington', 'Robson'
];
const PORTUGUESE_LAST_NAMES = [
  'Silva', 'Santos', 'Ferreira', 'Pereira', 'Oliveira', 'Costa', 'Rodrigues', 'Martins',
  'Sousa', 'Carvalho', 'Gomes', 'Fernandes', 'Ribeiro', 'Alves', 'Monteiro', 'Cardoso',
  'Teixeira', 'Correia', 'Mendes', 'Nunes', 'Machado', 'Araújo', 'Barbosa', 'Pinto',
  'Moreira', 'Vieira', 'Cavalcanti', 'Barros', 'Freitas', 'Nascimento'
];
const SLAVIC_FIRST_NAMES = [
  'Marko', 'Nikola', 'Stefan', 'Luka', 'Ivan', 'Petar', 'Dusan', 'Aleksandar',
  'Milos', 'Vladimir', 'Filip', 'Nemanja', 'Ognjen', 'Bojan', 'Vuk', 'Darko',
  'Igor', 'Goran', 'Zoran', 'Milan', 'Tomáš', 'Jakub', 'Adam', 'Ondrej',
  'Josip', 'Ante', 'Mateo', 'Marin', 'Domagoj', 'Kristijan'
];
const SLAVIC_LAST_NAMES = [
  'Jovanovic', 'Petrovic', 'Nikolic', 'Markovic', 'Dordevic', 'Stojanovic', 'Ilic', 'Stankovic',
  'Pavlovic', 'Milosevic', 'Kovačevic', 'Popovic', 'Kovac', 'Modric', 'Perisic', 'Mandzukic',
  'Novák', 'Svoboda', 'Dvorák', 'Cerny', 'Procházka', 'Krejcí', 'Horák', 'Král',
  'Benes', 'Fiala', 'Sedlák', 'Marek', 'Zeman', 'Bartos'
];
const DUTCH_FIRST_NAMES = [
  'Daan', 'Sem', 'Lars', 'Milan', 'Thijs', 'Bram', 'Sven', 'Ruben',
  'Wesley', 'Jorrit', 'Dennis', 'Rick', 'Kevin', 'Wout', 'Jasper', 'Stijn',
  'Niels', 'Bas', 'Erik', 'Robin', 'Tim', 'Joris', 'Koen', 'Tom',
  'Sander', 'Mees', 'Luuk', 'Cas', 'Job', 'Twan'
];
const DUTCH_LAST_NAMES = [
  'De Jong', 'Jansen', 'De Vries', 'Van den Berg', 'Van Dijk', 'Bakker', 'Janssen', 'Visser',
  'Smit', 'Meijer', 'De Boer', 'Mulder', 'De Groot', 'Bos', 'Vos', 'Peters',
  'Hendriks', 'Van Leeuwen', 'Dekker', 'Brouwer', 'De Wit', 'Dijkstra', 'Smits', 'De Graaf',
  'Van der Meer', 'Van der Linden', 'Kok', 'Jacobs', 'De Haan', 'Willems'
];
const SCANDINAVIAN_FIRST_NAMES = [
  'Erik', 'Anders', 'Johan', 'Lars', 'Magnus', 'Fredrik', 'Gustav', 'Oskar',
  'Emil', 'Viktor', 'Henrik', 'Mikael', 'Niklas', 'Jonas', 'Elias', 'Sebastian',
  'Filip', 'Axel', 'Oliver', 'Alexander', 'Mathias', 'Kasper', 'Rasmus', 'Christoffer',
  'Nikolaj', 'Sondre', 'Espen', 'Bjørn', 'Håkon', 'Ole'
];
const SCANDINAVIAN_LAST_NAMES = [
  'Andersson', 'Johansson', 'Karlsson', 'Nilsson', 'Eriksson', 'Larsson', 'Olsson', 'Persson',
  'Svensson', 'Gustafsson', 'Jensen', 'Nielsen', 'Hansen', 'Pedersen', 'Andersen', 'Christensen',
  'Larsen', 'Sørensen', 'Rasmussen', 'Jørgensen', 'Halvorsen', 'Johansen', 'Kristiansen', 'Olsen',
  'Berg', 'Haugen', 'Solberg', 'Dahl', 'Moen', 'Nygård'
];
// Soprannomi in stile calcio brasiliano: i giocatori del Brasile si chiamano
// sempre "Nome 'Soprannome' Cognome" (il soprannome sostituisce di fatto il
// nome per esteso, come nel calcio brasiliano reale — es. Ronaldinho, Kaká).
const BRAZILIAN_NICKNAMES = [
  'Formiga', 'Fominha', 'Canhoto', 'Ratinho', 'Cabeção', 'Foguinho', 'Passarinho', 'Tigrinho',
  'Pipoca', 'Sapo', 'Anjinho', 'Furacão', 'Coelho', 'Pistolinha', 'Bolinha', 'Cachorrão',
  'Zangado', 'Docinho', 'Fera', 'Gordinho', 'Mãozinha', 'Piu', 'Guerreiro', 'Trovão',
  'Relâmpago', 'Cebolinha', 'Fantasma', 'Bigode', 'Careca', 'Baixinho'
];

const NAME_POOLS = {
  ITALIAN: { first: ITALIAN_FIRST_NAMES, last: ITALIAN_LAST_NAMES },
  LATIN: { first: LATIN_FIRST_NAMES, last: LATIN_LAST_NAMES },
  FRENCH: { first: FRENCH_FIRST_NAMES, last: FRENCH_LAST_NAMES },
  ENGLISH: { first: ENGLISH_FIRST_NAMES, last: ENGLISH_LAST_NAMES },
  GERMAN: { first: GERMAN_FIRST_NAMES, last: GERMAN_LAST_NAMES },
  PORTUGUESE: { first: PORTUGUESE_FIRST_NAMES, last: PORTUGUESE_LAST_NAMES },
  SLAVIC: { first: SLAVIC_FIRST_NAMES, last: SLAVIC_LAST_NAMES },
  DUTCH: { first: DUTCH_FIRST_NAMES, last: DUTCH_LAST_NAMES },
  SCANDINAVIAN: { first: SCANDINAVIAN_FIRST_NAMES, last: SCANDINAVIAN_LAST_NAMES },
};

// Nazione → pool di nomi. Le nazioni plurilingue (Svizzera, Belgio, Canada)
// pescano a caso da uno dei pool associati, come richiesto esplicitamente
// ("attenzione alle nazioni doppie tipo svizzera o belgio").
const NATION_POOL_MAP = {
  IT: ['ITALIAN'],
  ES: ['LATIN'], AR: ['LATIN'], CL: ['LATIN'], UY: ['LATIN'], CO: ['LATIN'], MX: ['LATIN'],
  FR: ['FRENCH'], BE: ['FRENCH', 'DUTCH'], CH: ['FRENCH', 'GERMAN'], CA: ['FRENCH', 'ENGLISH'],
  EN: ['ENGLISH'], SCT: ['ENGLISH'], IE: ['ENGLISH'], US: ['ENGLISH'],
  DE: ['GERMAN'], AT: ['GERMAN'],
  BR: ['PORTUGUESE'], PT: ['PORTUGUESE'],
  RS: ['SLAVIC'], HR: ['SLAVIC'], CZ: ['SLAVIC'],
  NL: ['DUTCH'],
  SE: ['SCANDINAVIAN'], DK: ['SCANDINAVIAN'], NO: ['SCANDINAVIAN'],
};
const FOREIGN_NATION_CODES = Object.keys(NATION_POOL_MAP).filter(c => c !== 'IT');

// Un solo straniero per squadra, e solo in Serie A — nessuno in B/C
// (richiesta esplicita dell'utente, non una probabilità per lega).
function pickForeignNationality() {
  return FOREIGN_NATION_CODES[Math.floor(Math.random() * FOREIGN_NATION_CODES.length)];
}
// Genera nome/cognome coerenti con la nazionalità (con il caso speciale dei
// soprannomi brasiliani incorporato nel "nome" per riuso automatico di ogni
// punto del codice che stampa già `${firstName} ${lastName}`).
function generatePlayerName(nationality) {
  const pools = NATION_POOL_MAP[nationality] || ['ITALIAN'];
  const poolKey = pools[Math.floor(Math.random() * pools.length)];
  const pool = NAME_POOLS[poolKey];
  const firstName = pool.first[Math.floor(Math.random() * pool.first.length)];
  const lastName = pool.last[Math.floor(Math.random() * pool.last.length)];
  if (nationality === 'BR') {
    const nickname = BRAZILIAN_NICKNAMES[Math.floor(Math.random() * BRAZILIAN_NICKNAMES.length)];
    return { firstName: `${firstName} '${nickname}'`, lastName };
  }
  return { firstName, lastName };
}

// Squadre estere "di provenienza" mostrate nell'area scout (solo testo di
// colore, non oggetti-squadra reali: i club stranieri non giocano nel
// campionato italiano). Nomi di club reali, con il numero di squadre per
// nazione calibrato sulla grandezza calcistica (2-10, lista approvata
// dall'utente il 2026-07-10).
const FOREIGN_CLUBS = {
  BR: ['Flamengo', 'Corinthians', 'Palmeiras', 'São Paulo', 'Grêmio', 'Internacional', 'Santos', 'Cruzeiro', 'Atlético Mineiro', 'Vasco da Gama'],
  EN: ['Manchester United', 'Liverpool', 'Arsenal', 'Chelsea', 'Manchester City', 'Tottenham Hotspur', 'Leeds United', 'Everton', 'Newcastle United', 'Aston Villa'],
  ES: ['Real Madrid', 'Barcelona', 'Atlético Madrid', 'Sevilla', 'Valencia', 'Athletic Bilbao', 'Real Sociedad', 'Villarreal', 'Real Betis'],
  DE: ['Bayern Monaco', 'Borussia Dortmund', 'RB Lipsia', 'Bayer Leverkusen', 'Eintracht Francoforte', 'Borussia Mönchengladbach', 'VfB Stoccarda', 'Schalke 04', 'Werder Brema'],
  FR: ['Paris Saint-Germain', 'Olympique Marsiglia', 'Olympique Lione', 'AS Monaco', 'Lille', 'Rennes', 'Nizza', 'Lens', 'Saint-Étienne'],
  AR: ['Boca Juniors', 'River Plate', 'Racing Club', 'Independiente', 'San Lorenzo', 'Vélez Sarsfield', 'Newell\'s Old Boys', 'Estudiantes'],
  PT: ['Benfica', 'Porto', 'Sporting CP', 'Braga', 'Vitória Guimarães', 'Boavista'],
  NL: ['Ajax', 'PSV Eindhoven', 'Feyenoord', 'AZ Alkmaar', 'FC Utrecht', 'FC Twente'],
  MX: ['Club América', 'Chivas Guadalajara', 'Cruz Azul', 'Tigres UANL', 'Monterrey'],
  BE: ['Anderlecht', 'Club Brugge', 'Standard Liegi', 'Genk', 'Gent'],
  UY: ['Peñarol', 'Nacional', 'Danubio', 'Defensor Sporting'],
  CH: ['FC Basilea', 'Young Boys', 'FC Zurigo', 'Grasshopper'],
  AT: ['Rapid Vienna', 'Austria Vienna', 'Red Bull Salisburgo', 'Sturm Graz'],
  CZ: ['Sparta Praga', 'Slavia Praga', 'Viktoria Plzeň', 'Baník Ostrava'],
  US: ['LA Galaxy', 'Seattle Sounders', 'Atlanta United', 'New York City FC'],
  SCT: ['Celtic', 'Rangers', 'Aberdeen', 'Hearts'],
  HR: ['Dinamo Zagabria', 'Hajduk Spalato', 'Rijeka'],
  RS: ['Stella Rossa', 'Partizan Belgrado', 'Vojvodina'],
  CL: ['Colo-Colo', 'Universidad de Chile', 'Universidad Católica'],
  CO: ['Millonarios', 'Atlético Nacional', 'América de Cali'],
  SE: ['AIK', 'Malmö FF', 'Hammarby'],
  DK: ['FC Copenaghen', 'Brøndby', 'Midtjylland'],
  IE: ['Shamrock Rovers', 'Dundalk'],
  CA: ['Toronto FC', 'Vancouver Whitecaps'],
  NO: ['Rosenborg', 'Molde'],
};
function randomForeignClub(nationality) {
  const clubs = FOREIGN_CLUBS[nationality] || ['Club estero'];
  return clubs[Math.floor(Math.random() * clubs.length)];
}

// Al massimo 3 stranieri per squadra (bootstrap incluso), e solo in Serie A —
// le squadre di B/C non possono comprarne, ma una squadra retrocessa da A
// mantiene quelli che ha già (nessuna rimozione forzata da nessuna parte).
const FOREIGN_ROSTER_CAP = 3;
function countForeignPlayers(team) {
  return (team.roster || []).filter(p => p.nationality !== 'IT').length;
}
function canBuyForeignPlayer(team) {
  return team.leagueLevel === 'A' && countForeignPlayers(team) < FOREIGN_ROSTER_CAP;
}
// Un giocatore italiano può sempre unirsi a qualunque squadra (nessun vincolo
// di nazionalità); uno straniero solo se la squadra è idonea a comprarne
// ancora uno — usato da OGNI via d'ingresso in rosa (mercato, svincolati,
// pre-contratti, prestiti in entrata), non solo dall'area scout.
function canTeamAcquirePlayer(team, player) {
  return player.nationality === 'IT' || canBuyForeignPlayer(team);
}

// Sconto di "importazione": tra il 20% e il 40%, applicato solo al costo di
// trasferimento e allo stipendio del PRIMO contratto firmato con lo straniero
// scovato dall'area scout — al rinnovo o a un futuro trasferimento verso
// un'altra squadra italiana si torna al prezzo pieno "italiano equivalente"
// perché quelle operazioni richiamano semplicemente le funzioni standard
// (getTransferValue/getDisplaySalary) senza alcuno sconto persistente.
function randomImportDiscount() {
  return 0.20 + Math.random() * 0.20; // 20%-40%
}

// Genera UN giovane talento straniero "scovato" dall'area scout — SEMPRE un
// nuovo giocatore (non fa già parte di nessuna rosa), forza minima 75, età
// 19-32, proveniente da un club estero reale. Condiviso tra la UI dell'area
// scout del giocatore umano (20 candidati) e le squadre CPU di Serie A, che
// possono attingere allo stesso pool durante le loro passate di acquisto.
function generateForeignCandidate() {
  const nationality = pickForeignNationality();
  const { firstName, lastName } = generatePlayerName(nationality);
  const role = ROLES[Math.floor(Math.random() * ROLES.length)];
  const strength = 75 + Math.floor(Math.random() * 16); // 75-90
  const age = 19 + Math.floor(Math.random() * 14); // 19-32
  const roles = generatePlayerRoles(role);
  const discount = randomImportDiscount();
  const cost = Math.round(getTransferValue({ strength, age }) * (1 - discount) * 10) / 10;
  const salary = Math.max(1, Math.round(getDisplaySalary(strength) * (1 - discount)));
  return { firstName, lastName, role, roles, strength, age, nationality, fromClub: randomForeignClub(nationality), discount, cost, salary };
}
// 20 candidati per la sessione di mercato del giocatore umano.
function generateForeignScoutTargets() {
  return Array.from({ length: 20 }, generateForeignCandidate);
}
// Crea davvero il player da un candidato dell'area scout (nextPlayerId,
// contratto scontato, career con fee) — condivisa tra l'acquisto del
// giocatore umano e quello delle squadre CPU.
function materializeForeignCandidate(cand, team) {
  const contract = createContract(cand.strength, cand.age);
  contract.salary = cand.salary;
  return {
    id: nextPlayerId++, firstName: cand.firstName, lastName: cand.lastName, age: cand.age,
    role: cand.role, roles: cand.roles, strength: cand.strength,
    maxStrength: Math.min(100, cand.strength + 5 + Math.floor(Math.random() * 10)),
    career: [{ team: team.name, joined: seasonCount, left: null, fee: cand.cost }],
    contract, personality: createPersonality(), forma: FORMA_MAX, nationality: cand.nationality,
    fromClub: cand.fromClub, face: generatePlayerFace(cand.nationality),
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// SISTEMA A 9 RUOLI (Fase 2 — la generazione giocatori/rosa usa direttamente
// i 9 ruoli sotto, non più le 4 vecchie macro-categorie POR/DIF/CEN/ATT).
// ═══════════════════════════════════════════════════════════════════════════

// I 9 ruoli veri: ciascuno (tranne POR) ha 2 posizioni tattiche. Il vecchio
// sistema DIF/CEN/ATT+sottoruolo diventa qui 8 ruoli di movimento pieni.
const ROLES = ['POR', 'DIF', 'TER', 'MED', 'CEN', 'EST', 'TRQ', 'ALA', 'ATT'];

const ROLE_POSITIONS = {
  POR: [],
  DIF: ['CENTRALE', 'IMPOSTAZIONE'],
  TER: ['BASSO', 'SPINTA'],
  MED: ['INCONTRISTA', 'REGISTA_BASSO'],
  CEN: ['CENTRALE', 'MEZZALA'],
  EST: ['OFFENSIVO', 'DIFENSIVO'],
  TRQ: ['REGISTA_AVANZATO', 'RIFINITORE'],
  ALA: ['ESTERNA', 'ACCENTRATA'],
  ATT: ['CENTRAVANTI', 'SECONDA_PUNTA'],
};

const ROLE_POSITION_LABELS = {
  CENTRALE: 'Centrale', IMPOSTAZIONE: "D'impostazione",
  BASSO: 'Basso', SPINTA: 'Spinta',
  INCONTRISTA: 'Incontrista', REGISTA_BASSO: 'Regista basso',
  MEZZALA: 'Mezzala',
  OFFENSIVO: 'Offensivo', DIFENSIVO: 'Difensivo',
  REGISTA_AVANZATO: 'Regista avanzato', RIFINITORE: 'Rifinitore',
  ESTERNA: 'Esterna', ACCENTRATA: 'Accentrata',
  CENTRAVANTI: 'Centravanti', SECONDA_PUNTA: 'Seconda punta',
};

// Zona (vecchio ruolo aggregato) di ciascun ruolo — usata SOLO per riusare i
// colori/badge CSS .role-POR/.role-DIF/.role-CEN/.role-ATT già esistenti,
// senza dover introdurre 9 colori nuovi.
const ROLE_ZONE = {
  POR: 'POR',
  DIF: 'DIF', TER: 'DIF',
  MED: 'CEN', CEN: 'CEN', EST: 'CEN', TRQ: 'CEN',
  ALA: 'ATT', ATT: 'ATT',
};

// Le 10 coppie di doppio ruolo valide (adiacenza tattica) — un giocatore può
// avere come ruolo secondario SOLO uno di questi, mai un ruolo a caso.
function pairKey(r1, r2) { return [r1, r2].sort().join('|'); }
// Costruito via pairKey() (non stringhe scritte a mano) così l'ordine con cui
// si elenca ogni coppia qui sotto non conta mai: prima erano alcune scritte
// in ordine non alfabetico (es. 'TER|EST') e arePairedRoles, che normalizza
// SEMPRE alfabeticamente in lookup, non le trovava mai — TER/EST, EST/ALA,
// EST/CEN, MED/CEN, TRQ/ATT risultavano di fatto irraggiungibili come doppio ruolo.
const ROLE_PAIRS = new Set([
  ['DIF', 'TER'], ['TER', 'EST'], ['DIF', 'MED'], ['MED', 'CEN'], ['EST', 'CEN'],
  ['EST', 'ALA'], ['CEN', 'TRQ'], ['ALA', 'TRQ'], ['TRQ', 'ATT'], ['ALA', 'ATT'],
].map(([a, b]) => pairKey(a, b)));
function arePairedRoles(r1, r2) { return ROLE_PAIRS.has(pairKey(r1, r2)); }

// Genera 1 o 2 posizioni per un ruolo (stessa probabilità 70/30 specialista/
// versatile di assignSubRoles) — usata sia per il ruolo primario sia per
// l'eventuale secondario.
function generateRolePositions(role) {
  const options = ROLE_POSITIONS[role];
  if (!options || !options.length) return []; // POR: nessuna posizione
  if (Math.random() < 0.30) return [...options]; // versatile: entrambe
  return [options[Math.floor(Math.random() * options.length)]]; // specialista
}

// Genera l'intero player.roles (1-2 ruoli): ruolo primario obbligatorio +
// SUB_ROLE_SECONDARY_CHANCE di probabilità di un ruolo secondario valido
// (una delle ROLE_PAIRS che include il primario), scelto a caso tra quelli
// disponibili per quel ruolo. Placeholder "per ora casuale", nessuna logica
// di personalità/specializzazione ancora.
const SECONDARY_ROLE_CHANCE = 0.20;
function generatePlayerRoles(primaryRole) {
  const roles = [{ role: primaryRole, positions: generateRolePositions(primaryRole) }];
  if (primaryRole !== 'POR' && Math.random() < SECONDARY_ROLE_CHANCE) {
    const candidates = ROLES.filter(r => r !== primaryRole && arePairedRoles(primaryRole, r));
    if (candidates.length) {
      const secondaryRole = candidates[Math.floor(Math.random() * candidates.length)];
      roles.push({ role: secondaryRole, positions: generateRolePositions(secondaryRole) });
    }
  }
  return roles;
}

// Backfill: garantisce che un giocatore creato senza passare da
// generatePlayerRoles (es. dati sintetici di test) abbia comunque un
// player.roles valido, derivato dal vecchio player.role se presente.
function ensurePlayerRoles(player) {
  if (!player.roles) player.roles = generatePlayerRoles(player.role || 'CEN');
  return player.roles;
}

function getPrimaryRole(player) {
  return ensurePlayerRoles(player)[0].role;
}
// Ritorna sempre l'array [{role, positions}], 1 o 2 elementi.
function getPlayerRoles(player) {
  return ensurePlayerRoles(player);
}
function playerCanPlayRole(player, role) {
  return ensurePlayerRoles(player).some(r => r.role === role);
}
function playerPositionsFor(player, role) {
  const entry = ensurePlayerRoles(player).find(r => r.role === role);
  return entry ? entry.positions : [];
}

// Ordine di visualizzazione dei 9 ruoli (stesso ordine di ROLES: POR, poi
// dietro-avanti per zona) — usato ovunque una rosa va ordinata per ruolo.
const ROLE_ORDER = Object.fromEntries(ROLES.map((r, i) => [r, i]));

// Rose realistiche: anche il club più piccolo tiene almeno ~22 giocatori (mai
// scendere davvero a 18), quelle più ricche arrivano fino a una trentina —
// range più stretto e più alto rispetto a prima, per rendere naturali gli
// esuberi (vendite/prestiti verso squadre CPU) senza dover ricorrere a rose
// artificialmente striminzite. Distribuiti sui 9 ruoli invece delle 4
// vecchie macro-categorie.
const ROLE_MIN = { POR: 3, DIF: 3, TER: 3, MED: 2, CEN: 3, EST: 2, TRQ: 1, ALA: 2, ATT: 3 };
const ROLE_MAX = { POR: 4, DIF: 4, TER: 4, MED: 3, CEN: 4, EST: 3, TRQ: 2, ALA: 3, ATT: 3 };
const ROSTER_MIN_TOTAL = Object.values(ROLE_MIN).reduce((a, b) => a + b, 0); // 22
const ROSTER_MAX_TOTAL = Object.values(ROLE_MAX).reduce((a, b) => a + b, 0); // 30

// Un giocatore con doppio ruolo NON si identifica in un unico ruolo: va
// mostrato/cercato con entrambi ovunque nella UI (Database, Rosa). Un
// badge colorato a ruolo per ciascuno (riusa i colori di zona già esistenti
// .role-POR/DIF/CEN/ATT, estesi ai 9 ruoli in style.css).
function formatRoleBadges(player) {
  return getPlayerRoles(player).map(r => `<span class="role-chip role-${r.role}">${r.role}</span>`).join(' ');
}

// Etichetta leggibile delle posizioni di un giocatore, es. "Basso" o
// "Basso/Spinta", più l'eventuale posizione del ruolo secondario (es.
// "Basso + Offensivo") — ciascuna colorata secondo il ruolo di appartenenza,
// così si distingue a colpo d'occhio quale posizione è del ruolo primario e
// quale del secondario.
function formatSubRoles(player) {
  const roles = getPlayerRoles(player);
  const posLabel = (entry) => entry.positions.map(p => ROLE_POSITION_LABELS[p] || p).join('/');
  return roles
    .map(entry => {
      const label = posLabel(entry);
      return label ? `<span class="role-chip-text role-${entry.role}">${label}</span>` : '';
    })
    .filter(Boolean)
    .join(' + ');
}

// Nazionalità dei giocatori. La bandierina usa la vera immagine SVG della
// bandiera (assets/flags/{CODICE}.svg, scaricate una tantum da flagcdn.com —
// fonte pubblica con bandiere ISO 3166-1, comprese le bandiere separate di
// Inghilterra/Scozia "gb-eng"/"gb-sct" usate qui come EN/SCT) invece che
// un'emoji o un'approssimazione a strisce CSS: su Windows i font di sistema
// non renderizzano le emoji-bandiera come icona (mostrano solo il codice
// lettera "IT"), mentre un file SVG locale funziona identico ovunque e non
// richiede connessione a internet in partita (il gioco resta offline/file://).
const NATIONALITIES = {
  IT: { name: 'Italia' }, ES: { name: 'Spagna' }, AR: { name: 'Argentina' },
  CL: { name: 'Cile' }, UY: { name: 'Uruguay' }, CO: { name: 'Colombia' },
  MX: { name: 'Messico' }, FR: { name: 'Francia' }, BE: { name: 'Belgio' },
  CH: { name: 'Svizzera' }, CA: { name: 'Canada' }, EN: { name: 'Inghilterra' },
  SCT: { name: 'Scozia' }, IE: { name: 'Irlanda' }, US: { name: 'Stati Uniti' },
  DE: { name: 'Germania' }, AT: { name: 'Austria' }, BR: { name: 'Brasile' },
  PT: { name: 'Portogallo' }, RS: { name: 'Serbia' }, HR: { name: 'Croazia' },
  CZ: { name: 'Repubblica Ceca' }, NL: { name: 'Olanda' }, SE: { name: 'Svezia' },
  DK: { name: 'Danimarca' }, NO: { name: 'Norvegia' },
};
// Backfill per giocatori legacy (salvataggi precedenti a questa funzionalità)
function getNationality(player) {
  return player.nationality || 'IT';
}
function formatNationality(player) {
  const code = getNationality(player);
  const nat = NATIONALITIES[code] || NATIONALITIES.IT;
  return `<img class="nat-flag" src="assets/flags/${code}.svg" title="${nat.name}" alt="${nat.name}">`;
}

// Icone scudetto/Coppa Italia (assets/coppe/) al posto dell'emoji 🏆 generica
// — usate ovunque si segnali un titolo vinto (note di carriera staff, testata
// della Coppa Italia).
const TROPHY_FILES = { scudetto: 'scudetto.webp', coppa: 'coppaitalia.webp' };
function trophyIconHtml(type, label) {
  return `<img class="trophy-icon" src="assets/coppe/${TROPHY_FILES[type]}" title="${label}" alt="${label}">`;
}

const PROMO_RELEG_FILES = { promozione: 'promozione.webp', retrocessione: 'retrocessione.webp' };
function promoRelegIconHtml(type, label) {
  return `<img class="trophy-icon" src="assets/icone/${PROMO_RELEG_FILES[type]}" title="${label}" alt="${label}">`;
}

// ── Icone pixel/HUD al posto delle emoji Unicode ──────────────────────────
// Glifi vettoriali semplici (16x16, bordi netti, crispEdges) nello stesso
// linguaggio visivo del pallino campo (PITCH_DOT_SVG) — non pixel-art a
// grana fine, ma geometrie pulite ad alto contrasto coerenti con l'HUD
// arcade. currentColor dove il colore deve seguire il testo circostante;
// colore fisso dove il significato è legato a un colore preciso (oro =
// denaro/premio, ambra = attenzione, rosso = stop/vietato, verde = ok).
const ICONS = {
  money: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges"><circle cx="8" cy="8" r="6.5" fill="#ffc21e" stroke="#3d2600" stroke-width="1.5"/><path d="M8 4v8M10.2 5.6c-.5-.5-1.3-.8-2.2-.8-1.4 0-2.4.7-2.4 1.7 0 2.3 4.6 1 4.6 3.2 0 1-1 1.7-2.4 1.7-1 0-1.8-.3-2.3-.9" fill="none" stroke="#3d2600" stroke-width="1.3" stroke-linecap="round"/></svg>`,
  check: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges"><rect x="1" y="1" width="14" height="14" fill="#14b24a" stroke="#04220f" stroke-width="1.5"/><path d="M4 8.5l2.5 2.8L12 4.8" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="square" stroke-linejoin="miter"/></svg>`,
  cross: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges"><rect x="1" y="1" width="14" height="14" fill="#ec1f3a" stroke="#4a0009" stroke-width="1.5"/><path d="M4.5 4.5l7 7M11.5 4.5l-7 7" stroke="#fff" stroke-width="2" stroke-linecap="square"/></svg>`,
  warning: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges"><path d="M8 1.5 15 14.5H1z" fill="#f0a013" stroke="#3d2600" stroke-width="1.3" stroke-linejoin="miter"/><rect x="7.2" y="6" width="1.6" height="4.4" fill="#3d2600"/><rect x="7.2" y="11.4" width="1.6" height="1.6" fill="#3d2600"/></svg>`,
  clipboard: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="3" y="2.5" width="10" height="12" fill="#fff"/><rect x="6" y="1" width="4" height="2.5" fill="currentColor" stroke="none"/><path d="M5.3 6.5h5.4M5.3 9h5.4M5.3 11.5h3.4" stroke-linecap="square"/></svg>`,
  document: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M3.5 1.5h6l3 3v10h-9z" fill="#fff"/><path d="M9.5 1.5v3h3" stroke-linejoin="miter"/><path d="M5.3 7.5h5.4M5.3 10h5.4M5.3 12.5h3.4" stroke-linecap="square"/></svg>`,
  search: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="6.8" cy="6.8" r="4.3"/><path d="M10 10l4.5 4.5" stroke-linecap="square"/></svg>`,
  ball: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges"><circle cx="8" cy="8" r="6.5" fill="#fff" stroke="#14162a" stroke-width="1.3"/><path d="M8 4.6 10.6 6.5 9.6 9.6H6.4L5.4 6.5Z" fill="#14162a"/><path d="M8 4.6V2M10.6 6.5l2.4-1.5M9.6 9.6l1.4 2.3M6.4 9.6l-1.4 2.3M5.4 6.5L3 5" stroke="#14162a" stroke-width="1" stroke-linecap="square"/></svg>`,
  cycle: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M2.5 8a5.5 5.5 0 0 1 9.5-3.8M13.5 8a5.5 5.5 0 0 1-9.5 3.8" stroke-linecap="square"/><path d="M12 1.5v3h-3M4 14.5v-3h3" stroke-linecap="square" stroke-linejoin="miter"/></svg>`,
  briefcase: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="1.5" y="5" width="13" height="9" fill="#fff"/><path d="M5.5 5V3.2h5V5" stroke-linejoin="miter"/><path d="M1.5 9h13" stroke-linecap="square"/><rect x="7" y="8" width="2" height="2" fill="currentColor" stroke="none"/></svg>`,
  stats: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges"><rect x="2" y="9" width="3" height="6" fill="currentColor"/><rect x="6.5" y="5" width="3" height="10" fill="currentColor"/><rect x="11" y="1.5" width="3" height="13.5" fill="currentColor"/></svg>`,
  banned: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges"><circle cx="8" cy="8" r="6.5" fill="#ec1f3a" stroke="#4a0009" stroke-width="1.5"/><rect x="3" y="7.2" width="10" height="1.6" fill="#fff" transform="rotate(45 8 8)"/></svg>`,
  star: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges"><path d="M8 1l2.1 4.6 5 .6-3.7 3.5.9 5-4.3-2.5-4.3 2.5.9-5L1 6.2l5-.6z" fill="#ffc21e" stroke="#3d2600" stroke-width="1"/></svg>`,
  newspaper: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" fill="none" stroke="currentColor" stroke-width="1.3"><rect x="1.5" y="3" width="13" height="11" fill="#fff"/><path d="M3.3 5.5h9.4M3.3 3v11" stroke-linecap="square"/><rect x="9.5" y="7.3" width="3.2" height="3.2" fill="currentColor" stroke="none"/><path d="M5 7.5h3M5 9.3h3M5 11.1h7.7" stroke-linecap="square"/></svg>`,
};
// Wrapper dimensionabile via CSS (width/height sull'elemento .icon), colore
// ereditato dal testo per le varianti currentColor (clipboard/document/
// search/cycle/briefcase/stats). Uso: `${icon('money')} 24.0M`.
function icon(name, extraClass) {
  const svg = ICONS[name];
  if (!svg) return '';
  return `<span class="icon${extraClass ? ' ' + extraClass : ''}">${svg}</span>`;
}

// Forza massima acquistabile per lega: A=nessun limite, B<=80, C<=60
function leagueStrCap(leagueLevel) {
  return leagueLevel === 'C' ? 60 : leagueLevel === 'B' ? 80 : 100;
}
// Fascia di forza "credibile" per una lega (usata per proposte realistiche di
// vendita/prestito): un club non fa mai un'offerta per un giocatore troppo forte
// per il proprio tetto, né per uno troppo debole rispetto al livello della lega.
const LEAGUE_FIT_BAND = 40;
function fitsLeagueStrength(strength, leagueLevel) {
  const cap = leagueStrCap(leagueLevel);
  return strength <= cap && strength >= cap - LEAGUE_FIT_BAND;
}
function roleCount(roster, role) { return roster.filter(p => p.role === role).length; }
function canAddRole(team, role) { return roleCount(team.roster, role) < ROLE_MAX[role]; }
function neededRoles(team) { return Object.keys(ROLE_MIN).filter(r => roleCount(team.roster, r) < ROLE_MIN[r]); }

// Per il giocatore umano SOLO (la CPU continua a usare ROLE_MIN/ROLE_MAX
// via canAddRole/neededRoles, invariati): nessun vincolo per ruolo su
// vendite/prestiti in uscita/acquisti. Può vendere fino a restare senza
// rosa; può arrivare a un massimo di 30 giocatori DI PROPRIETÀ (netto dei
// prestiti in entrata, che non sono suoi: contano invece i prestiti in
// uscita, che restano suoi anche se altrove) — dato che fino a
// MAX_INCOMING_LOANS (8) giocatori in prestito possono aggiungersi sopra
// questo tetto, la lista fisicamente in rosa può arrivare al massimo a
// 30 + 8 = 38 giocatori. Non può chiudere una sessione di mercato (e
// quindi avanzare nel gioco) finché non ha almeno 16 giocatori —
// sostituisce il vecchio riempimento automatico (ensureMinRoster), che
// resta per la CPU ma non più per il giocatore.
const PLAYER_ROSTER_MAX = 30;
const PLAYER_ROSTER_MIN_TO_PROCEED = 16;
function getEffectiveRosterCount(team) {
  return team.roster.length - getIncomingLoanCount(team) + activeLoans.filter(l => l.homeTeam === team).length;
}
function canPlayerSignMore(team) {
  return getEffectiveRosterCount(team) < PLAYER_ROSTER_MAX;
}

// Distribuisce la rosa sui 9 ruoli (ROLE_MIN/ROLE_MAX) — totale sempre tra
// ROSTER_MIN_TOTAL (22) e ROSTER_MAX_TOTAL (30).
function randomRosterCounts() {
  const total = ROSTER_MIN_TOTAL + Math.floor(Math.random() * (ROSTER_MAX_TOTAL - ROSTER_MIN_TOTAL + 1));
  const extras = total - ROSTER_MIN_TOTAL;
  const caps = {};
  const added = {};
  ROLES.forEach(r => { caps[r] = ROLE_MAX[r] - ROLE_MIN[r]; added[r] = 0; });
  let left = extras;
  while (left > 0) {
    const avail = ROLES.filter(r => added[r] < caps[r]);
    if (!avail.length) break;
    const r = avail[Math.floor(Math.random() * avail.length)];
    added[r]++;
    left--;
  }
  const counts = {};
  ROLES.forEach(r => { counts[r] = ROLE_MIN[r] + added[r]; });
  return counts;
}

function generatePlayerStrength(teamStrength) {
  const variance = Math.floor(Math.random() * 21) - 10;
  return Math.max(1, Math.min(99, teamStrength + variance));
}

// Variazione di forza annua in base all'età — stessa curva usata sia per
// l'invecchiamento reale (ageProgressPlayer) sia per "riavvolgere" la
// carriera di un giocatore generato già adulto al bootstrap (vedi sotto),
// così le due strade producono la stessa distribuzione di forze.
function strengthDeltaForAge(age) {
  if (age < 23) return Math.floor(Math.random() * 4) + 2;       // 17-22: crescita rapida +2/+5
  if (age < 28) return Math.floor(Math.random() * 4);            // 23-27: crescita lenta 0/+3
  if (age <= 31) return Math.floor(Math.random() * 3) - 1;       // 28-31: picco, -1/+1
  return -(Math.floor(Math.random() * 3) + 1);                   // 32+: declino -1/-3
}

// Simula la crescita di un giocatore dalla forza di nascita (17 anni) fino
// all'età target, applicando anno per anno la stessa curva di ageProgressPlayer
// e rispettando il tetto di maxStrength — usata per generare al bootstrap
// giocatori già "a metà carriera" coerenti con chi nasce e cresce naturalmente
// con createYouthPlayer, invece di un giocatore già bell'e pronto.
function simulateStrengthAtAge(birthStrength, maxStrength, targetAge) {
  let strength = birthStrength;
  for (let age = 17; age < targetAge; age++) {
    strength = Math.max(1, Math.min(maxStrength, strength + strengthDeltaForAge(age)));
  }
  return strength;
}

// Range "nativo" di forza di nascita (17 anni) per lega.
const YOUTH_BIRTH_RANGE = { A: [55, 70], B: [40, 55], C: [30, 45] };
// Range di forza di nascita (17 anni) per lega — condiviso da createYouthPlayer
// e generateTeamRoster, così vivaio e bootstrap producono la stessa
// distribuzione. Un vivaio di categoria inferiore ha una piccola probabilità
// di sfornare un talento "fuori scala" con la fascia di nascita di una lega
// superiore (nessun malus applicato, la fascia vale esattamente come per un
// vivaio nato in quella lega): C 5% fascia A, 15% fascia B (80% C normale);
// B 20% fascia A (80% B normale); A resta sempre la propria fascia.
function getYouthBirthRange(leagueLevel) {
  if (leagueLevel === 'C') {
    const r = Math.random();
    if (r < 0.05) return YOUTH_BIRTH_RANGE.A;
    if (r < 0.20) return YOUTH_BIRTH_RANGE.B;
    return YOUTH_BIRTH_RANGE.C;
  }
  if (leagueLevel === 'B') {
    return Math.random() < 0.20 ? YOUTH_BIRTH_RANGE.A : YOUTH_BIRTH_RANGE.B;
  }
  return YOUTH_BIRTH_RANGE.A;
}
// Fascia di forza SQUADRA per lega, usata da assignLeagueStrengths al bootstrap
// — serve per collocare team.strength in un percentile 0-1 dentro la propria
// lega, e come base per il tetto di crescita (maxStrength) dei giocatori
// generati al bootstrap (generateTeamRoster). Il massimo dichiarato può
// superare 100 (es. A: 102): è voluto, dà margine al bonus "predestinato"
// (+5/+15) prima del clamp finale — il vero tetto per giocatore è
// LEAGUE_PLAYER_CEILING, sotto.
function getLeagueStrengthBracket(leagueLevel) {
  return leagueLevel === 'A' ? [86, 102] : leagueLevel === 'B' ? [69, 89] : [49, 69];
}
// Tetto assoluto di forza per un giocatore generato al bootstrap, per lega
// di partenza — un fuoriclasse di B o C può avvicinarsi al vertice della
// propria categoria (85/65), ma non arrivare al livello di un top player di
// A (100): quel margine resta riservato a chi nasce già in A.
const LEAGUE_PLAYER_CEILING = { A: 100, B: 85, C: 65 };

// ── Aspetto giocatore (Fase E) ──────────────────────────────────────────────
// Assegnato UNA VOLTA alla creazione del giocatore (roster di bootstrap,
// vivaio, scout stranieri) e mai più ricalcolato: persiste automaticamente
// nei salvataggi perché player.face è un campo qualunque dell'oggetto
// giocatore, serializzato per intero da serializeGame (vedi la registry
// `players` lì) — nessuna plumbing extra necessaria.
// I file reali sono in assets/faces/{skin,hair,beard}/, generati offline da
// foto/pettinature tracciate a mano (vedi Simulatore Calcio Italiano Design
// System/hair-alignment-tuner.html e beard-alignment-tuner.html per come
// sono state tarate posizione/scala di ogni stile).
const FACE_SKIN_COUNT = 7; // assets/faces/skin/00.png..06.png
const FACE_HAIR_COLOR_COUNT = 6; // suffisso _00.._05 sui file capelli/barba

// x/y/scaleX/scaleY tarati a mano con il tuner su uno stage di riferimento
// 372x372 (vedi playerPortraitHtml) — NON sono percentuali, sono px/percento
// relativi a quello stage fisso, per questo lo stage va sempre renderizzato
// a quella dimensione e poi scalato nel suo insieme, mai i singoli layer.
const FACE_HAIR_STYLES = [
  { file: 'hair_g02', x: -4, y: -97, scaleX: 63, scaleY: 55, opacity: 95 },
  { file: 'hair_g02', x: -4, y: -97, scaleX: 63, scaleY: 55, opacity: 95 },
  { file: 'hair_g02', x: -4, y: -97, scaleX: 63, scaleY: 55, opacity: 95 },
  { file: 'hair_g02', x: -4, y: -97, scaleX: 63, scaleY: 55, opacity: 95 },
  { file: 'hair_g03', x: -3, y: -97, scaleX: 64, scaleY: 54, opacity: 95 },
  { file: 'hair_g04', x: -3, y: -94, scaleX: 64, scaleY: 56, opacity: 95 },
  { file: 'hair_g05', x: -3, y: -96, scaleX: 65, scaleY: 48, opacity: 95 },
  { file: 'hair_g06', x: -3, y: -96, scaleX: 64, scaleY: 55, opacity: 95 },
  { file: 'hair_g07', x: -3, y: -97, scaleX: 65, scaleY: 55, opacity: 95 },
  { file: 'hair_g08', x: -3, y: -97, scaleX: 65, scaleY: 55, opacity: 95 },
  { file: 'hair_g11', x: -3, y: -48, scaleX: 76, scaleY: 82, opacity: 95 },
  { file: 'hair_g12', x: -3, y: -100, scaleX: 72, scaleY: 62, opacity: 95 },
  { file: 'hair_g13', x: -3, y: -100, scaleX: 67, scaleY: 53, opacity: 95 },
  // Riservata a pelle scura (bruna/scura/molto scura, indici 4-6) + capelli
  // neri: stile pensato per texture/volume tipici di quella combinazione, su
  // pelle chiara o con altri colori capello risulterebbe fuori posto.
  { file: 'hair_g14', x: -5, y: -93, scaleX: 75, scaleY: 56, opacity: 90, restrictSkinBand: 'dark', restrictHairColor: 3 },
  { file: 'hair_g15', x: -3, y: -88, scaleX: 65, scaleY: 55, opacity: 95 },
  { file: 'hair_g16', x: -3, y: -100, scaleX: 74, scaleY: 60, opacity: 95 },
];
// face.hairStyle === null → calvo (nessun layer).

const FACE_BEARD_STYLES = [
  { file: 'beard_g01', x: -3, y: 48, scaleX: 53, scaleY: 50, opacity: 100 },
  { file: 'beard_g02', x: -3, y: 60, scaleX: 52, scaleY: 49, opacity: 100 },
  { file: 'beard_g03', x: -3, y: 42, scaleX: 53, scaleY: 45, opacity: 100 },
  { file: 'beard_g04', x: -3, y: 50, scaleX: 53, scaleY: 50, opacity: 100 },
  { file: 'beard_g05', x: -3, y: 3, scaleX: 54, scaleY: 49, opacity: 100 },
  { file: 'beard_g06', x: -3, y: 6, scaleX: 36, scaleY: 30, opacity: 100 },
  { file: 'beard_g07', x: -3, y: -6, scaleX: 56, scaleY: 55, opacity: 50 },
  { file: 'beard_g08', x: -3, y: 3, scaleX: 38, scaleY: 34, opacity: 100 },
  { file: 'beard_g07', x: -3, y: -6, scaleX: 56, scaleY: 55, opacity: 35 },
  { file: 'beard_g07', x: -3, y: -6, scaleX: 56, scaleY: 55, opacity: 20 },
];
// face.beardStyle === null → sbarbato (nessun layer).

// Tonalità pelle raggruppate in 3 fasce (indici in assets/faces/skin/):
// chiara (0-2), olivastra (3), scura (4-6).
const SKIN_LIGHT = [0, 1, 2];
const SKIN_OLIVE = [3];
const SKIN_DARK = [4, 5, 6];

// Percentuali {chiara, olivastra, scura} per nazionalità, basate sulla
// rappresentanza storica reale nel calcio professionistico (non stereotipi
// casuali) — es. Francia storicamente alta quota di giocatori di origine
// nordafricana/subsahariana, Italia storicamente bassa, Scozia/Irlanda quasi
// nulla. Discusso e approvato con l'utente prima dell'implementazione.
const NATION_SKIN_WEIGHTS = {
  IT: [0.70, 0.25, 0.05],
  FR: [0.25, 0.20, 0.55],
  PT: [0.40, 0.25, 0.35],
  BR: [0.20, 0.35, 0.45],
  EN: [0.62, 0.08, 0.30],
  SCT: [0.86, 0.08, 0.06],
  IE: [0.86, 0.08, 0.06],
  BE: [0.55, 0.15, 0.30],
  NL: [0.70, 0.10, 0.20],
  DE: [0.80, 0.12, 0.08],
  AT: [0.80, 0.12, 0.08],
  ES: [0.50, 0.40, 0.10],
  AR: [0.60, 0.35, 0.05],
  UY: [0.60, 0.35, 0.05],
  CL: [0.60, 0.35, 0.05],
  CO: [0.25, 0.45, 0.30],
  MX: [0.25, 0.45, 0.30],
  RS: [0.85, 0.12, 0.03],
  HR: [0.85, 0.12, 0.03],
  CZ: [0.85, 0.12, 0.03],
  SE: [0.85, 0.07, 0.08],
  DK: [0.85, 0.07, 0.08],
  NO: [0.85, 0.07, 0.08],
  CH: [0.70, 0.15, 0.15],
  CA: [0.70, 0.10, 0.20],
  US: [0.65, 0.10, 0.25],
};
const DEFAULT_SKIN_WEIGHTS = [0.60, 0.25, 0.15]; // nazionalità non mappate

function skinBandOf(skinTone) {
  if (SKIN_LIGHT.includes(skinTone)) return 'light';
  if (SKIN_OLIVE.includes(skinTone)) return 'olive';
  return 'dark';
}

// Sceglie un indice pesato da una lista (pesi che sommano a 1).
function pickWeighted(indices, weights) {
  const r = Math.random();
  let acc = 0;
  for (let i = 0; i < indices.length; i++) {
    acc += weights[i];
    if (r < acc) return indices[i];
  }
  return indices[indices.length - 1];
}

function pickSkinTone(nationality) {
  const [pLight, pOlive] = NATION_SKIN_WEIGHTS[nationality] || DEFAULT_SKIN_WEIGHTS;
  const r = Math.random();
  if (r < pLight) return pickWeighted(SKIN_LIGHT, [0.35, 0.40, 0.25]); // pesata verso il centro
  if (r < pLight + pOlive) return SKIN_OLIVE[0];
  return pickWeighted(SKIN_DARK, [0.45, 0.35, 0.20]);
}

// Colore capelli/barba (0=biondo,1=castano chiaro,2=castano scuro,3=nero,
// 4=rosso,5=grigio) condizionato dalla fascia di pelle — pelle scura +
// biondo/rosso è pressoché impossibile (0.5%), come richiesto esplicitamente.
const HAIR_COLOR_WEIGHTS_BY_BAND = {
  light: [0.30, 0.25, 0.20, 0.15, 0.06, 0.04],
  olive: [0.04, 0.28, 0.34, 0.28, 0.02, 0.04],
  dark: [0.005, 0.04, 0.20, 0.72, 0.005, 0.03],
};
// Bonus regionale rosso (SOLO fascia chiara — il rosso naturale è un tratto
// legato alla pelle chiara): sostituisce il peso base ridistribuendo la
// differenza proporzionalmente sulle altre 5 tonalità.
const RED_HAIR_BONUS_NATIONS = { SCT: 0.18, IE: 0.18, NL: 0.11, BE: 0.11, SE: 0.10, DK: 0.10, NO: 0.10 };

function pickHairColor(skinTone, nationality) {
  const band = skinBandOf(skinTone);
  const weights = HAIR_COLOR_WEIGHTS_BY_BAND[band].slice();
  const redBonus = band === 'light' ? RED_HAIR_BONUS_NATIONS[nationality] : null;
  if (redBonus) {
    const diff = redBonus - weights[4];
    weights[4] = redBonus;
    const othersSum = weights.reduce((s, w, i) => i === 4 ? s : s + w, 0);
    for (let i = 0; i < weights.length; i++) {
      if (i !== 4) weights[i] -= diff * (weights[i] / othersSum);
    }
  }
  const r = Math.random();
  let acc = 0;
  for (let i = 0; i < weights.length; i++) {
    acc += weights[i];
    if (r < acc) return i;
  }
  return weights.length - 1;
}

// Alcune capigliature (vedi restrictSkinBand/restrictHairColor su
// FACE_HAIR_STYLES) sono valide solo per certe combinazioni fascia
// pelle/colore capelli — filtra il pool prima di estrarre a caso, invece di
// estrarre e poi scartare (evita bias a scapito delle altre capigliature).
function pickHairStyle(skinTone, hairColor) {
  if (Math.random() < 0.12) return null; // ~12% calvo
  const band = skinBandOf(skinTone);
  const eligible = [];
  FACE_HAIR_STYLES.forEach((style, i) => {
    if (style.restrictSkinBand && style.restrictSkinBand !== band) return;
    if (style.restrictHairColor !== undefined && style.restrictHairColor !== hairColor) return;
    eligible.push(i);
  });
  return eligible[Math.floor(Math.random() * eligible.length)];
}

function generatePlayerFace(nationality) {
  const skinTone = pickSkinTone(nationality);
  const hairColor = pickHairColor(skinTone, nationality);
  return {
    skinTone,
    hairColor,
    hairStyle: pickHairStyle(skinTone, hairColor),
    // ~55% sbarbato, il resto sulle 10 varianti barba/baffi
    beardStyle: Math.random() < 0.55 ? null : Math.floor(Math.random() * FACE_BEARD_STYLES.length),
  };
}

// Stage di riferimento fisso su cui sono tarati x/y/scaleX/scaleY (vedi
// commento sopra FACE_HAIR_STYLES) — la dimensione finale desiderata si
// ottiene scalando l'intero stage con transform:scale(), mai i layer
// singolarmente, altrimenti le posizioni tarate non tornano più valide.
const FACE_STAGE_PX = 372;

// Compone i 3 livelli (pelle/capelli/barba) di un giocatore in un badge
// quadrato di sizePx pixel. Ritorna stringa vuota se il giocatore non ha
// ancora un campo face (salvataggi precedenti a questa feature) — il
// chiamante deve gestire l'assenza del badge in quel caso.
// `team` (opzionale): se presente, la maglia/colletto vengono tinti coi
// colori sociali reali (team.colors[0]/[1] — vedi assets/faces/jersey/ e
// assets/faces/collar/, un file per squadra, pre-generati offline dalla
// stessa maglia in scala di grigi tracciata dall'utente). Senza team (es.
// svincolati) restano solo pelle/capelli/barba, senza maglia sovrapposta —
// la foto base ha comunque una maglia scura "di default" incorporata.
function playerPortraitHtml(player, sizePx, team) {
  const face = player.face;
  if (!face) return '';
  sizePx = sizePx || 108;
  const scale = sizePx / FACE_STAGE_PX;
  // "pixelated" ha senso solo quando si INGRANDISCE (mantiene i bordi netti);
  // rimpicciolendo (il caso normale: badge piccolo da uno stage 372px) può
  // lasciare una cucitura/trasparenza residua ai bordi dei layer in Chromium
  // — con lo stage rimpicciolito via transform:scale() è meglio lo
  // smoothing di default del browser.
  const renderingHint = scale >= 1 ? 'image-rendering:pixelated;' : '';
  const colorSuffix = String(face.hairColor).padStart(2, '0');
  const fullLayerStyle = `position:absolute;top:0;left:0;width:100%;height:100%;${renderingHint}`;
  const layerStyle = def => `position:absolute;top:0;left:0;width:100%;height:100%;transform-origin:center center;transform:translate(${def.x}px,${def.y}px) scale(${def.scaleX / 100},${def.scaleY / 100});opacity:${def.opacity / 100};${renderingHint}`;
  const hairDef = face.hairStyle !== null && face.hairStyle !== undefined ? FACE_HAIR_STYLES[face.hairStyle] : null;
  const beardDef = face.beardStyle !== null && face.beardStyle !== undefined ? FACE_BEARD_STYLES[face.beardStyle] : null;
  const hairHtml = hairDef ? `<img src="assets/faces/hair/${hairDef.file}_${colorSuffix}.png" style="${layerStyle(hairDef)}" alt="">` : '';
  const beardHtml = beardDef ? `<img src="assets/faces/beard/${beardDef.file}_${colorSuffix}.png" style="${layerStyle(beardDef)}" alt="">` : '';
  const teamSlug = team ? team.name.toLowerCase().replace(/\s+/g, '-') : null;
  const jerseyHtml = teamSlug ? `<img src="assets/faces/jersey/${teamSlug}.png" style="${fullLayerStyle}" alt="" onerror="this.remove()">` : '';
  const collarHtml = teamSlug ? `<img src="assets/faces/collar/${teamSlug}.png" style="${fullLayerStyle}" alt="" onerror="this.remove()">` : '';
  return `<div class="player-portrait-badge" style="width:${sizePx}px;height:${sizePx}px">
    <div class="player-portrait-stage" style="width:${FACE_STAGE_PX}px;height:${FACE_STAGE_PX}px;transform-origin:top left;transform:scale(${scale});position:relative">
      <img src="assets/faces/skin/${String(face.skinTone).padStart(2, '0')}.png" style="position:absolute;top:0;left:0;width:100%;height:100%;${renderingHint}" alt="">
      ${jerseyHtml}
      ${collarHtml}
      ${hairHtml}
      ${beardHtml}
    </div>
  </div>`;
}

function generateTeamRoster(team) {
  const roster = [];
  const counts = randomRosterCounts();
  const [birthMin, birthMax] = getYouthBirthRange(team.leagueLevel);
  const [bracketMin, bracketMax] = getLeagueStrengthBracket(team.leagueLevel);
  // Percentile della squadra dentro la propria lega (0=più debole, 1=più forte)
  // spostato in un piccolo bonus/malus sulla forza di nascita dei suoi giovani,
  // per mantenere un minimo di variazione competitiva fra club della stessa
  // lega senza gonfiare la forza di nascita come faceva la vecchia formula
  // (che usava team.strength, già una forza da giocatore adulto, come nascita).
  const percentile = bracketMax > bracketMin ? (team.strength - bracketMin) / (bracketMax - bracketMin) : 0.5;
  const shift = Math.round((percentile - 0.5) * 10); // -5..+5
  Object.entries(counts).forEach(([role, count]) => {
    for (let i = 0; i < count; i++) {
      const { firstName, lastName } = generatePlayerName('IT');
      const age = Math.floor(Math.random() * 20) + 17; // 17-36
      // Stessa curva di createYouthPlayer (forza di nascita a 17 anni + potenziale
      // elite/non-elite), poi "riavvolta" con la curva d'invecchiamento fino
      // all'età del giocatore — così il mondo nasce già nella distribuzione di
      // forze a regime, senza aspettare 20+ stagioni di ricambio naturale.
      // Pavimento a birthMin (non più 1 assoluto): lo shift di percentile
      // sotto può solo spostare verso l'alto entro la fascia, mai far
      // nascere un giocatore sotto il minimo dichiarato per la sua lega
      // (es. mai un 25-29 in una C il cui range di nascita parte da 30).
      const birthStrength = Math.max(birthMin, Math.min(99, birthMin + Math.floor(Math.random() * (birthMax - birthMin + 1)) + shift));
      const isElite = Math.random() < 0.06;
      const ceiling = LEAGUE_PLAYER_CEILING[team.leagueLevel] ?? 100;
      // Tetto di crescita ancorato alla fascia REALE della lega (bracketMin-
      // bracketMax), non più birthStrength + un margine libero: quel margine
      // (fino a +25, +30 per i predestinati) faceva sistematicamente sforare
      // il tetto dichiarato per lega — dato che la maggior parte dei
      // giocatori raggiunge il proprio tetto entro la metà carriera, la
      // forza media reale delle squadre finiva ben oltre la fascia
      // "ufficiale" (una C poteva tranquillamente superare 70). Ora un
      // giocatore normale (94%) matura DENTRO la fascia della sua lega, un
      // predestinato (6%) può superarne il tetto di un margine controllato
      // (+5/+15), ma senza mai superare il tetto ASSOLUTO della propria
      // categoria (LEAGUE_PLAYER_CEILING — un fuoriclasse di C non arriva
      // al livello di un top player di A).
      const maxStrength = isElite
        ? Math.min(ceiling, Math.max(birthStrength, bracketMax) + 5 + Math.floor(Math.random() * 11))
        : Math.min(ceiling, Math.max(birthStrength, Math.min(bracketMax, bracketMin + Math.floor(Math.random() * (bracketMax - bracketMin + 1)))));
      const strength = simulateStrengthAtAge(birthStrength, maxStrength, age);
      const career = [{ team: team.name, joined: 0, left: null, fee: null }];
      const contract = createContract(strength, age);
      const personality = createPersonality();
      const roles = generatePlayerRoles(role);
      roster.push({ id: nextPlayerId++, firstName, lastName, age, role, roles, strength, maxStrength, career, contract, personality, forma: FORMA_MAX, nationality: 'IT', face: generatePlayerFace('IT') });
    }
  });
  // Un solo straniero per squadra, solo in Serie A: sostituisce nome/nazionalità
  // di un giocatore a caso della rosa appena generata (stessi ruolo/forza/età).
  if (team.leagueLevel === 'A' && roster.length > 0) {
    const chosen = roster[Math.floor(Math.random() * roster.length)];
    const nationality = pickForeignNationality();
    const { firstName, lastName } = generatePlayerName(nationality);
    chosen.firstName = firstName;
    chosen.lastName = lastName;
    chosen.nationality = nationality;
    chosen.face = generatePlayerFace(nationality); // rigenerato: era stato assegnato su nazionalità 'IT'
  }
  team.roster = roster;
}

// Aggiorna la forza di un giocatore in base alla curva d'età e incrementa l'età
function ageProgressPlayer(player) {
  const delta = strengthDeltaForAge(player.age);
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
  // Prodotti del vivaio: sempre italiani (il tetto "1 straniero per squadra,
  // solo in A" riguarda solo la rosa generata al bootstrap, non i giovani
  // che nascono nel vivaio durante la carriera).
  const { firstName, lastName } = generatePlayerName('IT');
  const age = 17 + Math.floor(Math.random() * 2);
  // Forza di nascita per lega (indipendente dalla forza corrente della squadra).
  // Pavimento Serie C alzato (era 15-30): un 15 di forza di nascita, capitato
  // insieme a un potenziale di crescita basso, produceva professionisti bloccati
  // sotto i 40 per l'intera carriera — troppo estremo.
  const [birthMin, birthMax] = getYouthBirthRange(team.leagueLevel);
  const youthStr = birthMin + Math.floor(Math.random() * (birthMax - birthMin + 1));
  // maxStrength: NON cappato alla lega — il talento non ha confini, ma i range
  // sono stati ristretti (erano troppo generosi: il 90% "non predestinato"
  // poteva comunque arrivare fino a +53, producendo un 90+ molto più diffuso
  // del previsto — verificato via simulazione: ~32% della Serie A a forza 90+).
  const isElite = Math.random() < 0.06; // 6% predestinato (era 10%)
  const maxStrength = isElite
    ? Math.min(100, youthStr + 20 + Math.floor(Math.random() * 11)) // +20/+30, i veri fuoriclasse
    : Math.min(100, youthStr + 8 + Math.floor(Math.random() * 18)); // +8/+25 per gli altri
  const career = [{ team: team.name, joined: seasonCount, left: null, fee: null }];
  const contract = createContract(youthStr, age);
  const personality = createPersonality();
  const roles = generatePlayerRoles(role);
  return { id: nextPlayerId++, firstName, lastName, age, role, roles, strength: youthStr, maxStrength, career, contract, personality, forma: FORMA_MAX, nationality: 'IT', face: generatePlayerFace('IT') };
}

// --- SISTEMA FORMAZIONI ---

// 19 moduli a conteggio per ruolo (9 ruoli, vedi ROLES sopra) — non più le 4
// macro-categorie POR/DIF/CEN/ATT. Ogni cella specifica SOLO quanti giocatori
// di quel ruolo, mai la posizione esatta: quella resta sempre ottimizzata
// liberamente da getBest11 in base a chi è disponibile (nessun equivalente
// di FORMATION_SUBROLES — la vecchia tabella di sotto-posizioni per slot non
// serve più, dato che ora il RUOLO stesso è già granulare).
const FORMATIONS = {
  '4-4-2': { POR: 1, DIF: 2, TER: 2, CEN: 2, EST: 2, ATT: 2 },
  '4-3-3': { POR: 1, DIF: 2, TER: 2, CEN: 3, ALA: 2, ATT: 1 },
  '3-5-2': { POR: 1, DIF: 3, EST: 2, CEN: 3, ATT: 2 },
  '4-2-4': { POR: 1, DIF: 2, TER: 2, MED: 2, ALA: 2, ATT: 2 },
  '5-3-2': { POR: 1, DIF: 3, TER: 2, MED: 1, CEN: 2, ATT: 2 },
  '4-5-1': { POR: 1, DIF: 2, TER: 2, MED: 1, CEN: 2, EST: 2, ATT: 1 },
  '3-4-3': { POR: 1, DIF: 3, EST: 2, CEN: 2, ALA: 2, ATT: 1 },
  '3-1-4-2': { POR: 1, DIF: 3, MED: 1, CEN: 2, EST: 2, ATT: 2 },
  '3-4-1-2': { POR: 1, DIF: 3, EST: 2, CEN: 2, TRQ: 1, ATT: 2 },
  '3-4-2-1': { POR: 1, DIF: 3, EST: 2, CEN: 2, TRQ: 2, ATT: 1 },
  '4-1-2-1-2': { POR: 1, DIF: 2, TER: 2, MED: 1, CEN: 2, TRQ: 1, ATT: 2 },
  '4-2-2-2': { POR: 1, DIF: 2, TER: 2, MED: 2, TRQ: 2, ATT: 2 },
  '4-2-1-3': { POR: 1, DIF: 2, TER: 2, MED: 2, TRQ: 1, ALA: 2, ATT: 1 },
  '4-1-2-3': { POR: 1, DIF: 2, TER: 2, MED: 1, CEN: 2, ALA: 2, ATT: 1 },
  '4-3-2-1': { POR: 1, DIF: 2, TER: 2, CEN: 3, TRQ: 2, ATT: 1 },
  '5-1-2-2': { POR: 1, DIF: 3, TER: 2, MED: 1, CEN: 2, ATT: 2 },
  '5-2-2-1': { POR: 1, DIF: 3, TER: 2, MED: 2, TRQ: 2, ATT: 1 },
  '5-4-1': { POR: 1, DIF: 3, TER: 2, CEN: 2, EST: 2, ATT: 1 },
  '5-1-3-1': { POR: 1, DIF: 3, TER: 2, MED: 1, CEN: 3, ATT: 1 },
};
const FORMATION_NAMES = Object.keys(FORMATIONS);

// Coppie di moduli "simili" (differiscono al massimo per 2 ruoli su 11 slot
// totali — quanti giocatori andrebbero riassegnati a un ruolo diverso per
// trasformare un modulo nell'altro) — usate per i 2 moduli preferiti di un
// allenatore, così sono sempre tatticamente coerenti tra loro (mai un 4-4-2
// abbinato a un 3-4-2-1) e per costruzione non sono mai lo stesso modulo
// ripetuto due volte. Tutte e 19 le formazioni compaiono in almeno una
// coppia (nessuna resta esclusa).
const FORMATION_PAIRS = [
  ['4-4-2', '3-5-2'], ['4-4-2', '5-3-2'], ['4-4-2', '4-5-1'], ['4-4-2', '3-1-4-2'],
  ['4-4-2', '3-4-1-2'], ['4-4-2', '4-1-2-1-2'], ['4-4-2', '5-1-2-2'], ['4-4-2', '5-4-1'],
  ['4-3-3', '4-1-2-3'], ['4-3-3', '4-3-2-1'], ['4-3-3', '5-1-3-1'],
  ['3-5-2', '5-3-2'], ['3-5-2', '4-5-1'], ['3-5-2', '3-4-3'], ['3-5-2', '3-1-4-2'],
  ['3-5-2', '3-4-1-2'], ['3-5-2', '3-4-2-1'], ['3-5-2', '5-1-2-2'], ['3-5-2', '5-4-1'],
  ['4-2-4', '4-2-2-2'], ['4-2-4', '4-2-1-3'], ['4-2-4', '4-1-2-3'],
  ['5-3-2', '4-5-1'], ['5-3-2', '3-1-4-2'], ['5-3-2', '4-1-2-1-2'], ['5-3-2', '4-1-2-3'],
  ['5-3-2', '5-1-2-2'], ['5-3-2', '5-4-1'], ['5-3-2', '5-1-3-1'],
  ['4-5-1', '3-1-4-2'], ['4-5-1', '4-1-2-1-2'], ['4-5-1', '4-1-2-3'], ['4-5-1', '5-1-2-2'],
  ['4-5-1', '5-4-1'], ['4-5-1', '5-1-3-1'],
  ['3-4-3', '3-1-4-2'], ['3-4-3', '3-4-1-2'], ['3-4-3', '3-4-2-1'], ['3-4-3', '5-4-1'],
  ['3-1-4-2', '3-4-1-2'], ['3-1-4-2', '3-4-2-1'], ['3-1-4-2', '5-1-2-2'], ['3-1-4-2', '5-4-1'],
  ['3-4-1-2', '3-4-2-1'], ['3-4-1-2', '5-4-1'],
  ['3-4-2-1', '5-4-1'],
  ['4-1-2-1-2', '4-2-2-2'], ['4-1-2-1-2', '4-1-2-3'], ['4-1-2-1-2', '4-3-2-1'],
  ['4-1-2-1-2', '5-1-2-2'], ['4-1-2-1-2', '5-1-3-1'],
  ['4-2-2-2', '4-2-1-3'], ['4-2-2-2', '5-2-2-1'],
  ['4-2-1-3', '4-1-2-3'], ['4-2-1-3', '5-2-2-1'],
  ['4-1-2-3', '5-1-2-2'], ['4-1-2-3', '5-1-3-1'],
  ['4-3-2-1', '5-1-3-1'],
  ['5-1-2-2', '5-4-1'], ['5-1-2-2', '5-1-3-1'],
  ['5-4-1', '5-1-3-1'],
];
// Pesca una coppia di moduli preferiti a caso — sempre 2 moduli distinti e
// tatticamente affini (vedi FORMATION_PAIRS sopra), mai una coppia costruita
// scegliendo 2 volte indipendentemente da FORMATION_NAMES.
function pickFormationPair() {
  const pair = FORMATION_PAIRS[Math.floor(Math.random() * FORMATION_PAIRS.length)];
  return Math.random() < 0.5 ? [pair[0], pair[1]] : [pair[1], pair[0]];
}

// Nomi leggibili dei ruoli, in ordine di reparto (per la UI: descrizione
// modulo, schermata allenatore). POR escluso (è sempre 1, mai indicato).
const ROLE_LABELS = {
  DIF: 'Difensore', TER: 'Terzino', MED: 'Mediano', CEN: 'Centrocampista',
  EST: 'Esterno', TRQ: 'Trequartista', ALA: 'Ala', ATT: 'Attaccante',
};
const ROLE_LABELS_PLURAL = {
  DIF: 'Difensori', TER: 'Terzini', MED: 'Mediani', CEN: 'Centrocampisti',
  EST: 'Esterni', TRQ: 'Trequartisti', ALA: 'Ali', ATT: 'Attaccanti',
};
// Descrizione leggibile di un modulo, es. "2 Difensori + 2 Terzini + 2
// Centrocampisti + 2 Esterni + 2 Attaccanti" — sostituisce la vecchia
// formatFormationRequirements (che elencava sotto-posizioni per reparto,
// non più necessaria: il ruolo stesso è già granulare, la posizione esatta
// resta libera).
function formatFormationRequirements(formationName) {
  const slots = FORMATIONS[formationName] || FORMATIONS['4-4-2'];
  return ROLES.filter(r => r !== 'POR' && slots[r] > 0)
    .map(r => `${slots[r]} ${slots[r] === 1 ? ROLE_LABELS[r] : ROLE_LABELS_PLURAL[r]}`)
    .join(' + ');
}

// --- SISTEMA ALLENATORI ---

// Contratto di un allenatore: stessa logica a scaglioni degli stipendi
// giocatore (getDisplaySalary), in base alla sua forza.
function createCoachContract(coach, duration) {
  return { duration, salary: getDisplaySalary(coach.strength) };
}

// Contratto di un DS: stessa linea di stipendio dell'allenatore, ma diviso
// per 10 (richiesta esplicita dell'utente) — riflette il ruolo meno diretto
// del DS rispetto all'allenatore nell'incidere sui risultati in campo.
function createDSContract(ds, duration) {
  return { duration, salary: Math.max(1, Math.round(getDisplaySalary(ds.strength) / 10)) };
}

// Fascia di forza di allenatore/DS per lega — stesso principio del cap per
// lega dei giocatori (leagueStrCap), ma qui a fascia chiusa (min E max) dato
// che le 3 leghe si dividono l'intero spettro 40-100 senza sovrapposizioni:
// Serie C 40-60, Serie B 61-80, Serie A 81-100. Nessuna distinzione di tier
// dentro la lega (era la versione precedente, sostituita su richiesta
// esplicita dell'utente dopo aver verificato via simulazione che il tier a
// 12 livelli esauriva i profili di punta nel lungo periodo).
const LEAGUE_STAFF_BAND = { C: [40, 60], B: [61, 80], A: [81, 100] };
function staffBandForLeague(leagueLevel) {
  return LEAGUE_STAFF_BAND[leagueLevel] || LEAGUE_STAFF_BAND.A;
}
// A scaglioni pesati (65% parte bassa/centrale della fascia, 25% medio-alta,
// 10% di punta) invece che uniforme sull'intera fascia — stessa filosofia di
// generateFreeStaffStrength (vedi sotto), qui applicata alla fascia della
// lega invece che all'intero 40-100: prima un tiro uniforme su 81-100
// significava che OGNI singola squadra di A partiva con un allenatore/DS
// già quasi-elite (metà popolazione sopra 90) — troppi profili forti, su
// richiesta esplicita dell'utente dopo aver confrontato con la distribuzione
// (molto più realistica) dei giocatori.
function randomStaffStrengthForLeague(leagueLevel) {
  const [min, max] = staffBandForLeague(leagueLevel);
  const span = max - min;
  const r = Math.random();
  // Stesse proporzioni relative di generateFreeStaffStrength (i suoi
  // scaglioni 40/65/80/100 sull'intervallo 40-100 corrispondono a 0%/41.7%/
  // 66.7%/100% della fascia), qui riscalate sulla fascia della lega.
  if (r < 0.65) return Math.min(max, min + Math.floor(Math.random() * (span * 0.417 + 1)));
  if (r < 0.90) return Math.min(max, min + Math.round(span * 0.417) + Math.floor(Math.random() * (span * 0.25 + 1)));
  return Math.min(max, min + Math.round(span * 0.667) + Math.floor(Math.random() * (span * 0.333 + 1)));
}

// Tier di appartenenza "naturale" di un allenatore/DS in base alla sua
// forza (0=C, 1=B, 2=A, stesse fasce di LEAGUE_STAFF_BAND) — usato per
// decidere se accetterebbe un'offerta da una squadra di una data lega: un
// allenatore/DS non vuole MAI scendere sotto il proprio tier (un 85, tier A,
// rifiuta B e C), ma è sempre disposto a salire (un 50, tier C, accetta
// tranquillamente un'offerta dalla B o dalla A). Così il "nessun tetto
// massimo" per i liberi (un 95 PUÒ finire in C) resta vero solo quando non
// c'è nessun altro candidato del tier giusto, non è più la scelta di
// default — altrimenti il ricambio periodico finiva per riempire la C di
// gente da 90+ ogni volta che una squadra cambiava allenatore.
const LEAGUE_STAFF_TIER = { C: 0, B: 1, A: 2 };
function staffTierForStrength(strength) {
  if (strength <= LEAGUE_STAFF_BAND.C[1]) return 0;
  if (strength <= LEAGUE_STAFF_BAND.B[1]) return 1;
  return 2;
}
function staffWillingToJoin(strength, leagueLevel) {
  return staffTierForStrength(strength) <= LEAGUE_STAFF_TIER[leagueLevel];
}
// Stessa fascia (LEAGUE_STAFF_BAND/TIER) usata per decidere se un allenatore/DS
// è troppo forte per la propria lega a fine contratto — prima si usava
// leagueStrCap (il tetto dei GIOCATORI), stesso valore numerico ma fonte di
// verità diversa da quella con cui si decide se lo staff è "disposto a unirsi".
function staffOverqualified(strength, leagueLevel) {
  return staffTierForStrength(strength) > LEAGUE_STAFF_TIER[leagueLevel];
}

function createCoach(team) {
  const firstName = ITALIAN_FIRST_NAMES[Math.floor(Math.random() * ITALIAN_FIRST_NAMES.length)];
  const lastName = ITALIAN_LAST_NAMES[Math.floor(Math.random() * ITALIAN_LAST_NAMES.length)];
  const age = 38 + Math.floor(Math.random() * 20);
  const strength = randomStaffStrengthForLeague(team.leagueLevel);
  const maxStrength = Math.min(100, strength + 10 + Math.floor(Math.random() * 35)); // +10 a +45
  // 2 moduli preferiti (non più 1 fisso): quello effettivamente schierato si
  // decide partita per partita/stagione in base alla rosa (pickActiveFormation).
  const formations = pickFormationPair();
  const coach = { firstName, lastName, age, strength, maxStrength, formations, history: [] };
  coach.contract = createCoachContract(coach, 2 + Math.floor(Math.random() * 3)); // 2-4 anni
  return coach;
}

function createDirector(team) {
  const firstName = ITALIAN_FIRST_NAMES[Math.floor(Math.random() * ITALIAN_FIRST_NAMES.length)];
  const lastName = ITALIAN_LAST_NAMES[Math.floor(Math.random() * ITALIAN_LAST_NAMES.length)];
  const age = 38 + Math.floor(Math.random() * 20);
  const strength = randomStaffStrengthForLeague(team.leagueLevel);
  const maxStrength = Math.min(100, strength + 10 + Math.floor(Math.random() * 35)); // +10 a +45
  const ds = { firstName, lastName, age, strength, maxStrength, history: [] };
  ds.contract = createDSContract(ds, 2 + Math.floor(Math.random() * 3)); // 2-4 anni
  return ds;
}

// Forza di un allenatore/DS "libero"/emergente, NON legato a nessuna
// squadra — a differenza di randomStaffStrengthForLeague (ancorata alla
// fascia di una lega specifica). A scaglioni pesati (65% mestierante 40-65,
// 25% buono 65-80, 10% di punta 80-100) invece che uniforme su tutto 40-100:
// un'uniforme piena produceva troppi profili già alti in partenza, che poi
// con la crescita per età finivano quasi tutti accatastati vicino al tetto
// (verificato: 33% dell'intera popolazione allenatori/DS sopra 90, contro
// l'1% dei giocatori) — a scaglioni pesati la distribuzione finale rispecchia
// molto più da vicino quella dei giocatori (pochi sopra 90, il grosso 50-80).
function generateFreeStaffStrength() {
  const r = Math.random();
  if (r < 0.65) return 40 + Math.floor(Math.random() * 26); // 40-65
  if (r < 0.90) return 65 + Math.floor(Math.random() * 16); // 65-80
  return 80 + Math.floor(Math.random() * 21); // 80-100
}
// Margine di crescita (maxStrength - strength): modesto per la maggior parte
// (+5/+17, poco spazio per arrampicarsi ben oltre il punto di partenza),
// con una rara "svolta di carriera" (8%, +20/+40) che tiene comunque viva
// una coda sottile fino a 100 — altrimenti nessuno raggiungerebbe mai più il
// vertice e la Serie A tornerebbe a corto di profili ≥95 (problema originale
// che il ricambio periodico doveva risolvere).
function randomFreeStaffMaxOffset() {
  return Math.random() < 0.08 ? 20 + Math.floor(Math.random() * 21) : 5 + Math.floor(Math.random() * 13);
}
function createFreeCoach() {
  const firstName = ITALIAN_FIRST_NAMES[Math.floor(Math.random() * ITALIAN_FIRST_NAMES.length)];
  const lastName = ITALIAN_LAST_NAMES[Math.floor(Math.random() * ITALIAN_LAST_NAMES.length)];
  const age = 38 + Math.floor(Math.random() * 20);
  const strength = generateFreeStaffStrength();
  const maxStrength = Math.min(100, strength + randomFreeStaffMaxOffset());
  const formations = pickFormationPair();
  return { firstName, lastName, age, strength, maxStrength, formations, history: [] };
}
function createFreeDirector() {
  const firstName = ITALIAN_FIRST_NAMES[Math.floor(Math.random() * ITALIAN_FIRST_NAMES.length)];
  const lastName = ITALIAN_LAST_NAMES[Math.floor(Math.random() * ITALIAN_LAST_NAMES.length)];
  const age = 38 + Math.floor(Math.random() * 20);
  const strength = generateFreeStaffStrength();
  const maxStrength = Math.min(100, strength + randomFreeStaffMaxOffset());
  return { firstName, lastName, age, strength, maxStrength, history: [] };
}

// Ricambio periodico di staff MAI stato calciatore (a differenza di
// retiredPlayerToStaff) — stessa distribuzione a scaglioni pesati e margine
// di crescita modesto di generateFreeStaffStrength/randomFreeStaffMaxOffset
// (era 68-100 uniforme con margine fino a +45: contribuiva parecchio
// all'accatastamento vicino al tetto, vedi commento sopra).
function createEmergingCoach() {
  const firstName = ITALIAN_FIRST_NAMES[Math.floor(Math.random() * ITALIAN_FIRST_NAMES.length)];
  const lastName = ITALIAN_LAST_NAMES[Math.floor(Math.random() * ITALIAN_LAST_NAMES.length)];
  const age = 35 + Math.floor(Math.random() * 8); // 35-42
  const strength = generateFreeStaffStrength();
  const maxStrength = Math.min(100, strength + randomFreeStaffMaxOffset());
  const formations = pickFormationPair();
  return { firstName, lastName, age, strength, maxStrength, formations, history: [] };
}
function createEmergingDirector() {
  const firstName = ITALIAN_FIRST_NAMES[Math.floor(Math.random() * ITALIAN_FIRST_NAMES.length)];
  const lastName = ITALIAN_LAST_NAMES[Math.floor(Math.random() * ITALIAN_LAST_NAMES.length)];
  const age = 35 + Math.floor(Math.random() * 8); // 35-42
  const strength = generateFreeStaffStrength();
  const maxStrength = Math.min(100, strength + randomFreeStaffMaxOffset());
  return { firstName, lastName, age, strength, maxStrength, history: [] };
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

// Curva di crescita/declino — rispecchia quella dei giocatori
// (strengthDeltaForAge): crescita, poi un plateau VERO (può scendere di 1
// tanto quanto salire, non solo salire/restare fermo), poi declino. Prima il
// plateau (50-59) era 0/+1 — mai negativo — e la crescita durava vent'anni
// filati (30-49) prima di qualunque calo: chi raggiungeva il proprio tetto
// ci restava incollato per anche 20-30 stagioni (fino al declino a 60), che
// insieme alla lunga carriera (ritiro a 70) accatastava la popolazione
// vicino al massimo molto più che nei giocatori (che scendono già a 32,
// dopo solo 4 anni di plateau misto a 28-31). Il plateau ora è misto e il
// declino comincia prima (58 invece di 60).
function ageProgressCoach(coach) {
  let delta;
  if (coach.age < 40) delta = 1 + Math.floor(Math.random() * 3);       // 30-39: +1/+3
  else if (coach.age < 48) delta = Math.floor(Math.random() * 3);       // 40-47: 0/+2 (crescita rallentata)
  else if (coach.age < 58) delta = Math.floor(Math.random() * 3) - 1;   // 48-57: -1/+1 (plateau vero)
  else delta = -(1 + Math.floor(Math.random() * 3));                    // 58-70: -1/-3
  coach.strength = Math.max(40, Math.min(coach.maxStrength || 100, coach.strength + delta));
  coach.age++;
}

function retiredPlayerToStaff(player) {
  // Un campione (str alta) diventa staff di qualità; ratio più alto per le
  // stelle, con un vero salto per i fuoriclasse (90+) — è questa l'unica
  // fonte ORGANICA di ricambio di allenatori/DS di punta nel tempo (il pool
  // iniziale allo start partita è una tantum, poi invecchia/si ritira): con
  // ratio fisso a 0.70 anche un giocatore leggendario da 100 non superava
  // mai 80 come allenatore, quindi dopo qualche decina di stagioni finiva
  // per non esserci più nessuno sopra i 90 in tutto il gioco (verificato via
  // simulazione a 50 stagioni). Ora un fuoriclasse da 95+ ha un ratio di
  // 0.95, quindi una vera possibilità di diventare un allenatore/DS di
  // altissimo livello.
  const ratio = player.strength >= 95 ? 0.95 : player.strength >= 90 ? 0.88
    : player.strength >= 85 ? 0.80 : player.strength >= 80 ? 0.72
      : player.strength >= 60 ? 0.62 : 0.55;
  const strength = Math.max(40, Math.min(100, Math.round(player.strength * ratio + Math.random() * 15 - 5)));
  const maxStrength = Math.min(100, strength + 15 + Math.floor(Math.random() * 30)); // +15 a +45
  const formations = pickFormationPair();
  return { firstName: player.firstName, lastName: player.lastName, age: player.age, strength, maxStrength, formations };
}

// Moltiplicatore di forza per quanto bene un giocatore si adatta allo slot
// schierato: pieno se è nel suo ruolo E sottoruolo, penalizzato altrimenti.
const FIT_STRENGTH_MULT = { position: 1, outOfPosition: 0.95, outOfRole: 0.90 };

// Seleziona i migliori 11 per il modulo dell'allenatore, massimizzando la
// SOMMA TOTALE di forza effettiva schierata (non più "prendi gli 11 più
// forti in assoluto e poi sistema i sottoruoli come viene"). Ritorna array
// di { player, inPosition, fit }. `fit` distingue tre casi: 'position'
// (ruolo E sottoruolo giusti, 100% forza), 'outOfPosition' (ruolo giusto ma
// sottoruolo sbagliato, es. terzino schierato da centrale — 95% forza) e
// 'outOfRole' (ruolo sbagliato, es. centrocampista adattato in difesa — 90%
// forza). `inPosition` resta true per 'position'/'outOfPosition' (ruolo
// corretto) e false solo per 'outOfRole' — mantenuto per compatibilità con
// countCorrectSubRolePlacements/countOutOfPosition, che ragionano sul ruolo.
// Generalizzata ai 9 ruoli (vedi ROLES): stessa struttura a 2 passate di
// prima (assegnazione ottimale + scambio, poi riempimento fuori ruolo per
// gli slot vuoti), ma il loop scorre i 9 ruoli invece delle 4 macro-
// categorie, e il pool di un ruolo include anche chi lo possiede come
// SECONDARIO (playerCanPlayRole) — un giocatore con doppio ruolo concorre
// per entrambi, senza malus quando schierato nel secondario (FIT_STRENGTH_
// MULT.position = 1 per entrambi, la distinzione primario/secondario non
// pesa sulla forza in campo).
// `opts.ignoreForma`: usa la forza GREZZA (p.strength) invece della forza
// effettiva forma-pesata — per la "formazione tipo" mostrata nella schermata
// Allenatore/promemoria a inizio stagione, che non è la formazione che
// scenderà davvero in campo alla prossima giornata (quella resta sempre
// forma-consapevole tramite filterAvailableRoster + forza effettiva, vedi
// la simulazione partite) ma l'undici ideale del tecnico: infortunati,
// squalificati e chi non è al meglio della condizione restano comunque
// candidati validi, non vengono esclusi né penalizzati nel confronto.
function getBest11(roster, formationName, opts) {
  const strengthOf = opts && opts.ignoreForma ? (p => p.strength) : getPlayerEffectiveStrength;
  const slots = { ...(FORMATIONS[formationName] || FORMATIONS['4-4-2']) };
  const result = [];
  const used = new Set();

  // Prima passata: per ogni ruolo, riempi gli slot con la combinazione di
  // giocatori (e relativa assegnazione alle posizioni) che dà la somma di
  // forza più alta — non necessariamente "gli N più forti in assoluto". Il
  // portiere non ha posizioni: si sceglie per pura forza, nessuna ambiguità.
  for (const role of ROLES) {
    let needed = slots[role] || 0;
    const inRolePool = roster
      .filter(p => playerCanPlayRole(p, role) && !used.has(p.id))
      .sort((a, b) => strengthOf(b) - strengthOf(a));

    const rolePositions = ROLE_POSITIONS[role];
    if (!rolePositions || !rolePositions.length) {
      for (const p of inRolePool) {
        if (needed <= 0) break;
        result.push({ player: p, role, inPosition: true, fit: 'position' });
        used.add(p.id);
        needed--;
      }
    } else {
      const [typeA, typeB] = rolePositions;
      // Con solo 2 posizioni per ruolo (invariato dal vecchio sistema), non
      // c'è un conteggio "richiesto" per A/B come nel vecchio
      // FORMATION_SUBROLES — il modulo specifica solo QUANTI giocatori di
      // questo ruolo, la distribuzione tra le sue 2 posizioni è libera:
      // si punta a metà/metà (arrotondato) per dare comunque un bersaglio
      // di ottimizzazione allo scambio sotto, mai un vincolo rigido.
      const totalNeeded = Math.min(needed, inRolePool.length);
      const needA = Math.ceil(totalNeeded / 2);
      const needB = totalNeeded - needA;

      const posOf = (p) => playerPositionsFor(p, role);
      // Assegna un gruppo di giocatori già scelto alle posizioni: gli
      // specialisti esatti coprono per primi il proprio slot (per forza),
      // i versatili riempiono quel che resta, e chi non trova comunque la
      // propria posizione va nell'altra (fuori posizione).
      const assignPositions = (players) => {
        let na = needA, nb = needB;
        const assigned = new Map();
        const onlyA = players.filter(p => posOf(p).includes(typeA) && !posOf(p).includes(typeB));
        const onlyB = players.filter(p => posOf(p).includes(typeB) && !posOf(p).includes(typeA));
        const both = players.filter(p => posOf(p).includes(typeA) && posOf(p).includes(typeB));
        onlyA.forEach(p => { if (na > 0) { assigned.set(p, typeA); na--; } });
        onlyB.forEach(p => { if (nb > 0) { assigned.set(p, typeB); nb--; } });
        both.forEach(p => {
          if (na > 0) { assigned.set(p, typeA); na--; }
          else if (nb > 0) { assigned.set(p, typeB); nb--; }
        });
        players.forEach(p => {
          if (assigned.has(p)) return;
          if (na > 0) { assigned.set(p, typeA); na--; }
          else if (nb > 0) { assigned.set(p, typeB); nb--; }
        });
        return assigned;
      };

      // Punto di partenza: i totalNeeded più forti, poi una passata di
      // scambio corregge la selezione quando conviene di più panchinare un
      // titolare "fuori posizione" a favore di uno specialista più debole
      // ma perfettamente piazzato.
      let chosen = inRolePool.slice(0, totalNeeded);
      let assigned = assignPositions(chosen);
      let improved = true;
      // Guardia di sicurezza: due giocatori di forza molto vicina possono in
      // teoria scambiarsi avanti e indietro all'infinito (A esce per B, poi B
      // esce per A) — un tetto di iterazioni ferma comunque il calcolo invece
      // di bloccare il thread, la scelta risultante resta comunque valida
      // (solo non perfettamente ottimizzata in quel caso limite).
      let swapGuard = 0;
      while (improved && swapGuard++ < 200) {
        improved = false;
        for (const p of chosen) {
          const type = assigned.get(p);
          if (posOf(p).includes(type)) continue; // già a suo agio, niente da migliorare
          const misfitValue = strengthOf(p) * FIT_STRENGTH_MULT.outOfPosition;
          const bestOutside = inRolePool
            .filter(q => !chosen.includes(q) && posOf(q).includes(type))
            .sort((a, b) => strengthOf(b) - strengthOf(a))[0];
          if (bestOutside && strengthOf(bestOutside) > misfitValue) {
            chosen = chosen.filter(q => q !== p).concat(bestOutside);
            assigned = assignPositions(chosen);
            improved = true;
            break; // ricalcola da capo dopo ogni scambio
          }
        }
      }

      chosen.forEach(p => {
        const type = assigned.get(p);
        result.push({ player: p, role, inPosition: true, fit: posOf(p).includes(type) ? 'position' : 'outOfPosition', assignedSubRole: type });
        used.add(p.id);
      });
      needed -= chosen.length;
    }
    slots[role] = needed; // quanti slot rimangono vuoti
  }

  // Seconda passata: slot vuoti → riempi con i migliori disponibili (fuori
  // ruolo) — qui lo sconto è uniforme per chiunque, quindi ordinare per
  // forza resta già ottimale, nessuno scambio necessario.
  for (const role of ROLES) {
    let needed = slots[role];
    if (!needed) continue;
    const pool = roster
      .filter(p => !used.has(p.id))
      .sort((a, b) => strengthOf(b) - strengthOf(a));
    for (const p of pool) {
      if (needed <= 0) break;
      result.push({ player: p, role, inPosition: false, fit: 'outOfRole' });
      used.add(p.id);
      needed--;
    }
  }

  return result;
}

// L'allenatore ha 2 moduli preferiti (coach.formations, vedi createCoach):
// quello EFFETTIVAMENTE schierato si decide qui confrontando getBest11 per
// entrambi — vince il punteggio (somma forza effettiva pesata) più alto,
// poi a parità la profondità panchina, poi a parità anche lì la formazione
// 1 di default (mai un pareggio "instabile" che cambi a ogni chiamata).
function pickActiveFormation(team) {
  const formations = team.coach?.formations;
  if (!formations || !formations.length) return '4-4-2';
  if (formations.length === 1) return formations[0];
  const [nameA, nameB] = formations;
  const weighTeam = (entries) => entries.reduce((s, e) => s + getPlayerEffectiveStrength(e.player) * FIT_STRENGTH_MULT[e.fit], 0);

  const best11A = getBest11(team.roster, nameA);
  const best11B = getBest11(team.roster, nameB);
  const scoreA = weighTeam(best11A);
  const scoreB = weighTeam(best11B);
  if (scoreA !== scoreB) return scoreA > scoreB ? nameA : nameB;

  // Pareggio esatto sui titolari: decide chi ha la panchina più forte.
  const usedA = new Set(best11A.map(e => e.player));
  const usedB = new Set(best11B.map(e => e.player));
  const reserveScore = (name, used) => weighTeam(getBest11(team.roster.filter(p => !used.has(p)), name));
  const reserveScoreA = reserveScore(nameA, usedA);
  const reserveScoreB = reserveScore(nameB, usedB);
  if (reserveScoreA !== reserveScoreB) return reserveScoreA > reserveScoreB ? nameA : nameB;

  return nameA; // pareggio totale anche sulle riserve: default alla formazione 1
}

// Classifica la rosa in titolari (migliori 11 per modulo) e prima riserva
// (gli 11 migliori successivi, sempre per modulo) — usata sia per calcolare
// l'esubero (getSquadSurplus) sia per dare priorità al rinnovo anticipato dei
// giocatori più importanti (STEP 1d).
// ignoreForma: chi è titolare/riserva/esubero è una questione di RUOLO E
// ABILITÀ nella rosa, non di quanto uno è stanco questa settimana — senza
// questo, un titolare vero ma temporaneamente poco in forma finiva
// scambiato per esubero e proposto in vendita/prestito (la forma torna su
// da sola, non è un motivo per giudicare il valore di un giocatore).
// Unione dei titolari/riserve di ENTRAMBI i moduli preferiti dell'allenatore
// (team.coach.formations, sempre una coppia — vedi pickFormationPair), non
// solo quello attivo in questo momento: un giocatore che gioca solo nel
// modulo "di riserva" della squadra (es. un'ala in una squadra che alterna
// 3-4-3/3-4-2-1) è comunque un titolare/riserva vera, non un esubero — prima
// veniva marcato fuori sistema tattico e rischiava lo svincolo solo perché
// il modulo attivo in quel momento non aveva slot per lui.
function getSquadTiers(team) {
  const formations = team.coach?.formations?.length ? team.coach.formations : [pickActiveFormation(team)];
  const starters = new Set();
  formations.forEach(formation => {
    getBest11(team.roster, formation, { ignoreForma: true }).forEach(e => starters.add(e.player));
  });
  const rest = team.roster.filter(p => !starters.has(p));
  const reserves = new Set();
  formations.forEach(formation => {
    getBest11(rest, formation, { ignoreForma: true }).forEach(e => reserves.add(e.player));
  });
  return { starters, reserves };
}

// Giocatori che restano fuori dai "migliori 22" di una squadra secondo il modulo
// dell'allenatore: titolari (best 11) + riserve (i migliori 11 successivi, sempre
// per modulo) sono "intoccabili" — tutto il resto della rosa è esubero. Usata
// dall'AI per decidere chi mettere in lista trasferimento/prestito.
function getSquadSurplus(team) {
  if (!team.roster || team.roster.length <= 22) return [];
  const { starters, reserves } = getSquadTiers(team);
  return team.roster.filter(p => !starters.has(p) && !reserves.has(p));
}

// Audit dei "buchi" di una squadra secondo il modulo dell'allenatore: usata
// dal mercato CPU per decidere COSA comprare (non solo chi vendere, come
// getSquadSurplus). Due canali:
// 1) slot titolari già occupati ma fuori posizione/ruolo (malus di fit) —
//    severity 10 se fuori ruolo, 5 se solo fuori posizione (stessa scala di
//    FIT_STRENGTH_MULT).
// 2) profondità panchina: per ruolo, se la forza effettiva media dei
//    riservisti è sotto il 70% di quella dei titolari (o non ce ne sono
//    proprio), segnala un bisogno di profondità — meno urgente di un buco
//    vero in undici, quindi severity più bassa (15, o 25 se il ruolo non ha
//    NESSUN riservista).
// Ritorna [{role, subRole, fit, severity, incumbent, isReserveGap}] ordinato
// per severity decrescente. Pura, nessuna mutazione della rosa.
function getTeamNeeds(team) {
  const formation = pickActiveFormation(team);
  // ignoreForma: stesso motivo di getSquadTiers — il mercato CPU deve
  // ragionare su bisogni di ABILITÀ/ruolo strutturali, non su chi è
  // temporaneamente stanco questa settimana.
  const best11 = getBest11(team.roster, formation, { ignoreForma: true });
  const { reserves } = getSquadTiers(team);
  const reserveList = [...reserves];
  const needs = [];

  best11.forEach(({ player, fit, role, assignedSubRole }) => {
    if (fit === 'position') return;
    const severity = fit === 'outOfRole' ? 10 : 5;
    // §2 REGOLE_CALCIOMERCATO: bisogno calcolato su ruolo (slot del modulo,
    // già uno dei 9 ruoli specifici — non le vecchie macro-categorie) E
    // posizione (assignedSubRole, la posizione che lo slot richiede secondo
    // getBest11 — es. INCONTRISTA vs REGISTA_BASSO in un MED) — outOfRole
    // non ha una posizione specifica mancante (il ruolo stesso è sbagliato).
    const missingSubrole = fit === 'outOfPosition' ? (assignedSubRole || null) : null;
    // `role` è lo slot del MODULO (getBest11), non il ruolo primario del
    // giocatore-ripiego che lo occupa — sono la stessa cosa per 'outOfPosition'
    // (il giocatore gioca lì col ruolo giusto, solo posizione sbagliata), ma
    // divergono per 'outOfRole' (slot di un ruolo che in rosa non c'è affatto).
    needs.push({ role, subRole: missingSubrole, fit, severity, incumbent: player, isReserveGap: false });
  });

  ['DIF', 'CEN', 'ATT'].forEach(role => {
    const starterEntries = best11.filter(e => e.player.role === role);
    if (!starterEntries.length) return;
    const reserveEntries = reserveList.filter(p => p.role === role);
    // Forza grezza (fit-pesata, non forma-pesata) — stesso motivo di sopra:
    // il confronto titolari/riserve non deve dipendere da chi è più stanco
    // in questo momento.
    const avgStarter = starterEntries.reduce((s, e) => s + e.player.strength * FIT_STRENGTH_MULT[e.fit], 0) / starterEntries.length;
    const avgReserve = reserveEntries.length
      ? reserveEntries.reduce((s, p) => s + p.strength, 0) / reserveEntries.length
      : 0;
    if (avgReserve < avgStarter * 0.70) {
      needs.push({ role, subRole: null, fit: null, severity: reserveEntries.length ? 15 : 25, incumbent: null, isReserveGap: true });
    }
  });

  return needs.sort((a, b) => b.severity - a.severity);
}

// Punteggio di un possibile acquisto: quanto migliora la forza effettiva
// TOTALE schierata dalla squadra (getBest11, prima/dopo aggiunta ipotetica
// del giocatore), diviso il costo stimato (cartellino + una frazione dello
// stipendio sui prossimi anni). Se il giocatore non entrerebbe nemmeno in
// undici, si rivaluta lo stesso guadagno marginale sulle SOLE riserve (peso
// ridotto ×0.35 — un buon rincalzo vale, ma meno di un titolare vero).
// Ritorna null se il giocatore non è nemmeno eleggibile per la rosa.
function evaluateTransferTarget(team, player, cost) {
  if (!canAddRole(team, player.role) || !canTeamAcquirePlayer(team, player)) return null;
  const formation = pickActiveFormation(team);
  const weighTeam = (entries) => entries.reduce((s, e) => s + getPlayerEffectiveStrength(e.player) * FIT_STRENGTH_MULT[e.fit], 0);

  const before = weighTeam(getBest11(team.roster, formation));
  const after = weighTeam(getBest11([...team.roster, player], formation));
  let gain = after - before;

  if (gain <= 0) {
    const { reserves } = getSquadTiers(team);
    const reserveRoster = [...reserves];
    const beforeR = weighTeam(getBest11(reserveRoster, formation));
    const afterR = weighTeam(getBest11([...reserveRoster, player], formation));
    gain = Math.max(0, afterR - beforeR) * 0.35;
  }

  // Costo stimato: cartellino + 15% dello stipendio annuo su una finestra
  // "tipica" di 3 anni — pesa il salario senza farlo dominare sul fee (stessa
  // scala M€ del cartellino, stipendio convertito da k€/mese ad annuo/1000).
  const salaryK = getRenewalSalary(player);
  const estimatedWageCostM = annualSalary(salaryK) / 1000 * 3 * 0.15;
  const totalCost = Math.max(0.1, cost + estimatedWageCostM);

  return { gain, cost: totalCost, score: gain / totalCost };
}

// Sceglie il miglior bersaglio di mercato fra i candidati, per guadagno
// marginale/costo (evaluateTransferTarget). Shortlist: prima priorità ai
// ruoli davvero bisognosi (getTeamNeeds), poi pre-cap a 40 e pre-ordinamento
// per forza grezza prima di scorare solo i 15 migliori — tiene il costo
// O(15 × getBest11) per chiamata invece di O(N), a prescindere da quanto è
// grande il pool di candidati.
// La forza del DS (team.ds.strength) diventa "qualità di esecuzione": un DS
// forte (100) sceglie sempre il vero miglior punteggio, uno debole (≤25) ha
// fino a ±35% di rumore moltiplicativo sullo score — a volte sbaglia il
// pick migliore tra i primi della shortlist, ma raramente un bersaglio
// insensato (la shortlist è già pre-filtrata su bisogno+forza).
// `statsSink`, se passato (array), riceve {team, gain, cost, score} per ogni
// candidato scorato — usato dagli script diagnostici per osservare la
// qualità dei bersagli senza duplicare la logica di scoring.
function pickBestTransferTarget(team, candidates, statsSink) {
  if (!candidates || !candidates.length) return null;
  const needs = getTeamNeeds(team);
  const needRoles = new Set(needs.map(n => n.role));

  const shortlist = candidates
    .filter(c => needRoles.size === 0 || needRoles.has(c.player.role) || Math.random() < 0.01)
    .slice(0, 40)
    .sort((a, b) => b.player.strength - a.player.strength)
    .slice(0, 15);

  const scored = shortlist
    .map(c => ({ ...c, ev: evaluateTransferTarget(team, c.player, c.cost) }))
    .filter(c => c.ev && c.ev.gain > 0);
  if (!scored.length) return null;

  const dsStrength = team.ds?.strength ?? 50;
  const noiseAmplitude = Math.max(0, (60 - dsStrength) / 60) * 0.35;
  scored.forEach(c => {
    c.noisyScore = c.ev.score * (1 + (Math.random() * 2 - 1) * noiseAmplitude);
    if (statsSink) statsSink.push({ team: team.name, gain: c.ev.gain, cost: c.ev.cost, score: c.ev.score });
  });

  scored.sort((a, b) => b.noisyScore - a.noisyScore);
  return scored[0];
}

// ─── FORMA (condizione fisica 0-100%) ─────────────────────────────────────────
// Ogni giocatore parte a 100% a inizio stagione, cala di 1% per ogni partita
// giocata e recupera 5% per ogni giornata di riposo. La forza effettiva in
// campo è forza × forma/100 — così gli allenatori sono costretti a ruotare e le
// panchine profonde vengono premiate. Gli infortuni intaccano la forma.
const FORMA_MAX = 100;
const FORMA_PLAY_LOSS = 1;        // −1% per partita giocata
const FORMA_REST_GAIN = 5;        // +5% per partita di riposo
const FORMA_INJURY_BASE = 8;      // −8% base all'infortunio
const FORMA_INJURY_PER_MATCH = 2; // −2% per ogni giornata di stop

function getForma(p) { return p.forma ?? FORMA_MAX; } // backfill salvataggi legacy
function getPlayerEffectiveStrength(p) { return p.strength * getForma(p) / 100; }

// Badge forma colorato per la UI (verde ≥85, giallo 60-84, rosso <60)
function formatForma(p) {
  const f = Math.round(getForma(p));
  const color = f >= 85 ? '#16a34a' : f >= 60 ? '#f59e0b' : '#ef4444';
  return `<span style="color:${color};font-weight:600">${f}%</span>`;
}

// Forza effettiva della squadra: media pesata dei migliori 11 disponibili + apporto allenatore.
// I giocatori fuori posizione (ruolo giusto, sottoruolo sbagliato) contribuiscono
// al 95% della loro forza; quelli fuori ruolo, al 90% (vedi FIT_STRENGTH_MULT).
function getEffectiveStrength(team) {
  if (!team.roster || !team.roster.length) return team.strength || 50;
  const available = filterAvailableRoster(team.roster);
  const formationName = pickActiveFormation(team);
  const best11 = getBest11(available.length >= 7 ? available : team.roster, formationName);
  if (!best11.length) return team.strength || 50;
  const total = best11.reduce((sum, { player, fit }) => {
    const eff = getPlayerEffectiveStrength(player);
    return sum + eff * FIT_STRENGTH_MULT[fit];
  }, 0);
  const base = total / best11.length;
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

// Sceglie un assistman dal lineup escluso il marcatore, con peso per ruolo:
// i registi avanzati/rifinitori (TRQ) creano di più, poi centrocampisti/
// esterni offensivi/ali, i difensori assistono poco, POR mai.
// Ritorna null se non c'è un assist (40% delle volte)
function pickAssister(lineup, scorer) {
  if (Math.random() < 0.40) return null;
  const weights = { POR: 0, DIF: 1, TER: 2, MED: 3, CEN: 8, EST: 6, TRQ: 9, ALA: 6, ATT: 5 };
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

// Cattura, PRIMA di simulare una giornata, chi è già infortunato/squalificato
// — serve a processMatchdayRecovery per non decrementare (e quindi annullare
// subito) un infortunio o una squalifica appena rimediati IN quella stessa
// giornata (vedi lì per il bug che questo risolve).
function snapshotInjurySuspensionState() {
  const map = new Map();
  [...serieA, ...serieB, ...serieC].forEach(team => {
    team.roster.forEach(p => {
      map.set(p, { injury: p.injuryMatchesLeft || 0, susp: p.suspendedMatchesLeft || 0 });
    });
  });
  return map;
}

// Decrementa i contatori di infortuni e squalifiche per tutte le squadre.
// Va chiamato alla FINE di ogni giornata (dopo aver simulato le partite),
// passando lo snapshot preso PRIMA di simularla (snapshotInjurySuspensionState):
// si decrementa solo chi era già infortunato/squalificato ALL'INIZIO della
// giornata appena giocata. Senza questo distinguo, un cartellino rosso o un
// infortunio rimediato proprio in questa giornata (suspendedMatchesLeft
// impostato a 1 durante generateMatchResult) verrebbe subito riportato a 0
// nello stesso turno, e il giocatore non salterebbe mai davvero la partita
// successiva nonostante compaia squalificato nel tabellino.
function processMatchdayRecovery(preState) {
  [...serieA, ...serieB, ...serieC].forEach(team => {
    team.roster.forEach(p => {
      const pre = preState.get(p);
      if (!pre) return;
      if (pre.injury > 0 && (p.injuryMatchesLeft || 0) > 0) p.injuryMatchesLeft--;
      if (pre.susp > 0 && (p.suspendedMatchesLeft || 0) > 0) p.suspendedMatchesLeft--;
    });
  });
}

// Aggiorna la forma dopo una giornata: chi ha giocato (è nell'11 titolare di
// una partita) perde FORMA_PLAY_LOSS, tutti gli altri recuperano FORMA_REST_GAIN
// — tranne gli infortunati, che restano fermi finché sono fuori (così il malus
// da infortunio si sente al rientro). Va chiamata dopo processMatchdayRecovery,
// passando i round appena giocati delle tre leghe.
function applyMatchdayForma(rounds) {
  const played = new Set();
  rounds.forEach(round => (round || []).forEach(m => {
    if (!m.result) return;
    [...(m.result.lineup1 || []), ...(m.result.lineup2 || [])].forEach(({ player: p }) => {
      p.forma = Math.max(0, getForma(p) - FORMA_PLAY_LOSS);
      played.add(p.id);
    });
  }));
  [...serieA, ...serieB, ...serieC].forEach(team => team.roster.forEach(p => {
    if (played.has(p.id)) return;                 // ha giocato: già scalato
    if ((p.injuryMatchesLeft || 0) > 0) return;   // infortunato: nessun recupero
    p.forma = Math.min(FORMA_MAX, getForma(p) + FORMA_REST_GAIN);
  }));
}

// Sceglie il marcatore con peso per ruolo: ATT/ALA in testa, poi TRQ, poi
// EST/CEN/MED, i difensori (DIF/TER) segnano poco, POR mai.
function pickScorer(roster) {
  const weights = { POR: 0, DIF: 1, TER: 1.5, MED: 1, CEN: 3, EST: 3, TRQ: 5, ALA: 6, ATT: 10 };
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

// Restituisce lo stipendio ANNUO del giocatore in k€, solo per il Database
// (nessun contratto reale coinvolto, puro display informativo) — stessa
// curva a scaglioni usata per i contratti veri (getAnnualSalaryBracketValue,
// definita più sotto insieme a SALARY_BRACKETS).
function getPlayerSalaryDisplay(strength) {
  return getAnnualSalaryBracketValue(strength);
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
  { min: 0, max: 50, minCap: 0.1, maxCap: 1 },
  { min: 50, max: 60, minCap: 1, maxCap: 2 },
  { min: 60, max: 70, minCap: 2, maxCap: 5 },
  { min: 70, max: 80, minCap: 5, maxCap: 15 },
  { min: 80, max: 90, minCap: 15, maxCap: 70 },
  { min: 90, max: 101, minCap: 70, maxCap: 180 }, // include 100
];

function getValueBracket(strength) {
  const s = Math.max(1, Math.min(100, strength));
  return VALUE_BRACKETS.find(b => s < b.max) || VALUE_BRACKETS[VALUE_BRACKETS.length - 1];
}

// Valore di trasferimento del giocatore in M€: interpola dentro la fascia di
// forza (posizione lineare tra il tetto della fascia precedente e quello
// attuale), poi l'età modula il valore SENZA MAI poter superare il tetto
// della fascia — un ventenne di forza 55 può avvicinarsi ai 2M€, non superarli.
// §5 REGOLE_CALCIOMERCATO: il cartellino si deprezza in base agli anni di
// contratto rimanenti — meno anni restano, più forte lo sconto (rischio di
// perderlo a parametro zero). Nessuno sconto da 3+ anni residui, sconto
// pesante nell'ultimo anno. Contratto assente/sintetico (candidati non
// ancora tesserati) → nessuno sconto.
function getContractDepreciationMult(player) {
  const duration = player.contract?.duration;
  if (!Number.isFinite(duration)) return 1;
  if (duration >= 3) return 1;
  if (duration === 2) return 0.85;
  if (duration === 1) return 0.55;
  return 0.35; // in scadenza/scaduto
}
function getTransferValue(player) {
  const bracket = getValueBracket(player.strength);
  const t = (Math.max(1, Math.min(100, player.strength)) - bracket.min) / (bracket.max - bracket.min);
  const bracketValue = bracket.minCap + t * (bracket.maxCap - bracket.minCap);
  const ageMult = getAgeValueMultiplier(player.age ?? 27);
  const value = Math.min(bracketValue * ageMult, bracket.maxCap) * getContractDepreciationMult(player);
  return Math.max(0.1, Math.round(value * 10) / 10);
}

// Valore di trasferimento di un allenatore: stessi scaglioni dei giocatori
// (VALUE_BRACKETS) ma divisi per 10 — un allenatore di forza 100 vale al
// massimo 18M€ contro i 180M€ di un giocatore di pari forza, coerente col
// fatto che nella realtà non si vedono trasferimenti di panchine multi-milionari
// quanto quelli dei giocatori. Nessuna modulazione per età (a differenza dei
// giocatori, non c'è una curva di "potenziale di rivendita" per un allenatore).
function getCoachTransferValue(coach) {
  const bracket = getValueBracket(coach.strength);
  const t = (Math.max(1, Math.min(100, coach.strength)) - bracket.min) / (bracket.max - bracket.min);
  const bracketValue = (bracket.minCap + t * (bracket.maxCap - bracket.minCap)) / 10;
  return Math.max(0.1, Math.round(bracketValue * 10) / 10);
}

// Registra un trasferimento nella carriera del giocatore
// toTeamName = null → giocatore svincolato (chiude solo l'entrata corrente)
function recordTransfer(player, toTeamName, fee) {
  if (!player.career) player.career = [];
  const last = player.career[player.career.length - 1];
  if (last && last.left === null) last.left = seasonCount;
  if (toTeamName) {
    player.career.push({ team: toTeamName, joined: seasonCount, left: null, fee: fee ?? null });
    // Torna a lavorare: azzera il conteggio di stagioni da svincolato (vedi
    // STEP 1, ritiro anticipato dopo 3 stagioni consecutive senza squadra).
    player.seasonsUnemployed = 0;
  }
}

// Acquisti/cessioni di un club nella stagione CORRENTE, derivati da
// player.career (niente modello dati nuovo, stesso principio di Notizie: si
// legge una struttura già esistente invece di tracciarne una a parte).
// Scansiona solo giocatori ancora "vivi" nel gioco (rose + svincolati): un
// giocatore ritirato senza diventare staff non è più raggiungibile da
// nessuna parte (il gioco non lo archivia), quindi un ritiro puro non può
// comparire qui — resta comunque visibile nella sezione Ritiri di Notizie.
function buildTeamMarketMoves(team) {
  // Set per id: un giocatore va contato una volta sola anche se per qualche
  // motivo risultasse raggiungibile da più di una fonte contemporaneamente.
  const seenIds = new Set();
  const allPlayers = [...serieA, ...serieB, ...serieC, ...serieD]
    .flatMap(t => t.roster || [])
    .concat(freeAgents || [])
    .filter(p => { if (seenIds.has(p.id)) return false; seenIds.add(p.id); return true; });
  const acquisti = [];
  const cessioni = [];
  allPlayers.forEach(p => {
    const career = p.career || [];
    career.forEach((entry, i) => {
      if (entry.team !== team.name) return;
      // joined this season E non è il primissimo ingaggio in assoluto (i>0):
      // esclude i prodotti del vivaio (createYouthPlayer li fa debuttare con
      // joined=seasonCount ma SENZA una voce precedente in carriera — non
      // sono un acquisto di mercato) e la rosa generata al bootstrap
      // (joined=0, esclusa comunque a meno che seasonCount non sia 0).
      if (entry.joined === seasonCount && i > 0) {
        acquisti.push({ player: p, from: career[i - 1].team, fee: entry.fee });
      }
      if (entry.left === seasonCount) {
        const next = career[i + 1];
        cessioni.push({ player: p, to: next ? next.team : null, fee: next ? next.fee : null });
      }
    });
  });
  return { acquisti, cessioni };
}

// ─── SISTEMA CONTRATTI ────────────────────────────────────────────────────────

// Tetto di stipendio ANNUO (k€) per fascia di forza — stessa logica a
// scaglioni dei prezzi di trasferimento (VALUE_BRACKETS): i fuoriclasse
// guadagnano cifre da vero top player, i giocatori deboli restano modesti.
// Fasce ricalibrate su richiesta esplicita dell'utente (tabella concordata a
// parte): scaglioni più fitti e più bassi sotto i 70 (prima uno stipendio da
// 40 di forza valeva già ~120k/anno, ora 15k — molto più coerente con un
// giocatore mediocre), 70 fissato a 500k, 71 in poi riprende la vecchia
// curva 70-80 (600→1200) semplicemente senza applicarla più al 70 stesso
// (intercettato prima dalla fascia 65-70), e 75 smussato a 800k per
// coerenza di scalino con gli altri punti. 80-100 invariati.
const SALARY_BRACKETS = [
  { min: 1, max: 39, minCap: 1, maxCap: 15 },
  { min: 40, max: 44, minCap: 15, maxCap: 35 },
  { min: 45, max: 49, minCap: 36, maxCap: 65 },
  { min: 50, max: 54, minCap: 66, maxCap: 95 },
  { min: 55, max: 59, minCap: 96, maxCap: 125 },
  { min: 60, max: 64, minCap: 126, maxCap: 250 },
  { min: 65, max: 70, minCap: 251, maxCap: 500 },
  { min: 70, max: 75, minCap: 600, maxCap: 800 },
  { min: 75, max: 80, minCap: 800, maxCap: 1200 },
  { min: 80, max: 90, minCap: 1200, maxCap: 5000 },
  { min: 90, max: 100, minCap: 5000, maxCap: 12000 }, // niente modulazione età sullo stipendio: forza 100 → tetto pieno
];

// <= (non più <): le nuove fasce sono pensate a estremi inclusi (es. 45-49),
// serve includere il "max" di ciascuna fascia nella fascia stessa invece di
// farlo slittare silenziosamente nella successiva.
function getSalaryBracket(strength) {
  const s = Math.max(1, Math.min(100, strength));
  return SALARY_BRACKETS.find(b => s <= b.max) || SALARY_BRACKETS[SALARY_BRACKETS.length - 1];
}

// Stipendio annuo (k€) interpolato dentro la fascia di forza — stessa
// meccanica di getTransferValue, senza modulazione per età (quella agisce
// già sulla durata del contratto, non serve farla agire due volte).
function getAnnualSalaryBracketValue(strength) {
  const bracket = getSalaryBracket(strength);
  const s = Math.max(1, Math.min(100, strength));
  const t = (s - bracket.min) / (bracket.max - bracket.min);
  return Math.round(bracket.minCap + t * (bracket.maxCap - bracket.minCap));
}

// Stipendio base (k€/mese) — usato per TUTTA la logica economica reale
// (contratti, monte ingaggi, rinnovi). Resta mensile internamente: solo la
// UI lo mostra convertito in annuo tramite annualSalary(), per non dover
// toccare tutti i confronti/somme già scritti in termini mensili.
function getDisplaySalary(strength) {
  return Math.max(1, Math.round(getAnnualSalaryBracketValue(strength) / 12));
}

// Stipendio "richiesto" per un rinnovo: valore di mercato attuale in base
// alla forza, modulato dalla personalità (i giocatori più avidi chiedono
// fino al 40% in più) — STESSA formula ovunque nel gioco si proponga un
// rinnovo (tab Rinnovi e tab Rosa, mercato estivo e invernale), così
// l'importo mostrato è sempre identico indipendentemente da dove lo si guarda.
function getRenewalSalary(player) {
  const greed = player.personality?.greed || 50;
  return Math.round(getDisplaySalary(player.strength) * (1.0 + greed * 0.004));
}

// §1a-bis REGOLE_CALCIOMERCATO — Pool Precontratti: ogni giocatore (di
// qualunque squadra, CPU o umano) in ULTIMO anno di contratto (scadrà a fine
// di QUESTA stagione, duration===1) è contendibile da chiunque tranne il
// club attuale, durante i turni invernali — esclude chi ha già firmato un
// precontratto con qualcun altro in questa sessione, chi è già stato mosso
// questa sessione (§5) e chi è attualmente in prestito altrove (la sua
// situazione contrattuale è col proprietario, non con l'ospitante).
function getPreContractPool(excludeTeam) {
  const alreadySigned = new Set(pendingPreContracts.map(pc => pc.player));
  const pool = [];
  [...serieA, ...serieB, ...serieC].forEach(t => {
    if (t === excludeTeam) return;
    t.roster.forEach(p => {
      if (p.contract?.duration !== 1) return;
      if (alreadySigned.has(p)) return;
      if (isSessionLocked(p)) return;
      if (activeLoans.some(l => l.player === p)) return;
      pool.push({ player: p, fromTeam: t });
    });
  });
  return pool;
}

// Vincolo di monte ingaggi cumulativo (§1a-bis): più precontratti firmati
// nella stessa sessione si sommano sul margine disponibile — firmarne uno
// può precludere il successivo anche se lo stipendio da solo rientrerebbe.
function preContractWageBillAllows(team, salary) {
  const committed = pendingPreContracts
    .filter(pc => pc.toTeam === team)
    .reduce((s, pc) => s + pc.signedSalary, 0);
  return wageCapAllows(team, salary + committed, 0);
}

function isPreContracted(player) {
  return pendingPreContracts.some(pc => pc.player === player);
}

// Firma effettiva di un precontratto (azione a turno, sia CPU sia umano):
// il giocatore resta al club attuale fino a fine stagione (vedi
// resolvePreContractDeparture in STEP 1d), stipendio/durata concordati ORA.
function signPreContract(player, fromTeam, toTeam) {
  const signedSalary = player.contract?.salary ?? getDisplaySalary(player.strength);
  const [minDur, maxDur] = getContractDurationRange(player.strength, player.age);
  const signedDuration = minDur + Math.floor(Math.random() * (maxDur - minDur + 1));
  pendingPreContracts.push({ player, fromTeam, toTeam, signedSalary, signedDuration });
  transferLog.push(`${icon('clipboard')} Pre-contratto: <strong>${toTeam.name}</strong> firma con ${player.firstName} ${player.lastName} (da <strong>${fromTeam.name}</strong>) — arriverà la prossima stagione (${signedDuration} anni, ${formatMoneyK(annualSalary(signedSalary))}€/anno)`);
}

// Converte uno stipendio mensile (k€) nella cifra annua mostrata in UI.
function annualSalary(monthlyK) {
  return monthlyK * 12;
}

// Formatta una cifra in migliaia di euro per la UI: sotto il milione resta
// "450k", da un milione in su passa a "1.30mln" (più leggibile delle cifre
// a 5-6 zeri che gli scaglioni di stipendio possono produrre per i big).
function formatMoneyK(k) {
  const rounded = Math.round(k);
  if (Math.abs(rounded) >= 1000) return (rounded / 1000).toFixed(2) + 'mln';
  return rounded + 'k';
}

// ─── CURSORE BUDGET ACQUISTI / MONTE INGAGGI ──────────────────────────────────
// Budget trasferimenti (team.budget, M€) e monte ingaggi (team.wageBudgetCap,
// k€/mese) sono due tetti separati fissati dal presidente. Questo cursore
// lascia al DS la libertà di ripartire il totale combinato dei due tra le due
// voci in qualunque momento durante il mercato — il totale resta fisso
// (nessun soldo creato dal nulla), si sposta solo l'equilibrio tra "comprare
// ora" e "poter pagare stipendi più alti". Step 50k€.
function getBudgetPoolTotalK(team) {
  return Math.round(team.budget * 1000) + annualSalary(team.wageBudgetCap);
}

// `readOnly` (bool): mostra il cursore ma disabilitato — usato dal gate
// rinnovi (renewalGate), dove ogni tab/controllo resta visibile per
// contesto ma non interagibile finché i rinnovi non sono tutti decisi.
function buildBudgetSliderHtml(team, readOnly) {
  if (!Number.isFinite(team.wageBudgetCap)) return '';
  const wageCapNowK = annualSalary(team.wageBudgetCap);
  const wageBillFloorK = annualSalary(getTeamWageBill(team));
  const totalK = getBudgetPoolTotalK(team);
  const min = Math.min(wageBillFloorK, wageCapNowK);
  const max = totalK;
  if (max <= min) return ''; // pool esaurito o in crisi: niente da ripartire
  return `
    <div class="mm-budget-slider">
      <div class="mm-budget-slider-row">
        <span>${icon('money')} Budget acquisti: <strong>${team.budget.toFixed(2)}M€</strong></span>
        <input type="range" id="mm-budget-slider" min="${min}" max="${max}" step="50" value="${wageCapNowK}"${readOnly ? ' disabled' : ''}>
        <span>${icon('briefcase')} Monte ingaggi: <strong>${formatMoneyK(wageCapNowK)}€/anno</strong></span>
      </div>
      <div class="mm-budget-slider-note">Sposta il cursore per ripartire il totale (${formatMoneyK(totalK)}€/anno equivalente) tra budget acquisti e monte ingaggi — non può scendere sotto quanto già impegnato in contratti in corso.</div>
    </div>`;
}

function wireBudgetSlider(overlay, team, render) {
  const slider = overlay.querySelector('#mm-budget-slider');
  if (!slider) return;
  slider.addEventListener('input', () => {
    const totalK = getBudgetPoolTotalK(team);
    const newWageCapK = +slider.value;
    const newTransferK = totalK - newWageCapK;
    team.wageBudgetCap = newWageCapK / 12;
    team.budget = Math.round(newTransferK) / 1000;
    render();
  });
}

// ─── PRESIDENTE E MONTE INGAGGI ───────────────────────────────────────────────

// Monte ingaggi complessivo (k€/mese): rosa giocatori + allenatore + DS —
// tutti e tre pesano sullo stesso tetto (wageBudgetCap) e sulla stessa
// spesa di fine stagione, non solo i giocatori come prima. Vale identico
// per CPU e umano: lo stipendio del DS umano è quello fissato alla firma
// del contratto, non si aggiorna da solo se la sua forza/reputazione sale.
function getTeamWageBill(team) {
  const playersWage = (team.roster || []).reduce((s, p) => s + (p.contract?.salary ?? getDisplaySalary(p.strength)), 0);
  const coachWage = team.coach ? (team.coach.contract?.salary ?? getDisplaySalary(team.coach.strength)) : 0;
  const dsWage = team.ds ? (team.ds.contract?.salary ?? Math.max(1, Math.round(getDisplaySalary(team.ds.strength) / 10))) : 0;
  return playersWage + coachWage + dsWage;
}

// true se l'operazione (aggiunta di addSalary, eventuale rimozione di removeSalary
// per un rinnovo) resta dentro il monte ingaggi fissato dal presidente.
// Se il tetto non è ancora stato fissato (prima stagione), non blocca nulla.
function wageCapAllows(team, addSalary, removeSalary) {
  if (!Number.isFinite(team.wageBudgetCap)) return true;
  return getTeamWageBill(team) - (removeSalary || 0) + addSalary <= team.wageBudgetCap;
}

// ─── RIBILANCIAMENTO AUTOMATICO BUDGET/MONTE INGAGGI (CPU) ────────────────────
// Stessa libertà del cursore umano (buildBudgetSliderHtml/wireBudgetSlider,
// sopra): davanti a un affare che non passerebbe per un solo tetto (budget
// trasferimenti insufficiente per il cartellino, o monte ingaggi insufficiente
// per lo stipendio), una CPU può spostare l'eccedenza dall'altro tetto invece
// di rinunciare — mai creando soldi dal nulla, e mai scendendo sotto quanto
// già impegnato in stipendi correnti. `canRebalanceForDeal` è una verifica
// pura (nessuna mutazione): usata durante la valutazione di più candidati in
// getMarketTurnOptions, dove solo UNO verrà davvero eseguito e non si può
// spostare budget reale per ognuno solo per scartarlo poco dopo.
// `commitRebalanceForDeal` applica per davvero lo spostamento, chiamata solo
// dentro le execute* al momento in cui l'affare scelto viene concluso.
function canRebalanceForDeal(team, costM, addSalaryMonthlyK) {
  if (!Number.isFinite(team.wageBudgetCap)) return true;
  let budget = team.budget, wageCap = team.wageBudgetCap;
  const wageBillFloorK = getTeamWageBill(team);
  if (budget < costM) {
    const shortfallM = costM - budget;
    const shortfallMonthlyK = (shortfallM * 1000) / 12;
    const spareWageMonthlyK = wageCap - wageBillFloorK;
    if (spareWageMonthlyK < shortfallMonthlyK) return false;
    wageCap -= shortfallMonthlyK;
    budget += shortfallM;
  }
  if (addSalaryMonthlyK != null) {
    const neededWageCapK = wageBillFloorK + addSalaryMonthlyK;
    const deltaMonthlyK = neededWageCapK - wageCap;
    if (deltaMonthlyK > 0) {
      const deltaM = annualSalary(deltaMonthlyK) / 1000;
      const availableM = budget - costM;
      if (availableM < deltaM) return false;
    }
  }
  return true;
}

function commitRebalanceForDeal(team, costM, addSalaryMonthlyK) {
  if (!Number.isFinite(team.wageBudgetCap)) return;
  if (team.budget < costM) {
    const shortfallM = costM - team.budget;
    const shortfallMonthlyK = (shortfallM * 1000) / 12;
    team.wageBudgetCap -= shortfallMonthlyK;
    team.budget += shortfallM;
  }
  if (addSalaryMonthlyK != null && !wageCapAllows(team, addSalaryMonthlyK)) {
    const neededWageCapK = getTeamWageBill(team) + addSalaryMonthlyK;
    const deltaMonthlyK = neededWageCapK - team.wageBudgetCap;
    if (deltaMonthlyK > 0) {
      const deltaM = annualSalary(deltaMonthlyK) / 1000;
      team.budget -= deltaM;
      team.wageBudgetCap += deltaMonthlyK;
    }
  }
}

function getPresidentPersonalityLabel(president) {
  const { generosity, patience } = president.personality;
  const genLabel = generosity >= 65 ? 'facoltoso' : generosity <= 35 ? 'parsimonioso' : 'equilibrato';
  const patLabel = patience >= 65 ? 'paziente' : patience <= 35 ? 'impulsivo' : 'ragionevole';
  return `${genLabel} e ${patLabel}`;
}

// Quanto la pazienza del presidente modula la probabilità di esonero del DS
// quando l'obiettivo di stagione è mancato di troppo: ±0.20 rispetto alla
// base (0.45 sia per il DS umano che per quelli CPU) — un presidente molto
// paziente (100) dimezza il rischio (0.25), uno molto impulsivo (0) lo alza
// alla stessa distanza (0.65); un presidente "ragionevole" (50) non cambia
// nulla rispetto al comportamento preesistente.
function getPresidentFireChance(president, baseChance) {
  const patience = president?.personality?.patience ?? 50;
  return baseChance + (50 - patience) / 100 * 0.4;
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
          <div class="pc-contract-row"><span>Monte ingaggi</span><strong>${formatMoneyK(annualSalary(wageBill))}€ / ${formatMoneyK(annualSalary(team.wageBudgetCap))}€ anno</strong></div>
          <div class="pc-contract-row"><span>Obiettivo</span><strong>${estimateObjectiveLabel(team)}</strong></div>
        </div>
        <p style="font-size:.82rem;color:#666;margin-top:10px">Ogni acquisto o rinnovo che superi il monte ingaggi dovrà attendere un taglio altrove in rosa.</p>
        <p style="font-size:.82rem;color:#666;margin-top:4px">Un presidente ${p.personality.patience >= 65 ? 'paziente come lui tollera qualche stagione storta in più' : p.personality.patience <= 35 ? 'impulsivo come lui non perdona a lungo un obiettivo mancato' : 'ragionevole come lui valuta con equilibrio un obiettivo mancato'} prima di considerare l'esonero.</p>
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
  const [minDur, maxDur] = getContractDurationRange(strength, age);
  return {
    duration: minDur + Math.floor(Math.random() * (maxDur - minDur + 1)),
    salary,
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

// Esito unificato del rinnovo — CPU e UMANO, stessa identica formula: 0 =
// rifiuta, altrimenti anni offerti. Un solo punteggio continuo invece di due
// dadi separati (prima: accetta/rifiuta con uno stayScore, poi SE accetta
// anni fissi/a scelta del giocatore). Lealtà, prestigio del club e bonus età
// spingono verso l'alto; ambizione e avidità verso il basso. "Pesce grosso in
// stagno piccolo" (fitPenalty): un giocatore molto più forte della propria
// squadra è realisticamente molto più propenso a rifiutare — un top player
// già in un club che gli sta bene (es. 90 di forza in una big di Serie A)
// non deve invece rifiutare quasi mai solo per sfortuna, dato che lì la
// penalità resta vicina a zero. `valueBonus`: un club si impegna di più a
// trattenere un giocatore forte (offerte migliori, promesse di ruolo) —
// indipendente dal fit con la squadra attuale, tara il tasso di rifiuto "di
// base" dei top player anche a personalità neutra (target: ≤20% per un 90 di
// forza ben assortito in una big). Pesi ambizione/avidità tenuti bassi: una
// personalità NEUTRA (50/50/50) deve accettare almeno ~60% delle volte come
// campione di massima, a prescindere dalla forza — il disadattamento vero
// (fitPenalty) resta l'unico motivo per cui un rifiuto diventa quasi certo.
// Punteggio → anni: ≤20 rifiuta, poi scaglioni da 20 punti (21-40 → 1 anno,
// 41-60 → 2, 61-80 → 3, 81-100 → 4, >100 → 5), vincolati infine al minimo/
// massimo di getContractDurationRange (forza/età) se il giocatore accetta.
function computeRenewalOutcome(player, team) {
  const { loyalty, ambition, greed } = player.personality;
  const prestige = getTeamPrestige(team.name);
  const ageBonus = Math.max(0, (player.age - 32) * 3);
  const overqualified = Math.max(0, player.strength - (team.strength || 0));
  const fitPenalty = overqualified * (0.3 + ambition / 100 * 0.3);
  const valueBonus = (player.strength - 50) * 0.2;
  const noise = Math.random() * 25;
  const score = loyalty * 0.55 + prestige - ambition * 0.15 - greed * 0.08 + ageBonus - fitPenalty + valueBonus + noise;
  if (score <= 20) return 0;
  const tier = Math.min(5, Math.max(1, Math.ceil((score - 20) / 20)));
  const [minDur, maxDur] = getContractDurationRange(player.strength, player.age);
  return Math.max(minDur, Math.min(maxDur, tier));
}

// Motivo del rifiuto (CPU e umano, stesso testo) — puramente in base
// all'ambizione, come già era per la CPU prima dell'unificazione.
function getRenewalRefusalReason(player) {
  return player.personality.ambition > 65 ? 'cerca una sfida più ambiziosa' : 'vuole un nuovo progetto';
}

// Tenta il rinnovo contratto. Restituisce true se firmato
function tryRenewContract(player, team) {
  if (!player.personality) player.personality = createPersonality();
  const { greed } = player.personality;

  // Stipendio richiesto: mercato attuale + premio greed (0-40% extra)
  const marketSalary = getDisplaySalary(player.strength);
  const demandedSalary = Math.round(marketSalary * (1.0 + greed * 0.004));

  const duration = computeRenewalOutcome(player, team);
  if (duration === 0) {
    const reason = getRenewalRefusalReason(player);
    transferLog.push(`${icon('clipboard')} <em>${player.firstName} ${player.lastName}</em> rifiuta il rinnovo con <strong>${team.name}</strong> (${reason})`);
    return false;
  }

  // La squadra può permettersi il rinnovo?
  if (team.budget < 5 && demandedSalary > (player.contract?.salary || 0) * 1.05) {
    transferLog.push(`${icon('clipboard')} <strong>${team.name}</strong> non può rinnovare <em>${player.firstName} ${player.lastName}</em> (${formatMoneyK(annualSalary(demandedSalary))}€/anno — budget insufficiente)`);
    return false;
  }

  // Firma rinnovo
  if (!player.contract) player.contract = createContract(player.strength, player.age);
  player.contract.salary = demandedSalary;
  player.contract.duration = duration;
  transferLog.push(`${icon('clipboard')} <em>${player.firstName} ${player.lastName}</em> rinnova con <strong>${team.name}</strong> — ${player.contract.duration} anni, ${formatMoneyK(annualSalary(demandedSalary))}€/anno`);
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
// Range di forza allineati a getLeagueStrengthBracket: questo valore
// provvisorio di team.strength alimenta solo il percentile/shift dentro
// generateTeamRoster (bilanciamento fra le squadre della stessa lega) prima
// di essere sovrascritto da recalculateTeamStrength con la media reale dei
// giocatori generati — se le due scale non combaciano il percentile esce
// fuori scala e falsa lo shift.
assignLeagueStrengths(serieA, 86, 102, 80, 150); // Serie A: 80M - 150M
assignLeagueStrengths(serieB, 69, 89, 20, 60);   // Serie B: 20M - 60M
assignLeagueStrengths(serieC, 49, 69, 5, 15);    // Serie C: 5M - 15M

// Livello lega assegnato PRIMA di generare le rose: generateTeamRoster lo usa
// per scegliere lo stesso range di forza di nascita di createYouthPlayer.
serieA.forEach(t => { t.leagueLevel = 'A'; });
serieB.forEach(t => { t.leagueLevel = 'B'; });
serieC.forEach(t => { t.leagueLevel = 'C'; });

// Genera le rose iniziali e ricalcola la forza squadra da media giocatori
[...serieA, ...serieB, ...serieC].forEach(team => {
  generateTeamRoster(team);
  recalculateTeamStrength(team);
});

// Assegna allenatore, DS e presidente iniziali a ogni squadra
[...serieA, ...serieB, ...serieC].forEach(t => { t.coach = createCoach(t); t.ds = createDirector(t); t.president = createPresident(t); });

// Serie D: pool dormiente, niente generateTeamRoster/assignLeagueStrengths —
// rosa/staff vuoti finché non viene ripescata in Serie C (vedi
// handlePromotionsAndRelegations), dove si ricostruisce SOLO tramite il
// normale mercato CPU. Forza/budget sono solo placeholder allo stesso
// livello del fondo Serie C, sovrascritti da recalculateTeamStrength non
// appena la rosa inizia a riempirsi.
serieD.forEach(t => {
  t.leagueLevel = 'D';
  t.strength = 20;
  t.budget = 5;
  t.roster = [];
  t.coach = null;
  t.ds = null;
  t.seasonsInA = 0;
  t.seasonsInB = 0;
  t.seasonsInC = 0;
  t.president = createPresident(t);
});

// Pool iniziale di allenatori/DS svincolati, oltre ai 60 già assegnati alle
// squadre — fin dall'inizio partita, non solo quelli che via via si liberano
// nel corso delle stagioni, così mercato/svincolati/carriera DS hanno subito
// un ventaglio ampio di forze tra cui scegliere.
const FREE_STAFF_POOL_SIZE = 300;
while (freeCoaches.length < FREE_STAFF_POOL_SIZE) freeCoaches.push(createFreeCoach());
while (freeDirectors.length < FREE_STAFF_POOL_SIZE) freeDirectors.push(createFreeDirector());

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

// ─── SPAREGGIO CLASSIFICA (a parità di punti) ──────────────────────────────
// Ordine: punti → differenza reti → gol fatti → scontri diretti (punti negli
// scontri diretti, poi differenza reti nei soli scontri diretti). Gli
// scontri diretti cercano i risultati reali nelle rounds della stagione in
// corso (s_roundsA/s_returnRoundsA ecc. — tutte le leghe, i nomi squadra
// sono unici) — se non trovano nulla (es. dati di una stagione passata,
// vedi computePreseasonPrevisioni) restano pari, si ferma ai gol fatti.
function headToHeadTiebreak(nameA, nameB) {
  const roundSets = [
    typeof s_roundsA !== 'undefined' && s_roundsA, typeof s_returnRoundsA !== 'undefined' && s_returnRoundsA,
    typeof s_roundsB !== 'undefined' && s_roundsB, typeof s_returnRoundsB !== 'undefined' && s_returnRoundsB,
    typeof s_roundsC !== 'undefined' && s_roundsC, typeof s_returnRoundsC !== 'undefined' && s_returnRoundsC,
  ];
  let ptsA = 0, ptsB = 0, gfA = 0, gfB = 0;
  roundSets.forEach(rounds => {
    if (!rounds) return;
    rounds.forEach(round => {
      round.forEach(m => {
        if (!m.result) return;
        let gA, gB;
        if (m.team1.name === nameA && m.team2.name === nameB) { gA = m.result.team1Goals; gB = m.result.team2Goals; }
        else if (m.team1.name === nameB && m.team2.name === nameA) { gA = m.result.team2Goals; gB = m.result.team1Goals; }
        else return;
        gfA += gA; gfB += gB;
        if (gA > gB) ptsA += 3; else if (gB > gA) ptsB += 3; else { ptsA++; ptsB++; }
      });
    });
  });
  if (ptsA !== ptsB) return ptsB - ptsA;
  if (gfA !== gfB) return gfB - gfA;
  return 0;
}

// Comparator standard (ordine descending, come già usato ovunque nel gioco:
// `(a,b) => b.x - a.x`) per righe con { name, points, goalsFor, goalsAgainst }.
// `useHeadToHead=false` per contesti senza dati-partita affidabili (stagioni
// passate) — si ferma ai gol fatti.
function compareStandingsRows(a, b, useHeadToHead = true) {
  if (b.points !== a.points) return b.points - a.points;
  const gdA = (a.goalsFor || 0) - (a.goalsAgainst || 0);
  const gdB = (b.goalsFor || 0) - (b.goalsAgainst || 0);
  if (gdB !== gdA) return gdB - gdA;
  const gfA = a.goalsFor || 0, gfB = b.goalsFor || 0;
  if (gfB !== gfA) return gfB - gfA;
  if (useHeadToHead && a.name && b.name) {
    const h2h = headToHeadTiebreak(a.name, b.name);
    if (h2h) return h2h;
  }
  return 0;
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
        magnate: team.magnate // Aggiungiamo flag magnate
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
    match.team1.currentLosingStreak = 0;
    match.team2.currentLosingStreak = (match.team2.currentLosingStreak || 0) + 1;
  } else if (points.team2Points === 3) {
    standings[match.team2.name].wins++;
    standings[match.team1.name].losses++;
    match.team2.currentLosingStreak = 0;
    match.team1.currentLosingStreak = (match.team1.currentLosingStreak || 0) + 1;
  } else {
    standings[match.team1.name].draws++;
    standings[match.team2.name].draws++;
    // Un pareggio non è una sconfitta: interrompe la serie negativa (STEP 0/
    // 0b in updateTeamStrengths la usano per gli esoneri legati alla forma).
    match.team1.currentLosingStreak = 0;
    match.team2.currentLosingStreak = 0;
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

// Contenitore esterno collassabile "Serie A/B/C" (uno per lega): raggruppa
// classifica, marcatori/assist e calendario, apribile/chiudibile a seconda
// della serie in cui milita la squadra del giocatore. Il <details> esterno
// non viene mai ricreato tra un aggiornamento e l'altro (solo il suo
// contenuto interno lo è, dalle singole display* qui sotto), così lo stato
// aperto/chiuso scelto manualmente dall'utente sopravvive ai re-render.
function ensureLeagueSection(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return null;
  let section = document.getElementById('league-' + containerId);
  if (section) return section.querySelector('.league-body');
  section = document.createElement('details');
  section.className = 'league-section';
  section.id = 'league-' + containerId;
  const myLeague = LEAGUE_LEVEL_BY_CONTAINER[containerId];
  section.open = !playerTeam || playerTeam.leagueLevel === myLeague;
  const summary = document.createElement('summary');
  summary.className = 'league-summary';
  summary.textContent = LEAGUE_LABEL_BY_CONTAINER[containerId] || '';
  const body = document.createElement('div');
  body.className = 'league-body';
  section.appendChild(summary);
  section.appendChild(body);
  container.appendChild(section);
  return body;
}

// Tra una stagione e l'altra (previsioni pre-stagione/mercato estivo, vedi
// displayPreSeasonStandings) tutte e 3 le sezioni Serie A/B/C devono essere
// aperte, non solo quella del giocatore — è lo sfondo dell'intero mercato,
// non la vista di gioco normale dove ha senso vedere di default solo la
// propria lega.
function openAllLeagueSections() {
  ['serieA', 'serieB', 'serieC'].forEach(id => {
    const section = document.getElementById('league-' + id);
    if (section) section.open = true;
  });
}

// ── CLASSIFICA MARCATORI / ASSIST ────────────────────────────────────────────
function displayTopScorers(containerId, teams) {
  const container = ensureLeagueSection(containerId);
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
    .slice(0, 10);

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
      <summary class="ts-summary">${icon('ball')} Classifica Marcatori &amp; Assist</summary>
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
// `followTeamName` (opzionale): quale delle due squadre seguire con
// "Partita successiva" — se omesso (apertura normale da un click su una
// riga partita) si calcola una volta sola qui (la propria squadra se
// coinvolta, altrimenti la prima delle due) e resta fisso per tutti i salti
// successivi passati esplicitamente da questa stessa funzione, invece di
// essere ricalcolato ogni volta da match.team1 — che altrimenti "salta"
// sull'altra squadra ogni volta che quella seguita gioca in trasferta
// (team1 è sempre la squadra di casa).
function showMatchDetailModal(match, followTeamName) {
  const r = match.result;
  if (!r) return;
  const overlay = document.createElement('div');
  overlay.className = 'mm-overlay';

  const fm1 = match.team1.coach ? pickActiveFormation(match.team1) : '?';
  const fm2 = match.team2.coach ? pickActiveFormation(match.team2) : '?';

  const lineupRows = (lineup) => (lineup || []).map(({ player: p, role: entryRole, fit, assignedSubRole }) => {
    const rowClass = fit === 'outOfRole' ? ' md-oor' : fit === 'outOfPosition' ? ' md-oop' : '';
    const fitTitle = fit === 'outOfRole' ? 'Fuori ruolo: 70% forza' : fit === 'outOfPosition' ? 'Fuori posizione: 80% forza' : '';
    // Posizione IN CUI è schierato in questa partita (assignedSubRole, dallo
    // slot di formazione assegnato da getBest11 — usa entryRole, il ruolo
    // EFFETTIVAMENTE giocato in questo slot, non p.role/primario, dato che un
    // giocatore con doppio ruolo può essere schierato nel suo secondario).
    // L'eventuale disadattamento resta segnalato solo dal colore/bordo
    // arancione della riga (rowClass/ovrClass), senza scritta "fuori
    // posizione/ruolo".
    const positionLabel = entryRole !== 'POR' && assignedSubRole ? ROLE_POSITION_LABELS[assignedSubRole] || assignedSubRole : '';
    const effStr = Math.round(p.strength * FIT_STRENGTH_MULT[fit]);
    const ovrClass = fit === 'outOfRole' ? ' md-ovr-oor' : fit === 'outOfPosition' ? ' md-ovr-oop' : '';
    const ovrDisplay = fit === 'position' ? p.strength : effStr;
    // Colonna di stato: cartellino preso IN QUESTA partita (cross-referenza
    // con r.events, non lo storico stagionale) + infortunio in corso — impilati
    // uno sopra l'altro in una colonna a larghezza fissa (.md-status-col),
    // MAI in coda alla riga: se aggiunti dopo .md-ovr con margin-left:auto
    // il badge del valore si sposta a sinistra ogni volta che compare
    // un'icona in più (era il bug segnalato).
    const cardEvent = (r.events || []).find(e => (e.type === 'yellow' || e.type === 'red') && e.player === p);
    const cardIcon = cardEvent ? `<span class="md-status-tag" title="${cardEvent.type === 'red' ? 'Espulso' : 'Ammonito'}">${cardEvent.type === 'red' ? '🟥' : '🟨'}</span>` : '';
    const injuryIcon = (p.injuryMatchesLeft || 0) > 0 ? '<span class="md-status-tag md-injured" title="Infortunato">🤕</span>' : '';
    const initial = p.firstName ? p.firstName.charAt(0) + '.' : '';
    return `<div class="md-player-row${rowClass}"${fitTitle ? ` title="${fitTitle}"` : ''}>
      <span class="md-role-badge role-${entryRole}">${entryRole}</span>
      <span class="md-name-cell">${initial} ${p.lastName}${positionLabel ? ` <span style="font-size:.7rem;color:#999">(${positionLabel})</span>` : ''}</span>
      <span class="md-forma">${formatForma(p)}</span>
      <span class="md-status-col">${cardIcon}${injuryIcon}</span>
      <span class="md-ovr${ovrClass}" title="${fit !== 'position' ? `Forza reale ${p.strength} × ${Math.round(FIT_STRENGTH_MULT[fit] * 100)}%` : ''}">${ovrDisplay}</span>
    </div>`;
  }).join('');

  const eventsHtml = (r.events || []).map(e => {
    if (e.type === 'goal') {
      const side = e.team === 1 ? match.team1.name : match.team2.name;
      const assistStr = e.assist ? ` <span class="md-assist">ass. ${e.assist.lastName}</span>` : '';
      return `<div class="md-event"><span class="md-min">${e.minute}'</span> ${icon('ball')} <strong>${e.scorer.lastName}</strong>${assistStr} <em class="md-team-tag">${side}</em></div>`;
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
      `<div class="md-event">${icon('ball')} <strong>${p.lastName}</strong> <em class="md-team-tag">${teamName}</em></div>`
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

  // "Partita successiva": segue la squadra di questa partita (quella del
  // giocatore se coinvolta, altrimenti la prima delle due) — simula una
  // giornata (stesso effetto del bottone "Giornata x") e riapre subito il
  // dettaglio della SUA prossima partita, così si può restare sulla
  // schermata partita e scorrere in avanti giornata dopo giornata. Ha senso
  // solo a stagione in corso (fase 1/3, girone effettivamente in corso):
  // ai bordi di girone/stagione il click su "Giornata x" fa una transizione
  // di fase invece di simulare, quindi non c'è una "prossima partita"
  // immediata da riaprire.
  if (!followTeamName) {
    followTeamName = (playerTeam && (match.team1 === playerTeam || match.team2 === playerTeam)) ? playerTeam.name : match.team1.name;
  }
  const canAdvance = (seasonPhase === 1 || seasonPhase === 3) && currentMatchday < getNumRounds();
  const nextMatchBtnHtml = canAdvance
    ? `<button id="md-next-match" class="md-next-match-btn">Partita successiva ▶</button>` : '';

  overlay.innerHTML = `
    ${nextMatchBtnHtml}
    <div class="mm-box md-box">
      <div class="md-score-header">
        <span class="md-team-name">${teamLogoOrJerseyHtml(match.team1, false, false)}<span>${match.team1.name}</span></span>
        <span class="md-score">${r.team1Goals}–${r.team2Goals}</span>
        <span class="md-team-name md-team-right"><span>${match.team2.name}</span>${teamLogoOrJerseyHtml(match.team2, false, false)}</span>
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

  const nextBtn = overlay.querySelector('#md-next-match');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const prevPhase = seasonPhase;
      const prevMatchday = currentMatchday;
      overlay.remove();
      document.getElementById('simulaStagione').click();
      // Riapre solo se è stata davvero simulata una giornata in più nella
      // STESSA fase (niente transizione di girone/mercato/fine stagione nel
      // mezzo) — altrimenti si lascia il flusso normale (es. mercato) fare
      // il suo corso senza forzare una riapertura fuori contesto.
      if (seasonPhase !== prevPhase || currentMatchday !== prevMatchday + 1) return;
      // Ripesca la squadra per NOME dagli array di lega correnti invece di
      // riusare il riferimento oggetto catturato all'apertura: dopo un
      // salvataggio/caricamento gli oggetti squadra vengono ricreati da zero
      // (deserializeGame), quindi un confronto per riferimento (===) fallisce
      // silenziosamente e non trova più nessuna partita — con NOME resta
      // valido anche in quel caso.
      const currentTeam = [...serieA, ...serieB, ...serieC].find(t => t.name === followTeamName);
      if (!currentTeam) return;
      // In fase 3 (ritorno) la giornata appena simulata va cercata nel
      // calendario di ritorno, non in quello di andata — altrimenti si pesca
      // la giornata gemella d'andata (squadre invertite, risultato già
      // giocato) invece di quella appena disputata.
      const roundsAndata = currentTeam.leagueLevel === 'A' ? s_roundsA : currentTeam.leagueLevel === 'B' ? s_roundsB : s_roundsC;
      const roundsRitorno = currentTeam.leagueLevel === 'A' ? s_returnRoundsA : currentTeam.leagueLevel === 'B' ? s_returnRoundsB : s_returnRoundsC;
      const rounds = prevPhase === 3 ? roundsRitorno : roundsAndata;
      const playedRound = rounds[prevMatchday];
      const nextMatch = playedRound && playedRound.find(m => m.team1.name === followTeamName || m.team2.name === followTeamName);
      if (nextMatch && nextMatch.result) showMatchDetailModal(nextMatch, followTeamName);
    });
  }

  document.body.appendChild(overlay);

  wireTeamLogoFallbacks(overlay);
}

function displaySingleMatchday(containerId, round, matchdayNumber, phase) {
  const container = ensureLeagueSection(containerId);
  if (!container) return;
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
  const container = ensureLeagueSection(containerId);
  if (!container) return;
  const existingWrap = document.getElementById('calendario-wrap-' + containerId);
  if (existingWrap) existingWrap.remove();
  const wrap = document.createElement('div');
  wrap.id = 'calendario-wrap-' + containerId;
  wrap.innerHTML = '<h3 class="league-subheading">Calendario</h3>';
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

    // Logica "Accordion": chiude le altre giornate quando se ne apre una.
    // Scoped a gridDiv (non container): container include anche la classifica
    // e i marcatori (entrambi <details> a loro volta) — usare container qui
    // le richiuderebbe ogni volta che si apre una giornata qualsiasi.
    details.addEventListener('toggle', function () {
      if (this.open) {
        const allDetails = gridDiv.querySelectorAll('details');
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
  wrap.appendChild(gridDiv);
  container.appendChild(wrap);
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
  const fm1 = pickActiveFormation(team1);
  const fm2 = pickActiveFormation(team2);
  const lineup1 = getBest11(avail1.length >= 7 ? avail1 : (team1.roster || []), fm1);
  const lineup2 = getBest11(avail2.length >= 7 ? avail2 : (team2.roster || []), fm2);
  const players1 = lineup1.map(e => e.player);
  const players2 = lineup2.map(e => e.player);
  players1.forEach(p => { p.seasonAppearances = (p.seasonAppearances || 0) + 1; });
  players2.forEach(p => { p.seasonAppearances = (p.seasonAppearances || 0) + 1; });

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

  const gk1 = players1.find(p => p.role === 'POR');
  if (gk1) gk1.seasonConceded = (gk1.seasonConceded || 0) + t2Goals;
  const gk2 = players2.find(p => p.role === 'POR');
  if (gk2) gk2.seasonConceded = (gk2.seasonConceded || 0) + t1Goals;

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

  // Infortuni (~3% per titolare, 1-4 giornate). L'infortunio intacca anche la
  // forma: −(8% + 2% per giornata di stop) — es. 2 giornate → −12%, 4 → −16%.
  [...players1, ...players2].forEach(p => {
    if (Math.random() < 0.03) {
      const weeks = Math.floor(Math.random() * 4) + 1;
      p.injuryMatchesLeft = (p.injuryMatchesLeft || 0) + weeks;
      p.forma = Math.max(0, getForma(p) - (FORMA_INJURY_BASE + weeks * FORMA_INJURY_PER_MATCH));
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

const LEAGUE_LABEL_BY_CONTAINER = { serieA: 'Serie A', serieB: 'Serie B', serieC: 'Serie C' };

// Logo squadra (assets/loghi/): manifest ESPLICITO nome-squadra→file
// esistente, generato scansionando la cartella (scratchpad/pixelate-logos.js
// stampa l'oggetto aggiornato) — niente più tentativi "a indovinare"
// estensione/variante nome (che riempivano la console di 404 per ogni
// squadra ancora senza logo). Rilanciare lo script e incollare qui il nuovo
// oggetto ogni volta che si aggiunge/rinomina/sostituisce un file in
// assets/loghi/. Tutte le squadre nel manifest hanno anche una versione
// pixel art in assets/loghi/pixel/{slug}.png (generata dallo stesso script).
const TEAM_LOGO_FILES = {
  'alessandria': 'alessandria.png',
  'ancona': 'ancona.png',
  'ascoli': 'ascoli.png',
  'atalanta': 'atalanta.webp',
  'avellino': 'avellino.png',
  'bari': 'bari.svg',
  'benevento': 'benevento.png',
  'bologna': 'bologna.png',
  'brescia': 'brescia.png',
  'cagliari': 'cagliari.webp',
  'carpi': 'carpi.png',
  'catania': 'catania.webp',
  'catanzaro': 'catanzaro.png',
  'cesena': 'cesena.png',
  'chievo': 'chievo.jpg',
  'cittadella': 'cittadella.png',
  'como': 'como.png',
  'cosenza': 'cosenza.png',
  'cremonese': 'cremonese.webp',
  'crotone': 'crotone.webp',
  'empoli': 'empoli.png',
  'entella': 'entella.webp',
  'fiorentina': 'fiorentina.webp',
  'foggia': 'foggia.png',
  'frosinone': 'frosinone.webp',
  'genoa': 'genoa.webp',
  'hellas-verona': 'hellas verona.png',
  'inter': 'inter.webp',
  'juventus': 'juventus.webp',
  'lazio': 'lazio.webp',
  'lecce': 'lecce.webp',
  'lecco': 'lecco.webp',
  'legnano': 'legnano.webp',
  'livorno': 'livorno.webp',
  'lucchese': 'lucchese.png',
  'messina': 'messina.png',
  'milan': 'milan.png',
  'modena': 'modena.png',
  'monza': 'monza.png',
  'napoli': 'napoli.webp',
  'novara': 'novara.jpg',
  'padova': 'padova.jpg',
  'palermo': 'palermo.svg',
  'parma': 'parma.webp',
  'perugia': 'perugia.png',
  'pescara': 'pescara.webp',
  'piacenza': 'piacenza.webp',
  'pisa': 'pisa.png',
  'pistoiese': 'pistoiese.png',
  'pro-patria': 'pro-patria.png',
  'ravenna': 'ravenna.jpg',
  'reggiana': 'reggiana.png',
  'reggina': 'reggina.png',
  'roma': 'roma.webp',
  'salernitana': 'salernitana.webp',
  'sambenedettese': 'sambenedettese.png',
  'sampdoria': 'sampdoria.png',
  'sassuolo': 'sassuolo.png',
  'siena': 'siena.jpg',
  'spal': 'spal.webp',
  'spezia': 'spezia.webp',
  'taranto': 'taranto.png',
  'ternana': 'ternana.png',
  'torino': 'torino.png',
  'treviso': 'treviso.png',
  'triestina': 'triestina.webp',
  'udinese': 'udinese.png',
  'varese': 'varese.webp',
  'venezia': 'venezia.png',
  'vicenza': 'vicenza.png',
};
// `usePixel` (bool): includere la versione pixel art (assets/loghi/pixel/)
// come primo candidato. A piccola dimensione (classifica, selezione squadra)
// l'originale a piena risoluzione resta più leggibile della versione
// pixelata pensata per essere vista grande — lì si salta direttamente
// all'originale.
function getTeamLogoCandidates(teamName, usePixel) {
  const slug = teamName.toLowerCase().replace(/\s+/g, '-');
  const rawFile = TEAM_LOGO_FILES[slug];
  if (!rawFile) return []; // nessun logo per questa squadra: fallback diretto, zero richieste
  const candidates = [];
  if (usePixel) candidates.push(`assets/loghi/pixel/${slug}.png`);
  candidates.push(`assets/loghi/${rawFile}`);
  return candidates;
}
// `large` (bool): variante grande per l'header della scheda squadra, invece
// della piccola icona inline usata in classifica/selezione squadra.
// `usePixel` (bool, default true): vedi getTeamLogoCandidates.
function teamLogoOrJerseyHtml(team, large, usePixel) {
  const [c1, c2] = team.colors || ['#888', '#aaa'];
  const sizeClass = large ? ' team-logo-wrap-lg' : '';
  const candidates = getTeamLogoCandidates(team.name, usePixel !== false);
  if (!candidates.length) {
    // Nessun logo in TEAM_LOGO_FILES per questa squadra: quadratino colorato
    // diretto, senza alcun tentativo di caricamento immagine.
    return `<span class="team-logo-wrap${sizeClass}"><span class="jersey-icon" style="background:linear-gradient(90deg,${c1} 50%,${c2} 50%);width:100%;height:100%;margin:0"></span></span>`;
  }
  const jerseyHtml = `<span class="jersey-icon" style="background:linear-gradient(90deg,${c1} 50%,${c2} 50%);display:none;margin:0;position:absolute;top:0;left:0;width:100%;height:100%"></span>`;
  const firstSrc = candidates[0];
  const remaining = candidates.slice(1).join('|');
  return `<span class="team-logo-wrap${sizeClass}">
    <img class="team-logo-img" src="${firstSrc}" data-logo-remaining="${remaining}" alt="">
    ${jerseyHtml}
  </span>`;
}
function wireTeamLogoFallbacks(container) {
  container.querySelectorAll('.team-logo-img').forEach(img => {
    img.addEventListener('error', function onLogoError() {
      const remaining = img.dataset.logoRemaining ? img.dataset.logoRemaining.split('|') : [];
      const next = remaining.shift();
      img.dataset.logoRemaining = remaining.join('|');
      if (next) {
        img.src = next;
      } else {
        img.removeEventListener('error', onLogoError);
        img.style.display = 'none';
        const fallback = img.nextElementSibling;
        if (fallback) fallback.style.display = 'inline-block';
      }
    });
  });
}

const LEAGUE_LEVEL_BY_CONTAINER = { serieA: 'A', serieB: 'B', serieC: 'C' };

function displayStandings(containerId, standingsData, halfSeason = false) {
  const container = ensureLeagueSection(containerId);
  if (!container) return;
  // Rimuovi classifica precedente se esiste (evita duplicati tra andata e ritorno).
  // Non più apribile/chiudibile: sempre visibile appena si apre la sezione
  // Serie A/B/C esterna (ensureLeagueSection), niente doppio click.
  const existing = document.getElementById(`classifica-${containerId}`);
  if (existing) existing.remove();
  const standingsDiv = document.createElement('div');
  standingsDiv.innerHTML = `<h2>Classifica${halfSeason ? ' <em style="font-size:.75em;opacity:.6">(dopo l\'andata)</em>' : ''}</h2>`;
  standingsDiv.id = `classifica-${containerId}`;

  // Converti l'oggetto in un array di oggetti, includendo il nome della squadra
  const standingsArray = Object.entries(standingsData).map(([name, stats]) => ({ name, ...stats }));

  // Ordina l'array: punti → differenza reti → gol fatti → scontri diretti
  standingsArray.sort(compareStandingsRows);

  // Creazione della tabella
  const table = document.createElement('table');
  table.className = 'standings-table';
  table.innerHTML = '<tr><th class="col-standings-icon"></th><th class="col-standings-pos">Pos.</th><th>Squadra</th><th>Punti</th><th>Giornate</th><th>V</th><th>P</th><th>S</th><th>GF</th><th>GS</th><th>Diff. reti</th></tr>';

  standingsArray.forEach((team, index) => {
    const row = table.insertRow();

    // Crea l'icona della squadra: logo se disponibile (assets/loghi/), con
    // fallback automatico al quadratino colorato se il file manca/non carica.
    // Qui l'icona è piccola: si usa l'originale a piena risoluzione, non la
    // versione pixel art (pensata per essere vista grande nella scheda squadra).
    const jerseyIconHtml = teamLogoOrJerseyHtml(team, false, false);

    // Crea il contenuto della cella della squadra con l'icona
    const magnateIcon = team.magnate ? ` ${icon('star')}` : '';
    const teamNameClickable = `<span class="team-name-clickable" data-team-name="${team.name}">${team.name}</span>`;
    const teamCellContent = `
      <div class="team-cell-content">
        ${jerseyIconHtml}<span>${teamNameClickable}${magnateIcon} (${team.strength})</span>
      </div>`;

    // Logica colori: Prime 4 verdi, Ultime 4 rosse
    if (index < 4) {
      row.classList.add('promotion-zone');
    } else if (index >= standingsArray.length - 4) {
      row.classList.add('relegation-zone');
    }

    // Colonna icona: scudetto per il 1° posto di A, retrocessione per le
    // ultime 4 di A/B/C, promozione per le prime 4 di B/C (in A il 1° posto
    // ha già lo scudetto, non serve anche l'icona promozione).
    let posIconHtml = '';
    if (containerId === 'serieA' && index === 0) {
      posIconHtml = trophyIconHtml('scudetto', 'Scudetto');
    } else if (index >= standingsArray.length - 4) {
      posIconHtml = promoRelegIconHtml('retrocessione', 'Retrocessione');
    } else if (containerId !== 'serieA' && index < 4) {
      posIconHtml = promoRelegIconHtml('promozione', 'Promozione');
    }

    const played = (team.wins || 0) + (team.draws || 0) + (team.losses || 0);
    const goalDiff = (team.goalsFor || 0) - (team.goalsAgainst || 0);
    const goalDiffLabel = goalDiff > 0 ? `+${goalDiff}` : `${goalDiff}`;
    row.innerHTML = `<td class="col-standings-icon">${posIconHtml}</td><td class="col-standings-pos">${index + 1}.</td><td>${teamCellContent}</td><td>${team.points}</td><td>${played}</td><td>${team.wins || 0}</td><td>${team.draws || 0}</td><td>${team.losses || 0}</td><td>${team.goalsFor || 0}</td><td>${team.goalsAgainst || 0}</td><td>${goalDiffLabel}</td>`;
  });

  standingsDiv.appendChild(table);
  container.appendChild(standingsDiv);

  wireTeamLogoFallbacks(standingsDiv);

  // Aggiunge gli event listener per il popup dei dettagli squadra
  standingsDiv.querySelectorAll('.team-name-clickable').forEach(el => {
    el.addEventListener('click', (e) => {
      const teamName = e.currentTarget.dataset.teamName;
      showTeamDetailsModal(teamName);
    });
  });
}

// Classifica pre-stagionale: squadre ordinate per forza, con obiettivo
// presorted=true: `teams` è già nell'ordine giusto (es. computePreseasonPrevisioni,
// forza+budget+piazzamento) e non va riordinato per sola forza — usato per lo
// sfondo del mercato estivo, dove si vuole la classifica di previsione/obiettivi
// invece di un semplice ranking per forza.
function displayPreSeasonStandings(containerId, teams, presorted = false) {
  const container = ensureLeagueSection(containerId);
  if (!container) return;
  const existing = document.getElementById(`classifica-${containerId}`);
  if (existing) existing.remove();
  const div = document.createElement('div');
  div.id = `classifica-${containerId}`;
  div.innerHTML = `<h2>Previsioni <em style="font-size:.75em;opacity:.6">(pre-stagione)</em></h2>`;

  const sorted = presorted ? teams : [...teams].sort((a, b) => (b.strength || 0) - (a.strength || 0));
  const table = document.createElement('table');
  table.innerHTML = '<tr><th>#</th><th>Squadra</th><th>Forza</th><th>Obiettivo</th><th>Budget</th></tr>';

  sorted.forEach((team, idx) => {
    const jersey = teamLogoOrJerseyHtml(team, false, false);
    const magnate = team.magnate ? ` ${icon('star')}` : '';
    const nameLink = `<span class="team-name-clickable" data-team-name="${team.name}">${team.name}</span>`;
    const obj = team.objective?.description || '—';
    const budget = team.budget ? team.budget.toFixed(1) + 'M€' : '-';
    const row = table.insertRow();
    if (idx < 4) row.classList.add('promotion-zone');
    else if (idx >= sorted.length - 4) row.classList.add('relegation-zone');
    row.innerHTML = `<td>${idx + 1}</td><td><div class="team-cell-content">${jersey}<span>${nameLink}${magnate}</span></div></td><td>${team.strength || '?'}</td><td>${obj}</td><td>${budget}</td>`;
  });

  div.appendChild(table);
  container.appendChild(div);

  wireTeamLogoFallbacks(div);

  div.querySelectorAll('.team-name-clickable').forEach(el => {
    el.addEventListener('click', e => showTeamDetailsModal(e.currentTarget.dataset.teamName));
  });
}

// ── PREVISIONI PRE-MERCATO ────────────────────────────────────────────────────
// Una squadra che ha cambiato lega eredita un piazzamento "equivalente" nella
// nuova categoria: la zona di scambio (le PROMO_RELEG_ZONE_SIZE=4 posizioni,
// stesso numero di handlePromotionsAndRelegations/archiveStaffSeasonHistory)
// della lega di provenienza si mappa, in ordine relativo, sulle 4 posizioni
// corrispondenti della lega di arrivo. Una neopromossa che ha vinto il
// campionato (1° nella lega inferiore) è la MENO debole delle 4 neopromosse,
// quindi entra come N-3 nella lega superiore (non 1°!); una retrocessa
// ultima in classifica è comunque forte per la categoria inferiore, quindi
// entra come 4° (non ultima).
const PROMO_RELEG_ZONE_SIZE = 4;
function estimatePreviousRankInNewLeague(oldRank, oldNumTeams, newNumTeams, movingUp) {
  if (movingUp) {
    return newNumTeams - PROMO_RELEG_ZONE_SIZE + oldRank;
  }
  return oldRank - (oldNumTeams - PROMO_RELEG_ZONE_SIZE);
}

// Ordine "Previsioni" pre-mercato per una lega: media tra posizione in
// classifica-forza, posizione in classifica-budget e piazzamento equivalente
// della stagione precedente (convertito se la squadra ha cambiato lega).
// Previsione e obiettivo sono la STESSA COSA (su richiesta esplicita
// dell'utente): questo ordine alimenta sia il modal Previsioni sia
// setObjectives, entrambi PRIMA del mercato estivo — includere il budget
// nella media serve proprio a tenere conto dei rinforzi attesi anche se il
// mercato vero e proprio (che potrebbe smentire il pronostico) arriva dopo.
// Stima quanto di team.budget sopravviverà agli stipendi di questa stagione
// (STEP 5 di updateTeamStrengths, che gira DOPO le Previsioni): stessa
// formula di costo di applyFinances (monte ingaggi reale da contratto, più
// allenatore e DS), calcolata qui in anticipo solo per il ranking — non
// tocca il budget reale della squadra, che resta gestito solo da applyFinances.
function estimateNetTransferBudget(team) {
  // getTeamWageBill include già rosa + allenatore + DS, nessuna somma separata.
  const cost = annualSalary(getTeamWageBill(team)) / 1000;
  return (team.budget || 0) - cost;
}

function computePreseasonPrevisioni(teams, league, oldStandingsByLeague) {
  const N = teams.length;
  const leagueOrder = { A: 1, B: 2, C: 3 };

  const strengthRank = new Map(
    [...teams].sort((a, b) => (b.strength || 0) - (a.strength || 0)).map((t, i) => [t.name, i + 1])
  );
  const budgetRank = new Map(
    [...teams].sort((a, b) => estimateNetTransferBudget(b) - estimateNetTransferBudget(a)).map((t, i) => [t.name, i + 1])
  );

  const placementRank = new Map();
  teams.forEach(team => {
    // team.leagueLevel qui riflette ANCORA la lega della stagione appena
    // conclusa (viene sovrascritto solo dentro updateTeamStrengths, che
    // parte dopo questa chiamata) — è esattamente la "lega di provenienza".
    const oldLeague = team.leagueLevel;
    const oldStandings = oldLeague ? oldStandingsByLeague[oldLeague] : null;
    if (!oldLeague || !oldStandings || !oldStandings[team.name]) {
      placementRank.set(team.name, (N + 1) / 2); // nessun dato storico: fallback neutro
      return;
    }
    // useHeadToHead=false: sono i risultati della stagione GIÀ conclusa, le
    // rounds sono già state sovrascritte per quella nuova a questo punto.
    const sorted = Object.entries(oldStandings)
      .map(([name, stats]) => ({ name, ...stats }))
      .sort((a, b) => compareStandingsRows(a, b, false));
    const oldRank = sorted.findIndex(e => e.name === team.name) + 1;
    const oldNumTeams = sorted.length;
    if (oldLeague === league) {
      placementRank.set(team.name, oldRank);
    } else {
      const movingUp = leagueOrder[league] < leagueOrder[oldLeague];
      placementRank.set(team.name, estimatePreviousRankInNewLeague(oldRank, oldNumTeams, N, movingUp));
    }
  });

  return [...teams]
    .map(t => ({
      team: t,
      avgRank: (strengthRank.get(t.name) + budgetRank.get(t.name) + placementRank.get(t.name)) / 3,
    }))
    .sort((a, b) => a.avgRank - b.avgRank)
    .map(e => e.team);
}

// Modal "Previsioni pre-stagione": mostra l'ordine di computePreseasonPrevisioni
// per le 3 leghe, PRIMA che il mercato estivo (CPU + player) tocchi le rose —
// onDone prosegue verso il mercato vero e proprio.
function showPreseasonPrevisioniModal(previsioniByLeague, onDone) {
  const overlay = document.createElement('div');
  overlay.className = 'mm-overlay';

  const leagueTable = (league, teams) => {
    const rows = teams.map((team, idx) => {
      const jersey = teamLogoOrJerseyHtml(team, false, false);
      const nameLink = `<span class="team-name-clickable" data-team-name="${team.name}">${team.name}</span>`;
      const budget = team.budget ? team.budget.toFixed(1) + 'M€' : '-';
      const obj = team.objective?.description || '—';
      const rowClass = idx < 4 ? 'promotion-zone' : idx >= teams.length - 4 ? 'relegation-zone' : '';
      return `<tr class="${rowClass}"><td>${idx + 1}</td><td><div class="team-cell-content">${jersey}<span>${nameLink}</span></div></td><td>${team.strength || '?'}</td><td>${budget}</td><td>${obj}</td></tr>`;
    }).join('');
    return `<h3 style="margin:14px 0 6px">Serie ${league}</h3><table style="width:100%;font-size:.85rem"><tr><th>#</th><th>Squadra</th><th>Forza</th><th>Budget</th><th>Obiettivo</th></tr>${rows}</table>`;
  };

  overlay.innerHTML = `
    <div class="mm-box" style="max-width:900px;max-height:85vh;overflow-y:auto">
      <div class="mm-header">
        <span class="mm-title">📰 Previsioni pre-stagione</span>
        <button class="modal-close" id="previsioni-close" style="position:static">&times;</button>
      </div>
      <div class="mm-content">
        <p style="font-size:.85rem;color:#557;margin:0 2px 12px">Pronostico basato su forza rosa, budget e piazzamento della stagione scorsa (aggiustato per chi ha cambiato categoria) — PRIMA che il mercato estivo cambi le carte in tavola.</p>
        ${leagueTable('A', previsioniByLeague.A)}
        ${leagueTable('B', previsioniByLeague.B)}
        ${leagueTable('C', previsioniByLeague.C)}
      </div>
      <div class="mm-footer">
        <button class="mm-btn mm-confirm" id="previsioni-continue">Vai al mercato →</button>
      </div>
    </div>`;

  const close = () => { overlay.remove(); onDone(); };
  overlay.querySelector('#previsioni-close').addEventListener('click', close);
  overlay.querySelector('#previsioni-continue').addEventListener('click', close);
  overlay.querySelectorAll('.team-name-clickable').forEach(el => {
    el.addEventListener('click', e => showTeamDetailsModal(e.currentTarget.dataset.teamName));
  });
  document.body.appendChild(overlay);
}

// Funzione per trovare il vincitore di una lega
function getWinner(standings) {
  return Object.entries(standings)
    .map(([name, stats]) => ({ name, ...stats }))
    .sort(compareStandingsRows)[0];
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
    const createCell = (team) => `<div class="team-cell-content">${teamLogoOrJerseyHtml(team, false, true)}<span>${team.name} (${team.points} pt)</span></div>`;
    // season.coppaItalia è solo il nome del vincitore (stringa), non uno
    // snapshot squadra come serieA/B/C: risali alla squadra vera per logo/colori.
    const coppaCell = season.coppaItalia
      ? (() => {
        const coppaTeam = [...serieA, ...serieB, ...serieC].find(t => t.name === season.coppaItalia) || { name: season.coppaItalia, colors: [] };
        return `<div class="team-cell-content">${teamLogoOrJerseyHtml(coppaTeam, false, true)}<span>${season.coppaItalia}</span></div>`;
      })()
      : '—';

    html += `<tr><td>Stagione ${season.season}</td><td>${createCell(season.serieA)}</td><td>${createCell(season.serieB)}</td><td>${createCell(season.serieC)}</td><td>${coppaCell}</td></tr>`;
  });
  html += '</table>';
  container.innerHTML = html;
  wireTeamLogoFallbacks(container);
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
      const team = entry.team;
      const teamCellContent = `<div class="team-cell-content">${teamLogoOrJerseyHtml(team, false, true)}<span>${team.name}</span></div>`;

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
  wireTeamLogoFallbacks(container);
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
  modalContent.className = 'modal-content team-details-modal-content';

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
// Colonne ordinabili della tabella Rosa (click sull'intestazione) — "Nome"
// ordina per COGNOME alfabetico, "Ruolo" (default) usa lo stesso ordine di
// reparto già usato altrove (ROLE_ORDER sul ruolo primario).
const ROSTER_SORT_KEYS = {
  nome: p => `${p.lastName} ${p.firstName}`.toLowerCase(),
  role: p => ROLE_ORDER[getPrimaryRole(p)],
  age: p => p.age,
  strength: p => p.strength,
  salary: p => getPlayerSalaryDisplay(p.strength),
  contract: p => p.contract?.duration || 0,
};
// Colonne ordinabili della tabella Statistiche. Per i portieri la colonna
// "Gol" mostra i gol SUBITI col segno meno davanti (es. "-12") invece dei
// gol segnati — l'ordinamento si basa sullo stesso valore mostrato.
const ROSTER_STATS_SORT_KEYS = {
  nome: p => `${p.lastName} ${p.firstName}`.toLowerCase(),
  role: p => ROLE_ORDER[getPrimaryRole(p)],
  presenze: p => p.seasonAppearances || 0,
  gol: p => p.role === 'POR' ? -(p.seasonConceded || 0) : (p.seasonGoals || 0),
  assist: p => p.seasonAssists || 0,
};
function sortPlayersBy(players, sortKeys, key, dir) {
  const keyFn = sortKeys[key] || sortKeys.role;
  const sorted = [...players].sort((a, b) => {
    const va = keyFn(a), vb = keyFn(b);
    return va < vb ? -1 : va > vb ? 1 : 0;
  });
  return dir === 'desc' ? sorted.reverse() : sorted;
}

function showTeamDetailsModal(teamName) {
  const allLeagues = [...serieA, ...serieB, ...serieC];
  const team = allLeagues.find(t => t.name === teamName);

  if (!team) return;

  // Calcola i titoli vinti
  const titlesA = championsHistory.filter(s => s.serieA.name === teamName).length;
  const titlesB = championsHistory.filter(s => s.serieB.name === teamName).length;
  const titlesC = championsHistory.filter(s => s.serieC.name === teamName).length;

  let rosterView = 'rosa'; // 'rosa' | 'statistiche' | 'mercato'
  let rosterSortKey = 'role', rosterSortDir = 'asc';
  let statsSortKey = 'role', statsSortDir = 'asc';

  const modalBody = document.getElementById('modal-body');

  const render = () => {
    // Prestiti: chi è ospitato da questo club (in prestito dal club d'origine)
    // resta nel roster normale, chi è stato ceduto in prestito altrove è
    // fisicamente uscito dal roster — lo riaggiungiamo qui solo per mostrarlo
    // (il club resta comunque proprietario finché il prestito non si risolve).
    const loanedInTeamById = new Map(
      activeLoans.filter(l => l.loanTeam === team).map(l => [l.player.id, l.homeTeam.name])
    );
    const outgoingLoans = activeLoans.filter(l => l.homeTeam === team);
    const outgoingLoanTeamById = new Map(outgoingLoans.map(l => [l.player.id, l.loanTeam.name]));
    const roster = [...(team.roster || [])];
    outgoingLoans.forEach(l => { if (!roster.includes(l.player)) roster.push(l.player); });
    const sortArrow = (active, key, dir) => active === key ? (dir === 'desc' ? ' ▼' : ' ▲') : '';
    const sortableTh = (label, key, activeKey, dir, dataAttr) =>
      `<th data-${dataAttr}="${key}" style="cursor:pointer;user-select:none" title="Ordina per ${label.toLowerCase()}">${label}${sortArrow(activeKey, key, dir)}</th>`;

    let tableSection;
    if (rosterView === 'rosa') {
      const sortedRoster = sortPlayersBy(roster, ROSTER_SORT_KEYS, rosterSortKey, rosterSortDir);
      const rosterRows = sortedRoster.map(p => {
        const salary = getPlayerSalaryDisplay(p.strength);
        const isLoanedIn = loanedInTeamById.has(p.id);
        const isLoanedOut = outgoingLoanTeamById.has(p.id);
        let dur;
        if (isLoanedIn) dur = `${icon('cycle')} dal ${loanedInTeamById.get(p.id)}`;
        else if (isLoanedOut) dur = `${icon('cycle')} al ${outgoingLoanTeamById.get(p.id)}`;
        else {
          const durVal = p.contract?.duration;
          dur = !durVal || durVal <= 0 ? `${icon('warning')} scad.` : `${durVal}a`;
        }
        const rowStyle = (isLoanedIn || isLoanedOut) ? ' style="background:#f1f5f9"' : '';
        return `<tr class="db-row-clickable" data-player-id="${p.id}"${rowStyle}><td class="col-naz">${formatNationality(p)}</td><td><span class="player-name-link">${p.firstName} ${p.lastName}</span></td><td>${formatRoleBadges(p)}</td><td style="font-size:.82rem;color:#666">${formatSubRoles(p)}</td><td>${p.age}</td><td><strong>${p.strength}</strong></td><td>${formatForma(p)}</td><td>${formatMoneyK(salary)}€/anno</td><td>${dur}</td></tr>`;
      }).join('');
      tableSection = `<h4>Rosa (${sortedRoster.length} giocatori)</h4>
      <table>
        <thead><tr>
          <th class="col-naz">Naz.</th>
          ${sortableTh('Nome', 'nome', rosterSortKey, rosterSortDir, 'roster-sort')}
          ${sortableTh('Ruolo', 'role', rosterSortKey, rosterSortDir, 'roster-sort')}
          <th>Posizione</th>
          ${sortableTh('Età', 'age', rosterSortKey, rosterSortDir, 'roster-sort')}
          ${sortableTh('Forza', 'strength', rosterSortKey, rosterSortDir, 'roster-sort')}
          <th>Forma</th>
          ${sortableTh('Stipendio', 'salary', rosterSortKey, rosterSortDir, 'roster-sort')}
          ${sortableTh('Contratto', 'contract', rosterSortKey, rosterSortDir, 'roster-sort')}
        </tr></thead>
        <tbody>${rosterRows}</tbody>
      </table>`;
    } else if (rosterView === 'statistiche') {
      const sortedStats = sortPlayersBy(roster, ROSTER_STATS_SORT_KEYS, statsSortKey, statsSortDir);
      const statsRows = sortedStats.map(p => {
        const golDisplay = p.role === 'POR' ? `-${p.seasonConceded || 0}` : (p.seasonGoals || 0);
        return `<tr class="db-row-clickable" data-player-id="${p.id}"><td class="col-naz">${formatNationality(p)}</td><td><span class="player-name-link">${p.firstName} ${p.lastName}</span></td><td>${formatRoleBadges(p)}</td><td>${p.seasonAppearances || 0}</td><td>${golDisplay}</td><td>${p.seasonAssists || 0}</td></tr>`;
      }).join('');
      tableSection = `<h4>Statistiche (${sortedStats.length} giocatori)</h4>
      <table>
        <thead><tr>
          <th class="col-naz">Naz.</th>
          ${sortableTh('Nome', 'nome', statsSortKey, statsSortDir, 'stats-sort')}
          ${sortableTh('Ruolo', 'role', statsSortKey, statsSortDir, 'stats-sort')}
          ${sortableTh('Presenze', 'presenze', statsSortKey, statsSortDir, 'stats-sort')}
          ${sortableTh('Gol', 'gol', statsSortKey, statsSortDir, 'stats-sort')}
          ${sortableTh('Assist', 'assist', statsSortKey, statsSortDir, 'stats-sort')}
        </tr></thead>
        <tbody>${statsRows}</tbody>
      </table>`;
    } else {
      // Mercato: acquisti/cessioni della stagione corrente, derivati da
      // player.career (buildTeamMarketMoves) — vedi commento lì per i
      // dettagli su cosa è incluso/escluso (niente vivaio, niente ritiri puri).
      const { acquisti, cessioni } = buildTeamMarketMoves(team);
      const moveRow = (m, otherTeamName) => {
        const p = m.player;
        const costo = m.fee === 'prestito' ? '→ Prestito' : m.fee === 'rientro' ? '← Rientro' : m.fee ? `${m.fee.toFixed(1)}M€` : '0';
        const other = otherTeamName || 'Svincolato';
        return `<tr class="db-row-clickable" data-player-id="${p.id}"><td class="col-naz">${formatNationality(p)}</td><td><span class="player-name-link">${p.firstName} ${p.lastName}</span></td><td>${formatRoleBadges(p)}</td><td style="font-size:.82rem;color:#666">${formatSubRoles(p)}</td><td>${p.age}</td><td>${p.strength}</td><td>${other}</td><td>${costo}</td></tr>`;
      };
      const acquistiRows = acquisti.map(m => moveRow(m, m.from)).join('');
      const cessioniRows = cessioni.map(m => moveRow(m, m.to)).join('');
      const emptyRow = label => `<tr><td colspan="8" style="text-align:center;color:var(--text-faint)">${label}</td></tr>`;
      const marketColgroup = `<colgroup><col class="mkt-col-naz"><col class="mkt-col-nome"><col class="mkt-col-ruolo"><col class="mkt-col-posizione"><col class="mkt-col-eta"><col class="mkt-col-forza"><col class="mkt-col-club"><col class="mkt-col-costo"></colgroup>`;
      tableSection = `<h4>Acquisti — Stagione ${seasonCount} (${acquisti.length})</h4>
      <table class="market-table">
        ${marketColgroup}
        <thead><tr><th class="col-naz">Naz.</th><th>Nome</th><th>Ruolo</th><th>Posizione</th><th>Età</th><th>Forza</th><th>Da</th><th>Costo</th></tr></thead>
        <tbody>${acquistiRows || emptyRow('Nessun acquisto questa stagione')}</tbody>
      </table>
      <h4 style="margin-top:16px">Cessioni — Stagione ${seasonCount} (${cessioni.length})</h4>
      <table class="market-table">
        ${marketColgroup}
        <thead><tr><th class="col-naz">Naz.</th><th>Nome</th><th>Ruolo</th><th>Posizione</th><th>Età</th><th>Forza</th><th>A</th><th>Costo</th></tr></thead>
        <tbody>${cessioniRows || emptyRow('Nessuna cessione questa stagione')}</tbody>
      </table>`;
    }

    modalBody.innerHTML = `
      ${teamLogoOrJerseyHtml(team, true)}
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
        ? `<span class="player-name-link" id="staff-coach-link">${team.coach.firstName} ${team.coach.lastName}</span> — Età: ${team.coach.age} — Forza: <strong>${team.coach.strength}</strong> — Stipendio: <strong>${formatMoneyK(annualSalary(team.coach.contract?.salary ?? getDisplaySalary(team.coach.strength)))}€/anno</strong>
        <br>Moduli preferiti: <strong>${(team.coach.formations || []).join(' / ') || '?'}</strong> (attivo: <strong>${pickActiveFormation(team)}</strong>) <span class="player-name-link" id="staff-formation-link">${icon('clipboard')} Vedi formazione</span>`
        : `<em>Nessuno</em>`}</p>
      <p><strong>Direttore Sportivo:</strong> ${team.ds
        ? `<span class="player-name-link" id="staff-ds-link">${team.ds.firstName} ${team.ds.lastName}</span> — Età: ${team.ds.age} — Forza: <strong>${team.ds.strength}</strong> — Stipendio: <strong>${formatMoneyK(annualSalary(team.ds.contract?.salary ?? Math.max(1, Math.round(getDisplaySalary(team.ds.strength) / 10))))}€/anno</strong>`
        : `<em>Nessuno</em>`}</p>
      <p><strong>Presidente:</strong> ${team.president
        ? `${team.president.firstName} ${team.president.lastName} — ${getPresidentPersonalityLabel(team.president)} — Budget: <strong>${team.budget.toFixed(1)}M€</strong>${Number.isFinite(team.wageBudgetCap) ? ` — Monte ingaggi: <strong>${formatMoneyK(annualSalary(getTeamWageBill(team)))}/${formatMoneyK(annualSalary(team.wageBudgetCap))}</strong>€/anno` : ''}`
        : `<em>Nessuno</em>`}${team.objective ? `<br>Obiettivo/previsione: <strong>${team.objective.description}</strong>${Number.isFinite(team.objective.predictedRank) ? ` (${team.objective.predictedRank}°)` : ''}` : ''}</p>
      <div class="mm-seg-group" style="margin:4px 0 10px">
        <button type="button" class="mm-seg${rosterView === 'rosa' ? ' active' : ''}" data-roster-view="rosa">Rosa</button>
        <button type="button" class="mm-seg${rosterView === 'statistiche' ? ' active' : ''}" data-roster-view="statistiche">Statistiche</button>
        <button type="button" class="mm-seg${rosterView === 'mercato' ? ' active' : ''}" data-roster-view="mercato">Mercato</button>
      </div>
      ${tableSection}`;

    wireTeamLogoFallbacks(modalBody);

    // Rendi le righe della rosa/statistiche clickable per aprire la scheda giocatore
    modalBody.querySelectorAll('tr[data-player-id]').forEach(tr => {
      tr.addEventListener('click', () => {
        const p = findPlayerById(+tr.dataset.playerId);
        if (p) openPlayerCard(p);
      });
    });

    // Nome di allenatore e DS clickabile: apre la scheda di carriera (piazzamenti,
    // note, stagioni da svincolato)
    const coachLink = document.getElementById('staff-coach-link');
    if (coachLink) coachLink.addEventListener('click', () => openStaffCard(team.coach, 'Allenatore'));
    const dsLink = document.getElementById('staff-ds-link');
    if (dsLink) dsLink.addEventListener('click', () => openStaffCard(team.ds, 'Direttore Sportivo'));
    const formationLink = document.getElementById('staff-formation-link');
    if (formationLink) formationLink.addEventListener('click', () => showCoachDetailScreen(team));

    modalBody.querySelectorAll('[data-roster-view]').forEach(btn => {
      btn.addEventListener('click', () => { rosterView = btn.dataset.rosterView; render(); });
    });
    modalBody.querySelectorAll('th[data-roster-sort]').forEach(th => {
      th.addEventListener('click', () => {
        const key = th.dataset.rosterSort;
        rosterSortDir = (rosterSortKey === key && rosterSortDir === 'asc') ? 'desc' : 'asc';
        rosterSortKey = key;
        render();
      });
    });
    modalBody.querySelectorAll('th[data-stats-sort]').forEach(th => {
      th.addEventListener('click', () => {
        const key = th.dataset.statsSort;
        statsSortDir = (statsSortKey === key && statsSortDir === 'asc') ? 'desc' : 'asc';
        statsSortKey = key;
        render();
      });
    });
  };

  render();
  document.getElementById('team-details-modal').style.display = 'flex';
}

// ─── SCHERMATA ALLENATORE: campo pixel art con la formazione attiva ──────────
// Altezza (top %) di ciascun ruolo sul campo, calibrata a mano dall'utente
// sull'immagine formation.BMP (la linea di porta reale è a ~16%/~86%, non
// 0%/100% — ci sono bande di spalti sopra/sotto il rettangolo di gioco).
// TER/EST/ALA condividono l'altezza dei rispettivi ruoli centrali
// corrispondenti (stesso reparto, solo più larghi) ma vengono spinti ai
// bordi orizzontalmente (vedi WIDE_ROLES sotto). Il portiere è sempre
// left:50%, quindi la sua riga (un solo giocatore) finisce lì di suo.
const ROLE_PITCH_Y = { POR: 90, DIF: 76, TER: 73, MED: 62, CEN: 47, EST: 44, TRQ: 32, ALA: 25, ATT: 18 };
const WIDE_ROLES = new Set(['TER', 'EST', 'ALA']);

// Pallino pixel art disegnato a mano (griglia 8x8, approssimazione blocchi di
// un cerchio) — fill="currentColor" sulla root svg (eredita a tutti i <rect>
// figli) per poterlo tingere via CSS `color` invece di generare un asset per
// zona. Senza questo attributo il fill di default SVG è nero fisso.
const PITCH_DOT_SVG = `<svg viewBox="0 0 8 8" fill="currentColor" shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg">
  <rect x="2" y="0" width="4" height="1"/><rect x="1" y="1" width="6" height="1"/>
  <rect x="0" y="2" width="8" height="4"/>
  <rect x="1" y="6" width="6" height="1"/><rect x="2" y="7" width="4" height="1"/>
</svg>`;

// Sfondo campo pixel art (sostituisce assets/pitch/formation.BMP, fotorealistico
// e stonato coi pallini). Vettoriale: niente downscale/aliasing da gestire come
// per il BMP, le linee restano nitide a qualunque dimensione della finestra.
// Coordinate su viewBox 672x880 (stesse proporzioni del BMP originale, così
// tutte le posizioni % dei pallini restano valide). Le lunette (l'arco di
// rigore) si ottengono disegnando il cerchio completo e poi "ritagliandolo"
// con una toppa a righe erba sopra l'area di rigore (stesso pattern del
// prato, per non lasciare una cucitura) — molto più robusto che calcolare a
// mano i flag di uno start/sweep di un arco SVG. L'area piccola va disegnata
// DOPO la toppa, altrimenti la toppa la cancellerebbe (sta anch'essa dentro
// il rettangolo dell'area di rigore).
const PITCH_BG_SVG = (() => {
  const W = 672, H = 880, M = 24;
  const boxW = 374, boxD = 137, gaW = 187, gaD = 54, penDist = 110, R = 70;
  const boxX = (W - boxW) / 2, gaX = (W - gaW) / 2;
  const end = (goalY, dir) => {
    const boxY = dir === 1 ? goalY : goalY - boxD;
    const gaY = dir === 1 ? goalY : goalY - gaD;
    const spotY = goalY + dir * penDist;
    return `
      <rect x="${boxX}" y="${boxY}" width="${boxW}" height="${boxD}" fill="none" stroke="#fff" stroke-width="4" shape-rendering="crispEdges"/>
      <circle cx="${W / 2}" cy="${spotY}" r="${R}" fill="none" stroke="#fff" stroke-width="4"/>
      <rect x="${boxX}" y="${boxY}" width="${boxW}" height="${boxD}" fill="url(#pitchGrass)"/>
      <rect x="${boxX}" y="${boxY}" width="${boxW}" height="${boxD}" fill="none" stroke="#fff" stroke-width="4" shape-rendering="crispEdges"/>
      <rect x="${gaX}" y="${gaY}" width="${gaW}" height="${gaD}" fill="none" stroke="#fff" stroke-width="4" shape-rendering="crispEdges"/>
      <circle cx="${W / 2}" cy="${spotY}" r="4" fill="#fff"/>`;
  };
  return `<svg class="pitch-bg-svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="pitchGrass" patternUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="68">
        <rect x="0" y="0" width="${W}" height="34" fill="#2f9a4d"/>
        <rect x="0" y="34" width="${W}" height="34" fill="#268039"/>
      </pattern>
    </defs>
    <rect x="0" y="0" width="${W}" height="${H}" fill="url(#pitchGrass)"/>
    <rect x="${M}" y="${M}" width="${W - 2 * M}" height="${H - 2 * M}" fill="none" stroke="#fff" stroke-width="4" shape-rendering="crispEdges"/>
    <line x1="${M}" y1="${H / 2}" x2="${W - M}" y2="${H / 2}" stroke="#fff" stroke-width="4" shape-rendering="crispEdges"/>
    <circle cx="${W / 2}" cy="${H / 2}" r="${R}" fill="none" stroke="#fff" stroke-width="4"/>
    <circle cx="${W / 2}" cy="${H / 2}" r="4" fill="#fff"/>
    ${end(M, 1)}
    ${end(H - M, -1)}
  </svg>`;
})();

// Colonne (left %) fisse per gli slot "centrali" di una riga, calibrate a
// mano dall'utente (con Simulatore Calcio Italiano Design System/
// pitch-position-tuner.html): 1 solo (POR, MED, o un ATT/TRQ/CEN da solo) →
// 50% dritto in mezzo; 2 (es. 2 CEN, 2 TRQ, 2 ATT, o i DIF centrali quando ci
// sono anche i TER larghi) → 35%/65%; 3 (es. 3 CEN, o i DIF di una difesa a 3
// senza TER) → 30%/50%/70%.
const CENTRAL_X = { 1: [50], 2: [35, 65], 3: [30, 50, 70] };
// I ruoli "larghi" (WIDE_ROLES: TER/EST/ALA) vanno sempre ai bordi, 15%/85%,
// indipendentemente da quanti giocatori centrali condividono la stessa riga
// (es. difesa a 4 = 2 TER a 15%/85% + 2 DIF centrali a 35%/65%; difesa a 5 =
// 2 TER a 15%/85% + 3 DIF centrali a 30%/50%/70%).
const WIDE_X = [15, 85];

// Calcola posizione (x%, y%) sul campo per ogni titolare della formazione
// attiva. Altezza = ROLE_PITCH_Y; colonna = CENTRAL_X per gli slot centrali,
// WIDE_X per quelli larghi — nessuna precisione millimetrica, solo una
// disposizione tatticamente leggibile a colpo d'occhio.
function computePitchPositions(best11) {
  const byY = new Map();
  best11.forEach(entry => {
    const y = ROLE_PITCH_Y[entry.role] ?? 50;
    if (!byY.has(y)) byY.set(y, []);
    byY.get(y).push(entry);
  });

  const positioned = [];
  byY.forEach((entries, y) => {
    const wide = entries.filter(e => WIDE_ROLES.has(e.role));
    const central = entries.filter(e => !WIDE_ROLES.has(e.role));

    const centralXs = CENTRAL_X[central.length]
      || central.map((_, i) => central.length === 1 ? 50 : 12 + i * (76 / (central.length - 1)));
    central.forEach((entry, i) => positioned.push({ ...entry, x: centralXs[i], y }));

    // I primi 2 larghi vanno sempre ai bordi fissi; eventuali larghi oltre
    // il secondo (non dovrebbe capitare con le 19 formazioni definite) non
    // devono comunque far sparire nessuno.
    wide.slice(0, 2).forEach((entry, i) => positioned.push({ ...entry, x: WIDE_X[i], y }));
    wide.slice(2).forEach(entry => positioned.push({ ...entry, x: 50, y }));
  });
  return positioned;
}

// Vista "Modulo": il campo pixel art con gli 11 pallini colorati per zona.
function buildCoachScreenPitchHtml(positioned) {
  const dotsHtml = positioned.map(({ player, role, assignedSubRole, fit, x, y }) => {
    // Chi riempie lo slot "fuori ruolo" (nessun titolare vero per quel ruolo)
    // non ha una posizione assegnata (assignedSubRole resta undefined,
    // getBest11 non la calcola per la seconda passata) — mostriamo comunque
    // la prima posizione del ruolo come etichetta di riferimento dello slot,
    // invece di lasciarlo senza scritta.
    const posCode = assignedSubRole || ROLE_POSITIONS[role]?.[0];
    const posLabel = posCode ? (ROLE_POSITION_LABELS[posCode] || posCode) : '';
    const fitClass = fit === 'outOfRole' ? ' pitch-dot-oor' : fit === 'outOfPosition' ? ' pitch-dot-oop' : '';
    return `<div class="pitch-dot-wrap zone-${ROLE_ZONE[role] || 'CEN'}" style="left:${x}%;top:${y}%" title="${player.firstName} ${player.lastName}">
      <div class="pitch-dot-role">${role}</div>
      <div class="pitch-dot${fitClass}">${PITCH_DOT_SVG}</div>
      ${posLabel ? `<div class="pitch-dot-pos">(${posLabel})</div>` : ''}
    </div>`;
  }).join('');
  return `<div class="pitch-container">
    ${PITCH_BG_SVG}
    ${dotsHtml}
  </div>`;
}

// Riga di un giocatore in una lista titolari/riserve, con la forza EFFETTIVA
// schierata (malus incluso per chi gioca fuori posizione/ruolo) — stesso
// stile/logica delle righe titolari nel modal dettaglio partita
// (showMatchDetailModal), riusata da tutte le viste a lista della schermata
// Allenatore (Migliori 11, Titolari/Riserve).
function renderCoachScreenPlayerRow(entry, opts) {
  opts = opts || {};
  const { player: p, role: entryRole, fit, assignedSubRole } = entry;
  const rowClass = fit === 'outOfRole' ? ' md-oor' : fit === 'outOfPosition' ? ' md-oop' : '';
  const fitTitle = fit === 'outOfRole' ? 'Fuori ruolo: 90% forza' : fit === 'outOfPosition' ? 'Fuori posizione: 95% forza' : '';
  // Vedi buildCoachScreenPitchHtml: fallback alla prima posizione del ruolo
  // quando lo slot è stato tappato "fuori ruolo" (nessuna posizione
  // assegnata in quel caso).
  const posCode = assignedSubRole || ROLE_POSITIONS[entryRole]?.[0];
  const positionLabel = entryRole !== 'POR' && posCode ? (ROLE_POSITION_LABELS[posCode] || posCode) : '';
  const effStr = Math.round(p.strength * FIT_STRENGTH_MULT[fit]);
  const ovrClass = fit === 'outOfRole' ? ' md-ovr-oor' : fit === 'outOfPosition' ? ' md-ovr-oop' : '';
  const ovrDisplay = fit === 'position' ? p.strength : effStr;
  // opts.compact: colonna stretta (Titolari/Riserve affiancate) — solo
  // cognome (la posizione si mostra comunque, ma accanto al ruolo invece che
  // accanto al nome, per risparmiare spazio in orizzontale).
  const nameHtml = opts.compact
    ? p.lastName
    : `${p.firstName} ${p.lastName}${positionLabel ? ` <span style="font-size:.7rem;color:#999">(${positionLabel})</span>` : ''}`;
  const roleWithPosition = `<span class="md-role-badge role-${entryRole}">${entryRole}</span>${opts.compact && positionLabel ? ` <span style="font-size:.68rem;color:#999">(${positionLabel})</span>` : ''}`;
  return `<div class="md-player-row${opts.compact ? ' md-player-row-compact' : ''}${rowClass}"${fitTitle ? ` title="${fitTitle}"` : ''}>
    ${roleWithPosition}
    <span>${nameHtml}</span>
    <span class="md-ovr${ovrClass}" title="${fit !== 'position' ? `Forza reale ${p.strength} × ${Math.round(FIT_STRENGTH_MULT[fit] * 100)}%` : ''}">${ovrDisplay}</span>
    ${opts.showForma ? `<span class="md-forma">${formatForma(p)}</span>` : ''}
  </div>`;
}

// Vista "Migliori 11": lista testuale dei titolari.
function buildCoachScreenBest11ListHtml(best11, showForma = true) {
  // getBest11 riempie prima ogni ruolo con chi lo sa giocare, e solo alla
  // fine (seconda passata) tappa gli slot rimasti vuoti con chi capita —
  // questi ultimi finiscono in coda all'array indipendentemente dal ruolo,
  // spostando la riga in fondo alla lista. Riordiniamo sempre per ROLE_ORDER
  // così l'elenco resta nel consueto ordine di reparto (POR→ATT).
  const ordered = [...best11].sort((a, b) => ROLE_ORDER[a.role] - ROLE_ORDER[b.role]);
  const rows = ordered.map(e => renderCoachScreenPlayerRow(e, { showForma })).join('');
  return `<div class="coach-best11-list">${rows}</div>`;
}

// Vista "Migliori 11" a campo: come "Modulo" ma il pallino mostra la forza
// EFFETTIVA (malus di posizione/ruolo incluso) del titolare AL POSTO
// dell'icona generica, col cognome sopra e la posizione richiesta
// dall'allenatore sotto (stessa etichetta di "Modulo").
function buildBest11ValuePitchHtml(positioned) {
  const dotsHtml = positioned.map(({ player, role, assignedSubRole, fit, x, y }) => {
    const fitClass = fit === 'outOfRole' ? ' pitch-dot-oor' : fit === 'outOfPosition' ? ' pitch-dot-oop' : '';
    const value = Math.round(player.strength * FIT_STRENGTH_MULT[fit]);
    const posCode = assignedSubRole || ROLE_POSITIONS[role]?.[0];
    const posLabel = posCode ? (ROLE_POSITION_LABELS[posCode] || posCode) : '';
    return `<div class="pitch-dot-wrap zone-${ROLE_ZONE[role] || 'CEN'}" style="left:${x}%;top:${y}%" title="${player.firstName} ${player.lastName}">
      <div class="pitch-dot-role">${player.lastName}</div>
      <div class="pitch-dot${fitClass}"><div class="pitch-dot-value-circle"><span class="pitch-dot-value-text">${value}</span></div></div>
      ${posLabel ? `<div class="pitch-dot-pos">(${posLabel})</div>` : ''}
    </div>`;
  }).join('');
  return `<div class="pitch-container">
    ${PITCH_BG_SVG}
    ${dotsHtml}
  </div>`;
}

// Vista "Titolari/Riserve": due colonne affiancate (Titolari a sinistra,
// Riserve a destra) — ogni riga di titolare è affiancata alla riserva dello
// stesso ruolo/slot (getBest11 sul resto della rosa, stesso modulo). Se
// manca una riserva per quello slot (rosa corta) resta comunque il posto
// vuoto al suo posto, invece di sparire e disallineare le due colonne.
function buildTitolariRiserveHtml(starters, reserves) {
  const byRole = (entries) => {
    const map = new Map();
    entries.forEach(e => { if (!map.has(e.role)) map.set(e.role, []); map.get(e.role).push(e); });
    return map;
  };
  const startersByRole = byRole(starters);
  const reservesByRole = byRole(reserves);
  const roles = ROLES.filter(r => startersByRole.has(r) || reservesByRole.has(r));

  const cell = (entry, emptyLabel) => entry
    ? renderCoachScreenPlayerRow(entry, { compact: true })
    : `<div class="md-player-row md-player-row-compact tr-empty">${emptyLabel}</div>`;

  let rows = '';
  roles.forEach(role => {
    const starterList = startersByRole.get(role) || [];
    const reserveList = reservesByRole.get(role) || [];
    const n = Math.max(starterList.length, reserveList.length);
    for (let i = 0; i < n; i++) {
      rows += `<div class="tr-row">
        <div class="tr-col">${cell(starterList[i], '—')}</div>
        <div class="tr-col">${cell(reserveList[i], '— nessuna riserva —')}</div>
      </div>`;
    }
  });
  return `<div class="coach-tr-wrap">
    <div class="tr-row tr-head"><div class="tr-col">Titolari</div><div class="tr-col">Riserve</div></div>
    ${rows}
  </div>`;
}

function showCoachDetailScreen(team) {
  const overlay = document.createElement('div');
  overlay.className = 'mm-overlay';

  const coach = team.coach;
  const activeFormation = coach ? pickActiveFormation(team) : '4-4-2';
  // 2 moduli preferiti (possono coincidere): l'utente può passare dall'uno
  // all'altro per confrontarli, non solo vedere quello effettivamente
  // schierato (activeFormation resta comunque marcato "in campo").
  const preferredFormations = coach?.formations?.length ? [...new Set(coach.formations)] : [activeFormation];

  const formationsNote = coach?.formations?.length
    ? `Moduli preferiti: <strong>${coach.formations.join(' / ')}</strong> — in campo: <strong>${activeFormation}</strong>`
    : 'Nessun allenatore in carica.';

  let view = 'modulo'; // 'modulo' | 'best11' | 'roster'
  let selectedFormation = activeFormation;

  const render = () => {
    const best11 = getBest11(team.roster || [], selectedFormation, { ignoreForma: true });
    const positioned = computePitchPositions(best11);

    const seg = (val, label) => `<button type="button" class="mm-seg${view === val ? ' active' : ''}" data-coach-view="${val}">${label}</button>`;
    const formationBtn = (name) => `<button type="button" class="mm-seg${selectedFormation === name ? ' active' : ''}" data-coach-formation="${name}">${name}${name === activeFormation ? ` ${icon('star')}` : ''}</button>`;
    let body;
    if (view === 'modulo') {
      body = buildCoachScreenPitchHtml(positioned);
    } else if (view === 'best11') {
      body = buildBest11ValuePitchHtml(positioned);
    } else {
      const usedIds = new Set(best11.map(e => e.player.id));
      const reserveRoster = (team.roster || []).filter(p => !usedIds.has(p.id));
      const reserves = getBest11(reserveRoster, selectedFormation, { ignoreForma: true });
      body = buildTitolariRiserveHtml(best11, reserves);
    }
    overlay.innerHTML = `
      <div class="mm-box coach-screen-box">
        <div class="mm-header">
          <span class="mm-title">${icon('clipboard')} ${team.name} — ${coach ? `${coach.firstName} ${coach.lastName}` : 'Nessun allenatore'}</span>
          <button class="modal-close" id="coach-screen-close" style="position:static">&times;</button>
        </div>
        <div class="coach-screen-body">
          <p style="font-size:.85rem;color:#557;margin:0 2px 10px">${formationsNote}</p>
          ${preferredFormations.length > 1 ? `<div class="mm-seg-group" style="margin-bottom:8px">${preferredFormations.map(formationBtn).join('')}</div>` : ''}
          <div class="mm-seg-group" style="margin-bottom:10px">${seg('modulo', '📐 Modulo')}${seg('best11', '🧮 Migliori 11')}${seg('roster', `${icon('cycle')} Titolari/Riserve`)}</div>
          <div class="coach-screen-view">${body}</div>
        </div>
      </div>`;
    overlay.querySelector('#coach-screen-close').addEventListener('click', () => overlay.remove());
    overlay.querySelectorAll('[data-coach-view]').forEach(btn => {
      btn.addEventListener('click', () => { view = btn.dataset.coachView; render(); });
    });
    overlay.querySelectorAll('[data-coach-formation]').forEach(btn => {
      btn.addEventListener('click', () => { selectedFormation = btn.dataset.coachFormation; render(); });
    });
  };

  render();
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
  document.body.appendChild(overlay);
}

// Posizioni generiche di un modulo (nessuna rosa reale coinvolta): un
// pallino per ogni slot di FORMATIONS[formationName], col solo ruolo (nessun
// nome giocatore/posizione specifica, dato che non c'è una rosa a cui
// riferirsi) — usata per l'anteprima moduli di un allenatore ancora da
// ingaggiare, dove non ha senso calcolare un "migliori 11" su una rosa che
// non è la sua.
function computeGenericFormationSlots(formationName) {
  const slots = FORMATIONS[formationName] || FORMATIONS['4-4-2'];
  const entries = [];
  Object.entries(slots).forEach(([role, count]) => {
    for (let i = 0; i < count; i++) entries.push({ role });
  });
  return computePitchPositions(entries);
}

function buildGenericFormationPitchHtml(formationName) {
  const dotsHtml = computeGenericFormationSlots(formationName).map(({ role, x, y }) => {
    // Nessun giocatore reale assegnato (schema generico) — mostriamo comunque
    // la prima posizione del ruolo come etichetta di riferimento dello slot,
    // stesso fallback usato da buildCoachScreenPitchHtml per gli slot vuoti.
    const posCode = ROLE_POSITIONS[role]?.[0];
    const posLabel = posCode ? (ROLE_POSITION_LABELS[posCode] || posCode) : '';
    return `<div class="pitch-dot-wrap zone-${ROLE_ZONE[role] || 'CEN'}" style="left:${x}%;top:${y}%">
      <div class="pitch-dot-role">${role}</div>
      <div class="pitch-dot">${PITCH_DOT_SVG}</div>
      ${posLabel ? `<div class="pitch-dot-pos">(${posLabel})</div>` : ''}
    </div>`;
  }).join('');
  return `<div class="pitch-container">
    ${PITCH_BG_SVG}
    ${dotsHtml}
  </div>`;
}

// Anteprima dei moduli di un allenatore NON ancora ingaggiato (candidato dal
// mercato/svincolati): mostra i suoi 2 moduli preferiti come schema generico
// (nessun "migliori 11", perché non è ancora l'allenatore della nostra
// squadra e non ha una rosa reale su cui essere valutato).
function showCoachFormationsPreview(coach) {
  const overlay = document.createElement('div');
  overlay.className = 'mm-overlay';

  const formations = coach.formations?.length ? [...new Set(coach.formations)] : ['4-4-2'];
  let selected = formations[0];

  const render = () => {
    const formationBtn = (name) => `<button type="button" class="mm-seg${selected === name ? ' active' : ''}" data-preview-formation="${name}">${name}</button>`;
    overlay.innerHTML = `
      <div class="mm-box coach-screen-box">
        <div class="mm-header">
          <span class="mm-title">${icon('clipboard')} ${coach.firstName} ${coach.lastName} — Moduli</span>
          <button class="modal-close" id="coach-preview-close" style="position:static">&times;</button>
        </div>
        ${formations.length > 1 ? `<div class="mm-seg-group" style="margin:8px 2px 10px">${formations.map(formationBtn).join('')}</div>` : `<p style="font-size:.85rem;color:#557;margin:8px 2px 10px">Modulo preferito: <strong>${selected}</strong></p>`}
        ${buildGenericFormationPitchHtml(selected)}
      </div>`;
    overlay.querySelector('#coach-preview-close').addEventListener('click', () => overlay.remove());
    overlay.querySelectorAll('[data-preview-formation]').forEach(btn => {
      btn.addEventListener('click', () => { selected = btn.dataset.previewFormation; render(); });
    });
  };

  render();
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
  document.body.appendChild(overlay);
}

// Ad inizio stagione, se il giocatore ha un allenatore, gli ricorda quale
// modulo sta effettivamente schierando (pickActiveFormation) — un promemoria
// per il mercato imminente, non un'azione da compiere.
// Mostra entrambi i moduli preferiti dell'allenatore (non solo quello
// attivo) subito dopo la finestra del presidente, PRIMA di aprire il
// mercato — così il DS decide gli acquisti sapendo già come gioca la
// squadra. `onDone` viene chiamato alla chiusura (X o click fuori),
// continuando la catena verso showManagerMarketModal.
function showSeasonFormationNotice(team, onDone) {
  if (!team || !team.coach || !team.roster?.length) { if (onDone) onDone(); return; }
  const overlay = document.createElement('div');
  overlay.className = 'mm-overlay';

  const activeFormation = pickActiveFormation(team);
  const preferredFormations = team.coach.formations?.length ? [...new Set(team.coach.formations)] : [activeFormation];
  let selected = activeFormation;
  let view = 'modulo'; // 'modulo' | 'best11' | 'roster'
  let closed = false;
  const close = () => { if (closed) return; closed = true; overlay.remove(); if (onDone) onDone(); };

  const render = () => {
    const best11 = getBest11(team.roster, selected, { ignoreForma: true });
    const positioned = computePitchPositions(best11);
    const formationBtn = (name) => `<button type="button" class="mm-seg${selected === name ? ' active' : ''}" data-notice-formation="${name}">${name}${name === activeFormation ? ` ${icon('star')}` : ''}</button>`;
    const viewBtn = (val, label) => `<button type="button" class="mm-seg${view === val ? ' active' : ''}" data-notice-view="${val}">${label}</button>`;
    let body;
    if (view === 'modulo') {
      body = buildCoachScreenPitchHtml(positioned);
    } else if (view === 'best11') {
      body = buildBest11ValuePitchHtml(positioned);
    } else {
      const usedIds = new Set(best11.map(e => e.player.id));
      const reserveRoster = team.roster.filter(p => !usedIds.has(p.id));
      const reserves = getBest11(reserveRoster, selected, { ignoreForma: true });
      body = buildTitolariRiserveHtml(best11, reserves);
    }
    overlay.innerHTML = `
      <div class="mm-box coach-screen-box">
        <div class="mm-header">
          <span class="mm-title">📢 ${team.coach.firstName} ${team.coach.lastName}</span>
          <button class="modal-close" id="season-formation-close" style="position:static">&times;</button>
        </div>
        <div class="coach-screen-body">
          <p style="font-size:.9rem;margin:0 2px 10px">"Io gioco con questi moduli, tienine conto in fase di mercato."</p>
          ${preferredFormations.length > 1 ? `<div class="mm-seg-group" style="margin-bottom:8px">${preferredFormations.map(formationBtn).join('')}</div>` : ''}
          <div class="mm-seg-group" style="margin-bottom:10px">${viewBtn('modulo', '📐 Modulo')}${viewBtn('best11', '🧮 Migliori 11')}${viewBtn('roster', `${icon('cycle')} Titolari/Riserve`)}</div>
          <div class="coach-screen-view">${body}</div>
          <button class="mm-btn mm-confirm" id="season-formation-continue" style="width:100%;margin-top:10px">Continua al mercato →</button>
        </div>
      </div>`;
    overlay.querySelector('#season-formation-close').addEventListener('click', close);
    overlay.querySelector('#season-formation-continue').addEventListener('click', close);
    overlay.querySelectorAll('[data-notice-formation]').forEach(btn => {
      btn.addEventListener('click', () => { selected = btn.dataset.noticeFormation; render(); });
    });
    overlay.querySelectorAll('[data-notice-view]').forEach(btn => {
      btn.addEventListener('click', () => { view = btn.dataset.noticeView; render(); });
    });
  };

  render();
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.body.appendChild(overlay);
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
        <select id="db-role"><option value="">Tutti i ruoli</option>${ROLES.map(r => `<option value="${r}">${r}</option>`).join('')}</select>
        <select id="db-sort"><option value="strength-desc">Forza ↓</option><option value="strength-asc">Forza ↑</option><option value="age-asc">Età ↑</option><option value="age-desc">Età ↓</option><option value="name-asc">Nome A→Z</option></select>
        <input type="text" id="db-search" placeholder="Cerca nome...">
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
        strength: team.coach.strength, team: team.name, league: teamMeta[team.name]?.league || '?', coach: team.coach
      });
    });
    freeCoaches.forEach(c => rows.push({
      name: `${c.firstName} ${c.lastName}`, age: c.age,
      strength: c.strength, team: 'Libero', league: 'free', coach: c
    }));
  } else {
    allTeams.forEach(team => {
      if (team.ds) rows.push({
        name: `${team.ds.firstName} ${team.ds.lastName}`, age: team.ds.age,
        strength: team.ds.strength, team: team.name, league: teamMeta[team.name]?.league || '?', ds: team.ds
      });
    });
    freeDirectors.forEach(d => rows.push({
      name: `${d.firstName} ${d.lastName}`, age: d.age,
      strength: d.strength, team: 'Libero', league: 'free', ds: d
    }));
  }

  if (leagueFilter) rows = rows.filter(r => r.league === leagueFilter);
  if (roleFilter && type === 'players') rows = rows.filter(r => playerCanPlayRole(r.player, roleFilter));
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
    thead = '<tr><th class="col-naz">Naz.</th><th>Nome</th><th>Ruolo</th><th>Posizione</th><th>Età</th><th>Forza</th><th>Contratto</th><th>Squadra</th><th>Lega</th></tr>';
    tbodyRows = rows.map((r, i) => {
      const c = r.player?.contract;
      const durLabel = !c ? '—' : (!c.duration || c.duration <= 0 ? `${icon('warning')} scad.` : `${c.duration}a`);
      const contractCell = c
        ? `${durLabel} · ${formatMoneyK(annualSalary(c.salary))}€/anno`
        : '—';
      const subRoleCell = r.player ? formatSubRoles(r.player) : '';
      const natCell = r.player ? formatNationality(r.player) : '';
      const roleCell = r.player ? formatRoleBadges(r.player) : (r.role || '');
      return `<tr data-idx="${i}" class="db-row-clickable"><td class="col-naz">${natCell}</td><td><span class="player-name-link">${r.name}</span></td><td>${roleCell}</td><td style="font-size:.82rem;color:#666">${subRoleCell}</td><td>${r.age}</td><td><strong>${r.strength}</strong></td><td class="db-contract">${contractCell}</td><td>${r.team}</td><td>${leagueLabel(r.league)}</td></tr>`;
    }).join('');
  } else {
    thead = '<tr><th>Nome</th><th>Età</th><th>Forza</th><th>Squadra</th><th>Lega</th></tr>';
    tbodyRows = rows.map((r, i) =>
      `<tr data-idx="${i}" class="db-row-clickable"><td><span class="player-name-link">${r.name}</span></td><td>${r.age}</td><td><strong>${r.strength}</strong></td><td>${r.team}</td><td>${leagueLabel(r.league)}</td></tr>`
    ).join('');
  }

  container.innerHTML = `<p class="db-count">${rows.length} risultati</p><table><thead>${thead}</thead><tbody>${tbodyRows}</tbody></table>`;

  // Click su riga → apre scheda carriera (giocatore, allenatore o DS)
  if (type === 'players') {
    container.querySelectorAll('tr[data-idx]').forEach(tr => {
      tr.addEventListener('click', () => openPlayerCard(rows[+tr.dataset.idx].player));
    });
  } else if (type === 'coaches') {
    container.querySelectorAll('tr[data-idx]').forEach(tr => {
      tr.addEventListener('click', () => openStaffCard(rows[+tr.dataset.idx].coach, 'Allenatore'));
    });
  } else if (type === 'directors') {
    container.querySelectorAll('tr[data-idx]').forEach(tr => {
      tr.addEventListener('click', () => openStaffCard(rows[+tr.dataset.idx].ds, 'Direttore Sportivo'));
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

  const currentTeam = allTeams.find(t => t.roster?.includes(player)) || null;
  const currentTeamName = currentTeam?.name || 'Svincolato';
  const career = player.career || [];
  const contract = player.contract || null;
  const personality = player.personality || null;

  const careerRows = career.map(entry => {
    const from = entry.joined === 0 ? 'Inizio' : `St. ${entry.joined}`;
    const to = entry.left === null ? 'attuale' : `St. ${entry.left}`;
    const dur = entry.left === null
      ? (seasonCount - entry.joined) + ' st.'
      : (entry.left - entry.joined) + ' st.';
    const fee = entry.fee === null ? '— (vivaio)' : entry.fee === 'prestito' ? '→ Prestito' : entry.fee === 'rientro' ? '← Rientro' : entry.fee === 0 ? 'Svincolato' : `${entry.fee.toFixed(1)}M€`;
    return `<tr><td>${entry.team}</td><td>${from} → ${to}</td><td>${dur}</td><td>${fee}</td></tr>`;
  }).join('');

  // Statistiche anno per anno (stagioni passate archiviate + stagione in corso)
  const isGoalkeeper = player.role === 'POR';
  const statColHeader = isGoalkeeper ? 'Gol subiti' : 'Assist';
  const statsHistory = player.statsHistory || [];
  const statRow = (label, teamName, league, appearances, goals, extra) =>
    `<tr><td>${label}</td><td>${teamName}</td><td>${league || '—'}</td><td>${appearances}</td><td>${goals}</td><td>${extra}</td></tr>`;
  const pastStatsRows = statsHistory.map(h =>
    statRow(`St. ${h.season}`, h.team, h.league, h.appearances, h.goals, isGoalkeeper ? (h.conceded ?? 0) : h.assists)
  ).join('');
  // La riga "stagione in corso" ha senso solo mentre la stagione è
  // effettivamente in corso (fasi 1-3): tra fine stagione (finishSeason,
  // fase 4) e il prossimo click su "Inizia Stagione" (fase 0), i contatori
  // live (seasonGoals ecc.) NON sono ancora stati azzerati — restano quelli
  // della stagione appena archiviata in statsHistory, e mostrarli qui
  // duplicherebbe l'ultima riga con l'etichetta della stagione successiva.
  const currentStatsRow = (seasonPhase === 1 || seasonPhase === 2 || seasonPhase === 3) ? statRow(
    `St. ${seasonCount + 1} (in corso)`, currentTeamName, teamMap[currentTeamName],
    player.seasonAppearances || 0, player.seasonGoals || 0,
    isGoalkeeper ? (player.seasonConceded || 0) : (player.seasonAssists || 0)
  ) : '';
  const statsRows = pastStatsRows + currentStatsRow;

  // Sezione contratto
  const contractHtml = contract ? (() => {
    const dur = contract.duration > 0 ? `${contract.duration} ann${contract.duration === 1 ? 'o' : 'i'}` : 'In scadenza';
    const sal = `${formatMoneyK(annualSalary(contract.salary))}€/anno`;
    const bPromo = `${formatMoneyK(contract.bonusPromotion)}€`;
    const bTitle = `${formatMoneyK(contract.bonusTitle)}€`;
    return `<div class="pc-contract">
      <div class="pc-contract-row"><span>Durata residua</span><strong>${dur}</strong></div>
      <div class="pc-contract-row"><span>Stipendio</span><strong>${sal}</strong></div>
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

  // Valori tarati con Simulatore Calcio Italiano Design System/
  // portrait-badge-tuner.html: riquadro 150px, foto all'86% con un piccolo
  // offset, stemma squadra al 75% in trasparenza su sfondo grigio chiaro.
  // Content box = FRAME_SIZE - 2*(padding+bordo) = 150-2*(6+3) = 132.
  const FRAME_SIZE = 150, FRAME_PAD = 6, FRAME_BORDER = 3;
  const CONTENT_BOX = FRAME_SIZE - 2 * (FRAME_PAD + FRAME_BORDER);
  const PHOTO_SCALE = 0.86, PHOTO_X = 10, PHOTO_Y = 10;
  const photoSizePx = Math.round(CONTENT_BOX * PHOTO_SCALE);
  const rawPortraitHtml = playerPortraitHtml(player, photoSizePx, currentTeam);
  const portraitHtml = rawPortraitHtml
    ? `<div style="position:absolute;left:calc(50% - ${photoSizePx / 2}px + ${PHOTO_X}px);top:calc(50% - ${photoSizePx / 2}px + ${PHOTO_Y}px)">${rawPortraitHtml}</div>`
    : '';
  const crestCandidates = currentTeam ? getTeamLogoCandidates(currentTeam.name, true) : [];
  const crestHtml = crestCandidates.length
    ? `<div class="pc-portrait-crest-bg"><img src="${crestCandidates[0]}" alt="" onerror="this.style.display='none'"></div>`
    : '';
  const html = `
    <div class="player-card-overlay" id="player-card-overlay">
      <div class="player-card-box${portraitHtml ? ' has-portrait' : ''}">
        <button class="player-card-close" id="close-player-card">✕</button>
        ${portraitHtml ? `<div class="pc-portrait-frame">
          ${crestHtml}
          <div class="pc-portrait-photo">${portraitHtml}</div>
        </div>` : ''}
        <div class="player-card-scroll">
        <div class="player-card-header">
          ${formatNationality(player)}
          <span class="player-card-name">${player.firstName} ${player.lastName}</span>
          ${formatRoleBadges(player)}
          ${formatSubRoles(player) ? `<span style="font-size:.8rem;color:#666">${formatSubRoles(player)}</span>` : ''}
        </div>
        <div class="player-card-stats">
          <span>Età: <strong>${player.age}</strong></span>
          <span>Forza: <strong>${player.strength}</strong></span>
          <span>Squadra: <strong>${currentTeamName}</strong></span>
          ${player.fromClub ? `<span>Proveniente da: <strong>${player.fromClub}</strong></span>` : ''}
        </div>
        <div class="player-card-stats" style="margin-top:4px">
          <span>${icon('ball')} Gol: <strong>${player.seasonGoals || 0}</strong></span>
          <span>🅰️ Assist: <strong>${player.seasonAssists || 0}</strong></span>
          <span>🟨 Amm: <strong>${player.yellowCards || 0}</strong></span>
          ${(player.injuryMatchesLeft || 0) > 0 ? `<span style="color:#e05050">🤕 Infortun. (<strong>${player.injuryMatchesLeft}</strong> gg)</span>` : ''}
          ${(player.suspendedMatchesLeft || 0) > 0 ? `<span style="color:#e05050">${icon('banned')} Squalif. (<strong>${player.suspendedMatchesLeft}</strong> gg)</span>` : ''}
        </div>
        <div class="pc-sections">
          <div class="pc-section">
            <h4>Contratto</h4>${contractHtml}
          </div>
          <div class="pc-section">
            <h4>Personalità</h4>${personalityHtml}
          </div>
        </div>
        <h4>Statistiche per stagione</h4>
        <table class="player-card-table">
          <thead><tr><th>Stagione</th><th>Squadra</th><th>Serie</th><th>Presenze</th><th>Gol</th><th>${statColHeader}</th></tr></thead>
          <tbody>${statsRows}</tbody>
        </table>
        <h4>Carriera</h4>
        ${career.length === 0
      ? '<p class="db-empty">Nessuna storia disponibile</p>'
      : `<table class="player-card-table">
               <thead><tr><th>Squadra</th><th>Periodo</th><th>Durata</th><th>Fee</th></tr></thead>
               <tbody>${careerRows}</tbody>
             </table>`}
        </div>
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

// Scheda di carriera per allenatori e DS (AI o umano): piazzamento/note anno per
// anno, comprese le stagioni passate da svincolato. Riusa lo stile della scheda
// giocatore (stessa altezza massima + scorrimento interno).
function openStaffCard(staff, roleLabel) {
  if (!staff) return;
  const allTeams = [...serieA, ...serieB, ...serieC];
  const currentTeam = allTeams.find(t => t.coach === staff || t.ds === staff);
  const currentTeamName = currentTeam ? currentTeam.name : 'Svincolato';
  const history = staff.isHuman ? dsCareer.history : (staff.history || []);

  const historyRows = history.map(h => {
    const teamCell = h.team ? `${h.team} (Serie ${h.league})` : '<em>Svincolato</em>';
    const rankCell = h.rank ? `${h.rank}°${h.objective ? ` <span style="font-size:.78rem;color:#666">(${h.objective})</span>` : ''}` : '—';
    return `<tr><td>St. ${h.season}</td><td>${teamCell}</td><td>${rankCell}</td><td>${h.note || ''}</td></tr>`;
  }).join('');

  const html = `
    <div class="player-card-overlay" id="staff-card-overlay">
      <div class="player-card-box">
        <button class="player-card-close" id="close-staff-card">✕</button>
        <div class="player-card-scroll">
        <div class="player-card-header">
          <span class="player-card-name">${staff.firstName} ${staff.lastName}</span>
          <span class="player-card-role">${roleLabel}</span>
        </div>
        <div class="player-card-stats">
          <span>Età: <strong>${staff.age}</strong></span>
          <span>Forza: <strong>${staff.strength}</strong></span>
          <span>Squadra: <strong>${currentTeamName}</strong></span>
        </div>
        <h4>Carriera per stagione</h4>
        ${history.length === 0
      ? '<p class="db-empty">Nessuna storia disponibile</p>'
      : `<table class="player-card-table">
               <thead><tr><th>Stagione</th><th>Squadra</th><th>Piazzamento</th><th>Note</th></tr></thead>
               <tbody>${historyRows}</tbody>
             </table>`}
        </div>
      </div>
    </div>`;

  document.body.insertAdjacentHTML('beforeend', html);
  document.getElementById('close-staff-card').addEventListener('click', () => {
    document.getElementById('staff-card-overlay').remove();
  });
  document.getElementById('staff-card-overlay').addEventListener('click', e => {
    if (e.target.id === 'staff-card-overlay') document.getElementById('staff-card-overlay').remove();
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
    // Pool dormiente di Serie D: nessuna classifica/calendario da salvare,
    // solo l'elenco squadre (con rosa/staff, sempre vuoti finché dormono).
    serieD: serieD.map(serializeTeam),
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
    // Serie D è un pool dormiente (mai simulato): un salvataggio precedente
    // all'introduzione della feature non ha snap.serieD — in quel caso si
    // lascia il pool di bootstrap già inizializzato all'avvio dello script,
    // invece di far fallire il caricamento.
    const newD = (snap.serieD && snap.serieD.length) ? snap.serieD.map(reviveTeam) : null;

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
    if (newD) serieD = newD;
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
    renewalInterest = new Map();
    pendingForeignScoutTargets = [];

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
    openAllLeagueSections();
    return;
  }

  // Fase 4 = mercato estivo in corso (dalla fine della stagione precedente
  // fino all'inizio della prossima, vedi il click handler di simulaStagione):
  // se si ricarica/riprende la partita in questa fase, lo sfondo deve
  // mostrare la classifica di previsione/obiettivi, non quella finale della
  // stagione appena conclusa (standingsA/B/C, ancora quella finché il
  // mercato non genera il nuovo calendario) — stesso calcolo del click
  // handler (team.leagueLevel riflette ancora la lega di provenienza).
  if (seasonPhase === 4) {
    const oldStandingsByLeague = { A: standingsA, B: standingsB, C: standingsC };
    displayPreSeasonStandings('serieA', computePreseasonPrevisioni(serieA, 'A', oldStandingsByLeague), true);
    displayPreSeasonStandings('serieB', computePreseasonPrevisioni(serieB, 'B', oldStandingsByLeague), true);
    displayPreSeasonStandings('serieC', computePreseasonPrevisioni(serieC, 'C', oldStandingsByLeague), true);
    openAllLeagueSections();
    if (s_coppaResult) displayCoppaItalia(s_coppaResult);
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
    isHuman: true, history: dsCareer.history,
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
  // Obiettivo/previsione anche alla primissima sessione di mercato: non
  // esiste ancora una stagione precedente da cui derivare un piazzamento,
  // quindi si passa un oldStandingsByLeague vuoto — computePreseasonPrevisioni
  // ricade già sul suo fallback neutro per il piazzamento storico (vedi
  // placementRank, (N+1)/2), quindi la previsione dipende solo da forza
  // rosa e budget, esattamente come richiesto.
  setObjectives(computePreseasonPrevisioni(serieA, 'A', {}), 'A');
  setObjectives(computePreseasonPrevisioni(serieB, 'B', {}), 'B');
  setObjectives(computePreseasonPrevisioni(serieC, 'C', {}), 'C');
  // Monte ingaggi anche per le CPU alla primissima sessione: briefPresidentBudget
  // viene chiamata ogni stagione successiva per tutte le CPU (STEP 6 di
  // updateTeamStrengths), ma qui è la primissima volta in assoluto — senza
  // questo, team.wageBudgetCap resta undefined e la riga "Monte ingaggi"
  // nella scheda squadra non compare per nessuna CPU. Il player la riceve
  // già da hirePlayerAsDS.
  [...serieA, ...serieB, ...serieC].forEach(t => { if (t !== playerTeam) briefPresidentBudget(t); });
  // Alla primissima sessione il player erediterebbe automaticamente
  // l'allenatore che la squadra aveva già da CPU, senza mai poter scegliere
  // (needsCoach resta sempre falso). Liberandolo qui (torna tra gli
  // svincolati, disponibile anche lui come opzione tra i candidati) si
  // forza una scelta vera tramite lo stesso meccanismo già esistente
  // ("Scegli un allenatore dalla tab Panchina", mm-confirm bloccato finché
  // non lo fai) — nessuna finestra nuova, solo un vero bivio a inizio carriera.
  if (playerTeam.coach) {
    freeCoaches.push(playerTeam.coach);
    playerTeam.coach = null;
  }
  showPresidentBriefingModal(playerTeam, () => {
    showSeasonFormationNotice(playerTeam, () => {
      // Prima di questa correzione, la primissima sessione di mercato (a
      // inizio carriera) andava dritta alla sessione libera del player,
      // senza che nessuna CPU giocasse il proprio turno — unico punto del
      // gioco in cui il mercato a turni non girava affatto. Ora si comporta
      // come ogni mercato estivo successivo: reset di sessione, vetrina "Sul
      // mercato", poi lo scheduler a turni per forza DS (il player incluso
      // al suo posto), e solo a schedulazione conclusa la sessione libera.
      pendingAIOffers = [];
      pendingForeignScoutTargets = [];
      mmSessionRenewalDecisions = new Map();
      mmSessionOfferDecisions = new Map();
      mmSessionBoughtIds = new Set();
      mmSessionSoldIds = new Set();
      sessionMovedPlayers = new Set();
      currentMarketIsWinter = false;
      mmSessionBuyConsent = new Map();
      const allTeams = [...serieA, ...serieB, ...serieC];
      pendingTransferMarket = buildVoluntaryTransferListing(allTeams);
      // §3 REGOLE_CALCIOMERCATO: nessuna sessione libera dopo lo scheduler —
      // il player ha già avuto il suo turno reale (o i suoi turni, se ha
      // continuato a giocare) dentro runTurnBasedMarket; a schedulazione
      // conclusa il mercato è semplicemente finito.
      runTurnBasedMarket(() => {
        recalculateTeamStrength(playerTeam);
        displayTransferLog();
        saveGame();
      });
    });
  });
}

function leaveTeamAsDS() {
  // Ricorda la squadra appena lasciata: generateDSJobOffers la esclude dalle
  // prossime offerte (non ha senso corteggiarti di nuovo un secondo dopo che
  // te ne sei andato). Si aggiorna a ogni "partenza", quindi non blocca per
  // sempre quella squadra — solo finché non se ne lascia un'altra.
  if (playerTeam && dsCareer) dsCareer.lastTeamName = playerTeam.name;
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

// Rank di un club nella propria lega (per forza) — usato sia per l'etichetta
// obiettivo sia per il tier di ambizione delle offerte di lavoro. Calcolato al
// volo (non da team.objective, valorizzato solo da setObjectives a inizio
// stagione) così resta valido anche prima che la prima stagione sia partita.
function getLeagueRankInfo(team) {
  const league = team.leagueLevel === 'A' ? serieA : team.leagueLevel === 'B' ? serieB : serieC;
  const rank = [...league].sort((a, b) => b.strength - a.strength).indexOf(team) + 1;
  return { rank, n: league.length };
}
// Tier di ambizione DENTRO la propria lega (1=Salvezza .. 4=Titolo/Promozione),
// stessa logica di setObjectives. Serie A resta a fasce percentuali (top3 /
// 40% / 75%); Serie B e C (20 squadre ciascuna) usano invece fasce fisse da 5
// posizioni, su richiesta esplicita dell'utente.
function objectiveTierFromRank(rank, n, league) {
  if (league === 'A') {
    if (rank <= 3) return 4;
    if (rank <= Math.floor(n * 0.4)) return 3;
    if (rank <= Math.floor(n * 0.75)) return 2;
    return 1;
  }
  if (rank <= 5) return 4;
  if (rank <= 10) return 3;
  if (rank <= 15) return 2;
  return 1;
}
// Se team.objective è già assegnato (Previsioni/setObjectives, FASE 4 —
// forza+budget+piazzamento, vero per praticamente tutta la partita dopo il
// primissimo mercato) lo si usa direttamente: obiettivo e "ambizione" devono
// essere la stessa identica cosa ovunque nel gioco, offerte di lavoro del DS
// umano comprese — non due stime scollegate. Il fallback a sola forza
// (objectiveTierFromRank/getLeagueRankInfo) resta solo per il caso limite in
// cui viene chiamata prima che una stagione abbia mai assegnato un obiettivo.
function estimateObjectiveLabel(team) {
  if (team.objective) return team.objective.description;
  const { rank, n } = getLeagueRankInfo(team);
  const tier = objectiveTierFromRank(rank, n, team.leagueLevel);
  if (team.leagueLevel !== 'A') return tier === 4 ? 'Promozione' : tier === 3 ? 'Metà alta' : tier === 2 ? 'Metà classifica' : 'Salvezza';
  return tier === 4 ? 'Titolo/top 3' : tier === 3 ? 'Metà alta' : tier === 2 ? 'Metà classifica' : 'Salvezza';
}
// Converte la descrizione di team.objective (già forza+budget+piazzamento)
// nel tier 1-4 usato da estimateObjectiveGlobalTier — stesse 4 fasce di
// objectiveTierFromRank, solo lette dall'obiettivo invece che ricalcolate.
function objectiveTierFromDescription(description, league) {
  if (league === 'A') {
    if (description === 'Titolo/top 3') return 4;
    if (description === 'Metà alta') return 3;
    if (description === 'Metà classifica') return 2;
    return 1; // Salvezza
  }
  if (description === 'Promozione') return 4;
  if (description === 'Metà alta') return 3;
  if (description === 'Metà classifica') return 2;
  return 1; // Salvezza
}
// Tier di ambizione GLOBALE (1-12: Salvezza C=1 .. Titolo/top3 A=12): combina
// lega (C=+0, B=+4, A=+8) e tier interno alla lega (1-4). Legge team.objective
// quando disponibile (vedi nota sopra), altrimenti stima al volo per sola
// forza (objectiveTierFromRank) — unico caso: prima che una stagione abbia
// mai assegnato un obiettivo.
// Usa la lega REALE (currentLeagueOf), non team.leagueLevel: quest'ultimo
// resta deliberatamente "vecchio" tra le promozioni/retrocessioni di fine
// stagione e il mercato (vedi handlePromotionsAndRelegations). Una squadra
// appena promossa da C a B in quello stesso ciclo aveva già un obiettivo B
// genuino (assegnato da setObjectives sul nuovo raggruppamento) ma
// leagueBase calcolato ancora su 'C' (0 invece di 4) — un "Salvezza B" reale
// (tier globale 5) finiva quindi classificato come tier 1, esattamente la
// stessa fascia di un DS con reputazione da Serie C: risultato, offerte di
// lavoro da squadre di B mostrate a un DS che avrebbe dovuto vederne solo
// dalla C.
function estimateObjectiveGlobalTier(team) {
  const league = currentLeagueOf(team);
  const leagueBase = league === 'A' ? 8 : league === 'B' ? 4 : 0;
  if (team.objective) {
    return leagueBase + objectiveTierFromDescription(team.objective.description, league);
  }
  const { rank, n } = getLeagueRankInfo(team);
  return leagueBase + objectiveTierFromRank(rank, n, league);
}

// Quanto è aggressiva una squadra sul mercato (moltiplicatore 0.5-1.6 sulle
// soglie di partecipazione del mercato CPU, vedi STEP 6b/runWinterAITransfers):
// combina ambizione di stagione (estimateObjectiveGlobalTier, 1-12) e
// generosità del presidente. NON tocca i tetti budget/monte ingaggi esistenti
// (quelli restano governati da briefPresidentBudget) — modula solo quanto
// spesso la squadra tenta un acquisto.
function getMarketAggressiveness(team) {
  const tier = estimateObjectiveGlobalTier(team);
  const gen = team.president?.personality?.generosity ?? 50;
  const tierFactor = 0.70 + (tier - 1) / 11 * 0.60; // 0.70 (tier1) .. 1.30 (tier12)
  const genFactor = 0.85 + gen / 100 * 0.30;         // 0.85 .. 1.15
  // Il rumore del DS (vedi pickBestTransferTarget) prima agiva solo sulla
  // scelta finale tra candidati già filtrati: un DS scarso non era mai meno
  // presente sul mercato, solo leggermente meno preciso. Qui incide anche
  // sulla proattività: un DS debole si presenta un po' meno spesso alle
  // occasioni (dsFactor 0.80 a DS 0), uno forte è invariato (dsFactor 1.00 a
  // DS 100) — il filtro per bisogno reale resta comunque a monte, quindi
  // anche un DS scarso non salta MAI un'occasione davvero necessaria oltre
  // questo margine.
  const dsStrength = team.ds?.strength ?? 50;
  const dsFactor = 0.80 + dsStrength / 100 * 0.20;
  return Math.max(0.5, Math.min(1.6, tierFactor * genFactor * dsFactor));
}

// Genera le offerte di lavoro per il DS umano in base alla reputazione.
// La reputazione parte da 40 (JOB_OFFER_REP_BASE) e il tetto è 100: un range
// di 60 punti diviso in scaglioni da 5 (JOB_OFFER_REP_STEP) fa esattamente 12
// scaglioni, uno per ciascuno dei 12 obiettivi possibili (4 per lega). Ogni
// scaglione di reputazione corrisponde quindi a UN SOLO obiettivo — sotto i
// 40 si resta fermi al primo scaglione (Salvezza di Serie C).
const JOB_OFFER_REP_BASE = 40;
const JOB_OFFER_REP_STEP = 5;
function getCurrentObjectiveTier(rep) {
  return Math.max(1, Math.min(12, Math.floor((rep - JOB_OFFER_REP_BASE) / JOB_OFFER_REP_STEP) + 1));
}

// Numero di offerte mostrate quando il DS cerca lavoro (avvio carriera,
// disoccupazione, sondaggio di mercato, corteggiamento AI) — tutte squadre
// del tier di obiettivo corrispondente alla reputazione attuale.
const MIN_DS_JOB_OFFERS = 5;

// team.leagueLevel resta deliberatamente "vecchio" (lega di provenienza, vedi
// i commenti in handlePromotionsAndRelegations/updateTeamStrengths) per tutta
// la finestra tra le promozioni/retrocessioni di fine stagione e il mercato —
// necessario per i calcoli interni (computePreseasonPrevisioni), ma SBAGLIATO
// per l'etichetta mostrata all'utente in questa stessa finestra (es. una
// squadra appena promossa in A compariva ancora con badge "Serie B" nelle
// offerte di lavoro). Per la sola visualizzazione va usata l'appartenenza
// EFFETTIVA agli array di lega, già aggiornata a questo punto.
function currentLeagueOf(team) {
  if (serieA.includes(team)) return 'A';
  if (serieB.includes(team)) return 'B';
  if (serieC.includes(team)) return 'C';
  return 'D';
}

function generateDSJobOffers() {
  const rep = dsCareer.reputation;
  const currentTier = getCurrentObjectiveTier(rep);
  const allTeamsPool = [...serieA, ...serieB, ...serieC];
  // Nota: la reputazione del DS umano e la forza dei DS delle squadre CPU
  // sono deliberatamente SVINCOLATE — nessun confronto tra le due, su
  // richiesta esplicita dell'utente ("non ci sono cose che valorizzano l'una
  // o l'altra"). L'unico criterio di idoneità resta l'obiettivo/tier della
  // squadra; l'assegnazione dei DS CPU alle squadre resta quella esistente
  // ("per riempimento"), invariata.
  const eligible = t => t !== playerTeam && !(t.ds && t.ds.isHuman)
    // Non riproporre la squadra appena lasciata (vedi leaveTeamAsDS).
    && t.name !== dsCareer.lastTeamName;

  const byTier = new Map(); // tier (1-12) → squadre idonee con quell'obiettivo
  allTeamsPool.filter(eligible).forEach(t => {
    const tier = estimateObjectiveGlobalTier(t);
    if (!byTier.has(tier)) byTier.set(tier, []);
    byTier.get(tier).push(t);
  });

  const offers = [];
  const alreadyPicked = new Set();
  const pullFromTier = (tier) => {
    const list = [...(byTier.get(tier) || [])];
    shuffleArray(list);
    for (const t of list) {
      if (offers.length >= MIN_DS_JOB_OFFERS) break;
      if (alreadyPicked.has(t.name)) continue;
      offers.push(t);
      alreadyPicked.add(t.name);
    }
  };

  pullFromTier(currentTier);
  // Alcuni tier hanno pochissime squadre idonee (es. "Titolo/top3" ne ha solo
  // 3 per lega contro le 5 offerte richieste, oppure il filtro sulla forza
  // del DS avversario — sopra — ne esclude molte in una partita già avviata,
  // o la squadra appena lasciata era proprio nel tier corrente): se il tier
  // corrente non basta, si ripesca dal tier adiacente più vicino (prima
  // quello sotto, obiettivo meno ambizioso, poi quello sopra), allargando il
  // raggio finché non si arriva a 5. Verso l'ALTO non si supera MAI la lega
  // del tier corrente (i tier 1-4 sono la Serie C, 5-8 la B, 9-12 la A: da un
  // tier di Serie B non si deve mai scavalcare fino alla Serie A); verso il
  // BASSO invece si può scendere anche nella lega inferiore, se necessario
  // per arrivare comunque a 5 offerte (es. rep 63 → tier "Salvezza B": se
  // mancano candidati lì, si scende a "Promozione C", non si sale mai a A).
  const leagueTierHigh = currentTier <= 4 ? 4 : currentTier <= 8 ? 8 : 12;
  for (let dist = 1; offers.length < MIN_DS_JOB_OFFERS && dist <= 11; dist++) {
    if (currentTier - dist >= 1) pullFromTier(currentTier - dist);
    if (offers.length < MIN_DS_JOB_OFFERS && currentTier + dist <= leagueTierHigh) pullFromTier(currentTier + dist);
  }
  // Rete di sicurezza estrema (in pratica non dovrebbe mai scattare, dato che
  // ogni lega ha 20 squadre e le uniche esclusioni sono playerTeam/DS umano/
  // squadra appena lasciata): se il ripesco regolare non ha comunque trovato
  // NESSUNA squadra, si ignora eccezionalmente il limite di lega pur di
  // garantire almeno un'offerta, invece di lasciare il DS bloccato per sempre.
  if (offers.length === 0) {
    const fallback = allTeamsPool.filter(eligible)
      .sort((a, b) => Math.abs(estimateObjectiveGlobalTier(a) - currentTier) - Math.abs(estimateObjectiveGlobalTier(b) - currentTier));
    for (const t of fallback) {
      if (offers.length >= MIN_DS_JOB_OFFERS) break;
      offers.push(t);
    }
  }

  offers.sort((a, b) => getTeamPrestige(b.name) - getTeamPrestige(a.name) || b.strength - a.strength);

  return offers.map(team => ({
    team,
    years: 1 + Math.floor(Math.random() * 3),
    objectiveLabel: estimateObjectiveLabel(team),
  }));
}

function showJobOffersModal(offers, onDone) {
  const overlay = document.createElement('div');
  overlay.className = 'mm-overlay';

  const offerRows = offers.map((o, i) => {
    return `<div class="mm-row">
      <div class="mm-pinfo">
        ${teamLogoOrJerseyHtml(o.team, false, false)}
        <span class="mm-name">${o.team.name}</span>
        <span class="mm-badge">Serie ${currentLeagueOf(o.team)}</span>
        <span>⚡${o.team.strength}</span>
        <span>${icon('money')}${(o.team.budget || 0).toFixed(0)}M€</span>
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

  wireTeamLogoFallbacks(overlay);

  overlay.querySelectorAll('[data-offer-idx]').forEach(btn => {
    btn.addEventListener('click', () => {
      const o = offers[+btn.dataset.offerIdx];
      hirePlayerAsDS(o.team, o.years);
      transferLog.push(`${icon('stats')} <strong>${o.team.name}</strong> assume <em>${dsCareer.firstName} ${dsCareer.lastName}</em> come nuovo DS (${o.years} anni, obiettivo: ${o.objectiveLabel})`);
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
// onAccepted (opzionale) viene chiamato SOLO se il DS accetta davvero una
// nuova squadra — mai su "Resta al club attuale" o chiusura — per permettere
// al chiamante di saltare direttamente alla finestra del presidente della
// nuova squadra invece di lasciare per aria la valutazione della vecchia.
function showJobMarketBrowserModal(onAccepted) {
  const offers = getSeasonJobOffers();
  const overlay = document.createElement('div');
  overlay.className = 'mm-overlay';

  const offerRows = offers.map((o, i) => {
    return `<div class="mm-row">
      <div class="mm-pinfo">
        ${teamLogoOrJerseyHtml(o.team, false, false)}
        <span class="mm-name">${o.team.name}</span>
        <span class="mm-badge">Serie ${currentLeagueOf(o.team)}</span>
        <span>⚡${o.team.strength}</span>
        <span>${icon('money')}${(o.team.budget || 0).toFixed(0)}M€</span>
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
        <span class="mm-title">${icon('search')} Sondaggio di mercato — ${dsCareer.firstName} ${dsCareer.lastName} <span style="opacity:.7">(Rep ${dsCareer.reputation})</span></span>
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

  wireTeamLogoFallbacks(overlay);

  overlay.querySelectorAll('[data-offer-idx]').forEach(btn => {
    btn.addEventListener('click', () => {
      const o = offers[+btn.dataset.offerIdx];
      const oldTeam = playerTeam;
      if (oldTeam && !confirm(`Sei sicuro di voler lasciare ${oldTeam.name} per ${o.team.name}?`)) return;
      if (oldTeam) {
        resolvePendingRenewalsAI(oldTeam);
        transferLog.push(`${icon('stats')} <em>${dsCareer.firstName} ${dsCareer.lastName}</em> lascia <strong>${oldTeam.name}</strong> per <strong>${o.team.name}</strong>`);
        leaveTeamAsDS();
      }
      hirePlayerAsDS(o.team, o.years);
      transferLog.push(`${icon('stats')} <strong>${o.team.name}</strong> assume <em>${dsCareer.firstName} ${dsCareer.lastName}</em> come nuovo DS (${o.years} anni, obiettivo: ${o.objectiveLabel})`);
      overlay.remove();
      const dsModal = document.getElementById('ds-career-overlay');
      if (dsModal) dsModal.remove();
      if (onAccepted) onAccepted();
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
  const sorted = Object.entries(st).map(([name, s]) => ({ name, ...s })).sort(compareStandingsRows);
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
    // Ora vale anche per la C: retrocedere dalla C significa finire nel pool
    // dormiente di Serie D (non giocabile) — stesso malus di reputazione di
    // qualunque altra retrocessione, ma con un esito narrativo diverso (vedi
    // relegatedToD sotto e il ramo dedicato in showSeasonEvaluationModal).
    relegated: rank > numTeams - 4,
    relegatedToD: rank > numTeams - 4 && playerTeam.leagueLevel === 'C',
  };
}

function computeReputationDelta(d) {
  let delta = 0;
  const maxRank = d.objective.maxRank || d.numTeams;
  if (d.wonTitle) delta += 8;
  if (d.promoted) delta += 15; // due promozioni consecutive C->A: 40 + 15 + 15 = 70, realistico
  if (d.wonCup) delta += 4;
  if (d.rank <= maxRank - 3) delta += 4;
  else if (d.rank <= maxRank) delta += 2;
  else if (d.rank <= maxRank + 3) delta -= 2;
  else delta -= 5;
  if (d.relegated) delta -= 8;
  return delta;
}

// Tetto di reputazione per la lega in cui si è giocata la stagione appena
// conclusa (anche in caso di promozione: il tetto è quello della lega di
// PARTENZA, non di quella d'arrivo). Se la reputazione è già oltre il tetto,
// una stagione positiva non la fa crescere ulteriormente — un calo resta
// sempre possibile, il tetto vincola solo la crescita.
const DS_REP_LEAGUE_CAP = { C: 65, B: 80, A: 100 };
function applyReputationCap(oldRep, delta, league) {
  const cap = DS_REP_LEAGUE_CAP[league] ?? 100;
  if (delta > 0) return oldRep >= cap ? oldRep : Math.min(cap, oldRep + delta);
  return oldRep + delta;
}

// Modal di valutazione di fine stagione: reputazione, esonero, rinnovo, corteggiamenti
function showSeasonEvaluationModal(d, onDone) {
  seasonJobOffersCache = null; // nuova stagione: le squadre disponibili si ripescano da zero, una sola volta
  const oldRep = dsCareer.reputation;
  const delta = computeReputationDelta(d);
  dsCareer.reputation = Math.max(35, Math.min(100, applyReputationCap(oldRep, delta, d.league)));
  dsCareer.age++;
  if (playerTeam.ds && playerTeam.ds.isHuman) {
    playerTeam.ds.strength = dsCareer.reputation;
    playerTeam.ds.age = dsCareer.age;
  }
  dsCareer.contractYears--;

  const maxRank = d.objective.maxRank || d.numTeams;
  const overperformed = d.rank <= maxRank - 3;
  const failedBadly = d.rank > maxRank + 4;
  const fired = failedBadly && Math.random() < getPresidentFireChance(playerTeam.president, 0.45);
  const expired = !fired && dsCareer.contractYears <= 0;
  const renewalOffered = expired && d.rank <= maxRank + 2;
  const renewYears = 1 + Math.floor(Math.random() * 3);

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

  const notConfirmed = expired && !renewalOffered && !fired;
  const note = [
    d.wonTitle ? `${trophyIconHtml('scudetto', 'Scudetto')} Scudetto` : '',
    d.wonCup ? `${trophyIconHtml('coppa', 'Coppa Italia')} Coppa Italia` : '',
    d.promoted ? `${promoRelegIconHtml('promozione', 'Promozione')} Promozione` : '',
    d.relegated ? `${promoRelegIconHtml('retrocessione', 'Retrocessione')} Retrocessione` : '',
    fired ? `${icon('warning')} Esonerato` : '',
    notConfirmed ? `${icon('warning')} Non confermato` : '',
  ].filter(Boolean).join(' · ');
  dsCareer.history.push({
    season: seasonCount,
    team: playerTeam.name,
    league: d.league,
    rank: d.rank,
    objective: d.objective.description,
    budget: +playerTeam.budget.toFixed(1),
    reputation: dsCareer.reputation,
    fired,
    notConfirmed,
    note,
  });

  const teamName = playerTeam.name;
  const appliedDelta = dsCareer.reputation - oldRep;
  const repColor = appliedDelta > 0 ? '#16a34a' : appliedDelta < 0 ? '#ef4444' : '#888';
  const capNote = (delta > 0 && appliedDelta < delta)
    ? ` <span style="font-size:.78rem;color:#888">(tetto Serie ${d.league}: ${DS_REP_LEAGUE_CAP[d.league]})</span>` : '';
  const repLine = `Reputazione: <strong>${oldRep}</strong> → <strong style="color:${repColor}">${dsCareer.reputation}</strong> (${appliedDelta >= 0 ? '+' : ''}${appliedDelta})${capNote}`;

  let outcomeHtml, footerHtml;
  if (d.relegatedToD) {
    // Retrocedere dalla C significa finire nel pool dormiente di Serie D
    // (mai simulato) — non ha senso "restare"/rinnovare/negoziare un
    // corteggiamento, il club semplicemente non fa più parte del campionato
    // gestibile: stesso esito narrativo dell'esonero, unica via è il mercato
    // del lavoro. Questo ramo ha sempre la precedenza su fired/expired/
    // poachOffer, anche se quei flag risultassero comunque veri.
    outcomeHtml = `<p style="color:#b91c1c;font-weight:700">${icon('warning')} <strong>${teamName}</strong> è retrocesso in Serie D: la tua avventura qui finisce.</p>`;
    footerHtml = `<button class="mm-btn mm-confirm" data-outcome="offers">Vedi le offerte →</button>`;
  } else if (fired) {
    outcomeHtml = `<p style="color:#b91c1c;font-weight:700">${icon('warning')} La società ti ha esonerato: obiettivo mancato di troppo.</p>`;
    footerHtml = `<button class="mm-btn mm-confirm" data-outcome="offers">Vedi le offerte →</button>`;
  } else if (expired && renewalOffered) {
    outcomeHtml = `<p>${icon('clipboard')} Il tuo contratto è scaduto. La società è soddisfatta e ti offre il <strong>rinnovo per ${renewYears} anni</strong>.</p>`;
    footerHtml = `
      <button class="mm-btn mm-green" data-outcome="renew">Rinnova (${renewYears} anni)</button>
      <button class="mm-btn mm-red" data-outcome="offers">Lascia il club — vedi offerte</button>`;
  } else if (expired) {
    outcomeHtml = `<p style="color:#b91c1c">${icon('clipboard')} Il tuo contratto è scaduto e la società <strong>non ti rinnova</strong>.</p>`;
    footerHtml = `<button class="mm-btn mm-confirm" data-outcome="offers">Vedi le offerte →</button>`;
  } else if (poachOffer) {
    outcomeHtml = `<p>📨 <strong>${poachOffer.team.name}</strong> (Serie ${currentLeagueOf(poachOffer.team)}) ti offre un contratto di <strong>${poachOffer.years} anni</strong> — obiettivo: ${poachOffer.objectiveLabel}.</p>`;
    footerHtml = `
      <button class="mm-btn mm-green" data-outcome="poach">Accetta e cambia squadra</button>
      <button class="mm-btn mm-blue" data-outcome="stay">Resta a ${teamName}</button>`;
  } else {
    outcomeHtml = `<p>Contratto residuo: <strong>${dsCareer.contractYears} ann${dsCareer.contractYears === 1 ? 'o' : 'i'}</strong>. Si continua.</p>`;
    footerHtml = `
      <button class="mm-btn" data-outcome="browse">${icon('search')} Guarda le squadre disponibili</button>
      <button class="mm-btn mm-confirm" data-outcome="stay">Continua →</button>`;
  }

  const overlay = document.createElement('div');
  overlay.className = 'mm-overlay';
  overlay.innerHTML = `
    <div class="mm-box" style="max-width:560px">
      <div class="mm-header">
        <span class="mm-title">${icon('stats')} Valutazione stagione — ${teamName}</span>
      </div>
      <div class="mm-content">
        <p>Obiettivo: <strong>${d.objective.description}</strong> — Risultato: <strong>${d.rank}° su ${d.numTeams}</strong> (Serie ${d.league})</p>
        ${note && !fired ? `<p>${note}</p>` : note && fired ? `<p>${note.replace(` · ${icon('warning')} Esonerato`, '')}</p>` : ''}
        <p>${repLine}</p>
        ${outcomeHtml}
      </div>
      <div class="mm-footer" style="justify-content:flex-end;gap:8px">${footerHtml}</div>
    </div>`;

  overlay.querySelectorAll('[data-outcome]').forEach(btn => {
    btn.addEventListener('click', () => {
      const outcome = btn.dataset.outcome;
      if (outcome === 'browse') {
        // Non chiude questa finestra finché il player resta al club attuale
        // (il sondaggio si apre sopra, "Continua" resta disponibile sotto).
        // Se invece accetta una nuova squadra dal sondaggio, la valutazione
        // di QUESTA stagione (per il club appena lasciato) non ha più senso
        // da mostrare: si chiude insieme e si passa dritti al presidente
        // della nuova squadra, invece di lasciare un "Continua" fantasma.
        showJobMarketBrowserModal(() => {
          overlay.remove();
          onDone();
        });
        return;
      }
      overlay.remove();
      if (outcome === 'renew') {
        dsCareer.contractYears = renewYears;
        transferLog.push(`${icon('stats')} <em>${dsCareer.firstName} ${dsCareer.lastName}</em> rinnova come DS di <strong>${teamName}</strong> per ${renewYears} anni`);
        showMyTeamBadge();
        onDone();
      } else if (outcome === 'offers') {
        if (d.relegatedToD) transferLog.push(`${icon('stats')} <strong>${teamName}</strong> retrocede in Serie D — il DS <em>${dsCareer.firstName} ${dsCareer.lastName}</em> è automaticamente svincolato`);
        else if (fired) transferLog.push(`${icon('stats')} <strong>${teamName}</strong> ha esonerato il DS <em>${dsCareer.firstName} ${dsCareer.lastName}</em>`);
        else transferLog.push(`${icon('stats')} <em>${dsCareer.firstName} ${dsCareer.lastName}</em> lascia <strong>${teamName}</strong> a fine contratto`);
        const oldTeam = playerTeam;
        resolvePendingRenewalsAI(oldTeam);
        leaveTeamAsDS();
        showJobOffersModal(generateDSJobOffers(), onDone);
      } else if (outcome === 'poach') {
        transferLog.push(`${icon('stats')} <em>${dsCareer.firstName} ${dsCareer.lastName}</em> lascia <strong>${teamName}</strong> per <strong>${poachOffer.team.name}</strong>`);
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
    `<tr><td>St. ${h.season}</td><td>${h.team || '—'}</td><td>${h.league ? `Serie ${h.league}` : '—'}</td><td>${h.objective || '—'}</td><td>${h.rank ? `${h.rank}°` : '—'}</td><td>${h.note || ''}</td></tr>`
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
          <button class="mm-btn mm-confirm" id="dsc-close">Chiudi</button>
        </span>
      </div>
    </div>`;
  overlay.querySelector('#dsc-close').addEventListener('click', () => overlay.remove());
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
  document.body.appendChild(overlay);
}

// ─── AVVIO CARRIERA / SELEZIONE SQUADRA ───────────────────────────────────────
function showTeamSelectionScreen() {
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
      <h1>${icon('ball')} Simulatore Calcio Italiano</h1>
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
        reputation: 40, teamName: null, contractYears: 0,
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
          ${teamLogoOrJerseyHtml(t, false, false)}<span>${t.name}</span>
        </button>`
      ).join('');
      return `<div class="ts-league-col"><h2>${title}</h2>${btns}</div>`;
    };
    overlay.innerHTML = `
      <h1>${icon('ball')} Scegli la tua prima squadra</h1>
      <p>La reputazione iniziale si adatta al livello del club scelto</p>
      <div class="ts-leagues">
        ${makeCol('Serie A', serieA)}
        ${makeCol('Serie B', serieB)}
        ${makeCol('Serie C', serieC)}
      </div>`;
    wireTeamLogoFallbacks(overlay);
    overlay.querySelectorAll('.ts-team-btn[data-team-name]').forEach(btn => {
      btn.addEventListener('click', () => {
        const team = [...serieA, ...serieB, ...serieC].find(t => t.name === btn.dataset.teamName);
        if (!team) return;
        // La reputazione iniziale è la MINIMA richiesta per l'obiettivo della
        // squadra scelta (stesso schema a scaglioni delle offerte di lavoro:
        // JOB_OFFER_REP_BASE + (tier-1) × JOB_OFFER_REP_STEP) — scegliere una
        // squadra da "Titolo/top3" parte quindi da reputazione 95, non da una
        // stima slegata basata sulla forza grezza della squadra.
        const tier = estimateObjectiveGlobalTier(team);
        dsCareer.reputation = JOB_OFFER_REP_BASE + (tier - 1) * JOB_OFFER_REP_STEP;
        hirePlayerAsDS(team, 1 + Math.floor(Math.random() * 3));
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
  if (dsCareer) {
    const teamPart = playerTeam
      ? `${teamLogoOrJerseyHtml(playerTeam, false, false)}${playerTeam.name} · ${Math.max(0, dsCareer.contractYears)}a`
      : '<em>senza squadra</em>';
    badge.innerHTML = `👔 <strong>${dsCareer.firstName} ${dsCareer.lastName}</strong> · Rep ${dsCareer.reputation} — ${teamPart}`;
    badge.style.cursor = 'pointer';
    badge.title = 'Clicca per vedere la tua carriera';
  } else {
    badge.innerHTML = `${teamLogoOrJerseyHtml(playerTeam, false, false)}${playerTeam.name}`;
    badge.style.cursor = 'default';
    badge.title = '';
  }
  badge.style.display = 'block';
  wireTeamLogoFallbacks(badge);
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
  // Ogni chiamata a updateSeasonBtn() segna un vero punto di assestamento
  // della macchina a stati (fine di una transizione, non nel mezzo di una
  // catena asincrona) — riabilita sempre il bottone qui. Vedi il blocco
  // FASE 4 e finishAndata/finishSeason per dove viene disabilitato.
  btn.disabled = false;
  if (seasonPhase === 0) {
    btn.textContent = 'Inizia Stagione';
  } else if (seasonPhase === 1) {
    btn.textContent = currentMatchday >= getNumRounds() ? 'Vai al mercato invernale ▶' : `Giornata ${currentMatchday + 1} ▶`;
  } else if (seasonPhase === 2) {
    btn.textContent = 'Inizia Ritorno';
  } else if (seasonPhase === 3) {
    btn.textContent = currentMatchday >= getNumRounds() ? 'Fine Stagione ▶' : `Giornata ${currentMatchday + 1 + getNumRounds()} ▶`;
  } else if (seasonPhase === 4) {
    btn.textContent = 'Vai alla Stagione Successiva';
  }
  if (ffBtn) {
    // Nascosto anche ai confini di fine girone (currentMatchday >= numRounds
    // in fase 1 o 3): lì non c'è più nulla da "simulare tutto", resta solo
    // l'azione di transizione (mercato invernale / fine stagione).
    const atRoundBoundary = (seasonPhase === 1 || seasonPhase === 3) && currentMatchday >= getNumRounds();
    ffBtn.style.display = (seasonPhase >= 1 && seasonPhase <= 3 && !atRoundBoundary) ? '' : 'none';
  }
}

// Serie A: fasce percentuali (top3 / 40% / 75%, invariato). Serie B e C (20
// squadre ciascuna): fasce fisse da 5 posizioni (1-5 Promozione, 6-10 Metà
// alta, 11-15 Metà classifica, 16-20 Salvezza), su richiesta esplicita
// dell'utente — a differenza della A, dove restano legate alla percentuale.
// `sortedTeams` è GIÀ ordinato (computePreseasonPrevisioni: media forza +
// budget + piazzamento stagione precedente) — obiettivo e previsione sono
// la stessa cosa, calcolata PRIMA del mercato: il budget nella media serve
// proprio a tenere conto dei rinforzi attesi anche se il mercato vero e
// proprio arriva dopo (su richiesta esplicita dell'utente).
const setObjectives = (sortedTeams, league) => {
  sortedTeams.forEach((team, idx) => {
    const n = sortedTeams.length;
    const rank = idx + 1;
    if (league === 'A') {
      if (rank <= 3) team.objective = { description: 'Titolo/top 3', maxRank: 3 };
      else if (rank <= Math.floor(n * 0.4)) team.objective = { description: 'Metà alta', maxRank: Math.floor(n * 0.4) };
      else if (rank <= Math.floor(n * 0.75)) team.objective = { description: 'Metà classifica', maxRank: Math.floor(n * 0.75) };
      else team.objective = { description: 'Salvezza', maxRank: n - 4 };
    } else {
      if (rank <= 5) team.objective = { description: 'Promozione', maxRank: 5 };
      else if (rank <= 10) team.objective = { description: 'Metà alta', maxRank: 10 };
      else if (rank <= 15) team.objective = { description: 'Metà classifica', maxRank: 15 };
      else team.objective = { description: 'Salvezza', maxRank: n - 4 };
    }
    team.objective.predictedRank = rank;
  });
};

// ── MERCATO INVERNALE AI ──────────────────────────────────────────────────────
// Estende al mercato invernale lo stesso mercato a turni CPU-vs-CPU già usato
// in estate (Fase 11, vedi updateTeamStrengths): prima girava tutto in
// un'unica passata sincrona e invisibile (Step 1/2/2-bis originali, senza
// alcun turno reale né UI di progresso) — ora le squadre agiscono una alla
// volta, nello stesso ordine per forza DS, con lo stesso scheduler
// (runTurnBasedMarket) e la stessa finestra "Calciomercato in corso" tra un
// turno reale del player e l'altro. onComplete viene invocato a
// schedulazione conclusa (asincrono in senso lato, come in
// updateTeamStrengths) — i chiamanti devono trattarlo come tale.
function runWinterAITransfers(onComplete = () => {}) {
  sanitizeRosterIntegrity();
  const aiTeams = [...serieA, ...serieB, ...serieC].filter(t => t !== playerTeam);

  // Lista "Sul mercato" per la UI del player — stessa logica NON distruttiva
  // di STEP 6a estivo: un esubero resta davvero in rosa alla sua squadra
  // finché non viene comprato per davvero (dal player o da una CPU nel suo
  // turno), non rimosso anticipatamente solo perché "in vendita".
  const winterMarket = [];
  aiTeams.forEach(team => {
    if (Math.random() > 0.35) return;
    const sellable = team.roster.filter(p => p.role !== 'POR' && p.strength > 40 && !activeLoans.some(l => l.player === p));
    if (!sellable.length) return;
    const player = sellable[Math.floor(Math.random() * sellable.length)];
    const askingPrice = Math.round(getTransferValue(player) * (0.8 + Math.random() * 0.5) * 10) / 10;
    winterMarket.push({ player, fromTeam: team, askingPrice, voluntary: true });
  });
  if (playerTeam) pendingTransferMarket = [...winterMarket];

  runTurnBasedMarket(() => {
    // Mercato estero invernale, INDIPENDENTE dal mercato a turni sopra (stesso motivo
  // del mercato estivo — prima l'acquisto estero era sepolto in fondo alla
  // catena, raggiungibile solo se sia il mercato normale sia gli svincolati
  // fallivano, risultando de facto sempre a zero in una sola passata).
  aiTeams.forEach(team => {
    if (team.leagueLevel !== 'A' || !canBuyForeignPlayer(team)) return;
    if (team.budget < 3) return;
    const foreignWinterSkipChance = Math.max(0.15, Math.min(0.55, 0.30 * getMarketAggressiveness(team)));
    if (Math.random() > foreignWinterSkipChance) return;
    __recordMarketAttempt(team);
    const cand = generateForeignCandidate();
    if (canAddRole(team, cand.role) && canTeamAcquirePlayer(team, cand) && canRebalanceForDeal(team, cand.cost, cand.salary)) {
      const ev = evaluateTransferTarget(team, cand, cand.cost);
      if (ev && __marketStatsSink) __marketStatsSink.push({ team: team.name, gain: ev.gain, cost: ev.cost, score: ev.score });
      if (ev && ev.gain > 0) {
        const player = materializeForeignCandidate(cand, team);
        commitRebalanceForDeal(team, cand.cost, cand.salary);
        team.roster.push(player);
        team.budget -= cand.cost;
        recalculateTeamStrength(team);
        transferLog.push(`❄️ <em>Mercato invernale</em>: <strong>${team.name}</strong> acquista ${player.firstName} ${player.lastName} (${player.age} anni, Forza: ${player.strength}) da <strong>${cand.fromClub}</strong> per <strong>${cand.cost.toFixed(1)}M€</strong>`);
      }
    }
  });

    onComplete();
  }, 20); // maxRounds più basso dell'estivo: mercato invernale storicamente più corto/meno mosso
}

// ── MODAL MERCATO INVERNALE (solo per playerTeam) ─────────────────────────────
// ── Filtri di ricerca giocatori nei modali mercato ──────────────────────────
function matchesFilter(p, f) {
  if (f.role && !playerCanPlayRole(p, f.role)) return false;
  // La posizione ha senso solo insieme a un ruolo specifico (le opzioni nel
  // filtro cambiano in base al ruolo selezionato) — ignorata se non c'è un
  // ruolo scelto.
  if (f.role && f.position && !playerPositionsFor(p, f.role).includes(f.position)) return false;
  if (p.age < f.ageMin || p.age > f.ageMax) return false;
  if (p.strength < f.strMin || p.strength > f.strMax) return false;
  return true;
}

// Filtro prezzo (in M€), applicato solo agli acquisti (le proposte hanno un
// prezzo vero — i prestiti sono sempre gratis, niente filtro prezzo lì).
function matchesPriceFilter(price, f) {
  if (f.priceMin == null && f.priceMax == null) return true;
  if (f.priceMin != null && price < f.priceMin) return false;
  if (f.priceMax != null && price > f.priceMax) return false;
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


// Select "Posizione", dipendente dal ruolo selezionato: le opzioni sono le
// 2 posizioni di QUEL ruolo (ROLE_POSITIONS) — disabilitato/vuoto se non è
// stato scelto un ruolo specifico (le posizioni non hanno senso "tra tutti
// i ruoli", ognuno ha le sue).
function buildPositionFilterSelect(f) {
  const positions = f.role ? (ROLE_POSITIONS[f.role] || []) : [];
  const opt = (val, label) => `<option value="${val}"${f.position === val ? ' selected' : ''}>${label}</option>`;
  return `<label>Posizione
    <select data-filter="position" style="margin-left:4px" ${positions.length ? '' : 'disabled'}>
      ${opt('', 'Tutte')}${positions.map(p => opt(p, ROLE_POSITION_LABELS[p] || p)).join('')}
    </select>
  </label>`;
}

function buildFilterBar(f, showScoutSeg) {
  const opt = (val, label) => `<option value="${val}"${f.role === val ? ' selected' : ''}>${label}</option>`;
  const seg = (val, label) => `<button type="button" class="mm-seg${(f.availability || 'all') === val ? ' active' : ''}" data-avail="${val}">${label}</button>`;
  return `<div class="mm-filters" style="margin-bottom:10px;padding:8px 10px;background:#f5f5f5;border:1px solid #ddd;border-radius:6px;display:flex;gap:12px;flex-wrap:wrap;align-items:center;font-size:.82rem">
    <strong>${icon('search')} Filtri:</strong>
    <label>Ruolo
      <select data-filter="role" style="margin-left:4px">
        ${opt('', 'Tutti')}${ROLES.map(r => opt(r, r)).join('')}
      </select>
    </label>
    ${buildPositionFilterSelect(f)}
    <label>Età
      <input type="number" data-filter="ageMin" value="${f.ageMin}" min="16" max="40" style="width:52px;margin-left:4px"> -
      <input type="number" data-filter="ageMax" value="${f.ageMax}" min="16" max="40" style="width:52px">
    </label>
    <label>Forza
      <input type="number" data-filter="strMin" value="${f.strMin}" min="0" max="100" style="width:52px;margin-left:4px"> -
      <input type="number" data-filter="strMax" value="${f.strMax}" min="0" max="100" style="width:52px">
    </label>
    <label>Prezzo (M€)
      <input type="number" data-filter="priceMin" value="${f.priceMin}" min="0" max="250" style="width:56px;margin-left:4px"> -
      <input type="number" data-filter="priceMax" value="${f.priceMax}" min="0" max="250" style="width:56px">
    </label>
    <button class="mm-btn" data-action="filter-reset" style="padding:2px 10px;font-size:.8rem">Reset</button>
    <div class="mm-seg-group" style="margin-left:auto">${seg('all', 'Tutti')}${seg('market', '🛒 Sul mercato')}${seg('free', '🆓 Svincolati')}${showScoutSeg ? seg('scout', '🌍 Area Scout') : ''}</div>
  </div>`;
}

// Variante semplificata di buildFilterBar per la tab Prestiti: stessi filtri
// ruolo/posizione/età/forza (riusa matchesFilter/wireFilterBar), ma SENZA il
// segmento "Tutti/Sul mercato/Svincolati" (non ha senso per i candidati in
// prestito) e SENZA il filtro prezzo (i prestiti sono sempre gratis).
function buildLoanFilterBar(f) {
  const opt = (val, label) => `<option value="${val}"${f.role === val ? ' selected' : ''}>${label}</option>`;
  return `<div class="mm-filters" style="margin-bottom:10px;padding:8px 10px;background:#f5f5f5;border:1px solid #ddd;border-radius:6px;display:flex;gap:12px;flex-wrap:wrap;align-items:center;font-size:.82rem">
    <strong>${icon('search')} Filtri:</strong>
    <label>Ruolo
      <select data-filter="role" style="margin-left:4px">
        ${opt('', 'Tutti')}${ROLES.map(r => opt(r, r)).join('')}
      </select>
    </label>
    ${buildPositionFilterSelect(f)}
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

// Ogni campo MIN ha il proprio MAX corrispondente: se alzi il minimo oltre
// il massimo, il massimo si alza per restare almeno uguale (mai il
// contrario — solo questa direzione, come richiesto).
const FILTER_MIN_MAX_PAIRS = { ageMin: 'ageMax', strMin: 'strMax', priceMin: 'priceMax' };

function wireFilterBar(overlay, filter, render) {
  overlay.querySelectorAll('[data-filter]').forEach(el => {
    el.addEventListener('change', () => {
      const key = el.dataset.filter;
      if (key === 'role') {
        filter.role = el.value;
        filter.position = ''; // le posizioni dipendono dal ruolo: si azzerano al cambio
      } else if (key === 'position') {
        filter.position = el.value;
      } else {
        filter[key] = Math.max(0, +el.value || 0);
        const maxKey = FILTER_MIN_MAX_PAIRS[key];
        if (maxKey && filter[maxKey] != null && filter[key] > filter[maxKey]) filter[maxKey] = filter[key];
      }
      render();
    });
  });
  const resetBtn = overlay.querySelector('[data-action="filter-reset"]');
  if (resetBtn) resetBtn.addEventListener('click', () => {
    filter.role = ''; filter.position = ''; filter.ageMin = 16; filter.ageMax = 40; filter.strMin = 0; filter.strMax = 100;
    if (filter.priceMin != null) filter.priceMin = 0;
    if (filter.priceMax != null) filter.priceMax = 250;
    render();
  });
  overlay.querySelectorAll('[data-avail]').forEach(el => {
    el.addEventListener('click', () => {
      filter.availability = el.dataset.avail;
      render();
    });
  });
}

function finishAndata() {
  // Stesso rischio di ri-entranza di FASE 4 (vedi commento lì): il mercato
  // invernale può restare aperto/asincrono per un po', un doppio click nel
  // frattempo rientrerebbe qui una seconda volta.
  document.getElementById('simulaStagione').disabled = true;
  displaySchedule('serieA', s_roundsA, []);
  displaySchedule('serieB', s_roundsB, []);
  displaySchedule('serieC', s_roundsC, []);
  ['serieA', 'serieB', 'serieC'].forEach(id => {
    const h = document.getElementById('current-matchday-' + id);
    if (h) h.remove();
  });
  currentMatchday = 0;
  currentMarketIsWinter = true;
  winterMarketStartAt = transferLog.length;
  // Stesso reset di sessione di startMarket() (mercato estivo, Fase 16/17):
  // il player partecipa DAVVERO al mercato a turni invernale nel suo punto
  // reale della coda (stessa showManagerMarketModal dell'estate, non una
  // finestra separata) — queste mappe vanno azzerate una sola volta qui,
  // altrimenti sopravvivrebbero (sbagliando) dalla sessione estiva precedente.
  if (playerTeam) {
    pendingAIOffers = [];
    pendingForeignScoutTargets = [];
    mmSessionRenewalDecisions = new Map();
    mmSessionOfferDecisions = new Map();
    mmSessionBoughtIds = new Set();
    mmSessionSoldIds = new Set();
    sessionMovedPlayers = new Set();
    mmSessionPreContractConsent = new Map();
    mmSessionBuyConsent = new Map();
    // I rinnovi "estivi" (pendingRenewals, STEP 1d) sono un concetto legato
    // SOLO all'inizio stagione: a questo punto sono già stati tutti decisi
    // durante il mercato estivo. Senza svuotarlo qui, la tab Rinnovi della
    // stessa showManagerMarketModal (riusata anche per il turno invernale)
    // li mostrava di nuovo come "da decidere", perché la mappa delle
    // decisioni sopra viene azzerata per la nuova sessione ma l'elenco dei
    // giocatori no — sembrava un secondo turno di rinnovi fantasma.
    pendingRenewals = [];
  }
  // Il mercato a turni CPU-vs-CPU (Fase 11 estiva, ora estesa all'invernale)
  // è asincrono: tutto quello che nel vecchio codice veniva subito dopo
  // runWinterAITransfers() ora vive nella callback, invocata solo a
  // schedulazione conclusa. Risoluzione BLOCCANTE dei rinnovi PRIMA che
  // partano i turni: una volta iniziato lo scheduler, un giocatore in ultimo
  // anno di contratto può ricevere un precontratto da chiunque in qualsiasi
  // momento, anche al primissimo giro.
  // Esclude chi si ritirerà comunque a fine stagione (stessa soglia usata
  // ovunque nel gioco, age>=36, vedi Rosa tab/willRetire): inutile chiedere
  // di rinnovare un contratto che il giocatore non arriverà mai a onorare.
  const winterEligible = playerTeam ? playerTeam.roster.filter(p => p.contract?.duration === 1 && p.age < 36 && !isPreContracted(p)) : [];
  openRenewalGate(winterEligible, true, () => {
  runWinterAITransfers(() => {
    // Le squadre CPU sistemano subito eventuali carenze di ruolo al termine del
    // mercato invernale (giocatori primavera se non trovano uno svincolato adatto)
    [...serieA, ...serieB, ...serieC].forEach(t => {
      if (t !== playerTeam) { ensureMinRoster(t); recalculateTeamStrength(t); }
    });
    if (playerTeam) {
      // Interesse gratuito sui giocatori all'ULTIMO anno di contratto (in
      // scadenza a fine di QUESTA stagione, duration===1): deciso qui, in
      // inverno, non più a fine stagione — se non rinnovati entro allora,
      // STEP 1d (updateTeamStrengths) li farà partire subito per la squadra
      // interessata invece di farli comparire nella tab Rinnovi estiva, che
      // resta riservata solo a chi non ha suscitato interesse.
      renewalInterest = new Map();
      const winterAiTeams = [...serieA, ...serieB, ...serieC].filter(t => t !== playerTeam);
      playerTeam.roster
        .filter(p => p.contract?.duration === 1 && p.role !== 'POR' && !isPreContracted(p))
        .forEach(player => {
          if (Math.random() > 0.35) return;
          const interested = winterAiTeams.filter(t => canAddRole(t, player.role) && canTeamAcquirePlayer(t, player) && Math.random() < estimatePlayerJoinChance(player, t));
          if (!interested.length) return;
          renewalInterest.set(player.id, interested[Math.floor(Math.random() * interested.length)]);
        });

      // §3 REGOLE_CALCIOMERCATO: nessuna sessione libera dopo lo scheduler —
      // il player ha già avuto i suoi turni reali (inclusa la tab
      // Precontratti) dentro runWinterAITransfers/runTurnBasedMarket.
      recalculateTeamStrength(playerTeam);
      seasonPhase = 2;
      updateSeasonBtn();
      saveGame();
    } else {
      seasonPhase = 2;
      updateSeasonBtn();
      saveGame();
    }
  });
  }); // fine callback openRenewalGate (inverno)
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

  // Archivia le statistiche della stagione appena conclusa (anno per anno,
  // anche le stagioni senza presenze) SUBITO qui, prima che il mercato estivo
  // (updateTeamStrengths, in fase 4) sposti i giocatori in una nuova squadra —
  // altrimenti un giocatore acquistato a fine stagione risulterebbe con le
  // presenze/gol/assist della stagione appena giocata attribuiti alla squadra
  // di ARRIVO invece che a quella con cui li ha realmente segnati.
  [...serieA, ...serieB, ...serieC].forEach(team => {
    team.roster.forEach(p => {
      p.statsHistory = p.statsHistory || [];
      p.statsHistory.push({
        season: seasonCount, team: team.name, league: team.leagueLevel,
        appearances: p.seasonAppearances || 0, goals: p.seasonGoals || 0, assists: p.seasonAssists || 0,
        conceded: p.role === 'POR' ? (p.seasonConceded || 0) : null,
      });
    });
  });
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
    // transferLog NON si azzera più qui: le notizie del mercato estivo appena
    // concluso (che ha preparato QUESTA stagione) restano leggibili nella
    // sezione Calciomercato di Notizie per tutta la stagione — si azzera solo
    // all'inizio del prossimo mercato vero (updateTeamStrengths).
    standingsA = {};
    standingsB = {};
    standingsC = {};
    currentMatchday = 0;

    // Applica pre-contratti firmati nel mercato invernale.
    // Il pre-contratto appartiene al club firmatario (toTeam): vale anche se
    // il DS nel frattempo se n'è andato o è stato esonerato.
    if (pendingPreContracts.length > 0) {
      const touchedTeams = new Set();
      pendingPreContracts.forEach(({ player, fromTeam, toTeam, signedSalary, signedDuration }) => {
        const dest = toTeam || playerTeam; // fallback per salvataggi senza toTeam
        // Rimuovi da fromTeam (se ancora lì)
        if (fromTeam && fromTeam.roster) {
          fromTeam.roster = fromTeam.roster.filter(p => p !== player);
          recalculateTeamStrength(fromTeam);
        }
        // Rimuovi da freeAgents se il contratto è scaduto e l'AI l'ha svincolato
        const faIdx = freeAgents.indexOf(player);
        if (faIdx >= 0) freeAgents.splice(faIdx, 1);
        // Un pre-contratto è un accordo già firmato mesi prima (a gennaio): il
        // trasferimento è garantito, non va ri-condizionato ai tetti di rosa/
        // monte ingaggi del club com'è a FINE stagione (possono essere cambiati
        // nel frattempo) — altrimenti l'accordo "sfumerebbe" per condizioni che
        // nessuno dei due poteva conoscere al momento della firma. Il nuovo
        // contratto riprende lo stipendio mostrato in fase di firma
        // (signedSalary) e la durata scelta allora (signedDuration, 1-5
        // anni come gli altri ingaggi — fallback alla durata casuale di
        // createContract solo per salvataggi precedenti senza questo campo).
        if (dest && dest.roster && !dest.roster.includes(player)) {
          const newContract = createContract(player.strength, player.age);
          newContract.salary = signedSalary ?? newContract.salary;
          newContract.duration = signedDuration ?? newContract.duration;
          player.contract = newContract;
          dest.roster.push(player);
          touchedTeams.add(dest);
          recordTransfer(player, dest.name, 0);
          transferLog.push(`✍️ Pre-contratto: <strong>${player.firstName} ${player.lastName}</strong> arriva a <strong>${dest.name}</strong> (parametro zero, ${formatMoneyK(annualSalary(newContract.salary))}€/anno)`);
        } else {
          // Nessuna destinazione valida (es. squadra non più esistente): il
          // giocatore resta svincolato — unico caso residuo, non più i tetti
          // di rosa/ingaggi.
          freeAgents.push(player);
          transferLog.push(`🔚 Pre-contratto sfumato: <em>${player.firstName} ${player.lastName}</em> resta svincolato`);
        }
      });
      touchedTeams.forEach(t => recalculateTeamStrength(t));
      pendingPreContracts = [];
    }

    // Resetta i contatori stagionali e la disponibilità per la nuova stagione
    // (l'archiviazione in statsHistory della stagione appena conclusa avviene
    // ormai prima, in finishSeason(), quando i giocatori sono ancora nella
    // squadra con cui hanno realmente giocato — vedi commento lì).
    [...serieA, ...serieB, ...serieC].forEach(team => {
      team.roster.forEach(p => {
        p.seasonGoals = 0;
        p.seasonAssists = 0;
        p.seasonAppearances = 0;
        p.seasonConceded = 0;
        p.yellowCards = 0;
        p.injuryMatchesLeft = 0;
        p.suspendedMatchesLeft = 0;
        p.forma = FORMA_MAX;
      });
    });

    document.getElementById('serieA').innerHTML = '';
    document.getElementById('serieB').innerHTML = '';
    document.getElementById('serieC').innerHTML = '';

    // Obiettivo = Previsione: già assegnato in FASE 4 (showPreseasonPrevisioniModal/
    // setObjectives, PRIMA del mercato) — su richiesta esplicita dell'utente
    // sono la stessa cosa, non due pronostici diversi in sequenza.
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

    const preRecoveryState1 = snapshotInjurySuspensionState();
    simulateOneRound(s_roundsA[currentMatchday], standingsA);
    simulateOneRound(s_roundsB[currentMatchday], standingsB);
    simulateOneRound(s_roundsC[currentMatchday], standingsC);
    processMatchdayRecovery(preRecoveryState1);
    applyMatchdayForma([s_roundsA[currentMatchday], s_roundsB[currentMatchday], s_roundsC[currentMatchday]]);

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

    const preRecoveryState2 = snapshotInjurySuspensionState();
    simulateOneRound(s_returnRoundsA[currentMatchday], standingsA);
    simulateOneRound(s_returnRoundsB[currentMatchday], standingsB);
    simulateOneRound(s_returnRoundsC[currentMatchday], standingsC);
    processMatchdayRecovery(preRecoveryState2);
    applyMatchdayForma([s_returnRoundsA[currentMatchday], s_returnRoundsB[currentMatchday], s_returnRoundsC[currentMatchday]]);

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
    // Da quando il mercato a turni gira in modo asincrono e con un ritmo
    // percettibile (barra di progresso, finestre di turno/offerte), questa
    // fase può durare diversi secondi di orologio reale invece di risolversi
    // in un istante — un doppio click su questo stesso bottone mentre è
    // ancora in corso rientrerebbe qui una SECONDA volta, chiamando
    // handlePromotionsAndRelegations/updateTeamStrengths due volte in
    // parallelo e corrompendo le liste squadre (osservato in partita:
    // Serie C gonfiata a 30 squadre, Serie D svuotata, rose azzerate). Il
    // bottone si riabilita da solo a updateSeasonBtn(), che gira solo ai
    // veri punti di assestamento della macchina a stati.
    this.disabled = true;
    // Dati per la valutazione del DS umano: vanno raccolti PRIMA delle promozioni
    const evalData = (dsCareer && playerTeam) ? collectSeasonEvalData() : null;
    const teamBeforeEval = playerTeam; // per capire se il club cambia durante la valutazione

    archiveStaffSeasonHistory();

    // Snapshot delle classifiche appena concluse PRIMA di handlePromotionsAndRelegations:
    // servono a computePreseasonPrevisioni per il piazzamento della stagione
    // precedente (team.leagueLevel non viene sovrascritto qui, solo dentro
    // updateTeamStrengths — resta valido come "lega di provenienza" fino a lì).
    const oldStandingsByLeague = { A: standingsA, B: standingsB, C: standingsC };
    [serieA, serieB, serieC] = handlePromotionsAndRelegations(standingsA, standingsB, standingsC, serieA, serieB, serieC);

    // La stagione finisce con la Coppa Italia (già simulata in finishSeason)
    // e le Previsioni — il mercato (CPU poi player) viene DOPO, non prima:
    // qui usiamo ancora forza/budget PRE-mercato apposta. Previsione e
    // obiettivo sono la STESSA COSA (su richiesta esplicita dell'utente): il
    // budget nella media serve proprio a tenere conto dei rinforzi attesi dal
    // mercato anche se quello vero arriva solo dopo — team.objective (usato
    // per gli esoneri) viene assegnato qui, non più a mercato concluso.
    const previsioni = {
      A: computePreseasonPrevisioni(serieA, 'A', oldStandingsByLeague),
      B: computePreseasonPrevisioni(serieB, 'B', oldStandingsByLeague),
      C: computePreseasonPrevisioni(serieC, 'C', oldStandingsByLeague),
    };
    setObjectives(previsioni.A, 'A');
    setObjectives(previsioni.B, 'B');
    setObjectives(previsioni.C, 'C');

    // Sfondo della pagina durante tutto il mercato estivo (Previsioni,
    // briefing, turni): la classifica finale della stagione appena conclusa
    // (ancora visibile da finishSeason) va sostituita con la classifica di
    // previsione/obiettivi, non lasciata "vecchia" mentre si è già nella
    // nuova stagione — resta finché non ripartono le giornate vere.
    displayPreSeasonStandings('serieA', previsioni.A, true);
    displayPreSeasonStandings('serieB', previsioni.B, true);
    displayPreSeasonStandings('serieC', previsioni.C, true);
    openAllLeagueSections();

    // Il presidente deve fissare budget/monte ingaggi del player PRIMA che
    // parta il mercato a turni (sotto), non più dopo: da quando il player
    // partecipa al mercato a turni nel suo punto reale della coda (per forza
    // DS), il suo budget deve già essere quello della nuova stagione fin dal
    // suo primo turno, non quello residuo della stagione precedente.
    const proceedToBriefing = () => {
      const finishSeasonNoPlayer = () => {
        displayTransferLog();
        seasonPhase = 0;
        updateSeasonBtn();
        saveGame();
      };

      const startMarket = () => {
        // Le offerte per i giocatori del player nascono ora dal mercato a
        // turni vero (tryOfferForPlayerSurplus), non più rigenerate a caso
        // ogni apertura della finestra — azzerate una sola volta qui, a
        // inizio sessione, poi si accumulano per tutta la sua durata. Le
        // mappe di decisione (rinnovi/offerte/acquisti/vendite, vedi Fase 16)
        // vanno azzerate qui allo stesso modo — sopravvivono a riaperture
        // ripetute della finestra ENTRO questa sessione, ma non devono
        // trascinarsi dalla stagione precedente.
        if (playerTeam) {
          pendingAIOffers = [];
          pendingForeignScoutTargets = [];
          mmSessionRenewalDecisions = new Map();
          mmSessionOfferDecisions = new Map();
          mmSessionBoughtIds = new Set();
          mmSessionSoldIds = new Set();
          sessionMovedPlayers = new Set();
          currentMarketIsWinter = false;
          mmSessionBuyConsent = new Map();
        }
        updateTeamStrengths(standingsA, standingsB, standingsC, serieA, serieB, serieC, () => {
          // Le squadre CPU sistemano subito eventuali carenze di ruolo al termine del
          // mercato estivo (giocatori primavera se non trovano uno svincolato adatto)
          [...serieA, ...serieB, ...serieC].forEach(t => {
            if (t !== playerTeam) { ensureMinRoster(t); recalculateTeamStrength(t); }
          });

          // §3 REGOLE_CALCIOMERCATO: nessuna sessione libera dopo lo
          // scheduler — il player ha già avuto i suoi turni reali dentro
          // updateTeamStrengths/runTurnBasedMarket; a schedulazione conclusa
          // il mercato estivo è semplicemente finito.
          if (playerTeam) recalculateTeamStrength(playerTeam);
          finishSeasonNoPlayer();
        });
      };

      if (playerTeam) {
        // Se il club è lo stesso della scorsa stagione il presidente rinnova i paletti;
        // se è cambiato (esonero/corteggiamento) li ha già fissati hirePlayerAsDS.
        if (playerTeam === teamBeforeEval) briefPresidentBudget(playerTeam);
        showPresidentBriefingModal(playerTeam, () => {
          showSeasonFormationNotice(playerTeam, startMarket);
        });
      } else {
        startMarket();
      }
    };

    const proceedAfterPrevisioni = () => {
      if (evalData) {
        showSeasonEvaluationModal(evalData, proceedToBriefing);
      } else if (dsCareer && !playerTeam) {
        // DS disoccupato: la stagione di inattività costa reputazione, poi nuove offerte
        dsCareer.reputation = Math.max(35, dsCareer.reputation - 2);
        dsCareer.seasonsUnemployed++;
        dsCareer.history.push({ season: seasonCount, team: null, league: null, rank: null, objective: null, note: 'Svincolato' });
        showMyTeamBadge();
        pendingTransferMarket = []; // scarta il mercato stantio delle sessioni precedenti
        showJobOffersModal(generateDSJobOffers(), proceedToBriefing);
      } else {
        proceedToBriefing();
      }
    };

    showPreseasonPrevisioniModal(previsioni, proceedAfterPrevisioni);
  }
});

// ── BOTTONE SIMULA TUTTO (fast-forward) ──────────────────────────────────────
document.getElementById('simulaTutto')?.addEventListener('click', function () {
  const numRounds = getNumRounds();

  if (seasonPhase === 1) {
    while (currentMatchday < numRounds) {
      const preRecoveryStateFF1 = snapshotInjurySuspensionState();
      simulateOneRound(s_roundsA[currentMatchday], standingsA);
      simulateOneRound(s_roundsB[currentMatchday], standingsB);
      simulateOneRound(s_roundsC[currentMatchday], standingsC);
      processMatchdayRecovery(preRecoveryStateFF1);
      applyMatchdayForma([s_roundsA[currentMatchday], s_roundsB[currentMatchday], s_roundsC[currentMatchday]]);
      currentMatchday++;
    }
    // "Simula tutto" saltava la visualizzazione della giornata (riquadro
    // risultati/marcatori), che restava ferma all'ultima mostrata prima del
    // click — mostra qui l'ULTIMA giornata dell'andata appena simulata
    // (numRounds), come fa il flusso normale giornata-per-giornata.
    displaySingleMatchday('serieA', s_roundsA[numRounds - 1], numRounds, 'andata');
    displaySingleMatchday('serieB', s_roundsB[numRounds - 1], numRounds, 'andata');
    displaySingleMatchday('serieC', s_roundsC[numRounds - 1], numRounds, 'andata');
    displayStandings('serieA', standingsA, true);
    displayStandings('serieB', standingsB, true);
    displayStandings('serieC', standingsC, true);
    displayTopScorers('serieA', serieA);
    displayTopScorers('serieB', serieB);
    displayTopScorers('serieC', serieC);
    // Si ferma qui (non entra subito nel mercato invernale): l'utente vede
    // la classifica finale del girone d'andata e decide lui quando proseguire
    // col bottone "Vai al mercato invernale ▶" (stesso comportamento del
    // flusso normale giornata-per-giornata, vedi updateSeasonBtn).
    updateSeasonBtn();
    saveGame();
    return;
  }

  // Se siamo in fase 2, salta a fase 3 e poi fast-forward
  if (seasonPhase === 2) {
    seasonPhase = 3;
    currentMatchday = 0;
  }

  if (seasonPhase === 3) {
    while (currentMatchday < numRounds) {
      const preRecoveryStateFF2 = snapshotInjurySuspensionState();
      simulateOneRound(s_returnRoundsA[currentMatchday], standingsA);
      simulateOneRound(s_returnRoundsB[currentMatchday], standingsB);
      simulateOneRound(s_returnRoundsC[currentMatchday], standingsC);
      processMatchdayRecovery(preRecoveryStateFF2);
      applyMatchdayForma([s_returnRoundsA[currentMatchday], s_returnRoundsB[currentMatchday], s_returnRoundsC[currentMatchday]]);
      currentMatchday++;
    }
    finishSeason();
  }
});

// Crea i modal una sola volta all'avvio
createTeamDetailsModal();
createDatabaseModal();
document.getElementById('open-database-btn').addEventListener('click', e => { e.preventDefault(); openDatabase(); });
createNotizieModal();
document.getElementById('open-notizie-btn').addEventListener('click', e => { e.preventDefault(); openNotizie(); });

// Archivia in staff.history (allenatori e DS, umano incluso) il piazzamento della
// stagione appena conclusa — va chiamata PRIMA di handlePromotionsAndRelegations,
// quando standingsA/B/C e team.leagueLevel/team.objective riflettono ancora la
// stagione che si è appena chiusa. Chi è svincolato riceve comunque una voce.
function archiveStaffSeasonHistory() {
  const NUM_PROMO_RELEG = 4;
  const leagueStandings = { A: standingsA, B: standingsB, C: standingsC };
  const rankOf = (standings, teamName) => {
    if (!standings) return null;
    const sorted = Object.entries(standings).map(([name, stats]) => ({ name, ...stats })).sort(compareStandingsRows);
    const idx = sorted.findIndex(e => e.name === teamName);
    return idx >= 0 ? idx + 1 : null;
  };
  [...serieA, ...serieB, ...serieC].forEach(team => {
    const standings = leagueStandings[team.leagueLevel];
    const numTeams = standings ? Object.keys(standings).length : null;
    const rank = rankOf(standings, team.name);
    const note = [
      rank === 1 ? `${trophyIconHtml('scudetto', 'Primo posto')} Primo posto` : '',
      s_coppaResult && s_coppaResult.winner === team ? `${trophyIconHtml('coppa', 'Coppa Italia')} Coppa Italia` : '',
      team.leagueLevel !== 'A' && rank && rank <= NUM_PROMO_RELEG ? `${promoRelegIconHtml('promozione', 'Promozione')} Promozione` : '',
      team.leagueLevel !== 'D' && rank && numTeams && rank > numTeams - NUM_PROMO_RELEG ? `${promoRelegIconHtml('retrocessione', 'Retrocessione')} Retrocessione` : '',
    ].filter(Boolean).join(' · ');
    const entry = {
      season: seasonCount, team: team.name, league: team.leagueLevel,
      rank, objective: team.objective?.description || null, note,
    };
    if (team.coach) { team.coach.history = team.coach.history || []; team.coach.history.push({ ...entry }); }
    if (team.ds && !team.ds.isHuman) { team.ds.history = team.ds.history || []; team.ds.history.push({ ...entry }); }
  });
  const freeEntry = () => ({ season: seasonCount, team: null, league: null, rank: null, objective: null, note: 'Svincolato' });
  freeCoaches.forEach(c => { c.history = c.history || []; c.history.push(freeEntry()); });
  freeDirectors.forEach(d => { d.history = d.history || []; d.history.push(freeEntry()); });
}

// Svincola tutto lo staff/rosa di una squadra — usata quando retrocede nel
// pool dormiente di Serie D (mai per rigenerarla: la ricostruzione avviene
// SOLO tramite il normale mercato CPU una volta ripescata in Serie C, vedi
// STEP 6/ensureMinRoster/auto-ingaggio allenatore-DS in updateTeamStrengths).
// Il DS umano NON viene toccato qui — lo gestisce leaveTeamAsDS dentro il
// ramo "relegatedToD" di showSeasonEvaluationModal, altrimenti finirebbe in
// freeDirectors con isHuman:true, dove l'AI potrebbe ripescarlo per errore.
function releaseTeamToFreeAgency(team) {
  team.roster.forEach(p => freeAgents.push(p));
  team.roster = [];
  if (team.coach) { freeCoaches.push(team.coach); team.coach = null; }
  if (team.ds && !team.ds.isHuman) { freeDirectors.push(team.ds); team.ds = null; }
  team.leagueLevel = 'D';
}

function handlePromotionsAndRelegations(standingsA, standingsB, standingsC, currentSerieA, currentSerieB, currentSerieC) {
  const NUM_TEAMS_PROMOTION_RELEGATION = 4;

  // Helper per ordinare la classifica e restituire un array
  const sortStandings = (standings) => Object.entries(standings)
    .map(([name, stats]) => ({ name, ...stats }))
    .sort(compareStandingsRows);

  const sortedA = sortStandings(standingsA);
  const sortedB = sortStandings(standingsB);
  const sortedC = sortStandings(standingsC);

  // Estrai i nomi delle squadre da promuovere/retrocedere
  const relegatedFromANames = sortedA.slice(-NUM_TEAMS_PROMOTION_RELEGATION).map(t => t.name);
  const promotedFromBNames = sortedB.slice(0, NUM_TEAMS_PROMOTION_RELEGATION).map(t => t.name);
  const relegatedFromBNames = sortedB.slice(-NUM_TEAMS_PROMOTION_RELEGATION).map(t => t.name);
  const promotedFromCNames = sortedC.slice(0, NUM_TEAMS_PROMOTION_RELEGATION).map(t => t.name);
  const relegatedFromCNames = sortedC.slice(-NUM_TEAMS_PROMOTION_RELEGATION).map(t => t.name);

  // Trova gli oggetti squadra completi
  const relegatedFromAToB = currentSerieA.filter(t => relegatedFromANames.includes(t.name));
  const promotedFromBToA = currentSerieB.filter(t => promotedFromBNames.includes(t.name));
  const relegatedFromBToC = currentSerieB.filter(t => relegatedFromBNames.includes(t.name));
  const promotedFromCToB = currentSerieC.filter(t => promotedFromCNames.includes(t.name));
  const relegatedFromCToD = currentSerieC.filter(t => relegatedFromCNames.includes(t.name));

  // Le retrocesse in D svincolano tutto — vedi releaseTeamToFreeAgency.
  relegatedFromCToD.forEach(releaseTeamToFreeAgency);

  // Pool D: quelle già dormienti + le 4 appena arrivate dalla C (fino a 14) —
  // 4 vengono ripescate in C A CASO (nessun criterio di forza/rendimento,
  // la D non è mai simulata), le restanti 10 tornano/restano nel pool.
  const dPool = [...serieD, ...relegatedFromCToD];
  shuffleArray(dPool);
  const promotedFromDToC = dPool.slice(0, NUM_TEAMS_PROMOTION_RELEGATION);
  const promotedFromDNames = new Set(promotedFromDToC.map(t => t.name));
  serieD = dPool.filter(t => !promotedFromDNames.has(t.name));
  // Senza questo, una squadra retrocessa in D e ripescata a caso nello STESSO
  // ciclo (es. relegata da C e subito ripromossa) restava con leagueLevel='D'
  // (impostato da releaseTeamToFreeAgency) fino al fixup generale in
  // updateTeamStrengths, molto più avanti nella sequenza — nel frattempo la
  // finestra di valutazione DS/offerte di lavoro la mostrava con badge "Serie
  // D" pur essendo già correttamente dentro l'array serieC.
  promotedFromDToC.forEach(t => t.leagueLevel = 'C');

  // Costruisci le nuove leghe
  const newSerieA = currentSerieA.filter(t => !relegatedFromANames.includes(t.name)).concat(promotedFromBToA);
  const newSerieB = currentSerieB.filter(t => !promotedFromBNames.includes(t.name) && !relegatedFromBNames.includes(t.name)).concat(relegatedFromAToB, promotedFromCToB);
  const newSerieC = currentSerieC.filter(t => !promotedFromCNames.includes(t.name) && !relegatedFromCNames.includes(t.name)).concat(relegatedFromBToC, promotedFromDToC);

  console.log("Retrocessioni da A a B:", relegatedFromAToB);
  console.log("Promozioni da B a A:", promotedFromBToA);
  console.log("Retrocessioni da B a C:", relegatedFromBToC);
  console.log("Promozioni da C a B:", promotedFromCToB);
  console.log("Retrocessioni da C a D:", relegatedFromCToD);
  console.log("Promozioni da D a C:", promotedFromDToC);
  console.log("Nuova Serie A:", newSerieA.map(t => t.name));
  console.log("Nuova Serie B:", newSerieB.map(t => t.name));
  console.log("Nuova Serie C:", newSerieC.map(t => t.name));

  return [newSerieA, newSerieB, newSerieC];
}

// Bug di duplicazione osservato in partita: un giocatore poteva ritrovarsi
// contemporaneamente in rosa a una squadra E nella lista svincolati (o in
// due rose contemporaneamente) — causa esatta non isolata con certezza
// nonostante una diagnosi approfondita (probabile un vecchio disallineamento
// tra freeAgents e i roster, precedente a questa sessione di lavoro). Questa
// bonifica gira a ogni mercato estivo e corregge il sintomo indipendentemente
// dalla causa: 1) un giocatore non può stare in più rose contemporaneamente
// (vince chi lo elenca per primo); 2) uno svincolato non può ANCHE essere in
// una rosa (vince lo svincolo, la rosa lo perde); 3) niente doppioni dentro
// freeAgents stesso.
function sanitizeRosterIntegrity() {
  const allT = [...serieA, ...serieB, ...serieC];
  const seenInRoster = new Set();
  allT.forEach(t => {
    t.roster = t.roster.filter(p => {
      if (seenInRoster.has(p)) return false;
      seenInRoster.add(p);
      return true;
    });
  });
  const seenInFA = new Set();
  freeAgents = freeAgents.filter(p => {
    if (seenInFA.has(p)) return false;
    seenInFA.add(p);
    return true;
  });
  freeAgents.forEach(p => {
    allT.forEach(t => { t.roster = t.roster.filter(x => x !== p); });
  });
}

// Lista "Sul mercato" (vetrina di esuberi/rincalzi CPU messi in vendita
// volontariamente) per la UI del player — NON sposta fisicamente nessuno,
// vedi STEP 6a in updateTeamStrengths per il dettaglio. Estratta come
// funzione a sé per essere riusabile anche in startCareerMarketSession (la
// primissima sessione di mercato a inizio carriera), che prima non ne aveva
// una propria e mostrava sempre "Sul mercato" vuoto.
function buildVoluntaryTransferListing(allTeams) {
  const transferMarket = []; // { player, fromTeam, askingPrice, voluntary }
  allTeams.forEach(team => {
    if (playerTeam && team === playerTeam) return;
    const teamAvg = team.roster.reduce((s, p) => s + p.strength, 0) / team.roster.length;
    const outfield = team.roster.filter(p => p.role !== 'POR').sort((a, b) => a.strength - b.strength);

    getSquadSurplus(team).filter(p => p.age >= 26).forEach(player => {
      const askingPrice = Math.max(0.3, getTransferValue(player) * (0.8 + Math.random() * 0.5));
      transferMarket.push({ player, fromTeam: team, askingPrice, voluntary: true });
    });

    const maxToOffer = Math.floor(Math.random() * 4) + 5; // 5-8 giocatori
    let offered = 0;
    for (const player of outfield) {
      if (transferMarket.some(item => item.player === player)) continue; // già in lista sopra
      if (offered >= maxToOffer) break;
      const isWeak = player.strength < teamAvg * 0.80;
      const isUpgradeable = team.budget > 50 && player.strength < teamAvg * 0.90;
      if (!isWeak && !isUpgradeable) continue;
      const askingPrice = Math.max(0.3, getTransferValue(player) * (0.8 + Math.random() * 0.5));
      transferMarket.push({ player, fromTeam: team, askingPrice, voluntary: true });
      offered++;
    }

    if (team.leagueLevel !== 'A') {
      const remainingOutfield = team.roster.filter(p => p.role !== 'POR' && !transferMarket.some(item => item.player === p));
      const updatedAvg = remainingOutfield.length > 0
        ? remainingOutfield.reduce((s, p) => s + p.strength, 0) / remainingOutfield.length : teamAvg;
      const stars = remainingOutfield.filter(p => p.strength > updatedAvg + 18).sort((a, b) => b.strength - a.strength);
      for (const star of stars) {
        if (Math.random() > 0.60) continue;
        const askingPrice = Math.max(1, getTransferValue(star) * 1.3); // prezzo premium
        transferMarket.push({ player: star, fromTeam: team, askingPrice, voluntary: true });
      }
    }
  });
  return transferMarket;
}

// §1a/§1a-bis REGOLE_CALCIOMERCATO: risoluzione BLOCCANTE dei contratti in
// scadenza, PRIMA che inizi il giro 1 del mercato a turni — sia in estate
// (giocatori già a fine contratto: rinnova o svincola) sia in inverno
// (giocatori in ultimo anno: rinnova ora o accetta il rischio che una CPU
// gli proponga un precontratto senza bisogno del tuo consenso, solo il suo).
// Apre la STESSA finestra "Sessione di Mercato" vera (showManagerMarketModal,
// modalità renewalGate) invece di un popup a parte — solo la tab Rinnovi,
// tutto il resto bloccato finché ogni giocatore non ha una decisione.
function openRenewalGate(players, winter, onDone) {
  if (!playerTeam || !players.length) { onDone(); return; }
  showManagerMarketModal(null, null, { players, winter, onGateDone: onDone });
}

function updateTeamStrengths(standingsA, standingsB, standingsC, newSerieA, newSerieB, newSerieC, onComplete) {
  // Inizio di un nuovo ciclo di mercato: da qui transferLog riparte pulito.
  // Prima si azzerava a inizio stagione (FASE 0), PRIMA che l'utente avesse
  // modo di leggere le notizie del mercato appena concluso — ora resta
  // popolato per l'intera stagione (mercato estivo + eventuale invernale)
  // fino al prossimo mercato vero, qui.
  transferLog = [];
  winterMarketStartAt = null;
  currentMarketIsWinter = false;

  const allTeams = [...newSerieA, ...newSerieB, ...newSerieC];
  const newSerieANames = new Set(newSerieA.map(t => t.name));
  const newSerieBNames = new Set(newSerieB.map(t => t.name));
  const teamMap = new Map(allTeams.map(team => [team.name, team]));

  // I prestiti in corso rientrano al club di appartenenza a inizio stagione,
  // PRIMA di qualunque altra logica di mercato/rosa: da qui in poi ogni ciclo
  // AI (vendite, eccedenze, scouting) opera solo su rose realmente possedute.
  resolveLoanReturns();
  sanitizeRosterIntegrity();

  // Salva la lega precedente PRIMA di sovrascrivere (serve per bonus promozione)
  const prevLeagueMap = {};
  allTeams.forEach(t => { prevLeagueMap[t.name] = t.leagueLevel; });

  // Segna la lega corrente su ogni squadra (usata da createYouthPlayer e dal mercato)
  newSerieA.forEach(t => t.leagueLevel = 'A');
  newSerieB.forEach(t => t.leagueLevel = 'B');
  newSerieC.forEach(t => t.leagueLevel = 'C');

  // --- STEP 0: ESONERI ALLENATORI ---
  const checkDismissals = (standings) => {
    const sorted = Object.entries(standings).map(([name, stats]) => ({ name, ...stats })).sort(compareStandingsRows);
    sorted.forEach(({ name: teamName }, actualRankIdx) => {
      const team = teamMap.get(teamName);
      if (!team || !team.coach || !team.objective) return;
      if (playerTeam && team === playerTeam) return; // il giocatore gestisce l'allenatore dalla tab Panchina
      const actualRank = actualRankIdx + 1;
      const failedObjective = actualRank > team.objective.maxRank + 3;
      // La quota "casuale" era un 8% fisso scollegato dal rendimento reale.
      // Ora metà è rumore residuo (la dirigenza può sempre perdere la
      // pazienza senza un motivo scandagliabile), metà è legata a come la
      // squadra ha chiuso davvero la stagione (currentLosingStreak, aggiornato
      // partita per partita in updateStandings): una striscia di sconfitte
      // nel finale può far scattare l'esonero anche a obiettivo centrato,
      // come capita nella realtà (crollo nel rush finale, panico dirigenziale).
      const streakFireChance = Math.min(0.35, Math.max(0, (team.currentLosingStreak || 0) - 3) * 0.08);
      const casualFire = Math.random() < (0.04 + streakFireChance);
      if ((failedObjective && Math.random() < 0.65) || casualFire) {
        // Rescindere un contratto in corso costa: stipendio × anni residui,
        // stessa regola applicata all'esonero manuale del giocatore.
        const severance = getCoachSeveranceCost(team.coach);
        team.budget -= severance;
        transferLog.push(`${icon('warning')} <strong>${team.name}</strong> esonerato <em>${team.coach.firstName} ${team.coach.lastName}</em> (buonuscita ${severance.toFixed(1)}M€) — obiettivo: ${team.objective.description}, finito: ${actualRank}°`);
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
    Object.entries(standings).map(([name, stats]) => ({ name, ...stats })).sort(compareStandingsRows)
      .forEach(({ name: teamName }, actualRankIdx) => {
        const team = teamMap.get(teamName);
        if (!team || !team.ds || team.ds.isHuman || !team.objective) return;
        const actualRank = actualRankIdx + 1;
        const failed = actualRank > team.objective.maxRank + 4;
        // Stesso principio dell'allenatore sopra: quota casuale ridotta,
        // affiancata da un termine legato alla striscia di sconfitte di fine
        // stagione (effetto più contenuto — il DS costruisce la rosa,
        // risponde meno del rendimento partita per partita rispetto al coach).
        const dsStreakFireChance = Math.min(0.15, Math.max(0, (team.currentLosingStreak || 0) - 4) * 0.04);
        if ((failed && Math.random() < getPresidentFireChance(team.president, 0.45)) || Math.random() < (0.03 + dsStreakFireChance)) {
          const severance = getDsSeveranceCost(team.ds);
          team.budget -= severance;
          transferLog.push(`${icon('stats')} <strong>${team.name}</strong> ha esonerato il DS <em>${team.ds.firstName} ${team.ds.lastName}</em> (buonuscita ${severance.toFixed(1)}M€) — obiettivo: ${team.objective.description}, finito: ${actualRank}°`);
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
    // Soglia: DS in C sopra 60, DS in B sopra 70 attraggono club superiori —
    // un DS che ha appena sovraperformato l'obiettivo (dsOverperformed, STEP
    // 0b) si è fatto notare oltre la sua forza grezza: soglia più bassa e
    // corteggiamento più probabile, non solo un flag salvato senza effetto.
    const minPoachStr = (lowerTeam.leagueLevel === 'C' ? 60 : 70) - (lowerTeam.dsOverperformed ? 8 : 0);
    if (dsStr < minPoachStr) return;
    // Più è forte, più è probabile essere corteggiato
    const poachChance = Math.min(0.75, (dsStr - minPoachStr) * 0.03 + 0.30 + (lowerTeam.dsOverperformed ? 0.15 : 0));
    if (Math.random() > poachChance) return;
    const bigLeague = lowerTeam.leagueLevel === 'C' ? newSerieB : newSerieA;
    const interested = bigLeague
      .filter(t => !t.ds || (!t.ds.isHuman && t.ds.strength < dsStr - 8))
      .sort((a, b) => (a.ds?.strength || 0) - (b.ds?.strength || 0))[0]; // preferisce chi ha DS più debole
    if (!interested) return;
    const ds = lowerTeam.ds;
    if (interested.ds) freeDirectors.push(interested.ds);
    ds.contract = createDSContract(ds, 2 + Math.floor(Math.random() * 3)); // nuovo contratto col club che lo preleva
    interested.ds = ds;
    lowerTeam.ds = null;
    transferLog.push(`${icon('stats')} <strong>${interested.name}</strong> ha ingaggiato il DS <em>${ds.firstName} ${ds.lastName}</em> (Forza: ${ds.strength}) da <strong>${lowerTeam.name}</strong>`);
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
    coach.contract = createCoachContract(coach, 2 + Math.floor(Math.random() * 3)); // nuovo contratto col club che lo preleva
    interested.coach = coach;
    lowerTeam.coach = null;
    transferLog.push(`${icon('warning')} <strong>${interested.name}</strong> ha ingaggiato l'allenatore <em>${coach.firstName} ${coach.lastName}</em> (Forza: ${coach.strength}) da <strong>${lowerTeam.name}</strong>`);
  });

  // --- STEP 1: ETÀ SVINCOLATI ---
  freeAgents.forEach(p => ageProgressPlayer(p));
  // Uno svincolato che non trova squadra per troppe stagioni di fila si
  // ritira comunque, anche se giovane — restare disoccupato per anni non è
  // realistico (senza questo, gli stranieri/svincolati mai ripresi si
  // accumulavano indefinitamente: verificato via simulazione, fino a 800+
  // nel pool dopo 20 stagioni). Stessa logica/probabilità di conversione in
  // staff del ritiro normale per età (STEP 2 sotto): 30% allenatore, 20% DS,
  // 50% ritiro puro — qui possono succedere anche sotto i 37 anni.
  freeAgents.forEach(p => { p.seasonsUnemployed = (p.seasonsUnemployed || 0) + 1; });
  // §5 REGOLE_CALCIOMERCATO: si ritira dopo 3 stagioni consecutive da
  // svincolato (non 4) — la soglia era disallineata dal commento sopra.
  const retiringUnemployed = freeAgents.filter(p => p.age > 36 || p.seasonsUnemployed >= 3);
  freeAgents = freeAgents.filter(p => p.age <= 36 && p.seasonsUnemployed < 3);
  retiringUnemployed.forEach(p => {
    const roll = Math.random();
    if (roll < 0.30) {
      const staff = retiredPlayerToStaff(p);
      freeCoaches.push(staff);
      transferLog.push(`🎓 ${p.firstName} ${p.lastName} si ritira da svincolato (${p.age} anni, Forza: ${p.strength}) e inizia la carriera da <strong>allenatore</strong>`);
    } else if (roll < 0.50) {
      const staff = retiredPlayerToStaff(p);
      freeDirectors.push(staff);
      transferLog.push(`🎓 ${p.firstName} ${p.lastName} si ritira da svincolato (${p.age} anni, Forza: ${p.strength}) e inizia la carriera da <strong>direttore sportivo</strong>`);
    } else {
      transferLog.push(`🎓 ${p.firstName} ${p.lastName} si ritira da svincolato (${p.age} anni, Forza: ${p.strength})`);
    }
  });

  // --- STEP 1b: ETÀ ALLENATORI ---
  freeCoaches.forEach(c => ageProgressCoach(c));
  // Stesso principio già applicato ai giocatori svincolati (STEP 1 sopra): un
  // allenatore libero da troppe stagioni di fila si ritira comunque, anche
  // sotto i 70 anni — senza questo il pool cresce senza controllo (osservato
  // in simulazione: 584 allenatori liberi dopo 10 stagioni con soli +2/
  // stagione garantiti dal ricambio e nessun'altra via d'uscita oltre l'età).
  freeCoaches.forEach(c => { c.seasonsUnemployed = (c.seasonsUnemployed || 0) + 1; });
  freeCoaches = freeCoaches.filter(c => c.age <= 70 && c.seasonsUnemployed <= 5);
  // Ricambio: 2 nuovi allenatori emergenti (mai stati calciatori) ogni
  // stagione, altrimenti il pool si esaurisce nel lungo periodo — vedi
  // createEmergingCoach.
  for (let i = 0; i < 2; i++) freeCoaches.push(createEmergingCoach());
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
    if (!team.coach.contract) team.coach.contract = createCoachContract(team.coach, 2 + Math.floor(Math.random() * 3)); // legacy senza contratto
    team.coach.contract.duration--;
    if (team.coach.contract.duration > 0) return;
    if (playerTeam && team === playerTeam) return; // il giocatore decide dalla tab Panchina
    const coach = team.coach;
    // Se è più forte del tetto della propria lega (staffOverqualified, stessa
    // fascia LEAGUE_STAFF_BAND/TIER usata per l'idoneità in fase di assunzione),
    // a fine contratto preferisce svincolarsi per cercare una squadra di
    // categoria superiore invece di rinnovare — probabilità di restare
    // ribaltata rispetto al caso normale (75% resta / 25% parte → 25%/75%).
    const overqualified = staffOverqualified(coach.strength, team.leagueLevel);
    const staysChance = overqualified ? 0.25 : 0.75;
    if (Math.random() < staysChance) {
      coach.contract = createCoachContract(coach, 1 + Math.floor(Math.random() * 4)); // 1-4 anni: il rinnovo può essere anche di un solo anno
      transferLog.push(`${icon('document')} <strong>${team.name}</strong> rinnova il contratto di <em>${coach.firstName} ${coach.lastName}</em> (${coach.contract.duration} anni)`);
    } else {
      transferLog.push(overqualified
        ? `${icon('document')} <em>${coach.firstName} ${coach.lastName}</em> si svincola da <strong>${team.name}</strong> a fine contratto: si sente pronto per una categoria superiore`
        : `${icon('document')} <em>${coach.firstName} ${coach.lastName}</em> lascia <strong>${team.name}</strong> a fine contratto`);
      freeCoaches.push(coach);
      team.coach = null;
    }
  });

  // --- STEP 1c: ETÀ E RITIRO DIRETTORI SPORTIVI ---
  freeDirectors.forEach(d => ageProgressCoach(d));
  // Stesso principio di STEP 1b sopra (allenatori) e STEP 1 (giocatori
  // svincolati): senza un'uscita legata alla disoccupazione prolungata il
  // pool cresce senza controllo (501 DS liberi osservati dopo 10 stagioni).
  freeDirectors.forEach(d => { d.seasonsUnemployed = (d.seasonsUnemployed || 0) + 1; });
  freeDirectors = freeDirectors.filter(d => d.age <= 70 && d.seasonsUnemployed <= 5);
  // Ricambio: 3 nuovi DS emergenti (mai stati calciatori) ogni stagione,
  // stesso motivo dell'allenatore sopra — vedi createEmergingDirector.
  for (let i = 0; i < 3; i++) freeDirectors.push(createEmergingDirector());
  allTeams.forEach(team => {
    if (!team.ds || team.ds.isHuman) return; // età/ritiro del DS umano gestiti dalla carriera
    ageProgressCoach(team.ds);
    if (team.ds.age > 70) {
      transferLog.push(`${icon('stats')} <em>${team.ds.firstName} ${team.ds.lastName}</em> si ritira come DS di <strong>${team.name}</strong>`);
      team.ds = null;
    }
  });

  // --- STEP 1c-bis: CONTRATTI DS (scadenza e rinnovo) ---
  // Stessa logica dell'allenatore (STEP 1b-bis): pavimento legacy, countdown,
  // e possibilità di svincolarsi se troppo forte per la propria lega invece
  // di rinnovare.
  allTeams.forEach(team => {
    if (!team.ds || team.ds.isHuman) return; // il DS umano gestisce la propria carriera a parte
    if (!team.ds.contract) team.ds.contract = createDSContract(team.ds, 2 + Math.floor(Math.random() * 3)); // legacy senza contratto
    team.ds.contract.duration--;
    if (team.ds.contract.duration > 0) return;
    const ds = team.ds;
    const overqualified = staffOverqualified(ds.strength, team.leagueLevel);
    const staysChance = overqualified ? 0.25 : 0.75;
    if (Math.random() < staysChance) {
      ds.contract = createDSContract(ds, 1 + Math.floor(Math.random() * 4));
      transferLog.push(`${icon('document')} <strong>${team.name}</strong> rinnova il contratto del DS <em>${ds.firstName} ${ds.lastName}</em> (${ds.contract.duration} anni)`);
    } else {
      transferLog.push(overqualified
        ? `${icon('document')} Il DS <em>${ds.firstName} ${ds.lastName}</em> si svincola da <strong>${team.name}</strong> a fine contratto: si sente pronto per una categoria superiore`
        : `${icon('document')} Il DS <em>${ds.firstName} ${ds.lastName}</em> lascia <strong>${team.name}</strong> a fine contratto`);
      freeDirectors.push(ds);
      team.ds = null;
    }
  });

  // Upgrade attivo: le squadre cercano staff migliore tra i liberi ogni stagione
  // Le squadre più blasonate hanno la precedenza nel mercato (vanno per prime)
  [...allTeams].sort((a, b) => getTeamPrestige(b.name) - getTeamPrestige(a.name)).forEach(team => {
    // Upgrade DS: se c'è un libero significativamente più forte E disposto a
    // scendere/restare al livello di questa lega (staffWillingToJoin), lo
    // ingaggia.
    if (team.ds && !team.ds.isHuman && freeDirectors.length > 0) {
      const minGap = 10; // deve essere almeno 10 punti più forte
      const betterDs = freeDirectors
        .filter(d => d.strength > team.ds.strength + minGap && staffWillingToJoin(d.strength, team.leagueLevel))
        .sort((a, b) => b.strength - a.strength)[0];
      if (betterDs && Math.random() < 0.55) {
        freeDirectors.splice(freeDirectors.indexOf(betterDs), 1);
        freeDirectors.push(team.ds);
        betterDs.contract = createDSContract(betterDs, 2 + Math.floor(Math.random() * 3));
        team.ds = betterDs;
        transferLog.push(`${icon('stats')} <strong>${team.name}</strong> migliora il DS: <em>${betterDs.firstName} ${betterDs.lastName}</em> (Forza: ${betterDs.strength})`);
      }
    }
    // Upgrade Coach: meno frequente, stesso vincolo di disponibilità del DS sopra
    if (team.coach && freeCoaches.length > 0 && !(playerTeam && team === playerTeam)) {
      const minGap = 12;
      const betterCoach = freeCoaches
        .filter(c => c.strength > team.coach.strength + minGap && staffWillingToJoin(c.strength, team.leagueLevel))
        .sort((a, b) => b.strength - a.strength)[0];
      if (betterCoach && Math.random() < 0.40) {
        freeCoaches.splice(freeCoaches.indexOf(betterCoach), 1);
        freeCoaches.push(team.coach);
        betterCoach.contract = createCoachContract(betterCoach, 2 + Math.floor(Math.random() * 3));
        team.coach = betterCoach;
        transferLog.push(`${icon('check')} <strong>${team.name}</strong> cambia allenatore: <em>${betterCoach.firstName} ${betterCoach.lastName}</em> (Forza: ${betterCoach.strength})`);
      }
    }
  });

  // Ingaggio nuovo allenatore per squadre rimaste senza (ordine per blasone)
  // Il giocatore è escluso: sceglie l'allenatore dalla tab Panchina del mercato estivo
  [...allTeams].sort((a, b) => getTeamPrestige(b.name) - getTeamPrestige(a.name)).forEach(team => {
    if (team.coach || (playerTeam && team === playerTeam)) return;
    // Un allenatore non scende MAI sotto il proprio tier naturale
    // (staffWillingToJoin: un 85, tier A, rifiuta B/C) — quindi tra i
    // candidati idonei si prende sempre il più forte, ma il pool è già
    // limitato a chi accetterebbe davvero questa lega. Solo se non c'è
    // NESSUN candidato disposto si crea un allenatore ex-novo nella fascia
    // della lega (createCoach, mai fuori fascia).
    const pool = freeCoaches.map((c, i) => ({ c, i })).filter(x => staffWillingToJoin(x.c.strength, team.leagueLevel));
    const candidateIdx = pool.sort((a, b) => b.c.strength - a.c.strength)[0]?.i;
    if (candidateIdx !== undefined) {
      const coach = freeCoaches.splice(candidateIdx, 1)[0];
      coach.contract = createCoachContract(coach, 2 + Math.floor(Math.random() * 3));
      team.coach = coach;
      transferLog.push(`${icon('check')} <strong>${team.name}</strong> ingaggia <em>${coach.firstName} ${coach.lastName}</em> (Forza: ${coach.strength})`);
    } else {
      team.coach = createCoach(team);
      transferLog.push(`${icon('check')} <strong>${team.name}</strong> crea <em>${team.coach.firstName} ${team.coach.lastName}</em> (Forza: ${team.coach.strength})`);
    }
  });

  // Ingaggio nuovo DS per squadre rimaste senza (ordine per blasone) — stessa
  // logica di disponibilità dell'allenatore sopra (staffWillingToJoin).
  [...allTeams].sort((a, b) => getTeamPrestige(b.name) - getTeamPrestige(a.name)).forEach(team => {
    if (team.ds) return;
    const dPool = freeDirectors.map((d, i) => ({ d, i })).filter(x => staffWillingToJoin(x.d.strength, team.leagueLevel));
    const candidateIdx = dPool.sort((a, b) => b.d.strength - a.d.strength)[0]?.i;
    if (candidateIdx !== undefined) {
      const ds = freeDirectors.splice(candidateIdx, 1)[0];
      ds.contract = createDSContract(ds, 2 + Math.floor(Math.random() * 3));
      team.ds = ds;
      transferLog.push(`${icon('stats')} <strong>${team.name}</strong> ingaggia <em>${ds.firstName} ${ds.lastName}</em> come nuovo DS (Forza: ${ds.strength})`);
    } else {
      team.ds = createDirector(team);
      transferLog.push(`${icon('stats')} <strong>${team.name}</strong> crea <em>${team.ds.firstName} ${team.ds.lastName}</em> come nuovo DS (Forza: ${team.ds.strength})`);
    }
  });

  // --- STEP 1d: CONTRATTI ---
  // Scadenze, parametro zero, rinnovi automatici
  pendingRenewals = []; // Reset per il turno corrente
  allTeams.forEach(team => {
    const expired = [];
    const isPlayerTeam = playerTeam && team === playerTeam;
    // Rinnovo anticipato "per tempo" (solo squadre CPU): quando un giocatore
    // entra nell'ultimo anno di contratto, la squadra prova a blindarlo
    // SUBITO invece di aspettare la scadenza reale — con priorità in base a
    // quanto è importante per il modulo (titolare 90%, prima riserva 75%,
    // il resto della rosa segue solo la normale procedura a scadenza). Se il
    // tentativo anticipato fallisce (il giocatore non vuole restare),
    // resta comunque una seconda chance alla scadenza vera e propria.
    const tiers = isPlayerTeam ? null : getSquadTiers(team);
    team.roster.forEach(player => {
      // Giocatori legacy senza contratto: assegna uno retroattivamente
      if (!player.contract) {
        player.contract = createContract(player.strength, player.age);
        player.personality = player.personality || createPersonality();
      }
      player.contract.duration--;
      if (!isPlayerTeam && player.contract.duration === 1) {
        const proactiveChance = tiers.starters.has(player) ? 0.90 : tiers.reserves.has(player) ? 0.75 : 0;
        if (proactiveChance > 0 && Math.random() < proactiveChance) tryRenewContract(player, team);
      }
      if (player.contract.duration <= 0) {
        const preContract = pendingPreContracts.find(pc => pc.player === player);
        if (preContract) {
          resolvePreContractDeparture(player, preContract);
        } else if (playerTeam && team === playerTeam) {
          if (player.age >= 36) {
            // Si ritirerà in Step 2 — niente rinnovo
            transferLog.push(`🎓 <em>${player.firstName} ${player.lastName}</em> si ritirerà a fine stagione — nessun rinnovo necessario`);
          } else if (renewalInterest.has(player.id)) {
            // Interesse emerso e non risolto durante il mercato invernale
            // (tab Rinnovi lì, vedi finishAndata): il giocatore parte SUBITO
            // per la squadra interessata, non passa dalla tab Rinnovi di fine
            // stagione — quella resta riservata a chi non ha suscitato interesse.
            resolveExpiringPlayerDeparture(player);
          } else {
            pendingRenewals.push(player); // Il giocatore decide nel modal, con calma
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
          : ROLES.filter(r => r !== 'POR').find(r => canAddRole(team, r)) || p.role;
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

  // STEP 3b (prestiti CPU-vs-CPU) rimosso da qui: assorbito nel mercato a
  // turni (STEP 6, sotto) — la logica di sfoltimento del mercato a turni
  // include già il prestito dei giovani in esubero come una delle opzioni.

  // --- STEP 4: MAGNATI ---
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
    Object.entries(standings)
      .map(([name, stats]) => ({ name, ...stats }))
      .sort(compareStandingsRows)
      .forEach((teamStats, index) => {
        const team = teamMap.get(teamStats.name);
        if (!team) return;
        team.budget = (team.budget || 0) + getPrizeMoney(leagueName, index);
        // Stipendio reale da contratto (stessa cifra mostrata in UI come
        // "Monte ingaggi", getTeamWageBill — include già rosa + allenatore +
        // DS, nessuna somma separata per loro) — prima era una stima
        // scollegata a forza² dei giocatori, che non corrispondeva mai al
        // monte ingaggi realmente mostrato/usato come tetto acquisti.
        const salaryCost = annualSalary(getTeamWageBill(team)) / 1000;
        team.budget -= salaryCost;

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
        // §3 REGOLE_CALCIOMERCATO: nessun tetto di accumulo — l'eccedenza non
        // spesa si somma per intero (carry-over totale) alla sessione successiva.
      });
  };
  applyFinances(standingsA, 'A');
  applyFinances(standingsB, 'B');
  applyFinances(standingsC, 'C');

  // --- STEP 5.5: VENDITE FORZATE PER BILANCIO NEGATIVO ---
  // Si applica alle squadre AI. La squadra del giocatore gestisce le vendite nel modal estivo.
  // Vende a un acquirente VERO (stessa ricerca/stesso sconto 0.60-0.90×
  // dello sfoltimento normale, findBuyerForSurplusPlayer) — non più uno
  // svincolo che fabbricava cassa dal nulla: svincolare COSTA (buonuscita),
  // non frutta mai un incasso, quindi una squadra in rosso deve vendere a
  // qualcun altro, non semplicemente liberarsi del giocatore.
  allTeams.forEach(team => {
    if (team.budget >= 0) return;
    if (playerTeam && team === playerTeam) return; // il giocatore sceglie chi cedere nel mercato
    const sellable = [...team.roster.filter(p => p.role !== 'POR')]
      .sort((a, b) => b.strength - a.strength); // prima i più forti (massimo incasso)
    for (const player of sellable) {
      if (team.budget >= 0) break;
      const sale = findBuyerForSurplusPlayer(player, team, { allTeams });
      if (!sale) continue; // nessun acquirente disposto per questo giocatore, prova il prossimo
      team.roster = team.roster.filter(p => p !== player);
      sale.buyer.roster.push(player);
      team.budget += sale.price;
      sale.buyer.budget -= sale.price;
      recalculateTeamStrength(sale.buyer);
      recordTransfer(player, sale.buyer.name, sale.price);
      transferLog.push(`💸 <strong>${team.name}</strong> → <strong>${sale.buyer.name}</strong>: ${player.firstName} ${player.lastName} (Forza: ${player.strength}) per <strong>${sale.price.toFixed(1)}M€</strong> (bilancio in rosso)`);
    }
    if (team.budget < 0) team.budget = 0; // floor di sicurezza: nessuno vuole nessuno dei suoi giocatori
    recalculateTeamStrength(team);
  });

  // Il presidente fissa monte ingaggi e bonus di budget anche per le CPU, non
  // solo per il player (`briefPresidentBudget`, già esistente e riusata
  // identica): prima le squadre CPU avevano solo `team.budget` come unico
  // vincolo, con cassa e sostenibilità stipendi appiattite sullo stesso
  // numero — un club con poca cassa ma monte ingaggi ancora capiente non
  // poteva nemmeno tesserare uno svincolato a costo zero.
  allTeams.forEach(team => {
    if (playerTeam && team === playerTeam) return; // il player ha già il proprio briefing (proceedWithMarket)
    briefPresidentBudget(team);
  });

  // --- STEP 6: MERCATO TRASFERIMENTI ---
  // 6a: lista "Sul mercato" per la UI del player (buildVoluntaryTransferListing,
  // riusata anche da startCareerMarketSession per la primissima sessione di
  // inizio carriera) — SOLO una lista, non sposta più fisicamente nessuno (la
  // vera compravendita CPU-vs-CPU passa ora dal mercato a turni, subito
  // sotto): un esubero resta davvero in rosa alla sua squadra finché non
  // viene COMPRATO per davvero, dal player o da una CPU durante il suo turno.
  if (playerTeam) pendingTransferMarket = buildVoluntaryTransferListing(allTeams);

  // Mercato a turni CPU-vs-CPU (Fase 7 del piano): sostituisce le vecchie
  // priorità 1-3 in 6 cicli fissi con uno scheduler a turni per forza DS —
  // bisogni di rosa REALI (non solo "sotto media"), fit tattico col modulo,
  // consenso del giocatore (forza/ambizione vs ambizione della squadra),
  // sfoltimento con vendita→prestito→svincolo. Assorbe anche i prestiti
  // CPU-vs-CPU (ex STEP 3b, ora parte della logica di sfoltimento). Il
  // Il player ora partecipa DAVVERO al mercato a turni, nel suo punto reale
  // della coda per forza DS (non più escluso): quando tocca a lui si apre
  // un turno singolo (una sola azione, come una CPU — vedi
  // showPlayerTurnMarketModal), non la sua sessione libera completa (quella,
  // showManagerMarketModal, resta invariata e arriva DOPO che questo intero
  // scheduler converge, per rinnovi/allenatore/moduli e shopping residuo).
  // Lo scheduler è quindi asincrono: tutto quello che nel vecchio codice
  // veniva subito dopo runTurnBasedMarket() ora vive nella callback che gli
  // viene passata, invocata solo a schedulazione conclusa.
  // §1a: i contratti dell'umano in scadenza quest'estate (pendingRenewals,
  // popolati sopra in STEP 1d) vanno risolti PRIMA che parta il giro 1, come
  // fase bloccante — non più "con calma" durante i turni.
  openRenewalGate(pendingRenewals, false, () => {
  runTurnBasedMarket(() => {

  // 6b-bis: mercato estero, INDIPENDENTE dal mercato a turni sopra (non richiede
  // che gli acquisti domestici siano falliti, né i loro gate di partecipazione
  // 35%/avgStr — prima l'acquisto estero era sepolto in fondo alla catena e
  // finiva per non succedere quasi mai, specie nel mercato invernale a una
  // sola passata). Ogni squadra di Serie A sotto il tetto di 3 stranieri ha
  // una possibilità dedicata, una volta a fine mercato estivo.
  allTeams.forEach(team => {
    if (playerTeam && team === playerTeam) return;
    if (team.leagueLevel !== 'A' || !canBuyForeignPlayer(team)) return;
    if (team.budget < 3) return;
    const foreignSkipChance = Math.max(0.25, Math.min(0.75, 0.45 * getMarketAggressiveness(team)));
    if (Math.random() > foreignSkipChance) return; // partecipazione modulata da ambizione/generosità presidente
    __recordMarketAttempt(team);
    const cand = generateForeignCandidate();
    if (canAddRole(team, cand.role) && canTeamAcquirePlayer(team, cand) && canRebalanceForDeal(team, cand.cost, cand.salary)) {
      const ev = evaluateTransferTarget(team, cand, cand.cost);
      if (ev && __marketStatsSink) __marketStatsSink.push({ team: team.name, gain: ev.gain, cost: ev.cost, score: ev.score });
      if (ev && ev.gain > 0) {
        const player = materializeForeignCandidate(cand, team);
        commitRebalanceForDeal(team, cand.cost, cand.salary);
        team.roster.push(player);
        team.budget -= cand.cost;
        recalculateTeamStrength(team);
        transferLog.push(`${icon('money')} <strong>${team.name}</strong> acquista ${player.firstName} ${player.lastName} (${player.age} anni, Forza: ${player.strength}) da <strong>${cand.fromClub}</strong> per <strong>${cand.cost.toFixed(1)}M€</strong>`);
      }
    }
  });

  // --- STEP 6d: POACHING PER BLASONE ---
  // Cascata naturale: A compra da B, B compra da C — chi ha soldi migliora la rosa
  // Il filtro ora usa gerarchia di lega, non prestige (evita bug con B storiche vs A neopromossi)
  // I prestiti CPU-vs-CPU (dentro il mercato a turni, sopra) possono aver già
  // creato nuovi prestiti a questo punto: un giocatore ospitato in prestito
  // compare fisicamente in team.roster dell'ospitante, ma quel club non lo
  // possiede — va ricalcolato QUI (non più a inizio STEP 6, che ora gira
  // prima del mercato a turni) per riflettere i prestiti appena creati.
  const loanedPlayersThisMarket = new Set(activeLoans.map(l => l.player));
  const leagueRank = lv => lv === 'A' ? 1 : lv === 'B' ? 2 : 3;
  const poachedPlayers = new Set();
  [...allTeams].sort((a, b) => getTeamPrestige(b.name) - getTeamPrestige(a.name)).forEach(buyingTeam => {
    if (playerTeam && buyingTeam === playerTeam) return; // Il giocatore gestisce i propri acquisti
    if (buyingTeam.budget < 15) return;
    const buyerPrestige = getTeamPrestige(buyingTeam.name);
    const dsQuality = buyingTeam.ds ? buyingTeam.ds.strength : 40;
    const dsBonus = Math.round((dsQuality - 50) / 8);

    // 80% delle squadre tenta 3 acquisti, 20% ne tenta 1 (era 65%/2-1)
    const maxAttempts = Math.random() < 0.80 ? 3 : 1;
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      if (Math.random() > 0.85) continue; // 15% skip per tentativo (era 30%)

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
          if (isSessionLocked(player)) return; // §5: già trasferito in questa sessione
          if (isPreContracted(player)) return; // §1a-bis: bloccato per il mercato in uscita
          // Un giocatore ospitato in prestito da sellingTeam non è suo da
          // vendere (vedi nota su loanedPlayersThisMarket in STEP 6a) —
          // stessa causa del bug di duplicazione osservato in partita.
          if (loanedPlayersThisMarket.has(player)) return;
          if (playerTeam && sellingTeam === playerTeam) return; // L'AI non può sottrarre giocatori al player
          if (!canAddRole(buyingTeam, player.role)) return;
          if (!canTeamAcquirePlayer(buyingTeam, player)) return;
          if (player.strength <= targetFloor) return;
          // Stesso motivo dell'Opzione 1 del mercato a turni: pagare un
          // giocatore all'ultimo anno di contratto è un pessimo affare, tra
          // poco è ottenibile gratis via precontratto da chiunque.
          if ((player.contract?.duration ?? 99) <= 1) return;
          const bid = getTransferValue(player) * 1.5;
          if (!canRebalanceForDeal(buyingTeam, bid, player.contract?.salary ?? getDisplaySalary(player.strength))) return;
          if (!bestTarget || player.strength > bestTarget.strength) {
            bestTarget = player; bestSeller = sellingTeam;
          }
        });
      });

      if (!bestTarget) break;

      // Anche il prezzo offerto risente della qualità del DS, non solo la
      // scelta del bersaglio: un DS scarso è un negoziatore peggiore e a
      // volte offre più del dovuto pur di chiudere in fretta (fino a +15%
      // per DS ≤10), uno forte (≥60) non sbaglia mai al rialzo.
      const dsPriceNoise = 1 + Math.random() * Math.max(0, (60 - dsQuality) / 60) * 0.15;
      const finalBid = Math.round(getTransferValue(bestTarget) * 1.5 * dsPriceNoise * 10) / 10;

      // Consenso del giocatore (unico filtro, mai forzabile — nessuna clausola
      // rescissoria): cascata A←B e B←C normale.
      const crossLeague = leagueRank(bestSeller.leagueLevel) > leagueRank(buyingTeam.leagueLevel);
      const needsCash = bestSeller.budget < 20;
      const prestigeDiff = buyerPrestige - getTeamPrestige(bestSeller.name);
      const baseAccept = needsCash ? 0.92 : crossLeague ? 0.80 : 0.32; // era 0.87/0.72/0.22
      const prestigeBonus = Math.min(0.18, prestigeDiff * 0.025);
      const sellerDsProtect = bestSeller.ds ? Math.max(0, (bestSeller.ds.strength - 50) / 250) : 0;
      if (Math.random() >= (baseAccept + prestigeBonus - sellerDsProtect)) continue;
      const bestTargetSalary = bestTarget.contract?.salary ?? getDisplaySalary(bestTarget.strength);
      if (!canRebalanceForDeal(buyingTeam, finalBid, bestTargetSalary)) continue;
      commitRebalanceForDeal(buyingTeam, finalBid, bestTargetSalary);

      bestSeller.roster = bestSeller.roster.filter(p => p !== bestTarget);
      buyingTeam.roster.push(bestTarget);
      buyingTeam.budget -= finalBid;
      bestSeller.budget += finalBid;
      poachedPlayers.add(bestTarget);
      lockForSession(bestTarget);
      recalculateTeamStrength(buyingTeam);
      recalculateTeamStrength(bestSeller);
      recordTransfer(bestTarget, buyingTeam.name, finalBid);
      transferLog.push(`${icon('money')} <strong>${buyingTeam.name}</strong> acquista ${bestTarget.firstName} ${bestTarget.lastName} (${bestTarget.age} anni, Forza: ${bestTarget.strength}) da <strong>${bestSeller.name}</strong> per <strong>${finalBid.toFixed(1)}M€</strong>`);
    }
  });

  // Chi ha trovato squadra questa stagione (assunzioni/upgrade/poaching, tutti
  // già avvenuti a questo punto della pipeline) riparte da zero stagioni di
  // disoccupazione se in futuro dovesse tornare libero — altrimenti porterebbe
  // dietro il conteggio della disoccupazione precedente al prossimo esonero.
  allTeams.forEach(team => {
    if (team.coach) team.coach.seasonsUnemployed = 0;
    if (team.ds) team.ds.seasonsUnemployed = 0;
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
        const youthRoles = needed.length > 0 ? needed : ROLES.filter(r => r !== 'POR' && canAddRole(team, r));
        const role = youthRoles[Math.floor(Math.random() * youthRoles.length)] || 'CEN';
        const youth = createYouthPlayer(role, team);
        team.roster.push(youth);
      }
    }
    recalculateTeamStrength(team);
  });

  onComplete();
  }); // fine callback runTurnBasedMarket
  }); // fine callback openRenewalGate
}

// ── PROTOTIPO SPERIMENTALE — MERCATO A TURNI (Fase 7 del piano) ─────────────
// NON collegata al flusso di gioco reale (updateTeamStrengths/STEP 6 restano
// invariati): è una funzione a sé, richiamabile a mano dalla console del
// browser (`runTurnBasedMarket()`) per osservare come si comporterebbe un
// mercato a turni sulle squadre CPU attuali, prima di decidere se sostituire
// il flusso a batch esistente. Nessun salvataggio/stato del gioco viene
// alterato in modo diverso da come farebbe un mercato normale (le transazioni
// sono vere, sulla partita in corso — usare su una partita di prova).
//
// Regole implementate (vedi discussione nel piano):
// - Ordine di turno per forza DS decrescente.
// - Una squadra fa UNA azione per turno (acquisto esubero altrui, svincolato,
//   prestito in uscita) o passa se non ha bisogni reali o nessuna opzione.
// - Un giocatore coinvolto in una transazione è "bloccato" (lockedPlayers)
//   per il resto della sessione — non ricoinvolgibile finché non torna
//   svincolato (lo svincolo attivo non è implementato in questo v1: bloccato
//   resta bloccato per l'intera chiamata).
//   Un giocatore già in prestito (activeLoans) non è mai comprabile/vendibile.
// - Le squadre coinvolte in una transazione (acquirente+venditore, o
//   club d'origine+destinazione per un prestito) saltano il resto del giro
//   corrente — non possono agire di nuovo finché non riparte il giro dopo.
// - Il giro si ripete finché non se ne completa uno intero senza nessuna
//   azione (equivalente a "tutte le squadre hanno passato").
// - Il player NON agisce in questo prototipo (gestirebbe il proprio turno
//   dalla UI, non ancora costruita): passa sempre.
// Se true, la squadra del player agisce con la stessa logica automatica delle
// CPU invece di passare sempre — SOLO per test/osservazione (non è "il player
// che gioca", è "come se la sua squadra seguisse le stesse regole delle
// altre"): una vera interazione player richiede una UI dedicata, non ancora
// costruita. Di default false per non alterare mai una sessione normale.
let TURN_MARKET_AUTO_PLAY_HUMAN = false;

function turnMarketLog(team, ...args) {
  // no-op: era un log di debug filtrato su 3 squadre campione (Vicenza,
  // Brescia, Padova), usato solo in fase di sviluppo del mercato a turni —
  // non incideva mai sulla logica di acquisto/vendita, solo sulla console.
}

// Finestra bloccante "calciomercato in corso" mostrata mentre lo scheduler a
// turni gira da solo tra un turno reale del player e l'altro — senza questo
// il gioco sembra fermo per i molti turni CPU-vs-CPU che non producono
// nessuna UI. A differenza della vecchia barra in basso (Fase 19), qui
// nessun elemento della pagina resta cliccabile: è un vero mm-overlay, senza
// bottone di chiusura, che sparisce da solo quando tocca al player o arriva
// un'offerta. Il pannello di sinistra riusa i dati/helper della Gazzetta del
// Pallone (buildNewsFeed/NEWS_CATEGORIES/newsForLeagueAndCat/newsArticleHtml)
// ma con DOM id e uno stato (marketNewsState) separati dalla finestra Notizie
// standalone, per non interferire con essa se l'utente la riapre altrove.
let _marketBusyRenderedLen = 0;
const marketNewsState = { league: 'A', cat: 'calciomercato', team: '' };

function renderMarketNewsPanel() {
  if (!document.getElementById('market-busy-overlay')) return;
  const feed = buildNewsFeed();
  ['A', 'B', 'C'].forEach(l => {
    const n = feed.filter(x => x.leagues.includes(l)).length;
    const el = document.getElementById('mkt-news-count-' + l);
    if (el) el.textContent = n + (n === 1 ? ' notizia' : ' notizie');
  });
  document.querySelectorAll('#market-busy-overlay .news-league-tab').forEach(el => el.classList.toggle('active', el.dataset.league === marketNewsState.league));

  const teamFilterWrap = document.getElementById('mkt-news-team-filter-wrap');
  if (teamFilterWrap) {
    teamFilterWrap.innerHTML = buildNewsTeamFilterHtml(marketNewsState);
    teamFilterWrap.querySelector('.news-team-filter').addEventListener('change', e => {
      marketNewsState.team = e.target.value;
      renderMarketNewsPanel();
    });
  }

  const catCounts = {};
  NEWS_CATEGORIES.forEach(c => { catCounts[c.key] = newsForLeagueAndCat(feed, marketNewsState.league, c.key, marketNewsState.team).length; });
  const catTabs = document.getElementById('mkt-news-cat-tabs');
  if (!catTabs) return;
  catTabs.innerHTML = NEWS_CATEGORIES.map(c =>
    `<div class="news-cat-tab${marketNewsState.cat === c.key ? ' active' : ''}" data-cat="${c.key}">${c.label} <span style="opacity:.7">(${catCounts[c.key]})</span></div>`
  ).join('');
  catTabs.querySelectorAll('.news-cat-tab').forEach(el => {
    el.addEventListener('click', () => { marketNewsState.cat = el.dataset.cat; renderMarketNewsPanel(); });
  });

  const items = newsForLeagueAndCat(feed, marketNewsState.league, marketNewsState.cat, marketNewsState.team); // già più recenti prima (buildNewsFeed)
  const wrap = document.getElementById('mkt-news-articles');
  if (!wrap) return;
  if (!items.length) {
    wrap.innerHTML = `<div class="news-empty">Nessuna notizia in questa categoria${marketNewsState.team ? ` per ${marketNewsState.team}` : ` per Serie ${marketNewsState.league}`}.</div>`;
    return;
  }
  const featured = [...items].sort((a, b) => b.cost - a.cost).slice(0, 3);
  const catLabel = (NEWS_CATEGORIES.find(c => c.key === marketNewsState.cat) || {}).label || '';
  wrap.innerHTML = featured.map(n => newsArticleHtml(n, marketNewsState.league)).join('')
    + `<div class="news-roundup"><h4>TUTTI I MOVIMENTI — ${catLabel}</h4>${newsRoundupHtml(items, marketNewsState.league)}</div>`;
}

function showMarketProgressBar() {
  if (document.getElementById('market-busy-overlay')) return;
  marketNewsState.league = 'A';
  marketNewsState.cat = 'calciomercato';
  marketNewsState.team = '';
  _marketBusyRenderedLen = 0;
  const overlay = document.createElement('div');
  overlay.className = 'mm-overlay market-busy-overlay';
  overlay.id = 'market-busy-overlay';
  overlay.innerHTML = `
    <div class="mm-box market-busy-box">
      <div class="market-busy-news">
        <div class="news-body">
          <div class="news-league-tabs">
            <div class="news-league-tab" data-league="A">SERIE A<span class="news-count" id="mkt-news-count-A"></span></div>
            <div class="news-league-tab" data-league="B">SERIE B<span class="news-count" id="mkt-news-count-B"></span></div>
            <div class="news-league-tab" data-league="C">SERIE C<span class="news-count" id="mkt-news-count-C"></span></div>
          </div>
          <div class="news-cat-tabs" id="mkt-news-cat-tabs"></div>
          <div class="news-team-filter-wrap" id="mkt-news-team-filter-wrap"></div>
          <div class="news-articles" id="mkt-news-articles"></div>
        </div>
      </div>
      <div class="market-busy-main">
        <div class="market-busy-title">${icon('cycle')} Calciomercato in corso...</div>
        <div class="market-busy-daycounter" id="market-day-counter"></div>
        <div class="market-busy-ticker-list" id="market-busy-ticker-list"></div>
        <div class="market-progress-track"></div>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  overlay.querySelectorAll('.news-league-tab').forEach(el => {
    el.addEventListener('click', () => { marketNewsState.league = el.dataset.league; marketNewsState.cat = 'calciomercato'; marketNewsState.team = ''; renderMarketNewsPanel(); });
  });
  renderMarketNewsPanel();
  pushMarketTicker();
}

function hideMarketProgressBar() {
  document.getElementById('market-busy-overlay')?.remove();
}

// §0 REGOLE_CALCIOMERCATO: i "giri" dello scheduler sono anche "giorni di
// mercato" — pura percezione del tempo che passa (non cambia la logica dei
// turni), con date di calendario coerenti e un countdown di quanti giorni
// restano. Estivo: 1° luglio → tanti giorni quanti maxRounds (40). Invernale:
// 2 gennaio → tanti giorni quanti maxRounds (20).
function formatMarketDay(round, maxRounds, isWinter) {
  const startMonth = isWinter ? 0 : 6; // gennaio=0, luglio=6 (Date, 0-based)
  const startDay = isWinter ? 2 : 1;
  const d = new Date(2000, startMonth, startDay + Math.max(0, round - 1));
  const dateLabel = d.toLocaleDateString('it-IT', { day: 'numeric', month: 'long' });
  const remaining = Math.max(0, maxRounds - round);
  return `Giorno di mercato ${round} — ${dateLabel} <span style="opacity:.7">(${remaining} giorno/i rimasti)</span>`;
}
function updateMarketDayCounter(round, maxRounds, isWinter) {
  const el = document.getElementById('market-day-counter');
  if (el) el.innerHTML = formatMarketDay(round, maxRounds, isWinter);
}

// Aggiunge alla lista scorrevole ogni voce REALMENTE nuova di transferLog da
// quando la finestra è apparsa (non solo l'ultima, a differenza del vecchio
// ticker a riga singola) — tiene solo le ultime MAX_ITEMS, le più vecchie
// escono dall'alto.
function pushMarketTicker() {
  const list = document.getElementById('market-busy-ticker-list');
  if (!list) return;
  const MAX_ITEMS = 6;
  let added = false;
  while (_marketBusyRenderedLen < transferLog.length) {
    const entry = transferLog[_marketBusyRenderedLen];
    _marketBusyRenderedLen++;
    const row = document.createElement('div');
    row.className = 'market-busy-ticker-row';
    row.innerHTML = entry;
    list.appendChild(row);
    added = true;
    while (list.children.length > MAX_ITEMS) list.removeChild(list.firstChild);
  }
  if (added) {
    renderMarketNewsPanel();
    list.scrollTop = list.scrollHeight;
  }
}

// Un giocatore "sta nel sistema" della squadra se il suo ruolo (primario o
// secondario, playerCanPlayRole copre entrambi) occupa almeno uno slot in
// UNO dei due moduli preferiti dell'allenatore — es. un'ala o un trequartista
// puro in una squadra che gioca solo 3-1-4-2/5-4-1 (zero slot ALA/TRQ in
// entrambi) non ci sta MAI, indipendentemente da età o forza: è peso morto
// tattico, un candidato alla vendita a prescindere dagli altri criteri.
function playerFitsTeamSystem(player, team) {
  const formations = team.coach?.formations?.length ? team.coach.formations : [pickActiveFormation(team)];
  return formations.some(f => {
    const slots = FORMATIONS[f] || FORMATIONS['4-4-2'];
    return ROLES.some(role => (slots[role] || 0) > 0 && playerCanPlayRole(player, role));
  });
}

// Probabilità che IL GIOCATORE accetti di trasferirsi in `team` — finora nel
// mercato si modellava solo il consenso della squadra (venditrice/acquirente),
// mai quello del giocatore stesso: un 95 di forza poteva "arrivare" a una
// squadra di A con obiettivo Salvezza tanto quanto a una che punta al
// Titolo. Due fattori, come richiesto: (1) quanto il giocatore è più forte
// della rosa attuale (fuori portata, aggravato dalla sua ambizione — un
// giocatore ambizioso è più esigente, uno con poca ambizione si accontenta);
// (2) l'ambizione della squadra (team.objective/Previsioni, tier 1-12 —
// Titolo A attrae anche chi è oggettivamente più forte della rosa attuale,
// una squadra di A che lotta per la Salvezza fatica doppio anche a parità di
// gap di forza). Ritorna una probabilità 0-0.95 (taglio netto: può arrivare
// a impossibilità assoluta se il giocatore è troppo forte per il contesto,
// mai però a certezza assoluta al 100%).
function estimatePlayerJoinChance(player, team) {
  const strengthGap = player.strength - (team.strength || 0);
  const teamTier = estimateObjectiveGlobalTier(team); // 1 (C Salvezza) .. 12 (A Titolo)
  const ambition = player.personality?.ambition ?? 50;

  // Taglio netto (su richiesta esplicita dell'utente): penalità più ripida
  // e nessun pavimento — un giocatore troppo forte per il contesto arriva
  // a un vero 0%, non resta mai un 3% residuo di possibilità.
  const gapPenalty = Math.max(0, strengthGap) * (2.8 + ambition / 100 * 1.7);
  const tierBonus = (teamTier - 8) * 5; // neutro alto (tier 8 = B Promozione): l'ambizione conta molto, non basta "essere in A"

  const chance = 70 - gapPenalty + tierBonus;
  return Math.max(0, Math.min(95, chance)) / 100;
}

// §5 REGOLE_CALCIOMERCATO: consenso a fasce anche per le tue tab Acquisti/
// Prestiti — nessun tetto di forza per lega, il consenso è l'unico filtro.
// Calcolato UNA volta a giocatore per l'intera sessione (altrimenti la
// lista cambierebbe a ogni render, o si potrebbe "ritentare" cambiando
// tab): chi rifiuta semplicemente non compare in lista, non c'è mai un
// tentativo di acquisto/prestito che fallisce a metà.
function playerAcceptsHumanTeam(player) {
  if (!mmSessionBuyConsent.has(player.id)) {
    mmSessionBuyConsent.set(player.id, Math.random() < estimatePlayerJoinChance(player, playerTeam));
  }
  return mmSessionBuyConsent.get(player.id);
}

// Vero se aggiungere `player` alla rosa lo farebbe entrare negli 11 titolari
// del modulo attivo — non solo "migliora il punteggio di squadra" (che
// evaluateTransferTarget conta anche per un rincalzo di riserva, ×0.35).
// Usato per due filtri di buonsenso sugli acquisti: comprare un giocatore
// debole/anziano che farebbe solo panchina non ha senso se non è un
// prospetto giovane, e uno straniero (slot scarso, tetto di 3) non va mai
// "speso" per un posto in panchina — ha senso solo se è un titolare vero.
function wouldEnterBest11(team, player) {
  const formation = pickActiveFormation(team);
  const withPlayer = getBest11([...team.roster, player], formation);
  return withPlayer.some(e => e.player === player);
}

// Distanza in "gradini" di lega tra due squadre (A-B o B-C = 1, A-C = 2) —
// stessa gerarchia di STEP 6d (corteggiamento di blasone), qui riusata per
// evitare che il mercato a turni faccia saltare un giocatore di due leghe in
// un colpo solo (es. da A a C): nella realtà un cartellino scende o sale al
// massimo di una categoria alla volta, quasi mai due.
function leagueTierGap(teamA, teamB) {
  const rank = lv => lv === 'A' ? 1 : lv === 'B' ? 2 : 3;
  return Math.abs(rank(teamA.leagueLevel) - rank(teamB.leagueLevel));
}

// Cerca un acquirente per un giocatore che la squadra vuole sfoltire
// (iniziativa del venditore, non del compratore come nell'opzione 1 di
// acquisto): tra le squadre che ne trarrebbero un guadagno reale
// (evaluateTransferTarget) e possono permetterselo, sceglie quella con lo
// score migliore. Ritorna null se nessuna è interessata.
// Prezzo scontato (0.60-0.90× il valore reale): chi vende per necessità
// (sfoltimento, bilancio in rosso) non è in posizione di forza per
// negoziare — stessa identica formula/range di generateSellOffers (il tuo
// "Vendi"), apposta, per non avvantaggiare CPU o umano l'uno sull'altro.
function findBuyerForSurplusPlayer(player, sellingTeam, ctx) {
  const price = Math.max(0.5, Math.round(getTransferValue(player) * (0.60 + Math.random() * 0.30) * 10) / 10);
  let best = null;
  ctx.allTeams.forEach(buyer => {
    if (buyer === sellingTeam) return;
    // Il player non è mai un acquirente automatico: comprare è sempre una
    // sua scelta esplicita (tab Acquisti nel proprio turno), mai qualcosa
    // che gli arriva addosso perché una CPU si sta sfoltendo la rosa.
    if (buyer === playerTeam) return;
    if (!canAddRole(buyer, player.role) || !canTeamAcquirePlayer(buyer, player)) return;
    if (buyer.budget < price) return;
    const ev = evaluateTransferTarget(buyer, player, price);
    if (!ev || ev.gain <= 0) return;
    // Consenso del giocatore: non basta che il compratore ci guadagni, deve
    // anche piacere al giocatore trasferirsi lì (vedi estimatePlayerJoinChance).
    if (Math.random() > estimatePlayerJoinChance(player, buyer)) return;
    if (!best || ev.score > best.score) best = { buyer, score: ev.score };
  });
  return best ? { buyer: best.buyer, price } : null;
}

// Un turno di UNA squadra. Ritorna { buyer, seller } se ha agito (per far
// saltare il turno corrente alle squadre coinvolte), altrimenti null (pass).
// Calcola le opzioni disponibili per il turno di UNA squadra, SENZA eseguirle
// — usata sia dalla CPU (che sceglie in automatico per priorità, vedi
// takeTurnMarketAction) sia dalla UI del turno del player (che mostra le
// stesse opzioni reali e lascia scegliere quale eseguire, o passare).
function getMarketTurnOptions(team, ctx) {
  // "Bisogno" non è solo "mi manca un ruolo" — anche una rosa sovraccarica o
  // con esuberi anziani (26+, stesso criterio "esubero 26+" di STEP 6a nel
  // mercato reale) è un bisogno: senza questo, comprare senza mai vendere
  // faceva crescere la rosa indefinitamente (osservazione diretta: una rosa
  // a 31 giocatori dopo il primo giro di prove).
  const needs = getTeamNeeds(team);
  const releasable = getSquadSurplus(team).filter(p => !ctx.lockedPlayers.has(p) && !activeLoans.some(l => l.player === p) && !isPreContracted(p));
  const oversized = team.roster.length >= ROSTER_MAX_TOTAL - 2;
  const oldSurplus = releasable.filter(p => p.age >= 26);
  // Fuori sistema tattico (es. ali/trequartisti puri in un 3-1-4-2/5-4-1
  // senza slot ALA/TRQ in nessuno dei 2 moduli): zero valore per QUESTA
  // squadra a prescindere da età o forza — massima priorità di sfoltimento,
  // il ricavato va reinvestito su riserve/ruoli che servono davvero.
  const offSystem = releasable.filter(p => p.age <= 34 && !playerFitsTeamSystem(p, team));

  if (!needs.length && !oversized && !oldSurplus.length && !offSystem.length) {
    return { needs, disposalTop: null, buyTop: null, faTop: null, loanOutTop: null, noNeedAtAll: true };
  }

  // Priorità 0: sfoltire la rosa (fuori sistema tattico, sovradimensionata o
  // esubero 26+), PRIMA di provare a comprare — i fuori sistema vengono
  // provati per primi, sono peso morto puro. Un giocatore oltre i 34 anni non
  // entra nel pool: tra poco si ritira comunque e viene rimpiazzato dal
  // vivaio (ciclo naturale già gestito altrove) — non vale la pena spendere
  // un'azione per smuoverlo. Per ogni candidato si prova in ordine: VENDITA
  // (fa cassa) → PRESTITO (libera un posto senza perderlo del tutto) →
  // SVINCOLO, solo se il contratto è ormai in scadenza. Questo pool (releasable/
  // offSystem) contiene SOLO chi è già fuori dai migliori 22 di ENTRAMBI i
  // moduli dell'allenatore (getSquadTiers/getSquadSurplus, unione dei due
  // moduli) — un giocatore che gioca in almeno uno dei due non ci finisce mai,
  // quindi non rischia più lo svincolo per un semplice cambio di modulo attivo.
  let disposalTop = null;
  if (oversized || oldSurplus.length || offSystem.length) {
    const rest = releasable.filter(p => p.age <= 34 && !offSystem.includes(p)).sort((a, b) => a.strength - b.strength);
    const disposalPool = [...offSystem.sort((a, b) => a.strength - b.strength), ...rest];
    for (const candidate of disposalPool) {
      const reasonTag = offSystem.includes(candidate) ? 'fuori sistema tattico' : 'sfoltimento rosa';
      const sale = findBuyerForSurplusPlayer(candidate, team, ctx);
      if (sale) { disposalTop = { action: 'sell', candidate, reasonTag, buyer: sale.buyer, price: sale.price }; break; }
      const dest = findLoanDestination(candidate, team);
      if (dest) { disposalTop = { action: 'loan', candidate, reasonTag, dest }; break; }
      const nearExpiry = (candidate.contract?.duration ?? 99) <= 1;
      if (nearExpiry) { disposalTop = { action: 'release', candidate, reasonTag }; break; }
      // Nessuna delle tre opzioni per questo candidato: si prova il prossimo
      // in classifica (più debole → più forte) invece di forzare lo svincolo.
    }
  }

  let buyTop = null, faTop = null, loanOutTop = null;
  if (needs.length) {
    // Opzione 1: acquisto di un esubero altrui (stesso pool "vendibile" già
    // usato ovunque nel gioco, getSquadSurplus) — non bloccato, non in prestito.
    const buyCandidates = [];
    ctx.allTeams.forEach(seller => {
      if (seller === team) return;
      // La rosa del player non è mai acquistabile in automatico da una CPU:
      // il consenso è suo, non del giocatore — vedi tryOfferForPlayerSurplus,
      // che genera un'offerta vera in pendingAIOffers invece di eseguire.
      if (seller === playerTeam) return;
      // §5 REGOLE_CALCIOMERCATO: nessun tetto di forza per lega né divieto di
      // doppio salto categoria — conta solo il consenso a fasce del
      // giocatore (estimatePlayerJoinChance, sotto), qualunque trasferimento
      // è in teoria possibile.
      getSquadSurplus(seller).forEach(player => {
        if (ctx.lockedPlayers.has(player)) return;
        if (activeLoans.some(l => l.player === player)) return;
        if (isPreContracted(player)) return;
        if (!canAddRole(team, player.role) || !canTeamAcquirePlayer(team, player)) return;
        // Niente acquisti "di panchina" per giocatori non più giovani (< 24 =
        // ancora un prospetto su cui vale la pena investire, oltre no: che
        // senso ha prendere un rincalzo debole e anziano?) né per stranieri
        // (slot scarso, tetto di 3 — va speso solo su un titolare vero).
        if (!wouldEnterBest11(team, player) && (player.age >= 24 || player.nationality !== 'IT')) return;
        // Niente acquisti A PAGAMENTO di un giocatore all'ultimo anno di
        // contratto (o già scaduto): tra pochi mesi diventa ottenibile gratis
        // da chiunque via precontratto (§1a-bis), quindi pagarlo ora è un
        // pessimo affare — e siccome nessun altro lo comprerebbe più,
        // rischia di restare invenduto e finire svincolato la sessione dopo,
        // sprecando i soldi appena spesi (osservato in partita).
        if ((player.contract?.duration ?? 99) <= 1) return;
        const cost = Math.max(0.5, Math.round(getTransferValue(player) * (0.9 + Math.random() * 0.3) * 10) / 10);
        // Budget trasferimenti e monte ingaggi sono lo stesso pool ripartibile
        // che il DS umano gestisce col cursore (buildBudgetSliderHtml): se un
        // solo tetto blocca l'affare ma l'altro ha margine, la CPU può
        // spostare l'eccedenza invece di scartare subito il candidato.
        if (!canRebalanceForDeal(team, cost, player.contract?.salary ?? getDisplaySalary(player.strength))) return;
        // Consenso del giocatore: la squadra vuole comprarlo, ma vuole VENIRE
        // lui? Un 95 di forza non accetta facilmente una squadra di A che
        // lotta per la Salvezza (vedi estimatePlayerJoinChance).
        if (Math.random() > estimatePlayerJoinChance(player, team)) return;
        buyCandidates.push({ player, cost, seller });
      });
    });
    buyTop = pickBestTransferTarget(team, buyCandidates);

    // Opzione 2: svincolato — costo cartellino zero, serve solo margine sul
    // monte ingaggi (stessa logica della Fase 5c per il mercato reale).
    const faOptions = freeAgents
      .map(p => ({ player: p, cost: 0 }))
      .filter(({ player: p }) => canAddRole(team, p.role) && canTeamAcquirePlayer(team, p)
        && canRebalanceForDeal(team, 0, p.contract?.salary ?? getDisplaySalary(p.strength))
        // Stesso filtro di buonsenso dell'opzione 1: niente svincolati anziani
        // e deboli solo per riempire la panchina, niente stranieri se non da
        // titolari.
        && (wouldEnterBest11(team, p) || (p.age < 24 && p.nationality === 'IT'))
        // Consenso del giocatore: anche da svincolato può rifiutare una
        // squadra troppo poco ambiziosa per la sua forza (stesso principio
        // dell'opzione 1, vedi estimatePlayerJoinChance).
        && Math.random() < estimatePlayerJoinChance(p, team));
    faTop = pickBestTransferTarget(team, faOptions);

    // Opzione 3: prestare un proprio giovane in esubero (under-23) — stessa
    // logica generalizzata della Fase 2 (findLoanDestination).
    const loanCandidate = getSquadSurplus(team).find(p =>
      p.age < 23 && !ctx.lockedPlayers.has(p) && !activeLoans.some(l => l.player === p));
    if (loanCandidate) {
      const dest = findLoanDestination(loanCandidate, team);
      if (dest) loanOutTop = { candidate: loanCandidate, dest };
    }
  }

  // §2 REGOLE_CALCIOMERCATO: se un TUO giocatore è il miglior target
  // disponibile per colmare il bisogno (score più alto di buyTop/faTop, non
  // solo un ripiego perché non c'è altro), l'offerta su di lui ha priorità
  // sulle altre mosse d'acquisto di questo turno — vedi takeTurnMarketAction.
  const offerCandidate = needs.length ? findOfferCandidateForPlayerSurplus(team, ctx) : null;
  const buyTopScore = buyTop ? buyTop.ev.score : -Infinity;
  const faTopScore = faTop ? faTop.ev.score : -Infinity;
  const offerIsBestTarget = !!offerCandidate && offerCandidate.score > buyTopScore && offerCandidate.score > faTopScore;

  return { needs, disposalTop, buyTop, faTop, loanOutTop, offerCandidate, offerIsBestTarget, noNeedAtAll: false };
}

function executeDisposalOption(team, opt, ctx) {
  const { action, candidate, reasonTag } = opt;
  if (action === 'sell') {
    const { buyer, price } = opt;
    team.roster = team.roster.filter(p => p !== candidate);
    buyer.roster.push(candidate);
    team.budget += price;
    buyer.budget -= price;
    ctx.lockedPlayers.add(candidate);
    recalculateTeamStrength(team);
    recalculateTeamStrength(buyer);
    recordTransfer(candidate, buyer.name, price);
    transferLog.push(`${icon('cycle')} <strong>${team.name}</strong> → <strong>${buyer.name}</strong>: ${candidate.firstName} ${candidate.lastName} (${candidate.age} anni, Forza: ${candidate.strength}) per <strong>${price.toFixed(1)}M€</strong> <em>(mercato a turni, ${reasonTag})</em>`);
    turnMarketLog(team, `VENDE ${candidate.firstName} ${candidate.lastName} (Forza ${candidate.strength}) a ${buyer.name} per ${price.toFixed(1)}M€ (${reasonTag})`);
    turnMarketLog(buyer, `ACQUISTA ${candidate.firstName} ${candidate.lastName} da ${team.name} per ${price.toFixed(1)}M€ (${reasonTag} avversaria)`);
    return { buyer, seller: team };
  }
  if (action === 'loan') {
    const { dest } = opt;
    team.roster = team.roster.filter(p => p !== candidate);
    dest.roster.push(candidate);
    activeLoans.push({ player: candidate, homeTeam: team, loanTeam: dest });
    ctx.lockedPlayers.add(candidate);
    recalculateTeamStrength(team);
    recalculateTeamStrength(dest);
    recordTransfer(candidate, dest.name, 'prestito');
    transferLog.push(`${icon('cycle')} <strong>${team.name}</strong> presta ${candidate.firstName} ${candidate.lastName} a <strong>${dest.name}</strong> <em>(mercato a turni, ${reasonTag})</em>`);
    turnMarketLog(team, `PRESTA ${candidate.firstName} ${candidate.lastName} a ${dest.name} (${reasonTag})`);
    turnMarketLog(dest, `RICEVE IN PRESTITO ${candidate.firstName} ${candidate.lastName} da ${team.name}`);
    return { buyer: dest, seller: team };
  }
  // release (svincolo, solo contratto in scadenza, e solo se già fuori dai
  // migliori 22 di entrambi i moduli — vedi commento sopra su disposalPool)
  team.roster = team.roster.filter(p => p !== candidate);
  ctx.lockedPlayers.delete(candidate);
  freeAgents.push(candidate);
  recalculateTeamStrength(team);
  recordTransfer(candidate, null, null);
  transferLog.push(`🔴 <strong>${team.name}</strong> svincola ${candidate.firstName} ${candidate.lastName} (${candidate.age} anni, Forza: ${candidate.strength}, contratto in scadenza) <em>(mercato a turni, ${reasonTag})</em>`);
  turnMarketLog(team, `SVINCOLA ${candidate.firstName} ${candidate.lastName} (contratto in scadenza, ${reasonTag})`);
  return { buyer: null, seller: team };
}

function executeBuyOption(team, opt, ctx) {
  const { player, cost, seller } = opt;
  commitRebalanceForDeal(team, cost, player.contract?.salary ?? getDisplaySalary(player.strength));
  seller.roster = seller.roster.filter(p => p !== player);
  team.roster.push(player);
  team.budget -= cost;
  seller.budget += cost;
  ctx.lockedPlayers.add(player);
  recalculateTeamStrength(team);
  recalculateTeamStrength(seller);
  recordTransfer(player, team.name, cost);
  transferLog.push(`${icon('cycle')} <strong>${seller.name}</strong> → <strong>${team.name}</strong>: ${player.firstName} ${player.lastName} (${player.age} anni, Forza: ${player.strength}) per <strong>${cost.toFixed(1)}M€</strong> <em>(mercato a turni)</em>`);
  turnMarketLog(team, `ACQUISTA ${player.firstName} ${player.lastName} (Forza ${player.strength}) da ${seller.name} per ${cost.toFixed(1)}M€`);
  turnMarketLog(seller, `VENDE ${player.firstName} ${player.lastName} (Forza ${player.strength}) a ${team.name} per ${cost.toFixed(1)}M€`);
  return { buyer: team, seller };
}

function executeFaOption(team, opt, ctx) {
  const { player } = opt;
  commitRebalanceForDeal(team, 0, player.contract?.salary ?? getDisplaySalary(player.strength));
  const idx = freeAgents.indexOf(player);
  const fa = idx >= 0 ? freeAgents.splice(idx, 1)[0] : player;
  team.roster.push(fa);
  ctx.lockedPlayers.add(fa);
  recalculateTeamStrength(team);
  recordTransfer(fa, team.name, 0);
  transferLog.push(`✍️ <strong>${team.name}</strong> ingaggia lo svincolato ${fa.firstName} ${fa.lastName} (${fa.age} anni, Forza: ${fa.strength}) <em>(mercato a turni)</em>`);
  turnMarketLog(team, `INGAGGIA SVINCOLATO ${fa.firstName} ${fa.lastName} (Forza ${fa.strength})`);
  return { buyer: team, seller: null };
}

function executeLoanOutOption(team, opt, ctx) {
  const { candidate, dest } = opt;
  team.roster = team.roster.filter(p => p !== candidate);
  dest.roster.push(candidate);
  activeLoans.push({ player: candidate, homeTeam: team, loanTeam: dest });
  ctx.lockedPlayers.add(candidate);
  recalculateTeamStrength(team);
  recalculateTeamStrength(dest);
  recordTransfer(candidate, dest.name, 'prestito');
  transferLog.push(`${icon('cycle')} <strong>${team.name}</strong> presta ${candidate.firstName} ${candidate.lastName} a <strong>${dest.name}</strong> <em>(mercato a turni)</em>`);
  turnMarketLog(team, `PRESTA ${candidate.firstName} ${candidate.lastName} a ${dest.name}`);
  turnMarketLog(dest, `RICEVE IN PRESTITO ${candidate.firstName} ${candidate.lastName} da ${team.name}`);
  return { buyer: dest, seller: team };
}

// Se la squadra ha un bisogno di ruolo e il candidato migliore per colmarlo
// è un giocatore del PLAYER, la CPU non lo acquista mai in automatico (vedi
// l'esclusione in getMarketTurnOptions) — questa funzione trova SOLO il
// miglior candidato possibile (nessun side-effect, nessuna scrittura), da
// sottoporre al player come interruzione immediata (vedi il ramo
// pendingPlayerOffer nello scheduler) invece di una transazione automatica.
// Espone anche lo score (evaluateTransferTarget) così il chiamante può
// confrontarlo con buyTop/faTop per decidere la priorità (§2: un'offerta sul
// TUO giocatore ha priorità sulle altre mosse SOLO se è davvero il miglior
// target, non un semplice ripiego) — NON marca ctx.offeredPairs qui: lo fa
// il chiamante, solo quando l'offerta viene davvero generata.
function findOfferCandidateForPlayerSurplus(team, ctx) {
  if (!playerTeam || team === playerTeam) return null;
  const candidates = getSquadSurplus(playerTeam).filter(player => {
    const key = `${team.name}::${player.id}`;
    if (ctx.offeredPairs.has(key)) return false;
    if (ctx.lockedPlayers.has(player)) return false;
    if (activeLoans.some(l => l.player === player)) return false;
    if (isPreContracted(player)) return false;
    if (!canAddRole(team, player.role) || !canTeamAcquirePlayer(team, player)) return false;
    if (!wouldEnterBest11(team, player) && (player.age >= 24 || player.nationality !== 'IT')) return false;
    return true;
  });
  if (!candidates.length) return null;
  const priced = candidates
    .map(player => ({ player, cost: Math.max(0.5, Math.round(getTransferValue(player) * (1.1 + Math.random() * 0.3) * 10) / 10) }))
    .filter(({ cost }) => team.budget >= cost)
    .map(({ player, cost }) => ({ player, cost, ev: evaluateTransferTarget(team, player, cost) }))
    .filter(x => x.ev && x.ev.gain > 0)
    .sort((a, b) => b.ev.score - a.ev.score);
  if (!priced.length) return null;
  const { player, cost, ev } = priced[0];
  return { player, cost, score: ev.score };
}

// Un turno di una squadra CPU: stessa priorità di sempre (sfoltimento →
// acquisto da esubero altrui → svincolato → prestito in uscita di un
// giovane), solo scelta in automatico invece che dal player (vedi
// showManagerMarketModal, chiamata in modalità "turno" per l'equivalente
// interattivo del player).
function takeTurnMarketAction(team, ctx) {
  if (team === playerTeam && !TURN_MARKET_AUTO_PLAY_HUMAN) return null; // gestito dalla UI di mercato in modalità turno

  const options = getMarketTurnOptions(team, ctx);
  if (options.noNeedAtAll) {
    turnMarketLog(team, 'nessun bisogno reale (né comprare né vendere) → PASSA');
    return null;
  }
  if (options.disposalTop) return executeDisposalOption(team, options.disposalTop, ctx);

  if (!options.needs.length) {
    turnMarketLog(team, 'nessun bisogno di acquisto (e nulla da smuovere in rosa) → PASSA');
    return null;
  }
  turnMarketLog(team, `bisogni: ${options.needs.map(n => n.role).join(', ')} — budget ${team.budget.toFixed(1)}M€`);

  // §2 REGOLE_CALCIOMERCATO: se un TUO giocatore è il miglior target
  // disponibile (score più alto di buyTop/faTop, non un semplice ripiego),
  // l'offerta ha priorità sulle altre mosse d'acquisto di questo turno — va
  // comunque CHIESTA, mai acquisita in automatico (vedi
  // findOfferCandidateForPlayerSurplus). Il risultato speciale
  // pendingPlayerOffer viene gestito dallo scheduler (runTurnBasedMarket),
  // che mette in pausa e mostra la richiesta subito.
  if (options.offerIsBestTarget) {
    ctx.offeredPairs.add(`${team.name}::${options.offerCandidate.player.id}`);
    return { pendingPlayerOffer: { team, player: options.offerCandidate.player, cost: options.offerCandidate.cost } };
  }

  if (options.buyTop) return executeBuyOption(team, options.buyTop, ctx);
  if (options.faTop) return executeFaOption(team, options.faTop, ctx);
  if (options.loanOutTop) return executeLoanOutOption(team, options.loanOutTop, ctx);

  // Opzione 4 (§1a-bis, solo turni invernali): firmare un precontratto per
  // un giocatore in ultimo anno di contratto altrove — stessa logica di
  // consenso a fasce e stesso vincolo di monte ingaggi cumulativo del player.
  // Include ANCHE i giocatori del PLAYER: a differenza di un acquisto vero
  // (che richiede il consenso della squadra venditrice), un precontratto
  // reale non richiede il consenso del club attuale — solo quello del
  // giocatore (Bosman). L'unica difesa del club attuale è rinnovare PRIMA
  // che qualcuno firmi (vedi executeAnytimeRenew, sempre disponibile).
  if (currentMarketIsWinter) {
    const needRoles = new Set(options.needs.map(n => n.role));
    const preContractCandidates = getPreContractPool(team)
      .filter(({ player: p, fromTeam }) =>
        (needRoles.size === 0 || needRoles.has(p.role)) &&
        canAddRole(team, p.role) && canTeamAcquirePlayer(team, p) &&
        preContractWageBillAllows(team, p.contract?.salary ?? getDisplaySalary(p.strength)) &&
        Math.random() < estimatePlayerJoinChance(p, team));
    if (preContractCandidates.length) {
      const { player, fromTeam } = preContractCandidates.sort((a, b) => b.player.strength - a.player.strength)[0];
      signPreContract(player, fromTeam, team);
      turnMarketLog(team, `PRE-CONTRATTO con ${player.firstName} ${player.lastName} (da ${fromTeam.name}, Forza ${player.strength})`);
      return { buyer: team, seller: null };
    }
  }

  // Ultima risorsa (ripiego, non miglior target): un giocatore del player
  // colmerebbe comunque il bisogno.
  if (options.offerCandidate) {
    ctx.offeredPairs.add(`${team.name}::${options.offerCandidate.player.id}`);
    return { pendingPlayerOffer: { team, player: options.offerCandidate.player, cost: options.offerCandidate.cost } };
  }

  turnMarketLog(team, 'nessuna azione disponibile → PASSA');
  return null;
}

// Punto d'ingresso dello scheduler. maxRounds è solo una guardia di sicurezza
// (il mercato normalmente termina da solo quando un giro intero non produce
// nessuna azione). onComplete viene invocato a schedulazione conclusa — è
// sempre asincrono in senso lato (può risolversi nello stesso tick se il
// player non partecipa/non ha mai un turno reale, o dopo N aperture della
// UI di mercato in modalità turno se partecipa) — i chiamanti reali
// (updateTeamStrengths) devono trattarlo come tale, non assumere che il
// mercato sia già concluso subito dopo la chiamata a runTurnBasedMarket.
function runTurnBasedMarket(onComplete = () => {}, maxRounds = 40) {
  const allTeams = [...serieA, ...serieB, ...serieC];
  const order = [...allTeams].sort((a, b) => (b.ds?.strength ?? 0) - (a.ds?.strength ?? 0));
  // lockedPlayers punta al set GLOBALE di sessione (sessionMovedPlayers, §5):
  // non un Set locale a questa chiamata, così il blocco resta valido anche
  // dopo che lo scheduler converge (STEP 6d poaching, mercato estero) e
  // durante i turni reali del player (showManagerMarketModal, che vi accede
  // tramite isSessionLocked/lockForSession), per l'intera sessione.
  const ctx = { allTeams, lockedPlayers: sessionMovedPlayers, playerOptedOut: false, offeredPairs: new Set() };

  console.log('%c=== MERCATO A TURNI — inizio ===', 'color:#16a34a;font-weight:bold;font-size:14px');
  console.log('Ordine di turno (prime 10, per forza DS):', order.slice(0, 10).map(t => `${t.name} (DS ${t.ds?.strength ?? '—'})`));
  // Sempre visibile, anche in modalità spettatore/DS senza squadra (playerTeam
  // null): senza questo, il mercato proseguiva comunque in background ma senza
  // nessun feedback visivo — sembrava bloccato mentre in realtà avanzava.
  showMarketProgressBar();
  // Ritardo tra un turno CPU automatico e il successivo: puramente di ritmo/
  // percezione (nessuna logica dipende da questo), lascia respirare il
  // ticker e la barra invece di risolvere l'intero mercato in un solo tick
  // sincrono invisibile.
  const TICK_DELAY_MS = 25;

  let round = 0;
  let totalActions = 0;
  let anyActionThisRound = false;
  let actedThisRound = new Set();
  let idx = 0;

  const finishAll = () => {
    console.log(`%c=== MERCATO A TURNI — fine dopo ${round} giri, ${totalActions} azioni totali ===`, 'color:#16a34a;font-weight:bold;font-size:14px');
    hideMarketProgressBar();
    onComplete();
  };

  const startRound = () => {
    round++;
    anyActionThisRound = false;
    actedThisRound = new Set();
    idx = 0;
    console.log(`%c--- Giro ${round} ---`, 'color:#888');
    updateMarketDayCounter(round, maxRounds, currentMarketIsWinter);
    processNext();
  };

  const registerResult = (team, result) => {
    if (!result) return;
    anyActionThisRound = true;
    totalActions++;
    actedThisRound.add(team);
    if (result.seller) actedThisRound.add(result.seller);
    if (result.buyer && result.buyer !== team) actedThisRound.add(result.buyer);
  };

  // Un passo alla volta (non più un while sincrono su tutto l'ordine): tra
  // un turno CPU automatico e il successivo si passa da un setTimeout, così
  // il browser può ridisegnare e la barra/ticker restano visibilmente vivi
  // invece che risolvere l'intero mercato in un singolo tick invisibile.
  function processNext() {
    if (idx >= order.length) {
      if (anyActionThisRound && round < maxRounds) startRound();
      else finishAll();
      return;
    }
    const team = order[idx];
    idx++;
    if (actedThisRound.has(team)) {
      turnMarketLog(team, 'turno saltato (coinvolta in una transazione altrui questo giro)');
      setTimeout(processNext, TICK_DELAY_MS);
      return;
    }
    if (team === playerTeam && !TURN_MARKET_AUTO_PLAY_HUMAN && !ctx.playerOptedOut) {
      // Turno reale del player: si ferma sempre qui, ogni giro, e si riapre
      // la SUA UI di mercato (quella di sempre, non una finestra separata) —
      // decide lui se c'è qualcosa da fare o se non c'è nulla (bottone
      // "Continua mercato"), mai lo scheduler al posto suo. Nessun auto-skip:
      // in precedenza un "nessun bisogno reale" veniva deciso in automatico e,
      // senza la sessione libera finale (§3, eliminata), poteva restare
      // permanente per il resto della sessione — il player restava a guardare
      // il ticker CPU senza che il suo turno tornasse mai più, senza modo di
      // riaprire la finestra per agire o anche solo chiudere esplicitamente.
      hideMarketProgressBar(); // la sua UI vera basta a dire che sta succedendo qualcosa
      showManagerMarketModal(
        () => { // "Conferma e Chiudi Mercato": il player chiude davvero, non viene più interpellato
          ctx.playerOptedOut = true;
          showMarketProgressBar(); updateMarketDayCounter(round, maxRounds, currentMarketIsWinter);
          processNext();
        },
        {
          onContinue: () => { // "Continua mercato": ha scelto di non agire, salta solo questo turno
            showMarketProgressBar(); updateMarketDayCounter(round, maxRounds, currentMarketIsWinter);
            processNext();
          },
          onTurnConsumed: () => { // ha comprato/venduto/prestato: quell'azione conta come il suo turno
            showMarketProgressBar(); updateMarketDayCounter(round, maxRounds, currentMarketIsWinter);
            registerResult(team, { buyer: team, seller: null });
            processNext();
          },
        }
      );
      return;
    }
    if (team === playerTeam && ctx.playerOptedOut) {
      turnMarketLog(team, 'ha chiuso il proprio mercato per questa sessione → turno automatico saltato');
      setTimeout(processNext, TICK_DELAY_MS);
      return;
    }
    const result = takeTurnMarketAction(team, ctx);
    if (result && result.pendingPlayerOffer) {
      // Un'offerta per un giocatore del player NON apre più una finestra
      // separata: finisce nella tab "Offerte ricevute" della SUA finestra di
      // mercato vera, così può vedere l'offerta nel contesto della propria
      // rosa invece che come un popup isolato sopra uno sfondo qualunque.
      // Finché resta da decidere, la finestra blocca acquisti/vendite/
      // prestiti/svincoli (vedi hasUnresolvedOffers in showManagerMarketModal)
      // — il player può comunque muoversi liberamente tra le tab.
      const { team: offerTeam, player, cost } = result.pendingPlayerOffer;
      pendingAIOffers.push({ player, buyerTeam: offerTeam, offerPrice: cost });
      turnMarketLog(offerTeam, `OFFRE ${cost.toFixed(1)}M€ per ${player.firstName} ${player.lastName} (Forza ${player.strength}) di ${playerTeam.name} — in attesa di risposta`);
      hideMarketProgressBar();
      showManagerMarketModal(
        () => { // "Conferma e Chiudi Mercato" (raggiungibile solo a offerta risolta)
          ctx.playerOptedOut = true;
          showMarketProgressBar(); updateMarketDayCounter(round, maxRounds, currentMarketIsWinter);
          processNext();
        },
        {
          onContinue: () => { // "Continua mercato" (idem, solo a offerta risolta)
            showMarketProgressBar(); updateMarketDayCounter(round, maxRounds, currentMarketIsWinter);
            processNext();
          },
          onTurnConsumed: () => { // ha comunque approfittato per comprare/vendere altro
            showMarketProgressBar(); updateMarketDayCounter(round, maxRounds, currentMarketIsWinter);
            processNext();
          },
          onOfferResolved: (buyerTeam, resolvedPlayer, accepted) => {
            if (accepted) {
              ctx.lockedPlayers.add(resolvedPlayer);
              registerResult(buyerTeam, { buyer: buyerTeam, seller: playerTeam });
            }
          },
        }
      );
      return;
    }
    registerResult(team, result);
    pushMarketTicker();
    setTimeout(processNext, TICK_DELAY_MS);
  }

  startRound();
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
  let html = `<h2>Coppa Italia <span class="coppa-winner-badge">${trophyIconHtml('coppa', 'Coppa Italia')} ${winner.name}</span></h2>`;

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
    e.includes(`${icon('cycle')}`) || e.includes('🔴') || e.includes('🟢') || e.includes('✍️') || e.includes('🔭') || e.includes('✈️'));
  const releases = transferLog.filter(e => e.includes('📤'));
  const retirements = transferLog.filter(e => e.includes('🎓') || e.includes('🌱'));
  const coachEvents = transferLog.filter(e => e.includes(`${icon('warning')}`) || e.includes(`${icon('check')}`) || e.includes(`${icon('stats')}`));

  const buildSection = (title, entries) => {
    if (entries.length === 0) return '';
    return `<h3>${title}</h3><div class="transfer-list">${entries.map(e => `<div class="transfer-entry">${e}</div>`).join('')}</div>`;
  };

  container.innerHTML = `
    <h2>${icon('clipboard')} Sessione di Mercato — Stagione ${seasonCount}</h2>
    ${buildSection('Trasferimenti', transfers)}
    ${buildSection('Svincoli gratuiti', releases)}
    ${buildSection('Ritiri e Settore Giovanile', retirements)}
    ${buildSection('Panchina — Esoneri e Ingaggi', coachEvents)}
  `;
}

// ─── NOTIZIE ("La Gazzetta del Pallone") ───────────────────────────────────
// Nessun modello dati nuovo da mantenere/salvare: legge transferLog (già
// persistito nei salvataggi) e lo classifica a posteriori per categoria e
// lega — stesso principio di displayTransferLog() sopra (icone/emoji come
// "tipo"), esteso per separare Ritiri da Giovanili e per rilevare quali
// leghe sono coinvolte (cross-posting: una notizia che tocca squadre di
// leghe diverse, es. un trasferimento Serie A ↔ Serie B, compare su
// entrambe le pagine lega).
const NEWS_CATEGORIES = [
  { key: 'calciomercato', label: 'CALCIOMERCATO' },
  { key: 'ritiri', label: 'RITIRI' },
  { key: 'giovanili', label: 'GIOVANILI' },
  { key: 'allenatori', label: 'ALLENATORI E DS' },
];

function classifyNewsEntry(html) {
  if (html.includes('🎓')) return 'ritiri';
  if (html.includes('🌱')) return 'giovanili';
  if (html.includes(icon('warning')) || html.includes(icon('check')) || html.includes(icon('stats')) || html.includes(icon('document'))) return 'allenatori';
  if (html.includes(icon('cycle')) || html.includes(icon('money')) || html.includes('❄️') || html.includes('🔴') || html.includes('🟢') || html.includes('✍️') || html.includes('🔭') || html.includes('✈️') || html.includes('📤') || html.includes('🛒') || html.includes('🔚')) return 'calciomercato';
  return null;
}

// Nome squadra → oggetto squadra, tutte le leghe (incluso il pool D) — così
// da risalire a lega e forza dai nomi citati in ogni notizia, senza dover
// toccare gli ~80 punti del codice che generano gli eventi originali.
function buildNewsTeamIndex() {
  const index = {};
  [...serieA, ...serieB, ...serieC, ...serieD].forEach(t => { index[t.name] = t; });
  return index;
}

// I nomi squadra nelle voci di transferLog sono sempre dentro <strong>
// (pattern costante in tutti i punti che fanno push): li estrae e li
// risolve tramite l'indice, individuando lega/leghe coinvolte e una stima
// di rilevanza (forza della squadra più forte citata nella notizia).
function extractNewsTeams(html, teamIndex) {
  const matches = [...html.matchAll(/<strong>(.*?)<\/strong>/g)].map(m => m[1]);
  const teams = [];
  const seen = new Set();
  matches.forEach(name => {
    const team = teamIndex[name];
    if (team && !seen.has(team.name)) { seen.add(team.name); teams.push(team); }
  });
  return teams;
}

// Costo (M€) citato in una notizia: il numero più alto tra tutti quelli nel
// formato "X.XM€" nel testo — un trasferimento reale ne cita uno solo, ma
// prendere il massimo copre comunque righe con più importi (es. bonus).
// Nessun M€ (svincolo gratis, rinnovo, prestito) → 0, non è tra le "più costose".
function extractNewsCost(html) {
  const matches = [...html.matchAll(/([\d.]+)\s*M€/g)].map(m => parseFloat(m[1]));
  return matches.length ? Math.max(...matches) : 0;
}

function buildNewsFeed() {
  const teamIndex = buildNewsTeamIndex();
  const feed = [];
  transferLog.forEach((html, idx) => {
    const category = classifyNewsEntry(html);
    if (!category) return;
    const teams = extractNewsTeams(html, teamIndex);
    if (!teams.length) return; // niente squadre riconoscibili (es. estero): non mostrabile su una pagina lega
    const leagues = [...new Set(teams.map(t => t.leagueLevel).filter(l => l === 'A' || l === 'B' || l === 'C'))];
    if (!leagues.length) return;
    const weight = Math.max(...teams.map(t => t.strength || 0));
    const cost = extractNewsCost(html);
    const isWinter = winterMarketStartAt !== null && idx >= winterMarketStartAt;
    feed.push({ html, category, leagues, weight, cost, teams, isWinter });
  });
  // transferLog è cronologico (push in ordine di accadimento): capovolto qui
  // così l'elenco mostra sempre prima le notizie più recenti.
  return feed.reverse();
}

// team (opzionale): nome di una squadra della lega selezionata — se
// presente, filtra solo le notizie che la citano (acquirente, venditore o
// squadra del giocatore/staff coinvolto).
function newsForLeagueAndCat(feed, league, cat, team) {
  return feed.filter(n => n.category === cat && n.leagues.includes(league) && (!team || n.teams.some(t => t.name === team)));
}

function teamsForLeagueLetter(league) {
  return league === 'A' ? serieA : league === 'B' ? serieB : serieC;
}

// Filtro squadra per le notizie: le opzioni si ricalcolano sulla lega
// attualmente selezionata (`state.league`) — cambiare lega senza resettare
// `state.team` mostrerebbe un valore selezionato che non esiste più tra le
// opzioni, quindi i chiamanti azzerano state.team ad ogni cambio lega.
function buildNewsTeamFilterHtml(state) {
  const teams = [...teamsForLeagueLetter(state.league)].sort((a, b) => a.name.localeCompare(b.name));
  const options = teams.map(t => `<option value="${t.name}"${state.team === t.name ? ' selected' : ''}>${t.name}</option>`).join('');
  return `<select class="news-team-filter"><option value="">Tutte le squadre</option>${options}</select>`;
}

function newsCrossBadge(n, currentLeague) {
  const otherLeagues = n.leagues.filter(l => l !== currentLeague);
  return otherLeagues.length ? `<span class="news-cross">${icon('cycle')} Anche in Serie ${otherLeagues.join('/')}</span>` : '';
}

function newsArticleHtml(n, currentLeague) {
  const mainTeam = n.teams.find(t => t.leagueLevel === currentLeague) || n.teams[0];
  const logo = teamLogoOrJerseyHtml(mainTeam, false, false);
  const catLabel = (NEWS_CATEGORIES.find(c => c.key === n.category) || {}).label || '';
  return `<div class="news-article">
    <span class="news-rubric ${n.category}">${catLabel}</span>
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:2px">${logo}<strong>${mainTeam.name}</strong></div>
    <div>${n.html}</div>
    ${newsCrossBadge(n, currentLeague)}
  </div>`;
}

function newsRoundupRowHtml(n, currentLeague) {
  const mainTeam = n.teams.find(t => t.leagueLevel === currentLeague) || n.teams[0];
  const logo = teamLogoOrJerseyHtml(mainTeam, false, false);
  return `<div class="news-roundup-row">${logo}<span style="flex:1;min-width:0">${n.html}</span>${newsCrossBadge(n, currentLeague)}</div>`;
}

// `items` è già più recenti-prima (buildNewsFeed): le notizie invernali
// (isWinter), se presenti, sono quindi sempre in blocco in cima, seguite da
// quelle (più vecchie) del mercato estivo della stessa stagione — inserisce
// un separatore prima di ciascun blocco, così è sempre chiaro da dove in poi
// si legge solo mercato invernale e da dove in poi solo mercato estivo
// (se non c'è stato ancora un inverno questa stagione, compare solo il
// separatore estivo, in cima).
function newsRoundupHtml(items, currentLeague) {
  let html = '';
  let winterDividerShown = false;
  let summerDividerShown = false;
  items.forEach(n => {
    if (n.isWinter && !winterDividerShown) {
      html += `<div class="news-season-divider">❄️ Calciomercato Invernale</div>`;
      winterDividerShown = true;
    }
    if (!n.isWinter && !summerDividerShown) {
      html += `<div class="news-season-divider">☀️ Calciomercato Estivo</div>`;
      summerDividerShown = true;
    }
    html += newsRoundupRowHtml(n, currentLeague);
  });
  return html;
}

let newsState = { league: 'A', cat: 'calciomercato', team: '' };

function renderNotizieContent() {
  const feed = buildNewsFeed();
  ['A', 'B', 'C'].forEach(l => {
    const n = feed.filter(x => x.leagues.includes(l)).length;
    const el = document.getElementById('news-count-' + l);
    if (el) el.textContent = n + (n === 1 ? ' notizia' : ' notizie');
  });
  document.querySelectorAll('.news-league-tab').forEach(el => el.classList.toggle('active', el.dataset.league === newsState.league));

  const teamFilterWrap = document.getElementById('news-team-filter-wrap');
  if (teamFilterWrap) {
    teamFilterWrap.innerHTML = buildNewsTeamFilterHtml(newsState);
    teamFilterWrap.querySelector('.news-team-filter').addEventListener('change', e => {
      newsState.team = e.target.value;
      renderNotizieContent();
    });
  }

  const catCounts = {};
  NEWS_CATEGORIES.forEach(c => { catCounts[c.key] = newsForLeagueAndCat(feed, newsState.league, c.key, newsState.team).length; });
  const catTabs = document.getElementById('news-cat-tabs');
  catTabs.innerHTML = NEWS_CATEGORIES.map(c =>
    `<div class="news-cat-tab${newsState.cat === c.key ? ' active' : ''}" data-cat="${c.key}">${c.label} <span style="opacity:.7">(${catCounts[c.key]})</span></div>`
  ).join('');
  catTabs.querySelectorAll('.news-cat-tab').forEach(el => {
    el.addEventListener('click', () => { newsState.cat = el.dataset.cat; renderNotizieContent(); });
  });

  const items = newsForLeagueAndCat(feed, newsState.league, newsState.cat, newsState.team); // già più recenti prima (buildNewsFeed)
  const wrap = document.getElementById('news-articles');
  if (!items.length) {
    wrap.innerHTML = `<div class="news-empty">Nessuna notizia in questa categoria${newsState.team ? ` per ${newsState.team}` : ` per Serie ${newsState.league}`}.</div>`;
    return;
  }
  // Le 3 con il costo (M€) più alto diventano articoli estesi; TUTTI i
  // movimenti della sezione restano comunque elencati per intero nella
  // lista sotto, dal più recente al più vecchio.
  const featured = [...items].sort((a, b) => b.cost - a.cost).slice(0, 3);
  const catLabel = (NEWS_CATEGORIES.find(c => c.key === newsState.cat) || {}).label || '';
  wrap.innerHTML = featured.map(n => newsArticleHtml(n, newsState.league)).join('')
    + `<div class="news-roundup"><h4>TUTTI I MOVIMENTI — ${catLabel}</h4>${newsRoundupHtml(items, newsState.league)}</div>`;
}

function createNotizieModal() {
  const overlay = document.createElement('div');
  overlay.className = 'mm-overlay';
  overlay.id = 'notizie-modal';
  overlay.style.display = 'none';
  overlay.innerHTML = `
    <div class="mm-box news-box">
      <div class="mm-header">
        <span class="mm-title">${icon('newspaper')} La Gazzetta del Pallone</span>
        <button class="modal-close" id="notizie-close" style="position:static">&times;</button>
      </div>
      <div class="news-body">
        <div class="news-league-tabs">
          <div class="news-league-tab" data-league="A">SERIE A<span class="news-count" id="news-count-A"></span></div>
          <div class="news-league-tab" data-league="B">SERIE B<span class="news-count" id="news-count-B"></span></div>
          <div class="news-league-tab" data-league="C">SERIE C<span class="news-count" id="news-count-C"></span></div>
        </div>
        <div class="news-cat-tabs" id="news-cat-tabs"></div>
        <div class="news-team-filter-wrap" id="news-team-filter-wrap"></div>
        <div class="news-articles" id="news-articles"></div>
      </div>
    </div>`;
  document.body.appendChild(overlay);

  overlay.querySelector('#notizie-close').addEventListener('click', () => { overlay.style.display = 'none'; });
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.style.display = 'none'; });
  overlay.querySelectorAll('.news-league-tab').forEach(el => {
    el.addEventListener('click', () => { newsState.league = el.dataset.league; newsState.cat = 'calciomercato'; newsState.team = ''; renderNotizieContent(); });
  });
}

function openNotizie() {
  const modal = document.getElementById('notizie-modal');
  modal.style.display = 'flex';
  newsState = { league: 'A', cat: 'calciomercato' };
  renderNotizieContent();
}

// ─── MERCATO MANAGERIALE ──────────────────────────────────────────────────────

// Riempie la rosa finché OGNI ruolo raggiunge il proprio minimo (ROLE_MIN),
// non solo il totale complessivo — una rosa può avere 18+ giocatori e restare
// comunque scoperta in un ruolo specifico (es. 0 portieri). Prova prima a
// pescare uno svincolato adatto (età/forza compatibili con la lega), altrimenti
// ripiega su un giovane del vivaio (createYouthPlayer, forza già legata alla
// lega di appartenenza tramite getYouthBirthRange).
function ensureMinRoster(team) {
  const dsBonus = team.ds ? Math.round((team.ds.strength - 50) / 5) : 0;
  const maxFAStr = Math.min(leagueStrCap(team.leagueLevel), Math.max(5, (team.leagueLevel === 'A' ? 100 : team.leagueLevel === 'B' ? 72 : 45) + dsBonus));
  let needed = neededRoles(team);
  while (needed.length > 0) {
    const faIdx = freeAgents
      .map((p, i) => ({ p, i }))
      .filter(({ p }) => needed.includes(p.role) && p.strength <= maxFAStr && canAddRole(team, p.role) && canTeamAcquirePlayer(team, p))
      .sort((a, b) => b.p.strength - a.p.strength)[0]?.i;
    if (faIdx !== undefined) {
      const fa = freeAgents.splice(faIdx, 1)[0];
      team.roster.push(fa);
      recordTransfer(fa, team.name, 0);
    } else {
      const role = needed[Math.floor(Math.random() * needed.length)];
      team.roster.push(createYouthPlayer(role, team));
    }
    needed = neededRoles(team);
  }
}

// ── PRESTITI ────────────────────────────────────────────────────────────────
const MAX_INCOMING_LOANS = 8;

function getIncomingLoanCount(team) {
  return activeLoans.filter(l => l.loanTeam === team).length;
}

// Un giocatore può essere prestato solo se è di proprietà (niente sub-prestiti)
// — nessun vincolo di ruolo minimo per il giocatore umano (unico chiamante).
function canLoanOutPlayer(team, player) {
  return !activeLoans.some(l => l.player === player && l.loanTeam === team);
}

// Trova un club disposto a prendere il giocatore in prestito: preferisce chi
// ha bisogno di quel ruolo, altrimenti una qualunque squadra con posto libero.
// homeTeam (opzionale) esclude il club di appartenenza dai candidati — usato
// dal ciclo prestiti CPU-vs-CPU, dove l'home team non è sempre playerTeam.
// ROSTER_MAX_TOTAL e MAX_INCOMING_LOANS erano vincoli applicati solo alla UI
// del player (mercato prestiti, mai al mercato a turni CPU-vs-CPU) — una CPU
// con rosa già assottigliata poteva quindi ricevere prestiti senza alcun
// limite numerico, diventando una destinazione "comoda" senza restrizioni.
function findLoanDestination(player, homeTeam) {
  // §5 REGOLE_CALCIOMERCATO: nessun tetto rigido di forza per lega — il
  // consenso a fasce (estimatePlayerJoinChance) filtra le destinazioni non
  // credibili in modo probabilistico invece che con un divieto assoluto.
  const candidates = [...serieA, ...serieB, ...serieC].filter(t =>
    t !== playerTeam && t !== homeTeam && canAddRole(t, player.role)
    && t.roster.length < ROSTER_MAX_TOTAL && getIncomingLoanCount(t) < MAX_INCOMING_LOANS
    && Math.random() < estimatePlayerJoinChance(player, t)
  );
  if (!candidates.length) return null;
  const needing = candidates.filter(t => neededRoles(t).includes(player.role));
  const pool = needing.length ? needing : candidates;
  return pool[Math.floor(Math.random() * pool.length)];
}

// Giocatori altrui in "esubero" (fuori dai migliori 22 per modulo del loro
// club, under-26) che potrebbero essere richiesti in prestito — stesso criterio
// usato dall'AI per decidere chi mandare in prestito, vedi getSquadSurplus
function generateIncomingLoanCandidates() {
  if (!playerTeam) return [];
  const candidates = [];
  [...serieA, ...serieB, ...serieC].filter(t => t !== playerTeam).forEach(team => {
    // "Esubero" reale: titolari (best 11) e riserve (i migliori 11 successivi) per
    // il modulo dell'allenatore restano sempre intoccabili — solo chi resta fuori
    // da questi "migliori 22", ed è under-26, viene proposto in prestito
    getSquadSurplus(team).filter(p => p.age < 26).forEach(p => {
      if (activeLoans.some(l => l.player === p)) return; // già in prestito altrove
      if (isSessionLocked(p)) return; // §5: già trasferito in questa sessione
      if (isPreContracted(p)) return; // §1a-bis: bloccato per il mercato in uscita
      // §5: nessun tetto di forza per lega — solo consenso a fasce (i
      // giocatori che rifiuterebbero non compaiono proprio in lista).
      if (!playerAcceptsHumanTeam(p)) return;
      if (!canPlayerSignMore(playerTeam)) return;
      if (!canTeamAcquirePlayer(playerTeam, p)) return;
      candidates.push({ player: p, fromTeam: team });
    });
  });
  return candidates.sort((a, b) => b.player.strength - a.player.strength);
}

// Esegue fisicamente il prestito verso una destinazione già scelta (a monte,
// o dalla scelta automatica di findLoanDestination, o da una proposta
// specifica accettata dal giocatore nella tab Rosa)
function executeLoanOutTo(player, dest) {
  playerTeam.roster = playerTeam.roster.filter(p => p !== player);
  dest.roster.push(player);
  activeLoans.push({ player, homeTeam: playerTeam, loanTeam: dest });
  lockForSession(player);
  recordTransfer(player, dest.name, 'prestito');
  recalculateTeamStrength(playerTeam);
  recalculateTeamStrength(dest);
  transferLog.push(`${icon('cycle')} <strong>${playerTeam.name}</strong> presta ${player.firstName} ${player.lastName} a <strong>${dest.name}</strong> per la stagione`);
}

// Manda in prestito un giocatore del playerTeam (destinazione scelta in automatico); ritorna true se riuscito
function loanOutPlayer(player) {
  if (!canLoanOutPlayer(playerTeam, player)) return false;
  const dest = findLoanDestination(player);
  if (!dest) return false;
  executeLoanOutTo(player, dest);
  return true;
}

// Genera 0-5 proposte di acquisto da altre squadre per un giocatore, on-demand
// (il chiamante mette in cache il risultato per tutta la sessione di mercato,
// così non cambia a ogni click). Prezzo con variazione realistica intorno al
// valore di mercato; solo squadre che possono davvero permetterselo.
function generateSellOffers(player) {
  const baseValue = getTransferValue(player);
  // Un giocatore straniero può essere comprato SOLO da una squadra di Serie A
  // che non ha già raggiunto il tetto di 3 stranieri — altrimenti l'offerta
  // non sarebbe nemmeno valida da accettare (stesso vincolo dell'area scout).
  const isForeign = player.nationality !== 'IT';
  // Interessate solo le squadre che il giocatore migliora DAVVERO (stessa
  // valutazione usata dal mercato CPU-vs-CPU, evaluateTransferTarget): chi ne
  // trarrebbe guadagno marginale zero non farebbe un'offerta reale.
  // §5 REGOLE_CALCIOMERCATO: nessun tetto rigido di forza per lega — il
  // consenso a fasce (estimatePlayerJoinChance) sostituisce fitsLeagueStrength.
  const interested = [...serieA, ...serieB, ...serieC]
    .filter(t => t !== playerTeam && canAddRole(t, player.role) && t.budget >= baseValue * 0.6
      && (!isForeign || canBuyForeignPlayer(t))
      && Math.random() < estimatePlayerJoinChance(player, t))
    .map(t => ({ team: t, ev: evaluateTransferTarget(t, player, baseValue) }))
    .filter(x => x.ev && x.ev.gain > 0);
  shuffleArray(interested);
  const numOffers = Math.floor(Math.random() * 6); // 0-5
  const offers = [];
  for (const { team: t } of interested) {
    if (offers.length >= numOffers) break;
    // Prezzo scontato (0.60-0.90×): vendere è comunque un'iniziativa di chi
    // ha bisogno/voglia di liberarsi del giocatore, non è in posizione di
    // forza — stessa identica formula di findBuyerForSurplusPlayer (lo
    // sfoltimento CPU), apposta, per non avvantaggiare l'uno sull'altro.
    const variation = 0.60 + Math.random() * 0.30;
    const price = Math.round(baseValue * variation * 10) / 10;
    if (t.budget < price) continue;
    offers.push({ buyerTeam: t, price });
  }
  // Un giocatore straniero può anche tornare a un club della propria nazione
  // d'origine (l'estero non è simulato: lascia il mondo di gioco, come un
  // parametro-zero all'estero) — capita solo a volte, non è mai garantito.
  if (isForeign && Math.random() < 0.5) {
    const price = Math.round(baseValue * (0.8 + Math.random() * 0.7) * 10) / 10;
    offers.push({ foreignClub: randomForeignClub(player.nationality), price });
  }
  shuffleArray(offers);
  return offers;
}

// Genera 0-5 squadre disposte a prendere il giocatore in prestito, on-demand
// (stessa logica di idoneità di findLoanDestination, ma restituisce più candidati).
function generateLoanOutOffers(player) {
  const isForeign = player.nationality !== 'IT';
  // Stessa logica di interesse reale di generateSellOffers: una squadra presta
  // spazio in rosa solo a chi la migliora (o le tappa un buco di profondità),
  // non a chiunque sia semplicemente idoneo per ruolo/lega. Costo trascurabile
  // (0): un prestito non ha cartellino, conta solo il beneficio tattico.
  const candidates = [...serieA, ...serieB, ...serieC].filter(t =>
    t !== playerTeam && canAddRole(t, player.role)
    && (!isForeign || canBuyForeignPlayer(t))
    && Math.random() < estimatePlayerJoinChance(player, t)
  ).filter(t => {
    const ev = evaluateTransferTarget(t, player, 0);
    return ev && ev.gain > 0;
  });
  shuffleArray(candidates);
  const numOffers = Math.floor(Math.random() * 6); // 0-5
  return candidates.slice(0, numOffers).map(t => ({ team: t }));
}

// Esegue la vendita a un acquirente specifico (proposta accettata dalla tab Rosa)
function executeSellTo(player, buyerTeam, price) {
  playerTeam.roster = playerTeam.roster.filter(p => p !== player);
  buyerTeam.roster.push(player);
  playerTeam.budget += price;
  buyerTeam.budget -= price;
  lockForSession(player);
  recalculateTeamStrength(buyerTeam);
  recalculateTeamStrength(playerTeam);
  recordTransfer(player, buyerTeam.name, price);
  transferLog.push(`${icon('money')} <strong>${playerTeam.name}</strong> vende ${player.firstName} ${player.lastName} a <strong>${buyerTeam.name}</strong> per <strong>${price.toFixed(1)}M€</strong>`);
}

// Esegue la vendita di un giocatore straniero a un club della sua nazione
// d'origine: il giocatore lascia definitivamente il mondo di gioco (nessuna
// squadra italiana lo riceve, il club estero non è un oggetto simulato).
function executeSellAbroad(player, foreignClubName, price) {
  playerTeam.roster = playerTeam.roster.filter(p => p !== player);
  playerTeam.budget += price;
  lockForSession(player);
  recalculateTeamStrength(playerTeam);
  recordTransfer(player, foreignClubName, price);
  transferLog.push(`✈️ <strong>${playerTeam.name}</strong> vende ${player.firstName} ${player.lastName} a <strong>${foreignClubName}</strong> (estero) per <strong>${price.toFixed(1)}M€</strong>`);
}

// §1a-bis REGOLE_CALCIOMERCATO: un giocatore con un precontratto firmato in
// inverno (pendingPreContracts) parte SUBITO per la squadra che lo ha
// precontrattato quando il contratto attuale scade (STEP 1d, estate
// successiva) — niente rinnovo, niente tab Rinnovi, vale sia per te sia
// per le CPU. Applica lo stipendio/durata già concordati alla firma.
function resolvePreContractDeparture(player, preContract) {
  const { fromTeam, toTeam, signedSalary, signedDuration } = preContract;
  fromTeam.roster = fromTeam.roster.filter(p => p !== player);
  toTeam.roster.push(player);
  player.contract.salary = signedSalary;
  player.contract.duration = signedDuration;
  recalculateTeamStrength(fromTeam);
  recalculateTeamStrength(toTeam);
  recordTransfer(player, toTeam.name, 0);
  transferLog.push(`${icon('clipboard')} <em>${player.firstName} ${player.lastName}</em> lascia <strong>${fromTeam.name}</strong> a parametro zero e si trasferisce a <strong>${toTeam.name}</strong> (pre-contratto firmato in inverno)`);
  pendingPreContracts = pendingPreContracts.filter(pc => pc !== preContract);
}

// Esegue la partenza di un giocatore in scadenza NON rinnovato: se c'era una
// squadra interessata (renewalInterest, vedi showManagerMarketModal) firma
// subito con loro a parametro zero — nessuna cessione a pagamento, dato che
// il contratto sta comunque per scadere. Altrimenti resta un normale
// svincolo generico tra i liberi.
function resolveExpiringPlayerDeparture(player) {
  playerTeam.roster = playerTeam.roster.filter(p => p !== player);
  const dest = renewalInterest.get(player.id);
  if (dest) {
    dest.roster.push(player);
    recalculateTeamStrength(dest);
    recordTransfer(player, dest.name, 0);
    transferLog.push(`🔚 <em>${player.firstName} ${player.lastName}</em> lascia <strong>${playerTeam.name}</strong> a parametro zero e firma con <strong>${dest.name}</strong>`);
  } else {
    recordTransfer(player, null, null);
    freeAgents.push(player);
    transferLog.push(`🔚 <em>${player.firstName} ${player.lastName}</em> lascia <strong>${playerTeam.name}</strong> a parametro zero`);
  }
}

// Riga di una proposta d'acquisto nel selettore offerte: un'offerta può
// venire da una squadra italiana (o.buyerTeam) o da un club estero della
// nazione del giocatore (o.foreignClub) — stesso layout, sorgente diversa.
function renderSellOfferRow(o, i) {
  const nameHtml = o.buyerTeam
    ? `<span class="mm-name">${o.buyerTeam.name}</span><span style="font-size:.8rem;color:#666">(Serie ${o.buyerTeam.leagueLevel})</span>`
    : `<span class="mm-name">${o.foreignClub}</span><span style="font-size:.8rem;color:#666">(estero)</span>`;
  return `<div class="mm-row"><div class="mm-pinfo">${nameHtml}</div><div class="mm-acts"><strong class="mm-price">${o.price.toFixed(1)}M€</strong><button class="mm-btn mm-green" data-offer-idx="${i}">Accetta</button></div></div>`;
}
function executeSellOffer(player, offer) {
  if (offer.buyerTeam) executeSellTo(player, offer.buyerTeam, offer.price);
  else executeSellAbroad(player, offer.foreignClub, offer.price);
}

// Costo di svincolo anticipato (buonuscita): stipendio annuo × anni di
// contratto residui, convertito in M€ per essere confrontato col budget.
function getReleaseCost(player) {
  const years = Math.max(0, player.contract?.duration || 0);
  const salaryMonthly = player.contract?.salary ?? getDisplaySalary(player.strength);
  return annualSalary(salaryMonthly) * years / 1000;
}

// Svincola anticipatamente un giocatore ancora sotto contratto, pagando la
// buonuscita (getReleaseCost). Ritorna true se riuscito (fondi sufficienti).
function executeEarlyRelease(player) {
  const cost = getReleaseCost(player);
  if (playerTeam.budget < cost) return false;
  playerTeam.budget -= cost;
  playerTeam.roster = playerTeam.roster.filter(p => p !== player);
  recordTransfer(player, null, null);
  freeAgents.push(player);
  transferLog.push(`🔚 <strong>${playerTeam.name}</strong> svincola ${player.firstName} ${player.lastName} pagando una buonuscita di <strong>${cost.toFixed(1)}M€</strong>`);
  return true;
}

// Rinnovo "a piacimento" (non solo per contratti in scadenza): stessa
// formula unificata (computeRenewalOutcome) di CPU e gate — non più una
// proposta sempre accettata con anni a scelta del DS: il giocatore può
// rifiutare, e se accetta la durata (che SOSTITUISCE quella residua, non la
// somma) è quella concordata col procuratore in base a personalità/
// prestigio/adeguatezza alla squadra, con il pavimento/tetto di
// getContractDurationRange per forza ed età.
// Ritorna { success: true } se firmato, { success: false, refused, reason }
// altrimenti (refused=true se il motivo è il giocatore, false se è il monte
// ingaggi del club a bloccare l'offerta ancora prima di proporla).
function executeAnytimeRenew(player) {
  const newSalary = getRenewalSalary(player);
  if (!wageCapAllows(playerTeam, newSalary, player.contract?.salary || 0)) return { success: false, refused: false };
  const outcome = computeRenewalOutcome(player, playerTeam);
  if (outcome === 0) {
    const reason = getRenewalRefusalReason(player);
    transferLog.push(`${icon('clipboard')} <em>${player.firstName} ${player.lastName}</em> rifiuta il rinnovo con <strong>${playerTeam.name}</strong> (${reason})`);
    return { success: false, refused: true, reason };
  }
  if (!player.contract) player.contract = createContract(player.strength, player.age);
  player.contract.salary = newSalary;
  player.contract.duration = outcome;
  transferLog.push(`${icon('clipboard')} <em>${player.firstName} ${player.lastName}</em> rinnova con <strong>${playerTeam.name}</strong> — ${outcome} anni, ${formatMoneyK(annualSalary(newSalary))}€/anno`);
  return { success: true };
}

// Finestra dedicata per scegliere fra le proposte (acquisto o prestito) di un
// singolo giocatore, aperta da Vendi/Presta nella tab Rosa. Si chiude solo
// scegliendo un'offerta, rifiutandole tutte, o con "Torna" se non ce n'è
// nessuna. onDone(idx) riceve l'indice dell'offerta scelta, o -1 se nessuna.
function showOfferPickerModal(titleHtml, offers, renderOfferRow, onDone) {
  const overlay = document.createElement('div');
  overlay.className = 'mm-overlay';
  const rows = offers.map(renderOfferRow).join('');
  overlay.innerHTML = `
    <div class="mm-box" style="max-width:520px">
      <div class="mm-header"><span class="mm-title">${titleHtml}</span></div>
      <div class="mm-content">
        ${offers.length ? rows : '<p class="mm-empty">Nessuna squadra ha fatto proposte questa sessione.</p>'}
      </div>
      <div class="mm-footer">
        <span class="mm-footer-note"></span>
        <button class="mm-btn ${offers.length ? 'mm-red' : 'mm-confirm'}" id="offer-picker-close">${offers.length ? 'Rifiuta tutte' : 'Torna'}</button>
      </div>
    </div>`;
  overlay.querySelectorAll('[data-offer-idx]').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = +btn.dataset.offerIdx;
      overlay.remove();
      onDone(idx);
    });
  });
  overlay.querySelector('#offer-picker-close').addEventListener('click', () => {
    overlay.remove();
    onDone(-1);
  });
  document.body.appendChild(overlay);
}

// Prende in prestito un giocatore altrui; ritorna true se riuscito
function loanInPlayer(player, fromTeam) {
  if (getIncomingLoanCount(playerTeam) >= MAX_INCOMING_LOANS) return false;
  if (!canPlayerSignMore(playerTeam)) return false;
  if (!canTeamAcquirePlayer(playerTeam, player)) return false;
  if (isSessionLocked(player)) return false;
  fromTeam.roster = fromTeam.roster.filter(p => p !== player);
  playerTeam.roster.push(player);
  activeLoans.push({ player, homeTeam: fromTeam, loanTeam: playerTeam });
  lockForSession(player);
  recordTransfer(player, playerTeam.name, 'prestito');
  recalculateTeamStrength(fromTeam);
  recalculateTeamStrength(playerTeam);
  transferLog.push(`${icon('cycle')} <strong>${playerTeam.name}</strong> prende in prestito ${player.firstName} ${player.lastName} da <strong>${fromTeam.name}</strong>`);
  return true;
}

// A inizio stagione: ogni prestito attivo dura esattamente un anno, si risolve
// riportando il giocatore al club di appartenenza
function resolveLoanReturns() {
  activeLoans.forEach(({ player, homeTeam, loanTeam }) => {
    loanTeam.roster = loanTeam.roster.filter(p => p !== player);
    homeTeam.roster.push(player);
    // fee 'rientro' (non 'prestito'): distingue nella tabella Carriera il
    // rientro dal prestito dall'andata — prima usavano lo stesso tag,
    // mostrando due "Prestito" di fila per lo stesso passaggio e dando
    // l'impressione di due prestiti distinti invece di andata+ritorno.
    recordTransfer(player, homeTeam.name, 'rientro');
    recalculateTeamStrength(loanTeam);
    recalculateTeamStrength(homeTeam);
    transferLog.push(`${icon('cycle')} <em>${player.firstName} ${player.lastName}</em> rientra dal prestito: <strong>${loanTeam.name}</strong> → <strong>${homeTeam.name}</strong>`);
  });
  activeLoans = [];
}

// ── PANCHINA: esonero e ingaggio allenatore ─────────────────────────────────

// Buonuscita per esonerare l'allenatore in corsa (M€) — proporzionale alla sua forza
// Buonuscita per esonero anticipato: stipendio annuo × anni di contratto
// residui, esattamente come getReleaseCost per i giocatori.
function getCoachSeveranceCost(coach) {
  const years = Math.max(0, coach.contract?.duration || 0);
  const salaryMonthly = coach.contract?.salary ?? getDisplaySalary(coach.strength);
  return Math.max(0.5, annualSalary(salaryMonthly) * years / 1000);
}

// Buonuscita per rescindere il contratto di un DS in corsa (M€) — stessa
// formula del coach (stipendio annuo × anni residui).
function getDsSeveranceCost(ds) {
  const years = Math.max(0, ds.contract?.duration || 0);
  const salaryMonthly = ds.contract?.salary ?? Math.max(1, Math.round(getDisplaySalary(ds.strength) / 10));
  return Math.max(0.5, annualSalary(salaryMonthly) * years / 1000);
}

// Quanti titolari andrebbero fuori ruolo con quel modulo, data la rosa attuale
function countOutOfPosition(team, formationName) {
  const available = filterAvailableRoster(team.roster || []);
  const pool = available.length >= 7 ? available : (team.roster || []);
  return getBest11(pool, formationName).filter(e => !e.inPosition).length;
}

function getFormationFitLabel(team, formationName) {
  const oop = countOutOfPosition(team, formationName);
  if (oop === 0) return { text: `${icon('check')} Fit ottimo`, color: '#16a34a' };
  if (oop === 1) return { text: '🙂 Fit buono', color: '#8bc34a' };
  if (oop === 2) return { text: `${icon('warning')} Fit medio`, color: '#f59e0b' };
  return { text: `${icon('cross')} Fit scarso`, color: '#ef4444' };
}

// `renewalGate` (opzionale): { players, winter, onGateDone } — modalità
// "solo Rinnovi", bloccante, usata PRIMA che parta lo scheduler a turni (sia
// estivo sia invernale): riusa questa stessa finestra reale invece di un
// popup a parte, ma con tutte le altre tab nascoste e il footer sostituito
// da un unico pulsante "Vai al mercato →", disabilitato finché ogni
// giocatore in `players` non ha una decisione (renewalDecisions). `winter`
// distingue il secondo pulsante per riga: "Svincola" (estate, contratto già
// scaduto) vs "Non rinnovare ora" (inverno, ancora sotto contratto — pura
// presa d'atto, nessuna azione di gioco).
function showManagerMarketModal(onConfirm, turnCtx = null, renewalGate = null) {
  // pendingAIOffers NON viene più generata qui: le offerte per i giocatori
  // del player nascono ora dal mercato a turni vero e proprio (vedi
  // tryOfferForPlayerSurplus) — una CPU con un bisogno reale che vorrebbe un
  // giocatore del player fa un'offerta genuina invece di comprarlo in
  // automatico. pendingAIOffers è inizializzata una sola volta per sessione
  // (in proceedToBriefing, prima di runTurnBasedMarket) e si accumula da lì
  // per tutta la durata del mercato — riaprire questa finestra (anche più
  // volte, una per turno) non deve azzerarla né rigenerarla a caso.

  // NB: l'eventuale interesse di un'altra squadra su un giocatore in scadenza
  // (renewalInterest) viene ormai deciso PRIMA, nel mercato invernale (vedi
  // finishAndata) — qui in pendingRenewals arrivano per costruzione SOLO i
  // giocatori che NON hanno suscitato interesse (STEP 1d in updateTeamStrengths
  // fa già partire subito, senza passare da qui, chi era interessato e non è
  // stato rinnovato in inverno): la tab Rinnovi di fine stagione resta quindi
  // sempre "tranquilla", senza mai mostrare "Se non rinnovi, firma gratis con...".

  // Generati una sola volta per sessione (non ad ogni apertura, ora che la
  // finestra può riaprirsi più volte nella stessa sessione — vedi Fase 16):
  // altrimenti riaprendola a un turno successivo la lista scout verrebbe
  // rimpiazzata con una nuova ogni volta, perdendo quella già mostrata.
  if (!pendingForeignScoutTargets.length) {
    pendingForeignScoutTargets = playerTeam.leagueLevel === 'A' ? generateForeignScoutTargets() : [];
  }

  // Mappe di sessione (vedi mmSessionRenewalDecisions ecc. in cima al file):
  // NON locali, sopravvivono a riaperture ripetute della stessa finestra
  // nella stessa sessione di mercato — una decisione presa in un turno non
  // deve tornare a essere richiesta al turno successivo.
  const renewalDecisions = mmSessionRenewalDecisions; // player.id → 'renewed' | 'released'
  const offerDecisions = mmSessionOfferDecisions; // player.id → 'accepted' | 'refused'
  // Finché c'è un'offerta ricevuta ancora da decidere, le altre azioni di
  // mercato (compra/vendi/presta/svincola) restano bloccate — il player deve
  // prima rispondere a chi gli ha fatto un'offerta, ma può comunque muoversi
  // liberamente tra le tab per consultare la rosa nel frattempo.
  const hasUnresolvedOffers = () => pendingAIOffers.some(o => !offerDecisions.has(o.player.id));
  const boughtIds = mmSessionBoughtIds; // player.id già acquistati
  // Un giocatore venduto/ceduto in questa sessione (Offerte ricevute, Rosa →
  // Vendi) non deve poter essere ricomprato nella STESSA sessione — senza
  // questo, "Tutti i giocatori" (scansione live di tutte le rose) lo
  // rimostra subito nella rosa dell'acquirente, riacquistabile all'istante.
  const soldIds = mmSessionSoldIds;
  // Se il giocatore lascia la rosa da un percorso diverso dalla tab Offerte
  // (Vendi/Presta/Svincola dalla tab Rosa), un'eventuale offerta AI pendente
  // per lui va invalidata subito: altrimenti resterebbe accettabile per un
  // giocatore che nel frattempo è già altrove, con conseguente sdoppiamento
  // (il giocatore finirebbe nella rosa di DUE squadre contemporaneamente).
  const invalidatePendingOfferFor = (playerId) => {
    if (pendingAIOffers.some(o => o.player.id === playerId) && !offerDecisions.has(playerId)) {
      offerDecisions.set(playerId, 'refused');
    }
  };
  const filter = { role: '', position: '', ageMin: 16, ageMax: 40, strMin: 0, strMax: 100, priceMin: 0, priceMax: 250, availability: 'all' };
  const loanFilter = { role: '', position: '', ageMin: 16, ageMax: 40, strMin: 0, strMax: 100 };
  // Stessi filtri di Acquisti/Prestiti (ruolo/posizione/età/forza — niente
  // prezzo, i pre-contratti sono sempre a parametro zero), stato separato
  // così non si mescola con quello delle altre tab.
  const preContractFilter = { role: '', position: '', ageMin: 16, ageMax: 40, strMin: 0, strMax: 100 };
  let coachCandidates = []; // ricostruito a ogni render della tab Panchina: idx → coach da freeCoaches
  let coachBuyCandidates = []; // ricostruito a ogni render della tab Panchina: idx → { coach, fromTeam } acquistabili a pagamento
  let loanCandidates = []; // ricostruito a ogni render della tab Prestiti: idx → { player, fromTeam }
  let preContractCandidates = []; // ricostruito a ogni render della tab Precontratti: idx → { player, fromTeam }
  let activeTab = renewalGate ? 'rinnovi' : (!playerTeam.coach ? 'panchina' : pendingRenewals.length > 0 ? 'rinnovi' : 'rosa');
  let coachAvail = 'all'; // vista tab Panchina: 'all' | 'free' | 'market'
  let moduliView = 'modulo'; // vista tab Moduli: 'modulo' | 'best11'
  let moduliFormation = null; // modulo selezionato nella tab Moduli (lazy: parte dall'attivo)

  // Azioni per-riga nella tab Rosa (Rinnova/Vendi/Presta sempre disponibili
  // per ogni giocatore): le proposte di acquisto/prestito si generano una
  // sola volta per sessione di mercato (cache per player.id), non a ogni click.
  const rosaSellOffers = new Map(); // player.id → offerte[] generate on-demand
  const rosaLoanOffers = new Map(); // player.id → offerte[] generate on-demand
  const rosaRowPanel = new Map();   // player.id → 'renew' | 'sell' | 'loan' (pannello aperto)
  const rosaRenewRefusals = new Map(); // player.id → motivo dell'ultimo rifiuto al rinnovo "a piacimento"

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
      transferLog.push(`${icon('warning')} <strong>${playerTeam.name}</strong> esonera <em>${outgoing.firstName} ${outgoing.lastName}</em> — buonuscita: ${severance.toFixed(1)}M€`);
    } else {
      transferLog.push(`${icon('document')} <em>${outgoing.firstName} ${outgoing.lastName}</em> lascia <strong>${playerTeam.name}</strong> a fine contratto`);
    }
    freeCoaches.push(outgoing);
    playerTeam.coach = null;
    return true;
  };

  const overlay = document.createElement('div');
  overlay.className = 'mm-overlay';

  const buildRennoviTab = () => {
    const gateWinter = renewalGate && renewalGate.winter;
    const list = renewalGate ? renewalGate.players : pendingRenewals;
    if (!list.length) return '<p class="mm-empty">Nessun contratto in scadenza.</p>';
    const disclaimer = `<p class="mm-hint" style="padding:0 0 10px;font-weight:600">✍️ Stipendio e durata del contratto concordati col procuratore — puoi solo proporre il rinnovo, l'esito dipende dal giocatore.</p>`;
    const gateHint = gateWinter
      ? `<p class="mm-hint" style="padding:0 0 10px">Questi giocatori sono in ultimo anno di contratto: da oggi, durante il mercato invernale, qualunque squadra può proporgli un precontratto senza bisogno del tuo consenso — solo il loro. Decidi ora per ciascuno prima di procedere.</p>`
      : '';
    return gateHint + disclaimer + list.map(player => {
      const d = renewalDecisions.get(player.id);
      const demanded = getRenewalSalary(player);
      const current = player.contract?.salary || getDisplaySalary(player.strength);
      const interestedTeam = renewalGate ? null : renewalInterest.get(player.id);
      if (d === 'renewed') return `<div class="mm-row mm-done">${icon('check')} <strong>${player.firstName} ${player.lastName}</strong> rinnovato — ${formatMoneyK(annualSalary(demanded))}€/anno</div>`;
      if (d === 'released') return `<div class="mm-row mm-done">🔚 <strong>${player.firstName} ${player.lastName}</strong> ${interestedTeam ? `firmato con <strong>${interestedTeam.name}</strong> a parametro zero` : 'svincolato'}</div>`;
      if (d === 'declined') return `<div class="mm-row mm-done">${icon('warning')} <strong>${player.firstName} ${player.lastName}</strong> non rinnovato — a rischio precontratto</div>`;
      if (typeof d === 'string' && d.startsWith('refused:')) {
        const reason = d.slice('refused:'.length);
        return `<div class="mm-row mm-done">${icon('warning')} <strong>${player.firstName} ${player.lastName}</strong> ha rifiutato il rinnovo (${reason})${gateWinter ? ' — resta sotto contratto, a rischio precontratto' : ' — parte a parametro zero'}</div>`;
      }
      const overCap = !wageCapAllows(playerTeam, demanded, current);
      const renewBtn = overCap
        ? `<button class="mm-btn mm-green" disabled title="Supera il monte ingaggi">${icon('banned')} Monte ingaggi</button>`
        : `<button class="mm-btn mm-green" data-action="renew" data-pid="${player.id}">Proponi rinnovo</button>`;
      const interestNote = interestedTeam ? `<span style="font-size:.75rem;color:#2f6fed">🏟️ Se non rinnovi, firma gratis con ${interestedTeam.name}</span>` : '';
      const secondBtn = gateWinter
        ? `<button class="mm-btn" data-action="decline-renew" data-pid="${player.id}">Non rinnovare ora</button>`
        : `<button class="mm-btn mm-red" data-action="release" data-pid="${player.id}">Svincola</button>`;
      return `<div class="mm-row">
        <div class="mm-pinfo">${formatNationality(player)}<span class="mm-name">${player.firstName} ${player.lastName}</span>${formatRoleBadges(player)}<span style="font-size:.78rem;color:#666">${formatSubRoles(player)}</span><span>${player.age}a</span><span>⚡${player.strength}</span><span class="mm-salary-chg">${formatMoneyK(annualSalary(current))}€ → <strong>${formatMoneyK(annualSalary(demanded))}€</strong>/anno</span>${interestNote}</div>
        <div class="mm-acts">
          ${renewBtn}
          ${secondBtn}
        </div></div>`;
    }).join('');
  };

  const buildOfferteTab = () => {
    if (!pendingAIOffers.length) return '<p class="mm-empty">Nessuna offerta ricevuta.</p>';
    return pendingAIOffers.map(({ player, buyerTeam, offerPrice }) => {
      const d = offerDecisions.get(player.id);
      if (d === 'accepted') return `<div class="mm-row mm-done">${icon('check')} <strong>${player.firstName} ${player.lastName}</strong> venduto a ${buyerTeam.name} — ${offerPrice.toFixed(1)}M€</div>`;
      if (d === 'refused') {
        // Il rifiuto può arrivare sia da un click esplicito su "Rifiuta" (il
        // giocatore resta in rosa) sia perché nel frattempo è stato ceduto/
        // prestato/svincolato dalla tab Rosa (l'offerta va invalidata di
        // conseguenza — vedi invalidatePendingOfferFor) — il messaggio
        // riflette quale dei due casi è successo davvero.
        const stillHere = playerTeam.roster.includes(player);
        return `<div class="mm-row mm-done">${icon('cross')} Offerta rifiutata — <strong>${player.firstName} ${player.lastName}</strong> ${stillHere ? 'rimane' : 'nel frattempo ha lasciato la rosa'}</div>`;
      }
      return `<div class="mm-row">
        <div class="mm-pinfo">${formatNationality(player)}<span class="mm-name">${player.firstName} ${player.lastName}</span>${formatRoleBadges(player)}<span style="font-size:.78rem;color:#666">${formatSubRoles(player)}</span><span>${player.age}a</span><span>⚡${player.strength}</span><span class="mm-buyer-tag">🏟️ ${buyerTeam.name}</span></div>
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
    // Pre-contratti firmati da TUOI giocatori con un ALTRO club (in uscita):
    // restano in rosa e giocano fino a fine stagione, ma sono già promessi
    // altrove — bloccati per il mercato in uscita come un ritiro (§1a-bis).
    const outgoingPreContractTeamById = new Map(
      pendingPreContracts.filter(pc => pc.fromTeam === playerTeam).map(pc => [pc.player.id, pc.toTeam.name])
    );

    // Giocatori presi in prestito: non sono di proprietà, tornano al club
    // d'origine a inizio stagione — non si cedono e non contano per il futuro
    const loanedInTeamById = new Map(
      activeLoans.filter(l => l.loanTeam === playerTeam).map(l => [l.player.id, l.homeTeam.name])
    );
    const loanedInIds = new Set(loanedInTeamById.keys());
    // Giocatori prestati altrove: fisicamente non più in playerTeam.roster
    // (sono passati alla rosa del club che li ospita), ma restiamo comunque
    // "proprietari" — li mostriamo come riga informativa in coda alla rosa.
    const outgoingLoans = activeLoans.filter(l => l.homeTeam === playerTeam);
    const outgoingLoanTeamById = new Map(outgoingLoans.map(l => [l.player.id, l.loanTeam.name]));

    // Unisci la rosa attuale (senza duplicati) con i pre-contratti in arrivo
    // e i prestiti in uscita (solo per la visualizzazione, vedi sopra)
    const currentRoster = playerTeam.roster;
    const all = [...currentRoster];
    precontracts.forEach(p => { if (!all.includes(p)) all.push(p); });
    outgoingLoans.forEach(l => { if (!all.includes(l.player)) all.push(l.player); });

    if (!all.length) return '<p class="mm-empty">Rosa vuota.</p>';

    const roleOrder = ROLE_ORDER;
    const sorted = [...all].sort((a, b) => (roleOrder[a.role] - roleOrder[b.role]) || b.strength - a.strength);

    // Conteggio della rosa attuale (chi scende in campo questa stagione):
    // include i giocatori in prestito in ingresso, che contano a tutti gli
    // effetti per i minimi di ruolo finché restano — solo chi sta lasciando
    // il club (rinnovo rifiutato) non conta più.
    const nextCounts = {}; ROLES.forEach(r => { nextCounts[r] = 0; });
    currentRoster.forEach(p => { if (!leavingIds.has(p.id)) nextCounts[p.role]++; });
    precontracts.forEach(p => nextCounts[p.role]++);
    const nextTotal = Object.values(nextCounts).reduce((a, b) => a + b, 0);

    // Nessun vincolo per ruolo per il giocatore umano: i badge sono solo
    // informativi (nessun minimo/massimo, nessun riempimento automatico).
    const countsBadge = role => {
      const n = nextCounts[role];
      return `<span style="display:inline-block;padding:2px 8px;margin-right:6px;background:#64748b;color:#fff;border-radius:10px;font-size:.75rem;font-weight:700">${role}: ${n}</span>`;
    };
    const effTotal = getEffectiveRosterCount(playerTeam);
    const alertMissing = nextTotal < PLAYER_ROSTER_MIN_TO_PROCEED
      ? `<div style="margin-top:6px;color:#b91c1c;font-size:.8rem;font-weight:600">${icon('warning')} Sotto ${PLAYER_ROSTER_MIN_TO_PROCEED} giocatori: non potrai chiudere il mercato finché non ne prendi almeno ${PLAYER_ROSTER_MIN_TO_PROCEED}</div>`
      : effTotal >= PLAYER_ROSTER_MAX
        ? `<div style="margin-top:6px;color:#b45309;font-size:.8rem;font-weight:600">${icon('warning')} Rosa al tetto massimo di ${PLAYER_ROSTER_MAX} giocatori (prestiti in uscita inclusi): nessun altro acquisto possibile finché non liberi posto</div>`
        : '';
    const formationNote = playerTeam.coach?.formations?.length
      ? ` <span style="font-weight:400;color:#557">— Modulo: <strong>${pickActiveFormation(playerTeam)}</strong></span>`
      : '';
    const summary = `<div style="margin-bottom:10px;padding:8px 10px;background:#eef7ff;border:1px solid #bcd;border-radius:6px;font-size:.85rem">
      <div style="font-weight:700;margin-bottom:6px">${icon('clipboard')} Rosa attuale (${nextTotal} giocatori)${formationNote}</div>
      ${ROLES.map(countsBadge).join('')}
      ${alertMissing}
    </div>`;

    const rows = sorted.map(p => {
      const isPrecontract = precontractIds.has(p.id);
      const isLeaving = leavingIds.has(p.id);
      const isLoanedIn = loanedInIds.has(p.id);
      const isLoanedOut = outgoingLoanTeamById.has(p.id);
      const isRenewed = pendingRenewals.some(r => r.id === p.id) && renewalDecisions.get(p.id) === 'renewed';
      const durVal = p.contract?.duration;
      const outgoingPreContractTeam = outgoingPreContractTeamById.get(p.id);
      const isOutgoingPrecontract = !!outgoingPreContractTeam;
      const willRetire = !isPrecontract && !isOutgoingPrecontract && !isLoanedIn && !isLoanedOut && p.age >= 36;

      let status;
      if (isLoanedIn) status = `<span style="color:#64748b;font-weight:700">${icon('cycle')} in prestito dal ${loanedInTeamById.get(p.id)}</span>`;
      else if (isLoanedOut) status = `<span style="color:#64748b;font-weight:700">${icon('cycle')} in prestito al ${outgoingLoanTeamById.get(p.id)}</span>`;
      else if (isOutgoingPrecontract) status = `<span style="color:#b91c1c;font-weight:700">${icon('clipboard')} si unirà a fine stagione a ${outgoingPreContractTeam}</span>`;
      else if (isPrecontract) status = '<span style="color:#2f6fed;font-weight:700">📝 pre-contratto</span>';
      else if (isLeaving) status = '<span style="color:#e05050;font-weight:700">👋 in uscita</span>';
      else if (willRetire) status = '<span style="color:#8e44ad;font-weight:700">🎓 si ritira</span>';
      else if (isRenewed) status = `<span style="color:#15803d;font-weight:700">${icon('check')} rinnovato</span>`;
      else if (!durVal || durVal <= 0) status = `<span style="color:#e05050">${icon('warning')} scad.</span>`;
      else status = `${durVal}a`;

      const rowStyle = (isLoanedIn || isLoanedOut) ? 'background:#f1f5f9'
        : isOutgoingPrecontract ? 'background:#fde2e2'
          : isPrecontract ? 'background:#e3f2fd'
            : isLeaving ? 'background:#fee'
              : willRetire ? 'background:#f5eefa'
                : '';
      const sal = annualSalary(p.contract?.salary ?? getDisplaySalary(p.strength));

      // Rinnova/Vendi/Presta/Svincola sempre disponibili per ogni giocatore
      // di proprietà (non per pre-contratti in arrivo/uscita, prestiti in
      // ingresso/uscita o chi si ritira comunque a fine stagione) — un
      // giocatore con precontratto in uscita è come già "andato": non si può
      // più fare nulla su di lui (§1a-bis, importante: nemmeno rinnovarlo,
      // il precontratto è già firmato).
      const eligible = !isPrecontract && !isOutgoingPrecontract && !isLoanedIn && !isLoanedOut && !willRetire;
      const panel = eligible ? rosaRowPanel.get(p.id) : null;
      let actionsCell = '<td></td>';
      if (eligible) {
        const releaseCost = getReleaseCost(p);
        const locked = hasUnresolvedOffers();
        const lockedTitle = 'title="Rispondi prima alle offerte ricevute"';
        // §5: già comprato/venduto/prestato/svincolato-e-firmato in QUESTA
        // sessione — non ritrasferibile fino alla sessione successiva.
        const sessLocked = isSessionLocked(p);
        const sessLockedTitle = 'title="Già trasferito in questa sessione di mercato"';
        // §1a-bis: ha già firmato un precontratto con un altro club — bloccato
        // per il mercato in uscita fino a fine stagione, come un prestito.
        const preContracted = isPreContracted(p);
        const preContractedTitle = 'title="Ha firmato un pre-contratto con un\'altra squadra"';
        const canRelease = playerTeam.budget >= releaseCost && !locked;
        const canLoan = canLoanOutPlayer(playerTeam, p) && !locked && !sessLocked && !preContracted;
        const releaseTitle = locked ? lockedTitle : canRelease ? '' : 'title="Buonuscita: stipendio annuo × anni residui"';
        const loanTitle = locked ? lockedTitle : sessLocked ? sessLockedTitle : preContracted ? preContractedTitle : canLoan ? '' : 'title="Sei già al minimo di ruolo"';
        const sellBlocked = locked || sessLocked || preContracted;
        const sellTitle = locked ? lockedTitle : sessLocked ? sessLockedTitle : preContracted ? preContractedTitle : '';
        actionsCell = `<td class="rosa-actions">
          <button class="mm-btn mm-green" data-action="rosa-open-sell" data-pid="${p.id}" style="font-size:.72rem;padding:2px 7px" ${sellBlocked ? `disabled ${sellTitle}` : ''}>Vendi</button>
          <button class="mm-btn mm-blue" data-action="rosa-open-loan" data-pid="${p.id}" style="font-size:.72rem;padding:2px 7px" ${canLoan ? '' : `disabled ${loanTitle}`}>Presta</button>
          <button class="mm-btn mm-blue" data-action="rosa-toggle-renew" data-pid="${p.id}" style="font-size:.72rem;padding:2px 7px">${panel === 'renew' ? '▲ Rinnova' : 'Rinnova'}</button>
          <button class="mm-btn mm-red" data-action="rosa-release" data-pid="${p.id}" style="font-size:.72rem;padding:2px 7px" ${canRelease ? '' : 'disabled'} ${releaseTitle}>Svincola (${releaseCost.toFixed(1)}M€)</button>
        </td>`;
      }

      const mainRow = `<tr class="db-row-clickable" data-player-id="${p.id}" style="${rowStyle}">
        <td class="col-naz">${formatNationality(p)}</td>
        <td><span class="player-name-link">${p.firstName} ${p.lastName}</span></td>
        <td>${formatRoleBadges(p)}</td><td style="font-size:.82rem;color:#666">${formatSubRoles(p)}</td><td>${p.age}</td>
        <td><strong>${p.strength}</strong></td>
        <td>${formatMoneyK(sal)}€/anno</td><td>${status}</td>
        ${actionsCell}
      </tr>`;

      let panelRow = '';
      if (panel === 'renew') {
        const previewSalary = getRenewalSalary(p);
        const refusalReason = rosaRenewRefusals.get(p.id);
        const refusalNote = refusalReason
          ? `<div style="color:#b45309;font-weight:600;margin-top:4px">${icon('warning')} Ha rifiutato la proposta precedente (${refusalReason}) — puoi riprovare.</div>`
          : '';
        panelRow = `<tr class="rosa-panel-row"><td colspan="10">
          <strong>Rinnova ${p.firstName} ${p.lastName}</strong> — stipendio e durata concordati col procuratore, in base alla forza attuale: <strong>${formatMoneyK(annualSalary(previewSalary))}€/anno</strong>
          <button class="mm-btn mm-green" data-action="rosa-confirm-renew" data-pid="${p.id}">Proponi rinnovo</button>
          ${refusalNote}
        </td></tr>`;
      }

      return mainRow + panelRow;
    }).join('');
    const warning = playerTeam.budget < 0
      ? `<div style="background:#fdecea;border:1px solid #ef4444;border-radius:6px;padding:8px 12px;margin-bottom:10px;color:#b91c1c;font-weight:600">${icon('warning')} Budget negativo (${playerTeam.budget.toFixed(1)}M€) — vendi qualche giocatore col bottone "Vendi" prima di proseguire.</div>`
      : '';
    return `${warning}${summary}<table style="font-size:.85rem">
      <thead><tr><th class="col-naz">Naz.</th><th>Nome</th><th>Ruolo</th><th>Posizione</th><th>Età</th><th>Forza</th><th>Stipendio</th><th>Stato</th><th>Azioni</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>`;
  };

  const buildPanchinaTab = () => {
    const coach = playerTeam.coach;
    let html = '';
    const expired = coach && (coach.contract?.duration || 0) <= 0;

    // ── Allenatore attuale ────────────────────────────────────────────────
    if (coach && expired) {
      const activeFormation = pickActiveFormation(playerTeam);
      const fit = getFormationFitLabel(playerTeam, activeFormation);
      html += `<div class="mm-row" style="background:#fdecea">
        <div class="mm-pinfo">
          <span class="mm-name">${coach.firstName} ${coach.lastName}</span>
          <span>${coach.age}a</span>
          <span>⚡${coach.strength}</span>
          <span class="mm-badge" title="${formatFormationRequirements(activeFormation)}">${(coach.formations || []).join(' / ')}</span>
          <span style="font-size:.8rem;color:${fit.color};font-weight:600">${fit.text}</span>
          <span class="mm-salary-tag">${icon('briefcase')} ${formatMoneyK(annualSalary(getDisplaySalary(coach.strength)))}€/anno</span>
          <span style="font-size:.8rem;color:#b91c1c;font-weight:700">${icon('warning')} contratto scaduto</span>
        </div>
        <div class="mm-acts">
          ${durationSelectHtml('data-dur-renew-coach', 'x')}
          <button class="mm-btn mm-green" data-action="renew-coach">Rinnova</button>
          <button class="mm-btn mm-red" data-action="release-coach">Lascialo andare</button>
        </div></div>
        <p style="font-size:.82rem;color:#666;margin:10px 2px">Il contratto è scaduto: rinnovalo scegliendo la durata, oppure lascialo andare gratuitamente e ingaggiane un altro dal mercato qui sotto.</p>`;
    } else if (coach) {
      const activeFormation = pickActiveFormation(playerTeam);
      const fit = getFormationFitLabel(playerTeam, activeFormation);
      const severance = getCoachSeveranceCost(coach);
      const canAfford = playerTeam.budget >= severance;
      html += `<div class="mm-row" style="background:#eef7ff">
        <div class="mm-pinfo">
          <span class="mm-name">${coach.firstName} ${coach.lastName}</span>
          <span>${coach.age}a</span>
          <span>⚡${coach.strength}</span>
          <span class="mm-badge" title="${formatFormationRequirements(activeFormation)}">${(coach.formations || []).join(' / ')}</span>
          <span style="font-size:.8rem;color:${fit.color};font-weight:600">${fit.text}</span>
          <span class="mm-salary-tag">${icon('briefcase')} ${formatMoneyK(annualSalary(coach.contract?.salary ?? getDisplaySalary(coach.strength)))}€/anno</span>
          <span style="font-size:.8rem;color:#666">Contratto: ${coach.contract.duration}a</span>
        </div>
        <div class="mm-acts">
          <button class="mm-btn mm-red" data-action="fire-coach" ${canAfford ? '' : 'disabled'}>
            ${canAfford ? `Esonera (${severance.toFixed(1)}M€)` : 'Fondi insuff. per esonero'}
          </button>
        </div></div>
        <p style="font-size:.82rem;color:#666;margin:10px 2px">Il modulo attivo dell'allenatore determina la formazione in campo (posizioni richieste: <strong>${formatFormationRequirements(activeFormation)}</strong> — l'allenatore ha 2 moduli preferiti, in campo scende quello che rende di più con la rosa attuale). Puoi anche ingaggiare direttamente un allenatore dal mercato qui sotto: quello attuale verrà esonerato in automatico (buonuscita inclusa).</p>`;
    } else {
      html += `<div style="background:#fdecea;border:1px solid #ef4444;border-radius:6px;padding:8px 12px;margin-bottom:12px;color:#b91c1c;font-weight:600">${icon('warning')} Sei senza allenatore — scegline uno dal mercato qui sotto prima di continuare.</div>`;
    }

    // ── Toggle vista: Svincolati / Sul mercato ──────────────────────────────
    const outgoingSeverance = (coach && !expired) ? getCoachSeveranceCost(coach) : 0;
    const swapNote = (coach && !expired)
      ? ` <span style="font-size:.75rem;color:#b91c1c">(esonero incluso: ${outgoingSeverance.toFixed(1)}M€)</span>`
      : '';
    const seg = (val, label) => `<button type="button" class="mm-seg${coachAvail === val ? ' active' : ''}" data-coach-avail="${val}">${label}</button>`;
    html += `<div class="mm-seg-group" style="margin:2px 2px 12px">${seg('all', 'Tutti')}${seg('free', '🆓 Svincolati')}${seg('market', '🛒 Sul mercato')}</div>`;

    const showFree = coachAvail !== 'market';
    const showMarket = coachAvail !== 'free';

    // Righe delle due liste: estratte in funzioni riusabili così la vista
    // "Tutti" può interlacciarle in un unico elenco ordinato per forza,
    // invece di mostrare sempre prima tutti gli svincolati e poi il mercato
    // a prescindere dalla forza (comportamento precedente, segnalato
    // dall'utente come poco intuitivo).
    const canAffordSwap = playerTeam.budget >= outgoingSeverance;
    // Il candidato ha 2 moduli preferiti (coach.formations, come un allenatore
    // già in carica): il "fit" mostrato qui simula quale dei due sceglierebbe
    // con la ROSA ATTUALE del giocatore (pickActiveFormation su un team
    // fittizio {coach: c, roster: playerTeam.roster}), stessa logica usata a
    // ingaggio avvenuto.
    const candidateActiveFormation = (c) => pickActiveFormation({ coach: c, roster: playerTeam.roster });
    const renderFreeCoachRow = (c, i) => {
      const candFormation = candidateActiveFormation(c);
      const fit = getFormationFitLabel(playerTeam, candFormation);
      return `<div class="mm-row">
        <div class="mm-pinfo">
          <span class="mm-name">${c.firstName} ${c.lastName}</span>
          <span>${c.age}a</span>
          <span>⚡${c.strength}</span>
          <span class="mm-badge" style="cursor:pointer;text-decoration:underline dotted" title="Clicca per vedere i moduli — ${formatFormationRequirements(candFormation)}" data-action="view-coach-formations" data-cand-idx="${i}" data-cand-kind="free">${(c.formations || []).join(' / ')}</span>
          <span style="font-size:.8rem;color:${fit.color};font-weight:600">${fit.text}</span>
          <span class="mm-salary-tag">${icon('briefcase')} ${formatMoneyK(annualSalary(getDisplaySalary(c.strength)))}€/anno</span>
          <span style="font-size:.75rem;color:#15803d">🆓 svincolato</span>
          ${swapNote}
        </div>
        <div class="mm-acts">
          <strong class="mm-price">Gratis</strong>
          ${durationSelectHtml('data-dur-hire', i)}
          <button class="mm-btn mm-blue" data-action="hire-coach" data-cand-idx="${i}" ${canAffordSwap ? '' : 'disabled'}>Ingaggia</button>
        </div></div>`;
    };
    const renderMarketCoachRow = ({ coach: c, fromTeam }, i) => {
      const candFormation = candidateActiveFormation(c);
      const fit = getFormationFitLabel(playerTeam, candFormation);
      const price = getCoachTransferValue(c);
      const totalCost = price + outgoingSeverance;
      const canAfford = playerTeam.budget >= totalCost;
      return `<div class="mm-row">
        <div class="mm-pinfo">
          <span class="mm-name">${c.firstName} ${c.lastName}</span>
          <span>${c.age}a</span>
          <span>⚡${c.strength}</span>
          <span class="mm-badge" style="cursor:pointer;text-decoration:underline dotted" title="Clicca per vedere i moduli — ${formatFormationRequirements(candFormation)}" data-action="view-coach-formations" data-cand-idx="${i}" data-cand-kind="market">${(c.formations || []).join(' / ')}</span>
          <span style="font-size:.8rem;color:${fit.color};font-weight:600">${fit.text}</span>
          <span class="mm-salary-tag">${icon('briefcase')} ${formatMoneyK(annualSalary(getDisplaySalary(c.strength)))}€/anno</span>
          <span class="mm-from-tag">da ${fromTeam.name}</span>
          ${swapNote}
        </div>
        <div class="mm-acts">
          <strong class="mm-price">${price.toFixed(1)}M€</strong>
          ${durationSelectHtml('data-dur-buy-coach', i)}
          <button class="mm-btn mm-blue" data-action="buy-coach" data-cand-idx="${i}" ${canAfford ? '' : 'disabled'}>${canAfford ? 'Acquista' : 'Fondi insuff.'}</button>
        </div></div>`;
    };

    const coachCap = leagueStrCap(playerTeam.leagueLevel);
    coachCandidates = [...freeCoaches].filter(c => c.strength <= coachCap).sort((a, b) => b.strength - a.strength).slice(0, 25);
    const coachBuyCap = leagueStrCap(playerTeam.leagueLevel);
    coachBuyCandidates = [...serieA, ...serieB, ...serieC]
      .filter(t => t !== playerTeam && t.coach && t.coach.strength <= coachBuyCap)
      .map(t => ({ coach: t.coach, fromTeam: t }))
      .sort((a, b) => b.coach.strength - a.coach.strength)
      .slice(0, 25);

    if (coachAvail === 'all') {
      // "🌱 Promuovi un emergente" resta un'offerta speciale sempre in cima,
      // a parte: la sua forza è sconosciuta finché non lo si ingaggia, quindi
      // non ha senso inserirlo nell'ordinamento per forza degli altri.
      html += `<div class="mm-row">
        <div class="mm-pinfo"><span class="mm-name">🌱 Promuovi un emergente</span><span style="font-size:.8rem;color:#666">Un allenatore sconosciuto, gratis${swapNote}</span></div>
        <div class="mm-acts">${durationSelectHtml('data-dur-emerging', 'x')}<button class="mm-btn mm-blue" data-action="hire-emerging" ${playerTeam.budget < outgoingSeverance ? 'disabled' : ''}>Ingaggia</button></div></div>`;

      const merged = [
        ...coachCandidates.map((c, i) => ({ strength: c.strength, row: renderFreeCoachRow(c, i) })),
        ...coachBuyCandidates.map((cand, i) => ({ strength: cand.coach.strength, row: renderMarketCoachRow(cand, i) })),
      ].sort((a, b) => b.strength - a.strength);
      if (!merged.length) {
        html += '<p class="mm-empty">Nessun allenatore disponibile al momento.</p>';
      } else {
        html += merged.map(m => m.row).join('');
      }
    } else if (showFree) {
      html += `<div class="mm-section-title">🆓 Svincolati</div>`;
      html += `<div class="mm-row">
        <div class="mm-pinfo"><span class="mm-name">🌱 Promuovi un emergente</span><span style="font-size:.8rem;color:#666">Un allenatore sconosciuto, gratis${swapNote}</span></div>
        <div class="mm-acts">${durationSelectHtml('data-dur-emerging', 'x')}<button class="mm-btn mm-blue" data-action="hire-emerging" ${playerTeam.budget < outgoingSeverance ? 'disabled' : ''}>Ingaggia</button></div></div>`;
      if (!coachCandidates.length) {
        html += '<p class="mm-empty">Nessun altro allenatore libero sul mercato al momento.</p>';
      } else {
        html += coachCandidates.map(renderFreeCoachRow).join('');
      }
    } else if (showMarket) {
      html += `<div class="mm-section-title">🛒 Sul mercato <span style="font-weight:400;color:#666;font-size:.78rem">(sotto contratto altrove)</span></div>`;
      if (!coachBuyCandidates.length) {
        html += '<p class="mm-empty">Nessun allenatore acquistabile al momento.</p>';
      } else {
        html += coachBuyCandidates.map(renderMarketCoachRow).join('');
      }
    }
    return html;
  };

  // Tab "Moduli": stesso contenuto della schermata Allenatore (showCoachDetailScreen),
  // qui incorporato come tab del mercato invece che in un overlay a parte —
  // formazione tipo (ignoreForma: infortunati/squalificati/fuori forma restano
  // candidati validi, non è la formazione che scenderà davvero in campo alla
  // prossima giornata) coi 2 moduli preferiti selezionabili.
  const buildModuliTab = () => {
    const coach = playerTeam.coach;
    if (!coach) return '<p class="mm-empty">Nessun allenatore in carica: scegline uno dalla tab Panchina per vedere moduli e formazione tipo.</p>';
    const activeFormation = pickActiveFormation(playerTeam);
    const preferredFormations = coach.formations?.length ? [...new Set(coach.formations)] : [activeFormation];
    if (!moduliFormation || !preferredFormations.includes(moduliFormation)) moduliFormation = activeFormation;
    const best11 = getBest11(playerTeam.roster, moduliFormation, { ignoreForma: true });
    const positioned = computePitchPositions(best11);
    const formationBtn = (name) => `<button type="button" class="mm-seg${moduliFormation === name ? ' active' : ''}" data-moduli-formation="${name}">${name}${name === activeFormation ? ` ${icon('star')}` : ''}</button>`;
    const viewBtn = (val, label) => `<button type="button" class="mm-seg${moduliView === val ? ' active' : ''}" data-moduli-view="${val}">${label}</button>`;
    let body;
    if (moduliView === 'modulo') {
      body = buildCoachScreenPitchHtml(positioned);
    } else if (moduliView === 'best11') {
      body = buildBest11ValuePitchHtml(positioned);
    } else {
      const usedIds = new Set(best11.map(e => e.player.id));
      const reserveRoster = playerTeam.roster.filter(p => !usedIds.has(p.id));
      const reserves = getBest11(reserveRoster, moduliFormation, { ignoreForma: true });
      body = buildTitolariRiserveHtml(best11, reserves);
    }
    return `<div class="moduli-tab-wrap">
      <p style="font-size:.85rem;color:#557;margin:0 2px 10px">Moduli preferiti di <strong>${coach.firstName} ${coach.lastName}</strong>: <strong>${(coach.formations || []).join(' / ') || activeFormation}</strong> — in campo: <strong>${activeFormation}</strong></p>
      ${preferredFormations.length > 1 ? `<div class="mm-seg-group" style="margin-bottom:8px">${preferredFormations.map(formationBtn).join('')}</div>` : ''}
      <div class="mm-seg-group" style="margin-bottom:10px">${viewBtn('modulo', '📐 Modulo')}${viewBtn('best11', '🧮 Migliori 11')}${viewBtn('roster', `${icon('cycle')} Titolari/Riserve`)}</div>
      <div class="coach-screen-view">${body}</div>
    </div>`;
  };

  const buildPrestitiTab = () => {
    // I tuoi giocatori si mandano in prestito dalla tab Rosa (bottone
    // "Presta" per riga) — questa tab mostra solo i prestiti in ingresso.
    let html = '';
    const incomingCount = getIncomingLoanCount(playerTeam);

    html += `<h4 style="margin:2px 2px 8px;font-size:.9rem;color:#333">📥 Richiedi in prestito <span style="font-weight:400;color:#666">(${incomingCount}/${MAX_INCOMING_LOANS} attivi)</span></h4>`;
    if (incomingCount >= MAX_INCOMING_LOANS) {
      html += `<p class="mm-empty">Hai raggiunto il massimo di ${MAX_INCOMING_LOANS} prestiti in ingresso.</p>`;
      return html;
    }
    html += buildLoanFilterBar(loanFilter);
    const allLoanCandidates = generateIncomingLoanCandidates();
    if (!allLoanCandidates.length) {
      html += '<p class="mm-empty">Nessun giocatore disponibile in prestito al momento.</p>';
      return html;
    }
    loanCandidates = allLoanCandidates.filter(({ player: p }) => matchesFilter(p, loanFilter));
    if (!loanCandidates.length) {
      html += '<p class="mm-empty">Nessun giocatore corrisponde ai filtri selezionati.</p>';
      return html;
    }
    html += `<div class="mm-section-count" style="margin-bottom:6px">${loanCandidates.length} risultat${loanCandidates.length === 1 ? 'o' : 'i'}</div>`;
    html += loanCandidates.map(({ player: p, fromTeam }, i) => {
      const salary = p.contract?.salary ?? getDisplaySalary(p.strength);
      const overCap = !wageCapAllows(playerTeam, salary);
      const locked = hasUnresolvedOffers();
      const disabledLoanIn = overCap || locked;
      const loanInLabel = locked ? 'Rispondi prima alle offerte' : overCap ? `${icon('banned')} Monte ingaggi` : 'Richiedi';
      return `<div class="mm-row">
      <div class="mm-pinfo">${formatNationality(p)}<span class="mm-name">${p.firstName} ${p.lastName}</span>${formatRoleBadges(p)}<span style="font-size:.78rem;color:#666">${formatSubRoles(p)}</span><span>${p.age}a</span><span>⚡${p.strength}</span><span class="mm-salary-tag">${icon('briefcase')} ${formatMoneyK(annualSalary(salary))}€/anno</span><span class="mm-from-tag">da ${fromTeam.name}</span></div>
      <div class="mm-acts"><strong class="mm-price">Gratis</strong><button class="mm-btn mm-blue" data-action="loan-in" data-cand-idx="${i}" ${disabledLoanIn ? 'disabled' : ''}>${loanInLabel}</button></div></div>`;
    }).join('');
    return html;
  };

  // §1a-bis REGOLE_CALCIOMERCATO: pool pre-filtrato per consenso (calcolato
  // una volta a sessione, mmSessionPreContractConsent) — mostra solo chi
  // accetterebbe un tuo precontratto, nessun tentativo che fallisce.
  const buildPreContrattiTab = () => {
    let html = '';
    if (pendingPreContracts.some(pc => pc.toTeam === playerTeam)) {
      html += `<h4 style="margin:2px 2px 8px;font-size:.9rem;color:#333">${icon('check')} Firmati</h4>`;
      pendingPreContracts.filter(pc => pc.toTeam === playerTeam).forEach(pc => {
        html += `<div class="mm-row mm-done">${icon('check')} <strong>${pc.player.firstName} ${pc.player.lastName}</strong> (da ${pc.fromTeam.name}) — arriverà la prossima stagione, ${pc.signedDuration} anni, ${formatMoneyK(annualSalary(pc.signedSalary))}€/anno</div>`;
      });
    }
    if (!canPlayerSignMore(playerTeam)) {
      html += `<p class="mm-empty">${icon('banned')} Numero giocatori massimo rosa raggiunto.</p>`;
      return html;
    }
    html += buildLoanFilterBar(preContractFilter);
    const pool = getPreContractPool(playerTeam).filter(({ player: p }) => {
      if (!mmSessionPreContractConsent.has(p.id)) {
        mmSessionPreContractConsent.set(p.id, Math.random() < estimatePlayerJoinChance(p, playerTeam));
      }
      return mmSessionPreContractConsent.get(p.id);
    });
    // Stessi filtri di Acquisti/Prestiti (ruolo/posizione/età/forza) e stesso
    // ordinamento per forza decrescente — non l'ordine di iterazione grezzo
    // delle rose (getPreContractPool).
    preContractCandidates = pool
      .filter(({ player: p }) => matchesFilter(p, preContractFilter))
      .sort((a, b) => b.player.strength - a.player.strength);
    if (!preContractCandidates.length) {
      html += `<p class="mm-empty">${pool.length ? 'Nessun giocatore corrisponde ai filtri selezionati.' : 'Nessun giocatore in ultimo anno di contratto disposto a firmare con te al momento.'}</p>`;
      return html;
    }
    html += `<h4 style="margin:10px 2px 8px;font-size:.9rem;color:#333">📝 Disponibili <span style="font-weight:400;color:#666">(ultimo anno di contratto altrove)</span></h4>`;
    html += preContractCandidates.map(({ player: p, fromTeam }, i) => {
      const salary = p.contract?.salary ?? getDisplaySalary(p.strength);
      const canAdd = canTeamAcquirePlayer(playerTeam, p);
      const overCap = !preContractWageBillAllows(playerTeam, salary);
      const disabled = !canAdd || overCap;
      const label = !canAdd ? `${icon('banned')} Tetto stranieri` : overCap ? `${icon('banned')} Monte ingaggi` : 'Firma Pre-contratto';
      return `<div class="mm-row">
      <div class="mm-pinfo">${formatNationality(p)}<span class="mm-name">${p.firstName} ${p.lastName}</span>${formatRoleBadges(p)}<span style="font-size:.78rem;color:#666">${formatSubRoles(p)}</span><span>${p.age}a</span><span>⚡${p.strength}</span><span class="mm-salary-tag">${icon('briefcase')} ${formatMoneyK(annualSalary(salary))}€/anno</span><span class="mm-from-tag">da ${fromTeam.name}</span></div>
      <div class="mm-acts"><strong class="mm-price">Gratis (pross. stagione)</strong><button class="mm-btn mm-green" data-action="precontract" data-cand-idx="${i}" ${disabled ? 'disabled' : ''}>${label}</button></div></div>`;
    }).join('');
    return html;
  };

  const buildAcquistiTab = () => {
    // Finché c'è un'offerta ricevuta da decidere, niente nuovi acquisti —
    // il player deve prima rispondere (tab Offerte ricevute).
    const acquistiLocked = hasUnresolvedOffers();
    // Talenti stranieri scovati dall'area scout (solo Serie A) — candidati
    // per la nuova sezione "🌍 Area Scout" dei filtri (indipendente dal filtro
    // attivo, serve solo a decidere se mostrare il segmento).
    const allForeignTargets = pendingForeignScoutTargets
      .map((t, idx) => ({ t, idx }))
      .filter(({ t }) => canPlayerSignMore(playerTeam));

    let html = buildFilterBar(filter, allForeignTargets.length > 0);
    if (!canPlayerSignMore(playerTeam)) {
      html += `<p class="mm-empty">${icon('banned')} Numero giocatori massimo rosa raggiunto.</p>`;
      return html;
    }
    const avail = filter.availability || 'all';
    const foreignTargets = allForeignTargets.filter(({ t }) => matchesFilter(t, filter) && matchesPriceFilter(t.cost, filter));

    // ── Mercato + Svincolati ───────────────────────────────────────────────
    // "Sul mercato" (vista Mercato) = SOLO i giocatori realmente messi in vendita
    // dalle squadre (pendingTransferMarket, curato dalle trattative AI).
    // "Tutti" (vista di default) = TUTTI i giocatori di tutte le altre squadre,
    // acquistabili al loro valore di trasferimento anche se non "in vendita".
    const preContractedIds = new Set(pendingPreContracts.map(pc => pc.player.id));
    // §5: nessun tetto di forza per lega — solo consenso a fasce (chi
    // rifiuterebbe non compare proprio in lista, mai un tentativo che fallisce).
    const eligible = item => !boughtIds.has(item.player.id) && !soldIds.has(item.player.id) && !preContractedIds.has(item.player.id) && !isSessionLocked(item.player) && playerAcceptsHumanTeam(item.player) && canPlayerSignMore(playerTeam) && canTeamAcquirePlayer(playerTeam, item.player) && matchesFilter(item.player, filter) && matchesPriceFilter(item.askingPrice, filter);
    const marketOnlyItems = pendingTransferMarket.filter(eligible);
    // Un giocatore già "Sul mercato" ha un prezzo REALE fissato quando è
    // stato messo in vendita — "Tutti i giocatori" deve mostrare lo stesso
    // prezzo per lui, non ricalcolarlo al volo dal solo valore di trasferimento.
    const marketPriceById = new Map(pendingTransferMarket.map(item => [item.player.id, item.askingPrice]));
    const allClubItems = [...serieA, ...serieB, ...serieC]
      .filter(t => t !== playerTeam)
      .flatMap(t => t.roster.map(p => ({ player: p, fromTeam: t, askingPrice: marketPriceById.get(p.id) ?? getTransferValue(p) })))
      .filter(eligible);
    const mktItems = avail === 'scout' ? [] : (avail === 'market' ? marketOnlyItems : allClubItems)
      .sort((a, b) => b.player.strength - a.player.strength);
    const mktSectionTitle = avail === 'market' ? '🛒 Sul mercato' : '👥 Tutti i giocatori';
    const faItems = avail === 'scout' ? [] : freeAgents
      .filter(p => !boughtIds.has(p.id) && !preContractedIds.has(p.id) && !isSessionLocked(p) && playerAcceptsHumanTeam(p) && canPlayerSignMore(playerTeam) && canTeamAcquirePlayer(playerTeam, p) && matchesFilter(p, filter) && matchesPriceFilter(0, filter))
      .sort((a, b) => b.strength - a.strength)
      .slice(0, 40);

    if (!mktItems.length && !faItems.length && !foreignTargets.length) {
      html += '<p class="mm-empty">Nessun giocatore corrisponde ai filtri selezionati.</p>';
      return html;
    }

    if (avail === 'scout' && foreignTargets.length > 0) {
      const atCap = !canBuyForeignPlayer(playerTeam);
      html += `<div class="mm-section-title">🌍 Area Scout <span class="mm-section-count">${foreignTargets.length}</span></div>`;
      if (atCap) {
        html += `<p class="mm-empty">Hai già ${FOREIGN_ROSTER_CAP} stranieri in rosa: hai raggiunto il tetto massimo per la Serie A.</p>`;
      }
      foreignTargets.forEach(({ t, idx }) => {
        const canAfford = playerTeam.budget >= t.cost;
        const overCap = !wageCapAllows(playerTeam, t.salary);
        const label = acquistiLocked ? 'Rispondi prima alle offerte' : atCap ? `${icon('banned')} Tetto stranieri` : overCap ? `${icon('banned')} Monte ingaggi` : canAfford ? 'Acquista' : 'Fondi insuff.';
        html += `<div class="mm-row">
          <div class="mm-pinfo">
            ${formatNationality(t)}<span class="mm-name">${t.firstName} ${t.lastName}</span>
            ${formatRoleBadges(t)}
            <span style="font-size:.78rem;color:#666">${formatSubRoles(t)}</span>
            <span>${t.age}a</span>
            <span>⚡${t.strength}</span>
            <span class="mm-salary-tag">${icon('briefcase')} ${formatMoneyK(annualSalary(t.salary))}€/anno</span>
            <span class="mm-from-tag">da ${t.fromClub}</span>
            <span style="font-size:.72rem;color:#2f6fed;font-weight:600">🏷️ -${Math.round(t.discount * 100)}%</span>
          </div>
          <div class="mm-acts">
            <strong class="mm-price">${t.cost.toFixed(1)}M€</strong>
            <button class="mm-btn mm-blue" data-action="buy-foreign-scout" data-cand-idx="${idx}" ${(canAfford && !overCap && !atCap && !acquistiLocked) ? '' : 'disabled'}>
              ${label}
            </button>
          </div></div>`;
      });
    }

    const showMarket = avail !== 'free' && avail !== 'scout';
    const showFree = avail !== 'market' && avail !== 'scout';
    if (showMarket && mktItems.length > 0) {
      html += `<div class="mm-section-title">${mktSectionTitle} <span class="mm-section-count">${mktItems.length}</span></div>`;
      mktItems.forEach(item => {
        const { player: p, fromTeam, askingPrice } = item;
        const canAfford = playerTeam.budget >= askingPrice;
        const salary = p.contract?.salary ?? getDisplaySalary(p.strength);
        const overCap = !wageCapAllows(playerTeam, salary);
        const label = acquistiLocked ? 'Rispondi prima alle offerte' : overCap ? `${icon('banned')} Monte ingaggi` : canAfford ? 'Acquista' : 'Fondi insuff.';
        html += `<div class="mm-row">
          <div class="mm-pinfo">${formatNationality(p)}<span class="mm-name">${p.firstName} ${p.lastName}</span>${formatRoleBadges(p)}<span style="font-size:.78rem;color:#666">${formatSubRoles(p)}</span><span>${p.age}a</span><span>⚡${p.strength}</span><span class="mm-salary-tag">${icon('briefcase')} ${formatMoneyK(annualSalary(salary))}€/anno</span><span class="mm-from-tag">da ${fromTeam.name}</span></div>
          <div class="mm-acts">
            <strong class="mm-price">${askingPrice.toFixed(1)}M€</strong>
            <button class="mm-btn mm-blue" data-action="buy-market" data-pid="${p.id}" ${(canAfford && !overCap && !acquistiLocked) ? '' : 'disabled'}>
              ${label}
            </button>
          </div></div>`;
      });
    }
    if (showFree && faItems.length > 0) {
      html += `<div class="mm-section-title">🆓 Svincolati <span class="mm-section-count">${faItems.length}</span></div>`;
      faItems.forEach(p => {
        const salary = getDisplaySalary(p.strength); // firmando ex-novo, lo stipendio è quello di mercato attuale
        const overCap = !wageCapAllows(playerTeam, salary);
        const faDisabled = overCap || acquistiLocked;
        const faLabel = acquistiLocked ? 'Rispondi prima alle offerte' : overCap ? `${icon('banned')} Monte ingaggi` : 'Firma';
        html += `<div class="mm-row">
          <div class="mm-pinfo">${formatNationality(p)}<span class="mm-name">${p.firstName} ${p.lastName}</span>${formatRoleBadges(p)}<span style="font-size:.78rem;color:#666">${formatSubRoles(p)}</span><span>${p.age}a</span><span>⚡${p.strength}</span><span class="mm-salary-tag">${icon('briefcase')} ${formatMoneyK(annualSalary(salary))}€/anno</span><span class="mm-free-tag">Svincolato</span></div>
          <div class="mm-acts">
            <strong class="mm-price">Gratis</strong>
            ${faDisabled ? '' : durationSelectHtml('data-dur-sign', p.id)}
            <button class="mm-btn mm-blue" data-action="buy-fa" data-pid="${p.id}" ${faDisabled ? 'disabled' : ''}>${faLabel}</button>
          </div></div>`;
      });
    }
    if (!(showMarket && mktItems.length > 0) && !(showFree && faItems.length > 0) && !(avail === 'scout' && foreignTargets.length > 0)) {
      html += '<p class="mm-empty">Nessun giocatore in questa vista.</p>';
    }
    return html;
  };

  const pendingCount = () => pendingRenewals.filter(p => !renewalDecisions.has(p.id)).length
    + pendingAIOffers.filter(o => !offerDecisions.has(o.player.id)).length;

  // Tab "Notizie" dentro la finestra di mercato: stessi dati/helper della
  // Gazzetta del Pallone (e dello stesso pannello embedded nella finestra
  // "Calciomercato in corso"), qui come stringa HTML dato che questa finestra
  // ricrea .mm-content da zero ad ogni render invece di aggiornare nodi fissi.
  // Riusa marketNewsState (stesso stato del pannello nella finestra bloccante)
  // così la lega/categoria selezionata resta coerente tra le due viste.
  const buildNotizieTab = () => {
    const feed = buildNewsFeed();
    const leagueTabsHtml = ['A', 'B', 'C'].map(l => {
      const n = feed.filter(x => x.leagues.includes(l)).length;
      return `<div class="news-league-tab${marketNewsState.league === l ? ' active' : ''}" data-league="${l}">SERIE ${l}<span class="news-count">${n} ${n === 1 ? 'notizia' : 'notizie'}</span></div>`;
    }).join('');
    const catCounts = {};
    NEWS_CATEGORIES.forEach(c => { catCounts[c.key] = newsForLeagueAndCat(feed, marketNewsState.league, c.key, marketNewsState.team).length; });
    const catTabsHtml = NEWS_CATEGORIES.map(c =>
      `<div class="news-cat-tab${marketNewsState.cat === c.key ? ' active' : ''}" data-cat="${c.key}">${c.label} <span style="opacity:.7">(${catCounts[c.key]})</span></div>`
    ).join('');
    const items = newsForLeagueAndCat(feed, marketNewsState.league, marketNewsState.cat, marketNewsState.team); // già più recenti prima (buildNewsFeed)
    let articlesHtml;
    if (!items.length) {
      articlesHtml = `<div class="news-empty">Nessuna notizia in questa categoria${marketNewsState.team ? ` per ${marketNewsState.team}` : ` per Serie ${marketNewsState.league}`}.</div>`;
    } else {
      const featured = [...items].sort((a, b) => b.cost - a.cost).slice(0, 3);
      const catLabel = (NEWS_CATEGORIES.find(c => c.key === marketNewsState.cat) || {}).label || '';
      articlesHtml = featured.map(n => newsArticleHtml(n, marketNewsState.league)).join('')
        + `<div class="news-roundup"><h4>TUTTI I MOVIMENTI — ${catLabel}</h4>${newsRoundupHtml(items, marketNewsState.league)}</div>`;
    }
    return `<div class="news-body mm-news-embedded">
      <div class="news-league-tabs">${leagueTabsHtml}</div>
      <div class="news-cat-tabs">${catTabsHtml}</div>
      <div class="news-team-filter-wrap">${buildNewsTeamFilterHtml(marketNewsState)}</div>
      <div class="news-articles">${articlesHtml}</div>
    </div>`;
  };

  const render = (resetScroll) => {
    const tabContent = activeTab === 'notizie' ? buildNotizieTab()
      : activeTab === 'rinnovi' ? buildRennoviTab()
      : activeTab === 'offerte' ? buildOfferteTab()
        : activeTab === 'acquisti' ? buildAcquistiTab()
          : activeTab === 'prestiti' ? buildPrestitiTab()
            : activeTab === 'precontratti' ? buildPreContrattiTab()
              : activeTab === 'panchina' ? buildPanchinaTab()
                : activeTab === 'moduli' ? buildModuliTab()
                  : buildRosaTab();

    const renewPending = pendingRenewals.filter(p => !renewalDecisions.has(p.id)).length;
    const offerPending = pendingAIOffers.filter(o => !offerDecisions.has(o.player.id)).length;
    const needsCoach = !playerTeam.coach || (playerTeam.coach.contract?.duration || 0) <= 0;
    const rosterCount = getEffectiveRosterCount(playerTeam);
    const belowMinRoster = rosterCount < PLAYER_ROSTER_MIN_TO_PROCEED;
    // Mantiene la posizione di scorrimento della lista tra un'azione e l'altra
    // (es. "Rinnova"): overlay.innerHTML ricrea .mm-content da zero ad ogni
    // render, altrimenti la vista tornerebbe sempre in cima. Si azzera solo
    // quando si cambia tab esplicitamente (resetScroll=true).
    const prevScrollTop = resetScroll ? 0 : (overlay.querySelector('.mm-content')?.scrollTop || 0);

    // Modalità gate rinnovi (pre-scheduler, bloccante): tutte le tab restano
    // VISIBILI (per contesto: notizie, rosa, offerte già arrivate...) ma non
    // interagibili — solo la tab Rinnovi resta viva (guardia sulle azioni
    // più sotto, vedi `if (renewalGate && !['renew','release','decline-renew']...)`.
    // Footer sostituito da un unico pulsante "Vai al mercato →", disabilitato
    // finché ogni giocatore della lista non ha una decisione.
    const tabsHtml = `<div class="mm-tabs">
          <button class="mm-tab${activeTab === 'notizie' ? ' active' : ''}" data-tab="notizie">Notizie</button>
          <button class="mm-tab${activeTab === 'rinnovi' ? ' active' : ''}" data-tab="rinnovi">
            Rinnovi ${renewPending > 0 ? `<span class="mm-badge-count">${renewPending}</span>` : ''}
          </button>
          <button class="mm-tab${activeTab === 'offerte' ? ' active' : ''}" data-tab="offerte">
            Offerte ricevute ${offerPending > 0 ? `<span class="mm-badge-count">${offerPending}</span>` : ''}
          </button>
          <button class="mm-tab${activeTab === 'acquisti' ? ' active' : ''}" data-tab="acquisti">Acquisti${pendingForeignScoutTargets.length > 0 ? ` <span class="mm-badge-count" style="background:#f59e0b">${pendingForeignScoutTargets.length}</span>` : ''}</button>
          <button class="mm-tab${activeTab === 'prestiti' ? ' active' : ''}" data-tab="prestiti">
            Prestiti <span class="mm-badge-count" style="background:#64748b">${getIncomingLoanCount(playerTeam)}/${MAX_INCOMING_LOANS}</span>
          </button>
          ${currentMarketIsWinter ? `<button class="mm-tab${activeTab === 'precontratti' ? ' active' : ''}" data-tab="precontratti">Precontratti</button>` : ''}
          <button class="mm-tab${activeTab === 'panchina' ? ' active' : ''}" data-tab="panchina">
            Panchina ${needsCoach ? '<span class="mm-badge-count" style="background:#ef4444">!</span>' : ''}
          </button>
          <button class="mm-tab${activeTab === 'moduli' ? ' active' : ''}" data-tab="moduli">Moduli</button>
          <button class="mm-tab${activeTab === 'rosa' ? ' active' : ''}" data-tab="rosa">Rosa (${(() => {
        const leaving = new Set(pendingRenewals.filter(p => !renewalDecisions.has(p.id)).map(p => p.id));
        const myPreContracts = pendingPreContracts.filter(pc => !pc.toTeam || pc.toTeam === playerTeam).length;
        return playerTeam.roster.filter(p => !leaving.has(p.id)).length + myPreContracts;
      })()})</button>
        </div>`;

    const renewGateRemaining = renewalGate ? renewalGate.players.filter(p => !renewalDecisions.has(p.id)).length : 0;
    const footerHtml = renewalGate
      ? `<div class="mm-footer">
          <span class="mm-footer-note">${renewGateRemaining > 0 ? `${icon('warning')} ${renewGateRemaining} decisione/i mancante/i` : `${icon('check')} Tutto deciso`}</span>
          <button class="mm-btn mm-confirm" id="rg-confirm" ${renewGateRemaining > 0 ? 'disabled style="opacity:.4;cursor:not-allowed"' : ''}>${renewalGate.winter ? 'Vai al mercato invernale →' : 'Apri il mercato →'}</button>
        </div>`
      : `<div class="mm-footer">
          <span class="mm-footer-note">${offerPending > 0 ? `${icon('warning')} Rispondi prima alle ${offerPending} offerta/e ricevuta/e` : belowMinRoster ? `${icon('warning')} Servono almeno ${PLAYER_ROSTER_MIN_TO_PROCEED} giocatori in rosa per proseguire (attuali: ${rosterCount})` : playerTeam.budget < 0 ? `${icon('warning')} Budget negativo — cedi giocatori dalla tab Rosa` : needsCoach ? `${icon('warning')} Scegli un allenatore dalla tab Panchina` : pendingCount() > 0 ? `${icon('warning')} ${pendingCount()} decisioni in sospeso` : `${icon('check')} Tutto a posto`}</span>
          ${turnCtx ? `<button class="mm-btn" id="mtc-continue" ${offerPending > 0 ? 'disabled style="opacity:.4;cursor:not-allowed"' : ''}>Continua mercato</button>` : ''}
          <button class="mm-btn mm-confirm" id="mm-confirm" ${(playerTeam.budget < 0 || needsCoach || belowMinRoster || offerPending > 0) ? 'disabled style="opacity:.4;cursor:not-allowed"' : ''}>Conferma e Chiudi Mercato →</button>
        </div>`;

    overlay.innerHTML = `
      <div class="mm-box">
        <div class="mm-header">
          <span class="mm-title">🏟️ ${playerTeam.name} — Sessione di Mercato</span>
          <span class="mm-budget">Budget: <strong>${playerTeam.budget.toFixed(1)}M€</strong> &nbsp;|&nbsp; Monte ingaggi: <strong>${formatMoneyK(annualSalary(getTeamWageBill(playerTeam)))}/${Number.isFinite(playerTeam.wageBudgetCap) ? formatMoneyK(annualSalary(playerTeam.wageBudgetCap)) : '—'}</strong>€/anno &nbsp;|&nbsp; Rosa: <strong>${playerTeam.roster.length}</strong></span>
        </div>
        ${turnCtx ? `<p class="mm-hint" style="padding:6px 16px 0">🔄 È il tuo turno nella coda di mercato (come le altre squadre). Fai le operazioni che vuoi, poi <strong>Continua mercato</strong> per proseguire (ti richiamo se ricapita un turno) o <strong>Conferma e Chiudi Mercato</strong> per non essere più interpellato — le altre squadre possono comunque farti offerte nel frattempo, le trovi nella tab Offerte ricevute.</p>` : ''}
        ${buildBudgetSliderHtml(playerTeam)}
        ${tabsHtml}
        <div class="mm-content">${tabContent}</div>
        ${footerHtml}
      </div>`;
    const newContent = overlay.querySelector('.mm-content');
    if (newContent) newContent.scrollTop = prevScrollTop;

    overlay.querySelectorAll('.mm-tab').forEach(btn =>
      btn.addEventListener('click', () => { activeTab = btn.dataset.tab; render(true); })
    );
    if (activeTab === 'notizie') {
      overlay.querySelectorAll('.news-league-tab').forEach(el =>
        el.addEventListener('click', () => { marketNewsState.league = el.dataset.league; marketNewsState.cat = 'calciomercato'; marketNewsState.team = ''; render(true); })
      );
      overlay.querySelectorAll('.news-cat-tab').forEach(el =>
        el.addEventListener('click', () => { marketNewsState.cat = el.dataset.cat; render(true); })
      );
      overlay.querySelector('.news-team-filter')?.addEventListener('change', e => {
        marketNewsState.team = e.target.value;
        render(true);
      });
    }

    wireFilterBar(overlay, activeTab === 'prestiti' ? loanFilter : activeTab === 'precontratti' ? preContractFilter : filter, render);
    wireBudgetSlider(overlay, playerTeam, render);
    overlay.querySelectorAll('[data-coach-avail]').forEach(btn =>
      btn.addEventListener('click', () => { coachAvail = btn.dataset.coachAvail; render(); })
    );
    overlay.querySelectorAll('[data-moduli-view]').forEach(btn =>
      btn.addEventListener('click', () => { moduliView = btn.dataset.moduliView; render(); })
    );
    overlay.querySelectorAll('[data-moduli-formation]').forEach(btn =>
      btn.addEventListener('click', () => { moduliFormation = btn.dataset.moduliFormation; render(); })
    );

    overlay.querySelectorAll('tr[data-player-id]').forEach(tr => {
      tr.addEventListener('click', (e) => {
        if (e.target.closest('[data-action]')) return;
        const p = findPlayerById(+tr.dataset.playerId);
        if (p) openPlayerCard(p);
      });
    });

    // Le azioni di compravendita (buy-market/buy-fa/buy-foreign-scout/
    // loan-out/loan-in/rosa-release) impostano `turnConsumed = true` nel
    // proprio ramo di successo, qui sotto — in modalità turno (turnCtx)
    // questo chiude subito il turno del player, come farebbe una CPU con la
    // sua unica azione a giro. Rinnovi/allenatore/moduli restano SEMPRE
    // liberi (non sono "turno" nemmeno per la CPU). Accettare/rifiutare
    // un'offerta ricevuta NON chiude il turno (vedi action==='accept-offer'/
    // 'refuse-offer' sotto): il player resta nella finestra e può continuare
    // a muoversi tra le tab — solo se accettata, la squadra offerente vede
    // il proprio turno consumato (tramite turnCtx.onOfferResolved).

    overlay.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const { action, pid, offerIdx } = btn.dataset;
        const id = +pid;
        if (action === 'filter-reset') return; // gestito da wireFilterBar
        // Gate rinnovi attivo: ogni tab resta VISIBILE per contesto ma non
        // interagibile — solo le azioni della tab Rinnovi stessa restano
        // vive, tutto il resto (compra/vendi/presta/allenatore/moduli/
        // offerte/precontratti) è inerte finché il gate non si chiude.
        if (renewalGate && !['renew', 'release', 'decline-renew'].includes(action)) return;
        let turnConsumed = false;

        if (action === 'renew') {
          const isWinterGate = renewalGate && renewalGate.winter;
          const renewList = renewalGate ? renewalGate.players : pendingRenewals;
          const p = renewList.find(p => p.id === id);
          if (p) {
            const demanded = getRenewalSalary(p);
            const current = p.contract?.salary || getDisplaySalary(p.strength);
            if (wageCapAllows(playerTeam, demanded, current)) {
              // Stessa formula della CPU (computeRenewalOutcome): il player
              // NON sceglie più la durata né ha la garanzia di accettare —
              // stipendio e durata "concordati col procuratore", con un
              // vero rischio di rifiuto in base a personalità/prestigio/
              // adeguatezza alla squadra, esattamente come per la CPU.
              const outcome = computeRenewalOutcome(p, playerTeam);
              if (outcome === 0) {
                const reason = getRenewalRefusalReason(p);
                transferLog.push(`${icon('clipboard')} <em>${p.firstName} ${p.lastName}</em> rifiuta il rinnovo con <strong>${playerTeam.name}</strong> (${reason})`);
                if (isWinterGate) {
                  // Resta sotto contratto (ancora 1 anno): nessuna azione di
                  // gioco, stesso stato di "Non rinnovare ora" ma con motivo.
                  renewalDecisions.set(id, `refused:${reason}`);
                } else {
                  // Il contratto è già scaduto: se rifiuta l'offerta parte
                  // comunque, come uno svincolo ma per scelta sua.
                  playerTeam.roster = playerTeam.roster.filter(x => x !== p);
                  recordTransfer(p, null, null);
                  freeAgents.push(p);
                  renewalDecisions.set(id, `refused:${reason}`);
                }
              } else {
                if (!p.contract) p.contract = createContract(p.strength, p.age);
                p.contract.salary = demanded;
                p.contract.duration = outcome;
                transferLog.push(`${icon('clipboard')} <em>${p.firstName} ${p.lastName}</em> rinnova con <strong>${playerTeam.name}</strong> — ${p.contract.duration} anni, ${formatMoneyK(annualSalary(demanded))}€/anno`);
                renewalDecisions.set(id, 'renewed');
              }
            }
          }
        } else if (action === 'release') {
          const p = pendingRenewals.find(p => p.id === id);
          if (p) {
            resolveExpiringPlayerDeparture(p);
            renewalDecisions.set(id, 'released');
          }
        } else if (action === 'decline-renew') {
          // Solo gate invernale: nessuna azione di gioco, solo presa d'atto —
          // il giocatore resta sotto contratto, a rischio precontratto CPU.
          renewalDecisions.set(id, 'declined');
        } else if (action === 'accept-offer') {
          const offer = pendingAIOffers.find(o => o.player.id === id);
          // Guardia difensiva: se il giocatore ha già lasciato la rosa per un
          // altro motivo (Vendi/Presta/Svincola dalla tab Rosa), l'offerta
          // dovrebbe già risultare invalidata da invalidatePendingOfferFor —
          // questo controllo evita comunque lo sdoppiamento in caso di
          // percorsi futuri non coperti da quell'invalidazione esplicita.
          if (offer && !offerDecisions.has(id) && playerTeam.roster.includes(offer.player)) {
            const { player: p, buyerTeam, offerPrice } = offer;
            playerTeam.roster = playerTeam.roster.filter(x => x !== p);
            buyerTeam.roster.push(p);
            playerTeam.budget += offerPrice;
            buyerTeam.budget -= offerPrice;
            recalculateTeamStrength(buyerTeam);
            recordTransfer(p, buyerTeam.name, offerPrice);
            transferLog.push(`${icon('money')} <strong>${playerTeam.name}</strong> vende ${p.firstName} ${p.lastName} a <strong>${buyerTeam.name}</strong> per <strong>${offerPrice.toFixed(1)}M€</strong>`);
            offerDecisions.set(id, 'accepted');
            soldIds.add(id);
            lockForSession(p);
            // Non chiude il turno (a differenza di buy-market/buy-fa/ecc.):
            // il player resta nella finestra, può continuare a muoversi tra
            // le tab. Solo l'accettazione conclude davvero la trattativa,
            // quindi SOLO ora il turno della squadra offerente viene
            // consumato (vedi la regola "le trattative occupano un turno di
            // entrambe le squadre solo quando vengono concluse").
            if (turnCtx && turnCtx.onOfferResolved) turnCtx.onOfferResolved(buyerTeam, p, true);
          }
        } else if (action === 'refuse-offer') {
          const refusedOffer = pendingAIOffers.find(o => o.player.id === id);
          offerDecisions.set(id, 'refused');
          // Un'offerta rifiutata NON consuma il turno di nessuno — la squadra
          // offerente potrà riprovare con qualcun altro ai turni successivi.
          if (turnCtx && turnCtx.onOfferResolved && refusedOffer) turnCtx.onOfferResolved(refusedOffer.buyerTeam, refusedOffer.player, false);
        } else if (action === 'buy-fa') {
          const p = freeAgents.find(p => p.id === id);
          const salaryFa = p ? getDisplaySalary(p.strength) : 0;
          if (p && canPlayerSignMore(playerTeam) && canTeamAcquirePlayer(playerTeam, p) && !boughtIds.has(id) && !isSessionLocked(p) && wageCapAllows(playerTeam, salaryFa)) {
            freeAgents.splice(freeAgents.indexOf(p), 1);
            playerTeam.roster.push(p);
            const years = +(overlay.querySelector(`select[data-dur-sign="${id}"]`)?.value) || 3;
            p.contract = createContract(p.strength, p.age);
            p.contract.duration = years;
            recalculateTeamStrength(playerTeam);
            recordTransfer(p, playerTeam.name, 0);
            transferLog.push(`✍️ <strong>${playerTeam.name}</strong> ingaggia ${p.firstName} ${p.lastName} (Forza: ${p.strength}) — contratto ${years} anni`);
            boughtIds.add(id);
            lockForSession(p);
            turnConsumed = true;
          }
        } else if (action === 'buy-market') {
          const p0 = findPlayerById(id);
          const fromTeam0 = p0 ? [...serieA, ...serieB, ...serieC].find(t => t !== playerTeam && t.roster.includes(p0)) : null;
          const item = (p0 && fromTeam0) ? { player: p0, fromTeam: fromTeam0, askingPrice: getTransferValue(p0) } : null;
          const salaryMk = item ? (item.player.contract?.salary ?? getDisplaySalary(item.player.strength)) : 0;
          if (item && playerTeam.budget >= item.askingPrice && canPlayerSignMore(playerTeam) && canTeamAcquirePlayer(playerTeam, item.player) && !boughtIds.has(id) && !isSessionLocked(item.player) && wageCapAllows(playerTeam, salaryMk)) {
            const { player: p, fromTeam, askingPrice } = item;
            fromTeam.roster = fromTeam.roster.filter(x => x !== p);
            playerTeam.roster.push(p);
            playerTeam.budget -= askingPrice;
            fromTeam.budget += askingPrice;
            lockForSession(p);
            recalculateTeamStrength(fromTeam);
            recalculateTeamStrength(playerTeam);
            recordTransfer(p, playerTeam.name, askingPrice);
            transferLog.push(`${icon('cycle')} <strong>${fromTeam.name}</strong> → <strong>${playerTeam.name}</strong>: ${p.firstName} ${p.lastName} per <strong>${askingPrice.toFixed(1)}M€</strong>`);
            boughtIds.add(id);
            turnConsumed = true;
          }
        } else if (action === 'buy-foreign-scout') {
          const candIdx = +btn.dataset.candIdx;
          const t = pendingForeignScoutTargets[candIdx];
          if (t && canPlayerSignMore(playerTeam) && canBuyForeignPlayer(playerTeam) && playerTeam.budget >= t.cost && wageCapAllows(playerTeam, t.salary)) {
            const player = materializeForeignCandidate(t, playerTeam);
            playerTeam.roster.push(player);
            playerTeam.budget -= t.cost;
            recalculateTeamStrength(playerTeam);
            transferLog.push(`${icon('cycle')} <strong>${t.fromClub}</strong> → <strong>${playerTeam.name}</strong>: ${player.firstName} ${player.lastName} (${player.age} anni, Forza: ${player.strength}) per <strong>${t.cost.toFixed(1)}M€</strong>`);
            pendingForeignScoutTargets = pendingForeignScoutTargets.filter((_, i) => i !== candIdx);
            turnConsumed = true;
          }
        } else if (action === 'fire-coach') {
          const coach = playerTeam.coach;
          const severance = coach ? getCoachSeveranceCost(coach) : 0;
          if (coach && playerTeam.budget >= severance) {
            playerTeam.budget -= severance;
            freeCoaches.push(coach);
            playerTeam.coach = null;
            transferLog.push(`${icon('warning')} <strong>${playerTeam.name}</strong> esonera <em>${coach.firstName} ${coach.lastName}</em> — buonuscita: ${severance.toFixed(1)}M€`);
          }
        } else if (action === 'view-coach-formations') {
          const candIdx = +btn.dataset.candIdx;
          const candKind = btn.dataset.candKind;
          const coach = candKind === 'market' ? coachBuyCandidates[candIdx]?.coach : coachCandidates[candIdx];
          if (coach) showCoachFormationsPreview(coach);
        } else if (action === 'hire-coach') {
          const candIdx = +btn.dataset.candIdx;
          const coach = coachCandidates[candIdx];
          if (coach && displaceCurrentCoach()) {
            const idx = freeCoaches.indexOf(coach);
            if (idx >= 0) freeCoaches.splice(idx, 1);
            const years = +(overlay.querySelector(`select[data-dur-hire="${candIdx}"]`)?.value) || 3;
            coach.contract = createCoachContract(coach, years);
            playerTeam.coach = coach;
            transferLog.push(`${icon('check')} <strong>${playerTeam.name}</strong> ingaggia l'allenatore <em>${coach.firstName} ${coach.lastName}</em> (Forza: ${coach.strength}, ${(coach.formations || []).join(' / ')}) — contratto ${years} anni`);
          }
        } else if (action === 'hire-emerging') {
          if (displaceCurrentCoach()) {
            const years = +(overlay.querySelector('select[data-dur-emerging]')?.value) || 3;
            const coach = createCoach(playerTeam);
            coach.contract = createCoachContract(coach, years);
            playerTeam.coach = coach;
            transferLog.push(`🌱 <strong>${playerTeam.name}</strong> promuove un emergente in panchina: <em>${coach.firstName} ${coach.lastName}</em> (Forza: ${coach.strength}, ${(coach.formations || []).join(' / ')}) — contratto ${years} anni`);
          }
        } else if (action === 'buy-coach') {
          const candIdx = +btn.dataset.candIdx;
          const cand = coachBuyCandidates[candIdx];
          if (cand) {
            const price = getCoachTransferValue(cand.coach);
            const outgoing = playerTeam.coach;
            const outgoingExpired = outgoing && (outgoing.contract?.duration || 0) <= 0;
            const severance = (outgoing && !outgoingExpired) ? getCoachSeveranceCost(outgoing) : 0;
            if (playerTeam.budget >= price + severance && displaceCurrentCoach()) {
              const { coach, fromTeam } = cand;
              fromTeam.coach = null;
              playerTeam.budget -= price;
              fromTeam.budget += price;
              const years = +(overlay.querySelector(`select[data-dur-buy-coach="${candIdx}"]`)?.value) || 3;
              coach.contract = createCoachContract(coach, years);
              playerTeam.coach = coach;
              transferLog.push(`🛒 <strong>${playerTeam.name}</strong> acquista l'allenatore <em>${coach.firstName} ${coach.lastName}</em> da <strong>${fromTeam.name}</strong> per <strong>${price.toFixed(1)}M€</strong> (Forza: ${coach.strength}, ${(coach.formations || []).join(' / ')}) — contratto ${years} anni`);

              // Domino di mercato: la squadra appena rimasta senza allenatore
              // ne ingaggia SUBITO uno nuovo (stessa logica di fine stagione
              // in updateTeamStrengths), invece di restare scoperta fino alla
              // prossima stagione. Esclude "outgoing" (l'allenatore appena
              // liberato dal giocatore con displaceCurrentCoach, se presente):
              // un allenatore che ha appena cambiato squadra non può essere
              // ripreso nello stesso istante.
              const replacementIdx = freeCoaches
                .map((c, i) => ({ c, i }))
                .filter(({ c }) => c !== outgoing)
                .sort((a, b) => b.c.strength - a.c.strength)[0]?.i;
              if (replacementIdx !== undefined) {
                const replacement = freeCoaches.splice(replacementIdx, 1)[0];
                replacement.contract = createCoachContract(replacement, 2 + Math.floor(Math.random() * 3));
                fromTeam.coach = replacement;
                transferLog.push(`${icon('check')} <strong>${fromTeam.name}</strong> ingaggia subito <em>${replacement.firstName} ${replacement.lastName}</em> (Forza: ${replacement.strength})`);
              } else {
                fromTeam.coach = createCoach(fromTeam);
                transferLog.push(`${icon('check')} <strong>${fromTeam.name}</strong> promuove subito <em>${fromTeam.coach.firstName} ${fromTeam.coach.lastName}</em> (Forza: ${fromTeam.coach.strength})`);
              }
            }
          }
        } else if (action === 'renew-coach') {
          const coach = playerTeam.coach;
          if (coach && (coach.contract?.duration || 0) <= 0) {
            const years = +(overlay.querySelector('select[data-dur-renew-coach]')?.value) || 3;
            coach.contract = createCoachContract(coach, years);
            transferLog.push(`${icon('document')} <strong>${playerTeam.name}</strong> rinnova l'allenatore <em>${coach.firstName} ${coach.lastName}</em> per ${years} anni`);
          }
        } else if (action === 'release-coach') {
          const coach = playerTeam.coach;
          if (coach && (coach.contract?.duration || 0) <= 0) {
            freeCoaches.push(coach);
            playerTeam.coach = null;
            transferLog.push(`${icon('document')} <em>${coach.firstName} ${coach.lastName}</em> lascia <strong>${playerTeam.name}</strong> a fine contratto`);
          }
        } else if (action === 'loan-out') {
          const p = playerTeam.roster.find(x => x.id === id);
          if (p && loanOutPlayer(p)) turnConsumed = true;
        } else if (action === 'loan-in') {
          const candIdx = +btn.dataset.candIdx;
          const cand = loanCandidates[candIdx];
          const salary = cand ? (cand.player.contract?.salary ?? getDisplaySalary(cand.player.strength)) : 0;
          if (cand && wageCapAllows(playerTeam, salary) && loanInPlayer(cand.player, cand.fromTeam)) turnConsumed = true;
        } else if (action === 'precontract') {
          const candIdx = +btn.dataset.candIdx;
          const cand = preContractCandidates[candIdx];
          const salary = cand ? (cand.player.contract?.salary ?? getDisplaySalary(cand.player.strength)) : 0;
          if (cand && canTeamAcquirePlayer(playerTeam, cand.player) && preContractWageBillAllows(playerTeam, salary)) {
            signPreContract(cand.player, cand.fromTeam, playerTeam);
            turnConsumed = true;
          }
        } else if (action === 'rosa-toggle-renew') {
          rosaRowPanel.set(id, rosaRowPanel.get(id) === 'renew' ? null : 'renew');
        } else if (action === 'rosa-open-sell') {
          const p = playerTeam.roster.find(x => x.id === id);
          if (p) {
            if (!rosaSellOffers.has(id)) rosaSellOffers.set(id, generateSellOffers(p));
            const offers = rosaSellOffers.get(id);
            showOfferPickerModal(
              `${icon('money')} Proposte di acquisto — ${p.firstName} ${p.lastName}`,
              offers,
              renderSellOfferRow,
              (idx) => {
                if (idx >= 0) {
                  executeSellOffer(p, offers[idx]); rosaSellOffers.delete(id); invalidatePendingOfferFor(id); soldIds.add(id);
                  if (turnCtx) { overlay.remove(); turnCtx.onTurnConsumed(); return; }
                }
                render();
              }
            );
          }
        } else if (action === 'rosa-open-loan') {
          const p = playerTeam.roster.find(x => x.id === id);
          if (p) {
            if (!rosaLoanOffers.has(id)) rosaLoanOffers.set(id, generateLoanOutOffers(p));
            const offers = rosaLoanOffers.get(id);
            showOfferPickerModal(
              `${icon('cycle')} Proposte di prestito — ${p.firstName} ${p.lastName}`,
              offers,
              (o, i) => `<div class="mm-row"><div class="mm-pinfo"><span class="mm-name">${o.team.name}</span><span style="font-size:.8rem;color:#666">(Serie ${o.team.leagueLevel})</span></div><div class="mm-acts"><button class="mm-btn mm-blue" data-offer-idx="${i}">Presta</button></div></div>`,
              (idx) => {
                if (idx >= 0 && canLoanOutPlayer(playerTeam, p)) {
                  executeLoanOutTo(p, offers[idx].team); rosaLoanOffers.delete(id); invalidatePendingOfferFor(id);
                  if (turnCtx) { overlay.remove(); turnCtx.onTurnConsumed(); return; }
                }
                render();
              }
            );
          }
        } else if (action === 'rosa-confirm-renew') {
          const p = playerTeam.roster.find(x => x.id === id);
          if (p) {
            const outcome = executeAnytimeRenew(p);
            if (outcome.success) {
              rosaRowPanel.delete(id);
              rosaRenewRefusals.delete(id);
              // Se il giocatore era anche tra i contratti in scadenza (tab
              // Rinnovi), il rinnovo fatto da qui deve farlo sparire anche da
              // lì — altrimenti resterebbe mostrato come "ancora da decidere".
              if (pendingRenewals.some(r => r.id === id)) renewalDecisions.set(id, 'renewed');
            } else if (outcome.refused) {
              // Il pannello resta aperto: mostra il motivo, il DS può riprovare.
              rosaRenewRefusals.set(id, outcome.reason);
            }
          }
        } else if (action === 'rosa-release') {
          const p = playerTeam.roster.find(x => x.id === id);
          if (p && executeEarlyRelease(p)) {
            rosaRowPanel.delete(id);
            if (pendingRenewals.some(r => r.id === id)) renewalDecisions.set(id, 'released');
            invalidatePendingOfferFor(id);
            turnConsumed = true;
          }
        }

        // In modalità turno, un'azione di mercato vera (compra/vendi/presta/
        // svincola/accetta offerta) chiude subito il turno del player — non
        // deve poter fare più cose nello stesso turno (rinnovi/allenatore/
        // moduli restano invece sempre liberi, non sono "turno di mercato").
        if (turnCtx && turnConsumed) {
          overlay.remove();
          turnCtx.onTurnConsumed();
          return;
        }
        render();
      });
    });

    if (renewalGate) {
      const gateConfirmBtn = overlay.querySelector('#rg-confirm');
      if (gateConfirmBtn && !gateConfirmBtn.disabled) {
        gateConfirmBtn.addEventListener('click', () => {
          overlay.remove();
          if (!renewalGate.winter) pendingRenewals = [];
          recalculateTeamStrength(playerTeam);
          renewalGate.onGateDone();
        });
      }
      return;
    }

    overlay.querySelector('#mm-confirm').addEventListener('click', () => {
      // Giocatori in scadenza non decisi → parametro zero automatico (o
      // firma diretta con la squadra interessata, vedi resolveExpiringPlayerDeparture)
      pendingRenewals.forEach(p => {
        if (!renewalDecisions.has(p.id)) resolveExpiringPlayerDeparture(p);
      });
      overlay.remove();
      onConfirm();
    });

    // "Continua mercato" (solo in modalità turno, vedi turnCtx): chiude
    // questa apertura SENZA forzare le decisioni sui rinnovi in scadenza —
    // a differenza di "Conferma e Chiudi Mercato" non è una chiusura
    // definitiva, la finestra si ripresenterà al prossimo turno reale.
    const continueBtn = overlay.querySelector('#mtc-continue');
    if (continueBtn) {
      continueBtn.addEventListener('click', () => {
        overlay.remove();
        turnCtx.onContinue();
      });
    }
  };

  render();
  document.body.appendChild(overlay);
}
