import React, { Component } from 'react';
import './App.css';
import OutputModal from './Modal.js';
class Home extends Component {
    userInfo;
    point = 0;
    constructor() {
        super();
        this.state = {
            mobileInfo: {},
            diaryInfo: {},
            bottleInfo: {},
            showModal: false,
            points: ''
        }
    }

    handleShowModal = point => {
        this.setState(this.toggleShowModal);
        if (this.state.showModal === false) {
            this.setState({
                points: point
            });
        }
    };

    toggleShowModal = state => {
        return {
            showModal: !state.showModal
        };
    };

    componentDidMount() {
        this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
        setTimeout(() => {
            this.checkRouteGaurd();
        }, 1000);
        console.log("user info here is", this.userInfo);
    }

    checkRouteGaurd() {
        // console.log("route gaurd function called");
        if (this.userInfo === undefined || this.userInfo === '' || this.userInfo === null || this.userInfo.authToken === undefined || this.userInfo.authToken === '' || this.userInfo.authToken === null) {
            this.props.history.push("/Login");
        } else {
            this.getMobileInfo();
            this.getDiaryInfo();
            this.getBottleInfo();
        }

    }

    getMobileInfo = () => {

        fetch("http://localhost:8000/api/v1/product/1", {
            "method": "GET",
            "headers": {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                this.setState({
                    mobileInfo: response.data

                })
                // console.log("mobile Info here is", this.state.mobileInfo)
            })
            .catch(err => {
                console.log(err);
            });

    }

    getDiaryInfo = () => {

        fetch("http://localhost:8000/api/v1/product/2", {
            "method": "GET",
            "headers": {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                this.setState({
                    diaryInfo: response.data

                })
                // console.log("diary Info here is", this.state.diaryInfo)
            })
            .catch(err => {
                console.log(err);
            });

    }

    getBottleInfo = () => {

        fetch("http://localhost:8000/api/v1/product/3", {
            "method": "GET",
            "headers": {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                this.setState({
                    bottleInfo: response.data

                })
                // console.log("bottle Info here is", this.state.bottleInfo)
            })
            .catch(err => {
                console.log(err);
            });

    }

    buyProduct = (productType) => {
        // console.log("point value before assign", this.point);
        if (this.userInfo.userDetails.state === 'Maharashtra' && productType === 'bottle') {
            this.point = 20;
            // this.handleShowModal(this.point)
        } else if (this.userInfo.userDetails.state === 'Karnataka' && productType === 'diary') {
            this.point = 50;
            // this.handleShowModal(this.point)
        } else if (this.userInfo.userDetails.state === 'Delhi' && productType === 'mobile') {
            this.point = 100;
            // this.handleShowModal(this.point)
        }
        this.handleShowModal(this.point)
        // console.log("point value after assign", this.point);
    }

    componentWillUnmount() {
        localStorage.clear();
    }

    render() {
        return (
            <div className="mb-2 pageheading">
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    <div className="col">
                        {this.state.mobileInfo !== null ?
                            <div className="card h-100">
                                <img src={`http://localhost:8000/${this.state.mobileInfo.productImagePath}`} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h3 className="card-title" style={{ textAlign: 'center', textTransform: 'capitalize' }}>{this.state.mobileInfo.productName}</h3>
                                </div>
                                <div className="card-footer" style={{ textAlign: 'center' }}>
                                    <button type="button" className="btn btn-primary" onClick={() => this.buyProduct(this.state.mobileInfo.productType)} >Buy Now</button>
                                </div>
                            </div>
                            :
                            <div className="card h-100" style={{ textAlign: 'center', fontWeight: 'bolder' }}>
                                No Mobile Product added.
                            </div>
                        }

                    </div>
                    <div className="col">
                        {this.state.diaryInfo !== null ?
                            <div className="card h-100">
                                <img src={`http://localhost:8000/${this.state.diaryInfo.productImagePath}`} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h3 className="card-title" style={{ textAlign: 'center', textTransform: 'capitalize' }}>{this.state.diaryInfo.productName}</h3>
                                </div>
                                <div className="card-footer" style={{ textAlign: 'center' }}>
                                    <button type="button" className="btn btn-primary" onClick={() => this.buyProduct(this.state.diaryInfo.productType)}>Buy Now</button>
                                </div>
                            </div>
                            :
                            <div className="card h-100" style={{ textAlign: 'center', fontWeight: 'bolder' }}>
                                No Diary Product added.
                            </div>
                        }
                    </div>
                    <div className="col">
                        {this.state.bottleInfo !== null ?
                            <div className="card h-100">
                                <img src={`http://localhost:8000/${this.state.bottleInfo.productImagePath}`} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h3 className="card-title" style={{ textAlign: 'center', textTransform: 'capitalize' }}>{this.state.bottleInfo.productName}</h3>
                                </div>
                                <div className="card-footer" style={{ textAlign: 'center' }}>
                                    <button type="button" className="btn btn-primary" onClick={() => this.buyProduct(this.state.bottleInfo.productType)}>Buy Now</button>
                                </div>
                            </div>
                            :
                            <div className="card h-100" style={{ textAlign: 'center', fontWeight: 'bolder' }}>
                                No Bottle Product added.
                            </div>
                        }
                    </div>
                </div>
                <OutputModal show={this.state.showModal} exit={this.handleShowModal} point={this.state.points} ></OutputModal>


            </div>
        );
    }
};




export default Home;