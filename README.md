# AI Study Assistant - Frontend

![CI](https://github.com/abdallasaidbigpartner-web/study-assistant-frontend/actions/workflows/ci.yml/badge.svg) ![License](https://img.shields.io/badge/license-MIT-blue.svg)

A React + TypeScript frontend for the [AI Study Assistant](https://github.com/abdallasaidbigpartner-web/ai-study-assistant) backend - completing the full-stack picture: React client, FastAPI backend, PostgreSQL database, JWT authentication, and RAG-based question answering, all working together as one real system.

## What It Does

Users register and log in (JWT-authenticated), then ask questions in a simple interface. The frontend sends authenticated requests to the FastAPI backend, which retrieves relevant course notes and returns an LLM-generated, grounded answer - displayed along with its sources.

## Architecture

    React (Vite) frontend
        |
        | axios (with JWT Bearer token)
        v
    FastAPI backend (ai-study-assistant)
        |
        v
    PostgreSQL + Groq LLM (RAG pipeline)

## Tech Stack

- **React 19** + **TypeScript** - component-based UI with full type safety
- **Vite** - fast dev server and build tool
- **Axios** - typed HTTP client for API calls

## Running Locally

Requires the [ai-study-assistant](https://github.com/abdallasaidbigpartner-web/ai-study-assistant) backend running (defaults to `http://localhost:8000`, with CORS enabled).

    cp .env.example .env
    npm install
    npm run dev

By default the app points at `http://localhost:8000`. To point it at a different backend URL, set `VITE_API_BASE_URL` in `.env`.

## Notable Implementation Detail

TypeScript 6+ enables `verbatimModuleSyntax` by default in new Vite scaffolds, requiring type-only imports (e.g. `FormEvent`) to be explicitly marked with `import type`. This is a real compiler distinction between *values* and *types* - getting it right avoids bundling type information into runtime JavaScript, keeping bundle size minimal.

## Related Repositories

- [ai-study-assistant](https://github.com/abdallasaidbigpartner-web/ai-study-assistant) - the FastAPI backend this frontend connects to
- [python-learning-journey](https://github.com/abdallasaidbigpartner-web/python-learning-journey)
- [typescript-learning-journey](https://github.com/abdallasaidbigpartner-web/typescript-learning-journey)
- [sql-learning-journey](https://github.com/abdallasaidbigpartner-web/sql-learning-journey)
- [task-manager-api](https://github.com/abdallasaidbigpartner-web/task-manager-api)
- [ecommerce-database](https://github.com/abdallasaidbigpartner-web/ecommerce-database)
- [url-shortener-go](https://github.com/abdallasaidbigpartner-web/url-shortener-go)
