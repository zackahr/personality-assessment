# Personality Assessment Research Platform

A comprehensive web application for conducting personality assessment studies and team formation research. This platform allows researchers to study how personality traits influence team selection decisions through an interactive experiment interface.

## 🔬 Research Purpose

This study explores how personality traits influence decisions about group formation, specifically investigating whether individuals tend to choose:
- People with similar traits (homophily)
- People with complementary traits
- Other emergent selection patterns

The research examines the relationship between Big Five personality traits and team composition preferences in various task contexts.

## 🏗️ Architecture

### Frontend ([`/frontend`](personality-assessment/frontend))
- **React 18** with Vite for fast development
- **Material-UI (MUI)** for consistent design system
- **React Router** for navigation and step management
- **Custom theme system** with phase-based color palettes
- Responsive design optimized for mobile and desktop

### Backend ([`/backend`](personality-assessment/backend))
- **Django 5.1.7** REST API
- **SQLite** database for data storage
- **Django REST Framework** for API endpoints
- **CORS** enabled for cross-origin requests

### Infrastructure
- **Docker Compose** for containerized deployment
- **Nginx** reverse proxy with SSL support via Let's Encrypt
- **Multi-stage** development and production environments

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose
- Git

### Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd personality-assessment
   ```

2. **Start the development environment**
   ```bash
   make up
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000

### Available Make Commands

```bash
make up          # Start all containers
make down        # Stop all containers
make build       # Build containers
make rebuild     # Force rebuild (no cache)
make clean       # Stop and remove containers/volumes
make logs        # View frontend logs
make shell       # Access frontend container shell
make reset       # Full reset: clean → rebuild → start
```

## 📋 Study Flow

### Participant Journey

1. **Welcome & Consent** ([`/`](personality-assessment/frontend/src/LandingPage.jsx))
   - Study information and informed consent
   - Prolific ID collection

2. **Personality Assessment** ([`/personality-test`](personality-assessment/frontend/src/PersonalityTest.jsx))
   - 10-item Big Five personality questionnaire
   - 7-point Likert scale responses

3. **Task Description** ([`/task-description`](personality-assessment/frontend/src/TaskDescription.jsx))
   - Randomized task framing (Creative/Analytical/Neutral)
   - Project scenario presentation

4. **Evaluation Instructions** ([`/how-to-evaluate`](personality-assessment/frontend/src/HowToEvaluatePage.jsx))
   - Big Five traits explanation
   - Evaluation criteria guidance

5. **Profile Reviews** ([`/profile/:id`](personality-assessment/frontend/src/ProfileViewer.jsx))
   - 19 personality profiles to evaluate
   - Yes/Maybe/No decisions for team selection
   - Progress tracking and navigation

6. **Final Selection** ([`/why`](personality-assessment/frontend/src/WhyPage.jsx))
   - Choose 4 team members from "Yes" profiles
   - Open-ended reflection questions
   - Demographic data collection

7. **Debriefing** ([`/debriefing`](personality-assessment/frontend/src/DebriefingPage.jsx))
   - Study purpose revelation
   - Research context and references

### Step Guard System

The application implements a robust step progression system via [`useStepGuard`](personality-assessment/frontend/src/hooks/useStepGuard.js):
- Prevents users from skipping ahead
- Maintains progress in localStorage
- Allows backward navigation to completed steps
- Redirects users to appropriate step on page refresh

## 🎨 Design System

### Color Palette ([`theme.js`](personality-assessment/frontend/src/theme.js))
The application uses phase-based theming:

