let serieA = [
  { name: 'Juventus' },
  { name: 'Inter' },
  { name: 'Milan' },
  { name: 'Roma' },
  { name: 'Napoli' },
  { name: 'Lazio' },
  { name: 'Atalanta' },
  { name: 'Fiorentina' },
  { name: 'Sampdoria' },
  { name: 'Genoa' },
  { name: 'Udinese' },
  { name: 'Bologna' },
  { name: 'Sassuolo' },
  { name: 'Cagliari' },
  { name: 'Torino' },
  { name: 'Parma' },
  { name: 'Hellas Verona' },
  { name: 'Palermo' },
  { name: 'Bari' },
  { name: 'Vicenza' }
];

let serieB = [
  { name: 'Empoli' },
  { name: 'Salernitana' },
  { name: 'Lecce' },
  { name: 'Venezia' },
  { name: 'Cittadella' },
  { name: 'Monza' },
  { name: 'Pisa' },
  { name: 'Chievo' },
  { name: 'Ascoli' },
  { name: 'Brescia' },
  { name: 'Varese' },
  { name: 'Cremonese' },
  { name: 'SPAL' },
  { name: 'Reggina' },
  { name: 'Triestina' },
  { name: 'Cosenza' },
  { name: 'Entella' },
  { name: 'Reggiana' },
  { name: 'Frosinone' },
  { name: 'Como' }
];

let serieC = [
  { name: 'Avellino' },
  { name: 'Benevento' },
  { name: 'Catania' },
  { name: 'Ternana' },
  { name: 'Lecco' },
  { name: 'Padova' },
  { name: 'Cesena' },
  { name: 'Modena' },
  { name: 'Perugia' },
  { name: 'Alessandria' },
  { name: 'Novara' },
  { name: 'Catanzaro' },
  { name: 'Siena' },
  { name: 'Foggia' },
  { name: 'Pro Patria' },
  { name: 'Piacenza' },
  { name: 'Lucchese' },
  { name: 'Livorno' },
  { name: 'Pescara' },
  { name: 'Messina' },
];


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

