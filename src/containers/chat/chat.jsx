/*
对话聊天的路由组件
 */
import React, {Component} from 'react';
import {NavBar, List, InputItem, Grid, Icon, Button} from 'antd-mobile';
import {connect} from 'react-redux';
import {sendMsg, readMsg} from '../../redux/actions';
import style from './chat.css'
class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: '', //消息内容
            isShow: false, //默认关闭表情列表
            emailMsg:props.user.email,
            phoneMsg:props.user.phone,
            infoMsg:props.user.info,
        }
    }
    // 在第一次render()之前回调
    componentWillMount () {
        // 初始化表情列表数据
        const emojis = [
            '😊', '😉', '😶', '😫', '😔', '😳', 
            '😊', '😉', '😶', '😫', '😔', '😳', 
            '😊', '😉', '😶', '😫', '😔', '😳', 
            '😊', '😉', '😶', '😫', '😔', '😳',
            '😊', '😉', '😶', '😫', '😔', '😳',
            '😊', '😉', '😶', '😫', '😔', '😳',
            '😊', '😉', '😶', '😫', '😔', '😳',
            '😊', '😉', '😶', '😫', '😔', '😳',
        ];
        this.emojis = emojis.map(emoji => ({text: emoji}));
    }
    //保持消息列表最后一条消息在视线内
    componentDidMount() {
        // 初始显示列表
        window.scrollTo(0, document.body.scrollHeight)
    }
    
    componentDidUpdate () {
        // 更新显示列表
        window.scrollTo(0, document.body.scrollHeight)
    }
    componentWillUnmount () { // 在退出之前
        // 发请求更新消息的未读状态
        const from = this.props.match.params.userid
        const to = this.props.user._id
        this.props.readMsg(from, to)
    }
    toggleShow = () => {
        const isShow = !this.state.isShow;
        this.setState({isShow});
        if(isShow){
            // 异步手动派发resize事件,解决表情列表显示的bug
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'))
            }, 0)
        }
    }
    handleSend = () => {
        const from = this.props.user._id; //获取发送方
        const to = this.props.match.params.userid; //获取接收方
        const content = this.state.content.trim();
        // 发送请求(发消息)
        if(content) {
            this.props.sendMsg({from, to, content});
        }
        //消息发送后清除输入框
        this.setState({
            content: '',
            isShow: false
        })
    }

    sendSelfMsg = (type) =>{
        const from = this.props.user._id; //获取发送方
        const to = this.props.match.params.userid; //获取接收方
        let content = null
        if(type==="email"){
            content = this.state.emailMsg.trim()
            if(content){
                this.props.sendMsg({from, to, content});
            }
        }
        if(type==="phone"){
            content = this.state.phoneMsg.trim()
            if(content){
                this.props.sendMsg({from, to, content});
            }
        }
        if(type==="info"){
            content = this.state.infoMsg.trim()
            if(content){
                this.props.sendMsg({from, to, content});
            }
        }
    }

    render () {
        const {user} = this.props;
        const {users, chatMsgs} = this.props.chat;

        //计算当前情景下的聊天chatId
        const meId = user._id;
        if(!users[meId]) {
            return null; //当前情况下还没获取数据直接返回
        }
        const targetId = this.props.match.params.userid;//根据请求获取接收方
        const chatId = [meId, targetId].sort().join('_'); //创建当前会话的Id标识
        // 对chatMsgs进行过滤
        const msgs = chatMsgs.filter(msg => msg.chat_id===chatId);
        //得到目标用户的header图片对象
        const targetHeader = users[targetId].header;
        const targetIcon = targetHeader ? require(`../../assets/images/${targetHeader}.png`) : null;
        return (
            <div id='chat-page'>
                <NavBar icon={<Icon type='left'/>} className='stick-top' onLeftClick={()=> this.props.history.goBack()}> 
                    {users[targetId].username}
                </NavBar>
                <div className={style.chatList}>
                        {
                            msgs.map(msg => {
                            if(targetId===msg.from) {// 对方发给我的
                                return (
                                    <div className={`${style.fromMessage}`} key={msg._id}>
                                        <img src={targetIcon} className={`${style.chatHead} ${style.left}`} />
                                        <div className={`${style.fromContent} ${style.left}`}>{msg.content}</div>
                                    </div>
                                )
                            } else { // 我发给对方的
                                return (
                                    <div className={`${style.fromMessage}`} key={msg._id}>
                                        <img src={targetIcon} className={`${style.chatHead} ${style.right}`} />
                                        <div className={`${style.fromContent} ${style.right}`}>{msg.content}</div>
                                    </div>
                                )
                            }
                            })
                        }
                </div>
                <div className='am-tab-bar'>
                <InputItem
                    placeholder="请输入"
                    value={this.state.content}
                    onChange={val => this.setState({content: val})}
                    extra={
                    <span>
                        <span onClick={this.toggleShow} style={{marginRight:5}}>😊</span>
                        <span onClick={this.handleSend}>发送</span>
                        
                    </span>
                    }
                />
                <div style={{background:"#EEEEEE",width:"100%",height:50}}>
                    <Button style={{marginTop:10,marginBottom:10,float:"left"}} type="primary" size="small" onClick={()=>this.sendSelfMsg("email")}>发送邮箱地址</Button>
                    <Button style={{marginTop:10,marginBottom:10,marginLeft:28,float:"left"}} type="primary" size="small"  onClick={()=>this.sendSelfMsg("phone")}>发送手机号码</Button>
                    <Button style={{marginTop:10,marginBottom:10,float:"right"}} type="primary" size="small"  onClick={()=>this.sendSelfMsg("info")}>发送岗位信息</Button>
                </div>
                {this.state.isShow ? (
                    <Grid
                        data={this.emojis}
                        columnNum={8}
                        carouselMaxRow={4}
                        isCarousel={true}
                        onClick={(item) => {
                            this.setState({content: this.state.content + item.text})
                        }}
                    />
                ) : null}
                </div>
            </div>
        )
    }
}
export default connect(
    state => ({user: state.user, chat: state.chat}),
    {sendMsg, readMsg}
)(Chat);