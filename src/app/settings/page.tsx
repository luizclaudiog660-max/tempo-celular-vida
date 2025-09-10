"use client";

import { useState, useEffect } from 'react';
import { ArrowLeft, User, Target, Globe, Moon, Sun, Shield, Trash2, MessageSquare, LogOut, Crown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Link from 'next/link';

export default function SettingsPage() {
  const { user, profile, settings, logout, updateProfile, updateSettings } = useAuth();
  const { t, language, setLanguage } = useLanguage();
  const [darkMode, setDarkMode] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    if (settings) {
      setDarkMode(settings.darkMode);
    }
  }, [settings]);

  const handleLanguageChange = (newLang: 'pt' | 'en' | 'es') => {
    setLanguage(newLang);
    if (settings) {
      updateSettings({ ...settings, language: newLang });
    }
  };

  const handleDarkModeToggle = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    if (settings) {
      updateSettings({ ...settings, darkMode: newDarkMode });
    }
    
    // Aplicar dark mode no documento
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleClearData = () => {
    // Limpar todos os dados do usuário
    if (user) {
      const userKeys = [
        `tciv:user:${user.email}:profile`,
        `tciv:user:${user.email}:progress`,
        `tciv:user:${user.email}:settings`,
        `tciv:user:${user.email}:auth`,
        'tciv:current_user'
      ];
      
      userKeys.forEach(key => {
        localStorage.removeItem(key);
      });
    }
    
    // Fazer logout
    logout();
    
    setShowClearConfirm(false);
    alert(language === 'pt' ? 'Todos os dados foram removidos.' : 
          language === 'en' ? 'All data has been cleared.' : 
          'Todos los datos han sido eliminados.');
  };

  const handleLogout = () => {
    logout();
  };

  const feedbackUrls = {
    pt: 'https://forms.google.com/feedback-pt',
    en: 'https://forms.google.com/feedback-en',
    es: 'https://forms.google.com/feedback-es'
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 dark:from-gray-900 dark:to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {language === 'pt' ? 'Você precisa estar logado para acessar as configurações.' : 
             language === 'en' ? 'You need to be logged in to access settings.' : 
             'Necesitas estar logueado para acceder a la configuración.'}
          </p>
          <Link
            href="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            {language === 'pt' ? 'Voltar ao Início' : 
             language === 'en' ? 'Back to Home' : 
             'Volver al Inicio'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 dark:from-gray-900 dark:to-blue-900">
      <Header />
      
      {/* Modal de Confirmação */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full">
            <div className="text-center mb-6">
              <Trash2 className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {language === 'pt' ? 'Apagar todos os dados?' : 
                 language === 'en' ? 'Delete all data?' : 
                 '¿Eliminar todos los datos?'}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {language === 'pt' ? 'Esta ação não pode ser desfeita. Todos os seus dados serão removidos permanentemente.' : 
                 language === 'en' ? 'This action cannot be undone. All your data will be permanently removed.' : 
                 'Esta acción no se puede deshacer. Todos tus datos serán eliminados permanentemente.'}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                {language === 'pt' ? 'Cancelar' : language === 'en' ? 'Cancel' : 'Cancelar'}
              </button>
              <button
                onClick={handleClearData}
                className="flex-1 bg-red-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors"
              >
                {language === 'pt' ? 'Apagar' : language === 'en' ? 'Delete' : 'Eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="pt-20 p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {language === 'pt' ? 'Voltar' : language === 'en' ? 'Back' : 'Volver'}
          </Link>

          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-gray-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {language === 'pt' ? 'Configurações' : language === 'en' ? 'Settings' : 'Configuración'}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {language === 'pt' ? 'Personalize sua experiência' : 
               language === 'en' ? 'Customize your experience' : 
               'Personaliza tu experiencia'}
            </p>
          </div>

          <div className="space-y-6">
            {/* Conta */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <User className="w-6 h-6 text-blue-500" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {language === 'pt' ? 'Conta' : language === 'en' ? 'Account' : 'Cuenta'}
                </h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{user.email}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {user.premium ? (
                        <span className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400">
                          <Crown className="w-4 h-4" />
                          {language === 'pt' ? 'Premium Ativo' : language === 'en' ? 'Premium Active' : 'Premium Activo'}
                        </span>
                      ) : (
                        language === 'pt' ? 'Conta Gratuita' : language === 'en' ? 'Free Account' : 'Cuenta Gratuita'
                      )}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    {language === 'pt' ? 'Sair' : language === 'en' ? 'Logout' : 'Salir'}
                  </button>
                </div>
              </div>
            </div>

            {/* Perfil */}
            {profile && (
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-6 h-6 text-green-500" />
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {language === 'pt' ? 'Perfil' : language === 'en' ? 'Profile' : 'Perfil'}
                  </h2>
                </div>
                
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                      {language === 'pt' ? 'Persona:' : language === 'en' ? 'Persona:' : 'Persona:'}
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white capitalize">{profile.persona}</p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                      {language === 'pt' ? 'Objetivos:' : language === 'en' ? 'Goals:' : 'Objetivos:'}
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {profile.objectives.slice(0, 3).join(', ')}
                      {profile.objectives.length > 3 && ` +${profile.objectives.length - 3} mais`}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Idioma */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-6 h-6 text-purple-500" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {language === 'pt' ? 'Idioma' : language === 'en' ? 'Language' : 'Idioma'}
                </h2>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                {[
                  { code: 'pt' as const, label: 'Português', flag: '🇧🇷' },
                  { code: 'en' as const, label: 'English', flag: '🇺🇸' },
                  { code: 'es' as const, label: 'Español', flag: '🇪🇸' }
                ].map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                      language === lang.code
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500'
                    }`}
                  >
                    <div className="text-2xl mb-1">{lang.flag}</div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{lang.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Aparência */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                {darkMode ? <Moon className="w-6 h-6 text-indigo-500" /> : <Sun className="w-6 h-6 text-yellow-500" />}
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {language === 'pt' ? 'Aparência' : language === 'en' ? 'Appearance' : 'Apariencia'}
                </h2>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {language === 'pt' ? 'Modo Escuro' : language === 'en' ? 'Dark Mode' : 'Modo Oscuro'}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {language === 'pt' ? 'Alternar entre tema claro e escuro' : 
                     language === 'en' ? 'Switch between light and dark theme' : 
                     'Alternar entre tema claro y oscuro'}
                  </p>
                </div>
                <button
                  onClick={handleDarkModeToggle}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    darkMode ? 'bg-indigo-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      darkMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Privacidade */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-green-500" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {language === 'pt' ? 'Privacidade' : language === 'en' ? 'Privacy' : 'Privacidad'}
                </h2>
              </div>
              
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg">
                <p className="text-sm text-green-800 dark:text-green-200">
                  🔒 {language === 'pt' ? 'Seus dados ficam apenas no seu navegador (localStorage). O app não monitora seu celular nem envia dados para servidores externos.' : 
                       language === 'en' ? 'Your data stays only in your browser (localStorage). The app does not monitor your phone or send data to external servers.' : 
                       'Tus datos se quedan solo en tu navegador (localStorage). La app no monitorea tu móvil ni envía datos a servidores externos.'}
                </p>
              </div>
            </div>

            {/* Ações */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {language === 'pt' ? 'Ações' : language === 'en' ? 'Actions' : 'Acciones'}
              </h2>
              
              <div className="space-y-3">
                <a
                  href={feedbackUrls[language]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                >
                  <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="font-medium text-blue-800 dark:text-blue-200">
                    {language === 'pt' ? 'Enviar Feedback' : language === 'en' ? 'Send Feedback' : 'Enviar Feedback'}
                  </span>
                </a>
                
                <button
                  onClick={() => setShowClearConfirm(true)}
                  className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors w-full text-left"
                >
                  <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
                  <span className="font-medium text-red-800 dark:text-red-200">
                    {language === 'pt' ? 'Apagar todos os dados' : language === 'en' ? 'Delete all data' : 'Eliminar todos los datos'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}