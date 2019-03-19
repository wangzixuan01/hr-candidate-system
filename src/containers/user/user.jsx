import React,{Component} from 'react';
import {Result,InputItem,Picker,TextareaItem, List, WhiteSpace,Checkbox, Button, Modal,Grid} from 'antd-mobile'; 
import {connect} from 'react-redux';
import Cookies from 'js-cookie';
import {updateUser} from '../../redux/actions';
import {resetUser} from '../../redux/actions';
import salaryLevelList from '../../common/salaryLevelList';
import industryFieldList from '../../common/industryFieldList';
import jobNatureList from '../../common/jobNatureList';
import workExperienceList from '../../common/workExperienceList';
import educationList from '../../common/educationList';
import HeaderSelector from '../../components/header-selector/header-selector';
import hotCity from '../../common/hotCity';
import selfAssessment from '../../common/selfAssessment';
import employeeNumList from '../../common/employeeNumList';
import financingStageList from '../../common/financingStageList';
const CheckboxItem = Checkbox.CheckboxItem;

const Item = List.Item;
const Brief = Item.Brief;

class User extends Component {
    constructor(props) {
        super(props)
console.log(props,"propssssss")
        this.state = {
            edit:true,
            header: props.user.header, // 头像名称
            industry:[props.user.industry], //行业
            jobNature:[props.user.jobNature],//求职类型
            post: props.user.post, // 职位,
            educationExperience:[props.user.educationExperience],//教育经历
            experience:[props.user.experience],
            education:props.user.education,
            salary:[props.user.salary],
            city:[props.user.city],
            phone:[props.user.phone],
            email:props.user.email,
            info: props.user.info, // 个人或职位简介
            selfTag:props.user.selfTag,//个人标签
            infoType:'jobSeeker',
            employeeNum:[props.user.employeeNum],
            financingStage:[props.user.financingStage],
            company:props.user.company
        }
    }
    logout = () => {
        Modal.alert('退出','确定退出登陆吗?',[
            {text: '取消'},
            {
                text: '确定',
                onPress: () => {
                    Cookies.remove('userid');
                    this.props.resetUser();
                }
            }
        ])
    }
    edit= () =>{
        this.setState({edit:false})
    }
    save= () =>{
        this.props.updateUser(this.state); 
        this.setState({edit:true})
    }

    handleChange = (name, val) => {
        this.setState({
            [name]: val
        })
    }

    //更新header状态
    setHeader = (header) => {
        this.setState({
            header
        })
    }
    cancel= () =>{
        this.setState({edit:true})
    }

