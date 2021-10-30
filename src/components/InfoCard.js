import styled from "@emotion/styled";
import { Arrow } from "./Arrow";

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: ${({ width }) => (width ? width : "255px")};
  flex-grow: ${({ fullwidth }) => (fullwidth ? 1 : 0)};
`;

const Note = styled.p`
  margin-top: 32px;
  font-size: 13px;
  letter-spacing: 5px;
  text-transform: uppercase;
  text-align: center;
  transition: opacity 0.2s;
  opacity: ${({ active }) => (active ? 1 : 0)};
`;

const InfoContainer = styled.div`
  transition: background-color 0.5s;
  background-color: ${({ active, theme }) =>
    active ? theme.colors.primary : theme.colors.idle};

  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 25px;
  border-radius: 10px;
`;

const Label = styled.p`
  transition: color 0.2s;
  font-size: 18px;
  margin-right: auto;
  color: ${({ active, theme }) =>
    active ? theme.colors.white : theme.colors.hover};
`;
const Body = styled.div`
  transition: color 0.2s;
  font-size: 32px;
  color: ${({ active, theme }) =>
    active ? theme.colors.white : theme.colors.black};
`;

export function InfoCard({ text = "", fullwidth, active, children, ...rest }) {
  return (
    <InfoWrapper fullwidth={fullwidth} {...rest}>
      <Arrow
        active={active}
        style={{
          marginBottom: "-1px",
          marginRight: "auto",
          marginLeft: "auto",
        }}
      />
      <InfoContainer active={active}>
        <Label active={active}>{text}</Label>
        <Body active={active}>{children}</Body>
      </InfoContainer>
      <Note active={active}>Current Turn</Note>
    </InfoWrapper>
  );
}
