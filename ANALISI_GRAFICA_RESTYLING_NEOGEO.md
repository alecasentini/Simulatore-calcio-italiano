# Simulatore Calcio Italiano — Analisi per Restyling Grafico "Neo-Geo / Anni 90"

Documento preparato per il grafico incaricato del restyling visivo completo dell'app. Obiettivo: trasformare l'aspetto attuale (UI flat/moderna, stile "SaaS 2020") in uno stile **arcade anni '90 / Neo-Geo pixel art**, mantenendo intatta la logica funzionale.

> **⚠️ UNICA ECCEZIONE — NON MODIFICARE**: i loghi delle squadre in `assets/loghi/` e `assets/loghi/pixel/`. Sono già in stile pixel-art Neo-Geo (generati con una pipeline dedicata) e vanno mantenuti come sono, in tutte le schermate in cui compaiono.

---

## 0. Cos'è il progetto

App web **single-page**, gira anche offline aprendo `index.html` direttamente (nessun server, nessun build step). Tre soli file sorgente:

- `index.html` — quasi vuoto, solo lo scheletro
- `assets/css/style.css` — tutti gli stili (2032 righe)
- `assets/js/main.js` — tutta la logica **e** tutta l'interfaccia (8280 righe): ogni schermata è generata a runtime da JavaScript (stringhe HTML iniettate), non esistono altre pagine `.html`

Non è un framework moderno (no React/Vue): è HTML/CSS/JS "vecchio stile", il che in realtà è un bene per un restyling — non serve toccare componenti React, bastano CSS e i template di markup nel JS.

Esiste già una cartella `Simulatore Calcio Italiano Design System/` nel repo (README, token CSS, pagine di preview). È materiale di riferimento da una versione precedente del gioco (quando `main.js` era 1/3 delle dimensioni attuali) — **utile come ispirazione di processo, ma non affidabile come stato attuale**: i colori e i componenti reali sono quelli descritti in questo documento, letti dal codice oggi.

---

## 1. Le "schermate" dell'app — elenco completo

Non essendoci pagine separate, per "schermata" si intende ogni overlay/finestra/sezione che l'utente vede aprirsi durante il gioco. Sono circa **27**, divise in 3 categorie.

### 1.1 Schermate a tutto schermo

| Schermata | Quando si apre | Contenuto |
|---|---|---|
| **Selezione carriera / Selezione squadra** | All'avvio del gioco | Sfondo blu navy pieno schermo. 3 step: scelta modalità carriera (4 grandi bottoni), form nome Direttore Sportivo, griglia a 3 colonne (Serie A/B/C) con tutte le squadre cliccabili (logo + nome) |
| **Dettaglio partita** ("box score" live) | Click su una partita in calendario | Header con loghi squadra e punteggio grande al centro, due colonne formazioni titolari con badge ruolo colorato, cronaca eventi (gol/cartellini) minuto per minuto |
| **Mercato invernale** | A metà stagione | Finestra con tab: Rinnovi, Offerte ricevute, Acquisti, Prestiti, Pre-contratti, Moduli, Rosa |
| **Mercato manageriale estivo** | A fine stagione | Come sopra + tab "Panchina" (mercato allenatori/DS) — è la schermata più grande e complessa del gioco |

### 1.2 Finestre/modali (overlay centrato più piccolo)

| Schermata | Quando si apre | Contenuto |
|---|---|---|
| **Briefing del Presidente** | Inizio stagione | Budget, monte ingaggi, obiettivo stagionale comunicato dal presidente |
| **Nota formazione stagionale** | Prima del mercato | Promemoria modulo tattico corrente |
| **Scheda squadra** (Palmarès) | Click su nome squadra | Logo grande, titoli vinti, storico permanenza nelle leghe, staff tecnico, tab Rosa/Statistiche |
| **Schermata Allenatore** (campo tattico) | Da scheda squadra → "Vedi formazione" | **Campo da calcio disegnato** con 11 giocatori come pallini colorati posizionati secondo il modulo — 3 viste: Modulo, Migliori 11, Titolari/Riserve |
| **Anteprima moduli allenatore** | Selezione allenatore dal mercato | Schema modulo generico dell'allenatore |
| **Database** | Link "Database" in alto | Ricerca/filtri su tutti i giocatori, allenatori, DS del gioco |
| **Scheda giocatore** | Click su un nome giocatore ovunque | Bandiera, nome, ruolo, statistiche, contratto, **barre di personalità** (ambizione/fedeltà/avidità), storico stagioni e trasferimenti |
| **Scheda staff** | Click su nome allenatore/DS | Analoga alla scheda giocatore, storico piazzamenti |
| **Offerte di lavoro (carriera DS)** | Inizio carriera senza squadra | Lista di club che offrono un contratto |
| **Sondaggio di mercato (DS)** | Su richiesta durante la carriera | Mercato del lavoro per DS |
| **Valutazione di fine stagione (DS)** | Fine stagione | Esito, eventuale esonero/rinnovo, corteggiamenti da altri club |
| **Carriera DS** | Click sul badge squadra | Storico stagioni e piazzamenti del DS |
| **Selettore offerte** | Su una trattativa con più offerte | Lista comparativa di offerte |

