import os
from databases import Database
from sqlalchemy import (
    MetaData, Table, Column, Integer, String, DateTime, Boolean, func
)
from sqlalchemy.sql import expression

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    DATABASE_URL = "postgresql://neondb_owner:npg_FcUS90aeNWbi@ep-icy-boat-b5143umf-pooler.c-7.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

database = Database(DATABASE_URL)
metadata = MetaData()

users = Table(
    'users', metadata,
    Column('id', Integer, primary_key=True),
    Column('email', String, unique=True, nullable=False),
    Column('password', String, nullable=False),
    Column('full_name', String),
    Column('skillcoins', Integer, nullable=False, server_default=expression.text('0')),
    Column('streak', Integer, nullable=False, server_default=expression.text('0')),
    Column('last_active', DateTime)
)

rewards = Table(
    'rewards', metadata,
    Column('id', Integer, primary_key=True),
    Column('title', String, nullable=False),
    Column('cost', Integer, nullable=False)
)
