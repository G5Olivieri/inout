import {
  Container,
  TagClose,
} from '@app/products/components/tags-input/tag/styles'

interface TagProps {
  name: string
  index: number
  onClose: (key: number) => void
}

const Tag: React.FC<TagProps> = ({ name, onClose, index }) => (
  <Container>
    <span>{name}</span>
    <TagClose onClick={() => onClose(index)} />
  </Container>
)

export default Tag
