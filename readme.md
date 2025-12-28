# Full-Stack CRUD SPA + API

This repository is a small, self-contained full-stack MERN application built as part of a technical exercise for VYNYL.

The goal of this project is not just to deliver working software, but to demonstrate how I approach system design, fellow developer experience, prototyping, and communication when building a complete product surface.

---

## Running the Application

For your convenience, I containerized the entire application, reducing setup to a single command! The only assumption here being that you have Docker installed, and maybe even Docker Desktop, and are a developer who knows how to use a command terminal.

### Requirements
- Docker

### Start
```bash
docker compose up --build
```

Three containers will be spun up:
- vynylassessment-api
- vynylassessment-spa
- postgres:16

The application will be fully functional once all three are running.

You can now open your browser to view the client and play with functionality at:

http://localhost:5173/

If you want to test the API endpoints individually, the following endpoints are available:
- GET       http://localhost:3000/api/products
- GET       http://localhost:3000/api/products/search?q=''
- GET       http://localhost:3000/api/products/:id
- POST      http://localhost:3000/api/products
- PATCH     http://localhost:3000/api/products/:id
- DELETE    http://localhost:3000/api/products/:id

### Technology Overview
- SPA: React (TypeScript)
- API: TypeScript + Nestjs + Prisma
- Persistence: Postgres
- Runtime: Docker + Docker Compose

### Design Decisions
The code favors clarity over cleverness and mirrors production systems. For time considerations, I have left out normal safety checks such as try-catch error handling in the service layer. Some values are also hardcoded here and there, a practice I obviously would not allow in production. I selected Nestjs as a Node framework. It is an intuitive and opininated MVC workflow. It narrows the field of decision-making and renders a very C#/.NET Core syntax perfect for API design. Prisma is another nice-to-have, since it acts as a standalone schema-first ORM and DB management plugin where the schema serves as a single source of truth, which I am a big fan of. I think these choices strike a nice balance between setup time and proper modularity/separation of concerns.

I also only git-versioned the project once it was ready to present, since I am the only contributor in this very simple, short-time-framed example project.

### Known Bugs
The search does not play well with the sorting functions. The latter trigger automatically when the either field or order dropdown value changes, but does not take the current search string into consideration, so the search results get reset, even as the search string is still displayed in the search field. A simple solution would be to keep a complete state of filtering (sorting field, order, and search string) that gets used every time a fetch of any kind occurs, appending all three as optional params to the fetch/search uri. This was omitted for the sake of time.

### Notes for Reviewers
This repository reflects how I typically approach small-to-medium scoped projects: clear boundaries, minimal setup friction, and explicit communication of intent. I tend to write code that is self-documenting so that it is as clear as possible to any new developer what the intent of the code is. I’m happy to walk through any part of the implementation or discuss alternative approaches and tradeoffs!