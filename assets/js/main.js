const serieA = [
    { name: 'Juventus'},
    { name: 'Inter'},
    { name: 'Milan'},
    { name: 'Roma'},
    { name: 'Napoli'},
    { name: 'Lazio'},
    { name: 'Atalanta'},
    { name: 'Fiorentina'},
    { name: 'Sampdoria'},
    { name: 'Genoa'},
    { name: 'Udinese'},
    { name: 'Bologna'},
    { name: 'Sassuolo'},
    { name: 'Cagliari'},
    { name: 'Torino'},
    { name: 'Parma'},
    { name: 'Hellas Verona'},
    { name: 'Spezia'},
    { name: 'Benevento'},
    { name: 'Crotone'}
  ];
  
  const serieB = [
    { name: 'Empoli'},
    { name: 'Salernitana'},
    { name: 'Lecce'},
    { name: 'Venezia'},
    { name: 'Cittadella'},
    { name: 'Monza'},
    { name: 'Pisa'},
    { name: 'Chievo'},
    { name: 'Ascoli'},
    { name: 'Brescia'},
    { name: 'Varese'},
    { name: 'Cremonese'},
    { name: 'SPAL'},
    { name: 'Reggina'},
    { name: 'Vicenza'},
    { name: 'Cosenza'},
    { name: 'Entella'},
    { name: 'Reggiana'},
    { name: 'Frosinone'},
    { name: 'Como'}
  ];
  
  const serieC = [
    { name: 'Avellino'},
    { name: 'Palermo'},
    { name: 'Catania'},
    { name: 'Ternana'},
    { name: 'Lecco'},
    { name: 'Padova'},
    { name: 'Bari'},
    { name: 'Modena'},
    { name: 'Perugia'},
    { name: 'Alessandria'},
    { name: 'Novara'},
    { name: 'Catanzaro'},
    { name: 'Siena'},
    { name: 'Foggia'},
    { name: 'Pro Patria'},
    { name: 'Piacenza'},
    { name: 'Lucchese'},
    { name: 'Triestina'},
    { name: 'Pescara'},
    { name: 'Messina'},
  ];

  // Funzione per generare un numero random da 0 a 5
function getRandomScore() {
    return Math.floor(Math.random() * 6);
  }
  
  // Funzione per creare un calendario di partite per ogni serie
  function createSchedule(teams) {
    const schedule = [];
    const numTeams = teams.length;
  
    // Loop per creare le partite di andata e ritorno
    for (let i = 0; i < numTeams - 1; i++) {
      for (let j = i + 1; j < numTeams; j++) {
        // Inserisci la partita di andata
        schedule.push({ home: teams[i], away: teams[j] });
  
        // Inserisci la partita di ritorno
        schedule.push({ home: teams[j], away: teams[i] });
      }
    }
  
    return schedule;
  }
  
  // Funzione per simulare una partita tra due squadre
  function simulateMatch(home, away) {
    const homeScore = getRandomScore();
    const awayScore = getRandomScore();
  
    if (homeScore > awayScore) {
      // La squadra di casa vince
      return { winner: home, homePoints: 3, awayPoints: 0 };
    } else if (homeScore < awayScore) {
      // La squadra ospite vince
      return { winner: away, homePoints: 0, awayPoints: 3 };
    } else {
      // Pareggio
      return { winner: null, homePoints: 1, awayPoints: 1 };
    }
  }
  
  // Simulare tutte le partite di una serie
  function simulateSeason(schedule) {
    const standings = {};
  
    schedule.forEach(match => {
      const home = match.home.name;
      const away = match.away.name;
      const result = simulateMatch(home, away);
  
      // Aggiorna i punti della squadra di casa
      standings[home] = (standings[home] || 0) + result.homePoints;
  
      // Aggiorna i punti della squadra in trasferta
      standings[away] = (standings[away] || 0) + result.awayPoints;
    });
  
    return standings;
  }
  
  // Ordinare le squadre per punti e visualizzare la classifica
  function showStandings(standings) {
    const teams = Object.keys(standings);
    const sortedTeams = teams.sort((a, b) => standings[b] - standings[a]);
  
    console.log("Classifica:");
    sortedTeams.forEach((team, index) => {
      console.log(`${index + 1}. ${team}: ${standings[team]} punti`);
    });
  }

  const scheduleA = createSchedule(serieA);
const standingsA = simulateSeason(scheduleA);
document.getElementById("serieA").innerHTML = showStandings(standingsA);

const scheduleB = createSchedule(serieB);
const standingsB = simulateSeason(scheduleB);
document.getElementById("serieB").innerHTML = showStandings(standingsB);

const scheduleC = createSchedule(serieC);
const standingsC = simulateSeason(scheduleC);
document.getElementById("serieC").innerHTML = showStandings(standingsC);

  
function showStandings(standings, numPromoted, numRelegated) {
    // Sort standings based on points and goal difference
    standings.sort((a, b) => {
      if (a.points !== b.points) {
        return b.points - a.points;
      } else {
        return (b.goalsFor - b.goalsAgainst) - (a.goalsFor - a.goalsAgainst);
      }
    });
  
    // Determine which teams will be promoted and relegated
    const promotedTeams = standings.slice(0, numPromoted);
    const relegatedTeams = standings.slice(-numRelegated);
  
    // Create a table to display the standings
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
  
    // Add the table header row
    const headerRow = document.createElement('tr');
    const headerRank = document.createElement('th');
    headerRank.textContent = 'Rank';
    headerRow.appendChild(headerRank);
    const headerTeam = document.createElement('th');
    headerTeam.textContent = 'Team';
    headerRow.appendChild(headerTeam);
    const headerPoints = document.createElement('th');
    headerPoints.textContent = 'Points';
    headerRow.appendChild(headerPoints);
    table.appendChild(thead);
    thead.appendChild(headerRow);
  
    // Add the table rows for each team
    for (let i = 0; i < standings.length; i++) {
      const team = standings[i];
      const row = document.createElement('tr');
      const rank = document.createElement('td');
      rank.textContent = i + 1;
      row.appendChild(rank);
      const teamName = document.createElement('td');
      teamName.textContent = team.name;
      row.appendChild(teamName);
      const points = document.createElement('td');
      points.textContent = team.points;
      row.appendChild(points);
  
      // Add styling for promoted and relegated teams
      if (promotedTeams.includes(team)) {
        row.classList.add('promoted');
      } else if (relegatedTeams.includes(team)) {
        row.classList.add('relegated');
      }
  
      tbody.appendChild(row);
    }
  
    table.appendChild(tbody);
  
    // Add the table to the HTML page
    const standingsContainer = document.createElement('div');
    standingsContainer.classList.add('standings-container');
    standingsContainer.appendChild(table);
    document.body.appendChild(standingsContainer);
  }
  