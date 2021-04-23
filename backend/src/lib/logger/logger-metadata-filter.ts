import _ from 'lodash'

export class LoggerMetadataFilter {
  private readonly placeholder = '*sensitive*'

  public constructor(private readonly blacklistedKeys: string[]) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public filter(record: { [key: string]: any }): { [key: string]: unknown } {
    const clonedRecord = _.cloneWith(record)

    Object.keys(clonedRecord).forEach((key) => {
      if (this.isPlainObject(clonedRecord[key])) {
        clonedRecord[key] = this.filter(clonedRecord[key])
        return
      }

      if (this.isJSONString(clonedRecord[key])) {
        clonedRecord[key] = JSON.stringify(
          this.filter(JSON.parse(clonedRecord[key]))
        )
        return
      }

      if (!this.isJSONType(clonedRecord[key])) {
        delete clonedRecord[key]
        return
      }

      if (this.isOnBlacklist(key)) {
        clonedRecord[key] = this.setPlaceholder(clonedRecord[key])
      }
    })

    return clonedRecord
  }

  private setPlaceholder(value: unknown): string {
    if (typeof value !== 'string') {
      return this.placeholder
    }

    if (value.length < 8) {
      return this.placeholder
    }

    return `${value.slice(0, 2)}${this.placeholder}${value.slice(-2)}`
  }

  private isOnBlacklist(key: string): boolean {
    return this.blacklistedKeys.some((blacklistedKey) =>
      key.toLowerCase().includes(blacklistedKey.toLowerCase())
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private isPlainObject(value: any): boolean {
    return value?.constructor === Object || Array.isArray(value)
  }

  private isJSONType(value: unknown): boolean {
    if (value === undefined) {
      return false
    }

    return (
      typeof value !== 'object' ||
      Array.isArray(value) ||
      this.isPlainObject(value) ||
      value instanceof Date
    )
  }

  private isJSONString(value: unknown): boolean {
    if (typeof value !== 'string') {
      return false
    }

    if (!value.startsWith('{') && !value.startsWith('[')) {
      return false
    }

    try {
      JSON.parse(value)
      return true
    } catch (e: unknown) {
      return false
    }
  }
}
