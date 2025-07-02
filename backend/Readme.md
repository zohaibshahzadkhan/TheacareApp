## Backend Setup (FastAPI + Supabase)

This guide walks you through setting up the Python backend with FastAPI and Supabase.

###  Requirements

- Python 3.8 (recommended)
- `pip` (Python package manager)
- Supabase PostgreSQL connection string (saved in `.env` file)

---

---

### Supabase Database Setup

To set up the required table and extension in your Supabase PostgreSQL database, run the following SQL in the Supabase SQL Editor or via CLI:

```sql

-- Enable pgcrypto for UUID generation

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create camera_config table
CREATE TABLE camera_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  face_check_enabled BOOLEAN NOT NULL DEFAULT true,
  lighting_check_enabled BOOLEAN NOT NULL DEFAULT true
);

-- Insert default config row

INSERT INTO camera_config (id, face_check_enabled, lighting_check_enabled)
VALUES (gen_random_uuid(), true, true);

```
You can also find this script in [supabase_schema.sql](./supabase_schema.sql)

### Install Python 3.8

Ensure Python 3.8 is installed:

```bash
python3 --version
# or
python --version
```

If not installed, download it from: https://www.python.org/downloads/release/python-380/


### Create Virtual Environment

Create and activate a virtual environment:

Create virtual environment
 ```
 python3.8 -m venv venv
```
Activate (Linux/macOS)
```
source venv/bin/activate
```
Activate (Windows)
```
venv\Scripts\activate
```

### Install Dependencies
Install all required Python packages:

```
pip install -r requirements.txt
```

### Configure Environment Variables

Create a **.env** file in the root of the backend folder:

```
SUPABASE_DB_URL=postgresql://your-user:your-password@your-host:5432/your-database
```

### Run the Server

``` 
uvicorn main:app --reload --host 0.0.0.0 --port 8000 
```

Server will be running at: http://localhost:8000

### Health Check Endpoint
Test your database and server health:
curl http://localhost:8000/health
