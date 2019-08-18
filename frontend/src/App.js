// import { h, Component } from "preact";
import firebase from "./firebase";
import { getPrivateMessage, getHomework, getStudent } from "./api";
import styles from "../css/app.css";
import PostHomeworkModal from "./components/postHomework";
import PostStudentModal from "./components/postStudent";

import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      message: "",
      errorMessage: "",
      homeworks: [],
      students: [],
      displayStatus: "Homework",
      result: []
    }
    this.displayData = this.displayData.bind(this)
    
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
        this.getStudent()
        this.getHomework()
      } else {
        this.setState({
          user: null
        });
      }
      this.setState({
        result : this.displayData()
      })
    })
  }

  getHomework() {
      this.state.user
      .getIdToken()
      .then(token => {
          return getHomework(token)
      })
        .then(resp => {
          let arr = []
          for (let i = 0; i < resp.length; i++) {
            arr.push(resp[i])
          }
          this.setState({
            homeworks: arr
          })
      })
      .catch(error => {
          this.setState({
              errorMessage: error.toString()
          })
      })
  }

  getStudent() {
    this.state.user
      .getIdToken()
      .then(token => {
        return getStudent(token)
      })
      .then(resp => {
        let arr = []
        for (let i = 0; i < resp.length; i++) {
          arr.push(resp[i])
        }
        this.setState({
          students: arr
        })
      })
      .catch(error => {
        this.setState({
          errorMessage: error.toString()
        })
      })
  }

  makeTable(data, target_students) {
    return (
      <table>
        <tr>
          <th>{data.NAME}</th>
          <th>{data.Details}</th>
          <td>{Object.values(target_students).join("・")}</td>
        </tr>
      </table>
    )
  }

  displayData() {
    let result = []
    if (this.state.displayData === null) {
      return [<div>データがありません</div>]
    }
    if (this.state.displayStatus === "Homework") {
      for (let i = 0; i < this.state.homeworks.length; i++) {
        let target_students = []
        for (let j = 0; j < this.state.students.length; j++) {
          if (this.state.students[j].School_id === this.state.homeworks[i].School_id) {
            target_students.push(this.state.students[j].Name)
          }
        }
        result.push(
          this.makeTable(
            this.state.homeworks[i],
            target_students
          )
        )
      }
    } else {
        return (
          <div></div>
        )
    }
    return result
    }

  getPrivateMessage() {
    this.state.user
        .getIdToken()
        .then(token => {
          return getPrivateMessage(token)
        })
        .then(resp => {
          this.setState({
            message: resp.message
          });
        })
        .catch(error => {
          this.setState({
            errorMessage: error.toString()
          })
        })
}
  
  render() {
    if (this.state.user === null) {
      return <button onClick={firebase.login} class="right-btm">ログイン</button>;
    }
    return (
      <div>
        <PostHomeworkModal
          user={this.state.user} />
        <PostStudentModal
          user={this.state.user} />
        <button onClick={firebase.logout} class="right-btn">ログアウト</button>
        {this.displayData()}
          <p>{this.state.message}</p>
          <p>{this.state.errorMessage}</p>
        </div>
    );
  }
}

export default App;


