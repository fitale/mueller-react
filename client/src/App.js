import React, { Component } from "react";
import axios from "axios";
import { css } from "emotion";
import styled from "@emotion/styled";

import Grades from "./components/Grades";

// default styles
const Header = styled.header`
  height: 6.25rem;
  display: flex;
  justify-content: space-evenly;
  border-bottom: 0.0625rem solid #fff;
`;

const HeaderColumn = styled.h3`
  height: 100%;
  width: 50%;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const Body = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #282c34;
  width: 100%;
  font-size: calc(0.625rem + 2vmin);
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;
export default class App extends Component {
  state = {
    sorted_all_students: [],
  };

  // inital call to sort and assign state
  componentDidMount() {
    axios.get("/grades").then((response) => {
      const sorted_last_names = response.data.sort(
        (a, b) =>
          (a.last_name.toLowerCase() > b.last_name.toLowerCase()) -
          (a.last_name.toLowerCase() < b.last_name.toLowerCase())
      );
      this.setState({
        sorted_all_students: sorted_last_names,
      });
    });
  }

  render() {
    // render html
    return this.state.sorted_all_students.length === 0 ? (
      <h1>loading...</h1>
    ) : (
      <Body>
        <Header>
          <HeaderColumn
            className={css`
              border-right: 0.0625rem solid white;
            `}
          >
            NAME
          </HeaderColumn>
          <HeaderColumn>GRADE</HeaderColumn>
        </Header>
        {/* passing props to Grades component */}
        <Grades students={this.state.sorted_all_students} />
      </Body>
    );
  }
}