function updateStandingsA(match, result, points) {
  // Verifica se l'oggetto per la squadra esiste già nella classifica, altrimenti crea un oggetto vuoto
  standingsA[match.team1.name] = standingsA[match.team1.name] || { points: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0 };
  standingsA[match.team2.name] = standingsA[match.team2.name] || { points: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0 };

  // Aggiorna i dati della squadra
  standingsA[match.team1.name].points += points.team1Points;
  standingsA[match.team2.name].points += points.team2Points;

  standingsA[match.team1.name].goalsFor += result.team1Goals;
  standingsA[match.team2.name].goalsFor += result.team2Goals;

  standingsA[match.team1.name].goalsAgainst += result.team2Goals;
  standingsA[match.team2.name].goalsAgainst += result.team1Goals;

  if (points.team1Points === 3) {
    standingsA[match.team1.name].wins++;
    standingsA[match.team2.name].losses++;
  } else if (points.team2Points === 3) {
    standingsA[match.team2.name].wins++;
    standingsA[match.team1.name].losses++;
  } else {
    standingsA[match.team1.name].draws++;
    standingsA[match.team2.name].draws++;
  }
}
function updateStandingsB(match, result, points) {
  // Crea un oggetto vuoto per la classifica della Serie B se non esiste già
  standingsB[match.team1.name] = standingsB[match.team1.name] || { points: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0 };
  standingsB[match.team2.name] = standingsB[match.team2.name] || { points: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0 };

  // Aggiorna i dati della squadra
  standingsB[match.team1.name].points += points.team1Points;
  standingsB[match.team2.name].points += points.team2Points;

  standingsB[match.team1.name].goalsFor += result.team1Goals;
  standingsB[match.team2.name].goalsFor += result.team2Goals;

  standingsB[match.team1.name].goalsAgainst += result.team2Goals;
  standingsB[match.team2.name].goalsAgainst += result.team1Goals;

  if (points.team1Points === 3) {
    standingsB[match.team1.name].wins++;
    standingsB[match.team2.name].losses++;
  } else if (points.team2Points === 3) {
    standingsB[match.team2.name].wins++;
    standingsB[match.team1.name].losses++;
  } else {
    standingsB[match.team1.name].draws++;
    standingsB[match.team2.name].draws++;
  }
}
function updateStandingsC(match, result, points) {
  // Crea un oggetto vuoto per la classifica della Serie B se non esiste già
  standingsC[match.team1.name] = standingsC[match.team1.name] || { points: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0 };
  standingsC[match.team2.name] = standingsC[match.team2.name] || { points: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0 };

  // Aggiorna i dati della squadra
  standingsC[match.team1.name].points += points.team1Points;
  standingsC[match.team2.name].points += points.team2Points;

  standingsC[match.team1.name].goalsFor += result.team1Goals;
  standingsC[match.team2.name].goalsFor += result.team2Goals;

  standingsC[match.team1.name].goalsAgainst += result.team2Goals;
  standingsC[match.team2.name].goalsAgainst += result.team1Goals;

  if (points.team1Points === 3) {
    standingsC[match.team1.name].wins++;
    standingsC[match.team2.name].losses++;
  } else if (points.team2Points === 3) {
    standingsC[match.team2.name].wins++;
    standingsC[match.team1.name].losses++;
  } else {
    standingsC[match.team1.name].draws++;
    standingsC[match.team2.name].draws++;
  }
}
function displayRoundRobin(rounds, totalDays) {
  const container = document.getElementById('serieA');

  rounds.forEach((round, i) => {
    const roundDiv = document.createElement('div');
    const day = totalDays ? `Giornata ${totalDays - rounds.length + i + 1}` : `Giornata ${i + 1}`;
    roundDiv.innerHTML = `<h2>${day}</h2>`;
    round.forEach(match => {
      const result = generateMatchResult();
      const points = calculatePoints(result);

      updateStandingsA(match, result, points);

      const matchDiv = document.createElement('div');
      matchDiv.innerHTML = `<p>${match.team1.name} ${result.team1Goals} - ${result.team2Goals} ${match.team2.name}</p>`;
      roundDiv.appendChild(matchDiv);
    });
    container.appendChild(roundDiv);
  });
}
function displayRoundRobinB(rounds, totalDays) {
  const container = document.getElementById('serieB');

  rounds.forEach((round, i) => {
    const roundDiv = document.createElement('div');
    const day = totalDays ? `Giornata ${totalDays - rounds.length + i + 1}` : `Giornata ${i + 1}`;
    roundDiv.innerHTML = `<h2>${day}</h2>`;
    round.forEach(match => {
      const result = generateMatchResult();
      const points = calculatePoints(result);

      updateStandingsB(match, result, points);

      const matchDiv = document.createElement('div');
      matchDiv.innerHTML = `<p>${match.team1.name} ${result.team1Goals} - ${result.team2Goals} ${match.team2.name}</p>`;
      roundDiv.appendChild(matchDiv);
    });
    container.appendChild(roundDiv);
  });
}
function displayRoundRobinC(rounds, totalDays) {
  const container = document.getElementById('serieC');

  rounds.forEach((round, i) => {
    const roundDiv = document.createElement('div');
    const day = totalDays ? `Giornata ${totalDays - rounds.length + i + 1}` : `Giornata ${i + 1}`;
    roundDiv.innerHTML = `<h2>${day}</h2>`;
    round.forEach(match => {
      const result = generateMatchResult();
      const points = calculatePoints(result);

      updateStandingsC(match, result, points);

      const matchDiv = document.createElement('div');
      matchDiv.innerHTML = `<p>${match.team1.name} ${result.team1Goals} - ${result.team2Goals} ${match.team2.name}</p>`;
      roundDiv.appendChild(matchDiv);
    });
    container.appendChild(roundDiv);
  });
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

function generateMatchResult() {
  return {
    team1Goals: Math.floor(Math.random() * 5),
    team2Goals: Math.floor(Math.random() * 4)
  };
}

function displayStandings(standingsA) {
  const container = document.getElementById('serieA');
  const standingsDiv = document.createElement('div');
  standingsDiv.innerHTML = '<h2>Classifica</h2>';
  standingsDiv.id = 'classificaA';

  // Converti l'oggetto in un array di oggetti, includendo il nome della squadra
  const standingsArray = Object.entries(standingsA).map(([name, stats]) => ({ name, ...stats }));

  // Ordina l'array in base ai punti
  standingsArray.sort((a, b) => b.points - a.points);

  // Creazione della tabella
  const table = document.createElement('table');
  table.innerHTML = '<tr><th>Squadra</th><th>Punti</th><th>Vittorie</th><th>Pareggi</th><th>Sconfitte</th><th>Gol Fatti</th><th>Gol Subiti</th></tr>';

  standingsArray.forEach(team => {
    const row = table.insertRow();
    row.innerHTML = `<td>${team.name}</td><td>${team.points}</td><td>${team.wins || 0}</td><td>${team.draws || 0}</td><td>${team.losses || 0}</td><td>${team.goalsFor || 0}</td><td>${team.goalsAgainst || 0}</td>`;
  });

  standingsDiv.appendChild(table);
  container.appendChild(standingsDiv);
}
function displayStandingsB(standingsB) {
  const container = document.getElementById('serieB');
  const standingsDiv = document.createElement('div');
  standingsDiv.innerHTML = '<h2>Classifica</h2>';
  standingsDiv.id = 'classificaB';

  // Converti l'oggetto in un array di oggetti, includendo il nome della squadra
  const standingsArray = Object.entries(standingsB).map(([name, stats]) => ({ name, ...stats }));

  // Ordina l'array in base ai punti
  standingsArray.sort((a, b) => b.points - a.points);

  // Creazione della tabella
  const table = document.createElement('table');
  table.innerHTML = '<tr><th>Squadra</th><th>Punti</th><th>Vittorie</th><th>Pareggi</th><th>Sconfitte</th><th>Gol Fatti</th><th>Gol Subiti</th></tr>';

  standingsArray.forEach(team => {
    const row = table.insertRow();
    row.innerHTML = `<td>${team.name}</td><td>${team.points}</td><td>${team.wins || 0}</td><td>${team.draws || 0}</td><td>${team.losses || 0}</td><td>${team.goalsFor || 0}</td><td>${team.goalsAgainst || 0}</td>`;
  });

  standingsDiv.appendChild(table);
  container.appendChild(standingsDiv);
}

function displayStandingsC(standingsC) {
  const container = document.getElementById('serieC');
  const standingsDiv = document.createElement('div');
  standingsDiv.innerHTML = '<h2>Classifica</h2>';
  standingsDiv.id = 'classificaC';

  // Converti l'oggetto in un array di oggetti, includendo il nome della squadra
  const standingsArray = Object.entries(standingsC).map(([name, stats]) => ({ name, ...stats }));

  // Ordina l'array in base ai punti
  standingsArray.sort((a, b) => b.points - a.points);

  // Creazione della tabella
  const table = document.createElement('table');
  table.innerHTML = '<tr><th>Squadra</th><th>Punti</th><th>Vittorie</th><th>Pareggi</th><th>Sconfitte</th><th>Gol Fatti</th><th>Gol Subiti</th></tr>';

  standingsArray.forEach(team => {
    const row = table.insertRow();
    row.innerHTML = `<td>${team.name}</td><td>${team.points}</td><td>${team.wins || 0}</td><td>${team.draws || 0}</td><td>${team.losses || 0}</td><td>${team.goalsFor || 0}</td><td>${team.goalsAgainst || 0}</td>`;
  });

  standingsDiv.appendChild(table);
  container.appendChild(standingsDiv);
}

function sortStandings(standings) {
  // Converti l'oggetto in un array
  let standingsArray = Object.keys(standings).map((team) => {
    return {
      team: team,
      ...standings[team]
    };
  });

  // Ordina l'array in base ai punti
  standingsArray.sort((a, b) => b.points - a.points);

  return standingsArray;
}


document.getElementById('simulaStagione').addEventListener('click', function () {
  standingsA = {};
  standingsB = {};
  standingsC = {};

  // Svuota i contenitori delle giornate e delle classifiche
  document.getElementById('serieA').innerHTML = '';
  document.getElementById('serieB').innerHTML = '';
  document.getElementById('serieC').innerHTML = '';


  shuffleArray(serieA);
  const rounds = generateRoundRobin(serieA);
  const returnRounds = generateReturnRound(rounds);
  displayRoundRobin(rounds, rounds.length);
  displayRoundRobin(returnRounds, rounds.length * 2);
  displayStandings(standingsA);
  let sortedStandingsA = sortStandings(standingsA);
  console.log(sortedStandingsA);

  shuffleArray(serieB);
  const roundsB = generateRoundRobin(serieB);
  const returnRoundsB = generateReturnRound(roundsB);
  displayRoundRobinB(roundsB, roundsB.length);
  displayRoundRobinB(returnRoundsB, roundsB.length * 2);
  displayStandingsB(standingsB);
  let sortedStandingsB = sortStandings(standingsB);
  console.log(sortedStandingsB);

  shuffleArray(serieC);
  const roundsC = generateRoundRobin(serieC);
  const returnRoundsC = generateReturnRound(roundsC);
  displayRoundRobinC(roundsC, roundsC.length);
  displayRoundRobinC(returnRoundsC, roundsC.length * 2);
  displayStandingsC(standingsC);
  let sortedStandingsC = sortStandings(standingsC);
  console.log(sortedStandingsC);

  // Al termine della stagione, esegui la funzione per promozioni e retrocessioni
  [serieA, serieB, serieC] = handlePromotionsAndRelegations(standingsA, standingsB, standingsC, serieA, serieB, serieC);

});
function handlePromotionsAndRelegations(standingsA, standingsB, standingsC, serieA, serieB, serieC) {
  // Converti l'oggetto standingsA in un array e ordina in base ai punti
  let sortedStandingsA = Object.entries(standingsA)
    .map(([name, stats]) => ({ name, ...stats }))
    .sort((a, b) => b.points - a.points);

  // Prendi le ultime quattro squadre da sortedStandingsA
  let bottomFour = sortedStandingsA.slice(-4);

  // Crea un array con solo i nomi delle squadre
  let teamNamesA = bottomFour.map(team => team.name);

  // Crea una copia di serieA
  let serieACopy = [...serieA];

  // Trova le stesse squadre in serieACopy
  let relegatedFromAToB = serieACopy.filter(team => teamNamesA.includes(team.name));

  // Rimuovi le squadre retrocesse da serieA
  serieA = serieA.filter(team => !teamNamesA.includes(team.name));

  // Converti l'oggetto standingsB in un array e ordina in base ai punti
  let sortedStandingsB = Object.entries(standingsB)
    .map(([name, stats]) => ({ name, ...stats }))
    .sort((a, b) => b.points - a.points);

  // Prendi le prime quattro squadre da sortedStandingsB
  let topFourB = sortedStandingsB.slice(0, 4);

  // Crea un array con solo i nomi delle squadre
  let teamNamesBA = topFourB.map(team => team.name);

  // Crea una copia di serieA
  let serieBCopy = [...serieB];

  // Trova le stesse squadre in serieB
  let promotedFromBToA = serieBCopy.filter(team => teamNamesBA.includes(team.name));

  // Rimuovi le squadre promosse da serieB
  serieB = serieB.filter(team => !teamNamesBA.includes(team.name));
  // Prendi le ultime quattro squadre da sortedStandingsB
  let bottomFourB = sortedStandingsB.slice(-4);

  // Crea un array con solo i nomi delle squadre
  let teamNamesBC = bottomFourB.map(team => team.name);


  // Trova le stesse squadre in serieBCopy
  let relegatedFromBToC = serieBCopy.filter(team => teamNamesBC.includes(team.name));

  // Rimuovi le squadre retrocesse da serieB
  serieB = serieB.filter(team => !teamNamesBC.includes(team.name));

  // Converti l'oggetto standingsC in un array e ordina in base ai punti
  let sortedStandingsC = Object.entries(standingsC)
    .map(([name, stats]) => ({ name, ...stats }))
    .sort((a, b) => b.points - a.points);

  // Prendi le prime quattro squadre da sortedStandingsC
  let topFourC = sortedStandingsC.slice(0, 4);

  // Crea un array con solo i nomi delle squadre
  let teamNamesC = topFourC.map(team => team.name);

  // Crea una copia di serieC
  let serieCCopy = [...serieC];

  // Trova le stesse squadre in serieC
  let promotedFromCToB = serieCCopy.filter(team => teamNamesC.includes(team.name));

  // Rimuovi le squadre promosse da serieC
  serieC = serieC.filter(team => !teamNamesC.includes(team.name));


  // Aggiungi le squadre retrocesse a serieB
  serieB.push(...relegatedFromAToB);
  // Aggiungi le squadre promosse a serieA
  serieA.push(...promotedFromBToA);
  // Aggiungi le squadre retrocesse a serieC
  serieC.push(...relegatedFromBToC);
  // Aggiungi le squadre promosse a serieB
  serieB.push(...promotedFromCToB);


  console.log("Retrocessioni da A a B:", relegatedFromAToB);
  console.log("Promozioni da B a A:", promotedFromBToA);
  console.log("Retrocessioni da B a C:", relegatedFromBToC);
  console.log("Promozioni da C a B:", promotedFromCToB);
  console.log("Serie A dopo le retrocessioni e le promozioni:", serieA);
  console.log("Serie B dopo le retrocessioni e le promozioni:", serieB);
  console.log("Serie C dopo le retrocessioni e le promozioni:", serieC);

  return [serieA, serieB, serieC];
}






