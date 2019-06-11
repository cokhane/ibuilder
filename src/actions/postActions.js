import { FETCH_POST, NEW_POST,GLOBAL_VAR } from './types';


//SAMPLE ES5 FETCH post
//
// export function fetchPosts(){
//   //thunk middle ware allows to use
//   //or cakk the dispatch function directly
//   // si we cab naje async request
//
//   //dispatch is like a promise
//   //when ever we want to send data we call dispatch
//   //and in the promise we call resolve
//
//   return function(dispatch){
//     //if there is a data we want to create of fetching we create it here
//     //sample
//     fetch('https://jsonplaceholder.typicode.com/posts')
//     .then(res => res.json())
//     .then(posts => dispatch({
//       //takes in an objct and the type is gonan be fetch underscore post
//       type: FETCH_POST,
//       //payload is what ever data is comming
//       payload : posts
//     }));
//   }
// }


//when this is called
//it is fetching and then dispatching the type and the payload (data)

  export const fetchPosts = () => dispatch => {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(posts =>
      dispatch({
       type: FETCH_POST,
       payload : posts
     })
   );
 };

 export const createPost = (postData) => dispatch => {
   fetch('https://jsonplaceholder.typicode.com/posts',{
     method: 'POST',
     headers: {
      'content-type' : 'application/json'
     },
     body: JSON.stringify(postData)
   }).then(res => res.json())
      .then(post =>
        dispatch({
          type: NEW_POST,
          payload: post
        })
   );
};


export const getLanguage = (postData) => dispatch => {
   dispatch({
     type: GLOBAL_VAR,
     payload: postData
   });
};


export const getLoginData = (postData) => dispatch => {
  console.log("post: ", postData)
  // fetch('https://jsonplaceholder.typicode.com/posts',{
  //   method: 'POST',
  //   headers: {
  //    'content-type' : 'application/json'
  //   },
  //   body: JSON.stringify(postData)
  // }).then(res => res.json())
  //    .then(post =>
  //      dispatch({
  //        type: NEW_POST,
  //        payload: post
  //      })
  //    );

  const data =  JSON.stringify({
    "query":"query($input:credentials!){ AdminLogin(input:$input) { data { token,exp,firstname,lastname,email,passwordStatus } success,message,{ path,message } } }",
      "variables":{
        "input":{
          "username":postData.loginUsername,
          "password":postData.loginPassword
        }
      }
    })

   fetch("http://172.16.39.21:8238",{
    method:'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization":'Authorization'
    },
    body:data
  }).then(async res =>{
    let response = await res.json()
    if(response.AdminLogin.success){
      console.log(response)
    }else{
      console.log(false)
    }
  })
}