### 1.3 Sezioni inline (nel flusso della pagina, non overlay)

| Schermata | Contenuto |
|---|---|
| **Classifica** (Serie A/B/C) | Tabella con icone posizione (scudetto/promozione/retrocessione), loghi piccoli |
| **Classifica pre-stagione** | Come sopra, prima che inizi il campionato |
| **Giornata in evidenza** | Box con bordo blu sopra la classifica |
| **Calendario/Giornate** | Griglia di card espandibili (accordion nativo), 3 colonne, andata/ritorno |
| **Classifica marcatori/assist** | Due tabelle affiancate, espandibile |
| **Albo d'oro** | Storico vincitori per stagione |
| **Classifica Titoli / Hall of Fame** | Griglia card, conteggio titoli per squadra/lega |
| **Coppa Italia** | Tabellone a eliminazione diretta, a turni |
| **Log di mercato** | Sezioni: Trasferimenti, Svincoli, Ritiri, Cambi panchina |
| **Badge "la mia squadra"** | Pillola fissa in alto a destra, sempre visibile in partita |

---

## 2. Il componente più "da videogioco" già presente

La **Schermata Allenatore** (campo tattico) è l'unico punto dell'app dove esiste già qualcosa di visivamente vicino a un videogioco: un'immagine di campo da calcio (`assets/pitch/formation.BMP`) con sopra 11 "pallini" disegnati in SVG a griglia 8×8 (stile pixel), colorati per ruolo, posizionati secondo il modulo tattico. È il riferimento più naturale da cui il grafico può partire per capire il "livello" di pixel art richiesto altrove, e probabilmente il punto di massimo impatto per il restyling: oggi è un'immagine fotorealistica di campo con overlay pixel discordante, potrebbe diventare un vero campo pixel-art coerente stile Neo-Geo.

---

## 3. Componenti grafici ricorrenti (da ridisegnare una volta, riusati ovunque)

Questi elementi si ripetono identici in decine di schermate — ridisegnarli come "componenti" garantisce coerenza in tutta l'app:

- **Finestra/modale**: cornice, header, tab orizzontali, footer con bottone di conferma — oggi esistono *due* sistemi di modale leggermente diversi (uno più vecchio e semplice, uno più recente e ricco); nel restyling ha senso unificarli in un'unica "window frame" in stile arcade (bordi netti, angoli decorati, titolo in stile HUD)
- **Bottoni** con 3 varianti semantiche di colore: verde = conferma/accetta, rosso = rifiuta/vendi, blu = azione neutra, più un bottone "principale" scuro
- **Badge ruolo giocatore**: pillola colorata con sigla (POR/DIF/CEN/ATT ecc.), 4 colori per zona di campo
- **Riga giocatore/offerta**: pattern ripetuto in ogni lista (mercato, rosa, database) — bandiera, nome, badge ruolo, valore, prezzo, bottoni azione
- **Card giocatore**: la "scheda" che si apre cliccando un nome — è la più ricca di contenuto (statistiche, barre, tabelle storiche)
- **Tabelle**: classifica, calendario, database — tutte tabelle HTML native con righe colorate per zona (verde=promozione, rosso=retrocessione, azzurro=squadra propria)
- **Card espandibili (accordion)**: usate per calendario e Coppa Italia, con una freccina `▼` testuale
- **Barra di progresso**: oggi esiste solo per le statistiche di personalità del giocatore (ambizione/fedeltà/avidità) — potrebbe diventare una barra "vita/energia" in stile arcade
- **Badge/pillola notifica**: contatore rosso sulle tab con azioni pendenti
- **Selettore a segmenti (pillole)**: cambio vista (es. Modulo/Migliori 11/Titolari-Riserve)
- **Loghi/stemmi squadra**: già pixel-art, NON toccare — ma la "cornice" attorno al logo (bordo, ombra) sì che è modificabile
- **Bandiera nazionalità**: piccola bandiera SVG accanto al nome giocatore
- **Icone trofeo/promozione/retrocessione**: oggi `.webp` semi-realistiche, candidate a diventare pixel-icon coerenti col resto
- **Bottone sticky principale** ("Inizia Stagione" / "Simula Tutto ▶▶"): sempre visibile in alto, è la CTA più importante dell'app

