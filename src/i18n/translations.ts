export const translations = {
  en: {
    // App header
    title: "Generating the number π using the Monte Carlo method",
    description:
      "Laboratory simulator determining the value of Pi by randomly placing points in a unit square. The ratio of points inside the quarter circle to all points approximates the ratio of areas π/4.",

    // Control Panel
    controlPanel: "Control Panel",
    currentN: "Current N:",
    calculatedPi: "Calculated π:",
    referenceValue: "Reference value:",
    simulationProgress: "Simulation progress",
    processing: "Processing...",
    runSimulation: "Run Simulation",

    // Results Table
    resultsTable: "Results Table",
    numberOfTrials: "Number of trials (N)",
    piValue: "π Value",
    absoluteError: "Absolute error",
    relativeError: "Relative error [%]",
    runSimulationToSeeResults: "Run simulation to see results",

    // Convergence Chart
    convergenceChart: "π Value Convergence Chart",
    numberOfTrialsAxis: "Number of trials (N)",
    calculatedPiLegend: "Calculated π",

    // Canvas Visualization
    visualization: "Visualization (First 5000 pts)",
    blueInside: "Blue: Inside circle (x² + y² ≤ 1)",
    redOutside: "Red: Outside",
  },

  pl: {
    // App header
    title: "Generowanie liczby π metodą Monte Carlo",
    description:
      "Symulator laboratoryjny wyznaczający wartość liczby Pi poprzez losowanie punktów w kwadracie jednostkowym. Stosunek punktów wewnątrz ćwiartki koła do wszystkich punktów przybliża stosunek pól π/4.",

    // Control Panel
    controlPanel: "Panel Sterowania",
    currentN: "Aktualne N:",
    calculatedPi: "Obliczone π:",
    referenceValue: "Wartość ref.:",
    simulationProgress: "Postęp symulacji",
    processing: "Przetwarzanie...",
    runSimulation: "Uruchom Symulację",

    // Results Table
    resultsTable: "Tabela Wyników",
    numberOfTrials: "Liczba prób (N)",
    piValue: "Wartość π",
    absoluteError: "Błąd bezwzględny",
    relativeError: "Błąd względny [%]",
    runSimulationToSeeResults: "Uruchom symulację, aby zobaczyć wyniki",

    // Convergence Chart
    convergenceChart: "Wykres zbieżności wartości π",
    numberOfTrialsAxis: "Liczba prób (N)",
    calculatedPiLegend: "Obliczone π",

    // Canvas Visualization
    visualization: "Wizualizacja (Pierwsze 5000 pkt)",
    blueInside: "Niebieskie: Wewnątrz koła (x² + y² ≤ 1)",
    redOutside: "Czerwone: Na zewnątrz",
  },

  it: {
    // App header
    title: "Generazione del numero π con il metodo Monte Carlo",
    description:
      "Simulatore di laboratorio che determina il valore di Pi posizionando casualmente punti in un quadrato unitario. Il rapporto tra i punti all'interno del quarto di cerchio e tutti i punti approssima il rapporto delle aree π/4.",

    // Control Panel
    controlPanel: "Pannello di Controllo",
    currentN: "N attuale:",
    calculatedPi: "π calcolato:",
    referenceValue: "Valore rif.:",
    simulationProgress: "Avanzamento simulazione",
    processing: "Elaborazione...",
    runSimulation: "Avvia Simulazione",

    // Results Table
    resultsTable: "Tabella dei Risultati",
    numberOfTrials: "Numero di prove (N)",
    piValue: "Valore π",
    absoluteError: "Errore assoluto",
    relativeError: "Errore relativo [%]",
    runSimulationToSeeResults: "Avvia la simulazione per vedere i risultati",

    // Convergence Chart
    convergenceChart: "Grafico di convergenza del valore π",
    numberOfTrialsAxis: "Numero di prove (N)",
    calculatedPiLegend: "π calcolato",

    // Canvas Visualization
    visualization: "Visualizzazione (Primi 5000 pti)",
    blueInside: "Blu: Dentro il cerchio (x² + y² ≤ 1)",
    redOutside: "Rosso: Fuori",
  },
} as const;

export type Language = keyof typeof translations;
export type TranslationKey = keyof (typeof translations)["en"];
