import React, { useEffect, useRef, useState } from 'react'
import lottie from 'lottie-web';
import styled from 'styled-components';
import { PageHero } from '../components';
import { Redirect, useParams } from 'react-router-dom';
import { useUserContext } from '../context/user_context';
import { checkAuthentication } from '../utils/helpers';

 const ResetPassword = () => {
    const {isAuthenticated, user, resetPassword} = useUserContext();
    const [state, setState] = useState({
        newPassword: '',
        newPasswordConfirm: ''
    })

      // get token for reset password
      const {token} = useParams();


    // if authented redirect
    const authented = checkAuthentication(isAuthenticated, user);

    // animation area start
        const container = useRef(null)
            useEffect(() => {
                let loadUrl;
                if(process.env.REACT_APP_APP_MODE === 'development') {
                loadUrl='http://localhost:3000/json/Change-password.json'
                }
                if(process.env.REACT_APP_APP_MODE === 'production') {
                    loadUrl=`${process.env.REACT_APP_HOST_ADDRESS}json/Change-password.json`
                }
            //   loadAnimation(loadUrl, container)
                fetch(loadUrl).then(async response => {
                    const animationData = await response.json();
                    lottie.loadAnimation({
                        container: container.current,
                        renderer: 'svg',
                        loop: true,
                        autoplay: true,
                        animationData
                    })
                })
             }, []);
    // animation area end

          

          if(authented) {
            return (
                <Redirect to='/checkout'></Redirect>
            )
        }


    // get token and set with update password
    const handleResetPassword = (e) => {
        e.preventDefault();
        resetPassword(token, state.newPassword, state.newPasswordConfirm)

        setState({...state, newPassword: '', newPasswordConfirm: ''})
    }
    
        return (
            <>
            <PageHero title="Reset Password"></PageHero>
            <Wrapper>
                <div className='content-area'>
                    
                    <form action="" onSubmit={(e) => {
                        handleResetPassword(e)
                    }}>
                        <h2>Reset Password.</h2>
                        <p>Please change your password here.</p>
        
                        <label htmlFor="">New Password</label><br/>
                        <input value={state.newPassword} type="password" onChange={(e) => setState({...state, newPassword: e.target.value})}/><br/>

                        <label htmlFor="">New Password Confirm</label><br/>
                        <input type="password" value={state.newPasswordConfirm} onChange={(e) => setState({...state, newPasswordConfirm: e.target.value})}/><br/>
        
                        <button>Submit</button>
                    </form>
    
                    <div>
                    <div className="container" ref={container}></div>
                    </div>
                </div>
    
            </Wrapper>
            </>
    )
    
}


const Wrapper = styled.div`
    .content-area {
        position: relative;
        padding: 0rem 0 0 10rem;
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content: space-around;
        margin-top: -2rem;
    }
   
    .container {
        width: 40rem; 
        height: 40rem;
        padding: 5rem;
    }

    form {
        label {
            font-size: 1.5rem;

        }
        input {
            padding: .5rem .4rem;
            font-size: 1.4rem;

            width: 100%;
            border: 5px solid var(--clr-primary-10);
            transition: all .2s;

        }

        button {
            padding: .5rem .4rem;
            font-size: 1.4rem;
            margin-top: .6rem !important;
            width: 120%;
            color: #000;
            font-weight: 700;
            
            background: var(--clr-primary-8);
            cursor: pointer;
            transition: all .2s;


            &:hover {
                background: var(--clr-primary-6);
            }
        }
        h5 {
            margin: 0;
            margin-bottom: 0 !important;
            padding: 0;
            margin-top: .7rem;
            margin-left: .1rem;
        }

      
    }
    .signUp_btn {
        font-size: 1.4rem;
        color: black;
        text-decoration-line: underline !important;
    }

    @media (max-width: 1300px) {
        .content-area {
            margin-top: 2rem;
            padding: 0rem 0 0 4rem;
        }
        .container {
            width: 30rem; 
            height: 30rem;
            padding: 4rem;
        }
    }

    @media (max-width: 992px) {
        .content-area {
            flex-direction: column;
            margin-top: 2rem;
            padding: 0rem 0 0 1rem;
        }
        .container {
            width: 30rem; 
            height: 30rem;
            padding: 2rem;

        }
    }
    @media (max-width: 600px) {
        .content-area {
            flex-direction: column;
            margin-top: 2rem;
            padding: 0rem 0 0 1rem;
        }
        .container {
            width: 15rem; 
            height: 15rem;
            padding: 0rem;


        }

        button {
            width: 50% !important;
        }

        label {
            font-size: 1.2rem;

        }
        input {
            padding: .2rem .2rem;
            font-size: 1.2rem;

            width: 70%;
            border: 5px solid var(--clr-primary-10);
            transition: all .2s;

            
        }
    }
    
    /* form {
        position: relative;
        top: 40%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    } */
`


export default ResetPassword;