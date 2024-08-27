from dataclasses import dataclass
from uuid import UUID


@dataclass
class ProductAttribute:
    id: UUID
    name: str
    value: str
    to_variant: bool


@dataclass
class Product:
    id: UUID
    variant_from: "Product" | None
    attributes: list[ProductAttribute]