    render () {
        const {username, info,city, header,industry,type, education,email,educationExperience,experience,selfTag,phone,company,jobNature, post, salary} = this.props.user
        console.log(header,"header")
        return (
            <div style={{marginTop: 50,marginBottom:60}}>
                <Result img={<img src={header?require(`../../assets/images/${header}.png`):null} style={{width: 50}} alt='header'/>} title={username} message={company}/>
                <List renderHeader={()=>{
                    return <div>
                        <span>个人信息</span>
                        {
                            this.state.edit?<div style={{float:"right",color:"#df827c",cursor:"pointer"}} onClick={this.edit}>编辑</div>:<div style={{float:"right",color:"#df827c",cursor:"pointer"}} onClick={this.cancel}>取消</div>
                        }
                        </div>}}>
                        {
                            type==="Boss"?
                            this.state.edit?<div>
                                <Item multipleLine>
                                    <Brief>公司名称: {this.props.user.company}</Brief>
                                    <Brief>招聘职位: {post}</Brief>
                                    <Brief>所在城市: {city}</Brief>
                                    <Brief>所在行业: {industry}</Brief>
                                    <Brief>薪资范围: {salary}</Brief>
                                    <Brief>融资情况: {this.props.user.financingStage}</Brief>
                                    <Brief>公司规模: {this.props.user.employeeNum}</Brief>
                                </Item>
                                <Item multipleLine>
                                    <Brief>学历要求: {educationExperience}</Brief>
                                    <Brief>经验要求: {experience}</Brief>
                                    <Brief>工作年限要求: {jobNature}</Brief>
                                    <Brief>电话号码: {phone}</Brief>
                                    <Brief>邮箱: {email}</Brief>
                                    <Brief>职位简介: {info}</Brief>
                                </Item>

                            </div>:
                            <div>
                                <HeaderSelector setHeader={this.setHeader} />
                                <InputItem placeholder='请输入招聘职位' value={this.state.post} onChange={val => {this.handleChange('post', val)}}>招聘职位:</InputItem>      
                                <InputItem placeholder='请输入公司名称' value={this.state.company} onChange={val => {this.handleChange('company', val)}}>公司名称:</InputItem>    
                                <InputItem placeholder='请输入电话' value={this.state.phone} onChange={val => {this.handleChange('phone', val)}}>请输入电话:</InputItem>
                                <InputItem placeholder='请输入邮箱' value={this.state.email} onChange={val => {this.handleChange('email', val)}}>请输入邮箱:</InputItem>
                                <Picker data={industryFieldList} cols={1} format={val => {return val.join("")}}  value={this.state.industry} onChange={val => {this.handleChange('industry', val)}}  className="forss">
                                    <List.Item arrow="horizontal">所在行业</List.Item>
                                </Picker>
                                <Picker data={jobNatureList} cols={1} format={val => {return val.join("")}}  value={this.state.jobNature} onChange={val => {this.handleChange('jobNature', val)}}  className="forss">
                                    <List.Item arrow="horizontal">职位类型</List.Item>
                                </Picker>
                                <Picker data={workExperienceList} cols={1} format={val => {return val.join("")}}  value={this.state.experience} onChange={val => {this.handleChange('experience', val)}}  className="forss">
                                    <List.Item arrow="horizontal">工作经历要求</List.Item>
                                </Picker>
                                <Picker data={educationList} cols={1} format={val => {return val.join("")}}  value={this.state.educationExperience} onChange={val => {this.handleChange('educationExperience', val)}}  className="forss">
                                    <List.Item arrow="horizontal">学历要求</List.Item>
                                </Picker>
                                <Picker data={salaryLevelList} cols={1} format={val => {return val.join("")}}  value={this.state.salary} onChange={val => {this.handleChange('salary', val)}}  className="forss">
                                    <List.Item arrow="horizontal">薪资范围</List.Item>
                                </Picker>
                                <Picker data={hotCity} cols={1} format={val => {return val.join("")}}  value={this.state.city} onChange={val => {this.handleChange('city', val)}}  className="forss">
                                    <List.Item arrow="horizontal">所在城市</List.Item>
                                </Picker>
                                <Picker data={employeeNumList} cols={1} format={val => {return val.join("")}}  value={this.state.employeeNum} onChange={val => {this.handleChange('employeeNum', val)}}  className="forss">
                                    <List.Item arrow="horizontal">公司规模</List.Item>
                                </Picker>
                                <Picker data={financingStageList} cols={1} format={val => {return val.join("")}}  value={this.state.financingStage} onChange={val => {this.handleChange('financingStage', val)}}  className="forss">
                                    <List.Item arrow="horizontal">融资情况</List.Item>
                                </Picker>
                                <TextareaItem title='职位要求' value={this.state.info} placeholder='请输入职位介绍' rows={3} onChange={val => {this.handleChange('info', val)}}></TextareaItem>      
                                <Button style={{width:180,margin:"10px auto 10px",marginBottom:10}} type="primary"  onClick={this.save}>保存</Button>
                            </div>
                            :
                            this.state.edit?<div>
                                <Item multipleLine>
                                    <Brief>期望职位: {post}</Brief>
                                    <Brief>期望城市: {city}</Brief>
                                    <Brief>期望行业: {industry}</Brief>
                                    <Brief>期望薪资: {salary}</Brief>
                                </Item>
                                <Item multipleLine>
                                    <Brief>毕业院校: {education}</Brief>
                                    <Brief>学历: {educationExperience}</Brief>
                                    <Brief>经验: {experience}</Brief>
                                    <Brief>工作年限: {jobNature}</Brief>
                                    <Brief>电话号码: {phone}</Brief>
                                    <Brief>邮箱: {email}</Brief>
                                    <Brief>职业标签: {selfTag}</Brief>
                                    <Brief>个人简介: {info}</Brief>
                                </Item>
                            </div>:
                            <div>
                                <HeaderSelector setHeader={this.setHeader} />
                                <Picker data={industryFieldList} cols={1} format={val => {return val.join("")}}  value={this.state.industry} onChange={val => {this.handleChange('industry', val)}}  className="forss">
                                <List.Item arrow="horizontal">请选择求职行业</List.Item>
                                </Picker>
                                <Picker data={jobNatureList} cols={1} format={val => {return val.join("")}}  value={this.state.jobNature} onChange={val => {this.handleChange('jobNature', val)}}  className="forss">
                                    <List.Item arrow="horizontal">请选择求职类型</List.Item>
                                </Picker>
                                <Picker data={workExperienceList} cols={1} format={val => {return val.join("")}}  value={this.state.experience} onChange={val => {this.handleChange('experience', val)}}  className="forss">
                                    <List.Item arrow="horizontal">请选择工作经历</List.Item>
                                </Picker>
                                <Picker data={educationList} cols={1} format={val => {return val.join("")}}  value={this.state.educationExperience} onChange={val => {this.handleChange('educationExperience', val)}}  className="forss">
                                    <List.Item arrow="horizontal">请选择学历</List.Item>
                                </Picker>
                                <Picker data={salaryLevelList} cols={1} format={val => {return val.join("")}}  value={this.state.salary} onChange={val => {this.handleChange('salary', val)}}  className="forss">
                                    <List.Item arrow="horizontal">期望薪资</List.Item>
                                </Picker>
                                <Picker data={hotCity} cols={1} format={val => {return val.join("")}}  value={this.state.city} onChange={val => {this.handleChange('city', val)}}  className="forss">
                                    <List.Item arrow="horizontal">请选择期望工作城市</List.Item>
                                </Picker>
                                <InputItem placeholder='请输入求职岗位' value={this.state.post} onChange={val => {this.handleChange('post', val)}}>请输入岗位:</InputItem>
                                <InputItem placeholder='请输入毕业院校' value={this.state.education} onChange={val => {this.handleChange('education', val)}}>请输入毕业院校:</InputItem>
                                <InputItem placeholder='请输入电话' value={this.state.phone} onChange={val => {this.handleChange('phone', val)}}>请输入电话:</InputItem>
                                <InputItem placeholder='请输入邮箱' value={this.state.email} onChange={val => {this.handleChange('email', val)}}>请输入邮箱:</InputItem>
                                <List renderHeader={() => '选择适合自己的标签（多选）'}>
                                    {selfAssessment.map(i => (
                                    <CheckboxItem key={i.value} value={this.state.selfTag} onChange={() => {this.handleChange('selfTag', i.value)}}>
                                        {i.label}
                                    </CheckboxItem>
                                    ))}
                                </List>
                                <TextareaItem title='自我描述' value={this.state.info}  placeholder='请输入自我描述' rows={3} onChange={val => {this.handleChange('info', val)}}></TextareaItem>
                                <Button style={{width:180,margin:"10px auto 10px",marginBottom:10}} type="primary"  onClick={this.save}>保存</Button>
                            </div>
                        }
                </List>
                <WhiteSpace/>
                <List>
                    <Button type='warning' onClick={this.logout}>退出登录</Button>
                </List>
            </div>
        )
    }
}
export default connect(
    state => ({user: state.user}),
    {resetUser,updateUser}
)(User)