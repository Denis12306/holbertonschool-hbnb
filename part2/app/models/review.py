#!/usr/bin/python3
from base_model import BaseModel


class Review(BaseModel):

    """
    Represents a review written by a user for a specific place.

    The Review class captures the feedback provided by users, including
    a text comment and a numerical rating. It establishes a link between
    the reviewer (User) and the property (Place).

    Attributes:
        text (str): The content of the review.
        rating (int): A score given by the user, ranging from 1 to 5.
        place (Place): The instance of the Place being reviewed.
        user (User): The instance of the User who wrote the review.
    """

    def __init__(self, text, rating, place, user):
        """
        Initialize a new Review instance.

        Args:
            text (str): The review content/comments.
            rating (int): A rating value between 1 and 5.
            place (Place): The place object this review belongs to.
            user (User): The user object who authored the review.

        Raises:
            ValueError: If the text is empty or not a string.
            ValueError: If the rating is not an integer or is outside 1-5.
            ValueError: If the place or user is not provided (None).
        """
        if not text or not isinstance(text, str):
            raise ValueError("The content of the review is mandatory")

            if not isinstance(rating, int) or not (1 <= rating <= 5):
                raise ValueError(
                    "The rating must be an integer between 1 and 5")

            if place is None:
                raise ValueError("The review must be linked to a valid Place")
            if user is None:
                raise ValueError("The review must have a valid author(User)")

            super().__init__()
            self.text = text
            self.rating = rating
            self.place = place
            self.user = user
