Frontend:

1) Install python virtual environment module: pip install virtualenv
2) set directory backend : cd/backend
3) Create a python virtual environment : python -m virtualenv env
4) activate virtual environment: env/Scripts/activate
5) Install backend requirements: pip install -r requirements.txt
6) Create a file called '.env' in the backend and copy the following into the file: JWT_SECRET_KEY=thisshouldbesupersecret //replace with your secret key
JWT_REFRESH_SECRET_KEY=thishoudlbesuperdupersecret  //replace with your own secret key
MONGO_CONNECTION_STRING=mongodb://localhost:88888 //replace with your own connection string
7) Run backend : uvicorn app.app:app --reload

Backend:
