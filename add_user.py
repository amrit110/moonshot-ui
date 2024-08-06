"""Script to add user accounts for the MLHC hackathon."""

import asyncio
from typing import Optional

import bcrypt
from prisma import Prisma
from prisma.models import User


async def add_user(email: str, password: str) -> Optional[User]:
    """
    Add a new user to the database with the given email and password.

    Parameters
    ----------
    email : str
        The email address of the new user.
    password : str
        The password for the new user (will be hashed before storage).

    Returns
    -------
    Optional[User]
        The created User object if successful, None otherwise.

    Raises
    ------
    Exception
        If there's an error during user creation or database operations.
    """
    db = Prisma()
    await db.connect()

    try:
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        
        user_data = {
            'email': email,
            'password': hashed_password.decode('utf-8'),
        }
        print(f"Attempting to create user with email: {email}")
        
        user = await db.user.create(data=user_data)
        print(f"User created successfully with ID: {user.id}")
        return user
    except Exception as e:
        print(f"Error creating user: {str(e)}")
        print(f"Error type: {type(e).__name__}")
        return None
    finally:
        await db.disconnect()


async def main() -> None:
    """
    Main function to demonstrate user creation.
    """
    email = "test@example.com"
    password = "testpassword"
    user = await add_user(email, password)
    if user:
        print(f"User added successfully: {user.email}")
    else:
        print("Failed to add user")


if __name__ == "__main__":
    asyncio.run(main())
