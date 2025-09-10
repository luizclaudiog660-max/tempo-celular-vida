"use client";

import { useState } from 'react';
import { Crown, Check, ArrowLeft, Zap, BarChart3, Target, Bell, Lightbulb, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Link from 'next/link';

export default function PremiumPage() {
  const { user, upgradeToPremiun } = useAuth();
  const { t, language } = useLanguage();
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');

  const handleUpgrade = () => {
    upgradeToPremiun();
    setShowCheckout(false);
    
    // Toast de sucesso
    const successMessage = language === 'pt' 
      ? 'Premium ativo. Relatórios e planos extras liberados 🚀'
      : language === 'en'
      ? 'Premium active. Reports and extra plans unlocked 🚀'
      : 'Premium activo. Reportes y planes extra desbloqueados 🚀';
    
    // Simular toast (você pode integrar com seu sistema de toast)
    alert(successMessage);
  };

  const marketingMessages = {
    pt: {
      invest: "Invista apenas R$0,33/dia e recupere anos da sua vida 🚀",
      unlock: "Premium libera relatórios, planos extras e mais motivação.",
      results: "Quer resultados reais? Desbloqueie o Premium agora."
    },
    en: {
      invest: "Invest just $0.33/day and win back years of your life 🚀",
      unlock: "Premium unlocks reports, extra plans and more motivation.",
      results: "Want real results? Unlock Premium now."
    },
    es: {
      invest: "Invierte solo $0.33/día y recupera años de tu vida 🚀",
      unlock: "Premium desbloquea reportes, planes extra y más motivación.",
      results: "¿Quieres resultados reales? Activa Premium ahora."
    }
  };

  const pricing = {
    pt: { monthly: 'R$ 10,99', yearly: 'R$ 99,99', save: 'economize 2 meses' },
    en: { monthly: '$10.99', yearly: '$99.99', save: 'save 2 months' },
    es: { monthly: '$10.99', yearly: '$99.99', save: 'ahorra 2 meses' }
  };

  if (user?.premium) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 dark:from-gray-900 dark:to-yellow-900">
        <Header />
        <div className="pt-20 p-4">
          <div className="max-w-2xl mx-auto pt-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Crown className="w-10 h-10 text-white animate-pulse" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {language === 'pt' ? 'Você já é Premium! 🎉' : 
               language === 'en' ? 'You are already Premium! 🎉' : 
               '¡Ya eres Premium! 🎉'}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              {language === 'pt' ? 'Aproveite todos os recursos desbloqueados' : 
               language === 'en' ? 'Enjoy all unlocked features' : 
               'Disfruta de todas las funciones desbloqueadas'}
            </p>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {language === 'pt' ? 'Recursos Ativos' : 
                 language === 'en' ? 'Active Features' : 
                 'Funciones Activas'}
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">📊 Relatórios detalhados</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">⚡ Múltiplos planos simultâneos</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">💡 Dicas e estratégias extras</span>
                </div>
              </div>
            </div>

            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              {language === 'pt' ? 'Voltar ao App' : 
               language === 'en' ? 'Back to App' : 
               'Volver a la App'}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-purple-900">
      <Header />
      
      {/* Modal de Checkout */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {language === 'pt' ? 'Finalizar Assinatura' : 
                 language === 'en' ? 'Complete Subscription' : 
                 'Completar Suscripción'}
              </h2>
              <button
                onClick={() => setShowCheckout(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 p-4 rounded-xl mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {selectedPlan === 'yearly' ? 
                      (language === 'pt' ? 'Plano Anual' : language === 'en' ? 'Yearly Plan' : 'Plan Anual') :
                      (language === 'pt' ? 'Plano Mensal' : language === 'en' ? 'Monthly Plan' : 'Plan Mensual')
                    }
                  </p>
                  <p className="text-2xl font-bold text-purple-600">
                    {pricing[language][selectedPlan]}
                  </p>
                </div>
                <Crown className="w-8 h-8 text-purple-600" />
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {language === 'pt' ? '🔒 Checkout simulado - dados seguros' : 
                 language === 'en' ? '🔒 Simulated checkout - secure data' : 
                 '🔒 Checkout simulado - datos seguros'}
              </p>
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {language === 'pt' ? 'Em produção, aqui seria integrado com Stripe ou outro gateway de pagamento.' : 
                   language === 'en' ? 'In production, this would be integrated with Stripe or another payment gateway.' : 
                   'En producción, esto se integraría con Stripe u otra pasarela de pago.'}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowCheckout(false)}
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                {language === 'pt' ? 'Cancelar' : language === 'en' ? 'Cancel' : 'Cancelar'}
              </button>
              <button
                onClick={handleUpgrade}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
              >
                {language === 'pt' ? 'Confirmar' : language === 'en' ? 'Confirm' : 'Confirmar'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="pt-20 p-4">
        <div className="max-w-4xl mx-auto pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {language === 'pt' ? 'Voltar' : language === 'en' ? 'Back' : 'Volver'}
          </Link>

          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Crown className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {language === 'pt' ? 'Desbloqueie o Premium' : 
               language === 'en' ? 'Unlock Premium' : 
               'Desbloquea Premium'}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              {marketingMessages[language].invest}
            </p>
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 p-4 rounded-xl inline-block">
              <p className="text-purple-800 dark:text-purple-200 font-medium">
                {marketingMessages[language].unlock}
              </p>
            </div>
          </div>

          {/* Benefícios */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="w-8 h-8 text-blue-500" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {language === 'pt' ? 'Relatórios Detalhados' : 
                   language === 'en' ? 'Detailed Reports' : 
                   'Reportes Detallados'}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {language === 'pt' ? 'Gráficos semanais com insights personalizados sobre seu progresso e padrões de uso.' : 
                 language === 'en' ? 'Weekly charts with personalized insights about your progress and usage patterns.' : 
                 'Gráficos semanales con insights personalizados sobre tu progreso y patrones de uso.'}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-8 h-8 text-yellow-500" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {language === 'pt' ? 'Múltiplos Planos' : 
                   language === 'en' ? 'Multiple Plans' : 
                   'Múltiples Planes'}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {language === 'pt' ? 'Ative vários planos de troca simultaneamente. Versão gratuita permite apenas 1 plano.' : 
                 language === 'en' ? 'Activate multiple trade plans simultaneously. Free version allows only 1 plan.' : 
                 'Activa varios planes de intercambio simultáneamente. La versión gratuita permite solo 1 plan.'}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-8 h-8 text-green-500" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {language === 'pt' ? 'Comparativos Avançados' : 
                   language === 'en' ? 'Advanced Comparisons' : 
                   'Comparaciones Avanzadas'}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {language === 'pt' ? 'Visualize o impacto real do tempo recuperado com comparações personalizadas.' : 
                 language === 'en' ? 'Visualize the real impact of recovered time with personalized comparisons.' : 
                 'Visualiza el impacto real del tiempo recuperado con comparaciones personalizadas.'}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="w-8 h-8 text-purple-500" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {language === 'pt' ? 'Dicas Exclusivas' : 
                   language === 'en' ? 'Exclusive Tips' : 
                   'Tips Exclusivos'}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {language === 'pt' ? 'Pacote extra de mensagens motivacionais e estratégias avançadas de produtividade.' : 
                 language === 'en' ? 'Extra pack of motivational messages and advanced productivity strategies.' : 
                 'Paquete extra de mensajes motivacionales y estrategias avanzadas de productividad.'}
              </p>
            </div>
          </div>

          {/* Preços */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
              {language === 'pt' ? 'Escolha seu Plano' : 
               language === 'en' ? 'Choose Your Plan' : 
               'Elige tu Plan'}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Plano Mensal */}
              <div className={`p-6 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                selectedPlan === 'monthly' 
                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                  : 'border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500'
              }`}
              onClick={() => setSelectedPlan('monthly')}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {language === 'pt' ? 'Mensal' : language === 'en' ? 'Monthly' : 'Mensual'}
                  </h3>
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    selectedPlan === 'monthly' 
                      ? 'border-purple-500 bg-purple-500' 
                      : 'border-gray-300 dark:border-gray-600'
                  }`} />
                </div>
                <p className="text-3xl font-bold text-purple-600 mb-2">
                  {pricing[language].monthly}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {language === 'pt' ? 'por mês' : language === 'en' ? 'per month' : 'por mes'}
                </p>
              </div>

              {/* Plano Anual */}
              <div className={`p-6 rounded-xl border-2 transition-all duration-200 cursor-pointer relative ${
                selectedPlan === 'yearly' 
                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                  : 'border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500'
              }`}
              onClick={() => setSelectedPlan('yearly')}>
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {pricing[language].save}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {language === 'pt' ? 'Anual' : language === 'en' ? 'Yearly' : 'Anual'}
                  </h3>
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    selectedPlan === 'yearly' 
                      ? 'border-purple-500 bg-purple-500' 
                      : 'border-gray-300 dark:border-gray-600'
                  }`} />
                </div>
                <p className="text-3xl font-bold text-purple-600 mb-2">
                  {pricing[language].yearly}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {language === 'pt' ? 'por ano' : language === 'en' ? 'per year' : 'por año'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowCheckout(true)}
              className="w-full mt-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {language === 'pt' ? 'Assinar Premium' : 
               language === 'en' ? 'Subscribe Premium' : 
               'Suscribirse Premium'}
            </button>
          </div>

          {/* CTA Final */}
          <div className="text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">
              {marketingMessages[language].results}
            </h2>
            <p className="text-purple-100 mb-6">
              {language === 'pt' ? 'Junte-se a milhares de pessoas que já transformaram sua relação com o tempo.' : 
               language === 'en' ? 'Join thousands of people who have already transformed their relationship with time.' : 
               'Únete a miles de personas que ya han transformado su relación con el tiempo.'}
            </p>
            <button
              onClick={() => setShowCheckout(true)}
              className="bg-white text-purple-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
            >
              {language === 'pt' ? 'Começar Agora' : 
               language === 'en' ? 'Start Now' : 
               'Empezar Ahora'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}