# TravelTrucks

A camper rental web app: a catalog with filters and "Load more" pagination, a camper details page with a gallery, reviews and a booking form, a favorites list, light and dark themes, and two interface languages (EN / UA).

**Live demo:** https://your-project.vercel.app
**Repository:** https://github.com/Angelina-web/campers

## Tech stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS 4
- TanStack Query 5 (`useInfiniteQuery`, `useQuery`, `useQueries`, `useMutation`)
- next-intl for interface translations (the language is stored in a cookie)
- Zustand (with `persist`) for favorites
- Formik + Yup for the booking form and validation
- Swiper for the thumbnail gallery
- React Toastify for notifications
- Axios, React Icons

## Pages

| Route | Description |
|---|---|
| `/` | Home: hero banner with a call to action and the View Now button |
| `/catalog` | Camper catalog: filters and Load more |
| `/catalog/[camperId]` | Camper details: gallery, specs, reviews, booking form (opens in a new tab) |
| `/favorites` | Favorite campers |
| `not-found`, `error` | 404 and error pages |

## Features

- Server-side filtering through query parameters: location (text), body type, engine type, transmission (one option per group).
- "Load more" pagination: 4 cards at a time, new cards are fetched with the active filters applied.
- Swiper gallery with thumbnails, five-star rating display in reviews.
- Booking form with validation, submission to the backend and a success notification.
- Favorites: a heart button on cards and on the details page, a counter in the header, data kept in `localStorage`.
- Light and dark themes (the choice is saved, no flash on page load).
- EN / UA interface through next-intl. Camper names, descriptions and reviews are shown as returned by the backend.
- Sticky header, "back to top" button, animated loader, empty state for the catalog.

## API

Backend: `https://campers-api.goit.study` (Swagger documentation is available at the same address).

| Method | Path | Purpose |
|---|---|---|
| GET | `/campers` | Camper list (`page`, `perPage`, `location`, `form`, `transmission`, `engine`) |
| GET | `/campers/filters` | Available filter values |
| GET | `/campers/{camperId}` | Single camper |
| GET | `/campers/{camperId}/reviews` | Reviews |
| POST | `/campers/{camperId}/booking-requests` | Booking request (`name`, `email`) |

## Getting started

```bash
git clone https://github.com/Angelina-web/campers.git
npm install
npm run dev
```

Open http://localhost:3000.

Other scripts:

```bash
npm run build   # production build
npm run start   # run the production build
npm run lint    # ESLint
```

## Project structure

```
app/            routes, layout, global styles, not-found, error, loading
components/     UI components (Header, Hero, CamperCard, FiltersPanel, ...)
i18n/           next-intl configuration
lib/            API functions, favorites store, helper hooks
messages/       translation files (en.json, uk.json)
public/         images and SVG icons
types/          TypeScript types for API responses
```

## Author

**Аngelina**, full-stack developer
