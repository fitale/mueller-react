import React, { Component } from "react";
import axios from "axios";
import { css, cx } from "emotion";
import styled from "@emotion/styled";

// default styles
const Name = styled.h5`
  width: 50%;
  margin: 0;
  height: 100%;
  border-right: 0.0625rem solid #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Grade = styled.h5`
  width: 50%;
  margin: 0;
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DisplayedStudentContainer = styled.div`
  display: flex;
  border-bottom: 0.0625rem solid #fff;
  height: 5rem;
`;

const HiddenStudentContainer = styled.div`
  display: none;
`;

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

const Body = styled.body`
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
    all_students: [],
  };

  // inital call to assign state
  componentDidMount() {
    axios
      .get("/grades")
      .then((response) => this.setState({ all_students: response.data }));
  }

  render() {
    // sort students by last name
    const sorted_last_names = this.state.all_students.sort((a, b) =>
      a.last_name.localeCompare(b.last_name)
    );

    // map through student grades
    const table_data = sorted_last_names.map((student) => {
      // if student grade is < 50, {display: none}
      return student.grade < 50 ? (
        <HiddenStudentContainer key={student.id}></HiddenStudentContainer>
      ) : // if student grade is < 65, {color: red}
      student.grade < 65 ? (
        <DisplayedStudentContainer key={student.id}>
          <Name>
            {student.last_name}, {student.first_name}
          </Name>
          <Grade
            className={css`
              color: red;
            `}
          >
            {student.grade}
          </Grade>
        </DisplayedStudentContainer>
      ) : // if student grade is >= 85, {color: green}
      student.grade >= 85 ? (
        <DisplayedStudentContainer key={student.id}>
          <Name>
            {student.last_name}, {student.first_name}
          </Name>
          <Grade
            className={css`
              color: green;
            `}
          >
            {student.grade}
          </Grade>
        </DisplayedStudentContainer>
      ) : (
        // if student grade is between 65 and 85, use default styling
        <DisplayedStudentContainer key={student.id}>
          <Name>
            {student.last_name}, {student.first_name}
          </Name>
          <Grade>{student.grade}</Grade>
        </DisplayedStudentContainer>
      );
    });
    // render html
    return this.state.all_students.length === 0 ? (
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
        <main>{table_data}</main>
      </Body>
    );
  }
}
