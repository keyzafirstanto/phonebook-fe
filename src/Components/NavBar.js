import { css } from '@emotion/css'

export default function NavBar(props) {
    return (

        <div className={css`
            background-color: #183D3D;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 55px;
            width: 100%;
            `}>
            <div>
                <div className={css`
                    padding: 10px 20px;
                `}>
                    <input
                        onInput={props.search}
                        type="search"
                        placeholder="Search Contact"
                        aria-label="Search"
                        className={css`
                            border-radius: 5px;
                            height: 35px;
                            border: none;
                            text-align: center;
                            color: grey;
                            background-color: #F8F0E5;
                        `}
                    />
                </div>
            </div>
        </div>
    )
}

