import styled from 'styled-components';
import { InlineIcon } from "@iconify/react";
import informationOutline from '@iconify-icons/mdi/information-outline';
import simpleClose from '@iconify-icons/mdi/close';

const PopupContainer = styled.div`
    background: #fff;
    position: absolute;
    bottom:0;
    right:0;
    padding: 1rem;
    width: 20vw;
    height: 14vh;
`;

const Button = styled.button`
    padding: 1rem;
    fontSize: 1rem;
    border: 1px solid black;
    background: #FFFF00;
    border-radius: 2px;
    &:hover {
        background: #FFFF8D;
        cursor: pointer;
    }
    margin: 0.5rem;
`

const PopupCloseButton = styled.button`
    border: none;
    float: right;
    background: none;
    &:hover {
        cursor: pointer;
    }
`
const PopupContent = styled.div`
    display: flex;
    align-items: center;
    & div {
        margin-right: 0.5rem;
    }
`

const PopupActions = styled.div`
    display:flex;
    justify-content: flex-end;
`

function Popup(props) {
    const {popupCloseHandler, releaseNotesClickHandler, downloadURL} = props;
    return (
        <PopupContainer>
            <PopupCloseButton>
                <InlineIcon icon={simpleClose} width="20" height="20"/>
            </PopupCloseButton>
            <PopupContent>
                <div>
                <InlineIcon icon={informationOutline} width="30" height="30"/>
                </div>
                <p>There is an available update</p>
            </PopupContent>
            <PopupActions>
                    <Button>
                        <a href={downloadURL}>Download</a>
                    </Button>
                    <Button onClick={popupCloseHandler}>
                        Later
                    </Button>
                    <Button onClick={releaseNotesClickHandler}>
                        Release Notes
                    </Button>
            </PopupActions>
        </PopupContainer>
    )
}


export default Popup;