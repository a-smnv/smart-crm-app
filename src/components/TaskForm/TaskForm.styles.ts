import styled from 'styled-components';

export const TaskFormContainer = styled.form`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  display: grid;
  gap: 15px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  align-items: start;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #cbd5e1;
  box-sizing: border-box;
`;

export const StyledSelect = styled.select`
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #cbd5e1;
  box-sizing: border-box;
  background-color: #fff;
`;

export const ErrorText = styled.span`
  color: #ef4444;
  font-size: 12px;
`;

export const SubmitButton = styled.button`
  padding: 9px 16px;
  background-color: #10b981;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
`;