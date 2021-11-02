import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Button, RoundButton } from "../components/Buttons";
import { InfoCard } from "../components/InfoCard";
import { Modal } from "../components/Modal";
import {
  setClock,
  setGameMap,
  setPauseClock,
  setScore,
  toggleMax,
} from "../data/GameSlice";
import logo from "../assets/digibear.png";
import github from "../assets/github.png";

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
  padding-bottom: 65px;

  h1 {
    color: ${({ theme }) => theme.colors.black};
  }
`;

const GameContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${({ grid }) => (grid ? "572px" : "532px")};
  height: ${({ size }) => (size ? "572px" : "532px")};
  margin: auto;
  flex-wrap: wrap;
`;

const Nav = styled.div`
  display: flex;
  width: 100%;
`;
const Title = styled.h1`
  ${({ grow }) => grow && { marginRight: "auto" }}
`;
const TopButtons = styled.div`
  display: flex;

  Button {
    margin-left: 24px;
  }
  img {
    cursor: pointer;
    margin-left: 24px;
  }
`;

const ScoreContainer = styled.div`
  display: flex;
  width: ${({ size }) => (size ? size : "532px")};
  height: 140px;

  align-items: center;
  justify-content: space-between;
`;

export default function Game() {
  const grid = useSelector((state) => state.settings.grid);
  const gameMap = useSelector((state) => state.game.gameMap);
  const useIcons = useSelector((state) => state.settings.theme);
  const score = useSelector((state) => state.game.score);
  const max = useSelector((state) => state.game.max);
  const clock = useSelector((state) => state.game.clock);
  const pauseClock = useSelector((state) => state.game.pauseClock);
  const dispatch = useDispatch();
  const history = useHistory();
  const [timer, setTimer] = useState();
  const [active, setActive] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [matches, setMatches] = useState(0);

  const theme = useTheme();

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

  const PopulateGrid = useCallback(() => {
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

  // Build our starting game grid.
  useEffect(() => {
    PopulateGrid();
  }, [PopulateGrid]);

  useEffect(() => {
    if (active.length === 2) {
      dispatch(toggleMax(true));
      dispatch(setScore(score + 1));

      const val1 = gameMap.find((_item, idx) => idx === active[0]);
      const val2 = gameMap.find((_item, idx) => idx === active[1]);

      // No match
      if (val1.value !== val2.value) {
        setTimeout(() => {
          dispatch(toggleMax(false));
          dispatch(
            setGameMap(
              gameMap.map((token, idx) =>
                active.includes(idx)
                  ? { ...token, ...{ active: false } }
                  : token
              )
            )
          );
        }, 1000);
        return setActive([]);
      }

      // match!!
      if (val1.value === val2.value) {
        setMatches(matches + 1);
        setTimeout(() => {
          dispatch(toggleMax(false));
          dispatch(
            setGameMap(
              gameMap.map((token, idx) =>
                active.includes(idx)
                  ? { ...token, ...{ active: false, matched: true } }
                  : token
              )
            )
          );
        }, 1000);
        return setActive([]);
      }
    }
  }, [active, dispatch, gameMap, grid, matches, score]);

  useEffect(() => {
    const rows = grid ? 6 : 4;
    if (matches === (rows * rows) / 2) {
      dispatch(setPauseClock(true));
      setModalVisible(true);
    }
  }, [setModalVisible, dispatch, grid, matches]);

  useEffect(() => {
    if (!pauseClock) {
      const timer = setTimeout(() => dispatch(setClock(clock + 1)), 1000);
      setTimer(timer);
      return () => clearTimeout(timer);
    }
  }, [clock, dispatch, pauseClock]);

  return (
    <Wrapper>
      <Modal visible={modalVisible} onClickBG={() => setModalVisible(false)}>
        <Title>You Did It!!</Title>
        <p
          style={{
            marginTop: " 32px",
            marginBottom: "16px",
            color: theme.colors.hover,
          }}
        >
          Game over! Here's how well you did...
        </p>
        <InfoCard text="Time Elapsed" width="100%" narrow>
          {new Date(clock * 1000).toISOString().substr(14, 5)}
        </InfoCard>
        <InfoCard text="Total Moves" width="100%" narrow>
          {score}
        </InfoCard>
        <div
          style={{
            paddingTop: "32px",
            justifyContent: "space-between",
            display: "flex",
            width: " 100%",
          }}
        >
          <Button
            width="45%"
            primary
            variant
            onClick={() => {
              setActive([]);
              dispatch(setClock(false));
              dispatch(setClock(0));
              clearTimeout(timer);
              dispatch(setPauseClock(false));
              dispatch(setScore(0));
              setMatches(0);
              PopulateGrid();
              setModalVisible(false);
            }}
          >
            Restart
          </Button>
          <Button
            width="45%"
            secondary
            variant
            onClick={() => {
              dispatch(setPauseClock(true));
              setMatches(0);
              setModalVisible(false);
              history.push("/");
            }}
          >
            Setup New Game
          </Button>
        </div>
      </Modal>
      <Container>
        <Nav>
          <Title grow>memory</Title>
          <TopButtons>
            <Button
              primary
              variant
              onClick={() => {
                setActive([]);
                dispatch(setClock(false));
                dispatch(setClock(0));
                setMatches(0);
                clearTimeout(timer);
                dispatch(setPauseClock(false));
                dispatch(setScore(0));
                PopulateGrid();
              }}
            >
              restart
            </Button>
            <Button
              variant
              onClick={() => {
                dispatch(setClock(0));
                dispatch(setPauseClock(true));
                setMatches(0);
                dispatch(setScore(0));
                setTimeout(() => history.push("/"), 400);
              }}
            >
              New Game
            </Button>
            <img
              src={github}
              alt="github"
              onClick={() =>
                (window.location.href = "https://github.com/lcanady/memorygame")
              }
            />
            <img
              src={logo}
              alt="logo"
              onClick={() => (window.location.href = "https://digibear.io")}
            />
          </TopButtons>
        </Nav>
        <GameContainer grid={grid}>
          {gameMap &&
            gameMap.length > 0 &&
            gameMap.map((item, idx) => {
              return (
                <RoundButton
                  key={idx}
                  grid={grid}
                  active={item.active}
                  matched={item.matched}
                  onClick={() => {
                    dispatch(setPauseClock(false));
                    dispatch(
                      setGameMap(
                        gameMap.map((token, i) => {
                          if (i === idx && !max) {
                            setActive([...new Set([...active, idx])]);
                            return { ...token, ...{ active: true } };
                          } else {
                            return token;
                          }
                        })
                      )
                    );
                  }}
                  icon={useIcons}
                >
                  {item.value}
                </RoundButton>
              );
            })}
        </GameContainer>
        <ScoreContainer>
          <InfoCard text="Time">
            {new Date(clock * 1000).toISOString().substr(14, 5)}
          </InfoCard>
          <InfoCard text="moves">{score}</InfoCard>
        </ScoreContainer>
      </Container>
    </Wrapper>
  );
}
