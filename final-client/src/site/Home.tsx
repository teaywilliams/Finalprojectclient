
import React, { FC } from 'react';
import "../index.css";

type HomeProps = {};

const Home: FC<HomeProps> = (props) => {

    return (
    
        
            <div className='intro'>
                <h1 id='Intro'style={{ marginTop: "5rem" }}>
                    Welcome to For the Love of Brie
                    <br />
                    A place to share your most inspired charcuterie boards and get creative as you go!
                </h1>
            </div>
        
    );
};

export default Home;