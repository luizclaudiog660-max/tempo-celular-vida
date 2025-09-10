export type Language = 'pt' | 'en' | 'es';

export interface Translations {
  // Header
  settings: string;
  
  // Auth
  auth: {
    login: string;
    register: string;
    email: string;
    password: string;
    loginButton: string;
    registerButton: string;
    loginTitle: string;
    registerTitle: string;
    loginSubtitle: string;
    registerSubtitle: string;
    loginSuccess: string;
    registerSuccess: string;
    logout: string;
    account: string;
    freeAccount: string;
    premiumActive: string;
  };
  
  // Onboarding A
  onboardingA: {
    title: string;
    subtitle: string;
    personas: {
      student: string;
      professional: string;
      parent: string;
      entrepreneur: string;
      spiritual: string;
      fitness: string;
    };
    funnyMessages: string[];
  };
  
  // Onboarding B
  onboardingB: {
    title: string;
    subtitle: string;
    objectives: string[];
    otherObjective: string;
    addButton: string;
    continueButton: string;
    backButton: string;
    funnyMessages: string[];
  };
  
  // Calculator
  calculator: {
    title: string;
    subtitle: string;
    ageLabel: string;
    agePlaceholder: string;
    hoursLabel: string;
    hoursPlaceholder: string;
    calculateButton: string;
    changeProfile: string;
    funnyMessages: string[];
  };
  
  // Results
  results: {
    title: string;
    subtitle: string;
    perDay: string;
    perWeek: string;
    perMonth: string;
    daysPerYear: string;
    newConsultation: string;
    funnyMessages: string[];
    impactComparisons: {
      books: string;
      college: string;
      mastersDegree: string;
      language: string;
      skill: string;
      fitness: string;
    };
  };
  
  // Challenge
  challenge: {
    title: string;
    completed: string;
    dailyProgress: string;
    statistics: string;
    currentStreak: string;
    consecutiveDays: string;
    progress: string;
    completeDays: string;
    achievements: string;
    restartChallenge: string;
    viewAchievement: string;
    congratulations: string;
    completedMessage: string;
    newCycle: string;
    nextLevel: string;
    close: string;
    funnyMessages: string[];
    badges: {
      start: { title: string; description: string; };
      streak3: { title: string; description: string; };
      complete7: { title: string; description: string; };
    };
  };
  
  // Smart Trades
  smartTrades: {
    title: string;
    recommendedForYou: string;
    suggestedSchedule: string;
    monthlyEquivalence: string;
    activatePlan: string;
    planActivated: string;
    reading: string;
    study: string;
    fitness: string;
    spiritual: string;
    readingDesc: string;
    studyDesc: string;
    fitnessDesc: string;
    spiritualDesc: string;
    personalizedTrades: {
      student: {
        title: string;
        description: string;
        schedule: string;
        equivalence: string;
      };
      professional: {
        title: string;
        description: string;
        schedule: string;
        equivalence: string;
      };
      parent: {
        title: string;
        description: string;
        schedule: string;
        equivalence: string;
      };
      entrepreneur: {
        title: string;
        description: string;
        schedule: string;
        equivalence: string;
      };
      spiritual: {
        title: string;
        description: string;
        schedule: string;
        equivalence: string;
      };
      fitness: {
        title: string;
        description: string;
        schedule: string;
        equivalence: string;
      };
    };
  };
  
  // Settings Page
  settingsPage: {
    title: string;
    subtitle: string;
    editPersona: string;
    editObjectives: string;
    reminders: string;
    reminderTime: string;
    reminderMessage: string;
    language: string;
    privacy: string;
    privacyMessage: string;
    clearData: string;
    clearDataConfirm: string;
    clearDataMessage: string;
    saveChanges: string;
    cancel: string;
    success: string;
    changesSaved: string;
    dataCleared: string;
    darkMode: string;
    sendFeedback: string;
    feedbackUrl: string;
  };
  
  // Premium
  premium: {
    title: string;
    subtitle: string;
    upgradeButton: string;
    benefits: {
      reports: string;
      comparisons: string;
      multiplePlans: string;
      notifications: string;
      extraTips: string;
    };
    pricing: {
      free: string;
      premium: string;
      monthly: string;
      yearly: string;
    };
    subscribe: string;
    alreadyPremium: string;
    marketingMessages: {
      invest: string;
      unlock: string;
      results: string;
    };
  };
  
  // Toast Messages & Feedback
  toastMessages: string[];
  tradeNowButton: string;
  feedbackMessages: string[];
  achievementMessages: string[];
}

