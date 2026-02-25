from app.persistence.repository import InMemoryRepository
"""This class will handle communication between the Presentation,
Business Logic, and Persistence layers. You will interact with the repositories
(like the in-memory repository) through this Class:"""
from app.models.user import User
from app.models.place import Place


class HBnBFacade:
    def __init__(self):
        self.user_repo = InMemoryRepository()
        self.place_repo = InMemoryRepository()
        self.review_repo = InMemoryRepository()
        self.amenity_repo = InMemoryRepository()

    """User Methods"""

    def create_user(self, user_data):
        # Placeholder method for creating a user
        user = User(**user_data)
        self.user_repo.add(user)
        return user

    def get_user(self, user_id):
        return self.user_repo.get(user_id)

    def get_user_by_email(self, email):
        return self.user_repo.get_by_attribute('email', email)

    def create_place(self, place_data):
        # Placeholder for logic to create a place, including validation for price, latitude, and longitude
        pass


    def get_place(self, place_id):
    # Placeholder for logic to retrieve a place by ID, including associated owner and amenities
        pass


    def get_all_places(self):
    # Placeholder for logic to retrieve all places
        pass


    def update_place(self, place_id, place_data):
    # Placeholder for logic to update a place
        pass
    def get_all_users(self):
        return self.user_repo.get_all()

    def update_user(self, user_id, user_data):
        user = self.get_user(user_id)
        if not user:
            return None
        for key, value in user_data.items():
            setattr(user, key, value)
            return user

    """Place Methods"""

    def create_place(self, place_data):
        place = Place(**place_data)
        self.place_repo.add(place)
        return place

    def get_place(self, place_id):
        return self.place_repo.get(place_id)

    def get_all_places(self):
        return self.place_repo.get_all()

    def update_place(self, place_id, place_data):
        place = self.get_place(place_id)
        if not place:
            return None
        for key, value in place_data.items():
            setattr(place, key, value)
    
        return place

    """Amenity Methods"""

    """Review Methods"""