import React from 'react';
import Modal from 'react-modal';
Modal.setAppElement("#root");

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: '20%',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)'
    }
};

class OutputModal extends React.Component {
    render() {
        return (
            <div>
                <Modal isOpen={this.props.show} contentLabel="test-modal" style={customStyles}>
                    <button className="modal-exit-button" style={{ float: 'right' }} onClick={this.props.exit}>{""} Close</button>
                    {this.props.point !== 0 ?
                        <h3 style={{ textAlign: 'center', paddingTop: '15%' }}>Congratulation you earned: {this.props.point} Points</h3> :
                        <h3 style={{ textAlign: 'center', paddingTop: '15%', color: 'red' }}>Opps! Better luck next time.</h3>
                    }
                </Modal>
            </div>
        )
    }
}
export default OutputModal