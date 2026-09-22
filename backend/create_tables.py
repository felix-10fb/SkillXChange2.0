from sqlalchemy import create_engine
from app.db import metadata, DATABASE_URL

# Use SQLAlchemy engine to create tables
engine = create_engine(DATABASE_URL)

if __name__ == '__main__':
    metadata.create_all(engine)
    print('Tables created')
