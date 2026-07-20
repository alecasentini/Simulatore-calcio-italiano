# Intelligenza artificiale delle squadre CPU — stato attuale

> Documento di riferimento per chi lavora sul comportamento delle squadre gestite dalla CPU (mercato, rose, staff, finanze, vivaio). Obiettivo: descrivere con precisione come si comporta **oggi** il sistema, per poi discutere insieme dove e come renderlo più realistico. Tutti i riferimenti a righe sono relativi a `assets/js/main.js` (unico file sorgente, vanilla JS, nessun build step).

## Indice

1. [Contesto e architettura](#1-contesto-e-architettura)
2. [Il ciclo di fine stagione](#2-il-ciclo-di-fine-stagione)
3. [Come una squadra valuta i propri bisogni di rosa](#3-come-una-squadra-valuta-i-propri-bisogni-di-rosa)
4. [Mercato — acquisti](#4-mercato--acquisti)
5. [Mercato — vendite](#5-mercato--vendite)
6. [Prestiti](#6-prestiti)
7. [Staff: allenatori e direttori sportivi](#7-staff-allenatori-e-direttori-sportivi)
8. [Finanze](#8-finanze)
9. [Vivaio e ricambio generazionale](#9-vivaio-e-ricambio-generazionale)
10. [Obiettivi stagionali e ambizione](#10-obiettivi-stagionali-e-ambizione)
11. [Scelta tattica (moduli)](#11-scelta-tattica-moduli)
12. [Tabella delle costanti principali](#12-tabella-delle-costanti-principali)
13. [Limiti di realismo individuati — punto di partenza per la discussione](#13-limiti-di-realismo-individuati--punto-di-partenza-per-la-discussione)

---

## 1. Contesto e architettura

Il gioco gestisce 3 leghe (Serie A/B/C, 20 squadre ciascuna) più un pool dormiente di Serie D (10 squadre, mai simulate, serve solo da "parcheggio" per le retrocesse dalla C). Tutta l'IA delle squadre CPU vive dentro **una singola funzione enorme**, `updateTeamStrengths`, chiamata una volta a fine stagione: è la funzione che decide esoneri, mercato, rinnovi, ritiri, vivaio, finanze — in pratica tutto quello che succede "dietro le quinte" tra una stagione e l'altra.

Non esiste un modulo/oggetto "AI" separato per squadra: ogni STEP della pipeline itera su tutte le squadre (o su un sottoinsieme filtrato) e applica la stessa logica a tutte, con l'unica eccezione ricorrente della squadra del giocatore umano (quasi ovunque esplicitamente esclusa, dato che le sue decisioni passano dalla UI).

## 2. Il ciclo di fine stagione

`updateTeamStrengths` esegue, in quest'ordine, dentro un'unica chiamata:

| Step | Cosa fa |
|---|---|
| Pre-step | I prestiti attivi rientrano a casa; si aggiorna `leagueLevel`; si salva la lega precedente (serve per i bonus promozione) |
| 0 | Esoneri allenatori (squadre sotto obiettivo) |
| 0b | Valutazione DS (esonero o corteggiamento) |
| — | Corteggiamento DS verso leghe superiori (C→B, B→A) |
| — | Corteggiamento allenatori verso leghe superiori |
| 1 | Invecchiamento svincolati; ritiro forzato dopo 3 stagioni da disoccupato |
| 1b | Invecchiamento/ritiro allenatori liberi; inseriti 2 nuovi allenatori emergenti |
| 1b-bis | Contratti allenatori: scadenza, rinnovo, eventuale svincolo se troppo forte per la lega |
| 1c / 1c-bis | Stesso ciclo per i DS (invecchiamento + contratti) |
| — | Upgrade attivo di allenatore/DS se c'è un libero nettamente più forte |
| — | Assegnazione allenatore/DS a chi ne è rimasto senza |
| 1d | Gestione contratti giocatori (rinnovi, scadenze, svincoli) |
| 2 | Invecchiamento giocatori, ritiri (30/20/50% diventano allenatore/DS/nulla), un giovane del vivaio per ogni ritirato |
| 3 | Rilascio eccedenze se la rosa supera 30 giocatori |
| 4 | Eventi "magnate" (iniezione di budget) |
| — | Aggiornamento contatori stagioni per lega |
| 5 | Premi di fine stagione + stipendi (finanze) |
| 5.5 | Vendite forzate se il bilancio resta negativo |
| 6 | **Mercato trasferimenti**: vendite volontarie, poi 6 cicli di acquisto, poi mercato estero (solo A) |
| 6d | Corteggiamento "di blasone" (una squadra di lega superiore prova a comprare da una inferiore) |
| 7 | Garanzia di almeno 22 giocatori in rosa (rimpolpa con svincolati o vivaio) |

Ogni STEP è indipendente e scorre l'intera lista squadre — non c'è una "AI" per singola squadra che ragiona in autonomia, è più una serie di passate globali con regole uniformi.

## 3. Come una squadra valuta i propri bisogni di rosa

- **`ROLE_MIN`/`ROLE_MAX`**: minimo/massimo per ciascuno dei 9 ruoli. Totale rosa: minimo 22, massimo 30.
- **`getSquadTiers(team)`**: calcola titolari (miglior 11 per il modulo attivo, **forma ignorata di proposito** — un titolare non smette di essere considerato tale solo perché è appannato quella settimana) e riserve (miglior 11 del resto della rosa).
- **`getSquadSurplus(team)`**: tutto quello che non rientra nei "migliori 22" (titolari+riserve) è esubero. È la funzione che decide chi è vendibile e chi è prestabile.
- **`getTeamNeeds(team)`**: controlla il modulo attivo per slot "fuori ruolo"/"fuori posizione" e la profondità di rosa (se le riserve di un reparto valgono meno del 70% dei titolari, scatta un bisogno di rinforzo).

## 4. Mercato — acquisti

- **`evaluateTransferTarget`**: calcola quanto un giocatore migliorerebbe la squadra (differenza di forza pesata dell'undici titolare prima/dopo l'acquisto; se non entrerebbe negli 11, si valuta comunque un guadagno ridotto — ×0.35 — sul livello delle riserve). Il "costo" include il cartellino più una stima dello stipendio sui 3 anni successivi.
- **Rumore legato alla forza del DS**: un DS forte (≥60) sceglie sempre il miglior obiettivo disponibile; un DS debole (≤25) ha fino al ±35% di rumore casuale sul punteggio — sbaglia il pick tra i primi candidati, ma la rosa di candidati è già filtrata su bisogno reale, quindi non fa mai un acquisto totalmente insensato.
- **Partecipazione al mercato**: una squadra salta il turno se è già troppo forte per la propria lega (media rosa oltre 92/75/55 A/B/C), se ha budget sotto 2M€, o per un tiro a sorte legato alla sua "aggressività di mercato" (combinazione di ambizione stagionale e generosità del presidente). Il mercato estivo gira **6 cicli** per squadra.
- **Mercato estero**: solo Serie A, con sconto 20-40% su cartellino/stipendio, tetto di 3 stranieri per rosa.
- **Corteggiamento di blasone (STEP 6d)**: le squadre di lega superiore possono comprare direttamente da una inferiore offrendo 1.5× il valore, con probabilità di accettazione che dipende da quanto la venditrice ha bisogno di soldi e da quanto il suo DS "protegge" il giocatore. Le clausole rescissorie, se presenti e pagabili, forzano il trasferimento scavalcando ogni trattativa.

## 5. Mercato — vendite

Tutto succede in un'unica passata a inizio mercato estivo, per ogni squadra CPU:

1. **Esubero 26+**: chi è fuori dai "migliori 22" ed ha 26 anni o più viene messo in lista, prezzo 0.8-1.3× il valore.
2. **Sostituzione attiva**: 5-8 giocatori sotto media (o "in eccesso" se la rosa è sovradimensionata) vengono offerti, stesso range di prezzo.
3. **"La stella vuole fare il salto"**: solo per B/C — un giocatore molto più forte della media di squadra (+18) ha il 60% di possibilità di essere messo in vetrina, a premio fisso 1.3× (non uniforme).

D'inverno esiste una versione ridotta: il 35% delle squadre CPU mette in vendita un giocatore a caso.

Se il bilancio resta negativo dopo i conti di fine stagione, scatta la **vendita forzata**: i più forti (esclusi i portieri) vengono ceduti a un fisso 0.65× finché il budget non torna positivo (o la rosa si esaurisce).

## 6. Prestiti

**Nota importante**: al momento **non esiste alcun meccanismo di prestito CPU-vs-CPU**. Tutte le funzioni di prestito (`loanOutPlayer`, `loanInPlayer`, `findLoanDestination`, ecc.) sono innescate solo dalla UI del giocatore umano. I giovani in esubero (under 26, fuori dai migliori 22) restano semplicemente in panchina fino a quando non compiono 26 anni, momento in cui rientrano nel ciclo di vendita ordinaria. Il tetto di 8 prestiti in entrata (`MAX_INCOMING_LOANS`) vale solo per il giocatore umano.

## 7. Staff: allenatori e direttori sportivi

- **Fasce di forza per lega**: C 40-60, B 61-80, A 81-100 — usate sia per generare nuovo staff sia per decidere chi è "disposto" ad accettare un'offerta da una certa lega (uno staff non scende mai sotto il proprio livello naturale, ma può sempre salire).
- **Esoneri**: allenatore, se sotto obiettivo di oltre 3 posizioni, 65% di probabilità (+ 8% di esonero "casuale" indipendente dal rendimento); DS, oltre 4 posizioni, probabilità legata alla pazienza del presidente (25-65%), + 5% casuale.
- **Corteggiamento verso l'alto**: uno staff sufficientemente forte in una lega inferiore può essere corteggiato da una superiore (soglie e probabilità diverse per DS/allenatore).
- **Upgrade interno**: se tra gli svincolati c'è qualcuno nettamente più forte (10+ punti DS, 12+ allenatore) dello staff attuale, la squadra ha 55%/40% di possibilità di sostituirlo.
- **Rinnovo di fine contratto**: se lo staff è più forte del tetto della propria lega attuale, preferisce svincolarsi (25% di restare) invece di rinnovare (normalmente 75% di restare) — cerca una squadra migliore.
- **Buonuscita**: stipendio annuo × anni di contratto residui, sia per esoneri manuali sia per quelli automatici dell'IA.
- **Ricambio**: ogni stagione entrano nel mercato 2 nuovi allenatori e 3 nuovi DS "emergenti" (mai stati calciatori), per evitare che il livello massimo disponibile si esaurisca nel lungo periodo.

## 8. Finanze

- **Premi per piazzamento**: dagli ~8M€ (ultimo posto A) agli ~80M€ (primo posto A); scale analoghe più basse per B e C.
- **Monte stipendi**: calcolato come **forza al quadrato** × un moltiplicatore per lega — un giocatore da 90 costa 4 volte uno da 45, non il doppio. Stessa logica (con moltiplicatore diverso) per allenatore e DS.
- **Tetto di budget**: 400M€ (A) / 120M€ (B) / 40M€ (C) — un tetto rigido, l'eccesso viene semplicemente scartato, non reinvestito in nessun modo.
- **Eventi "magnate"**: 2% di probabilità a stagione che una squadra riceva un'iniezione di budget per 3-10 stagioni.

## 9. Vivaio e ricambio generazionale

- **Forza di nascita per lega**: A 55-70, B 40-55, C 30-45 (a 17 anni).
- **"Talento fuori scala"**: un vivaio di C ha il 5% di sfornare un giovane con la fascia di nascita di A, il 15% con quella di B; un vivaio di B ha il 20% di sfornare fascia A. Sempre senza malus, tirato a sorte per singolo giovane, senza legame con il prestigio del club.
- **Potenziale**: 6% di probabilità di essere "predestinato" (margine di crescita più ampio, +20/+30 sulla forza di nascita, altrimenti +8/+25).
- **Ritiro**: oltre i 36 anni, oppure — regola nuova — oltre 3 stagioni consecutive da svincolato anche se più giovane. In entrambi i casi 30%/20%/50% di probabilità di diventare allenatore/DS/ritirarsi e basta.

## 10. Obiettivi stagionali e ambizione

Ogni squadra riceve un obiettivo a inizio stagione basato sulla propria forza attuale (non sul piazzamento della stagione precedente): Serie A a fasce percentuali (top 3 = Titolo, 40% = Metà alta, 75% = Metà classifica, resto Salvezza); Serie B/C a fasce fisse da 5 posizioni (1-5 Promozione, 6-10 Metà alta, 11-15 Metà classifica, 16-20 Salvezza). Questo obiettivo guida: soglie di esonero, aggressività di mercato, e (in combinazione con la lega) un punteggio globale 1-12 usato anche per il mercato del lavoro del DS umano.

## 11. Scelta tattica (moduli)

Ogni allenatore ha 2 moduli preferiti (accoppiati per affinità tattica — non più di 2 ruoli diversi su 11 slot, vedi lavoro recente su `FORMATION_PAIRS`). A ogni stagione/partita la squadra sceglie quale dei due schierare confrontando la forza pesata dell'undici migliore ottenibile con l'uno o l'altro modulo, con le riserve come spareggio in caso di parità.

## 12. Tabella delle costanti principali

| Parametro | Valore |
|---|---|
| Rosa minima / massima | 22 / 30 |
| Tetto stranieri (solo A) | 3 |
| Fasce forza staff (C/B/A) | 40-60 / 61-80 / 81-100 |
| Tetto forza giocatori per lega | ≤60 (C) / ≤80 (B) / ≤100 (A) |
| Prestiti in entrata (solo umano) | 8 |
| Esonero allenatore | fallimento×65% + 8% casuale |
| Esonero DS | fallimento×(25-65%) + 5% casuale |
| Staff "troppo forte": prob. di restare | 75% → 25% se sopra il tetto di lega |
| Upgrade staff: soglia/probabilità | DS ≥10 pti/55%, All. ≥12 pti/40% |
| Prezzo vendita esubero/rimpiazzo | 0.8-1.3× valore |
| Prezzo "la stella vuole andare via" | 1.3× fisso |
| Prezzo vendita forzata (bilancio negativo) | 0.65× fisso |
| Prezzo corteggiamento di blasone | 1.5× valore |
| Cicli di mercato a stagione | 6 |
| Rumore DS sulle scelte di mercato | 0% (DS 100) — ±35% (DS ≤25) |
| Predestinato vivaio | 6% |
| Talento fuori scala (C→B/A, B→A) | 5%/15% — 20% |
| Ritiro | età &gt;36, oppure &gt;3 stagioni da svincolato |
| Tetto budget (A/B/C) | 400M€ / 120M€ / 40M€ |
| Stipendi | forza² × moltiplicatore di lega |
| Probabilità evento "magnate" | 2%/stagione, dura 3-10 stagioni |

## 13. Limiti di realismo individuati — punto di partenza per la discussione

Questi sono osservazioni emerse leggendo il codice, non ancora decisioni: servono come lista di partenza per capire dove intervenire.

1. **Nessun prestito CPU-vs-CPU.** È probabilmente il buco più grande: nella realtà i prestiti sono lo strumento principale per far crescere i giovani in esubero. Qui restano semplicemente parcheggiati in rosa fino ai 26 anni.
2. **Obiettivi stagionali calcolati sulla forza attuale, non sul piazzamento reale della stagione precedente** — e assegnati PRIMA che il mercato di quella stessa stagione (che può cambiare parecchio la rosa) sia avvenuto.
3. **Due scale diverse e non coordinate per decidere "quanto è forte" uno staff**: il tetto usato per player/mercato (100/80/60) e la fascia usata per l'assunzione (40-60/61-80/81-100) non condividono lo stesso confine — un allenatore da 65 è "di fascia B" per l'assunzione ma non ancora "troppo forte per la B" secondo l'altra soglia.
4. **Un flag di overperformance del DS (`dsOverperformed`) viene calcolato ma non risulta più usato da nessuna parte** — probabilmente residuo di una versione precedente della logica.
5. **Stipendi a curva quadratica sulla forza**, senza un chiaro ancoraggio a una logica di mercato realistica — un 90 di forza costa 4 volte un 45, non il doppio.
6. **I prezzi di mercato sono moltiplicatori fissi/casuali** (0.65×, 0.8-1.3×, 1.3×, 1.5×) sul valore, senza vera trattativa, offerte concorrenti, o leva contrattuale (durata residua, clausole, ecc. — a parte le clausole rescissorie che bypassano tutto se pagabili).
7. **Il tetto di budget è un troncamento secco**: il denaro in eccesso sparisce, niente reinvestimento (infrastrutture, vivaio, ecc.) — stessa sorte parziale per le iniezioni "magnate" se capitano quando il tetto è già vicino.
8. **Il rumore del DS agisce solo sulla scelta finale tra candidati già filtrati**, mai sul fatto di partecipare al mercato, sul prezzo offerto, o sulla valutazione della gravità di un bisogno — quindi anche un DS scarso non sbaglia mai in modo grossolano, solo in modo "leggermente subottimale".
9. **L'esonero "casuale" (8%/5%) è scollegato dal rendimento** — un'iniezione di randomness piuttosto grezza rispetto a modellare, ad esempio, una striscia di risultati negativi o la personalità del presidente in modo più organico.
10. **Il "talento fuori scala" del vivaio è un tiro a sorte indipendente per ogni giovane**, senza nessun legame con prestigio, storia o investimenti del club — un piccolo club di provincia e una big di provincia hanno esattamente le stesse probabilità.
