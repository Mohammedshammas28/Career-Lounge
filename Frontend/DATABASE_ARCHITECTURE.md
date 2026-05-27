# Professional Database Architecture - Implementation Guide

## ✅ Architecture Implemented

Your Career Lounge platform now uses a professional, scalable database architecture with proper data normalization.

## 📁 Project Structure

```
Frontend/
├── lib/
│   └── db/
│       └── connect.js              # MongoDB connection
├── models/
│   ├── University.js               # University schema
│   └── Banner.js                   # Banner schema (references University)
├── app/
│   ├── api/
│   │   ├── universities/
│   │   │   ├── route.js           # GET all, POST new
│   │   │   ├── [slug]/route.js    # GET/PATCH/DELETE by slug
│   │   │   └── search/route.js    # Search functionality
│   │   ├── banners/
│   │   │   ├── route.js           # GET active, POST new
│   │   │   └── [id]/route.js      # GET/PATCH/DELETE specific
│   ├── admin/
│   │   ├── page.jsx               # Dashboard
│   │   ├── layout.jsx             # Admin layout
│   │   ├── universities/
│   │   │   └── page.jsx           # Manage universities
│   │   └── banners/
│   │       └── page.jsx           # Manage banners
│   ├── university/
│   │   └── [slug]/
│   │       └── page.jsx           # University details page
│   └── api/*                      # Other existing routes
├── components/
│   └── university-banner-slider.jsx # Updated banner component
├── .env.local                     # Environment variables
└── package.json                   # With mongoose dependency
```

## 🗄️ Database Schema

### Universities Collection

