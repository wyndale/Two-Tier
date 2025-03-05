# Events Management System

A school laboratory activity for managing events with a RESTful API and web interface.

## Features
- Create, Read, Update, Delete (CRUD) events
- Simple web interface
- REST API endpoints
- SQL Server database integration

## Technologies
- ASP.NET Core (Backend)
- Entity Framework Core
- SQL Server
- HTML/CSS/JavaScript (Frontend)

## Getting Started

### Prerequisites
- .NET 8 SDK
- SQL Server
- Web browser

### Setup & Running

1. **Clone the repository**
   ```bash
   git clone https://github.com/wyndale/Two-Tier.git
   cd event-lab-manager
   ```

2. **Database Setup**
   - Update connection string in `server/appsettings.json`:
     ```json
     "ConnectionStrings": {
       "EventPlannerConnection": "Server=your-server;Database=EventPlannerDB;Trusted_Connection=True;"
     }
     ```
   - Run migrations:
     ```bash
     cd Server
     dotnet ef database update
     ```

3. **Run the Server**
   ```bash
   dotnet run
   ```

4. **Access the UI**
   - Open `client/` in a IDE like VS Code then run
   - The API will be running at `https://localhost:5003`

### Testing the API

Endpoints:
- `GET /api/events` - List all events
- `POST /api/events` - Create new event
- `PUT /api/events/{id}` - Update event
- `DELETE /api/events/{id}` - Delete event

Example using curl:
```bash
# Create event
curl -X POST -H "Content-Type: application/json" -d '{"name":"Lab Meeting", "location":"Room 301", "date":"2024-03-15T14:00"}' https://localhost:5003/api/events

# List events
curl https://localhost:5003/api/events
```

## Project Structure
- `server/`: ASP.NET Core backend
- `client/`: Web interface
- `docs/`: report and diagrams
