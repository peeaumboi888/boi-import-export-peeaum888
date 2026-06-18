# peeaumboi888

AI BOI Import Export Customs Legal Intelligence Platform

## Overview

ศูนย์รวมองค์ความรู้และผู้ช่วยอัจฉริยะด้านการส่งเสริมการลงทุนของประเทศไทย

## Features

- **BOI Privileges** - ค้นหาและวิเคราะห์สิทธิประโยชน์ BOI
- **Import/Export** - จัดการการนำเข้าและส่งออก
- **Customs** - พิกัดศุลกากร FTA และ Rules of Origin
- **Legal** - ค้นหาและศึกษากฎหมายที่เกี่ยวข้อง
- **Material Control** - จัดการวัตถุดิบ BOM Yield
- **Knowledge Base** - ระบบฐานความรู้ RAG
- **AI Assistant** - ผู้ช่วย AI 4 ประเภท

## Tech Stack

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS, Shadcn UI
- **Backend:** NestJS, TypeScript
- **Database:** PostgreSQL, Prisma ORM
- **AI:** OpenAI API, LangChain, pgvector
- **Auth:** NextAuth.js
- **Deployment:** Docker, Vercel, GitHub Actions

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 15+
- Redis 7+

### Installation

1. Clone the repository

```bash
git clone https://github.com/your-username/peeaum-boi.git
cd peaum-boi
```

2. Install dependencies

```bash
npm install
```

3. Setup environment variables

```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Setup database

```bash
cd apps/api
npx prisma migrate dev
npx prisma db seed
```

5. Start development server

```bash
npm run dev
```

### Docker

```bash
docker-compose up -d
```

## Project Structure

```
peeaum-boi/
├── apps/
│   ├── web/           # Next.js Frontend
│   └── api/           # NestJS Backend
├── packages/
│   ├── shared/        # Shared types
│   └── ai/            # AI utilities
├── docs/              # Documentation
└── docker-compose.yml
```

## API Documentation

Access Swagger UI at: http://localhost:3001/api/docs

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| DATABASE_URL | PostgreSQL connection string | - |
| REDIS_URL | Redis connection string | - |
| JWT_SECRET | JWT secret key | - |
| OPENAI_API_KEY | OpenAI API key | - |
| NEXTAUTH_URL | NextAuth.js URL | http://localhost:3000 |
| NEXTAUTH_SECRET | NextAuth.js secret | - |

## License

MIT License
