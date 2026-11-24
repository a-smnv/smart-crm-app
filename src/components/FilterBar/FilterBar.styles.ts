import styled from 'styled-components'


export const FilterBarStyle = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 25px;
  flex-wrap: wrap;
`

export const FilterButton = styled.button<{ $active: boolean; $activeColor: string }>`
  padding: 8px 16px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s;
  background-color: ${({ $active, $activeColor }) => ($active ? $activeColor : '#e2e8f0')};
  color: ${({ $active }) => ($active ? '#fff' : '#334155')};`