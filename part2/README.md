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



Document the Implementation


Update the README.md file to include information about the Business Logic layer, describing the entities and their responsibilities, include examples of how the classes and methods can be used :

The Business Logic layer contains the core entities of the HBnB application.
It defines the application's data models and enforces validation rules and relationships between objects.

This layer is responsible for:

- Managing application entities
- Validating data
- Defining relationships between objects
- Providing reusable business behaviors

All business models inherit from BaseModel.

BaseModel is the parent class for all entities.

#### Responsibilities
Generate a unique identifier (id)
Store creation and update timestamps
Provide shared behavior for all models

#### Example

```python
from app.models.base_model import BaseModel

obj = BaseModel()
print(obj.id)
