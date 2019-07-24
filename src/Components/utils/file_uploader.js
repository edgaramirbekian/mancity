import React, {Component} from 'react';
import { firebase } from '../../firebase';

//app modules
import CircularProgress from '@material-ui/core/CircularProgress';

//3rd party libs
import {default as FirebaseFileUploader} from 'react-firebase-file-uploader';



class FileUploader extends Component {
    state = {
        name: '',
        isUploading: false,
        fileURL: ''
    };

    static getDerivedStateFromProps (nextProps, nextState) {
        if (nextProps.defaultImage) {
            return nextState = {
                name: nextProps.defaultImageName,
                fileURL: nextProps.defaultImage
            }
        }
        return null
    }

    handleUploadStart = () => {
        this.setState({isUploading: true})
    };

    handleUploadError = () => {
        this.setState({isUploading: false})
    };

    handleUploadSuccess = (filename) => {
        this.setState({
            name: filename,
            isUploading: false
        });

        firebase.storage().ref(this.props.dir)
            .child(filename)
            .getDownloadURL()
            .then(url => {
                this.setState({
                    fileURL: url
                })
            })
            .catch(error => {return error});

        this.props.fileName(filename)

    };

    handleUploadAgain = () => {
        firebase.storage().ref(this.props.dir)
            .child(this.state.name)
            .delete()
            .then( () => console.log('deleted photo'))
            .catch(error => {return error});
        this.setState({
            name: '',
            isUploading: false,
            fileURL: ''
        });

        this.props.resetImage()
    };

    render() {
        return (
            <div>
                {
                    !this.state.fileURL
                        ? <div>
                            <div className='label_inputs'>
                                {this.props.label}
                            </div>
                        <FirebaseFileUploader
                            accept='image/*'
                            name='image'
                            randomizeFilename
                            storageRef={firebase.storage().ref(this.props.dir)}
                            onUploadStart={this.handleUploadStart}
                            onUploadError={this.handleUploadError}
                            onUploadSuccess={this.handleUploadSuccess}
                        />
                        </div>
                        : <div className='image_upload_container'>
                            <img
                                style={{width: '100%'}}
                                src={this.state.fileURL}
                                alt={this.state.name}
                            />
                            <div className='remove' onClick={() => this.handleUploadAgain()}>
                                Remove
                            </div>
                        </div>
                }
                {
                    this.state.isUploading
                        ? <div className='progress' style={{textAlign: 'center', margin: '30px 0'}}>
                        <CircularProgress
                            style={{color: '#98c6e9'}}
                            thickness={7}
                        />
                        </div>
                        : null
                }
            </div>
        );
    }
}

export default FileUploader;