import React, { useState, useEffect } from 'react';
import { Navbar, UserRole } from './components/Navbar';
import { UploadZone } from './components/UploadZone';
import { CaseDetail } from './components/CaseDetail';
import { CaseHistoryTable } from './components/CaseHistoryTable';
import { HealthStatusCard } from './components/HealthStatusCard';
import { getHistorialCasos, ResultadoJSON } from './services/api';

export const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [currentRole, setCurrentRole] = useState<UserRole>('admin');
  const [activeTab, setActiveTab] = useState<'upload' | 'history' | 'health'>('upload');
  
  const [casoActual, setCasoActual] = useState<ResultadoJSON | null>(null);
  const [historialCasos, setHistorialCasos] = useState<ResultadoJSON[]>([]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const cargarHistorial = async () => {
    try {
      const data = await getHistorialCasos();
      setHistorialCasos(data);
    } catch (e) {
      console.error('Error al cargar historial', e);
    }
  };

  useEffect(() => {
    cargarHistorial();
  }, []);

  const handleCasoProcesado = (resultado: ResultadoJSON) => {
    setCasoActual(resultado);
    cargarHistorial();
  };

  return (
    <div className="min-h-screen bg-[#f4f0f9] dark:bg-[#150b24] text-[#2c1547] dark:text-[#f5f0fb] transition-colors duration-200">
      
      {/* Navbar Institucional UTI con Selector de Roles RBAC */}
      <Navbar
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        currentRole={currentRole}
        onChangeRole={setCurrentRole}
        activeTab={activeTab}
        onChangeTab={setActiveTab}
      />

      {/* Contenido Principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {activeTab === 'upload' && (
          <div className="space-y-8">
            <UploadZone onCasoProcesado={handleCasoProcesado} />
            {casoActual && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#6e5987] dark:text-[#b7a7cc]">
                  Dictamen del Caso Procesado
                </h3>
                <CaseDetail resultado={casoActual} />
              </div>
            )}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-8">
            <CaseHistoryTable
              casos={historialCasos}
              currentRole={currentRole}
              onSeleccionarCaso={(caso) => {
                setCasoActual(caso);
                setActiveTab('upload');
              }}
            />
          </div>
        )}

        {activeTab === 'health' && currentRole === 'admin' && (
          <div className="space-y-8">
            <HealthStatusCard />
          </div>
        )}

      </main>

      {/* Pie de página */}
      <footer className="border-t border-[#e2d9ee] dark:border-[#3b2259] py-6 text-center text-xs text-[#6e5987] dark:text-[#b7a7cc]">
        Universidad Tecnológica Indoamérica · Agente de IA para Validación de Cruces de Horarios Docentes © 2026
      </footer>

    </div>
  );
};

export default App;
