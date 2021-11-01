import styled from "@emotion/styled";

const Wrapper = styled.div`
  display: ${({ visible }) => (visible ? "flex" : "none")};

  position: absolute;
  z-index: 10000;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

const Background = styled.div`
  z-index: -1;
  position: absolute;
  height: 100vh;
  width: 100vw;
  display: ${({ visible }) => (visible ? "flex" : "none")};
  background-color: ${({ visible }) =>
    visible ? "rgba(21, 41, 56, 0.7)" : "rgba(21, 41, 56, 0)"};
  position: absolute;
  transition: color 6s;
`;

const Container = styled.div`
  width: 654px;

  display: flex;
  position: relative;
  z-index: 100;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 65px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

export function Modal({ visible = false, children }) {
  return (
    <Wrapper visible={visible}>
      <Background visible={visible} />
      <Container>{children}</Container>
    </Wrapper>
  );
}
