# Music Streaming Service API

A full-featured music streaming platform API built with NestJS, featuring user accounts, subscriptions, artist profiles, albums, tracks, playlists, and personalized recommendations.

## 🎵 Overview

This Music Streaming Service provides a robust backend API for delivering music content to users. The system manages various entities including users, artists, albums, tracks, playlists, and subscriptions, with a recommendation engine to enhance user experience.

## 🚀 Features

- **User Management**: Registration, authentication, profile management
- **Subscription Handling**: Different tiers with varying features
- **Artist Profiles**: Comprehensive artist information and discography
- **Album Management**: Full album metadata and track listings
- **Track Streaming**: Secure audio file delivery with proper throttling
- **Playlist Creation**: User-generated and system playlists
- **Recommendation Engine**: Personalized music suggestions based on listening habits
- **Search Functionality**: Powerful search across multiple content types

## 🛠️ Technology Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Authentication**: JWT, Passport
- **Testing**: Jest
- **Documentation**: Swagger/OpenAPI
- **Containerization**: Docker
- **Orchestration**: Kubernetes
- **CI/CD**: GitHub Actions

## 📦 Project Structure

The project follows a modular architecture based on domain-driven design principles:

```
music-streaming-api/
├── src/
│   ├── main.ts                          # Application entry point
│   ├── app.module.ts                    # Root application module
│   ├── config/                          # Configuration files
│   ├── modules/                         # Feature modules
│   │   ├── user/                        # User management
│   │   ├── subscription/                # Subscription handling
│   │   ├── track/                       # Track management
│   │   ├── artist/                      # Artist profiles
│   │   ├── album/                       # Album management
│   │   ├── playlist/                    # Playlist functionality
│   │   └── recommendation/              # Recommendation engine
│   ├── common/                          # Shared utilities
│   └── shared/                          # Shared services
├── test/                                # Testing directory
├── dist/                                # Compiled JavaScript output
└── k8s/                                 # Kubernetes configurations
```

## 🔧 Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Docker and Docker Compose
- PostgreSQL (if running locally)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/music-streaming-api.git
   cd music-streaming-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Start the development server:
   ```bash
   npm run start:dev
   ```

### Docker Setup

To run the application with Docker:

```bash
docker-compose up -d
```

## 🚀 Deployment

### Kubernetes Deployment

1. Build and push Docker image:
   ```bash
   docker build -t your-registry/music-streaming-api:latest .
   docker push your-registry/music-streaming-api:latest
   ```

2. Deploy to Kubernetes:
   ```bash
   kubectl apply -k k8s/overlays/production/
   ```

### CI/CD Pipeline

The project includes GitHub Actions workflows for:
- Running tests on pull requests
- Building and publishing Docker images
- Deploying to different environments

## 📖 API Documentation

Once the application is running, access the API documentation at:
```
http://localhost:3000/api/docs
```

## 📊 Database Schema

The database schema includes the following main entities:
- Users
- Subscriptions
- Artists
- Albums
- Tracks
- Playlists
- Recommendations

Refer to the database migration files for detailed schema information.

## 🧪 Testing

Run the test suite with:

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 📝 Development Roadmap

### Phase 1: Foundation (Months 1-3)
- Basic API structure
- User authentication
- Database setup
- Core entity implementation

### Phase 2: Core Features (Months 4-6)
- Playlist management
- Subscription handling
- Audio streaming functionality
- Search implementation

### Phase 3: Advanced Features (Months 7-9)
- Recommendation engine
- Performance optimization
- Advanced filtering
- Analytics integration

### Phase 4: Production Readiness (Months 10-12)
- Security hardening
- Scalability enhancements
- Extensive testing
- Deployment pipeline

## 🔐 License

[MIT License](LICENSE)

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Contact

For questions or support, please reach out to [your-email@example.com](mailto:your-email@example.com)