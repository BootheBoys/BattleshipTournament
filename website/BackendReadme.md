---
layout: default
title: Battleship Backend Readme
description: Readme for the backend repo
---
# Battleship AI Backend

## Overview

This repository contains the backend for an app that allows users to submit their AI models designed to play Battleship and pits them against each other. The backend facilitates the submission of models, organizes games, and tracks the results of battles between the models.

## Features

- **Model Submission**: Allows users to submit their AI models that are built to play Battleship.
- **Game Management**: Orchestrates matches between AI models, including game state, turns, and results.
- **Leaderboard**: Tracks performance of submitted models and displays a leaderboard of the best models based on their win/loss record.
- **AI Model Evaluation**: Automatically evaluates the performance of submitted models in various scenarios.

## Technologies Used

- **Python**: Main programming language used for the backend logic and model evaluation.
- **FastAPI**: Fast and modern web framework to create APIs for communication between the frontend and backend.
- **SQLAlchemy**: ORM for database management.
- **PostgreSQL**: Relational database to store user data, AI models, game states, and results.
- **Docker**: Containerization of the application to ensure consistency across environments.
- **AI Model Interface**: Custom interface to communicate with the submitted AI models, ensuring they follow a standard format for the game.

## Setup

### Prerequisites

- Python 3.8 or higher
- PostgreSQL database
- Docker (optional, for containerized setup)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/battleship-ai-backend.git
   cd battleship-ai-backend
   ```

2. **Create and activate a virtual environment**:

   ```bash
   python -m venv venv
   source venv/bin/activate  # For macOS/Linux
   venv\Scripts\activate     # For Windows
   ```

3. **Install the required dependencies**:

   ```bash
   pip install -r requirements.txt
   ```

4. **Setup the database**:
   - Ensure that you have PostgreSQL installed and running.
   - Create a new database and configure the database connection in the `.env` file.

5. **Run database migrations**:

   ```bash
   alembic upgrade head
   ```

6. **Start the application**:

   ```bash
   uvicorn main:app --reload
   ```

   The backend should now be running on `http://127.0.0.1:8000`.