**Phase Setup (Onboarding)**
- Primary: Silent Violet (#A09ABC)
- Accents: Silver Spark, Faint Lilac
- Background: Quill White

**Phase Execution (Active Tasks)**
- Primary: Kinetic Teal (#00C4B3)
- Accents: Vivid Coral, Proton Pink
- High contrast for active interactions

**Phase Results (Completion)**
- Primary: Indigo Depth (#283593)
- Accents: Terra Cotta, Gold Leaf
- Calming, authoritative feel

### Typography
- **Primary Font**: Inter, Roboto (300, 400, 500, 700)
- **Icon Font**: Material Icons
- Responsive typography scales with device size

## 🗃️ Data Structure

### Participant Response Data ([`responses2.csv`](personality-assessment/backend/data/responses2.csv))
```csv
participant_id,prolific_id,start_time,end_time,
personality_q1,...,personality_q10,
profile1_decision,...,profile19_decision,
task_condition,final_profile_1,...,final_profile_4,
open_ended_q1,open_ended_q2,
age,gender,education_level
```

### Personality Profiles
Each profile includes:
- Demographic description
- Big Five trait scores (1-7 scale: Low, Moderate, High)
- Randomized presentation order

## 🔧 Configuration

### Environment Variables
```env
# Development
VITE_API_URL=http://localhost:8000
DEBUG=True

# Production
VITE_API_URL=https://yourdomain.com
DEBUG=False
```

### Docker Configuration
- **Frontend**: Node.js 20 with Vite dev server
- **Backend**: Python with Django
- **Nginx**: Reverse proxy with SSL termination
- **Certbot**: Automated SSL certificate management

## 📊 Data Collection Features

The platform generates comprehensive datasets for research analysis:

- **Personality Scores**: Big Five trait measurements via slider interface
- **Selection Patterns**: Team composition preferences (Yes/Maybe/No decisions)
- **Task Framing Effects**: Response differences by condition (Creative/Analytical/Neutral)
- **Demographic Correlations**: Age, gender, education influences
- **Response Times**: Temporal analysis capabilities
- **Qualitative Data**: Open-ended reflection responses

### Key Components

- **Profile Evaluation**: Interactive trait cards with visual representations
- **Progress Tracking**: Real-time progress indicators and navigation
- **Data Persistence**: LocalStorage backup with backend synchronization
- **Responsive Design**: Mobile-optimized interface for accessibility

## 🛠️ Development

### Frontend Development
```bash
cd frontend
npm install
npm run dev
```

### Backend Development
```bash
cd backend
pip install -r requirements.txt
python manage.py runserver
```

### Adding New Features
1. Update step guard configuration in [`useStepGuard.js`](personality-assessment/frontend/src/hooks/useStepGuard.js)
2. Add routes to navigation in [`Layout.jsx`](personality-assessment/frontend/src/Layout.jsx)
3. Implement API endpoints in Django views
4. Update data collection in [`WhyPage.jsx`](personality-assessment/frontend/src/WhyPage.jsx)

## 🔒 Security & Privacy

- **Data Anonymization**: No personally identifiable information stored
- **Secure Transmission**: HTTPS encryption in production
- **CORS Configuration**: Restricted cross-origin access
- **Input Validation**: Server-side validation for all submissions
- **Consent Management**: Comprehensive informed consent process

## 📖 Research Background

Based on established research in personality psychology and team formation:

- **Big Five Model**: Validated personality framework (McCrae & Costa, 1997)
- **Team Composition Theory**: Homophily vs. complementarity research
- **Experimental Design**: Randomized controlled study methodology

### Task Framing Conditions

1. **Creative**: Emphasizes innovation, storytelling, and original thinking
2. **Analytical**: Focuses on data-driven decisions and systematic planning  
3. **Neutral**: Balanced approach without specific emphasis

## 🤝 Contributing

1. Fork the repository
2. Create feature branches
3. Follow existing code style and component patterns
4. Test thoroughly across mobile and desktop
5. Document new features and API changes

## 📄 License

This research platform is developed for academic use. Please contact the research team for usage permissions and data access requests.

---

**Technical Architecture**: React + Django with Docker deployment
**Research Platform**: "Trait Pilot" - Advanced personality assessment interface
**Data Collection**: Comprehensive personality and team formation preferences

For technical support, see repository issues for bug reports and feature requests.