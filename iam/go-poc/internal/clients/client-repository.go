package clients

import (
	"context"
	"fmt"
)

type ClientRepository interface {
	GetByID(ctx context.Context, id string) (Client, error)
}

type InMemoryClientRepository struct {
	clients []Client
}

func NewInMemoryClientRepository(clients []Client) InMemoryClientRepository {
	return InMemoryClientRepository{
		clients: clients,
	}
}

func (r InMemoryClientRepository) GetByID(ctx context.Context, id string) (Client, error) {
	for _, c := range r.clients {
		if c.ID == id {
			return c, nil
		}
	}
	return EmptyClient(), fmt.Errorf("Client not found")
}
