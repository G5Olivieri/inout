import strawberry
from starlette.applications import Starlette
from strawberry.asgi import GraphQL


@strawberry.type
class User:
    name: str
    age: int


@strawberry.type
class Query:
    @strawberry.field
    async def user(self) -> User:
        return User(name="Patrick", age=100)


@strawberry.type
class Mutation:
    @strawberry.mutation
    def add_user(self, name: str, age: int) -> User:
        print(f"Adding {name} by {age}")

        return User(name=name, age=age)


schema = strawberry.Schema(query=Query, mutation=Mutation)
graphql_app = GraphQL(schema)
app = Starlette()
app.add_route("/graphql", graphql_app)
