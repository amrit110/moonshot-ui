import asyncio
from prisma import Prisma
import bcrypt

async def add_user(email: str, password: str) -> None:
    db = Prisma()
    await db.connect()

    try:
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        
        user_data = {
            'email': email,
            'password': hashed_password.decode('utf-8'),
        }
        print(f"Attempting to create user with data: {user_data}")
        
        user = await db.user.create(data=user_data)
        print(f"User created successfully with ID: {user.id}")
    except Exception as e:
        print(f"Error creating user: {e}")
        print(f"Error type: {type(e)}")
    finally:
        await db.disconnect()

async def main():
    email = "test@example.com"
    password = "testpassword"
    await add_user(email, password)

if __name__ == "__main__":
    asyncio.run(main())
