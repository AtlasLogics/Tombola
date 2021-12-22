# run server
python manage.py runserver

# In case of errors
python manage.py sqlmigrate --run-syncdb play
python manage.py makemigrations play
python manage.py sqlmigrate play 0001
python manage.py migrate play

# Reset database
python manage.py flush play
python manage.py sqlsequencereset play

Make sure to copy the contents of the migrations file to a new migrations with 
python manage.py makemigrations --empty play
if the 90 balls are not present in the database, you can automate this command with a simple script in views
