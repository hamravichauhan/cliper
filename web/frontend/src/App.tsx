import React, { useEffect } from 'react'
import { useStore } from './store/useStore'
import { Sidebar } from './components/layout/Sidebar'
import { Header } from './components/layout/Header'
import { ToastContainer } from './components/ui/Toast'
import { CommandPalette } from './components/ui/CommandPalette'
import { KeyboardShortcutsModal } from './components/ui/KeyboardShortcutsModal'

// Screens
import { ClipReviewStudio } from './screens/ClipReviewStudio'
import { DesignSystem } from './screens/DesignSystem'
import { HomeScreen } from './screens/HomeScreen'
import { NewProjectScreen } from './screens/NewProjectScreen'
import { ProcessingScreen } from './screens/ProcessingScreen'
import { ProjectsScreen } from './screens/ProjectsScreen'
import { LibraryScreen } from './screens/LibraryScreen'
import { BrandKitsScreen } from './screens/BrandKitsScreen'
import { ScheduleScreen } from './screens/ScheduleScreen'
import { SettingsScreen } from './screens/SettingsScreen'

export const App: React.FC = () => {
  const { currentScreen, fetchHealth } = useStore()

  useEffect(() => {
    fetchHealth()
    const interval = setInterval(fetchHealth, 5000)
    return () => clearInterval(interval)
  }, [fetchHealth])

  const renderScreen = () => {
    switch (currentScreen) {
      case 'studio':
        return <ClipReviewStudio />
      case 'design-system':
        return <DesignSystem />
      case 'home':
        return <HomeScreen />
      case 'new-project':
        return <NewProjectScreen />
      case 'processing':
        return <ProcessingScreen />
      case 'projects':
        return <ProjectsScreen />
      case 'library':
        return <LibraryScreen />
      case 'brand-kits':
        return <BrandKitsScreen />
      case 'schedule':
        return <ScheduleScreen />
      case 'settings':
        return <SettingsScreen />
      default:
        return <ClipReviewStudio />
    }
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-bg text-text-primary font-sans antialiased">
      {/* Persistent Left Collapsible Sidebar */}
      <Sidebar />

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header Chrome */}
        <Header />

        {/* Active Screen View */}
        <main className="flex-1 overflow-y-auto">
          {renderScreen()}
        </main>
      </div>

      {/* Global Overlays & Utilities */}
      <CommandPalette />
      <KeyboardShortcutsModal />
      <ToastContainer />
    </div>
  )
}

export default App
