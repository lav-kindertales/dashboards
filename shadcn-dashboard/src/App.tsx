import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { StaffDirectory } from './pages/StaffDirectory'
import { StaffOverview } from './pages/StaffOverview'
import { StaffSchedules } from './pages/StaffSchedules'
import { Certifications } from './pages/Certifications'
import { Reports } from './pages/Reports'
import { Layout } from './components/Layout'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<StaffOverview />} />
          <Route path="/staff" element={<StaffDirectory />} />
          <Route path="/schedules" element={<StaffSchedules />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
