# FyndRadarn

FyndRadarn is a portfolio project focused on building a modern full-stack web application for tracking product prices across multiple online stores.

Users can create anonymous price watchlists by providing an email address and a product URL. The application automatically monitors product prices and sends email notifications when prices change.

The project is currently under active development. MVP 1 is complete, and additional features and improvements are planned for future releases.

> 🚧 This project is under active development. The first MVP is complete, and new features are continuously being added.

## Current Status

MVP 1 has been completed and includes the complete anonymous price tracking workflow.

Users can:
- Create anonymous watchlists
- Preview product information before creating a watchlist
- Receive confirmation emails
- Automatically receive email notifications when prices change
- View their existing watchlists

## Project Goals

FyndRadarn aims to provide users with a simple way to:

- Create and manage personal watchlists.
- Track products from different stores.
- Set target prices.
- Monitor price history and trends.
- Receive notifications when products reach a target price.
- Filter and sort tracked products.
- Manage user accounts and preferences.

## Features

- Create anonymous price watchlists
- Preview product information before watchlist creation
- Automatic product price parsing
- Scheduled price monitoring
- Email confirmation when creating a watchlist
- Email notifications on price changes
- PostgreSQL persistence

## Tech Stack

### Frontend

- React
- React Router
- JavaScript (ES6+)
- CSS

### Backend

- Node.js
- Express
- PostgreSQL (`pg`)
- dotenv

### Database

- PostgreSQL (Supabase)

## Roadmap

### ✅ MVP 1 - Anonymous Price Tracking (Completed)

- [x] Enter email address
- [x] Paste product URL
- [x] Validate submitted data
- [x] Fetch current product price
- [x] Create a watchlist
- [x] Store watchlist in PostgreSQL
- [x] Display successful watchlist creation
- [x] Run scheduled price checks
- [x] Detect price changes
- [x] Send confirmation email
- [x] Send price change notifications

### 🚧 MVP 2 - Improved User Experience

- [ ] Support additional online stores
- [ ] Display product images
- [ ] Display latest price check timestamp
- [ ] Display price change history
- [ ] Delete existing watchlists
- [ ] Improve email templates
- [ ] Improve loading and error states

## Demo 
### MVP 1
![Fyndradarn Demo](assets/mvp1-fyndradarn-demo.gif)

[▶️ Watch full demo](assets/mvp1-fyndradarn-demo.mp4) 

## Screenshots 

### MVP 1

#### Home Page
![Home page](assets/mvp1-fyndradarn-home-page.png)
#### Product Preview
![Product preview](assets/mvp1-fyndradarn-product-preview.png)
#### My Watchlists
![My Watchlists](assets/mvp1-fyndradarn-my-watchlists.png)
#### Unsupported store
![Unsupported store](assets/mvp1-fyndradarn-unsupported-store.png)
#### Confirmation email
![Confirmation email](assets/mvp1-fyndradarn-confirmation-email.png)
#### Price Change email
![Price change email](assets/mvp1-fyndradarn-price-change-email.png)


## License

This project is intended for educational and portfolio purposes.
