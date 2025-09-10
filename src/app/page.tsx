"use client";

import { useState, useEffect } from 'react';
import { Calculator, User, Target, Clock, BookOpen, Briefcase, Heart, Lightbulb, Dumbbell, Church, ArrowLeft, Check, Zap, Star, Trophy, Flame, Award, RotateCcw, TrendingUp, Crown } from 'lucide-react';
import MessageToast from '@/components/MessageToast';
import FeedbackToast, { useFeedbackToast } from '@/components/FeedbackToast';
import Header from '@/components/Header';
import LoginForm from '@/components/LoginForm';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

interface UserProfile {
  persona: string;
  objectives: string[];
}

interface CalculationResult {
  hoursPerDay: number;
  hoursPerWeek: number;
  hoursPerMonth: number;
  hoursPerYear: number;
  daysPerYear: number;
  age?: number;
}

interface SmartTrade {
  title: string;
  description: string;
  schedule: string;
  equivalence: string;
}

interface ChallengeProgress {
  day1: boolean;
  day2: boolean;
  day3: boolean;
  day4: boolean;
  day5: boolean;
  day6: boolean;
  day7: boolean;
  startDate: string;
  completedAt?: string;
}

interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedAt?: string;
}

const PERSONAS = [
  { id: 'student', label: 'student', icon: BookOpen },
  { id: 'professional', label: 'professional', icon: Briefcase },
  { id: 'parent', label: 'parent', icon: Heart },
  { id: 'entrepreneur', label: 'entrepreneur', icon: Lightbulb },
  { id: 'spiritual', label: 'spiritual', icon: Church },
  { id: 'fitness', label: 'fitness', icon: Dumbbell },
];