---

## 4. Stato grafico attuale (da sostituire)

### Palette colori
- Blu primario `#2563eb` (bottoni, link, accenti)
- Blu navy scuro `#0b1622` (header modali, sfondo selezione squadra)
- Verde successo `#16a34a`, rosso danger `#ef4444`, ambra warning `#f59e0b`, oro `#eab308`
- Sfondi chiari `#ffffff` / `#f8fafc`, testo grigio-blu `#0f172a`/`#475569`
- Badge ruolo: portiere ambra, difesa blu, centrocampo verde, attacco rosso

È una palette **flat/material moderna** — colori desaturati, ombre morbide sfumate (`box-shadow` con blur), bordi arrotondati (4–16px), transizioni fluide. È l'opposto stilistico del Neo-Geo, che tipicamente usa: colori saturi e ad alto contrasto, bordi netti/squadrati o pixel, niente sfumature/blur, palette limitata "a la SNES/arcade".

### Font
Nessun font custom — solo font di sistema (`-apple-system, Segoe UI, Roboto...`). **Serve introdurre un font pixel/bitmap** per ottenere l'estetica anni '90; oggi manca del tutto.

### Icone
Nessuna libreria di icone: l'app usa **emoji Unicode dirette nel testo** (⚽💰📋🟨🟥🏆✅⚠️🔍 ecc.) come unico linguaggio iconografico, più alcune immagini `.webp`/`.svg` per trofei, bandiere e icone di promozione/retrocessione. Tutto materiale sostituibile con iconografia pixel-art coerente (tranne le bandiere nazionalità, su cui il grafico può decidere se intervenire o lasciarle come dettaglio minore).

### Sfondo campo tattico
`assets/pitch/formation.BMP` — immagine fotorealistica scalata con smoothing (non pixel nativa). Nota tecnica: attualmente NON viene reso con pixel netti apposta, per non far sparire linee sottili di 1px alla scala in cui è mostrato — se il grafico ridisegna questo sfondo in pixel-art, va progettato tenendo conto della scala finale di visualizzazione, non processato semplicemente con lo stesso filtro dei loghi.

---

## 5. Vincoli tecnici da tenere presente (per chi implementerà il redesign)

1. Il CSS ha già un sistema di **token/variabili** (`:root` con `--color-*`, `--font-*`, `--space-*`, `--radius-*`, `--shadow-*`) — un restyling coerente parte da qui, ma attenzione: non tutte le regole usano i token, molte hanno ancora colori scritti a mano nel codice, quindi cambiare solo le variabili in `:root` non basta a coprire tutto.
2. Font pixel: se scelto un web font va incluso come file locale (es. `.woff2` dentro `assets/`), **non da CDN esterno** — il gioco deve continuare a funzionare offline aprendo il file direttamente dal computer.
3. I loghi pixel-art hanno una pipeline di generazione dedicata (`tools/pixelate-logos.js`) — non toccare né i PNG risultanti né (salvo richiesta esplicita) lo script.
4. Le finestre/overlay hanno un ordine di sovrapposizione preciso e voluto (selezione squadra sopra tutto, poi scheda giocatore, poi finestre di mercato, poi badge fissi) — un redesign che introduce nuove cornici/ombre deve rispettare questa gerarchia visiva.
5. Tutti i "componenti" sono in realtà markup HTML ripetuto in più punti del codice JS (non componenti riutilizzabili in senso tecnico) — questo non impedisce il redesign CSS, ma vuol dire che uno stesso componente visivo (es. badge ruolo) va verificato in più punti per garantire coerenza.

---

## 6. Suggerimento di priorità per il grafico

Se si vuole procedere per fasi, un ordine ragionevole di impatto visivo:

1. **Fondamenta**: palette colori (sostituire i token), font pixel, stile bordi/ombre/radius generale
2. **Cornice finestre/modali** — è l'elemento che appare in quasi ogni schermata
3. **Campo tattico** (Schermata Allenatore) — il pezzo più "gioco" da valorizzare
4. **Badge, bottoni, barre di progresso** — piccoli componenti riusati ovunque, alto ritorno visivo per basso sforzo
5. **Tabelle** (classifica, calendario, database) — le schermate più "dense" di dati, da rendere leggibili anche in stile retro
6. **Iconografia** (sostituzione emoji/icone semantiche con pixel-icon)
