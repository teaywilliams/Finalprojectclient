import React, { Component } from 'react';

type AdminProps = { };

export class Admin extends (Component)<AdminProps, {}> {
    constructor(props: AdminProps) {
        super(props);
        this.state = {};
    }

    render () {
        return (
            <div id='adminDiv' style={{  justifyContent: 'center', flexDirection: 'row'}}>
                <div id='adminContainer'>
                    <div>
                        <div style={{ 
                            width: '50%', 
                            display: 'block',
                             fontSize: '30px',
                            //   justifyContent: 'center',
                            //   flexDirection: 'row'
                              }}>
                        </div>
                    </div>
                </div>
                {console.log('Admin Footer')}
            </div>
        );
    }
}

export default Admin;
