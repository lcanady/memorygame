import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Button, ButtonContainer } from "../components/Buttons";
import { setClock, setScore } from "../data/GameSlice";
import {
  setPlayers,
  toggleGrid,
  toggleStarted,
  toggleTheme,
} from "../data/settingsSlice";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.black};
  align-items: center;
  justify-content: center;

  h1 {
    margin-bottom: 32px;
    color: ${({ theme }) => theme.colors.white};
  }
`;

const Container = styled.div`
  width: 656px;
  height: 559px;
  padding: 56px;
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.white};
`;

const Home = styled.p`
  font-size: 24px;
  margin-top: 32px;
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.secondary};
`;

function MenuScreen() {
  const theme = useSelector((state) => state.settings.theme);
  const grid = useSelector((state) => state.settings.grid);
  const players = useSelector((state) => state.settings.players);
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <Wrapper>
      <h1>memory</h1>
      <Container>
        <ButtonContainer text="Select Theme">
          <Button
            width="256px"
            active={!theme}
            onClick={() => dispatch(toggleTheme(false))}
          >
            Numbers
          </Button>
          <Button
            width="256px"
            active={theme}
            onClick={() => dispatch(toggleTheme(true))}
          >
            Icons
          </Button>
        </ButtonContainer>
        <ButtonContainer text="Number of Players">
          <Button
            active={players === 1}
            onClick={() => dispatch(setPlayers(1))}
          >
            1
          </Button>
        </ButtonContainer>
        <ButtonContainer text="Grid Size">
          <Button
            width="256px"
            active={!grid}
            onClick={() => dispatch(toggleGrid())}
          >
            4x4
          </Button>
          <Button
            width="256px"
            active={grid}
            onClick={() => dispatch(toggleGrid())}
          >
            6x6
          </Button>
        </ButtonContainer>
        <Button
          primary
          width="100%"
          onClick={() => {
            dispatch(toggleStarted());
            dispatch(setClock(0));
            dispatch(setScore(0));
            history.push("/game");
          }}
        >
          Start Game
        </Button>
      </Container>
      <Home onClick={() => (window.location.href = "https://digibear.io/")}>
        Home
      </Home>
      <Home
        onClick={() =>
          (window.location.href = "https://github.com/lcanady/memorygame")
        }
      >
        Github
      </Home>
    </Wrapper>
  );
}

export default MenuScreen;
