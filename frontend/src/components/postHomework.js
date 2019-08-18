import React, {Component} from "react";
import Modal from "react-modal";
import { postHomework } from "../api"
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

class PostHomeworkModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            name: "",
            subject: "",
            details: "",
            school_id: 1,
            class: 1
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        console.log(this.props.user)
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal() {

    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    doChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }

    postHomework() {
        this.props.user
            .getIdToken()
            .then(token => {
                return postHomework(
                    token,
                    this.state.name,
                    this.state.subject,
                    this.state.details,
                    this.state.school_id,
                    this.state.class)
            })
            .then(resp => {
                console.log(resp)
            })
            .catch(error => {
                this.setState({
                    errorMessage: error.toString()
                })
            })
    }

    render() {
        return (
            <div>
                <button onClick={this.openModal} class="left_btn">宿題情報追加</button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <div class="cp_form">
                    <h2 ref={subtitle => this.subtitle = subtitle}>宿題情報追加</h2>
                    <div>新しい宿題の情報を追加してください</div>
                    <div class="cp_group">
                        <input
                            type="text"
                            required="required"
                            value={this.state.name}
                            onChange={e => this.setState({ name: e.target.value })}
                        />
                        <label class="cp_label" for="input">宿題名</label>
                        <i class="bar"></i>
                        </div>
                        <div class="cp_group">
                            <textarea
                                required="required"
                                onChange={e => this.setState({ details: e.target.value })}
                            ></textarea>
                            <label class="cp_label" for="textarea">内容</label>
                            <i class="bar"></i>
                        </div>
                        <div class="cp_group cp_ipselect">
                            <select
                                class="cp_sl"
                                required
                                onChange={e => this.setState({ subject: e.target.value })}>
                                <option value="" hidden disabled selected></option>
                                <option value="国語">国語</option>
                                <option value="数学">数学</option>
                                <option value="英語">英語</option>
                                <option value="理科">理科</option>
                                <option value="社会">社会</option>
                            </select>
                            <label class="cp_sl_selectlabel">教科</label>
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
                                onChange={e => this.setState({ class: parseInt(e.target.value, 10) })}>
                                <option value="" hidden disabled selected></option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                            <label class="cp_sl_selectlabel">学年</label>
                            <i class="bar"></i>
                        </div>
                        <button class="center-btn" type="button" onClick={this.postHomework.bind(this)}>提出</button>
                        </div>
                </Modal>
            </div>

        );
    }
}

export default PostHomeworkModal
