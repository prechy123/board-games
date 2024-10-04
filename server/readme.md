start server with `npm run dev` and access it at `http://localhost:5000`

💡 REST API routes, keep them clean & short
    /routes

    💡 Responsible for receiving & returning data to routes
    /controllers

    💡 Core business logic
    /services

    💡 Database logic only (data-in/data-out, no business logic)
    /repositories

    💡 a place to define your DB schema
    /models

    💡 Static values you might use across the project
    /constants

    💡 Wrappers for 3rd party SDKs/APIs, such as Stripe/Shopify APIs
    /libs

    💡 Parsing errors, protecting endpoints, caching, etc
    /middlewares

    💡 Type definitions if needed since its typescript
    /types

    💡 utils contains functions you will call more than ones in the application
    /util