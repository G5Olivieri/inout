import Tag from '@app/products/components/tags-input/tag'
import { TagsContainer } from '@app/products/components/tags-input/tags/styles'

interface TagsProps {
  tags: Array<string>
  onClose: (key: number) => void
}

const Tags: React.FC<TagsProps> = ({ tags, onClose }) => (
  <TagsContainer>
    {tags.map((tag, i) => (
      <Tag key={i} index={i} name={tag} onClose={onClose} />
    ))}
  </TagsContainer>
)

export default Tags
