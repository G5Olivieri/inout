package users

import (
	"crypto/rand"
	"crypto/subtle"

	"golang.org/x/crypto/argon2"
)

type PasswordHasher interface {
	Hash(password, salt []byte) []byte
	Verify(password, hash, salt []byte) bool
}

type Password struct {
	hash   []byte
	salt   []byte
	hasher PasswordHasher
}

func NewDummyPassword() Password {
	return Password{
		hash:   make([]byte, 0),
		salt:   make([]byte, 0),
		hasher: NewDummyPasswordHasher(),
	}
}

func NewPassword(password []byte, hasher PasswordHasher) (Password, error) {
	salt := make([]byte, 32)
	_, err := rand.Read(salt)
	if err != nil {
		return Password{}, err
	}
	hash := hasher.Hash(password, salt)
	return Password{
		hash:   hash,
		salt:   salt,
		hasher: hasher,
	}, nil
}

func (p Password) Verify(password []byte) bool {
	return p.hasher.Verify([]byte(password), p.hash, p.salt)
}

type Argon2PasswordHasher struct {
	time    uint32
	memory  uint32
	threads uint8
	keyLen  uint32
}

func (ph Argon2PasswordHasher) Hash(password, salt []byte) []byte {
	return argon2.IDKey(password, salt, ph.time, ph.memory, ph.threads, ph.keyLen)
}

func (ph Argon2PasswordHasher) Verify(password, hash, salt []byte) bool {
	providedPwdHashed := argon2.IDKey(password, salt, ph.time, ph.memory, ph.threads, ph.keyLen)
	return subtle.ConstantTimeCompare(providedPwdHashed, hash) == 1
}

func NewArgon2PasswordHasher(time, memory uint32, threads uint8, keyLen uint32) Argon2PasswordHasher {
	return Argon2PasswordHasher{
		time:    time,
		memory:  memory,
		threads: threads,
		keyLen:  keyLen,
	}
}

type DummyPasswordHasher struct{}

func (h DummyPasswordHasher) Hash(password, salt []byte) []byte {
	return make([]byte, 0)
}

func (h DummyPasswordHasher) Verify(password, hash, salt []byte) bool {
	return false
}

func NewDummyPasswordHasher() DummyPasswordHasher {
	return DummyPasswordHasher{}
}
