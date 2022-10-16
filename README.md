# MultiVendor

## Setup

To start backend run `./manage.py runserver` in `server` folder.

To start frontend run `npm start` in `app` folder.

## Commands

Generate secret key `./manage.py generate_secret_key`.

Look at available routes `./manage.py show_urls`.

## Deployment

Production settings are in `prod.py` file, compile frontend production build
(`npm build`).

Deployment:

- Backend: Heroku

- Frontend: Netlify (+https)

- Domain: Porkban

- Email: MailGun
