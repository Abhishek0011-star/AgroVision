import React, { useState } from 'react';
import {
  FileCode,
  Copy,
  Check,
  Download,
  FolderTree,
  Terminal,
  Layers,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { FLUTTER_CODE_FILES, FlutterFile } from '../data/flutterCode';

export const FlutterCodeViewer: React.FC = () => {
  const [selectedFileIndex, setSelectedFileIndex] = useState(1); // default to main.dart
  const [copiedFile, setCopiedFile] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);

  const currentFile: FlutterFile = FLUTTER_CODE_FILES[selectedFileIndex];

  const handleCopyCurrent = () => {
    navigator.clipboard.writeText(currentFile.content);
    setCopiedFile(true);
    setTimeout(() => setCopiedFile(false), 2000);
  };

  const handleCopyAll = () => {
    const fullProject = FLUTTER_CODE_FILES.map(
      (f) => `// ==========================================\n// FILE: ${f.path}\n// ==========================================\n\n${f.content}\n\n`
    ).join('\n');
    navigator.clipboard.writeText(fullProject);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2500);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([currentFile.content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = currentFile.name;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-stone-950 text-stone-200 overflow-hidden">
      {/* Top Banner with Architecture Context */}
      <div className="p-4 sm:p-5 border-b border-stone-800 bg-stone-900/90 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold">
              Material 3 Architecture
            </span>
            <span className="text-xs text-stone-400">
              Flutter 3.x &bull; Dart 3.x
            </span>
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight mt-1 font-display">
            AgriVision Modular Flutter Source Code
          </h2>
          <p className="text-xs text-stone-400">
            Production-ready clean architecture code implementing all 4 hackathon screens and the occlusion solution.
          </p>
        </div>

        {/* Global Project Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyAll}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold border border-stone-700 transition-colors"
          >
            {copiedAll ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copiedAll ? 'Entire Bundle Copied!' : 'Copy All Files'}</span>
          </button>
        </div>
      </div>

      {/* Main Code Studio Split Layout */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Sidebar: File Tree */}
        <div className="w-full md:w-72 bg-stone-900/60 border-r border-stone-800 flex flex-col overflow-y-auto">
          <div className="p-3 text-[11px] font-bold text-stone-400 uppercase tracking-wider flex items-center gap-2 border-b border-stone-800">
            <FolderTree className="w-3.5 h-3.5 text-emerald-400" />
            <span>Project Explorer</span>
          </div>

          <div className="p-2 space-y-1">
            {FLUTTER_CODE_FILES.map((file, idx) => (
              <button
                key={file.path}
                onClick={() => setSelectedFileIndex(idx)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between group ${
                  selectedFileIndex === idx
                    ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 shadow-xs'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <FileCode
                    className={`w-3.5 h-3.5 shrink-0 ${
                      selectedFileIndex === idx ? 'text-emerald-400' : 'text-stone-500'
                    }`}
                  />
                  <span className="truncate">{file.path}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Quick Hackathon Run Instructions */}
          <div className="mt-auto p-4 border-t border-stone-800 bg-stone-900/80 text-[11px] space-y-2 text-stone-400">
            <span className="font-bold text-stone-300 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>Run in Terminal</span>
            </span>
            <div className="bg-stone-950 p-2.5 rounded-lg font-mono text-[10px] text-emerald-300 space-y-1 border border-stone-800">
              <p>flutter create agrivision</p>
              <p>flutter pub add fl_chart google_fonts</p>
              <p>flutter run</p>
            </div>
          </div>
        </div>

        {/* Right Code Display Area */}
        <div className="flex-1 flex flex-col bg-stone-950 overflow-hidden">
          {/* File Tab Header */}
          <div className="px-5 py-3 border-b border-stone-800 bg-stone-900/40 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-400">
                {currentFile.path}
              </span>
              <p className="text-[11px] text-stone-400 mt-0.5">
                {currentFile.description}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyCurrent}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium border border-stone-700 transition-colors"
              >
                {copiedFile ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedFile ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium border border-stone-700 transition-colors"
                title="Download this file"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Download</span>
              </button>
            </div>
          </div>

          {/* Syntax-styled Code Viewport */}
          <div className="flex-1 overflow-auto p-4 sm:p-6 font-mono text-xs leading-relaxed text-stone-300 bg-stone-950">
            <pre className="selection:bg-emerald-800 selection:text-white">
              <code>{currentFile.content}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
