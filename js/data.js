// js/data.js (ES module)
// Datengrundlage für das Dashboard:
// 1) Eignung der Items (Zählung Indikatoren)
// 2) Vergleich Mensch vs. KI auf Itemebene

// ------------------------------------------------------
// 1. Eignung der Items (geeignet / bedingt / nicht geeignet)
// ------------------------------------------------------

export const itemEignungData = [
  {
    basisdimension: "Kognitive Aktivierung",
    itemCode: "KA1",
    itemLabel: "Verständnisorientierung",
    totalIndicators: 11,
    suitable: 11,
    partlySuitable: 0,
    notSuitable: 0
  },
  {
    basisdimension: "Kognitive Aktivierung",
    itemCode: "KA2",
    itemLabel: "Ermittlung von Denkweisen und Vorstellungen",
    totalIndicators: 9,
    suitable: 8,
    partlySuitable: 1,
    notSuitable: 0
  },
  {
    basisdimension: "Kognitive Aktivierung",
    itemCode: "KA3",
    itemLabel: "Herausfordernde Aufgaben und Fragen",
    totalIndicators: 10,
    suitable: 10,
    partlySuitable: 0,
    notSuitable: 0
  },
  {
    basisdimension: "Kognitive Aktivierung",
    itemCode: "KA4",
    itemLabel: "Engagement der Schülerinnen und Schüler",
    totalIndicators: 10,
    suitable: 7,
    partlySuitable: 2,
    notSuitable: 1
  },
  {
    basisdimension: "Konstruktive Unterstützung",
    itemCode: "KU1",
    itemLabel: "Qualität des Feedbacks",
    totalIndicators: 11,
    suitable: 11,
    partlySuitable: 0,
    notSuitable: 0
  },
  {
    basisdimension: "Konstruktive Unterstützung",
    itemCode: "KU2",
    itemLabel: "Individuelle Unterstützung im Lernprozess",
    totalIndicators: 9,
    suitable: 8,
    partlySuitable: 0,
    notSuitable: 1
  },
  {
    basisdimension: "Konstruktive Unterstützung",
    itemCode: "KU3",
    itemLabel: "Wertschätzung und Respekt",
    totalIndicators: 9,
    suitable: 7,
    partlySuitable: 1,
    notSuitable: 1
  },
  {
    basisdimension: "Konstruktive Unterstützung",
    itemCode: "KU4",
    itemLabel: "Klassenklima",
    totalIndicators: 11,
    suitable: 7,
    partlySuitable: 4,
    notSuitable: 0
  },
  {
    basisdimension: "Strukturierte Klassenführung",
    itemCode: "SK1",
    itemLabel: "Störungen durch Schülerinnen und Schüler",
    totalIndicators: 7,
    suitable: 5,
    partlySuitable: 2,
    notSuitable: 0
  },
  {
    basisdimension: "Strukturierte Klassenführung",
    itemCode: "SK2",
    itemLabel: "Monitoring",
    totalIndicators: 10,
    suitable: 0,
    partlySuitable: 7,
    notSuitable: 3
  },
  {
    basisdimension: "Strukturierte Klassenführung",
    itemCode: "SK3",
    itemLabel: "Zeitnutzung",
    totalIndicators: 11,
    suitable: 8,
    partlySuitable: 2,
    notSuitable: 1
  }
];

// ------------------------------------------------------
// 2. Vergleich Mensch vs. KI auf Itemebene
// ------------------------------------------------------
// Felder:
// basisdimension        – KA / KU / SK Ebene
// itemCode              – Itemkürzel
// itemLabel             – Itembezeichnung
// nPairs                – Anzahl der vorhandenen Wertepaarungen
// nIdentical            – Anzahl identischer Ratings (Mensch == KI)
// percIdentical         – Anteil identischer Ratings in Prozent
// meanAbsDiff           – mittlere absolute Differenz (Skalenstufen)
// maxDiff               – maximale Differenz (Skalenstufen)
// meanHuman             – Mittelwert menschliche Ratings
// meanKI                – Mittelwert KI Ratings
// correlation           – Korrelation Mensch–KI (falls berichtet, sonst null)

export const itemCompareData = [
  // Kognitive Aktivierung
  {
    basisdimension: "Kognitive Aktivierung",
    itemCode: "KA1",
    itemLabel: "Verständnisorientierung",
    totalIndicators: 11,
    suitable: 11,
    partlySuitable: 0,
    notSuitable: 0,
    meanHuman: 3.69,
    meanKI: 4.00,
    nPairs: 18,
    nIdentical: 11,
    meanAbsDiff: 0.31,
    maxDiff: 1.0,
    correlation: null
  },
  {
    basisdimension: "Kognitive Aktivierung",
    itemCode: "KA2",
    itemLabel: "Ermittlung von Denkweisen und Vorstellungen",
    totalIndicators: 9,
    suitable: 8,
    partlySuitable: 1,
    notSuitable: 0,
    meanHuman: 3.38,
    meanKI: 3.61,
    nPairs: 17,
    nIdentical: 7,
    meanAbsDiff: 0.50,
    maxDiff: 1.5,
    correlation: 0.46
  },
  {
    basisdimension: "Kognitive Aktivierung",
    itemCode: "KA3",
    itemLabel: "Herausfordernde Aufgaben und Fragen",
    totalIndicators: 10,
    suitable: 10,
    partlySuitable: 0,
    notSuitable: 0,
    meanHuman: 3.15,
    meanKI: 3.28,
    nPairs: 17,
    nIdentical: 6,
    meanAbsDiff: 0.56,
    maxDiff: 1.0,
    correlation: 0.40
  },
  {
    basisdimension: "Kognitive Aktivierung",
    itemCode: "KA4",
    itemLabel: "Engagement der Schülerinnen und Schüler",
    totalIndicators: 10,
    suitable: 7,
    partlySuitable: 2,
    notSuitable: 1,
    meanHuman: 3.92,
    meanKI: 3.33,
    nPairs: 18,
    nIdentical: 7,
    meanAbsDiff: 0.58,
    maxDiff: 1.0,
    correlation: 0.24
  },

  // Konstruktive Unterstützung
  {
    basisdimension: "Konstruktive Unterstützung",
    itemCode: "KU1",
    itemLabel: "Qualität des Feedbacks",
    totalIndicators: 11,
    suitable: 11,
    partlySuitable: 0,
    notSuitable: 0,
    meanHuman: 2.44,
    meanKI: 3.89,
    nPairs: 17,
    nIdentical: 1,
    meanAbsDiff: 1.50,
    maxDiff: 2.5,
    correlation: -0.34
  },
  {
    basisdimension: "Konstruktive Unterstützung",
    itemCode: "KU2",
    itemLabel: "Individuelle Unterstützung im Lernprozess",
    totalIndicators: 9,
    suitable: 8,
    partlySuitable: 0,
    notSuitable: 1,
    meanHuman: 2.71,
    meanKI: 3.06,
    nPairs: 17,
    nIdentical: 7,
    meanAbsDiff: 0.47,
    maxDiff: 1.0,
    correlation: 0.57
  },
  {
    basisdimension: "Konstruktive Unterstützung",
    itemCode: "KU3",
    itemLabel: "Wertschätzung und Respekt",
    totalIndicators: 9,
    suitable: 7,
    partlySuitable: 1,
    notSuitable: 1,
    meanHuman: 2.94,
    meanKI: 3.89,
    nPairs: 17,
    nIdentical: 1,
    meanAbsDiff: 0.94,
    maxDiff: 1.5,
    correlation: 0.48
  },
  {
    basisdimension: "Konstruktive Unterstützung",
    itemCode: "KU4",
    itemLabel: "Klassenklima",
    totalIndicators: 11,
    suitable: 7,
    partlySuitable: 4,
    notSuitable: 0,
    meanHuman: 4.00,
    meanKI: 3.33,
    nPairs: 18,
    nIdentical: 6,
    meanAbsDiff: 0.67,
    maxDiff: 1.0,
    correlation: null
  },

  // Strukturierte Klassenführung
  {
    basisdimension: "Strukturierte Klassenführung",
    itemCode: "SK1",
    itemLabel: "Störungen durch Schülerinnen und Schüler",
    totalIndicators: 7,
    suitable: 5,
    partlySuitable: 2,
    notSuitable: 0,
    meanHuman: 3.97,
    meanKI: 4.00,
    nPairs: 18,
    nIdentical: 17,
    meanAbsDiff: 0.03,
    maxDiff: 0.5,
    correlation: null
  },
  {
    basisdimension: "Strukturierte Klassenführung",
    itemCode: "SK2",
    itemLabel: "Monitoring",
    totalIndicators: 10,
    suitable: 0,
    partlySuitable: 7,
    notSuitable: 3,
    meanHuman: 3.97,
    meanKI: 3.00,
    nPairs: 18,
    nIdentical: 0,
    meanAbsDiff: 0.97,
    maxDiff: 1.0,
    correlation: null
  },
  {
    basisdimension: "Strukturierte Klassenführung",
    itemCode: "SK3",
    itemLabel: "Zeitnutzung",
    totalIndicators: 11,
    suitable: 8,
    partlySuitable: 2,
    notSuitable: 1,
    meanHuman: 3.79,
    meanKI: 3.94,
    nPairs: 17,
    nIdentical: 12,
    meanAbsDiff: 0.26,
    maxDiff: 1.0,
    correlation: -0.13
  }
];

