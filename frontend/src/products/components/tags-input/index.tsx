import { Container, Input } from '@app/products/components/tags-input/styles'
import Tags from '@app/products/components/tags-input/tags'
import React from 'react'

interface TagsInputProps {
  onChange: (tags: Array<string>) => void
}

const TagsInput: React.FC<TagsInputProps> = ({ onChange }) => {
  const inputElement = React.useRef<HTMLInputElement>(null)
  const [tags, setTags] = React.useState<Array<string>>([])

  const onClick = () => {
    if (inputElement.current !== null) {
      inputElement.current.focus()
    }
  }

  const onClose = (index: number) => {
    const array = [...tags]
    array.splice(index, 1)
    changeTags(array)
  }

  const changeTags = (newTags: Array<string>): void => {
    setTags(newTags)
    onChange(newTags)
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      const input = event.target as HTMLInputElement
      const newTags = Array.from(
        new Set([
          ...tags,
          ...input.value.split(',').map((tag) => tag.toLowerCase()),
        ])
      )
      changeTags(newTags)
      input.value = ''
    }
  }

  return (
    <Container onClick={onClick}>
      <Tags tags={tags} onClose={onClose} />
      <Input type="text" ref={inputElement} onKeyDown={onKeyDown} />
    </Container>
  )
}

export default TagsInput
