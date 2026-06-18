# Peeaum-BOI: AI BOI Import Export Customs Legal Intelligence Platform

## Project Overview

**Objective:** Build an enterprise-level web application that serves as a comprehensive knowledge center and intelligent assistant for Thailand's Board of Investment (BOI) promotion, customs, import/export, and related legal matters.

**Target Users:** Investors (Thai/foreign), BOI-certified companies, BOI consultants, Import/Export officers, Accountants, Logistics personnel, Customs officers, Management, Students.

---

## Technology Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn UI
- **State Management:** Zustand
- **Charts:** Recharts
- **Tables:** TanStack Table

### Backend
- **Framework:** NestJS
- **Language:** TypeScript
- **API:** REST + GraphQL (optional)

### Database
- **Primary:** PostgreSQL
- **ORM:** Prisma
- **Cache:** Redis

### AI & ML
- **LLM:** OpenAI API (GPT-4)
- **RAG:** LangChain
- **Vector DB:** Pinecone / pgvector
- **Embeddings:** OpenAI Embeddings

### Authentication
- **Provider:** NextAuth.js
- **Session:** JWT

### Deployment
- **Container:** Docker
- **CI/CD:** GitHub Actions
- **Hosting:** Vercel (Frontend) + Railway/Render (Backend)

---

## Project Structure

```
peeaum-boi/
├── apps/
│   ├── web/                          # Next.js Frontend
│   │   ├── app/
│   │   │   ├── (auth)/               # Authentication routes
│   │   │   │   ├── login/
│   │   │   │   ├── register/
│   │   │   │   └── layout.tsx
│   │   │   ├── (dashboard)/          # Dashboard routes
│   │   │   │   ├── boi/
│   │   │   │   ├── customs/
│   │   │   │   ├── import-export/
│   │   │   │   ├── legal/
│   │   │   │   ├── material/
│   │   │   │   ├── compliance/
│   │   │   │   └── layout.tsx
│   │   │   ├── (ai)/                 # AI Assistant routes
│   │   │   │   ├── chat/
│   │   │   │   ├── boi-assistant/
│   │   │   │   ├── customs-assistant/
│   │   │   │   ├── legal-assistant/
│   │   │   │   └── material-assistant/
│   │   │   ├── (knowledge)/          # Knowledge Base routes
│   │   │   │   ├── search/
│   │   │   │   ├── documents/
│   │   │   │   └── categories/
│   │   │   ├── api/                  # API routes
│   │   │   ├── page.tsx
│   │   │   └── layout.tsx
│   │   ├── components/
│   │   │   ├── ui/                   # Shadcn UI components
│   │   │   ├── layout/               # Layout components
│   │   │   ├── dashboard/            # Dashboard components
│   │   │   ├── ai/                   # AI chat components
│   │   │   ├── knowledge/            # Knowledge base components
│   │   │   └── shared/               # Shared components
│   │   ├── lib/                      # Utilities
│   │   ├── hooks/                    # Custom hooks
│   │   ├── types/                    # TypeScript types
│   │   └── styles/                   # Global styles
│   │
│   └── api/                          # NestJS Backend
│       ├── src/
│       │   ├── modules/
│       │   │   ├── auth/             # Authentication
│       │   │   │   ├── auth.module.ts
│       │   │   │   ├── auth.controller.ts
│       │   │   │   ├── auth.service.ts
│       │   │   │   └── strategies/
│       │   │   ├── users/            # User management
│       │   │   ├── boi/              # BOI module
│       │   │   │   ├── boi.module.ts
│       │   │   │   ├── boi.controller.ts
│       │   │   │   ├── boi.service.ts
│       │   │   │   └── entities/
│       │   │   ├── customs/          # Customs module
│       │   │   ├── import-export/    # Import/Export module
│       │   │   ├── legal/            # Legal module
│       │   │   ├── material/         # Material control module
│       │   │   ├── knowledge/        # Knowledge base module
│       │   │   ├── ai/               # AI services module
│       │   │   └── dashboard/        # Dashboard module
│       │   ├── common/
│       │   │   ├── decorators/
│       │   │   ├── guards/
│       │   │   ├── interceptors/
│       │   │   ├── filters/
│       │   │   └── pipes/
│       │   ├── config/
│       │   ├── database/
│       │   └── main.ts
│       ├── prisma/
│       │   ├── schema.prisma
│       │   └── migrations/
│       └── test/
│
├── packages/
│   ├── shared/                       # Shared types & utilities
│   ├── ui/                           # Shared UI components
│   └── ai/                           # AI utilities & prompts
│
├── docs/                             # Documentation
├── scripts/                          # Build & deploy scripts
├── docker/
│   ├── Dockerfile.web
│   ├── Dockerfile.api
│   └── docker-compose.yml
├── .github/
│   └── workflows/                    # CI/CD pipelines
├── package.json
├── turbo.json
├── tsconfig.json
└── README.md
```

