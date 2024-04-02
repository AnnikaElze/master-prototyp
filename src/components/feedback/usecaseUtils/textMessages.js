export const Lunge = {
  // State 1: Start Position Side View
  sideLegInfo: {
    warning: "Knie: Achte auf einen rechten Winkel an beiden Kniegelenken!",
    success: "Knie"
  },
  sideHipInfo: {
    warning: "Hüfte: Beide Hüftknochen sollen nach vorn zeigen!",
    success: "Hüfte"
  },
  sideBodyInfo: {
    warning: "Oberkörper: Kippe nicht nach vorn oder hinten!",
    success: "Oberkörper"
  },

  // State 1: Start Position Back View
  backLegInfo: {
    warning: "Beine: Achte auf eine gerade Ausrichtung deiner Beine!",
    success: "Beine"
  },
  backHipInfo: {
    warning: "Hüfte: Beide Hüftknochen sollten auf der selben Höhe sein.",
    success: "Hüfte"
  },
  backBodyInfo: {
    warning: "Oberkörper: Dein Oberkörper sollte nicht seitlich geneigt sein.",
    success: "Oberkörper"
  },

  // State 2: Stretching
  correctInfo: "Du hast die korrekte Körperhaltung eingenommen. Sehr gut!",
  stretchingInfo: "Kippe die Hüfte nach hinten, indem du einen runden Rücken machst.\n" +
    "Um die Dehnung zu intensivieren kannst du die Hüfte leicht nach vorn schieben, " +
    "aber achte darauf, nicht in ein Hohlkreuz zu fallen.\n" +
    "Du solltest auf der Vorderseite deines hinteren Oberschenkels eine Dehnung spüren.",

  // State 3: Release
  exitInfo: "Sehr gut! Du kannst die Dehnung langsam lösen."
}

export const Handstand = {
  // State 1: Start Position Side View
  state1sideArmInfo: {
    warning: "Standarm: Strecke deinen Standarm aus!",
    success: "Standarm"
  },
  state1sideShoulderInfo: {
    warning: "Schulter: Positioniere deine Schulter über dem Handgelenk!",
    success: "Schulter"
  },

  // State 1: Start Position Back View
  state1backArmInfo: {
    warning: "Hand: Positioniere deine Hand unter deiner Schulter.",
    success: "Hand"
  },
  state1backShoulderInfo: {
    warning: "Schulter: Positioniere die Schultern möglichst gerade!",
    success: "Schulter"
  },

  // State 2: Dynamic Movement to Handstand
  state2Info: "Du hast die korrekte Startposition eingenommen. Sehr gut!",
  state2Hint: "Schwinge jetzt in den Handstand.",

  // State 3: Handstand Side View
  state3sideBodyInfo: {
    warning: "Körper: Positioniere deine Schulter und Hüfte gerade über deinem Handgelenk!",
    success: "Körper"
  },
  state3sideLegInfo: {
    warning: "Beine: Strecke deine Beine aus!",
    success: "Beine"
  },
  state3sideFeetInfo: {
    warning: "Füße: Positioniere beide Füße über deiner Hüfte!",
    success: "Füße"
  },

  // State 3: Handstand Back View
  state3backShoulderInfo: {
    warning: "Schulter: Positioniere die Schultern möglichst gerade!",
    success: "Schulter"
  },
  state3backHipInfo: {
    warning: "Hüfte: Positioniere die Hüfte gerade über den Schultern!",
    success: "Hüfte"
  },
  state3backFeetInfo: {
    warning: "Füße: Positioniere beide Füße mittig über der Hüfte!",
    success: "Füße"
  },
}