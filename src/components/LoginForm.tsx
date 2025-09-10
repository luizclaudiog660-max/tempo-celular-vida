"use client";

import { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface LoginFormProps {
  onSuccess: () => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const { login, register } = useAuth();
  const { t } = useLanguage();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validações básicas
      if (!email || !password) {
        setError(isLogin ? 'Preencha todos os campos' : 'Preencha todos os campos');
        return;
      }

      if (password.length < 6) {
        setError('A senha deve ter pelo menos 6 caracteres');
        return;
      }

      const success = isLogin ? await login(email, password) : await register(email, password);
      
      if (success) {
        onSuccess();
      } else {
        setError(isLogin ? 'Email ou senha incorretos' : 'Este email já está em uso');
      }
    } catch (error) {
      setError('Erro interno. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=\"min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 dark:from-gray-900 dark:to-blue-900 flex items-center justify-center p-4\">
      <div className=\"max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8\">
        <div className=\"text-center mb-8\">
          <div className=\"w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4\">
            <User className=\"w-8 h-8 text-white\" />
          </div>
          <h1 className=\"text-2xl font-bold text-gray-900 dark:text-white mb-2\">
            {isLogin ? 'Entrar na Conta' : 'Criar Conta'}
          </h1>
          <p className=\"text-gray-600 dark:text-gray-300\">
            {isLogin ? 'Acesse sua jornada de transformação' : 'Comece sua jornada de transformação'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className=\"space-y-6\">
          {/* Email */}
          <div>
            <label htmlFor=\"email\" className=\"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2\">
              Email
            </label>
            <div className=\"relative\">
              <Mail className=\"absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400\" />
              <input
                type=\"email\"
                id=\"email\"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=\"seu@email.com\"
                className=\"w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white\"
                required
              />
            </div>
          </div>

          {/* Senha */}
          <div>
            <label htmlFor=\"password\" className=\"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2\">
              Senha
            </label>
            <div className=\"relative\">
              <Lock className=\"absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400\" />
              <input
                type={showPassword ? 'text' : 'password'}
                id=\"password\"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=\"Mínimo 6 caracteres\"
                className=\"w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white\"
                required
                minLength={6}
              />
              <button
                type=\"button\"
                onClick={() => setShowPassword(!showPassword)}
                className=\"absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300\"
              >
                {showPassword ? <EyeOff className=\"w-5 h-5\" /> : <Eye className=\"w-5 h-5\" />}
              </button>
            </div>
            {!isLogin && (
              <p className=\"text-xs text-gray-500 dark:text-gray-400 mt-1\">
                A senha deve ter pelo menos 6 caracteres
              </p>
            )}
          </div>

          {/* Erro */}
          {error && (
            <div className=\"bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg p-3\">
              <p className=\"text-sm text-red-600 dark:text-red-400\">{error}</p>
            </div>
          )}

          {/* Botão Submit */}
          <button
            type=\"submit\"
            disabled={isLoading}
            className=\"w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl\"
          >
            {isLoading ? 'Processando...' : (isLogin ? 'Entrar' : 'Criar Conta')}
          </button>
        </form>

        {/* Toggle Login/Register */}
        <div className=\"mt-6 text-center\">
          <p className=\"text-gray-600 dark:text-gray-300\">
            {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setEmail('');
                setPassword('');
              }}
              className=\"ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium\"
            >
              {isLogin ? 'Criar conta' : 'Fazer login'}
            </button>
          </p>
        </div>

        {/* Privacidade */}
        <div className=\"mt-6 text-center\">
          <p className=\"text-xs text-gray-500 dark:text-gray-400\">
            🔒 Seus dados ficam apenas no seu navegador
          </p>
        </div>
      </div>
    </div>
  );
}