# 360 Explorer - Adventure Booking Platform

360 Explorer is a premium, modern adventure booking platform built with Next.js, designed for explorers seeking world-class treks and expeditions.

## 🚀 Key Features

- **Real-time Search**: Instant filtering of adventure packages by name or location.
- **Dynamic Adventure Details**: Side-by-side layout with detailed itineraries, high-quality images, and trip specifications.
- **Professional Booking Flow**: A multi-step checkout process with passenger information and travel preferences.
- **Demo Payment Integration**: A realistic simulation of a PhonePe payment interface.
- **E-Ticket Generation**: Automated E-Ticket creation upon successful booking.
- **QR Code Verification**: Dynamic QR codes on tickets that link to a live verification page for base camp check-ins.
- **Premium UI/UX**: Clean, responsive design with a professional color scheme and high-end typography.

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Language**: TypeScript
- **QR API**: QRServer for dynamic code generation

## 📁 Project Structure

- `src/app/`: Next.js application routes (Home, Adventure Details, Booking, Verification).
- `src/components/`: Reusable UI components (Header, SearchHero, AdventureCard, etc.).
- `src/data/`: Mock data for adventure packages.
- `public/`: Static assets including brand logos.

## 🏁 Getting Started

### Prerequisites

- Node.js installed on your machine.

### Installation

1. Clone the repository or open the project folder.
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Project

1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open your browser and navigate to `http://localhost:3000`.

## 📸 Screenshots

- **Home Page**: Features a stunning hero section and featured adventure grid.
- **Booking Page**: Modern checkout with real-time price calculation.
- **E-Ticket**: Professional digital ticket with scan-to-verify functionality.

---

© 2026 360 Explorer. All rights reserved.
