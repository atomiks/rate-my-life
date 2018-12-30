import styled from 'styled-components'

const SubmitButton = styled.button`
  padding: 15px 25px;
  border: 0;
  font-size: 18px;
  font-weight: bold;
  border-radius: 4px;
  border: 2px solid #4a7eff;
  background-color: transparent;
  transition: background-color 0.15s, border-color 0.15s, color 0.15s;
  color: inherit;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${props => (props.disabled ? 0.6 : 1)};
  margin-bottom: 25px;
  margin-top: 25px;
  color: ${props => (props.theme.$type === 'dark' ? '#5f95ff' : '#4a7eff')};
  user-select: none;

  &:hover {
    background-color: #4a7eff;
    color: white;
    border-color: transparent;
  }

  &:active {
    box-shadow: inset 0 1px 8px 2px rgba(0, 16, 32, 0.2);
    border-color: rgba(0, 16, 32, 0.2);
  }
`

export default SubmitButton
