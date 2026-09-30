import React, { useState } from 'react';
import { Sun, Moon, Shield, Sparkles, FileText, Activity, Settings, Lock } from 'lucide-react';
import { RulesConfigModal } from './RulesConfigModal';

export type UserRole = 'admin' | 'coordinador' | 'infraestructura' | 'decano';

interface NavbarProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  currentRole: UserRole;
  onChangeRole: (role: UserRole) => void;
  activeTab: 'upload' | 'history' | 'health';
  onChangeTab: (tab: 'upload' | 'history' | 'health') => void;
  onReglasGuardadas?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isDarkMode,
  onToggleTheme,
  currentRole,
  onChangeRole,
  activeTab,
  onChangeTab,
  onReglasGuardadas,
}) => {
  const [modalReglasAbierto, setModalReglasAbierto] = useState(false);

  const esAdmin = currentRole === 'admin';

  return (
    <>
      <header className="bg-[#2c1547] text-white shadow-md border-b border-[#3b2259] transition-colors">
        <div className="w-full max-w-[1500px] mx-auto px-6">
          <div className="flex items-center justify-between h-20 gap-6">
            
            {/* 1. Izquierda: Logo & Marca Institucional */}
            <div className="flex items-center space-x-3 flex-shrink-0">
              <img 
                src="/logo-uti.png" 
                alt="Universidad Tecnológica Indoamérica" 
                className="h-11 w-auto object-contain hover:opacity-95 transition-opacity" 
              />
              <div className="flex flex-col justify-center">
                <div className="flex items-center space-x-2 whitespace-nowrap">
                  <h1 className="font-bold text-base md:text-lg leading-none tracking-wide text-white">
                    Agente de IA — Cruce de Horarios
                  </h1>
                  <span className="bg-[#f57021] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                    v1.0
                  </span>
                </div>
                <p className="text-[11px] text-[#b7a7cc] mt-1 font-medium whitespace-nowrap">
                  Universidad Tecnológica Indoamérica · Modelo Educativo 2026
                </p>
              </div>
            </div>

            {/* 2. Centro: Navegación Principal */}
            <nav className="hidden lg:flex items-center space-x-3 flex-1 justify-center">
              <button
                onClick={() => onChangeTab('upload')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-xs md:text-sm transition-all whitespace-nowrap ${
                  activeTab === 'upload'
                    ? 'bg-[#f57021] text-white shadow-sm font-bold'
                    : 'text-[#b7a7cc] hover:bg-[#3b2259] hover:text-white'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Validar Distributivo</span>
              </button>

              <button
                onClick={() => onChangeTab('history')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-xs md:text-sm transition-all whitespace-nowrap ${
                  activeTab === 'history'
                    ? 'bg-[#f57021] text-white shadow-sm font-bold'
                    : 'text-[#b7a7cc] hover:bg-[#3b2259] hover:text-white'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Bandeja por Rol / Historial</span>
              </button>

              {esAdmin && (
                <button
                  onClick={() => onChangeTab('health')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-xs md:text-sm transition-all whitespace-nowrap ${
                    activeTab === 'health'
                      ? 'bg-[#f57021] text-white shadow-sm font-bold'
                      : 'text-[#b7a7cc] hover:bg-[#3b2259] hover:text-white'
                  }`}
                >
                  <Activity className="w-4 h-4" />
                  <span>Estado del Sistema</span>
                </button>
              )}
            </nav>

            {/* 3. Derecha: Acciones, Ajustes (solo Admin), Rol & Modo Oscuro */}
            <div className="flex items-center space-x-3 flex-shrink-0">
              
              {/* Botón Ajustar Reglas (Solo Admin Habilitado) */}
              {esAdmin ? (
                <button
                  onClick={() => setModalReglasAbierto(true)}
                  className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-[#211336] border border-[#3b2259] text-xs font-semibold text-[#b7a7cc] hover:text-white hover:border-[#f57021] transition-all whitespace-nowrap shadow-sm"
                  title="Ajustar Reglas Institucionales (Solo Administrador)"
                >
                  <Settings className="w-4 h-4 text-[#f57021]" />
                  <span>Ajustar Reglas</span>
                </button>
              ) : (
                <div
                  className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-[#211336]/50 border border-[#3b2259]/50 text-xs font-semibold text-[#6e5987] cursor-not-allowed opacity-60"
                  title="Solo el Administrador puede modificar reglas institucionales"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Reglas Bloqueadas</span>
                </div>
              )}

              {/* Selector de Rol */}
              <div className="flex items-center space-x-2 bg-[#211336] px-3 py-2 rounded-lg border border-[#3b2259]">
                <Shield className="w-4 h-4 text-[#f57021]" />
                <select
                  value={currentRole}
                  onChange={(e) => onChangeRole(e.target.value as UserRole)}
                  className="bg-transparent text-xs text-white font-semibold focus:outline-none cursor-pointer"
                >
                  <option value="admin" className="bg-[#211336] text-white">Administrador</option>
                  <option value="coordinador" className="bg-[#211336] text-white">Coordinador Académico</option>
                  <option value="infraestructura" className="bg-[#211336] text-white">Infraestructura / Aulas</option>
                  <option value="decano" className="bg-[#211336] text-white">Decano</option>
                </select>
              </div>

              {/* Toggle Tema Oscuro/Claro */}
              <button
                onClick={onToggleTheme}
                className="p-2 rounded-lg text-[#b7a7cc] hover:text-white hover:bg-[#3b2259] transition-colors border border-[#3b2259] bg-[#211336]"
                title={isDarkMode ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
              >
                {isDarkMode ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4" />}
              </button>

            </div>

          </div>
        </div>
      </header>

      {/* Modal de Ajuste de Reglas */}
      <RulesConfigModal
        isOpen={modalReglasAbierto}
        onClose={() => setModalReglasAbierto(false)}
        onReglasGuardadas={onReglasGuardadas}
      />
    </>
  );
};
