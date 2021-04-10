import { Container } from 'inversify'
import { productsModule } from '@app/products/module'

const diContainer = new Container()
diContainer.load(productsModule)

export { diContainer }
