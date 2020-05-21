import React, { Component } from "react";

import { css } from "emotion";
import styled from "@emotion/styled";

// default styles
const TableCell = styled.h5`
  width: 50%;
  margin: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StudentContainer = styled.div`
  display: flex;
  border-bottom: 0.0625rem solid #fff;
  height: 5rem;
`;

export default class Grades extends Component {
  state = {
    students: [],
  };

  componentDidMount() {
    this.setState({
      students: this.props.students,
    });
  }

  render() {
    const table_data = this.state.students.map((student) => {
      // if student grade is < 50, {display: none}
      return student.grade < 50 ? (
        <div
          className={css`
            display: none;
          `}
          key={student.id}
        ></div>
      ) : // if student grade is < 65, {color: red}
      student.grade < 65 ? (
        <StudentContainer key={student.id}>
          <TableCell>
            {student.last_name}, {student.first_name}
          </TableCell>
          <TableCell
            className={css`
              color: red;
              border-left: 0.0625rem solid #fff;
            `}
          >
            {student.grade}
          </TableCell>
        </StudentContainer>
      ) : // if student grade is >= 85, {color: green}
      student.grade >= 85 ? (
        <StudentContainer key={student.id}>
          <TableCell>
            {student.last_name}, {student.first_name}
          </TableCell>
          <TableCell
            className={css`
              color: green;
              border-left: 0.0625rem solid #fff;
            `}
          >
            {student.grade}
          </TableCell>
        </StudentContainer>
      ) : (
        // if student grade is between 65 and 85, use default styling
        <StudentContainer key={student.id}>
          <TableCell>
            {student.last_name}, {student.first_name}
          </TableCell>
          <TableCell
            className={css`
              border-left: 0.0625rem solid #fff;
            `}
          >
            {student.grade}
          </TableCell>
        </StudentContainer>
      );
    });

    return this.state.students.length === 0 ? (
      <h1>loading...</h1>
    ) : (
      <main>{table_data}</main>
    );
  }
}
