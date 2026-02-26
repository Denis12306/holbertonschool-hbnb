from flask_restx import Namespace, Resource, fields
from app.services import facade

api = Namespace('amenities', description='Amenity operations')

amenity_model = api.model('Amenity', {
    'name': fields.String(required=True, description='Name of the amenity')
})


@api.route('/')
class AmenityList(Resource):

    @api.expect(amenity_model, validate=True)
    @api.response(201, 'Amenity successfully created')
    @api.response(400, 'Invalid input data')
    def post(self):
        """Register a new amenity"""
        amenity_data = api.payload
        try:
            new_amenity = facade.create_amenity(amenity_data)
            return {
                "id": new_amenity.id,
                "name": new_amenity.name
            }, 201
        except Exception:
            return {"error": "Invalid input data"}, 400

    @api.response(200, 'List of amenities retrieved successfully')
    def get(self):
        """Retrieve a list of all amenities"""
        amenities = facade.get_all_amenities() or []
        return [
            {
                "id": amenity.id,
                "name": amenity.name
            }
            for amenity in amenities
        ], 200


@api.route('/<amenity_id>')
class AmenityResource(Resource):

    @api.response(200, 'Amenity details retrieved successfully')
    @api.response(404, 'Amenity not found')
    def get(self, amenity_id):
        """Get amenity details by ID"""
        try:
            amenity = facade.get_amenity(amenity_id)
            if not amenity:
                raise ValueError("Amenity not found")
            return {
                "id": amenity.id,
                "name": amenity.name
            }, 200
        except ValueError:
            return {"error": "Amenity not found"}, 404

    @api.expect(amenity_model, validate=True)
    @api.response(200, 'Amenity updated successfully')
    @api.response(404, 'Amenity not found')
    @api.response(400, 'Invalid input data')
    def put(self, amenity_id):
        """Update an amenity's information"""
        try:
            updated = facade.update_amenity(amenity_id, api.payload)
            return {"id": updated.id, "name": updated.name}, 200
        except ValueError:
            return {"error": "Amenity not found"}, 404
        except Exception:
            return {"error": "Invalid input data"}, 400
