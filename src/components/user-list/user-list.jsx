/*
用户列表的UI组件
*/
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import style from './user-list.css'

class UserList extends Component {
    static propTypes = {
        userList: PropTypes.array.isRequired
    }

    render () {
        return (
            <div className = {style.jobList}>
                <ul>
                {
                    this.props.userList.map((user,index) =>{
                        
                        return (
                            user.type === "Boss"?<li key={"user" + index} className = {style.item} onClick={() => this.props.history.push(`/chat/${user._id}`)}>
                                <a className = {style.wrap}>
                                    <img className={style.chatHead} src= {user.header ? require(`../../assets/images/${user.header}.png`) : null}/>
                                    <div className = {style.text}>
                                        <div className = { style.title}>
                                            <h4>{user.post}</h4>
                                            <span className={style.salary}>{user.salary}</span>
                                            <div className = {style.name}>{user.company}</div>
                                            <div className = {style.msg}>
                                                <em>{user.city}</em>
                                                <em>{user.experience}</em>
                                                <em>{user.education}</em>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </li>:<li key={"user" + index} className = {style.item} onClick={() => this.props.history.push(`/chat/${user._id}`)}>
                                <a className = {style.wrap}>
                                    <div className = {style.mainInfo}>
                                        <div className = {style.info}>
                                            <h3>{user.post}</h3>
                                            <div className = {style.descTop}>
                                                <span className={style.salary}>{user.salary}</span>
                                                <span className={style.jobCategory}>{user.jobCategory}</span>
                                            </div>
                                            <div className = {style.descCenter}>
                                                <span className={style.postion}>{user.city}</span>
                                                <span className={style.experience}>{user.experience}</span>
                                                <span>硕士</span>
                                            </div>
                                        </div>
                                        <div className = {style.right}>
                                            <img src= {user.header ? require(`../../assets/images/${user.header}.png`) : null}/>
                                            <span className = {style.seekName}>{user.username}</span>
                                        </div>
                                    </div>
                                    <div className={style.tagList}>
                                        <span className={style.tag}>完美主义</span>
                                        <span className={style.tag}>完美主义</span>
                                    </div>
                                </a>
                            </li>
                        )

                    })
                }
                </ul>
            </div>
        )
    }
}
export default withRouter(UserList);