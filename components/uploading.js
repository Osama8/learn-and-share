import React from "react";
import {
  PermissionsAndroid,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  CameraRoll
} from "react-native";
import { Permissions } from "expo";

export default class create extends React.Component {
  state = {
    profPic: ""
  }
  uploadImage=(uri)=>{
    const imagesRef= firebase.storage().ref().child('images').child(uuid.v4());
const downloadURLPromise = new Promise((resolve,reject)=>{
      const xhr= new XMLHttpRequest();
      xhr.onload=function(){
        const blob = xhr.response;
        var uploadTask = imagesRef.put(blob);
        uploadTask.then((snapshot)=> {
          snapshot.ref.getDownloadURL().then(function(donloadURL){
            resolve(downloadURL);
          });
        });
      }
      xhr.responseType='blob';
      xhr.open('GET',uri,true);
      xhr.send(null);

    });
    return downloadURLPromise;
  }
  publish=()=>{
    const imageUri=this.state.profPic;
    this.uploadImage(imageUri).then((downloadURL)=>{
      const user = firebase.auth().currentUser;
      if (user) {
        user.updateProfile({
          photoURL: downloadURL
        })
        .then(() => {
          alert("successfully updated profile picture");
        })
        .catch((error) => {
          console.log(error);
        })
      }
    })
    .catch(error=>{
      alert('Published failed.');
    });
  };
  render(){
    return(
      ImagePicker.showImagePicker(null,(response)=>{
        if(response.didCancel){
          console.log('User cancelled image picker');
        } else if(response.error){
          console.log('ImagePicker Error:', response.error);
        }else {
          const source ={uri: response.uri };
          this.setState({
            profPic: source,
          })
        }
      })
      )
  };
