import uuid
from typing import List
import strawberry
from starlette.applications import Starlette
from strawberry.asgi import GraphQL


@strawberry.type
class ProductAttribute:
    id: strawberry.ID
    name: str
    value: str
    to_variant: bool


@strawberry.type
class Product:
    id: strawberry.ID
    variant_from: "Product" | None
    attributes: list[ProductAttribute]


@strawberry.type
class Query:
    @strawberry.field
    async def hello(self) -> str:
        return "Hello World!"


schema = strawberry.Schema(query=Query)
graphql_app = GraphQL(schema)
app = Starlette()
app.add_route("/graphql", graphql_app)
