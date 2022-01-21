import { useCallback, useState } from 'react'
import styled from 'styled-components'
import Axios from 'axios'

import NextIcon from './icons/NextIcon'
import { User } from '../../../types'

interface Props {
  onNext: (user: User) => void
}

export default function WelcomeLayout ({ onNext }: Props) {
  const [nickname, setNickname] = useState<string>()

  const onSubmit = useCallback(async (event: Event) => {
    event.preventDefault();

    try {
      if (!nickname || !nickname.length) {
        return
      }

      const { data } = await Axios.post('/api/user', { nickname })
      onNext(data.user)
    } catch (err) {
      console.error('Error creating user', err)
    }
  }, [onNext, nickname])

  return (
    <WelcomeContainer>
      <Title>Join us to chat!</Title>
      <Form onSubmit={event => onSubmit(event)}>
        <Input placeholder='Whats your name?' type='text' onChange={(event) => setNickname(event.target.value)} />
        <Button><NextIcon /></Button>
      </Form>
    </WelcomeContainer>
  )
}

const background = '/background.png'

const WelcomeContainer = styled.div`
  background-image: url(${background});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: bottom;
  background-color: white;
  width: 100%;
  height: 100%;
  float: left;
`

const Title = styled.h1`
  color: #2D1F63;
  font-size: 60px;
  font-weight: 600;
  text-align: center;
  pointer-events: none;
`

const Form = styled.form`
  position: relative;
  width: 435px;
  margin: 0 auto;
`

const Input = styled.input`
  width: calc(100% - 71px);
  box-shadow: rgba(0, 0, 0, 0.16) 0 1px 4px;
  text-align: left;
  font-size: 20px;
  color: #7976d9;
  padding: 15px 40px 15px 25px;
  border-radius: 50px;
  outline: none;
  background-color: rgba(152, 160, 249, 0.28);
  border: 3px solid transparent;

  ::placeholder {
    color: #7976d9;
    font-weight: 400;
  }

  :focus {
    border: 3px solid #7976d9;
  }
`

const Button = styled.button`
  position: absolute;
  border: none;
  cursor: pointer;
  outline: none;
  background: transparent;
  color: #7976d9;
  border-radius: 3px;
  top: 12px;
  right: 10px;
  padding: 0;

  :hover {
    opacity: .7;
  }
`