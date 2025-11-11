# SJCE-STEP Futurise 2025 Landing Page

A futuristic, lightweight landing page for SJCE-STEP's "Futurise 2025" event, featuring cutting-edge design and seamless database integration.

## Features

- **Futuristic Design**: Bold gradients, geometric accents, and modern typography
- **Responsive Layout**: Optimized for all devices
- **Contact Form**: Minimal form with real-time validation
- **Database Integration**: Automatic form submission to Supabase
- **Lightweight**: Pure HTML, CSS, and JavaScript - no frameworks needed
- **Smooth Animations**: Engaging user interactions and transitions

## Theme: "Futurise"

The design emphasizes:
- Quantum computing, space tech, healthtech, and AI themes
- Electric blue (#00d4ff) and neon purple (#8b5cf6) color palette
- Clean, modern Poppins font family
- High-contrast sections with geometric patterns
- Circuit-inspired visual motifs

## Setup Instructions

### 1. Local Development
Simply open `index.html` in your web browser. The page is fully functional with:
- Static content display
- Form validation
- Responsive design

### 2. Database Integration
The form is already connected to Supabase with the following configuration:
- **Project**: SJCE-STEP-Futurise-2025
- **Database Table**: contact_submissions
- **Fields**: name, email, phone, category, created_at

### 3. Form Categories
The registration form includes these categories:
- Student
- Startup
- University
- Researcher
- Other

## File Structure

```
├── index.html          # Main HTML file
├── styles.css          # Futuristic CSS styling
├── script.js           # JavaScript for interactions and form handling
├── assets/
│   └── sjce-step-logo.svg  # SJCE-STEP logo
└── README.md           # This file
```

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Database**: Supabase (PostgreSQL)
- **Fonts**: Google Fonts (Poppins)
- **Icons**: Unicode emojis for lightweight approach

## Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Performance Features

- Optimized CSS with minimal dependencies
- Lazy loading animations
- Efficient form validation
- Compressed assets
- Clean, semantic HTML

## Customization

### Colors
Update CSS variables in `styles.css`:
```css
:root {
    --primary-blue: #00d4ff;
    --electric-blue: #0099ff;
    --neon-purple: #8b5cf6;
    --deep-navy: #0a0a1a;
}
```

### Content
Modify text content directly in `index.html` sections:
- Hero section
- About cards
- Contact information

## Security

- Form validation on both client and server side
- Supabase Row Level Security (RLS) enabled
- Anonymous insert policy for form submissions
- Input sanitization and validation

## Analytics & Monitoring

Form submissions are logged to the Supabase dashboard where you can:
- View all registrations
- Export data to CSV
- Monitor submission trends
- Set up email notifications

## License

© 2025 SJCE-STEP. All rights reserved.
