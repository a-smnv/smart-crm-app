import styled from 'styled-components'


export const AnalyticsCard = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  margin-bottom: 25px;
`

export const AnalyticsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 18px;
  flex-wrap: wrap;
  gap: 8px;
`

export const AnalyticsTitle = styled.h2`
  margin: 0;
  font-size: 17px;
  color: #1e293b;
`

export const AnalyticsTotal = styled.span`
  font-size: 13px;
  color: #64748b;
`

export const AnalyticsTotalValue = styled.strong`
  color: #1e293b;
`

export const WidgetGrid = styled.div`
  display: grid;
  gap: 15px;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
`

export const WidgetCard = styled.div<{ $accent: string }>`
  padding: 16px;
  border-radius: 10px;
  background-color: #f8fafc;
  border-top: 3px solid ${({ $accent }) => $accent};
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const WidgetLabel = styled.span`
  font-size: 13px;
  color: #475569;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.4px;
`

export const WidgetValue = styled.span<{ $accent: string }>`
  font-size: 28px;
  font-weight: bold;
  color: ${({ $accent }) => $accent};
  line-height: 1;
`

export const WidgetMeta = styled.span`
  font-size: 13px;
  color: #94a3b8;
  font-weight: normal;
  margin-left: 6px;
`

export const WidgetTrack = styled.div`
  height: 6px;
  background-color: #e2e8f0;
  border-radius: 3px;
  overflow: hidden;
`

export const WidgetFill = styled.div<{ $share: number; $accent: string }>`
  width: ${({ $share }) => $share}%;
  height: 100%;
  background-color: ${({ $accent }) => $accent};
  border-radius: 3px;
  transition: width 0.3s ease;`