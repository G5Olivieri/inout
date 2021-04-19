export abstract class Mapper<From, To> {
  abstract map(from: From): To
}
