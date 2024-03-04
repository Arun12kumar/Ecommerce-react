#commands **********
django-admin startproject  ecommerceproject <project-name>
python manage.py startapp <name>

python manage.py shell

pip install djangorestframework-simplejwt
python manage.py runserver
pip freeze > requirements.txt
python manage.py migrate
python manage.py makemigrations  

python manage.py startapp product ./ecommerceproject/product   

from django.core.management.utils import get_random_secret_key
print(get_random_secret_key())

*secreat key
from pathlib import Path
from dotenv import load_dotenv
import os

load_dotenv()

SECRET_KEY = os.environ.get("SECRET_KEY")


#apps ******

python-dotenv 1.0.1

git remote add origin https://github.com/Arun12kumar/MainProj_Ecommerce.git
git push -u origin master