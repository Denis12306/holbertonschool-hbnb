#!/usr/bin/python3
from app.models.base_model import BaseModel


class Place(BaseModel):
    """
    Represents a place or accommodation available in the application.

    The Place class inherits from BaseModel and contains all information
    related to a listing, including its location, pricing, and relationships
    with owners, reviews, and amenities.

    Attributes:
        title (str): The name or title of the accommodation.
        description (str): A detailed description of the place.
        price (float): The cost per night.
        latitude (float): Geographic coordinate (between -90.0 and 90.0).
        longitude (float): Geographic coordinate (between -180.0 and 180.0).
        owner (User): The User instance that owns the place.
        reviews (list): A list of Review instances associated with this place.
        amenities (list): A list of Amenity instances associated with this place.
    """

    def __init__(self, title, description, price, latitude, longitude, owner):
        """
        Initialize a new Place instance.

        Args:
            title (str): Title of the accommodation (max 100 characters).
            description (str): Textual description of the place.
            price (float/int): Positive numeric value for the price.
            latitude (float): Latitude coordinate between -90.0 and 90.0.
            longitude (float): Longitude coordinate between -180.0 and 180.0.
            owner (User): The user object representing the owner.

        Raises:
            ValueError: If the title is empty or exceeds 100 characters.
            ValueError: If the price is not a positive number.
            ValueError: If coordinates are out of the valid geographic range.
            ValueError: If the owner is not provided.
        """
        if not title or len(title) > 100:
            raise ValueError(
                "Title is required and must be under 100 characters")
        if not isinstance(price, (int, float)) or price < 0:
            raise ValueError("Price must be a positive value")
        if not (-90.0 <= latitude <= 90.0):
            raise ValueError("Latitude must be between -90.0 and 90.0")
        if not (-180.0 <= longitude <= 180.0):
            raise ValueError("Longitude must be between -180.0 and 180.0")

        if owner is None:
            raise ValueError("Place must have a valid owner")
        super().__init__()
        self.title = title
        self.description = description
        self.price = float(price)
        self.latitude = float(latitude)
        self.longitude = float(longitude)
        self.owner = owner
        self.reviews = []  # List to store related reviews
        self.amenities = []  # List to store related amenities

    def add_review(self, review):
        """
        Add a review to the place's list of reviews.

        Args:
            review (Review): The review instance to be added.
        """
        self.reviews.append(review)

    def add_amenity(self, amenity):
        """
        Add an amenity to the place's list of amenities.

        Args:
            amenity (Amenity): The amenity instance to be linked.
        """
        self.amenities.append(amenity)
