// import React, { Component } from 'react';
// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import TextField from '@mui/material/TextField';
// import { useState } from 'react';

// // var reader = new FileReader();
// // reader.onloadend = function () {
// //     console.log('RESULT', reader.result)
// // }

// export default function Upload(props) {
//     // fileObj = [[]];
//     // fileArray = [];
//     // constructor(props) {
//     //     super(props)
//     //     this.state = {
//     //         file: [null]
//     //     }
//     //     this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this)
//     //     this.uploadFiles = this.uploadFiles.bind(this)
//     // }
//     // uploadMultipleFiles(e) {
//     //     this.fileObj.push(e.target.files)
//     //     console.log(e.target.files);
//     //     for (let i = 0; i < this.fileObj.length; i++) {
//     //         for (let j = 0; j < this.fileObj[i].length; j++) {
//     //             this.fileArray.push(URL.createObjectURL(this.fileObj[i][j]))
//     //         }
//     //     }
//     //     this.setState({ file: this.fileArray })
//     //     console.log(this.fileArray)
//     // }
//     // uploadFiles(e) {
//     //     e.preventDefault()
//     //     console.log(this.state.file)

//     // }

//     const [array, setArray] = React.useState([]);

//     const convertBase64 = (file) => {
//         return new Promise((resolve, reject) => {
//             const fileReader = new FileReader();
//             fileReader.readAsDataURL(file)
//             fileReader.onload = () => {
//                 resolve(fileReader.result);
//             }
//             fileReader.onerror = (error) => {
//                 reject(error);
//             }
//         })
//     }


//     const handleFileRead = async (event) => {

//         for (let i = 0; i < event.target.files.length; i++) {
//             const newValue = await convertBase64(event.target.files[i]);
//             // files[i] = newValue;

//             array.push(newValue);

//         }
//         // const file = event.target.files[0]
//         // const base64 = await convertBase64(file)
//         // props.setFile(base64)
//         // console.log(base64)
//         console.log(array);
//         // setFile(array);
//         localStorage.setItem('file', JSON.stringify(array));

//     }



//     return (
//         // <form>
//         //     {/* <div className="form-group multi-preview">
//         //         {(this.fileArray || []).map(img => (
//         //             { console.log(img) }
//         //             <img src={"data:image/jpeg;base64, "+img} alt="..." />
//         //         ))}
//         //     </div> */}
//         //     <div className="form-group">
//         //         <input type="file" className="form-control" onChange={this.uploadMultipleFiles} multiple />
//         //     </div>
//         //     <button type="button" className="btn btn-danger btn-block" onClick={this.uploadFiles}>Upload</button>
//         // </form >

//         <TextField
//             // id="originalFileName"
//             type="file"
//             webkitdirectory="true" // for chrome
//             inputProps={{ accept: 'image/*, .xlsx, .xls, .csv, .pdf, .pptx, .pptm, .ppt', multiple: true }}
//             required

//             name="originalFileName"
//             onChange={e => handleFileRead(e)}
//             size="small"
//             // variant="standard"
//             id="outlined-basic"
//             label="Outlined"
//             variant="outlined"
//         // type="file"

//         />

//     );
// }
