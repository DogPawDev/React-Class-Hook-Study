import React, {useEffect, useState} from 'react';
import './App.css';


function App() {
 var [funcShow,setFuncShow] = useState(true);
 var [classShow,setclassShow] = useState(true);


  return (
    <div className="container">
      <h1>Heeloo world</h1>
      <input type = "button" value="remove func" onClick={()=>{
        setFuncShow(false);
      }}></input>
      <input type = "button" value="remove class" onClick={()=>{
        setclassShow(false);
      }}></input>
      

      {funcShow ? <FuncComp initNumber={2}></FuncComp> : null}
      {classStyle ? <ClassComp initNumber={2}></ClassComp> : null}
    </div>
  );
}


// 함수형 방식 hook
var funcStyle = 'color:green';
var funcId = 0;


function FuncComp(props){
  
  var numberState = useState(props.initNumber);
  var number = numberState[0]; //상태값
  var setNumber = numberState[1]; // useState로 넘어온 배열 중 1번째는 props 값이고 , 2번째가 스테이트 값이 변경될 떄 호출
  // 상태를 변경할 수 있는 함수

  //var dateState = useState(new Date().toString());
  //var _date = dateState[0];
  //var setDate = dateState[1];
  // 위와 동일한 코드
    var [_date,setDate] = useState((new Date().toString()));

  useEffect(()=>{
    console.log("%cfunc => useEffect (componentDidMount & componentDidUpdate 와 동일)" +(++funcId),funcStyle);
    //컴포넌트가 등장할때 작업하는 곳
    document.title= number + ': '+ _date;

    return ()=>{
      console.log("%cfunc => useEffect return CleanUp과 동일" +(++funcId),funcStyle);
      //다시 useEffect가 실행되기 전에 실행됨 
    }

  },[number]);
  //두번 째 인자값 존재 할 경우 해당 값이 바뀔 때만 호출 할 수 있다.
  // useEffect는 인자로 전달된 함수가 렌더가 끝나고 호출되도록 정해저있다.

  
  useEffect(()=>{
    console.log("%cfunc => useEffect _date (componentDidMount & componentDidUpdate 와 동일)" +(++funcId),funcStyle);
    //컴포넌트가 등장할때 작업하는 곳
    document.title= number + ': '+ _date;

    return ()=>{
      console.log("%cfunc => useEffect _date return CleanUp과 동일" +(++funcId),funcStyle);
      //다시 useEffect가 실행되기 전에 실행됨 
    }

  },[_date]);



  useEffect(()=>{
    console.log("%cfunc => useEffect  (componentDidMount 와 동일)" +(++funcId),funcStyle);
    //컴포넌트가 등장할때 작업하는 곳
    document.title= number + ': '+ _date;

    return ()=>{
      console.log("%cfunc => useEffect  return (componentWillUnMount)과 동일" +(++funcId),funcStyle);
      // 부모 컴포넌트를 이용해 자식 컴포넌트를 없앨 때 이부분이 실행됨
    }
  },[]);



console.log("%cfunc => render " +(++funcId),funcStyle);

  return(
    <div className="container">
      <h2>function style componet</h2>
      <p>Number : {number}</p>
      <input type="button" value="random" onClick={
          function () {
            setNumber(Math.random)
            // 여기서 셋 스테이트 값을 넘겨줌으로써 스테이트 값이 바뀌므로 새롭게 렌더가 호출 됨
          }
        }></input>
         <p>_date : {_date}</p>
      <input type="button" value="date" onClick={
          function () {
            setDate(new Date().toString())
            // 여기서 셋 스테이트 값을 넘겨줌으로써 스테이트 값이 바뀌므로 새롭게 렌더가 호출 됨
          }
        }></input>
    </div>
  );
}



var classStyle = 'color:red';

// 클래스 방식 state 및 props 사용 방식
class ClassComp extends React.Component{

  state={
    number:this.props.initNumber,
    _date:(new Date().toString())
  }
  //state 값이 바뀔 때 마다 렌더가 호출 됨

  componentWillMount(){
    console.log('%cclass = > componentWillMount',classStyle);
  } //렌더 전 호출

  componentDidMount(){ 
    console.log('%cclass = > componentDidMount ',classStyle);
  }// 렌더 후 호출
  // 네트워크를 이용해서 다운이 되면 표현 해줘야 하는 부분 같은 곳에 넣어주기 좋음

  shouldComponentUpdate(nextProts, nextState){
    console.log('%cclass -> shouldComponentUpdate',classStyle);
    return true;
  }

  componentWillUpdate(nextProps,nextState){
    console.log('%cclass ->componentWillUpdate ',classStyle)
  }
  componentDidUpdate(nextProps,nextState){
    console.log('%cclass ->componentDidUpdate ',classStyle)
    //state 값이 바뀔 때 호출
  }






  render(){
    console.log('%cclass-> render',classStyle);
    return(
      <div className="container">
        <h2>class style componet</h2>
        <p>Number : {this.state.number}</p>
        <input type="button" value="random" onClick={
          function () {
            this.setState({number:Math.random()})
            // 여기서 셋 스테이트 값을 넘겨줌으로써 스테이트 값이 바뀌므로 새롭게 렌더가 호출 됨
          }.bind(this)
        }></input>
        <p>Date : {this.state._date}</p>
        <input type="button" value="date" onClick={
          function () {
            this.setState({_date:(new Date()).toString()})
            // 여기서 셋 스테이트 값을 넘겨줌으로써 스테이트 값이 바뀌므로 새롭게 렌더가 호출 됨
          }.bind(this)
        }></input>

      </div>
    );
  }
}




export default App;
