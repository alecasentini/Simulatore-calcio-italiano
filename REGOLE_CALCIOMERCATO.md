# Regole del Calciomercato — come fosse un gioco da tavolo

Questo documento spiega come funziona davvero il calciomercato (estivo e invernale) nel simulatore, con lo stesso livello di dettaglio di un regolamento di un gioco da tavolo: fasi, turni, chi decide cosa, ed esempi concreti.

---

## 0. Il tabellone e i giocatori

- **Giocatori del tabellone**: le 60 squadre di Serie A, B, C (20 ciascuna). La Serie D è un "pool dormiente": le squadre lì non hanno rosa/staff finché non vengono ripescate in C.
- **Un solo giocatore umano**: tu, nei panni del Direttore Sportivo (DS) di UNA squadra (o nessuna, in modalità spettatore).
- **Turno fisso di gioco**: prima di iniziare il mercato, tutte le 60 squadre vengono ordinate per **forza del proprio DS, dal più forte al più debole**. Per l'umano, la "forza DS" è la sua **reputazione** di carriera (stessa scala numerica della forza dei DS CPU) — è l'unico DS la cui forza è dinamica e può salire/scendere parecchio nel tempo in base ai risultati, mentre quella delle CPU è più statica.
- **L'ordine resta identico per l'intera stagione** (non si ricalcola tra il mercato estivo e quello invernale della stessa stagione): si ricalcola solo all'estate successiva. La tua posizione in questa fila dipende da quanto è forte (reputazione) il TUO DS rispetto agli altri 59.
- **I "giri" sono anche "giorni di mercato"**: ogni giro dello scheduler corrisponde a un giorno del calendario di mercato (es. 1° luglio → 31 agosto per l'estivo), mostrato con un countdown di quanti giorni restano — pura percezione del tempo che passa, non cambia la logica dei turni.

---

## 1. Prima che inizi il vero mercato a turni

### 1a. Contratti in scadenza quest'estate — risoluzione immediata (solo estivo)

Prima ancora che parta qualunque trattativa a turni, il gioco decide chi è ancora sotto contratto e chi diventa svincolato — per **tutte** le 60 squadre, umano compreso:

- Per ogni squadra **CPU**: ogni giocatore con contratto in scadenza (`duration <= 0`) prova il rinnovo automaticamente (`tryRenewContract`). L'esito dipende dalla personalità del giocatore (ambizione, lealtà, avidità) e dal prestigio/budget della squadra.
  - ✅ Rinnovo riuscito → *"Tizio Caio rinnova con Milan — 3 anni, 230k€/anno"*
  - ❌ Rinnovo fallito → *"Tizio Caio lascia Milan a parametro zero (28 anni, Forza: 71)"* — il giocatore entra tra gli svincolati.
- Per la **tua** squadra: i giocatori in scadenza NON vengono decisi in automatico, ma **devono essere risolti subito, uno per uno (rinnova o lascia andare), come primissima cosa prima che inizi il giro 1** — non più "con calma quando vuoi durante i turni". Quando il mercato a turni parte, la tua situazione contrattuale è già chiusa esattamente come quella delle CPU.
- Il rinnovo, per te, è **un'offerta a pacchetto generata dal gioco** (stipendio e durata decisi automaticamente in base a forza/età/mercato del giocatore): decidi solo se accettarla o no, nessuna leva negoziabile (niente scelta di importo, durata o clausole — le clausole rescissorie non esistono nel gioco).

**Perché conta**: questo determina chi è disponibile come svincolato (costo zero) PRIMA che inizi la fila dei turni — un giocatore appena svincolato può essere preso da chiunque nel mercato a turni, te compreso.

La tab **Rinnovi**, durante i turni che seguono, resta comunque disponibile per estensioni **anticipate** e sempre gratuite di contratti non ancora in scadenza — semplicemente non può più esistere un contratto "in scadenza quest'estate" ancora indeciso una volta partiti i turni.

### 1a-bis. Contratti in scadenza a fine stagione — pool Precontratti (solo invernale)

Il mercato invernale NON ha una fase di risoluzione immediata dei contratti: i contratti non "scadono" a metà stagione. Invece, ogni giocatore (di CPU o tuo) il cui contratto scadrà a **fine della stagione in corso** (tra circa 6 mesi) entra in un pool aperto: la lista **Precontratti**.

- **Non c'è una squadra predeterminata in attesa** — è un mercato aperto: qualunque squadra (CPU o tu) può, durante i turni invernali, firmare un **precontratto** a uno di questi giocatori. Il giocatore raggiungerà la nuova squadra **dalla stagione successiva**, restando nel frattempo al club attuale.
- **Firmare un precontratto è un'azione a turno**, esattamente come un acquisto o una vendita: consuma la mossa di quel giro, sia per la CPU sia per te.
- **Vincolo di monte ingaggi**: puoi firmare un precontratto solo se lo stipendio del giocatore rientra nel margine libero del tuo monte ingaggi. Più precontratti firmati nella stessa finestra si **sommano** sul monte ingaggi disponibile — firmarne uno può precludere il successivo se si sfora il tetto.
- **Consenso del giocatore non è mai automatico**: si applica la stessa curva forza/ambizione-giocatore vs obiettivo-squadra di ogni altro trasferimento (§5). Il fatto che l'operazione sia gratuita non significa accettazione automatica.
  - La tab **Precontratti** mostra però una lista **già pre-filtrata**: vedi solo i giocatori che, secondo il calcolo di consenso, accetterebbero un tuo precontratto. Non esiste, per questa lista, il tentativo che fallisce con rifiuto esplicito — il consenso è calcolato "dietro le quinte" solo per decidere cosa mostrarti.
- **Il club attuale può sempre rinnovare per bloccare la caccia**: durante i turni invernali, il rinnovo resta un'azione gratuita disponibile in ogni momento (vale sia per te sia per le CPU) — se il proprietario rinnova prima che qualcuno firmi il precontratto, il giocatore esce dalla lista Precontratti.
- **Concorrenza tra più pretendenti**: se più squadre vorrebbero lo stesso giocatore, vince chi arriva prima nell'ordine di turno fissato per forza DS — nessuna asta, nessuna scelta del giocatore tra offerte multiple.
- **Un giocatore che ha firmato un precontratto non può più essere ceduto a titolo definitivo** dal club attuale: resta al club fino a fine stagione ma è bloccato per il mercato in uscita, come un giocatore in prestito lo è per chi lo ospita. Prima della firma resta cedibile normalmente.

### 1b. Vetrina "Sul mercato" (STEP 6a)

Ogni squadra CPU (tranne la tua) mette in vetrina alcuni giocatori come "disponibili" — esuberi 26+, giocatori sotto media, occasionalmente una stella se un'altra squadra ha budget alto. Questo **non li toglie dalla rosa**: restano dei loro proprietari finché qualcuno non li compra per davvero. Serve solo a popolare la tab "Sul mercato" della tua schermata Acquisti.

---

## 2. Il mercato a turni — il cuore del sistema

Una volta stabilito l'ordine (per forza DS/reputazione) e la vetrina iniziale, si parte con lo scheduler a turni. Funziona a **giri** (giorni di mercato): un giro = un passaggio attraverso TUTTE le 60 squadre nell'ordine fissato.

### Regola del giro

- Ogni squadra, quando arriva il suo turno, fa **UNA azione** (o passa se non ha nulla da fare).
- Se una squadra è stata coinvolta nella transazione di un'altra (es. le hanno comprato un giocatore) durante questo stesso giro, il suo turno per questo giro **salta** — verrà rivalutata al giro successivo.
- Un giro finisce quando si è passato per tutte le 60 squadre.
- **Il mercato finisce quando un giro intero produce zero azioni** (tutti passano) — oppure dopo un tetto di sicurezza di giri (40 in estate, 20 in inverno).

### Cosa fa una CPU al suo turno (in ordine di priorità)

1. **Sfoltimento prioritario** (se la rosa ha problemi): in quest'ordine, il primo che funziona vince:
   - Un giocatore **fuori sistema tattico** (es. un'ala pura in una squadra che gioca solo moduli senza ALA) → priorità massima.
   - Rosa **sovradimensionata** (28+ giocatori) o **esubero 26+ isolato**.
   - Per il candidato scelto, si prova **in sequenza**: vendita (trova un acquirente) → prestito (se nessuno compra) → svincolo (solo se il contratto scade tra 1 anno).
2. **Se non c'è nulla da sfoltire**, guarda se ha bisogni di rosa (calcolati sul **modulo specifico dell'allenatore**: ruolo E posizione, non ruoli generici — stesso criterio già usato per lo sfoltimento) e prova, in ordine:
   - **Comprare** un esubero di un'altra squadra.
   - **Prendere uno svincolato** (costo zero, basta il margine sul monte ingaggi). Il pool degli svincolati si **accumula** tra sessioni — chi non trova squadra resta disponibile nelle sessioni successive; se resta svincolato per **3 stagioni consecutive**, si ritira.
   - **Prestare** un proprio giovane (under 23) in esubero a un'altra squadra.
   - **Firmare un precontratto** (solo durante i turni invernali, vedi §1a-bis).
3. **Se nessuna delle opzioni sopra è disponibile ma un TUO giocatore risolverebbe il bisogno**: la CPU non lo prende mai in automatico — genera invece un'**offerta** per te (vedi sotto), che non consuma il suo turno.
4. **Altrimenti**: passa.

**Filtri sempre attivi**: non esiste più un tetto rigido di forza per lega né un divieto assoluto di salto di categoria — vale invece il **consenso a fasce** (§5): il giocatore stesso deve accettare, e la probabilità dipende dalla sua forza/ambizione confrontata con la fascia-obiettivo della squadra target (salvezza, metà classifica, promozione, vertice) nella sua lega, non dalla categoria in sé.

### Cosa vedi TU al tuo turno

Quando arriva il tuo turno nella fila, si apre la **vera finestra di mercato** (la stessa che usi sempre, con tutte le tab: Notizie, Rinnovi, Offerte, Acquisti, Prestiti, Panchina, Moduli, Rosa, e Precontratti in inverno) — non una finestra diversa o ridotta.

- **Un'azione conclude il turno**: comprare, vendere, prestare/prendere in prestito, svincolare, firmare un precontratto, accettare un'offerta ricevuta → il turno finisce SUBITO, si passa alla squadra successiva.
- **Rinnovi, allenatore, moduli sono sempre gratis**: non consumano mai il turno, puoi sistemarli quando vuoi senza "sprecare" la tua mossa.
- **Due bottoni per non agire**:
  - **"Continua mercato"** → passi SOLO questo turno; ti richiamo appena ricapita un bisogno vero.
  - **"Conferma e Chiudi Mercato"** → esci dai turni per il resto della sessione, **in modo definitivo**: non esiste più una sessione libera successiva in cui recuperare terreno. Le altre squadre possono ancora farti offerte nel frattempo (puoi accettarle o rifiutarle), ma tu non avvii più nessuna azione attiva.
- **Se non hai nessun bisogno reale** (né da comprare né da vendere), il turno passa in automatico, senza nemmeno aprirti la finestra.

### Le offerte che ricevi

Se una CPU vorrebbe un tuo giocatore, al suo turno prova a farti un'**offerta vera** (nasce proprio dal suo turno nello scheduler, non è casuale):

- Se un tuo giocatore è il **miglior target disponibile** per quella CPU (non solo un ripiego perché non ha alternative migliori), l'offerta a te ha **priorità** sulle altre mosse possibili in quel turno — puoi quindi ricevere assalti veri a giocatori importanti, non solo proposte di scarto.
- Compare nella tab **Offerte ricevute** della TUA finestra di mercato (mai un popup separato).
- La risposta determina subito chi consuma il turno: se **accetti**, sia il tuo turno sia quello della squadra offerente si considerano conclusi (transazione avvenuta); se **rifiuti**, il turno "torna" alla squadra offerente, che nello stesso giro può ancora provare un'altra mossa — il rifiuto non costa il turno di nessuno. Finché non rispondi, acquisti/prestiti/vendite/svincoli sono bloccati, ma puoi comunque muoverti liberamente tra le altre tab.

### Esempio concreto di un giro

```
Ordine (primi 5 per forza DS/reputazione): Juventus(98) → Inter(96) → TU(85) →
                                            Napoli(80) → Fiorentina(74) → ...

Giorno di mercato 7 (giro 7):
  Juventus  → compra un centrocampista dalla Sampdoria (esubero) — 4.2M€
  Inter     → nessun bisogno reale → PASSA
  TU        → hai un esubero 27enne senza offerte dirette: si apre la finestra,
              scegli "Vendi" dalla tab Rosa → venduto al Bologna per 1.8M€
              → tuo turno concluso
  Napoli    → coinvolto? No → prova ad acquistare: nessun target valido → PASSA
  Fiorentina→ vorrebbe un tuo giocatore ma tu non hai nulla in eccesso per lei
              → genera un'offerta per un tuo titolare, te la ritrovi nella tab
                Offerte al TUO prossimo turno
  ...
```

---

## 3. Dopo che i turni convergono (fase finale, entrambi i mercati)

Quando un giro intero non produce più nessuna azione, lo scheduler si ferma. **Non esiste più nessuna sessione libera successiva**: il mercato è concluso, a parte questi ultimi step indipendenti dai turni:

- **Mercato estero** (solo Serie A, indipendente dai turni): ogni squadra di A sotto il tetto di 3 stranieri ha una possibilità di prendere un candidato estero. Un giocatore **italiano** non può mai partire per l'estero; un giocatore **straniero già in rosa** (di qualunque squadra, CPU o tua) può invece essere rivenduto all'estero.
- **Poaching per blasone** (STEP 6d, solo estivo): cascata "il ricco compra dal povero" — una squadra prestigiosa con tanto budget (15M€+) può corteggiare un giocatore di una squadra meno blasonata, offrendo 1.5× il valore. Rispetta comunque la gerarchia di lega e il consenso del giocatore. Se il giocatore appartiene a te, ricevi un'**offerta vera** nella tab Offerte (puoi accettare o rifiutare liberamente, non è mai imposta).
- **Tetto di budget**: ri-applicato per ogni CPU (400M€ A / 120M€ B / 40M€ C). L'eccedenza non spesa **si accumula per intero** (carry-over totale, senza tetto massimo) alla sessione di mercato successiva, sommandosi al nuovo tetto di categoria — anche in caso di promozione o retrocessione, il tesoretto accumulato si somma sempre al nuovo tetto senza ridimensionamenti.

---

## 4. Mercato invernale — cosa cambia rispetto all'estivo

| | Estivo | Invernale |
|---|---|---|
| Contratti in scadenza | Risoluzione immediata per tutti (CPU automatica, tua manuale) PRIMA del giro 1 (§1a) | **No** — niente risoluzione immediata; chi scade a fine stagione entra nel pool **Precontratti**, contendibile durante i turni (§1a-bis) |
| Vetrina iniziale | STEP 6a completo (esuberi 26+, sotto media, stelle B/C) | Versione più semplice: ogni CPU ha il 35% di possibilità di mettere in vendita un giocatore a caso (forza >40, non già in prestito) |
| Mercato a turni | Sì, tetto di sicurezza 40 giri | Sì, stesso meccanismo, tetto di sicurezza **20 giri** (storicamente più corto: ~21 giri medi in estate contro ~16 in inverno) |
| Il tuo turno reale | Vera finestra di mercato con tab Notizie/Rinnovi/Offerte/Acquisti/Prestiti/Panchina/Moduli/Rosa | **Stessa identica finestra**, con in più la tab **Precontratti** |
| Rinnovi durante i turni | Tab Rinnovi per estensioni anticipate (proattive, gratuite) — nessun contratto in scadenza quest'estate resta indeciso | Stessa tab Rinnovi per estensioni anticipate/proattive — in più, rinnovare un giocatore in ultimo anno di contratto lo toglie dal pool Precontratti |
| Meccanismo dei precontratti | Non esiste (i contratti in scadenza si risolvono subito, §1a) | Pool **Precontratti** aperto a tutte le squadre, azione a turno (§1a-bis) |
| Mercato estero | Sì, indipendente | Sì, indipendente, stessa logica |
| Poaching per blasone (STEP 6d) | Sì | **No** — non esiste equivalente invernale |
| Sessione finale libera | Non esiste più (eliminata, §3) | Non esiste più (eliminata, §3) |

---

## 5. Vincoli che si applicano SEMPRE (estivo e invernale, durante i turni e nella fase finale)

- **Consenso a fasce (sostituisce il vecchio tetto di lega rigido)**: non esiste più un tetto di forza fisso per categoria né un divieto assoluto di doppio salto (A→C incluso) — qualunque trasferimento è in teoria possibile. Conta invece il confronto tra la **forza/ambizione del giocatore** e la **fascia-obiettivo della squadra target** all'interno della sua lega (salvezza, metà classifica, promozione, vertice/scudetto): più la fascia-obiettivo è bassa rispetto al livello del giocatore, più cresce la probabilità di rifiuto. Nessun altro fattore (ingaggio offerto, età, minutaggio promesso, allenatore, città) entra nel calcolo — niente leve di persuasione. *(Le soglie esatte per fascia e la curva di probabilità sono da tarare in dettaglio in una fase successiva di design.)*
- Questa stessa curva di consenso si applica anche a **svincolati** e **precontratti**: essere un'operazione gratuita non significa accettazione automatica.
- **Tetto prestiti in ingresso**: massimo 8 prestiti attivi in contemporanea per squadra (vale anche per le CPU, non solo per te).
- **Tetto rosa**: massimo 30 giocatori totali; un prestito verso una squadra già piena o già a 8 prestiti viene rifiutato.
- **Un giocatore in prestito non può essere comprato o venduto da nessuno** finché il prestito è attivo, e non esiste alcuna possibilità di riscatto: il prestito è sempre e solo temporaneo, con durata fissa fino a fine stagione (nessun richiamo anticipato a gennaio) — il giocatore torna sempre alla squadra proprietaria a fine prestito, e può essere spostato di nuovo solo dopo essere rientrato.
- **Lo stipendio di un giocatore in prestito pesa sul monte ingaggi della squadra ospitante** (che lo riceve), come se fosse un giocatore proprio per la durata del prestito — la squadra proprietaria se ne libera, ed è spesso il motivo stesso per cui presta un esubero.
- **Divieto di doppio trasferimento nella stessa sessione**: un giocatore comprato, venduto, svincolato-e-poi-firmato, o preso in prestito durante una sessione di mercato (estiva o invernale) non può essere ricomprato, rivenduto o girato in prestito a una terza squadra da nessuno per il resto di quella stessa sessione — vale sia per transazioni tra CPU sia per quelle che coinvolgono l'umano, in entrambe le direzioni. Il blocco vale per singola sessione: un giocatore mosso in estate torna liberamente trasferibile alla sessione invernale successiva.
- **Il prezzo del cartellino si deprezza in base agli anni di contratto rimanenti**: meno anni restano, più forte lo sconto (l'ultimo anno comporta un forte sconto) — riflette il rischio di perderlo a parametro zero.
- **Monte ingaggi vs cassa**: due vincoli separati — la cassa serve per il cartellino, il monte ingaggi per lo stipendio. Una squadra povera di cassa ma con stipendi sotto controllo può comunque prendere uno svincolato gratis.

---

## 6. Riepilogo in una frase

Il calciomercato è una **fila di 60 squadre ordinate per forza del DS (reputazione, per l'umano)**, che a turno fanno **una mossa reale alla volta** (comprare, vendere, prestare, svincolare, firmare un precontratto) finché nessuno ha più niente da fare — tu partecipi esattamente come una CPU, nel tuo punto della fila, con l'unica differenza che le tue mosse le scegli davvero tu, con tutta la tua finestra di mercato a disposizione; puoi sempre scegliere di "passare" un turno o di "uscire" definitivamente dal giro, ma senza mai fermare le altre squadre e senza più nessuna sessione libera di ripiego a fine mercato.