export const translations: Record<Language, Translations> = {
  pt: {
    settings: 'Configurações',
    
    auth: {
      login: 'Entrar',
      register: 'Criar Conta',
      email: 'Email',
      password: 'Senha',
      loginButton: 'Entrar',
      registerButton: 'Criar Conta',
      loginTitle: 'Entrar na Conta',
      registerTitle: 'Criar Conta',
      loginSubtitle: 'Acesse sua jornada de transformação',
      registerSubtitle: 'Comece sua jornada de transformação',
      loginSuccess: 'Conta criada! Vamos recuperar tempo de vida ⏱️',
      registerSuccess: 'Bem-vindo! Sua conta foi criada com sucesso',
      logout: 'Sair',
      account: 'Conta',
      freeAccount: 'Conta Gratuita',
      premiumActive: 'Premium Ativo'
    },
    
    onboardingA: {
      title: 'Passo A: Escolha seu Perfil',
      subtitle: 'Selecione a opção que mais combina com você',
      personas: {
        student: 'Estudante',
        professional: 'Profissional',
        parent: 'Pai/Mãe',
        entrepreneur: 'Empreendedor',
        spiritual: 'Fé/Espiritual',
        fitness: 'Saúde/Fitness'
      },
      funnyMessages: [
        "Seja sincero… o Insta tá te roubando tempo de vida? 😅",
        "Escolha seu perfil e vamos descobrir onde seu tempo some! 🕵️",
        "Qual é sua vibe? Vamos personalizar sua jornada! ✨"
      ]
    },
    
    onboardingB: {
      title: 'Passo B: Seus Objetivos',
      subtitle: 'Selecione todos os objetivos que fazem sentido para você',
      objectives: [
        'Melhorar produtividade',
        'Ter mais tempo para família',
        'Focar nos estudos',
        'Desenvolver habilidades',
        'Cuidar da saúde mental',
        'Praticar exercícios',
        'Ler mais livros',
        'Aprender idiomas'
      ],
      otherObjective: 'Outro objetivo:',
      addButton: 'Adicionar',
      continueButton: 'Continuar para Calculadora',
      backButton: 'Voltar',
      funnyMessages: [
        "Sonhos grandes começam com pequenas mudanças! 🌟",
        "Seus objetivos são o GPS da sua transformação! 🗺️",
        "Cada meta é um passo para a melhor versão de você! 🚀"
      ]
    },
    
    calculator: {
      title: 'Calculadora de Tempo',
      subtitle: 'Descubra quanto tempo você gasta no celular',
      ageLabel: 'Qual é a sua idade?',
      agePlaceholder: 'Ex: 25',
      hoursLabel: 'Quantas horas por dia você usa o celular?',
      hoursPlaceholder: 'Ex: 3.5',
      calculateButton: 'Calcular Tempo',
      changeProfile: 'Alterar perfil',
      funnyMessages: [
        "Preparado para a verdade? Pode ser chocante! 😱",
        "Vamos fazer as contas… respira fundo! 🧮",
        "Hora da matemática da vida real! 📊"
      ]
    },
    
    results: {
      title: 'Seus Resultados',
      subtitle: 'Veja quanto tempo você dedica ao celular',
      perDay: 'Por dia',
      perWeek: 'Por semana',
      perMonth: 'Por mês',
      daysPerYear: 'Dias por ano',
      newConsultation: 'Nova consulta',
      funnyMessages: [
        "9 anos no celular… imagina 9 anos de inglês fluente 😅",
        "Esse tempo dava pra virar expert em qualquer coisa! 🎯",
        "Plot twist: você poderia ter 3 diplomas com esse tempo! 🎓"
      ],
      impactComparisons: {
        books: "📚 ~12 livros lidos por ano",
        college: "🎓 Uma faculdade completa (4 anos)",
        mastersDegree: "🎓 Faculdade + Mestrado (6 anos)",
        language: "🗣️ Fluência em 2 idiomas",
        skill: "🎯 Maestria em qualquer habilidade",
        fitness: "💪 Transformação física completa"
      }
    },
    
    challenge: {
      title: 'Desafio 7 dias: -1h/dia',
      completed: 'Concluído!',
      dailyProgress: 'Progresso Diário',
      statistics: 'Estatísticas',
      currentStreak: 'Streak Atual',
      consecutiveDays: 'dias consecutivos',
      progress: 'Progresso',
      completeDays: 'dias completos',
      achievements: 'Conquistas',
      restartChallenge: 'Reiniciar Desafio',
      viewAchievement: 'Ver Conquista',
      congratulations: 'Parabéns!',
      completedMessage: 'Você completou o Desafio 7 dias! Conquistou mais controle sobre seu tempo.',
      newCycle: '🔄 Novo Ciclo (-1h/dia)',
      nextLevel: '🚀 Próximo Nível (-2h/dia)',
      close: 'Fechar',
      funnyMessages: [
        "Dia 3 concluído! Tá vencendo o vício 👏",
        "Você tá no fogo! Mais um dia na conta! 🔥",
        "Consistência é o seu superpoder! 💪"
      ],
      badges: {
        start: { title: 'Primeiro Passo', description: 'Marcou o primeiro dia' },
        streak3: { title: '3 em Linha', description: '3 dias consecutivos' },
        complete7: { title: 'Concluiu 7', description: 'Completou o desafio' }
      }
    },
    
    smartTrades: {
      title: 'Trocas Inteligentes',
      recommendedForYou: 'Recomendado para você!',
      suggestedSchedule: '📅 Cronograma Sugerido:',
      monthlyEquivalence: '📊 Equivalência Mensal:',
      activatePlan: 'Ativar Plano',
      planActivated: 'Plano Ativado!',
      reading: 'Leitura',
      study: 'Estudo',
      fitness: 'Fitness',
      spiritual: 'Espiritual',
      readingDesc: '2 livros/mês',
      studyDesc: '14 aulas/mês',
      fitnessDesc: '24 treinos/mês',
      spiritualDesc: '2 planos/mês',
      personalizedTrades: {
        student: {
          title: 'Troque 1h no Insta por 2 aulas de matemática',
          description: '1h = 2 aulas curtas (30min cada)',
          schedule: 'Seg–Sex: 19:30–20:30',
          equivalence: '1h/dia ≈ 14 aulas/mês'
        },
        professional: {
          title: 'Troque 1h por 1 módulo de certificação',
          description: '1h = 1 módulo de certificação',
          schedule: 'Seg/Qua/Sex: 07:00–07:30 + 19:30–20:00',
          equivalence: '1h/dia ≈ 2 certificações/mês'
        },
        parent: {
          title: 'Troque 1h por tempo de qualidade com seu filho',
          description: '1h = 30min leitura + 30min brincadeira',
          schedule: 'Seg–Sex: 20:00–21:00',
          equivalence: '1h/dia ≈ 30h qualidade/mês'
        },
        entrepreneur: {
          title: 'Troque 1h por 2 sprints de negócio (25min)',
          description: '1h = 2 sprints de negócio (25min Pomodoro)',
          schedule: 'Seg–Sex: 06:30–07:30',
          equivalence: '1h/dia ≈ 60 sprints/mês'
        },
        spiritual: {
          title: 'Troque 1h por leitura + oração',
          description: '1h = 15min leitura + 15min reflexão + 30min plano bíblico',
          schedule: 'Diariamente: 06:30–07:30',
          equivalence: '1h/dia ≈ 2 planos/mês'
        },
        fitness: {
          title: 'Troque 1h por treino + alongamento',
          description: '1h = 40min treino + 20min alongamento',
          schedule: 'Seg–Sáb: 18:30–19:30',
          equivalence: '1h/dia ≈ 24 treinos/mês'
        }
      }
    },
    
    settingsPage: {
      title: 'Configurações',
      subtitle: 'Personalize sua experiência',
      editPersona: 'Editar Persona',
      editObjectives: 'Editar Objetivos',
      reminders: 'Lembretes Locais',
      reminderTime: 'Horário do lembrete',
      reminderMessage: 'lembrar às 20:00 de aplicar meu plano',
      language: 'Idioma',
      privacy: 'Privacidade',
      privacyMessage: 'O app não monitora seu celular; os dados são auto-informados e ficam no seu navegador (localStorage).',
      clearData: 'Apagar meus dados',
      clearDataConfirm: 'Tem certeza? Esta ação não pode ser desfeita.',
      clearDataMessage: 'Todos os seus dados serão removidos permanentemente.',
      saveChanges: 'Salvar Alterações',
      cancel: 'Cancelar',
      success: 'Sucesso!',
      changesSaved: 'Suas alterações foram salvas.',
      dataCleared: 'Todos os dados foram removidos.',
      darkMode: 'Modo Escuro',
      sendFeedback: 'Enviar Feedback',
      feedbackUrl: 'https://forms.google.com/feedback-pt'
    },
    
    premium: {
      title: 'Benefícios Premium',
      subtitle: 'Desbloqueie todo o potencial do app',
      upgradeButton: 'Upgrade Premium',
      benefits: {
        reports: '📊 Relatórios semanais detalhados com gráficos',
        comparisons: '🎯 Comparativos avançados e insights personalizados',
        multiplePlans: '⚡ Múltiplos planos de troca simultâneos',
        notifications: '🔔 Notificações personalizadas e lembretes inteligentes',
        extraTips: '💡 Dicas extras e estratégias exclusivas'
      },
      pricing: {
        free: 'Grátis',
        premium: 'Premium',
        monthly: 'R$ 10,99/mês',
        yearly: 'R$ 99,99/ano'
      },
      subscribe: 'Assinar Premium',
      alreadyPremium: 'Você já é Premium! 🎉',
      marketingMessages: {
        invest: "Invista apenas R$0,33/dia e recupere anos da sua vida 🚀",
        unlock: "Premium libera relatórios, planos extras e mais motivação.",
        results: "Quer resultados reais? Desbloqueie o Premium agora."
      }
    },
    
    toastMessages: [
      "3h hoje… 2h no Insta. Virou influencer? 😅 Troca 30min por leitura?",
      "Metade do seu gás já foi pro celular. Recupera 1h agora?",
      "Menos 1h/dia = +15 dias/ano de vida. Bora?",
      "Se fosse 1h de estudo, já era 1 aula inteira.",
      "Dá pra fechar 10k passos nessa 1h. Partiu?"
    ],
    tradeNowButton: 'Quero trocar 30min agora',
    
    feedbackMessages: [
      "Boa! Você acabou de recuperar 15 dias da sua vida 🚀",
      "Mandou bem! +1h focada = -1h de procrastinação.",
      "Você ganhou um badge de consistência!",
      "Parabéns! Mais um passo rumo à liberdade digital! 🎯",
      "Incrível! Você está reescrevendo sua relação com o tempo! ⏰"
    ],
    
    achievementMessages: [
      "🏆 Conquista desbloqueada: Primeiro Passo!",
      "🔥 Streak de 3 dias! Você está pegando o jeito!",
      "🎉 7 dias completos! Você é uma máquina!",
      "⭐ Badge especial: Transformador de Tempo!",
      "🚀 Nível Premium de autodisciplina alcançado!"
    ]
  },
  
  en: {
    settings: 'Settings',
    
    auth: {
      login: 'Login',
      register: 'Sign Up',
      email: 'Email',
      password: 'Password',
      loginButton: 'Login',
      registerButton: 'Sign Up',
      loginTitle: 'Login to Account',
      registerTitle: 'Create Account',
      loginSubtitle: 'Access your transformation journey',
      registerSubtitle: 'Start your transformation journey',
      loginSuccess: 'Account created! Let\'s recover life time ⏱️',
      registerSuccess: 'Welcome! Your account was created successfully',
      logout: 'Logout',
      account: 'Account',
      freeAccount: 'Free Account',
      premiumActive: 'Premium Active'
    },
    
    onboardingA: {
      title: 'Step A: Choose Your Profile',
      subtitle: 'Select the option that best matches you',
      personas: {
        student: 'Student',
        professional: 'Professional',
        parent: 'Parent',
        entrepreneur: 'Entrepreneur',
        spiritual: 'Faith/Spiritual',
        fitness: 'Health/Fitness'
      },
      funnyMessages: [
        "Be honest… is Insta stealing your life time? 😅",
        "Choose your profile and let's find where your time disappears! 🕵️",
        "What's your vibe? Let's personalize your journey! ✨"
      ]
    },
    
    onboardingB: {
      title: 'Step B: Your Goals',
      subtitle: 'Select all goals that make sense for you',
      objectives: [
        'Improve productivity',
        'Have more time for family',
        'Focus on studies',
        'Develop skills',
        'Take care of mental health',
        'Exercise more',
        'Read more books',
        'Learn languages'
      ],
      otherObjective: 'Other goal:',
      addButton: 'Add',
      continueButton: 'Continue to Calculator',
      backButton: 'Back',
      funnyMessages: [
        "Big dreams start with small changes! 🌟",
        "Your goals are the GPS of your transformation! 🗺️",
        "Each goal is a step towards the best version of you! 🚀"
      ]
    },
    
    calculator: {
      title: 'Time Calculator',
      subtitle: 'Discover how much time you spend on your phone',
      ageLabel: 'What is your age?',
      agePlaceholder: 'Ex: 25',
      hoursLabel: 'How many hours per day do you use your phone?',
      hoursPlaceholder: 'Ex: 3.5',
      calculateButton: 'Calculate Time',
      changeProfile: 'Change profile',
      funnyMessages: [
        "Ready for the truth? It might be shocking! 😱",
        "Let's do the math… take a deep breath! 🧮",
        "Time for real-life mathematics! 📊"
      ]
    },
    
    results: {
      title: 'Your Results',
      subtitle: 'See how much time you dedicate to your phone',
      perDay: 'Per day',
      perWeek: 'Per week',
      perMonth: 'Per month',
      daysPerYear: 'Days per year',
      newConsultation: 'New consultation',
      funnyMessages: [
        "9 years on phone… imagine 9 years of fluent English 😅",
        "That time could make you an expert at anything! 🎯",
        "Plot twist: you could have 3 degrees with that time! 🎓"
      ],
      impactComparisons: {
        books: "📚 ~12 books read per year",
        college: "🎓 A complete college degree (4 years)",
        mastersDegree: "🎓 College + Master's degree (6 years)",
        language: "🗣️ Fluency in 2 languages",
        skill: "🎯 Mastery in any skill",
        fitness: "💪 Complete physical transformation"
      }
    },
    
    challenge: {
      title: '7-day Challenge: -1h/day',
      completed: 'Completed!',
      dailyProgress: 'Daily Progress',
      statistics: 'Statistics',
      currentStreak: 'Current Streak',
      consecutiveDays: 'consecutive days',
      progress: 'Progress',
      completeDays: 'complete days',
      achievements: 'Achievements',
      restartChallenge: 'Restart Challenge',
      viewAchievement: 'View Achievement',
      congratulations: 'Congratulations!',
      completedMessage: 'You completed the 7-day Challenge! You gained more control over your time.',
      newCycle: '🔄 New Cycle (-1h/day)',
      nextLevel: '🚀 Next Level (-2h/day)',
      close: 'Close',
      funnyMessages: [
        "Day 3 completed! You're beating the addiction 👏",
        "You're on fire! Another day in the bag! 🔥",
        "Consistency is your superpower! 💪"
      ],
      badges: {
        start: { title: 'First Step', description: 'Checked the first day' },
        streak3: { title: '3 in a Row', description: '3 consecutive days' },
        complete7: { title: 'Completed 7', description: 'Finished the challenge' }
      }
    },
    
    smartTrades: {
      title: 'Smart Trades',
      recommendedForYou: 'Recommended for you!',
      suggestedSchedule: '📅 Suggested Schedule:',
      monthlyEquivalence: '📊 Monthly Equivalence:',
      activatePlan: 'Activate Plan',
      planActivated: 'Plan Activated!',
      reading: 'Reading',
      study: 'Study',
      fitness: 'Fitness',
      spiritual: 'Spiritual',
      readingDesc: '2 books/month',
      studyDesc: '14 classes/month',
      fitnessDesc: '24 workouts/month',
      spiritualDesc: '2 plans/month',
      personalizedTrades: {
        student: {
          title: 'Trade 1h on Insta for 2 math classes',
          description: '1h = 2 short classes (30min each)',
          schedule: 'Mon–Fri: 7:30–8:30 PM',
          equivalence: '1h/day ≈ 14 classes/month'
        },
        professional: {
          title: 'Trade 1h for 1 certification module',
          description: '1h = 1 certification module',
          schedule: 'Mon/Wed/Fri: 7:00–7:30 AM + 7:30–8:00 PM',
          equivalence: '1h/day ≈ 2 certifications/month'
        },
        parent: {
          title: 'Trade 1h for quality time with your child',
          description: '1h = 30min reading + 30min playing',
          schedule: 'Mon–Fri: 8:00–9:00 PM',
          equivalence: '1h/day ≈ 30h quality time/month'
        },
        entrepreneur: {
          title: 'Trade 1h for 2 business sprints (25min)',
          description: '1h = 2 business sprints (25min Pomodoro)',
          schedule: 'Mon–Fri: 6:30–7:30 AM',
          equivalence: '1h/day ≈ 60 sprints/month'
        },
        spiritual: {
          title: 'Trade 1h for reading + prayer',
          description: '1h = 15min reading + 15min reflection + 30min biblical plan',
          schedule: 'Daily: 6:30–7:30 AM',
          equivalence: '1h/day ≈ 2 plans/month'
        },
        fitness: {
          title: 'Trade 1h for workout + stretching',
          description: '1h = 40min workout + 20min stretching',
          schedule: 'Mon–Sat: 6:30–7:30 PM',
          equivalence: '1h/day ≈ 24 workouts/month'
        }
      }
    },
    
    settingsPage: {
      title: 'Settings',
      subtitle: 'Customize your experience',
      editPersona: 'Edit Persona',
      editObjectives: 'Edit Goals',
      reminders: 'Local Reminders',
      reminderTime: 'Reminder time',
      reminderMessage: 'remind at 8:00 PM to apply my plan',
      language: 'Language',
      privacy: 'Privacy',
      privacyMessage: 'The app does not monitor your phone; data is self-reported and stays in your browser (localStorage).',
      clearData: 'Clear my data',
      clearDataConfirm: 'Are you sure? This action cannot be undone.',
      clearDataMessage: 'All your data will be permanently removed.',
      saveChanges: 'Save Changes',
      cancel: 'Cancel',
      success: 'Success!',
      changesSaved: 'Your changes have been saved.',
      dataCleared: 'All data has been cleared.',
      darkMode: 'Dark Mode',
      sendFeedback: 'Send Feedback',
      feedbackUrl: 'https://forms.google.com/feedback-en'
    },
    
    premium: {
      title: 'Premium Benefits',
      subtitle: 'Unlock the full potential of the app',
      upgradeButton: 'Upgrade Premium',
      benefits: {
        reports: '📊 Detailed weekly reports with charts',
        comparisons: '🎯 Advanced comparisons and personalized insights',
        multiplePlans: '⚡ Multiple simultaneous trade plans',
        notifications: '🔔 Personalized notifications and smart reminders',
        extraTips: '💡 Extra tips and exclusive strategies'
      },
      pricing: {
        free: 'Free',
        premium: 'Premium',
        monthly: '$10.99/month',
        yearly: '$99.99/year'
      },
      subscribe: 'Subscribe Premium',
      alreadyPremium: 'You are already Premium! 🎉',
      marketingMessages: {
        invest: "Invest just $0.33/day and win back years of your life 🚀",
        unlock: "Premium unlocks reports, extra plans and more motivation.",
        results: "Want real results? Unlock Premium now."
      }
    },
    
    toastMessages: [
      "3h today… 2h on Insta. Became an influencer? 😅 Trade 30min for reading?",
      "Half your energy went to your phone. Get back 1h now?",
      "1h less/day = +15 days/year of life. Let's go?",
      "If it were 1h of study, that's already a full class.",
      "You could close 10k steps in that 1h. Ready?"
    ],
    tradeNowButton: 'I want to trade 30min now',
    
    feedbackMessages: [
      "Great! You just recovered 15 days of your life 🚀",
      "Well done! +1h focused = -1h procrastination.",
      "You earned a consistency badge!",
      "Congrats! Another step towards digital freedom! 🎯",
      "Amazing! You're rewriting your relationship with time! ⏰"
    ],
    
    achievementMessages: [
      "🏆 Achievement unlocked: First Step!",
      "🔥 3-day streak! You're getting the hang of it!",
      "🎉 7 complete days! You're a machine!",
      "⭐ Special badge: Time Transformer!",
      "🚀 Premium level of self-discipline achieved!"
    ]
  },
  
  es: {
    settings: 'Configuración',
    
    auth: {
      login: 'Iniciar Sesión',
      register: 'Crear Cuenta',
      email: 'Email',
      password: 'Contraseña',
      loginButton: 'Iniciar Sesión',
      registerButton: 'Crear Cuenta',
      loginTitle: 'Iniciar Sesión',
      registerTitle: 'Crear Cuenta',
      loginSubtitle: 'Accede a tu viaje de transformación',
      registerSubtitle: 'Comienza tu viaje de transformación',
      loginSuccess: '¡Cuenta creada! Vamos a recuperar tiempo de vida ⏱️',
      registerSuccess: '¡Bienvenido! Tu cuenta fue creada exitosamente',
      logout: 'Cerrar Sesión',
      account: 'Cuenta',
      freeAccount: 'Cuenta Gratuita',
      premiumActive: 'Premium Activo'
    },
    
    onboardingA: {
      title: 'Paso A: Elige tu Perfil',
      subtitle: 'Selecciona la opción que más te identifique',
      personas: {
        student: 'Estudiante',
        professional: 'Profesional',
        parent: 'Padre/Madre',
        entrepreneur: 'Emprendedor',
        spiritual: 'Fe/Espiritual',
        fitness: 'Salud/Fitness'
      },
      funnyMessages: [
        "Sé honesto… ¿Insta te está robando tiempo de vida? 😅",
        "¡Elige tu perfil y descubramos dónde desaparece tu tiempo! 🕵️",
        "¿Cuál es tu onda? ¡Personalicemos tu viaje! ✨"
      ]
    },
    
    onboardingB: {
      title: 'Paso B: Tus Objetivos',
      subtitle: 'Selecciona todos los objetivos que tengan sentido para ti',
      objectives: [
        'Mejorar productividad',
        'Tener más tiempo para familia',
        'Enfocarme en estudios',
        'Desarrollar habilidades',
        'Cuidar la salud mental',
        'Hacer más ejercicio',
        'Leer más libros',
        'Aprender idiomas'
      ],
      otherObjective: 'Otro objetivo:',
      addButton: 'Agregar',
      continueButton: 'Continuar a Calculadora',
      backButton: 'Volver',
      funnyMessages: [
        "¡Los grandes sueños empiezan con pequeños cambios! 🌟",
        "¡Tus objetivos son el GPS de tu transformación! 🗺️",
        "¡Cada meta es un paso hacia la mejor versión de ti! 🚀"
      ]
    },
    
    calculator: {
      title: 'Calculadora de Tiempo',
      subtitle: 'Descubre cuánto tiempo pasas en tu móvil',
      ageLabel: '¿Cuál es tu edad?',
      agePlaceholder: 'Ej: 25',
      hoursLabel: '¿Cuántas horas por día usas el móvil?',
      hoursPlaceholder: 'Ej: 3.5',
      calculateButton: 'Calcular Tiempo',
      changeProfile: 'Cambiar perfil',
      funnyMessages: [
        "¿Listo para la verdad? ¡Puede ser impactante! 😱",
        "Hagamos las cuentas… ¡respira profundo! 🧮",
        "¡Hora de las matemáticas de la vida real! 📊"
      ]
    },
    
    results: {
      title: 'Tus Resultados',
      subtitle: 'Ve cuánto tiempo dedicas a tu móvil',
      perDay: 'Por día',
      perWeek: 'Por semana',
      perMonth: 'Por mes',
      daysPerYear: 'Días por año',
      newConsultation: 'Nueva consulta',
      funnyMessages: [
        "9 años en el móvil… imagina 9 años de inglés fluido 😅",
        "¡Ese tiempo podría hacerte experto en cualquier cosa! 🎯",
        "Plot twist: ¡podrías tener 3 títulos con ese tiempo! 🎓"
      ],
      impactComparisons: {
        books: "📚 ~12 libros leídos por año",
        college: "🎓 Una carrera universitaria completa (4 años)",
        mastersDegree: "🎓 Universidad + Maestría (6 años)",
        language: "🗣️ Fluidez en 2 idiomas",
        skill: "🎯 Maestría en cualquier habilidad",
        fitness: "💪 Transformación física completa"
      }
    },
    
    challenge: {
      title: 'Desafío 7 días: -1h/día',
      completed: '¡Completado!',
      dailyProgress: 'Progreso Diario',
      statistics: 'Estadísticas',
      currentStreak: 'Racha Actual',
      consecutiveDays: 'días consecutivos',
      progress: 'Progreso',
      completeDays: 'días completos',
      achievements: 'Logros',
      restartChallenge: 'Reiniciar Desafío',
      viewAchievement: 'Ver Logro',
      congratulations: '¡Felicitaciones!',
      completedMessage: '¡Completaste el Desafío de 7 días! Ganaste más control sobre tu tiempo.',
      newCycle: '🔄 Nuevo Ciclo (-1h/día)',
      nextLevel: '🚀 Próximo Nivel (-2h/día)',
      close: 'Cerrar',
      funnyMessages: [
        "¡Día 3 completado! Estás venciendo la adicción 👏",
        "¡Estás en llamas! ¡Otro día en la bolsa! 🔥",
        "¡La consistencia es tu superpoder! 💪"
      ],
      badges: {
        start: { title: 'Primer Paso', description: 'Marcó el primer día' },
        streak3: { title: '3 Seguidos', description: '3 días consecutivos' },
        complete7: { title: 'Completó 7', description: 'Terminó el desafío' }
      }
    },
    
    smartTrades: {
      title: 'Intercambios Inteligentes',
      recommendedForYou: '¡Recomendado para ti!',
      suggestedSchedule: '📅 Horario Sugerido:',
      monthlyEquivalence: '📊 Equivalencia Mensual:',
      activatePlan: 'Activar Plan',
      planActivated: '¡Plan Activado!',
      reading: 'Lectura',
      study: 'Estudio',
      fitness: 'Fitness',
      spiritual: 'Espiritual',
      readingDesc: '2 libros/mes',
      studyDesc: '14 clases/mes',
      fitnessDesc: '24 entrenamientos/mes',
      spiritualDesc: '2 planes/mes',
      personalizedTrades: {
        student: {
          title: 'Cambia 1h en Insta por 2 clases de matemáticas',
          description: '1h = 2 clases cortas (30min cada una)',
          schedule: 'Lun–Vie: 19:30–20:30',
          equivalence: '1h/día ≈ 14 clases/mes'
        },
        professional: {
          title: 'Cambia 1h por 1 módulo de certificación',
          description: '1h = 1 módulo de certificación',
          schedule: 'Lun/Mié/Vie: 07:00–07:30 + 19:30–20:00',
          equivalence: '1h/día ≈ 2 certificaciones/mes'
        },
        parent: {
          title: 'Cambia 1h por tiempo de calidad con tu hijo',
          description: '1h = 30min lectura + 30min juego',
          schedule: 'Lun–Vie: 20:00–21:00',
          equivalence: '1h/día ≈ 30h calidad/mes'
        },
        entrepreneur: {
          title: 'Cambia 1h por 2 sprints de negocio (25min)',
          description: '1h = 2 sprints de negocio (25min Pomodoro)',
          schedule: 'Lun–Vie: 06:30–07:30',
          equivalence: '1h/día ≈ 60 sprints/mes'
        },
        spiritual: {
          title: 'Cambia 1h por lectura + oración',
          description: '1h = 15min lectura + 15min reflexión + 30min plan bíblico',
          schedule: 'Diariamente: 06:30–07:30',
          equivalence: '1h/día ≈ 2 planes/mes'
        },
        fitness: {
          title: 'Cambia 1h por entrenamiento + estiramiento',
          description: '1h = 40min entrenamiento + 20min estiramiento',
          schedule: 'Lun–Sáb: 18:30–19:30',
          equivalence: '1h/día ≈ 24 entrenamientos/mes'
        }
      }
    },
    
    settingsPage: {
      title: 'Configuración',
      subtitle: 'Personaliza tu experiencia',
      editPersona: 'Editar Persona',
      editObjectives: 'Editar Objetivos',
      reminders: 'Recordatorios Locales',
      reminderTime: 'Hora del recordatorio',
      reminderMessage: 'recordar a las 20:00 aplicar mi plan',
      language: 'Idioma',
      privacy: 'Privacidad',
      privacyMessage: 'La app no monitorea tu móvil; los datos son auto-reportados y quedan en tu navegador (localStorage).',
      clearData: 'Borrar mis datos',
      clearDataConfirm: '¿Estás seguro? Esta acción no se puede deshacer.',
      clearDataMessage: 'Todos tus datos serán eliminados permanentemente.',
      saveChanges: 'Guardar Cambios',
      cancel: 'Cancelar',
      success: '¡Éxito!',
      changesSaved: 'Tus cambios han sido guardados.',
      dataCleared: 'Todos los datos han sido eliminados.',
      darkMode: 'Modo Oscuro',
      sendFeedback: 'Enviar Feedback',
      feedbackUrl: 'https://forms.google.com/feedback-es'
    },
    
    premium: {
      title: 'Beneficios Premium',
      subtitle: 'Desbloquea todo el potencial de la app',
      upgradeButton: 'Upgrade Premium',
      benefits: {
        reports: '📊 Reportes semanales detallados con gráficos',
        comparisons: '🎯 Comparaciones avanzadas e insights personalizados',
        multiplePlans: '⚡ Múltiples planes de intercambio simultáneos',
        notifications: '🔔 Notificaciones personalizadas y recordatorios inteligentes',
        extraTips: '💡 Tips extra y estrategias exclusivas'
      },
      pricing: {
        free: 'Gratis',
        premium: 'Premium',
        monthly: '$10.99/mes',
        yearly: '$99.99/año'
      },
      subscribe: 'Suscribirse Premium',
      alreadyPremium: '¡Ya eres Premium! 🎉',
      marketingMessages: {
        invest: "Invierte solo $0.33/día y recupera años de tu vida 🚀",
        unlock: "Premium desbloquea reportes, planes extra y más motivación.",
        results: "¿Quieres resultados reales? Activa Premium ahora."
      }
    },
    
    toastMessages: [
      "3h hoy… 2h en Insta. ¿Te volviste influencer? 😅 ¿Cambias 30min por lectura?",
      "La mitad de tu energía se fue al móvil. ¿Recuperas 1h ahora?",
      "1h menos/día = +15 días/año de vida. ¿Vamos?",
      "Si fuera 1h de estudio, ya sería una clase entera.",
      "Podrías cerrar 10k pasos en esa 1h. ¿Listos?"
    ],
    tradeNowButton: 'Quiero cambiar 30min ahora',
    
    feedbackMessages: [
      "¡Genial! Acabas de recuperar 15 días de tu vida 🚀",
      "¡Bien hecho! +1h enfocada = -1h de procrastinación.",
      "¡Ganaste una insignia de consistencia!",
      "¡Felicidades! ¡Otro paso hacia la libertad digital! 🎯",
      "¡Increíble! ¡Estás reescribiendo tu relación con el tiempo! ⏰"
    ],
    
    achievementMessages: [
      "🏆 ¡Logro desbloqueado: Primer Paso!",
      "🔥 ¡Racha de 3 días! ¡Le estás agarrando la onda!",
      "🎉 ¡7 días completos! ¡Eres una máquina!",
      "⭐ Insignia especial: ¡Transformador del Tiempo!",
      "🚀 ¡Nivel Premium de autodisciplina alcanzado!"
    ]
  }
};

export function getBrowserLanguage(): Language {
  if (typeof window === 'undefined') return 'pt';
  
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('en')) return 'en';
  if (browserLang.startsWith('es')) return 'es';
  return 'pt';
}

export function getStoredLanguage(): Language {
  if (typeof window === 'undefined') return 'pt';
  
  try {
    const stored = localStorage.getItem('app_language');
    if (stored && ['pt', 'en', 'es'].includes(stored)) {
      return stored as Language;
    }
  } catch (error) {
    console.error('Error getting stored language:', error);
  }
  
  return getBrowserLanguage();
}

export function setStoredLanguage(language: Language): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('app_language', language);
  } catch (error) {
    console.error('Error storing language:', error);
  }
}