// ------------------------------------------------------
// Indikatoren: alle Items, inkl. Beschreibung, 99%-Anteil und Eignung
// ------------------------------------------------------

export const indicatorData = [
  // 4.1 Kognitive Aktivierung
  // 4.1.1 Verständnisorientierung (KA1)
  {
    basisdimension: "Kognitive Aktivierung",
    itemCode: "KA1",
    itemLabel: "Verständnisorientierung",
    indicatorId: "KA1_1",
    indicatorLabel: "Indikator 1",
    description: "In der Stunde wird deutlich, was die Schülerinnen und Schüler am Ende einer Einheit können, verstanden oder kritisch reflektiert haben sollen.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Kognitive Aktivierung",
    itemCode: "KA1",
    itemLabel: "Verständnisorientierung",
    indicatorId: "KA1_2",
    indicatorLabel: "Indikator 2",
    description: "Die Lehrkraft fokussiert ihren Unterricht auf die zentralen zu erwerbenden Inhalte.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Kognitive Aktivierung",
    itemCode: "KA1",
    itemLabel: "Verständnisorientierung",
    indicatorId: "KA1_3",
    indicatorLabel: "Indikator 3",
    description: "Der Unterricht ist so gestaltet, dass er es den Schülerinnen und Schülern ermöglicht, die zentralen Inhalte zu verstehen.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Kognitive Aktivierung",
    itemCode: "KA1",
    itemLabel: "Verständnisorientierung",
    indicatorId: "KA1_4",
    indicatorLabel: "Indikator 4",
    description: "Der Bezug zu den zentralen Inhalten wird im Verlauf der Stunde immer wieder hergestellt.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Kognitive Aktivierung",
    itemCode: "KA1",
    itemLabel: "Verständnisorientierung",
    indicatorId: "KA1_5",
    indicatorLabel: "Indikator 5",
    description: "Die Lehrkraft hebt bedeutsame Inhalte hervor.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Kognitive Aktivierung",
    itemCode: "KA1",
    itemLabel: "Verständnisorientierung",
    indicatorId: "KA1_6",
    indicatorLabel: "Indikator 6",
    description: "Unterrichtsinhalte werden mit Blick auf das Unterrichtsziel zusammengefasst.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Kognitive Aktivierung",
    itemCode: "KA1",
    itemLabel: "Verständnisorientierung",
    indicatorId: "KA1_7",
    indicatorLabel: "Indikator 7",
    description: "Die zu erwerbenden Inhalte werden klar und verständlich dargestellt.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Kognitive Aktivierung",
    itemCode: "KA1",
    itemLabel: "Verständnisorientierung",
    indicatorId: "KA1_8",
    indicatorLabel: "Indikator 8",
    description: "Es gibt lange Unterrichtsphasen, die nicht auf das jeweilige Lernziel ausgerichtet sind.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Kognitive Aktivierung",
    itemCode: "KA1",
    itemLabel: "Verständnisorientierung",
    indicatorId: "KA1_9",
    indicatorLabel: "Indikator 9",
    description: "Es bleibt unklar, was das Ziel der eingesetzten Aufgaben ist.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Kognitive Aktivierung",
    itemCode: "KA1",
    itemLabel: "Verständnisorientierung",
    indicatorId: "KA1_10",
    indicatorLabel: "Indikator 10",
    description: "Es wird nicht erkennbar, welchen Fortschritt die Lernenden im Verlauf der Stunde oder der Einheit machen sollen.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Kognitive Aktivierung",
    itemCode: "KA1",
    itemLabel: "Verständnisorientierung",
    indicatorId: "KA1_11",
    indicatorLabel: "Indikator 11",
    description: "In den vermittelten Inhalten stecken offensichtliche fachliche Fehler.",
    perc99: 0.0,
    suitability: "geeignet"
  },

  // 4.1.2 Ermittlung von Denkweisen und Vorstellungen (KA2)
  {
    basisdimension: "Kognitive Aktivierung",
    itemCode: "KA2",
    itemLabel: "Ermittlung von Denkweisen und Vorstellungen",
    indicatorId: "KA2_1",
    indicatorLabel: "Indikator 1",
    description: "Die Lehrkraft macht sich durch Blicke in Schülerhefte, Kontrolle von Lösungen oder kurze diagnostische Aufgaben ein Bild vom aktuellen Kenntnisstand der Schülerinnen und Schüler.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Kognitive Aktivierung",
    itemCode: "KA2",
    itemLabel: "Ermittlung von Denkweisen und Vorstellungen",
    indicatorId: "KA2_2",
    indicatorLabel: "Indikator 2",
    description: "Die Lehrkraft sammelt unterschiedliche Schülerbeiträge und hält sich dabei selbst zurück.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Kognitive Aktivierung",
    itemCode: "KA2",
    itemLabel: "Ermittlung von Denkweisen und Vorstellungen",
    indicatorId: "KA2_3",
    indicatorLabel: "Indikator 3",
    description: "Die Lehrkraft befragt die Schülerinnen und Schüler nach ihren Ideen und Vorstellungen zu einem Thema.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Kognitive Aktivierung",
    itemCode: "KA2",
    itemLabel: "Ermittlung von Denkweisen und Vorstellungen",
    indicatorId: "KA2_4",
    indicatorLabel: "Indikator 4",
    description: "Die Lehrkraft fragt nach, wie Schülerinnen und Schüler zu ihren Vorstellungen oder Antworten gekommen sind.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Kognitive Aktivierung",
    itemCode: "KA2",
    itemLabel: "Ermittlung von Denkweisen und Vorstellungen",
    indicatorId: "KA2_5",
    indicatorLabel: "Indikator 5",
    description: "Die Lernenden werden aufgefordert, ihre Antworten zu begründen.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Kognitive Aktivierung",
    itemCode: "KA2",
    itemLabel: "Ermittlung von Denkweisen und Vorstellungen",
    indicatorId: "KA2_6",
    indicatorLabel: "Indikator 6",
    description: "Die Lehrkraft erfragt, was die Schülerinnen und Schüler verstanden bzw. nicht verstanden haben.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Kognitive Aktivierung",
    itemCode: "KA2",
    itemLabel: "Ermittlung von Denkweisen und Vorstellungen",
    indicatorId: "KA2_7",
    indicatorLabel: "Indikator 7",
    description: "Die Lehrkraft steigt direkt in das Thema ein, ohne das Vorwissen der Schülerinnen und Schüler zu berücksichtigen.",
    perc99: 44.4,
    suitability: "bedingt geeignet"
  },
  {
    basisdimension: "Kognitive Aktivierung",
    itemCode: "KA2",
    itemLabel: "Ermittlung von Denkweisen und Vorstellungen",
    indicatorId: "KA2_8",
    indicatorLabel: "Indikator 8",
    description: "Mündliche Interaktionsformen wie Nachfragen oder Aufforderungen zu erklären oder zu begründen werden von der Lehrkraft nicht genutzt, um das Vorwissen und die Präkonzepte der Schülerinnen und Schüler zu ermitteln.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Kognitive Aktivierung",
    itemCode: "KA2",
    itemLabel: "Ermittlung von Denkweisen und Vorstellungen",
    indicatorId: "KA2_9",
    indicatorLabel: "Indikator 9",
    description: "Schülerbeiträge werden nicht genutzt, um das Verständnisniveau zu explorieren.",
    perc99: 0.0,
    suitability: "geeignet"
  },

  // 4.1.3 Herausfordernde Aufgaben und Fragen (KA3)
  {
    basisdimension: "Kognitive Aktivierung",
    itemCode: "KA3",
    itemLabel: "Herausfordernde Aufgaben und Fragen",
    indicatorId: "KA3_1",
    indicatorLabel: "Indikator 1",
    description: "Die von der Lehrkraft gestellten Fragen und Aufgaben können nicht nur mit Ja oder Nein beantwortet werden.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Kognitive Aktivierung",
    itemCode: "KA3",
    itemLabel: "Herausfordernde Aufgaben und Fragen",
    indicatorId: "KA3_2",
    indicatorLabel: "Indikator 2",
    description: "Die von der Lehrkraft gestellten Fragen und Aufgaben gehen über die reine Reproduktion von auswendig gelerntem Wissen oder der Anwendung von Prozeduren hinaus.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Kognitive Aktivierung",
    itemCode: "KA3",
    itemLabel: "Herausfordernde Aufgaben und Fragen",
    indicatorId: "KA3_3",
    indicatorLabel: "Indikator 3",
    description: "Die Schülerinnen und Schüler werden aufgefordert, eigene Lösungsideen zu entwickeln.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Kognitive Aktivierung",
    itemCode: "KA3",
    itemLabel: "Herausfordernde Aufgaben und Fragen",
    indicatorId: "KA3_4",
    indicatorLabel: "Indikator 4",
    description: "Unterschiedliche Meinungen, Lösungen oder Fälle werden einander kontrastierend gegenübergestellt.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Kognitive Aktivierung",
    itemCode: "KA3",
    itemLabel: "Herausfordernde Aufgaben und Fragen",
    indicatorId: "KA3_5",
    indicatorLabel: "Indikator 5",
    description: "Die Lehrkraft konfrontiert die Schülerinnen und Schüler mit widersprüchlichen Sachverhalten.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Kognitive Aktivierung",
    itemCode: "KA3",
    itemLabel: "Herausfordernde Aufgaben und Fragen",
    indicatorId: "KA3_6",
    indicatorLabel: "Indikator 6",
    description: "Die Schülerinnen und Schüler werden zu Selbsterklärungen angehalten.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Kognitive Aktivierung",
    itemCode: "KA3",
    itemLabel: "Herausfordernde Aufgaben und Fragen",
    indicatorId: "KA3_7",
    indicatorLabel: "Indikator 7",
    description: "Die Schülerinnen und Schüler übernehmen selbst die Rolle der Lehrkraft und stellen Fragen, fordern Antworten oder Erklärungen ein oder fassen zusammen.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Kognitive Aktivierung",
    itemCode: "KA3",
    itemLabel: "Herausfordernde Aufgaben und Fragen",
    indicatorId: "KA3_8",
    indicatorLabel: "Indikator 8",
    description: "Trotz herausfordernder Fragestellungen versucht die Lehrkraft durch kleinschrittiges Vorgehen bei der Bearbeitung, die Schülerinnen und Schüler zu einer bestimmten Antwort zu bringen.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Kognitive Aktivierung",
    itemCode: "KA3",
    itemLabel: "Herausfordernde Aufgaben und Fragen",
    indicatorId: "KA3_9",
    indicatorLabel: "Indikator 9",
    description: "Unterschiedliche Lösungen werden einander kontrastierend gegenübergestellt, aber wichtige Zusammenhänge zwischen ihnen werden nicht hergestellt.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Kognitive Aktivierung",
    itemCode: "KA3",
    itemLabel: "Herausfordernde Aufgaben und Fragen",
    indicatorId: "KA3_10",
    indicatorLabel: "Indikator 10",
    description: "Im Unterrichtsgespräch verfolgt die Lehrkraft eine vorausgeplante Argumentationslinie, weshalb die Interaktion mit den Lernenden zu einer Art Versuch und Irrtum Spiel wird und Schülerantworten unberücksichtigt bleiben.",
    perc99: 0.0,
    suitability: "geeignet"
  },

  // 4.1.4 Engagement der Schülerinnen und Schüler (KA4)
  {
    basisdimension: "Kognitive Aktivierung",
    itemCode: "KA4",
    itemLabel: "Engagement der Schülerinnen und Schüler",
    indicatorId: "KA4_1",
    indicatorLabel: "Indikator 1",
    description: "Der Aufmerksamkeitsfokus der Schülerinnen und Schüler liegt auf dem Unterrichtsgeschehen.",
    perc99: 5.6,
    suitability: "geeignet"
  },
  {
    basisdimension: "Kognitive Aktivierung",
    itemCode: "KA4",
    itemLabel: "Engagement der Schülerinnen und Schüler",
    indicatorId: "KA4_2",
    indicatorLabel: "Indikator 2",
    description: "Die Schülerinnen und Schüler beteiligen sich durch Meldungen aktiv am Unterricht.",
    perc99: 61.1,
    suitability: "nicht geeignet"
  },
  {
    basisdimension: "Kognitive Aktivierung",
    itemCode: "KA4",
    itemLabel: "Engagement der Schülerinnen und Schüler",
    indicatorId: "KA4_3",
    indicatorLabel: "Indikator 3",
    description: "Die Schülerinnen und Schüler beteiligen sich auch mit längeren Beiträgen aktiv am Unterricht.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Kognitive Aktivierung",
    itemCode: "KA4",
    itemLabel: "Engagement der Schülerinnen und Schüler",
    indicatorId: "KA4_4",
    indicatorLabel: "Indikator 4",
    description: "Die Schülerinnen und Schüler stellen der Lehrkraft Fragen, wenn ihnen etwas ungeklärt oder unverständlich erscheint oder erklären, wie sie einen Sachverhalt verstanden haben.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Kognitive Aktivierung",
    itemCode: "KA4",
    itemLabel: "Engagement der Schülerinnen und Schüler",
    indicatorId: "KA4_5",
    indicatorLabel: "Indikator 5",
    description: "Die Lernenden zeigen Interesse und Freude am Unterricht.",
    perc99: 16.7,
    suitability: "bedingt geeignet"
  },
  {
    basisdimension: "Kognitive Aktivierung",
    itemCode: "KA4",
    itemLabel: "Engagement der Schülerinnen und Schüler",
    indicatorId: "KA4_6",
    indicatorLabel: "Indikator 6",
    description: "Die Schülerinnen und Schüler sind mit ihrer Aufmerksamkeit nicht beim Unterrichtsgeschehen.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Kognitive Aktivierung",
    itemCode: "KA4",
    itemLabel: "Engagement der Schülerinnen und Schüler",
    indicatorId: "KA4_7",
    indicatorLabel: "Indikator 7",
    description: "Die Schülerinnen und Schüler geben kurze, oberflächliche Antworten.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Kognitive Aktivierung",
    itemCode: "KA4",
    itemLabel: "Engagement der Schülerinnen und Schüler",
    indicatorId: "KA4_8",
    indicatorLabel: "Indikator 8",
    description: "Die Schülerinnen und Schüler beteiligen sich nur auf explizite Aufforderung der Lehrkraft.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Kognitive Aktivierung",
    itemCode: "KA4",
    itemLabel: "Engagement der Schülerinnen und Schüler",
    indicatorId: "KA4_9",
    indicatorLabel: "Indikator 9",
    description: "Schülerinnen und Schüler geben bei schwierigen Aufgaben schnell auf.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Kognitive Aktivierung",
    itemCode: "KA4",
    itemLabel: "Engagement der Schülerinnen und Schüler",
    indicatorId: "KA4_10",
    indicatorLabel: "Indikator 10",
    description: "Die Schülerinnen und Schüler wirken desinteressiert und lustlos.",
    perc99: 5.6,
    suitability: "bedingt geeignet"
  },

  // 4.2 Konstruktive Unterstützung
  // 4.2.1 Qualität des Feedbacks (KU1)
  {
    basisdimension: "Konstruktive Unterstützung",
    itemCode: "KU1",
    itemLabel: "Qualität des Feedbacks",
    indicatorId: "KU1_1",
    indicatorLabel: "Indikator 1",
    description: "Die Rückmeldungen und Kommentare der Lehrkraft helfen den Schülerinnen und Schülern dabei, ihre Fehler zu erkennen und ihr weiteres Vorgehen zu verbessern.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Konstruktive Unterstützung",
    itemCode: "KU1",
    itemLabel: "Qualität des Feedbacks",
    indicatorId: "KU1_2",
    indicatorLabel: "Indikator 2",
    description: "Es wird erarbeitet, warum eine Antwort oder eine Lösung richtig oder falsch war.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Konstruktive Unterstützung",
    itemCode: "KU1",
    itemLabel: "Qualität des Feedbacks",
    indicatorId: "KU1_3",
    indicatorLabel: "Indikator 3",
    description: "Die Lehrkraft fokussiert in ihren Rückmeldungen und Kommentaren auf den Prozess der Aufgabenlösung.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Konstruktive Unterstützung",
    itemCode: "KU1",
    itemLabel: "Qualität des Feedbacks",
    indicatorId: "KU1_4",
    indicatorLabel: "Indikator 4",
    description: "Korrekte Antworten der Schülerinnen und Schüler werden gewürdigt.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Konstruktive Unterstützung",
    itemCode: "KU1",
    itemLabel: "Qualität des Feedbacks",
    indicatorId: "KU1_5",
    indicatorLabel: "Indikator 5",
    description: "Die Lehrkraft formuliert Rückmeldungen in einem freundlichen, wohlwollenden Ton, auch wenn sie auf Fehler oder Mängel aufmerksam macht.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Konstruktive Unterstützung",
    itemCode: "KU1",
    itemLabel: "Qualität des Feedbacks",
    indicatorId: "KU1_6",
    indicatorLabel: "Indikator 6",
    description: "Die Lehrkraft stellt Schülerinnen und Schüler bei Fehlern nicht bloß.",
    perc99: 5.6,
    suitability: "geeignet"
  },
  {
    basisdimension: "Konstruktive Unterstützung",
    itemCode: "KU1",
    itemLabel: "Qualität des Feedbacks",
    indicatorId: "KU1_7",
    indicatorLabel: "Indikator 7",
    description: "Es wird deutlich, dass Fehler wichtig sind und helfen, zu lernen.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Konstruktive Unterstützung",
    itemCode: "KU1",
    itemLabel: "Qualität des Feedbacks",
    indicatorId: "KU1_8",
    indicatorLabel: "Indikator 8",
    description: "Die Lehrkraft nutzt Fehler, um auf unzutreffendes Verständnis der Schülerinnen und Schüler einzugehen.",
    perc99: 5.6,
    suitability: "geeignet"
  },
  {
    basisdimension: "Konstruktive Unterstützung",
    itemCode: "KU1",
    itemLabel: "Qualität des Feedbacks",
    indicatorId: "KU1_9",
    indicatorLabel: "Indikator 9",
    description: "Die Lehrkraft gibt unsachliche Rückmeldungen und Kommentare, welche sich auf die Person des Lernenden selbst beziehen.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Konstruktive Unterstützung",
    itemCode: "KU1",
    itemLabel: "Qualität des Feedbacks",
    indicatorId: "KU1_10",
    indicatorLabel: "Indikator 10",
    description: "Das Feedback der Lehrkraft beschränkt sich auf reine Instruktionen, die den Schülerinnen und Schülern den korrekten Lösungsweg aufzeigen.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Konstruktive Unterstützung",
    itemCode: "KU1",
    itemLabel: "Qualität des Feedbacks",
    indicatorId: "KU1_11",
    indicatorLabel: "Indikator 11",
    description: "Situationen, in denen Feedback notwendig wäre, werden nicht genutzt.",
    perc99: 0.0,
    suitability: "geeignet"
  },

  // 4.2.2 Individuelle Unterstützung im Lernprozess (KU2)
  {
    basisdimension: "Konstruktive Unterstützung",
    itemCode: "KU2",
    itemLabel: "Individuelle Unterstützung im Lernprozess",
    indicatorId: "KU2_1",
    indicatorLabel: "Indikator 1",
    description: "Die Lehrkraft nimmt sich bei Verständnisproblemen gezielt Zeit für einzelne Schülerinnen und Schüler.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Konstruktive Unterstützung",
    itemCode: "KU2",
    itemLabel: "Individuelle Unterstützung im Lernprozess",
    indicatorId: "KU2_2",
    indicatorLabel: "Indikator 2",
    description: "Nach Rückfragen erklärt die Lehrkraft klar und verständlich.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Konstruktive Unterstützung",
    itemCode: "KU2",
    itemLabel: "Individuelle Unterstützung im Lernprozess",
    indicatorId: "KU2_3",
    indicatorLabel: "Indikator 3",
    description: "Unterstützende Maßnahmen und Hilfestellungen der Lehrkraft sind individuell an den Lernstand der Schülerinnen und Schüler angepasst.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Konstruktive Unterstützung",
    itemCode: "KU2",
    itemLabel: "Individuelle Unterstützung im Lernprozess",
    indicatorId: "KU2_4",
    indicatorLabel: "Indikator 4",
    description: "Die Lehrkraft ermöglicht zum Beispiel durch individualisierte Arbeitsphasen eine Differenzierung des Anspruchsniveaus, des Lerntempos und der Inhalte.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Konstruktive Unterstützung",
    itemCode: "KU2",
    itemLabel: "Individuelle Unterstützung im Lernprozess",
    indicatorId: "KU2_5",
    indicatorLabel: "Indikator 5",
    description: "Die Lehrkraft gibt den Schülerinnen und Schülern genug Zeit, um überlegt auf Fragen antworten zu können.",
    perc99: 83.3,
    suitability: "nicht geeignet"
  },
  {
    basisdimension: "Konstruktive Unterstützung",
    itemCode: "KU2",
    itemLabel: "Individuelle Unterstützung im Lernprozess",
    indicatorId: "KU2_6",
    indicatorLabel: "Indikator 6",
    description: "Die Lehrkraft bietet Hilfen bei sprachlichen Barrieren an.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Konstruktive Unterstützung",
    itemCode: "KU2",
    itemLabel: "Individuelle Unterstützung im Lernprozess",
    indicatorId: "KU2_7",
    indicatorLabel: "Indikator 7",
    description: "Den Schülerinnen und Schülern wird durch zu enggeführte Erklärung die Möglichkeit genommen, sich Inhalte selbst zu erschließen.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Konstruktive Unterstützung",
    itemCode: "KU2",
    itemLabel: "Individuelle Unterstützung im Lernprozess",
    indicatorId: "KU2_8",
    indicatorLabel: "Indikator 8",
    description: "Die geforderten Aufgaben stellen für die Schülerinnen und Schüler eine offensichtliche Unter oder Überforderung dar.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Konstruktive Unterstützung",
    itemCode: "KU2",
    itemLabel: "Individuelle Unterstützung im Lernprozess",
    indicatorId: "KU2_9",
    indicatorLabel: "Indikator 9",
    description: "Die geforderten Aufgaben können von den Schülerinnen und Schülern selbst mit Hilfe nicht bewältigt werden.",
    perc99: 0.0,
    suitability: "geeignet"
  },

  // 4.2.3 Wertschätzung und Respekt (KU3)
  {
    basisdimension: "Konstruktive Unterstützung",
    itemCode: "KU3",
    itemLabel: "Wertschätzung und Respekt",
    indicatorId: "KU3_1",
    indicatorLabel: "Indikator 1",
    description: "Die Lehrkraft geht freundlich und respektvoll mit ihren Schülerinnen und Schülern um.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Konstruktive Unterstützung",
    itemCode: "KU3",
    itemLabel: "Wertschätzung und Respekt",
    indicatorId: "KU3_2",
    indicatorLabel: "Indikator 2",
    description: "Die Lehrkraft behandelt alle Schülerinnen und Schüler gleich freundlich, unabhängig von ihren individuellen Hintergründen.",
    perc99: 16.7,
    suitability: "bedingt geeignet"
  },
  {
    basisdimension: "Konstruktive Unterstützung",
    itemCode: "KU3",
    itemLabel: "Wertschätzung und Respekt",
    indicatorId: "KU3_3",
    indicatorLabel: "Indikator 3",
    description: "Die Lehrkraft zeigt Interesse für die Perspektiven und Meinungen der Schülerinnen und Schüler.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Konstruktive Unterstützung",
    itemCode: "KU3",
    itemLabel: "Wertschätzung und Respekt",
    indicatorId: "KU3_4",
    indicatorLabel: "Indikator 4",
    description: "Die Lehrkraft nimmt die Gefühle und außerschulischen oder nicht fachlichen Probleme der Schülerinnen und Schüler ernst.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Konstruktive Unterstützung",
    itemCode: "KU3",
    itemLabel: "Wertschätzung und Respekt",
    indicatorId: "KU3_5",
    indicatorLabel: "Indikator 5",
    description: "Die Lehrkraft geht in angemessenem Rahmen auch auf persönliche Berichte oder Probleme von Schülerinnen und Schülern ein.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Konstruktive Unterstützung",
    itemCode: "KU3",
    itemLabel: "Wertschätzung und Respekt",
    indicatorId: "KU3_6",
    indicatorLabel: "Indikator 6",
    description: "Die Lehrkraft ist ablehnend und distanziert gegenüber ihren Schülerinnen und Schülern.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Konstruktive Unterstützung",
    itemCode: "KU3",
    itemLabel: "Wertschätzung und Respekt",
    indicatorId: "KU3_7",
    indicatorLabel: "Indikator 7",
    description: "Schülerinnen und Schüler werden von der Lehrkraft lächerlich gemacht, bloßgestellt oder respektlos behandelt.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Konstruktive Unterstützung",
    itemCode: "KU3",
    itemLabel: "Wertschätzung und Respekt",
    indicatorId: "KU3_8",
    indicatorLabel: "Indikator 8",
    description: "Die Lehrkraft macht sarkastische oder zynische Bemerkungen.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Konstruktive Unterstützung",
    itemCode: "KU3",
    itemLabel: "Wertschätzung und Respekt",
    indicatorId: "KU3_9",
    indicatorLabel: "Indikator 9",
    description: "Die Lehrkraft zeigt Gesten der Verächtlichmachung.",
    perc99: 38.9,
    suitability: "nicht geeignet"
  },

  // 4.2.4 Klassenklima (KU4)
  {
    basisdimension: "Konstruktive Unterstützung",
    itemCode: "KU4",
    itemLabel: "Klassenklima",
    indicatorId: "KU4_1",
    indicatorLabel: "Indikator 1",
    description: "Die Schülerinnen und Schüler hören einander zu und lassen sich gegenseitig ausreden, auch bei länger andauernden Antworten.",
    perc99: 38.9,
    suitability: "bedingt geeignet"
  },
  {
    basisdimension: "Konstruktive Unterstützung",
    itemCode: "KU4",
    itemLabel: "Klassenklima",
    indicatorId: "KU4_2",
    indicatorLabel: "Indikator 2",
    description: "Die Schülerinnen und Schüler helfen und unterstützen sich gegenseitig.",
    perc99: 11.1,
    suitability: "bedingt geeignet"
  },
  {
    basisdimension: "Konstruktive Unterstützung",
    itemCode: "KU4",
    itemLabel: "Klassenklima",
    indicatorId: "KU4_3",
    indicatorLabel: "Indikator 3",
    description: "Die Schülerinnen und Schüler stellen einander bei Fehlern nicht bloß.",
    perc99: 22.2,
    suitability: "bedingt geeignet"
  },
  {
    basisdimension: "Konstruktive Unterstützung",
    itemCode: "KU4",
    itemLabel: "Klassenklima",
    indicatorId: "KU4_4",
    indicatorLabel: "Indikator 4",
    description: "Das Klassenklima ist durch Zusammenhalt und Kameradschaftlichkeit geprägt.",
    perc99: 38.9,
    suitability: "bedingt geeignet"
  },
  {
    basisdimension: "Konstruktive Unterstützung",
    itemCode: "KU4",
    itemLabel: "Klassenklima",
    indicatorId: "KU4_5",
    indicatorLabel: "Indikator 5",
    description: "Die Schülerinnen und Schüler sprechen in einem respektvollen und höflichen Ton mit der Lehrkraft.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Konstruktive Unterstützung",
    itemCode: "KU4",
    itemLabel: "Klassenklima",
    indicatorId: "KU4_6",
    indicatorLabel: "Indikator 6",
    description: "Die Schülerinnen und Schüler hören der Lehrkraft zu und lassen sie ausreden.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Konstruktive Unterstützung",
    itemCode: "KU4",
    itemLabel: "Klassenklima",
    indicatorId: "KU4_7",
    indicatorLabel: "Indikator 7",
    description: "Bei Fehlern reagieren die Schülerinnen und Schüler mit abwertenden Kommentaren.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Konstruktive Unterstützung",
    itemCode: "KU4",
    itemLabel: "Klassenklima",
    indicatorId: "KU4_8",
    indicatorLabel: "Indikator 8",
    description: "Die Schülerinnen und Schüler gehen respektlos miteinander um.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Konstruktive Unterstützung",
    itemCode: "KU4",
    itemLabel: "Klassenklima",
    indicatorId: "KU4_9",
    indicatorLabel: "Indikator 9",
    description: "Es kommt zu verbalen oder körperlichen Auseinandersetzungen zwischen Schülerinnen und Schülern.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Konstruktive Unterstützung",
    itemCode: "KU4",
    itemLabel: "Klassenklima",
    indicatorId: "KU4_10",
    indicatorLabel: "Indikator 10",
    description: "Die Stimmung in der Klasse ist von einer unangenehmen Anspannung geprägt.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Konstruktive Unterstützung",
    itemCode: "KU4",
    itemLabel: "Klassenklima",
    indicatorId: "KU4_11",
    indicatorLabel: "Indikator 11",
    description: "Die Schülerinnen und Schüler zeigen sich respektlos gegenüber der Lehrkraft.",
    perc99: 0.0,
    suitability: "geeignet"
  },

  // 4.3 Strukturierte Klassenführung
  // 4.3.1 Störungen durch Schülerinnen und Schüler (SK1)
  {
    basisdimension: "Strukturierte Klassenführung",
    itemCode: "SK1",
    itemLabel: "Störungen durch Schülerinnen und Schüler",
    indicatorId: "SK1_1",
    indicatorLabel: "Indikator 1",
    description: "Der Unterricht verläuft ruhig und geordnet.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Strukturierte Klassenführung",
    itemCode: "SK1",
    itemLabel: "Störungen durch Schülerinnen und Schüler",
    indicatorId: "SK1_2",
    indicatorLabel: "Indikator 2",
    description: "Die Lautstärke während der Unterrichtsstunde ist der jeweiligen Unterrichtsphase angemessen.",
    perc99: 38.9,
    suitability: "bedingt geeignet"
  },
  {
    basisdimension: "Strukturierte Klassenführung",
    itemCode: "SK1",
    itemLabel: "Störungen durch Schülerinnen und Schüler",
    indicatorId: "SK1_3",
    indicatorLabel: "Indikator 3",
    description: "Die Schülerinnen und Schüler halten sich an Regeln und bestehende Rituale.",
    perc99: 11.1,
    suitability: "geeignet"
  },
  {
    basisdimension: "Strukturierte Klassenführung",
    itemCode: "SK1",
    itemLabel: "Störungen durch Schülerinnen und Schüler",
    indicatorId: "SK1_4",
    indicatorLabel: "Indikator 4",
    description: "Es kommt nur selten zu Störungen.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Strukturierte Klassenführung",
    itemCode: "SK1",
    itemLabel: "Störungen durch Schülerinnen und Schüler",
    indicatorId: "SK1_5",
    indicatorLabel: "Indikator 5",
    description: "Es kommt zu intensiven Störungen.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Strukturierte Klassenführung",
    itemCode: "SK1",
    itemLabel: "Störungen durch Schülerinnen und Schüler",
    indicatorId: "SK1_6",
    indicatorLabel: "Indikator 6",
    description: "Die Lautstärke während der Unterrichtsstunde ist zu hoch, um dem Unterrichtsgeschehen noch folgen zu können.",
    perc99: 5.6,
    suitability: "bedingt geeignet"
  },
  {
    basisdimension: "Strukturierte Klassenführung",
    itemCode: "SK1",
    itemLabel: "Störungen durch Schülerinnen und Schüler",
    indicatorId: "SK1_7",
    indicatorLabel: "Indikator 7",
    description: "Trotz Interventionen der Lehrkraft treten immer wieder Störungen auf.",
    perc99: 0.0,
    suitability: "geeignet"
  },

  // 4.3.2 Monitoring (SK2)
  {
    basisdimension: "Strukturierte Klassenführung",
    itemCode: "SK2",
    itemLabel: "Monitoring",
    indicatorId: "SK2_1",
    indicatorLabel: "Indikator 1",
    description: "Die Lehrkraft hat alle Schülerinnen und Schüler im Blick.",
    perc99: 0.0,
    suitability: "bedingt geeignet"
  },
  {
    basisdimension: "Strukturierte Klassenführung",
    itemCode: "SK2",
    itemLabel: "Monitoring",
    indicatorId: "SK2_2",
    indicatorLabel: "Indikator 2",
    description: "Die Lehrkraft ist im ganzen Klassenzimmer präsent, auch während Einzelarbeitsphasen.",
    perc99: 94.4,
    suitability: "nicht geeignet"
  },
  {
    basisdimension: "Strukturierte Klassenführung",
    itemCode: "SK2",
    itemLabel: "Monitoring",
    indicatorId: "SK2_3",
    indicatorLabel: "Indikator 3",
    description: "Die Lehrkraft kehrt den Schülerinnen und Schülern nur selten den Rücken zu und richtet ihren Blick meist zur Klasse.",
    perc99: 100.0,
    suitability: "nicht geeignet"
  },
  {
    basisdimension: "Strukturierte Klassenführung",
    itemCode: "SK2",
    itemLabel: "Monitoring",
    indicatorId: "SK2_4",
    indicatorLabel: "Indikator 4",
    description: "Die Lehrkraft geht mit Störungen, die den Unterrichtsfluss gefährden, angemessen um.",
    perc99: 61.1,
    suitability: "bedingt geeignet"
  },
  {
    basisdimension: "Strukturierte Klassenführung",
    itemCode: "SK2",
    itemLabel: "Monitoring",
    indicatorId: "SK2_5",
    indicatorLabel: "Indikator 5",
    description: "Aufkeimende Störungen behebt die Lehrkraft frühzeitig und beiläufig, sodass es erst gar nicht zu Unruhe oder Störungen kommt.",
    perc99: 50.0,
    suitability: "bedingt geeignet"
  },
  {
    basisdimension: "Strukturierte Klassenführung",
    itemCode: "SK2",
    itemLabel: "Monitoring",
    indicatorId: "SK2_6",
    indicatorLabel: "Indikator 6",
    description: "Im Gespräch mit einzelnen Schülerinnen und Schülern verliert die Lehrkraft die restliche Klasse aus dem Blick.",
    perc99: 38.9,
    suitability: "bedingt geeignet"
  },
  {
    basisdimension: "Strukturierte Klassenführung",
    itemCode: "SK2",
    itemLabel: "Monitoring",
    indicatorId: "SK2_7",
    indicatorLabel: "Indikator 7",
    description: "Die Lehrkraft steht häufig mit dem Rücken zur Klasse.",
    perc99: 100.0,
    suitability: "nicht geeignet"
  },
  {
    basisdimension: "Strukturierte Klassenführung",
    itemCode: "SK2",
    itemLabel: "Monitoring",
    indicatorId: "SK2_8",
    indicatorLabel: "Indikator 8",
    description: "Die Lehrkraft bemerkt einzelne Schülermeldungen oft nicht oder erst spät.",
    perc99: 5.6,
    suitability: "bedingt geeignet"
  },
  {
    basisdimension: "Strukturierte Klassenführung",
    itemCode: "SK2",
    itemLabel: "Monitoring",
    indicatorId: "SK2_9",
    indicatorLabel: "Indikator 9",
    description: "Die Lehrkraft verfügt über ein eingeschränktes Verhaltensrepertoire zur Reaktion auf Störungen.",
    perc99: 38.9,
    suitability: "bedingt geeignet"
  },
  {
    basisdimension: "Strukturierte Klassenführung",
    itemCode: "SK2",
    itemLabel: "Monitoring",
    indicatorId: "SK2_10",
    indicatorLabel: "Indikator 10",
    description: "Die Lehrkraft gibt Störungen so viel Raum, dass eine Beschäftigung mit den Unterrichtsinhalten nur noch eingeschränkt möglich ist.",
    perc99: 27.8,
    suitability: "bedingt geeignet"
  },

  // 4.3.3 Zeitnutzung (SK3)
  {
    basisdimension: "Strukturierte Klassenführung",
    itemCode: "SK3",
    itemLabel: "Zeitnutzung",
    indicatorId: "SK3_1",
    indicatorLabel: "Indikator 1",
    description: "Die Unterrichtsstunde beginnt und endet pünktlich.",
    perc99: 100.0,
    suitability: "nicht geeignet"
  },
  {
    basisdimension: "Strukturierte Klassenführung",
    itemCode: "SK3",
    itemLabel: "Zeitnutzung",
    indicatorId: "SK3_2",
    indicatorLabel: "Indikator 2",
    description: "Die Unterrichtszeit wird für fachliche Themen genutzt, nicht fachliche Dinge werden verschoben oder schnellstmöglich besprochen.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Strukturierte Klassenführung",
    itemCode: "SK3",
    itemLabel: "Zeitnutzung",
    indicatorId: "SK3_3",
    indicatorLabel: "Indikator 3",
    description: "Zwischen einzelnen Unterrichtsphasen oder Arbeitsaufträgen kommt es nicht zu unnötigen Warte oder Leerzeiten.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Strukturierte Klassenführung",
    itemCode: "SK3",
    itemLabel: "Zeitnutzung",
    indicatorId: "SK3_4",
    indicatorLabel: "Indikator 4",
    description: "Die Unterrichtsstunde macht einen geplanten und strukturierten Eindruck.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Strukturierte Klassenführung",
    itemCode: "SK3",
    itemLabel: "Zeitnutzung",
    indicatorId: "SK3_5",
    indicatorLabel: "Indikator 5",
    description: "Die Lehrkraft plant genügend Zeit für die Bearbeitung von Aufgaben ein, sodass einzelne Unterrichtsphasen nicht stark verkürzt oder abgebrochen werden müssen.",
    perc99: 11.1,
    suitability: "bedingt geeignet"
  },
  {
    basisdimension: "Strukturierte Klassenführung",
    itemCode: "SK3",
    itemLabel: "Zeitnutzung",
    indicatorId: "SK3_6",
    indicatorLabel: "Indikator 6",
    description: "Die Lehrkraft gerät nicht unter Zeitdruck.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Strukturierte Klassenführung",
    itemCode: "SK3",
    itemLabel: "Zeitnutzung",
    indicatorId: "SK3_7",
    indicatorLabel: "Indikator 7",
    description: "Durch die Art der Unterrichtsorganisation wird unnötig Zeit verschwendet.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Strukturierte Klassenführung",
    itemCode: "SK3",
    itemLabel: "Zeitnutzung",
    indicatorId: "SK3_8",
    indicatorLabel: "Indikator 8",
    description: "Zu Beginn neuer Arbeitsphasen dauert es lange, bis die Schülerinnen und Schüler zur Ruhe kommen und mit der Arbeit beginnen.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Strukturierte Klassenführung",
    itemCode: "SK3",
    itemLabel: "Zeitnutzung",
    indicatorId: "SK3_9",
    indicatorLabel: "Indikator 9",
    description: "Die Lehrkraft scheint unvorbereitet zu sein.",
    perc99: 0.0,
    suitability: "geeignet"
  },
  {
    basisdimension: "Strukturierte Klassenführung",
    itemCode: "SK3",
    itemLabel: "Zeitnutzung",
    indicatorId: "SK3_10",
    indicatorLabel: "Indikator 10",
    description: "Die Lehrkraft gerät zum Stundenende unter Zeitdruck und wird hektisch.",
    perc99: 50.0,
    suitability: "bedingt geeignet"
  },
  {
    basisdimension: "Strukturierte Klassenführung",
    itemCode: "SK3",
    itemLabel: "Zeitnutzung",
    indicatorId: "SK3_11",
    indicatorLabel: "Indikator 11",
    description: "Die Lehrkraft plant zu viel Zeit für die Bearbeitung von Aufgaben ein, sodass Leerlauf für die Schülerinnen und Schüler entsteht.",
    perc99: 0.0,
    suitability: "geeignet"
  }
];

