import styled from "@emotion/styled";
import {
  Icon1,
  Icon2,
  Icon3,
  Icon4,
  Icon5,
  Icon6,
  Icon7,
  Icon8,
} from "./icons";

const Icons = [Icon1, Icon2, Icon3, Icon4, Icon5, Icon6, Icon7, Icon8];

export const Button = styled.button`
  padding: 0 24px;
  height: ${({ primary, variant }) => (primary && !variant ? "72px" : "52px")};
  border: none;
  outline: none;
  font-size: 26px;
  font-family: "Atkinson Hyperlegible", sans-serif;
  font-weight: bold;
  transition: background-color 0.5s, color 0.2s;
  cursor: pointer;

  // Determine button background color.
  background-color: ${({ theme, primary, secondary, active }) => {
    if (primary) return theme.colors.primary;
    if (secondary) return theme.colors.secondaryIdle;
    return active ? theme.colors.active : theme.colors.idle;
  }};

  &:hover {
    background-color: ${({ active, theme, primary, secondary }) => {
      if (primary && !active) return theme.colors.primaryHover;
      if (secondary && !active) return theme.colors.secondaryHover;
      if (!active) return theme.colors.hover;
    }};

    ${({ theme, secondary }) => secondary && { color: theme.colors.black }}
  }

  // Determine text color.
  color: ${({ theme, secondary, primary, variant, state = "" }) => {
    if (secondary && state.toLowerCase() === "idle") {
      return theme.colors.black;
    }
    return variant && !primary ? theme.colors.black : theme.colors.white;
  }};

  max-width: 100%;

  ${({ width }) => width && { width }}

  // Determine if flex-grow should be set.
  ${({ fullwidth }) => fullwidth && { flexGrow: 1 }}

  min-width: 119px;
  border-radius: 35px;
`;

export const BaseRoundButton = styled.button`
  height: ${({ grid }) => (grid ? "82px" : "118px")};
  width: ${({ grid }) => (grid ? "82px" : "118px")};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 59px;
  outline: none;
  border: none;
  font-size: 44px;
  font-family: "Atkinson Hyperlegible", sans-serif;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.5s, color 0.2s;

  background-color: ${({ active, matched, theme }) => {
    if (active) return theme.colors.primary;
    if (matched) return theme.colors.idle;
    return theme.colors.black;
  }};

  color: ${({ active, matched, theme }) => {
    if (active || matched) return "rgba(252, 252, 252, 1)";
    return "rgba(252, 252, 252, 0)";
  }};

  svg {
    fill: ${({ active, matched }) => {
      if (active || matched) return "rgba(252, 252, 252, 1)";
      return "rgba(252, 252, 252, 0)";
    }};

    transition: fill 0.2s;
  }

  &:hover {
    background-color: ${({ active, matched, theme }) => {
      if (!active && !matched) return theme.colors.hover;
    }};
  }
`;

export function RoundButton({
  children,
  matched,
  active,
  idx,
  icon,
  onClick = () => {},
  ...rest
}) {
  return (
    <BaseRoundButton
      matched={matched}
      onClick={onClick}
      active={active}
      {...rest}
    >
      {icon
        ? Icons.filter((icon) => icon.name.includes(children)).map(
            (Icon, idx) => <Icon key={idx} />
          ) || children
        : children}
    </BaseRoundButton>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
  width: ${({ width }) => (width ? width : "100%")};
  justify-content: ${({ just }) => (just ? just : "space-between")};
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TextLabel = styled.p`
  color: ${({ theme }) => theme.colors.label};
  margin-bottom: 16px;
  font-size: 20px;
`;

export function ButtonContainer({ children, text }) {
  return (
    <Wrapper>
      {text && <TextLabel>{text}</TextLabel>}
      <Container>{children}</Container>
    </Wrapper>
  );
}
