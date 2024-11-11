import React, {useState} from 'react';
import Drawer from '@material-ui/core/Drawer';

export default function TemporaryDrawer() {

    const [open, setopen] = useState(false);
    const toggleOpen=() => {
        setopen(!open);
    }
    return(
        <>
            <button onClick={toggleOpen}>hoge</button>
            <Drawer anchor='left' open={open} onClose={toggleOpen}>
                <p>hello</p>
            </Drawer>
        </>
    );
}
