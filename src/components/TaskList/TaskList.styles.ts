import styled from "styled-components";

export const TaskGrid = styled.div`
  display: grid;
  gap: 15px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;

export const TaskCard = styled.div<{ $inProgress: boolean }>`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border-left: 5px solid
    ${({ $inProgress }) => ($inProgress ? "#3b82f6" : "#e2e8f0")};
`;

export const TaskTitle = styled.h3`
  margin: 0 0 10px 0;
  color: #0f172a;
`;

export const TaskDescription = styled.p`
  color: #64748b;
  font-size: 14px;
  margin: 0 0 15px 0;
`;
export const TaskCreatedDate = styled.div`
  color: #64748b;
  font-size: 14px;
  padding: 2px 10px;
  text-align: right;
  margin-bottom: 5px;
`;
export const TaskTags = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 15px;
  flex-wrap: wrap;
`;

export const TaskTag = styled.span`
  font-size: 11px;
  background-color: #eff6ff;
  color: #1e40af;
  padding: 2px 10px;
  border-radius: 4px;
`;

export const TaskFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
`;

export const TaskAssignee = styled.span`
  background-color: #e2e8f0;
  padding: 4px 8px;
  border-radius: 4px;
  color: #334155;
  font-weight: bold;
`;

export const TaskPoints = styled.span`
  color: #94a3b8;
`;

export const EmptyState = styled.div`
  text-align: center;
  color: #64748b;
  margin-top: 40px;
  font-size: 18px;
`;
