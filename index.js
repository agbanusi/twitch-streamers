
var list=["freecodecamp", "RobotCaleb", "OgamingSC2", "noobs2ninjas"] //list of users
var classer1='v' //change class1
var classer2='v'  //change class2
var classer3='v'  //change class3
var alli=[]  //a global var to extract the values gotten from the all function

class Main extends React.Component {
  constructor(props){
    super(props);
    //binded functions
    this.streams=this.streams.bind(this);
    this.api_get=this.api_get.bind(this);
    this.compile=this.compile.bind(this);
    this.offline=this.offline.bind(this)
    this.online=this.online.bind(this);
    this.all=this.all.bind(this);
  }
  //function to get results from the site through a get request
  api_get(type,channel){
    return fetch('https://wind-bow.glitch.me/twitch-api/'+type+'/'+channel).then(response=>response.json()).then(data=>data)
  }
  //a async function that return the streams and channel data from the get request
  async streams(){
    let stream=[]
    let channel=[]
    for(let i=0; i<list.length;i++){
      stream.push(await this.api_get('streams',list[i]))
      channel.push(await this.api_get('channels',list[i]))
      }
    return {stream,channel}
  }
  //this gets the total result and compile it into one
  async compile(){
    let st
    for(let i=0; i<1;i++){
      st=await this.streams()
    }
    let stream =st.stream.map((i)=>i.stream)
    let fin=st.channel.map((i,ind)=>{return{...i,stream:stream[ind]}})
    return fin
  }
  //this injects the data needed to the frontend for all users
  async all(){
    let all=alli.length!==0? alli: await this.compile()
    //
    document.getElementById('channel').innerHTML=''
    all.map((j)=>{
      let text= j.stream? j.game+': '+j.status : 'offline'
      let id= j.stream? 'background-color:#80CBC4' : 'background-color:#FFCDD2'
      document.getElementById('channel').innerHTML+='<div class="card" style='+id+' ><img class="img" src='+j.logo+'><a href='+j.url+'><h3>'+j.display_name+'</h3></a><h5>'+text+'</h5><div><br>'
    })
    alli=all
    classer1='v active'
    classer2='v'
    classer3='v';
  }
  //a function that compiles the offline users with use as above
  offline(){
    let off=alli
    document.getElementById('channel').innerHTML=''
    let of=off.filter((j)=>j.stream===null)
    let color='background-color:#FFCDD2'
    of.map((j)=>{
      document.getElementById('channel').innerHTML+='<div class="card" style='+color+'><img class="img" src='+j.logo+'><a href='+j.url+'><h3>'+j.display_name+'</h3></a><h5>offline</div><br>'
    })
    classer1='v'
    classer3='v active'
    classer2='v';
  }
  //this function does as above but for online users
  online(){
    let on=alli
    document.getElementById('channel').innerHTML=''
    let onn=on.filter((i)=>i.stream!==null)
    let color='background-color:#80CBC4'
    onn.map((j)=>{
      let text=j.game+': '+j.status
      document.getElementById('channel').innerHTML+='<div class="card" style='+ color +'><img class="img" src='+j.logo+'><a href='+j.url+'><h3>'+j.display_name+'</h3></a><h5>'+text+'</div><br>'
    })
    classer1='v'
    classer3='v'
    classer2='v1 active';
  }
  
  render() {
    this.all()
    return (
     <div>
        <div className='top'>
          <h1>Twitch Streamers </h1>
          <ul>
            <li className={classer1} onClick={this.all}><div id='all' className='cir'/>  <p className='i'> All</p></li>
            <li className={classer2} onClick={this.online}><div id='online' className='cir'/> <p className='ii'> Online</p></li>
            <li className={classer3} onClick={this.offline}><div id='offline' className='cir'/> <p className='iii'> Offline</p></li> 
          </ul> 
        </div>
        <div id='channel' />
     </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('root'));
