import React, { Component } from "react";
import Modal from "react-modal";
import { postStudent } from "../api"
import styles from "../../css/form.css"

const customStyles = {
    overlay: {
        zIndex: "100",
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    },
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        padding: "100",
        transform: "translate(-50%, -50%)"
    }
};

class PostStudentModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            name: "",
            grade: 1,
            school_id: 1
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal() {

    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    postStudent() {
        this.props.user
            .getIdToken()
            .then(token => {
                return postStudent(
                    token,
                    this.state.name,
                    this.state.grade,
                    this.state.school_id
                    )
            })
            .then(resp => {
                console.log(resp)
            })
            .catch(error => {
                console.log(error.toString())
            })
    }

    render() {
        return (
            <div>
                <button onClick={this.openModal} class="left_btn">生徒情報追加</button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                <div class="cp_form">
                    <h1 ref={subtitle => this.subtitle = subtitle}>生徒情報追加</h1>
                    <div>新しい生徒の情報を追加してください</div>
                        <div class="cp_group">
                            <input
                                type="text"
                                required="required"
                                onChange={e => this.setState({ name: e.target.value })}
                                />
                            <label class="cp_label" for="input">学生名</label>
                            <i class="bar"></i>
                        </div>
                        <div class="cp_group cp_ipselect">
                            <select
                                class="cp_sl"
                                required
                                onChange={e => this.setState({ school_id: parseInt(e.target.value, 10) })}>
                                <option value="" hidden disabled selected></option>
                                <option value="1">鹿浜菜の花中学校</option>
                                <option value="2">加賀中学校</option>
                                <option value="3">赤土小学校</option>
                            </select>
                            <label class="cp_sl_selectlabel">学校名</label>
                            <i class="bar"></i>
                        </div>
                        <div class="cp_group cp_ipselect">
                            <select
                                class="cp_sl"
                                required
                                onChange={e => this.setState({ grade: parseInt(e.target.value, 10) })}>
                                <option value="" hidden disabled selected></option>
                                <option value="1">1年生</option>
                                <option value="2">2年生</option>
                                <option value="3">3年生</option>
                                <option value="4">4年生</option>
                                <option value="5">5年生</option>
                                <option value="6">6年生</option>
                            </select>
                            <label class="cp_sl_selectlabel">学年</label>
                            <i class="bar"></i>
                                <button class="center-btn" type="button" onClick={this.postStudent.bind(this)}>提出</button>
                        </div>
                    </div>
                </Modal>
            </div>

        );
    }
}

export default PostStudentModal