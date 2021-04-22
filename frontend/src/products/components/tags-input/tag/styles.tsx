import styled from 'styled-components'

export const Container = styled.div`
  display: inline;
  margin-left: 2px;
  margin-right: 2px;
  border: 1px solid black;
  padding: 2px;
`

export const TagClose = styled.span`
  &::after {
    content: '✕';
    height: 24px;
    width: 24px;
  }
`
