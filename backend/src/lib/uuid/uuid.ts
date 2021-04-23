import { validate, v4 as uuid } from 'uuid'

class UUIDInvalidFormatError extends Error {}

export class UUID {
  public constructor(private readonly uuidString: string) {}

  public toString(): string {
    return this.uuidString
  }

  public static fromString(uuidStr: string): UUID {
    if (!validate(uuidStr)) {
      throw new UUIDInvalidFormatError(
        `The input '${uuid}' is not UUID valid string`
      )
    }
    return new UUID(uuidStr)
  }

  public static randomUUID(): UUID {
    return new UUID(uuid())
  }

  public static validateString(uuidStr: string): boolean {
    return validate(uuidStr)
  }
}
