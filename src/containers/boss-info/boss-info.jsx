import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import {NavBar,Picker, InputItem, Button, List, TextareaItem} from 'antd-mobile';

import HeaderSelector from '../../components/header-selector/header-selector';
import {updateUser} from '../../redux/actions';
import salaryLevelList from '../../common/salaryLevelList';
import industryFieldList from '../../common/industryFieldList';
import jobNatureList from '../../common/jobNatureList';
import workExperienceList from '../../common/workExperienceList';
import educationList from '../../common/educationList';
import hotCity from '../../common/hotCity';
import employeeNumList from '../../common/employeeNumList';
import financingStageList from '../../common/financingStageList';





class BossInfo extends Component {
    state = {
        header: '', // 头像名称
        post: '', // 职位
        info: '', // 个人或职位简介
        company: '', // 公司名称
        salary: '', // 
        infoType:'boss',
        financingStage:'',
        employeeNum:'',
        city:'',
        educationExperience:'',
        experience:'',
        jobNature:'',
        industry:'',
        phone:'',
        email:''
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
        return (
            <div>
                <NavBar>Boss信息完善</NavBar>
                <HeaderSelector setHeader={this.setHeader} />
                <List>
                    <InputItem placeholder='请输入招聘职位' onChange={val => {this.handleChange('post', val)}}>招聘职位:</InputItem>      
                    <InputItem placeholder='请输入公司名称' onChange={val => {this.handleChange('company', val)}}>公司名称:</InputItem>    
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
                    <InputItem placeholder='请输入电话' onChange={val => {this.handleChange('phone', val)}}>请输入电话:</InputItem>
                    <InputItem placeholder='请输入邮箱' onChange={val => {this.handleChange('email', val)}}>请输入邮箱:</InputItem>
                    <TextareaItem title='职位要求' placeholder='请输入职位介绍' rows={3} onChange={val => {this.handleChange('info', val)}}></TextareaItem>      
                    <Button type='primary' onClick={this.save}>保&nbsp;&nbsp;&nbsp;存</Button>
                </List>
            </div>
        )
    }
}
export default connect(
    state => ({user: state.user}),
    {updateUser}
)(BossInfo)