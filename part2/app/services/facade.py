from app.persistence.repository import InMemoryRepository
"""This class will handle communication between the Presentation,
Business Logic, and Persistence layers. You will interact with the repositories
(like the in-memory repository) through this Class:"""
from app.models.user import User

class HBnBFacade:
    def __init__(self):
        self.user_repo = InMemoryRepository()
        self.place_repo = InMemoryRepository()
        self.review_repo = InMemoryRepository()
        self.amenity_repo = InMemoryRepository()

    def get_place(self, place_id):
        # Logic will be implemented in later tasks
        pass

    def create_user(self, user_data):
        # Placeholder method for creating a user
        user = User(**user_data)
        self.user_repo.add(user)
        return user

    def get_user(self, user_id):
        return self.user_repo.get(user_id)

    def get_user_by_email(self, email):
        return self.user_repo.get_by_attribute('email', email)