---

## Database Schema

### Core Tables

#### Users & Authentication
```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'user',
  organization VARCHAR(255),
  position VARCHAR(255),
  phone VARCHAR(50),
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- User roles: admin, boi_officer, investor, consultant, viewer
```

#### BOI Privileges
```sql
-- BOI Privilege categories
CREATE TABLE boi_privilege_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  name_th VARCHAR(255) NOT NULL,
  description TEXT,
  parent_id UUID REFERENCES boi_privilege_categories(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- BOI Privileges
CREATE TABLE boi_privileges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES boi_privilege_categories(id),
  code VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  name_th VARCHAR(255) NOT NULL,
  description TEXT,
  legal_reference TEXT,
  conditions JSONB,
  benefits JSONB,
  valid_from DATE,
  valid_until DATE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- BOI Applications
CREATE TABLE boi_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  company_name VARCHAR(255) NOT NULL,
  project_name VARCHAR(255) NOT/null,
  activity_type VARCHAR(100),
  investment_amount DECIMAL(15, 2),
  privileges_requested JSONB,
  status VARCHAR(50) DEFAULT 'pending',
  submission_date TIMESTAMP,
  approval_date TIMESTAMP,
  certificate_number VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Import/Export
```sql
-- Import/Export transactions
CREATE TABLE ie_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  transaction_type VARCHAR(20) NOT NULL, -- 'import' or 'export'
  boi_application_id UUID REFERENCES boi_applications(id),
  invoice_number VARCHAR(100),
  invoice_date DATE,
  total_value DECIMAL(15, 2),
  currency VARCHAR(3) DEFAULT 'THB',
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Import/Export items
CREATE TABLE ie_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id UUID REFERENCES ie_transactions(id),
  product_name VARCHAR(255),
  hs_code VARCHAR(20),
  quantity DECIMAL(15, 4),
  unit VARCHAR(50),
  unit_price DECIMAL(15, 4),
  total_price DECIMAL(15, 2),
  country_of_origin VARCHAR(100),
  material_type VARCHAR(50), -- 'raw_material', 'component', 'finished_product'
  rmts_id VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Material Control
```sql
-- Material tracking
CREATE TABLE materials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  boi_application_id UUID REFERENCES boi_applications(id),
  material_code VARCHAR(100),
  material_name VARCHAR(255),
  hs_code VARCHAR(20),
  material_type VARCHAR(50),
  unit VARCHAR(50),
  bom_quantity DECIMAL(15, 4),
  yield_rate DECIMAL(5, 4),
  scrap_rate DECIMAL(5, 4),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Material movements
CREATE TABLE material_movements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  material_id UUID REFERENCES materials(id),
  movement_type VARCHAR(50), -- 'import', 'consumption', 'scrap', 'waste', 'sale', 'transfer', 'adjustment'
  quantity DECIMAL(15, 4),
  reference_number VARCHAR(100),
  document_date DATE,
  remarks TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Material balance (current stock)
CREATE TABLE material_balances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  material_id UUID REFERENCES materials(id),
  period DATE NOT NULL, -- First day of month
  opening_balance DECIMAL(15, 4) DEFAULT 0,
  import_quantity DECIMAL(15, 4) DEFAULT 0,
  consumption_quantity DECIMAL(15, 4) DEFAULT 0,
  scrap_quantity DECIMAL(15, 4) DEFAULT 0,
  waste_quantity DECIMAL(15, 4) DEFAULT 0,
  sale_quantity DECIMAL(15, 4) DEFAULT 0,
  transfer_quantity DECIMAL(15, 4) DEFAULT 0,
  closing_balance DECIMAL(15, 4) DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Customs
```sql
-- HS Code database
CREATE TABLE hs_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(20) NOT NULL,
  description TEXT NOT NULL,
  description_th TEXT,
  unit VARCHAR(50),
  duty_rate DECIMAL(5, 2),
  is_restricted BOOLEAN DEFAULT false,
  requires_license BOOLEAN DEFAULT false,
  parent_code VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW()
);

