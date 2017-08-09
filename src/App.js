import React, { Component } from 'react';
import axios from 'axios'
import './App.css';

class App extends Component {
  state={
    imgUrl:""
  }
  handleChange=(event)=>{
    const file=event.target.files[0]//拿到文件名（文件路径）指定文件
    const reader=new FileReader()
    reader.onload=(event)=>{
      console.log(event.target.result);
      let data={
        file:event.target.result
      }
      let formData=new FormData()//将数据挂载到form上
      formData.append('avatar',file)//服务器端接收参数‘avatar’
      axios.post(`http://192.168.0.119:3008/touxiang`,formData)
      .then(res=>{
        console.log(res.data)
        let fullImgUrl = `http://192.168.0.119:3008/uploads/avatars/${res.data.filename}`
        this.setState({
           imgUrl: fullImgUrl
         })
      })
    }
    reader.readAsDataURL(file)//读取文件，将数据读入内存
    console.log('file',file);
  }
  render() {
    return (
      <div className="App">
        <label className='upload-label' style={{backgroundImage:`url(${this.state.imgUrl})`}}>
          <input type='file' onChange={this.handleChange}/>
        </label>

      </div>
    );
  }
}

export default App;