```javascript
{
  _id: ObjectId,
  universityName: String (required),
  slug: String (unique),
  country: String,
  city: String,
  overview: String,
  logo: String,
  bannerImage: String,
  universityImages: [String],
  ranking: String,
  website: String,
  intakes: [{
    intakeName: String,
    startDate: Date,
    endDate: Date,
    applyDeadline: Date
  }],
  courses: [{
    courseName: String,
    level: String,
    duration: String,
    fees: String
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### Banners Collection

```javascript
{
  _id: ObjectId,
  university: ObjectId (ref to University),
  title: String,
  offerText: String,
  deadlineText: String,
  buttonText: String (default: "Apply Now"),
  customBannerImage: String,
  active: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔧 Setup Instructions

### 1. Environment Variables

Update `.env.local` in the Frontend directory:

```env
# MongoDB Connection URI
MONGODB_URI=mongodb://localhost:27017/career-lounge
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/career-lounge

# API Base URL
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 2. MongoDB Setup

**Local MongoDB:**
```bash
# Install MongoDB locally, then start the service
mongod
```

**MongoDB Atlas (Cloud):**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Get your connection string
5. Update `.env.local` with your connection string

### 3. Start the Application

```bash
cd Frontend
npm run dev
```

Visit `http://localhost:3000`

## 📋 API Endpoints

### Universities

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/universities` | Get all universities |
| POST | `/api/universities` | Create new university |
| GET | `/api/universities/[slug]` | Get university by slug |
| PATCH | `/api/universities/[slug]` | Update university |
| DELETE | `/api/universities/[slug]` | Delete university |
| GET | `/api/universities/search?q=query` | Search universities |

### Banners

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/banners` | Get all active banners (with university data) |
| POST | `/api/banners` | Create new banner |
| GET | `/api/banners/[id]` | Get specific banner |
| PATCH | `/api/banners/[id]` | Update banner |
| DELETE | `/api/banners/[id]` | Delete banner |

## 🎯 How It Works

### Step 1: Add a University (Admin Panel)
1. Go to `/admin/universities`
2. Click "Add University"
3. Fill in:
   - University Name
   - Country
   - City
   - Overview
   - Logo URL
   - Banner Image
   - Website
   - Images, Ranking, Courses, Intakes (optional)
4. Click "Create"

### Step 2: Create a Banner
1. Go to `/admin/banners`
2. Click "Create Banner"
3. Select a University from dropdown
4. Fill in:
   - Offer Text (e.g., "50% Scholarship")
   - Deadline Text (e.g., "Before July 7")
   - Button Text (default: "Apply Now")
   - Custom Banner Image (optional)
5. Toggle "Active" status
6. Click "Create"

### Step 3: The Magic Happens Automatically
- When you create a banner, it references the university
- When rendering the banner on the homepage, the API uses `.populate()` to automatically fetch:
  - University name
  - Country
  - Courses
  - Intakes
  - Images
  - All other university data

### Step 4: Update University, All Banners Update
- If you later change university data (e.g., country from "USA" → "United States")
- ALL banners for that university automatically show the updated data
- No duplicate data means no manual updates needed

## 🖥️ Admin Panel Features

### `/admin` - Dashboard
- Overview of the system
- Quick links to universities and banners

### `/admin/universities` - Manage Universities
- Add new universities
- Search/filter universities
- Edit university information
- Delete universities

### `/admin/banners` - Manage Banners
- Create banners by selecting universities
- Preview banners
- Edit banner details
- Activate/deactivate banners
- Delete banners

## 👀 Frontend Features

### `/` - Homepage
- University banner slider with automatic data fetching
- Shows university name, country, logo, offer text, deadline
- Click banner → navigates to university details page

### `/university/[slug]` - University Details Page
- Complete university information
- Tabs for Overview, Courses, Intakes, Gallery
- All data automatically from database
- Call-to-action for consultations

## 📊 Data Flow

```
Admin adds University once
    ↓
Stores in Universities Collection
    ↓
Admin creates Banner
    ↓
Banner references University ID
    ↓
API uses populate() to fetch university data
    ↓
Frontend displays banner with all university details
    ↓
User clicks banner
    ↓
Frontend uses banner.university.slug to navigate
    ↓
University details page loads with all information
```

## 🔍 Search Functionality

The system includes full-text search on universities:

```javascript
// Search for universities
GET /api/universities/search?q=harvard

// Returns matching universities by name or country
```

Text indexes are automatically created on:
- `universityName`
- `country`

## 🚀 Scaling

This architecture scales beautifully:
- **10 universities**: Works perfectly
- **100 universities**: Still fast with MongoDB indexing
- **10,000 universities**: Enterprise-ready with proper indexing
- **Worldwide**: Slug-based routing is SEO-friendly

## 💡 Best Practices Implemented

✅ **Normalization**: University data stored once, referenced by banners
✅ **Indexing**: Text indexes for fast searching
✅ **Relationships**: Proper MongoDB references with populate()
✅ **API Structure**: RESTful endpoints following conventions
✅ **Error Handling**: Try-catch blocks in all endpoints
✅ **Validation**: Required fields enforced at schema level
✅ **Auto-generation**: Slugs generated automatically from university names

## ⚠️ Important Notes

1. **MongoDB Required**: You need a MongoDB instance (local or Atlas)
2. **Environment Variables**: Must be set in `.env.local`
3. **Restart Dev Server**: After updating `.env.local`, restart `npm run dev`
4. **Image URLs**: Use full URLs (http:// or https://) for images
5. **First Time**: Database will create collections automatically on first write

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env.local`
- Verify credentials if using MongoDB Atlas

### 404 on University Details Page
- Check that the university exists
- Verify the slug is correctly formatted (lowercase, hyphenated)

### Banner Not Showing
- Ensure banner `active: true`
- Check that referenced university exists
- Verify in `/api/banners` returns data

### Images Not Loading
- Ensure URLs are complete (http:// or https://)
- Check CORS if images from external domains

## 📞 Support

For detailed API information, check the route files:
- `app/api/universities/route.js`
- `app/api/banners/route.js`

For model details, check:
- `models/University.js`
- `models/Banner.js`

## 🎉 You're Ready!

Your professional database architecture is now implemented. Start by:

1. Setting up MongoDB (local or Atlas)
2. Updating `.env.local` with your MongoDB URI
3. Running `npm run dev`
4. Going to `/admin/universities` to add universities
5. Going to `/admin/banners` to create banners
6. Viewing results on homepage

Enjoy your scalable, professional platform! 🚀
