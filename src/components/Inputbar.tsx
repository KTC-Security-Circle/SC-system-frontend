import React from 'react';

const Inputbar = () => {
    return(
        <div>
            <form className="search-bar" action="#" method="post">
                <button type="button">
                    <img src="https://www.svgrepo.com/show/126362/attachment-paperclip.svg" alt="attachment icon" />
                </button>
                <input type="text" placeholder="ChatGPT にメッセージを送信する" />
                <button type="submit">
                    <img src="https://www.svgrepo.com/show/216487/arrow-up-circle.svg" alt="send icon" />
                </button>
            </form>
        </div>
    );
};

export default Inputbar;
