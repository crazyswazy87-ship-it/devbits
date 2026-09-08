import { Suspense, lazy } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import PageTransition from './components/layout/PageTransition'
import RouteLoader from './components/layout/RouteLoader'
//import Home from './pages/Home'
//import Devbits from './pages/Devbits'
import Home from './pages/Home'
//import Devbits from '/pages/Devbits'

const ComponentsLibrary = lazy(() => import('./pages/ComponentsLibrary'))
const ComponentDetail = lazy(() => import('./pages/ComponentDetail'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  const location = useLocation()

  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<RouteLoader />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <PageTransition>
                    
                    <Home/>
                  </PageTransition>
                }
              />
              <Route
                path="/components"
                element={
                  <PageTransition>
                    <ComponentsLibrary />
                  </PageTransition>
                }
              />
              <Route
                path="/components/:slug"
                element={
                  <PageTransition>
                    <ComponentDetail />
                  </PageTransition>
                }
              />
              <Route
                path="*"
                element={
                  <PageTransition>
                    <NotFound />
                  </PageTransition>
                }
              />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
