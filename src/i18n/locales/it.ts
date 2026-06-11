const it = {
  metadata: {
    description: "FitTrack — fitness, nutrizione e allenamento.",
  },
  common: {
    brand: "FitTrack",
    brandPerformance: "FitTrack Performance",
    secureConnection: "Connessione sicura attiva.",
    copyright: "© {year} FitTrack Performance. Connessione sicura attiva.",
    email: "Email",
    password: "Password",
    emailPlaceholder: "nome@esempio.com",
    hidePassword: "Nascondi",
    showPassword: "Mostra",
    back: "Indietro",
    backToLogin: "Torna al Login",
    loading: "Caricamento…",
    logging: "Registrazione…",
    close: "Chiudi",
    liters: "L",
    litersUnit: "{value} L",
  },
  navigation: {
    dashboard: "Dashboard",
    workout: "Workout",
    diet: "Dieta",
    profile: "Profilo",
  },
  placeholder: {
    underConstruction: "Sezione in costruzione.",
  },
  auth: {
    login: {
      title: "Bentornato",
      subtitle:
        "Inserisci le tue credenziali per accedere al tuo profilo FitTrack.",
      forgotPassword: "Password dimenticata?",
      submit: "Accedi",
      submitting: "Accesso in corso…",
      noAccount: "Non hai un account?",
      register: "Registrati",
      badges: {
        secure: "Sicuro",
        fast: "Veloce",
        precise: "Preciso",
      },
      footerLinks: {
        privacy: "Informativa sulla privacy",
        terms: "Termini di servizio",
        help: "Centro assistenza",
      },
    },
    register: {
      title: "Crea account",
      subtitle:
        "Registrati su FitTrack. Un amministratore dovrà approvare il tuo account prima dell'accesso.",
      firstName: "Nome",
      lastName: "Cognome",
      submit: "Registrati",
      submitting: "Registrazione…",
      hasAccount: "Hai già un account?",
      signIn: "Accedi",
      successFallback:
        "Registrazione ricevuta. Un amministratore deve approvare il tuo account prima dell'accesso.",
      errorFallback: "Registrazione non riuscita.",
    },
    passwordReset: {
      request: {
        title: "Password dimenticata?",
        subtitle:
          "Inserisci la tua email e ti invieremo un codice di verifica a 5 cifre per reimpostare la password.",
        submit: "Invia Codice",
        submitting: "Invio in corso…",
        infoMessage:
          "Se l'indirizzo è in uso, riceverai a breve un codice per reimpostare la password.",
        spamHint:
          "Controlla anche la cartella spam. Per assistenza contatta il supporto FitTrack.",
        errorFallback: "Impossibile inviare il codice. Riprova.",
      },
      otp: {
        title: "Verifica Account",
        subtitle:
          "Abbiamo inviato un codice a <highlight>{email}</highlight>. Inserisci le 5 cifre qui sotto.",
        invalidCode: "Inserisci un codice a 5 cifre.",
        cooldown: "Puoi richiedere un nuovo codice tra {seconds}s",
        resend: "Non hai ricevuto il codice? Reinvia",
        resending: "Invio in corso…",
        resendSuccess: "Nuovo codice inviato.",
        errorFallback: "Codice non valido o scaduto.",
        resendErrorFallback: "Impossibile reinviare il codice.",
        submit: "Verifica Codice",
        submitting: "Verifica in corso…",
        digitAriaLabel: "Cifra {index} del codice",
      },
      newPassword: {
        step: "Passo 3 di 3",
        title: "Crea Nuova Password",
        subtitle:
          "Scegli una password sicura per proteggere il tuo account FitTrack.",
        newPassword: "Nuova Password",
        confirmPassword: "Conferma Password",
        requirements: {
          minLength: "Almeno 8 caratteri",
          uppercase: "Una lettera maiuscola",
          lowercase: "Una lettera minuscola",
          digit: "Almeno un numero",
          special: "Un carattere speciale",
          match: "Le password coincidono",
        },
        submit: "Aggiorna Password",
        submitting: "Aggiornamento…",
        successTitle: "Password Aggiornata!",
        successBody:
          "La tua password è stata reimpostata con successo. Accedi con le nuove credenziali.",
      },
    },
    passwordPolicy:
      "La password deve avere almeno 8 caratteri, una lettera maiuscola, una minuscola, un numero e un carattere speciale.",
  },
  errors: {
    unexpected: "Si è verificato un errore imprevisto.",
    loginFailed: "Login fallito.",
    loginInvalidResponse: "Risposta login non valida.",
    registerNotAccepted: "Registrazione non accettata.",
    passwordResetNotAccepted: "Richiesta non accettata.",
    otpInvalidResponse: "Risposta verifica non valida.",
    passwordUpdateFailed: "Aggiornamento password non riuscito.",
  },
  dashboard: {
    nextMeal: {
      label: "Prossimo Pasto",
      title: "Pranzo: Salmone e Quinoa",
      supplements: "Omega 3, Multivitaminico",
    },
    workout: {
      sectionTitle: "Allenamento di oggi",
      viewHistory: "Vedi storico",
      start: "Inizia allenamento",
      durationLabel: "Durata",
      exercisesLabel: "Esercizi",
      duration: "{minutes} min",
      exercisesCount: "{count} esercizi",
      rest: {
        title: "Giorno di riposo",
        description:
          "Nessuna scheda prevista per oggi. Recupera e preparati al prossimo allenamento.",
        cta: "Riposo",
      },
    },
    insights: {
      sleep: "Sonno",
      steps: "Passi",
      weight: "Peso",
      streak: "Serie",
      personalBest: "Record personale!",
    },
    mock: {
      sleepValue: "7h 20m",
      stepsValue: "8.432",
      weightValue: "78,4 kg",
      weightDelta: "-0,2 kg",
      streakValue: "12 giorni",
    },
  },
  hydration: {
    title: "Idratazione",
    detailTitle: "IDRATAZIONE",
    history: "Storico",
    progress: "{total} L / {target} L",
    goal: "Obiettivo: {target}L",
    quickAdd: {
      add250: "Aggiungi 250ml",
      add500: "Aggiungi 500ml",
      add1L: "Aggiungi 1L",
    },
    quickAdjust: {
      add: "+{amount}ml",
      remove: "−{amount}ml",
    },
    adjustMode: {
      addActive: "Modalità aggiunta attiva, passa a sottrazione",
      removeActive: "Modalità sottrazione attiva, passa ad aggiunta",
    },
    historySection: {
      title: "Ultimi 10 giorni",
      loading: "Caricamento storico…",
      goalMet: "Obiettivo raggiunto",
      overTarget: "+{liters}L oltre",
      percentOfGoal: "{percent}% dell'obiettivo",
      volume: "{liters}L",
    },
    trend: {
      title: "Ultimi 30 giorni",
      average: "Media: {value}L",
      targetLine: "Linea obiettivo ({target}L)",
      loading: "Caricamento grafico…",
      empty: "Nessun dato negli ultimi 30 giorni.",
      intake: "Assunzione",
    },
    loggingEllipsis: "…",
  },
} as const;

export default it;
