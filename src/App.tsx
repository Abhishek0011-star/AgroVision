/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HeaderNav } from './components/HeaderNav';
import { DeviceFrame } from './components/DeviceFrame';
import { AuthScreen } from './components/AuthScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { SmartScanScreen } from './components/SmartScanScreen';
import { QualityReportScreen } from './components/QualityReportScreen';
import { FlutterCodeViewer } from './components/FlutterCodeViewer';
import { PdfExportModal } from './components/PdfExportModal';
import { ScanReport, Language, UserRole } from './types/onion';
import { INITIAL_REPORTS } from './data/mockData';

export default function App() {
  const [activeView, setActiveView] = useState<'simulator' | 'flutter-code'>('simulator');
  const [currentScreen, setCurrentScreen] = useState<'auth' | 'dashboard' | 'scan' | 'report'>('dashboard');
  const [language, setLanguage] = useState<Language>('en');
  const [isFramed, setIsFramed] = useState<boolean>(true);
  const [reports, setReports] = useState<ScanReport[]>(INITIAL_REPORTS);
  const [activeReport, setActiveReport] = useState<ScanReport>(INITIAL_REPORTS[0]);
  const [userRole, setUserRole] = useState<UserRole>('farmer');
  const [showPdfModal, setShowPdfModal] = useState<boolean>(false);

  // Screen title for header
  const screenTitles = {
    auth: 'Screen 1: Authentication',
    dashboard: 'Screen 2: Farmer Dashboard',
    scan: 'Screen 3: 3D Smart Scan',
    report: 'Screen 4: Quality Report',
  };

  const handleLoginSuccess = (role: UserRole) => {
    setUserRole(role);
    setCurrentScreen('dashboard');
  };

  const handleStartScan = () => {
    setCurrentScreen('scan');
  };

  const handleScanComplete = (newReport: ScanReport) => {
    setReports([newReport, ...reports]);
    setActiveReport(newReport);
    setCurrentScreen('report');
  };

  const handleSelectReport = (report: ScanReport) => {
    setActiveReport(report);
    setCurrentScreen('report');
  };

  const handleSaveBlockchain = () => {
    if (!activeReport.blockchainHash) {
      const hash = `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`;
      const updated = { ...activeReport, blockchainHash: hash };
      setActiveReport(updated);
      setReports(reports.map((r) => (r.id === activeReport.id ? updated : r)));
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-stone-950 text-stone-100 overflow-hidden font-sans">
      {/* Top Header Bar */}
      <HeaderNav
        activeView={activeView}
        setActiveView={setActiveView}
        language={language}
        setLanguage={setLanguage}
        isFramed={isFramed}
        setIsFramed={setIsFramed}
        currentScreenTitle={screenTitles[currentScreen]}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden relative">
        {activeView === 'flutter-code' ? (
          <FlutterCodeViewer />
        ) : (
          <DeviceFrame
            isFramed={isFramed}
            currentScreen={currentScreen}
            onNavigate={(screen) => setCurrentScreen(screen)}
          >
            {currentScreen === 'auth' && (
              <AuthScreen
                onLoginSuccess={handleLoginSuccess}
                language={language}
              />
            )}

            {currentScreen === 'dashboard' && (
              <DashboardScreen
                onStartScan={handleStartScan}
                onSelectReport={handleSelectReport}
                reports={reports}
                language={language}
              />
            )}

            {currentScreen === 'scan' && (
              <SmartScanScreen
                onBack={() => setCurrentScreen('dashboard')}
                onScanComplete={handleScanComplete}
                language={language}
              />
            )}

            {currentScreen === 'report' && (
              <QualityReportScreen
                report={activeReport}
                onBack={() => setCurrentScreen('dashboard')}
                language={language}
                onExportPdf={() => setShowPdfModal(true)}
                onSaveBlockchain={handleSaveBlockchain}
              />
            )}
          </DeviceFrame>
        )}
      </main>

      {/* Export as PDF & WhatsApp Modal */}
      {showPdfModal && (
        <PdfExportModal
          report={activeReport}
          onClose={() => setShowPdfModal(false)}
        />
      )}
    </div>
  );
}
