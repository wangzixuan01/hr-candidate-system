import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import {NavBar, InputItem,Picker, Button, List, Checkbox,TextareaItem} from 'antd-mobile';

import HeaderSelector from '../../components/header-selector/header-selector';
import {updateUser} from '../../redux/actions';
import salaryLevelList from '../../common/salaryLevelList';
import industryFieldList from '../../common/industryFieldList';
import jobNatureList from '../../common/jobNatureList';
import workExperienceList from '../../common/workExperienceList';
import educationList from '../../common/educationList';
import hotCity from '../../common/hotCity';
import selfAssessment from '../../common/selfAssessment';

const CheckboxItem = Checkbox.CheckboxItem;


console.log(selfAssessment,"selfAssessment")
class JobSeekerInfo extends Component {
    state = {
        header: '', // 头像名称
        industry:"", //行业
        jobNature:'',//求职类型
        post: '', // 职位,
        educationExperience:"",//教育经历
        experience:'',
        education:'',
        salary:'',
        city:'',
        phone:'',
        email:'',
        info: '', // 个人或职位简介
        selfTag:'',//个人标签
        infoType:'jobSeeker'
    }
    handleChange = (name, val) => {
        console.log(val,"callllll")
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
    save = () =>{
        this.props.updateUser(this.state); 
    }

    render () {
        // 如果信息已经完善, 自动重定向到对应主界面
        const {header, type} = this.props.user
        if(header) { // 说明信息已经完善
            const path = type==='Boss' ? '/boss' : '/jobseeker'
            return <Redirect to={path}/>
        }

        // const { getFieldProps } = this.props.form;
        return (
            <div>
                <NavBar>求职者资料完善</NavBar>
                <HeaderSelector setHeader={this.setHeader} />
                <List>
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
                    <InputItem placeholder='请输入求职岗位' onChange={val => {this.handleChange('post', val)}}>请输入岗位:</InputItem>
                    <InputItem placeholder='请输入毕业院校' onChange={val => {this.handleChange('education', val)}}>请输入毕业院校:</InputItem>
                    <InputItem placeholder='请输入电话' onChange={val => {this.handleChange('phone', val)}}>请输入电话:</InputItem>
                    <InputItem placeholder='请输入邮箱' onChange={val => {this.handleChange('email', val)}}>请输入邮箱:</InputItem>
                    <List renderHeader={() => '选择适合自己的标签（多选）'}>
                        {selfAssessment.map(i => (
                        <CheckboxItem key={i.value} onChange={() => {this.handleChange('selfTag', i.value)}}>
                            {i.label}
                        </CheckboxItem>
                        ))}
                    </List>
                    <TextareaItem title='自我描述'  placeholder='请输入自我描述' rows={3} onChange={val => {this.handleChange('info', val)}}></TextareaItem>      
                    <Button type='primary' onClick={this.save}>保&nbsp;&nbsp;&nbsp;存</Button>
                </List>
            </div>
        )
    }
}
export default connect(
    state => ({user: state.user}),
    {updateUser}
)(JobSeekerInfo)