// --------------------------------------------------------
// Item-Scores pro Beobachtung (KI vs Mensch)
// Struktur: itemObservationScores['KA1'] = [{obs, ki, human}, ...]
// --------------------------------------------------------
export const itemObservationScores = {
  "KA1": [
    { obs: 1, ki: 4, human: 4 },
    { obs: 2, ki: 4, human: 4 },
    { obs: 3, ki: 4, human: 4 },
    { obs: 4, ki: 4, human: 4 },
    { obs: 5, ki: 4, human: 3.5 },
    { obs: 6, ki: 4, human: 4 },
    { obs: 7, ki: 4, human: 4 },
    { obs: 8, ki: 4, human: 4 },
    { obs: 9, ki: 4, human: 4 },
    { obs: 10, ki: 4, human: 4 },
    { obs: 11, ki: 4, human: 3 },
    { obs: 12, ki: 4, human: 3 },
    { obs: 13, ki: 4, human: 3 },
    { obs: 14, ki: 4, human: 3 },
    { obs: 15, ki: 4, human: 3.5 },
    { obs: 16, ki: 4, human: 3.5 },
    { obs: 17, ki: 4, human: 4 },
    { obs: 18, ki: 4, human: 4 }
  ],
  "KA2": [
    { obs: 1, ki: 4, human: 4 },
    { obs: 2, ki: 4, human: 3.5 },
    { obs: 3, ki: 4, human: 4 },
    { obs: 4, ki: 3, human: 4 },
    { obs: 5, ki: 4, human: 3.5 },
    { obs: 6, ki: 4, human: 4 },
    { obs: 7, ki: 4, human: 4 },
    { obs: 8, ki: 4, human: 4 },
    { obs: 9, ki: 3, human: 4 },
    { obs: 10, ki: 4, human: 4 },
    { obs: 11, ki: 4, human: 3 },
    { obs: 12, ki: 4, human: 3 },
    { obs: 13, ki: 4, human: 2.5 },
    { obs: 14, ki: 3, human: 2 },
    { obs: 15, ki: 2, human: 2.5 },
    { obs: 16, ki: 3, human: 3 },
    { obs: 17, ki: 3, human: 2.5 },
    { obs: 18, ki: 4, human: null }
  ],
  "KA3": [
    { obs: 1, ki: 2, human: 2.5 },
    { obs: 2, ki: 3, human: 3 },
    { obs: 3, ki: 4, human: 4 },
    { obs: 4, ki: 3, human: 3.5 },
    { obs: 5, ki: 4, human: 3 },
    { obs: 6, ki: 4, human: 4 },
    { obs: 7, ki: 4, human: 4 },
    { obs: 8, ki: 3, human: 3 },
    { obs: 9, ki: 3, human: 4 },
    { obs: 10, ki: 4, human: 3 },
    { obs: 11, ki: 4, human: 3 },
    { obs: 12, ki: 3, human: 2 },
    { obs: 13, ki: 3, human: 2 },
    { obs: 14, ki: 2, human: 3 },
    { obs: 15, ki: 4, human: 3 },
    { obs: 16, ki: 3, human: 3 },
    { obs: 17, ki: 3, human: 3.5 },
    { obs: 18, ki: 3, human: null }
  ],
  "KA4": [
    { obs: 1, ki: 3, human: 4 },
    { obs: 2, ki: 3, human: 4 },
    { obs: 3, ki: 3, human: 4 },
    { obs: 4, ki: 3, human: 4 },
    { obs: 5, ki: 4, human: 4 },
    { obs: 6, ki: 4, human: 4 },
    { obs: 7, ki: 4, human: 4 },
    { obs: 8, ki: 3, human: 4 },
    { obs: 9, ki: 4, human: 4 },
    { obs: 10, ki: 3, human: 4 },
    { obs: 11, ki: 4, human: 4 },
    { obs: 12, ki: 3, human: 3 },
    { obs: 13, ki: 3, human: 3.5 },
    { obs: 14, ki: 3, human: 4 },
    { obs: 15, ki: 4, human: 4 },
    { obs: 16, ki: 3, human: 4 },
    { obs: 17, ki: 3, human: 4 },
    { obs: 18, ki: 3, human: 4 }
  ],
  "KU1": [
    { obs: 1, ki: 4, human: 3 },
    { obs: 2, ki: 4, human: 2.5 },
    { obs: 3, ki: 4, human: 2.5 },
    { obs: 4, ki: 4, human: 2.5 },
    { obs: 5, ki: 4, human: 2 },
    { obs: 6, ki: 4, human: 2.5 },
    { obs: 7, ki: 4, human: 2.5 },
    { obs: 8, ki: 4, human: 2 },
    { obs: 9, ki: 4, human: 2 },
    { obs: 10, ki: 4, human: 3 },
    { obs: 11, ki: 3, human: 3 },
    { obs: 12, ki: 4, human: 2.5 },
    { obs: 13, ki: 4, human: 1.5 },
    { obs: 14, ki: 4, human: 3 },
    { obs: 15, ki: 4, human: 2.5 },
    { obs: 16, ki: 4, human: 2 },
    { obs: 17, ki: 4, human: 2.5 },
    { obs: 18, ki: 3, human: null }
  ],
  "KU2": [
    { obs: 1, ki: 4, human: 3 },
    { obs: 2, ki: 3, human: 2 },
    { obs: 3, ki: 3, human: 2 },
    { obs: 4, ki: 3, human: 3 },
    { obs: 5, ki: 4, human: 3.5 },
    { obs: 6, ki: 4, human: 3 },
    { obs: 7, ki: 3, human: 3 },
    { obs: 8, ki: 3, human: 3 },
    { obs: 9, ki: 3, human: 2.5 },
    { obs: 10, ki: 3, human: 2.5 },
    { obs: 11, ki: 3, human: 3 },
    { obs: 12, ki: 2, human: 2 },
    { obs: 13, ki: 4, human: 3 },
    { obs: 14, ki: 3, human: 3 },
    { obs: 15, ki: 2, human: 2.5 },
    { obs: 16, ki: 3, human: 2 },
    { obs: 17, ki: 3, human: 3 },
    { obs: 18, ki: 2, human: null }
  ],
  "KU3": [
    { obs: 1, ki: 4, human: 3 },
    { obs: 2, ki: 4, human: 3 },
    { obs: 3, ki: 4, human: 3 },
    { obs: 4, ki: 4, human: 3 },
    { obs: 5, ki: 4, human: 3 },
    { obs: 6, ki: 4, human: 3.5 },
    { obs: 7, ki: 4, human: 3.5 },
    { obs: 8, ki: 4, human: 3 },
    { obs: 9, ki: 4, human: 3 },
    { obs: 10, ki: 4, human: 3 },
    { obs: 11, ki: 3, human: 2 },
    { obs: 12, ki: 4, human: 3 },
    { obs: 13, ki: 4, human: 2.5 },
    { obs: 14, ki: 4, human: 3 },
    { obs: 15, ki: 4, human: 2.5 },
    { obs: 16, ki: 3, human: 3 },
    { obs: 17, ki: 4, human: 3 },
    { obs: 18, ki: 4, human: null }
  ],
  "KU4": [
    { obs: 1, ki: 4, human: 4 },
    { obs: 2, ki: 3, human: 4 },
    { obs: 3, ki: 3, human: 4 },
    { obs: 4, ki: 3, human: 4 },
    { obs: 5, ki: 4, human: 4 },
    { obs: 6, ki: 3, human: 4 },
    { obs: 7, ki: 4, human: 4 },
    { obs: 8, ki: 3, human: 4 },
    { obs: 9, ki: 4, human: 4 },
    { obs: 10, ki: 3, human: 4 },
    { obs: 11, ki: 4, human: 4 },
    { obs: 12, ki: 3, human: 4 },
    { obs: 13, ki: 3, human: 4 },
    { obs: 14, ki: 4, human: 4 },
    { obs: 15, ki: 3, human: 4 },
    { obs: 16, ki: 3, human: 4 },
    { obs: 17, ki: 3, human: 4 },
    { obs: 18, ki: 3, human: 4 }
  ],
  "SK1": [
    { obs: 1, ki: 4, human: 4 },
    { obs: 2, ki: 4, human: 4 },
    { obs: 3, ki: 4, human: 4 },
    { obs: 4, ki: 4, human: 3.5 },
    { obs: 5, ki: 4, human: 4 },
    { obs: 6, ki: 4, human: 4 },
    { obs: 7, ki: 4, human: 4 },
    { obs: 8, ki: 4, human: 4 },
    { obs: 9, ki: 4, human: 4 },
    { obs: 10, ki: 4, human: 4 },
    { obs: 11, ki: 4, human: 4 },
    { obs: 12, ki: 4, human: 4 },
    { obs: 13, ki: 4, human: 4 },
    { obs: 14, ki: 4, human: 4 },
    { obs: 15, ki: 4, human: 4 },
    { obs: 16, ki: 4, human: 4 },
    { obs: 17, ki: 4, human: 4 },
    { obs: 18, ki: 4, human: 4 }
  ],
  "SK2": [
    { obs: 1, ki: 3, human: 4 },
    { obs: 2, ki: 3, human: 4 },
    { obs: 3, ki: 3, human: 4 },
    { obs: 4, ki: 3, human: 4 },
    { obs: 5, ki: 3, human: 4 },
    { obs: 6, ki: 3, human: 4 },
    { obs: 7, ki: 3, human: 4 },
    { obs: 8, ki: 3, human: 4 },
    { obs: 9, ki: 3, human: 4 },
    { obs: 10, ki: 3, human: 4 },
    { obs: 11, ki: 3, human: 4 },
    { obs: 12, ki: 3, human: 4 },
    { obs: 13, ki: 3, human: 4 },
    { obs: 14, ki: 3, human: 4 },
    { obs: 15, ki: 3, human: 4 },
    { obs: 16, ki: 3, human: 4 },
    { obs: 17, ki: 3, human: 3.5 },
    { obs: 18, ki: 3, human: 4 }
  ],
  "SK3": [
    { obs: 1, ki: 4, human: 4 },
    { obs: 2, ki: 4, human: 4 },
    { obs: 3, ki: 4, human: 4 },
    { obs: 4, ki: 4, human: 3 },
    { obs: 5, ki: 4, human: 4 },
    { obs: 6, ki: 4, human: 4 },
    { obs: 7, ki: 4, human: 4 },
    { obs: 8, ki: 4, human: 4 },
    { obs: 9, ki: 4, human: 3 },
    { obs: 10, ki: 3, human: 4 },
    { obs: 11, ki: 4, human: 3.5 },
    { obs: 12, ki: 4, human: 4 },
    { obs: 13, ki: 4, human: 4 },
    { obs: 14, ki: 4, human: 3 },
    { obs: 15, ki: 4, human: 4 },
    { obs: 16, ki: 4, human: 4 },
    { obs: 17, ki: 4, human: 4 },
    { obs: 18, ki: 4, human: null }
  ]
};