-- FTA agreements
CREATE TABLE fta_agreements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  code VARCHAR(50) UNIQUE NOT NULL,
  partner_countries TEXT[],
  effective_date DATE,
  status VARCHAR(50),
  document_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Rules of Origin
CREATE TABLE rules_of_origin (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fta_id UUID REFERENCES fta_agreements(id),
  hs_code VARCHAR(20),
  rule_type VARCHAR(50), -- 'wholly_obtained', 'change_of_classification', 'regional_value_content'
  rule_description TEXT,
  minimum_percentage DECIMAL(5, 2),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Customs declarations
CREATE TABLE customs_declarations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  transaction_id UUID REFERENCES ie_transactions(id),
  declaration_number VARCHAR(100),
  declaration_date DATE,
  customs_office VARCHAR(100),
  total_duty DECIMAL(15, 2),
  total_vat DECIMAL(15, 2),
  fta_applied BOOLEAN DEFAULT false,
  fta_id UUID REFERENCES fta_agreements(id),
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Legal
```sql
-- Laws and regulations
CREATE TABLE laws (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  title_th VARCHAR(500),
  law_type VARCHAR(100), -- 'act', 'ministerial_regulation', 'notification', 'circular'
  category VARCHAR(100), -- 'investment', 'customs', 'factory', 'labor', 'environment'
  effective_date DATE,
  status VARCHAR(50), -- 'active', 'amended', 'repealed'
  full_text TEXT,
  summary TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Law sections
CREATE TABLE law_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  law_id UUID REFERENCES laws(id),
  section_number VARCHAR(50),
  title VARCHAR(255),
  content TEXT,
  parent_section_id UUID REFERENCES law_sections(id),
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Knowledge Base
```sql
-- Documents
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  file_type VARCHAR(50),
  file_size INTEGER,
  file_url TEXT,
  category VARCHAR(100),
  tags TEXT[],
  metadata JSONB,
  processed BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Document chunks (for RAG)
CREATE TABLE document_chunks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID REFERENCES documents(id),
  content TEXT NOT NULL,
  embedding VECTOR(1536),
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Chat history
CREATE TABLE chat_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  agent_type VARCHAR(50), -- 'boi', 'customs', 'legal', 'material'
  title VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES chat_sessions(id),
  role VARCHAR(20), -- 'user', 'assistant', 'system'
  content TEXT,
  sources JSONB, -- citations and references
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Audit Trail
```sql
-- Audit logs
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  action VARCHAR(100),
  entity_type VARCHAR(100),
  entity_id UUID,
  old_value JSONB,
  new_value JSONB,
  ip_address VARCHAR(45),
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## Feature Breakdown

### Phase 1: Core Foundation (Weeks 1-4)

#### 1.1 Project Setup
- [ ] Initialize Next.js 14 project with TypeScript
- [ ] Initialize NestJS project with TypeScript
- [ ] Setup Prisma with PostgreSQL
- [ ] Configure Tailwind CSS and Shadcn UI
- [ ] Setup Docker development environment
- [ ] Configure ESLint, Prettier, Husky

#### 1.2 Authentication System
- [ ] NextAuth.js configuration
- [ ] Login/Register pages
- [ ] JWT session management
- [ ] Role-based access control (RBAC)
- [ ] Protected routes middleware

#### 1.3 Database & ORM
- [ ] Design complete database schema
- [ ] Create Prisma migrations
- [ ] Seed initial data
- [ ] Database connection pooling

#### 1.4 Layout & Navigation
- [ ] Main layout with sidebar
- [ ] Top navigation bar
- [ ] Responsive design
- [ ] Dark/Light theme toggle
- [ ] Breadcrumb navigation

### Phase 2: BOI Module (Weeks 5-8)

#### 2.1 BOI Privileges Database
- [ ] Import all BOI privilege categories
- [ ] Import all BOI privileges with conditions
- [ ] Legal references for each privilege
- [ ] Search and filter functionality

#### 2.2 BOI Application Management
- [ ] Application form wizard
- [ ] Document upload
- [ ] Status tracking
- [ ] Certificate management

#### 2.3 BOI Dashboard
- [ ] Active privileges overview
- [ ] Application status tracker
- [ ] Upcoming deadlines
- [ ] Compliance metrics

### Phase 3: Import/Export Module (Weeks 9-12)

#### 3.1 Transaction Management
- [ ] Import transaction entry
- [ ] Export transaction entry
- [ ] Document attachment
- [ ] Approval workflow

#### 3.2 RMTS Integration
- [ ] RMTS data structure
- [ ] Material linking
- [ ] Account reconciliation

#### 3.3 Material Control
- [ ] BOM (Bill of Materials) management
- [ ] Yield tracking
- [ ] Scrap/Waste analysis
- [ ] Stock verification

### Phase 4: Customs Module (Weeks 13-16)

#### 4.1 HS Code Database
- [ ] Complete HS code database
- [ ] Search functionality
- [ ] Duty rate lookup
- [ ] License requirements

#### 4.2 FTA Management
- [ ] FTA agreements database
- [ ] Rules of Origin calculator
- [ ] Certificate of Origin tracking
- [ ] FTA benefit analysis

#### 4.3 Customs Procedures
- [ ] Import procedure guide
- [ ] Export procedure guide
- [ ] Bonded warehouse management
- [ ] Free zone operations

### Phase 5: Legal Module (Weeks 17-20)

#### 5.1 Laws Database
- [ ] BOI Act
- [ ] Customs Act
- [ ] Factory Act
- [ ] Revenue Code
- [ ] Labor laws
- [ ] Environmental laws

#### 5.2 Legal Research
- [ ] Full-text search
- [ ] Section-level navigation
- [ ] Cross-referencing
- [ ] Amendment tracking

#### 5.3 Compliance Checker
- [ ] Compliance assessment tool
- [ ] Risk analysis
- [ ] Recommendation engine

### Phase 6: AI Integration (Weeks 21-26)

#### 6.1 Knowledge Base (RAG)
- [ ] Document upload and processing
- [ ] Text chunking
- [ ] Embedding generation
- [ ] Vector storage (pgvector)
- [ ] Semantic search

#### 6.2 AI Agents
- [ ] BOI Expert Agent
- [ ] Customs Expert Agent
- [ ] Legal Research Agent
- [ ] Material Control Agent

#### 6.3 AI Chat Interface
- [ ] Chat UI components
- [ ] Streaming responses
- [ ] Source citations
- [ ] Chat history

### Phase 7: Dashboard & Analytics (Weeks 27-30)

#### 7.1 BI Dashboards
- [ ] BOI Privilege Dashboard
- [ ] Import Dashboard
- [ ] Export Dashboard
- [ ] Customs Dashboard
- [ ] Material Dashboard
- [ ] Compliance Dashboard
- [ ] Legal Dashboard

#### 7.2 Reports
- [ ] Export to PDF
- [ ] Export to Excel
- [ ] Custom report builder
- [ ] Scheduled reports

### Phase 8: Polish & Deployment (Weeks 31-34)

#### 8.1 Testing
- [ ] Unit tests
- [ ] Integration tests
- [ ] E2E tests
- [ ] Performance testing

#### 8.2 Security
- [ ] Security audit
- [ ] Penetration testing
- [ ] Data encryption
- [ ] Rate limiting

#### 8.3 Deployment
- [ ] Docker optimization
- [ ] CI/CD pipeline
- [ ] Production deployment
- [ ] Monitoring setup

---

## AI Agent Specifications

### 1. BOI Expert Agent
**Capabilities:**
- Answer questions about BOI privileges
- Guide through application process
- Explain conditions and requirements
- Analyze eligibility

**Knowledge Sources:**
- BOI Act and amendments
- BOI notifications and announcements
- Cabinet resolutions
- BOI guidelines

### 2. Customs Expert Agent
**Capabilities:**
- HS Code analysis
- Duty calculation
- FTA benefit analysis
- Customs procedure guidance

**Knowledge Sources:**
- Customs Act
- Customs tariff
- FTA agreements
- Customs Department notifications

### 3. Legal Research Agent
**Capabilities:**
- Law search and retrieval
- Legal summary generation
- Cross-reference analysis
- Risk assessment

**Knowledge Sources:**
- All relevant acts and regulations
- Ministerial regulations
- Notifications and circulars
- Court decisions (if available)

### 4. Material Control Agent
**Capabilities:**
- BOM verification
- Yield analysis
- Scrap/Waste tracking
- Account reconciliation

**Knowledge Sources:**
- BOI material control guidelines
- RMTS documentation
- E-MT system guides
- Material monitoring procedures

---

## API Endpoints

### Authentication
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/session
```

### BOI
```
GET    /api/boi/privileges
GET    /api/boi/privileges/:id
POST   /api/boi/applications
GET    /api/boi/applications
GET    /api/boi/applications/:id
PUT    /api/boi/applications/:id
```

### Import/Export
```
GET    /api/ie/transactions
POST   /api/ie/transactions
GET    /api/ie/transactions/:id
PUT    /api/ie/transactions/:id
GET    /api/ie/items
POST   /api/ie/items
```

### Material Control
```
GET    /api/materials
POST   /api/materials
GET    /api/materials/:id
GET    /api/materials/:id/movements
POST   /api/materials/:id/movements
GET    /api/materials/:id/balance
```

### Customs
```
GET    /api/customs/hs-codes
GET    /api/customs/hs-codes/:code
GET    /api/customs/fta
GET    /api/customs/fta/:id/rules
POST   /api/customs/declarations
```

### Legal
```
GET    /api/legal/laws
GET    /api/legal/laws/:id
GET    /api/legal/laws/:id/sections
GET    /api/legal/search
```

### Knowledge Base
```
POST   /api/knowledge/documents
GET    /api/knowledge/documents
DELETE /api/knowledge/documents/:id
POST   /api/knowledge/search
```

### AI Chat
```
POST   /api/ai/chat
GET    /api/ai/sessions
GET    /api/ai/sessions/:id/messages
```

### Dashboard
```
GET    /api/dashboard/boi-summary
GET    /api/dashboard/import-summary
GET    /api/dashboard/export-summary
GET    /api/dashboard/customs-summary
GET    /api/dashboard/material-summary
GET    /api/dashboard/compliance-summary
```

---

## Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/peeaum_boi
REDIS_URL=redis://localhost:6379

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# OpenAI
OPENAI_API_KEY=sk-your-openai-key
OPENAI_MODEL=gpt-4

# Vector Database
PINECONE_API_KEY=your-pinecone-key
PINECONE_INDEX=peeaum-boi

# Application
APP_NAME=Peeaum-BOI
APP_URL=http://localhost:3000
API_URL=http://localhost:3001

# File Storage
AWS_S3_BUCKET=your-bucket
AWS_ACCESS_KEY=your-access-key
AWS_SECRET_KEY=your-secret-key
```

---

## Implementation Order

1. **Phase 1:** Project setup and core infrastructure
2. **Phase 2:** Authentication and user management
3. **Phase 3:** Database schema and ORM setup
4. **Phase 4:** BOI module (most important)
5. **Phase 5:** Import/Export module
6. **Phase 6:** Material Control module
7. **Phase 7:** Customs module
8. **Phase 8:** Legal module
9. **Phase 9:** Knowledge Base (RAG)
10. **Phase 10:** AI Agents
11. **Phase 11:** AI Chat interface
12. **Phase 12:** Dashboards
13. **Phase 13:** Testing
14. **Phase 14:** Deployment

---

## Success Criteria

1. ✅ All BOI privileges documented and searchable
2. ✅ Import/Export transactions tracked
3. ✅ Material control with BOM/Yield analysis
4. ✅ Customs procedures documented
5. ✅ Legal database with full-text search
6. ✅ AI assistants providing accurate answers
7. ✅ Knowledge base with RAG capability
8. ✅ Comprehensive dashboards
9. ✅ Mobile-responsive design
10. ✅ Production-ready deployment
