import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Button, RoundButton } from "../components/Buttons";
import { setGameMap, toggleMax } from "../data/settingsSlice";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  flex-direction: column;
  align-items: center;
  display: flex;
  height: 100vh;
  width: 100vw;
  max-width: 1110px;
  padding-top: 65px;

  h1 {
    color: ${({ theme }) => theme.colors.black};
  }
`;

const GameContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: ${({ size }) => (size ? size : "532px")};
  height: ${({ size }) => (size ? size : "532px")};
  margin: auto;
  flex-wrap: wrap;
`;

const Nav = styled.div`
  display: flex;
  width: 100%;
`;
const Title = styled.h1`
  margin-right: auto;
`;
const TopButtons = styled.div`
  Button {
    margin-left: 24px;
  }
`;

export default function Game() {
  const grid = useSelector((state) => state.settings.grid);
  const gameMap = useSelector((state) => state.settings.gameMap);
  const dispatch = useDispatch();
  const history = useHistory();
  const [active, setActive] = useState([]);

  /**
   * Shuffle a 2D array.
   * @param {Array} array
   * @returns
   */
  function shuffle(array) {
    for (let k = 0; k < array.length; k++) {
      let i = array[k].length;
      if (i === 0) return undefined;
      else {
        while (--i) {
          let j = Math.floor(Math.random() * (i + 1));
          let tempi = array[k][i];
          let tempj = array[k][j];
          array[k][i] = tempj;
          array[k][j] = tempi;
        }
      }
    }
    return array;
  }

  // Build our starting game grid.
  useEffect(() => {
    let count = 0;
    const rows = grid ? 6 : 4;
    let tempGameMap = [];

    for (let i = 0; i < rows; i++) {
      tempGameMap.push([]);
      for (let j = 0; j < rows; j++) {
        tempGameMap[i][j] = ++count;
        count = count < (rows * rows) / 2 ? count : 0;
      }
    }

    // Map through and convert the value to an object with the game
    // values we need.

    dispatch(
      setGameMap(
        shuffle(tempGameMap)
          .flat(1)
          .map((num) => ({
            matched: false,
            active: false,
            value: num,
          }))
      )
    );
  }, [grid, dispatch]);

  useEffect(() => {
    if (active && active.length >= 2) {
      dispatch(toggleMax());
      setTimeout(() => {
        // No match!
        if (active[0].value !== active[1].value) {
          active.forEach((button) => button.act(false));
          setActive([]);
          dispatch(toggleMax());
        }

        // Match!
        if (active[0].value === active[1].value) {
          active.forEach((button) => {
            button.mat(true);
            button.act(false);
          });
          setActive([]);
          dispatch(toggleMax());
        }
      }, 1000);
    }
  }, [active, dispatch]);

  return (
    <Wrapper>
      <Container>
        <Nav>
          <Title>memory</Title>
          <TopButtons>
            <Button primary variant>
              restart
            </Button>
            <Button variant onClick={() => history.push("/")}>
              New Game
            </Button>
          </TopButtons>
        </Nav>
        <GameContainer>
          {gameMap &&
            gameMap.length &&
            gameMap.map((item, idx) => {
              return (
                <RoundButton
                  key={idx}
                  active={item.active}
                  onClick={(act, mat) => {
                    setActive([
                      ...active,
                      { idx, act, mat, value: item.value },
                    ]);
                  }}
                >
                  {item.value}
                </RoundButton>
              );
            })}
        </GameContainer>
      </Container>
    </Wrapper>
  );
}