export default function Home() {
  const { t } = useLanguage();
  const { user, profile, progress, updateProfile, updateProgress, isLoading } = useAuth();
  const { toast, showToast, hideToast } = useFeedbackToast();
  const [step, setStep] = useState<'onboarding-a' | 'onboarding-b' | 'calculator' | 'results'>('onboarding-a');
  const [localProfile, setLocalProfile] = useState<UserProfile>({ persona: '', objectives: [] });
  const [otherObjective, setOtherObjective] = useState('');
  const [hours, setHours] = useState('');
  const [age, setAge] = useState('');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [highlightTrades, setHighlightTrades] = useState(false);
  const [challengeProgress, setChallengeProgress] = useState<ChallengeProgress>({
    day1: false,
    day2: false,
    day3: false,
    day4: false,
    day5: false,
    day6: false,
    day7: false,
    startDate: ''
  });
  const [badges, setBadges] = useState<Badge[]>([
    { id: 'start', title: '', description: '', icon: '🚀', earned: false },
    { id: 'streak3', title: '', description: '', icon: '🔥', earned: false },
    { id: 'complete7', title: '', description: '', icon: '🏆', earned: false }
  ]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showLoginSuccess, setShowLoginSuccess] = useState(false);

  // Função para obter mensagem aleatória
  const getRandomMessage = (messages: string[]) => {
    return messages[Math.floor(Math.random() * messages.length)];
  };

  // Função para obter trocas personalizadas
  const getPersonalizedTrade = (persona: string): SmartTrade => {
    return t.smartTrades.personalizedTrades[persona as keyof typeof t.smartTrades.personalizedTrades];
  };

  // Função para obter comparativos de impacto
  const getImpactComparisons = (years: number) => {
    const comparisons = [];
    
    if (years >= 1) {
      comparisons.push({
        icon: '📚',
        text: t.results.impactComparisons.books,
        color: 'from-blue-500 to-cyan-500'
      });
    }
    
    if (years >= 2) {
      comparisons.push({
        icon: '🗣️',
        text: t.results.impactComparisons.language,
        color: 'from-green-500 to-emerald-500'
      });
    }
    
    if (years >= 4) {
      comparisons.push({
        icon: '🎓',
        text: t.results.impactComparisons.college,
        color: 'from-purple-500 to-pink-500'
      });
    }
    
    if (years >= 6) {
      comparisons.push({
        icon: '🎯',
        text: t.results.impactComparisons.mastersDegree,
        color: 'from-orange-500 to-red-500'
      });
    }
    
    if (years >= 3) {
      comparisons.push({
        icon: '💪',
        text: t.results.impactComparisons.fitness,
        color: 'from-teal-500 to-blue-500'
      });
    }

    return comparisons.slice(0, 4); // Máximo 4 comparações
  };

  // Carregar dados do usuário quando logado
  useEffect(() => {
    if (user && profile) {
      setLocalProfile(profile);
      if (profile.persona && profile.objectives.length > 0) {
        setStep('calculator');
      } else if (profile.persona) {
        setStep('onboarding-b');
      }
    }

    if (user && progress) {
      if (progress.challenge7d) {
        setChallengeProgress(progress.challenge7d);
      }
      if (progress.selectedPlan) {
        setSelectedPlan(progress.selectedPlan);
      }
      if (progress.badges) {
        setBadges(prev => prev.map((badge, index) => ({
          ...badge,
          earned: progress.badges[index]?.earned || false,
          earnedAt: progress.badges[index]?.earnedAt
        })));
      }
    }
  }, [user, profile, progress]);

  useEffect(() => {
    // Atualizar badges com traduções
    setBadges(prev => prev.map((badge, index) => {
      const badgeKeys = ['start', 'streak3', 'complete7'];
      const badgeKey = badgeKeys[index] as 'start' | 'streak3' | 'complete7';
      return {
        ...badge,
        title: t.challenge.badges[badgeKey].title,
        description: t.challenge.badges[badgeKey].description
      };
    }));
  }, [t]);

  const handleLoginSuccess = () => {
    setShowLoginSuccess(true);
    const successMessage = t.language === 'pt' 
      ? 'Conta criada! Vamos recuperar tempo de vida ⏱️'
      : t.language === 'en'
      ? 'Account created! Let\'s recover life time ⏱️'
      : '¡Cuenta creada! Vamos a recuperar tiempo de vida ⏱️';
    
    showToast(successMessage, 'success');
    setTimeout(() => setShowLoginSuccess(false), 3000);
  };

  const handlePersonaSelect = (persona: string) => {
    const newProfile = { ...localProfile, persona };
    setLocalProfile(newProfile);
    if (user) {
      updateProfile(newProfile);
    }
    setStep('onboarding-b');
  };

  const handleObjectiveToggle = (objective: string) => {
    const newObjectives = localProfile.objectives.includes(objective)
      ? localProfile.objectives.filter(obj => obj !== objective)
      : [...localProfile.objectives, objective];
    
    const newProfile = { ...localProfile, objectives: newObjectives };
    setLocalProfile(newProfile);
  };

  const handleAddOtherObjective = () => {
    if (otherObjective.trim() && !localProfile.objectives.includes(otherObjective.trim())) {
      const newProfile = { ...localProfile, objectives: [...localProfile.objectives, otherObjective.trim()] };
      setLocalProfile(newProfile);
      setOtherObjective('');
    }
  };

  const handleCompleteOnboarding = () => {
    if (localProfile.objectives.length > 0) {
      if (user) {
        updateProfile(localProfile);
      }
      setStep('calculator');
    }
  };

  const calculateTime = () => {
    const hoursPerDay = parseFloat(hours);
    const userAge = parseInt(age);
    if (isNaN(hoursPerDay) || hoursPerDay <= 0) return;

    const result: CalculationResult = {
      hoursPerDay,
      hoursPerWeek: hoursPerDay * 7,
      hoursPerMonth: hoursPerDay * 30,
      hoursPerYear: hoursPerDay * 365,
      daysPerYear: (hoursPerDay * 365) / 24,
      age: userAge || undefined
    };

    setResult(result);
    setStep('results');

    // Mostrar feedback positivo
    const funnyMessage = getRandomMessage(t.results.funnyMessages);
    showToast(funnyMessage, 'info');
  };

  const handleActivatePlan = (planType: string) => {
    setSelectedPlan(planType);
    setHighlightTrades(false);

    // Atualizar progresso do usuário
    if (user && progress) {
      const newProgress = { ...progress, selectedPlan: planType };
      updateProgress(newProgress);
    }

    // Mostrar feedback positivo
    const feedbackMessage = getRandomMessage(t.feedbackMessages);
    showToast(feedbackMessage, 'success');
  };

  const handleHighlightTrades = () => {
    setHighlightTrades(true);
    // Scroll suave para a seção de trocas
    setTimeout(() => {
      const tradesSection = document.getElementById('smart-trades');
      tradesSection?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleChallengeCheck = (day: keyof ChallengeProgress) => {
    if (day === 'startDate' || day === 'completedAt') return;

    const newProgress = { ...challengeProgress };
    
    // Se é o primeiro check, definir data de início
    if (!newProgress.startDate) {
      newProgress.startDate = new Date().toISOString();
    }

    newProgress[day] = !newProgress[day];
    setChallengeProgress(newProgress);

    // Atualizar progresso do usuário
    if (user && progress) {
      const updatedProgress = { ...progress, challenge7d: newProgress };
      updateProgress(updatedProgress);
    }

    // Mostrar feedback positivo
    if (newProgress[day]) {
      const challengeMessage = getRandomMessage(t.challenge.funnyMessages);
      showToast(challengeMessage, 'achievement');
    }

    // Verificar badges
    checkAndAwardBadges(newProgress);
  };

  const checkAndAwardBadges = (progressData: ChallengeProgress) => {
    const newBadges = [...badges];
    let hasNewBadge = false;

    // Badge "Primeiro Passo"
    const hasAnyCheck = Object.keys(progressData).some(key => 
      key.startsWith('day') && progressData[key as keyof ChallengeProgress]
    );
    if (hasAnyCheck && !newBadges[0].earned) {
      newBadges[0].earned = true;
      newBadges[0].earnedAt = new Date().toISOString();
      hasNewBadge = true;
      showToast(t.achievementMessages[0], 'achievement');
    }

    // Badge "3 em Linha"
    const streak = calculateStreak(progressData);
    if (streak >= 3 && !newBadges[1].earned) {
      newBadges[1].earned = true;
      newBadges[1].earnedAt = new Date().toISOString();
      hasNewBadge = true;
      showToast(t.achievementMessages[1], 'achievement');
    }

    // Badge "Concluiu 7"
    const completedDays = Object.keys(progressData).filter(key => 
      key.startsWith('day') && progressData[key as keyof ChallengeProgress]
    ).length;
    if (completedDays === 7 && !newBadges[2].earned) {
      newBadges[2].earned = true;
      newBadges[2].earnedAt = new Date().toISOString();
      progressData.completedAt = new Date().toISOString();
      setShowCelebration(true);
      hasNewBadge = true;
      showToast(t.achievementMessages[2], 'achievement');
    }

    if (hasNewBadge) {
      setBadges(newBadges);
      
      // Atualizar progresso do usuário
      if (user && progress) {
        const updatedProgress = { ...progress, badges: newBadges, challenge7d: progressData };
        updateProgress(updatedProgress);
      }
    }
  };

  const calculateStreak = (progressData: ChallengeProgress): number => {
    const days = ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7'];
    let maxStreak = 0;
    let currentStreak = 0;

    for (const day of days) {
      if (progressData[day as keyof ChallengeProgress]) {
        currentStreak++;
        maxStreak = Math.max(maxStreak, currentStreak);
      } else {
        currentStreak = 0;
      }
    }

    return maxStreak;
  };

  const resetChallenge = () => {
    const newProgress: ChallengeProgress = {
      day1: false,
      day2: false,
      day3: false,
      day4: false,
      day5: false,
      day6: false,
      day7: false,
      startDate: new Date().toISOString()
    };
    setChallengeProgress(newProgress);
    setShowCelebration(false);

    // Atualizar progresso do usuário
    if (user && progress) {
      const updatedProgress = { ...progress, challenge7d: newProgress };
      updateProgress(updatedProgress);
    }
  };

  const resetProfile = () => {
    setLocalProfile({ persona: '', objectives: [] });
    setSelectedPlan('');
    if (user) {
      updateProfile({ persona: '', objectives: [] });
      if (progress) {
        updateProgress({ ...progress, selectedPlan: '' });
      }
    }
    setStep('onboarding-a');
  };

  // Mostrar loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Clock className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-600 dark:text-gray-300">Carregando...</p>
        </div>
      </div>
    );
  }

  // Mostrar tela de login se não estiver logado
  if (!user) {
    return <LoginForm onSuccess={handleLoginSuccess} />;
  }

  if (step === 'onboarding-a') {
    const funnyMessage = getRandomMessage(t.onboardingA.funnyMessages);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
        <Header />
        <FeedbackToast {...toast} onClose={hideToast} />
        <div className="pt-20 p-4">
          <div className="max-w-2xl mx-auto pt-8">
            <div className="text-center mb-6">
              <div className="text-2xl mb-4">{funnyMessage}</div>
            </div>

            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t.onboardingA.title}</h1>
              <p className="text-gray-600 dark:text-gray-300">{t.onboardingA.subtitle}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {PERSONAS.map((persona) => {
                const Icon = persona.icon;
                return (
                  <button
                    key={persona.id}
                    onClick={() => handlePersonaSelect(persona.id)}
                    className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-600"
                  >
                    <Icon className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{t.onboardingA.personas[persona.label as keyof typeof t.onboardingA.personas]}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'onboarding-b') {
    const funnyMessage = getRandomMessage(t.onboardingB.funnyMessages);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-purple-900">
        <Header />
        <FeedbackToast {...toast} onClose={hideToast} />
        <div className="pt-20 p-4">
          <div className="max-w-2xl mx-auto pt-8">
            <button
              onClick={() => setStep('onboarding-a')}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t.onboardingB.backButton}
            </button>

            <div className="text-center mb-6">
              <div className="text-2xl mb-4">{funnyMessage}</div>
            </div>

            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t.onboardingB.title}</h1>
              <p className="text-gray-600 dark:text-gray-300">{t.onboardingB.subtitle}</p>
            </div>

            <div className="space-y-3 mb-6">
              {t.onboardingB.objectives.map((objective) => (
                <label
                  key={objective}
                  className="flex items-center gap-3 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={localProfile.objectives.includes(objective)}
                    onChange={() => handleObjectiveToggle(objective)}
                    className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <span className="text-gray-900 dark:text-white font-medium">{objective}</span>
                </label>
              ))}
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.onboardingB.otherObjective}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={otherObjective}
                  onChange={(e) => setOtherObjective(e.target.value)}
                  placeholder="Digite seu objetivo personalizado"
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddOtherObjective()}
                />
                <button
                  onClick={handleAddOtherObjective}
                  disabled={!otherObjective.trim()}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {t.onboardingB.addButton}
                </button>
              </div>
            </div>

            <button
              onClick={handleCompleteOnboarding}
              disabled={localProfile.objectives.length === 0}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {t.onboardingB.continueButton}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'calculator') {
    const selectedPersona = PERSONAS.find(p => p.id === localProfile.persona);
    const funnyMessage = getRandomMessage(t.calculator.funnyMessages);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 dark:from-gray-900 dark:to-green-900">
        <Header />
        <FeedbackToast {...toast} onClose={hideToast} />
        <div className="pt-20 p-4">
          <div className="max-w-2xl mx-auto pt-8">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-xl shadow-sm mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {selectedPersona && <selectedPersona.icon className="w-6 h-6 text-blue-600" />}
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{selectedPersona && t.onboardingA.personas[selectedPersona.label as keyof typeof t.onboardingA.personas]}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{localProfile.objectives.slice(0, 2).join(', ')}</p>
                  </div>
                </div>
                <button
                  onClick={resetProfile}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                >
                  {t.calculator.changeProfile}
                </button>
              </div>
            </div>

            <div className="text-center mb-6">
              <div className="text-2xl mb-4">{funnyMessage}</div>
            </div>

            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calculator className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t.calculator.title}</h1>
              <p className="text-gray-600 dark:text-gray-300">{t.calculator.subtitle}</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
              <div className="mb-6">
                <label htmlFor="age" className="block text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {t.calculator.ageLabel}
                </label>
                <input
                  type="number"
                  id="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder={t.calculator.agePlaceholder}
                  min="1"
                  max="120"
                  className="w-full px-4 py-3 text-xl border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 mb-6 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="hours" className="block text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {t.calculator.hoursLabel}
                </label>
                <input
                  type="number"
                  id="hours"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  placeholder={t.calculator.hoursPlaceholder}
                  step="0.1"
                  min="0"
                  className="w-full px-4 py-3 text-xl border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <button
                onClick={calculateTime}
                disabled={!hours || parseFloat(hours) <= 0}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-green-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              >
                {t.calculator.calculateButton}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'results' && result) {
    const selectedPersona = PERSONAS.find(p => p.id === localProfile.persona);
    const personalizedTrade = getPersonalizedTrade(localProfile.persona);
    const showSmartTrades = result.hoursPerDay >= 1;
    const currentStreak = calculateStreak(challengeProgress);
    const completedDays = Object.keys(challengeProgress).filter(key => 
      key.startsWith('day') && challengeProgress[key as keyof ChallengeProgress]
    ).length;
    const isCompleted = completedDays === 7;
    const yearsOnPhone = Math.round(result.daysPerYear / 365);
    const impactComparisons = getImpactComparisons(yearsOnPhone);
    const funnyMessage = getRandomMessage(t.results.funnyMessages);

    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 dark:from-gray-900 dark:to-orange-900">
        <Header />
        <MessageToast onHighlightTrades={handleHighlightTrades} />
        <FeedbackToast {...toast} onClose={hideToast} />
        
        {showCelebration && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full text-center animate-in zoom-in-95 duration-300">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t.challenge.congratulations}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">{t.challenge.completedMessage}</p>
              
              <div className="space-y-3">
                <button
                  onClick={resetChallenge}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300"
                >
                  {t.challenge.newCycle}
                </button>
                <button
                  onClick={() => setShowCelebration(false)}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                >
                  {t.challenge.nextLevel}
                </button>
                <button
                  onClick={() => setShowCelebration(false)}
                  className="w-full text-gray-600 dark:text-gray-300 py-2"
                >
                  {t.challenge.close}
                </button>
              </div>
            </div>
          </div>
        )}
        
        <div className="pt-20 p-4">
          <div className="max-w-4xl mx-auto pt-8">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-xl shadow-sm mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {selectedPersona && <selectedPersona.icon className="w-6 h-6 text-orange-600" />}
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{selectedPersona && t.onboardingA.personas[selectedPersona.label as keyof typeof t.onboardingA.personas]}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{localProfile.objectives.slice(0, 2).join(', ')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!user?.premium && (
                    <Link
                      href="/premium"
                      className="flex items-center gap-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                    >
                      <Crown className="w-3 h-3" />
                      {t.premium.upgradeButton}
                    </Link>
                  )}
                  <button
                    onClick={() => setStep('calculator')}
                    className="text-sm text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-300 font-medium"
                  >
                    {t.results.newConsultation}
                  </button>
                </div>
              </div>
            </div>

            <div className="text-center mb-6">
              <div className="text-2xl mb-4">{funnyMessage}</div>
            </div>

            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t.results.title}</h1>
              <p className="text-gray-600 dark:text-gray-300">{t.results.subtitle}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center">
                <p className="text-3xl font-bold text-orange-600 mb-2">{result.hoursPerDay}h</p>
                <p className="text-gray-600 dark:text-gray-300 font-medium">{t.results.perDay}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center">
                <p className="text-3xl font-bold text-red-600 mb-2">{result.hoursPerWeek}h</p>
                <p className="text-gray-600 dark:text-gray-300 font-medium">{t.results.perWeek}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center">
                <p className="text-3xl font-bold text-purple-600 mb-2">{result.hoursPerMonth}h</p>
                <p className="text-gray-600 dark:text-gray-300 font-medium">{t.results.perMonth}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center">
                <p className="text-3xl font-bold text-pink-600 mb-2">{Math.round(result.daysPerYear)}</p>
                <p className="text-gray-600 dark:text-gray-300 font-medium">{t.results.daysPerYear}</p>
              </div>
            </div>

            {/* Comparativos de Impacto */}
            {impactComparisons.length > 0 && (
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                  💡 Com esse tempo você poderia ter...
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {impactComparisons.map((comparison, index) => (
                    <div
                      key={index}
                      className={`bg-gradient-to-r ${comparison.color} p-4 rounded-xl text-white text-center`}
                    >
                      <div className="text-2xl mb-2">{comparison.icon}</div>
                      <p className="text-sm font-medium">{comparison.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Desafio 7 dias */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl mb-6">
              <div className="flex items-center gap-3 mb-6">
                <Trophy className="w-8 h-8 text-yellow-500" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t.challenge.title}</h2>
                {isCompleted && (
                  <div className="flex items-center gap-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium">
                    <Check className="w-4 h-4" />
                    {t.challenge.completed}
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{t.challenge.dailyProgress}</h3>
                  <div className="grid grid-cols-7 gap-2">
                    {[1, 2, 3, 4, 5, 6, 7].map((day) => {
                      const dayKey = `day${day}` as keyof ChallengeProgress;
                      const isChecked = challengeProgress[dayKey];
                      return (
                        <div key={day} className="text-center">
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">D{day}</p>
                          <button
                            onClick={() => handleChallengeCheck(dayKey)}
                            className={`w-10 h-10 rounded-xl border-2 transition-all duration-200 ${
                              isChecked
                                ? 'bg-green-500 border-green-500 text-white animate-pulse'
                                : 'border-gray-300 dark:border-gray-600 hover:border-green-400 hover:bg-green-50 dark:hover:bg-green-900/20'
                            }`}
                          >
                            {isChecked && <Check className="w-5 h-5 mx-auto" />}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{t.challenge.statistics}</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                      <Flame className="w-5 h-5 text-orange-500" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{t.challenge.currentStreak}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{currentStreak} {t.challenge.consecutiveDays}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-green-50 dark:bg-green-900/30 p-3 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{t.challenge.progress}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{completedDays}/7 {t.challenge.completeDays}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{t.challenge.achievements}</h3>
                <div className="grid grid-cols-3 gap-4">
                  {badges.map((badge) => (
                    <div
                      key={badge.id}
                      className={`p-4 rounded-xl text-center transition-all duration-200 ${
                        badge.earned
                          ? 'bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 border-2 border-yellow-300 dark:border-yellow-600'
                          : 'bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 opacity-60'
                      }`}
                    >
                      <div className="text-2xl mb-2">{badge.icon}</div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">{badge.title}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-300">{badge.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={resetChallenge}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  {t.challenge.restartChallenge}
                </button>
                {isCompleted && (
                  <button
                    onClick={() => setShowCelebration(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-300"
                  >
                    <Award className="w-4 h-4" />
                    {t.challenge.viewAchievement}
                  </button>
                )}
              </div>
            </div>

            {showSmartTrades && (
              <div id="smart-trades" className={`transition-all duration-500 ${highlightTrades ? 'ring-4 ring-yellow-400 ring-opacity-75' : ''}`}>
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl mb-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Zap className="w-8 h-8 text-yellow-500" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t.smartTrades.title}</h2>
                    {highlightTrades && (
                      <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full text-sm font-medium">
                        <Star className="w-4 h-4" />
                        {t.smartTrades.recommendedForYou}
                      </div>
                    )}
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 p-6 rounded-xl border-2 border-blue-200 dark:border-blue-700">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{personalizedTrade.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">{personalizedTrade.description}</p>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white mb-2">{t.smartTrades.suggestedSchedule}</p>
                        <p className="text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 p-3 rounded-lg">{personalizedTrade.schedule}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white mb-2">{t.smartTrades.monthlyEquivalence}</p>
                        <p className="text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 p-3 rounded-lg">{personalizedTrade.equivalence}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleActivatePlan(localProfile.persona)}
                      className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] ${
                        selectedPlan === localProfile.persona
                          ? 'bg-green-600 text-white'
                          : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                      }`}
                    >
                      {selectedPlan === localProfile.persona ? (
                        <span className="flex items-center justify-center gap-2">
                          <Check className="w-5 h-5" />
                          {t.smartTrades.planActivated}
                        </span>
                      ) : (
                        t.smartTrades.activatePlan
                      )}
                    </button>
                  </div>

                  {/* Versão Premium vs Gratuita */}
                  {user?.premium ? (
                    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 p-4 rounded-xl">
                        <p className="text-2xl font-bold text-blue-600 mb-2">📚</p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{t.smartTrades.reading}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-300">{t.smartTrades.readingDesc}</p>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 p-4 rounded-xl">
                        <p className="text-2xl font-bold text-green-600 mb-2">🎓</p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{t.smartTrades.study}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-300">{t.smartTrades.studyDesc}</p>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 p-4 rounded-xl">
                        <p className="text-2xl font-bold text-purple-600 mb-2">💪</p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{t.smartTrades.fitness}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-300">{t.smartTrades.fitnessDesc}</p>
                      </div>
                      <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 p-4 rounded-xl">
                        <p className="text-2xl font-bold text-orange-600 mb-2">🙏</p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{t.smartTrades.spiritual}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-300">{t.smartTrades.spiritualDesc}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-6 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 p-6 rounded-xl border-2 border-purple-200 dark:border-purple-700">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white mb-2">🔓 Desbloqueie múltiplos planos</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Com Premium você pode ativar vários planos simultaneamente</p>
                        </div>
                        <Link
                          href="/premium"
                          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center gap-2"
                        >
                          <Crown className="w-4 h-4" />
                          Upgrade
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
}