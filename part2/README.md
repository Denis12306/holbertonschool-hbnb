# Hbnb Part 2

## Purpose of directories and files.

This way we have a well-organized, modular project structure with clear separation of concerns across the **Presentation**, **Business Logic**, and **Persistence layers**. The Flask application will be functional, with an in-memory repository and Facade pattern in place, ready for future integration of API endpoints and a database-backed persistence layer.

Each directories and files have is own instructions and caracteristics, make a piece of a puzzle that merge together, allows us to correctly and functionnaly run the Hbnb server project.

## Include instructions on how to install dependencies and run the application.

This command install an virtual environnement
```Bash
python3 -m venv env
```
And for activacte this we used this command
```Bash
source env/bin/activate(.fish)
```
After activate env we install all package of my list of package
```Bash
pip install -r requirements.txt
```
The application run the run.py files who is the entry point.
```Bash
python3 run.py
```
You should see the Flask application running, although no routes are functional yet. This confirms that the project structure and basic setup are correct and ready for further development.
