# MLHC Setup


## Steps to build the modified moonshot-ui

1. Clone this fork to a project folder say ``mlhc-hackathon``
2. Create python virtual environment and install the moonshot python library.

```bash
python3 -m venv .venv
source .venv/bin/activate
python3 -m pip install --upgrade pip
python3 -m pip install aiverify-moonshot
```
3. Make sure you have all the other prerequisites installed. Check the main README.md of the project for details.

```bash
cd moonshot-ui
npm install
```

4. Initialize and setup prisma DB for managing users.

```bash
prisma migrate dev --name init
prisma generate
```

5. Add users

Use the ``add_user.py`` to add users with email and password details.

6. Set the URL and port in the .env.local file. It is important that the URL to the app is correctly set in the .env.local
file to make sure that the routing works correctly.

7. Build the app

```bash
cd moonshot-ui
npm run build
```

8. From the outer directory (i.e. project folder), run:

```bash
python3 -m moonshot web
```