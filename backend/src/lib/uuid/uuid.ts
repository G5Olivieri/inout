import { validate, v4 as uuid } from 'uuid'

class UUIDInvalidFormatError extends Error {}

export class UUID {
  private constructor(private readonly uuidString: string) {}

  public toString(): string {
    return this.uuidString
  }

  public static fromString(uuid: string): UUID {
    if (!validate(uuid)) {
      throw new UUIDInvalidFormatError(
        `The input '${uuid}' is not UUID valid string`
      )
    }
    return new UUID(uuid)
  }

  public static randomUUID(): UUID {
    return new UUID(uuid())
  }
}
