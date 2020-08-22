import React from "react";

export interface AlertProps {
    message: string
    onCloseHandler: (event) => void,
}

export class Alert extends React.Component<AlertProps, {}> {
    render() {
        return <div className="ErrorDiv">
            <i className="fa fa-warning"/>
            <div className='ErrorMessage'>{this.props.message}</div>
            <i className="fa fa-close error-close" onClick={this.props.onCloseHandler}/>
        </div>
    }
}